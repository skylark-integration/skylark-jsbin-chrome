define([
	"./chrome",
  "./dropdowns"
],function(jsbin,dropdowns){
  //moved from chrome/esc.js
  function hideOpen() {
    if (jsbin.infocardVisible) {
      $('#infocard').removeClass('open');
     jsbin.infocardVisible = false;
    }
    if (jsbin.sideNavVisible) {
      $body.removeClass('show-nav');
      jsbin.sideNavVisible = false;
    }
    if (jsbin.urlHelpVisible) {
      jsbin.$body.removeClass('urlHelp');
      jsbin.urlHelpVisible = false;
      analytics.closeMenu('help');
    } else if (jsbin.keyboardHelpVisible) {
      jsbin.$body.removeClass('keyboardHelp');
      jsbin.keyboardHelpVisible = false;
      analytics.closeMenu('keyboardHelp');
    } else if (jsbin.dropdownOpen) {
      dropdowns.closedropdown();
    } else if (jsbin.loginVisible) {
      $('#login').hide();
      analytics.closeMenu('login');
      jsbin.loginVisible = false;
    }
  }
  return chrome.hideOpen = hideOpen;
});