

export default {
    commands: [
        {
            name: 'collections',
            options: [
                {
                    name: 'new',
                },
                {
                    name: 'edit',
                    params: [
                        'id',
                        'radius',
                    ]
                },
                {
                    name: 'remove',
                    params: [
                        'id',
                    ]
                },
                {
                    name: 'copy',
                    params: [
                        'id',
                    ]
                }
            ],

        },
        {
            name: 'features',
        }

    ],


}