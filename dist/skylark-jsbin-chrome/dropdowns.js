/**
 * skylark-jsbin-chrome - A version of jsbin-chrome  that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-chrome/
 * @license MIT
 */
define(["skylark-jquery","./jsbin","./chrome","./analytics"],function(e,n,o,t){var s=!1;function i(o,s){var i;if(!n.dropdownOpen){i=e(o).closest(".menu").addClass("open").trigger("open"),t.openMenu(o.hash.substring(1));var r=i.find(":text:visible:first");r.length&&!n.mobile&&(r.focus(),setTimeout(function(){r[0].select()},0)),n.dropdownOpen=o}}function r(){if(s=!1,n.dropdownOpen){d.closest(".menu").removeClass("open").trigger("close"),n.dropdownOpen=!1,!1;var e=n.panels.focused;e&&!n.mobile&&(e.focus(),e.editor&&e.editor.focus())}}var d=e(".button-dropdown, .button-open").mousedown(function(e){return c.removeClass("hover"),n.dropdownOpen&&n.dropdownOpen!==this&&r(),n.dropdownOpen||(s=!0,i(this)),e.preventDefault(),!1}).mouseup(function(){if(s)return!1}).click(function(){return s||(t.closeMenu(this.hash.substring(1)),r()),s?(e(this.hash).attr("tabindex",0),s=!1,n.mobile):(s=!1,e(this.hash).attr("tabindex",-1),!1)});e("#actionmenu").click(function(){n.dropdownOpen=!0});var u=!1;n.$body.bind("mousedown",function(o){n.dropdownOpen&&e(o.target).closest(".menu").length&&(u=!0)}).bind("click mouseup",function(o){if(n.dropdownOpen&&!u&&!e(o.target).closest(".menu").length)return r(),!1;u=!1});var a=!1,c=e(".dropdownmenu a, .dropdownmenu .button").mouseup(function(n){"INPUT"!==n.target.nodeName&&(setTimeout(r,0),t.selectMenu(this.getAttribute("data-label")||this.hash.substring(1)||this.href),a||(this.hostname===window.location.hostname?!1!==e(this).triggerHandler("click")&&(window.location=this.href):this.getAttribute("target")?window.open(this.href):window.location=this.href),a=!1)}).mouseover(function(){c.removeClass("hover"),e(this).addClass("hover")}).mousedown(function(e){"INPUT"!==e.target.nodeName&&(a=!0)});return o.dropdowns={opendropdown:i,closedropdown:r}});
//# sourceMappingURL=sourcemaps/dropdowns.js.map
