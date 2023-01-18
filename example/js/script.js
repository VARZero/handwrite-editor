function LineClick(event){
    line = event.currentTarget
    El = event.Target;
    console.log(line); console.log(El);
    NumEl = document.querySelector("#"+line+".OneNum")
    if (El.className == "LineText"){
        El.style.height = "calc(var(--textsize) * 5);";
        El.style.fontSize = "calc(var(--textsize) * 1.5);";
        El.style.fontFamily = "font-family: 'Shadows Into Light';";
        NumEl.style.height = "calc(var(--textsize) * 5.4);";
    }
    else if(El.className == "LineSepr"){
        El.style.height = "calc(var(--textsize) * 3.8);";
        NumEl.style.height = "calc(var(--textsize) * 4.4);";
    }
    NumEl += " selecting"
    El.className += " editing"
}

document.addEventListener("click", function(){
    selecting = document.querySelector(".selecting");
    selecting.style.height = "";
    selecting.className.replace(" selecting", "");

    editing = document.querySelector(".editing");
    editing.style.height = "";
    editing.style.fontSize = "";
    editing.style.fontFamily = "";
    editing.className.replace(" editing", "");
})