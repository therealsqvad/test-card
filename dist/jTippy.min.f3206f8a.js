// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/jTippy-master/jTippy.min.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
	jTippy
	https://github.com/HTMLGuyLLC/jTippy
	Made with love by HTMLGuy, LLC
	https://htmlguy.com
	MIT Licensed
*/
(function (a) {
  a.fn.jTippy = function (b) {
    if (1 < this.length) return this.each(function () {
      a(this).jTippy(b);
    }), this;
    if ("undefined" == typeof this || 1 !== this.length) return !1;
    var c = a(this);
    b = a.extend({}, a.jTippy.defaults, b, c.data());
    var d = c.attr("title");
    "undefined" != typeof d && d.length && (b.title = d), b.class += " jt-" + b.theme + "-theme", b.class += " jt-" + b.size, "click" !== b.trigger && (b.backdrop = !1), b.trigger = b.trigger.toLowerCase().trim();
    var f = {
      dom: this,
      dom_wrapped: c,
      position_debug: b.position_debug,
      trigger: b.trigger,
      title: b.title,
      content: b.title,
      theme: b.theme,
      class: b.class,
      backdrop: b.backdrop,
      position: b.position,
      close_on_outside_click: b.close_on_outside_click,
      singleton: b.singleton,
      dataAttr: "jTippy",
      createTooltipHTML: function createTooltipHTML() {
        return "<div class='jtippy ".concat(f.class, "' role='tooltip'><div class='jt-arrow'></div><div class='jt-title'>").concat(f.content, "</div></div>");
      },
      createBackdropHTML: function createBackdropHTML() {
        return !!f.backdrop && "<div class='jt-backdrop jt-".concat(f.backdrop, "-backdrop'></div>");
      },
      destroy: function destroy() {
        var b = f.dom_wrapped.data(f.dataAttr);
        "undefined" != typeof b && null !== b && ("click" === b.trigger ? (b.dom_wrapped.off("touchstart mousedown", b.toggleTooltipHandler), b.dom_wrapped.off("click", b.preventDefaultHandler)) : "focus" === b.trigger ? (b.dom_wrapped.off("touchstart focus", b.show), b.dom_wrapped.off("touchend blur", b.hide)) : "hover" === b.trigger ? (b.dom_wrapped.off("touchstart mouseenter", b.show), b.dom_wrapped.off("touchend mouseleave", b.hide)) : "hoverfocus" === b.trigger && (b.dom_wrapped.off("focus", b.hoverfocusFocusShow), b.dom_wrapped.off("blur", b.hoverfocusBlur), b.dom_wrapped.off("touchstart mouseenter", b.show), b.dom_wrapped.off("touchend mouseleave", b.hoverfocusHide)), a(window).off("resize", b.onResize), b.isVisible() && b.hide(), b.dom_wrapped.data(b.dataAttr, null));
      },
      initialize: function initialize() {
        return "click" === f.trigger ? (f.dom_wrapped.on("touchstart mousedown", f.toggleTooltipHandler), f.dom_wrapped.on("click", f.preventDefaultHandler)) : "focus" === f.trigger ? (f.dom_wrapped.on("touchstart focus", f.show), f.dom_wrapped.on("touchend blur", f.hide)) : "hover" === f.trigger ? (f.dom_wrapped.on("touchstart mouseenter", f.show), f.dom_wrapped.on("touchend mouseleave", f.hide)) : "hoverfocus" === f.trigger && (f.dom_wrapped.on("focus", f.hoverfocusFocusShow), f.dom_wrapped.on("blur", f.hoverfocusBlur), f.dom_wrapped.on("touchstart mouseenter", f.show), f.dom_wrapped.on("touchend mouseleave", f.hoverfocusHide)), a.jTippy.body_click_initialized || (a(document).on("touchstart mousedown", f.onClickOutside), a.jTippy.bodyClickInitialized = !0), f.dom_wrapped.data(f.dataAttr, f), f.dom;
      },
      hoverfocusFocusShow: function hoverfocusFocusShow() {
        f.dom_wrapped.addClass("jt-focused"), f.show();
      },
      hoverfocusBlur: function hoverfocusBlur() {
        f.dom_wrapped && f.dom_wrapped.length && f.dom_wrapped.removeClass("jt-focused"), f.hide();
      },
      hoverfocusHide: function hoverfocusHide() {
        return !f.dom_wrapped.hasClass("jt-focused") && void f.hide();
      },
      preventDefaultHandler: function preventDefaultHandler(a) {
        return a.preventDefault(), !1;
      },
      toggleTooltipHandler: function toggleTooltipHandler(a) {
        return a.preventDefault(), f.isVisible() && f.hide() || f.show(), !1;
      },
      show: function show(b) {
        if (f.isVisible()) return !1;
        f.singleton && f.hideAllVisible();
        var c = a("body");
        "blurred" === f.backdrop ? c.addClass("jt-blurred-body") : f.backdrop && c.append(f.createBackdropHTML()), ("undefined" == typeof b || b) && "function" == typeof f.title && (f.content = f.title(f.dom_wrapped, f)), c.append(f.createTooltipHTML()), f.tooltip = a(".jtippy:last"), f.positionTooltip(), a(window).on("resize", f.onResize);
        var d = "jTippy" + Date.now();
        f.tooltip.attr("id", d), f.dom.attr("aria-describedby", d), a.jTippy.visible.push(f), ("undefined" == typeof b || b) && f.dom.trigger("jt-show", [f.tooltip, f.hide]), a("body").on("DOMSubtreeModified", f.positionTooltip);
      },
      isVisible: function isVisible() {
        return -1 < a.inArray(f, a.jTippy.visible);
      },
      hideAllVisible: function hideAllVisible() {
        return a.each(a.jTippy.visible, function (a, b) {
          b.dom_wrapped.hasClass("jt-focused") || b.hide();
        }), this;
      },
      hide: function hide(b) {
        a("body").off("DOMSubtreeModified", f.positionTooltip), a(window).off("resize", f.onResize), f.dom.attr("aria-describedby", null), f.tooltip && f.tooltip.length && f.tooltip.remove(), "blurred" === f.backdrop ? a("body").removeClass("jt-blurred-body") : f.backdrop && a(".jt-backdrop").remove(), ("undefined" == typeof b || b) && f.dom.trigger("jt-hide"), "click" !== f.trigger && f.dom_wrapped.off("touchstart mousedown", f.hide);
        var c = a.inArray(f, a.jTippy.visible);
        return a.jTippy.visible.splice(c, 1), f.dom;
      },
      onResize: function onResize() {
        f.hide(!1), f.show(!1);
      },
      onClickOutside: function onClickOutside(b) {
        var c = a(b.target);
        c.hasClass("jtippy") || c.parents(".jtippy:first").length || a.each(a.jTippy.visible, function (a, b) {
          "undefined" != typeof b && b.close_on_outside_click && (c !== b.dom_wrapped || "focus" !== b.trigger && "hoverfocus" !== b.trigger) && b.hide();
        });
      },
      positionTooltip: function positionTooltip() {
        var _f$calculateSafePosit3, _f$calculateSafePosit4;

        f.positionDebug("-- Start positioning --"), f.dom_wrapped.length && f.dom_wrapped.is(":visible") || (f.positionDebug("Elem no longer exists. Removing tooltip"), f.hide(!0));

        var a = f.tooltip.find(".jt-arrow"),
            _f$calculateSafePosit = f.calculateSafePosition(f.position),
            _f$calculateSafePosit2 = _slicedToArray(_f$calculateSafePosit, 6),
            b = _f$calculateSafePosit2[0],
            c = _f$calculateSafePosit2[1],
            d = _f$calculateSafePosit2[2],
            e = _f$calculateSafePosit2[3],
            g = _f$calculateSafePosit2[4],
            h = _f$calculateSafePosit2[5];

        return ("undefined" == typeof g && "auto" !== f.position && (f.positionDebug("Couldn't fit preferred position"), (_f$calculateSafePosit3 = f.calculateSafePosition("auto"), _f$calculateSafePosit4 = _slicedToArray(_f$calculateSafePosit3, 6), b = _f$calculateSafePosit4[0], c = _f$calculateSafePosit4[1], d = _f$calculateSafePosit4[2], e = _f$calculateSafePosit4[3], g = _f$calculateSafePosit4[4], h = _f$calculateSafePosit4[5], _f$calculateSafePosit3)), "undefined" == typeof g) ? (f.positionDebug("Doesn't appear to fit. Displaying centered"), f.tooltip.addClass("jt-centered").css({
          top: "50%",
          left: "50%",
          "margin-left": -(d / 2),
          "margin-top": -(e / 2)
        }), a && a.length && a.remove(), void f.positionDebug("-- Done positioning --")) : (f.positionDebug({
          "Setting Position": {
            Left: g,
            Top: h
          }
        }), f.tooltip.css("left", g), f.tooltip.css("top", h), 60 > c && (f.positionDebug("Element is less than " + c + "px. Setting arrow to hug the side tighter"), b += " jt-arrow-super-hug"), a.addClass("jt-arrow-" + b), f.positionDebug("-- Done positioning --"), f);
      },
      calculateSafePosition: function calculateSafePosition(a) {
        var b = f.tooltip.find(".jt-arrow"),
            c = f.dom_wrapped.offset(),
            d = f.dom_wrapped.outerHeight(),
            e = f.dom_wrapped.outerWidth(),
            g = f.tooltip.outerWidth(),
            h = f.tooltip.outerHeight(),
            i = document.querySelector("body").offsetWidth,
            j = document.querySelector("body").offsetHeight,
            k = b.is(":visible") ? b.outerHeight() : 0,
            l = b.is(":visible") ? b.outerWidth() : 0,
            m = {};
        m.below = 5 < j - (h + d + c.top), m.above = 5 < c.top - h, m.vertical_half = 5 < c.top + e / 2 - h / 2, m.right = 5 < i - (g + e + c.left), m.right_half = 5 < i - c.left - e / 2 - g / 2, m.right_full = 5 < i - c.left - g, m.left = 5 < c.left - g, m.left_half = 5 < c.left + e / 2 - g / 2, m.left_full = 5 < c.left - g, f.positionDebug({
          "Clicked Element": {
            Left: c.left,
            Top: c.top
          }
        }), f.positionDebug({
          "Element Dimensions": {
            Height: d,
            Width: e
          },
          "Tooltip Dimensions": {
            Height: h,
            Width: g
          },
          "Window Dimensions": {
            Height: j,
            Width: i
          },
          "Arrow Dimensions": {
            Height: k,
            Width: l
          }
        }), f.positionDebug(m);
        var n, o, p;
        return ("auto" === a || "bottom" === a) && m.below && m.left_half && m.right_half ? (f.positionDebug("Displaying below, centered"), n = "top", o = c.left - g / 2 + e / 2, p = c.top + d + k / 2) : ("auto" === a || "top" === a) && m.above && m.left_half && m.right_half ? (f.positionDebug("Displaying above, centered"), n = "bottom", o = c.left - g / 2 + e / 2, p = c.top - h - k / 2) : ("auto" === a || "left" === a) && m.left && m.vertical_half ? (f.positionDebug("Displaying left, centered"), n = "right", o = c.left - g - l / 2, p = c.top + d / 2 - h / 2) : ("auto" === a || "right" === a) && m.right && m.vertical_half ? (f.positionDebug("Displaying right, centered"), n = "left", o = c.left + e + l / 2, p = c.top + d / 2 - h / 2) : ("auto" === a || "bottom" === a) && m.below && m.right_full ? (f.positionDebug("Displaying below, to the right"), n = "top jt-arrow-hug-left", o = c.left, p = c.top + d + k / 2) : ("auto" === a || "bottom" === a) && m.below && m.left_full ? (f.positionDebug("Displaying below, to the left"), n = "top jt-arrow-hug-right", o = c.left + e - g, p = c.top + d + k / 2) : ("auto" === a || "top" === a) && m.above && m.right_full ? (f.positionDebug("Displaying above, to the right"), n = "bottom jt-arrow-hug-left", o = c.left, p = c.top - h - k / 2) : ("auto" === a || "top" === a) && m.above && m.left_full && (f.positionDebug("Displaying above, to the left"), n = "bottom jt-arrow-hug-right", o = c.left + e - g, p = c.top - h - k / 2), [n, e, g, h, o, p];
      },
      positionDebug: function positionDebug(a) {
        return !!f.position_debug && ("object" == _typeof(a) ? console.table(a) : console.log("Position: ".concat(a)));
      }
    };
    return f.destroy(), f.initialize();
  }, a.jTippy = {}, a.jTippy.visible = [], a.jTippy.body_click_initialized = !1, a.jTippy.defaults = {
    title: "",
    trigger: "hoverfocus",
    position: "auto",
    class: "",
    theme: "black",
    size: "small",
    backdrop: !1,
    singleton: !0,
    close_on_outside_click: !0
  };
})(jQuery);
},{}],"../../../../../usr/local/share/.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44105" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/share/.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/jTippy-master/jTippy.min.js"], null)
//# sourceMappingURL=/jTippy.min.f3206f8a.js.map