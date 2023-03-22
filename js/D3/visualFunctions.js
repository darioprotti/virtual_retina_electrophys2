function clearData1(e,t){$("div#tuningCurveGraph").html(""),$(".spikeData").remove(),tunCurveDomain=[-15,345],tunCurve=new TuningCurve({width:540,height:400},tunCurveDomain,e),tunCurve.makeTuningCurveGraph("div#tuningCurveGraph","Direction (°)")}function changeDirection(e){currAngle=30*Math.round(e/30),currRadians=currAngle*Math.PI/180,d3.select("#grating").attr("transform","rotate("+currAngle+",0, 0)"),$(".spikeData").remove()}function vonMises(e,t,a){return Math.exp(a*Math.cos(e-t))/(2*Math.PI*besseli(a,0))}function poisson(e){for(var t=0,a=Math.exp(-e),n=Math.random();n>a;)t++,n*=Math.random();return t}function average(e){var t=e.reduce(function(e,t){return e+t},0),a=t/e.length;return a}function standardDeviation(e){var t=average(e),a=e.map(function(e){var a=e-t,n=a*a;return n}),n=average(a),r=Math.sqrt(n);return r}function makeStimScreen(e){var t=342,a=342;stimulusGroup=d3.select(e).append("svg").attr("viewBox","0,0,"+t+","+a).attr("preserveAspectRatio","xMidYMid meet").append("g").attr("transform","translate("+t/2+","+a/2+")"),stimulusGroup.append("clipPath").attr("id","clipCircle").append("circle").attr("r",150).attr("cx",0).attr("cy",0),stimulusGroup.append("image").attr("id","grating").attr("xlink:href","img/visual/grating0.png").attr("clip-path","url(#clipCircle)").attr("x",-460).attr("y",-240).attr("width",920).attr("height",480),stimulusGroup.append("circle").attr("id","circleSpot").attr("clip-path","url(#clipCircle)").attr("x",-460).attr("y",-240).attr("r",0).attr("width",920).attr("height",480).style("fill","purple")}function downloadCsv(e,t){var a=new Blob([e]);if(window.navigator.msSaveOrOpenBlob)window.navigator.msSaveBlob(a,t+".csv");else{var n=window.document.createElement("a");n.href=window.URL.createObjectURL(a,{type:"text/plain"}),n.download=t+".csv",document.body.appendChild(n),n.click(),document.body.removeChild(n)}}function downloadVisualData(e){var t=Number($("#nrRepeats").val()),a=$("#typeData").val(),n=directions;if(downloadSpikes=new SpikeVisualization({width:0,height:0},e),"1"==a)$('<div title="Counts or times?">Please select which type of data you would like to download: spike counts per trial, or spike times per trial. </div>').dialog({modal:!0,close:function(){$(this).dialog("destroy").remove()}});else{var r=[],i=[],o=[],s=[],l=[],u=[],d=[],c=[];spikeCountsTheseParams=[];for(var p=0;p<1;p++)for(var h=100,m=0;m<n.length;m++){var f=Math.PI*n[m]/180;l.push([n[m],h]),spikeCountsTheseParams=[];for(var v=0;v<t;v++)0===h?thisAdaptationExp=1:thisAdaptationExp=adaptationExp,v<t/2?(c.push(0),thisMysteryGain=1):(c.push(1),thisMysteryGain=mysteryGain),u.push(Math.round(n[m])),d.push(h),nrSpikesThisTrial=poisson(thisMysteryGain*(h/100)*amplitude*vonMises(f,prefDirectionRad,kappa)+offset),spikeCountsTheseParams.push(nrSpikesThisTrial),i.push(nrSpikesThisTrial),r.push(downloadSpikes.generateSpikeTimes(nrSpikesThisTrial,[1,e-1],thisAdaptationExp).sort(function(e,t){return e-t}));o.push(average(spikeCountsTheseParams)),s.push(standardDeviation(spikeCountsTheseParams))}a="3";var g,w,k,y="",M=[];switch(a){case"2":for(k="MeanAndSTD",y="Number of trials,Direction,Contrast,Mean,Standard deviation",w=0;w<l.length;w++)M.push(t+","+l[w][0]+","+l[w][1]+","+o[w]+","+s[w]);break;case"3":for(k="SpikeCounts",y="Trial number,Direction,Contrast,A,Spike counts",w=0;w<u.length;w++)M.push(u[w]+","+d[w]+","+c[w]+","+i[w]);M.forEach(function(e,t){M[t]=t+1+","+e});break;case"4":for(k="SpikeTimes",y="Trial number,Direction,Contrast,Spike times (ms)",w=0;w<u.length;w++)M.push(u[w]+","+d[w]+","+r[w]);M.forEach(function(e,t){M[t]=t+1+","+e})}var C=y+"\n";M.forEach(function(e){C+=e+"\n"}),g=randomSeed+" - "+k,downloadCsv(C,g)}}function shuffle(e){for(var t,a,n=e.length;n;)a=Math.floor(Math.random()*n--),t=e[n],e[n]=e[a],e[a]=t}function getRandomBetween(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}$(document).ready(function(){stimulusGroup,$("#submitSeed").on("click",function(){function e(){choice=a.value,"CellC"===choice?kappa=2.5*t()+.5:kappa=0}var t;if(randomSeed=$("#nameSeed").val().toUpperCase(),0===randomSeed.length)t=new Math.seedrandom,$("#initMessage").html("You are now recording from a random neuron.");else{if(" "===randomSeed[0]||" "===randomSeed[randomSeed.length-1])return void alert("The neuron ID cannot start or end with a white space. Please rename your neuron.");t=new Math.seedrandom(randomSeed),$("#initMessage").html('You are now recording from a neuron with ID: "'+randomSeed+'"')}available_indexes.push(1),available_indexes.push(4),prefDirectionAng=Math.round(360*t()),prefDirectionRad=Math.PI*prefDirectionAng/180;var a=document.querySelector("select");a.addEventListener("change",e),amplitude=150*t()+50,offset=20*t();for(var n=[],r=0;r<100;r++)n.push(poisson(amplitude*vonMises(prefDirectionRad,prefDirectionRad,kappa)+offset));maxRate=Math.max.apply(null,n),labels={categories:contrast,colors:colors,labelTitle:"Contrast",unit:"%",visible:!0},clearData1(maxRate,labels)}),$("#directionDial").knob({width:80,height:80,cursor:1,thickness:.5,angleOffset:90,angleArc:359,bgColor:"hsl(0,0%,10%)",fgColor:"hsl(0,0%,90%)",min:0,max:359,displayInput:!1,step:30,draw:function(){this.i.val((360-this.cv)%360)},change:function(e){changeDirection(e)}}),$("#accordion").accordion({collapsible:!0,heightStyle:"content",beforeActivate:function(e,t){var a=$(t.newHeader).index("h3");jQuery.inArray(a,available_indexes)==-1&&($('<div title="Initialise your neuron first"> Please initialise your neuron first in the "Instructions" tab. If you don\'t want to use your name, any string will do; or if you want a random neuron just leave the box blank and press the "Initialise neuron" button.</div>').dialog({modal:!0,close:function(){$(this).dialog("destroy").remove()}}),e.preventDefault())}})});