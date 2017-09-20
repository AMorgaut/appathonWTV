var Curtains = {
    openCurtains: function(done) {
        Requests.doRequest('GET', "http://the-thing.appathon.tv/vera-bridge/port_3480/data_request?id=lu_action&action=SetLoadLevelTarget&newLoadlevelTarget=100&serviceId=urn:upnp-org:serviceId:Dimming1&DeviceNum=13", done);
    },
    closeCurtains: function(done) {
        Requests.doRequest('GET', "http://the-thing.appathon.tv/vera-bridge/port_3480/data_request?id=lu_action&action=SetLoadLevelTarget&newLoadlevelTarget=0&serviceId=urn:upnp-org:serviceId:Dimming1&DeviceNum=13", done);
    },
    stopCurtains: function(done) {
        Requests.doRequest('GET', "http://the-thing.appathon.tv/vera-bridge/port_3480/data_request?id=lu_action&action=Stop&serviceId=urn:upnp-org:serviceId:WindowCovering1&DeviceNum=13", done);
    }
};