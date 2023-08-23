import React from "react";

import BoundAdjuster from "./BoundAdjuster";

import './BackdropDetails.css';

function BackdropDetails(props) {
    const { details } = props;
    const { image, bounds, opacity } = details;

    return (
        <div id="backdropDetails">
            <table>
                <colgroup>
                    <col style={{ width: '40px' }} />
                    <col style={{ width: 'auto' }} />
                </colgroup>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <div className="title">Image:</div>
                            <div>{image}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div className="title">Bounds</div>
                            <BoundAdjuster bounds={bounds} />
                        </td>
                    </tr>
                    <tr>
                        <td className="title">Opacity</td>
                        <td>{opacity}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BackdropDetails;
