
  var songIds = [],
  	  current,
  	  count = 0,
  	  bgImage = "url(img/logo.png)",
  	  firstRound = true;

  $(".cover, .album").css("background-image", bgImage);

function randSong() {
    if (songIds.length === 0 && firstRound) {
        songIds = ["866276963", "611171954", "495911814", "266211028", "901445412",
        "971648515", "904803519", "358822334", "502729174", "433399764", "844021161",
        "701329988", "947115236"];
        firstRound = false;
    }
    var rand = parseInt(Math.random() * songIds.length);
		var playThis = 'http://itunes.apple.com/lookup?id=' + songIds[rand];
		current = playThis;
		songIds.splice(rand, 1);
    return playThis;
}


function playSong() {
	$.ajax({
	   url: randSong(),
	   jsonp: "callback",
	   dataType: "jsonp"
					}).done(function(response) {
						var previewTune = response.results[0].previewUrl;
						var previewField = $("#preview");
	   		previewField.attr("src", previewTune)[0].play();
	});//ajax
}//playSong

				$(".album").click(function() {
					$(this).addClass("animated pulse");
					playSong();
					setTimeout(function() {
								$(".album").removeClass("animated pulse");
							},600)
				})

$("input").on('keypress', function(evt) {
  var key = evt.which;
    if (key === 13) {
    	var userInput = $(this).val();

    	if(songIds.length === 0) {
    		//YOUR SCORE IS // GAME END
				console.log("here");
    	}

     	$.ajax({
	   url: current,
	   jsonp: "callback",
	   dataType: "jsonp"
					}).done(function(response) {
						userInput = userInput.toLowerCase();
						artistName = response.results[0].artistName.toLowerCase();
						trackName = response.results[0].trackName.toLowerCase().split(" (")[0];

						if(userInput === trackName) {
							count += 1;
							$(".count").html(count);
								var image = $("<img>").attr("src", response.results[0].artworkUrl100)
								$(".track").html(trackName);
								$(".artist").html(artistName);

		var urlLastFm = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=82bb5e61b53c9b302c8c33bb41cf822e&artist=" + artistName + "&track=" + trackName + "&format=json";
console.log(urlLastFm);
								$.ajax({
	   url: urlLastFm,
	   jsonp: "callback",
	   dataType: "jsonp"
					}).done(function(response) {
					if (response.track.album === undefined) {
						$(".cover, .album").css("background-image", bgImage);
					}
					var urlImg = response.track.album.image[3]["#text"];
						$(".cover, .album").css("background-image", "url("+urlImg+")");
	});//ajax


								   $("input").val("");
								   $(".album").addClass("animated pulse");

								setTimeout(function(){
									$(".album").removeClass("animated pulse");
  								playSong();
  							}, 1000);
						} else {
							$("input").val("");
							$("input").addClass("animated shake");
							setTimeout(function(){
								$("input").removeClass("animated shake");
  								playSong();
  							}, 1000);
						}
	});//ajax

    }//ifStatement
});//input.on'keypress'

// https://itunes.apple.com/search?term=banks+goddess
// http://itunes.apple.com/lookup?id="12312344"
// $("#audio_preview").on("canplay", function() {
//     $("#preview")[0].play();
// });

  // var url = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=MyXoToD&api_key=d1f6b457c480c640ef7b43acdb0190f2&format=json";
  // $.getJSON(url, function(data) {
  //   var artist = data.recenttracks.track[0].artist["#text"];
  //   var track = data.recenttracks.track[0]["name"];
  //   var cover = data.recenttracks.track[0].image[3]["#text"];
  //   $(".cover, .album").css("background-image", "url("+cover+")");

  // });
