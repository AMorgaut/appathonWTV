var DetectedDevices = {
    light1: {
        setColor: function (param) {
            Lights.setColor('light1', param);
        },

        switchOff: function () {
            Lights.switchOff('light1', Function.prototype);
        },

        flashColor: function (param) {
            Lights.setColor('light1', param);
            setTimeout(function () {
                Lights.switchOff('light1', Function.prototype);
            });
        }
    }
};