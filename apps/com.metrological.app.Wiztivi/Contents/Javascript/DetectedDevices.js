var DetectedDevices = {
    light1: {
        switchOn: function (param) {
            var param = param.split('.');
            Lights.switchOn('light1', param[0], param[1]);
        }
    }
};