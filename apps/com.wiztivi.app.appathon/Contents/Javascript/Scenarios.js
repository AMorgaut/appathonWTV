var
    T_CUSTOM = 0,
    T_INSTALLED = 1,
    T_RECOMMENDED = 2,
    T_OTHERS = 3;

Sections[T_CUSTOM].scenarios = [
    {
        name: 'Automatic light',
        description: 'A simple light application I did myself'
    }
];

Sections[T_INSTALLED].scenarios = [

    {
        name: 'Super Simon Game',
        description: 'Integration of the famous Simon game with IoT objects you own at your house ! Have fun :)',
        script:  {
            devices: [
                { name: "hooven", actions: [
                    {name: "ready", reaction: ['light1', '']}
                ]}
            ]
        }
    },

    {
        name: 'Pizza delivery' ,
        description: 'See my visitor on my TV when the door ring, and open the door if I want',
        script:  {
            devices: [
                { name: "door", actions: [
                    {name: "ring", reaction: ['light1', 'setColor', 'red']}
                ]}
            ]
        }
    }
];

Sections[T_RECOMMENDED].scenarios = [

    {
        name: 'Hyper Movie Experience',
        description: 'Flash the light when food ready'
    }
];

Sections[T_OTHERS].scenarios = [

    { name: 'Catch the drone' }

];
