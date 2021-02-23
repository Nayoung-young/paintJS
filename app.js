const canvas = document.getElementById("jsCanvas"),
    colors = document.getElementsByClassName("jsColor"),
    range = document.getElementById("jsRange"),
    mode = document.getElementById("jsMode"),
    saveBtn = document.getElementById("jsSave");
const ctx = canvas.getContext('2d');

const INITIAL_COLOR = "#2c2c2c",
    CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"; 
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //처음에 range default가 2.5니까 

let painting = false,
    filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) { //painting하지 않는 상태에서 클릭 시 painting 시작
        ctx.beginPath();
        ctx.moveTo(x, y); //우선 시작점을 마우스 커서의 현재 위치로 받고 
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
        //마우스 움직이는 내내 발생 
    }


}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color; 
}

function handleRangeChange(event) {
    const rangeVal = event.target.value;
    ctx.lineWidth = rangeVal;
    console.log(ctx.lineWidth);

}

function handleModeClick(event) {
    if (filling === true) {
        mode.innerText = "Fill";
        filling = false;
    } else {
        mode.innerText = "Paint";
        filling = true;       
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick(){
    //1. canvas 이미지가 있는 URL을 생성 
    const image = canvas.toDataURL();

    //2. <a> </a> 태그 생성
    const link = document.createElement("a");

    //2.1. a 태그의 속성 중 하나인 href, download 사용 
    link.href = image; 
    link.download = "PaintJS[☆]";
    
    //2.2. a 태그에 대한 '가상의 클릭' 생성하여 다운되도록 
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}
