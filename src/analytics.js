define([
  "skylark-jquery",
   "./chrome"
],function ($,chrome) {
  var analytics =  {
    track: function (category, action, label) { // , value
      window.ga && ga('send', 'event', category, action, label);
    },
    experiment: function (type) {
      analytics.track('experiment', type);
    },
    openMenu: function (label) {
      analytics.track('menu', 'open', label);
    },
    closeMenu: function (label) {
      analytics.track('menu', 'close', label);
    },
    selectMenu: function (item) {
      if (item) {
        analytics.track('menu', 'select', item);
      }
    },
  };

  return chrome.analytics = analytics;
});