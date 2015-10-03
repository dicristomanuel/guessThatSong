
  var songIds = [],
  	  current,
  	  count = 0,
  	  bgImage = "url(img/logo.png)",
  	  firstRound = true;

      $('div.score').hide();

  $(".cover, .album").css("background-image", bgImage);

  var pulse = setInterval(function() {
        $(".album").addClass("animated pulse-big");
        setTimeout(function() {
              $(".album").removeClass("animated pulse-big");
            },600);
      }, 2000);


function randSong() {
    if (firstRound) {
        songIds = ["866276963", "495911814", "901445412", "971648515", "502729174", "844021161",
        "701329988", "900724790", "824694388", "311254116", "714631849", "679532056", "807649741",
        "818526302", "889095296"];
        firstRound = false;
    } else if (songIds.length === 0) {
      var score = $('.count').text();
      $('score').html(score);
      $('div.score').fadeIn();
    }
    var rand = Math.floor(Math.random() * songIds.length);
		var playThis = 'http://itunes.apple.com/lookup?id=' + songIds[rand];
		current = playThis;
		songIds.splice(rand, 1);
    return playThis;
}

$('play-again').click(function() {
  $('div.score').fadeOut();
  firstRound = true;
  playSong();
});


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
          clearInterval(pulse);
					$(this).addClass("animated pulse");
					setTimeout(function() {
								$(".album").removeClass("animated pulse");
							},600);
              if(firstRound) {
                playSong();
              }
				});

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
						if(userInput === trackName) {
							count += 1;
							$(".count").html(count);
            } else {
              $("input").val("");
              $("input").addClass("animated shake");
              setTimeout(function(){
                $("input").removeClass("animated shake");
                }, 1000);
            }
								var image = $("<img>").attr("src", response.results[0].artworkUrl100);
								$(".track").html(trackName);
								$(".artist").html(artistName);

		var urlLastFm = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=82bb5e61b53c9b302c8c33bb41cf822e&artist=" + artistName + "&track=" + trackName + "&format=json";
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
	             });//ajax
  }//ifStatement
});//input.on'keypress'
