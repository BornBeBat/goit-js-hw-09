const t=document.querySelector("body");let e=null;function r(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}t.addEventListener("click",(function(a){a.target.dataset.hasOwnProperty("start")&&(a.target.nextElementSibling.removeAttribute("disabled"),a.target.setAttribute("disabled",""),t.setAttribute("style",`background-color: ${r()}`),e=setInterval((()=>{t.setAttribute("style",`background-color: ${r()}`)}),1e3));a.target.dataset.hasOwnProperty("stop")&&(a.target.setAttribute("disabled",""),a.target.previousElementSibling.removeAttribute("disabled"),clearInterval(e))}));
//# sourceMappingURL=01-color-switcher.29bd1b68.js.map
