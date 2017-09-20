var
    T_CUSTOM = 0,
    T_INSTALLED = 1,
    T_RECOMMENDED = 2,
    T_OTHERS = 3;

Sections[T_CUSTOM].scenarios = [
    {
        name: 'HoH Alarm',
        description: 'A flash light based alarm for deaf and hard of hearing people.' +
            'Can react to Ring bell, Microwave alarm, or even program reminders'
    }
];

Sections[T_INSTALLED].scenarios = [

    {
        name: 'Poltergeist',
        description: 'Randomly move object direct Horror movie silent moments',
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
        name: 'Poltergeist',
        description: 'Randomly move object direct Horror movie silent moments',
        script:  {
            devices: [
                { name: "hooven", actions: [
                    {name: "ready", reaction: ['light1', '']}
                ]}
            ]
        }
    },

    {
        name: 'Hyper Movie Experience',
        description: 'Flash the light when food ready'
    }
];

Sections[T_OTHERS].scenarios = [

    { name: 'Catch the drone' }

];
