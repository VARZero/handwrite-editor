let fontsize = Number(getComputedStyle(document.documentElement).getPropertyValue("--fontsize").replace(/[^0-9]/g,""));
let maxDL;
let FileLineEnd = 1, ScrollFirstLine = 1;
let Texts = [];

function OneTextSize(){
    return document.getElementById("#textsize").offsetWidth;
}

function LineCount(){
    return window.innerWidth / (fontsize * 2);
}

function FileReadtoLocal(){
    
}


function DisplayTextLines(DLStart){
    // 지금까지 작성된 코드 내보내기 부분 필요
    editor.removeChild();
    for (Line=1; ((Line+DLStart-1)<=maxDL || (Line+DLStart-1)!=FileLineEnd); Line+=1){
        Oline = OneLine.cloneNode(); Oline.id += String(Line);

        editor.appendChild(Oline);
    }
}

function NewLine(){

}

document.onload = function(){
    const editor = document.getElementById("editor");
    const OneLine = document.querySelector("#sys > div.OneLine");
    const FileText = document.getElementById("FileText");

    LineCount();
}

document.onresize = function(){
    LineCount();
    DisplayTextLines();
}