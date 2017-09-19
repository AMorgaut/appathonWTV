var
    T_CUSTOM = 0,
    T_INSTALLED = 1,
    T_RECOMMENDED = 2,
    T_OTHERS = 3;

Sections[T_CUSTOM].scenarios = [
    {
        name: '123',
        description: 'My simple scenario I did myself'
    }
];

Sections[T_INSTALLED].scenarios = [

    {
        name: 'Light Cook Alarm',
        description: 'Flash the light when food ready',
        script:  {
            devices: [
                { name: "hooven", actions: [
                    {name: "ready", reaction: ['light1', 'color', 'red']}
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
                    {name: "ring", reaction: ['light1', 'color', 'red']}
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
