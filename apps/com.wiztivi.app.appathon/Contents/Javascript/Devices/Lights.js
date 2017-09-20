var lightsURL = "http://the-thing.appathon.tv/philips-hue/api/59MSn7uqdUFj96Gb0r7fevecVH9A5IRSbEonz7va/lights/";

var Lights = {
    
    COLOR_MAP: {
        RED: 65535,
        GREEN: 25500,
        BLUE: 46920
    },
    
    getLights: function() {
        return [1, 2, 3, 4, 5, 6, 7];
    },
    /**
     * SwitchOn a light
     * @param lightId 1-7
     * @param done callback
     * @param colour 0 and 65535. Both 0 and 65535 are red, 25500 is green and 46920 is blue.
     * @param brightness Brightness is a scale from 1 (the minimum the light is capable of) to 254 (the maximum). Note: a brightness of 1 is not off.
     * @param alert True if alert Mode
     */
    switchOn: function(lightId, done, colour, brightness, alert) {
        var body = {};
        body.sat = colour ? 254 : 0;
        body.hue = colour || 25500;
        body.on = true;
        body.bri = brightness || 254;
        body.alert = alert ? "lselect" : "none";
        Requests.doRequest('PUT', lightsURL + lightId + "/state", done, body);
    },
    
    setColor: function (lightId, color) {
        Lights.switchOn(
            lightId, 
            Function.prototype,
            Lights.COLOR_MAP[color.toUpperCase()]
        );
    },

    switchOff: function(lightId, done) {
        var body = {
            "on": false
        };
        Requests.doRequest('PUT', lightsURL + lightId + "/state", done, body);
    },
    
    alarmOn: function() {
        for (var i = 1; i <= 7; i++) {
            Lights.switchOn(i, undefined, 65535, 254, true);    
        }
    },

    flickerAll: function(colour, nbFlickers, interval) {
        var bodyOn = {};
        var bodyOff = {};
        bodyOn.sat = colour ? 254 : 0;
        bodyOff.sat = colour ? 254 : 0;
        bodyOn.hue = colour || 25500;
        bodyOff.hue = colour || 25500;
        bodyOn.bri = 254;
        bodyOff.bri = 254;
        bodyOn.alert = "none";
        bodyOff.alert = "none";
        for(var i = 0 ; i < nbFlickers ; i++) {
            for(var j = 1; j < 8 ; j++) {

                bodyOn.on = true;
                var sendRequestOn = Requests.doRequest.bind(this, 'PUT', lightsURL + j + "/state", undefined, bodyOn);
                bodyOff.on = false;
                var sendRequestOff = Requests.doRequest.bind(this, 'PUT', lightsURL + j + "/state", undefined, bodyOff);
                setTimeout(sendRequestOn, interval * i);
                setTimeout(sendRequestOff, (interval * i) + (interval / 2));
            }

        }

    }

};