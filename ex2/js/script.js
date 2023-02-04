let fontsize = Number(getComputedStyle(document.documentElement).getPropertyValue("--fontsize").replace(/[^0-9]/g,""));
let maxDL;
let FileLineEnd = 1;
const editor = document.getElementById("editor");
const OneLine = document.querySelector("#sys > div.OneLine")


function LineCount(){
    maxDL = window.innerWidth / (fontsize * 2); return maxDL;
}

function DisplayTextLines(DLStart){
    // 지금까지 작성된 코드 내보내기 부분 필요
    editor.removeChild();
    for (Line=1; ((Line+DLStart-1)<=maxDL || (Line+DLStart-1)!=FileLineEnd); Line+=1){
        Oline = OneLine.cloneNode(); Oline.id += String(Line);
        // 파일에서 한줄 가져오는 코드 추가 필요
        editor.appendChild(Oline);
    }
}

function NewLine(){

}