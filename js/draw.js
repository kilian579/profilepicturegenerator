var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var button = document.getElementById("download");

var x_range = document.getElementById('slide-x');
var y_range = document.getElementById('slide-y');

var img = new Image();
var overlay = new Image();
overlay.src = "img/overlay.png";


document.getElementById('image-file').onchange = function(e) {
    img.onload = draw;
    img.onerror = failed;
    img.src = URL.createObjectURL(this.files[0]);
    overlay.onload = draw;
    
    button.style="visibility:visible";
    x_range.style="visibility:visible";
    y_range.style="visibility:visible";
  };

  button.addEventListener('click', function (e) {
    canvas.crossOrigin = 'anonymous';
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
  }); 

  x_range.oninput = function(e){
    console.log("x", x_range.value);
    draw();
  };

  y_range.oninput = function(e){
    console.log("y", y_range.value);
    draw();
  };


function draw(){
    //Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Get side length of overlay
    var sl = overlay.height;

    //Get image properties
    var h = img.height;
    var w = img.width;

    //Get slider value
    var y = (parseInt(y_range.value)+50)/100;
    var x = (parseInt(x_range.value)+50)/100;
    console.log(x,y);

    //Set Canvas Attributes
    canvas.width = sl;
    canvas.height = sl;

    //ctx.drawImage(img,img.height,img.height);
    
    if (h >= w)
        {ctx.drawImage(img, 0, (1-y)*(h-w)/2, w, w, x*sl*0.15, y*sl*0.15, sl*0.7, sl*0.7)}
    else 
        {ctx.drawImage(img, (1-x)*(w-h)/2, 0, h, h, x*sl*0.15, y*sl*0.15, sl*0.7, sl*0.7)}
    
        
    ctx.drawImage(overlay, 0, 0);
}


function failed() {
    console.error("The provided file couldn't be loaded as an Image media");
  }
