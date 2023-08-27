import React from 'react'
import Backdrops from './Backdrops'
import LayerManager from './LayerManager'
import EpochSelector from './EpochSelector'
import ModeSwitcher from './ModeSwitcher'
import { PanelCollapsible, PanelSection } from '../../base/Panel'

import './Sidebar.css'

function Sidebar(props) {
    const { mode } = props
    return (
        <PanelCollapsible id="sidebar" debug={true}>
            <div style={{ minHeight: '24px', backgroundColor: '#222' }}></div>
            <PanelSection title="mode" icon="earth">
                <ModeSwitcher {...props} />
            </PanelSection>

            <PanelSection title="Epoch">
                <EpochSelector {...props} />
            </PanelSection>

            <PanelSection title="underlays">
                <Backdrops {...props} />
            </PanelSection>

            <PanelSection title="layers">
                <LayerManager {...props} />
            </PanelSection>

        </PanelCollapsible>
    )
}

export default Sidebar
