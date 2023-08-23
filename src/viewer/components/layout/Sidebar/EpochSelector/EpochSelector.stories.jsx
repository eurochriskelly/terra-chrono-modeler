import React from 'react';
import EpochSelector from '.';

export default {
    title: 'layout/Sidebar/EpochSelector',
    component: EpochSelector,
};

const Template = (args) => <EpochSelector {...args} />;

export const JustOne = Template.bind({});
JustOne.args = {
    toggleEpoch: x => {
        console.log('toggleEpoch:', x)
        // add an action here to update the storybook
    },
    epochs: [
        {
            name: 'Backdrop 1',
            image: 'https://i.imgur.com/1qZw3.jpg',
            on: true,
            opacity: 0.5,
            bounds: '0,0,100,300'
        },
        {
            name: 'Backdrop 2',
            image: 'https://i.imgur.com/blah.jpg',
            on: false,
            opacity: 0.3,
            bounds: '0,0,100,100'
        }
    ]
};
