!function(){let t=document.querySelector("body"),e=null;function r(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}t.addEventListener("click",function(n){let a=n.target;a.dataset.hasOwnProperty("start")&&(a.nextElementSibling.removeAttribute("disabled"),a.setAttribute("disabled",""),t.setAttribute("style",`background-color: ${r()}`),e=setInterval(()=>{t.setAttribute("style",`background-color: ${r()}`)},1e3)),a.dataset.hasOwnProperty("stop")&&(a.setAttribute("disabled",""),a.previousElementSibling.removeAttribute("disabled"),clearInterval(e))})}();
//# sourceMappingURL=01-color-switcher.6b6695ac.js.map
