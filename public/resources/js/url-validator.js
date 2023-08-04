$( document ).ready(function() {
    // Crawl URL
    $('#url-validate').on('click', function(){
        // show loading
        $('#loading').show();
        // get entered url
        var data = $('#url-list').val().split('\n');
        // clear previous data if any
        clear(false);
        // parse url / extract all href links
        countTotal = data.length;
        // loop though each url/link and check response statuses
        data.forEach((url) => {
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
    });
});