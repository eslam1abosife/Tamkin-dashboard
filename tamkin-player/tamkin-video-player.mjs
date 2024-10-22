import { defineComponent as he, computed as oe, ref as ie, onBeforeMount as pe, onMounted as ve, watch as ye, onBeforeUnmount as me, resolveComponent as ge, openBlock as J, createElementBlock as ee, Fragment as be, renderList as we, createVNode as Pe } from "vue";
import Z from "video.js";
var ke = { exports: {} }, ae = { exports: {} };
/*!
 * wavesurfer.js 6.6.4 (2023-06-10)
 * https://wavesurfer-js.org
 * @license BSD-3-Clause
 */
var le;
function Ae() {
  return le || (le = 1, function(H, Y) {
    (function(U, $) {
      H.exports = $();
    })(self, () => (
      /******/
      (() => {
        var V = {
          /***/
          "./src/drawer.canvasentry.js": (
            /*!***********************************!*\
              !*** ./src/drawer.canvasentry.js ***!
              \***********************************/
            /***/
            (W, P, g) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = void 0;
              var h = R(g(
                /*! ./util/style */
                "./src/util/style.js"
              )), A = R(g(
                /*! ./util/get-id */
                "./src/util/get-id.js"
              ));
              function R(k) {
                return k && k.__esModule ? k : { default: k };
              }
              function C(k) {
                "@babel/helpers - typeof";
                return C = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(p) {
                  return typeof p;
                } : function(p) {
                  return p && typeof Symbol == "function" && p.constructor === Symbol && p !== Symbol.prototype ? "symbol" : typeof p;
                }, C(k);
              }
              function x(k, p) {
                if (!(k instanceof p))
                  throw new TypeError("Cannot call a class as a function");
              }
              function L(k, p) {
                for (var f = 0; f < p.length; f++) {
                  var u = p[f];
                  u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), Object.defineProperty(k, _(u.key), u);
                }
              }
              function b(k, p, f) {
                return p && L(k.prototype, p), Object.defineProperty(k, "prototype", { writable: !1 }), k;
              }
              function _(k) {
                var p = M(k, "string");
                return C(p) === "symbol" ? p : String(p);
              }
              function M(k, p) {
                if (C(k) !== "object" || k === null) return k;
                var f = k[Symbol.toPrimitive];
                if (f !== void 0) {
                  var u = f.call(k, p);
                  if (C(u) !== "object") return u;
                  throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(k);
              }
              var D = /* @__PURE__ */ function() {
                function k() {
                  x(this, k), this.wave = null, this.waveCtx = null, this.progress = null, this.progressCtx = null, this.start = 0, this.end = 1, this.id = (0, A.default)(typeof this.constructor.name < "u" ? this.constructor.name.toLowerCase() + "_" : "canvasentry_"), this.canvasContextAttributes = {};
                }
                return b(k, [{
                  key: "initWave",
                  value: function(f) {
                    this.wave = f, this.waveCtx = this.wave.getContext("2d", this.canvasContextAttributes);
                  }
                  /**
                   * Store the progress wave canvas element and create the 2D rendering
                   * context
                   *
                   * @param {HTMLCanvasElement} element The progress wave `canvas` element.
                   */
                }, {
                  key: "initProgress",
                  value: function(f) {
                    this.progress = f, this.progressCtx = this.progress.getContext("2d", this.canvasContextAttributes);
                  }
                  /**
                   * Update the dimensions
                   *
                   * @param {number} elementWidth Width of the entry
                   * @param {number} totalWidth Total width of the multi canvas renderer
                   * @param {number} width The new width of the element
                   * @param {number} height The new height of the element
                   */
                }, {
                  key: "updateDimensions",
                  value: function(f, u, y, O) {
                    this.start = this.wave.offsetLeft / u || 0, this.end = this.start + f / u, this.wave.width = y, this.wave.height = O;
                    var S = {
                      width: f + "px"
                    };
                    (0, h.default)(this.wave, S), this.hasProgressCanvas && (this.progress.width = y, this.progress.height = O, (0, h.default)(this.progress, S));
                  }
                  /**
                   * Clear the wave and progress rendering contexts
                   */
                }, {
                  key: "clearWave",
                  value: function() {
                    this.waveCtx.clearRect(0, 0, this.waveCtx.canvas.width, this.waveCtx.canvas.height), this.hasProgressCanvas && this.progressCtx.clearRect(0, 0, this.progressCtx.canvas.width, this.progressCtx.canvas.height);
                  }
                  /**
                   * Set the fill styles for wave and progress
                   * @param {string|string[]} waveColor Fill color for the wave canvas,
                   * or an array of colors to apply as a gradient
                   * @param {?string|string[]} progressColor Fill color for the progress canvas,
                   * or an array of colors to apply as a gradient
                   */
                }, {
                  key: "setFillStyles",
                  value: function(f, u) {
                    this.waveCtx.fillStyle = this.getFillStyle(this.waveCtx, f), this.hasProgressCanvas && (this.progressCtx.fillStyle = this.getFillStyle(this.progressCtx, u));
                  }
                  /**
                   * Utility function to handle wave color arguments
                   *
                   * When the color argument type is a string or CanvasGradient instance,
                   * it will be returned as is. Otherwise, it will be treated as an array,
                   * and a new CanvasGradient will be returned
                   *
                   * @since 6.0.0
                   * @param {CanvasRenderingContext2D} ctx Rendering context of target canvas
                   * @param {string|string[]|CanvasGradient} color Either a single fill color
                   *     for the wave canvas, an existing CanvasGradient instance, or an array
                   *     of colors to apply as a gradient
                   * @returns {string|CanvasGradient} Returns a string fillstyle value, or a
                   *     canvas gradient
                   */
                }, {
                  key: "getFillStyle",
                  value: function(f, u) {
                    if (typeof u == "string" || u instanceof CanvasGradient)
                      return u;
                    var y = f.createLinearGradient(0, 0, 0, f.canvas.height);
                    return u.forEach(function(O, S) {
                      return y.addColorStop(S / u.length, O);
                    }), y;
                  }
                  /**
                   * Set the canvas transforms for wave and progress
                   *
                   * @param {boolean} vertical Whether to render vertically
                   */
                }, {
                  key: "applyCanvasTransforms",
                  value: function(f) {
                    f && (this.waveCtx.setTransform(0, 1, 1, 0, 0, 0), this.hasProgressCanvas && this.progressCtx.setTransform(0, 1, 1, 0, 0, 0));
                  }
                  /**
                   * Draw a rectangle for wave and progress
                   *
                   * @param {number} x X start position
                   * @param {number} y Y start position
                   * @param {number} width Width of the rectangle
                   * @param {number} height Height of the rectangle
                   * @param {number} radius Radius of the rectangle
                   */
                }, {
                  key: "fillRects",
                  value: function(f, u, y, O, S) {
                    this.fillRectToContext(this.waveCtx, f, u, y, O, S), this.hasProgressCanvas && this.fillRectToContext(this.progressCtx, f, u, y, O, S);
                  }
                  /**
                   * Draw the actual rectangle on a `canvas` element
                   *
                   * @param {CanvasRenderingContext2D} ctx Rendering context of target canvas
                   * @param {number} x X start position
                   * @param {number} y Y start position
                   * @param {number} width Width of the rectangle
                   * @param {number} height Height of the rectangle
                   * @param {number} radius Radius of the rectangle
                   */
                }, {
                  key: "fillRectToContext",
                  value: function(f, u, y, O, S, E) {
                    f && (E ? this.drawRoundedRect(f, u, y, O, S, E) : f.fillRect(u, y, O, S));
                  }
                  /**
                   * Draw a rounded rectangle on Canvas
                   *
                   * @param {CanvasRenderingContext2D} ctx Canvas context
                   * @param {number} x X-position of the rectangle
                   * @param {number} y Y-position of the rectangle
                   * @param {number} width Width of the rectangle
                   * @param {number} height Height of the rectangle
                   * @param {number} radius Radius of the rectangle
                   *
                   * @return {void}
                   * @example drawRoundedRect(ctx, 50, 50, 5, 10, 3)
                   */
                }, {
                  key: "drawRoundedRect",
                  value: function(f, u, y, O, S, E) {
                    S !== 0 && (S < 0 && (S *= -1, y -= S), f.beginPath(), f.moveTo(u + E, y), f.lineTo(u + O - E, y), f.quadraticCurveTo(u + O, y, u + O, y + E), f.lineTo(u + O, y + S - E), f.quadraticCurveTo(u + O, y + S, u + O - E, y + S), f.lineTo(u + E, y + S), f.quadraticCurveTo(u, y + S, u, y + S - E), f.lineTo(u, y + E), f.quadraticCurveTo(u, y, u + E, y), f.closePath(), f.fill());
                  }
                  /**
                   * Render the actual wave and progress lines
                   *
                   * @param {number[]} peaks Array with peaks data
                   * @param {number} absmax Maximum peak value (absolute)
                   * @param {number} halfH Half the height of the waveform
                   * @param {number} offsetY Offset to the top
                   * @param {number} start The x-offset of the beginning of the area that
                   * should be rendered
                   * @param {number} end The x-offset of the end of the area that
                   * should be rendered
                   */
                }, {
                  key: "drawLines",
                  value: function(f, u, y, O, S, E) {
                    this.drawLineToContext(this.waveCtx, f, u, y, O, S, E), this.hasProgressCanvas && this.drawLineToContext(this.progressCtx, f, u, y, O, S, E);
                  }
                  /**
                   * Render the actual waveform line on a `canvas` element
                   *
                   * @param {CanvasRenderingContext2D} ctx Rendering context of target canvas
                   * @param {number[]} peaks Array with peaks data
                   * @param {number} absmax Maximum peak value (absolute)
                   * @param {number} halfH Half the height of the waveform
                   * @param {number} offsetY Offset to the top
                   * @param {number} start The x-offset of the beginning of the area that
                   * should be rendered
                   * @param {number} end The x-offset of the end of the area that
                   * should be rendered
                   */
                }, {
                  key: "drawLineToContext",
                  value: function(f, u, y, O, S, E, w) {
                    if (f) {
                      var T = u.length / 2, d = Math.round(T * this.start), n = Math.round(T * this.end) + 1, a = d, c = n, r = this.wave.width / (c - a - 1), t = O + S, l = y / O;
                      f.beginPath(), f.moveTo((a - d) * r, t), f.lineTo((a - d) * r, t - Math.round((u[2 * a] || 0) / l));
                      var i, e, o;
                      for (i = a; i < c; i++)
                        e = u[2 * i] || 0, o = Math.round(e / l), f.lineTo((i - d) * r + this.halfPixel, t - o);
                      var v = c - 1;
                      for (v; v >= a; v--)
                        e = u[2 * v + 1] || 0, o = Math.round(e / l), f.lineTo((v - d) * r + this.halfPixel, t - o);
                      f.lineTo((a - d) * r, t - Math.round((u[2 * a + 1] || 0) / l)), f.closePath(), f.fill();
                    }
                  }
                  /**
                   * Destroys this entry
                   */
                }, {
                  key: "destroy",
                  value: function() {
                    this.waveCtx = null, this.wave = null, this.progressCtx = null, this.progress = null;
                  }
                  /**
                   * Return image data of the wave `canvas` element
                   *
                   * When using a `type` of `'blob'`, this will return a `Promise` that
                   * resolves with a `Blob` instance.
                   *
                   * @param {string} format='image/png' An optional value of a format type.
                   * @param {number} quality=0.92 An optional value between 0 and 1.
                   * @param {string} type='dataURL' Either 'dataURL' or 'blob'.
                   * @return {string|Promise} When using the default `'dataURL'` `type` this
                   * returns a data URL. When using the `'blob'` `type` this returns a
                   * `Promise` that resolves with a `Blob` instance.
                   */
                }, {
                  key: "getImage",
                  value: function(f, u, y) {
                    var O = this;
                    if (y === "blob")
                      return new Promise(function(S) {
                        O.wave.toBlob(S, f, u);
                      });
                    if (y === "dataURL")
                      return this.wave.toDataURL(f, u);
                  }
                }]), k;
              }();
              P.default = D, W.exports = P.default;
            }
          ),
          /***/
          "./src/drawer.js": (
            /*!***********************!*\
              !*** ./src/drawer.js ***!
              \***********************/
            /***/
            (W, P, g) => {
              function h(E) {
                "@babel/helpers - typeof";
                return h = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(w) {
                  return typeof w;
                } : function(w) {
                  return w && typeof Symbol == "function" && w.constructor === Symbol && w !== Symbol.prototype ? "symbol" : typeof w;
                }, h(E);
              }
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = void 0;
              var A = C(g(
                /*! ./util */
                "./src/util/index.js"
              ));
              function R(E) {
                if (typeof WeakMap != "function") return null;
                var w = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakMap();
                return (R = function(n) {
                  return n ? T : w;
                })(E);
              }
              function C(E, w) {
                if (E && E.__esModule)
                  return E;
                if (E === null || h(E) !== "object" && typeof E != "function")
                  return { default: E };
                var T = R(w);
                if (T && T.has(E))
                  return T.get(E);
                var d = {}, n = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var a in E)
                  if (a !== "default" && Object.prototype.hasOwnProperty.call(E, a)) {
                    var c = n ? Object.getOwnPropertyDescriptor(E, a) : null;
                    c && (c.get || c.set) ? Object.defineProperty(d, a, c) : d[a] = E[a];
                  }
                return d.default = E, T && T.set(E, d), d;
              }
              function x(E, w) {
                if (!(E instanceof w))
                  throw new TypeError("Cannot call a class as a function");
              }
              function L(E, w) {
                for (var T = 0; T < w.length; T++) {
                  var d = w[T];
                  d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(E, _(d.key), d);
                }
              }
              function b(E, w, T) {
                return w && L(E.prototype, w), Object.defineProperty(E, "prototype", { writable: !1 }), E;
              }
              function _(E) {
                var w = M(E, "string");
                return h(w) === "symbol" ? w : String(w);
              }
              function M(E, w) {
                if (h(E) !== "object" || E === null) return E;
                var T = E[Symbol.toPrimitive];
                if (T !== void 0) {
                  var d = T.call(E, w);
                  if (h(d) !== "object") return d;
                  throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(E);
              }
              function D(E, w) {
                if (typeof w != "function" && w !== null)
                  throw new TypeError("Super expression must either be null or a function");
                E.prototype = Object.create(w && w.prototype, { constructor: { value: E, writable: !0, configurable: !0 } }), Object.defineProperty(E, "prototype", { writable: !1 }), w && k(E, w);
              }
              function k(E, w) {
                return k = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(d, n) {
                  return d.__proto__ = n, d;
                }, k(E, w);
              }
              function p(E) {
                var w = y();
                return function() {
                  var d = O(E), n;
                  if (w) {
                    var a = O(this).constructor;
                    n = Reflect.construct(d, arguments, a);
                  } else
                    n = d.apply(this, arguments);
                  return f(this, n);
                };
              }
              function f(E, w) {
                if (w && (h(w) === "object" || typeof w == "function"))
                  return w;
                if (w !== void 0)
                  throw new TypeError("Derived constructors may only return object or undefined");
                return u(E);
              }
              function u(E) {
                if (E === void 0)
                  throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return E;
              }
              function y() {
                if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
                if (typeof Proxy == "function") return !0;
                try {
                  return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                  })), !0;
                } catch {
                  return !1;
                }
              }
              function O(E) {
                return O = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(T) {
                  return T.__proto__ || Object.getPrototypeOf(T);
                }, O(E);
              }
              var S = /* @__PURE__ */ function(E) {
                D(T, E);
                var w = p(T);
                function T(d, n) {
                  var a;
                  return x(this, T), a = w.call(this), a.container = A.withOrientation(d, n.vertical), a.params = n, a.width = 0, a.height = n.height * a.params.pixelRatio, a.lastPos = 0, a.wrapper = null, a;
                }
                return b(T, [{
                  key: "style",
                  value: function(n, a) {
                    return A.style(n, a);
                  }
                  /**
                   * Create the wrapper `<wave>` element, style it and set up the events for
                   * interaction
                   */
                }, {
                  key: "createWrapper",
                  value: function() {
                    this.wrapper = A.withOrientation(this.container.appendChild(document.createElement("wave")), this.params.vertical), this.style(this.wrapper, {
                      display: "block",
                      position: "relative",
                      userSelect: "none",
                      webkitUserSelect: "none",
                      height: this.params.height + "px"
                    }), (this.params.fillParent || this.params.scrollParent) && this.style(this.wrapper, {
                      width: "100%",
                      cursor: this.params.hideCursor ? "none" : "auto",
                      overflowX: this.params.hideScrollbar ? "hidden" : "auto",
                      overflowY: "hidden"
                    }), this.setupWrapperEvents();
                  }
                  /**
                   * Handle click event
                   *
                   * @param {Event} e Click event
                   * @param {?boolean} noPrevent Set to true to not call `e.preventDefault()`
                   * @return {number} Playback position from 0 to 1
                   */
                }, {
                  key: "handleEvent",
                  value: function(n, a) {
                    !a && n.preventDefault();
                    var c = A.withOrientation(n.targetTouches ? n.targetTouches[0] : n, this.params.vertical).clientX, r = this.wrapper.getBoundingClientRect(), t = this.width, l = this.getWidth(), i = this.getProgressPixels(r, c), e;
                    return !this.params.fillParent && t < l ? e = i * (this.params.pixelRatio / t) || 0 : e = (i + this.wrapper.scrollLeft) / this.wrapper.scrollWidth || 0, A.clamp(e, 0, 1);
                  }
                }, {
                  key: "getProgressPixels",
                  value: function(n, a) {
                    return this.params.rtl ? n.right - a : a - n.left;
                  }
                }, {
                  key: "setupWrapperEvents",
                  value: function() {
                    var n = this;
                    this.wrapper.addEventListener("click", function(a) {
                      var c = A.withOrientation(a, n.params.vertical), r = n.wrapper.offsetHeight - n.wrapper.clientHeight;
                      if (r !== 0) {
                        var t = n.wrapper.getBoundingClientRect();
                        if (c.clientY >= t.bottom - r)
                          return;
                      }
                      n.params.interact && n.fireEvent("click", a, n.handleEvent(a));
                    }), this.wrapper.addEventListener("dblclick", function(a) {
                      n.params.interact && n.fireEvent("dblclick", a, n.handleEvent(a));
                    }), this.wrapper.addEventListener("scroll", function(a) {
                      return n.fireEvent("scroll", a);
                    });
                  }
                  /**
                   * Draw peaks on the canvas
                   *
                   * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays
                   * for split channel rendering
                   * @param {number} length The width of the area that should be drawn
                   * @param {number} start The x-offset of the beginning of the area that
                   * should be rendered
                   * @param {number} end The x-offset of the end of the area that should be
                   * rendered
                   */
                }, {
                  key: "drawPeaks",
                  value: function(n, a, c, r) {
                    this.setWidth(a) || this.clearWave(), this.params.barWidth ? this.drawBars(n, 0, c, r) : this.drawWave(n, 0, c, r);
                  }
                  /**
                   * Scroll to the beginning
                   */
                }, {
                  key: "resetScroll",
                  value: function() {
                    this.wrapper !== null && (this.wrapper.scrollLeft = 0);
                  }
                  /**
                   * Recenter the view-port at a certain percent of the waveform
                   *
                   * @param {number} percent Value from 0 to 1 on the waveform
                   */
                }, {
                  key: "recenter",
                  value: function(n) {
                    var a = this.wrapper.scrollWidth * n;
                    this.recenterOnPosition(a, !0);
                  }
                  /**
                   * Recenter the view-port on a position, either scroll there immediately or
                   * in steps of 5 pixels
                   *
                   * @param {number} position X-offset in pixels
                   * @param {boolean} immediate Set to true to immediately scroll somewhere
                   */
                }, {
                  key: "recenterOnPosition",
                  value: function(n, a) {
                    var c = this.wrapper.scrollLeft, r = ~~(this.wrapper.clientWidth / 2), t = this.wrapper.scrollWidth - this.wrapper.clientWidth, l = n - r, i = l - c;
                    if (t != 0) {
                      if (!a && -r <= i && i < r) {
                        var e = this.params.autoCenterRate;
                        e /= r, e *= t, i = Math.max(-e, Math.min(e, i)), l = c + i;
                      }
                      l = Math.max(0, Math.min(t, l)), l != c && (this.wrapper.scrollLeft = l);
                    }
                  }
                  /**
                   * Get the current scroll position in pixels
                   *
                   * @return {number} Horizontal scroll position in pixels
                   */
                }, {
                  key: "getScrollX",
                  value: function() {
                    var n = 0;
                    if (this.wrapper) {
                      var a = this.params.pixelRatio;
                      if (n = Math.round(this.wrapper.scrollLeft * a), this.params.scrollParent) {
                        var c = ~~(this.wrapper.scrollWidth * a - this.getWidth());
                        n = Math.min(c, Math.max(0, n));
                      }
                    }
                    return n;
                  }
                  /**
                   * Get the width of the container
                   *
                   * @return {number} The width of the container
                   */
                }, {
                  key: "getWidth",
                  value: function() {
                    return Math.round(this.container.clientWidth * this.params.pixelRatio);
                  }
                  /**
                   * Set the width of the container
                   *
                   * @param {number} width The new width of the container
                   * @return {boolean} Whether the width of the container was updated or not
                   */
                }, {
                  key: "setWidth",
                  value: function(n) {
                    if (this.width == n)
                      return !1;
                    if (this.width = n, this.params.fillParent || this.params.scrollParent)
                      this.style(this.wrapper, {
                        width: ""
                      });
                    else {
                      var a = ~~(this.width / this.params.pixelRatio) + "px";
                      this.style(this.wrapper, {
                        width: a
                      });
                    }
                    return this.updateSize(), !0;
                  }
                  /**
                   * Set the height of the container
                   *
                   * @param {number} height The new height of the container.
                   * @return {boolean} Whether the height of the container was updated or not
                   */
                }, {
                  key: "setHeight",
                  value: function(n) {
                    return n == this.height ? !1 : (this.height = n, this.style(this.wrapper, {
                      height: ~~(this.height / this.params.pixelRatio) + "px"
                    }), this.updateSize(), !0);
                  }
                  /**
                   * Called by wavesurfer when progress should be rendered
                   *
                   * @param {number} progress From 0 to 1
                   */
                }, {
                  key: "progress",
                  value: function(n) {
                    var a = 1 / this.params.pixelRatio, c = Math.round(n * this.width) * a;
                    if (c < this.lastPos || c - this.lastPos >= a) {
                      if (this.lastPos = c, this.params.scrollParent && this.params.autoCenter) {
                        var r = ~~(this.wrapper.scrollWidth * n);
                        this.recenterOnPosition(r, this.params.autoCenterImmediately);
                      }
                      this.updateProgress(c);
                    }
                  }
                  /**
                   * This is called when wavesurfer is destroyed
                   */
                }, {
                  key: "destroy",
                  value: function() {
                    this.unAll(), this.wrapper && (this.wrapper.parentNode == this.container.domElement && this.container.removeChild(this.wrapper.domElement), this.wrapper = null);
                  }
                  /* Renderer-specific methods */
                  /**
                   * Called after cursor related params have changed.
                   *
                   * @abstract
                   */
                }, {
                  key: "updateCursor",
                  value: function() {
                  }
                  /**
                   * Called when the size of the container changes so the renderer can adjust
                   *
                   * @abstract
                   */
                }, {
                  key: "updateSize",
                  value: function() {
                  }
                  /**
                   * Draw a waveform with bars
                   *
                   * @abstract
                   * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays for split channel
                   * rendering
                   * @param {number} channelIndex The index of the current channel. Normally
                   * should be 0
                   * @param {number} start The x-offset of the beginning of the area that
                   * should be rendered
                   * @param {number} end The x-offset of the end of the area that should be
                   * rendered
                   */
                }, {
                  key: "drawBars",
                  value: function(n, a, c, r) {
                  }
                  /**
                   * Draw a waveform
                   *
                   * @abstract
                   * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays for split channel
                   * rendering
                   * @param {number} channelIndex The index of the current channel. Normally
                   * should be 0
                   * @param {number} start The x-offset of the beginning of the area that
                   * should be rendered
                   * @param {number} end The x-offset of the end of the area that should be
                   * rendered
                   */
                }, {
                  key: "drawWave",
                  value: function(n, a, c, r) {
                  }
                  /**
                   * Clear the waveform
                   *
                   * @abstract
                   */
                }, {
                  key: "clearWave",
                  value: function() {
                  }
                  /**
                   * Render the new progress
                   *
                   * @abstract
                   * @param {number} position X-Offset of progress position in pixels
                   */
                }, {
                  key: "updateProgress",
                  value: function(n) {
                  }
                }]), T;
              }(A.Observer);
              P.default = S, W.exports = P.default;
            }
          ),
          /***/
          "./src/drawer.multicanvas.js": (
            /*!***********************************!*\
              !*** ./src/drawer.multicanvas.js ***!
              \***********************************/
            /***/
            (W, P, g) => {
              function h(d) {
                "@babel/helpers - typeof";
                return h = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
                  return typeof n;
                } : function(n) {
                  return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
                }, h(d);
              }
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = void 0;
              var A = b(g(
                /*! ./drawer */
                "./src/drawer.js"
              )), R = L(g(
                /*! ./util */
                "./src/util/index.js"
              )), C = b(g(
                /*! ./drawer.canvasentry */
                "./src/drawer.canvasentry.js"
              ));
              function x(d) {
                if (typeof WeakMap != "function") return null;
                var n = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap();
                return (x = function(r) {
                  return r ? a : n;
                })(d);
              }
              function L(d, n) {
                if (d && d.__esModule)
                  return d;
                if (d === null || h(d) !== "object" && typeof d != "function")
                  return { default: d };
                var a = x(n);
                if (a && a.has(d))
                  return a.get(d);
                var c = {}, r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var t in d)
                  if (t !== "default" && Object.prototype.hasOwnProperty.call(d, t)) {
                    var l = r ? Object.getOwnPropertyDescriptor(d, t) : null;
                    l && (l.get || l.set) ? Object.defineProperty(c, t, l) : c[t] = d[t];
                  }
                return c.default = d, a && a.set(d, c), c;
              }
              function b(d) {
                return d && d.__esModule ? d : { default: d };
              }
              function _(d, n) {
                if (!(d instanceof n))
                  throw new TypeError("Cannot call a class as a function");
              }
              function M(d, n) {
                for (var a = 0; a < n.length; a++) {
                  var c = n[a];
                  c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(d, k(c.key), c);
                }
              }
              function D(d, n, a) {
                return n && M(d.prototype, n), Object.defineProperty(d, "prototype", { writable: !1 }), d;
              }
              function k(d) {
                var n = p(d, "string");
                return h(n) === "symbol" ? n : String(n);
              }
              function p(d, n) {
                if (h(d) !== "object" || d === null) return d;
                var a = d[Symbol.toPrimitive];
                if (a !== void 0) {
                  var c = a.call(d, n);
                  if (h(c) !== "object") return c;
                  throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(d);
              }
              function f(d, n) {
                if (typeof n != "function" && n !== null)
                  throw new TypeError("Super expression must either be null or a function");
                d.prototype = Object.create(n && n.prototype, { constructor: { value: d, writable: !0, configurable: !0 } }), Object.defineProperty(d, "prototype", { writable: !1 }), n && u(d, n);
              }
              function u(d, n) {
                return u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(c, r) {
                  return c.__proto__ = r, c;
                }, u(d, n);
              }
              function y(d) {
                var n = E();
                return function() {
                  var c = w(d), r;
                  if (n) {
                    var t = w(this).constructor;
                    r = Reflect.construct(c, arguments, t);
                  } else
                    r = c.apply(this, arguments);
                  return O(this, r);
                };
              }
              function O(d, n) {
                if (n && (h(n) === "object" || typeof n == "function"))
                  return n;
                if (n !== void 0)
                  throw new TypeError("Derived constructors may only return object or undefined");
                return S(d);
              }
              function S(d) {
                if (d === void 0)
                  throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return d;
              }
              function E() {
                if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
                if (typeof Proxy == "function") return !0;
                try {
                  return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                  })), !0;
                } catch {
                  return !1;
                }
              }
              function w(d) {
                return w = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(a) {
                  return a.__proto__ || Object.getPrototypeOf(a);
                }, w(d);
              }
              var T = /* @__PURE__ */ function(d) {
                f(a, d);
                var n = y(a);
                function a(c, r) {
                  var t;
                  return _(this, a), t = n.call(this, c, r), t.maxCanvasWidth = r.maxCanvasWidth, t.maxCanvasElementWidth = Math.round(r.maxCanvasWidth / r.pixelRatio), t.hasProgressCanvas = r.waveColor != r.progressColor, t.halfPixel = 0.5 / r.pixelRatio, t.canvases = [], t.progressWave = null, t.EntryClass = C.default, t.canvasContextAttributes = r.drawingContextAttributes, t.overlap = 2 * Math.ceil(r.pixelRatio / 2), t.barRadius = r.barRadius || 0, t.vertical = r.vertical, t;
                }
                return D(a, [{
                  key: "init",
                  value: function() {
                    this.createWrapper(), this.createElements();
                  }
                  /**
                   * Create the canvas elements and style them
                   *
                   */
                }, {
                  key: "createElements",
                  value: function() {
                    this.progressWave = R.withOrientation(this.wrapper.appendChild(document.createElement("wave")), this.params.vertical), this.style(this.progressWave, {
                      position: "absolute",
                      zIndex: 3,
                      left: 0,
                      top: 0,
                      bottom: 0,
                      overflow: "hidden",
                      width: "0",
                      display: "none",
                      boxSizing: "border-box",
                      borderRightStyle: "solid",
                      pointerEvents: "none"
                    }), this.addCanvas(), this.updateCursor();
                  }
                  /**
                   * Update cursor style
                   */
                }, {
                  key: "updateCursor",
                  value: function() {
                    this.style(this.progressWave, {
                      borderRightWidth: this.params.cursorWidth + "px",
                      borderRightColor: this.params.cursorColor
                    });
                  }
                  /**
                   * Adjust to the updated size by adding or removing canvases
                   */
                }, {
                  key: "updateSize",
                  value: function() {
                    for (var r = this, t = Math.round(this.width / this.params.pixelRatio), l = Math.ceil(t / (this.maxCanvasElementWidth + this.overlap)); this.canvases.length < l; )
                      this.addCanvas();
                    for (; this.canvases.length > l; )
                      this.removeCanvas();
                    var i = this.maxCanvasWidth + this.overlap, e = this.canvases.length - 1;
                    this.canvases.forEach(function(o, v) {
                      v == e && (i = r.width - r.maxCanvasWidth * e), r.updateDimensions(o, i, r.height), o.clearWave();
                    });
                  }
                  /**
                   * Add a canvas to the canvas list
                   *
                   */
                }, {
                  key: "addCanvas",
                  value: function() {
                    var r = new this.EntryClass();
                    r.canvasContextAttributes = this.canvasContextAttributes, r.hasProgressCanvas = this.hasProgressCanvas, r.halfPixel = this.halfPixel;
                    var t = this.maxCanvasElementWidth * this.canvases.length, l = R.withOrientation(this.wrapper.appendChild(document.createElement("canvas")), this.params.vertical);
                    if (this.style(l, {
                      position: "absolute",
                      zIndex: 2,
                      left: t + "px",
                      top: 0,
                      bottom: 0,
                      height: "100%",
                      pointerEvents: "none"
                    }), r.initWave(l), this.hasProgressCanvas) {
                      var i = R.withOrientation(this.progressWave.appendChild(document.createElement("canvas")), this.params.vertical);
                      this.style(i, {
                        position: "absolute",
                        left: t + "px",
                        top: 0,
                        bottom: 0,
                        height: "100%"
                      }), r.initProgress(i);
                    }
                    this.canvases.push(r);
                  }
                  /**
                   * Pop single canvas from the list
                   *
                   */
                }, {
                  key: "removeCanvas",
                  value: function() {
                    var r = this.canvases[this.canvases.length - 1];
                    r.wave.parentElement.removeChild(r.wave.domElement), this.hasProgressCanvas && r.progress.parentElement.removeChild(r.progress.domElement), r && (r.destroy(), r = null), this.canvases.pop();
                  }
                  /**
                   * Update the dimensions of a canvas element
                   *
                   * @param {CanvasEntry} entry Target entry
                   * @param {number} width The new width of the element
                   * @param {number} height The new height of the element
                   */
                }, {
                  key: "updateDimensions",
                  value: function(r, t, l) {
                    var i = Math.round(t / this.params.pixelRatio), e = Math.round(this.width / this.params.pixelRatio);
                    r.updateDimensions(i, e, t, l), this.style(this.progressWave, {
                      display: "block"
                    });
                  }
                  /**
                   * Clear the whole multi-canvas
                   */
                }, {
                  key: "clearWave",
                  value: function() {
                    var r = this;
                    R.frame(function() {
                      r.canvases.forEach(function(t) {
                        return t.clearWave();
                      });
                    })();
                  }
                  /**
                   * Draw a waveform with bars
                   *
                   * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays
                   * for split channel rendering
                   * @param {number} channelIndex The index of the current channel. Normally
                   * should be 0. Must be an integer.
                   * @param {number} start The x-offset of the beginning of the area that
                   * should be rendered
                   * @param {number} end The x-offset of the end of the area that should be
                   * rendered
                   * @returns {void}
                   */
                }, {
                  key: "drawBars",
                  value: function(r, t, l, i) {
                    var e = this;
                    return this.prepareDraw(r, t, l, i, function(o) {
                      var v = o.absmax, s = o.hasMinVals;
                      o.height;
                      var m = o.offsetY, j = o.halfH, I = o.peaks, B = o.channelIndex;
                      if (l !== void 0) {
                        var N = s ? 2 : 1, q = I.length / N, F = e.params.barWidth * e.params.pixelRatio, K = e.params.barGap === null ? Math.max(e.params.pixelRatio, ~~(F / 2)) : Math.max(e.params.pixelRatio, e.params.barGap * e.params.pixelRatio), z = F + K, G = q / e.width, ce = l, fe = i, X = ce;
                        for (X; X < fe; X += z) {
                          var re = 0, ne = Math.floor(X * G) * N, de = Math.floor((X + z) * G) * N;
                          do {
                            var se = Math.abs(I[ne]);
                            se > re && (re = se), ne += N;
                          } while (ne < de);
                          var te = Math.round(re / v * j);
                          e.params.barMinHeight && (te = Math.max(te, e.params.barMinHeight)), e.fillRect(X + e.halfPixel, j - te + m, F + e.halfPixel, te * 2, e.barRadius, B);
                        }
                      }
                    });
                  }
                  /**
                   * Draw a waveform
                   *
                   * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays
                   * for split channel rendering
                   * @param {number} channelIndex The index of the current channel. Normally
                   * should be 0
                   * @param {number?} start The x-offset of the beginning of the area that
                   * should be rendered (If this isn't set only a flat line is rendered)
                   * @param {number?} end The x-offset of the end of the area that should be
                   * rendered
                   * @returns {void}
                   */
                }, {
                  key: "drawWave",
                  value: function(r, t, l, i) {
                    var e = this;
                    return this.prepareDraw(r, t, l, i, function(o) {
                      var v = o.absmax, s = o.hasMinVals;
                      o.height;
                      var m = o.offsetY, j = o.halfH, I = o.peaks, B = o.channelIndex;
                      if (!s) {
                        var N = [], q = I.length, F = 0;
                        for (F; F < q; F++)
                          N[2 * F] = I[F], N[2 * F + 1] = -I[F];
                        I = N;
                      }
                      l !== void 0 && e.drawLine(I, v, j, m, l, i, B), e.fillRect(0, j + m - e.halfPixel, e.width, e.halfPixel, e.barRadius, B);
                    });
                  }
                  /**
                   * Tell the canvas entries to render their portion of the waveform
                   *
                   * @param {number[]} peaks Peaks data
                   * @param {number} absmax Maximum peak value (absolute)
                   * @param {number} halfH Half the height of the waveform
                   * @param {number} offsetY Offset to the top
                   * @param {number} start The x-offset of the beginning of the area that
                   * should be rendered
                   * @param {number} end The x-offset of the end of the area that
                   * should be rendered
                   * @param {channelIndex} channelIndex The channel index of the line drawn
                   */
                }, {
                  key: "drawLine",
                  value: function(r, t, l, i, e, o, v) {
                    var s = this, m = this.params.splitChannelsOptions.channelColors[v] || {}, j = m.waveColor, I = m.progressColor;
                    this.canvases.forEach(function(B, N) {
                      s.setFillStyles(B, j, I), s.applyCanvasTransforms(B, s.params.vertical), B.drawLines(r, t, l, i, e, o);
                    });
                  }
                  /**
                   * Draw a rectangle on the multi-canvas
                   *
                   * @param {number} x X-position of the rectangle
                   * @param {number} y Y-position of the rectangle
                   * @param {number} width Width of the rectangle
                   * @param {number} height Height of the rectangle
                   * @param {number} radius Radius of the rectangle
                   * @param {channelIndex} channelIndex The channel index of the bar drawn
                   */
                }, {
                  key: "fillRect",
                  value: function(r, t, l, i, e, o) {
                    var v = Math.floor(r / this.maxCanvasWidth), s = Math.min(Math.ceil((r + l) / this.maxCanvasWidth) + 1, this.canvases.length), m = v;
                    for (m; m < s; m++) {
                      var j = this.canvases[m], I = m * this.maxCanvasWidth, B = {
                        x1: Math.max(r, m * this.maxCanvasWidth),
                        y1: t,
                        x2: Math.min(r + l, m * this.maxCanvasWidth + j.wave.width),
                        y2: t + i
                      };
                      if (B.x1 < B.x2) {
                        var N = this.params.splitChannelsOptions.channelColors[o] || {}, q = N.waveColor, F = N.progressColor;
                        this.setFillStyles(j, q, F), this.applyCanvasTransforms(j, this.params.vertical), j.fillRects(B.x1 - I, B.y1, B.x2 - B.x1, B.y2 - B.y1, e);
                      }
                    }
                  }
                  /**
                   * Returns whether to hide the channel from being drawn based on params.
                   *
                   * @param {number} channelIndex The index of the current channel.
                   * @returns {bool} True to hide the channel, false to draw.
                   */
                }, {
                  key: "hideChannel",
                  value: function(r) {
                    return this.params.splitChannels && this.params.splitChannelsOptions.filterChannels.includes(r);
                  }
                  /**
                   * Performs preparation tasks and calculations which are shared by `drawBars`
                   * and `drawWave`
                   *
                   * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays for
                   * split channel rendering
                   * @param {number} channelIndex The index of the current channel. Normally
                   * should be 0
                   * @param {number?} start The x-offset of the beginning of the area that
                   * should be rendered. If this isn't set only a flat line is rendered
                   * @param {number?} end The x-offset of the end of the area that should be
                   * rendered
                   * @param {function} fn The render function to call, e.g. `drawWave`
                   * @param {number} drawIndex The index of the current channel after filtering.
                   * @param {number?} normalizedMax Maximum modulation value across channels for use with relativeNormalization. Ignored when undefined
                   * @returns {void}
                   */
                }, {
                  key: "prepareDraw",
                  value: function(r, t, l, i, e, o, v) {
                    var s = this;
                    return R.frame(function() {
                      if (r[0] instanceof Array) {
                        var m = r;
                        if (s.params.splitChannels) {
                          var j = m.filter(function(z, G) {
                            return !s.hideChannel(G);
                          });
                          s.params.splitChannelsOptions.overlay || s.setHeight(Math.max(j.length, 1) * s.params.height * s.params.pixelRatio);
                          var I;
                          return s.params.splitChannelsOptions && s.params.splitChannelsOptions.relativeNormalization && (I = R.max(m.map(function(z) {
                            return R.absMax(z);
                          }))), m.forEach(function(z, G) {
                            return s.prepareDraw(z, G, l, i, e, j.indexOf(z), I);
                          });
                        }
                        r = m[0];
                      }
                      if (!s.hideChannel(t)) {
                        var B = 1 / s.params.barHeight;
                        s.params.normalize && (B = v === void 0 ? R.absMax(r) : v);
                        var N = [].some.call(r, function(z) {
                          return z < 0;
                        }), q = s.params.height * s.params.pixelRatio, F = q / 2, K = q * o || 0;
                        return s.params.splitChannelsOptions && s.params.splitChannelsOptions.overlay && (K = 0), e({
                          absmax: B,
                          hasMinVals: N,
                          height: q,
                          offsetY: K,
                          halfH: F,
                          peaks: r,
                          channelIndex: t
                        });
                      }
                    })();
                  }
                  /**
                   * Set the fill styles for a certain entry (wave and progress)
                   *
                   * @param {CanvasEntry} entry Target entry
                   * @param {string} waveColor Wave color to draw this entry
                   * @param {string} progressColor Progress color to draw this entry
                   */
                }, {
                  key: "setFillStyles",
                  value: function(r) {
                    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.params.waveColor, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.params.progressColor;
                    r.setFillStyles(t, l);
                  }
                  /**
                   * Set the canvas transforms for a certain entry (wave and progress)
                   *
                   * @param {CanvasEntry} entry Target entry
                   * @param {boolean} vertical Whether to render the waveform vertically
                   */
                }, {
                  key: "applyCanvasTransforms",
                  value: function(r) {
                    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                    r.applyCanvasTransforms(t);
                  }
                  /**
                   * Return image data of the multi-canvas
                   *
                   * When using a `type` of `'blob'`, this will return a `Promise`.
                   *
                   * @param {string} format='image/png' An optional value of a format type.
                   * @param {number} quality=0.92 An optional value between 0 and 1.
                   * @param {string} type='dataURL' Either 'dataURL' or 'blob'.
                   * @return {string|string[]|Promise} When using the default `'dataURL'`
                   * `type` this returns a single data URL or an array of data URLs,
                   * one for each canvas. When using the `'blob'` `type` this returns a
                   * `Promise` that resolves with an array of `Blob` instances, one for each
                   * canvas.
                   */
                }, {
                  key: "getImage",
                  value: function(r, t, l) {
                    if (l === "blob")
                      return Promise.all(this.canvases.map(function(e) {
                        return e.getImage(r, t, l);
                      }));
                    if (l === "dataURL") {
                      var i = this.canvases.map(function(e) {
                        return e.getImage(r, t, l);
                      });
                      return i.length > 1 ? i : i[0];
                    }
                  }
                  /**
                   * Render the new progress
                   *
                   * @param {number} position X-offset of progress position in pixels
                   */
                }, {
                  key: "updateProgress",
                  value: function(r) {
                    this.style(this.progressWave, {
                      width: r + "px"
                    });
                  }
                }]), a;
              }(A.default);
              P.default = T, W.exports = P.default;
            }
          ),
          /***/
          "./src/mediaelement-webaudio.js": (
            /*!**************************************!*\
              !*** ./src/mediaelement-webaudio.js ***!
              \**************************************/
            /***/
            (W, P, g) => {
              function h(w) {
                "@babel/helpers - typeof";
                return h = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(T) {
                  return typeof T;
                } : function(T) {
                  return T && typeof Symbol == "function" && T.constructor === Symbol && T !== Symbol.prototype ? "symbol" : typeof T;
                }, h(w);
              }
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = void 0;
              var A = R(g(
                /*! ./mediaelement */
                "./src/mediaelement.js"
              ));
              function R(w) {
                return w && w.__esModule ? w : { default: w };
              }
              function C(w, T) {
                if (!(w instanceof T))
                  throw new TypeError("Cannot call a class as a function");
              }
              function x(w, T) {
                for (var d = 0; d < T.length; d++) {
                  var n = T[d];
                  n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(w, b(n.key), n);
                }
              }
              function L(w, T, d) {
                return T && x(w.prototype, T), Object.defineProperty(w, "prototype", { writable: !1 }), w;
              }
              function b(w) {
                var T = _(w, "string");
                return h(T) === "symbol" ? T : String(T);
              }
              function _(w, T) {
                if (h(w) !== "object" || w === null) return w;
                var d = w[Symbol.toPrimitive];
                if (d !== void 0) {
                  var n = d.call(w, T);
                  if (h(n) !== "object") return n;
                  throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(w);
              }
              function M() {
                return typeof Reflect < "u" && Reflect.get ? M = Reflect.get.bind() : M = function(T, d, n) {
                  var a = D(T, d);
                  if (a) {
                    var c = Object.getOwnPropertyDescriptor(a, d);
                    return c.get ? c.get.call(arguments.length < 3 ? T : n) : c.value;
                  }
                }, M.apply(this, arguments);
              }
              function D(w, T) {
                for (; !Object.prototype.hasOwnProperty.call(w, T) && (w = S(w), w !== null); )
                  ;
                return w;
              }
              function k(w, T) {
                if (typeof T != "function" && T !== null)
                  throw new TypeError("Super expression must either be null or a function");
                w.prototype = Object.create(T && T.prototype, { constructor: { value: w, writable: !0, configurable: !0 } }), Object.defineProperty(w, "prototype", { writable: !1 }), T && p(w, T);
              }
              function p(w, T) {
                return p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
                  return n.__proto__ = a, n;
                }, p(w, T);
              }
              function f(w) {
                var T = O();
                return function() {
                  var n = S(w), a;
                  if (T) {
                    var c = S(this).constructor;
                    a = Reflect.construct(n, arguments, c);
                  } else
                    a = n.apply(this, arguments);
                  return u(this, a);
                };
              }
              function u(w, T) {
                if (T && (h(T) === "object" || typeof T == "function"))
                  return T;
                if (T !== void 0)
                  throw new TypeError("Derived constructors may only return object or undefined");
                return y(w);
              }
              function y(w) {
                if (w === void 0)
                  throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return w;
              }
              function O() {
                if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
                if (typeof Proxy == "function") return !0;
                try {
                  return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                  })), !0;
                } catch {
                  return !1;
                }
              }
              function S(w) {
                return S = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(d) {
                  return d.__proto__ || Object.getPrototypeOf(d);
                }, S(w);
              }
              var E = /* @__PURE__ */ function(w) {
                k(d, w);
                var T = f(d);
                function d(n) {
                  var a;
                  return C(this, d), a = T.call(this, n), a.params = n, a.sourceMediaElement = null, a;
                }
                return L(d, [{
                  key: "init",
                  value: function() {
                    this.setPlaybackRate(this.params.audioRate), this.createTimer(), this.createVolumeNode(), this.createScriptNode(), this.createAnalyserNode();
                  }
                  /**
                   * Private method called by both `load` (from url)
                   * and `loadElt` (existing media element) methods.
                   *
                   * @param {HTMLMediaElement} media HTML5 Audio or Video element
                   * @param {number[]|Number.<Array[]>} peaks Array of peak data
                   * @param {string} preload HTML 5 preload attribute value
                   * @private
                   */
                }, {
                  key: "_load",
                  value: function(a, c, r) {
                    M(S(d.prototype), "_load", this).call(this, a, c, r), this.createMediaElementSource(a);
                  }
                  /**
                   * Create MediaElementSource node
                   *
                   * @since 3.2.0
                   * @param {HTMLMediaElement} mediaElement HTML5 Audio to load
                   */
                }, {
                  key: "createMediaElementSource",
                  value: function(a) {
                    this.sourceMediaElement = this.ac.createMediaElementSource(a), this.sourceMediaElement.connect(this.analyser);
                  }
                }, {
                  key: "play",
                  value: function(a, c) {
                    return this.resumeAudioContext(), M(S(d.prototype), "play", this).call(this, a, c);
                  }
                  /**
                   * This is called when wavesurfer is destroyed
                   *
                   */
                }, {
                  key: "destroy",
                  value: function() {
                    M(S(d.prototype), "destroy", this).call(this), this.destroyWebAudio();
                  }
                }]), d;
              }(A.default);
              P.default = E, W.exports = P.default;
            }
          ),
          /***/
          "./src/mediaelement.js": (
            /*!*****************************!*\
              !*** ./src/mediaelement.js ***!
              \*****************************/
            /***/
            (W, P, g) => {
              function h(n) {
                "@babel/helpers - typeof";
                return h = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
                  return typeof a;
                } : function(a) {
                  return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
                }, h(n);
              }
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = void 0;
              var A = L(g(
                /*! ./webaudio */
                "./src/webaudio.js"
              )), R = x(g(
                /*! ./util */
                "./src/util/index.js"
              ));
              function C(n) {
                if (typeof WeakMap != "function") return null;
                var a = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
                return (C = function(t) {
                  return t ? c : a;
                })(n);
              }
              function x(n, a) {
                if (n && n.__esModule)
                  return n;
                if (n === null || h(n) !== "object" && typeof n != "function")
                  return { default: n };
                var c = C(a);
                if (c && c.has(n))
                  return c.get(n);
                var r = {}, t = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var l in n)
                  if (l !== "default" && Object.prototype.hasOwnProperty.call(n, l)) {
                    var i = t ? Object.getOwnPropertyDescriptor(n, l) : null;
                    i && (i.get || i.set) ? Object.defineProperty(r, l, i) : r[l] = n[l];
                  }
                return r.default = n, c && c.set(n, r), r;
              }
              function L(n) {
                return n && n.__esModule ? n : { default: n };
              }
              function b(n, a) {
                if (!(n instanceof a))
                  throw new TypeError("Cannot call a class as a function");
              }
              function _(n, a) {
                for (var c = 0; c < a.length; c++) {
                  var r = a[c];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, D(r.key), r);
                }
              }
              function M(n, a, c) {
                return a && _(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
              }
              function D(n) {
                var a = k(n, "string");
                return h(a) === "symbol" ? a : String(a);
              }
              function k(n, a) {
                if (h(n) !== "object" || n === null) return n;
                var c = n[Symbol.toPrimitive];
                if (c !== void 0) {
                  var r = c.call(n, a);
                  if (h(r) !== "object") return r;
                  throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(n);
              }
              function p() {
                return typeof Reflect < "u" && Reflect.get ? p = Reflect.get.bind() : p = function(a, c, r) {
                  var t = f(a, c);
                  if (t) {
                    var l = Object.getOwnPropertyDescriptor(t, c);
                    return l.get ? l.get.call(arguments.length < 3 ? a : r) : l.value;
                  }
                }, p.apply(this, arguments);
              }
              function f(n, a) {
                for (; !Object.prototype.hasOwnProperty.call(n, a) && (n = T(n), n !== null); )
                  ;
                return n;
              }
              function u(n, a) {
                if (typeof a != "function" && a !== null)
                  throw new TypeError("Super expression must either be null or a function");
                n.prototype = Object.create(a && a.prototype, { constructor: { value: n, writable: !0, configurable: !0 } }), Object.defineProperty(n, "prototype", { writable: !1 }), a && y(n, a);
              }
              function y(n, a) {
                return y = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, t) {
                  return r.__proto__ = t, r;
                }, y(n, a);
              }
              function O(n) {
                var a = w();
                return function() {
                  var r = T(n), t;
                  if (a) {
                    var l = T(this).constructor;
                    t = Reflect.construct(r, arguments, l);
                  } else
                    t = r.apply(this, arguments);
                  return S(this, t);
                };
              }
              function S(n, a) {
                if (a && (h(a) === "object" || typeof a == "function"))
                  return a;
                if (a !== void 0)
                  throw new TypeError("Derived constructors may only return object or undefined");
                return E(n);
              }
              function E(n) {
                if (n === void 0)
                  throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return n;
              }
              function w() {
                if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
                if (typeof Proxy == "function") return !0;
                try {
                  return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                  })), !0;
                } catch {
                  return !1;
                }
              }
              function T(n) {
                return T = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(c) {
                  return c.__proto__ || Object.getPrototypeOf(c);
                }, T(n);
              }
              var d = /* @__PURE__ */ function(n) {
                u(c, n);
                var a = O(c);
                function c(r) {
                  var t;
                  return b(this, c), t = a.call(this, r), t.params = r, t.media = {
                    currentTime: 0,
                    duration: 0,
                    paused: !0,
                    playbackRate: 1,
                    play: function() {
                    },
                    pause: function() {
                    },
                    volume: 0
                  }, t.mediaType = r.mediaType.toLowerCase(), t.elementPosition = r.elementPosition, t.peaks = null, t.playbackRate = 1, t.volume = 1, t.isMuted = !1, t.buffer = null, t.onPlayEnd = null, t.mediaListeners = {}, t;
                }
                return M(c, [{
                  key: "init",
                  value: function() {
                    this.setPlaybackRate(this.params.audioRate), this.createTimer();
                  }
                  /**
                   * Attach event listeners to media element.
                   */
                }, {
                  key: "_setupMediaListeners",
                  value: function() {
                    var t = this;
                    this.mediaListeners.error = function() {
                      t.fireEvent("error", "Error loading media element");
                    }, this.mediaListeners.waiting = function() {
                      t.fireEvent("waiting");
                    }, this.mediaListeners.canplay = function() {
                      t.fireEvent("canplay");
                    }, this.mediaListeners.ended = function() {
                      t.fireEvent("finish");
                    }, this.mediaListeners.play = function() {
                      t.fireEvent("play");
                    }, this.mediaListeners.pause = function() {
                      t.fireEvent("pause");
                    }, this.mediaListeners.seeked = function(l) {
                      t.fireEvent("seek");
                    }, this.mediaListeners.volumechange = function(l) {
                      t.isMuted = t.media.muted, t.isMuted ? t.volume = 0 : t.volume = t.media.volume, t.fireEvent("volume");
                    }, Object.keys(this.mediaListeners).forEach(function(l) {
                      t.media.removeEventListener(l, t.mediaListeners[l]), t.media.addEventListener(l, t.mediaListeners[l]);
                    });
                  }
                  /**
                   * Create a timer to provide a more precise `audioprocess` event.
                   */
                }, {
                  key: "createTimer",
                  value: function() {
                    var t = this, l = function i() {
                      t.isPaused() || (t.fireEvent("audioprocess", t.getCurrentTime()), R.frame(i)());
                    };
                    this.on("play", l), this.on("pause", function() {
                      t.fireEvent("audioprocess", t.getCurrentTime());
                    });
                  }
                  /**
                   * Create media element with url as its source,
                   * and append to container element.
                   *
                   * @param {string} url Path to media file
                   * @param {HTMLElement} container HTML element
                   * @param {number[]|Number.<Array[]>} peaks Array of peak data
                   * @param {string} preload HTML 5 preload attribute value
                   * @throws Will throw an error if the `url` argument is not a valid media
                   * element.
                   */
                }, {
                  key: "load",
                  value: function(t, l, i, e) {
                    var o = document.createElement(this.mediaType);
                    o.controls = this.params.mediaControls, o.autoplay = this.params.autoplay || !1, o.preload = e ?? "auto", o.src = t, o.style.width = "100%";
                    var v = l.querySelector(this.mediaType);
                    v && l.removeChild(v), l.appendChild(o), this._load(o, i, e);
                  }
                  /**
                   * Load existing media element.
                   *
                   * @param {HTMLMediaElement} elt HTML5 Audio or Video element
                   * @param {number[]|Number.<Array[]>} peaks Array of peak data
                   */
                }, {
                  key: "loadElt",
                  value: function(t, l) {
                    t.controls = this.params.mediaControls, t.autoplay = this.params.autoplay || !1, this._load(t, l, t.preload);
                  }
                  /**
                   * Method called by both `load` (from url)
                   * and `loadElt` (existing media element) methods.
                   *
                   * @param {HTMLMediaElement} media HTML5 Audio or Video element
                   * @param {number[]|Number.<Array[]>} peaks Array of peak data
                   * @param {string} preload HTML 5 preload attribute value
                   * @throws Will throw an error if the `media` argument is not a valid media
                   * element.
                   * @private
                   */
                }, {
                  key: "_load",
                  value: function(t, l, i) {
                    if (!(t instanceof HTMLMediaElement) || typeof t.addEventListener > "u")
                      throw new Error("media parameter is not a valid media element");
                    typeof t.load == "function" && !(l && i == "none") && t.load(), this.media = t, this._setupMediaListeners(), this.peaks = l, this.onPlayEnd = null, this.buffer = null, this.isMuted = t.muted, this.setPlaybackRate(this.playbackRate), this.setVolume(this.volume);
                  }
                  /**
                   * Used by `wavesurfer.isPlaying()` and `wavesurfer.playPause()`
                   *
                   * @return {boolean} Media paused or not
                   */
                }, {
                  key: "isPaused",
                  value: function() {
                    return !this.media || this.media.paused;
                  }
                  /**
                   * Used by `wavesurfer.getDuration()`
                   *
                   * @return {number} Duration
                   */
                }, {
                  key: "getDuration",
                  value: function() {
                    if (this.explicitDuration)
                      return this.explicitDuration;
                    var t = (this.buffer || this.media).duration;
                    return t >= 1 / 0 && (t = this.media.seekable.end(0)), t;
                  }
                  /**
                   * Returns the current time in seconds relative to the audio-clip's
                   * duration.
                   *
                   * @return {number} Current time
                   */
                }, {
                  key: "getCurrentTime",
                  value: function() {
                    return this.media && this.media.currentTime;
                  }
                  /**
                   * Get the position from 0 to 1
                   *
                   * @return {number} Current position
                   */
                }, {
                  key: "getPlayedPercents",
                  value: function() {
                    return this.getCurrentTime() / this.getDuration() || 0;
                  }
                  /**
                   * Get the audio source playback rate.
                   *
                   * @return {number} Playback rate
                   */
                }, {
                  key: "getPlaybackRate",
                  value: function() {
                    return this.playbackRate || this.media.playbackRate;
                  }
                  /**
                   * Set the audio source playback rate.
                   *
                   * @param {number} value Playback rate
                   */
                }, {
                  key: "setPlaybackRate",
                  value: function(t) {
                    this.playbackRate = t || 1, this.media.playbackRate = this.playbackRate;
                  }
                  /**
                   * Used by `wavesurfer.seekTo()`
                   *
                   * @param {number} start Position to start at in seconds
                   */
                }, {
                  key: "seekTo",
                  value: function(t) {
                    t != null && !isNaN(t) && (this.media.currentTime = t), this.clearPlayEnd();
                  }
                  /**
                   * Plays the loaded audio region.
                   *
                   * @param {number} start Start offset in seconds, relative to the beginning
                   * of a clip.
                   * @param {number} end When to stop, relative to the beginning of a clip.
                   * @emits MediaElement#play
                   * @return {Promise} Result
                   */
                }, {
                  key: "play",
                  value: function(t, l) {
                    this.seekTo(t);
                    var i = this.media.play();
                    return l && this.setPlayEnd(l), i;
                  }
                  /**
                   * Pauses the loaded audio.
                   *
                   * @emits MediaElement#pause
                   * @return {Promise} Result
                   */
                }, {
                  key: "pause",
                  value: function() {
                    var t;
                    return this.media && (t = this.media.pause()), this.clearPlayEnd(), t;
                  }
                  /**
                   * Set the play end
                   *
                   * @param {number} end Where to end
                   */
                }, {
                  key: "setPlayEnd",
                  value: function(t) {
                    var l = this;
                    this.clearPlayEnd(), this._onPlayEnd = function(i) {
                      i >= t && (l.pause(), l.seekTo(t));
                    }, this.on("audioprocess", this._onPlayEnd);
                  }
                  /** @private */
                }, {
                  key: "clearPlayEnd",
                  value: function() {
                    this._onPlayEnd && (this.un("audioprocess", this._onPlayEnd), this._onPlayEnd = null);
                  }
                  /**
                   * Compute the max and min value of the waveform when broken into
                   * <length> subranges.
                   *
                   * @param {number} length How many subranges to break the waveform into.
                   * @param {number} first First sample in the required range.
                   * @param {number} last Last sample in the required range.
                   * @return {number[]|Number.<Array[]>} Array of 2*<length> peaks or array of
                   * arrays of peaks consisting of (max, min) values for each subrange.
                   */
                }, {
                  key: "getPeaks",
                  value: function(t, l, i) {
                    return this.buffer ? p(T(c.prototype), "getPeaks", this).call(this, t, l, i) : this.peaks || [];
                  }
                  /**
                   * Set the sink id for the media player
                   *
                   * @param {string} deviceId String value representing audio device id.
                   * @returns {Promise} A Promise that resolves to `undefined` when there
                   * are no errors.
                   */
                }, {
                  key: "setSinkId",
                  value: function(t) {
                    return t ? this.media.setSinkId ? this.media.setSinkId(t) : Promise.reject(new Error("setSinkId is not supported in your browser")) : Promise.reject(new Error("Invalid deviceId: " + t));
                  }
                  /**
                   * Get the current volume
                   *
                   * @return {number} value A floating point value between 0 and 1.
                   */
                }, {
                  key: "getVolume",
                  value: function() {
                    return this.volume;
                  }
                  /**
                   * Set the audio volume
                   *
                   * @param {number} value A floating point value between 0 and 1.
                   */
                }, {
                  key: "setVolume",
                  value: function(t) {
                    this.volume = t, this.media.volume !== this.volume && (this.media.volume = this.volume);
                  }
                  /**
                   * Enable or disable muted audio
                   *
                   * @since 4.0.0
                   * @param {boolean} muted Specify `true` to mute audio.
                   */
                }, {
                  key: "setMute",
                  value: function(t) {
                    this.isMuted = this.media.muted = t;
                  }
                  /**
                   * This is called when wavesurfer is destroyed
                   *
                   */
                }, {
                  key: "destroy",
                  value: function() {
                    var t = this;
                    this.pause(), this.unAll(), this.destroyed = !0, Object.keys(this.mediaListeners).forEach(function(l) {
                      t.media && t.media.removeEventListener(l, t.mediaListeners[l]);
                    }), this.params.removeMediaElementOnDestroy && this.media && this.media.parentNode && this.media.parentNode.removeChild(this.media), this.media = null;
                  }
                }]), c;
              }(A.default);
              P.default = d, W.exports = P.default;
            }
          ),
          /***/
          "./src/peakcache.js": (
            /*!**************************!*\
              !*** ./src/peakcache.js ***!
              \**************************/
            /***/
            (W, P) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = void 0;
              function g(b) {
                "@babel/helpers - typeof";
                return g = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(_) {
                  return typeof _;
                } : function(_) {
                  return _ && typeof Symbol == "function" && _.constructor === Symbol && _ !== Symbol.prototype ? "symbol" : typeof _;
                }, g(b);
              }
              function h(b, _) {
                if (!(b instanceof _))
                  throw new TypeError("Cannot call a class as a function");
              }
              function A(b, _) {
                for (var M = 0; M < _.length; M++) {
                  var D = _[M];
                  D.enumerable = D.enumerable || !1, D.configurable = !0, "value" in D && (D.writable = !0), Object.defineProperty(b, C(D.key), D);
                }
              }
              function R(b, _, M) {
                return _ && A(b.prototype, _), Object.defineProperty(b, "prototype", { writable: !1 }), b;
              }
              function C(b) {
                var _ = x(b, "string");
                return g(_) === "symbol" ? _ : String(_);
              }
              function x(b, _) {
                if (g(b) !== "object" || b === null) return b;
                var M = b[Symbol.toPrimitive];
                if (M !== void 0) {
                  var D = M.call(b, _);
                  if (g(D) !== "object") return D;
                  throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(b);
              }
              var L = /* @__PURE__ */ function() {
                function b() {
                  h(this, b), this.clearPeakCache();
                }
                return R(b, [{
                  key: "clearPeakCache",
                  value: function() {
                    this.peakCacheRanges = [], this.peakCacheLength = -1;
                  }
                  /**
                   * Add a range of peaks to the cache
                   *
                   * @param {number} length The length of the range
                   * @param {number} start The x offset of the start of the range
                   * @param {number} end The x offset of the end of the range
                   * @return {Number.<Array[]>} Array with arrays of numbers
                   */
                }, {
                  key: "addRangeToPeakCache",
                  value: function(M, D, k) {
                    M != this.peakCacheLength && (this.clearPeakCache(), this.peakCacheLength = M);
                    for (var p = [], f = 0; f < this.peakCacheRanges.length && this.peakCacheRanges[f] < D; )
                      f++;
                    for (f % 2 == 0 && p.push(D); f < this.peakCacheRanges.length && this.peakCacheRanges[f] <= k; )
                      p.push(this.peakCacheRanges[f]), f++;
                    f % 2 == 0 && p.push(k), p = p.filter(function(y, O, S) {
                      return O == 0 ? y != S[O + 1] : O == S.length - 1 ? y != S[O - 1] : y != S[O - 1] && y != S[O + 1];
                    }), this.peakCacheRanges = this.peakCacheRanges.concat(p), this.peakCacheRanges = this.peakCacheRanges.sort(function(y, O) {
                      return y - O;
                    }).filter(function(y, O, S) {
                      return O == 0 ? y != S[O + 1] : O == S.length - 1 ? y != S[O - 1] : y != S[O - 1] && y != S[O + 1];
                    });
                    var u = [];
                    for (f = 0; f < p.length; f += 2)
                      u.push([p[f], p[f + 1]]);
                    return u;
                  }
                  /**
                   * For testing
                   *
                   * @return {Number.<Array[]>} Array with arrays of numbers
                   */
                }, {
                  key: "getCacheRanges",
                  value: function() {
                    var M = [], D;
                    for (D = 0; D < this.peakCacheRanges.length; D += 2)
                      M.push([this.peakCacheRanges[D], this.peakCacheRanges[D + 1]]);
                    return M;
                  }
                }]), b;
              }();
              P.default = L, W.exports = P.default;
            }
          ),
          /***/
          "./src/util/absMax.js": (
            /*!****************************!*\
              !*** ./src/util/absMax.js ***!
              \****************************/
            /***/
            (W, P, g) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = C;
              var h = R(g(
                /*! ./max */
                "./src/util/max.js"
              )), A = R(g(
                /*! ./min */
                "./src/util/min.js"
              ));
              function R(x) {
                return x && x.__esModule ? x : { default: x };
              }
              function C(x) {
                var L = (0, h.default)(x), b = (0, A.default)(x);
                return -b > L ? -b : L;
              }
              W.exports = P.default;
            }
          ),
          /***/
          "./src/util/clamp.js": (
            /*!***************************!*\
              !*** ./src/util/clamp.js ***!
              \***************************/
            /***/
            (W, P) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = g;
              function g(h, A, R) {
                return Math.min(Math.max(A, h), R);
              }
              W.exports = P.default;
            }
          ),
          /***/
          "./src/util/fetch.js": (
            /*!***************************!*\
              !*** ./src/util/fetch.js ***!
              \***************************/
            /***/
            (W, P, g) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = D;
              var h = A(g(
                /*! ./observer */
                "./src/util/observer.js"
              ));
              function A(k) {
                return k && k.__esModule ? k : { default: k };
              }
              function R(k) {
                "@babel/helpers - typeof";
                return R = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(p) {
                  return typeof p;
                } : function(p) {
                  return p && typeof Symbol == "function" && p.constructor === Symbol && p !== Symbol.prototype ? "symbol" : typeof p;
                }, R(k);
              }
              function C(k, p) {
                if (!(k instanceof p))
                  throw new TypeError("Cannot call a class as a function");
              }
              function x(k, p) {
                for (var f = 0; f < p.length; f++) {
                  var u = p[f];
                  u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), Object.defineProperty(k, b(u.key), u);
                }
              }
              function L(k, p, f) {
                return p && x(k.prototype, p), Object.defineProperty(k, "prototype", { writable: !1 }), k;
              }
              function b(k) {
                var p = _(k, "string");
                return R(p) === "symbol" ? p : String(p);
              }
              function _(k, p) {
                if (R(k) !== "object" || k === null) return k;
                var f = k[Symbol.toPrimitive];
                if (f !== void 0) {
                  var u = f.call(k, p);
                  if (R(u) !== "object") return u;
                  throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(k);
              }
              var M = /* @__PURE__ */ function() {
                function k(p, f, u) {
                  C(this, k), this.instance = p, this.instance._reader = u.body.getReader(), this.total = parseInt(f, 10), this.loaded = 0;
                }
                return L(k, [{
                  key: "start",
                  value: function(f) {
                    var u = this, y = function O() {
                      u.instance._reader.read().then(function(S) {
                        var E = S.done, w = S.value;
                        if (E) {
                          u.total === 0 && u.instance.onProgress.call(u.instance, {
                            loaded: u.loaded,
                            total: u.total,
                            lengthComputable: !1
                          }), f.close();
                          return;
                        }
                        u.loaded += w.byteLength, u.instance.onProgress.call(u.instance, {
                          loaded: u.loaded,
                          total: u.total,
                          lengthComputable: u.total !== 0
                        }), f.enqueue(w), O();
                      }).catch(function(S) {
                        f.error(S);
                      });
                    };
                    y();
                  }
                }]), k;
              }();
              function D(k) {
                if (k) {
                  if (!k.url)
                    throw new Error("fetch url missing");
                } else throw new Error("fetch options missing");
                var p = new h.default(), f = new Headers(), u = new Request(k.url);
                p.controller = new AbortController(), k && k.requestHeaders && k.requestHeaders.forEach(function(S) {
                  f.append(S.key, S.value);
                });
                var y = k.responseType || "json", O = {
                  method: k.method || "GET",
                  headers: f,
                  mode: k.mode || "cors",
                  credentials: k.credentials || "same-origin",
                  cache: k.cache || "default",
                  redirect: k.redirect || "follow",
                  referrer: k.referrer || "client",
                  signal: p.controller.signal
                };
                return fetch(u, O).then(function(S) {
                  p.response = S;
                  var E = !0;
                  S.body || (E = !1);
                  var w = S.headers.get("content-length");
                  return w === null && (E = !1), E ? (p.onProgress = function(T) {
                    p.fireEvent("progress", T);
                  }, new Response(new ReadableStream(new M(p, w, S)), O)) : S;
                }).then(function(S) {
                  var E;
                  if (S.ok)
                    switch (y) {
                      case "arraybuffer":
                        return S.arrayBuffer();
                      case "json":
                        return S.json();
                      case "blob":
                        return S.blob();
                      case "text":
                        return S.text();
                      default:
                        E = "Unknown responseType: " + y;
                        break;
                    }
                  throw E || (E = "HTTP error status: " + S.status), new Error(E);
                }).then(function(S) {
                  p.fireEvent("success", S);
                }).catch(function(S) {
                  p.fireEvent("error", S);
                }), p.fetchRequest = u, p;
              }
              W.exports = P.default;
            }
          ),
          /***/
          "./src/util/frame.js": (
            /*!***************************!*\
              !*** ./src/util/frame.js ***!
              \***************************/
            /***/
            (W, P, g) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = R;
              var h = A(g(
                /*! ./request-animation-frame */
                "./src/util/request-animation-frame.js"
              ));
              function A(C) {
                return C && C.__esModule ? C : { default: C };
              }
              function R(C) {
                return function() {
                  for (var x = arguments.length, L = new Array(x), b = 0; b < x; b++)
                    L[b] = arguments[b];
                  return (0, h.default)(function() {
                    return C.apply(void 0, L);
                  });
                };
              }
              W.exports = P.default;
            }
          ),
          /***/
          "./src/util/get-id.js": (
            /*!****************************!*\
              !*** ./src/util/get-id.js ***!
              \****************************/
            /***/
            (W, P) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = g;
              function g(h) {
                return h === void 0 && (h = "wavesurfer_"), h + Math.random().toString(32).substring(2);
              }
              W.exports = P.default;
            }
          ),
          /***/
          "./src/util/index.js": (
            /*!***************************!*\
              !*** ./src/util/index.js ***!
              \***************************/
            /***/
            (W, P, g) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), Object.defineProperty(P, "Observer", {
                enumerable: !0,
                get: function() {
                  return x.default;
                }
              }), Object.defineProperty(P, "absMax", {
                enumerable: !0,
                get: function() {
                  return C.default;
                }
              }), Object.defineProperty(P, "clamp", {
                enumerable: !0,
                get: function() {
                  return p.default;
                }
              }), Object.defineProperty(P, "debounce", {
                enumerable: !0,
                get: function() {
                  return M.default;
                }
              }), Object.defineProperty(P, "fetchFile", {
                enumerable: !0,
                get: function() {
                  return k.default;
                }
              }), Object.defineProperty(P, "frame", {
                enumerable: !0,
                get: function() {
                  return _.default;
                }
              }), Object.defineProperty(P, "getId", {
                enumerable: !0,
                get: function() {
                  return h.default;
                }
              }), Object.defineProperty(P, "ignoreSilenceMode", {
                enumerable: !0,
                get: function() {
                  return u.default;
                }
              }), Object.defineProperty(P, "max", {
                enumerable: !0,
                get: function() {
                  return A.default;
                }
              }), Object.defineProperty(P, "min", {
                enumerable: !0,
                get: function() {
                  return R.default;
                }
              }), Object.defineProperty(P, "preventClick", {
                enumerable: !0,
                get: function() {
                  return D.default;
                }
              }), Object.defineProperty(P, "requestAnimationFrame", {
                enumerable: !0,
                get: function() {
                  return b.default;
                }
              }), Object.defineProperty(P, "style", {
                enumerable: !0,
                get: function() {
                  return L.default;
                }
              }), Object.defineProperty(P, "withOrientation", {
                enumerable: !0,
                get: function() {
                  return f.default;
                }
              });
              var h = y(g(
                /*! ./get-id */
                "./src/util/get-id.js"
              )), A = y(g(
                /*! ./max */
                "./src/util/max.js"
              )), R = y(g(
                /*! ./min */
                "./src/util/min.js"
              )), C = y(g(
                /*! ./absMax */
                "./src/util/absMax.js"
              )), x = y(g(
                /*! ./observer */
                "./src/util/observer.js"
              )), L = y(g(
                /*! ./style */
                "./src/util/style.js"
              )), b = y(g(
                /*! ./request-animation-frame */
                "./src/util/request-animation-frame.js"
              )), _ = y(g(
                /*! ./frame */
                "./src/util/frame.js"
              )), M = y(g(
                /*! debounce */
                "./node_modules/debounce/index.js"
              )), D = y(g(
                /*! ./prevent-click */
                "./src/util/prevent-click.js"
              )), k = y(g(
                /*! ./fetch */
                "./src/util/fetch.js"
              )), p = y(g(
                /*! ./clamp */
                "./src/util/clamp.js"
              )), f = y(g(
                /*! ./orientation */
                "./src/util/orientation.js"
              )), u = y(g(
                /*! ./silence-mode */
                "./src/util/silence-mode.js"
              ));
              function y(O) {
                return O && O.__esModule ? O : { default: O };
              }
            }
          ),
          /***/
          "./src/util/max.js": (
            /*!*************************!*\
              !*** ./src/util/max.js ***!
              \*************************/
            /***/
            (W, P) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = g;
              function g(h) {
                var A = -1 / 0;
                return Object.keys(h).forEach(function(R) {
                  h[R] > A && (A = h[R]);
                }), A;
              }
              W.exports = P.default;
            }
          ),
          /***/
          "./src/util/min.js": (
            /*!*************************!*\
              !*** ./src/util/min.js ***!
              \*************************/
            /***/
            (W, P) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = g;
              function g(h) {
                var A = 1 / 0;
                return Object.keys(h).forEach(function(R) {
                  h[R] < A && (A = h[R]);
                }), A;
              }
              W.exports = P.default;
            }
          ),
          /***/
          "./src/util/observer.js": (
            /*!******************************!*\
              !*** ./src/util/observer.js ***!
              \******************************/
            /***/
            (W, P) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = void 0;
              function g(b) {
                "@babel/helpers - typeof";
                return g = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(_) {
                  return typeof _;
                } : function(_) {
                  return _ && typeof Symbol == "function" && _.constructor === Symbol && _ !== Symbol.prototype ? "symbol" : typeof _;
                }, g(b);
              }
              function h(b, _) {
                if (!(b instanceof _))
                  throw new TypeError("Cannot call a class as a function");
              }
              function A(b, _) {
                for (var M = 0; M < _.length; M++) {
                  var D = _[M];
                  D.enumerable = D.enumerable || !1, D.configurable = !0, "value" in D && (D.writable = !0), Object.defineProperty(b, C(D.key), D);
                }
              }
              function R(b, _, M) {
                return _ && A(b.prototype, _), Object.defineProperty(b, "prototype", { writable: !1 }), b;
              }
              function C(b) {
                var _ = x(b, "string");
                return g(_) === "symbol" ? _ : String(_);
              }
              function x(b, _) {
                if (g(b) !== "object" || b === null) return b;
                var M = b[Symbol.toPrimitive];
                if (M !== void 0) {
                  var D = M.call(b, _);
                  if (g(D) !== "object") return D;
                  throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(b);
              }
              var L = /* @__PURE__ */ function() {
                function b() {
                  h(this, b), this._disabledEventEmissions = [], this.handlers = null;
                }
                return R(b, [{
                  key: "on",
                  value: function(M, D) {
                    var k = this;
                    this.handlers || (this.handlers = {});
                    var p = this.handlers[M];
                    return p || (p = this.handlers[M] = []), p.push(D), {
                      name: M,
                      callback: D,
                      un: function(u, y) {
                        return k.un(u, y);
                      }
                    };
                  }
                  /**
                   * Remove an event handler.
                   *
                   * @param {string} event Name of the event the listener that should be
                   * removed listens to
                   * @param {function} fn The callback that should be removed
                   */
                }, {
                  key: "un",
                  value: function(M, D) {
                    if (this.handlers) {
                      var k = this.handlers[M], p;
                      if (k)
                        if (D)
                          for (p = k.length - 1; p >= 0; p--)
                            k[p] == D && k.splice(p, 1);
                        else
                          k.length = 0;
                    }
                  }
                  /**
                   * Remove all event handlers.
                   */
                }, {
                  key: "unAll",
                  value: function() {
                    this.handlers = null;
                  }
                  /**
                   * Attach a handler to an event. The handler is executed at most once per
                   * event type.
                   *
                   * @param {string} event The event to listen to
                   * @param {function} handler The callback that is only to be called once
                   * @return {ListenerDescriptor} The event descriptor
                   */
                }, {
                  key: "once",
                  value: function(M, D) {
                    var k = this, p = function f() {
                      for (var u = arguments.length, y = new Array(u), O = 0; O < u; O++)
                        y[O] = arguments[O];
                      D.apply(k, y), setTimeout(function() {
                        k.un(M, f);
                      }, 0);
                    };
                    return this.on(M, p);
                  }
                  /**
                   * Disable firing a list of events by name. When specified, event handlers for any event type
                   * passed in here will not be called.
                   *
                   * @since 4.0.0
                   * @param {string[]} eventNames an array of event names to disable emissions for
                   * @example
                   * // disable seek and interaction events
                   * wavesurfer.setDisabledEventEmissions(['seek', 'interaction']);
                   */
                }, {
                  key: "setDisabledEventEmissions",
                  value: function(M) {
                    this._disabledEventEmissions = M;
                  }
                  /**
                   * plugins borrow part of this class without calling the constructor,
                   * so we have to be careful about _disabledEventEmissions
                   */
                }, {
                  key: "_isDisabledEventEmission",
                  value: function(M) {
                    return this._disabledEventEmissions && this._disabledEventEmissions.includes(M);
                  }
                  /**
                   * Manually fire an event
                   *
                   * @param {string} event The event to fire manually
                   * @param {...any} args The arguments with which to call the listeners
                   */
                }, {
                  key: "fireEvent",
                  value: function(M) {
                    for (var D = arguments.length, k = new Array(D > 1 ? D - 1 : 0), p = 1; p < D; p++)
                      k[p - 1] = arguments[p];
                    if (!(!this.handlers || this._isDisabledEventEmission(M))) {
                      var f = this.handlers[M];
                      f && f.forEach(function(u) {
                        u.apply(void 0, k);
                      });
                    }
                  }
                }]), b;
              }();
              P.default = L, W.exports = P.default;
            }
          ),
          /***/
          "./src/util/orientation.js": (
            /*!*********************************!*\
              !*** ./src/util/orientation.js ***!
              \*********************************/
            /***/
            (W, P) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = R;
              var g = {
                width: "height",
                height: "width",
                overflowX: "overflowY",
                overflowY: "overflowX",
                clientWidth: "clientHeight",
                clientHeight: "clientWidth",
                clientX: "clientY",
                clientY: "clientX",
                scrollWidth: "scrollHeight",
                scrollLeft: "scrollTop",
                offsetLeft: "offsetTop",
                offsetTop: "offsetLeft",
                offsetHeight: "offsetWidth",
                offsetWidth: "offsetHeight",
                left: "top",
                right: "bottom",
                top: "left",
                bottom: "right",
                borderRightStyle: "borderBottomStyle",
                borderRightWidth: "borderBottomWidth",
                borderRightColor: "borderBottomColor"
              };
              function h(C, x) {
                return Object.prototype.hasOwnProperty.call(g, C) && x ? g[C] : C;
              }
              var A = Symbol("isProxy");
              function R(C, x) {
                return C[A] ? C : new Proxy(C, {
                  get: function(b, _, M) {
                    if (_ === A)
                      return !0;
                    if (_ === "domElement")
                      return b;
                    if (_ === "style")
                      return R(b.style, x);
                    if (_ === "canvas")
                      return R(b.canvas, x);
                    if (_ === "getBoundingClientRect")
                      return function() {
                        return R(b.getBoundingClientRect.apply(b, arguments), x);
                      };
                    if (_ === "getContext")
                      return function() {
                        return R(b.getContext.apply(b, arguments), x);
                      };
                    var D = b[h(_, x)];
                    return typeof D == "function" ? D.bind(b) : D;
                  },
                  set: function(b, _, M) {
                    return b[h(_, x)] = M, !0;
                  }
                });
              }
              W.exports = P.default;
            }
          ),
          /***/
          "./src/util/prevent-click.js": (
            /*!***********************************!*\
              !*** ./src/util/prevent-click.js ***!
              \***********************************/
            /***/
            (W, P) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = h;
              function g(A) {
                A.stopPropagation(), document.body.removeEventListener("click", g, !0);
              }
              function h(A) {
                document.body.addEventListener("click", g, !0);
              }
              W.exports = P.default;
            }
          ),
          /***/
          "./src/util/request-animation-frame.js": (
            /*!*********************************************!*\
              !*** ./src/util/request-animation-frame.js ***!
              \*********************************************/
            /***/
            (W, P) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = void 0;
              var g = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(h, A) {
                return setTimeout(h, 1e3 / 60);
              }).bind(window);
              P.default = g, W.exports = P.default;
            }
          ),
          /***/
          "./src/util/silence-mode.js": (
            /*!**********************************!*\
              !*** ./src/util/silence-mode.js ***!
              \**********************************/
            /***/
            (W, P) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = g;
              function g() {
                var h = new AudioContext(), A = h.createBufferSource();
                A.buffer = h.createBuffer(1, 1, 44100), A.connect(h.destination), A.start();
                var R = "data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA//////////////////////////////////////////////////////////////////8AAABhTEFNRTMuMTAwA8MAAAAAAAAAABQgJAUHQQAB9AAAAnGMHkkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADgnABGiAAQBCqgCRMAAgEAH///////////////7+n/9FTuQsQH//////2NG0jWUGlio5gLQTOtIoeR2WX////X4s9Atb/JRVCbBUpeRUq//////////////////9RUi0f2jn/+xDECgPCjAEQAABN4AAANIAAAAQVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==", C = document.createElement("div");
                C.innerHTML = '<audio x-webkit-airplay="deny"></audio>';
                var x = C.children.item(0);
                x.src = R, x.preload = "auto", x.type = "audio/mpeg", x.disableRemotePlayback = !0, x.play(), x.remove(), C.remove();
              }
              W.exports = P.default;
            }
          ),
          /***/
          "./src/util/style.js": (
            /*!***************************!*\
              !*** ./src/util/style.js ***!
              \***************************/
            /***/
            (W, P) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = g;
              function g(h, A) {
                return Object.keys(A).forEach(function(R) {
                  h.style[R] !== A[R] && (h.style[R] = A[R]);
                }), h;
              }
              W.exports = P.default;
            }
          ),
          /***/
          "./src/wavesurfer.js": (
            /*!***************************!*\
              !*** ./src/wavesurfer.js ***!
              \***************************/
            /***/
            (W, P, g) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = void 0;
              var h = M(g(
                /*! ./util */
                "./src/util/index.js"
              )), A = b(g(
                /*! ./drawer.multicanvas */
                "./src/drawer.multicanvas.js"
              )), R = b(g(
                /*! ./webaudio */
                "./src/webaudio.js"
              )), C = b(g(
                /*! ./mediaelement */
                "./src/mediaelement.js"
              )), x = b(g(
                /*! ./peakcache */
                "./src/peakcache.js"
              )), L = b(g(
                /*! ./mediaelement-webaudio */
                "./src/mediaelement-webaudio.js"
              ));
              function b(r) {
                return r && r.__esModule ? r : { default: r };
              }
              function _(r) {
                if (typeof WeakMap != "function") return null;
                var t = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap();
                return (_ = function(e) {
                  return e ? l : t;
                })(r);
              }
              function M(r, t) {
                if (r && r.__esModule)
                  return r;
                if (r === null || E(r) !== "object" && typeof r != "function")
                  return { default: r };
                var l = _(t);
                if (l && l.has(r))
                  return l.get(r);
                var i = {}, e = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var o in r)
                  if (o !== "default" && Object.prototype.hasOwnProperty.call(r, o)) {
                    var v = e ? Object.getOwnPropertyDescriptor(r, o) : null;
                    v && (v.get || v.set) ? Object.defineProperty(i, o, v) : i[o] = r[o];
                  }
                return i.default = r, l && l.set(r, i), i;
              }
              function D(r, t) {
                if (typeof t != "function" && t !== null)
                  throw new TypeError("Super expression must either be null or a function");
                r.prototype = Object.create(t && t.prototype, { constructor: { value: r, writable: !0, configurable: !0 } }), Object.defineProperty(r, "prototype", { writable: !1 }), t && k(r, t);
              }
              function k(r, t) {
                return k = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(i, e) {
                  return i.__proto__ = e, i;
                }, k(r, t);
              }
              function p(r) {
                var t = y();
                return function() {
                  var i = O(r), e;
                  if (t) {
                    var o = O(this).constructor;
                    e = Reflect.construct(i, arguments, o);
                  } else
                    e = i.apply(this, arguments);
                  return f(this, e);
                };
              }
              function f(r, t) {
                if (t && (E(t) === "object" || typeof t == "function"))
                  return t;
                if (t !== void 0)
                  throw new TypeError("Derived constructors may only return object or undefined");
                return u(r);
              }
              function u(r) {
                if (r === void 0)
                  throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return r;
              }
              function y() {
                if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
                if (typeof Proxy == "function") return !0;
                try {
                  return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                  })), !0;
                } catch {
                  return !1;
                }
              }
              function O(r) {
                return O = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(l) {
                  return l.__proto__ || Object.getPrototypeOf(l);
                }, O(r);
              }
              function S(r, t, l) {
                return t = n(t), t in r ? Object.defineProperty(r, t, { value: l, enumerable: !0, configurable: !0, writable: !0 }) : r[t] = l, r;
              }
              function E(r) {
                "@babel/helpers - typeof";
                return E = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
                  return typeof t;
                } : function(t) {
                  return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                }, E(r);
              }
              function w(r, t) {
                if (!(r instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              }
              function T(r, t) {
                for (var l = 0; l < t.length; l++) {
                  var i = t[l];
                  i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(r, n(i.key), i);
                }
              }
              function d(r, t, l) {
                return t && T(r.prototype, t), l && T(r, l), Object.defineProperty(r, "prototype", { writable: !1 }), r;
              }
              function n(r) {
                var t = a(r, "string");
                return E(t) === "symbol" ? t : String(t);
              }
              function a(r, t) {
                if (E(r) !== "object" || r === null) return r;
                var l = r[Symbol.toPrimitive];
                if (l !== void 0) {
                  var i = l.call(r, t || "default");
                  if (E(i) !== "object") return i;
                  throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return (t === "string" ? String : Number)(r);
              }
              var c = /* @__PURE__ */ function(r) {
                D(l, r);
                var t = p(l);
                function l(i) {
                  var e;
                  if (w(this, l), e = t.call(this), S(u(e), "defaultParams", {
                    audioContext: null,
                    audioScriptProcessor: null,
                    audioRate: 1,
                    autoCenter: !0,
                    autoCenterRate: 5,
                    autoCenterImmediately: !1,
                    backend: "WebAudio",
                    backgroundColor: null,
                    barHeight: 1,
                    barRadius: 0,
                    barGap: null,
                    barMinHeight: null,
                    container: null,
                    cursorColor: "#333",
                    cursorWidth: 1,
                    dragSelection: !0,
                    drawingContextAttributes: {
                      // Boolean that hints the user agent to reduce the latency
                      // by desynchronizing the canvas paint cycle from the event
                      // loop
                      desynchronized: !1
                    },
                    duration: null,
                    fillParent: !0,
                    forceDecode: !1,
                    height: 128,
                    hideScrollbar: !1,
                    hideCursor: !1,
                    ignoreSilenceMode: !1,
                    interact: !0,
                    loopSelection: !0,
                    maxCanvasWidth: 4e3,
                    mediaContainer: null,
                    mediaControls: !1,
                    mediaType: "audio",
                    minPxPerSec: 20,
                    normalize: !1,
                    partialRender: !1,
                    pixelRatio: window.devicePixelRatio || screen.deviceXDPI / screen.logicalXDPI,
                    plugins: [],
                    progressColor: "#555",
                    removeMediaElementOnDestroy: !0,
                    renderer: A.default,
                    responsive: !1,
                    rtl: !1,
                    scrollParent: !1,
                    skipLength: 2,
                    splitChannels: !1,
                    splitChannelsOptions: {
                      overlay: !1,
                      channelColors: {},
                      filterChannels: [],
                      relativeNormalization: !1,
                      splitDragSelection: !1
                    },
                    vertical: !1,
                    waveColor: "#999",
                    xhr: {}
                  }), S(u(e), "backends", {
                    MediaElement: C.default,
                    WebAudio: R.default,
                    MediaElementWebAudio: L.default
                  }), S(u(e), "util", h), e.params = Object.assign({}, e.defaultParams, i), e.params.splitChannelsOptions = Object.assign({}, e.defaultParams.splitChannelsOptions, i.splitChannelsOptions), e.container = typeof i.container == "string" ? document.querySelector(e.params.container) : e.params.container, !e.container)
                    throw new Error("Container element not found");
                  if (e.params.mediaContainer == null ? e.mediaContainer = e.container : typeof e.params.mediaContainer == "string" ? e.mediaContainer = document.querySelector(e.params.mediaContainer) : e.mediaContainer = e.params.mediaContainer, !e.mediaContainer)
                    throw new Error("Media Container element not found");
                  if (e.params.maxCanvasWidth <= 1)
                    throw new Error("maxCanvasWidth must be greater than 1");
                  if (e.params.maxCanvasWidth % 2 == 1)
                    throw new Error("maxCanvasWidth must be an even number");
                  if (e.params.rtl === !0 && (e.params.vertical === !0 ? h.style(e.container, {
                    transform: "rotateX(180deg)"
                  }) : h.style(e.container, {
                    transform: "rotateY(180deg)"
                  })), e.params.backgroundColor && e.setBackgroundColor(e.params.backgroundColor), e.savedVolume = 0, e.isMuted = !1, e.tmpEvents = [], e.currentRequest = null, e.arraybuffer = null, e.drawer = null, e.backend = null, e.peakCache = null, typeof e.params.renderer != "function")
                    throw new Error("Renderer parameter is invalid");
                  e.Drawer = e.params.renderer, e.params.backend == "AudioElement" && (e.params.backend = "MediaElement"), (e.params.backend == "WebAudio" || e.params.backend === "MediaElementWebAudio") && !R.default.prototype.supportsWebAudio.call(null) && (e.params.backend = "MediaElement"), e.Backend = e.backends[e.params.backend], e.initialisedPluginList = {}, e.isDestroyed = !1, e.isReady = !1;
                  var o = 0;
                  return e._onResize = h.debounce(function() {
                    e.drawer.wrapper && o != e.drawer.wrapper.clientWidth && !e.params.scrollParent && (o = e.drawer.wrapper.clientWidth, o && e.drawer.fireEvent("redraw"));
                  }, typeof e.params.responsive == "number" ? e.params.responsive : 100), f(e, u(e));
                }
                return d(l, [{
                  key: "init",
                  value: function() {
                    return this.registerPlugins(this.params.plugins), this.createDrawer(), this.createBackend(), this.createPeakCache(), this;
                  }
                  /**
                   * Add and initialise array of plugins (if `plugin.deferInit` is falsey),
                   * this function is called in the init function of wavesurfer
                   *
                   * @param {PluginDefinition[]} plugins An array of plugin definitions
                   * @emits {WaveSurfer#plugins-registered} Called with the array of plugin definitions
                   * @return {this} The wavesurfer instance
                   */
                }, {
                  key: "registerPlugins",
                  value: function(e) {
                    var o = this;
                    return e.forEach(function(v) {
                      return o.addPlugin(v);
                    }), e.forEach(function(v) {
                      v.deferInit || o.initPlugin(v.name);
                    }), this.fireEvent("plugins-registered", e), this;
                  }
                  /**
                   * Get a map of plugin names that are currently initialised
                   *
                   * @example wavesurfer.getPlugins();
                   * @return {Object} Object with plugin names
                   */
                }, {
                  key: "getActivePlugins",
                  value: function() {
                    return this.initialisedPluginList;
                  }
                  /**
                   * Add a plugin object to wavesurfer
                   *
                   * @param {PluginDefinition} plugin A plugin definition
                   * @emits {WaveSurfer#plugin-added} Called with the name of the plugin that was added
                   * @example wavesurfer.addPlugin(WaveSurfer.minimap());
                   * @return {this} The wavesurfer instance
                   */
                }, {
                  key: "addPlugin",
                  value: function(e) {
                    var o = this;
                    if (!e.name)
                      throw new Error("Plugin does not have a name!");
                    if (!e.instance)
                      throw new Error("Plugin ".concat(e.name, " does not have an instance property!"));
                    e.staticProps && Object.keys(e.staticProps).forEach(function(m) {
                      o[m] = e.staticProps[m];
                    });
                    var v = e.instance, s = Object.getOwnPropertyNames(h.Observer.prototype);
                    return s.forEach(function(m) {
                      v.prototype[m] = h.Observer.prototype[m];
                    }), this[e.name] = new v(e.params || {}, this), this.fireEvent("plugin-added", e.name), this;
                  }
                  /**
                   * Initialise a plugin
                   *
                   * @param {string} name A plugin name
                   * @emits WaveSurfer#plugin-initialised
                   * @example wavesurfer.initPlugin('minimap');
                   * @return {this} The wavesurfer instance
                   */
                }, {
                  key: "initPlugin",
                  value: function(e) {
                    if (!this[e])
                      throw new Error("Plugin ".concat(e, " has not been added yet!"));
                    return this.initialisedPluginList[e] && this.destroyPlugin(e), this[e].init(), this.initialisedPluginList[e] = !0, this.fireEvent("plugin-initialised", e), this;
                  }
                  /**
                   * Destroy a plugin
                   *
                   * @param {string} name A plugin name
                   * @emits WaveSurfer#plugin-destroyed
                   * @example wavesurfer.destroyPlugin('minimap');
                   * @returns {this} The wavesurfer instance
                   */
                }, {
                  key: "destroyPlugin",
                  value: function(e) {
                    if (!this[e])
                      throw new Error("Plugin ".concat(e, " has not been added yet and cannot be destroyed!"));
                    if (!this.initialisedPluginList[e])
                      throw new Error("Plugin ".concat(e, " is not active and cannot be destroyed!"));
                    if (typeof this[e].destroy != "function")
                      throw new Error("Plugin ".concat(e, " does not have a destroy function!"));
                    return this[e].destroy(), delete this.initialisedPluginList[e], this.fireEvent("plugin-destroyed", e), this;
                  }
                  /**
                   * Destroy all initialised plugins. Convenience function to use when
                   * wavesurfer is removed
                   *
                   * @private
                   */
                }, {
                  key: "destroyAllPlugins",
                  value: function() {
                    var e = this;
                    Object.keys(this.initialisedPluginList).forEach(function(o) {
                      return e.destroyPlugin(o);
                    });
                  }
                  /**
                   * Create the drawer and draw the waveform
                   *
                   * @private
                   * @emits WaveSurfer#drawer-created
                   */
                }, {
                  key: "createDrawer",
                  value: function() {
                    var e = this;
                    this.drawer = new this.Drawer(this.container, this.params), this.drawer.init(), this.fireEvent("drawer-created", this.drawer), this.params.responsive !== !1 && (window.addEventListener("resize", this._onResize, !0), window.addEventListener("orientationchange", this._onResize, !0)), this.drawer.on("redraw", function() {
                      e.drawBuffer(), e.drawer.progress(e.backend.getPlayedPercents());
                    }), this.drawer.on("click", function(o, v) {
                      setTimeout(function() {
                        return e.seekTo(v);
                      }, 0);
                    }), this.drawer.on("scroll", function(o) {
                      e.params.partialRender && e.drawBuffer(), e.fireEvent("scroll", o);
                    }), this.drawer.on("dblclick", function(o, v) {
                      e.fireEvent("dblclick", o, v);
                    });
                  }
                  /**
                   * Create the backend
                   *
                   * @private
                   * @emits WaveSurfer#backend-created
                   */
                }, {
                  key: "createBackend",
                  value: function() {
                    var e = this;
                    this.backend && this.backend.destroy(), this.backend = new this.Backend(this.params), this.backend.init(), this.fireEvent("backend-created", this.backend), this.backend.on("finish", function() {
                      e.drawer.progress(e.backend.getPlayedPercents()), e.fireEvent("finish");
                    }), this.backend.on("play", function() {
                      return e.fireEvent("play");
                    }), this.backend.on("pause", function() {
                      return e.fireEvent("pause");
                    }), this.backend.on("audioprocess", function(o) {
                      e.drawer.progress(e.backend.getPlayedPercents()), e.fireEvent("audioprocess", o);
                    }), (this.params.backend === "MediaElement" || this.params.backend === "MediaElementWebAudio") && (this.backend.on("seek", function() {
                      e.drawer.progress(e.backend.getPlayedPercents());
                    }), this.backend.on("volume", function() {
                      var o = e.getVolume();
                      e.fireEvent("volume", o), e.backend.isMuted !== e.isMuted && (e.isMuted = e.backend.isMuted, e.fireEvent("mute", e.isMuted));
                    }));
                  }
                  /**
                   * Create the peak cache
                   *
                   * @private
                   */
                }, {
                  key: "createPeakCache",
                  value: function() {
                    this.params.partialRender && (this.peakCache = new x.default());
                  }
                  /**
                   * Get the duration of the audio clip
                   *
                   * @example const duration = wavesurfer.getDuration();
                   * @return {number} Duration in seconds
                   */
                }, {
                  key: "getDuration",
                  value: function() {
                    return this.backend.getDuration();
                  }
                  /**
                   * Get the current playback position
                   *
                   * @example const currentTime = wavesurfer.getCurrentTime();
                   * @return {number} Playback position in seconds
                   */
                }, {
                  key: "getCurrentTime",
                  value: function() {
                    return this.backend.getCurrentTime();
                  }
                  /**
                   * Set the current play time in seconds.
                   *
                   * @param {number} seconds A positive number in seconds. E.g. 10 means 10
                   * seconds, 60 means 1 minute
                   */
                }, {
                  key: "setCurrentTime",
                  value: function(e) {
                    e >= this.getDuration() ? this.seekTo(1) : this.seekTo(e / this.getDuration());
                  }
                  /**
                   * Starts playback from the current position. Optional start and end
                   * measured in seconds can be used to set the range of audio to play.
                   *
                   * @param {?number} start Position to start at
                   * @param {?number} end Position to end at
                   * @emits WaveSurfer#interaction
                   * @return {Promise} Result of the backend play method
                   * @example
                   * // play from second 1 to 5
                   * wavesurfer.play(1, 5);
                   */
                }, {
                  key: "play",
                  value: function(e, o) {
                    var v = this;
                    return this.params.ignoreSilenceMode && h.ignoreSilenceMode(), this.fireEvent("interaction", function() {
                      return v.play(e, o);
                    }), this.backend.play(e, o);
                  }
                  /**
                   * Set a point in seconds for playback to stop at.
                   *
                   * @param {number} position Position (in seconds) to stop at
                   * @version 3.3.0
                   */
                }, {
                  key: "setPlayEnd",
                  value: function(e) {
                    this.backend.setPlayEnd(e);
                  }
                  /**
                   * Stops and pauses playback
                   *
                   * @example wavesurfer.pause();
                   * @return {Promise} Result of the backend pause method
                   */
                }, {
                  key: "pause",
                  value: function() {
                    if (!this.backend.isPaused())
                      return this.backend.pause();
                  }
                  /**
                   * Toggle playback
                   *
                   * @example wavesurfer.playPause();
                   * @return {Promise} Result of the backend play or pause method
                   */
                }, {
                  key: "playPause",
                  value: function() {
                    return this.backend.isPaused() ? this.play() : this.pause();
                  }
                  /**
                   * Get the current playback state
                   *
                   * @example const isPlaying = wavesurfer.isPlaying();
                   * @return {boolean} False if paused, true if playing
                   */
                }, {
                  key: "isPlaying",
                  value: function() {
                    return !this.backend.isPaused();
                  }
                  /**
                   * Skip backward
                   *
                   * @param {?number} seconds Amount to skip back, if not specified `skipLength`
                   * is used
                   * @example wavesurfer.skipBackward();
                   */
                }, {
                  key: "skipBackward",
                  value: function(e) {
                    this.skip(-e || -this.params.skipLength);
                  }
                  /**
                   * Skip forward
                   *
                   * @param {?number} seconds Amount to skip back, if not specified `skipLength`
                   * is used
                   * @example wavesurfer.skipForward();
                   */
                }, {
                  key: "skipForward",
                  value: function(e) {
                    this.skip(e || this.params.skipLength);
                  }
                  /**
                   * Skip a number of seconds from the current position (use a negative value
                   * to go backwards).
                   *
                   * @param {number} offset Amount to skip back or forwards
                   * @example
                   * // go back 2 seconds
                   * wavesurfer.skip(-2);
                   */
                }, {
                  key: "skip",
                  value: function(e) {
                    var o = this.getDuration() || 1, v = this.getCurrentTime() || 0;
                    v = Math.max(0, Math.min(o, v + (e || 0))), this.seekAndCenter(v / o);
                  }
                  /**
                   * Seeks to a position and centers the view
                   *
                   * @param {number} progress Between 0 (=beginning) and 1 (=end)
                   * @example
                   * // seek and go to the middle of the audio
                   * wavesurfer.seekTo(0.5);
                   */
                }, {
                  key: "seekAndCenter",
                  value: function(e) {
                    this.seekTo(e), this.drawer.recenter(e);
                  }
                  /**
                   * Seeks to a position
                   *
                   * @param {number} progress Between 0 (=beginning) and 1 (=end)
                   * @emits WaveSurfer#interaction
                   * @emits WaveSurfer#seek
                   * @example
                   * // seek to the middle of the audio
                   * wavesurfer.seekTo(0.5);
                   */
                }, {
                  key: "seekTo",
                  value: function(e) {
                    var o = this;
                    if (typeof e != "number" || !isFinite(e) || e < 0 || e > 1)
                      throw new Error("Error calling wavesurfer.seekTo, parameter must be a number between 0 and 1!");
                    this.fireEvent("interaction", function() {
                      return o.seekTo(e);
                    });
                    var v = this.params.backend === "WebAudio", s = this.backend.isPaused();
                    v && !s && this.backend.pause();
                    var m = this.params.scrollParent;
                    this.params.scrollParent = !1, this.backend.seekTo(e * this.getDuration()), this.drawer.progress(e), v && !s && this.backend.play(), this.params.scrollParent = m, this.fireEvent("seek", e);
                  }
                  /**
                   * Stops and goes to the beginning.
                   *
                   * @example wavesurfer.stop();
                   */
                }, {
                  key: "stop",
                  value: function() {
                    this.pause(), this.seekTo(0), this.drawer.progress(0);
                  }
                  /**
                   * Sets the ID of the audio device to use for output and returns a Promise.
                   *
                   * @param {string} deviceId String value representing underlying output
                   * device
                   * @returns {Promise} `Promise` that resolves to `undefined` when there are
                   * no errors detected.
                   */
                }, {
                  key: "setSinkId",
                  value: function(e) {
                    return this.backend.setSinkId(e);
                  }
                  /**
                   * Set the playback volume.
                   *
                   * @param {number} newVolume A value between 0 and 1, 0 being no
                   * volume and 1 being full volume.
                   * @emits WaveSurfer#volume
                   */
                }, {
                  key: "setVolume",
                  value: function(e) {
                    if (this.isMuted === !0) {
                      this.savedVolume = e;
                      return;
                    }
                    this.backend.setVolume(e), this.fireEvent("volume", e);
                  }
                  /**
                   * Get the playback volume.
                   *
                   * @return {number} A value between 0 and 1, 0 being no
                   * volume and 1 being full volume.
                   */
                }, {
                  key: "getVolume",
                  value: function() {
                    return this.backend.getVolume();
                  }
                  /**
                   * Set the playback rate.
                   *
                   * @param {number} rate A positive number. E.g. 0.5 means half the normal
                   * speed, 2 means double speed and so on.
                   * @example wavesurfer.setPlaybackRate(2);
                   */
                }, {
                  key: "setPlaybackRate",
                  value: function(e) {
                    this.backend.setPlaybackRate(e);
                  }
                  /**
                   * Get the playback rate.
                   *
                   * @return {number} The current playback rate.
                   */
                }, {
                  key: "getPlaybackRate",
                  value: function() {
                    return this.backend.getPlaybackRate();
                  }
                  /**
                   * Toggle the volume on and off. If not currently muted it will save the
                   * current volume value and turn the volume off. If currently muted then it
                   * will restore the volume to the saved value, and then rest the saved
                   * value.
                   *
                   * @example wavesurfer.toggleMute();
                   */
                }, {
                  key: "toggleMute",
                  value: function() {
                    this.setMute(!this.isMuted);
                  }
                  /**
                   * Enable or disable muted audio
                   *
                   * @param {boolean} mute Specify `true` to mute audio.
                   * @emits WaveSurfer#volume
                   * @emits WaveSurfer#mute
                   * @example
                   * // unmute
                   * wavesurfer.setMute(false);
                   * console.log(wavesurfer.getMute()) // logs false
                   */
                }, {
                  key: "setMute",
                  value: function(e) {
                    if (e === this.isMuted) {
                      this.fireEvent("mute", this.isMuted);
                      return;
                    }
                    this.backend.setMute ? (this.backend.setMute(e), this.isMuted = e) : e ? (this.savedVolume = this.backend.getVolume(), this.backend.setVolume(0), this.isMuted = !0, this.fireEvent("volume", 0)) : (this.backend.setVolume(this.savedVolume), this.isMuted = !1, this.fireEvent("volume", this.savedVolume)), this.fireEvent("mute", this.isMuted);
                  }
                  /**
                   * Get the current mute status.
                   *
                   * @example const isMuted = wavesurfer.getMute();
                   * @return {boolean} Current mute status
                   */
                }, {
                  key: "getMute",
                  value: function() {
                    return this.isMuted;
                  }
                  /**
                   * Get the list of current set filters as an array.
                   *
                   * Filters must be set with setFilters method first
                   *
                   * @return {array} List of enabled filters
                   */
                }, {
                  key: "getFilters",
                  value: function() {
                    return this.backend.filters || [];
                  }
                  /**
                   * Toggles `scrollParent` and redraws
                   *
                   * @example wavesurfer.toggleScroll();
                   */
                }, {
                  key: "toggleScroll",
                  value: function() {
                    this.params.scrollParent = !this.params.scrollParent, this.drawBuffer();
                  }
                  /**
                   * Toggle mouse interaction
                   *
                   * @example wavesurfer.toggleInteraction();
                   */
                }, {
                  key: "toggleInteraction",
                  value: function() {
                    this.params.interact = !this.params.interact;
                  }
                  /**
                   * Get the fill color of the waveform after the cursor.
                   *
                   * @param {?number} channelIdx Optional index of the channel to get its wave color if splitChannels is true
                   * @return {string|object} A CSS color string, or an array of CSS color strings.
                   */
                }, {
                  key: "getWaveColor",
                  value: function() {
                    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
                    return this.params.splitChannelsOptions.channelColors[e] ? this.params.splitChannelsOptions.channelColors[e].waveColor : this.params.waveColor;
                  }
                  /**
                   * Set the fill color of the waveform after the cursor.
                   *
                   * @param {string|object} color A CSS color string, or an array of CSS color strings.
                   * @param {?number} channelIdx Optional index of the channel to set its wave color if splitChannels is true
                   * @example wavesurfer.setWaveColor('#ddd');
                   */
                }, {
                  key: "setWaveColor",
                  value: function(e) {
                    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                    this.params.splitChannelsOptions.channelColors[o] ? this.params.splitChannelsOptions.channelColors[o].waveColor = e : this.params.waveColor = e, this.drawBuffer();
                  }
                  /**
                   * Get the fill color of the waveform behind the cursor.
                   *
                   * @param {?number} channelIdx Optional index of the channel to get its progress color if splitChannels is true
                   * @return {string|object} A CSS color string, or an array of CSS color strings.
                   */
                }, {
                  key: "getProgressColor",
                  value: function() {
                    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
                    return this.params.splitChannelsOptions.channelColors[e] ? this.params.splitChannelsOptions.channelColors[e].progressColor : this.params.progressColor;
                  }
                  /**
                   * Set the fill color of the waveform behind the cursor.
                   *
                   * @param {string|object} color A CSS color string, or an array of CSS color strings.
                   * @param {?number} channelIdx Optional index of the channel to set its progress color if splitChannels is true
                   * @example wavesurfer.setProgressColor('#400');
                   */
                }, {
                  key: "setProgressColor",
                  value: function(e, o) {
                    this.params.splitChannelsOptions.channelColors[o] ? this.params.splitChannelsOptions.channelColors[o].progressColor = e : this.params.progressColor = e, this.drawBuffer();
                  }
                  /**
                   * Get the background color of the waveform container.
                   *
                   * @return {string} A CSS color string.
                   */
                }, {
                  key: "getBackgroundColor",
                  value: function() {
                    return this.params.backgroundColor;
                  }
                  /**
                   * Set the background color of the waveform container.
                   *
                   * @param {string} color A CSS color string.
                   * @example wavesurfer.setBackgroundColor('#FF00FF');
                   */
                }, {
                  key: "setBackgroundColor",
                  value: function(e) {
                    this.params.backgroundColor = e, h.style(this.container, {
                      background: this.params.backgroundColor
                    });
                  }
                  /**
                   * Get the fill color of the cursor indicating the playhead
                   * position.
                   *
                   * @return {string} A CSS color string.
                   */
                }, {
                  key: "getCursorColor",
                  value: function() {
                    return this.params.cursorColor;
                  }
                  /**
                   * Set the fill color of the cursor indicating the playhead
                   * position.
                   *
                   * @param {string} color A CSS color string.
                   * @example wavesurfer.setCursorColor('#222');
                   */
                }, {
                  key: "setCursorColor",
                  value: function(e) {
                    this.params.cursorColor = e, this.drawer.updateCursor();
                  }
                  /**
                   * Get the height of the waveform.
                   *
                   * @return {number} Height measured in pixels.
                   */
                }, {
                  key: "getHeight",
                  value: function() {
                    return this.params.height;
                  }
                  /**
                   * Set the height of the waveform.
                   *
                   * @param {number} height Height measured in pixels.
                   * @example wavesurfer.setHeight(200);
                   */
                }, {
                  key: "setHeight",
                  value: function(e) {
                    this.params.height = e, this.drawer.setHeight(e * this.params.pixelRatio), this.drawBuffer();
                  }
                  /**
                   * Hide channels from being drawn on the waveform if splitting channels.
                   *
                   * For example, if we want to draw only the peaks for the right stereo channel:
                   *
                   * const wavesurfer = new WaveSurfer.create({...splitChannels: true});
                   * wavesurfer.load('stereo_audio.mp3');
                   *
                   * wavesurfer.setFilteredChannel([0]); <-- hide left channel peaks.
                   *
                   * @param {array} channelIndices Channels to be filtered out from drawing.
                   * @version 4.0.0
                   */
                }, {
                  key: "setFilteredChannels",
                  value: function(e) {
                    this.params.splitChannelsOptions.filterChannels = e, this.drawBuffer();
                  }
                  /**
                   * Get the correct peaks for current wave view-port and render wave
                   *
                   * @private
                   * @emits WaveSurfer#redraw
                   */
                }, {
                  key: "drawBuffer",
                  value: function() {
                    var e = Math.round(this.getDuration() * this.params.minPxPerSec * this.params.pixelRatio), o = this.drawer.getWidth(), v = e, s = 0, m = Math.max(s + o, v);
                    this.params.fillParent && (!this.params.scrollParent || e < o) && (v = o, s = 0, m = v);
                    var j;
                    if (this.params.partialRender) {
                      var I = this.peakCache.addRangeToPeakCache(v, s, m), B;
                      for (B = 0; B < I.length; B++)
                        j = this.backend.getPeaks(v, I[B][0], I[B][1]), this.drawer.drawPeaks(j, v, I[B][0], I[B][1]);
                    } else
                      j = this.backend.getPeaks(v, s, m), this.drawer.drawPeaks(j, v, s, m);
                    this.fireEvent("redraw", j, v);
                  }
                  /**
                   * Horizontally zooms the waveform in and out. It also changes the parameter
                   * `minPxPerSec` and enables the `scrollParent` option. Calling the function
                   * with a falsey parameter will reset the zoom state.
                   *
                   * @param {?number} pxPerSec Number of horizontal pixels per second of
                   * audio, if none is set the waveform returns to unzoomed state
                   * @emits WaveSurfer#zoom
                   * @example wavesurfer.zoom(20);
                   */
                }, {
                  key: "zoom",
                  value: function(e) {
                    e ? (this.params.minPxPerSec = e, this.params.scrollParent = !0) : (this.params.minPxPerSec = this.defaultParams.minPxPerSec, this.params.scrollParent = !1), this.drawBuffer(), this.drawer.progress(this.backend.getPlayedPercents()), this.drawer.recenter(this.getCurrentTime() / this.getDuration()), this.fireEvent("zoom", e);
                  }
                  /**
                   * Decode buffer and load
                   *
                   * @private
                   * @param {ArrayBuffer} arraybuffer Buffer to process
                   */
                }, {
                  key: "loadArrayBuffer",
                  value: function(e) {
                    var o = this;
                    this.decodeArrayBuffer(e, function(v) {
                      o.isDestroyed || o.loadDecodedBuffer(v);
                    });
                  }
                  /**
                   * Directly load an externally decoded AudioBuffer
                   *
                   * @private
                   * @param {AudioBuffer} buffer Buffer to process
                   * @emits WaveSurfer#ready
                   */
                }, {
                  key: "loadDecodedBuffer",
                  value: function(e) {
                    this.backend.load(e), this.drawBuffer(), this.isReady = !0, this.fireEvent("ready");
                  }
                  /**
                   * Loads audio data from a Blob or File object
                   *
                   * @param {Blob|File} blob Audio data
                   * @example
                   */
                }, {
                  key: "loadBlob",
                  value: function(e) {
                    var o = this, v = new FileReader();
                    v.addEventListener("progress", function(s) {
                      return o.onProgress(s);
                    }), v.addEventListener("load", function(s) {
                      return o.loadArrayBuffer(s.target.result);
                    }), v.addEventListener("error", function() {
                      return o.fireEvent("error", "Error reading file");
                    }), v.readAsArrayBuffer(e), this.empty();
                  }
                  /**
                   * Loads audio and re-renders the waveform.
                   *
                   * @param {string|HTMLMediaElement} url The url of the audio file or the
                   * audio element with the audio
                   * @param {number[]|Number.<Array[]>} peaks Wavesurfer does not have to decode
                   * the audio to render the waveform if this is specified
                   * @param {?string} preload (Use with backend `MediaElement` and `MediaElementWebAudio`)
                   * `'none'|'metadata'|'auto'` Preload attribute for the media element
                   * @param {?number} duration The duration of the audio. This is used to
                   * render the peaks data in the correct size for the audio duration (as
                   * befits the current `minPxPerSec` and zoom value) without having to decode
                   * the audio.
                   * @returns {void}
                   * @throws Will throw an error if the `url` argument is empty.
                   * @example
                   * // uses fetch or media element to load file (depending on backend)
                   * wavesurfer.load('http://example.com/demo.wav');
                   *
                   * // setting preload attribute with media element backend and supplying
                   * // peaks
                   * wavesurfer.load(
                   *   'http://example.com/demo.wav',
                   *   [0.0218, 0.0183, 0.0165, 0.0198, 0.2137, 0.2888],
                   *   true
                   * );
                   */
                }, {
                  key: "load",
                  value: function(e, o, v, s) {
                    if (!e)
                      throw new Error("url parameter cannot be empty");
                    if (this.empty(), v) {
                      var m = {
                        "Preload is not 'auto', 'none' or 'metadata'": ["auto", "metadata", "none"].indexOf(v) === -1,
                        "Peaks are not provided": !o,
                        "Backend is not of type 'MediaElement' or 'MediaElementWebAudio'": ["MediaElement", "MediaElementWebAudio"].indexOf(this.params.backend) === -1,
                        "Url is not of type string": typeof e != "string"
                      }, j = Object.keys(m).filter(function(I) {
                        return m[I];
                      });
                      j.length && (console.warn(`Preload parameter of wavesurfer.load will be ignored because:
	- ` + j.join(`
	- `)), v = null);
                    }
                    switch (this.params.backend === "WebAudio" && e instanceof HTMLMediaElement && (e = e.src), this.params.backend) {
                      case "WebAudio":
                        return this.loadBuffer(e, o, s);
                      case "MediaElement":
                      case "MediaElementWebAudio":
                        return this.loadMediaElement(e, o, v, s);
                    }
                  }
                  /**
                   * Loads audio using Web Audio buffer backend.
                   *
                   * @private
                   * @emits WaveSurfer#waveform-ready
                   * @param {string} url URL of audio file
                   * @param {number[]|Number.<Array[]>} peaks Peaks data
                   * @param {?number} duration Optional duration of audio file
                   * @returns {void}
                   */
                }, {
                  key: "loadBuffer",
                  value: function(e, o, v) {
                    var s = this, m = function(I) {
                      return I && s.tmpEvents.push(s.once("ready", I)), s.getArrayBuffer(e, function(B) {
                        return s.loadArrayBuffer(B);
                      });
                    };
                    if (o)
                      this.backend.setPeaks(o, v), this.drawBuffer(), this.fireEvent("waveform-ready"), this.tmpEvents.push(this.once("interaction", m));
                    else
                      return m();
                  }
                  /**
                   * Either create a media element, or load an existing media element.
                   *
                   * @private
                   * @emits WaveSurfer#waveform-ready
                   * @param {string|HTMLMediaElement} urlOrElt Either a path to a media file, or an
                   * existing HTML5 Audio/Video Element
                   * @param {number[]|Number.<Array[]>} peaks Array of peaks. Required to bypass web audio
                   * dependency
                   * @param {?boolean} preload Set to true if the preload attribute of the
                   * audio element should be enabled
                   * @param {?number} duration Optional duration of audio file
                   */
                }, {
                  key: "loadMediaElement",
                  value: function(e, o, v, s) {
                    var m = this, j = e;
                    if (typeof e == "string")
                      this.backend.load(j, this.mediaContainer, o, v);
                    else {
                      var I = e;
                      this.backend.loadElt(I, o), j = I.src;
                    }
                    this.tmpEvents.push(this.backend.once("canplay", function() {
                      m.backend.destroyed || (m.drawBuffer(), m.isReady = !0, m.fireEvent("ready"));
                    }), this.backend.once("error", function(B) {
                      return m.fireEvent("error", B);
                    })), o && (this.backend.setPeaks(o, s), this.drawBuffer(), this.fireEvent("waveform-ready")), (!o || this.params.forceDecode) && this.backend.supportsWebAudio() && this.getArrayBuffer(j, function(B) {
                      m.decodeArrayBuffer(B, function(N) {
                        m.backend.buffer = N, m.backend.setPeaks(null), m.drawBuffer(), m.fireEvent("waveform-ready");
                      });
                    });
                  }
                  /**
                   * Decode an array buffer and pass data to a callback
                   *
                   * @private
                   * @param {Object} arraybuffer The array buffer to decode
                   * @param {function} callback The function to call on complete
                   */
                }, {
                  key: "decodeArrayBuffer",
                  value: function(e, o) {
                    var v = this;
                    this.isDestroyed || (this.arraybuffer = e, this.backend.decodeArrayBuffer(e, function(s) {
                      !v.isDestroyed && v.arraybuffer == e && (o(s), v.arraybuffer = null);
                    }, function() {
                      return v.fireEvent("error", "Error decoding audiobuffer");
                    }));
                  }
                  /**
                   * Load an array buffer using fetch and pass the result to a callback
                   *
                   * @param {string} url The URL of the file object
                   * @param {function} callback The function to call on complete
                   * @returns {util.fetchFile} fetch call
                   * @private
                   */
                }, {
                  key: "getArrayBuffer",
                  value: function(e, o) {
                    var v = this, s = Object.assign({
                      url: e,
                      responseType: "arraybuffer"
                    }, this.params.xhr), m = h.fetchFile(s);
                    return this.currentRequest = m, this.tmpEvents.push(m.on("progress", function(j) {
                      v.onProgress(j);
                    }), m.on("success", function(j) {
                      o(j), v.currentRequest = null;
                    }), m.on("error", function(j) {
                      v.fireEvent("error", j), v.currentRequest = null;
                    })), m;
                  }
                  /**
                   * Called while the audio file is loading
                   *
                   * @private
                   * @param {Event} e Progress event
                   * @emits WaveSurfer#loading
                   */
                }, {
                  key: "onProgress",
                  value: function(e) {
                    var o;
                    e.lengthComputable ? o = e.loaded / e.total : o = e.loaded / (e.loaded + 1e6), this.fireEvent("loading", Math.round(o * 100), e.target);
                  }
                  /**
                   * Exports PCM data into a JSON array and optionally opens in a new window
                   * as valid JSON Blob instance.
                   *
                   * @param {number} length=1024 The scale in which to export the peaks
                   * @param {number} accuracy=10000
                   * @param {?boolean} noWindow Set to true to disable opening a new
                   * window with the JSON
                   * @param {number} start Start index
                   * @param {number} end End index
                   * @return {Promise} Promise that resolves with array of peaks
                   */
                }, {
                  key: "exportPCM",
                  value: function(e, o, v, s, m) {
                    e = e || 1024, s = s || 0, o = o || 1e4, v = v || !1;
                    var j = this.backend.getPeaks(e, s, m), I = [].map.call(j, function(B) {
                      return Math.round(B * o) / o;
                    });
                    return new Promise(function(B, N) {
                      if (!v) {
                        var q = new Blob([JSON.stringify(I)], {
                          type: "application/json;charset=utf-8"
                        }), F = URL.createObjectURL(q);
                        window.open(F), URL.revokeObjectURL(F);
                      }
                      B(I);
                    });
                  }
                  /**
                   * Save waveform image as data URI.
                   *
                   * The default format is `image/png`. Other supported types are
                   * `image/jpeg` and `image/webp`.
                   *
                   * @param {string} format='image/png' A string indicating the image format.
                   * The default format type is `image/png`.
                   * @param {number} quality=1 A number between 0 and 1 indicating the image
                   * quality to use for image formats that use lossy compression such as
                   * `image/jpeg` and `image/webp`.
                   * @param {string} type Image data type to return. Either `dataURL` (default)
                   * or `blob`.
                   * @return {string|string[]|Promise} When using `dataURL` type this returns
                   * a single data URL or an array of data URLs, one for each canvas. When using
                   * `blob` type this returns a `Promise` resolving with an array of `Blob`
                   * instances, one for each canvas.
                   */
                }, {
                  key: "exportImage",
                  value: function(e, o, v) {
                    return e || (e = "image/png"), o || (o = 1), v || (v = "dataURL"), this.drawer.getImage(e, o, v);
                  }
                  /**
                   * Cancel any fetch request currently in progress
                   */
                }, {
                  key: "cancelAjax",
                  value: function() {
                    this.currentRequest && this.currentRequest.controller && (this.currentRequest._reader && this.currentRequest._reader.cancel().catch(function(e) {
                    }), this.currentRequest.controller.abort(), this.currentRequest = null);
                  }
                  /**
                   * @private
                   */
                }, {
                  key: "clearTmpEvents",
                  value: function() {
                    this.tmpEvents.forEach(function(e) {
                      return e.un();
                    });
                  }
                  /**
                   * Display empty waveform.
                   */
                }, {
                  key: "empty",
                  value: function() {
                    this.backend.isPaused() || (this.stop(), this.backend.disconnectSource()), this.isReady = !1, this.cancelAjax(), this.clearTmpEvents(), this.drawer.progress(0), this.drawer.setWidth(0), this.drawer.drawPeaks({
                      length: this.drawer.getWidth()
                    }, 0);
                  }
                  /**
                   * Remove events, elements and disconnect WebAudio nodes.
                   *
                   * @emits WaveSurfer#destroy
                   */
                }, {
                  key: "destroy",
                  value: function() {
                    this.destroyAllPlugins(), this.fireEvent("destroy"), this.cancelAjax(), this.clearTmpEvents(), this.unAll(), this.params.responsive !== !1 && (window.removeEventListener("resize", this._onResize, !0), window.removeEventListener("orientationchange", this._onResize, !0)), this.backend && (this.backend.destroy(), this.backend = null), this.drawer && this.drawer.destroy(), this.isDestroyed = !0, this.isReady = !1, this.arraybuffer = null;
                  }
                }], [{
                  key: "create",
                  value: (
                    /**
                     * Instantiate this class, call its `init` function and returns it
                     *
                     * @param {WavesurferParams} params The wavesurfer parameters
                     * @return {Object} WaveSurfer instance
                     * @example const wavesurfer = WaveSurfer.create(params);
                     */
                    function(e) {
                      var o = new l(e);
                      return o.init();
                    }
                  )
                  /**
                   * The library version number is available as a static property of the
                   * WaveSurfer class
                   *
                   * @type {String}
                   * @example
                   * console.log('Using wavesurfer.js ' + WaveSurfer.VERSION);
                   */
                }]), l;
              }(h.Observer);
              P.default = c, S(c, "VERSION", "6.6.4"), S(c, "util", h), W.exports = P.default;
            }
          ),
          /***/
          "./src/webaudio.js": (
            /*!*************************!*\
              !*** ./src/webaudio.js ***!
              \*************************/
            /***/
            (W, P, g) => {
              Object.defineProperty(P, "__esModule", {
                value: !0
              }), P.default = void 0;
              var h = R(g(
                /*! ./util */
                "./src/util/index.js"
              ));
              function A(n) {
                if (typeof WeakMap != "function") return null;
                var a = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
                return (A = function(t) {
                  return t ? c : a;
                })(n);
              }
              function R(n, a) {
                if (n && n.__esModule)
                  return n;
                if (n === null || C(n) !== "object" && typeof n != "function")
                  return { default: n };
                var c = A(a);
                if (c && c.has(n))
                  return c.get(n);
                var r = {}, t = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var l in n)
                  if (l !== "default" && Object.prototype.hasOwnProperty.call(n, l)) {
                    var i = t ? Object.getOwnPropertyDescriptor(n, l) : null;
                    i && (i.get || i.set) ? Object.defineProperty(r, l, i) : r[l] = n[l];
                  }
                return r.default = n, c && c.set(n, r), r;
              }
              function C(n) {
                "@babel/helpers - typeof";
                return C = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
                  return typeof a;
                } : function(a) {
                  return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
                }, C(n);
              }
              function x(n, a) {
                if (!(n instanceof a))
                  throw new TypeError("Cannot call a class as a function");
              }
              function L(n, a) {
                for (var c = 0; c < a.length; c++) {
                  var r = a[c];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, O(r.key), r);
                }
              }
              function b(n, a, c) {
                return a && L(n.prototype, a), Object.defineProperty(n, "prototype", { writable: !1 }), n;
              }
              function _(n, a) {
                if (typeof a != "function" && a !== null)
                  throw new TypeError("Super expression must either be null or a function");
                n.prototype = Object.create(a && a.prototype, { constructor: { value: n, writable: !0, configurable: !0 } }), Object.defineProperty(n, "prototype", { writable: !1 }), a && M(n, a);
              }
              function M(n, a) {
                return M = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, t) {
                  return r.__proto__ = t, r;
                }, M(n, a);
              }
              function D(n) {
                var a = f();
                return function() {
                  var r = u(n), t;
                  if (a) {
                    var l = u(this).constructor;
                    t = Reflect.construct(r, arguments, l);
                  } else
                    t = r.apply(this, arguments);
                  return k(this, t);
                };
              }
              function k(n, a) {
                if (a && (C(a) === "object" || typeof a == "function"))
                  return a;
                if (a !== void 0)
                  throw new TypeError("Derived constructors may only return object or undefined");
                return p(n);
              }
              function p(n) {
                if (n === void 0)
                  throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return n;
              }
              function f() {
                if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
                if (typeof Proxy == "function") return !0;
                try {
                  return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                  })), !0;
                } catch {
                  return !1;
                }
              }
              function u(n) {
                return u = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(c) {
                  return c.__proto__ || Object.getPrototypeOf(c);
                }, u(n);
              }
              function y(n, a, c) {
                return a = O(a), a in n ? Object.defineProperty(n, a, { value: c, enumerable: !0, configurable: !0, writable: !0 }) : n[a] = c, n;
              }
              function O(n) {
                var a = S(n, "string");
                return C(a) === "symbol" ? a : String(a);
              }
              function S(n, a) {
                if (C(n) !== "object" || n === null) return n;
                var c = n[Symbol.toPrimitive];
                if (c !== void 0) {
                  var r = c.call(n, a || "default");
                  if (C(r) !== "object") return r;
                  throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return (a === "string" ? String : Number)(n);
              }
              var E = "playing", w = "paused", T = "finished", d = /* @__PURE__ */ function(n) {
                _(c, n);
                var a = D(c);
                function c(r) {
                  var t, l, i;
                  return x(this, c), i = a.call(this), y(p(i), "audioContext", null), y(p(i), "stateBehaviors", (t = {}, y(t, E, {
                    init: function() {
                      this.addOnAudioProcess();
                    },
                    getPlayedPercents: function() {
                      var o = this.getDuration();
                      return this.getCurrentTime() / o || 0;
                    },
                    getCurrentTime: function() {
                      return this.startPosition + this.getPlayedTime();
                    }
                  }), y(t, w, {
                    init: function() {
                    },
                    getPlayedPercents: function() {
                      var o = this.getDuration();
                      return this.getCurrentTime() / o || 0;
                    },
                    getCurrentTime: function() {
                      return this.startPosition;
                    }
                  }), y(t, T, {
                    init: function() {
                      this.fireEvent("finish");
                    },
                    getPlayedPercents: function() {
                      return 1;
                    },
                    getCurrentTime: function() {
                      return this.getDuration();
                    }
                  }), t)), i.params = r, i.ac = r.audioContext || (i.supportsWebAudio() ? i.getAudioContext() : {}), i.lastPlay = i.ac.currentTime, i.startPosition = 0, i.scheduledPause = null, i.states = (l = {}, y(l, E, Object.create(i.stateBehaviors[E])), y(l, w, Object.create(i.stateBehaviors[w])), y(l, T, Object.create(i.stateBehaviors[T])), l), i.buffer = null, i.filters = [], i.gainNode = null, i.mergedPeaks = null, i.offlineAc = null, i.peaks = null, i.playbackRate = 1, i.analyser = null, i.scriptNode = null, i.source = null, i.splitPeaks = [], i.state = null, i.explicitDuration = r.duration, i.sinkStreamDestination = null, i.sinkAudioElement = null, i.destroyed = !1, i;
                }
                return b(c, [{
                  key: "supportsWebAudio",
                  value: (
                    /**
                     * Does the browser support this backend
                     *
                     * @return {boolean} Whether or not this browser supports this backend
                     */
                    function() {
                      return !!(window.AudioContext || window.webkitAudioContext);
                    }
                  )
                  /**
                   * Get the audio context used by this backend or create one
                   *
                   * @return {AudioContext} Existing audio context, or creates a new one
                   */
                }, {
                  key: "getAudioContext",
                  value: function() {
                    return window.WaveSurferAudioContext || (window.WaveSurferAudioContext = new (window.AudioContext || window.webkitAudioContext)()), window.WaveSurferAudioContext;
                  }
                  /**
                   * Get the offline audio context used by this backend or create one
                   *
                   * @param {number} sampleRate The sample rate to use
                   * @return {OfflineAudioContext} Existing offline audio context, or creates
                   * a new one
                   */
                }, {
                  key: "getOfflineAudioContext",
                  value: function(t) {
                    return window.WaveSurferOfflineAudioContext || (window.WaveSurferOfflineAudioContext = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 2, t)), window.WaveSurferOfflineAudioContext;
                  }
                }, {
                  key: "init",
                  value: function() {
                    this.createVolumeNode(), this.createScriptNode(), this.createAnalyserNode(), this.setState(w), this.setPlaybackRate(this.params.audioRate), this.setLength(0);
                  }
                  /** @private */
                }, {
                  key: "disconnectFilters",
                  value: function() {
                    this.filters && (this.filters.forEach(function(t) {
                      t && t.disconnect();
                    }), this.filters = null, this.analyser.connect(this.gainNode));
                  }
                  /**
                   * @private
                   *
                   * @param {string} state The new state
                   */
                }, {
                  key: "setState",
                  value: function(t) {
                    this.state !== this.states[t] && (this.state = this.states[t], this.state.init.call(this));
                  }
                  /**
                   * Unpacked `setFilters()`
                   *
                   * @param {...AudioNode} filters One or more filters to set
                   */
                }, {
                  key: "setFilter",
                  value: function() {
                    for (var t = arguments.length, l = new Array(t), i = 0; i < t; i++)
                      l[i] = arguments[i];
                    this.setFilters(l);
                  }
                  /**
                   * Insert custom Web Audio nodes into the graph
                   *
                   * @param {AudioNode[]} filters Packed filters array
                   * @example
                   * const lowpass = wavesurfer.backend.ac.createBiquadFilter();
                   * wavesurfer.backend.setFilter(lowpass);
                   */
                }, {
                  key: "setFilters",
                  value: function(t) {
                    this.disconnectFilters(), t && t.length && (this.filters = t, this.analyser.disconnect(), t.reduce(function(l, i) {
                      return l.connect(i), i;
                    }, this.analyser).connect(this.gainNode));
                  }
                  /** Create ScriptProcessorNode to process audio */
                }, {
                  key: "createScriptNode",
                  value: function() {
                    this.params.audioScriptProcessor && (this.scriptNode = this.params.audioScriptProcessor, this.scriptNode.connect(this.ac.destination));
                  }
                  /** @private */
                }, {
                  key: "addOnAudioProcess",
                  value: function() {
                    var t = this, l = function i() {
                      var e = t.getCurrentTime();
                      e >= t.getDuration() && t.state !== t.states[T] ? (t.setState(T), t.fireEvent("pause")) : e >= t.scheduledPause && t.state !== t.states[w] ? t.pause() : t.state === t.states[E] && (t.fireEvent("audioprocess", e), h.frame(i)());
                    };
                    l();
                  }
                  /** Create analyser node to perform audio analysis */
                }, {
                  key: "createAnalyserNode",
                  value: function() {
                    this.analyser = this.ac.createAnalyser(), this.analyser.connect(this.gainNode);
                  }
                  /**
                   * Create the gain node needed to control the playback volume.
                   *
                   */
                }, {
                  key: "createVolumeNode",
                  value: function() {
                    this.ac.createGain ? this.gainNode = this.ac.createGain() : this.gainNode = this.ac.createGainNode(), this.gainNode.connect(this.ac.destination);
                  }
                  /**
                   * Set the sink id for the media player
                   *
                   * @param {string} deviceId String value representing audio device id.
                   * @returns {Promise} A Promise that resolves to `undefined` when there
                   * are no errors.
                   */
                }, {
                  key: "setSinkId",
                  value: function(t) {
                    return t ? (this.sinkAudioElement || (this.sinkAudioElement = new window.Audio(), this.sinkAudioElement.autoplay = !0), this.sinkAudioElement.setSinkId ? (this.sinkStreamDestination || (this.sinkStreamDestination = this.ac.createMediaStreamDestination()), this.gainNode.disconnect(), this.gainNode.connect(this.sinkStreamDestination), this.sinkAudioElement.srcObject = this.sinkStreamDestination.stream, this.sinkAudioElement.setSinkId(t)) : Promise.reject(new Error("setSinkId is not supported in your browser"))) : Promise.reject(new Error("Invalid deviceId: " + t));
                  }
                  /**
                   * Set the audio volume
                   *
                   * @param {number} value A floating point value between 0 and 1.
                   */
                }, {
                  key: "setVolume",
                  value: function(t) {
                    this.gainNode.gain.setValueAtTime(t, this.ac.currentTime);
                  }
                  /**
                   * Get the current volume
                   *
                   * @return {number} value A floating point value between 0 and 1.
                   */
                }, {
                  key: "getVolume",
                  value: function() {
                    return this.gainNode.gain.value;
                  }
                  /**
                   * Decode an array buffer and pass data to a callback
                   *
                   * @private
                   * @param {ArrayBuffer} arraybuffer The array buffer to decode
                   * @param {function} callback The function to call on complete.
                   * @param {function} errback The function to call on error.
                   */
                }, {
                  key: "decodeArrayBuffer",
                  value: function(t, l, i) {
                    this.offlineAc || (this.offlineAc = this.getOfflineAudioContext(this.ac && this.ac.sampleRate ? this.ac.sampleRate : 44100)), "webkitAudioContext" in window ? this.offlineAc.decodeAudioData(t, function(e) {
                      return l(e);
                    }, i) : this.offlineAc.decodeAudioData(t).then(function(e) {
                      return l(e);
                    }).catch(function(e) {
                      return i(e);
                    });
                  }
                  /**
                   * Set pre-decoded peaks
                   *
                   * @param {number[]|Number.<Array[]>} peaks Peaks data
                   * @param {?number} duration Explicit duration
                   */
                }, {
                  key: "setPeaks",
                  value: function(t, l) {
                    l != null && (this.explicitDuration = l), this.peaks = t;
                  }
                  /**
                   * Set the rendered length (different from the length of the audio)
                   *
                   * @param {number} length The rendered length
                   */
                }, {
                  key: "setLength",
                  value: function(t) {
                    if (!(this.mergedPeaks && t == 2 * this.mergedPeaks.length - 1 + 2)) {
                      this.splitPeaks = [], this.mergedPeaks = [];
                      var l = this.buffer ? this.buffer.numberOfChannels : 1, i;
                      for (i = 0; i < l; i++)
                        this.splitPeaks[i] = [], this.splitPeaks[i][2 * (t - 1)] = 0, this.splitPeaks[i][2 * (t - 1) + 1] = 0;
                      this.mergedPeaks[2 * (t - 1)] = 0, this.mergedPeaks[2 * (t - 1) + 1] = 0;
                    }
                  }
                  /**
                   * Compute the max and min value of the waveform when broken into <length> subranges.
                   *
                   * @param {number} length How many subranges to break the waveform into.
                   * @param {number} first First sample in the required range.
                   * @param {number} last Last sample in the required range.
                   * @return {number[]|Number.<Array[]>} Array of 2*<length> peaks or array of arrays of
                   * peaks consisting of (max, min) values for each subrange.
                   */
                }, {
                  key: "getPeaks",
                  value: function(t, l, i) {
                    if (this.peaks)
                      return this.peaks;
                    if (!this.buffer)
                      return [];
                    if (l = l || 0, i = i || t - 1, this.setLength(t), !this.buffer)
                      return this.params.splitChannels ? this.splitPeaks : this.mergedPeaks;
                    if (!this.buffer.length) {
                      var e = this.createBuffer(1, 4096, this.sampleRate);
                      this.buffer = e.buffer;
                    }
                    var o = this.buffer.length / t, v = ~~(o / 10) || 1, s = this.buffer.numberOfChannels, m;
                    for (m = 0; m < s; m++) {
                      var j = this.splitPeaks[m], I = this.buffer.getChannelData(m), B = void 0;
                      for (B = l; B <= i; B++) {
                        var N = ~~(B * o), q = ~~(N + o), F = I[N], K = F, z = void 0;
                        for (z = N; z < q; z += v) {
                          var G = I[z];
                          G > K && (K = G), G < F && (F = G);
                        }
                        j[2 * B] = K, j[2 * B + 1] = F, (m == 0 || K > this.mergedPeaks[2 * B]) && (this.mergedPeaks[2 * B] = K), (m == 0 || F < this.mergedPeaks[2 * B + 1]) && (this.mergedPeaks[2 * B + 1] = F);
                      }
                    }
                    return this.params.splitChannels ? this.splitPeaks : this.mergedPeaks;
                  }
                  /**
                   * Get the position from 0 to 1
                   *
                   * @return {number} Position
                   */
                }, {
                  key: "getPlayedPercents",
                  value: function() {
                    return this.state.getPlayedPercents.call(this);
                  }
                  /** @private */
                }, {
                  key: "disconnectSource",
                  value: function() {
                    this.source && this.source.disconnect();
                  }
                  /**
                   * Destroy all references with WebAudio, disconnecting audio nodes and closing Audio Context
                   */
                }, {
                  key: "destroyWebAudio",
                  value: function() {
                    this.disconnectFilters(), this.disconnectSource(), this.gainNode.disconnect(), this.scriptNode && this.scriptNode.disconnect(), this.analyser.disconnect(), this.params.closeAudioContext && (typeof this.ac.close == "function" && this.ac.state != "closed" && this.ac.close(), this.ac = null, this.params.audioContext ? this.params.audioContext = null : window.WaveSurferAudioContext = null, window.WaveSurferOfflineAudioContext = null), this.sinkStreamDestination && (this.sinkAudioElement.pause(), this.sinkAudioElement.srcObject = null, this.sinkStreamDestination.disconnect(), this.sinkStreamDestination = null);
                  }
                  /**
                   * This is called when wavesurfer is destroyed
                   */
                }, {
                  key: "destroy",
                  value: function() {
                    this.isPaused() || this.pause(), this.unAll(), this.buffer = null, this.destroyed = !0, this.destroyWebAudio();
                  }
                  /**
                   * Loaded a decoded audio buffer
                   *
                   * @param {Object} buffer Decoded audio buffer to load
                   */
                }, {
                  key: "load",
                  value: function(t) {
                    this.startPosition = 0, this.lastPlay = this.ac.currentTime, this.buffer = t, this.createSource();
                  }
                  /** @private */
                }, {
                  key: "createSource",
                  value: function() {
                    this.disconnectSource(), this.source = this.ac.createBufferSource(), this.source.start = this.source.start || this.source.noteGrainOn, this.source.stop = this.source.stop || this.source.noteOff, this.setPlaybackRate(this.playbackRate), this.source.buffer = this.buffer, this.source.connect(this.analyser);
                  }
                  /**
                   * @private
                   *
                   * some browsers require an explicit call to #resume before they will play back audio
                   */
                }, {
                  key: "resumeAudioContext",
                  value: function() {
                    this.ac.state == "suspended" && this.ac.resume && this.ac.resume();
                  }
                  /**
                   * Used by `wavesurfer.isPlaying()` and `wavesurfer.playPause()`
                   *
                   * @return {boolean} Whether or not this backend is currently paused
                   */
                }, {
                  key: "isPaused",
                  value: function() {
                    return this.state !== this.states[E];
                  }
                  /**
                   * Used by `wavesurfer.getDuration()`
                   *
                   * @return {number} Duration of loaded buffer
                   */
                }, {
                  key: "getDuration",
                  value: function() {
                    return this.explicitDuration ? this.explicitDuration : this.buffer ? this.buffer.duration : 0;
                  }
                  /**
                   * Used by `wavesurfer.seekTo()`
                   *
                   * @param {number} start Position to start at in seconds
                   * @param {number} end Position to end at in seconds
                   * @return {{start: number, end: number}} Object containing start and end
                   * positions
                   */
                }, {
                  key: "seekTo",
                  value: function(t, l) {
                    if (this.buffer)
                      return this.scheduledPause = null, t == null && (t = this.getCurrentTime(), t >= this.getDuration() && (t = 0)), l == null && (l = this.getDuration()), this.startPosition = t, this.lastPlay = this.ac.currentTime, this.state === this.states[T] && this.setState(w), {
                        start: t,
                        end: l
                      };
                  }
                  /**
                   * Get the playback position in seconds
                   *
                   * @return {number} The playback position in seconds
                   */
                }, {
                  key: "getPlayedTime",
                  value: function() {
                    return (this.ac.currentTime - this.lastPlay) * this.playbackRate;
                  }
                  /**
                   * Plays the loaded audio region.
                   *
                   * @param {number} start Start offset in seconds, relative to the beginning
                   * of a clip.
                   * @param {number} end When to stop relative to the beginning of a clip.
                   */
                }, {
                  key: "play",
                  value: function(t, l) {
                    if (this.buffer) {
                      this.createSource();
                      var i = this.seekTo(t, l);
                      t = i.start, l = i.end, this.scheduledPause = l, this.source.start(0, t), this.resumeAudioContext(), this.setState(E), this.fireEvent("play");
                    }
                  }
                  /**
                   * Pauses the loaded audio.
                   */
                }, {
                  key: "pause",
                  value: function() {
                    this.scheduledPause = null, this.startPosition += this.getPlayedTime();
                    try {
                      this.source && this.source.stop(0);
                    } catch {
                    }
                    this.setState(w), this.fireEvent("pause");
                  }
                  /**
                   * Returns the current time in seconds relative to the audio-clip's
                   * duration.
                   *
                   * @return {number} The current time in seconds
                   */
                }, {
                  key: "getCurrentTime",
                  value: function() {
                    return this.state.getCurrentTime.call(this);
                  }
                  /**
                   * Returns the current playback rate. (0=no playback, 1=normal playback)
                   *
                   * @return {number} The current playback rate
                   */
                }, {
                  key: "getPlaybackRate",
                  value: function() {
                    return this.playbackRate;
                  }
                  /**
                   * Set the audio source playback rate.
                   *
                   * @param {number} value The playback rate to use
                   */
                }, {
                  key: "setPlaybackRate",
                  value: function(t) {
                    this.playbackRate = t || 1, this.source && this.source.playbackRate.setValueAtTime(this.playbackRate, this.ac.currentTime);
                  }
                  /**
                   * Set a point in seconds for playback to stop at.
                   *
                   * @param {number} end Position to end at
                   * @version 3.3.0
                   */
                }, {
                  key: "setPlayEnd",
                  value: function(t) {
                    this.scheduledPause = t;
                  }
                }]), c;
              }(h.Observer);
              P.default = d, W.exports = P.default;
            }
          ),
          /***/
          "./node_modules/debounce/index.js": (
            /*!****************************************!*\
              !*** ./node_modules/debounce/index.js ***!
              \****************************************/
            /***/
            (W) => {
              function P(g, h, A) {
                var R, C, x, L, b;
                h == null && (h = 100);
                function _() {
                  var D = Date.now() - L;
                  D < h && D >= 0 ? R = setTimeout(_, h - D) : (R = null, A || (b = g.apply(x, C), x = C = null));
                }
                var M = function() {
                  x = this, C = arguments, L = Date.now();
                  var D = A && !R;
                  return R || (R = setTimeout(_, h)), D && (b = g.apply(x, C), x = C = null), b;
                };
                return M.clear = function() {
                  R && (clearTimeout(R), R = null);
                }, M.flush = function() {
                  R && (b = g.apply(x, C), x = C = null, clearTimeout(R), R = null);
                }, M;
              }
              P.debounce = P, W.exports = P;
            }
          )
          /******/
        }, U = {};
        function $(W) {
          var P = U[W];
          if (P !== void 0)
            return P.exports;
          var g = U[W] = {
            /******/
            // no module.id needed
            /******/
            // no module.loaded needed
            /******/
            exports: {}
            /******/
          };
          return V[W](g, g.exports, $), g.exports;
        }
        var Q = $("./src/wavesurfer.js");
        return Q;
      })()
    ));
  }(ae)), ae.exports;
}
/*!
 * videojs-wavesurfer
 * @version 3.10.0
 * @see https://github.com/collab-project/videojs-wavesurfer
 * @copyright 2014-2024 Collab
 * @license MIT
 */
(function(H, Y) {
  (function(U, $) {
    H.exports = $(Z, Ae());
  })(self, (V, U) => (
    /******/
    (() => {
      var $ = {
        /***/
        "./node_modules/add-zero/index.js": (
          /*!****************************************!*\
            !*** ./node_modules/add-zero/index.js ***!
            \****************************************/
          /***/
          function(g, h, A) {
            var R;
            (function(C) {
              function x(L, b) {
                b = b || 2;
                var _ = Number(L) < 0, M = L.toString(), D = 0;
                return _ && (M = M.slice(1)), D = b - M.length + 1, M = new Array(D).join("0").concat(M), (_ ? "-" : "") + M;
              }
              R = (function() {
                return x;
              }).call(C, A, C, g), R !== void 0 && (g.exports = R);
            })(this);
          }
        ),
        /***/
        "./src/js/defaults.js": (
          /*!****************************!*\
            !*** ./src/js/defaults.js ***!
            \****************************/
          /***/
          (g, h) => {
            Object.defineProperty(h, "__esModule", {
              value: !0
            }), h.default = void 0;
            var A = {
              debug: !1,
              displayMilliseconds: !0
            };
            h.default = A, g.exports = h.default;
          }
        ),
        /***/
        "./src/js/event.js": (
          /*!*************************!*\
            !*** ./src/js/event.js ***!
            \*************************/
          /***/
          (g, h) => {
            Object.defineProperty(h, "__esModule", {
              value: !0
            }), h.default = void 0;
            function A(x, L, b) {
              return Object.defineProperty(x, "prototype", { writable: !1 }), x;
            }
            function R(x, L) {
              if (!(x instanceof L))
                throw new TypeError("Cannot call a class as a function");
            }
            var C = A(function x() {
              R(this, x);
            });
            C.READY = "ready", C.ERROR = "error", C.VOLUMECHANGE = "volumechange", C.FULLSCREENCHANGE = "fullscreenchange", C.TIMEUPDATE = "timeupdate", C.ENDED = "ended", C.PAUSE = "pause", C.FINISH = "finish", C.SEEK = "seek", C.REDRAW = "redraw", C.AUDIOPROCESS = "audioprocess", C.DEVICE_READY = "deviceReady", C.DEVICE_ERROR = "deviceError", C.AUDIO_OUTPUT_READY = "audioOutputReady", C.WAVE_READY = "waveReady", C.PLAYBACK_FINISH = "playbackFinish", C.ABORT = "abort", C.RESIZE = "resize", Object.freeze(C), h.default = C, g.exports = h.default;
          }
        ),
        /***/
        "./src/js/middleware.js": (
          /*!******************************!*\
            !*** ./src/js/middleware.js ***!
            \******************************/
          /***/
          (g, h) => {
            Object.defineProperty(h, "__esModule", {
              value: !0
            }), h.default = void 0;
            var A = {
              setSource: function(C, x) {
                if (this.player.usingPlugin("wavesurfer")) {
                  var L = this.player.wavesurfer().surfer.params.backend, b = C.src, _ = C.peaks;
                  switch (L) {
                    case "WebAudio":
                      this.player.wavesurfer().load(b);
                      break;
                    default:
                      x(null, C);
                      var M = this.player.tech_.el();
                      _ === void 0 ? this.player.wavesurfer().load(M) : this.player.wavesurfer().load(M, _);
                      break;
                  }
                } else
                  x(null, C);
              }
            };
            h.default = A, g.exports = h.default;
          }
        ),
        /***/
        "./src/js/utils/format-time.js": (
          /*!*************************************!*\
            !*** ./src/js/utils/format-time.js ***!
            \*************************************/
          /***/
          (g, h, A) => {
            Object.defineProperty(h, "__esModule", {
              value: !0
            }), h.default = void 0;
            var R = x(A(
              /*! add-zero */
              "./node_modules/add-zero/index.js"
            )), C = x(A(
              /*! parse-ms */
              "./node_modules/parse-ms/index.js"
            ));
            function x(b) {
              return b && b.__esModule ? b : { default: b };
            }
            var L = function(_, M) {
              var D = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
              _ = _ < 0 ? 0 : _, (isNaN(_) || _ === 1 / 0) && (_ = 0);
              var k = (0, C.default)(_ * 1e3), p = k;
              M !== void 0 && (p = (0, C.default)(M * 1e3));
              var f = (0, R.default)(k.hours), u = (0, R.default)(k.minutes), y = (0, R.default)(k.seconds), O = (0, R.default)(k.milliseconds, 3);
              if (k.days > 0 || p.days > 0) {
                var S = (0, R.default)(k.days);
                return "".concat(S, ":").concat(f, ":").concat(u, ":").concat(y);
              }
              return k.hours > 0 || p.hours > 0 ? "".concat(f, ":").concat(u, ":").concat(y) : D ? "".concat(u, ":").concat(y, ":").concat(O) : "".concat(u, ":").concat(y);
            };
            h.default = L, g.exports = h.default;
          }
        ),
        /***/
        "./src/js/utils/log.js": (
          /*!*****************************!*\
            !*** ./src/js/utils/log.js ***!
            \*****************************/
          /***/
          (g, h, A) => {
            Object.defineProperty(h, "__esModule", {
              value: !0
            }), h.default = void 0;
            var R = C(A(
              /*! video.js */
              "video.js"
            ));
            function C(_) {
              return _ && _.__esModule ? _ : { default: _ };
            }
            var x = "error", L = "warn", b = function(M, D, k) {
              k === !0 && (D === x ? R.default.log.error(M) : D === L ? R.default.log.warn(M) : R.default.log(M));
            };
            h.default = b, g.exports = h.default;
          }
        ),
        /***/
        "./node_modules/global/window.js": (
          /*!***************************************!*\
            !*** ./node_modules/global/window.js ***!
            \***************************************/
          /***/
          (g, h, A) => {
            var R;
            typeof window < "u" ? R = window : typeof A.g < "u" ? R = A.g : typeof self < "u" ? R = self : R = {}, g.exports = R;
          }
        ),
        /***/
        "video.js": (
          /*!*************************************************************************************************!*\
            !*** external {"commonjs":"video.js","commonjs2":"video.js","amd":"video.js","root":"videojs"} ***!
            \*************************************************************************************************/
          /***/
          (g) => {
            g.exports = V;
          }
        ),
        /***/
        "wavesurfer.js": (
          /*!*******************************************************************************************************************!*\
            !*** external {"commonjs":"wavesurfer.js","commonjs2":"wavesurfer.js","amd":"wavesurfer.js","root":"WaveSurfer"} ***!
            \*******************************************************************************************************************/
          /***/
          (g) => {
            g.exports = U;
          }
        ),
        /***/
        "./node_modules/parse-ms/index.js": (
          /*!****************************************!*\
            !*** ./node_modules/parse-ms/index.js ***!
            \****************************************/
          /***/
          (g, h, A) => {
            A.r(h), A.d(h, {
              /* harmony export */
              default: () => (
                /* binding */
                R
              )
              /* harmony export */
            });
            function R(C) {
              if (typeof C != "number")
                throw new TypeError("Expected a number");
              const x = C > 0 ? Math.floor : Math.ceil;
              return {
                days: x(C / 864e5),
                hours: x(C / 36e5) % 24,
                minutes: x(C / 6e4) % 60,
                seconds: x(C / 1e3) % 60,
                milliseconds: x(C) % 1e3,
                microseconds: x(C * 1e3) % 1e3,
                nanoseconds: x(C * 1e6) % 1e3
              };
            }
          }
        )
        /******/
      }, Q = {};
      function W(g) {
        var h = Q[g];
        if (h !== void 0)
          return h.exports;
        var A = Q[g] = {
          /******/
          // no module.id needed
          /******/
          // no module.loaded needed
          /******/
          exports: {}
          /******/
        };
        return $[g].call(A.exports, A, A.exports, W), A.exports;
      }
      W.d = (g, h) => {
        for (var A in h)
          W.o(h, A) && !W.o(g, A) && Object.defineProperty(g, A, { enumerable: !0, get: h[A] });
      }, W.g = function() {
        if (typeof globalThis == "object") return globalThis;
        try {
          return this || new Function("return this")();
        } catch {
          if (typeof window == "object") return window;
        }
      }(), W.o = (g, h) => Object.prototype.hasOwnProperty.call(g, h), W.r = (g) => {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(g, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(g, "__esModule", { value: !0 });
      };
      var P = {};
      return (() => {
        var g = P;
        /*!**************************************!*\
          !*** ./src/js/videojs.wavesurfer.js ***!
          \**************************************/
        function h(e) {
          "@babel/helpers - typeof";
          return h = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o) {
            return typeof o;
          } : function(o) {
            return o && typeof Symbol == "function" && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
          }, h(e);
        }
        Object.defineProperty(g, "__esModule", {
          value: !0
        }), g.Wavesurfer = void 0;
        var A = M(W(
          /*! ./event */
          "./src/js/event.js"
        )), R = M(W(
          /*! ./utils/log */
          "./src/js/utils/log.js"
        )), C = M(W(
          /*! ./utils/format-time */
          "./src/js/utils/format-time.js"
        )), x = M(W(
          /*! ./defaults */
          "./src/js/defaults.js"
        )), L = M(W(
          /*! ./middleware */
          "./src/js/middleware.js"
        ));
        M(W(
          /*! global/window */
          "./node_modules/global/window.js"
        ));
        var b = M(W(
          /*! video.js */
          "video.js"
        )), _ = M(W(
          /*! wavesurfer.js */
          "wavesurfer.js"
        ));
        function M(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function D(e, o) {
          if (!(e instanceof o))
            throw new TypeError("Cannot call a class as a function");
        }
        function k(e, o) {
          for (var v = 0; v < o.length; v++) {
            var s = o[v];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, f(s.key), s);
          }
        }
        function p(e, o, v) {
          return o && k(e.prototype, o), Object.defineProperty(e, "prototype", { writable: !1 }), e;
        }
        function f(e) {
          var o = u(e, "string");
          return h(o) == "symbol" ? o : String(o);
        }
        function u(e, o) {
          if (h(e) != "object" || !e) return e;
          var v = e[Symbol.toPrimitive];
          if (v !== void 0) {
            var s = v.call(e, o);
            if (h(s) != "object") return s;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(e);
        }
        function y(e, o, v) {
          return o = E(o), O(e, S() ? Reflect.construct(o, v || [], E(e).constructor) : o.apply(e, v));
        }
        function O(e, o) {
          if (o && (h(o) === "object" || typeof o == "function"))
            return o;
          if (o !== void 0)
            throw new TypeError("Derived constructors may only return object or undefined");
          return w(e);
        }
        function S() {
          try {
            var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
            }));
          } catch {
          }
          return (S = function() {
            return !!e;
          })();
        }
        function E(e) {
          return E = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(v) {
            return v.__proto__ || Object.getPrototypeOf(v);
          }, E(e);
        }
        function w(e) {
          if (e === void 0)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e;
        }
        function T(e, o) {
          if (typeof o != "function" && o !== null)
            throw new TypeError("Super expression must either be null or a function");
          e.prototype = Object.create(o && o.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), o && d(e, o);
        }
        function d(e, o) {
          return d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(s, m) {
            return s.__proto__ = m, s;
          }, d(e, o);
        }
        var n = b.default.getPlugin("plugin"), a = "wavesurfer", c = "vjs-wavedisplay", r = "vjs-wavesurfer", t = "WebAudio", l = "MediaElement", i = g.Wavesurfer = function(e) {
          T(o, e);
          function o(v, s) {
            var m;
            return D(this, o), m = y(this, o, [v, s]), v.addClass(r), b.default.obj !== void 0 ? s = b.default.obj.merge(x.default, s) : s = b.default.mergeOptions(x.default, s), m.waveReady = !1, m.waveFinished = !1, m.liveMode = !1, m.backend = null, m.debug = s.debug.toString() === "true", m.textTracksEnabled = m.player.options_.tracks.length > 0, m.displayMilliseconds = s.displayMilliseconds, s.formatTime && typeof s.formatTime == "function" ? m.setFormatTime(s.formatTime) : m.setFormatTime(function(j, I) {
              return (0, C.default)(j, I, m.displayMilliseconds);
            }), m.player.one(A.default.READY, m.initialize.bind(w(m))), m;
          }
          return p(o, [{
            key: "initialize",
            value: function() {
              var s = this;
              this.player.bigPlayButton !== void 0 && this.player.bigPlayButton.hide();
              var m = this.parseOptions(this.player.options_.plugins.wavesurfer);
              if (this.player.options_.controls === !0) {
                this.player.controlBar.show(), this.player.controlBar.el_.style.display = "flex", this.backend === t && this.player.controlBar.progressControl !== void 0 && this.player.controlBar.progressControl.hide(), this.player.controlBar.pictureInPictureToggle !== void 0 && this.player.controlBar.pictureInPictureToggle.hide();
                var j = ["currentTimeDisplay", "timeDivider", "durationDisplay"];
                j.forEach(function(I) {
                  I = s.player.controlBar[I], I !== void 0 && (I.el_.style.display = "block", I.show());
                }), this.player.controlBar.remainingTimeDisplay !== void 0 && this.player.controlBar.remainingTimeDisplay.hide(), this.backend === t && this.player.controlBar.playToggle !== void 0 && (this.player.controlBar.playToggle.on(["tap", "click"], this.onPlayToggle.bind(this)), this.player.controlBar.playToggle.hide());
              }
              this.surfer = _.default.create(m), this.surfer.on(A.default.ERROR, this.onWaveError.bind(this)), this.surfer.on(A.default.FINISH, this.onWaveFinish.bind(this)), this.backend = this.surfer.params.backend, this.log("Using wavesurfer.js " + this.backend + " backend."), "microphone" in this.player.wavesurfer().surfer.getActivePlugins() && (this.liveMode = !0, this.waveReady = !0, this.log("wavesurfer.js microphone plugin enabled."), this.player.controlBar.playToggle.show(), this.surfer.microphone.on(A.default.DEVICE_ERROR, this.onWaveError.bind(this))), this.surferReady = this.onWaveReady.bind(this), this.backend === t && (this.surferProgress = this.onWaveProgress.bind(this), this.surferSeek = this.onWaveSeek.bind(this), this.player.muted() && this.setVolume(0)), this.liveMode || this.setupPlaybackEvents(!0), this.player.on(A.default.VOLUMECHANGE, this.onVolumeChange.bind(this)), this.player.on(A.default.FULLSCREENCHANGE, this.onScreenChange.bind(this)), this.player.options_.fluid === !0 && (this.surfer.drawer.wrapper.className = c);
            }
          }, {
            key: "parseOptions",
            value: function() {
              var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, m = this.player.el_.getBoundingClientRect();
              this.originalWidth = this.player.options_.width || m.width, this.originalHeight = this.player.options_.height || m.height;
              var j = this.player.controlBar.height();
              if (this.player.options_.controls === !0 && j === 0 && (j = 30), s.container === void 0 && (s.container = this.player.el_), s.waveformHeight === void 0) {
                var I = m.height;
                s.height = I - j;
              } else
                s.height = s.waveformHeight;
              return s.splitChannels && s.splitChannels === !0 && (s.height /= 2), "backend" in s ? this.backend = s.backend : s.backend = this.backend = l, s;
            }
          }, {
            key: "setupPlaybackEvents",
            value: function(s) {
              s === !1 ? (this.surfer.un(A.default.READY, this.surferReady), this.backend === t && (this.surfer.un(A.default.AUDIOPROCESS, this.surferProgress), this.surfer.un(A.default.SEEK, this.surferSeek))) : s === !0 && (this.surfer.on(A.default.READY, this.surferReady), this.backend === t && (this.surfer.on(A.default.AUDIOPROCESS, this.surferProgress), this.surfer.on(A.default.SEEK, this.surferSeek)));
            }
          }, {
            key: "load",
            value: function(s, m) {
              s instanceof Blob || s instanceof File ? (this.log("Loading object: " + JSON.stringify(s)), this.surfer.loadBlob(s)) : m !== void 0 ? this.loadPeaks(s, m) : (typeof s == "string" ? this.log("Loading URL: " + s) : this.log("Loading element: " + s), this.surfer.load(s));
            }
          }, {
            key: "loadPeaks",
            value: function(s, m) {
              var j = this;
              if (Array.isArray(m))
                this.log("Loading URL with array of peaks: " + s), this.surfer.load(s, m);
              else {
                var I = {
                  url: m,
                  responseType: "json"
                };
                this.player.options_.plugins.wavesurfer.xhr !== void 0 && (I.xhr = this.player.options_.plugins.wavesurfer.xhr);
                var B = _.default.util.fetchFile(I);
                B.once("success", function(N) {
                  j.log("Loaded Peak Data URL: " + m), N && N.data ? j.surfer.load(s, N.data) : (j.player.trigger(A.default.ERROR, "Could not load peaks data from " + m), j.log(err, "error"));
                }), B.once("error", function(N) {
                  j.player.trigger(A.default.ERROR, "Unable to retrieve peak data from " + m + ". Status code: " + B.response.status);
                });
              }
            }
          }, {
            key: "play",
            value: function() {
              if (this.player.controlBar.playToggle !== void 0 && this.player.controlBar.playToggle.contentEl() && this.player.controlBar.playToggle.handlePlay(), this.liveMode)
                if (!this.surfer.microphone.active)
                  this.log("Start microphone"), this.surfer.microphone.start();
                else {
                  var s = !this.surfer.microphone.paused;
                  s ? this.pause() : (this.log("Resume microphone"), this.surfer.microphone.play());
                }
              else
                this.log("Start playback"), this.player.play(), this.surfer.play();
            }
          }, {
            key: "pause",
            value: function() {
              this.player.controlBar.playToggle !== void 0 && this.player.controlBar.playToggle.contentEl() && this.player.controlBar.playToggle.handlePause(), this.liveMode ? (this.log("Pause microphone"), this.surfer.microphone.pause()) : (this.log("Pause playback"), this.waveFinished ? this.waveFinished = !1 : this.surfer.pause(), this.setCurrentTime());
            }
          }, {
            key: "dispose",
            value: function() {
              this.surfer && (this.liveMode && this.surfer.microphone && (this.surfer.microphone.destroy(), this.log("Destroyed microphone plugin")), this.surfer.destroy()), this.log("Destroyed plugin");
            }
          }, {
            key: "isDestroyed",
            value: function() {
              return this.player && this.player.children() === null;
            }
          }, {
            key: "destroy",
            value: function() {
              this.player.dispose();
            }
          }, {
            key: "setVolume",
            value: function(s) {
              s !== void 0 && (this.log("Changing volume to: " + s), this.player.volume(s));
            }
          }, {
            key: "exportImage",
            value: function(s, m) {
              var j = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "blob";
              return this.surfer.exportImage(s, m, j);
            }
          }, {
            key: "setAudioOutput",
            value: function(s) {
              var m = this;
              s && this.surfer.setSinkId(s).then(function(j) {
                m.player.trigger(A.default.AUDIO_OUTPUT_READY);
              }).catch(function(j) {
                m.player.trigger(A.default.ERROR, j), m.log(j, "error");
              });
            }
          }, {
            key: "getCurrentTime",
            value: function() {
              var s = this.surfer.getCurrentTime();
              return s = isNaN(s) ? 0 : s, s;
            }
          }, {
            key: "setCurrentTime",
            value: function(s, m) {
              if (s === void 0 && (s = this.surfer.getCurrentTime()), m === void 0 && (m = this.surfer.getDuration()), s = isNaN(s) ? 0 : s, m = isNaN(m) ? 0 : m, this.player.controlBar.currentTimeDisplay && this.player.controlBar.currentTimeDisplay.contentEl() && this.player.controlBar.currentTimeDisplay.contentEl().lastChild) {
                var j = Math.min(s, m);
                this.player.controlBar.currentTimeDisplay.formattedTime_ = this.player.controlBar.currentTimeDisplay.contentEl().lastChild.textContent = this._formatTime(j, m, this.displayMilliseconds);
              }
              this.textTracksEnabled && this.player.tech_ && this.player.tech_.el_ && this.player.tech_.setCurrentTime(s);
            }
          }, {
            key: "getDuration",
            value: function() {
              var s = this.surfer.getDuration();
              return s = isNaN(s) ? 0 : s, s;
            }
          }, {
            key: "setDuration",
            value: function(s) {
              s === void 0 && (s = this.surfer.getDuration()), s = isNaN(s) ? 0 : s, this.player.controlBar.durationDisplay && this.player.controlBar.durationDisplay.contentEl() && this.player.controlBar.durationDisplay.contentEl().lastChild && (this.player.controlBar.durationDisplay.formattedTime_ = this.player.controlBar.durationDisplay.contentEl().lastChild.textContent = this._formatTime(s, s, this.displayMilliseconds));
            }
          }, {
            key: "onWaveReady",
            value: function() {
              var s = this;
              this.waveReady = !0, this.waveFinished = !1, this.liveMode = !1, this.log("Waveform is ready"), this.player.trigger(A.default.WAVE_READY), this.backend === t && (this.setCurrentTime(), this.setDuration(), this.player.controlBar.playToggle !== void 0 && this.player.controlBar.playToggle.contentEl() && this.player.controlBar.playToggle.show()), this.player.loadingSpinner.contentEl() && this.player.loadingSpinner.hide(), this.player.options_.autoplay === !0 && (this.setVolume(0), this.backend === t ? this.play() : this.player.play().catch(function(m) {
                s.onWaveError(m);
              }));
            }
          }, {
            key: "onWaveFinish",
            value: function() {
              var s = this;
              this.log("Finished playback"), this.player.trigger(A.default.PLAYBACK_FINISH), this.player.options_.loop === !0 ? this.backend === t && (this.surfer.stop(), this.play()) : (this.waveFinished = !0, this.backend === t && (this.pause(), this.player.trigger(A.default.ENDED), this.surfer.once(A.default.SEEK, function() {
                s.player.controlBar.playToggle !== void 0 && s.player.controlBar.playToggle.removeClass("vjs-ended"), s.player.trigger(A.default.PAUSE);
              })));
            }
          }, {
            key: "onWaveProgress",
            value: function(s) {
              this.setCurrentTime();
            }
          }, {
            key: "onWaveSeek",
            value: function() {
              this.setCurrentTime();
            }
          }, {
            key: "onWaveError",
            value: function(s) {
              s.name && s.name === "AbortError" || s.name === "DOMException" && s.message.startsWith("The operation was aborted") ? this.player.trigger(A.default.ABORT, s) : (this.player.trigger(A.default.ERROR, s), this.log(s, "error"));
            }
          }, {
            key: "onPlayToggle",
            value: function() {
              this.player.controlBar.playToggle !== void 0 && this.player.controlBar.playToggle.hasClass("vjs-ended") && this.player.controlBar.playToggle.removeClass("vjs-ended"), this.surfer.isPlaying() ? this.pause() : this.play();
            }
          }, {
            key: "onVolumeChange",
            value: function() {
              var s = this.player.volume();
              this.player.muted() && (s = 0), this.surfer.setVolume(s);
            }
          }, {
            key: "onScreenChange",
            value: function() {
              var s = this, m = this.player.setInterval(function() {
                var j = s.player.isFullscreen(), I, B;
                if (j || (I = s.originalWidth, B = s.originalHeight), s.waveReady) {
                  if (s.liveMode && !s.surfer.microphone.active)
                    return;
                  s.redrawWaveform(I, B);
                }
                s.player.clearInterval(m);
              }, 100);
            }
          }, {
            key: "redrawWaveform",
            value: function(s, m) {
              if (!this.isDestroyed()) {
                if (this.player.el_) {
                  var j = this.player.el_.getBoundingClientRect();
                  s === void 0 && (s = j.width), m === void 0 && (m = j.height);
                }
                this.surfer.drawer.destroy(), this.surfer.params.width = s, this.surfer.params.height = m - this.player.controlBar.height(), this.surfer.createDrawer(), this.surfer.drawer.wrapper.className = c, this.surfer.drawBuffer(), this.surfer.drawer.progress(this.surfer.backend.getPlayedPercents());
              }
            }
          }, {
            key: "log",
            value: function(s, m) {
              (0, R.default)(s, m, this.debug);
            }
          }, {
            key: "setFormatTime",
            value: function(s) {
              this._formatTime = s, b.default.time ? b.default.time.setFormatTime(this._formatTime) : b.default.setFormatTime(this._formatTime);
            }
          }]), o;
        }(n);
        i.VERSION = "3.10.0", b.default.Wavesurfer = i, b.default.getPlugin(a) === void 0 && b.default.registerPlugin(a, i), b.default.use("*", function(e) {
          return L.default.player = e, L.default;
        });
      })(), P;
    })()
  ));
})(ke);
const Ce = "تشغيل", Ee = "إيقاف", _e = "المدة", Oe = "مباشر", Se = "تم التحميل", Re = "التقدم", Te = "ملء الشاشة", Me = "كتم", xe = "إلغاء الكتم", We = "الترجمة", De = "التسمية التوضيحية", je = "الفصول", Be = "أغلق", Ve = "إعادة التشغيل", Le = "الوصف", Ie = "النص", Ne = "أبيض", Fe = "أسود", He = "أحمر", Ue = "أخضر", ze = "أزرق", qe = "أصفر", Ye = "أرجواني", Ge = "أزرق سماوي", $e = "الخلفية", Ke = "نافذة", Qe = "شفاف", Xe = "معتم", Ze = "لا شيء", Je = "بارز", et = "منخفض", tt = "منتظم", rt = "Casual", nt = "Script", it = "إعادة الضبط", at = "تم", st = "اللون", ot = "معدل الشفافية", lt = {
  Play: Ce,
  Pause: Ee,
  "Current Time": "الوقت الحالي",
  Duration: _e,
  "Remaining Time": "الوقت المتبقي",
  "Stream Type": "نوع التيار",
  LIVE: Oe,
  Loaded: Se,
  Progress: Re,
  Fullscreen: Te,
  "Exit Fullscreen": "تعطيل ملء الشاشة",
  Mute: Me,
  Unmute: xe,
  "Playback Rate": "سرعة التشغيل",
  Subtitles: We,
  "subtitles off": "إيقاف الترجمة",
  Captions: De,
  "captions off": "إيقاف التسمية التوضيحية",
  Chapters: je,
  "You aborted the media playback": "لقد ألغيت تشغيل الفيديو",
  "A network error caused the media download to fail part-way.": "تسبب خطأ في الشبكة بفشل تحميل الفيديو بالكامل.",
  "The media could not be loaded, either because the server or network failed or because the format is not supported.": "لا يمكن تحميل الفيديو بسبب فشل في الخادم أو الشبكة ، أو بسبب عدم إمكانية قراءة تنسيق الفيديو.",
  "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": "تم إيقاف تشغيل الفيديو بسبب عدم صلاحية الفيديو أو لأن الفيديو المستخدم يستخدم ميزات غير مدعومة من متصفحك.",
  "No compatible source was found for this media.": "فشل العثور على أي مصدر متوافق مع هذا الفيديو.",
  "Play Video": "تشغيل الفيديو",
  Close: Be,
  "Modal Window": "النافذة",
  "This is a modal window": "هذه نافذة",
  "This modal can be closed by pressing the Escape key or activating the close button.": "يمكن غلق هذه النافذة عن طريق الضغط على زر الخروج أو تفعيل زر الإغلاق",
  ", opens captions settings dialog": ", تفتح نافذة خيارات التسمية التوضيحية",
  ", opens subtitles settings dialog": ", تفتح نافذة خيارات الترجمة",
  ", selected": ", مختار",
  "Audio Player": "مشغل الصوت",
  "Video Player": "مشغل الفيديو",
  Replay: Ve,
  "Seek to live, currently behind live": "الذهاب إلى نقطة البث المباشر، متأخر عن البث المباشر حاليًا",
  "Seek to live, currently playing live": "الذهاب إلى نقطة البث المباشر، البث المباشر قيد التشغيل حاليًا",
  "Progress Bar": "شريط التقدم",
  "progress bar timing: currentTime={1} duration={2}": "{1} من {2}",
  Descriptions: Le,
  "descriptions off": "إخفاء الوصف",
  "Audio Track": "المسار الصوتي",
  "Volume Level": "مستوى الصوت",
  "The media is encrypted and we do not have the keys to decrypt it.": "الوسائط مشفرة وليس لدينا الرموز اللازمة لفك شفرتها.",
  "Close Modal Dialog": "إغلاق مربع الحوار المشروط",
  ", opens descriptions settings dialog": "، يفتح نافذة إعدادات الوصف",
  "captions settings": "إعدادات التعليقات التوضيحية",
  "subtitles settings": "إعدادات الترجمات",
  "descriptions settings": "إعدادات الوصف",
  Text: Ie,
  White: Ne,
  Black: Fe,
  Red: He,
  Green: Ue,
  Blue: ze,
  Yellow: qe,
  Magenta: Ye,
  Cyan: Ge,
  Background: $e,
  Window: Ke,
  Transparent: Qe,
  "Semi-Transparent": "نصف شفاف",
  Opaque: Xe,
  "Font Size": "حجم الخط",
  "Text Edge Style": "نمط حواف النص",
  None: Ze,
  Raised: Je,
  Depressed: et,
  Uniform: tt,
  "Drop shadow": "الظل",
  "Font Family": "عائلة الخطوط",
  "Proportional Sans-Serif": "Proportional Sans-Serif",
  "Monospace Sans-Serif": "Monospace Sans-Serif",
  "Proportional Serif": "Proportional Serif",
  "Monospace Serif": "Monospace Serif",
  Casual: rt,
  Script: nt,
  "Small Caps": "Small Caps",
  Reset: it,
  "restore all settings to the default values": "استعادة كل الإعدادات إلى القيم الافتراضية",
  Done: at,
  "Caption Settings Dialog": "نافذة إعدادات التعليقات التوضيحية",
  "Beginning of dialog window. Escape will cancel and close the window.": 'بداية النافذة. الضغط على زر "Escape" سيؤدي إلى الإلغاء وإغلاق النافذة.',
  "End of dialog window.": ".نهاية النافذة",
  "{1} is loading.": "{1} قيد التحميل.",
  "Exit Picture-in-Picture": "الخروج من وضع صورة داخل صورة",
  "Picture-in-Picture": "صورة داخل صورة",
  "No content": "لا يوجد محتوى",
  Color: st,
  Opacity: ot,
  "Text Background": "خلفية النص",
  "Caption Area Background": "خلفية منطقة التسمية التوضيحية",
  "Playing in Picture-in-Picture": "صورة داخل صورة قيد التشغيل",
  "Skip forward {1} seconds": "التخطي للأمام {1}",
  "Skip backward {1} seconds": "الرجوع للخلف {1}"
}, ut = {
  class: "media-container relative",
  id: "media_c"
}, ct = ["src", "srclang", "label", "default"], ft = /* @__PURE__ */ he({
  __name: "VTamkinPlayer",
  props: {
    mediaUrl: {
      type: String,
      required: !0
    },
    isVideo: {
      type: Boolean,
      required: !0
    },
    captionOptions: {
      type: Array,
      default: () => [
        { src: "captions-en.vtt", lang: "en", label: "English", default: !0 },
        { src: "captions-es.vtt", lang: "es", label: "Spanish", default: !1 }
      ]
    },
    subtitleColor: {
      type: String,
      default: "#FFFFFF"
      // Default white color
    },
    subtitleFontSize: {
      type: String,
      default: "16px"
      // Default font size
    },
    subtitleFontWeight: {
      type: String
    },
    subtitleFontStyle: {
      type: String,
      default: "normal"
      // Default style
    },
    subtitleBackground: {
      type: String,
      default: "#000000"
      // Default style
    },
    subtitleTextTransform: {
      type: String,
      default: "none"
      // Default no transformation
    },
    subtitleLineHeight: {
      type: String,
      default: "3px"
      // Default line height
    },
    subtitleAlignment: {
      type: String,
      default: "center"
      // Default center alignment
    },
    subtitleLetterSpacing: {
      type: String,
      default: "normal"
      // Default letter spacing
    },
    subtitleUnderLine: {
      type: String,
      default: "none"
    },
    subtitleFontFamily: {
      type: String,
      default: "Poppins"
    },
    lineCount: {
      type: String,
      default: "2"
    }
  },
  emits: ["TamkinFullScreen"],
  setup(H, { emit: Y }) {
    const V = H, U = oe(() => V.captionOptions);
    ie(!1);
    const $ = {
      fill: !0,
      responsive: !0,
      language: "ar",
      controlBar: {
        children: [
          "playToggle",
          "currentTimeDisplay",
          "TimeDivider",
          "durationDisplay",
          "progressControl",
          "volumePanel"
        ]
      },
      plugins: V.isVideo ? {} : {
        wavesurfer: {
          backend: "MediaElement",
          displayMilliseconds: !1,
          debug: !0,
          waveColor: "white",
          progressColor: "#2DADA3",
          cursorColor: "white",
          interact: !0,
          hideScrollbar: !0,
          responsive: !0
        }
      }
    }, Q = ie(null);
    let W = null, P = null;
    const g = Y, h = Z.getComponent("Button");
    class A extends h {
      constructor(f, u) {
        super(f, u), this.controlText("Full Screen");
      }
      createEl() {
        const f = super.createEl("button", {
          className: "vjs-custom-fullscreen-button vjs-control vjs-button",
          title: this.controlText()
        }), u = Z.dom.createEl("span", {
          className: "vjs-icon-placeholder",
          innerHTML: '<?xml version="1.0" ?><svg height="14px" version="1.1" viewBox="0 0 14 14" width="14px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="white" id="Core" transform="translate(-215.000000, -257.000000)"><g id="fullscreen" transform="translate(215.000000, 257.000000)"><path d="M2,9 L0,9 L0,14 L5,14 L5,12 L2,12 L2,9 L2,9 Z M0,5 L2,5 L2,2 L5,2 L5,0 L0,0 L0,5 L0,5 Z M12,12 L9,12 L9,14 L14,14 L14,9 L12,9 L12,12 L12,12 Z M9,0 L9,2 L12,2 L12,5 L14,5 L14,0 L9,0 L9,0 Z" id="Shape"/></g></g></g></svg>'
        });
        return f.appendChild(u), f.onclick = () => {
          if (g("TamkinFullScreen"), !V.isVideo) {
            const y = document.getElementById("media_cc");
            P = new ResizeObserver(() => {
              W && W.wavesurfer() && (W.wavesurfer().surfer.drawer.containerWidth = W.el().offsetWidth, W.wavesurfer().surfer.drawBuffer());
            }), P.observe(y);
          }
        }, f;
      }
    }
    const R = oe(() => V.isVideo ? "video/mp4" : "audio/wav"), C = ie("");
    function x(p, f) {
      const u = p.length, y = Math.ceil(u / f), O = [];
      for (let S = 0; S < f; S++) {
        const E = S * y, w = E + y, T = p.substring(E, w).trim();
        T && O.push(T);
      }
      return O;
    }
    function L(p) {
      const f = W.textTracks().tracks_[0];
      f.addEventListener("cuechange", () => {
        const u = f.activeCues;
        if (u && u.length > 0)
          for (let y of Array.from(u)) {
            const O = document.querySelector(".vjs-text-track-display .vjs-text-track-cue div");
            if (console.log("Cue Element:", O), O) {
              const S = x(y.text, p);
              O.innerHTML = S.map((E) => `<div>${E}</div>`).join("");
            } else
              console.error("Cue element not found for cue ID:", y.text);
          }
        else
          console.log("No active cues found");
      });
    }
    function b() {
      const p = document.querySelectorAll(".vjs-text-track-display .vjs-text-track-cue div");
      if (p.length === 0) {
        console.warn("No cue elements found. Retrying in 100ms..."), setTimeout(b, 100);
        return;
      }
      p.forEach((f) => {
        let u;
        f.addEventListener("mousedown", (S) => {
          u = S.clientY - f.getBoundingClientRect().top, document.addEventListener("mousemove", y), document.addEventListener("mouseup", O);
        });
        const y = (S) => {
          f.style.position = "absolute", f.style.top = `${S.clientY - u}px`;
        }, O = () => {
          document.removeEventListener("mousemove", y), document.removeEventListener("mouseup", O);
        };
      });
    }
    function _(p) {
      return new Promise((f, u) => {
        const y = document.createElement("script");
        y.src = p, y.defer = !0, y.onload = () => f(), y.onerror = () => u(new Error(`Failed to load script: ${p}`)), document.body.appendChild(y);
      });
    }
    function M(p) {
      return new Promise((f, u) => {
        const y = document.createElement("link");
        y.rel = "stylesheet", y.href = p, y.onload = () => f(), y.onerror = () => u(new Error(`Failed to load stylesheet: ${p}`)), document.head.appendChild(y);
      });
    }
    async function D() {
      try {
        await Promise.all([
          _("https://cdn.tamkin.app/runtime.js"),
          _("https://cdn.tamkin.app/app.js"),
          M("https://cdn.tamkin.app/app.css")
        ]), console.log("All assets loaded successfully");
      } catch (p) {
        console.error(p);
      }
    }
    pe(() => {
      D();
    }), ve(async () => {
      W = Z(Q.value, $, function() {
        W.src({ src: V.mediaUrl, type: R.value });
      }), Z.addLanguage("ar", lt), Z.registerComponent("CustomFullscreenButton", A), W.addClass("my-custom-control-bar"), W.getChild("controlBar").addChild("CustomFullscreenButton", {}, 7), V.isVideo || W.on("waveReady", function() {
      }), W.on("playbackFinish", function() {
        console.log("Playback finished.");
      }), W.ready(async () => {
        k();
        const f = W.textTracks().tracks_.find((u) => u.mode === "showing");
        W.on("loadeddata", () => {
          b();
        }), f && (console.log("Active text track:", f.label), f.addEventListener("loadeddata", () => {
          f.cues && f.cues.length > 0 && (C.value = f.cues[0].text, console.log("Current Subtitle : " + C.value));
        }), f.addEventListener("cuechange", () => {
          const u = f.activeCues;
          if (u.length > 0) {
            const y = Array.from(u).map((O) => O.text).join(" ");
            window.getAdAnimate(y, 1), L(Number(V.lineCount)), C.value = y;
          } else
            C.value = "";
          console.log("Current Subtitle : " + C.value);
        }));
      }), W.on("error", function(f, u) {
        console.warn("ERROR:", u);
      }), L(Number(V.lineCount));
    }), ye(
      [
        () => V.subtitleColor,
        () => V.subtitleFontSize,
        () => V.subtitleFontWeight,
        () => V.subtitleFontStyle,
        () => V.subtitleTextTransform,
        () => V.subtitleLineHeight,
        () => V.subtitleAlignment,
        () => V.subtitleLetterSpacing,
        () => V.subtitleUnderLine,
        () => V.subtitleFontFamily,
        () => V.lineCount,
        () => V.subtitleBackground
      ],
      () => {
        W && (k(), L(Number(V.lineCount)));
      }
    );
    function k(p) {
      L(Number(V.lineCount));
      const f = `
    .vjs-text-track-cue div {
      color: ${V.subtitleColor} !important;
      font-size: ${V.subtitleFontSize} !important;
      font-weight: ${V.subtitleFontWeight} !important;
      font-style: ${V.subtitleFontStyle} !important;
      text-transform: ${V.subtitleTextTransform} !important;
      line-height: ${V.subtitleLineHeight} !important;
      letter-spacing: ${V.subtitleLetterSpacing} !important;
      text-decoration: ${V.subtitleUnderLine} !important;
      font-family: ${V.subtitleFontFamily} !important;
            background-color: ${V.subtitleBackground} !important;

    }
    .vjs-text-track-cue div {
      font-family: ${V.subtitleFontFamily} !important;
    }
    .vjs-text-track-cue {
      font-family: ${V.subtitleFontFamily} !important; /* Add this line */
            text-align: ${V.subtitleAlignment} !important;

    }
    .vjs-text-track-cue {
      top: calc( ${V.subtitleFontSize !== "32px" ? "90%" : "80%"} - ${V.subtitleLineHeight !== "0px" ? V.subtitleLineHeight : "0px"} ) !important; 
    }
  `, u = document.createElement("style");
      u.innerHTML = f, W.el().appendChild(u);
    }
    return me(() => {
      W && W.dispose();
    }), (p, f) => {
      const u = ge("tamkin-sdk-web-character");
      return J(), ee("div", ut, [
        H.isVideo ? (J(), ee("video", {
          key: 0,
          ref_key: "mediaPlayer",
          ref: Q,
          class: "video-js vjs-default-skin",
          playsinline: "",
          controls: "",
          preload: "auto"
        }, [
          (J(!0), ee(be, null, we(U.value, (y, O) => (J(), ee("track", {
            key: O,
            kind: "captions",
            src: y.src,
            srclang: y.lang,
            label: y.label,
            default: y.default
          }, null, 8, ct))), 128))
        ], 512)) : (J(), ee("audio", {
          key: 1,
          id: "media_cc",
          ref_key: "mediaPlayer",
          ref: Q,
          class: "video-js vjs-default-skin",
          playsinline: "",
          controls: "",
          preload: "auto"
        }, null, 512)),
        Pe(u, {
          charWidth: "0",
          charHeight: "0"
        })
      ]);
    };
  }
}), mt = {
  install(H) {
    H.component("VTamkinPlayer", ft), H.component("VTamkinPdf", VTamkinPdf);
  }
};
function dt(H) {
  return new Promise((Y, V) => {
    const U = document.createElement("link");
    U.rel = "stylesheet", U.href = H, U.onload = () => Y(), U.onerror = () => V(new Error(`Failed to load stylesheet: ${H}`)), document.head.appendChild(U);
  });
}
function ue(H) {
  return new Promise((Y, V) => {
    const U = document.createElement("script");
    U.src = H, U.defer = !0, U.onload = () => Y(), U.onerror = () => V(new Error(`Failed to load script: ${H}`)), document.body.appendChild(U);
  });
}
async function ht() {
  try {
    await Promise.all([
      ue("https://cdn.tamkin.app/runtime.js"),
      ue("https://cdn.tamkin.app/app.js"),
      dt("https://cdn.tamkin.app/app.css")
    ]), console.log("All assets loaded successfully");
  } catch (H) {
    console.error(H);
  }
}
async function pt() {
  try {
    const H = document.createElement("link");
    H.rel = "preconnect", H.href = "https://fonts.googleapis.com";
    const Y = document.createElement("link");
    Y.rel = "preconnect", Y.href = "https://fonts.gstatic.com", Y.crossOrigin = "";
    const V = document.createElement("link");
    V.href = "https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Arima:wght@100..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap", V.rel = "stylesheet", document.head.appendChild(H), document.head.appendChild(Y), document.head.appendChild(V);
  } catch (H) {
    console.error(H);
  }
}
pt();
ht();
export {
  ft as VTamkinPlayer,
  mt as default
};
