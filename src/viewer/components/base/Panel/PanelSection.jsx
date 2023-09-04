import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars, faWindowMaximize,
    faEarth, faWindowMinimize
} from '@fortawesome/free-solid-svg-icons';

import './PanelSection.css'

var fv = false;

function PanelSection(props) {

    const [fullView, setFullView] = useState(false);

    const {
        title,
        children,
        icon = 'bars'
    } = props;
    switch (icon) {
        case 'earth':
            var useIcon = faEarth;
            break;
        case 'list':
        default:
            var useIcon = faBars;
    }

    const maximizeDisplay = () => {
        console.log('maximizeDisplay')
        setFullView(!fv)
        fv = !fv
    }

    return (
        <div className="panel-section group">
            <h2 className="panel-section__title">
                <span>
                    <FontAwesomeIcon icon={useIcon} />
                </span>
                <span className="label">{title}</span>
                <span />
                <span className="decor">
                    <FontAwesomeIcon icon={faWindowMinimize} />
                </span>
                <span className="decor" onClick={maximizeDisplay}>
                    <FontAwesomeIcon icon={faWindowMaximize} />
                </span>
            </h2>
            { fullView
                    ? <div className="panel-section__content"></div>
                    : <div className="panel-section__content">{children}</div>
            }
            {fullView && (
                <div className="overlay-window">
                    <div>foo</div>
                    <div >
                        <div className="panel-section__full">deebly</div>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default PanelSection;
