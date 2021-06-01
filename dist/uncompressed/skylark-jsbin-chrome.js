/**
 * skylark-jsbin-chrome - A version of jsbin-chrome  that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-chrome/
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-jsbin-chrome/jsbin',[
	"skylark-jsbin-base/jsbin"
],function(jsbin){
	return jsbin;
});
define('skylark-jsbin-chrome/chrome',[
	"./jsbin"
],function(jsbin){
	return jsbin.chrome = {};
});
define('skylark-jsbin-chrome/analytics',[
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
define('skylark-jsbin-chrome/dropdowns',[
  "skylark-jquery",
   "./jsbin",
   "./chrome",
   "./analytics"
],function ($,jsbin,chrome,analytics) {
  //moved from chrome/navigation.js

  var 
      //dropdownOpen = false,
      onhover = false,
      menuDown = false;

  function opendropdown(el, nofocus) {
    var menu;
    if (!jsbin.dropdownOpen) {
      menu = $(el).closest('.menu').addClass('open').trigger('open');
      // $body.addClass('menuinfo');
      analytics.openMenu(el.hash.substring(1));
      var input = menu.find(':text:visible:first');

      if (input.length && !jsbin.mobile) {
        input.focus();
        setTimeout(function () {
          input[0].select();
        }, 0);
      }
      jsbin.dropdownOpen = el;
    }
  }

  function closedropdown() {
    menuDown = false;
    if (jsbin.dropdownOpen) {
      dropdownButtons.closest('.menu').removeClass('open').trigger('close');
      // $body.removeClass('menuinfo');
      jsbin.dropdownOpen = false;
      onhover = false;
      var f = jsbin.panels.focused; // TODO
      if (f && !jsbin.mobile) {
        f.focus();
        if (f.editor) {
          f.editor.focus();
        }
      }
    }
  }

  var dropdownButtons = $('.button-dropdown, .button-open').mousedown(function (e) {
    $dropdownLinks.removeClass('hover');
    if (jsbin.dropdownOpen && jsbin.dropdownOpen !== this) {
      closedropdown();
    }
    if (!jsbin.dropdownOpen) {
      menuDown = true;
      opendropdown(this);
    }
    e.preventDefault();
    return false;
  }).mouseup(function () {
    if (menuDown) return false;
  }).click(function () {
    if (!menuDown) {
      analytics.closeMenu(this.hash.substring(1));
      closedropdown();
    }
    if (menuDown) {
      $(this.hash).attr('tabindex', 0);
      menuDown = false;
      return jsbin.mobile;
    }

    menuDown = false;

    $(this.hash).attr('tabindex', -1);
    return false;
  });

  $('#actionmenu').click(function () {
    jsbin.dropdownOpen = true;
  });

  var ignoreUp = false;
  jsbin.$body.bind('mousedown', function (event) {
    if (jsbin.dropdownOpen) {
      if ($(event.target).closest('.menu').length) {
        ignoreUp = true;
      }
    }
  }).bind('click mouseup', function (event) {
    if (jsbin.dropdownOpen && !ignoreUp) {
      if (!$(event.target).closest('.menu').length) {
        closedropdown();
        return false;
      }
    }
    ignoreUp = false;
  });

  var fromClick = false;
  var $dropdownLinks = $('.dropdownmenu a, .dropdownmenu .button').mouseup(function (e) {
    if (e.target.nodeName === 'INPUT') {
      return;
    }

    setTimeout(closedropdown, 0);
    analytics.selectMenu(this.getAttribute('data-label') || this.hash.substring(1) || this.href);
    if (!fromClick) {
      if (this.hostname === window.location.hostname) {
        if ($(this).triggerHandler('click') !== false) {
          window.location = this.href;
        }
      } else {
        if (this.getAttribute('target')) {
          window.open(this.href);
        } else {
          window.location = this.href;
        }
      }
    }
    fromClick = false;
  }).mouseover(function () {
    $dropdownLinks.removeClass('hover');
    $(this).addClass('hover');
  }).mousedown(function (e) {
    if (e.target.nodeName === 'INPUT') {
      return;
    }
    fromClick = true;
  });


  return chrome.dropdowns = {
    opendropdown,
    closedropdown
  }
});
define('skylark-jsbin-chrome/hideOpen',[
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
define('skylark-jsbin-chrome/main',[
	"./chrome",
	"./analytics",
	"./dropdowns",
	"./hideOpen"
],function(chrome){
	return chrome;
});
define('skylark-jsbin-chrome', ['skylark-jsbin-chrome/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-jsbin-chrome.js.map
