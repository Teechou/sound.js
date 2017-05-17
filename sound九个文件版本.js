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

var soundUrlArr=["http://musicfiles.oss-cn-shenzhen.aliyuncs.com/1.wav","http://musicfiles.oss-cn-shenzhen.aliyuncs.com/2.wav","http://musicfiles.oss-cn-shenzhen.aliyuncs.com/3.wav","http://musicfiles.oss-cn-shenzhen.aliyuncs.com/4.wav",
              "http://musicfiles.oss-cn-shenzhen.aliyuncs.com/5.wav","http://musicfiles.oss-cn-shenzhen.aliyuncs.com/6.wav","http://musicfiles.oss-cn-shenzhen.aliyuncs.com/7.wav","http://musicfiles.oss-cn-shenzhen.aliyuncs.com/8.wav","http://musicfiles.oss-cn-shenzhen.aliyuncs.com/9.wav"]

// var soundUrlArr=["sounds/1.wav","sounds/2.wav","sounds/3.wav","sounds/4.wav","sounds/5.wav",
// "sounds/6.wav","sounds/7.wav","sounds/8.wav","sounds/9.wav"]

var soundBuffer, sound, soundBuffer1,soundBuffer2,soundBuffer3,soundBuffer4, soundBuffer5,soundBuffer6,
    soundBuffer7,soundBuffer8,soundBuffer9,drt1,drt2,drt3,drt4,drt5,drt6,drt7,drt8,drt9;

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
function loadSample(url, doAfterLoading) {
    var fetchSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
    fetchSound.open("GET", url[0], true); // Path to Audio File
    fetchSound.responseType = "arraybuffer"; // Read as Binary Data
    fetchSound.onload = function() {
        context.decodeAudioData(fetchSound.response, doAfterLoading, onDecodeAudioDataError);
		console.log('完成');

        var fetchSound2 = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
        fetchSound2.open("GET", url[1], true); // Path to Audio File
        fetchSound2.responseType = "arraybuffer"; // Read as Binary Data
        fetchSound2.onload = function() {
            context.decodeAudioData(fetchSound2.response, assignSample2SoundBuffer2, onDecodeAudioDataError);
            console.log('完成2');                

            var fetchSound3 = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
            fetchSound3.open("GET", url[2], true); // Path to Audio File
            fetchSound3.responseType = "arraybuffer"; // Read as Binary Data
            fetchSound3.onload = function() {
                context.decodeAudioData(fetchSound3.response, assignSample2SoundBuffer3, onDecodeAudioDataError);
                console.log('完成3');  

                var fetchSound4 = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
                fetchSound4.open("GET", url[3], true); // Path to Audio File
                fetchSound4.responseType = "arraybuffer"; // Read as Binary Data
                fetchSound4.onload = function() {
                    context.decodeAudioData(fetchSound4.response, assignSample2SoundBuffer4, onDecodeAudioDataError);
                    console.log('完成4');  

                    var fetchSound5 = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
                    fetchSound5.open("GET", url[4], true); // Path to Audio File
                    fetchSound5.responseType = "arraybuffer"; // Read as Binary Data
                    fetchSound5.onload = function() {
                        context.decodeAudioData(fetchSound5.response, assignSample2SoundBuffer5, onDecodeAudioDataError);
                        console.log('完成5');  

                        var fetchSound6 = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
                        fetchSound6.open("GET", url[5], true); // Path to Audio File
                        fetchSound6.responseType = "arraybuffer"; // Read as Binary Data
                        fetchSound6.onload = function() {
                            context.decodeAudioData(fetchSound6.response, assignSample2SoundBuffer6, onDecodeAudioDataError);
                            console.log('完成6');  

                            var fetchSound7 = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
                            fetchSound7.open("GET", url[6], true); // Path to Audio File
                            fetchSound7.responseType = "arraybuffer"; // Read as Binary Data
                            fetchSound7.onload = function() {
                                context.decodeAudioData(fetchSound7.response, assignSample2SoundBuffer7, onDecodeAudioDataError);
                                console.log('完成7'); 

                                var fetchSound8 = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
                                fetchSound8.open("GET", url[7], true); // Path to Audio File
                                fetchSound8.responseType = "arraybuffer"; // Read as Binary Data
                                fetchSound8.onload = function() {
                                    context.decodeAudioData(fetchSound8.response, assignSample2SoundBuffer8, onDecodeAudioDataError);
                                    console.log('完成8');    

                                    var fetchSound9 = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
                                    fetchSound9.open("GET", url[8], true); // Path to Audio File
                                    fetchSound9.responseType = "arraybuffer"; // Read as Binary Data
                                    fetchSound9.onload = function() {
                                        context.decodeAudioData(fetchSound9.response, assignSample2SoundBuffer9, onDecodeAudioDataError);
                                        console.log('完成9');    

                                        
                                                    
                                    }
                                    fetchSound9.send();

                                }
                                fetchSound8.send();

                            }
                            fetchSound7.send();

                        }
                        fetchSound6.send();

                    }
                    fetchSound5.send();

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
        drt1=soundBuffer1.duration;
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
        drt2=soundBuffer2.duration;
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
            drt3=soundBuffer3.duration;
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
        drt4=soundBuffer4.duration;
        console.log(soundBuffer4.duration);
        oLoading.style.display='none';
    }
    var assignSample2SoundBuffer5 = function(decodedBuffer) {
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
        soundBuffer5 = myArrayBuffer4;
        drt5=soundBuffer5.duration;
        console.log(soundBuffer5.duration);
        oLoading.style.display='none';
    }
    var assignSample2SoundBuffer6 = function(decodedBuffer) {
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
        soundBuffer6 = myArrayBuffer4;
        drt6=soundBuffer6.duration;
        console.log(soundBuffer6.duration);
        oLoading.style.display='none';
    }
    var assignSample2SoundBuffer7 = function(decodedBuffer) {
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
        soundBuffer7 = myArrayBuffer4;
        drt7=soundBuffer7.duration;
        console.log(soundBuffer7.duration);
        oLoading.style.display='none';
    }
    var assignSample2SoundBuffer8 = function(decodedBuffer) {
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
        soundBuffer8 = myArrayBuffer4;
        drt8=soundBuffer8.duration;
        console.log(soundBuffer8.duration);
        oLoading.style.display='none';
    }
    var assignSample2SoundBuffer9 = function(decodedBuffer) {
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
        soundBuffer9 = myArrayBuffer4;
        drt9=soundBuffer9.duration;
        console.log(soundBuffer9.duration);
        oLoading.style.display='none';
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
            console.log(paused);
            if(oLoading.style.display=='block'){
                krpano.call(' plugin[video].pause(); '); 
            }else{
                krpano.call(' plugin[video].play(); ');
            }
    		if(paused){    			

    		    sound = context.createBufferSource();
                console.log('播放');
    		    if(soundBuffer1 == undefined){
    		    	flag=true;
    		    	alert('Please pause for a moment and then play! ');
    		    	krpano.call(' plugin[video].pause(); plugin[video].seek(0); ');
					oLoading.style.display='block';
    		    }else if(seek<drt1){
                        console.log('缓冲1');
                        oLoading.style.display='none';
                        krpano.call(' plugin[video].play(); ');
                        paused = false;
                        clearInterval(timer);
                        sound.buffer = soundBuffer1;
                        sound.loop = true;
                        sound.connect(encoder.in);
                        sound.start(seek); 
                        
    		    }else if(seek<drt1+drt2){
                            krpano.call(' plugin[video].play(); ');
                            console.log('缓冲2');
                            sound = context.createBufferSource();
                            paused = false;
                            sound.buffer = soundBuffer2;
                            sound.loop = true;
                            sound.connect(encoder.in);
                            sound.start(seek-drt1); 
                       
                }else if(seek<drt1+drt2+drt3){
                            krpano.call(' plugin[video].play(); ');
                            console.log('缓冲3');
                            sound = context.createBufferSource();
                            paused = false;
                            sound.buffer = soundBuffer3;
                            sound.loop = true;
                            sound.connect(encoder.in);
                            sound.start(0, seek-drt1-drt2);
                      
                }else if(seek<drt1+drt2+drt3+drt4){
                        //if(soundBuffer4){
                            krpano.call(' plugin[video].play(); ');
                            console.log('缓冲4');
                            sound = context.createBufferSource();
                            paused = false;
                            sound.buffer = soundBuffer4;
                            sound.loop = true;
                            sound.connect(encoder.in);
                            sound.start(0, seek-drt1-drt2-drt3);
                }else if(seek<drt1+drt2+drt3+drt4+drt5){
                        //if(soundBuffer4){
                            krpano.call(' plugin[video].play(); ');
                            console.log('缓冲5');
                            sound = context.createBufferSource();
                            paused = false;
                            sound.buffer = soundBuffer5;
                            sound.loop = true;
                            sound.connect(encoder.in);
                            sound.start(0, seek-drt1-drt2-drt3-drt4);
                }else if(seek<drt1+drt2+drt3+drt4+drt5+drt6){
                        //if(soundBuffer4){
                            krpano.call(' plugin[video].play(); ');
                            console.log('缓冲6');
                            sound = context.createBufferSource();
                            paused = false;
                            sound.buffer = soundBuffer6;
                            sound.loop = true;
                            sound.connect(encoder.in);
                            sound.start(0, seek-drt1-drt2-drt3-drt4-drt5);
                }else if(seek<drt1+drt2+drt3+drt4+drt5+drt6+drt7){
                        //if(soundBuffer4){
                            krpano.call(' plugin[video].play(); ');
                            console.log('缓冲7');
                            sound = context.createBufferSource();
                            paused = false;
                            sound.buffer = soundBuffer7;
                            sound.loop = true;
                            sound.connect(encoder.in);
                            sound.start(0, seek-drt1-drt2-drt3-drt4-drt5-drt6);
                }else if(seek<drt1+drt2+drt3+drt4+drt5+drt6+drt7+drt8){
                        //if(soundBuffer4){
                            krpano.call(' plugin[video].play(); ');
                            console.log('缓冲8');
                            sound = context.createBufferSource();
                            paused = false;
                            sound.buffer = soundBuffer8;
                            sound.loop = true;
                            sound.connect(encoder.in);
                            sound.start(0, seek-drt1-drt2-drt3-drt4-drt5-drt6-drt7);
                }else if(seek<drt1+drt2+drt3+drt4+drt5+drt6+drt7+drt8+drt9){
                        //if(soundBuffer4){
                            krpano.call(' plugin[video].play(); ');
                            console.log('缓冲9');
                            sound = context.createBufferSource();
                            paused = false;
                            sound.buffer = soundBuffer9;
                            sound.loop = true;
                            sound.connect(encoder.in);
                            sound.start(0, seek-drt1-drt2-drt3-drt4-drt5-drt6-drt7-drt8);
                }
    	
    		}
			else {
                krpano.call(' plugin[video].pause(); ');
				paused = true;
                sound.stop(0);
    		}
    }
    
    // getPause里面要调用的
    

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
        function keepPlay(){
            sound.stop(0);
            sound = context.createBufferSource();  
            if(pausePoint<=soundBuffer1.duration)
            {
                sound.buffer = soundBuffer1;
                sound.loop = true;
                paused = false;
                sound.connect(encoder.in);
                sound.start(0, pausedAt / 1000);
                if(pausePoint>=drt1-1)
                {
                    if(soundBuffer2 == undefined){
                        krpano.call(' plugin[video].pause(); ');
                        oLoading.style.display='block';
                        paused=true;
                        sound.stop(0);
                        console.log('unnnn')
                    }
                }
                console.log(111);
            }else if(pausePoint<=(drt1+drt2)){
                // sound.stop(0);
                //paused=false;
                sound = context.createBufferSource();
                sound.buffer = soundBuffer2;
                console.log(222);
                sound.loop = true;
                paused = false;
                sound.connect(encoder.in);
                sound.start(0, pausedAt / 1000-drt1); 
                // console.log(pausePoint+'..')
                // console.log(soundBuffer1.duration+soundBuffer2.duration)
                if(pausePoint>=(drt1+drt2-1))
                {
                    // console.log('执行3未加载')
                    if(soundBuffer3 == undefined){
                        // console.log('执行')
                        krpano.call(' plugin[video].pause(); ');
                        oLoading.style.display='block';
                        paused=true;
                        sound.stop(0);
                        // console.log('unnnn')
                    }
                }
                
            }else if(pausePoint<=(drt1+drt2+drt3)){
                sound = context.createBufferSource();
                sound.buffer = soundBuffer3;
                console.log(333);
                sound.loop = true;
                paused = false;
                sound.connect(encoder.in);
                sound.start(0, pausedAt / 1000-drt1-drt2);  
                if(pausePoint>=(drt1+drt2+drt3-1))
                {
                    // console.log('执行4未加载')
                    if(soundBuffer4 == undefined){
                        krpano.call(' plugin[video].pause(); ');
                        oLoading.style.display='block';
                        paused=true;
                        sound.stop(0);
                        // console.log('unnnn')
                    }
                }
               
            }else if(pausePoint<(drt1+drt2+drt3+drt4)){
                sound = context.createBufferSource();
                sound.buffer = soundBuffer4;
                console.log(444);
                sound.loop = true;
                paused = false;
                sound.connect(encoder.in);
                sound.start(0, pausedAt / 1000-drt1-drt2-drt3); 
                if(pausePoint>=(drt1+drt2+drt3+drt4-1))
                {
                    if(soundBuffer5 == undefined){
                        krpano.call(' plugin[video].pause(); ');
                        oLoading.style.display='block';
                        paused=true;
                        sound.stop(0);
                    }
                }
                
            }else if(pausePoint<(drt1+drt2+drt3+drt4+drt5)){
                sound = context.createBufferSource();
                sound.buffer = soundBuffer5;
                console.log(555);
                sound.loop = true;
                paused = false;
                sound.connect(encoder.in);
                sound.start(0, pausedAt / 1000-drt1-drt2-drt3-drt4); 
                if(pausePoint>=(drt1+drt2+drt3+drt4+drt5-1))
                {
                    if(soundBuffer6 == undefined){
                        krpano.call(' plugin[video].pause(); ');
                        oLoading.style.display='block';
                        paused=true;
                        sound.stop(0);
                    }
                }
                
            }else if(pausePoint<(drt1+drt2+drt3+drt4+drt5+drt6)){
                sound = context.createBufferSource();
                sound.buffer = soundBuffer6;
                console.log(666);
                sound.loop = true;
                paused = false;
                sound.connect(encoder.in);
                sound.start(0, pausedAt / 1000-drt1-drt2-drt3-drt4-drt5); 
                if(pausePoint>=(drt1+drt2+drt3+drt4+drt5+drt6-1))
                {
                    if(soundBuffer7 == undefined){
                        krpano.call(' plugin[video].pause(); ');
                        oLoading.style.display='block';
                        paused=true;
                        sound.stop(0);
                    }
                }
                
            }else if(pausePoint<(drt1+drt2+drt3+drt4+drt5+drt6+drt7)){
                sound = context.createBufferSource();
                sound.buffer = soundBuffer7;
                console.log(777);
                sound.loop = true;
                paused = false;
                sound.connect(encoder.in);
                sound.start(0, pausedAt / 1000-drt1-drt2-drt3-drt4-drt5-drt6); 
                if(pausePoint>=(drt1+drt2+drt3+drt4+drt5+drt6+drt7-1))
                {
                    if(soundBuffer8 == undefined){
                        krpano.call(' plugin[video].pause(); ');
                        oLoading.style.display='block';
                        paused=true;
                        sound.stop(0);
                    }
                }
                
            }else if(pausePoint<(drt1+drt2+drt3+drt4+drt5+drt6+drt7+drt8)){
                sound = context.createBufferSource();
                sound.buffer = soundBuffer8;
                console.log(888);
                sound.loop = true;
                paused = false;
                sound.connect(encoder.in);
                sound.start(0, pausedAt / 1000-drt1-drt2-drt3-drt4-drt5-drt6-drt7); 
                if(pausePoint>=(drt1+drt2+drt3+drt4+drt5+drt6+drt7+drt8-1))
                {
                    if(soundBuffer9 == undefined){
                        krpano.call(' plugin[video].pause(); ');
                        oLoading.style.display='block';
                        paused=true;
                        sound.stop(0);
                    }
                }
                
            }else if(pausePoint<(drt1+drt2+drt3+drt4+drt5+drt6+drt7+drt8+drt9)){
                if(pausePoint>=totalTime)
                {
                    sound.stop(0);
                }
                console.log(999)
                sound = context.createBufferSource();
                sound.buffer = soundBuffer9;
                sound.loop = true;
                paused = false;
                sound.connect(encoder.in);
                sound.start(0, pausedAt / 1000-drt1-drt2-drt3-drt4-drt5-drt6-drt7-drt8);
            }
        }

        if(browser.toLowerCase().indexOf("mobile")>0){
            
            if(!paused){
	        	keepPlay();        
	        }
        }
        else{
            // console.log("pausePoint:"+pausePoint+','+"totalTime:"+totalTime)
	        //如果播放到最后或者一秒间隔播放时长小于500毫秒停止音乐
	        if((pausePoint>=totalTime)||gap<500){
	        	sound.stop(0);
	        }else if(!paused){
	        	
	            keepPlay(); 
	        
	        }
        }
    }

    function onDecodeAudioDataError(error) {
        var url = 'hjre';
      alert("Browser cannot decode audio data..." + "\n\nError: " + error + "\n\n(If you re using Safari and get a null error, this is most likely due to Apple's shady plan going on to stop the .ogg format from easing web developer's life :)");
    }