//Enter Paths to all Overlay images here
var overlays = ["img/overlay.svg", "img/overlay_hat.svg"];

var canvas_preview = document.getElementById('canvas');
var ctx_preview = canvas_preview.getContext('2d');
var button = document.getElementById("download");

var x_range = document.getElementById('slide-x');
var y_range = document.getElementById('slide-y');

var canvas_original = document.createElement("canvas");
var ctx_original = canvas_original.getContext('2d');

var img = new Image();
var overlay = new Image();
overlay.src = overlays[0];

var div_choose = document.getElementById("choose-ov");

for (const [k, path] of Object.entries(overlays)){
  
  var img_choice = new Image(100,100);
  img_choice.src = path;
  
  img_choice.addEventListener('click', function (e) {
    overlay.src = path;
    draw();
  }); 

  div_choose.appendChild(img_choice);

}


//Only for Development:
//document.body.appendChild(canvas_original);
document.getElementById('image-file').onchange = function(e) {
    img.onload = draw;
    img.onerror = failed;
    img.src = URL.createObjectURL(this.files[0]);
    overlay.onload = draw;
    
    button.style="visibility:visible";
    document.getElementById('slidecontainer').style = "visibility:visible";
  };

  button.addEventListener('click', function (e) {
    canvas.crossOrigin = 'anonymous';
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
  }); 

  x_range.oninput = function(e){
    //console.log("x", x_range.value);
    draw();
  };

  y_range.oninput = function(e){
    draw();
  };

  
//Call the draw() function in your html body onload
function draw(){
    //Clear Canvas
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Get image properties
    var h = img.height;
    var w = img.width;

    //Get side length of overlay
    var sl_original;
    if (h >= w) {sl_original = w;} else {sl_original = h;}
    var sl_preview = 500;

    //Get slider value
    var y = (parseInt(y_range.value)-50)/100;
    var x = (parseInt(x_range.value)-50)/100;
    console.log(x,y);

    //Setup both canvases
    canvas_preview.width = sl_preview;
    canvas_preview.height = sl_preview;

    canvas_original.width = sl_original;
    canvas_original.height = sl_original;

    //Draw on both canvases
    const canvi = {[sl_preview]:ctx_preview, [sl_original]:ctx_original};

    for (const [sl, ctx] of Object.entries(canvi)){
      console.log(sl, ctx);
      //(h-w)/2
      //(w-h)/2
      if (h >= w)
          {ctx.drawImage(img, 0,0, w, h, 
            x*sl+0.15*sl, y*sl, sl*0.7, (h/w)*sl*0.7);
          }
      else 
          {ctx.drawImage(img, 0, 0, h, h, 
            x*sl, y*sl+0.15*sl, (w/h)*sl*0.7, sl*0.7)}

      ctx.drawImage(overlay, 0, 0, sl, sl);
    }
}


function failed() {
    console.error("The provided file couldn't be loaded as an Image media");
  }
