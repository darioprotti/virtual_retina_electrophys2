function TuningCurve(t,a,e){this.visSizes=t,this.xDomain=a,this.maxY=e,this.makeTuningCurveGraph=function(t,a,i){i||(i={top:10,right:50,bottom:50,left:60}),this.width=this.visSizes.width-i.left-i.right,this.height=this.visSizes.height-i.top-i.bottom,this.angleScale=d3.scale.linear().range([0,this.width]).domain(this.xDomain),this.firingScale=d3.scale.linear().range([this.height,0]).domain([0,this.maxY]);var e;e="undefined"!=typeof directions?d3.svg.axis().scale(this.angleScale).orient("bottom").tickValues(directions):d3.svg.axis().scale(this.angleScale).orient("bottom");var s=d3.svg.axis().scale(this.firingScale).orient("left").ticks(8);this.svg=d3.select(t).append("svg").attr("viewBox","0,0,"+(this.width+i.left+i.right)+","+(this.height+i.top+i.bottom)).attr("preserveAspectRatio","xMidYMid meet").append("g").attr("transform","translate("+i.left+","+i.top+")"),this.svg.append("g").attr("class","x axis").attr("transform","translate(0,"+this.height+")").call(e).append("text").attr("transform","translate("+this.width/2+",40)").attr("text-anchor","middle").text(a),this.svg.append("g").attr("class","y axis").call(s).append("text").attr("transform","translate(-40,"+this.height/2+") rotate(-90)").style("text-anchor","middle").text("Number of spikes"),this.svg.append("g").attr("class","userData1")},this.addTrialToGraph=function(t,a){d3.select(t+" .userData1").append("circle").attr("class","data"+a.legendIx).attr("cx",this.angleScale(a.x)).attr("cy",this.firingScale(a.y)).attr("r",4).attr("fill",a.color).attr("fill-opacity",.4).attr("stroke","darkgrey")},this.addTrials=function(t,a,e){var s=[-90,-75,-60,-45,-30,-15,0,15,30,45,60,75,90];for(j=0;j<s.length;j++)for(i=0;i<e;i++)nrSpikesThisTrial=poisson(a.tuningFunction(s[j])),thisTrial={x:s[j],y:nrSpikesThisTrial,color:"hsl(180, 100%, 25%)",legendIx:NaN},this.addTrialToGraph(t,thisTrial)},this.fitTunCurve=function(t,a){var i=[];for(angle=-90;angle<90;angle++)i.push({angle:angle,rate:a.tuningFunction(angle)});x=this.angleScale,y=this.firingScale;var e=d3.svg.line().x(function(t){return x(t.angle)}).y(function(t){return y(t.rate)});d3.select(t+" .userData1").append("path").attr("class","line").attr("d",e(i)).attr("stroke","hsl(180, 100%, 25%)").attr("fill","none").attr("stroke-width","4").attr("shape-rendering","crispEdges")},this.addDashedLine=function(t,a){d3.select(t+" .userData1").append("line").attr("stroke","hsl(180, 100%, 25%)").style("stroke-dasharray","3, 3").attr("stroke-width","2").attr({x1:this.angleScale(a.linear),y1:this.firingScale(0),x2:this.angleScale(a.linear),y2:this.firingScale(a.tuningFunction(a.linear))}),d3.select(t+" .userData1").append("line").attr("stroke","hsl(180, 100%, 25%)").style("stroke-dasharray","3, 3").attr("stroke-width","2").attr({x1:this.angleScale(a.log),y1:this.firingScale(a.tuningFunction(a.linear)),x2:this.angleScale(this.xDomain[0]),y2:this.firingScale(a.tuningFunction(a.linear))})}}