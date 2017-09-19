var ScenarioPlayer = {

    running: [],

    /**
     * array of listeners
     * {
     *   device: string,
     *   event: string,
     *   callback: function
     * }
     */
    listeners: [],

    dispatcher: function (iotEvent) {
        var data = iotEvent.payload.e.split('_');
        var device = data[0];
        var event = data[1];
        var param = data[2];
        ScenarioPlayer.listeners.forEach(function (item) {
            if (item.device !== device || item.event !== event) {
                return;
            }
            item.callback(param);
        })
    },

    /**
     * Dev tool to trigger device events
     *
     * @example
     *   ScenarioPlayer.forceDispatch("doorBird_ring");
     *
     * @param {string} msg Astring composed of device id, event name, & param, seperated by "_"
     */
    forceDispatch: function (msg) {
        this.dispatcher({payload:{e: msg}});
    },

    start: function (scenario) {
        console.log('start scenario', scenario);
        // this.running.push(scenario);
        if (!scenario.listeners) {
            scenario.listeners = [];
            scenario.script.devices.forEach(function registerScenarioDevices(device) {
                device.actions.forEach(function registerScenarioDevicesEvents(action) {
                    var listener = {
                        device: device.name,
                        event: action.name,
                        callback: function (param) {
                            
                            // RUN THE ACTION
                            Devices[device.name][action.name](param);
                            
                            
                        }
                    };
                    console.log('add listener', listener);
                    scenario.listeners.push(listener);
                });
            });
        }
        ScenarioPlayer.listeners = ScenarioPlayer.listeners.concat(scenario.listeners);
        console.log('current listeners', ScenarioPlayer.listeners);
    },

    stop: function (scenario) {
        console.log('stop scenario', scenario);
        var listeners = scenario.listeners;
        ScenarioPlayer.listeners = ScenarioPlayer.listeners.filter(function (listener) {
            var test = listeners.indexOf(listener) === -1;
            if (!test) {
                console.log('filter listener', listener);
            }
            return test;
        });
        console.log('current listeners', ScenarioPlayer.listeners);
    }
};