/**
 * skylark-jsbin-chrome - A version of jsbin-chrome  that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-jsbin-chrome/
 * @license MIT
 */
define(["skylark-jquery","./chrome"],function(e,n){var t={track:function(e,n,t){window.ga&&ga("send","event",e,n,t)},experiment:function(e){t.track("experiment",e)},openMenu:function(e){t.track("menu","open",e)},closeMenu:function(e){t.track("menu","close",e)},selectMenu:function(e){e&&t.track("menu","select",e)}};return n.analytics=t});
//# sourceMappingURL=sourcemaps/analytics.js.map
