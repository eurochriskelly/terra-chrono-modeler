import React from 'react';
import BoundAdjuster from './BoundAdjuster';

export default {
    title: 'Layout/Sidebar/Backdrops/BoundAdjuster',
    component: BoundAdjuster,
};

const style = {
    width: '200px',
    border: '1px solid red',
    padding: '4px',
}

const Template = (args) => <div style={style}>
    <BoundAdjuster {...args} />;
</div>

export const Default = Template.bind({});
Default.args = {
    bounds: [[-75, -200], [75, 160]],
    onBoundsChange: (bounds) => console.log('Bounds changed:', bounds),
};
