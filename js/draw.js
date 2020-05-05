var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var button = document.getElementById("download");

var img = new Image();
var overlay = new Image();
overlay.src = "img/overlay.png";


document.getElementById('image-file').onchange = function(e) {
    img.onload = draw;
    img.onerror = failed;
    img.src = URL.createObjectURL(this.files[0]);
    overlay.onload = draw;
    
    
    button.style="visibility:visible";
  };

  button.addEventListener('click', function (e) {
    canvas.crossOrigin = 'anonymous';
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
  }); 


function draw(){

    var sl = overlay.height;
    var h = img.height;
    var w = img.width;

    canvas.width = sl;
    canvas.height = sl;

    //ctx.drawImage(img,img.height,img.height);
    
    if (h >= w)
        {ctx.drawImage(img, 0, (h-w)/2, w, w, sl*0.15, sl*0.15, sl*0.7, sl*0.7)}
    else 
        {ctx.drawImage(img, (w-h)/2, 0, h, h, sl*0.15, sl*0.15, sl*0.7, sl*0.7)}
    
        
    ctx.drawImage(overlay, 0, 0);

}


function failed() {
    console.error("The provided file couldn't be loaded as an Image media");
  }
