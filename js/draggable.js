
// Amount to offset control points

//<script src="TweenMax.min.js">
//<script src="Draggable.min.js">
var bezierWeight = 0.675;

var handles = document.querySelectorAll(".handle");
var path = document.querySelector(".path");

TweenLite.set(handles[0], { x: 400, y: 150 });
TweenLite.set(handles[1], { x: 200, y: 350 });

Draggable.create(handles, {
  onDrag: updatePath
});

updatePath();

function updatePath() {
    
  var x1 = handles[0]._gsTransform.x;
  var y1 = handles[0]._gsTransform.y;
  
  var x4 = handles[1]._gsTransform.x;
  var y4 = handles[1]._gsTransform.y;
  
  var dx = Math.abs(x4 - x1) * bezierWeight;
  
  var x2 = x1 - dx;
  var x3 = x4 + dx;
  
  var data = `M${x1} ${y1} C ${x2} ${y1} ${x3} ${y4} ${x4} ${y4}`;
  
  path.setAttribute("d", data);
}