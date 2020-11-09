let canvas = document.getElementById('draw');
const clearBtn = document.getElementById("clear-btn");
const colorInput = document.getElementById("color-input");
const widthInput = document.getElementById("width-input");
const setWidthBtn = document.getElementById("set-width-btn");
const setColorBtn = document.getElementById("set-color-btn");

context = canvas.getContext("2d");

let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let paint;
let mouseX;
let mouseY;
let chosenLineWidth = 5;
let chosenColor = "red";

//розкоментуйте якщо використовуєте layout з практичною
//необхідно отримати додактовий offset
let offsetLeft = canvas.parentElement.parentElement.offsetLeft;
let offsetTop  = canvas.parentElement.parentElement.offsetTop;


canvas.addEventListener('mousedown',function (e){
   mouseX = e.pageX - this.offsetLeft;
   mouseY = e.pageY - this.offsetTop;
   mouseX = e.pageX - this.offsetLeft - offsetLeft;
   mouseY = e.pageY - this.offsetTop - offsetTop;
   paint = true;
   addClick(mouseX, mouseY);
   redraw();
});
canvas.addEventListener('mousemove',function (e){
   if(paint){
       addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);


       addClick(e.pageX - this.offsetLeft - offsetLeft, e.pageY - this.offsetTop - offsetTop, true);

       redraw();
   }
});
canvas.addEventListener('mouseup',function (e){
   paint = false;
});
canvas.addEventListener('mouseleave',function (e){
   paint = false;
});

Малювання:

function addClick(x, y, dragging)
{
   clickX.push(x);
   clickY.push(y);
   clickDrag.push(dragging);
}

function redraw(){
   context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

   context.strokeStyle = chosenColor;
   context.lineJoin = "round";
   context.lineWidth = chosenLineWidth;

   for(var i=0; i < clickX.length; i++) {
       context.beginPath();
       if(clickDrag[i] && i){
           context.moveTo(clickX[i-1], clickY[i-1]);
       }else{
           context.moveTo(clickX[i]-1, clickY[i]);
       }
       context.lineTo(clickX[i], clickY[i]);
       context.closePath();
       context.stroke();
   }
}

clearBtn.addEventListener("click", () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    clickDrag.splice(0, clickDrag.length);
    clickX.splice(0, clickX.length);
    clickY.splice(0, clickY.length);
});

setColorBtn.addEventListener("click", () => {
    chosenColor = colorInput.value;
});
setWidthBtn.addEventListener("click", () => {
    chosenLineWidth = widthInput.value;
});