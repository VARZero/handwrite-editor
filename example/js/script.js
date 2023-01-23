function processPostElem(){
    // 이전 편집상태 삭제
    postEdit = document.getElementsByClassName("Editing");
    if (postEdit.length != 0){
        postEdit[0].addEventListener("pointerdown", LineClick);
        //postEdit[0].querySelector('canvas').remove(); // 이부분은 나중에 처리로직으로 변경하고 그 로직의 끝이 remove코드
        postEdit[0].classList.remove("Editing");
        postSelc = document.getElementsByClassName("Selecting");
        if (postSelc.length != 0){
            postSelc[0].classList.remove("Selecting");
        }
        else{
            document.getElementsByClassName("NewLine")[0].classList.remove("NewLine");
        }
    }
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
    TextLineRight = document.createElement("canvas"); TextLineRight.id = "cright";
    TextLineBottom = document.createElement("canvas"); TextLineBottom.id = "cbottom";
    Line.appendChild(TextLineRight); Line.appendChild(TextLineBottom);
}

function NewLine(Sepr){
    TextCanv = document.createElement("canvas");
    Sepr.appendChild(TextCanv);
}

window.onload = function(){
    LTs = document.getElementsByClassName("LineText");
    LSs = document.getElementsByClassName("LineSepr");

    for (LTo of LTs){ LTo.addEventListener("pointerdown", LineClick); }
    for (LSo of LSs){ LSo.addEventListener("pointerdown", LineClick); }
}