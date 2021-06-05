/**
 * skylark-jsbin-chrome - A version of jsbin-chrome  that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-chrome/
 * @license MIT
 */
define(["skylark-jquery","./jsbin","./chrome","./analytics"],function(n,e,o,t){var i,s=!1;function r(o,i){var s;if(!e.dropdownOpen){s=n(o).closest(".menu").addClass("open").trigger("open"),t.openMenu(o.hash.substring(1));var r=s.find(":text:visible:first");r.length&&!e.mobile&&(r.focus(),setTimeout(function(){r[0].select()},0)),e.dropdownOpen=o}}function d(){s=!1,e.dropdownOpen&&(i.closest(".menu").removeClass("open").trigger("close"),e.dropdownOpen=!1,!1)}return o.dropdowns={opendropdown:r,closedropdown:d,load:function(){i=n(".button-dropdown, .button-open").mousedown(function(n){return a.removeClass("hover"),e.dropdownOpen&&e.dropdownOpen!==this&&d(),e.dropdownOpen||(s=!0,r(this)),n.preventDefault(),!1}).mouseup(function(){if(s)return!1}).click(function(){return s||(t.closeMenu(this.hash.substring(1)),d()),s?(n(this.hash).attr("tabindex",0),s=!1,e.mobile):(s=!1,n(this.hash).attr("tabindex",-1),!1)}),n("#actionmenu").click(function(){e.dropdownOpen=!0});var o=!1;e.$body.bind("mousedown",function(t){e.dropdownOpen&&n(t.target).closest(".menu").length&&(o=!0)}).bind("click mouseup",function(t){if(e.dropdownOpen&&!o&&!n(t.target).closest(".menu").length)return d(),!1;o=!1});var u=!1,a=n(".dropdownmenu a, .dropdownmenu .button").mouseup(function(e){"INPUT"!==e.target.nodeName&&(setTimeout(d,0),t.selectMenu(this.getAttribute("data-label")||this.hash.substring(1)||this.href),u||(this.hostname===window.location.hostname?!1!==n(this).triggerHandler("click")&&(window.location=this.href):this.getAttribute("target")?window.open(this.href):window.location=this.href),u=!1)}).mouseover(function(){a.removeClass("hover"),n(this).addClass("hover")}).mousedown(function(n){"INPUT"!==n.target.nodeName&&(u=!0)})}}});
//# sourceMappingURL=sourcemaps/dropdowns.js.map
