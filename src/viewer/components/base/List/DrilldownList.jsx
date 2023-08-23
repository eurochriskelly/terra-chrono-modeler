import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCircleInfo, faCrosshairs } from '@fortawesome/free-solid-svg-icons';

import '../../../common/style.css'
import './DrilldownList.css'

function DrilldownList(props) {
    const {
        list,
        children,
        active,
        sorter = (a, b) => 0,
        handleCheckboxChange = () => { },
        handleActivateItem = () => { },
        handleAddItem,
    } = props
    const [selected, setSelected] = useState(null);
    const [index, setIndex] = useState(null);
    const [add, setAdd] = useState(false);

    // Pass the details and index to the children (DetailsComponent in this case)
    const enhancedChildren = React.Children.map(children, child =>
        React.cloneElement(child, { details: list[index], selectItem: setIndex })
    );

    const handleSelect = (n, event) => {
        const parentDiv = event.currentTarget.parentElement;
        setIndex(n)
        if (selected) {
            selected.classList.remove('selected');
        }
        if (selected !== parentDiv) {
            parentDiv.classList.add('selected');
            setSelected(parentDiv);
            console.log(parentDiv)
        } else {
            setSelected(null);
        }
    }

    const prepareToAdd = (el) => {
        setAdd(true)
    }
    const processAdding = (event) => {
        const { key, target } = event
        if (key === 'Enter') {
            handleAddItem(target.value)
            setAdd(false)
        }
    }

    return (
        <div className="drillDownList">
            <div className="listItems bg-blue-500">
                {
                    list.map((d, i) => {
                        const { name, on, color, id } = d
                        let c = 'listItem '
                        if (id === active) {
                            c += 'active'
                        }
                        return (
                            <div className={c} key={id} >
                                <input type="checkbox" name={name}
                                    checked={on ? 'checked' : ''} onChange={handleCheckboxChange} />
                                <span className="selectable" onClick={handleSelect.bind(null, i)}>{name}</span>
                                {color
                                    ? <span className="color" style={{ backgroundColor: color }} />
                                    : <span />
                                }
                                {selected && active && (
                                    <span className="activate" onClick={handleActivateItem}>
                                        <FontAwesomeIcon icon={faCrosshairs} />
                                    </span>
                                )}
                            </div>
                        )
                    })
                }
                <div>
                    {(!!handleAddItem && !selected) &&
                        <div className="allowAdd" onClick={prepareToAdd}>
                            {add
                                ? <input onKeyDown={processAdding} />
                                : <FontAwesomeIcon icon={faAdd} />
                            }
                        </div>
                    }
                </div>
            </div>
            {selected && (
                <div className="examine">
                    <div />
                    <div className="provided">
                        <div>{enhancedChildren}</div>
                        <div className="tr-icon">
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DrilldownList;
