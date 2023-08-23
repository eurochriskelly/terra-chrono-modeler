import React from 'react';
import MapView from '.';

export default {
    title: 'layout/Viewer/MapView',
    component: MapView,
};

const Template = (args) => <MapView {...args} />;

export const BasicMap = Template.bind({});
BasicMap.args = {
    layers: [],
    backdrops: [
        {
            name: 'earth',
            bounds: [[-90, -180], [90, 180]],
            image: 'images/mercador-square.jpg',
            opacity: 0.9,
            on: true,
        },
        {
            name: 'sea-floor',
            bounds: [[-67, -250.5], [76, 101.5]],
            image: 'images/ocean-floor.jpg',
            opacity: 0.1,
            on: true,
        },
    ],
};
