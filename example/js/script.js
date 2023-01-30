let charsize, tabsize;
let palmRjEnable = 0;
let EnableCanv = null, ctx = null, WriteActv = 0; WriteFirst = 0;

function processPostElem(){
    // 이전 편집상태 삭제
    postEdit = document.getElementsByClassName("Editing");
    if (postEdit.length != 0){
        postEdit[0].addEventListener("pointerdown", LineClick);
        canvList = document.querySelectorAll('div.Editing'+' > canvas'); // 이부분은 나중에 처리로직으로 변경하고 그 로직의 끝이 remove코드
        for(canvOne of canvList){canvOne.remove();}
        postEdit[0].classList.remove("Editing");
        postSelc = document.getElementsByClassName("Selecting");
        if (postSelc.length != 0){
            postSelc[0].classList.remove("Selecting");
            EnableCanv.removeEventListener("pointerdown", canvasAt);
            EnableCanv.removeEventListener("pointermove", canvasEL);
            EnableCanv.removeEventListener("pointerup", canvasDs);
        }
        else{
            document.getElementsByClassName("NewLine")[0].classList.remove("NewLine");
            EnableCanv.removeEventListener("pointerdowm", canvasAt);
            EnableCanv.removeEventListener("pointermove", canvasNL);
            EnableCanv.removeEventListener("pointerup", canvasDs);
        }
    }
    EnableCanv = null; ctx = null; WriteActv = 0; WriteFirst = 0;
}

function LineClick(event){
    Line = event.target;
    LineNum = Line.parentNode.id;

    processPostElem();

    // 이벤트 무력화 및 편집상태 적용
    Line.removeEventListener("pointerdown", LineClick);
    LineType = Line.className;
    Line.className += " Editing";
    Num = document.querySelector("#"+LineNum+".OneNum");
    if (LineType == "LineText"){ Num.className += " Selecting"; EditLine(Line); }
    else if (LineType == "LineSepr"){ Num.className += " NewLine"; NewLine(Line); }
}

function EditLine(Line){
    Line.innerHTML += "<canvas width='100px' height='3000px'></canvas>"; TextOn = document.querySelector("div.LineText.Editing > canvas");
    EnableCanv = TextOn; ctx = EnableCanv.getContext("2d");
    EnableCanv.addEventListener("pointerdown", canvasAt);
    EnableCanv.addEventListener("pointermove", canvasEL);
    EnableCanv.addEventListener("pointerup", canvasDs);
    ctx.lineWidth = 5; ctx.lineCap = "round"; ctx.strokeStyle = "#fff";
}

function NewLine(Sepr){
    Sepr.innerHTML += "<canvas width='100px' height='3000px'></canvas>"; TextCanv = document.querySelector("div.LineSepr.Editing > canvas");
    EnableCanv = TextCanv; ctx = EnableCanv.getContext("2d");
    EnableCanv.addEventListener("pointerdown", canvasAt);
    EnableCanv.addEventListener("pointermove", canvasNL);
    EnableCanv.addEventListener("pointerup", canvasDs);
    ctx.lineWidth = 5; ctx.lineCap = "round"; ctx.strokeStyle = "#fff";
}

function palmRejection(){
    // 팜리젝션
    
}

function canvasAt(){WriteActv = 1;}
function canvasDs(){WriteActv = 0;}

function canvasEL(e){
    xx = e.offsetX; yy = e.offsetY;
    if (!WriteActv){return;}
    ctx.beginPath();
    ctx.moveTo(xx, yy);
    ctx.lineTo(xx, yy);
    ctx.stroke();
}

function canvasNL(e){
    xx = e.offsetX; yy = e.offsetY;
    if (!WriteActv){return;}
    ctx.beginPath();
    ctx.moveTo(xx, yy);
    ctx.lineTo(xx, yy);
    ctx.stroke();
}

window.onload = function(){
    charsize = document.getElementById("charsize").offsetWidth;
    tabsize = charsize * 4;

    LTs = document.getElementsByClassName("LineText");
    LSs = document.getElementsByClassName("LineSepr");

    for (LTo of LTs){ LTo.addEventListener("pointerdown", LineClick); }
    for (LSo of LSs){ LSo.addEventListener("pointerdown", LineClick); }
}