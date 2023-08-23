import React from 'react';
import './ColorPalette.css'

const colors = [
    { color: '#330033', label: 'Violet' },
    { color: '#330066', label: 'Indigo' },
    { color: '#000099', label: 'Blue' },
    // ... add other colors as required
];

const ColorPalette = () => (
    <div className="palette">
        {colors.map((item, index) => (
            <div key={index} className="color-item" style={{ backgroundColor: item.color }}>
                <span>{item.label}</span>
            </div>
        ))}
    </div>
);

export default ColorPalette;
