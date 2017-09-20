var Door = {
    lock: function(done) {
        Requests.doRequest('GET', "http://the-thing.appathon.tv/nuki/lockAction?nukiId=191304937&action=2&token=1", done);
    },
    unlock: function(done) {
        Requests.doRequest('PUT', "http://the-thing.appathon.tv/nuki/lockAction?nukiId=191304937&action=1&token=1", done);
    }
};