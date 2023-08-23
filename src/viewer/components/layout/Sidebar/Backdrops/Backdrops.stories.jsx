import React from 'react';
import Backdrops from '.';

export default {
    title: 'layout/Sidebar/Backdrops',
    component: Backdrops,
};

const Template = (args) => <Backdrops {...args} />;

export const Backdrops1 = Template.bind({});
Backdrops1.args = {
    toggleBackdrop: () => {
        console.log('toggleBackdrop')
    },
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
    ]
};
