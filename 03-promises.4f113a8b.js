var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},i=e.parcelRequired7c6;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in o){var i=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,i.call(n.exports,n,n.exports),n.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},e.parcelRequired7c6=i),i.register;var n=i("iQIUW");const r=document.querySelector(".form");r.addEventListener("submit",function(e){e.preventDefault();let{delay:t,step:o,amount:i}=r;!function(e,t,o){let i=+e;for(let e=1;e<=o;e+=1)(function(e,t){return new Promise((o,i)=>{let n=Math.random()>.3;setTimeout(()=>{n&&o({position:e,delay:t}),i({position:e,delay:t})},t)})})(e,i).then(({position:e,delay:t})=>{(0,n.Notify).success(`\u{2705} Fulfilled promise ${e} in ${t}ms`)}).catch(({position:e,delay:t})=>{(0,n.Notify).failure(`\u{274C} Rejected promise ${e} in ${t}ms`)}),i+=+t}(t.value,o.value,i.value)});
//# sourceMappingURL=03-promises.4f113a8b.js.map
