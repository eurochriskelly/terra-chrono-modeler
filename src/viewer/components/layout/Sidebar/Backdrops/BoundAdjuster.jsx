import React, { useState } from 'react';

import './BoundAdjuster.css';

const BoundAdjuster = ({ bounds, onChange }) => {
    const [min, max] = bounds


    return (
        <div className="boundAdjuster">
            <div className="compass-row">
                <div>
                    <label>Lat Max</label>
                    <input type="number" step="0.1" className="compass-input" placeholder="180.0" value={max[0]} />
                </div>
            </div>

            <div className="compass-row">
                <div className="compass-cell">
                    <label>Lon Min</label>
                    <input type="number" step="0.1" className="compass-input" placeholder="-180.0" value={min[1]} />
                </div>
                <div className="compass-cell">
                    <label>Lon Max</label>
                    <input type="number" step="0.1" className="compass-input" placeholder="180.0" value={max[1]} />
                </div>
            </div>

            <div className="compass-row">
                <div>
                    <label>Lat Min</label>
                    <input type="number" step="0.1" className="compass-input" placeholder="-180.0" value={min[0]} />
                </div>
            </div>
        </div>
    );
};

export default BoundAdjuster;
