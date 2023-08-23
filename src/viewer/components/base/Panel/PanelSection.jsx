import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEarth } from '@fortawesome/free-solid-svg-icons';

import './PanelSection.css'

function PanelSection(props) {
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

    return (
        <div className="panel-section group">
            <h2 className="panel-section__title">
                <FontAwesomeIcon icon={useIcon} />&nbsp;{title}
            </h2>
            <div className="panel-section__content">{children}</div>
        </div>
    )
}

export default PanelSection;
