$( document ).ready(function() {
    // Crawl URL
    $('#url-crawl').on('click', function(){
        // show loading
        $('#loading').show();
        // get entered url
        var url = $('#url').val();
        // clear previous data if any
        clear(false);
        // parse url / extract all href links
        $.ajax({
            url: '/spider/extract',
            type: 'POST',
            data: {
                url: url
            },
            success: function(response){
                countTotal = response.length;
                // loop though each url/link and check response statuses
                response.forEach((url) => {
                    $.ajax({
                        url: '/spider/validate',
                        type: 'POST',
                        data: {
                            url: url
                        },
                        success: function(response){
                            // append resulted response
                            printResult(response.url, response.codeStatus);
                            // update counters
                            setCounters();
                        }
                    });
                });
            }
        });
    });
});