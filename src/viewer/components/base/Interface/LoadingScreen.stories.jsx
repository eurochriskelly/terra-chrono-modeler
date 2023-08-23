import React from 'react';
import LoadingScreen from './LoadingScreen';

export default {
    title: 'base/Interface/LoadingScreen',
    component: LoadingScreen,
};

const Template = (args) => <LoadingScreen {...args} ></LoadingScreen>

export const BasicLoad = Template.bind({});
export const LoadWithMessage = Template.bind({});
BasicLoad.args = {};
LoadWithMessage.args = {
    expectedMode: 'round',
};
