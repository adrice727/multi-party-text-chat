var api = (function() {

    return {
        getSessionData: function() { return axios.post('/getToken');}
    };

})();