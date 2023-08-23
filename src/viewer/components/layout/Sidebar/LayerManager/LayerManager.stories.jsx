import React from 'react';
import LayerManager from '.';

export default {
    title: 'layout/Sidebar/LayerManager',
    component: LayerManager,
};

const Template = (args) => <LayerManager {...args} />;

export const MultiEpoch = Template.bind({});
MultiEpoch.args = {
    toggleBackdrop: () => {
        console.log('toggleBackdrop 123')
        // add an action here to update the storybook
    },
    handleAddItem: () => {
        console.log('adding an item')
    },
    layers: [
        { name: 'foo', on: true, color: 'yellow' },
        { name: 'baz', on: true, color: 'orange' },
        { name: 'bar', on: true, color: 'green' },
    ],
    layers1: [
        {
            "uri": "/gegeodesy/epoch/present/layer/test/20230804194118.541.json",
            "data": {
                "type": "Feature",
                "properties": {
                    "uri": "/gegeodesy/epoch/present/layer/test/20230804194118.541.json"
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": []
                }
            }
        },
        {
            "uri": "/gegeodesy/epoch/present/layer/rift/20230805151541.681.json",
            "data": {
                "type": "Feature",
                "properties": {
                    "uri": "/gegeodesy/epoch/present/layer/rift/20230805151541.681.json"
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": []
                }
            }
        },
        {
            "uri": "/gegeodesy/epoch/present/layer/test/20230806091554.275.json",
            "data": {
                "type": "Feature",
                "properties": {
                    "uri": "/gegeodesy/epoch/present/layer/test/20230806091554.275.json"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -108.764932,
                        71.636205
                    ]
                }
            }
        },
        {
            "uri": "/gegeodesy/epoch/present/layer/rift/20230806101822.982.json",
            "data": {
                "type": "Feature",
                "properties": {
                    "uri": "/gegeodesy/epoch/present/layer/rift/20230806101822.982.json"
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": []
                }
            }
        },
        {
            "uri": "/gegeodesy/epoch/present/layer/test/20230806101909.323.json",
            "data": {
                "type": "Feature",
                "properties": {
                    "uri": "/gegeodesy/epoch/present/layer/test/20230806101909.323.json"
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": []
                }
            }
        },
        {
            "uri": "/gegeodesy/epoch/present/layer/test/20230806102028.247.json",
            "data": {
                "type": "Feature",
                "properties": {
                    "uri": "/gegeodesy/epoch/present/layer/test/20230806102028.247.json"
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": []
                }
            }
        },
        {
            "uri": "/gegeodesy/epoch/present/layer/other/20230806102133.510.json",
            "data": {
                "type": "Feature",
                "properties": {
                    "uri": "/gegeodesy/epoch/present/layer/other/20230806102133.510.json"
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": []
                }
            }
        },
        {
            "uri": "/gegeodesy/epoch/present/layer/test/20230806102301.694.json",
            "data": {
                "type": "Feature",
                "properties": {
                    "uri": "/gegeodesy/epoch/present/layer/test/20230806102301.694.json"
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": []
                }
            }
        },
    ].map(x => x.data)
};
console.log('aaaaaaa', MultiEpoch.args)
