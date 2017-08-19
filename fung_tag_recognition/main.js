var imageLoader = document.getElementById('filePhoto');
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        $("#file_logo").hide();
        $('#uploaded').show();
        $('#uploaded').attr('src',event.target.result);
    }
    reader.readAsDataURL(e.target.files[0]);
}

var accessToken = "a0e3d49509684e11a150e8afff2022e8";
var baseUrl = "https://api.api.ai/v1/";

$('input').on('itemAdded', function(event) {
        event.preventDefault();
        send();
});
function send(){
    var text = $("#tags2").val();
    $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20170819",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers:{
            "Authorization": "Bearer" + accessToken
        },
        data: JSON.stringify({
            query: text,
            lang: "en",
            sessionId: "random"
        }),
        success: function(data) {
            setResponse(JSON.stringify(data.result.fulfillment.speech, undefined, 2));
        }
    })
    function setResponse(val){
        $(".col_names").text(val.slice(1, -1));
        console.log(val);
    }
}





