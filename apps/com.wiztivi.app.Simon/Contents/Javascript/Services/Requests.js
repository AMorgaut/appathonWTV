var Requests = {
    doRequest: function( method, url, done, body ) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", 'application/json; charset=utf-8');
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var answer = null;
                try {
                    answer = JSON.parse(xhr.responseText);
                } catch(e) {
                }

                done && done(answer);
            }
        };
        xhr.onerror = function( error ) { console.log(error); };
        xhr.send(JSON.stringify(body));
    }
};

