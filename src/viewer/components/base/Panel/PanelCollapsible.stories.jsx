import React from 'react';
import PanelCollapsible from './PanelCollapsible';

export default {
    title: 'base/Panel/PanelCollapsible',
    component: PanelCollapsible,
};

const Template = (args) => (
    <PanelCollapsible {...args} >
        <div>PanelCollapsible</div>
        <div>More info</div>
        <div>More info</div>
        <div>More info</div>
        <div>More info</div>
    </PanelCollapsible>
)

export const EastPanel = Template.bind({});
EastPanel.args = {
    id: 'east-panel',
    direction: 'east',
};

export const TallBottom = Template.bind({});
TallBottom.args = {
    id: 'tall-bottom',
    direction: 'south',
    fullSize: '500'
};
