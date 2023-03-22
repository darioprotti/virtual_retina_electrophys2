function SpikeVisualization(divSizes,maxTime){
	this.visSizes = divSizes;
	this.maxTime = maxTime;
	this.finished = true;
	this.rasterScales = {};
	// Make Oscilloscope for visualization
	this.makeOscilloscope = function(uniqueDivId){
		this.div = uniqueDivId;
		var width = this.visSizes.width,
		height = this.visSizes.height;
		x = d3.scale.linear().domain([0, this.maxTime]).range([0, width]);
		y = d3.scale.linear().domain([-10, 10]).range([height, 0]);
		this.scale = {x: x, y: y};
		var widthPerc = 100;
		var svg = d3.select(uniqueDivId)
		.style("display","inline-block")
		.style("background-color","black")
		.style("border-radius","8px")
		.style("border","8px inset #ccc")
		.style("position","relative")
		.style("width",widthPerc+"%")
		.style("padding-bottom",widthPerc*height/width+"%")
		.style("vertical-align","top")
		.style("overflow","hidden")
		//.style("margin","0 "+(100-widthPerc)/2+"%")
		.classed("svg-container", true)
		.append("svg")
		.style("display","inline-block")
		.style("position","absolute")
		.style("top","0px")
		.style("left","0px")
		.attr("viewBox","0,0,"+width+","+height)
		.attr("preserveAspectRatio","xMidYMid meet");

		// GRID LINES every 100 ms
		xTicks = function(){var ticks=[];for(var i=0;i<=maxTime/100;i++){ticks.push(i*100);}return ticks;};
		var xAxis = d3.svg.axis().scale(x).orient("bottom").tickValues(xTicks).tickSize(-height, 0, 0).tickFormat(""),
		yAxis = d3.svg.axis().scale(y).orient("left").tickValues([-8,-4,0,4,8]).tickSize(-width, 0, 0).tickFormat("");
		svg.append("g")
		.attr("class", "grid")
		.attr("transform", "translate(0," + height + ")")
		.attr("opacity", 0.6)
		.call(xAxis);
		svg.append("g")
		.attr("class", "grid")
		.attr("opacity", 0.6)
		.call(yAxis);
		svg.selectAll('.grid path')
		.attr('stroke-width',0);
		svg.selectAll('.grid .tick')
		.attr('stroke','#7f7f7f');
		//return scale;
	};
	this.spatialPlots = function(electrodeLoc){
		var topMargins = 10;
		var width = paperProps.width;
		var height = paperProps.height+topMargins*2;

		var stimulusSVG = d3.select("."+electrodeLoc+" .spatialPlot")
		.style("display","inline-block")
		.style("position","relative")
		.style("width","100%")
		.style("padding-bottom",100*height/width+"%")
		.style("vertical-align","top")
		.style("overflow","hidden")
		.classed("svg-container", true)
		.append("svg")
		.style("display","inline-block")
		.style("position","absolute")
		.style("top","0px")
		.style("left","0px")
		.attr("viewBox","0,0,"+width+","+height)
		.attr("preserveAspectRatio","xMidYMid meet");

		var paper = stimulusSVG.append("g")
		.attr("class","paper")
		.attr("transform", "translate(0,"+topMargins+")");

		paper.append("rect")
		.attr("fill","white")
		.attr("stroke","black")
		.attr("x",0)
		.attr("y",0)
		.attr("width",paperProps.width)
		.attr("height",paperProps.height);

		/*var brailleGrid = paper.selectAll(".brailleDot")
		.data(braillePos)
		.enter().append("ellipse")
		.attr("class", "brailleShadow")
		.attr("cx", function(d){return d[0];})
		.attr("cy", function(d){return d[1];})
		.attr("rx", 15).attr("ry", 15)
		.attr("fill", "#e9e9e9");*/

		var trials = stimulusSVG.append("g")
		.attr("class","trials")
		.attr("transform", "translate(0,"+topMargins+")");

		var x = d3.scale.linear().domain([0, this.maxTime]).range([0, width]),
		y = d3.scale.linear().domain([-1, 1]).range([height-topMargins*2, 0]);
		this.scale = {x: x, y: y};
	};
	this.makeRaster = function(neuronObj,curryPos){
		traceColour = neuronObj.colour;
		var currPaper = d3.select("." + neuronObj.type + " svg .trials");
		var spikeTrace = this.spikeTrace;
		var scale = this.scale;
		scale.y = d3.scale.linear().domain([-1, 1]).range([curryPos+10, curryPos-10]);
		var maxTime = this.maxTime;
		var thisIx = yPos.indexOf(curryPos);

		var currTrial = currPaper.append("g")
		.attr("class","yPos"+curryPos+" trial"+nrTrials[thisIx]);

		currTrial.selectAll(".spike")
		.data(neuronObj.timesForSpikes)
		.enter()
		.append("line")
		.attr("class","spike")
		.attr('x1',function(d){return scale.x(d);}).attr('x2',function(d){return scale.x(d);})
		.attr('y1',scale.y(-1)).attr('y2',scale.y(-1+1.9/(nrTrials[thisIx]+1)-0.005))
		.attr("fill","none")
		.attr("stroke",traceColour)
		.attr("opacity", 0)
		.transition()
		.ease("linear")
		.delay(function(d) {return d;})
		.attr("opacity", 1);

		setTimeout(function(){neuronObj.vis.finished = true;},this.maxTime);
	};
	
// 	var select = document.querySelector('select');
// select.addEventListener('change', selectTimeCourse);
	
// function selectTimeCourse() {
// 	 choice = select.value;
  
// 	 if (choice === "CellA"){
// 		nrSpikesPerInt1=nrSpikesPerIntMagno;
// 		}
// 	else if (choice === "CellB"){
// 		nrSpikesPerInt1=nrSpikesPerIntParvo;
// 		}
// 	else {
// 		nrSpikesPerInt1=nrSpikesPerIntParvo;
// 	}
// }
	
		this.generateSpikeTimes = function(nrSpikes,timeIntervalw,adaptationExp){
		// Generates spike times (in ms) for nrSpikes spikes to occurr in timeInterval
		var timeIntervalw=[140,240,340,440,540,640,740,840,940,1040,1140,1240,1340,1440,1540,1640,1740,1840,1940,2040,2140,2240,2340,2440,2540,2640,2740,2840,2940,3040,3140,3240,3340,3440,3540,3640,3740,3840,3940];
		
		
		
		
		if (choice === "CellA" && ChrSTabOn!="ON"){
			nrSpikesPerInt1=[0.1618,0.2504,0.3032,0.3384,0.3651,0.3876,0.408,0.4274,0.4463,0.465,0.4835,0.502,0.5205,0.5389,0.5574,0.5758,0.5943,0.6127,0.6312,0.6496,0.668,0.6865,0.7049,0.7234,0.7418,0.7603,0.7787,0.7971,0.8156,0.834,0.8525,0.8709,0.8893,0.9078,0.9262,0.9447,0.9631,0.9816];// probability for Magno, from Camp et al 2011;
			}
		else if (choice === "CellB"&& ChrSTabOn!="ON"){
			nrSpikesPerInt1=[0.0503,0.0937,0.1318,0.166,0.1974,0.2266,0.2541,0.2805,0.306,0.3308,0.3552,0.3791,0.4028,0.4263,0.4496,0.4728,0.4959,0.519,0.542,0.565,0.588,0.6109,0.6338,0.6567,0.6796,0.7025,0.7254,0.7483,0.7712,0.7941,0.817,0.8398,0.8627,0.8856,0.9085,0.9314,0.9542,0.9771];// probability for Parvo, from Camp et al 2011;
			}
		else if (choice === "CellC"&& DSTabOn=="ON"){
			nrSpikesPerInt1=[0.0033,0.0080,0.0115,0.0159,0.0187,0.0281,0.1197,0.2276,0.2957,0.3356,0.3614,0.3896,0.4060,0.4342,0.4460,0.4671,0.4788,0.4976,0.5117,0.5305,0.5469,0.5619,0.5739,0.5856,0.6021,0.6185,0.7265,0.7899,0.8239,0.8544,0.8720,0.8932,0.9155,0.9272,0.9460,0.9624,0.9835,0.99];// probability for Parvo, from Camp et al 2011;
			}
		else if (choice === "CellA"&& ChrSTabOn=="ON"&&currColour===100){	
		nrSpikesPerInt1=[0,0.0000046,0.0009836,0.0282413,0.1019042,0.2006008,0.3194208,0.4094736,0.4598071,0.4682531,0.4685351,0.4685374,0.4685374,0.4685374,0.4685374,0.4687946,0.4730230,0.5058611,0.5597866,0.6054763,0.6567691,0.7168414,0.7350622,0.7353018,0.7353412,0.7353412,0.7353412,0.7353412,0.7353812,0.7356728,0.7522331,0.8053876,0.8549550,0.9148894,0.9682629,0.9964299,0.9997963,0.9999000];
			}
		else if (choice === "CellC"&& ChrSTabOn=="ON"&&currColour===100){	
			nrSpikesPerInt1=[0,0.0000046,0.0009836,0.0282413,0.1019042,0.2006008,0.3194208,0.4094736,0.4598071,0.4682531,0.4685351,0.4685374,0.4685374,0.4685374,0.4685374,0.4687946,0.4730230,0.5058611,0.5597866,0.6054763,0.6567691,0.7168414,0.7350622,0.7353018,0.7353412,0.7353412,0.7353412,0.7353412,0.7353812,0.7356728,0.7522331,0.8053876,0.8549550,0.9148894,0.9682629,0.9964299,0.9997963,0.9999000];
				}
		else if (choice === "CellB"&& ChrSTabOn=="ON"&&currColour!==250){	
			nrSpikesPerInt1=[0,0.0000046,0.0009836,0.0282413,0.1019042,0.2006008,0.3194208,0.4094736,0.4598071,0.4682531,0.4685351,0.4685374,0.4685374,0.4685374,0.4685374,0.4687946,0.4730230,0.5058611,0.5597866,0.6054763,0.6567691,0.7168414,0.7350622,0.7353018,0.7353412,0.7353412,0.7353412,0.7353412,0.7353812,0.7356728,0.7522331,0.8053876,0.8549550,0.9148894,0.9682629,0.9964299,0.9997963,0.9999000];
			}
		else {	
			nrSpikesPerInt1=[0.0131,0.0551,0.1313,0.2048,0.2683,0.3187,0.3659,0.4094,0.4488,0.4849,0.5191,0.5493,0.5742,0.5992,0.6241,0.6460,0.6679,0.6902,0.7099,0.7323,0.7476,0.7629,0.7739,0.7936,0.8154,0.8286,0.8404,0.8601,0.8732,0.8942,0.9100,0.9275,0.9472,0.9669,0.9800,0.9945,0.9978,0.999];
		}
		nrSpikesPerInt1.forEach((value, index) => {
		nrSpikesPerInt1[index] *= nrSpikes;
		});
		if(!adaptationExp){adaptationExp=1;}
		var arr =[""];
 for(var i1=0;i1<timeIntervalw.length;i1++){
   while(arr.length < nrSpikesPerInt1[i1]){
     var randomnumber = Math.floor(Math.pow(Math.random(),adaptationExp)*(timeIntervalw[((i1)+1)]-timeIntervalw[((i1)+0)])+timeIntervalw[((i1)+0)]);
     var found=false;
      for(var i=0;i<arr.length;i++){
          if(Math.abs(arr[i]-randomnumber)<6 ){found=true;break;}
	  }
	  
	 if(!found)arr[arr.length]=randomnumber//
	
     }
    }
     arr.sort(function(a, b){return a-b});
  arr.forEach((value, index) => {
   arr[index] /= 4;
});

for(var i=0;i<arr.length;i++){
	arr[i] = Math.round(arr[i]);
}
return arr.sort();
};

	this.generateSpikeTrace = function(spikeTimes){
		this.spikeTrace = [];
		for (var t = 0; t < this.maxTime; t++)
		{
			this.spikeTrace.push({
				time: t,
				value: Math.random() * 2 - 1// Random number between -1 (included) and 1 (excluded)
			});
		}
  
		for (var i = 0; i<spikeTimes.length;i++){
			currTime = spikeTimes[i];
			this.spikeTrace[currTime].value = Math.random() * 3  + 7;
			this.spikeTrace[currTime+1].value = -(Math.random() * 3  + 7);
		}
	};

	this.addTraceToOscilloscope = function(traceColour){
		traceColour = (typeof traceColour !== 'undefined') ?  traceColour : "#42ff4f";
		if(!this.div) return;
		else{
			var uniqueDivId = this.div;

			var spikeTrace = this.spikeTrace;
			var scale = this.scale;
			var maxTime = this.maxTime;

			var line = d3.svg.line()
			.interpolate("basis")
			.x(function(d) { return scale.x(d.time); })
			.y(function(d) { return scale.y(d.value); });

			function getInterpolation() {
				var interpolate = d3.scale.quantile()
				.domain([0,1])
				.range(d3.range(1, spikeTrace.length + 1));

				return function(t) {
					var tempValues = spikeTrace.slice(0, interpolate(t));
					return line(tempValues);
				};
			}

			return d3.select(uniqueDivId+">svg").append("g")
			.attr("class", "spikeData")
			.append('path')
			.attr("class", "line")
			.attr("stroke", traceColour)
			.attr("fill","none")
			.transition()
			.duration(maxTime)
			.attrTween('d', getInterpolation)
			.ease("linear");
			}
	};
}
