function processPostElem(){
    // 이전 편집상태 삭제
    postEdit = document.getElementsByClassName("Editing");
    if (postEdit.lenght != 0){
        postEdit[0].classList.remove("Editing");
        postEdit[0].addEvetnListener("pointerdown", LineClick);
        document.getElementsByClassName("Selecting")[0].classList.remove("Selecting");
    }
}

function LineClick(event){
    Line = event.Target;
    LineNum = Line.parentNode.id;

    processPostElem();

    // 이벤트 무력화 및 편집상태 적용
    Line.removeEventListener("pointerdown", LineClick);
    LineType = Line.ClassName;
    Line.ClassName += "Editing";
    Num = document.querySelector("#"+LineNum+".OneNum");
    if (LineType == "LineText"){ Num.ClassName += "Selecting"; }
    else if (LineType == "LineSepr"){ Num.ClassName += "NewLine"; }
}

window.onload = function(){
    LTs = document.getElementsByClassName("LineText");
    LSs = document.getElementsByClassName("LineSepr");

    for (LTo of LTs){ LTo.addEventListener("pointerdown", LineClick); }
    for (LSo of LSs){ LSo.addEventListener("pointerdown", LineClick); }
}