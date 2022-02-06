var count200 = 0;
var count404 = 0;
var count500 = 0;
var count = 0;

$( document ).ready(function() {

    // Check urls
    $('#url-check').on('click', function(){
        var data = $('#url-list').val().split('\n');
        var countTotal = data.length;
        $('#uri-stats-total > span').text(countTotal);
        data.forEach((url, i) => {
            $.ajax({
                url  : url,
                type : 'POST',
                dataType: 'jsonp'
            }).done(function(xhr){
                // Set status if no error occurred
                setStatus(url, countTotal, xhr);
            }).fail(function(xhr){
                // Set status if error occurred
                setStatus(url, countTotal, xhr);
            });
        });
    });

    // Clear
    $('#url-clear').on('click', function(){
        clear();
    });
    
});

/*
Set URI's status 200/404
*/
function setStatus(url, countTotal, xhr){    
    var inputStatus;
    if(xhr.status == '200'){
        count200++;
        $('#uri-stats-200 > span').text(count200);
        inputStatus = '<span class="input-group-text text-white border-light bg-success" id="inputGroup-sizing-sm">200</span>';
    }else if(xhr.status == '404'){
        count404++;
        $('#uri-stats-404 > span').text(count404);
        inputStatus = '<span class="input-group-text text-white border-light bg-danger" id="inputGroup-sizing-sm">404</span>';
    }else{
        count500++;
        $('#uri-stats-500 > span').text(count500);
        inputStatus = '<span class="input-group-text text-white border-light bg-warning" id="inputGroup-sizing-sm">5xx</span>';
    }
    
    // append input-url
    var html =  '<div class="input-group input-group-sm mb-3">'+
                    '<div class="input-group-prepend">'+
                        inputStatus+
                    '</div>'+
                    '<input type="text" class="form-control border-light" aria-label="200" aria-describedby="inputGroup-sizing-sm" value="' + url + '">'+
                    '<div class="input-group-append">'+
                        '<span class="input-group-text border-light"><a href="' + url + '" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></span>'+
                    '</div>'
                '</div>';
    $('#url-container').append(html);

    // Set current count / total count
    count++;
    $('#uri-status > span').text(count + ' of ' + countTotal);
}

/*
 Clear
 */
function clear(){
    count = 0;
    count200 = 0;
    $('#uri-stats-200 > span').text(count200);
    count404 = 0;
    $('#uri-stats-404 > span').text(count404);
    count500 = 0;
    $('#uri-stats-500 > span').text(count500);
    $('#uri-status > span').text('Not Running');
    $('#url-list').val('');
    $('#url-container').html('');
}