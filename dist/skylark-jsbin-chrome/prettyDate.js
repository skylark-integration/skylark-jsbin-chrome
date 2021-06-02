/**
 * skylark-jsbin-chrome - A version of jsbin-chrome  that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-chrome/
 * @license MIT
 */
define(["skylark-jquery","skylark-jsbin-base/storage","./jsbin","./chrome"],function(e,t,r,a){function n(e){"use strict";var t=new Date((e||"").replace("Z","+0000").replace(/-/g,"/").replace(/[TZ]/g," ")),r=((new Date).getTime()-t.getTime())/1e3,a=Math.floor(r/86400);if(!(isNaN(a)||a<0))return 0===a&&((r<60?"just now":r<120&&"1 minute ago")||r<3600&&Math.floor(r/60)+" minutes ago"||r<7200&&"1 hour ago"||r<86400&&Math.floor(r/3600)+" hours ago")||function(e){var t=new Date(e),r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()],a=t.getDate()+"",n=t.getFullYear();return(new Date).getFullYear()===n?a+" "+r:a+" "+r+" "+n}(t.getTime())}return e.fn.prettyDate=function(){"use strict";return this.each(function(){var t=n(this.getAttribute("pubdate"));t&&e(this).text(t)})},a.prettyDate=n});
//# sourceMappingURL=sourcemaps/prettyDate.js.map
