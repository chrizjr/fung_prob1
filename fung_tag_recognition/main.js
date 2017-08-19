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
    
    reader.onloadend=function(){
        
    }
}

function previewFile(){
    var preview = document.getElementById("uploaded");
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    img_post(reader.result);
    pass_data = makeblob(reader.result);
}


function makeblob(dataURL){
		var base64_maker = ';base64,';
		var parts = dataURL.split(base64_maker);
		var contentType = parts[0].split(':')[1];
		var raw  = window.atob(parts[1]);
		var rawLength = raw.length;
		var uint8arr = new Uint8Array(rawLength);
		for (var i=0; i<rawLength; i++){
			uint8arr[i] = raw.charCodeAt(i);
		}
		return new Blob([uint8arr], {type:contentType});
	}
function json_parser(descriptions){
		text = document.getElementById('jsondisplay');
		display_json = feat_extract(descriptions);
		text.value = JSON.stringify(display_json, null, 4);
	}

	function feat_extract(jsonformat){
		//This is specific to ms azure
		var tags = jsonformat['description']['tags'].slice(0,3);
		var verbal_description = jsonformat['description']['captions'];
		var colors = jsonformat['color']['dominantColors'];
		var proc_json = {
			'tags':tags,
			'description': verbal_description,
			'dominant colors':colors
		}
		return proc_json
	}
	function img_post(raw_data) {
        var params = {
            // Request parameters
            "visualFeatures":'Categories, Tags, Description, Color',
            "language":'en'
        };
      
        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","a947bbe94cb342d3baecae9040362f4d");
            },
            type: "POST",
            // Request body
            data: raw_data,
            processData:false
        })
        .done(function(data) {
        	console.log(data)
            json_parser(data);
        })
    };


var accessToken = "a0e3d49509684e11a150e8afff2022e8";
var baseUrl = "https://api.api.ai/v1/";
var response_list = [];
/*
$('input').on('itemAdded', function(event) {
        event.preventDefault();
        send();
});
function send(){
    var text = $("#tags2").val();
    
*/
$("input").on("itemAdded", function(event){
    event.preventDefault();
    var text = event.item; 
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
        if($.inArray(val, response_list) == -1){
            var no_ap = val.slice(1,-1);
            var first_word = no_ap.split(" ")[0];
            var second_word = no_ap.split(" ")[1];
            $(".col_names").append("<li><b>" + first_word + "</b> " + second_word + "</li>");
            response_list.push(val);
            console.log(val);
        }

    }
})





