// Last.fm object
var cache = new LastFMCache();
var lastfm = new LastFM({
    apiKey    : '828c109e6a54fffedad5177b194f7107',
    apiSecret : '7c2f09e6eb84e8a6183c59e0bc574f70',
    cache     : cache
});

function compareItems() {
    
    // vars
    var item1_type  = $('input[name=item1_type]:checked', '#tasteometer-form').val();
    var item2_type  = $('input[name=item2_type]:checked', '#tasteometer-form').val();
    var item1_value = $('input[name=item1_value]', '#tasteometer-form').val();
    var item2_value = $('input[name=item2_value]', '#tasteometer-form').val();;
    var limit = 5;
    
    lastfm.tasteometer.compare({
            type1   : item1_type,
            type2   : item2_type,
            value1  : item1_value,
            value2  : item2_value,
            limit   : limit,
            api_key : lastfm.apiKey
        },
        {
            success: function(data) {
                var score = data.comparison.result.score;
                var resulttxt = 'The matching score between '
                        +  item1_value
                        + ' and '
                        + item2_value
                        + ' is '
                        + score
                        + '.';
                
                $("#tasteometer-result").html(resulttxt);
            },
            error: function(error, msg) {
                alert(error + " " + msg);
            }
        });
}