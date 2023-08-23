import React from 'react';
import WorldView from '.';

export default {
    title: 'layout/Viewer/WorldView',
    component: WorldView,
};

const Template = (args) => <WorldView {...args} />

export const AWorld = Template.bind({});
AWorld.args = {
    gestate: {
        world: {
            SCALE_FACTOR: 0.001,
            RADIUS_EARTH: 6371,
            RADIUS_EPOCH: 3200,
        }
    }
};
