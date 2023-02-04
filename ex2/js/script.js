let fontsize = getComputedStyle(document.documentElement).getPropertyValue("--fontsize");
let newDL;

function DisplayLine(){ newDL = window.innerWidth / (fontsize * 2); return newDL; }
