import React from 'react';
import Sidebar from '.';

export default {
    title: 'layout/Sidebar',
    component: Sidebar,
};

const Template = (args) => <Sidebar {...args} />;

export const Sidebar1 = Template.bind({});
Sidebar1.args = {
    toggleBackdrop: () => {
        console.log('toggleBackdrop 123')
        // add an action here to update the storybook
    },
    data: [
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
