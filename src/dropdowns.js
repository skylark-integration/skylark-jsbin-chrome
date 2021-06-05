define([
  "skylark-jquery",
   "./jsbin",
   "./chrome",
   "./analytics"
],function ($,jsbin,chrome,analytics) {
  //moved from chrome/navigation.js

  var 
      //dropdownOpen = false,
      onhover = false,
      menuDown = false,
      dropdownButtons;

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
      /*
      var f = jsbin.panels.focused; // TODO
      if (f && !jsbin.mobile) {
        f.focus();
        if (f.editor) {
          f.editor.focus();
        }
      }
      */
    }
  }

  function load() {
    dropdownButtons = $('.button-dropdown, .button-open').mousedown(function (e) {
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

  }

  return chrome.dropdowns = {
    opendropdown,
    closedropdown,
    load
  }
});