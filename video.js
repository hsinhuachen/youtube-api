$(function(){
  $(".playBtnOuter").on('click', function(event) {
    event.preventDefault();
    
    $("#playerWrap").removeClass('hide');
    $("#playerImg").addClass('hide');
    player.playVideo();
  });
})

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  var getURL = $("#playerImg").find(".playBtnOuter").attr("href");
  var videoID = getYoutubeID(getURL);
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: videoID,
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if(event.data == YT.PlayerState.ENDED){
    $("#playerWrap").addClass('hide');
    $("#playerImg").removeClass('hide');
  }
}

function stopVideo() {
  player.stopVideo();
}

function getYoutubeID(url){
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}
