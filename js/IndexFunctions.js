$(function () {
    $("#accordion").accordion({
      collapsible: true
    });
  });

  // $(function () {
  //   $("#Tabs1").tabs({
  //     collapsible: true
  //   });
  // });

  // $(function () {
  //   $("#tabs").tabs({
  //       collapsible: true
  //   });
  // });

  $(function() {
$("#tabs").tabs(); 
$("#vtabs1").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
$("#vtabs1 li").removeClass("ui-corner-top").addClass("ui-corner-left");


$("#vtabs1").tabs().addClass("ui-tabs-vertical"); // <-use your own selector here...
$(".ui-tabs-vertical .ui-tabs-nav").removeClass("ui-tabs-nav").addClass("ui-tabs-nav-vert")
});

  $(function () {
    $("#draggable").draggable();
  });

  $(function () {
    $("#draggable1").draggable();
  });