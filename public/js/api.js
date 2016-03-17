var api = (function() {


    function getSessionData(name, cb) {

        $.ajax({
            type: 'POST',
            url: '/getToken',
            data: JSON.stringify({
                name: name
            }),
            success: cb,
            contentType: 'application/json'
        });

    }

    return {
        getSessionData: getSessionData
    };

})();