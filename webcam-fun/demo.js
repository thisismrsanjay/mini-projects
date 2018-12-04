//for just video playback

function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true,audio:false })
        .then(localMediaStream=>{
            console.log(localMediaStream);
            video.srcObject=localMediaStream;
            video.play();
        })
}
getVideo();