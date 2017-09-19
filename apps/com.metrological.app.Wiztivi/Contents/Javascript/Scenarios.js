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
        description: 'Flash the light when food ready'
    },

    {
        name: 'Simon' ,
        description: 'A funny memory interactive game '
    }
];

Sections[T_RECOMMENDED].scenarios = [

    {
        name: 'Pizza delivery' ,
        description: 'See my visitor on my TV when the door ring, and open the door if I want'
    },

    {
        name: 'Hyper Movie Experience',
        description: 'Flash the light when food ready'
    }
];

Sections[T_OTHERS].scenarios = [

    { name: 'Catch the drone' }

];
