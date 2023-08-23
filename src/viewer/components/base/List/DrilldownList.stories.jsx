import React from 'react';
import DrilldownList from './DrilldownList';

export default {
    title: 'base/List/DrilldownList',
    component: DrilldownList,
};

const DetailsMockInterface = ({ details }) => {
    return (
        <div>
            <div>
                <i className="fa-solid fa-user"></i>detailio: {details.name}</div>
            <div>
                <span className="fa-solid fa-user"></span>on: {details.on ? 'yes' : 'no'}</div>
        </div>
    )
}

const Template = (args) => (
    <div id="sidebar" >
        <DrilldownList {...args} >
            <DetailsMockInterface />
        </DrilldownList>
    </div>
)

export const Example = Template.bind({});
export const ExampleAllowAdd = Template.bind({});
const list = [
    {
        id: 'l1',
        name: 'bar',
        on: true
    },
    {
        id: 'l2',
        name: 'baz',
        on: false,
        color: 'green',
    }
]
Example.args = {
    handleCheckboxChange: (el) => console.log('on toggle check', el),
    list,
    active: 'l2'
};
ExampleAllowAdd.args = {
    handleCheckboxChange: (el) => console.log('on toggle check', el),
    handleActivateItem: (el) => console.log('activating', el),
    handleAddItem: (el) => console.log('on add item', el),
    list,
    allowAdd: true
};
