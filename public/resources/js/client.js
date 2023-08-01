var count2xx, count3xx, count4xx, count5xx, countTotal, crawledTotal = 0;

$( document ).ready(function() {
    // Crawl URL
    $('#url-validate').on('click', function(){
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

    // Clear
    $('#url-clear').on('click', function(){
        clear(true);
    });

    // Filter
    $('.uri-stats').on('click', function(){
        var clickedButton = $(this).text().charAt(0);
        switch(clickedButton){
            case 'T':
                $('.status').show();
                break;
            case '2':
                $('.status').hide();
                $('.status-2xx').show();
                break;
            case '3':
                $('.status').hide();
                $('.status-3xx').show();
                break;
            case '4':
                $('.status').hide();
                $('.status-4xx').show();
                break;
            case '5':
                $('.status').hide();
                $('.status-5xx').show();
                break;
        }
    });
    
});

/**
 * Set URI's status 2xx/3xx/4xx/5xx
 * @param {*} url 
 * @param {*} codeStatus 
 */
function printResult(url, codeStatus){    
    var inputStatus = `<span class="input-group-text text-white border-light bg-${codeStatus}" id="inputGroup-sizing-sm">${codeStatus}</span>`;
    switch(true){
        case (codeStatus >= '200' && codeStatus < '300'):
            count2xx++;
            codeStatus = '2xx';
            break;
        case (codeStatus >= '300' && codeStatus < '400'):
            count3xx++;
            codeStatus = '3xx';
            break;
        case (codeStatus >= '400' && codeStatus < '500'):
            count4xx++;
            codeStatus = '4xx';
            break;
        case (codeStatus >= '500'):
            count5xx++;
            codeStatus = '5xx';
            break;
    }
    crawledTotal++;
    // append input-url
    var html =  
    `<div class="input-group input-group-sm mb-3 status status-${codeStatus}">`+
        `<div class="input-group-prepend">${inputStatus}</div>`+
        `<input type="text" class="form-control shadow-none border-light" aria-label="200" aria-describedby="inputGroup-sizing-sm" value="${url}">`+
        '<div class="input-group-append">'+
            `<span class="input-group-text border-light"><a href="${url}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></span>`+
        '</div>'
    '</div>';
    $('#crawl-results').append(html);
}

/**
 * Reset/clear counters and HTML containers
 * @param {*} clearInputUrl 
 */
function clear(clearInputUrl){
    count2xx = 0;
    count3xx = 0;
    count4xx = 0;
    count5xx = 0;
    countTotal = 0;
    crawledTotal = 0;
    setCounters();
    $('#crawl-results').html('');
    if(clearInputUrl){
        $('#url').val('');
    }
}

/**
 * Set counters
 */
function setCounters(){
    $('#uri-stats-2xx > span').text(count2xx);
    $('#uri-stats-3xx > span').text(count3xx);
    $('#uri-stats-4xx > span').text(count4xx);
    $('#uri-stats-5xx > span').text(count5xx);
    $('#uri-stats-total > span').text(countTotal);
    if(crawledTotal > 0 && crawledTotal == countTotal){
        $('#loading').hide();
    }
}