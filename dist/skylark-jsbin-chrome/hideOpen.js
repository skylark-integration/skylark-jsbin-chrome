/**
 * skylark-jsbin-chrome - A version of jsbin-chrome  that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-chrome/
 * @license MIT
 */
define(["./chrome","./dropdowns"],function(e,i){return chrome.hideOpen=function(){e.infocardVisible&&($("#infocard").removeClass("open"),e.infocardVisible=!1),e.sideNavVisible&&($body.removeClass("show-nav"),e.sideNavVisible=!1),e.urlHelpVisible?(e.$body.removeClass("urlHelp"),e.urlHelpVisible=!1,analytics.closeMenu("help")):e.keyboardHelpVisible?(e.$body.removeClass("keyboardHelp"),e.keyboardHelpVisible=!1,analytics.closeMenu("keyboardHelp")):e.dropdownOpen?i.closedropdown():e.loginVisible&&($("#login").hide(),analytics.closeMenu("login"),e.loginVisible=!1)}});
//# sourceMappingURL=sourcemaps/hideOpen.js.map
