import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowAltCircleDown, faArrowAltCircleUp, faArrowAltCircleLeft, faArrowAltCircleRight
} from '@fortawesome/free-solid-svg-icons';
import './PanelCollapsible.css';

function PanelCollapsible(props) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    let styles = {};
    let buttonStyles = {
        right: 0,

    };

    const { id, direction = "west", debug, minSize = "20", fullSize = "250" } = props;
    if (debug) {
        styles.border = "1px solid blue";
    }

    let arrow;
    switch (direction) {
        case 'east':
            styles.width = isCollapsed ? `${minSize}px` : `${fullSize}px`;
            arrow = isCollapsed
                ? <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                : <FontAwesomeIcon icon={faArrowAltCircleRight} />
            buttonStyles.right = "0";
            break;
        case 'west':
            styles.width = isCollapsed ? `${minSize}px` : `${fullSize}px`;
            arrow = isCollapsed
                ? <FontAwesomeIcon icon={faArrowAltCircleRight} />
                : <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            // buttonStyles.left = "0";
            break;
        case 'north':
            styles.height = isCollapsed ? `${minSize}px` : `${fullSize}px`;
            arrow = isCollapsed
                ? <FontAwesomeIcon icon={faArrowAltCircleDown} />
                : <FontAwesomeIcon icon={faArrowAltCircleUp} />
            buttonStyles.top = "0";
            break;
        case 'south':
            styles.height = isCollapsed ? `${minSize}px` : `${fullSize}px`;
            arrow = isCollapsed
                ? <FontAwesomeIcon icon={faArrowAltCircleUp} />
                : <FontAwesomeIcon icon={faArrowAltCircleDown} />
            buttonStyles.bottom = "0";
            break;
        default:
            break;
    }

    return (
        <div id={id} style={styles} className={`panel-collapsible-container ${isCollapsed ? 'collapsed' : ''}`}>
            <div style={{ display: isCollapsed ? 'none' : 'block' }}>
                {props.children}
            </div>
            <button
                style={buttonStyles}
                className="toggle-button"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {arrow}
            </button>
        </div>
    );
}

export default PanelCollapsible;
