import React from 'react';

const Planet = ({ radius, xPos, yPos }) => {
    return (
        <g>
            <defs>
                <linearGradient id="linearGradient">
                    <stop style={{ stopColor: '#000099', stopOpacity: 1 }} offset="0" id="stop6455" />
                    <stop style={{ stopColor: '#000000', stopOpacity: 1 }} offset="1" id="stop6457" />
                </linearGradient>
                <radialGradient cx="171.20810" cy="196.85463" r="200" fx="171.20810" fy="196.85463" id="radialGradient" href="#linearGradient" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1.040418,0.796229,-0.814518,1.064316,153.4218,-150.4353)" />
            </defs>
            <circle
                cx={xPos} cy={yPos} r={radius*1.3}
                fill="#ffffff" opacity={0.1}
            />
            <circle
                cx={xPos} cy={ yPos} r={ radius}
                fill="url(#linearGradient)"
                opacity={0.7}
            />
        </g>
    )

}

export default Planet;
