/**
 * skylark-jsbin-chrome - A version of jsbin-chrome  that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-chrome/
 * @license MIT
 */
define(["skylark-jquery","./chrome"],function(t,e){return e.spinner=function(t){"use strict";var e=t||document.createElement("canvas");if(!e.getContext)return!1;var n=e.getContext("2d"),r=null;e.height=e.width=11;var i=Math.PI/180,a=e.width,o=e.height,l=0,c=4,s=4,h=1/7;n.strokeStyle="rgba(0,0,0,.5)",n.lineWidth=1.5;var u=!0;return{element:e,start:function t(){r=window.requestAnimationFrame(t);var e=(l+=s)*h%360,f=l%360;f===e&&(u=!u,e-=1),n.fillStyle="#f9f9f9",n.strokeStyle="#111",n.fillRect(a/2-2*c,o/2-2*c,4*c,4*c),n.beginPath(),n.arc(a/2+.5,o/2+.5,c,e*i,f*i,u),n.stroke(),n.strokeStyle="#999",n.beginPath(),n.arc(a/2+.5,o/2+.5,c,f*i,e*i,u),n.stroke(),n.closePath()},stop:function(){window.cancelAnimationFrame(r)}}}});
//# sourceMappingURL=sourcemaps/spinner.js.map
