var Fan = {
    startFan: function(done) {
        var body = {
            "oscillation":"Oscillation.OSCILLATION_ON",
            "fan_speed": "FanSpeed.FAN_SPEED_10",
            "heat_target": "HeatTarget.celsius(10)",
            "heat_mode": "HeatMode.HEAT_OFF"
        };
        Requests.doRequest('PUT', "http://the-thing.appathon.tv/dyson-pure-hot-cool/dyson/devices/PT4-EU-JGA1455A/state", done, body);
    },
    stopFan: function(done) {
        var body = {
            "oscillation": "Oscillation.OSCILLATION_OFF",
            "fan_speed": "FanSpeed.FAN_SPEED_1",
            "heat_target": "HeatTarget.celsius(10)",
            "heat_mode": "HeatMode.HEAT_OFF"
        };
        Requests.doRequest('PUT', "http://the-thing.appathon.tv/dyson-pure-hot-cool/dyson/devices/PT4-EU-JGA1455A/state", done, body);
    }
};