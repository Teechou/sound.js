// console.log(ambisonics);

// Setup audio context and variables
var AudioContext = window.AudioContext // Default
    || window.webkitAudioContext; // Safari and old versions of Chrome
var context = new AudioContext; // Create and Initialize the Audio Context

// added resume context to handle Firefox suspension of it when new IR loaded
// see: http://stackoverflow.com/questions/32955594/web-audio-scriptnode-not-called-after-button-onclick
context.onstatechange = function() {
    if (context.state === "suspended") { context.resume(); }
}

// var soundUrl = "sounds/s1.aac";  //45s-mono.wav
//var irUrl = "IRs/aalto2016_N1.wav";

var soundUrlArr=["http://oozvvnyjf.bkt.clouddn.com/s1.wav","http://oozvvnyjf.bkt.clouddn.com/s2.wav","http://oozvvnyjf.bkt.clouddn.com/s3.wav","http://oozvvnyjf.bkt.clouddn.com/s4.wav","sounds/s5.aac",
"sounds/s6.aac"]
// var soundUrlArr=["sounds/s1.aac","sounds/s2.aac","sounds/s3.aac","sounds/s4.aac","sounds/s5.aac",
// "sounds/s6.aac"]
// var soundUrlArr=["sounds/11.mp3","sounds/22.mp3","sounds/33.mp3","sounds/44.mp3","sounds/s5.aac",
// "sounds/s6.aac"]

var soundBuffer, sound, soundBuffer1,soundBuffer2,soundBuffer3,soundBuffer4;

// initialize encoder
var encoder = new ambisonics.monoEncoder(context, 3);

 
var analyser = new ambisonics.intensityAnalyser(context);
 
var gainOut = context.createGain();

var output=new ambisonics.binDecoder(context,3);

encoder.out.connect(output.in);
output.out.connect(context.destination);

encoder.out.connect(analyser.in);

var count=0,timers,flag;
timers=setInterval(function(){
    count++;
},1000)
var oLoading=document.getElementById('loadings');
// var oAudio=document.getElementById('audio');
// var oBtn=document.getElementById('btn');

// oBtn.onclick=function(){
//     oAudio.play();
//     var audiobuffer=oAudio.currentTime;
//     console.log(audiobuffer)
// }
function loadSample(url, doAfterLoading) {
    var fetchSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
    fetchSound.open("GET", soundUrlArr[0], true); // Path to Audio File
    fetchSound.responseType = "arraybuffer"; // Read as Binary Data
    fetchSound.onload = function() {
        context.decodeAudioData(fetchSound.response, doAfterLoading, onDecodeAudioDataError);
		console.log('完成');

        var fetchSound2 = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
        fetchSound2.open("GET", soundUrlArr[1], true); // Path to Audio File
        fetchSound2.responseType = "arraybuffer"; // Read as Binary Data
        fetchSound2.onload = function() {
            context.decodeAudioData(fetchSound2.response, assignSample2SoundBuffer2, onDecodeAudioDataError);
            console.log('完成2');                

            var fetchSound3 = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
            fetchSound3.open("GET", soundUrlArr[2], true); // Path to Audio File
            fetchSound3.responseType = "arraybuffer"; // Read as Binary Data
            fetchSound3.onload = function() {
                context.decodeAudioData(fetchSound3.response, assignSample2SoundBuffer3, onDecodeAudioDataError);
                console.log('完成3');  

                var fetchSound4 = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
                fetchSound4.open("GET", soundUrlArr[3], true); // Path to Audio File
                fetchSound4.responseType = "arraybuffer"; // Read as Binary Data
                fetchSound4.onload = function() {
                    context.decodeAudioData(fetchSound4.response, assignSample2SoundBuffer4, onDecodeAudioDataError);
                    console.log('完成4');                
                }
                fetchSound4.send();

            }
            fetchSound3.send();

        }
        fetchSound2.send();
       
    }
    fetchSound.send();
}

var assignSample2SoundBuffer = function(decodedBuffer) {
        var  buffer1 =decodedBuffer.getChannelData(0);  
         var  oduration=decodedBuffer.duration;
         var framecount=(oduration/16)*context.sampleRate;//context.sampleRate*24.0;
         var channels=16;
         var  myArrayBuffer=context.createBuffer(4, framecount,context.sampleRate);    
        var i=0;
         for (var channel = 0; channel < channels; channel++) 
            {
                 
                 if(channel%4==0)
                    {
                      var nowBuffering =  myArrayBuffer.getChannelData(channel/4);
                      for( var i=0;i<=buffer1.length/16;i++)   //Êý¾Ý³¤¶ÈÎªbuffer>length£¬
                         {
                            nowBuffering[i]=buffer1[i*16+channel]; 
                          }
                    }
           }
        soundBuffer1 = myArrayBuffer;
      
		//soundBuffer1=decodedBuffer;
        console.log(soundBuffer1.duration)

		 if(count>1&&paused==true&&flag==true)
        {
            clearInterval(timers);
            //alert("The 3D sound has been loaded. You can click the play button to play it");
			oLoading.style.display='none';
        }
    }
    var assignSample2SoundBuffer2 = function(decodedBuffer) {
         var  buffer1 =decodedBuffer.getChannelData(0);  
         var  oduration=decodedBuffer.duration;
         var framecount=(oduration/16)*context.sampleRate;//context.sampleRate*24.0;
         var channels=16;
         var  myArrayBuffer2=context.createBuffer(4, framecount,context.sampleRate);    
        var i=0;
         for (var channel = 0; channel < channels; channel++) 
            {
                 
                 if(channel%4==0)
                    {
                      var nowBuffering =  myArrayBuffer2.getChannelData(channel/4);
                      for( var i=0;i<=buffer1.length/16;i++)   //Êý¾Ý³¤¶ÈÎªbuffer>length£¬
                         {
                            nowBuffering[i]=buffer1[i*16+channel]; 
                          }
                    }
           }
        soundBuffer2 = myArrayBuffer2;
        console.log(soundBuffer2.duration);
        oLoading.style.display='none';
          // var  buffer5=myArrayBuffer.getChannelData(4);
        //soundBuffer2=decodedBuffer;
    }
    var assignSample2SoundBuffer3 = function(decodedBuffer) {
          var  buffer1 =decodedBuffer.getChannelData(0);  
               var  oduration=decodedBuffer.duration;
               var framecount=(oduration/16)*context.sampleRate;//context.sampleRate*24.0;
               var channels=16;
               var  myArrayBuffer3=context.createBuffer(4, framecount,context.sampleRate);    
              var i=0;
               for (var channel = 0; channel < channels; channel++) 
                  {
                       
                       if(channel%4==0)
                          {
                            var nowBuffering =  myArrayBuffer3.getChannelData(channel/4);
                            for( var i=0;i<=buffer1.length/16;i++)   //Êý¾Ý³¤¶ÈÎªbuffer>length£¬
                               {
                                  nowBuffering[i]=buffer1[i*16+channel]; 
                                }
                          }
                 }
            soundBuffer3 = myArrayBuffer3;
            console.log(soundBuffer3.duration);
            oLoading.style.display='none';
          // var  buffer5=myArrayBuffer.getChannelData(4);
        // soundBuffer3=decodedBuffer;
    }
    var assignSample2SoundBuffer4 = function(decodedBuffer) {
         var  buffer1 =decodedBuffer.getChannelData(0);  
         var  oduration=decodedBuffer.duration;
         var framecount=(oduration/16)*context.sampleRate;//context.sampleRate*24.0;
         var channels=16;
         var  myArrayBuffer4=context.createBuffer(4, framecount,context.sampleRate);    
        var i=0;
         for (var channel = 0; channel < channels; channel++) 
            {
                 
                 if(channel%4==0)
                    {
                      var nowBuffering =  myArrayBuffer4.getChannelData(channel/4);
                      for( var i=0;i<=buffer1.length/16;i++)   //Êý¾Ý³¤¶ÈÎªbuffer>length£¬
                         {
                            nowBuffering[i]=buffer1[i*16+channel]; 
                          }
                    }
           }
        soundBuffer4 = myArrayBuffer4;
        console.log(soundBuffer4.duration);
        oLoading.style.display='none';
          // var  buffer5=myArrayBuffer.getChannelData(4);
        // soundBuffer4=decodedBuffer;
    }

// assignSample2SoundBuffer();
 //*************************************************************************//

var assignSample2Filters = function(decodedBuffer) {
  
}

// load and assign samples
loadSample(soundUrlArr, assignSample2SoundBuffer);
//loadSample(irUrl, assignSample2Filters);

//soundBuffer=soundBuffer1;
// Define mouse drag on spatial map .png local impact

function mouseActionLocal(angleXY) {
    encoder.azim = angleXY[0];
    encoder.elev = angleXY[1];
    encoder.updateGains();
}
   
    var i=0;
    var startedAt;
    var pausedAt;
    var paused=true;
    var browser=window.navigator.userAgent;
    //alert(browser);
    //改变声音大小
    function changeVolume(volumeBarPoint){
    	var vValue=volumeBarPoint;
    	gainOut.gain.value=vValue;
    	console.log(vValue);
    }
    //声音调到最大
    function volumeMax(){
    	gainOut.gain.value=1;
    }
    //声音调至最小
    function volumeMin(){
    	gainOut.gain.value=0;
    	//alert('min');
    }
    var timer;
    var krpano=document.getElementById('krpanoSWFObject');
    function playToggles(seek){
    		//i++;  i%2!=0&&
    		//alert(paused);
            console.log(paused);
    		if(paused){    			

    		    sound = context.createBufferSource();
                console.log('播放');
    		    if(soundBuffer1 == undefined){
    		    	flag=true;
    		    	alert('Please pause for a moment and then play! ');
    		    	krpano.call(' plugin[video].pause(); plugin[video].seek(0); ');
					oLoading.style.display='block';
    		    }else if(seek<soundBuffer1.duration){
                        console.log('缓冲1');
                        oLoading.style.display='none';
                        krpano.call(' plugin[video].play(); ');
                        paused = false;
                        //paused = false;
                        clearInterval(timer);
                        // console.log(soundBuffer1.duration);
                        // console.log(soundBuffer2);
                        sound.buffer = soundBuffer1;
                        sound.loop = true;
                        sound.connect(encoder.in);
                        sound.start(seek); 
                        // if (pausedAt) {
                        //     startedAt = Date.now() - pausedAt;
                        //     sound.start(0, pausedAt / 1000);
                        // }
                        // else {
                        //     startedAt = Date.now();
                        //     sound.start(0);           
                        // }
    		    }else if(seek<soundBuffer2.duration+soundBuffer1.duration){
                        //if(soundBuffer2){
                            krpano.call(' plugin[video].play(); ');
                            console.log('缓冲2');
                            sound = context.createBufferSource();
                            paused = false;
                            sound.buffer = soundBuffer2;
                            sound.loop = true;
                            sound.connect(encoder.in);
                            sound.start(seek-soundBuffer1.duration); 
                        // }else{
                        //     krpano.call(' plugin[video].pause(); ');
                        //     oLoading.style.display='block';
                        // }
                        
                        // if (pausedAt) {
                        //     startedAt = Date.now() - pausedAt;
                        //     sound.start(0, seek-soundBuffer1.duration);
                        // }
                        // else {
                        //     startedAt = Date.now();
                        //     sound.start(0);           
                        // }  
                }else if(seek<soundBuffer2.duration+soundBuffer1.duration+soundBuffer3.duration){
                            krpano.call(' plugin[video].play(); ');
                        //if(soundBuffer3){
                            console.log('缓冲3');
                            sound = context.createBufferSource();
                            paused = false;
                            sound.buffer = soundBuffer3;
                            sound.loop = true;
                            sound.connect(encoder.in);
                            sound.start(0, seek-soundBuffer1.duration-soundBuffer2.duration);
                        // }else{
                        //     krpano.call(' plugin[video].pause(); ');
                        //     oLoading.style.display='block';
                        // }
                        
                        // if (pausedAt) {
                        //     startedAt = Date.now() - pausedAt;
                        //     sound.start(0, seek-soundBuffer1.duration-soundBuffer2.duration);
                        // }
                        // else {
                        //     startedAt = Date.now();
                        //     sound.start(0);           
                        // }
                }else if(seek<soundBuffer2.duration+soundBuffer1.duration+soundBuffer4.duration+soundBuffer3.duration){
                        //if(soundBuffer4){
                            krpano.call(' plugin[video].play(); ');
                            console.log('缓冲4');
                            sound = context.createBufferSource();
                            paused = false;
                            sound.buffer = soundBuffer4;
                            sound.loop = true;
                            sound.connect(encoder.in);
                            sound.start(0, seek-soundBuffer1.duration-soundBuffer2.duration-soundBuffer3.duration);
                        // }else{
                        //     krpano.call(' plugin[video].pause();');
                        //     oLoading.style.display='block';
                        // }
                        
                        // if (pausedAt) {
                        //     startedAt = Date.now() - pausedAt;
                        //     sound.start(0, seek-soundBuffer1.duration-soundBuffer2.duration-soundBuffer3.duration);
                        // }
                        // else {
                        //     startedAt = Date.now();
                        //     sound.start(0);           
                        // }
                }
    	
    		}
			else {
                krpano.call(' plugin[video].pause(); ');
				paused = true;
                sound.stop(0);
				// if(startedAt){
				// 	sound.stop(0);
				// 	pausedAt = Date.now() - startedAt;    
				// }
    		      
    		}
    }
    
    
    function getPauseAt(pausePoint,totalTime){
        var second=pausePoint.toFixed(3);
        pausedAt=second*1000;
        var t1=pausedAt;
        setInterval(function(){
        	 t2=pausedAt;
        },1000)
        var gap=Math.abs(t1-t2);
        // if(pausePoint>=totalTime){
        // 	paused=true;
        // }
        //console.log(second,pausedAt,gap);
        if(browser.toLowerCase().indexOf("mobile")>0){
            // console.log("pausePoint:"+pausePoint+',totalTime:'+totalTime+'paused:'+paused)

        	// if((pausePoint>=totalTime)){
	        // 	sound.stop(0);
	        // 	//alert('停止了'+gap);
	        // }else 
            if(!paused){
	        	
                    sound.stop(0);
                    sound = context.createBufferSource();  
                    if(pausePoint<=soundBuffer1.duration)
                    {
                        sound.buffer = soundBuffer1;
                        sound.loop = true;
                        paused = false;
                        sound.connect(encoder.in);
                        sound.start(0, pausedAt / 1000);
                        if(pausePoint>=soundBuffer1.duration-1)
                        {
                            if(soundBuffer2 == undefined){
                                krpano.call(' plugin[video].pause(); ');
                                oLoading.style.display='block';
                                paused=true;
                                sound.stop(0);
                                console.log('unnnn')
                            }
                        }
                        
                        // if (pausedAt) {
                        //     startedAt = Date.now() - pausedAt;
                        //     sound.start(0, pausedAt / 1000);            
                        // }
                        // else {
                        //     startedAt = Date.now();
                        //     sound.start(0);
                        // } 
                        console.log(111);
                    }else if(pausePoint<=(soundBuffer1.duration+soundBuffer2.duration)){
                        // sound.stop(0);
                        //paused=false;
                        sound = context.createBufferSource();
                        sound.buffer = soundBuffer2;
                        console.log(222);
                        sound.loop = true;
                        paused = false;
                        sound.connect(encoder.in);
                        sound.start(0, pausedAt / 1000-soundBuffer1.duration); 
                        // console.log(pausePoint+'..')
                        // console.log(soundBuffer1.duration+soundBuffer2.duration)
                        if(pausePoint>=(soundBuffer1.duration+soundBuffer2.duration-1))
                        {
                            console.log('执行3未加载')
                            if(soundBuffer3 == undefined){
                                console.log('执行')
                                krpano.call(' plugin[video].pause(); ');
                                oLoading.style.display='block';
                                paused=true;
                                sound.stop(0);
                                console.log('unnnn')
                            }
                        }
                        // if (pausedAt) {
                        //     startedAt = Date.now() - pausedAt;
                        //     console.log(pausedAt / 1000-soundBuffer1.duration+'duration')
                        //     sound.start(0, pausedAt / 1000-soundBuffer1.duration);            
                        // }
                        // else {
                        //     startedAt = Date.now();
                        //     sound.start(0);
                        // } 
                    }else if(pausePoint<=(soundBuffer1.duration+soundBuffer2.duration+soundBuffer3.duration)){
                        sound = context.createBufferSource();
                        sound.buffer = soundBuffer3;
                        console.log(333);
                        sound.loop = true;
                        paused = false;
                        sound.connect(encoder.in);
                        sound.start(0, pausedAt / 1000-soundBuffer1.duration-soundBuffer2.duration);  
                        if(pausePoint>=(soundBuffer1.duration+soundBuffer2.duration+soundBuffer3.duration-1))
                        {
                            console.log('执行4未加载')
                            if(soundBuffer4 == undefined){
                                krpano.call(' plugin[video].pause(); ');
                                oLoading.style.display='block';
                                paused=true;
                                sound.stop(0);
                                console.log('unnnn')
                            }
                        }
                        // if (pausedAt) {
                        //     //startedAt = Date.now() - pausedAt;
                        //     console.log(pausedAt / 1000-soundBuffer1.duration-soundBuffer2.duration+'dd')
                        //     sound.start(0, pausedAt / 1000-soundBuffer1.duration-soundBuffer2.duration);            
                        // }
                        // else {
                        //     //startedAt = Date.now();
                        //     sound.start(0);
                        // }
                    }else if(pausePoint<=(soundBuffer1.duration+soundBuffer2.duration+soundBuffer3.duration+soundBuffer4.duration)){
                        if(pausePoint>=totalTime)
                        {
                            sound.stop(0);
                        }
                        sound = context.createBufferSource();
                        sound.buffer = soundBuffer4;
                        sound.loop = true;
                        paused = false;
                        sound.connect(encoder.in);
                        sound.start(0, pausedAt / 1000-soundBuffer1.duration-soundBuffer2.duration-soundBuffer3.duration); 
                        // if (pausedAt) {
                        //     //startedAt = Date.now() - pausedAt;
                        //     sound.start(0, pausedAt / 1000-soundBuffer1.duration-soundBuffer2.duration-soundBuffer3.duration);            
                        // }
                        // else {
                        //     //startedAt = Date.now();
                        //     sound.start(0);
                        // }
                    }
	        }
        }
        else{
            // console.log("pausePoint:"+pausePoint+','+"totalTime:"+totalTime)
	        //如果播放到最后或者一秒间隔播放时长小于500毫秒停止音乐
	        if((pausePoint>=totalTime)||gap<500){
	        	sound.stop(0);
	        }else if(!paused){
	        	
	        	    sound.stop(0);
	        	    sound = context.createBufferSource();
                    if(pausePoint<soundBuffer1.duration)
                    {
                        sound.buffer = soundBuffer1;
                        sound.loop = true;
                        paused = false;
                        sound.connect(encoder.in);
                        sound.start(0, pausedAt / 1000);  
                        // console.log(pausePoint+',,,'+soundBuffer1.duration)
                        if(pausePoint>=soundBuffer1.duration-1)
                        {
                            if(soundBuffer2 == undefined){
                                krpano.call(' plugin[video].pause(); ');
                                oLoading.style.display='block';
                                paused=true;
                                sound.stop(0);
                                console.log('unnnn');

                            }
                        }
                        // if (pausedAt) {
                        //     //startedAt = Date.now() - pausedAt;
                        //     sound.start(0, pausedAt / 1000);            
                        // }
                        // else {
                        //     //startedAt = Date.now();
                        //     sound.start(0);
                        // } 
                        console.log(111);
                    }else if(pausePoint<(soundBuffer1.duration+soundBuffer2.duration)){
                        // sound.stop(0);
                        //paused=false;
                        sound = context.createBufferSource();
                        sound.buffer = soundBuffer2;
                        console.log('222');
                        sound.loop = true;
                        paused = false;
                        sound.connect(encoder.in);
                        sound.start(0, pausedAt / 1000-soundBuffer1.duration);   
                        console.log(pausePoint+'..')
                        console.log(soundBuffer1.duration+soundBuffer2.duration)
                        if(pausePoint>=(soundBuffer1.duration+soundBuffer2.duration-1))
                        {
                            if(!soundBuffer3){
                                krpano.call(' plugin[video].pause(); ');
                                oLoading.style.display='block';
                                paused=true;
                                sound.stop(0);
                                console.log('unnnn');

                            }
                        }
                        // if (pausedAt) {
                        //     //startedAt = Date.now() - pausedAt;
                        //     console.log(pausedAt / 1000-soundBuffer1.duration+'duration')
                        //     sound.start(0, pausedAt / 1000-soundBuffer1.duration);            
                        // }
                        // else {
                        //     //startedAt = Date.now();
                        //     sound.start(0);
                        // } 
                    }else if(pausePoint<(soundBuffer1.duration+soundBuffer2.duration+soundBuffer3.duration)){
                        sound = context.createBufferSource();
                        sound.buffer = soundBuffer3;
                        console.log('333');
                        sound.loop = true;
                        paused = false;
                        sound.connect(encoder.in);
                        sound.start(0, pausedAt / 1000-soundBuffer1.duration-soundBuffer2.duration);
                        console.log(pausePoint+',,,'+soundBuffer1.duration+soundBuffer2.duration+soundBuffer3.duration);
                        if(pausePoint>=(soundBuffer1.duration+soundBuffer2.duration+soundBuffer3.duration-1))
                        {
                            
                            if(soundBuffer4 == undefined){
                                krpano.call(' plugin[video].pause(); ');
                                oLoading.style.display='block';
                                paused=true;
                                sound.stop(0);
                            }
                        }
                        // if (pausedAt) {
                        //     //startedAt = Date.now() - pausedAt;
                        //     console.log(pausedAt / 1000-soundBuffer1.duration-soundBuffer2.duration+'dd')
                        //     sound.start(0, pausedAt / 1000-soundBuffer1.duration-soundBuffer2.duration);            
                        // }
                        // else {
                        //     //startedAt = Date.now();
                        //     sound.start(0);
                        // }
                    }else{
                        // if(pausePoint>=totalTime){
                        //     sound.stop(0);
                        //     console.log('执行')
                        // }
                        
                        sound = context.createBufferSource();
                        sound.buffer = soundBuffer4;
                        // console.log(soundBuffer4.duration);
                        sound.loop = true;
                        paused = false;
                        sound.connect(encoder.in);
                        sound.start(0, pausedAt / 1000-soundBuffer1.duration-soundBuffer2.duration-soundBuffer3.duration); 
                        // if (pausedAt) {
                        //     //startedAt = Date.now() - pausedAt;
                        //     sound.start(0, pausedAt / 1000-soundBuffer1.duration-soundBuffer2.duration-soundBuffer3.duration);            
                        // }
                        // else {
                        //     //startedAt = Date.now();
                        //     sound.start(0);
                        // }
                    }
	        
	        }
        }
    }

    function onDecodeAudioDataError(error) {
        var url = 'hjre';
      alert("Browser cannot decode audio data..." + "\n\nError: " + error + "\n\n(If you re using Safari and get a null error, this is most likely due to Apple's shady plan going on to stop the .ogg format from easing web developer's life :)");
    }