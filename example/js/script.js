function processPostElem(){
    // 이전 편집상태 삭제
    postEdit = document.getElementsByClassName("Editing");
    if (postEdit.length != 0){
        postEdit[0].classList.remove("Editing");
        postEdit[0].addEvetnListener("pointerdown", LineClick);
        document.getElementsByClassName("Selecting")[0].classList.remove("Selecting");
    }
}

function LineClick(event){
    Line = event.target;
    LineNum = Line.parentNode.id;

    processPostElem();

    // 이벤트 무력화 및 편집상태 적용
    Line.removeEventListener("pointerdown", LineClick);
    LineType = Line.className;
    Line.className += "Editing";
    Num = document.querySelector("#L_"+LineNum+".OneNum");
    if (LineType == "LineText"){ Num.className += "Selecting"; }
    else if (LineType == "LineSepr"){ Num.className += "NewLine"; }
}

window.onload = function(){
    LTs = document.getElementsByClassName("LineText");
    LSs = document.getElementsByClassName("LineSepr");

    for (LTo of LTs){ LTo.addEventListener("pointerdown", LineClick); }
    for (LSo of LSs){ LSo.addEventListener("pointerdown", LineClick); }
}