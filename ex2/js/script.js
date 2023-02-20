let editor, OneLine, FileText;
let fontsize = Number(getComputedStyle(document.documentElement).getPropertyValue("--fontsize").replace(/[^0-9]/g,""));
let maxDL;
let FileLineEnd = 1, ScrollFirstLine = 1;
let Texts = ["123", "windows 10"];
let pp = [undefined, undefined];
let firstPoint = [undefined, undefined];
let activeDraw = 0, setTime;
let canvasN, ctx;

function OneTextSize(){
    return document.getElementById("textsize").offsetWidth;
}

function tabCount(){
    return parseInt(window.innerWidth / (fontsize * 2) - 3);
}

function LineCount(){
    return window.innerHeight / (fontsize * 1.4);
}

function FileReadtoLocal(){
    
}

function FileToListbyLine(text){
    Texts = text.split("\n");
}

function DisplayTextLines(DLStart){
    // 지금까지 작성된 코드 내보내기 부분 필요
    if (editor.childNodes.length != 0){
        while(editor.hasChildNodes()){
            editor.removeChild(editor.firstChild);
        }
    }
    for (Line=1; ((Line+DLStart-1)<=maxDL && (Line+DLStart-1)<=Texts.length+1); Line+=1){
        Oline = OneLine.cloneNode(true); Oline.id += String(Line);
        Oline.children[0].children[1].innerText = Line+DLStart-1;
        Oline.children[1].children[0].children[0].innerText = Texts[Line+DLStart-2] != undefined ? Texts[Line+DLStart-2] : "";
        editor.appendChild(Oline);
        Oline.addEventListener("pointerenter", LineinPE);
        Oline.addEventListener("pointerleave", LineinPL);
        Oline.children[1].children[0].addEventListener("pointerdown", TextSeprinPD); // textbox
        
        // Sepr
        Oline.children[1].children[1].addEventListener("pointerenter", SeprinPE);
        Oline.children[1].children[1].addEventListener("pointerleave", SeprinPL);

        tb = tabCount();
        Oline.children[1].children[1].children[0].style.zIndex = tb+3;
        Oline.children[1].children[1].children[0].addEventListener("pointerdown", TextSeprinPD);

        var SeprRef = Oline.children[1].children[1].children[1];
        for (Tabs = 1; Tabs <= tabCount(); Tabs++){
            tbc = tabCount() - Tabs + 3;
            newS = SeprRef.cloneNode(true); newS.id = "t" + Tabs;
            newS.style.zIndex = tbc;
            newS.style.width = (Tabs + 1) * 2 + "rem";
            
            newS.innerText += Tabs;
            SeprRef.before(newS);
            newS.addEventListener("pointerdown", TextSeprinPD);
        }
        SeprRef.style.display = "none";
    }
}

function NewLine(){

}

function DeleteCanv(){
    if (canvasN != undefined){
        canvasN.parentNode.classList.remove("editing")
        canvasN.parentNode.addEventListener("pointerdown", TextSeprinPD);
        canvasN.remove();
        canvasN = undefined;
        ctx = undefined;
        activeDraw = 0;
        pp = [undefined, undefined];
        firstPoint = [[undefined, undefined],[undefined, undefined]];
    }
}

function LineinPE(e){
    //console.log(e);
    if (e.pointerType == "pen"){}
}

function LineinPL(e){
    if (e.pointerType == "pen"){}
}

function TextSeprinPD(e){
    if (e.pointerType == "pen"){
        // 이전 캔버스 및 정보 삭제
        DeleteCanv();

        // editing으로 세팅
        var LineC = e.currentTarget;
        if (LineC.parentNode.classList.contains("LSepr")){LineC = LineC.parentNode;}
        LineC.className += " editing";
        canvasN = document.createElement("canvas");
        LineC.appendChild(canvasN);
        setCanvasWH(canvasN);
        ctx = canvasN.getContext("2d");
        activeDraw = 1;
        LineC.removeEventListener("pointerdown", TextSeprinPD);
        canvasN.addEventListener("pointerdown", CanvinPD);
        canvasN.addEventListener("pointermove", CanvinPM);
        canvasN.addEventListener("pointerup", CanvinPU);
    }
}

function CanvinPD(e){
    if (e.pointerType == "pen"){
        activeDraw = 1;
        firstPoint = [e.offsetX, e.offsetY];
    }
}

function CanvinPM(e){
    if (e.pointerType == "pen" && activeDraw == 1 && e.pressure != 0){
        pp = setCanvasDR([e.offsetX,e.offsetY], (pp != [undefined, undefined]) ? pp : [e.offsetX, e.offsetY]);
    }
}

function CanvinPU(e){
    if (e.pointerType == "pen"){
        activeDraw = 0;
        clearTimeout(setTime);
        setTime = setTimeout(prcLine, 1000, canvasN.parentNode.id == "LText" ? false : true, [firstPoint[0], firstPoint[1], e.offsetX]);
        pp = [undefined, undefined];
        firstPoint = [undefined, undefined];
    }
}

function SeprinPE(e){
    if (e.pointerType == "pen"){
        if (e.currentTarget.classList.contains("hoverPen")){return;}
        e.currentTarget.className += " hoverPen";
    }
}

function SeprinPL(e){
    e.currentTarget.classList.remove("hoverPen")
}

function setCanvasWH(canv){
    canv.width = canv.offsetWidth;
    canv.height = canv.offsetHeight;
}

function setCanvasDR([nxx, nyy], [pxx, pyy]){
    if (!activeDraw){return;}
    ctx.strokeStyle = "rgba(0,0,0,0)";
    ctx.moveTo(nxx, nyy);
    ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(nxx, nyy);
    ctx.lineTo(pxx, pyy);
    ctx.stroke();
    return [nxx, nyy];
}

function prcLine(lineAdd, firstPointXY){
    // 라인을 지우는건지 글을 추가하는 건지 글자가 추가 되는건지 확인
    if (activeDraw == 1){return;}

    console.log(firstPointXY);
    if (lineAdd == true){
        console.log("Add Line")
    }
    else if (firstPointXY[1] >= (fontsize*0.2) && firstPointXY[1] < (fontsize*0.8)){
        // 글 제거;
        OneTextSize();
        console.log("Delete Line");
    }
    else if (firstPointXY[1] >= (fontsize*0.8) && firstPointXY[1] < (fontsize*1.5)){
        // 글 수정;
        console.log("Edit Line");
    }
    else{
        console.log("Add Text in Line");
    }

    img = canvasN.toDataURL();
    text = prcOCR(img, canvasN, false);
    ctx.clearRect(0, 0, canvasN.width, canvasN.height);
}

async function prcOCR(img, NowCanvas, addSpace){
    out = await Tesseract.recognize(img, "eng", {
        workerPath: 'https://unpkg.com/tesseract.js@v4.0.1/dist/worker.min.js',
        langPath: 'https://tessdata.projectnaptha.com/4.0.0',
        corePath: 'https://unpkg.com/tesseract.js-core@v4.0.1/tesseract-core.wasm.js',
    });
    console.log(out);
    //NowCanvas.parentNode.children[0].innerText += String((addSpace ? " " : "") + out.data.text).replace("\n","");
    
}

document.addEventListener("DOMContentLoaded", () => {
    editor = document.getElementById("editor");
    OneLine = document.querySelector("section#sys > div.OneLine");
    FileText = document.getElementById("FileText");

    maxDL = LineCount();
    DisplayTextLines(1);
});

window.onresize = function(){
    maxDL = LineCount();
    DisplayTextLines(1);
}
