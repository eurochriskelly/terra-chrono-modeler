import React, { useState } from "react";
import './PanelCollapsible.css';

function PanelCollapsible(props) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    let styles = {};
    let buttonStyles = {
        position: "absolute",
        height: "20px",
        width: "20px",
        fontWeight: "bold",
        top: 0,
        right: 0
    };

    const { id, direction = "west", debug, minSize = "20", fullSize = "200" } = props;
    if (debug) {
        styles.border = "1px solid blue";
    }

    let arrow;
    switch (direction) {
        case 'east':
            styles.width = isCollapsed ? `${minSize}px` : `${fullSize}px`;
            arrow = isCollapsed ? '←' : '→';
            buttonStyles.right = "0";
            break;
        case 'west':
            styles.width = isCollapsed ? `${minSize}px` : `${fullSize}px`;
            arrow = isCollapsed ? '→' : '←';
            buttonStyles.left = "0";
            break;
        case 'north':
            styles.height = isCollapsed ? `${minSize}px` : `${fullSize}px`;
            arrow = isCollapsed ? '↓' : '↑';
            buttonStyles.top = "0";
            break;
        case 'south':
            styles.height = isCollapsed ? `${minSize}px` : `${fullSize}px`;
            arrow = isCollapsed ? '↑' : '↓';
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
