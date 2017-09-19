var lightsURL = "http://the-thing.appathon.tv/philips-hue/api/59MSn7uqdUFj96Gb0r7fevecVH9A5IRSbEonz7va/lights/";

var Lights = {
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
    }
};