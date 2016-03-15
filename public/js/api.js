var api = (function() {

    var getToken = function() {

        return axios.post('/getToken')
            .then(function(res) {
                window.sessionData = res.data;
            }, function(err) {
                console.log('Error: ', err);
            });
    };

    return {
        getSessionData: getToken
    };

})();