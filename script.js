$(function() {
  var video = $('body > video')[0];

  navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mediaDevices.getUserMedia || navigator.msGetUserMedia);

  navigator.mozGetUserMedia({
    video: !0,
    audio: !1
  }, function(stream) {
    if (navigator.mediaDevices.getUserMedia)
      video.mozSrcObject = stream;
    else {
      var vu = window.URL || window.webkitURL;
      video.src = vu.createObjectURL(stream);
    }
    video.play();
  }, function(error) {
    if (window.console)
      console.error(error);
  });

  video.addEventListener('canplay', function(ev) {
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth / width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      streaming = !0;
    }
  }, !1);
});
