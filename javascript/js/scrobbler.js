var SESSION_KEY = '';
var USERNAME    = '';
var API_KEY     = '828c109e6a54fffedad5177b194f7107';
var API_SECRET  = '7c2f09e6eb84e8a6183c59e0bc574f70';
var TOKEN       = '';
var LAST_FM;
var TIMESTAMP;

jQuery(document).ready(function() {
    
    TIMESTAMP = Math.round((new Date()).getTime() / 1000);
    
    if (!$.url().param('token')) {
        window.location = 'http://www.last.fm/api/auth/?api_key=' + API_KEY + '&cb=' + window.location;
    } else {
        TOKEN = $.url().param('token');
        USERNAME = window.prompt("Type your Last.fm username : ","soundsuggest");
        
        // Create a LastFM object
        LAST_FM = new LastFM({
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            cache: new LastFMCache()
        });

        LAST_FM.auth.getSession({
            token: TOKEN
        }, {
            success: function(data) {
                console.log('SESSION_KEY == ' + data.session.key);
                SESSION_KEY = data.session.key;
            },
            error: function(data) {
                console.log(data.error + " : " + data.message);
            }
        });
    }
});

scrobble = function() {
    LAST_FM.track.scrobble({
        artist      : $('input[name=artist]', '#scrobbler').val(),
        track       : $('input[name=track]', '#scrobbler').val(),
        user        : USERNAME,
        timestamp   : TIMESTAMP
    }, {
        key : SESSION_KEY
    }, {
        success : function (data) {
            console.log(data);
        },
        error : function (data) {
            console.log(data);
        }
    });
};
