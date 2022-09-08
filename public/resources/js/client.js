var count2xx = 0;
var count3xx = 0;
var count4xx = 0;
var count5xx = 0;
var countTotal = 0;
const workerStatus = {
    NotRunning: 'Not Running',
    InProgress: 'In Progress',
    Finished: 'Finished',
    Error: 'Error'
};

$( document ).ready(function() {
    // Check urls
    $('#url-check').on('click', function(){
        setStatus(workerStatus.InProgress);
        // get urls array
        var data = $('#url-list').val().split('\n');
        // send post request to endpoint
        $.ajax({
            url  : '/url_checker',
            type : 'POST',
            data: {
                urls: JSON.stringify(data)
            },
            success: function(data){
                data.forEach((elem) => {
                    printResult(elem.url, elem.codeStatus);
                });
                setStatus(workerStatus.Finished);
            }
        });
    });

    // Clear
    $('#url-clear').on('click', function(){
        clear();
    });
    
});

/*
* Set URI's status 2xx/3xx/4xx/5xx
*/
function printResult(url, codeStatus){    
    var inputStatus;
    switch(true){
        case (codeStatus >= '200' && codeStatus < '300'):
            count2xx++;
            $('#uri-stats-2xx > span').text(count2xx);
            inputStatus = '<span class="input-group-text text-white border-light bg-success" id="inputGroup-sizing-sm">'+codeStatus+'</span>';
            break;
        case (codeStatus >= '300' && codeStatus < '400'):
            count3xx++;
            $('#uri-stats-3xx > span').text(count3xx);
            inputStatus = '<span class="input-group-text text-white border-light bg-warning" id="inputGroup-sizing-sm">'+codeStatus+'</span>';
            break;
        case (codeStatus >= '400' && codeStatus < '500'):
            count4xx++;
            $('#uri-stats-4xx > span').text(count4xx);
            inputStatus = '<span class="input-group-text text-white border-light bg-warning" id="inputGroup-sizing-sm">'+codeStatus+'</span>';
            break;
        case (codeStatus >= '500'):
            count5xx++;
            $('#uri-stats-5xx > span').text(count5xx);
            inputStatus = '<span class="input-group-text text-white border-light bg-danger" id="inputGroup-sizing-sm">'+codeStatus+'</span>';
            break;
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

    // Set total count
    countTotal++;
    $('#uri-stats-total > span').text(countTotal);
}

/*
* Set current work status
*/
function setStatus(status){
    $('#uri-status > span').text(status);
    switch(status){
        case workerStatus.InProgress:
            $('.loading').show();
            break;
        case workerStatus.Finished:
            $('.loading').hide();
            break;
    }
}

/*
* Clear counters and HTML containers
*/
function clear(){
    countTotal = 0;
    count2xx = 0;
    $('#uri-stats-200 > span').text(count2xx);
    count4xx = 0;
    $('#uri-stats-404 > span').text(count4xx);
    count5xx = 0;
    $('#uri-stats-500 > span').text(count5xx);
    $('#uri-status > span').text('Not Running');
    $('#url-list').val('');
    $('#url-container').html('');
}