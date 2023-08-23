import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import '../../../common/style.css'
import './LoadingScreen.css'

function LoadingScreen(props) {
    const { expectedMode } = props;
    return (
        <div className="loadingScreen">
            <span />
            <span>
                <div />

                <div>
                    <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                </div>
            </span>
            <span />
        </div>
    )
}

export default LoadingScreen
