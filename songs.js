
  var songIds = [];
  var current;
  var count = 0;

function randSong() {
    if (songIds.length === 0) {
        songIds = ["866276963", "611171954", "495911814", "266211028", "901445412",
        "971648515", "904803519", "358822334", "502729174", "433399764", "844021161",
        "701329988"];
    }
    var rand = parseInt(Math.random() * songIds.length);
		var playThis = 'http://itunes.apple.com/lookup?id=' + songIds[rand]; 
		current = playThis;   
		songIds.splice(rand, 1);
    return playThis;
}
 

function playSong() {
	$("#preview").trigger("pause");
	$.ajax({
	   url: randSong(),
	   jsonp: "callback",
	   dataType: "jsonp"
					}).done(function(response) {
						var previewTune = response.results[0].previewUrl;
						var previewField = $("#preview");
	   		previewField.attr("src", previewTune).trigger("play");
	});//ajax
}//playSong

				$("#play").click(function(evt) {
					evt.preventDefault();
					playSong();
				})

$("input").on('keypress', function(evt) {
  var key = evt.which;
    if (key === 13) {
    	var userInput = $(this).val();
     	$.ajax({
	   url: current,
	   jsonp: "callback",
	   dataType: "jsonp"
					}).done(function(response) {
						userInput = userInput.toLowerCase();
						artistName = response.results[0].artistName.toLowerCase();
						trackName = response.results[0].trackName.toLowerCase().split(" (")[0];

						if(userInput === artistName || userInput === trackName) {
							count += 1;
							$("#count").html(count);
								var image = $("<img>").attr("src", response.results[0].artworkUrl100)
								console.log(response.results[0].artworkUrl100);
								$(".current").append(image);
								setTimeout(function(){
  								playSong();
  							}, 2000);
						} else {
							setTimeout(function(){
  								playSong();
  							}, 2000);
						}
	});//ajax



    }//ifStatement
});//input.on'keypress'


// https://itunes.apple.com/search?term=banks+goddess
// http://itunes.apple.com/lookup?id="12312344"