  function toggle(button) {
  if (button.value == "OFF") {
    button.value = "ON";
  } else {
    button.value = "OFF";
  }
}
const downloadLink = document.getElementById('download');
  

  const Togglebutton = document.getElementById('1');

  const handleSuccess = function(stream) {
    const options = {mimeType: 'audio/webm'};
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.addEventListener('dataavailable', function(e) {
      if (e.data.size > 0) recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', function() {
      downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
      downloadLink.download = 'Recording.wav';
    });

    function onClickEvent(e){
      if(e.target.value == "ON"){
        mediaRecorder.start();
      }
      else{
        mediaRecorder.stop();
      }
    }
    Togglebutton.addEventListener('click',onClickEvent);
  };

  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);