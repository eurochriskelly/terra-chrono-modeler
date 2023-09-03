import React from 'react'
import Backdrops from './Backdrops'
import LayerManager from './LayerManager'
import EpochSelector from './EpochSelector'
import ModeSwitcher from './ModeSwitcher'
import { PanelCollapsible, PanelSection } from '../../base/Panel'

import './Sidebar.css'

function Sidebar(props) {
    const { mode } = props.gestate

    // define the panels and their content per view
    const panels = [
        {
            title: 'mode',
            icon: 'earth',
            content: <ModeSwitcher {...props} />
        },
        {
            title: 'Epoch',
            content: <EpochSelector {...props} />
        },
        {
            title: 'underlays',
            condition: mode === 'flat',
            content: <Backdrops {...props} />
        },
        {
            title: 'layers',
            content: <LayerManager {...props} />
        }
    ]

    return (
        <PanelCollapsible id="sidebar" debug={true}>{
            panels.map((panel, i) => {
                const { condition = true } = panel
                return (
                    condition &&
                    <PanelSection key={i} title={panel.title} icon={panel.icon} >
                        {panel.content}
                    </PanelSection>
                )
            })
        }</PanelCollapsible>
    )
}

export default Sidebar
