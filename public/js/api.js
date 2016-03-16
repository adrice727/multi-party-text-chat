var api = (function() {

    return {
        getSessionData: function(name) { return axios.post('/getToken', {name: name});}
    };

})();