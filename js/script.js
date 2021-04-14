/* 
-------------------------------------------------------------
Copyright (c) 2021 by Tom Miller (https://codepen.io/creativeocean/pen/pWXgNG)
-------------------------------------------------------------
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

-------------------------------------------------------------
Copyright (c) 2021 by Anselm Peischl
-------------------------------------------------------------
Changes to countdown, alterations to fit SPX-CG
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


updated 14.04.2021
-------------------------------------------------------------
*/


// set 3d transforms
TweenMax.set("#clock", {perspective:1500, scale:0.7125})
TweenMax.set(".upper", {rotationX:0.01, transformOrigin:"50% 100%"})
TweenMax.set(".lower", {rotationX:0.01, transformOrigin:"50% 0%"})


// set clock
var t, ss, mm, hh;
var clock = document.getElementById('clock')

function runAnimationIN() {
  console.log('runAnimationIN')

  if ( init != true ) {
    initValues()
  }

  gsap.to(
    clock, {
      duration: 2, 
      autoAlpha: 1,
      delay: 1
    })

}


function runAnimationOUT () {
  gsap.to(clock, {
    duration: 1, 
    autoAlpha: 0,
    onComplete: clearInterval(interval)
  })  
}

function newInterval () {
   // start ticking
   interval = setInterval(function(){
    setTimeVars();
 
   tick(s0, Number(ss.substr(1,1)) )
 
     if (ss.substr(1,1)=="9"){
       tick(s10, Number(ss.substr(0,1)) ) 
       if (ss=="59"){
         tick(s10, 5, true)
         tick(m0, Number(mm.substr(1,1)))
         if (mm.substr(1,1)=="9"){
           tick(m10, Number(mm.substr(0,1)))
           if (mm=="59") {
             tick(m10, 5, true)
             tick(h0, Number(hh.substr(1,1)))
             if (hh.substr(1,1)=="9") tick(h10, Number(hh.substr(0,1)))
           }
         }
       }
   }
 }, 1000)

}

function setAllFields () {
  h10.childNodes[3].innerHTML = h10.childNodes[7].innerHTML = "<span>"+Number(hh.substr(0,1))+"</span>";
  h0.childNodes[3].innerHTML = h0.childNodes[7].innerHTML = "<span>"+Number(String(hh).substr(1,1))+"</span>";

  m10.childNodes[3].innerHTML = m10.childNodes[7].innerHTML = "<span>"+Number(mm.substr(0,1))+"</span>";
  m0.childNodes[3].innerHTML = m0.childNodes[7].innerHTML = "<span>"+Number(mm.substr(1,1))+"</span>";

  s10.childNodes[3].innerHTML = s10.childNodes[7].innerHTML = "<span>"+Number(ss.substr(0,1))+"</span>";
  s0.childNodes[3].innerHTML = s0.childNodes[7].innerHTML = "<span>"+Number(ss.substr(1,1))+"</span>";
}


function setTimeVars(){
  console.log('setTimeVars')

  nowtime = new Date();
  t = new Date(endtime - nowtime)
  console.log(endtime)
  console.log(nowtime)
  console.log(t)
  
	ss = String(t.getSeconds());
  mm = String(t.getMinutes());
  hh = String(t.getHours());
  if (ss.length==1) ss = "0"+ss;
  if (mm.length==1) mm = "0"+mm;
  if (hh.length==1) hh = "0"+hh;
  
}



function tick(mc,i, toZero=false){
  console.log('tick')
  // set numbers
  //if ( i==9 || toZero) i=-1
  if ( i == 9 ) i = -1
  //mc.childNodes[3].innerHTML = "<span style='background-color: red;'>"+(i+1)+"</span>"; //start upper
  mc.childNodes[3].innerHTML = "<span>"+(i+1)+"</span>"; //start upper
  //mc.childNodes[5].innerHTML = "<span style='background-color: green;'>"+(i+1)+"</span>"; //start lower
  mc.childNodes[5].innerHTML = "<span>"+(i+1)+"</span>"; //start lower
  if ( i == -1 ) i = 9 
  if ( toZero ) i = 5
  //mc.childNodes[1].innerHTML = "<span style='background-color: blue;'>"+(i)+"</span>"; //end upper
  mc.childNodes[1].innerHTML = "<span>"+(i)+"</span>"; //end upper
  //mc.childNodes[7].innerHTML = "<span style='background-color: orange;'>"+(i)+"</span>"; //end lower
  mc.childNodes[7].innerHTML = "<span>"+(i)+"</span>"; //end lower
  // animate tick
  TweenMax.fromTo(mc.childNodes[1], .3, {alpha:0},{alpha:1, ease:Power4.easeIn})  
  TweenMax.fromTo(mc.childNodes[3], .3, {rotationX:0, background:"linear-gradient(0deg, rgba(200,200,200,1), rgba(255,255,255,1) 15%)"},{rotationX:-90, ease:Power1.easeIn})
  TweenMax.fromTo(mc.childNodes[7], .5+.2*Math.random(), {rotationX:90},{rotationX:0, ease:Bounce.easeOut, delay:.3})
  TweenMax.fromTo(mc.childNodes[5], .6, {alpha:1},{alpha:0, ease:Bounce.easeOut, delay:.3})  
}

function initValues(data) {

  if (typeof data !== 'undefined') {
    console.log('got new data')
    endHours = 19
    endMinutes = 00
    console.log('New Endtime: ' + endHours + ':' + endMinutes)
  } else {
    console.log('nuh new data')
    endHours = ( document.getElementById('f0').innerHTML.length != 0 ? document.getElementById('f0').innerHTML : 20 )
    endMinutes = ( document.getElementById('f1').innerHTML.length != 0 ? document.getElementById('f1').innerHTML : 00 )
  }

  endtime = new Date()
  endtime.setHours( endHours-1, endMinutes, 00)
  setTimeVars()
  
  if (typeof interval != 'undefined') {
    clearInterval(interval)
  }
  setAllFields()
  newInterval()

  init = true
}

/* 
-------------------------------------------------------------
(c) Copyright 2020 SmartPX <tuomo@smartpx.fi, www.smartpx.fi>
-------------------------------------------------------------
CasparCG / WebCG controller interface

updated 05.11.2020
-------------------------------------------------------------
*/


webcg.on('data', function (data) {
  // Fired after update with the raw data parsed as a JSON object.
  // Handles component XML data, JSON strings and JavaScript objects.
  // console.log('--- data( ' + JSON.stringify(data) + ' ) ---');
  for (var fField in data) {
    var domElement = document.getElementById(fField);
    if (domElement) {
      let value = data[fField].text || data[fField] || '';
      if (value == "null") value = ""; // Clear "null" which appears if a) data is empty and b) format is xml.
      domElement.innerHTML = value;
    }
  }
  initValues(data)
})


webcg.on('play', function () {
  // console.log('--- play() ----');
  runAnimationIN(false)
})


webcg.on('stop', function () {
  // console.log('--- stop() ----');
  runAnimationOUT()
})

webcg.on('next', function () {
  runAnimationNEXT()
})


webcg.on('update', function (e) {
  console.log('update')
  // console.log('--- update() will trigger data() --- ');
})

function SPXautostart(){
  // BODY onLoad runs this to check if URL param "loop=true"
  // which will start runAnimation with a "true" flag which
  // gets passed onto all the subsequent IN calls as well.
  const urlParametrs = new URLSearchParams(window.location.search);
  const SPXLoopMode = urlParametrs.get('loop');
  if (SPXLoopMode=="true"){
    runAnimationIN(true);
  }
} // end autostart


