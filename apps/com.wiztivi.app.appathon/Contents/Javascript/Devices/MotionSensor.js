var active = false;

var MotionSensor = {
    setActive: function(bool) {
        active = bool;
    },
    
    getActive: function() {
        return active;    
    },

    reactOn: function(reactCallback) {
        var myFunction = function() {
            Requests.doRequest("GET", "http://the-thing.appathon.tv/philips-hue/api/59MSn7uqdUFj96Gb0r7fevecVH9A5IRSbEonz7va/sensors/7", reactCallback);
            if (active) {
                setTimeout(myFunction, 1000);
            }
        };
        if (active) {
            myFunction();
        }
    }

};