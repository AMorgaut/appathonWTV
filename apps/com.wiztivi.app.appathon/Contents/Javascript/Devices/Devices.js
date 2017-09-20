var Devices = {
    'Forest Curtains': {
        actions: [
            {
                id: 'openCurtains',
                label: 'Open curtains'
            },
            {
                id: 'closeCurtains',
                label: 'Close curtains'
            },
            {
                id: 'stopCurtains',
                label: 'Stop curtains'
            }
        ]
    },
    'Doorbird RVS': {
        actions: [
            {
                id: 'lock',
                label: 'Lock door'
            },
            {
                id: 'unlock',
                label: 'Unlock door'
            }
        ]
    },
    'Dyson Pure Hot&Cool': {
        actions: [
            {
                id: 'startFan',
                label: 'Start fan'
            },
            {
                id: 'stopFan',
                label: 'Stop fan'
            }
        ]
    },
    'Philips Hue': {
        actions: [
            {
                id: 'switchOn',
                label: 'Switch on lights'
            },
            {
                id: 'switchOff',
                label: 'Switch off lights'
            },
            {
                id: 'flashColor',
                label: 'Flash Color',
                paramChoice: ['red', 'green', 'blue']
            },
            {
                id: 'alarmOn',
                label: 'Alarm on'
            }
        ]
    },
    'MotionSensor': {
        actions: [
            {
                id: 'onMove',
                label: 'On move'
            }
        ]
    }
};