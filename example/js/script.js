let charsize, tabsize;
let palmRjEnable = 0;
let EnableCanv = null, ctx = null;

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
        }
        else{
            document.getElementsByClassName("NewLine")[0].classList.remove("NewLine");
        }
    }
    EnableCanv = null; ctx = null;
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
    if (LineType == "LineText"){ Num.className += " Selecting"; }
    else if (LineType == "LineSepr"){ Num.className += " NewLine"; NewLine(Line); }
}

function EditLine(Line){
    TextOn = document.createElement("canvas");
    Line.appendChild(TextOn);
    EnableCanv = TextOn;
}

function NewLine(Sepr){
    TextCanv = document.createElement("canvas");
    Sepr.appendChild(TextCanv);
    EnableCanv = TextCanv;
}

function palmRejection(){
    // 팜리젝션
    
}

window.onload = function(){
    charsize = document.getElementById("charsize").offsetWidth;
    tabsize = charsize * 4;

    LTs = document.getElementsByClassName("LineText");
    LSs = document.getElementsByClassName("LineSepr");

    for (LTo of LTs){ LTo.addEventListener("pointerdown", LineClick); }
    for (LSo of LSs){ LSo.addEventListener("pointerdown", LineClick); }
}