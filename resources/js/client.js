var count200 = 0;
var count404 = 0;
var count500 = 0;
var count = 0;
var countMax = 0;

$( document ).ready(function() {

    // Count total redirection pairs
    countMax = $('.uri').length;
    $('#uri-stats-total > span').text(countMax);

    // Check new URL's status
    $('.btn-check').on('click', function(){
        count = 0;
        // Set progress count
        $('#uri-status > span').text(count + ' of ' + countMax);
        // Loop though all new uri's and check statuses
        $('.uri').each(function(){
            // Find status container
            var statusElement = $(this).find('.uri-status');
            // Assembly test URL
            var url = $(this).children().val();
            // Send POST request and get statusCode
            $.ajax({
                url  : url,
                type : 'POST',
                dataType: 'jsonp'
            }).done(function(xhr){
                // Set status if no error occurred
                setStatus(statusElement, url, xhr);
            }).fail(function(xhr){
                // Set status if error occurred
                setStatus(statusElement, url, xhr);
            });
        });
    });

});

/*
Set URI's status 200/404
*/
function setStatus(statusElement, url, xhr){
    statusElement.html('<a href="' + url + '">' + xhr.status + '</a>');
    statusElement.removeClass('uri-status-500');
    statusElement.removeClass('uri-status-404');
    statusElement.removeClass('uri-status-200');
    statusElement.addClass('uri-status-' + xhr.status);
    
    if(xhr.status == '200'){
        count200++;
        $('#uri-stats-200 > span').text(count200);
    }else if(xhr.status == '404'){
        count404++;
        $('#uri-stats-404 > span').text(count404);
    }else{
        count500++;
        $('#uri-stats-500 > span').text(count500);
    }
    count++;
    $('#uri-status > span').text(count + ' of ' + countMax);
}