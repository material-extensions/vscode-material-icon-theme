"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/is-buffer/index.js
var require_is_buffer = __commonJS({
  "node_modules/is-buffer/index.js"(exports2, module2) {
    module2.exports = function(obj) {
      return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
    };
    function isBuffer(obj) {
      return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
    }
    function isSlowBuffer(obj) {
      return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
    }
  }
});

// node_modules/kind-of/index.js
var require_kind_of = __commonJS({
  "node_modules/kind-of/index.js"(exports2, module2) {
    var isBuffer = require_is_buffer();
    var toString = Object.prototype.toString;
    module2.exports = function kindOf(val) {
      if (typeof val === "undefined") {
        return "undefined";
      }
      if (val === null) {
        return "null";
      }
      if (val === true || val === false || val instanceof Boolean) {
        return "boolean";
      }
      if (typeof val === "string" || val instanceof String) {
        return "string";
      }
      if (typeof val === "number" || val instanceof Number) {
        return "number";
      }
      if (typeof val === "function" || val instanceof Function) {
        return "function";
      }
      if (typeof Array.isArray !== "undefined" && Array.isArray(val)) {
        return "array";
      }
      if (val instanceof RegExp) {
        return "regexp";
      }
      if (val instanceof Date) {
        return "date";
      }
      var type = toString.call(val);
      if (type === "[object RegExp]") {
        return "regexp";
      }
      if (type === "[object Date]") {
        return "date";
      }
      if (type === "[object Arguments]") {
        return "arguments";
      }
      if (type === "[object Error]") {
        return "error";
      }
      if (isBuffer(val)) {
        return "buffer";
      }
      if (type === "[object Set]") {
        return "set";
      }
      if (type === "[object WeakSet]") {
        return "weakset";
      }
      if (type === "[object Map]") {
        return "map";
      }
      if (type === "[object WeakMap]") {
        return "weakmap";
      }
      if (type === "[object Symbol]") {
        return "symbol";
      }
      if (type === "[object Int8Array]") {
        return "int8array";
      }
      if (type === "[object Uint8Array]") {
        return "uint8array";
      }
      if (type === "[object Uint8ClampedArray]") {
        return "uint8clampedarray";
      }
      if (type === "[object Int16Array]") {
        return "int16array";
      }
      if (type === "[object Uint16Array]") {
        return "uint16array";
      }
      if (type === "[object Int32Array]") {
        return "int32array";
      }
      if (type === "[object Uint32Array]") {
        return "uint32array";
      }
      if (type === "[object Float32Array]") {
        return "float32array";
      }
      if (type === "[object Float64Array]") {
        return "float64array";
      }
      return "object";
    };
  }
});

// node_modules/rename-keys/index.js
var require_rename_keys = __commonJS({
  "node_modules/rename-keys/index.js"(exports2, module2) {
    (function() {
      "use strict";
      function rename(obj, fn) {
        if (typeof fn !== "function") {
          return obj;
        }
        var res = {};
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            res[fn(key, obj[key]) || key] = obj[key];
          }
        }
        return res;
      }
      if (typeof module2 !== "undefined" && module2.exports) {
        module2.exports = rename;
      } else {
        if (typeof define === "function" && define.amd) {
          define([], function() {
            return rename;
          });
        } else {
          window.rename = rename;
        }
      }
    })();
  }
});

// node_modules/deep-rename-keys/index.js
var require_deep_rename_keys = __commonJS({
  "node_modules/deep-rename-keys/index.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var rename = require_rename_keys();
    module2.exports = function renameDeep(obj, cb) {
      var type = typeOf(obj);
      if (type !== "object" && type !== "array") {
        throw new Error("expected an object");
      }
      var res = [];
      if (type === "object") {
        obj = rename(obj, cb);
        res = {};
      }
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var val = obj[key];
          if (typeOf(val) === "object" || typeOf(val) === "array") {
            res[key] = renameDeep(val, cb);
          } else {
            res[key] = val;
          }
        }
      }
      return res;
    };
  }
});

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports2, module2) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event, exists) {
      var evt = prefix ? prefix + event : event, available = this._events[evt];
      if (exists) return !!available;
      if (!available) return [];
      if (available.fn) return [available.fn];
      for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
        ee[i] = available[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      var listener = new EE(fn, context || this), evt = prefix ? prefix + event : event;
      if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
      else if (!this._events[evt].fn) this._events[evt].push(listener);
      else this._events[evt] = [this._events[evt], listener];
      return this;
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      var listener = new EE(fn, context || this, true), evt = prefix ? prefix + event : event;
      if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
      else if (!this._events[evt].fn) this._events[evt].push(listener);
      else this._events[evt] = [this._events[evt], listener];
      return this;
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        if (--this._eventsCount === 0) this._events = new Events();
        else delete this._events[evt];
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          if (--this._eventsCount === 0) this._events = new Events();
          else delete this._events[evt];
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else if (--this._eventsCount === 0) this._events = new Events();
        else delete this._events[evt];
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) {
          if (--this._eventsCount === 0) this._events = new Events();
          else delete this._events[evt];
        }
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prototype.setMaxListeners = function setMaxListeners() {
      return this;
    };
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if ("undefined" !== typeof module2) {
      module2.exports = EventEmitter2;
    }
  }
});

// node_modules/xml-lexer/dist/lexer.js
var require_lexer = __commonJS({
  "node_modules/xml-lexer/dist/lexer.js"(exports2, module2) {
    "use strict";
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var EventEmitter2 = require_eventemitter3();
    var noop = function noop2() {
    };
    var State = {
      data: "state-data",
      cdata: "state-cdata",
      tagBegin: "state-tag-begin",
      tagName: "state-tag-name",
      tagEnd: "state-tag-end",
      attributeNameStart: "state-attribute-name-start",
      attributeName: "state-attribute-name",
      attributeNameEnd: "state-attribute-name-end",
      attributeValueBegin: "state-attribute-value-begin",
      attributeValue: "state-attribute-value"
    };
    var Action = {
      lt: "action-lt",
      gt: "action-gt",
      space: "action-space",
      equal: "action-equal",
      quote: "action-quote",
      slash: "action-slash",
      char: "action-char",
      error: "action-error"
    };
    var Type = {
      text: "text",
      openTag: "open-tag",
      closeTag: "close-tag",
      attributeName: "attribute-name",
      attributeValue: "attribute-value"
    };
    var charToAction = {
      " ": Action.space,
      "	": Action.space,
      "\n": Action.space,
      "\r": Action.space,
      "<": Action.lt,
      ">": Action.gt,
      '"': Action.quote,
      "'": Action.quote,
      "=": Action.equal,
      "/": Action.slash
    };
    var getAction = function getAction2(char) {
      return charToAction[char] || Action.char;
    };
    var create = function create2(options) {
      var _State$data, _State$tagBegin, _State$tagName, _State$tagEnd, _State$attributeNameS, _State$attributeName, _State$attributeNameE, _State$attributeValue, _State$attributeValue2, _lexer$stateMachine;
      options = Object.assign({ debug: false }, options);
      var lexer = new EventEmitter2();
      var state = State.data;
      var data = "";
      var tagName = "";
      var attrName = "";
      var attrValue = "";
      var isClosing = "";
      var openingQuote = "";
      var emit = function emit2(type, value) {
        if (tagName[0] === "?" || tagName[0] === "!") {
          return;
        }
        var event = { type, value };
        if (options.debug) {
          console.log("emit:", event);
        }
        lexer.emit("data", event);
      };
      lexer.stateMachine = (_lexer$stateMachine = {}, _defineProperty(_lexer$stateMachine, State.data, (_State$data = {}, _defineProperty(_State$data, Action.lt, function() {
        if (data.trim()) {
          emit(Type.text, data);
        }
        tagName = "";
        isClosing = false;
        state = State.tagBegin;
      }), _defineProperty(_State$data, Action.char, function(char) {
        data += char;
      }), _State$data)), _defineProperty(_lexer$stateMachine, State.cdata, _defineProperty({}, Action.char, function(char) {
        data += char;
        if (data.substr(-3) === "]]>") {
          emit(Type.text, data.slice(0, -3));
          data = "";
          state = State.data;
        }
      })), _defineProperty(_lexer$stateMachine, State.tagBegin, (_State$tagBegin = {}, _defineProperty(_State$tagBegin, Action.space, noop), _defineProperty(_State$tagBegin, Action.char, function(char) {
        tagName = char;
        state = State.tagName;
      }), _defineProperty(_State$tagBegin, Action.slash, function() {
        tagName = "";
        isClosing = true;
      }), _State$tagBegin)), _defineProperty(_lexer$stateMachine, State.tagName, (_State$tagName = {}, _defineProperty(_State$tagName, Action.space, function() {
        if (isClosing) {
          state = State.tagEnd;
        } else {
          state = State.attributeNameStart;
          emit(Type.openTag, tagName);
        }
      }), _defineProperty(_State$tagName, Action.gt, function() {
        if (isClosing) {
          emit(Type.closeTag, tagName);
        } else {
          emit(Type.openTag, tagName);
        }
        data = "";
        state = State.data;
      }), _defineProperty(_State$tagName, Action.slash, function() {
        state = State.tagEnd;
        emit(Type.openTag, tagName);
      }), _defineProperty(_State$tagName, Action.char, function(char) {
        tagName += char;
        if (tagName === "![CDATA[") {
          state = State.cdata;
          data = "";
          tagName = "";
        }
      }), _State$tagName)), _defineProperty(_lexer$stateMachine, State.tagEnd, (_State$tagEnd = {}, _defineProperty(_State$tagEnd, Action.gt, function() {
        emit(Type.closeTag, tagName);
        data = "";
        state = State.data;
      }), _defineProperty(_State$tagEnd, Action.char, noop), _State$tagEnd)), _defineProperty(_lexer$stateMachine, State.attributeNameStart, (_State$attributeNameS = {}, _defineProperty(_State$attributeNameS, Action.char, function(char) {
        attrName = char;
        state = State.attributeName;
      }), _defineProperty(_State$attributeNameS, Action.gt, function() {
        data = "";
        state = State.data;
      }), _defineProperty(_State$attributeNameS, Action.space, noop), _defineProperty(_State$attributeNameS, Action.slash, function() {
        isClosing = true;
        state = State.tagEnd;
      }), _State$attributeNameS)), _defineProperty(_lexer$stateMachine, State.attributeName, (_State$attributeName = {}, _defineProperty(_State$attributeName, Action.space, function() {
        state = State.attributeNameEnd;
      }), _defineProperty(_State$attributeName, Action.equal, function() {
        emit(Type.attributeName, attrName);
        state = State.attributeValueBegin;
      }), _defineProperty(_State$attributeName, Action.gt, function() {
        attrValue = "";
        emit(Type.attributeName, attrName);
        emit(Type.attributeValue, attrValue);
        data = "";
        state = State.data;
      }), _defineProperty(_State$attributeName, Action.slash, function() {
        isClosing = true;
        attrValue = "";
        emit(Type.attributeName, attrName);
        emit(Type.attributeValue, attrValue);
        state = State.tagEnd;
      }), _defineProperty(_State$attributeName, Action.char, function(char) {
        attrName += char;
      }), _State$attributeName)), _defineProperty(_lexer$stateMachine, State.attributeNameEnd, (_State$attributeNameE = {}, _defineProperty(_State$attributeNameE, Action.space, noop), _defineProperty(_State$attributeNameE, Action.equal, function() {
        emit(Type.attributeName, attrName);
        state = State.attributeValueBegin;
      }), _defineProperty(_State$attributeNameE, Action.gt, function() {
        attrValue = "";
        emit(Type.attributeName, attrName);
        emit(Type.attributeValue, attrValue);
        data = "";
        state = State.data;
      }), _defineProperty(_State$attributeNameE, Action.char, function(char) {
        attrValue = "";
        emit(Type.attributeName, attrName);
        emit(Type.attributeValue, attrValue);
        attrName = char;
        state = State.attributeName;
      }), _State$attributeNameE)), _defineProperty(_lexer$stateMachine, State.attributeValueBegin, (_State$attributeValue = {}, _defineProperty(_State$attributeValue, Action.space, noop), _defineProperty(_State$attributeValue, Action.quote, function(char) {
        openingQuote = char;
        attrValue = "";
        state = State.attributeValue;
      }), _defineProperty(_State$attributeValue, Action.gt, function() {
        attrValue = "";
        emit(Type.attributeValue, attrValue);
        data = "";
        state = State.data;
      }), _defineProperty(_State$attributeValue, Action.char, function(char) {
        openingQuote = "";
        attrValue = char;
        state = State.attributeValue;
      }), _State$attributeValue)), _defineProperty(_lexer$stateMachine, State.attributeValue, (_State$attributeValue2 = {}, _defineProperty(_State$attributeValue2, Action.space, function(char) {
        if (openingQuote) {
          attrValue += char;
        } else {
          emit(Type.attributeValue, attrValue);
          state = State.attributeNameStart;
        }
      }), _defineProperty(_State$attributeValue2, Action.quote, function(char) {
        if (openingQuote === char) {
          emit(Type.attributeValue, attrValue);
          state = State.attributeNameStart;
        } else {
          attrValue += char;
        }
      }), _defineProperty(_State$attributeValue2, Action.gt, function(char) {
        if (openingQuote) {
          attrValue += char;
        } else {
          emit(Type.attributeValue, attrValue);
          data = "";
          state = State.data;
        }
      }), _defineProperty(_State$attributeValue2, Action.slash, function(char) {
        if (openingQuote) {
          attrValue += char;
        } else {
          emit(Type.attributeValue, attrValue);
          isClosing = true;
          state = State.tagEnd;
        }
      }), _defineProperty(_State$attributeValue2, Action.char, function(char) {
        attrValue += char;
      }), _State$attributeValue2)), _lexer$stateMachine);
      var step = function step2(char) {
        if (options.debug) {
          console.log(state, char);
        }
        var actions = lexer.stateMachine[state];
        var action = actions[getAction(char)] || actions[Action.error] || actions[Action.char];
        action(char);
      };
      lexer.write = function(str) {
        var len = str.length;
        for (var i = 0; i < len; i++) {
          step(str[i]);
        }
      };
      return lexer;
    };
    module2.exports = {
      State,
      Action,
      Type,
      create
    };
  }
});

// node_modules/xml-reader/dist/reader.js
var require_reader = __commonJS({
  "node_modules/xml-reader/dist/reader.js"(exports2, module2) {
    "use strict";
    var EventEmitter2 = require_eventemitter3();
    var Lexer = require_lexer();
    var Type = Lexer.Type;
    var NodeType = {
      element: "element",
      text: "text"
    };
    var createNode = function createNode2(params) {
      return Object.assign({
        name: "",
        type: NodeType.element,
        value: "",
        parent: null,
        attributes: {},
        children: []
      }, params);
    };
    var create = function create2(options) {
      options = Object.assign({
        stream: false,
        parentNodes: true,
        doneEvent: "done",
        tagPrefix: "tag:",
        emitTopLevelOnly: false,
        debug: false
      }, options);
      var lexer = void 0, rootNode = void 0, current = void 0, attrName = void 0;
      var reader = new EventEmitter2();
      var handleLexerData = function handleLexerData2(data) {
        switch (data.type) {
          case Type.openTag:
            if (current === null) {
              current = rootNode;
              current.name = data.value;
            } else {
              var node = createNode({
                name: data.value,
                parent: current
              });
              current.children.push(node);
              current = node;
            }
            break;
          case Type.closeTag:
            var parent = current.parent;
            if (!options.parentNodes) {
              current.parent = null;
            }
            if (current.name !== data.value) {
              break;
            }
            if (options.stream && parent === rootNode) {
              rootNode.children = [];
              current.parent = null;
            }
            if (!options.emitTopLevelOnly || parent === rootNode) {
              reader.emit(options.tagPrefix + current.name, current);
              reader.emit("tag", current.name, current);
            }
            if (current === rootNode) {
              lexer.removeAllListeners("data");
              reader.emit(options.doneEvent, current);
              rootNode = null;
            }
            current = parent;
            break;
          case Type.text:
            if (current) {
              current.children.push(createNode({
                type: NodeType.text,
                value: data.value,
                parent: options.parentNodes ? current : null
              }));
            }
            break;
          case Type.attributeName:
            attrName = data.value;
            current.attributes[attrName] = "";
            break;
          case Type.attributeValue:
            current.attributes[attrName] = data.value;
            break;
        }
      };
      reader.reset = function() {
        lexer = Lexer.create({ debug: options.debug });
        lexer.on("data", handleLexerData);
        rootNode = createNode();
        current = null;
        attrName = "";
        reader.parse = lexer.write;
      };
      reader.reset();
      return reader;
    };
    var parseSync = function parseSync2(xml, options) {
      options = Object.assign({}, options, { stream: false, tagPrefix: ":" });
      var reader = create(options);
      var res = void 0;
      reader.on("done", function(ast) {
        res = ast;
      });
      reader.parse(xml);
      return res;
    };
    module2.exports = {
      parseSync,
      create,
      NodeType
    };
  }
});

// node_modules/svgson/dist/svgson.cjs.js
var require_svgson_cjs = __commonJS({
  "node_modules/svgson/dist/svgson.cjs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var rename = require_deep_rename_keys();
    var xmlReader = require_reader();
    var parseInput = function parseInput2(input) {
      var parsed = xmlReader.parseSync("<root>".concat(input, "</root>"), {
        parentNodes: false
      });
      var isValid = parsed.children && parsed.children.length > 0 && parsed.children.every(function(node) {
        return node.name === "svg";
      });
      if (isValid) {
        return parsed.children.length === 1 ? parsed.children[0] : parsed.children;
      } else {
        throw Error("nothing to parse");
      }
    };
    var camelize = function camelize2(node) {
      return rename(node, function(key) {
        if (!notCamelcase(key)) {
          return toCamelCase(key);
        }
        return key;
      });
    };
    var toCamelCase = function toCamelCase2(prop) {
      return prop.replace(/[-|:]([a-z])/gi, function(all, letter) {
        return letter.toUpperCase();
      });
    };
    var notCamelcase = function notCamelcase2(prop) {
      return /^(data|aria)(-\w+)/.test(prop);
    };
    var escapeText = function escapeText2(text) {
      if (text) {
        var str = String(text);
        return /[&<>]/.test(str) ? "<![CDATA[".concat(str.replace(/]]>/, "]]]]><![CDATA[>"), "]]>") : str;
      }
      return "";
    };
    var escapeAttr = function escapeAttr2(attr) {
      return String(attr).replace(/&/g, "&amp;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };
    var svgsonSync = function svgsonSync2(input) {
      var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$transformNode = _ref.transformNode, transformNode = _ref$transformNode === void 0 ? function(node) {
        return node;
      } : _ref$transformNode, _ref$camelcase = _ref.camelcase, camelcase = _ref$camelcase === void 0 ? false : _ref$camelcase;
      var applyFilters = function applyFilters2(input2) {
        var n;
        n = transformNode(input2);
        if (camelcase) {
          n = camelize(n);
        }
        return n;
      };
      return applyFilters(parseInput(input));
    };
    function svgson() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return new Promise(function(resolve, reject) {
        try {
          var res = svgsonSync.apply(void 0, args);
          resolve(res);
        } catch (e) {
          reject(e);
        }
      });
    }
    var stringify2 = function stringify3(_ast) {
      var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$transformAttr = _ref.transformAttr, transformAttr = _ref$transformAttr === void 0 ? function(key, value, escape) {
        return "".concat(key, '="').concat(escape(value), '"');
      } : _ref$transformAttr, _ref$transformNode = _ref.transformNode, transformNode = _ref$transformNode === void 0 ? function(node) {
        return node;
      } : _ref$transformNode, _ref$selfClose = _ref.selfClose, selfClose = _ref$selfClose === void 0 ? true : _ref$selfClose;
      if (Array.isArray(_ast)) {
        return _ast.map(function(ast2) {
          return stringify3(ast2, {
            transformAttr,
            selfClose,
            transformNode
          });
        }).join("");
      }
      var ast = transformNode(_ast);
      if (ast.type === "text") {
        return escapeText(ast.value);
      }
      var attributes = "";
      for (var attr in ast.attributes) {
        var attrStr = transformAttr(attr, ast.attributes[attr], escapeAttr, ast.name);
        attributes += attrStr ? " ".concat(attrStr) : "";
      }
      return ast.children && ast.children.length > 0 || !selfClose ? "<".concat(ast.name).concat(attributes, ">").concat(stringify3(ast.children, {
        transformAttr,
        transformNode,
        selfClose
      }), "</").concat(ast.name, ">") : "<".concat(ast.name).concat(attributes, "/>");
    };
    exports2.default = svgson;
    exports2.parse = svgson;
    exports2.parseSync = svgsonSync;
    exports2.stringify = stringify2;
  }
});

// node_modules/chroma-js/chroma.js
var require_chroma = __commonJS({
  "node_modules/chroma-js/chroma.js"(exports2, module2) {
    (function(global, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.chroma = factory());
    })(exports2, function() {
      "use strict";
      var limit$2 = function(x, min2, max2) {
        if (min2 === void 0) min2 = 0;
        if (max2 === void 0) max2 = 1;
        return x < min2 ? min2 : x > max2 ? max2 : x;
      };
      var limit$1 = limit$2;
      var clip_rgb$3 = function(rgb2) {
        rgb2._clipped = false;
        rgb2._unclipped = rgb2.slice(0);
        for (var i2 = 0; i2 <= 3; i2++) {
          if (i2 < 3) {
            if (rgb2[i2] < 0 || rgb2[i2] > 255) {
              rgb2._clipped = true;
            }
            rgb2[i2] = limit$1(rgb2[i2], 0, 255);
          } else if (i2 === 3) {
            rgb2[i2] = limit$1(rgb2[i2], 0, 1);
          }
        }
        return rgb2;
      };
      var classToType = {};
      for (var i$1 = 0, list$1 = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Undefined", "Null"]; i$1 < list$1.length; i$1 += 1) {
        var name = list$1[i$1];
        classToType["[object " + name + "]"] = name.toLowerCase();
      }
      var type$p = function(obj) {
        return classToType[Object.prototype.toString.call(obj)] || "object";
      };
      var type$o = type$p;
      var unpack$B = function(args, keyOrder) {
        if (keyOrder === void 0) keyOrder = null;
        if (args.length >= 3) {
          return Array.prototype.slice.call(args);
        }
        if (type$o(args[0]) == "object" && keyOrder) {
          return keyOrder.split("").filter(function(k) {
            return args[0][k] !== void 0;
          }).map(function(k) {
            return args[0][k];
          });
        }
        return args[0];
      };
      var type$n = type$p;
      var last$4 = function(args) {
        if (args.length < 2) {
          return null;
        }
        var l = args.length - 1;
        if (type$n(args[l]) == "string") {
          return args[l].toLowerCase();
        }
        return null;
      };
      var PI$2 = Math.PI;
      var utils = {
        clip_rgb: clip_rgb$3,
        limit: limit$2,
        type: type$p,
        unpack: unpack$B,
        last: last$4,
        PI: PI$2,
        TWOPI: PI$2 * 2,
        PITHIRD: PI$2 / 3,
        DEG2RAD: PI$2 / 180,
        RAD2DEG: 180 / PI$2
      };
      var input$h = {
        format: {},
        autodetect: []
      };
      var last$3 = utils.last;
      var clip_rgb$2 = utils.clip_rgb;
      var type$m = utils.type;
      var _input = input$h;
      var Color$D = function Color2() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var me = this;
        if (type$m(args[0]) === "object" && args[0].constructor && args[0].constructor === this.constructor) {
          return args[0];
        }
        var mode = last$3(args);
        var autodetect = false;
        if (!mode) {
          autodetect = true;
          if (!_input.sorted) {
            _input.autodetect = _input.autodetect.sort(function(a, b) {
              return b.p - a.p;
            });
            _input.sorted = true;
          }
          for (var i2 = 0, list2 = _input.autodetect; i2 < list2.length; i2 += 1) {
            var chk = list2[i2];
            mode = chk.test.apply(chk, args);
            if (mode) {
              break;
            }
          }
        }
        if (_input.format[mode]) {
          var rgb2 = _input.format[mode].apply(null, autodetect ? args : args.slice(0, -1));
          me._rgb = clip_rgb$2(rgb2);
        } else {
          throw new Error("unknown format: " + args);
        }
        if (me._rgb.length === 3) {
          me._rgb.push(1);
        }
      };
      Color$D.prototype.toString = function toString() {
        if (type$m(this.hex) == "function") {
          return this.hex();
        }
        return "[" + this._rgb.join(",") + "]";
      };
      var Color_1 = Color$D;
      var chroma$k = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(chroma$k.Color, [null].concat(args)))();
      };
      chroma$k.Color = Color_1;
      chroma$k.version = "2.4.2";
      var chroma_1 = chroma$k;
      var unpack$A = utils.unpack;
      var max$2 = Math.max;
      var rgb2cmyk$1 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var ref = unpack$A(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r = r / 255;
        g = g / 255;
        b = b / 255;
        var k = 1 - max$2(r, max$2(g, b));
        var f = k < 1 ? 1 / (1 - k) : 0;
        var c = (1 - r - k) * f;
        var m = (1 - g - k) * f;
        var y = (1 - b - k) * f;
        return [c, m, y, k];
      };
      var rgb2cmyk_1 = rgb2cmyk$1;
      var unpack$z = utils.unpack;
      var cmyk2rgb = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        args = unpack$z(args, "cmyk");
        var c = args[0];
        var m = args[1];
        var y = args[2];
        var k = args[3];
        var alpha = args.length > 4 ? args[4] : 1;
        if (k === 1) {
          return [0, 0, 0, alpha];
        }
        return [
          c >= 1 ? 0 : 255 * (1 - c) * (1 - k),
          // r
          m >= 1 ? 0 : 255 * (1 - m) * (1 - k),
          // g
          y >= 1 ? 0 : 255 * (1 - y) * (1 - k),
          // b
          alpha
        ];
      };
      var cmyk2rgb_1 = cmyk2rgb;
      var chroma$j = chroma_1;
      var Color$C = Color_1;
      var input$g = input$h;
      var unpack$y = utils.unpack;
      var type$l = utils.type;
      var rgb2cmyk = rgb2cmyk_1;
      Color$C.prototype.cmyk = function() {
        return rgb2cmyk(this._rgb);
      };
      chroma$j.cmyk = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$C, [null].concat(args, ["cmyk"])))();
      };
      input$g.format.cmyk = cmyk2rgb_1;
      input$g.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--) args[len] = arguments[len];
          args = unpack$y(args, "cmyk");
          if (type$l(args) === "array" && args.length === 4) {
            return "cmyk";
          }
        }
      });
      var unpack$x = utils.unpack;
      var last$2 = utils.last;
      var rnd = function(a) {
        return Math.round(a * 100) / 100;
      };
      var hsl2css$1 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var hsla = unpack$x(args, "hsla");
        var mode = last$2(args) || "lsa";
        hsla[0] = rnd(hsla[0] || 0);
        hsla[1] = rnd(hsla[1] * 100) + "%";
        hsla[2] = rnd(hsla[2] * 100) + "%";
        if (mode === "hsla" || hsla.length > 3 && hsla[3] < 1) {
          hsla[3] = hsla.length > 3 ? hsla[3] : 1;
          mode = "hsla";
        } else {
          hsla.length = 3;
        }
        return mode + "(" + hsla.join(",") + ")";
      };
      var hsl2css_1 = hsl2css$1;
      var unpack$w = utils.unpack;
      var rgb2hsl$3 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        args = unpack$w(args, "rgba");
        var r = args[0];
        var g = args[1];
        var b = args[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var min2 = Math.min(r, g, b);
        var max2 = Math.max(r, g, b);
        var l = (max2 + min2) / 2;
        var s, h;
        if (max2 === min2) {
          s = 0;
          h = Number.NaN;
        } else {
          s = l < 0.5 ? (max2 - min2) / (max2 + min2) : (max2 - min2) / (2 - max2 - min2);
        }
        if (r == max2) {
          h = (g - b) / (max2 - min2);
        } else if (g == max2) {
          h = 2 + (b - r) / (max2 - min2);
        } else if (b == max2) {
          h = 4 + (r - g) / (max2 - min2);
        }
        h *= 60;
        if (h < 0) {
          h += 360;
        }
        if (args.length > 3 && args[3] !== void 0) {
          return [h, s, l, args[3]];
        }
        return [h, s, l];
      };
      var rgb2hsl_1 = rgb2hsl$3;
      var unpack$v = utils.unpack;
      var last$1 = utils.last;
      var hsl2css = hsl2css_1;
      var rgb2hsl$2 = rgb2hsl_1;
      var round$6 = Math.round;
      var rgb2css$1 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var rgba = unpack$v(args, "rgba");
        var mode = last$1(args) || "rgb";
        if (mode.substr(0, 3) == "hsl") {
          return hsl2css(rgb2hsl$2(rgba), mode);
        }
        rgba[0] = round$6(rgba[0]);
        rgba[1] = round$6(rgba[1]);
        rgba[2] = round$6(rgba[2]);
        if (mode === "rgba" || rgba.length > 3 && rgba[3] < 1) {
          rgba[3] = rgba.length > 3 ? rgba[3] : 1;
          mode = "rgba";
        }
        return mode + "(" + rgba.slice(0, mode === "rgb" ? 3 : 4).join(",") + ")";
      };
      var rgb2css_1 = rgb2css$1;
      var unpack$u = utils.unpack;
      var round$5 = Math.round;
      var hsl2rgb$1 = function() {
        var assign;
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        args = unpack$u(args, "hsl");
        var h = args[0];
        var s = args[1];
        var l = args[2];
        var r, g, b;
        if (s === 0) {
          r = g = b = l * 255;
        } else {
          var t3 = [0, 0, 0];
          var c = [0, 0, 0];
          var t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var t1 = 2 * l - t2;
          var h_ = h / 360;
          t3[0] = h_ + 1 / 3;
          t3[1] = h_;
          t3[2] = h_ - 1 / 3;
          for (var i2 = 0; i2 < 3; i2++) {
            if (t3[i2] < 0) {
              t3[i2] += 1;
            }
            if (t3[i2] > 1) {
              t3[i2] -= 1;
            }
            if (6 * t3[i2] < 1) {
              c[i2] = t1 + (t2 - t1) * 6 * t3[i2];
            } else if (2 * t3[i2] < 1) {
              c[i2] = t2;
            } else if (3 * t3[i2] < 2) {
              c[i2] = t1 + (t2 - t1) * (2 / 3 - t3[i2]) * 6;
            } else {
              c[i2] = t1;
            }
          }
          assign = [round$5(c[0] * 255), round$5(c[1] * 255), round$5(c[2] * 255)], r = assign[0], g = assign[1], b = assign[2];
        }
        if (args.length > 3) {
          return [r, g, b, args[3]];
        }
        return [r, g, b, 1];
      };
      var hsl2rgb_1 = hsl2rgb$1;
      var hsl2rgb = hsl2rgb_1;
      var input$f = input$h;
      var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
      var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
      var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
      var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
      var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
      var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
      var round$4 = Math.round;
      var css2rgb$1 = function(css) {
        css = css.toLowerCase().trim();
        var m;
        if (input$f.format.named) {
          try {
            return input$f.format.named(css);
          } catch (e) {
          }
        }
        if (m = css.match(RE_RGB)) {
          var rgb2 = m.slice(1, 4);
          for (var i2 = 0; i2 < 3; i2++) {
            rgb2[i2] = +rgb2[i2];
          }
          rgb2[3] = 1;
          return rgb2;
        }
        if (m = css.match(RE_RGBA)) {
          var rgb$1 = m.slice(1, 5);
          for (var i$12 = 0; i$12 < 4; i$12++) {
            rgb$1[i$12] = +rgb$1[i$12];
          }
          return rgb$1;
        }
        if (m = css.match(RE_RGB_PCT)) {
          var rgb$2 = m.slice(1, 4);
          for (var i$2 = 0; i$2 < 3; i$2++) {
            rgb$2[i$2] = round$4(rgb$2[i$2] * 2.55);
          }
          rgb$2[3] = 1;
          return rgb$2;
        }
        if (m = css.match(RE_RGBA_PCT)) {
          var rgb$3 = m.slice(1, 5);
          for (var i$3 = 0; i$3 < 3; i$3++) {
            rgb$3[i$3] = round$4(rgb$3[i$3] * 2.55);
          }
          rgb$3[3] = +rgb$3[3];
          return rgb$3;
        }
        if (m = css.match(RE_HSL)) {
          var hsl2 = m.slice(1, 4);
          hsl2[1] *= 0.01;
          hsl2[2] *= 0.01;
          var rgb$4 = hsl2rgb(hsl2);
          rgb$4[3] = 1;
          return rgb$4;
        }
        if (m = css.match(RE_HSLA)) {
          var hsl$1 = m.slice(1, 4);
          hsl$1[1] *= 0.01;
          hsl$1[2] *= 0.01;
          var rgb$5 = hsl2rgb(hsl$1);
          rgb$5[3] = +m[4];
          return rgb$5;
        }
      };
      css2rgb$1.test = function(s) {
        return RE_RGB.test(s) || RE_RGBA.test(s) || RE_RGB_PCT.test(s) || RE_RGBA_PCT.test(s) || RE_HSL.test(s) || RE_HSLA.test(s);
      };
      var css2rgb_1 = css2rgb$1;
      var chroma$i = chroma_1;
      var Color$B = Color_1;
      var input$e = input$h;
      var type$k = utils.type;
      var rgb2css = rgb2css_1;
      var css2rgb = css2rgb_1;
      Color$B.prototype.css = function(mode) {
        return rgb2css(this._rgb, mode);
      };
      chroma$i.css = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$B, [null].concat(args, ["css"])))();
      };
      input$e.format.css = css2rgb;
      input$e.autodetect.push({
        p: 5,
        test: function(h) {
          var rest = [], len = arguments.length - 1;
          while (len-- > 0) rest[len] = arguments[len + 1];
          if (!rest.length && type$k(h) === "string" && css2rgb.test(h)) {
            return "css";
          }
        }
      });
      var Color$A = Color_1;
      var chroma$h = chroma_1;
      var input$d = input$h;
      var unpack$t = utils.unpack;
      input$d.format.gl = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var rgb2 = unpack$t(args, "rgba");
        rgb2[0] *= 255;
        rgb2[1] *= 255;
        rgb2[2] *= 255;
        return rgb2;
      };
      chroma$h.gl = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$A, [null].concat(args, ["gl"])))();
      };
      Color$A.prototype.gl = function() {
        var rgb2 = this._rgb;
        return [rgb2[0] / 255, rgb2[1] / 255, rgb2[2] / 255, rgb2[3]];
      };
      var unpack$s = utils.unpack;
      var rgb2hcg$1 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var ref = unpack$s(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var min2 = Math.min(r, g, b);
        var max2 = Math.max(r, g, b);
        var delta = max2 - min2;
        var c = delta * 100 / 255;
        var _g = min2 / (255 - delta) * 100;
        var h;
        if (delta === 0) {
          h = Number.NaN;
        } else {
          if (r === max2) {
            h = (g - b) / delta;
          }
          if (g === max2) {
            h = 2 + (b - r) / delta;
          }
          if (b === max2) {
            h = 4 + (r - g) / delta;
          }
          h *= 60;
          if (h < 0) {
            h += 360;
          }
        }
        return [h, c, _g];
      };
      var rgb2hcg_1 = rgb2hcg$1;
      var unpack$r = utils.unpack;
      var floor$3 = Math.floor;
      var hcg2rgb = function() {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        args = unpack$r(args, "hcg");
        var h = args[0];
        var c = args[1];
        var _g = args[2];
        var r, g, b;
        _g = _g * 255;
        var _c = c * 255;
        if (c === 0) {
          r = g = b = _g;
        } else {
          if (h === 360) {
            h = 0;
          }
          if (h > 360) {
            h -= 360;
          }
          if (h < 0) {
            h += 360;
          }
          h /= 60;
          var i2 = floor$3(h);
          var f = h - i2;
          var p = _g * (1 - c);
          var q = p + _c * (1 - f);
          var t = p + _c * f;
          var v = p + _c;
          switch (i2) {
            case 0:
              assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2];
              break;
            case 1:
              assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2];
              break;
            case 2:
              assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2];
              break;
            case 3:
              assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2];
              break;
            case 4:
              assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2];
              break;
            case 5:
              assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2];
              break;
          }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
      };
      var hcg2rgb_1 = hcg2rgb;
      var unpack$q = utils.unpack;
      var type$j = utils.type;
      var chroma$g = chroma_1;
      var Color$z = Color_1;
      var input$c = input$h;
      var rgb2hcg = rgb2hcg_1;
      Color$z.prototype.hcg = function() {
        return rgb2hcg(this._rgb);
      };
      chroma$g.hcg = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$z, [null].concat(args, ["hcg"])))();
      };
      input$c.format.hcg = hcg2rgb_1;
      input$c.autodetect.push({
        p: 1,
        test: function() {
          var args = [], len = arguments.length;
          while (len--) args[len] = arguments[len];
          args = unpack$q(args, "hcg");
          if (type$j(args) === "array" && args.length === 3) {
            return "hcg";
          }
        }
      });
      var unpack$p = utils.unpack;
      var last = utils.last;
      var round$3 = Math.round;
      var rgb2hex$2 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var ref = unpack$p(args, "rgba");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var a = ref[3];
        var mode = last(args) || "auto";
        if (a === void 0) {
          a = 1;
        }
        if (mode === "auto") {
          mode = a < 1 ? "rgba" : "rgb";
        }
        r = round$3(r);
        g = round$3(g);
        b = round$3(b);
        var u = r << 16 | g << 8 | b;
        var str = "000000" + u.toString(16);
        str = str.substr(str.length - 6);
        var hxa = "0" + round$3(a * 255).toString(16);
        hxa = hxa.substr(hxa.length - 2);
        switch (mode.toLowerCase()) {
          case "rgba":
            return "#" + str + hxa;
          case "argb":
            return "#" + hxa + str;
          default:
            return "#" + str;
        }
      };
      var rgb2hex_1 = rgb2hex$2;
      var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;
      var hex2rgb$1 = function(hex) {
        if (hex.match(RE_HEX)) {
          if (hex.length === 4 || hex.length === 7) {
            hex = hex.substr(1);
          }
          if (hex.length === 3) {
            hex = hex.split("");
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
          }
          var u = parseInt(hex, 16);
          var r = u >> 16;
          var g = u >> 8 & 255;
          var b = u & 255;
          return [r, g, b, 1];
        }
        if (hex.match(RE_HEXA)) {
          if (hex.length === 5 || hex.length === 9) {
            hex = hex.substr(1);
          }
          if (hex.length === 4) {
            hex = hex.split("");
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
          }
          var u$1 = parseInt(hex, 16);
          var r$1 = u$1 >> 24 & 255;
          var g$1 = u$1 >> 16 & 255;
          var b$1 = u$1 >> 8 & 255;
          var a = Math.round((u$1 & 255) / 255 * 100) / 100;
          return [r$1, g$1, b$1, a];
        }
        throw new Error("unknown hex color: " + hex);
      };
      var hex2rgb_1 = hex2rgb$1;
      var chroma$f = chroma_1;
      var Color$y = Color_1;
      var type$i = utils.type;
      var input$b = input$h;
      var rgb2hex$1 = rgb2hex_1;
      Color$y.prototype.hex = function(mode) {
        return rgb2hex$1(this._rgb, mode);
      };
      chroma$f.hex = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$y, [null].concat(args, ["hex"])))();
      };
      input$b.format.hex = hex2rgb_1;
      input$b.autodetect.push({
        p: 4,
        test: function(h) {
          var rest = [], len = arguments.length - 1;
          while (len-- > 0) rest[len] = arguments[len + 1];
          if (!rest.length && type$i(h) === "string" && [3, 4, 5, 6, 7, 8, 9].indexOf(h.length) >= 0) {
            return "hex";
          }
        }
      });
      var unpack$o = utils.unpack;
      var TWOPI$2 = utils.TWOPI;
      var min$2 = Math.min;
      var sqrt$4 = Math.sqrt;
      var acos = Math.acos;
      var rgb2hsi$1 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var ref = unpack$o(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var h;
        var min_ = min$2(r, g, b);
        var i2 = (r + g + b) / 3;
        var s = i2 > 0 ? 1 - min_ / i2 : 0;
        if (s === 0) {
          h = NaN;
        } else {
          h = (r - g + (r - b)) / 2;
          h /= sqrt$4((r - g) * (r - g) + (r - b) * (g - b));
          h = acos(h);
          if (b > g) {
            h = TWOPI$2 - h;
          }
          h /= TWOPI$2;
        }
        return [h * 360, s, i2];
      };
      var rgb2hsi_1 = rgb2hsi$1;
      var unpack$n = utils.unpack;
      var limit = utils.limit;
      var TWOPI$1 = utils.TWOPI;
      var PITHIRD = utils.PITHIRD;
      var cos$4 = Math.cos;
      var hsi2rgb = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        args = unpack$n(args, "hsi");
        var h = args[0];
        var s = args[1];
        var i2 = args[2];
        var r, g, b;
        if (isNaN(h)) {
          h = 0;
        }
        if (isNaN(s)) {
          s = 0;
        }
        if (h > 360) {
          h -= 360;
        }
        if (h < 0) {
          h += 360;
        }
        h /= 360;
        if (h < 1 / 3) {
          b = (1 - s) / 3;
          r = (1 + s * cos$4(TWOPI$1 * h) / cos$4(PITHIRD - TWOPI$1 * h)) / 3;
          g = 1 - (b + r);
        } else if (h < 2 / 3) {
          h -= 1 / 3;
          r = (1 - s) / 3;
          g = (1 + s * cos$4(TWOPI$1 * h) / cos$4(PITHIRD - TWOPI$1 * h)) / 3;
          b = 1 - (r + g);
        } else {
          h -= 2 / 3;
          g = (1 - s) / 3;
          b = (1 + s * cos$4(TWOPI$1 * h) / cos$4(PITHIRD - TWOPI$1 * h)) / 3;
          r = 1 - (g + b);
        }
        r = limit(i2 * r * 3);
        g = limit(i2 * g * 3);
        b = limit(i2 * b * 3);
        return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
      };
      var hsi2rgb_1 = hsi2rgb;
      var unpack$m = utils.unpack;
      var type$h = utils.type;
      var chroma$e = chroma_1;
      var Color$x = Color_1;
      var input$a = input$h;
      var rgb2hsi = rgb2hsi_1;
      Color$x.prototype.hsi = function() {
        return rgb2hsi(this._rgb);
      };
      chroma$e.hsi = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$x, [null].concat(args, ["hsi"])))();
      };
      input$a.format.hsi = hsi2rgb_1;
      input$a.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--) args[len] = arguments[len];
          args = unpack$m(args, "hsi");
          if (type$h(args) === "array" && args.length === 3) {
            return "hsi";
          }
        }
      });
      var unpack$l = utils.unpack;
      var type$g = utils.type;
      var chroma$d = chroma_1;
      var Color$w = Color_1;
      var input$9 = input$h;
      var rgb2hsl$1 = rgb2hsl_1;
      Color$w.prototype.hsl = function() {
        return rgb2hsl$1(this._rgb);
      };
      chroma$d.hsl = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$w, [null].concat(args, ["hsl"])))();
      };
      input$9.format.hsl = hsl2rgb_1;
      input$9.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--) args[len] = arguments[len];
          args = unpack$l(args, "hsl");
          if (type$g(args) === "array" && args.length === 3) {
            return "hsl";
          }
        }
      });
      var unpack$k = utils.unpack;
      var min$1 = Math.min;
      var max$1 = Math.max;
      var rgb2hsl = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        args = unpack$k(args, "rgb");
        var r = args[0];
        var g = args[1];
        var b = args[2];
        var min_ = min$1(r, g, b);
        var max_ = max$1(r, g, b);
        var delta = max_ - min_;
        var h, s, v;
        v = max_ / 255;
        if (max_ === 0) {
          h = Number.NaN;
          s = 0;
        } else {
          s = delta / max_;
          if (r === max_) {
            h = (g - b) / delta;
          }
          if (g === max_) {
            h = 2 + (b - r) / delta;
          }
          if (b === max_) {
            h = 4 + (r - g) / delta;
          }
          h *= 60;
          if (h < 0) {
            h += 360;
          }
        }
        return [h, s, v];
      };
      var rgb2hsv$1 = rgb2hsl;
      var unpack$j = utils.unpack;
      var floor$2 = Math.floor;
      var hsv2rgb = function() {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        args = unpack$j(args, "hsv");
        var h = args[0];
        var s = args[1];
        var v = args[2];
        var r, g, b;
        v *= 255;
        if (s === 0) {
          r = g = b = v;
        } else {
          if (h === 360) {
            h = 0;
          }
          if (h > 360) {
            h -= 360;
          }
          if (h < 0) {
            h += 360;
          }
          h /= 60;
          var i2 = floor$2(h);
          var f = h - i2;
          var p = v * (1 - s);
          var q = v * (1 - s * f);
          var t = v * (1 - s * (1 - f));
          switch (i2) {
            case 0:
              assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2];
              break;
            case 1:
              assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2];
              break;
            case 2:
              assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2];
              break;
            case 3:
              assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2];
              break;
            case 4:
              assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2];
              break;
            case 5:
              assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2];
              break;
          }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
      };
      var hsv2rgb_1 = hsv2rgb;
      var unpack$i = utils.unpack;
      var type$f = utils.type;
      var chroma$c = chroma_1;
      var Color$v = Color_1;
      var input$8 = input$h;
      var rgb2hsv = rgb2hsv$1;
      Color$v.prototype.hsv = function() {
        return rgb2hsv(this._rgb);
      };
      chroma$c.hsv = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$v, [null].concat(args, ["hsv"])))();
      };
      input$8.format.hsv = hsv2rgb_1;
      input$8.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--) args[len] = arguments[len];
          args = unpack$i(args, "hsv");
          if (type$f(args) === "array" && args.length === 3) {
            return "hsv";
          }
        }
      });
      var labConstants = {
        // Corresponds roughly to RGB brighter/darker
        Kn: 18,
        // D65 standard referent
        Xn: 0.95047,
        Yn: 1,
        Zn: 1.08883,
        t0: 0.137931034,
        // 4 / 29
        t1: 0.206896552,
        // 6 / 29
        t2: 0.12841855,
        // 3 * t1 * t1
        t3: 8856452e-9
        // t1 * t1 * t1
      };
      var LAB_CONSTANTS$3 = labConstants;
      var unpack$h = utils.unpack;
      var pow$a = Math.pow;
      var rgb2lab$2 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var ref = unpack$h(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2xyz(r, g, b);
        var x = ref$1[0];
        var y = ref$1[1];
        var z = ref$1[2];
        var l = 116 * y - 16;
        return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
      };
      var rgb_xyz = function(r) {
        if ((r /= 255) <= 0.04045) {
          return r / 12.92;
        }
        return pow$a((r + 0.055) / 1.055, 2.4);
      };
      var xyz_lab = function(t) {
        if (t > LAB_CONSTANTS$3.t3) {
          return pow$a(t, 1 / 3);
        }
        return t / LAB_CONSTANTS$3.t2 + LAB_CONSTANTS$3.t0;
      };
      var rgb2xyz = function(r, g, b) {
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS$3.Xn);
        var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.072175 * b) / LAB_CONSTANTS$3.Yn);
        var z = xyz_lab((0.0193339 * r + 0.119192 * g + 0.9503041 * b) / LAB_CONSTANTS$3.Zn);
        return [x, y, z];
      };
      var rgb2lab_1 = rgb2lab$2;
      var LAB_CONSTANTS$2 = labConstants;
      var unpack$g = utils.unpack;
      var pow$9 = Math.pow;
      var lab2rgb$1 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        args = unpack$g(args, "lab");
        var l = args[0];
        var a = args[1];
        var b = args[2];
        var x, y, z, r, g, b_;
        y = (l + 16) / 116;
        x = isNaN(a) ? y : y + a / 500;
        z = isNaN(b) ? y : y - b / 200;
        y = LAB_CONSTANTS$2.Yn * lab_xyz(y);
        x = LAB_CONSTANTS$2.Xn * lab_xyz(x);
        z = LAB_CONSTANTS$2.Zn * lab_xyz(z);
        r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
        g = xyz_rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z);
        b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
        return [r, g, b_, args.length > 3 ? args[3] : 1];
      };
      var xyz_rgb = function(r) {
        return 255 * (r <= 304e-5 ? 12.92 * r : 1.055 * pow$9(r, 1 / 2.4) - 0.055);
      };
      var lab_xyz = function(t) {
        return t > LAB_CONSTANTS$2.t1 ? t * t * t : LAB_CONSTANTS$2.t2 * (t - LAB_CONSTANTS$2.t0);
      };
      var lab2rgb_1 = lab2rgb$1;
      var unpack$f = utils.unpack;
      var type$e = utils.type;
      var chroma$b = chroma_1;
      var Color$u = Color_1;
      var input$7 = input$h;
      var rgb2lab$1 = rgb2lab_1;
      Color$u.prototype.lab = function() {
        return rgb2lab$1(this._rgb);
      };
      chroma$b.lab = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$u, [null].concat(args, ["lab"])))();
      };
      input$7.format.lab = lab2rgb_1;
      input$7.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--) args[len] = arguments[len];
          args = unpack$f(args, "lab");
          if (type$e(args) === "array" && args.length === 3) {
            return "lab";
          }
        }
      });
      var unpack$e = utils.unpack;
      var RAD2DEG = utils.RAD2DEG;
      var sqrt$3 = Math.sqrt;
      var atan2$2 = Math.atan2;
      var round$2 = Math.round;
      var lab2lch$2 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var ref = unpack$e(args, "lab");
        var l = ref[0];
        var a = ref[1];
        var b = ref[2];
        var c = sqrt$3(a * a + b * b);
        var h = (atan2$2(b, a) * RAD2DEG + 360) % 360;
        if (round$2(c * 1e4) === 0) {
          h = Number.NaN;
        }
        return [l, c, h];
      };
      var lab2lch_1 = lab2lch$2;
      var unpack$d = utils.unpack;
      var rgb2lab = rgb2lab_1;
      var lab2lch$1 = lab2lch_1;
      var rgb2lch$1 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var ref = unpack$d(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2lab(r, g, b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch$1(l, a, b_);
      };
      var rgb2lch_1 = rgb2lch$1;
      var unpack$c = utils.unpack;
      var DEG2RAD = utils.DEG2RAD;
      var sin$3 = Math.sin;
      var cos$3 = Math.cos;
      var lch2lab$2 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var ref = unpack$c(args, "lch");
        var l = ref[0];
        var c = ref[1];
        var h = ref[2];
        if (isNaN(h)) {
          h = 0;
        }
        h = h * DEG2RAD;
        return [l, cos$3(h) * c, sin$3(h) * c];
      };
      var lch2lab_1 = lch2lab$2;
      var unpack$b = utils.unpack;
      var lch2lab$1 = lch2lab_1;
      var lab2rgb = lab2rgb_1;
      var lch2rgb$1 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        args = unpack$b(args, "lch");
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab$1(l, c, h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = lab2rgb(L, a, b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
      };
      var lch2rgb_1 = lch2rgb$1;
      var unpack$a = utils.unpack;
      var lch2rgb = lch2rgb_1;
      var hcl2rgb = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var hcl = unpack$a(args, "hcl").reverse();
        return lch2rgb.apply(void 0, hcl);
      };
      var hcl2rgb_1 = hcl2rgb;
      var unpack$9 = utils.unpack;
      var type$d = utils.type;
      var chroma$a = chroma_1;
      var Color$t = Color_1;
      var input$6 = input$h;
      var rgb2lch = rgb2lch_1;
      Color$t.prototype.lch = function() {
        return rgb2lch(this._rgb);
      };
      Color$t.prototype.hcl = function() {
        return rgb2lch(this._rgb).reverse();
      };
      chroma$a.lch = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$t, [null].concat(args, ["lch"])))();
      };
      chroma$a.hcl = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$t, [null].concat(args, ["hcl"])))();
      };
      input$6.format.lch = lch2rgb_1;
      input$6.format.hcl = hcl2rgb_1;
      ["lch", "hcl"].forEach(function(m) {
        return input$6.autodetect.push({
          p: 2,
          test: function() {
            var args = [], len = arguments.length;
            while (len--) args[len] = arguments[len];
            args = unpack$9(args, m);
            if (type$d(args) === "array" && args.length === 3) {
              return m;
            }
          }
        });
      });
      var w3cx11$1 = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflower: "#6495ed",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        laserlemon: "#ffff54",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrod: "#fafad2",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        maroon2: "#7f0000",
        maroon3: "#b03060",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        purple2: "#7f007f",
        purple3: "#a020f0",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
      };
      var w3cx11_1 = w3cx11$1;
      var Color$s = Color_1;
      var input$5 = input$h;
      var type$c = utils.type;
      var w3cx11 = w3cx11_1;
      var hex2rgb = hex2rgb_1;
      var rgb2hex = rgb2hex_1;
      Color$s.prototype.name = function() {
        var hex = rgb2hex(this._rgb, "rgb");
        for (var i2 = 0, list2 = Object.keys(w3cx11); i2 < list2.length; i2 += 1) {
          var n = list2[i2];
          if (w3cx11[n] === hex) {
            return n.toLowerCase();
          }
        }
        return hex;
      };
      input$5.format.named = function(name2) {
        name2 = name2.toLowerCase();
        if (w3cx11[name2]) {
          return hex2rgb(w3cx11[name2]);
        }
        throw new Error("unknown color name: " + name2);
      };
      input$5.autodetect.push({
        p: 5,
        test: function(h) {
          var rest = [], len = arguments.length - 1;
          while (len-- > 0) rest[len] = arguments[len + 1];
          if (!rest.length && type$c(h) === "string" && w3cx11[h.toLowerCase()]) {
            return "named";
          }
        }
      });
      var unpack$8 = utils.unpack;
      var rgb2num$1 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var ref = unpack$8(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        return (r << 16) + (g << 8) + b;
      };
      var rgb2num_1 = rgb2num$1;
      var type$b = utils.type;
      var num2rgb = function(num2) {
        if (type$b(num2) == "number" && num2 >= 0 && num2 <= 16777215) {
          var r = num2 >> 16;
          var g = num2 >> 8 & 255;
          var b = num2 & 255;
          return [r, g, b, 1];
        }
        throw new Error("unknown num color: " + num2);
      };
      var num2rgb_1 = num2rgb;
      var chroma$9 = chroma_1;
      var Color$r = Color_1;
      var input$4 = input$h;
      var type$a = utils.type;
      var rgb2num = rgb2num_1;
      Color$r.prototype.num = function() {
        return rgb2num(this._rgb);
      };
      chroma$9.num = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$r, [null].concat(args, ["num"])))();
      };
      input$4.format.num = num2rgb_1;
      input$4.autodetect.push({
        p: 5,
        test: function() {
          var args = [], len = arguments.length;
          while (len--) args[len] = arguments[len];
          if (args.length === 1 && type$a(args[0]) === "number" && args[0] >= 0 && args[0] <= 16777215) {
            return "num";
          }
        }
      });
      var chroma$8 = chroma_1;
      var Color$q = Color_1;
      var input$3 = input$h;
      var unpack$7 = utils.unpack;
      var type$9 = utils.type;
      var round$1 = Math.round;
      Color$q.prototype.rgb = function(rnd2) {
        if (rnd2 === void 0) rnd2 = true;
        if (rnd2 === false) {
          return this._rgb.slice(0, 3);
        }
        return this._rgb.slice(0, 3).map(round$1);
      };
      Color$q.prototype.rgba = function(rnd2) {
        if (rnd2 === void 0) rnd2 = true;
        return this._rgb.slice(0, 4).map(function(v, i2) {
          return i2 < 3 ? rnd2 === false ? v : round$1(v) : v;
        });
      };
      chroma$8.rgb = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$q, [null].concat(args, ["rgb"])))();
      };
      input$3.format.rgb = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var rgba = unpack$7(args, "rgba");
        if (rgba[3] === void 0) {
          rgba[3] = 1;
        }
        return rgba;
      };
      input$3.autodetect.push({
        p: 3,
        test: function() {
          var args = [], len = arguments.length;
          while (len--) args[len] = arguments[len];
          args = unpack$7(args, "rgba");
          if (type$9(args) === "array" && (args.length === 3 || args.length === 4 && type$9(args[3]) == "number" && args[3] >= 0 && args[3] <= 1)) {
            return "rgb";
          }
        }
      });
      var log$1 = Math.log;
      var temperature2rgb$1 = function(kelvin) {
        var temp = kelvin / 100;
        var r, g, b;
        if (temp < 66) {
          r = 255;
          g = temp < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log$1(g);
          b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log$1(b);
        } else {
          r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log$1(r);
          g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log$1(g);
          b = 255;
        }
        return [r, g, b, 1];
      };
      var temperature2rgb_1 = temperature2rgb$1;
      var temperature2rgb = temperature2rgb_1;
      var unpack$6 = utils.unpack;
      var round = Math.round;
      var rgb2temperature$1 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var rgb2 = unpack$6(args, "rgb");
        var r = rgb2[0], b = rgb2[2];
        var minTemp = 1e3;
        var maxTemp = 4e4;
        var eps = 0.4;
        var temp;
        while (maxTemp - minTemp > eps) {
          temp = (maxTemp + minTemp) * 0.5;
          var rgb$1 = temperature2rgb(temp);
          if (rgb$1[2] / rgb$1[0] >= b / r) {
            maxTemp = temp;
          } else {
            minTemp = temp;
          }
        }
        return round(temp);
      };
      var rgb2temperature_1 = rgb2temperature$1;
      var chroma$7 = chroma_1;
      var Color$p = Color_1;
      var input$2 = input$h;
      var rgb2temperature = rgb2temperature_1;
      Color$p.prototype.temp = Color$p.prototype.kelvin = Color$p.prototype.temperature = function() {
        return rgb2temperature(this._rgb);
      };
      chroma$7.temp = chroma$7.kelvin = chroma$7.temperature = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$p, [null].concat(args, ["temp"])))();
      };
      input$2.format.temp = input$2.format.kelvin = input$2.format.temperature = temperature2rgb_1;
      var unpack$5 = utils.unpack;
      var cbrt = Math.cbrt;
      var pow$8 = Math.pow;
      var sign$1 = Math.sign;
      var rgb2oklab$2 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var ref = unpack$5(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = [rgb2lrgb(r / 255), rgb2lrgb(g / 255), rgb2lrgb(b / 255)];
        var lr = ref$1[0];
        var lg = ref$1[1];
        var lb = ref$1[2];
        var l = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
        var m = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
        var s = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
        return [
          0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
          1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
          0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
        ];
      };
      var rgb2oklab_1 = rgb2oklab$2;
      function rgb2lrgb(c) {
        var abs2 = Math.abs(c);
        if (abs2 < 0.04045) {
          return c / 12.92;
        }
        return (sign$1(c) || 1) * pow$8((abs2 + 0.055) / 1.055, 2.4);
      }
      var unpack$4 = utils.unpack;
      var pow$7 = Math.pow;
      var sign = Math.sign;
      var oklab2rgb$1 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        args = unpack$4(args, "lab");
        var L = args[0];
        var a = args[1];
        var b = args[2];
        var l = pow$7(L + 0.3963377774 * a + 0.2158037573 * b, 3);
        var m = pow$7(L - 0.1055613458 * a - 0.0638541728 * b, 3);
        var s = pow$7(L - 0.0894841775 * a - 1.291485548 * b, 3);
        return [
          255 * lrgb2rgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
          255 * lrgb2rgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
          255 * lrgb2rgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
          args.length > 3 ? args[3] : 1
        ];
      };
      var oklab2rgb_1 = oklab2rgb$1;
      function lrgb2rgb(c) {
        var abs2 = Math.abs(c);
        if (abs2 > 31308e-7) {
          return (sign(c) || 1) * (1.055 * pow$7(abs2, 1 / 2.4) - 0.055);
        }
        return c * 12.92;
      }
      var unpack$3 = utils.unpack;
      var type$8 = utils.type;
      var chroma$6 = chroma_1;
      var Color$o = Color_1;
      var input$1 = input$h;
      var rgb2oklab$1 = rgb2oklab_1;
      Color$o.prototype.oklab = function() {
        return rgb2oklab$1(this._rgb);
      };
      chroma$6.oklab = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$o, [null].concat(args, ["oklab"])))();
      };
      input$1.format.oklab = oklab2rgb_1;
      input$1.autodetect.push({
        p: 3,
        test: function() {
          var args = [], len = arguments.length;
          while (len--) args[len] = arguments[len];
          args = unpack$3(args, "oklab");
          if (type$8(args) === "array" && args.length === 3) {
            return "oklab";
          }
        }
      });
      var unpack$2 = utils.unpack;
      var rgb2oklab = rgb2oklab_1;
      var lab2lch = lab2lch_1;
      var rgb2oklch$1 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var ref = unpack$2(args, "rgb");
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2oklab(r, g, b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch(l, a, b_);
      };
      var rgb2oklch_1 = rgb2oklch$1;
      var unpack$1 = utils.unpack;
      var lch2lab = lch2lab_1;
      var oklab2rgb = oklab2rgb_1;
      var oklch2rgb = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        args = unpack$1(args, "lch");
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab(l, c, h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = oklab2rgb(L, a, b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
      };
      var oklch2rgb_1 = oklch2rgb;
      var unpack = utils.unpack;
      var type$7 = utils.type;
      var chroma$5 = chroma_1;
      var Color$n = Color_1;
      var input = input$h;
      var rgb2oklch = rgb2oklch_1;
      Color$n.prototype.oklch = function() {
        return rgb2oklch(this._rgb);
      };
      chroma$5.oklch = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        return new (Function.prototype.bind.apply(Color$n, [null].concat(args, ["oklch"])))();
      };
      input.format.oklch = oklch2rgb_1;
      input.autodetect.push({
        p: 3,
        test: function() {
          var args = [], len = arguments.length;
          while (len--) args[len] = arguments[len];
          args = unpack(args, "oklch");
          if (type$7(args) === "array" && args.length === 3) {
            return "oklch";
          }
        }
      });
      var Color$m = Color_1;
      var type$6 = utils.type;
      Color$m.prototype.alpha = function(a, mutate) {
        if (mutate === void 0) mutate = false;
        if (a !== void 0 && type$6(a) === "number") {
          if (mutate) {
            this._rgb[3] = a;
            return this;
          }
          return new Color$m([this._rgb[0], this._rgb[1], this._rgb[2], a], "rgb");
        }
        return this._rgb[3];
      };
      var Color$l = Color_1;
      Color$l.prototype.clipped = function() {
        return this._rgb._clipped || false;
      };
      var Color$k = Color_1;
      var LAB_CONSTANTS$1 = labConstants;
      Color$k.prototype.darken = function(amount) {
        if (amount === void 0) amount = 1;
        var me = this;
        var lab2 = me.lab();
        lab2[0] -= LAB_CONSTANTS$1.Kn * amount;
        return new Color$k(lab2, "lab").alpha(me.alpha(), true);
      };
      Color$k.prototype.brighten = function(amount) {
        if (amount === void 0) amount = 1;
        return this.darken(-amount);
      };
      Color$k.prototype.darker = Color$k.prototype.darken;
      Color$k.prototype.brighter = Color$k.prototype.brighten;
      var Color$j = Color_1;
      Color$j.prototype.get = function(mc) {
        var ref = mc.split(".");
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
          var i2 = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
          if (i2 > -1) {
            return src[i2];
          }
          throw new Error("unknown channel " + channel + " in mode " + mode);
        } else {
          return src;
        }
      };
      var Color$i = Color_1;
      var type$5 = utils.type;
      var pow$6 = Math.pow;
      var EPS = 1e-7;
      var MAX_ITER = 20;
      Color$i.prototype.luminance = function(lum) {
        if (lum !== void 0 && type$5(lum) === "number") {
          if (lum === 0) {
            return new Color$i([0, 0, 0, this._rgb[3]], "rgb");
          }
          if (lum === 1) {
            return new Color$i([255, 255, 255, this._rgb[3]], "rgb");
          }
          var cur_lum = this.luminance();
          var mode = "rgb";
          var max_iter = MAX_ITER;
          var test = function(low, high) {
            var mid = low.interpolate(high, 0.5, mode);
            var lm = mid.luminance();
            if (Math.abs(lum - lm) < EPS || !max_iter--) {
              return mid;
            }
            return lm > lum ? test(low, mid) : test(mid, high);
          };
          var rgb2 = (cur_lum > lum ? test(new Color$i([0, 0, 0]), this) : test(this, new Color$i([255, 255, 255]))).rgb();
          return new Color$i(rgb2.concat([this._rgb[3]]));
        }
        return rgb2luminance.apply(void 0, this._rgb.slice(0, 3));
      };
      var rgb2luminance = function(r, g, b) {
        r = luminance_x(r);
        g = luminance_x(g);
        b = luminance_x(b);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      var luminance_x = function(x) {
        x /= 255;
        return x <= 0.03928 ? x / 12.92 : pow$6((x + 0.055) / 1.055, 2.4);
      };
      var interpolator$1 = {};
      var Color$h = Color_1;
      var type$4 = utils.type;
      var interpolator = interpolator$1;
      var mix$1 = function(col1, col2, f) {
        if (f === void 0) f = 0.5;
        var rest = [], len = arguments.length - 3;
        while (len-- > 0) rest[len] = arguments[len + 3];
        var mode = rest[0] || "lrgb";
        if (!interpolator[mode] && !rest.length) {
          mode = Object.keys(interpolator)[0];
        }
        if (!interpolator[mode]) {
          throw new Error("interpolation mode " + mode + " is not defined");
        }
        if (type$4(col1) !== "object") {
          col1 = new Color$h(col1);
        }
        if (type$4(col2) !== "object") {
          col2 = new Color$h(col2);
        }
        return interpolator[mode](col1, col2, f).alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
      };
      var Color$g = Color_1;
      var mix = mix$1;
      Color$g.prototype.mix = Color$g.prototype.interpolate = function(col2, f) {
        if (f === void 0) f = 0.5;
        var rest = [], len = arguments.length - 2;
        while (len-- > 0) rest[len] = arguments[len + 2];
        return mix.apply(void 0, [this, col2, f].concat(rest));
      };
      var Color$f = Color_1;
      Color$f.prototype.premultiply = function(mutate) {
        if (mutate === void 0) mutate = false;
        var rgb2 = this._rgb;
        var a = rgb2[3];
        if (mutate) {
          this._rgb = [rgb2[0] * a, rgb2[1] * a, rgb2[2] * a, a];
          return this;
        } else {
          return new Color$f([rgb2[0] * a, rgb2[1] * a, rgb2[2] * a, a], "rgb");
        }
      };
      var Color$e = Color_1;
      var LAB_CONSTANTS = labConstants;
      Color$e.prototype.saturate = function(amount) {
        if (amount === void 0) amount = 1;
        var me = this;
        var lch2 = me.lch();
        lch2[1] += LAB_CONSTANTS.Kn * amount;
        if (lch2[1] < 0) {
          lch2[1] = 0;
        }
        return new Color$e(lch2, "lch").alpha(me.alpha(), true);
      };
      Color$e.prototype.desaturate = function(amount) {
        if (amount === void 0) amount = 1;
        return this.saturate(-amount);
      };
      var Color$d = Color_1;
      var type$3 = utils.type;
      Color$d.prototype.set = function(mc, value, mutate) {
        if (mutate === void 0) mutate = false;
        var ref = mc.split(".");
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
          var i2 = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
          if (i2 > -1) {
            if (type$3(value) == "string") {
              switch (value.charAt(0)) {
                case "+":
                  src[i2] += +value;
                  break;
                case "-":
                  src[i2] += +value;
                  break;
                case "*":
                  src[i2] *= +value.substr(1);
                  break;
                case "/":
                  src[i2] /= +value.substr(1);
                  break;
                default:
                  src[i2] = +value;
              }
            } else if (type$3(value) === "number") {
              src[i2] = value;
            } else {
              throw new Error("unsupported value for Color.set");
            }
            var out = new Color$d(src, mode);
            if (mutate) {
              this._rgb = out._rgb;
              return this;
            }
            return out;
          }
          throw new Error("unknown channel " + channel + " in mode " + mode);
        } else {
          return src;
        }
      };
      var Color$c = Color_1;
      var rgb = function(col1, col2, f) {
        var xyz0 = col1._rgb;
        var xyz1 = col2._rgb;
        return new Color$c(
          xyz0[0] + f * (xyz1[0] - xyz0[0]),
          xyz0[1] + f * (xyz1[1] - xyz0[1]),
          xyz0[2] + f * (xyz1[2] - xyz0[2]),
          "rgb"
        );
      };
      interpolator$1.rgb = rgb;
      var Color$b = Color_1;
      var sqrt$2 = Math.sqrt;
      var pow$5 = Math.pow;
      var lrgb = function(col1, col2, f) {
        var ref = col1._rgb;
        var x1 = ref[0];
        var y1 = ref[1];
        var z1 = ref[2];
        var ref$1 = col2._rgb;
        var x2 = ref$1[0];
        var y2 = ref$1[1];
        var z2 = ref$1[2];
        return new Color$b(
          sqrt$2(pow$5(x1, 2) * (1 - f) + pow$5(x2, 2) * f),
          sqrt$2(pow$5(y1, 2) * (1 - f) + pow$5(y2, 2) * f),
          sqrt$2(pow$5(z1, 2) * (1 - f) + pow$5(z2, 2) * f),
          "rgb"
        );
      };
      interpolator$1.lrgb = lrgb;
      var Color$a = Color_1;
      var lab = function(col1, col2, f) {
        var xyz0 = col1.lab();
        var xyz1 = col2.lab();
        return new Color$a(
          xyz0[0] + f * (xyz1[0] - xyz0[0]),
          xyz0[1] + f * (xyz1[1] - xyz0[1]),
          xyz0[2] + f * (xyz1[2] - xyz0[2]),
          "lab"
        );
      };
      interpolator$1.lab = lab;
      var Color$9 = Color_1;
      var _hsx = function(col1, col2, f, m) {
        var assign, assign$1;
        var xyz0, xyz1;
        if (m === "hsl") {
          xyz0 = col1.hsl();
          xyz1 = col2.hsl();
        } else if (m === "hsv") {
          xyz0 = col1.hsv();
          xyz1 = col2.hsv();
        } else if (m === "hcg") {
          xyz0 = col1.hcg();
          xyz1 = col2.hcg();
        } else if (m === "hsi") {
          xyz0 = col1.hsi();
          xyz1 = col2.hsi();
        } else if (m === "lch" || m === "hcl") {
          m = "hcl";
          xyz0 = col1.hcl();
          xyz1 = col2.hcl();
        } else if (m === "oklch") {
          xyz0 = col1.oklch().reverse();
          xyz1 = col2.oklch().reverse();
        }
        var hue0, hue1, sat0, sat1, lbv0, lbv1;
        if (m.substr(0, 1) === "h" || m === "oklch") {
          assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2];
          assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2];
        }
        var sat, hue, lbv, dh;
        if (!isNaN(hue0) && !isNaN(hue1)) {
          if (hue1 > hue0 && hue1 - hue0 > 180) {
            dh = hue1 - (hue0 + 360);
          } else if (hue1 < hue0 && hue0 - hue1 > 180) {
            dh = hue1 + 360 - hue0;
          } else {
            dh = hue1 - hue0;
          }
          hue = hue0 + f * dh;
        } else if (!isNaN(hue0)) {
          hue = hue0;
          if ((lbv1 == 1 || lbv1 == 0) && m != "hsv") {
            sat = sat0;
          }
        } else if (!isNaN(hue1)) {
          hue = hue1;
          if ((lbv0 == 1 || lbv0 == 0) && m != "hsv") {
            sat = sat1;
          }
        } else {
          hue = Number.NaN;
        }
        if (sat === void 0) {
          sat = sat0 + f * (sat1 - sat0);
        }
        lbv = lbv0 + f * (lbv1 - lbv0);
        return m === "oklch" ? new Color$9([lbv, sat, hue], m) : new Color$9([hue, sat, lbv], m);
      };
      var interpolate_hsx$5 = _hsx;
      var lch = function(col1, col2, f) {
        return interpolate_hsx$5(col1, col2, f, "lch");
      };
      interpolator$1.lch = lch;
      interpolator$1.hcl = lch;
      var Color$8 = Color_1;
      var num = function(col1, col2, f) {
        var c1 = col1.num();
        var c2 = col2.num();
        return new Color$8(c1 + f * (c2 - c1), "num");
      };
      interpolator$1.num = num;
      var interpolate_hsx$4 = _hsx;
      var hcg = function(col1, col2, f) {
        return interpolate_hsx$4(col1, col2, f, "hcg");
      };
      interpolator$1.hcg = hcg;
      var interpolate_hsx$3 = _hsx;
      var hsi = function(col1, col2, f) {
        return interpolate_hsx$3(col1, col2, f, "hsi");
      };
      interpolator$1.hsi = hsi;
      var interpolate_hsx$2 = _hsx;
      var hsl = function(col1, col2, f) {
        return interpolate_hsx$2(col1, col2, f, "hsl");
      };
      interpolator$1.hsl = hsl;
      var interpolate_hsx$1 = _hsx;
      var hsv = function(col1, col2, f) {
        return interpolate_hsx$1(col1, col2, f, "hsv");
      };
      interpolator$1.hsv = hsv;
      var Color$7 = Color_1;
      var oklab = function(col1, col2, f) {
        var xyz0 = col1.oklab();
        var xyz1 = col2.oklab();
        return new Color$7(
          xyz0[0] + f * (xyz1[0] - xyz0[0]),
          xyz0[1] + f * (xyz1[1] - xyz0[1]),
          xyz0[2] + f * (xyz1[2] - xyz0[2]),
          "oklab"
        );
      };
      interpolator$1.oklab = oklab;
      var interpolate_hsx = _hsx;
      var oklch = function(col1, col2, f) {
        return interpolate_hsx(col1, col2, f, "oklch");
      };
      interpolator$1.oklch = oklch;
      var Color$6 = Color_1;
      var clip_rgb$1 = utils.clip_rgb;
      var pow$4 = Math.pow;
      var sqrt$1 = Math.sqrt;
      var PI$1 = Math.PI;
      var cos$2 = Math.cos;
      var sin$2 = Math.sin;
      var atan2$1 = Math.atan2;
      var average = function(colors, mode, weights) {
        if (mode === void 0) mode = "lrgb";
        if (weights === void 0) weights = null;
        var l = colors.length;
        if (!weights) {
          weights = Array.from(new Array(l)).map(function() {
            return 1;
          });
        }
        var k = l / weights.reduce(function(a, b) {
          return a + b;
        });
        weights.forEach(function(w, i3) {
          weights[i3] *= k;
        });
        colors = colors.map(function(c) {
          return new Color$6(c);
        });
        if (mode === "lrgb") {
          return _average_lrgb(colors, weights);
        }
        var first = colors.shift();
        var xyz = first.get(mode);
        var cnt = [];
        var dx = 0;
        var dy = 0;
        for (var i2 = 0; i2 < xyz.length; i2++) {
          xyz[i2] = (xyz[i2] || 0) * weights[0];
          cnt.push(isNaN(xyz[i2]) ? 0 : weights[0]);
          if (mode.charAt(i2) === "h" && !isNaN(xyz[i2])) {
            var A = xyz[i2] / 180 * PI$1;
            dx += cos$2(A) * weights[0];
            dy += sin$2(A) * weights[0];
          }
        }
        var alpha = first.alpha() * weights[0];
        colors.forEach(function(c, ci) {
          var xyz2 = c.get(mode);
          alpha += c.alpha() * weights[ci + 1];
          for (var i3 = 0; i3 < xyz.length; i3++) {
            if (!isNaN(xyz2[i3])) {
              cnt[i3] += weights[ci + 1];
              if (mode.charAt(i3) === "h") {
                var A2 = xyz2[i3] / 180 * PI$1;
                dx += cos$2(A2) * weights[ci + 1];
                dy += sin$2(A2) * weights[ci + 1];
              } else {
                xyz[i3] += xyz2[i3] * weights[ci + 1];
              }
            }
          }
        });
        for (var i$12 = 0; i$12 < xyz.length; i$12++) {
          if (mode.charAt(i$12) === "h") {
            var A$1 = atan2$1(dy / cnt[i$12], dx / cnt[i$12]) / PI$1 * 180;
            while (A$1 < 0) {
              A$1 += 360;
            }
            while (A$1 >= 360) {
              A$1 -= 360;
            }
            xyz[i$12] = A$1;
          } else {
            xyz[i$12] = xyz[i$12] / cnt[i$12];
          }
        }
        alpha /= l;
        return new Color$6(xyz, mode).alpha(alpha > 0.99999 ? 1 : alpha, true);
      };
      var _average_lrgb = function(colors, weights) {
        var l = colors.length;
        var xyz = [0, 0, 0, 0];
        for (var i2 = 0; i2 < colors.length; i2++) {
          var col = colors[i2];
          var f = weights[i2] / l;
          var rgb2 = col._rgb;
          xyz[0] += pow$4(rgb2[0], 2) * f;
          xyz[1] += pow$4(rgb2[1], 2) * f;
          xyz[2] += pow$4(rgb2[2], 2) * f;
          xyz[3] += rgb2[3] * f;
        }
        xyz[0] = sqrt$1(xyz[0]);
        xyz[1] = sqrt$1(xyz[1]);
        xyz[2] = sqrt$1(xyz[2]);
        if (xyz[3] > 0.9999999) {
          xyz[3] = 1;
        }
        return new Color$6(clip_rgb$1(xyz));
      };
      var chroma$4 = chroma_1;
      var type$2 = utils.type;
      var pow$3 = Math.pow;
      var scale$2 = function(colors) {
        var _mode = "rgb";
        var _nacol = chroma$4("#ccc");
        var _spread = 0;
        var _domain = [0, 1];
        var _pos = [];
        var _padding = [0, 0];
        var _classes = false;
        var _colors = [];
        var _out = false;
        var _min = 0;
        var _max = 1;
        var _correctLightness = false;
        var _colorCache = {};
        var _useCache = true;
        var _gamma = 1;
        var setColors = function(colors2) {
          colors2 = colors2 || ["#fff", "#000"];
          if (colors2 && type$2(colors2) === "string" && chroma$4.brewer && chroma$4.brewer[colors2.toLowerCase()]) {
            colors2 = chroma$4.brewer[colors2.toLowerCase()];
          }
          if (type$2(colors2) === "array") {
            if (colors2.length === 1) {
              colors2 = [colors2[0], colors2[0]];
            }
            colors2 = colors2.slice(0);
            for (var c = 0; c < colors2.length; c++) {
              colors2[c] = chroma$4(colors2[c]);
            }
            _pos.length = 0;
            for (var c$1 = 0; c$1 < colors2.length; c$1++) {
              _pos.push(c$1 / (colors2.length - 1));
            }
          }
          resetCache();
          return _colors = colors2;
        };
        var getClass = function(value) {
          if (_classes != null) {
            var n = _classes.length - 1;
            var i2 = 0;
            while (i2 < n && value >= _classes[i2]) {
              i2++;
            }
            return i2 - 1;
          }
          return 0;
        };
        var tMapLightness = function(t) {
          return t;
        };
        var tMapDomain = function(t) {
          return t;
        };
        var getColor = function(val, bypassMap) {
          var col, t;
          if (bypassMap == null) {
            bypassMap = false;
          }
          if (isNaN(val) || val === null) {
            return _nacol;
          }
          if (!bypassMap) {
            if (_classes && _classes.length > 2) {
              var c = getClass(val);
              t = c / (_classes.length - 2);
            } else if (_max !== _min) {
              t = (val - _min) / (_max - _min);
            } else {
              t = 1;
            }
          } else {
            t = val;
          }
          t = tMapDomain(t);
          if (!bypassMap) {
            t = tMapLightness(t);
          }
          if (_gamma !== 1) {
            t = pow$3(t, _gamma);
          }
          t = _padding[0] + t * (1 - _padding[0] - _padding[1]);
          t = Math.min(1, Math.max(0, t));
          var k = Math.floor(t * 1e4);
          if (_useCache && _colorCache[k]) {
            col = _colorCache[k];
          } else {
            if (type$2(_colors) === "array") {
              for (var i2 = 0; i2 < _pos.length; i2++) {
                var p = _pos[i2];
                if (t <= p) {
                  col = _colors[i2];
                  break;
                }
                if (t >= p && i2 === _pos.length - 1) {
                  col = _colors[i2];
                  break;
                }
                if (t > p && t < _pos[i2 + 1]) {
                  t = (t - p) / (_pos[i2 + 1] - p);
                  col = chroma$4.interpolate(_colors[i2], _colors[i2 + 1], t, _mode);
                  break;
                }
              }
            } else if (type$2(_colors) === "function") {
              col = _colors(t);
            }
            if (_useCache) {
              _colorCache[k] = col;
            }
          }
          return col;
        };
        var resetCache = function() {
          return _colorCache = {};
        };
        setColors(colors);
        var f = function(v) {
          var c = chroma$4(getColor(v));
          if (_out && c[_out]) {
            return c[_out]();
          } else {
            return c;
          }
        };
        f.classes = function(classes) {
          if (classes != null) {
            if (type$2(classes) === "array") {
              _classes = classes;
              _domain = [classes[0], classes[classes.length - 1]];
            } else {
              var d = chroma$4.analyze(_domain);
              if (classes === 0) {
                _classes = [d.min, d.max];
              } else {
                _classes = chroma$4.limits(d, "e", classes);
              }
            }
            return f;
          }
          return _classes;
        };
        f.domain = function(domain) {
          if (!arguments.length) {
            return _domain;
          }
          _min = domain[0];
          _max = domain[domain.length - 1];
          _pos = [];
          var k = _colors.length;
          if (domain.length === k && _min !== _max) {
            for (var i2 = 0, list2 = Array.from(domain); i2 < list2.length; i2 += 1) {
              var d = list2[i2];
              _pos.push((d - _min) / (_max - _min));
            }
          } else {
            for (var c = 0; c < k; c++) {
              _pos.push(c / (k - 1));
            }
            if (domain.length > 2) {
              var tOut = domain.map(function(d2, i3) {
                return i3 / (domain.length - 1);
              });
              var tBreaks = domain.map(function(d2) {
                return (d2 - _min) / (_max - _min);
              });
              if (!tBreaks.every(function(val, i3) {
                return tOut[i3] === val;
              })) {
                tMapDomain = function(t) {
                  if (t <= 0 || t >= 1) {
                    return t;
                  }
                  var i3 = 0;
                  while (t >= tBreaks[i3 + 1]) {
                    i3++;
                  }
                  var f2 = (t - tBreaks[i3]) / (tBreaks[i3 + 1] - tBreaks[i3]);
                  var out = tOut[i3] + f2 * (tOut[i3 + 1] - tOut[i3]);
                  return out;
                };
              }
            }
          }
          _domain = [_min, _max];
          return f;
        };
        f.mode = function(_m) {
          if (!arguments.length) {
            return _mode;
          }
          _mode = _m;
          resetCache();
          return f;
        };
        f.range = function(colors2, _pos2) {
          setColors(colors2);
          return f;
        };
        f.out = function(_o) {
          _out = _o;
          return f;
        };
        f.spread = function(val) {
          if (!arguments.length) {
            return _spread;
          }
          _spread = val;
          return f;
        };
        f.correctLightness = function(v) {
          if (v == null) {
            v = true;
          }
          _correctLightness = v;
          resetCache();
          if (_correctLightness) {
            tMapLightness = function(t) {
              var L0 = getColor(0, true).lab()[0];
              var L1 = getColor(1, true).lab()[0];
              var pol = L0 > L1;
              var L_actual = getColor(t, true).lab()[0];
              var L_ideal = L0 + (L1 - L0) * t;
              var L_diff = L_actual - L_ideal;
              var t0 = 0;
              var t1 = 1;
              var max_iter = 20;
              while (Math.abs(L_diff) > 0.01 && max_iter-- > 0) {
                (function() {
                  if (pol) {
                    L_diff *= -1;
                  }
                  if (L_diff < 0) {
                    t0 = t;
                    t += (t1 - t) * 0.5;
                  } else {
                    t1 = t;
                    t += (t0 - t) * 0.5;
                  }
                  L_actual = getColor(t, true).lab()[0];
                  return L_diff = L_actual - L_ideal;
                })();
              }
              return t;
            };
          } else {
            tMapLightness = function(t) {
              return t;
            };
          }
          return f;
        };
        f.padding = function(p) {
          if (p != null) {
            if (type$2(p) === "number") {
              p = [p, p];
            }
            _padding = p;
            return f;
          } else {
            return _padding;
          }
        };
        f.colors = function(numColors, out) {
          if (arguments.length < 2) {
            out = "hex";
          }
          var result = [];
          if (arguments.length === 0) {
            result = _colors.slice(0);
          } else if (numColors === 1) {
            result = [f(0.5)];
          } else if (numColors > 1) {
            var dm = _domain[0];
            var dd = _domain[1] - dm;
            result = __range__(0, numColors, false).map(function(i3) {
              return f(dm + i3 / (numColors - 1) * dd);
            });
          } else {
            colors = [];
            var samples = [];
            if (_classes && _classes.length > 2) {
              for (var i2 = 1, end = _classes.length, asc = 1 <= end; asc ? i2 < end : i2 > end; asc ? i2++ : i2--) {
                samples.push((_classes[i2 - 1] + _classes[i2]) * 0.5);
              }
            } else {
              samples = _domain;
            }
            result = samples.map(function(v) {
              return f(v);
            });
          }
          if (chroma$4[out]) {
            result = result.map(function(c) {
              return c[out]();
            });
          }
          return result;
        };
        f.cache = function(c) {
          if (c != null) {
            _useCache = c;
            return f;
          } else {
            return _useCache;
          }
        };
        f.gamma = function(g) {
          if (g != null) {
            _gamma = g;
            return f;
          } else {
            return _gamma;
          }
        };
        f.nodata = function(d) {
          if (d != null) {
            _nacol = chroma$4(d);
            return f;
          } else {
            return _nacol;
          }
        };
        return f;
      };
      function __range__(left, right, inclusive) {
        var range = [];
        var ascending = left < right;
        var end = !inclusive ? right : ascending ? right + 1 : right - 1;
        for (var i2 = left; ascending ? i2 < end : i2 > end; ascending ? i2++ : i2--) {
          range.push(i2);
        }
        return range;
      }
      var Color$5 = Color_1;
      var scale$1 = scale$2;
      var binom_row = function(n) {
        var row = [1, 1];
        for (var i2 = 1; i2 < n; i2++) {
          var newrow = [1];
          for (var j = 1; j <= row.length; j++) {
            newrow[j] = (row[j] || 0) + row[j - 1];
          }
          row = newrow;
        }
        return row;
      };
      var bezier = function(colors) {
        var assign, assign$1, assign$2;
        var I, lab0, lab1, lab2;
        colors = colors.map(function(c) {
          return new Color$5(c);
        });
        if (colors.length === 2) {
          assign = colors.map(function(c) {
            return c.lab();
          }), lab0 = assign[0], lab1 = assign[1];
          I = function(t) {
            var lab4 = [0, 1, 2].map(function(i2) {
              return lab0[i2] + t * (lab1[i2] - lab0[i2]);
            });
            return new Color$5(lab4, "lab");
          };
        } else if (colors.length === 3) {
          assign$1 = colors.map(function(c) {
            return c.lab();
          }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2];
          I = function(t) {
            var lab4 = [0, 1, 2].map(function(i2) {
              return (1 - t) * (1 - t) * lab0[i2] + 2 * (1 - t) * t * lab1[i2] + t * t * lab2[i2];
            });
            return new Color$5(lab4, "lab");
          };
        } else if (colors.length === 4) {
          var lab3;
          assign$2 = colors.map(function(c) {
            return c.lab();
          }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3];
          I = function(t) {
            var lab4 = [0, 1, 2].map(function(i2) {
              return (1 - t) * (1 - t) * (1 - t) * lab0[i2] + 3 * (1 - t) * (1 - t) * t * lab1[i2] + 3 * (1 - t) * t * t * lab2[i2] + t * t * t * lab3[i2];
            });
            return new Color$5(lab4, "lab");
          };
        } else if (colors.length >= 5) {
          var labs, row, n;
          labs = colors.map(function(c) {
            return c.lab();
          });
          n = colors.length - 1;
          row = binom_row(n);
          I = function(t) {
            var u = 1 - t;
            var lab4 = [0, 1, 2].map(function(i2) {
              return labs.reduce(function(sum, el, j) {
                return sum + row[j] * Math.pow(u, n - j) * Math.pow(t, j) * el[i2];
              }, 0);
            });
            return new Color$5(lab4, "lab");
          };
        } else {
          throw new RangeError("No point in running bezier with only one color.");
        }
        return I;
      };
      var bezier_1 = function(colors) {
        var f = bezier(colors);
        f.scale = function() {
          return scale$1(f);
        };
        return f;
      };
      var chroma$3 = chroma_1;
      var blend = function(bottom, top, mode) {
        if (!blend[mode]) {
          throw new Error("unknown blend mode " + mode);
        }
        return blend[mode](bottom, top);
      };
      var blend_f = function(f) {
        return function(bottom, top) {
          var c0 = chroma$3(top).rgb();
          var c1 = chroma$3(bottom).rgb();
          return chroma$3.rgb(f(c0, c1));
        };
      };
      var each = function(f) {
        return function(c0, c1) {
          var out = [];
          out[0] = f(c0[0], c1[0]);
          out[1] = f(c0[1], c1[1]);
          out[2] = f(c0[2], c1[2]);
          return out;
        };
      };
      var normal = function(a) {
        return a;
      };
      var multiply = function(a, b) {
        return a * b / 255;
      };
      var darken = function(a, b) {
        return a > b ? b : a;
      };
      var lighten2 = function(a, b) {
        return a > b ? a : b;
      };
      var screen = function(a, b) {
        return 255 * (1 - (1 - a / 255) * (1 - b / 255));
      };
      var overlay = function(a, b) {
        return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
      };
      var burn = function(a, b) {
        return 255 * (1 - (1 - b / 255) / (a / 255));
      };
      var dodge = function(a, b) {
        if (a === 255) {
          return 255;
        }
        a = 255 * (b / 255) / (1 - a / 255);
        return a > 255 ? 255 : a;
      };
      blend.normal = blend_f(each(normal));
      blend.multiply = blend_f(each(multiply));
      blend.screen = blend_f(each(screen));
      blend.overlay = blend_f(each(overlay));
      blend.darken = blend_f(each(darken));
      blend.lighten = blend_f(each(lighten2));
      blend.dodge = blend_f(each(dodge));
      blend.burn = blend_f(each(burn));
      var blend_1 = blend;
      var type$1 = utils.type;
      var clip_rgb = utils.clip_rgb;
      var TWOPI = utils.TWOPI;
      var pow$2 = Math.pow;
      var sin$1 = Math.sin;
      var cos$1 = Math.cos;
      var chroma$2 = chroma_1;
      var cubehelix = function(start, rotations, hue, gamma, lightness) {
        if (start === void 0) start = 300;
        if (rotations === void 0) rotations = -1.5;
        if (hue === void 0) hue = 1;
        if (gamma === void 0) gamma = 1;
        if (lightness === void 0) lightness = [0, 1];
        var dh = 0, dl;
        if (type$1(lightness) === "array") {
          dl = lightness[1] - lightness[0];
        } else {
          dl = 0;
          lightness = [lightness, lightness];
        }
        var f = function(fract) {
          var a = TWOPI * ((start + 120) / 360 + rotations * fract);
          var l = pow$2(lightness[0] + dl * fract, gamma);
          var h = dh !== 0 ? hue[0] + fract * dh : hue;
          var amp = h * l * (1 - l) / 2;
          var cos_a = cos$1(a);
          var sin_a = sin$1(a);
          var r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
          var g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
          var b = l + amp * (1.97294 * cos_a);
          return chroma$2(clip_rgb([r * 255, g * 255, b * 255, 1]));
        };
        f.start = function(s) {
          if (s == null) {
            return start;
          }
          start = s;
          return f;
        };
        f.rotations = function(r) {
          if (r == null) {
            return rotations;
          }
          rotations = r;
          return f;
        };
        f.gamma = function(g) {
          if (g == null) {
            return gamma;
          }
          gamma = g;
          return f;
        };
        f.hue = function(h) {
          if (h == null) {
            return hue;
          }
          hue = h;
          if (type$1(hue) === "array") {
            dh = hue[1] - hue[0];
            if (dh === 0) {
              hue = hue[1];
            }
          } else {
            dh = 0;
          }
          return f;
        };
        f.lightness = function(h) {
          if (h == null) {
            return lightness;
          }
          if (type$1(h) === "array") {
            lightness = h;
            dl = h[1] - h[0];
          } else {
            lightness = [h, h];
            dl = 0;
          }
          return f;
        };
        f.scale = function() {
          return chroma$2.scale(f);
        };
        f.hue(hue);
        return f;
      };
      var Color$4 = Color_1;
      var digits = "0123456789abcdef";
      var floor$1 = Math.floor;
      var random = Math.random;
      var random_1 = function() {
        var code = "#";
        for (var i2 = 0; i2 < 6; i2++) {
          code += digits.charAt(floor$1(random() * 16));
        }
        return new Color$4(code, "hex");
      };
      var type = type$p;
      var log = Math.log;
      var pow$1 = Math.pow;
      var floor = Math.floor;
      var abs$1 = Math.abs;
      var analyze = function(data, key2) {
        if (key2 === void 0) key2 = null;
        var r = {
          min: Number.MAX_VALUE,
          max: Number.MAX_VALUE * -1,
          sum: 0,
          values: [],
          count: 0
        };
        if (type(data) === "object") {
          data = Object.values(data);
        }
        data.forEach(function(val) {
          if (key2 && type(val) === "object") {
            val = val[key2];
          }
          if (val !== void 0 && val !== null && !isNaN(val)) {
            r.values.push(val);
            r.sum += val;
            if (val < r.min) {
              r.min = val;
            }
            if (val > r.max) {
              r.max = val;
            }
            r.count += 1;
          }
        });
        r.domain = [r.min, r.max];
        r.limits = function(mode, num2) {
          return limits(r, mode, num2);
        };
        return r;
      };
      var limits = function(data, mode, num2) {
        if (mode === void 0) mode = "equal";
        if (num2 === void 0) num2 = 7;
        if (type(data) == "array") {
          data = analyze(data);
        }
        var min2 = data.min;
        var max2 = data.max;
        var values = data.values.sort(function(a, b) {
          return a - b;
        });
        if (num2 === 1) {
          return [min2, max2];
        }
        var limits2 = [];
        if (mode.substr(0, 1) === "c") {
          limits2.push(min2);
          limits2.push(max2);
        }
        if (mode.substr(0, 1) === "e") {
          limits2.push(min2);
          for (var i2 = 1; i2 < num2; i2++) {
            limits2.push(min2 + i2 / num2 * (max2 - min2));
          }
          limits2.push(max2);
        } else if (mode.substr(0, 1) === "l") {
          if (min2 <= 0) {
            throw new Error("Logarithmic scales are only possible for values > 0");
          }
          var min_log = Math.LOG10E * log(min2);
          var max_log = Math.LOG10E * log(max2);
          limits2.push(min2);
          for (var i$12 = 1; i$12 < num2; i$12++) {
            limits2.push(pow$1(10, min_log + i$12 / num2 * (max_log - min_log)));
          }
          limits2.push(max2);
        } else if (mode.substr(0, 1) === "q") {
          limits2.push(min2);
          for (var i$2 = 1; i$2 < num2; i$2++) {
            var p = (values.length - 1) * i$2 / num2;
            var pb = floor(p);
            if (pb === p) {
              limits2.push(values[pb]);
            } else {
              var pr = p - pb;
              limits2.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
            }
          }
          limits2.push(max2);
        } else if (mode.substr(0, 1) === "k") {
          var cluster;
          var n = values.length;
          var assignments = new Array(n);
          var clusterSizes = new Array(num2);
          var repeat = true;
          var nb_iters = 0;
          var centroids = null;
          centroids = [];
          centroids.push(min2);
          for (var i$3 = 1; i$3 < num2; i$3++) {
            centroids.push(min2 + i$3 / num2 * (max2 - min2));
          }
          centroids.push(max2);
          while (repeat) {
            for (var j = 0; j < num2; j++) {
              clusterSizes[j] = 0;
            }
            for (var i$4 = 0; i$4 < n; i$4++) {
              var value = values[i$4];
              var mindist = Number.MAX_VALUE;
              var best = void 0;
              for (var j$1 = 0; j$1 < num2; j$1++) {
                var dist = abs$1(centroids[j$1] - value);
                if (dist < mindist) {
                  mindist = dist;
                  best = j$1;
                }
                clusterSizes[best]++;
                assignments[i$4] = best;
              }
            }
            var newCentroids = new Array(num2);
            for (var j$2 = 0; j$2 < num2; j$2++) {
              newCentroids[j$2] = null;
            }
            for (var i$5 = 0; i$5 < n; i$5++) {
              cluster = assignments[i$5];
              if (newCentroids[cluster] === null) {
                newCentroids[cluster] = values[i$5];
              } else {
                newCentroids[cluster] += values[i$5];
              }
            }
            for (var j$3 = 0; j$3 < num2; j$3++) {
              newCentroids[j$3] *= 1 / clusterSizes[j$3];
            }
            repeat = false;
            for (var j$4 = 0; j$4 < num2; j$4++) {
              if (newCentroids[j$4] !== centroids[j$4]) {
                repeat = true;
                break;
              }
            }
            centroids = newCentroids;
            nb_iters++;
            if (nb_iters > 200) {
              repeat = false;
            }
          }
          var kClusters = {};
          for (var j$5 = 0; j$5 < num2; j$5++) {
            kClusters[j$5] = [];
          }
          for (var i$6 = 0; i$6 < n; i$6++) {
            cluster = assignments[i$6];
            kClusters[cluster].push(values[i$6]);
          }
          var tmpKMeansBreaks = [];
          for (var j$6 = 0; j$6 < num2; j$6++) {
            tmpKMeansBreaks.push(kClusters[j$6][0]);
            tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length - 1]);
          }
          tmpKMeansBreaks = tmpKMeansBreaks.sort(function(a, b) {
            return a - b;
          });
          limits2.push(tmpKMeansBreaks[0]);
          for (var i$7 = 1; i$7 < tmpKMeansBreaks.length; i$7 += 2) {
            var v = tmpKMeansBreaks[i$7];
            if (!isNaN(v) && limits2.indexOf(v) === -1) {
              limits2.push(v);
            }
          }
        }
        return limits2;
      };
      var analyze_1 = { analyze, limits };
      var Color$3 = Color_1;
      var contrast = function(a, b) {
        a = new Color$3(a);
        b = new Color$3(b);
        var l1 = a.luminance();
        var l2 = b.luminance();
        return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
      };
      var Color$2 = Color_1;
      var sqrt = Math.sqrt;
      var pow = Math.pow;
      var min = Math.min;
      var max = Math.max;
      var atan2 = Math.atan2;
      var abs = Math.abs;
      var cos = Math.cos;
      var sin = Math.sin;
      var exp = Math.exp;
      var PI = Math.PI;
      var deltaE2 = function(a, b, Kl, Kc, Kh) {
        if (Kl === void 0) Kl = 1;
        if (Kc === void 0) Kc = 1;
        if (Kh === void 0) Kh = 1;
        var rad2deg = function(rad) {
          return 360 * rad / (2 * PI);
        };
        var deg2rad = function(deg) {
          return 2 * PI * deg / 360;
        };
        a = new Color$2(a);
        b = new Color$2(b);
        var ref = Array.from(a.lab());
        var L1 = ref[0];
        var a1 = ref[1];
        var b1 = ref[2];
        var ref$1 = Array.from(b.lab());
        var L2 = ref$1[0];
        var a2 = ref$1[1];
        var b2 = ref$1[2];
        var avgL = (L1 + L2) / 2;
        var C1 = sqrt(pow(a1, 2) + pow(b1, 2));
        var C2 = sqrt(pow(a2, 2) + pow(b2, 2));
        var avgC = (C1 + C2) / 2;
        var G = 0.5 * (1 - sqrt(pow(avgC, 7) / (pow(avgC, 7) + pow(25, 7))));
        var a1p = a1 * (1 + G);
        var a2p = a2 * (1 + G);
        var C1p = sqrt(pow(a1p, 2) + pow(b1, 2));
        var C2p = sqrt(pow(a2p, 2) + pow(b2, 2));
        var avgCp = (C1p + C2p) / 2;
        var arctan1 = rad2deg(atan2(b1, a1p));
        var arctan2 = rad2deg(atan2(b2, a2p));
        var h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360;
        var h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360;
        var avgHp = abs(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2;
        var T = 1 - 0.17 * cos(deg2rad(avgHp - 30)) + 0.24 * cos(deg2rad(2 * avgHp)) + 0.32 * cos(deg2rad(3 * avgHp + 6)) - 0.2 * cos(deg2rad(4 * avgHp - 63));
        var deltaHp = h2p - h1p;
        deltaHp = abs(deltaHp) <= 180 ? deltaHp : h2p <= h1p ? deltaHp + 360 : deltaHp - 360;
        deltaHp = 2 * sqrt(C1p * C2p) * sin(deg2rad(deltaHp) / 2);
        var deltaL = L2 - L1;
        var deltaCp = C2p - C1p;
        var sl = 1 + 0.015 * pow(avgL - 50, 2) / sqrt(20 + pow(avgL - 50, 2));
        var sc = 1 + 0.045 * avgCp;
        var sh = 1 + 0.015 * avgCp * T;
        var deltaTheta = 30 * exp(-pow((avgHp - 275) / 25, 2));
        var Rc = 2 * sqrt(pow(avgCp, 7) / (pow(avgCp, 7) + pow(25, 7)));
        var Rt = -Rc * sin(2 * deg2rad(deltaTheta));
        var result = sqrt(pow(deltaL / (Kl * sl), 2) + pow(deltaCp / (Kc * sc), 2) + pow(deltaHp / (Kh * sh), 2) + Rt * (deltaCp / (Kc * sc)) * (deltaHp / (Kh * sh)));
        return max(0, min(100, result));
      };
      var Color$1 = Color_1;
      var distance = function(a, b, mode) {
        if (mode === void 0) mode = "lab";
        a = new Color$1(a);
        b = new Color$1(b);
        var l1 = a.get(mode);
        var l2 = b.get(mode);
        var sum_sq = 0;
        for (var i2 in l1) {
          var d = (l1[i2] || 0) - (l2[i2] || 0);
          sum_sq += d * d;
        }
        return Math.sqrt(sum_sq);
      };
      var Color = Color_1;
      var valid2 = function() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        try {
          new (Function.prototype.bind.apply(Color, [null].concat(args)))();
          return true;
        } catch (e) {
          return false;
        }
      };
      var chroma$1 = chroma_1;
      var scale = scale$2;
      var scales = {
        cool: function cool() {
          return scale([chroma$1.hsl(180, 1, 0.9), chroma$1.hsl(250, 0.7, 0.4)]);
        },
        hot: function hot() {
          return scale(["#000", "#f00", "#ff0", "#fff"]).mode("rgb");
        }
      };
      var colorbrewer = {
        // sequential
        OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
        PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
        BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
        Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
        BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
        YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
        YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
        Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
        RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
        Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
        YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
        Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
        GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
        Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
        YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
        PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
        Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
        PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
        Viridis: ["#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"],
        // diverging
        Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
        RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
        RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
        PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
        PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
        RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
        BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
        RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
        PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
        // qualitative
        Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
        Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
        Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
        Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
        Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
        Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
        Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
        Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
      };
      for (var i = 0, list = Object.keys(colorbrewer); i < list.length; i += 1) {
        var key = list[i];
        colorbrewer[key.toLowerCase()] = colorbrewer[key];
      }
      var colorbrewer_1 = colorbrewer;
      var chroma3 = chroma_1;
      chroma3.average = average;
      chroma3.bezier = bezier_1;
      chroma3.blend = blend_1;
      chroma3.cubehelix = cubehelix;
      chroma3.mix = chroma3.interpolate = mix$1;
      chroma3.random = random_1;
      chroma3.scale = scale$2;
      chroma3.analyze = analyze_1.analyze;
      chroma3.contrast = contrast;
      chroma3.deltaE = deltaE2;
      chroma3.distance = distance;
      chroma3.limits = analyze_1.limits;
      chroma3.valid = valid2;
      chroma3.scales = scales;
      chroma3.colors = w3cx11_1;
      chroma3.brewer = colorbrewer_1;
      var chroma_js = chroma3;
      return chroma_js;
    });
  }
});

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i])) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// src/extension/desktop/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var import_vscode13 = require("vscode");

// src/core/helpers/object.ts
var get = (obj, path) => {
  const pathArray = path.replace(/\[(\w+)\]/g, ".$1").replace(/^\./, "").split(".");
  const isObject = (object) => {
    return object === Object(object);
  };
  let result = structuredClone(obj);
  for (let i = 0; i < pathArray.length; ++i) {
    const k = pathArray[i];
    if (isObject(result) && k in result) {
      result = result[k];
    } else {
      return;
    }
  }
  return result;
};
var set = (obj, path, value) => {
  var _a;
  if (typeof path === "string") {
    path = path.split(".");
  }
  if (path.length > 1) {
    const e = (_a = path.shift()) != null ? _a : "";
    set(
      obj[e] = Object.prototype.toString.call(obj[e]) === "[object Object]" ? obj[e] : {},
      path,
      value
    );
  } else {
    obj[path[0]] = value;
  }
};
var merge = (...objects) => {
  return objects.reduce((acc, obj) => {
    Object.keys(obj != null ? obj : {}).forEach((key) => {
      const accValue = acc[key];
      const objValue = obj == null ? void 0 : obj[key];
      if ((accValue === void 0 || accValue === null) && objValue !== void 0 && objValue !== null) {
        acc[key] = objValue;
      } else if ((objValue === void 0 || objValue === null) && accValue !== void 0 && accValue !== null) {
      } else if (Array.isArray(objValue) && Array.isArray(accValue)) {
        acc[key] = [
          ...new Set(accValue.concat(objValue))
        ];
      } else if (typeof objValue === "object" && objValue !== null && typeof accValue === "object" && accValue !== null) {
        acc[key] = merge(
          accValue,
          objValue
        );
      } else {
        acc[key] = objValue;
      }
    });
    return acc;
  }, {});
};

// src/core/generator/config/defaultConfig.ts
var getDefaultConfig = () => ({
  folders: {
    theme: "specific",
    color: "#90a4ae",
    associations: {},
    customClones: []
  },
  activeIconPack: "angular",
  hidesExplorerArrows: false,
  opacity: 1,
  saturation: 1,
  files: {
    color: "#90a4ae",
    associations: {},
    customClones: []
  },
  languages: { associations: {} },
  enableLogging: false,
  logLevel: "info"
});
var padWithDefaultConfig = (config) => {
  const withDefaultConfig = merge(getDefaultConfig(), config != null ? config : {});
  return withDefaultConfig;
};

// src/core/logging/logger.ts
var import_node_events = require("events");

// src/core/generator/constants.ts
var extensionName = "material-icon-theme";
var extensionPublisher = "PKief";
var logEventKey = `${extensionName}-log-event`;
var iconFolderPath = "./../icons/";
var manifestName = "material-icons.json";
var openedFolder = "-open";
var lightColorFileEnding = "_light";
var highContrastColorFileEnding = "_highContrast";
var cloneIconExtension = ".clone.svg";
var clonesFolder = "clones/";
var wildcardPattern = new RegExp(/^\*{1,2}\./);

// src/core/logging/logger.ts
var loggerEmitter = new import_node_events.EventEmitter({
  captureRejections: true
});
var logLevelValues = {
  debug: 1,
  info: 2,
  error: 3
};
var createLogger = () => {
  const emitLogEvent = (level, message) => {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const logEvent = {
      level,
      message: `[${level.toUpperCase()}] ${timestamp} - ${message}`
    };
    loggerEmitter.emit(logEventKey, logEvent);
  };
  return {
    info: (message) => emitLogEvent("info", message),
    error: (message) => emitLogEvent("error", message),
    debug: (message) => emitLogEvent("debug", message)
  };
};
var createLoggingObserver = (minLogLevel, callback) => {
  const minLogLevelValue = logLevelValues[minLogLevel];
  return loggerEmitter.on(logEventKey, (event) => {
    if (logLevelValues[event.level] >= minLogLevelValue) {
      callback(event);
    }
  });
};
var logger = createLogger();

// src/core/helpers/configHash.ts
var getFileConfigHash = (config) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  try {
    const defaults = getDefaultConfig();
    let fileConfigString = "";
    if (config.saturation !== defaults.saturation || config.opacity !== defaults.opacity || ((_a = config.folders) == null ? void 0 : _a.color) !== defaults.folders.color || ((_b = config.files) == null ? void 0 : _b.color) !== defaults.files.color || ((_e = (_d = (_c = config.files) == null ? void 0 : _c.customClones) == null ? void 0 : _d.length) != null ? _e : 0) > 0 || ((_h = (_g = (_f = config.folders) == null ? void 0 : _f.customClones) == null ? void 0 : _g.length) != null ? _h : 0) > 0) {
      fileConfigString += `~${getHash(
        JSON.stringify({
          saturation: config.saturation,
          opacity: config.opacity,
          foldersColor: (_i = config.folders) == null ? void 0 : _i.color,
          filesColor: (_j = config.files) == null ? void 0 : _j.color,
          fileClones: (_k = config.files) == null ? void 0 : _k.customClones,
          folderClones: (_l = config.folders) == null ? void 0 : _l.customClones
        })
      )}`;
    }
    return fileConfigString;
  } catch (error) {
    logger.error(error);
    return "";
  }
};
var getHash = (value) => {
  let hash = 0;
  let chr = 0;
  if (value.length === 0) return hash;
  for (let i = 0; i < value.length; i++) {
    chr = value.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

// src/core/generator/shared/svg.ts
var import_node_path5 = require("path");

// src/core/helpers/resolvePath.ts
var import_node_path = require("path");
var resolvePath = (path) => {
  return (0, import_node_path.join)(__dirname, "..", "..", path);
};

// src/core/helpers/writeFile.ts
var import_promises = require("fs/promises");
var writeToFile = async (filePath, data, encoding) => {
  if (!filePath || !data || data.trim().length === 0) {
    logger.error("Invalid file path or data to write! File path: " + filePath);
    return;
  }
  logger.debug("Writing to file: " + filePath);
  await (0, import_promises.writeFile)(filePath, data, encoding);
};

// src/core/generator/iconOpacity.ts
var import_promises2 = require("fs/promises");
var import_node_path3 = require("path");

// src/core/helpers/customIconPaths.ts
var import_node_path2 = require("path");
var getCustomIconPaths = (filesAssociations = {}) => {
  return Object.values(filesAssociations).filter((fileName) => fileName.match(/^[.\/]+/)).map((fileName) => (0, import_node_path2.dirname)(resolvePath(fileName)));
};

// src/core/generator/iconOpacity.ts
var setIconOpacity = async (opacity, filesAssociations) => {
  if (!validateOpacityValue(opacity)) {
    return logger.error(
      "Invalid opacity value! Opacity must be a decimal number between 0 and 1!"
    );
  }
  logger.info(`Setting opacity to ${opacity}...`);
  const iconsPath = resolvePath(iconFolderPath);
  const customIconPaths = getCustomIconPaths(filesAssociations);
  const iconFiles = await (0, import_promises2.readdir)(iconsPath);
  try {
    for (const iconFileName of iconFiles) {
      await processSVGFile(iconsPath, iconFileName, opacity);
    }
    for (const iconPath of customIconPaths) {
      const customIcons = await (0, import_promises2.readdir)(iconPath);
      for (const iconFileName of customIcons) {
        await processSVGFile(iconPath, iconFileName, opacity);
      }
    }
  } catch (error) {
    logger.error(error);
  }
};
var validateOpacityValue = (opacity) => {
  return opacity !== void 0 && opacity <= 1 && opacity >= 0;
};
var getSVGRootElement = (svg) => {
  const result = new RegExp(/<svg[^>]*>/).exec(svg);
  return result == null ? void 0 : result[0];
};
var addOpacityAttribute = (svgRoot, opacity) => {
  const pattern = new RegExp(/\sopacity="[\d.]+"/);
  if (pattern.test(svgRoot)) {
    return svgRoot.replace(pattern, ` opacity="${opacity}"`);
  } else {
    return svgRoot.replace(/^<svg/, `<svg opacity="${opacity}"`);
  }
};
var removeOpacityAttribute = (svgRoot) => {
  const pattern = new RegExp(/\sopacity="[\d.]+"/);
  return svgRoot.replace(pattern, "");
};
var updateSVGOpacity = (svg, opacity) => {
  const svgRootElement = getSVGRootElement(svg);
  if (!svgRootElement) return svg;
  let updatedRootElement;
  if (opacity < 1) {
    updatedRootElement = addOpacityAttribute(svgRootElement, opacity);
  } else {
    updatedRootElement = removeOpacityAttribute(svgRootElement);
  }
  return svg.replace(/<svg[^>]*>/, updatedRootElement);
};
var processSVGFile = async (iconPath, iconFileName, opacity) => {
  const svgFilePath = (0, import_node_path3.join)(iconPath, iconFileName);
  if (!(await (0, import_promises2.lstat)(svgFilePath)).isFile()) {
    return;
  }
  const svg = await (0, import_promises2.readFile)(svgFilePath, "utf-8");
  const updatedSVG = updateSVGOpacity(svg, opacity);
  if (updatedSVG.trim().length === 0) return;
  await writeToFile(svgFilePath, updatedSVG);
};

// src/core/generator/iconSaturation.ts
var import_promises3 = require("fs/promises");
var import_node_path4 = require("path");
var setIconSaturation = async (saturation, filesAssociations) => {
  if (!validateSaturationValue(saturation)) {
    return logger.error(
      "Invalid saturation value! Saturation must be a decimal number between 0 and 1!"
    );
  }
  logger.info(`Setting saturation to ${saturation}...`);
  const iconsPath = resolvePath(iconFolderPath);
  const customIconPaths = getCustomIconPaths(filesAssociations);
  const iconFiles = await (0, import_promises3.readdir)(iconsPath);
  try {
    for (const iconFileName of iconFiles) {
      await processSVGFileForSaturation(iconsPath, iconFileName, saturation);
    }
    for (const iconPath of customIconPaths) {
      const customIcons = await (0, import_promises3.readdir)(iconPath);
      for (const iconFileName of customIcons) {
        await processSVGFileForSaturation(iconPath, iconFileName, saturation);
      }
    }
  } catch (error) {
    logger.error(error);
  }
};
var getSVGRootElement2 = (svg) => {
  const result = new RegExp(/<svg[^>]*>/).exec(svg);
  return result == null ? void 0 : result[0];
};
var addFilterAttribute = (svgRoot) => {
  const pattern = new RegExp(/\sfilter="[^"]+?"/);
  if (pattern.test(svgRoot)) {
    return svgRoot.replace(pattern, ' filter="url(#saturation)"');
  } else {
    return svgRoot.replace(/^<svg/, '<svg filter="url(#saturation)"');
  }
};
var removeFilterAttribute = (svgRoot) => {
  const pattern = new RegExp(/\sfilter="[^"]+?"/);
  return svgRoot.replace(pattern, "");
};
var addFilterElement = (svg, saturation) => {
  const pattern = new RegExp(/<filter id="saturation".+<\/filter>(.*<\/svg>)/);
  const filterElement = `<filter id="saturation"><feColorMatrix type="saturate" values="${saturation}"/></filter>`;
  if (pattern.test(svg)) {
    return svg.replace(pattern, `${filterElement}$1`);
  } else {
    return svg.replace(/<\/svg>/, `${filterElement}</svg>`);
  }
};
var removeFilterElement = (svg) => {
  const pattern = new RegExp(/<filter id="saturation".+<\/filter>(.*<\/svg>)/);
  return svg.replace(pattern, "$1");
};
var validateSaturationValue = (saturation) => {
  return saturation !== void 0 && saturation <= 1 && saturation >= 0;
};
var adjustSVGSaturation = (svg, saturation) => {
  const svgRootElement = getSVGRootElement2(svg);
  if (!svgRootElement) return svg;
  let updatedRootElement;
  if (saturation < 1) {
    updatedRootElement = addFilterAttribute(svgRootElement);
  } else {
    updatedRootElement = removeFilterAttribute(svgRootElement);
  }
  let updatedSVG = svg.replace(/<svg[^>]*>/, updatedRootElement);
  if (saturation < 1) {
    updatedSVG = addFilterElement(updatedSVG, saturation);
  } else {
    updatedSVG = removeFilterElement(updatedSVG);
  }
  return updatedSVG;
};
var processSVGFileForSaturation = async (iconPath, iconFileName, saturation) => {
  const svgFilePath = (0, import_node_path4.join)(iconPath, iconFileName);
  if (!(await (0, import_promises3.lstat)(svgFilePath)).isFile()) return;
  const svg = await (0, import_promises3.readFile)(svgFilePath, "utf-8");
  const updatedSVG = adjustSVGSaturation(svg, saturation);
  await writeToFile(svgFilePath, updatedSVG);
};

// src/core/generator/shared/svg.ts
var writeSVGFiles = async (iconName, svg, opacity, saturation) => {
  const updatedOpacity = updateSVGOpacity(svg, opacity);
  const updatedSaturation = adjustSVGSaturation(updatedOpacity, saturation);
  const iconsPath = resolvePath(iconFolderPath);
  const iconsFolderPath = (0, import_node_path5.join)(iconsPath, `${iconName}.svg`);
  try {
    await writeToFile(iconsFolderPath, updatedSaturation);
  } catch (error) {
    logger.error(error);
  }
};
var getPath = (d, color) => `<path d="${d}" fill="${color}" />`;
var getSVG = (path, viewBoxSize = 32) => `<svg viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" xmlns="http://www.w3.org/2000/svg">${path}</svg>`;

// src/core/generator/shared/validation.ts
var validateHEXColorCode = (color = "") => {
  const hexPattern = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
  return color.length > 0 && hexPattern.test(color);
};

// src/core/generator/fileGenerator.ts
var loadFileIconDefinitions = (fileIcons2, config, manifest) => {
  var _a;
  const enabledIcons = disableIconsByPack(fileIcons2, config.activeIconPack);
  const customIcons = getCustomIcons((_a = config.files) == null ? void 0 : _a.associations);
  const allFileIcons = [...enabledIcons, ...customIcons];
  allFileIcons.forEach((icon) => {
    var _a2;
    if (icon.disabled) return;
    const isClone = icon.clone !== void 0;
    manifest = setIconDefinition(manifest, config, icon.name, isClone);
    if (icon.light) {
      manifest = setIconDefinition(
        manifest,
        config,
        icon.name,
        isClone,
        lightColorFileEnding
      );
    }
    if (icon.highContrast) {
      manifest = setIconDefinition(
        manifest,
        config,
        icon.name,
        isClone,
        highContrastColorFileEnding
      );
    }
    if (icon.fileExtensions) {
      manifest = mapSpecificFileIcons(
        icon,
        "fileExtensions" /* FileExtensions */,
        manifest
      );
    }
    if (icon.fileNames) {
      manifest = mapSpecificFileIcons(
        icon,
        "fileNames" /* FileNames */,
        manifest,
        (_a2 = config.files) == null ? void 0 : _a2.associations
      );
    }
  });
  manifest = setIconDefinition(
    manifest,
    config,
    fileIcons2.defaultIcon.name,
    false
  );
  manifest.file = fileIcons2.defaultIcon.name;
  if (fileIcons2.defaultIcon.light && manifest.light) {
    manifest = setIconDefinition(
      manifest,
      config,
      fileIcons2.defaultIcon.name,
      false,
      lightColorFileEnding
    );
    if (manifest.light) {
      manifest.light.file = fileIcons2.defaultIcon.name + lightColorFileEnding;
    }
  }
  if (fileIcons2.defaultIcon.highContrast) {
    manifest = setIconDefinition(
      manifest,
      config,
      fileIcons2.defaultIcon.name,
      false,
      highContrastColorFileEnding
    );
    if (manifest.highContrast) {
      manifest.highContrast.file = fileIcons2.defaultIcon.name + highContrastColorFileEnding;
    }
  }
  return manifest;
};
var mapSpecificFileIcons = (icon, mappingType, manifest, customFileAssociation = {}) => {
  const iconMappingType = icon[mappingType];
  if (iconMappingType === void 0) {
    return manifest;
  }
  iconMappingType.forEach((name) => {
    var _a, _b;
    const shouldOverwriteFileNames = Object.keys(customFileAssociation).some(
      (key) => {
        if (!/^\*{2}\./.test(key)) return false;
        const fileExtension = key.replace(wildcardPattern, ".");
        return name.toLowerCase().indexOf(fileExtension.toLowerCase()) !== -1;
      }
    );
    const configMappingType = manifest[mappingType];
    const configLightMappingType = (_a = manifest.light) == null ? void 0 : _a[mappingType];
    const configHighContrastMappingType = (_b = manifest.highContrast) == null ? void 0 : _b[mappingType];
    if (shouldOverwriteFileNames || !configMappingType || !configLightMappingType || !configHighContrastMappingType)
      return;
    configMappingType[name] = icon.name;
    if (icon.light) {
      configLightMappingType[name] = `${icon.name}${lightColorFileEnding}`;
    }
    if (icon.highContrast) {
      configHighContrastMappingType[name] = `${icon.name}${highContrastColorFileEnding}`;
    }
  });
  return manifest;
};
var disableIconsByPack = (fileIcons2, activeIconPack) => {
  return fileIcons2.icons.filter((icon) => {
    return !icon.enabledFor ? true : icon.enabledFor.some((p) => p === activeIconPack);
  });
};
var setIconDefinition = (manifest, config, iconName, isClone, appendix = "") => {
  var _a;
  const ext = isClone ? cloneIconExtension : ".svg";
  const key = `${iconName}${appendix}`;
  (_a = manifest.iconDefinitions) != null ? _a : manifest.iconDefinitions = {};
  if (!manifest.iconDefinitions[key]) {
    const fileConfigHash = getFileConfigHash(config);
    manifest.iconDefinitions[key] = {
      iconPath: `${iconFolderPath}${iconName}${appendix}${fileConfigHash}${ext}`
    };
  }
  return manifest;
};
var generateFileIcons = async (color, opacity, saturation) => {
  if (!color || !validateHEXColorCode(color)) {
    return logger.error("Invalid color code for file icons");
  }
  const fileIcon = "M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m5 2H6v16h12v-9h-7V4z";
  await writeSVGFiles(
    "file",
    getSVG(getPath(fileIcon, color), 24),
    opacity,
    saturation
  );
};
var getCustomIcons = (fileAssociations) => {
  if (!fileAssociations) return [];
  const icons = Object.keys(fileAssociations).map((fa) => {
    const icon = {
      name: fileAssociations[fa].toLowerCase()
    };
    if (wildcardPattern.test(fa)) {
      icon.fileExtensions = [fa.toLowerCase().replace(wildcardPattern, "")];
    } else {
      icon.fileNames = [fa.toLowerCase()];
    }
    return icon;
  });
  return icons;
};

// src/core/generator/folderGenerator.ts
var loadFolderIconDefinitions = (folderIcons2, config, manifest) => {
  var _a, _b, _c;
  manifest.hidesExplorerArrows = config.hidesExplorerArrows;
  const activeTheme = getEnabledFolderTheme(folderIcons2, (_a = config.folders) == null ? void 0 : _a.theme);
  if (!activeTheme) {
    return manifest;
  }
  const enabledIcons = disableIconsByPack2(activeTheme, config.activeIconPack);
  const customIcons = getCustomIcons2((_b = config.folders) == null ? void 0 : _b.associations);
  const allIcons = [...enabledIcons, ...customIcons];
  if (((_c = config.folders) == null ? void 0 : _c.theme) === "none") {
    return manifest;
  }
  allIcons.forEach((icon) => {
    if (icon.disabled) return;
    const folderNames = extendFolderNames(icon.folderNames);
    manifest = setIconDefinitions(manifest, config, icon);
    manifest = merge(manifest, setFolderNames(icon.name, folderNames));
    manifest.light = icon.light ? merge(
      manifest.light,
      setFolderNames(icon.name, folderNames, lightColorFileEnding)
    ) : manifest.light;
    manifest.highContrast = icon.highContrast ? merge(
      manifest.highContrast,
      setFolderNames(icon.name, folderNames, highContrastColorFileEnding)
    ) : manifest.highContrast;
  });
  manifest = setDefaultFolderIcons(activeTheme, manifest, config);
  return manifest;
};
var setDefaultFolderIcons = (theme, manifest, config) => {
  const hasFolderIcons = !!theme.defaultIcon.name && theme.defaultIcon.name.length > 0;
  if (hasFolderIcons) {
    manifest = setIconDefinitions(manifest, config, theme.defaultIcon);
  }
  manifest = merge(
    manifest,
    createDefaultIconConfigObject(hasFolderIcons, theme, "")
  );
  manifest.light = theme.defaultIcon.light ? merge(
    manifest.light,
    createDefaultIconConfigObject(
      hasFolderIcons,
      theme,
      lightColorFileEnding
    )
  ) : manifest.light;
  manifest.highContrast = theme.defaultIcon.highContrast ? merge(
    manifest.highContrast,
    createDefaultIconConfigObject(
      hasFolderIcons,
      theme,
      highContrastColorFileEnding
    )
  ) : manifest.highContrast;
  manifest = merge(
    manifest,
    createRootIconConfigObject(hasFolderIcons, theme, "")
  );
  if (theme.rootFolder) {
    manifest = setIconDefinitions(manifest, config, theme.rootFolder);
    manifest.light = theme.rootFolder.light ? merge(
      manifest.light,
      createRootIconConfigObject(
        hasFolderIcons,
        theme,
        lightColorFileEnding
      )
    ) : manifest.light;
    manifest.highContrast = theme.rootFolder.highContrast ? merge(
      manifest.highContrast,
      createRootIconConfigObject(
        hasFolderIcons,
        theme,
        highContrastColorFileEnding
      )
    ) : manifest.highContrast;
  }
  return manifest;
};
var getEnabledFolderTheme = (themes, enabledTheme) => {
  return themes.find((theme) => theme.name === enabledTheme);
};
var disableIconsByPack2 = (folderIcons2, activatedIconPack) => {
  if (!(folderIcons2 == null ? void 0 : folderIcons2.icons) || folderIcons2.icons.length === 0) {
    return [];
  }
  return folderIcons2.icons.filter((icon) => {
    return !icon.enabledFor ? true : icon.enabledFor.some((p) => p === activatedIconPack);
  });
};
var setIconDefinitions = (manifest, config, icon) => {
  const isClone = icon.clone !== void 0;
  manifest = createIconDefinitions(manifest, config, icon.name, "", isClone);
  if (icon.light) {
    manifest = merge(
      manifest,
      createIconDefinitions(
        manifest,
        config,
        icon.name,
        lightColorFileEnding,
        isClone
      )
    );
  }
  if (icon.highContrast) {
    manifest = merge(
      manifest,
      createIconDefinitions(
        manifest,
        config,
        icon.name,
        highContrastColorFileEnding,
        isClone
      )
    );
  }
  return manifest;
};
var createIconDefinitions = (manifest, config, iconName, appendix = "", isClone = false) => {
  const fileConfigHash = getFileConfigHash(config);
  const configIconDefinitions = manifest.iconDefinitions;
  const ext = isClone ? cloneIconExtension : ".svg";
  const key = `${iconName}${appendix}`;
  const openedKey = `${iconName}${openedFolder}${appendix}`;
  if (configIconDefinitions) {
    if (!configIconDefinitions[key]) {
      configIconDefinitions[key] = {
        iconPath: `${iconFolderPath}${key}${fileConfigHash}${ext}`
      };
    }
    if (!configIconDefinitions[`${openedKey}`]) {
      configIconDefinitions[`${openedKey}`] = {
        iconPath: `${iconFolderPath}${openedKey}${fileConfigHash}${ext}`
      };
    }
  }
  return manifest;
};
var extendFolderNames = (folderNames) => {
  const names = [];
  const styles = [
    ["", ""],
    [".", ""],
    ["_", ""],
    ["__", "__"]
  ];
  folderNames.forEach((name) => {
    styles.forEach((style) => {
      names.push(`${style[0]}${name}${style[1]}`);
    });
  });
  return names;
};
var setFolderNames = (iconName, folderNames, appendix = "") => {
  const obj = {
    folderNames: {},
    folderNamesExpanded: {}
  };
  folderNames.forEach((name) => {
    if (obj.folderNames) {
      obj.folderNames[name] = iconName + appendix;
    }
    if (obj.folderNamesExpanded) {
      obj.folderNamesExpanded[name] = `${iconName}${openedFolder}${appendix}`;
    }
  });
  return obj;
};
var createDefaultIconConfigObject = (hasFolderIcons, theme, appendix = "") => {
  const obj = {
    folder: "",
    folderExpanded: ""
  };
  obj.folder = hasFolderIcons ? theme.defaultIcon.name + appendix : "";
  obj.folderExpanded = hasFolderIcons ? `${theme.defaultIcon.name}${openedFolder}${appendix}` : "";
  return obj;
};
var createRootIconConfigObject = (hasFolderIcons, theme, appendix = "") => {
  const obj = {
    rootFolder: "",
    rootFolderExpanded: ""
  };
  obj.rootFolder = hasFolderIcons ? theme.rootFolder ? theme.rootFolder.name + appendix : theme.defaultIcon.name + appendix : "";
  obj.rootFolderExpanded = hasFolderIcons ? theme.rootFolder ? `${theme.rootFolder.name}${openedFolder}${appendix}` : `${theme.defaultIcon.name}${openedFolder}${appendix}` : "";
  return obj;
};
var getCustomIcons2 = (folderAssociations) => {
  if (!folderAssociations) return [];
  const icons = Object.keys(folderAssociations).map((fa) => ({
    // use default folder if icon name is empty
    name: folderAssociations[fa].length > 0 ? "folder-" + folderAssociations[fa].toLowerCase() : "folder",
    folderNames: [fa.toLowerCase()]
  }));
  return icons;
};
var generateFolderIcons = async (color, opacity, saturation) => {
  if (!color || !validateHEXColorCode(color)) {
    return logger.error("Invalid color code for folder icons");
  }
  const folderIcon = "M13.84376,7.53645l-1.28749-1.0729A2,2,0,0,0,11.27591,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2H15.12412A2,2,0,0,1,13.84376,7.53645Z";
  const folderIconOpen = "M28.96692,12H9.44152a2,2,0,0,0-1.89737,1.36754L4,24V10H28a2,2,0,0,0-2-2H15.1241a2,2,0,0,1-1.28038-.46357L12.5563,6.46357A2,2,0,0,0,11.27592,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H26l4.80523-11.21213A2,2,0,0,0,28.96692,12Z";
  const rootFolderIcon = "M16,5A11,11,0,1,1,5,16,11.01245,11.01245,0,0,1,16,5m0-3A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,8a6,6,0,1,0,6,6A6,6,0,0,0,16,10Z";
  const rootFolderIconOpen = "M16,5A11,11,0,1,1,5,16,11.01245,11.01245,0,0,1,16,5m0-3A14,14,0,1,0,30,16,14,14,0,0,0,16,2Z";
  await writeSVGFiles(
    "folder",
    getSVG(getPath(folderIcon, color)),
    opacity,
    saturation
  );
  await writeSVGFiles(
    "folder-open",
    getSVG(getPath(folderIconOpen, color)),
    opacity,
    saturation
  );
  await writeSVGFiles(
    "folder-root",
    getSVG(getPath(rootFolderIcon, color)),
    opacity,
    saturation
  );
  await writeSVGFiles(
    "folder-root-open",
    getSVG(getPath(rootFolderIconOpen, color)),
    opacity,
    saturation
  );
};

// src/core/generator/applyConfigToIcons.ts
var applyConfigToIcons = async (config, oldConfig) => {
  if (config.files.color !== oldConfig.files.color) {
    await generateFileIcons(
      config.files.color,
      config.opacity,
      config.saturation
    );
  }
  if (config.folders.color !== oldConfig.folders.color) {
    await generateFolderIcons(
      config.folders.color,
      config.opacity,
      config.saturation
    );
  }
  if (config.opacity !== oldConfig.opacity) {
    await setIconOpacity(config.opacity, config.files.associations);
  }
  if (config.saturation !== oldConfig.saturation) {
    await setIconSaturation(config.saturation, config.files.associations);
  }
};

// src/core/generator/clones/utils/cloneData.ts
var import_node_fs = require("fs");
var import_promises4 = require("fs/promises");
var import_node_path6 = require("path");
var isFolder = (clone) => {
  return clone && clone.folderNames !== void 0;
};
var isDark = (daa) => daa.variant === 0 /* Base */ || daa.variant === 1 /* Open */;
var getCloneData = (cloneOpts, manifest, subFolder, hash, ext) => {
  const baseIcon = isFolder(cloneOpts) ? getFolderIconBaseData(cloneOpts, manifest) : getFileIconBaseData(cloneOpts, manifest);
  if (baseIcon) {
    return baseIcon.map((base) => {
      var _a;
      const cloneIcon2 = isFolder(cloneOpts) ? getFolderIconCloneData(base, cloneOpts, hash, subFolder, ext) : getFileIconCloneData(base, cloneOpts, hash, subFolder, ext);
      return {
        name: getIconName(cloneOpts.name, base),
        color: isDark(base) ? cloneOpts.color : (_a = cloneOpts.lightColor) != null ? _a : cloneOpts.color,
        inConfigPath: `${iconFolderPath}${subFolder}${(0, import_node_path6.basename)(
          cloneIcon2.path
        )}`,
        base,
        ...cloneIcon2
      };
    });
  }
};
var getFileIconBaseData = (cloneOpts, manifest) => {
  var _a, _b, _c, _d;
  const icons = [];
  const base = (_b = (_a = manifest.iconDefinitions) == null ? void 0 : _a[`${cloneOpts.base}`]) == null ? void 0 : _b.iconPath;
  let light = (_d = (_c = manifest.iconDefinitions) == null ? void 0 : _c[`${cloneOpts.base}${lightColorFileEnding}`]) == null ? void 0 : _d.iconPath;
  if (cloneOpts.lightColor && !light) {
    light = base;
  }
  if (base) {
    icons.push({
      type: 1 /* File */,
      variant: 0 /* Base */,
      path: resolvePath(base)
    });
    light && icons.push({
      type: 1 /* File */,
      variant: 2 /* Light */,
      path: resolvePath(light)
    });
    return icons;
  }
};
var getFileIconCloneData = (base, cloneOpts, hash, subFolder, ext = ".svg") => {
  const name = getIconName(cloneOpts.name, base);
  const clonePath = (0, import_node_path6.join)((0, import_node_path6.dirname)(base.path), subFolder, `${name}${hash}${ext}`);
  return {
    variant: base.variant,
    type: base.type,
    path: clonePath
  };
};
var getFolderIconBaseData = (clone, manifest) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const icons = [];
  const folderBase = clone.base === "folder" ? "folder" : clone.base.startsWith("folder-") ? clone.base : `folder-${clone.base}`;
  const base = (_b = (_a = manifest.iconDefinitions) == null ? void 0 : _a[`${folderBase}`]) == null ? void 0 : _b.iconPath;
  const open = (_d = (_c = manifest.iconDefinitions) == null ? void 0 : _c[`${folderBase}${openedFolder}`]) == null ? void 0 : _d.iconPath;
  let light = (_f = (_e = manifest.iconDefinitions) == null ? void 0 : _e[`${folderBase}${lightColorFileEnding}`]) == null ? void 0 : _f.iconPath;
  let lightOpen = (_h = (_g = manifest.iconDefinitions) == null ? void 0 : _g[`${folderBase}${openedFolder}${lightColorFileEnding}`]) == null ? void 0 : _h.iconPath;
  if (base && open) {
    icons.push({
      type: 0 /* Folder */,
      variant: 0 /* Base */,
      path: resolvePath(base)
    });
    icons.push({
      type: 0 /* Folder */,
      variant: 1 /* Open */,
      path: resolvePath(open)
    });
    if (clone.lightColor && (!light || !lightOpen)) {
      light = base;
      lightOpen = open;
    }
    if (light) {
      icons.push({
        type: 0 /* Folder */,
        variant: 2 /* Light */,
        path: resolvePath(light)
      });
    }
    if (lightOpen) {
      icons.push({
        type: 0 /* Folder */,
        variant: 3 /* LightOpen */,
        path: resolvePath(lightOpen)
      });
    }
    return icons;
  }
};
var getFolderIconCloneData = (base, cloneOpts, hash, subFolder, ext = ".svg") => {
  const name = getIconName(cloneOpts.name, base);
  const path = (0, import_node_path6.join)((0, import_node_path6.dirname)(base.path), subFolder, `${name}${hash}${ext}`);
  return { type: base.type, variant: base.variant, path };
};
var clearCloneFolder = async (keep = true) => {
  const clonesFolderPath = resolvePath("./../icons/clones");
  if ((0, import_node_fs.existsSync)(clonesFolderPath)) {
    await (0, import_promises4.rm)(clonesFolderPath, { recursive: true });
  }
  if (keep) {
    await (0, import_promises4.mkdir)(clonesFolderPath);
  }
};
var getIconName = (baseName, data) => {
  let prefix = "";
  let suffix = "";
  if (data.type === 0 /* Folder */) {
    prefix = baseName === "folder" ? "" : baseName.startsWith("folder-") ? "" : "folder-";
    switch (data.variant) {
      case 0 /* Base */:
        break;
      case 1 /* Open */:
        suffix = openedFolder;
        break;
      case 2 /* Light */:
        suffix = lightColorFileEnding;
        break;
      case 3 /* LightOpen */:
        suffix = `${openedFolder}${lightColorFileEnding}`;
        break;
    }
  } else {
    suffix = data.variant === 2 /* Light */ ? lightColorFileEnding : "";
  }
  return `${prefix}${baseName}${suffix}`;
};

// src/core/generator/clones/utils/cloning.ts
var import_promises5 = require("fs/promises");
var import_svgson2 = __toESM(require_svgson_cjs());

// src/core/models/manifest.ts
var createEmptyManifest = () => ({
  iconDefinitions: {},
  folderNames: {},
  folderNamesExpanded: {},
  fileExtensions: {},
  fileNames: {},
  languageIds: {},
  light: {
    fileExtensions: {},
    fileNames: {}
  },
  highContrast: {
    fileExtensions: {},
    fileNames: {}
  }
});

// src/core/generator/clones/utils/color/colors.ts
var import_chroma_js2 = __toESM(require_chroma());
var import_svgson = __toESM(require_svgson_cjs());

// src/core/generator/clones/utils/color/materialPalette.ts
var import_chroma_js = __toESM(require_chroma());
var materialPalette = {
  white: "#FFFFFF",
  black: "#000000",
  "red-50": "#FFEBEE",
  "red-100": "#FFCDD2",
  "red-200": "#EF9A9A",
  "red-300": "#E57373",
  "red-400": "#EF5350",
  "red-500": "#F44336",
  "red-600": "#E53935",
  "red-700": "#D32F2F",
  "red-800": "#C62828",
  "red-900": "#B71C1C",
  "red-A100": "#FF8A80",
  "red-A200": "#FF5252",
  "red-A400": "#FF1744",
  "red-A700": "#D50000",
  "pink-50": "#FCE4EC",
  "pink-100": "#F8BBD0",
  "pink-200": "#F48FB1",
  "pink-300": "#F06292",
  "pink-400": "#EC407A",
  "pink-500": "#E91E63",
  "pink-600": "#D81B60",
  "pink-700": "#C2185B",
  "pink-800": "#AD1457",
  "pink-900": "#880E4F",
  "pink-A100": "#FF80AB",
  "pink-A200": "#FF4081",
  "pink-A400": "#F50057",
  "pink-A700": "#C51162",
  "purple-50": "#F3E5F5",
  "purple-100": "#E1BEE7",
  "purple-200": "#CE93D8",
  "purple-300": "#BA68C8",
  "purple-400": "#AB47BC",
  "purple-500": "#9C27B0",
  "purple-600": "#8E24AA",
  "purple-700": "#7B1FA2",
  "purple-800": "#6A1B9A",
  "purple-900": "#4A148C",
  "purple-A100": "#EA80FC",
  "purple-A200": "#E040FB",
  "purple-A400": "#D500F9",
  "purple-A700": "#AA00FF",
  "deep-purple-50": "#EDE7F6",
  "deep-purple-100": "#D1C4E9",
  "deep-purple-200": "#B39DDB",
  "deep-purple-300": "#9575CD",
  "deep-purple-400": "#7E57C2",
  "deep-purple-500": "#673AB7",
  "deep-purple-600": "#5E35B1",
  "deep-purple-700": "#512DA8",
  "deep-purple-800": "#4527A0",
  "deep-purple-900": "#311B92",
  "deep-purple-A100": "#B388FF",
  "deep-purple-A200": "#7C4DFF",
  "deep-purple-A400": "#651FFF",
  "deep-purple-A700": "#6200EA",
  "indigo-50": "#E8EAF6",
  "indigo-100": "#C5CAE9",
  "indigo-200": "#9FA8DA",
  "indigo-300": "#7986CB",
  "indigo-400": "#5C6BC0",
  "indigo-500": "#3F51B5",
  "indigo-600": "#3949AB",
  "indigo-700": "#303F9F",
  "indigo-800": "#283593",
  "indigo-900": "#1A237E",
  "indigo-A100": "#8C9EFF",
  "indigo-A200": "#536DFE",
  "indigo-A400": "#3D5AFE",
  "indigo-A700": "#304FFE",
  "blue-50": "#E3F2FD",
  "blue-100": "#BBDEFB",
  "blue-200": "#90CAF9",
  "blue-300": "#64B5F6",
  "blue-400": "#42A5F5",
  "blue-500": "#2196F3",
  "blue-600": "#1E88E5",
  "blue-700": "#1976D2",
  "blue-800": "#1565C0",
  "blue-900": "#0D47A1",
  "blue-A100": "#82B1FF",
  "blue-A200": "#448AFF",
  "blue-A400": "#2979FF",
  "blue-A700": "#2962FF",
  "light-blue-50": "#E1F5FE",
  "light-blue-100": "#B3E5FC",
  "light-blue-200": "#81D4FA",
  "light-blue-300": "#4FC3F7",
  "light-blue-400": "#29B6F6",
  "light-blue-500": "#03A9F4",
  "light-blue-600": "#039BE5",
  "light-blue-700": "#0288D1",
  "light-blue-800": "#0277BD",
  "light-blue-900": "#01579B",
  "light-blue-A100": "#80D8FF",
  "light-blue-A200": "#40C4FF",
  "light-blue-A400": "#00B0FF",
  "light-blue-A700": "#0091EA",
  "cyan-50": "#E0F7FA",
  "cyan-100": "#B2EBF2",
  "cyan-200": "#80DEEA",
  "cyan-300": "#4DD0E1",
  "cyan-400": "#26C6DA",
  "cyan-500": "#00BCD4",
  "cyan-600": "#00ACC1",
  "cyan-700": "#0097A7",
  "cyan-800": "#00838F",
  "cyan-900": "#006064",
  "cyan-A100": "#84FFFF",
  "cyan-A200": "#18FFFF",
  "cyan-A400": "#00E5FF",
  "cyan-A700": "#00B8D4",
  "teal-50": "#E0F2F1",
  "teal-100": "#B2DFDB",
  "teal-200": "#80CBC4",
  "teal-300": "#4DB6AC",
  "teal-400": "#26A69A",
  "teal-500": "#009688",
  "teal-600": "#00897B",
  "teal-700": "#00796B",
  "teal-800": "#00695C",
  "teal-900": "#004D40",
  "teal-A100": "#A7FFEB",
  "teal-A200": "#64FFDA",
  "teal-A400": "#1DE9B6",
  "teal-A700": "#00BFA5",
  "green-50": "#E8F5E9",
  "green-100": "#C8E6C9",
  "green-200": "#A5D6A7",
  "green-300": "#81C784",
  "green-400": "#66BB6A",
  "green-500": "#4CAF50",
  "green-600": "#43A047",
  "green-700": "#388E3C",
  "green-800": "#2E7D32",
  "green-900": "#1B5E20",
  "green-A100": "#B9F6CA",
  "green-A200": "#69F0AE",
  "green-A400": "#00E676",
  "green-A700": "#00C853",
  "light-green-50": "#F1F8E9",
  "light-green-100": "#DCEDC8",
  "light-green-200": "#C5E1A5",
  "light-green-300": "#AED581",
  "light-green-400": "#9CCC65",
  "light-green-500": "#8BC34A",
  "light-green-600": "#7CB342",
  "light-green-700": "#689F38",
  "light-green-800": "#558B2F",
  "light-green-900": "#33691E",
  "light-green-A100": "#CCFF90",
  "light-green-A200": "#B2FF59",
  "light-green-A400": "#76FF03",
  "light-green-A700": "#64DD17",
  "lime-50": "#F9FBE7",
  "lime-100": "#F0F4C3",
  "lime-200": "#E6EE9C",
  "lime-300": "#DCE775",
  "lime-400": "#D4E157",
  "lime-500": "#CDDC39",
  "lime-600": "#C0CA33",
  "lime-700": "#AFB42B",
  "lime-800": "#9E9D24",
  "lime-900": "#827717",
  "lime-A100": "#F4FF81",
  "lime-A200": "#EEFF41",
  "lime-A400": "#C6FF00",
  "lime-A700": "#AEEA00",
  "yellow-50": "#FFFDE7",
  "yellow-100": "#FFF9C4",
  "yellow-200": "#FFF59D",
  "yellow-300": "#FFF176",
  "yellow-400": "#FFEE58",
  "yellow-500": "#FFEB3B",
  "yellow-600": "#FDD835",
  "yellow-700": "#FBC02D",
  "yellow-800": "#F9A825",
  "yellow-900": "#F57F17",
  "yellow-A100": "#FFFF8D",
  "yellow-A200": "#FFFF00",
  "yellow-A400": "#FFEA00",
  "yellow-A700": "#FFD600",
  "amber-50": "#FFF8E1",
  "amber-100": "#FFECB3",
  "amber-200": "#FFE082",
  "amber-300": "#FFD54F",
  "amber-400": "#FFCA28",
  "amber-500": "#FFC107",
  "amber-600": "#FFB300",
  "amber-700": "#FFA000",
  "amber-800": "#FF8F00",
  "amber-900": "#FF6F00",
  "amber-A100": "#FFE57F",
  "amber-A200": "#FFD740",
  "amber-A400": "#FFC400",
  "amber-A700": "#FFAB00",
  "orange-50": "#FFF3E0",
  "orange-100": "#FFE0B2",
  "orange-200": "#FFCC80",
  "orange-300": "#FFB74D",
  "orange-400": "#FFA726",
  "orange-500": "#FF9800",
  "orange-600": "#FB8C00",
  "orange-700": "#F57C00",
  "orange-800": "#EF6C00",
  "orange-900": "#E65100",
  "orange-A100": "#FFD180",
  "orange-A200": "#FFAB40",
  "orange-A400": "#FF9100",
  "orange-A700": "#FF6D00",
  "deep-orange-50": "#FBE9E7",
  "deep-orange-100": "#FFCCBC",
  "deep-orange-200": "#FFAB91",
  "deep-orange-300": "#FF8A65",
  "deep-orange-400": "#FF7043",
  "deep-orange-500": "#FF5722",
  "deep-orange-600": "#F4511E",
  "deep-orange-700": "#E64A19",
  "deep-orange-800": "#D84315",
  "deep-orange-900": "#BF360C",
  "deep-orange-A100": "#FF9E80",
  "deep-orange-A200": "#FF6E40",
  "deep-orange-A400": "#FF3D00",
  "deep-orange-A700": "#DD2C00",
  "brown-50": "#EFEBE9",
  "brown-100": "#D7CCC8",
  "brown-200": "#BCAAA4",
  "brown-300": "#A1887F",
  "brown-400": "#8D6E63",
  "brown-500": "#795548",
  "brown-600": "#6D4C41",
  "brown-700": "#5D4037",
  "brown-800": "#4E342E",
  "brown-900": "#3E2723",
  "gray-50": "#FAFAFA",
  "gray-100": "#F5F5F5",
  "gray-200": "#EEEEEE",
  "gray-300": "#E0E0E0",
  "gray-400": "#BDBDBD",
  "gray-500": "#9E9E9E",
  "gray-600": "#757575",
  "gray-700": "#616161",
  "gray-800": "#424242",
  "gray-900": "#212121",
  "blue-gray-50": "#ECEFF1",
  "blue-gray-100": "#CFD8DC",
  "blue-gray-200": "#B0BEC5",
  "blue-gray-300": "#90A4AE",
  "blue-gray-400": "#78909C",
  "blue-gray-500": "#607D8B",
  "blue-gray-600": "#546E7A",
  "blue-gray-700": "#455A64",
  "blue-gray-800": "#37474F",
  "blue-gray-900": "#263238"
};
var getMaterialColorByKey = (key) => {
  if (key in materialPalette) {
    return materialPalette[key];
  }
  return void 0;
};
var closerMaterialColorTo = (color) => {
  const palette = Object.values(materialPalette);
  if (!isValidColor(color)) {
    throw new Error(`The given color "${color}" is not valid!`);
  }
  color = (0, import_chroma_js.default)(color).hex();
  const distances = palette.map((paletteColor) => ({
    // calculate the distance between the color and the palette color
    distance: (0, import_chroma_js.deltaE)(paletteColor, color),
    color: paletteColor
  })).sort((a, b) => a.distance - b.distance);
  return distances[0].color;
};

// src/core/generator/clones/utils/color/colors.ts
var getColorList = (node) => {
  const colors = /* @__PURE__ */ new Set();
  traverse(node, (node2) => {
    const style = getStyle(node2);
    if (style) {
      if (style.fill && isValidColor(style.fill)) {
        colors.add(style.fill);
      }
      if (style.stroke && isValidColor(style.stroke)) {
        colors.add(style.stroke);
      }
    }
    if (node2.attributes) {
      if (node2.attributes.fill && isValidColor(node2.attributes.fill)) {
        colors.add(node2.attributes.fill);
      }
      if (node2.attributes.stroke && isValidColor(node2.attributes.stroke)) {
        colors.add(node2.attributes.stroke);
      }
      if (node2.attributes["stop-color"] && isValidColor(node2.attributes["stop-color"])) {
        colors.add(node2.attributes["stop-color"]);
      }
    }
  });
  return colors;
};
var orderDarkToLight = (colors) => {
  const colorArray = Array.from(colors);
  return colorArray.sort((a, b) => {
    const lA = (0, import_chroma_js2.default)(a).get("hsl.l");
    const lB = (0, import_chroma_js2.default)(b).get("hsl.l");
    if (lA < lB) {
      return -1;
    } else if (lA > lB) {
      return 1;
    } else {
      return 0;
    }
  });
};
var lighten = (color, hslPercent) => color.set("hsl.l", color.get("hsl.l") + hslPercent);
var isValidColor = (color) => {
  if (color === void 0) {
    return false;
  }
  return (0, import_chroma_js2.valid)(color);
};
var replacementMap = (baseColor, colors) => {
  if (!isValidColor(baseColor)) {
    const matCol = getMaterialColorByKey(baseColor);
    if (matCol === void 0) {
      throw new Error(`Invalid color: ${baseColor}`);
    }
    baseColor = matCol;
  }
  const orderedColors = orderDarkToLight(colors);
  const baseColorChroma = (0, import_chroma_js2.default)(baseColor);
  const baseHue = baseColorChroma.get("hsl.h");
  const replacement = /* @__PURE__ */ new Map();
  replacement.set(orderedColors[0], baseColor);
  let latestColor = baseColorChroma;
  for (let i = 1; i < orderedColors.length; i++) {
    const color = (0, import_chroma_js2.default)(orderedColors[i]);
    let newColor = color.set("hsl.h", baseHue);
    if (newColor.luminance() < latestColor.luminance()) {
      newColor = newColor.set("hsl.l", latestColor.get("hsl.l"));
      newColor = lighten(newColor, 0.1);
    }
    const matCol = closerMaterialColorTo(newColor.hex());
    latestColor = (0, import_chroma_js2.default)(matCol);
    replacement.set(orderedColors[i], matCol);
  }
  return replacement;
};

// src/core/generator/clones/utils/cloning.ts
var traverse = (node, callback, filter = true) => {
  if (node.attributes["data-mit-no-recolor"] !== "true" || !filter) {
    callback(node);
    if (node.children) {
      node.children.forEach((child) => traverse(child, callback, filter));
    }
  }
};
var readIcon = async (path, hash) => {
  try {
    return await (0, import_promises5.readFile)(path, "utf8");
  } catch {
    const unhashedPath = path.replace(hash, "");
    return await (0, import_promises5.readFile)(unhashedPath, "utf8");
  }
};
var cloneIcon = async (path, color, hash = "") => {
  const baseContent = await readIcon(path, hash);
  const svg = await (0, import_svgson2.parse)(baseContent);
  const replacements = replacementMap(color, getColorList(svg));
  replaceColors(svg, replacements);
  return (0, import_svgson2.stringify)(svg);
};
var getStyle = (node) => {
  if (node && node.attributes && node.attributes.style) {
    return parseStyle(node.attributes.style);
  }
  return {};
};
var parseStyle = (css) => {
  const rules = css.split(";");
  const result = {};
  rules.forEach((rule) => {
    const [key, value] = rule.split(":");
    result[key.trim()] = value.trim();
  });
  return result;
};
var stringifyStyle = (css) => {
  return Object.entries(css).map(([key, value]) => `${key}:${value}`).join(";");
};
var replaceColors = (node, replacements) => {
  traverse(node, (node2) => {
    const style = getStyle(node2);
    if (style) {
      if (style.fill && replacements.has(style.fill)) {
        style.fill = replacements.get(style.fill);
        node2.attributes.style = stringifyStyle(style);
      }
      if (style.stroke && replacements.has(style.stroke)) {
        style.stroke = replacements.get(style.stroke);
        node2.attributes.style = stringifyStyle(style);
      }
    }
    if (node2.attributes) {
      if (node2.attributes.fill && replacements.has(node2.attributes.fill)) {
        node2.attributes.fill = replacements.get(node2.attributes.fill);
      }
      if (node2.attributes.stroke && replacements.has(node2.attributes.stroke)) {
        node2.attributes.stroke = replacements.get(node2.attributes.stroke);
      }
      if (node2.attributes["stop-color"] && replacements.has(node2.attributes["stop-color"])) {
        node2.attributes["stop-color"] = replacements.get(
          node2.attributes["stop-color"]
        );
      }
    }
  });
};
var createCloneConfig = () => {
  const manifest = createEmptyManifest();
  manifest.light = {
    fileExtensions: {},
    fileNames: {},
    folderNames: {},
    folderNamesExpanded: {}
  };
  return manifest;
};

// src/core/generator/clones/clonesGenerator.ts
var customClonesIcons = async (manifest, config) => {
  var _a, _b, _c, _d;
  let clonedIconsManifest = merge({}, manifest);
  const hash = getFileConfigHash(config);
  for (const clone of (_b = (_a = config.folders) == null ? void 0 : _a.customClones) != null ? _b : []) {
    const cloneCfg = await createIconClone(clone, manifest, hash);
    clonedIconsManifest = merge(clonedIconsManifest, cloneCfg);
  }
  for (const clone of (_d = (_c = config.files) == null ? void 0 : _c.customClones) != null ? _d : []) {
    const cloneCfg = await createIconClone(clone, manifest, hash);
    clonedIconsManifest = merge(clonedIconsManifest, cloneCfg);
  }
  return clonedIconsManifest;
};
var hasCustomClones = (config) => {
  var _a, _b, _c, _d, _e, _f;
  return ((_c = (_b = (_a = config.folders) == null ? void 0 : _a.customClones) == null ? void 0 : _b.length) != null ? _c : 0) > 0 || ((_f = (_e = (_d = config.files) == null ? void 0 : _d.customClones) == null ? void 0 : _e.length) != null ? _f : 0) > 0;
};
var createIconClone = async (cloneOpts, manifest, hash) => {
  var _a, _b, _c;
  const clones = getCloneData(cloneOpts, manifest, clonesFolder, hash);
  if (!clones) {
    return manifest;
  }
  const clonesConfig = createCloneConfig();
  for (const clone of clones) {
    try {
      const content = await cloneIcon(clone.base.path, clone.color, hash);
      try {
        await writeToFile(clone.path, content);
      } catch (error) {
        logger.error(error);
        return manifest;
      }
      clonesConfig.iconDefinitions[clone.name] = {
        iconPath: clone.inConfigPath
      };
      if (isFolder(cloneOpts)) {
        (_a = cloneOpts.folderNames) == null ? void 0 : _a.forEach((folderName) => {
          const folderNamesCfg = clone.variant === 0 /* Base */ ? clonesConfig.folderNames : clone.variant === 1 /* Open */ ? clonesConfig.folderNamesExpanded : clone.variant === 2 /* Light */ ? clonesConfig.light.folderNames : clonesConfig.light.folderNamesExpanded;
          folderNamesCfg[folderName] = clone.name;
        });
      } else {
        (_b = cloneOpts.fileNames) == null ? void 0 : _b.forEach((fileName) => {
          const fileNamesCfg = clone.variant === 0 /* Base */ ? clonesConfig.fileNames : clonesConfig.light.fileNames;
          fileNamesCfg[fileName] = clone.name;
        });
        (_c = cloneOpts.fileExtensions) == null ? void 0 : _c.forEach((fileExtension) => {
          const fileExtensionsCfg = clone.variant === 0 /* Base */ ? clonesConfig.fileExtensions : clonesConfig.light.fileExtensions;
          fileExtensionsCfg[fileExtension] = clone.name;
        });
      }
    } catch (error) {
      logger.error(error);
    }
  }
  return clonesConfig;
};

// src/core/models/icons/iconPack.ts
var IconPack = /* @__PURE__ */ ((IconPack2) => {
  IconPack2["Angular"] = "angular";
  IconPack2["Nest"] = "nest";
  IconPack2["Ngrx"] = "angular_ngrx";
  IconPack2["React"] = "react";
  IconPack2["Redux"] = "react_redux";
  IconPack2["Qwik"] = "qwik";
  IconPack2["Vue"] = "vue";
  IconPack2["Vuex"] = "vue_vuex";
  return IconPack2;
})(IconPack || {});

// src/core/patterns/patterns.ts
var mapPatterns = (patterns) => {
  return Object.entries(patterns).flatMap(([fileName, pattern]) => {
    switch (pattern) {
      case "ecmascript" /* Ecmascript */:
        return [
          `${fileName}.js`,
          `${fileName}.mjs`,
          `${fileName}.cjs`,
          `${fileName}.ts`,
          `${fileName}.mts`,
          `${fileName}.cts`
        ];
      case "configuration" /* Configuration */:
        return [
          `${fileName}.json`,
          `${fileName}.jsonc`,
          `${fileName}.json5`,
          `${fileName}.yaml`,
          `${fileName}.yml`,
          `${fileName}.toml`
        ];
      case "nodeEcosystem" /* NodeEcosystem */:
        return [
          `${fileName}.js`,
          `${fileName}.mjs`,
          `${fileName}.cjs`,
          `${fileName}.ts`,
          `${fileName}.mts`,
          `${fileName}.cts`,
          `${fileName}.json`,
          `${fileName}.jsonc`,
          `${fileName}.json5`,
          `${fileName}.yaml`,
          `${fileName}.yml`,
          `${fileName}.toml`
        ];
      case "cosmiconfig" /* Cosmiconfig */:
        return [
          `.${fileName}rc`,
          `.${fileName}rc.json`,
          `.${fileName}rc.jsonc`,
          `.${fileName}rc.json5`,
          `.${fileName}rc.yaml`,
          `.${fileName}rc.yml`,
          `.${fileName}rc.toml`,
          `.${fileName}rc.js`,
          `.${fileName}rc.mjs`,
          `.${fileName}rc.cjs`,
          `.${fileName}rc.ts`,
          `.${fileName}rc.mts`,
          `.${fileName}rc.cts`,
          `.config/${fileName}rc`,
          `.config/${fileName}rc.json`,
          `.config/${fileName}rc.jsonc`,
          `.config/${fileName}rc.json5`,
          `.config/${fileName}rc.yaml`,
          `.config/${fileName}rc.yml`,
          `.config/${fileName}rc.toml`,
          `.config/${fileName}rc.js`,
          `.config/${fileName}rc.mjs`,
          `.config/${fileName}rc.cjs`,
          `.config/${fileName}rc.ts`,
          `.config/${fileName}rc.mts`,
          `.config/${fileName}rc.cts`,
          `${fileName}.config.json`,
          `${fileName}.config.jsonc`,
          `${fileName}.config.json5`,
          `${fileName}.config.yaml`,
          `${fileName}.config.yml`,
          `${fileName}.config.toml`,
          `${fileName}.config.js`,
          `${fileName}.config.mjs`,
          `${fileName}.config.cjs`,
          `${fileName}.config.ts`,
          `${fileName}.config.mts`,
          `${fileName}.config.cts`
        ];
      default:
        const exhaustiveCheck = pattern;
        throw new Error(`Unhandled pattern: ${exhaustiveCheck}`);
    }
  });
};
var parseByPattern = (rawFileIcons) => {
  return rawFileIcons.map(({ patterns, fileNames = [], ...rest }) => ({
    ...rest,
    fileNames: patterns ? [...mapPatterns(patterns), ...fileNames] : fileNames
  }));
};

// src/core/icons/fileIcons.ts
var fileIcons = {
  defaultIcon: { name: "file" },
  icons: parseByPattern([
    { name: "html", fileExtensions: ["htm", "xhtml", "html_vm", "asp"] },
    {
      name: "pug",
      fileExtensions: ["jade", "pug"],
      fileNames: [".pug-lintrc", ".pug-lintrc.js", ".pug-lintrc.json"]
    },
    {
      name: "markdown",
      fileExtensions: ["md", "markdown", "rst"]
    },
    { name: "blink", fileExtensions: ["blink"], light: true },
    { name: "css", fileExtensions: ["css"] },
    { name: "sass", fileExtensions: ["scss", "sass"] },
    { name: "less", fileExtensions: ["less"] },
    {
      name: "json",
      fileExtensions: [
        "json",
        "jsonc",
        "tsbuildinfo",
        "json5",
        "jsonl",
        "ndjson"
      ],
      fileNames: [
        ".jscsrc",
        ".jshintrc",
        "composer.lock",
        ".jsbeautifyrc",
        ".esformatter",
        "cdp.pid",
        ".lintstagedrc",
        ".whitesource"
      ]
    },
    {
      name: "hjson",
      fileExtensions: ["hjson"]
    },
    {
      name: "jinja",
      fileExtensions: ["jinja", "jinja2", "j2", "jinja-html"],
      light: true
    },
    { name: "proto", fileExtensions: ["proto"] },
    {
      name: "playwright",
      fileNames: [
        "playwright.config.js",
        "playwright.config.mjs",
        "playwright.config.ts",
        "playwright.config.base.js",
        "playwright.config.base.mjs",
        "playwright.config.base.ts",
        "playwright-ct.config.js",
        "playwright-ct.config.mjs",
        "playwright-ct.config.ts"
      ]
    },
    {
      name: "sublime",
      fileExtensions: ["sublime-project", "sublime-workspace"]
    },
    { name: "twine", fileExtensions: ["tw", "twee"] },
    {
      name: "yaml",
      fileExtensions: ["yml.dist", "yaml.dist", "YAML-tmLanguage"]
    },
    {
      name: "xml",
      fileExtensions: [
        "xml",
        "plist",
        "xsd",
        "dtd",
        "xsl",
        "xslt",
        "resx",
        "iml",
        "xquery",
        "tmLanguage",
        "manifest",
        "project",
        "xml.dist",
        "xml.dist.sample",
        "dmn",
        "jrxml"
      ],
      fileNames: [".htaccess"]
    },
    {
      name: "image",
      fileExtensions: [
        "png",
        "jpeg",
        "jpg",
        "gif",
        "ico",
        "tif",
        "tiff",
        "psd",
        "psb",
        "ami",
        "apx",
        "avif",
        "bmp",
        "bpg",
        "brk",
        "cur",
        "dds",
        "dng",
        "exr",
        "fpx",
        "gbr",
        "img",
        "jbig2",
        "jb2",
        "jng",
        "jxr",
        "pgf",
        "pic",
        "raw",
        "webp",
        "eps",
        "afphoto",
        "ase",
        "aseprite",
        "clip",
        "cpt",
        "heif",
        "heic",
        "kra",
        "mdp",
        "ora",
        "pdn",
        "reb",
        "sai",
        "tga",
        "xcf",
        "jfif",
        "ppm",
        "pbm",
        "pgm",
        "pnm",
        "icns"
      ]
    },
    { name: "javascript", fileExtensions: ["esx", "mjs"] },
    { name: "react", fileExtensions: ["jsx"] },
    { name: "react_ts", fileExtensions: ["tsx"] },
    {
      name: "routing",
      fileExtensions: [
        "routing.ts",
        "routing.tsx",
        "routing.js",
        "routing.jsx",
        "routes.ts",
        "routes.tsx",
        "routes.js",
        "routes.jsx"
      ],
      fileNames: [
        "router.js",
        "router.jsx",
        "router.ts",
        "router.tsx",
        "routes.js",
        "routes.jsx",
        "routes.ts",
        "routes.tsx"
      ],
      enabledFor: [
        "angular" /* Angular */,
        "angular_ngrx" /* Ngrx */,
        "react" /* React */,
        "react_redux" /* Redux */,
        "vue" /* Vue */,
        "vue_vuex" /* Vuex */
      ]
    },
    {
      name: "redux-action",
      fileExtensions: ["action.js", "actions.js", "action.ts", "actions.ts"],
      fileNames: ["action.js", "actions.js", "action.ts", "actions.ts"],
      enabledFor: ["react_redux" /* Redux */]
    },
    {
      name: "redux-reducer",
      fileExtensions: [
        "reducer.js",
        "reducers.js",
        "reducer.ts",
        "reducers.ts"
      ],
      fileNames: ["reducer.js", "reducers.js", "reducer.ts", "reducers.ts"],
      enabledFor: ["react_redux" /* Redux */]
    },
    {
      name: "redux-selector",
      fileExtensions: [
        "selector.js",
        "selectors.js",
        "selector.ts",
        "selectors.ts"
      ],
      fileNames: ["selector.js", "selectors.js", "selector.ts", "selectors.ts"],
      enabledFor: ["react_redux" /* Redux */]
    },
    {
      name: "redux-store",
      fileExtensions: ["store.js", "store.ts"],
      fileNames: ["store.js", "store.ts"],
      enabledFor: ["react_redux" /* Redux */]
    },
    {
      name: "settings",
      fileExtensions: [
        "ini",
        "dlc",
        "config",
        "conf",
        "properties",
        "prop",
        "settings",
        "option",
        "props",
        "toml",
        "prefs",
        "sln.dotsettings",
        "sln.dotsettings.user",
        "cfg",
        "cnf"
      ],
      fileNames: [
        ".jshintignore",
        ".buildignore",
        ".mrconfig",
        ".yardopts",
        "manifest.mf",
        ".clang-format",
        ".clang-tidy",
        ".conf"
      ]
    },
    {
      name: "typescript-def",
      fileExtensions: ["d.ts", "d.cts", "d.mts"]
    },
    { name: "markojs", fileExtensions: ["marko"] },
    {
      name: "astro",
      fileExtensions: ["astro"]
    },
    {
      name: "astro-config",
      fileNames: [
        "astro.config.js",
        "astro.config.mjs",
        "astro.config.cjs",
        "astro.config.ts",
        "astro.config.cts",
        "astro.config.mts"
      ]
    },
    { name: "pdf", fileExtensions: ["pdf"] },
    {
      name: "table",
      fileExtensions: ["xlsx", "xlsm", "xls", "csv", "tsv", "psv", "ods"]
    },
    {
      name: "vscode",
      fileExtensions: [
        "vscodeignore",
        "vsixmanifest",
        "vsix",
        "code-workplace",
        "code-workspace",
        "code-profile",
        "code-snippets"
      ]
    },
    {
      name: "visualstudio",
      fileExtensions: [
        "csproj",
        "ruleset",
        "sln",
        "slnx",
        "suo",
        "vb",
        "vbs",
        "vcxitems",
        "vcxitems.filters",
        "vcxproj",
        "vcxproj.filters"
      ]
    },
    {
      name: "database",
      fileExtensions: [
        "pdb",
        "sql",
        "pks",
        "pkb",
        "accdb",
        "mdb",
        "sqlite",
        "sqlite3",
        "pgsql",
        "postgres",
        "plpgsql",
        "psql",
        "db",
        "db3",
        "dblite",
        "dblite3",
        "debugsymbols"
      ]
    },
    { name: "kusto", fileExtensions: ["kql"] },
    { name: "csharp", fileExtensions: ["cs", "csx", "csharp"] },
    { name: "qsharp", fileExtensions: ["qs"] },
    {
      name: "zip",
      fileExtensions: [
        "zip",
        "tar",
        "gz",
        "xz",
        "lzma",
        "lz4",
        "br",
        "bz2",
        "bzip2",
        "gzip",
        "brotli",
        "7z",
        "rar",
        "tz",
        "txz",
        "tgz",
        "zst"
      ]
    },
    { name: "vala", fileExtensions: ["vala"] },
    { name: "zig", fileExtensions: ["zig", "zon"] },
    { name: "exe", fileExtensions: ["exe", "msi"] },
    { name: "hex", fileExtensions: ["dat", "bin", "hex"] },
    { name: "java", fileExtensions: ["java", "jsp"] },
    { name: "jar", fileExtensions: ["jar"] },
    { name: "javaclass", fileExtensions: ["class"] },
    { name: "c", fileExtensions: ["c", "i", "mi"] },
    { name: "h", fileExtensions: ["h"] },
    {
      name: "cpp",
      fileExtensions: ["cc", "cpp", "cxx", "c++", "cp", "mii", "ii"]
    },
    {
      name: "hpp",
      fileExtensions: ["hh", "hpp", "hxx", "h++", "hp", "tcc", "inl"]
    },
    { name: "rc", fileExtensions: ["rc"] },
    { name: "go", fileExtensions: ["go"] },
    {
      name: "go-mod",
      fileNames: ["go.mod", "go.sum", "go.work", "go.work.sum"]
    },
    { name: "python", fileExtensions: ["py"] },
    {
      name: "python-misc",
      fileExtensions: ["pyc", "whl"],
      fileNames: [
        "requirements.txt",
        "pipfile",
        ".python-version",
        "manifest.in",
        "pylintrc",
        ".pylintrc",
        "pyproject.toml",
        "py.typed"
      ]
    },
    { name: "url", fileExtensions: ["url"] },
    {
      name: "console",
      fileExtensions: [
        "sh",
        "ksh",
        "csh",
        "tcsh",
        "zsh",
        "bash",
        "bat",
        "cmd",
        "awk",
        "fish",
        "exp",
        "nu"
      ],
      fileNames: ["commit-msg", "pre-commit", "pre-push", "post-merge"]
    },
    {
      name: "powershell",
      fileExtensions: ["ps1", "psm1", "psd1", "ps1xml", "psc1", "pssc"]
    },
    {
      name: "gradle",
      fileExtensions: ["gradle"],
      fileNames: ["gradle.properties", "gradlew", "gradle-wrapper.properties"]
    },
    { name: "word", fileExtensions: ["doc", "docx", "rtf", "odt"] },
    {
      name: "certificate",
      fileExtensions: ["cer", "cert", "crt"],
      fileNames: [
        "copying",
        "copying.md",
        "copying.rst",
        "copying.txt",
        "copyright",
        "copyright.md",
        "copyright.rst",
        "copyright.txt",
        "license",
        "license-agpl",
        "license-apache",
        "license-bsd",
        "license-mit",
        "license-gpl",
        "license-lgpl",
        "license.md",
        "license.rst",
        "license.txt",
        "licence",
        "licence-agpl",
        "licence-apache",
        "licence-bsd",
        "licence-mit",
        "licence-gpl",
        "licence-lgpl",
        "licence.md",
        "licence.rst",
        "licence.txt"
      ]
    },
    {
      name: "key",
      fileExtensions: [
        "pub",
        "key",
        "pem",
        "asc",
        "gpg",
        "passwd",
        "shasum",
        "sha256",
        "sha256sum",
        "sha256sums"
      ],
      fileNames: [".htpasswd", "sha256sums", ".secrets"]
    },
    {
      name: "font",
      fileExtensions: [
        "woff",
        "woff2",
        "ttf",
        "eot",
        "suit",
        "otf",
        "bmap",
        "fnt",
        "odttf",
        "ttc",
        "font",
        "fonts",
        "sui",
        "ntf",
        "mrf"
      ]
    },
    { name: "lib", fileExtensions: ["lib", "bib", "a"] },
    { name: "dll", fileExtensions: ["dll", "ilk", "so"] },
    {
      name: "ruby",
      fileExtensions: ["rb", "erb", "rbs"],
      fileNames: [".ruby-version"]
    },
    { name: "gemfile", fileNames: ["gemfile"] },
    {
      name: "rubocop",
      fileNames: [".rubocop.yml", ".rubocop-todo.yml", ".rubocop_todo.yml"],
      light: true
    },
    { name: "rspec", fileNames: [".rspec"] },
    { name: "fsharp", fileExtensions: ["fs", "fsx", "fsi", "fsproj"] },
    { name: "swift", fileExtensions: ["swift"] },
    { name: "arduino", fileExtensions: ["ino"] },
    {
      name: "docker",
      fileExtensions: [
        "dockerignore",
        "dockerfile",
        "docker-compose.yml",
        "docker-compose.yaml",
        "containerignore",
        "containerfile",
        "compose.yaml",
        "compose.yml"
      ],
      fileNames: [
        "dockerfile",
        "dockerfile.prod",
        "dockerfile.production",
        "dockerfile.alpha",
        "dockerfile.beta",
        "dockerfile.stage",
        "dockerfile.staging",
        "dockerfile.dev",
        "dockerfile.development",
        "dockerfile.local",
        "dockerfile.test",
        "dockerfile.testing",
        "dockerfile.ci",
        "dockerfile.web",
        "dockerfile.worker",
        "docker-compose.yml",
        "docker-compose.override.yml",
        "docker-compose.prod.yml",
        "docker-compose.production.yml",
        "docker-compose.alpha.yml",
        "docker-compose.beta.yml",
        "docker-compose.stage.yml",
        "docker-compose.staging.yml",
        "docker-compose.dev.yml",
        "docker-compose.development.yml",
        "docker-compose.local.yml",
        "docker-compose.test.yml",
        "docker-compose.testing.yml",
        "docker-compose.ci.yml",
        "docker-compose.web.yml",
        "docker-compose.worker.yml",
        "docker-compose.yaml",
        "docker-compose.override.yaml",
        "docker-compose.prod.yaml",
        "docker-compose.production.yaml",
        "docker-compose.alpha.yaml",
        "docker-compose.beta.yaml",
        "docker-compose.stage.yaml",
        "docker-compose.staging.yaml",
        "docker-compose.dev.yaml",
        "docker-compose.development.yaml",
        "docker-compose.local.yaml",
        "docker-compose.test.yaml",
        "docker-compose.testing.yaml",
        "docker-compose.ci.yaml",
        "docker-compose.web.yaml",
        "docker-compose.worker.yaml",
        "containerfile",
        "containerfile.prod",
        "containerfile.production",
        "containerfile.alpha",
        "containerfile.beta",
        "containerfile.stage",
        "containerfile.staging",
        "containerfile.dev",
        "containerfile.development",
        "containerfile.local",
        "containerfile.test",
        "containerfile.testing",
        "containerfile.ci",
        "containerfile.web",
        "containerfile.worker",
        "compose.yaml",
        "compose.override.yaml",
        "compose.prod.yaml",
        "compose.production.yaml",
        "compose.alpha.yaml",
        "compose.beta.yaml",
        "compose.stage.yaml",
        "compose.staging.yaml",
        "compose.dev.yaml",
        "compose.development.yaml",
        "compose.local.yaml",
        "compose.test.yaml",
        "compose.testing.yaml",
        "compose.ci.yaml",
        "compose.web.yaml",
        "compose.worker.yaml",
        "compose.yml",
        "compose.override.yml",
        "compose.prod.yml",
        "compose.production.yml",
        "compose.alpha.yml",
        "compose.beta.yml",
        "compose.stage.yml",
        "compose.staging.yml",
        "compose.dev.yml",
        "compose.development.yml",
        "compose.local.yml",
        "compose.test.yml",
        "compose.testing.yml",
        "compose.ci.yml",
        "compose.web.yml",
        "compose.worker.yml"
      ]
    },
    { name: "tex", fileExtensions: ["tex", "sty", "dtx", "ltx"] },
    {
      name: "powerpoint",
      fileExtensions: [
        "pptx",
        "ppt",
        "pptm",
        "potx",
        "potm",
        "ppsx",
        "ppsm",
        "pps",
        "ppam",
        "ppa",
        "odp"
      ]
    },
    {
      name: "video",
      fileExtensions: [
        "webm",
        "mkv",
        "flv",
        "vob",
        "ogv",
        "ogg",
        "gifv",
        "avi",
        "mov",
        "qt",
        "wmv",
        "yuv",
        "rm",
        "rmvb",
        "mp4",
        "m4v",
        "mpg",
        "mp2",
        "mpeg",
        "mpe",
        "mpv",
        "m2v"
      ]
    },
    { name: "virtual", fileExtensions: ["vdi", "vbox", "vbox-prev"] },
    { name: "vedic", fileExtensions: ["ved", "veda", "vedic"] },
    { name: "email", fileExtensions: ["ics"], fileNames: [".mailmap"] },
    {
      name: "audio",
      fileExtensions: ["mp3", "flac", "m4a", "wma", "aiff", "wav"]
    },
    { name: "coffee", fileExtensions: ["coffee", "cson", "iced"] },
    { name: "document", fileExtensions: ["txt"] },
    {
      name: "graphql",
      fileExtensions: ["graphql", "gql"],
      fileNames: [".graphqlconfig"],
      patterns: {
        graphql: "ecmascript" /* Ecmascript */
      }
    },
    { name: "rust", fileExtensions: ["rs", "ron"] },
    { name: "raml", fileExtensions: ["raml"] },
    { name: "xaml", fileExtensions: ["xaml"] },
    { name: "haskell", fileExtensions: ["hs"] },
    { name: "kotlin", fileExtensions: ["kt", "kts"] },
    {
      name: "mist",
      fileExtensions: ["mist.js", "mist.ts", "mist.jsx", "mist.tsx"],
      clone: {
        base: "liquid",
        color: "blue-500"
      }
    },
    { name: "otne", fileExtensions: ["otne"] },
    {
      name: "git",
      fileExtensions: ["patch"],
      fileNames: [
        ".git",
        ".gitignore",
        ".gitmessage",
        ".gitignore-global",
        ".gitignore_global",
        ".gitattributes",
        ".gitattributes-global",
        ".gitattributes_global",
        ".gitconfig",
        ".gitmodules",
        ".gitkeep",
        ".keep",
        ".gitpreserve",
        ".gitinclude",
        ".git-blame-ignore",
        ".git-blame-ignore-revs",
        ".git-for-windows-updater",
        "git-history"
      ]
    },
    { name: "lua", fileExtensions: ["lua"], fileNames: [".luacheckrc"] },
    { name: "clojure", fileExtensions: ["clj", "cljs", "cljc"] },
    { name: "groovy", fileExtensions: ["groovy"] },
    { name: "r", fileExtensions: ["r", "rmd"], fileNames: [".Rhistory"] },
    { name: "dart", fileExtensions: ["dart"], fileNames: [".pubignore"] },
    { name: "dart_generated", fileExtensions: ["freezed.dart", "g.dart"] },
    { name: "actionscript", fileExtensions: ["as"] },
    { name: "mxml", fileExtensions: ["mxml"] },
    { name: "autohotkey", fileExtensions: ["ahk"] },
    { name: "flash", fileExtensions: ["swf"] },
    { name: "swc", fileExtensions: ["swc"] },
    {
      name: "cmake",
      fileExtensions: ["cmake"],
      fileNames: ["cmakelists.txt", "cmakecache.txt"]
    },
    {
      name: "assembly",
      fileExtensions: [
        "asm",
        "a51",
        "inc",
        "nasm",
        "s",
        "ms",
        "agc",
        "ags",
        "aea",
        "argus",
        "mitigus",
        "binsource"
      ]
    },
    { name: "vue", fileExtensions: ["vue"] },
    { name: "semgrep", fileNames: ["semgrep.yml", ".semgrepignore"] },
    {
      name: "vue-config",
      fileNames: [
        "vue.config.js",
        "vue.config.ts",
        "vetur.config.js",
        "vetur.config.ts",
        "volar.config.js"
      ]
    },
    {
      name: "vuex-store",
      fileExtensions: ["store.js", "store.ts"],
      fileNames: ["store.js", "store.ts"],
      enabledFor: ["vue_vuex" /* Vuex */]
    },
    {
      name: "nuxt",
      fileNames: ["nuxt.config.js", "nuxt.config.ts", ".nuxtignore", ".nuxtrc"]
    },
    {
      name: "harmonix",
      fileNames: ["harmonix.config.js", "harmonix.config.ts"]
    },
    { name: "ocaml", fileExtensions: ["ml", "mli", "cmx"] },
    { name: "odin", fileExtensions: ["odin"] },
    {
      name: "javascript-map",
      fileExtensions: ["js.map", "mjs.map", "cjs.map"]
    },
    { name: "css-map", fileExtensions: ["css.map"] },
    {
      name: "lock",
      fileExtensions: ["lock"],
      fileNames: ["security.md", "security.txt", "security"]
    },
    { name: "handlebars", fileExtensions: ["hbs", "mustache"] },
    { name: "perl", fileExtensions: ["pm", "raku"] },
    { name: "haxe", fileExtensions: ["hx"] },
    {
      name: "test-ts",
      fileExtensions: [
        "spec.ts",
        "spec.cts",
        "spec.mts",
        "cy.ts",
        "e2e-spec.ts",
        "e2e-spec.cts",
        "e2e-spec.mts",
        "test.ts",
        "test.cts",
        "test.mts",
        "ts.snap",
        "spec-d.ts",
        "test-d.ts"
      ]
    },
    {
      name: "test-jsx",
      fileExtensions: [
        "spec.tsx",
        "test.tsx",
        "tsx.snap",
        "spec.jsx",
        "test.jsx",
        "jsx.snap",
        "cy.jsx",
        "cy.tsx",
        "spec-d.tsx",
        "test-d.tsx"
      ]
    },
    {
      name: "test-js",
      fileExtensions: [
        "spec.js",
        "spec.cjs",
        "spec.mjs",
        "e2e-spec.js",
        "e2e-spec.cjs",
        "e2e-spec.mjs",
        "test.js",
        "test.cjs",
        "test.mjs",
        "js.snap",
        "cy.js"
      ]
    },
    {
      name: "angular",
      fileExtensions: ["module.ts", "module.js", "ng-template"],
      fileNames: [
        "angular-cli.json",
        ".angular-cli.json",
        "angular.json",
        "ng-package.json"
      ],
      enabledFor: ["angular" /* Angular */, "angular_ngrx" /* Ngrx */]
    },
    {
      name: "angular-component",
      clone: {
        base: "angular",
        color: "blue-700"
      },
      fileExtensions: ["component.ts", "component.js"],
      enabledFor: ["angular" /* Angular */, "angular_ngrx" /* Ngrx */]
    },
    {
      name: "angular-guard",
      clone: {
        base: "angular",
        color: "green-600"
      },
      fileExtensions: ["guard.ts", "guard.js"],
      enabledFor: ["angular" /* Angular */, "angular_ngrx" /* Ngrx */]
    },
    {
      name: "angular-service",
      clone: {
        base: "angular",
        color: "amber-400"
      },
      fileExtensions: ["service.ts", "service.js"],
      enabledFor: ["angular" /* Angular */, "angular_ngrx" /* Ngrx */]
    },
    {
      name: "angular-pipe",
      clone: {
        base: "angular",
        color: "teal-600"
      },
      fileExtensions: ["pipe.ts", "pipe.js", "filter.js"],
      enabledFor: ["angular" /* Angular */, "angular_ngrx" /* Ngrx */]
    },
    {
      name: "angular-directive",
      clone: {
        base: "angular",
        color: "purple-400"
      },
      fileExtensions: ["directive.ts", "directive.js"],
      enabledFor: ["angular" /* Angular */, "angular_ngrx" /* Ngrx */]
    },
    {
      name: "angular-resolver",
      clone: {
        base: "angular",
        color: "green-600"
      },
      fileExtensions: ["resolver.ts", "resolver.js"],
      enabledFor: ["angular" /* Angular */, "angular_ngrx" /* Ngrx */]
    },
    { name: "puppet", fileExtensions: ["pp"] },
    { name: "elixir", fileExtensions: ["ex", "exs", "eex", "leex", "heex"] },
    { name: "livescript", fileExtensions: ["ls"] },
    { name: "erlang", fileExtensions: ["erl"] },
    { name: "twig", fileExtensions: ["twig"] },
    { name: "julia", fileExtensions: ["jl"] },
    { name: "elm", fileExtensions: ["elm"] },
    { name: "purescript", fileExtensions: ["pure", "purs"] },
    { name: "smarty", fileExtensions: ["tpl"] },
    { name: "stylus", fileExtensions: ["styl"] },
    { name: "reason", fileExtensions: ["re", "rei"] },
    { name: "bucklescript", fileExtensions: ["cmj"] },
    { name: "merlin", fileExtensions: ["merlin"] },
    { name: "verilog", fileExtensions: ["vhd", "sv", "svh"] },
    { name: "mathematica", fileExtensions: ["nb"] },
    { name: "wolframlanguage", fileExtensions: ["wl", "wls"] },
    { name: "nunjucks", fileExtensions: ["njk", "nunjucks"] },
    { name: "robot", fileExtensions: ["robot"] },
    { name: "solidity", fileExtensions: ["sol"] },
    { name: "autoit", fileExtensions: ["au3"] },
    { name: "haml", fileExtensions: ["haml"] },
    { name: "yang", fileExtensions: ["yang"] },
    {
      name: "mjml",
      fileExtensions: ["mjml"],
      fileNames: [".mjmlconfig"]
    },
    {
      name: "vercel",
      fileNames: ["vercel.json", ".vercelignore", "now.json", ".nowignore"],
      light: true
    },
    {
      name: "liara",
      fileNames: ["liara.json", ".liaraignore"]
    },
    {
      name: "verdaccio",
      fileNames: ["verdaccio.yml"]
    },
    {
      name: "payload",
      fileNames: [
        "payload.config.js",
        "payload.config.mjs",
        "payload.config.ts",
        "payload.config.mts"
      ],
      light: true
    },
    {
      name: "next",
      fileNames: [
        "next.config.js",
        "next.config.mjs",
        "next.config.ts",
        "next.config.mts"
      ],
      light: true
    },
    {
      name: "remark",
      fileNames: [
        ".remarkrc",
        ".remarkrc.cjs",
        ".remarkrc.js",
        ".remarkrc.json",
        ".remarkrc.mjs",
        ".remarkrc.yaml",
        ".remarkrc.yml",
        ".remarkignore"
      ]
    },
    {
      name: "remix",
      fileNames: ["remix.config.js", "remix.config.ts"],
      light: true
    },
    {
      name: "terraform",
      fileExtensions: ["tf", "tf.json", "tfvars", "tfstate", "tfbackend"]
    },
    {
      name: "laravel",
      fileExtensions: ["blade.php", "inky.php"],
      fileNames: ["artisan"]
    },
    { name: "applescript", fileExtensions: ["applescript", "ipa"] },
    { name: "cake", fileExtensions: ["cake"] },
    { name: "cucumber", fileExtensions: ["feature", "features"] },
    { name: "nim", fileExtensions: ["nim", "nimble"] },
    { name: "apiblueprint", fileExtensions: ["apib", "apiblueprint"] },
    { name: "riot", fileExtensions: ["riot", "tag"] },
    { name: "vfl", fileExtensions: ["vfl"], fileNames: [".vfl"] },
    { name: "kl", fileExtensions: ["kl"], fileNames: [".kl"] },
    {
      name: "postcss",
      fileExtensions: ["pcss", "sss"],
      patterns: {
        postcss: "cosmiconfig" /* Cosmiconfig */
      }
    },
    {
      name: "posthtml",
      patterns: {
        posthtml: "cosmiconfig" /* Cosmiconfig */
      }
    },
    {
      name: "todo",
      fileExtensions: ["todo"],
      fileNames: ["todo.md", "todos.md"]
    },
    { name: "coldfusion", fileExtensions: ["cfml", "cfc", "lucee", "cfm"] },
    {
      name: "cabal",
      fileExtensions: ["cabal"],
      fileNames: [
        "cabal.project",
        "cabal.project.freeze",
        "cabal.project.local"
      ]
    },
    { name: "nix", fileExtensions: ["nix"] },
    { name: "slim", fileExtensions: ["slim"] },
    { name: "http", fileExtensions: ["http", "rest"], fileNames: ["CNAME"] },
    { name: "restql", fileExtensions: ["rql", "restql"] },
    { name: "kivy", fileExtensions: ["kv"] },
    {
      name: "graphcool",
      fileExtensions: ["graphcool"],
      fileNames: ["project.graphcool"]
    },
    { name: "sbt", fileExtensions: ["sbt"] },
    {
      name: "webpack",
      fileNames: ["webpack.config.coffee"],
      patterns: {
        "webpack.base": "ecmascript" /* Ecmascript */,
        "webpack.client": "ecmascript" /* Ecmascript */,
        "webpack.common": "ecmascript" /* Ecmascript */,
        "webpack.config.babel": "ecmascript" /* Ecmascript */,
        "webpack.config.base.babel": "ecmascript" /* Ecmascript */,
        "webpack.config.base": "ecmascript" /* Ecmascript */,
        "webpack.config.client": "ecmascript" /* Ecmascript */,
        "webpack.config.common.babel": "ecmascript" /* Ecmascript */,
        "webpack.config.common": "ecmascript" /* Ecmascript */,
        "webpack.config.dev.babel": "ecmascript" /* Ecmascript */,
        "webpack.config.dev": "ecmascript" /* Ecmascript */,
        "webpack.config.main": "ecmascript" /* Ecmascript */,
        "webpack.config.prod.babel": "ecmascript" /* Ecmascript */,
        "webpack.config.prod": "ecmascript" /* Ecmascript */,
        "webpack.config.production.babel": "ecmascript" /* Ecmascript */,
        "webpack.config.production": "ecmascript" /* Ecmascript */,
        "webpack.config.renderer": "ecmascript" /* Ecmascript */,
        "webpack.config.server": "ecmascript" /* Ecmascript */,
        "webpack.config.staging.babel": "ecmascript" /* Ecmascript */,
        "webpack.config.staging": "ecmascript" /* Ecmascript */,
        "webpack.config.test": "ecmascript" /* Ecmascript */,
        "webpack.config.vendor.production": "ecmascript" /* Ecmascript */,
        "webpack.config.vendor": "ecmascript" /* Ecmascript */,
        "webpack.config": "ecmascript" /* Ecmascript */,
        "webpack.dev": "ecmascript" /* Ecmascript */,
        "webpack.development": "ecmascript" /* Ecmascript */,
        "webpack.dist": "ecmascript" /* Ecmascript */,
        "webpack.mix": "ecmascript" /* Ecmascript */,
        "webpack.prod.config": "ecmascript" /* Ecmascript */,
        "webpack.prod": "ecmascript" /* Ecmascript */,
        "webpack.production": "ecmascript" /* Ecmascript */,
        "webpack.server": "ecmascript" /* Ecmascript */,
        "webpack.test": "ecmascript" /* Ecmascript */,
        webpack: "ecmascript" /* Ecmascript */,
        webpackfile: "ecmascript" /* Ecmascript */
      }
    },
    { name: "ionic", fileNames: ["ionic.config.json", ".io-config.json"] },
    {
      name: "gulp",
      fileNames: [
        "gulpfile.js",
        "gulpfile.mjs",
        "gulpfile.ts",
        "gulpfile.cts",
        "gulpfile.mts",
        "gulpfile.babel.js"
      ]
    },
    {
      name: "nodejs",
      fileNames: [
        "package.json",
        "package-lock.json",
        ".nvmrc",
        ".esmrc",
        ".node-version"
      ]
    },
    { name: "npm", fileNames: [".npmignore", ".npmrc"] },
    {
      name: "yarn",
      fileNames: [
        ".yarnrc",
        "yarn.lock",
        ".yarnclean",
        ".yarn-integrity",
        "yarn-error.log",
        ".yarnrc.yml",
        ".yarnrc.yaml"
      ]
    },
    {
      name: "android",
      fileNames: ["androidmanifest.xml"],
      fileExtensions: ["apk", "smali", "dex"]
    },
    {
      name: "tune",
      fileExtensions: ["env"],
      fileNames: [
        ".env.defaults",
        ".env.example",
        ".env.sample",
        ".env.template",
        ".env.schema",
        ".env.local",
        ".env.dev",
        ".env.development",
        ".env.alpha",
        ".env.e2e",
        ".env.qa",
        ".env.dist",
        ".env.prod",
        ".env.production",
        ".env.stage",
        ".env.staging",
        ".env.preview",
        ".env.test",
        ".env.testing",
        ".env.development.local",
        ".env.qa.local",
        ".env.production.local",
        ".env.staging.local",
        ".env.test.local",
        ".env.uat",
        ".vars"
      ]
    },
    {
      name: "turborepo",
      light: true,
      fileNames: ["turbo.json"]
    },
    {
      name: "babel",
      fileNames: ["babel-transform.js"],
      patterns: {
        babel: "cosmiconfig" /* Cosmiconfig */,
        "babel-plugin-macros": "cosmiconfig" /* Cosmiconfig */
      }
    },
    {
      name: "blitz",
      fileNames: [
        "blitz.config.js",
        "blitz.config.ts",
        ".blitz.config.compiled.js"
      ]
    },
    {
      name: "contributing",
      fileNames: [
        "contributing.md",
        "contributing.rst",
        "contributing.txt",
        "contributing"
      ]
    },
    {
      name: "readme",
      fileNames: ["readme.md", "readme.rst", "readme.txt", "readme"]
    },
    {
      name: "changelog",
      fileNames: [
        "changelog",
        "changelog.md",
        "changelog.rst",
        "changelog.txt",
        "changes",
        "changes.md",
        "changes.rst",
        "changes.txt"
      ]
    },
    {
      name: "architecture",
      fileNames: [
        "architecture.md",
        "architecture.rst",
        "architecture.txt",
        "architecture"
      ]
    },
    {
      name: "credits",
      fileNames: ["credits.md", "credits.rst", "credits.txt", "credits"]
    },
    {
      name: "authors",
      fileNames: [
        "authors.md",
        "authors.rst",
        "authors.txt",
        "authors",
        "contributors.md",
        "contributors.rst",
        "contributors.txt",
        "contributors"
      ]
    },
    { name: "flow", fileNames: [".flowconfig"] },
    { name: "favicon", fileNames: ["favicon.ico"] },
    {
      name: "karma",
      fileNames: [
        "karma.conf.js",
        "karma.conf.ts",
        "karma.conf.coffee",
        "karma.config.js",
        "karma.config.ts",
        "karma-main.js",
        "karma-main.ts"
      ]
    },
    { name: "bithound", fileNames: [".bithoundrc"] },
    {
      name: "svgo",
      fileNames: ["svgo.config.js", "svgo.config.cjs", "svgo.config.mjs"]
    },
    { name: "appveyor", fileNames: [".appveyor.yml", "appveyor.yml"] },
    { name: "travis", fileNames: [".travis.yml"] },
    {
      name: "codecov",
      fileNames: [
        ".codecov.yml",
        "codecov.yml",
        ".codecov.yaml",
        "codecov.yaml"
      ]
    },
    {
      name: "sonarcloud",
      fileNames: [
        "sonar-project.properties",
        ".sonarcloud.properties",
        "sonarcloud.yaml"
      ]
    },
    {
      name: "protractor",
      fileNames: [
        "protractor.conf.js",
        "protractor.conf.ts",
        "protractor.conf.coffee",
        "protractor.config.js",
        "protractor.config.ts"
      ]
    },
    { name: "fusebox", fileNames: ["fuse.js"] },
    { name: "heroku", fileNames: ["procfile", "procfile.windows"] },
    { name: "editorconfig", fileNames: [".editorconfig"] },
    { name: "gitlab", fileExtensions: ["gitlab-ci.yml"] },
    { name: "bower", fileNames: [".bowerrc", "bower.json"] },
    {
      name: "eslint",
      fileNames: [
        ".eslintrc-md.js",
        ".eslintrc-jsdoc.js",
        ".eslintrc.base.json",
        ".eslintignore",
        ".eslintcache"
      ],
      patterns: {
        eslint: "cosmiconfig" /* Cosmiconfig */
      }
    },
    {
      name: "conduct",
      fileNames: [
        "code_of_conduct.md",
        "code_of_conduct.txt",
        "code_of_conduct"
      ]
    },
    { name: "watchman", fileNames: [".watchmanconfig"] },
    { name: "aurelia", fileNames: ["aurelia.json"] },
    {
      name: "auto",
      fileNames: [
        ".autorc",
        "auto.config.js",
        "auto.config.ts",
        "auto-config.json",
        "auto-config.yaml",
        "auto-config.yml",
        "auto-config.ts",
        "auto-config.js"
      ],
      light: true
    },
    {
      name: "mocha",
      fileNames: [
        "mocha.opts",
        ".mocharc.yml",
        ".mocharc.yaml",
        ".mocharc.js",
        ".mocharc.json",
        ".mocharc.jsonc"
      ]
    },
    {
      name: "jenkins",
      fileNames: ["jenkinsfile"],
      fileExtensions: ["jenkinsfile", "jenkins"]
    },
    {
      name: "firebase",
      fileNames: [
        "firebase.json",
        ".firebaserc",
        "firestore.rules",
        "firestore.indexes.json"
      ]
    },
    {
      name: "figma",
      fileExtensions: ["fig"]
    },
    {
      name: "rollup",
      fileNames: [
        "rollup.config.js",
        "rollup.config.mjs",
        "rollup.config.ts",
        "rollup-config.js",
        "rollup-config.mjs",
        "rollup-config.ts",
        "rollup.config.common.js",
        "rollup.config.common.mjs",
        "rollup.config.common.ts",
        "rollup.config.base.js",
        "rollup.config.base.mjs",
        "rollup.config.base.ts",
        "rollup.config.prod.js",
        "rollup.config.prod.mjs",
        "rollup.config.prod.ts",
        "rollup.config.dev.js",
        "rollup.config.dev.mjs",
        "rollup.config.dev.ts",
        "rollup.config.prod.vendor.js",
        "rollup.config.prod.vendor.mjs",
        "rollup.config.prod.vendor.ts"
      ]
    },
    { name: "hack", fileNames: [".hhconfig"] },
    { name: "huff", fileExtensions: ["huff"], light: true },
    { name: "hardhat", fileNames: ["hardhat.config.js", "hardhat.config.ts"] },
    {
      name: "stylelint",
      light: true,
      fileNames: [".stylelintignore", ".stylelintcache"],
      patterns: {
        stylelint: "cosmiconfig" /* Cosmiconfig */
      }
    },
    { name: "code-climate", fileNames: [".codeclimate.yml"], light: true },
    {
      name: "prettier",
      fileNames: [".prettierignore"],
      patterns: {
        prettier: "cosmiconfig" /* Cosmiconfig */
      }
    },
    {
      name: "renovate",
      fileNames: [
        ".renovaterc",
        ".renovaterc.json",
        "renovate-config.json",
        "renovate.json",
        "renovate.json5"
      ]
    },
    { name: "apollo", fileNames: ["apollo.config.js"] },
    { name: "nodemon", fileNames: ["nodemon.json", "nodemon-debug.json"] },
    {
      name: "ngrx-reducer",
      fileExtensions: ["reducer.ts", "rootReducer.ts"],
      enabledFor: ["angular_ngrx" /* Ngrx */]
    },
    {
      name: "ngrx-state",
      fileExtensions: ["state.ts"],
      enabledFor: ["angular_ngrx" /* Ngrx */]
    },
    {
      name: "ngrx-actions",
      fileExtensions: ["actions.ts"],
      enabledFor: ["angular_ngrx" /* Ngrx */]
    },
    {
      name: "ngrx-effects",
      fileExtensions: ["effects.ts"],
      enabledFor: ["angular_ngrx" /* Ngrx */]
    },
    {
      name: "ngrx-entity",
      fileNames: [".entity"],
      enabledFor: ["angular_ngrx" /* Ngrx */]
    },
    {
      name: "ngrx-selectors",
      fileExtensions: ["selectors.ts"],
      enabledFor: ["angular_ngrx" /* Ngrx */]
    },
    { name: "webhint", fileNames: [".hintrc"] },
    {
      name: "browserlist",
      fileNames: ["browserslist", ".browserslistrc"],
      light: true
    },
    { name: "crystal", fileExtensions: ["cr", "ecr"], light: true },
    { name: "snyk", fileNames: [".snyk"] },
    {
      name: "drone",
      fileExtensions: ["drone.yml"],
      fileNames: [".drone.yml"],
      light: true
    },
    { name: "cuda", fileExtensions: ["cu", "cuh"] },
    { name: "log", fileExtensions: ["log"] },
    { name: "dotjs", fileExtensions: ["def", "dot", "jst"] },
    { name: "ejs", fileExtensions: ["ejs"] },
    { name: "sequelize", fileNames: [".sequelizerc"] },
    {
      name: "gatsby",
      fileNames: [
        "gatsby-config.js",
        "gatsby-config.mjs",
        "gatsby-config.ts",
        "gatsby-node.js",
        "gatsby-node.mjs",
        "gatsby-node.ts",
        "gatsby-browser.js",
        "gatsby-browser.tsx",
        "gatsby-ssr.js",
        "gatsby-ssr.tsx"
      ]
    },
    {
      name: "wakatime",
      fileNames: [".wakatime-project"],
      fileExtensions: [".wakatime-project"],
      light: true
    },
    { name: "circleci", fileNames: ["circle.yml"], light: true },
    { name: "cloudfoundry", fileNames: [".cfignore"] },
    {
      name: "grunt",
      fileNames: [
        "gruntfile.js",
        "gruntfile.ts",
        "gruntfile.cjs",
        "gruntfile.cts",
        "gruntfile.coffee",
        "gruntfile.babel.js",
        "gruntfile.babel.ts",
        "gruntfile.babel.coffee"
      ]
    },
    {
      name: "jest",
      fileNames: [
        "jest.config.js",
        "jest.config.cjs",
        "jest.config.mjs",
        "jest.config.ts",
        "jest.config.cts",
        "jest.config.mts",
        "jest.config.json",
        "jest.e2e.config.js",
        "jest.e2e.config.cjs",
        "jest.e2e.config.mjs",
        "jest.e2e.config.ts",
        "jest.e2e.config.cts",
        "jest.e2e.config.mts",
        "jest.e2e.config.json",
        "jest.e2e.json",
        "jest-unit.config.js",
        "jest-e2e.config.js",
        "jest-e2e.config.cjs",
        "jest-e2e.config.mjs",
        "jest-e2e.config.ts",
        "jest-e2e.config.cts",
        "jest-e2e.config.mts",
        "jest-e2e.config.json",
        "jest-e2e.json",
        "jest-github-actions-reporter.js",
        "jest.setup.js",
        "jest.setup.ts",
        "jest.json",
        ".jestrc",
        ".jestrc.js",
        ".jestrc.json",
        "jest.teardown.js",
        "jest-preset.json",
        "jest-preset.js",
        "jest-preset.cjs",
        "jest-preset.mjs",
        "jest.preset.js",
        "jest.preset.mjs",
        "jest.preset.cjs",
        "jest.preset.json"
      ]
    },
    { name: "processing", fileExtensions: ["pde"] },
    {
      name: "storybook",
      fileExtensions: [
        "stories.js",
        "stories.jsx",
        "stories.mdx",
        "story.js",
        "story.jsx",
        "stories.ts",
        "stories.tsx",
        "story.ts",
        "story.tsx",
        "stories.svelte",
        "story.mdx"
      ]
    },
    { name: "wepy", fileExtensions: ["wpy"] },
    { name: "fastlane", fileNames: ["fastfile", "appfile"] },
    { name: "hcl", fileExtensions: ["hcl"], light: true },
    { name: "helm", fileNames: [".helmignore"] },
    { name: "san", fileExtensions: ["san"] },
    {
      name: "quokka",
      fileExtensions: ["quokka.js", "quokka.ts", "quokka.jsx", "quokka.tsx"]
    },
    { name: "wallaby", fileNames: ["wallaby.js", "wallaby.conf.js"] },
    { name: "django", fileExtensions: ["djt"] },
    { name: "stencil", fileNames: ["stencil.config.js", "stencil.config.ts"] },
    { name: "red", fileExtensions: ["red"] },
    {
      name: "makefile",
      fileExtensions: ["mk"],
      fileNames: ["makefile", "gnumakefile", "kbuild"]
    },
    { name: "foxpro", fileExtensions: ["fxp", "prg"] },
    { name: "i18n", fileExtensions: ["pot", "po", "mo", "lang", "xlf"] },
    { name: "webassembly", fileExtensions: ["wat", "wasm"] },
    {
      name: "semantic-release",
      light: true,
      patterns: {
        release: "cosmiconfig" /* Cosmiconfig */
      }
    },
    {
      name: "bitbucket",
      fileNames: ["bitbucket-pipelines.yaml", "bitbucket-pipelines.yml"]
    },
    { name: "jupyter", fileExtensions: ["ipynb"] },
    { name: "d", fileExtensions: ["d"] },
    { name: "mdx", fileExtensions: ["mdx"] },
    { name: "mdsvex", fileExtensions: ["svx"] },
    { name: "ballerina", fileExtensions: ["bal", "balx"] },
    { name: "racket", fileExtensions: ["rkt"] },
    {
      name: "bazel",
      fileExtensions: ["bzl", "bazel"],
      fileNames: [".bazelignore", ".bazelrc", ".bazelversion"]
    },
    { name: "mint", fileExtensions: ["mint"] },
    { name: "velocity", fileExtensions: ["vm", "fhtml", "vtl"] },
    { name: "godot", fileExtensions: ["gd"] },
    {
      name: "godot-assets",
      fileExtensions: [
        "godot",
        "tres",
        "tscn",
        "gdns",
        "gdnlib",
        "gdshader",
        "gdshaderinc",
        "gdextension"
      ],
      fileNames: [".gdignore", "._sc_", "_sc_"]
    },
    {
      name: "azure-pipelines",
      fileNames: [
        "azure-pipelines.yml",
        "azure-pipelines.yaml",
        "azure-pipelines-main.yml",
        "azure-pipelines-main.yaml"
      ],
      fileExtensions: [
        "azure-pipelines.yml",
        "azure-pipelines.yaml",
        "azure-pipelines-main.yml",
        "azure-pipelines-main.yaml"
      ]
    },
    { name: "azure", fileExtensions: ["azcli"] },
    {
      name: "vagrant",
      fileNames: ["vagrantfile"],
      fileExtensions: ["vagrantfile"]
    },
    { name: "prisma", fileNames: ["prisma.yml"], fileExtensions: ["prisma"] },
    { name: "razor", fileExtensions: ["cshtml", "vbhtml"] },
    { name: "abc", fileExtensions: ["abc"] },
    { name: "asciidoc", fileExtensions: ["ad", "adoc", "asciidoc"] },
    {
      name: "istanbul",
      fileNames: [
        ".nycrc",
        ".nycrc.json",
        ".nycrc.yaml",
        ".nycrc.yml",
        "nyc.config.js",
        ".istanbul.yml"
      ]
    },
    { name: "edge", fileExtensions: ["edge"] },
    { name: "scheme", fileExtensions: ["ss", "scm"] },
    { name: "lisp", fileExtensions: ["lisp", "lsp", "cl", "fast"] },
    {
      name: "tailwindcss",
      fileNames: [
        "tailwind.js",
        "tailwind.ts",
        "tailwind.config.js",
        "tailwind.config.cjs",
        "tailwind.config.mjs",
        "tailwind.config.ts",
        "tailwind.config.cts",
        "tailwind.config.mts"
      ]
    },
    {
      name: "3d",
      fileExtensions: [
        "stl",
        "stp",
        "obj",
        "o",
        "ac",
        "blend",
        "dxf",
        "fbx",
        "mesh",
        "mqo",
        "pmd",
        "pmx",
        "skp",
        "vac",
        "vdp",
        "vox"
      ]
    },
    { name: "buildkite", fileNames: ["buildkite.yml", "buildkite.yaml"] },
    {
      name: "netlify",
      fileNames: [
        "netlify.json",
        "netlify.yml",
        "netlify.yaml",
        "netlify.toml"
      ],
      light: true
    },
    { name: "svg", fileExtensions: ["svg"] },
    {
      name: "svelte",
      fileExtensions: ["svelte"],
      fileNames: ["svelte.config.js", "svelte.config.cjs"]
    },
    {
      name: "vim",
      fileExtensions: ["vimrc", "gvimrc", "exrc", "vim", "viminfo"]
    },
    {
      name: "nest",
      fileNames: [
        "nest-cli.json",
        ".nest-cli.json",
        "nestconfig.json",
        ".nestconfig.json"
      ]
    },
    {
      name: "nest-controller",
      clone: {
        base: "nest",
        color: "light-blue-700"
      },
      fileExtensions: ["controller.ts", "controller.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-middleware",
      clone: {
        base: "nest",
        color: "indigo-400"
      },
      fileExtensions: ["middleware.ts", "middleware.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-module",
      clone: {
        base: "nest",
        color: "red-600"
      },
      fileExtensions: ["module.ts", "module.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-service",
      clone: {
        base: "nest",
        color: "amber-400"
      },
      fileExtensions: ["service.ts", "service.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-decorator",
      clone: {
        base: "nest",
        color: "purple-400"
      },
      fileExtensions: ["decorator.ts", "decorator.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-pipe",
      clone: {
        base: "nest",
        color: "teal-600"
      },
      fileExtensions: ["pipe.ts", "pipe.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-filter",
      clone: {
        base: "nest",
        color: "deep-orange-400"
      },
      fileExtensions: ["filter.ts", "filter.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-gateway",
      clone: {
        base: "nest",
        color: "lime-700"
      },
      fileExtensions: ["gateway.ts", "gateway.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-guard",
      clone: {
        base: "nest",
        color: "green-600"
      },
      fileExtensions: ["guard.ts", "guard.js"],
      enabledFor: ["nest" /* Nest */]
    },
    {
      name: "nest-resolver",
      clone: {
        base: "nest",
        color: "pink-400"
      },
      fileExtensions: ["resolver.ts", "resolver.js"],
      enabledFor: ["nest" /* Nest */]
    },
    { name: "moon", fileNames: ["moon.yml"] },
    { name: "moonscript", fileExtensions: ["moon"] },
    { name: "percy", fileNames: [".percy.yml"] },
    { name: "gitpod", fileNames: [".gitpod.yml"] },
    { name: "advpl", fileExtensions: ["prw", "prx"] },
    {
      name: "advpl-ptm",
      clone: {
        base: "advpl",
        color: "red-400"
      },
      fileExtensions: ["ptm"]
    },
    {
      name: "advpl-tlpp",
      clone: {
        base: "advpl",
        color: "yellow-700"
      },
      fileExtensions: ["tlpp"]
    },
    {
      name: "advpl-include",
      clone: {
        base: "advpl",
        color: "cyan-500"
      },
      fileExtensions: ["ch"]
    },
    { name: "codeowners", fileNames: ["codeowners", "OWNERS"] },
    { name: "gcp", fileNames: [".gcloudignore"] },
    { name: "amplify", fileNames: ["amplify.yml"] },
    {
      name: "disc",
      fileExtensions: ["iso", "vmdk", "hdd", "qcow", "qcow2", "qed", "dmg"]
    },
    {
      name: "fortran",
      fileExtensions: ["f", "f77", "f90", "f95", "f03", "f08"]
    },
    { name: "tcl", fileExtensions: ["tcl"] },
    { name: "liquid", fileExtensions: ["liquid"] },
    { name: "prolog", fileExtensions: ["p", "pro", "pl"] },
    {
      name: "husky",
      patterns: {
        husky: "cosmiconfig" /* Cosmiconfig */
      }
    },
    { name: "coconut", fileExtensions: ["coco"] },
    { name: "tilt", fileNames: ["tiltfile"] },
    {
      name: "capacitor",
      fileNames: ["capacitor.config.json", "capacitor.config.ts"]
    },
    { name: "sketch", fileExtensions: ["sketch"] },
    { name: "pawn", fileExtensions: ["pwn", "amx"] },
    { name: "adonis", fileNames: [".adonisrc.json", "ace"] },
    { name: "forth", fileExtensions: ["4th", "fth", "frt"] },
    {
      name: "uml",
      fileExtensions: ["iuml", "pu", "puml", "plantuml", "wsd"],
      light: true
    },
    {
      name: "meson",
      fileNames: ["meson.build", "meson_options.txt"],
      fileExtensions: ["wrap"]
    },
    {
      name: "commitlint",
      fileNames: [".commitlint.yaml", ".commitlint.yml"],
      patterns: {
        commitlint: "cosmiconfig" /* Cosmiconfig */
      }
    },
    { name: "buck", fileNames: [".buckconfig"] },
    { name: "dhall", fileExtensions: ["dhall", "dhallb"] },
    {
      name: "sml",
      fileExtensions: [
        "sml",
        "mlton",
        "mlb",
        "sig",
        "fun",
        "cm",
        "lex",
        "use",
        "grm"
      ]
    },
    { name: "nx", fileNames: ["nx.json", ".nxignore"] },
    { name: "opam", fileExtensions: ["opam"] },
    {
      name: "dune",
      fileNames: [
        "dune",
        "dune-project",
        "dune-workspace",
        "dune-workspace.dev"
      ]
    },
    { name: "imba", fileExtensions: ["imba"] },
    { name: "drawio", fileExtensions: ["drawio", "dio"] },
    { name: "pascal", fileExtensions: ["pas"] },
    { name: "shaderlab", fileExtensions: ["unity"] },
    {
      name: "roadmap",
      fileNames: [
        "roadmap.md",
        "roadmap.txt",
        "timeline.md",
        "timeline.txt",
        "milestones.md",
        "milestones.txt"
      ]
    },
    {
      name: "sas",
      fileExtensions: ["sas", "sas7bdat", "sashdat", "astore", "ast", "sast"]
    },
    {
      name: "nuget",
      fileNames: ["nuget.config", ".nuspec", "nuget.exe"],
      fileExtensions: ["nupkg"]
    },
    { name: "command", fileExtensions: ["command"] },
    {
      name: "stryker",
      fileNames: [
        "stryker.conf.json",
        "stryker.conf.js",
        "stryker.conf.cjs",
        "stryker.conf.mjs",
        ".stryker.conf.json",
        ".stryker.conf.js",
        ".stryker.conf.cjs",
        ".stryker.conf.mjs"
      ]
    },
    { name: "denizenscript", fileExtensions: ["dsc"] },
    {
      name: "modernizr",
      fileNames: [".modernizrrc", ".modernizrrc.js", ".modernizrrc.json"]
    },
    { name: "slug", fileNames: [".slugignore"] },
    { name: "search", fileExtensions: ["code-search"] },
    {
      name: "stitches",
      fileNames: ["stitches.config.js", "stitches.config.ts"],
      light: true
    },
    {
      name: "nginx",
      fileNames: ["nginx.conf"],
      fileExtensions: ["nginx", "nginxconf", "nginxconfig"]
    },
    {
      name: "minecraft",
      fileExtensions: [
        "mcfunction",
        "mcmeta",
        "mcr",
        "mca",
        "mcgame",
        "mclevel",
        "mcworld",
        "mine",
        "mus",
        "mcstructure",
        "mcpack",
        "mcaddon",
        "mctemplate",
        "mcproject"
      ],
      fileNames: [".mcattributes", ".mcdefinitions", ".mcignore"]
    },
    { name: "replit", fileNames: [".replit"] },
    { name: "rescript", fileExtensions: ["res"] },
    { name: "rescript-interface", fileExtensions: ["resi"] },
    {
      name: "snowpack",
      fileNames: [
        "snowpack.config.js",
        "snowpack.config.cjs",
        "snowpack.config.mjs",
        "snowpack.config.ts",
        "snowpack.config.cts",
        "snowpack.config.mts",
        "snowpack.deps.json",
        "snowpack.config.json"
      ],
      light: true
    },
    { name: "brainfuck", fileExtensions: ["b", "bf"] },
    { name: "bicep", fileExtensions: ["bicep"] },
    { name: "cobol", fileExtensions: ["cob", "cbl"] },
    { name: "grain", fileExtensions: ["gr"] },
    { name: "lolcode", fileExtensions: ["lol"] },
    { name: "idris", fileExtensions: ["idr", "ibc"] },
    { name: "quasar", fileNames: ["quasar.conf.js", "quasar.config.js"] },
    { name: "dependabot", fileNames: ["dependabot.yml", "dependabot.yaml"] },
    { name: "pipeline", fileExtensions: ["pipeline"] },
    {
      name: "vite",
      patterns: {
        "vite.config": "ecmascript" /* Ecmascript */
      }
    },
    {
      name: "vitest",
      patterns: {
        "vitest.workspace": "ecmascript" /* Ecmascript */,
        "vitest.config": "ecmascript" /* Ecmascript */
      }
    },
    {
      name: "velite",
      patterns: {
        "velite.config": "ecmascript" /* Ecmascript */
      }
    },
    { name: "opa", fileExtensions: ["rego"] },
    { name: "lerna", fileNames: ["lerna.json"] },
    {
      name: "windicss",
      fileNames: [
        "windi.config.js",
        "windi.config.cjs",
        "windi.config.ts",
        "windi.config.cts",
        "windi.config.json"
      ],
      fileExtensions: ["windi"]
    },
    {
      name: "textlint",
      fileNames: [
        ".textlintrc",
        ".textlintrc.js",
        ".textlintrc.json",
        ".textlintrc.yml",
        ".textlintrc.yaml"
      ]
    },
    { name: "scala", fileExtensions: ["scala", "sc"] },
    { name: "lilypond", fileExtensions: ["ly"] },
    { name: "vlang", fileExtensions: ["v"], fileNames: ["vpkg.json", "v.mod"] },
    { name: "chess", fileExtensions: ["pgn", "fen"], light: true },
    { name: "gemini", fileExtensions: ["gmi", "gemini"] },
    {
      name: "sentry",
      fileNames: [".sentryclirc"],
      patterns: {
        "sentry.client.config": "ecmascript" /* Ecmascript */,
        "sentry.server.config": "ecmascript" /* Ecmascript */,
        "sentry.edge.config": "ecmascript" /* Ecmascript */
      }
    },
    {
      name: "phpunit",
      fileNames: [
        ".phpunit.result.cache",
        ".phpunit-watcher.yml",
        "phpunit.xml",
        "phpunit.xml.dist",
        "phpunit-watcher.yml",
        "phpunit-watcher.yml.dist"
      ]
    },
    {
      name: "php-cs-fixer",
      fileNames: [
        ".php_cs",
        ".php_cs.dist",
        ".php_cs.php",
        ".php_cs.dist.php",
        ".php-cs-fixer.php",
        ".php-cs-fixer.dist.php"
      ]
    },
    { name: "robots", fileNames: ["robots.txt"] },
    {
      name: "tsconfig",
      fileNames: [
        "tsconfig.json",
        "tsconfig.app.json",
        "tsconfig.editor.json",
        "tsconfig.spec.json",
        "tsconfig.base.json",
        "tsconfig.build.json",
        "tsconfig.eslint.json",
        "tsconfig.lib.json",
        "tsconfig.lib.prod.json",
        "tsconfig.node.json",
        "tsconfig.test.json",
        "tsconfig.e2e.json",
        "tsconfig.web.json",
        "tsconfig.webworker.json",
        "tsconfig.worker.json",
        "tsconfig.config.json",
        "tsconfig.vitest.json",
        "tsconfig.cjs.json",
        "tsconfig.esm.json",
        "tsconfig.mjs.json",
        "tsconfig.doc.json",
        "tsconfig.paths.json",
        "tsconfig.main.json",
        "tsconfig.renderer.json",
        "tsconfig.server.json"
      ],
      fileExtensions: ["tsconfig.json"]
    },
    {
      name: "tauri",
      fileNames: [
        "tauri.conf.json",
        "tauri.config.json",
        "tauri.linux.conf.json",
        "tauri.windows.conf.json",
        "tauri.macos.conf.json",
        ".taurignore"
      ],
      fileExtensions: ["tauri"]
    },
    {
      name: "jsconfig",
      fileNames: ["jsconfig.json"],
      fileExtensions: ["jsconfig.json"]
    },
    {
      name: "maven",
      fileNames: ["maven.config", "jvm.config", "pom.xml"]
    },
    { name: "ada", fileExtensions: ["ada", "adb", "ads", "ali"] },
    {
      name: "serverless",
      fileNames: [
        "serverless.yml",
        "serverless.yaml",
        "serverless.json",
        "serverless.js",
        "serverless.ts"
      ]
    },
    {
      name: "supabase",
      fileNames: ["supabase.js", "supabase.py"]
    },
    {
      name: "ember",
      fileNames: [".ember-cli", ".ember-cli.js", "ember-cli-builds.js"]
    },
    {
      name: "horusec",
      fileNames: ["horusec-config.json"],
      fileExtensions: ["horusec-config.json"]
    },
    { name: "poetry", fileNames: ["poetry.lock"] },
    {
      name: "pdm",
      fileNames: ["pdm.lock", "pdm.toml", ".pdm-python"],
      fileExtensions: ["pdm.lock", "pdm.toml"]
    },
    { name: "coala", fileExtensions: ["coarc", "coafile"] },
    { name: "parcel", fileNames: [".parcelrc"] },
    {
      name: "dinophp",
      fileExtensions: ["bubble", "html.bubble", "php.bubble"]
    },
    { name: "teal", fileExtensions: ["tl"] },
    { name: "template", fileExtensions: ["template"] },
    { name: "astyle", fileNames: [".astylerc"] },
    {
      name: "shader",
      fileExtensions: [
        "glsl",
        "vert",
        "tesc",
        "tese",
        "geom",
        "frag",
        "comp",
        "vert.glsl",
        "tesc.glsl",
        "tese.glsl",
        "geom.glsl",
        "frag.glsl",
        "comp.glsl",
        "vertex.glsl",
        "geometry.glsl",
        "fragment.glsl",
        "compute.glsl",
        "ts.glsl",
        "gs.glsl",
        "vs.glsl",
        "fs.glsl",
        "shader",
        "vertexshader",
        "fragmentshader",
        "geometryshader",
        "computeshader",
        "hlsl",
        "pixel.hlsl",
        "geometry.hlsl",
        "compute.hlsl",
        "tessellation.hlsl",
        "px.hlsl",
        "geom.hlsl",
        "comp.hlsl",
        "tess.hlsl",
        "wgsl"
      ]
    },
    {
      name: "lighthouse",
      fileNames: [
        ".lighthouserc.js",
        "lighthouserc.js",
        ".lighthouserc.cjs",
        "lighthouserc.cjs",
        ".lighthouserc.json",
        "lighthouserc.json",
        ".lighthouserc.yml",
        "lighthouserc.yml",
        ".lighthouserc.yaml",
        "lighthouserc.yaml"
      ]
    },
    {
      name: "svgr",
      patterns: {
        svgr: "cosmiconfig" /* Cosmiconfig */
      }
    },
    { name: "rome", fileNames: ["rome.json"] },
    {
      name: "cypress",
      fileNames: ["cypress.json", "cypress.env.json"],
      patterns: {
        "cypress.config": "ecmascript" /* Ecmascript */
      }
    },
    { name: "siyuan", fileExtensions: ["sy"] },
    { name: "ndst", fileExtensions: ["ndst.yml", "ndst.yaml", "ndst.json"] },
    {
      name: "plop",
      fileNames: ["plopfile.js", "plopfile.cjs", "plopfile.mjs", "plopfile.ts"]
    },
    { name: "tobi", fileExtensions: ["tobi"] },
    { name: "tobimake", fileNames: [".tobimake"] },
    { name: "gleam", fileNames: ["gleam.toml"], fileExtensions: ["gleam"] },
    {
      name: "pnpm",
      light: true,
      fileNames: ["pnpm-lock.yaml", "pnpm-workspace.yaml", ".pnpmfile.cjs"]
    },
    {
      name: "gridsome",
      fileNames: ["gridsome.config.js", "gridsome.server.js"]
    },
    {
      name: "steadybit",
      fileExtensions: ["steadybit.yml", "steadybit.yaml"],
      fileNames: [
        ".steadybit.yml",
        "steadybit.yml",
        ".steadybit.yaml",
        "steadybit.yaml"
      ]
    },
    { name: "capnp", fileExtensions: ["capnp"] },
    { name: "tree", fileExtensions: ["tree"] },
    {
      name: "cadence",
      fileExtensions: ["cdc"]
    },
    { name: "caddy", fileNames: ["Caddyfile"] },
    {
      name: "openapi",
      light: true,
      fileExtensions: ["openapi.json", "openapi.yml", "openapi.yaml"],
      fileNames: ["openapi.json", "openapi.yml", "openapi.yaml"]
    },
    {
      name: "swagger",
      fileExtensions: ["swagger.json", "swagger.yml", "swagger.yaml"],
      fileNames: ["swagger.json", "swagger.yml", "swagger.yaml"]
    },
    { name: "bun", fileNames: ["bun.lockb", "bunfig.toml"], light: true },
    { name: "antlr", fileExtensions: ["g4"] },
    { name: "stylable", fileExtensions: ["st.css"] },
    { name: "pinejs", fileExtensions: ["pine"] },
    {
      name: "nano-staged",
      light: true,
      fileNames: [
        ".nano-staged.js",
        "nano-staged.js",
        ".nano-staged.cjs",
        "nano-staged.cjs",
        ".nano-staged.mjs",
        "nano-staged.mjs",
        ".nano-staged.json",
        "nano-staged.json",
        ".nanostagedrc"
      ]
    },
    {
      name: "knip",
      fileNames: [
        "knip.json",
        "knip.jsonc",
        ".knip.json",
        ".knip.jsonc",
        "knip.ts",
        "knip.js",
        "knip.config.ts",
        "knip.config.js"
      ]
    },
    {
      name: "taskfile",
      fileExtensions: ["taskfile.yml", "taskfile.yaml"],
      fileNames: [
        "taskfile.yml",
        "taskfile.yaml",
        "taskfile.dist.yml",
        "taskfile.dist.yaml"
      ]
    },
    {
      name: "craco",
      patterns: {
        craco: "cosmiconfig" /* Cosmiconfig */
      }
    },
    {
      name: "gamemaker",
      fileExtensions: ["gml", "yy", "yyp", "yyz"]
    },
    { name: "tldraw", fileExtensions: ["tldr"], light: true },
    {
      name: "mercurial",
      fileNames: [
        ".hg",
        ".hgignore",
        ".hgflow",
        ".hgrc",
        "hgrc",
        "mercurial.ini"
      ]
    },
    {
      name: "deno",
      fileNames: ["deno.json", "deno.jsonc", "deno.lock"],
      light: true
    },
    {
      name: "plastic",
      fileNames: [
        "plastic.branchexplorer",
        "plastic.selector",
        "plastic.wktree",
        "plastic.workspace",
        "plastic.workspaces"
      ]
    },
    { name: "typst", fileExtensions: ["typ"] },
    {
      name: "unocss",
      fileNames: [
        "uno.config.js",
        "uno.config.mjs",
        "uno.config.ts",
        "uno.config.mts",
        "unocss.config.js",
        "unocss.config.mjs",
        "unocss.config.ts",
        "unocss.config.mts"
      ]
    },
    { name: "ifanr-cloud", fileNames: [".mincloudrc"] },
    { name: "concourse", fileNames: ["concourse.yml"] },
    { name: "qwik", fileExtensions: ["tsx"], enabledFor: ["qwik" /* Qwik */] },
    { name: "mermaid", fileExtensions: ["mmd", "mermaid"] },
    {
      name: "syncpack",
      patterns: {
        syncpack: "cosmiconfig" /* Cosmiconfig */
      }
    },
    {
      name: "mojo",
      fileExtensions: ["mojo", "\u{1F525}"]
    },
    {
      name: "werf",
      fileNames: [
        "werf.yaml",
        "werf.yml",
        "werf-giterminism.yaml",
        "werf-giterminism.yml"
      ]
    },
    { name: "roblox", fileExtensions: ["rbxl", "rbxlx", "rbxm", "rbxmx"] },
    {
      name: "panda",
      patterns: {
        "panda.config": "ecmascript" /* Ecmascript */
      }
    },
    { name: "biome", fileNames: ["biome.json", "biome.jsonc"] },
    {
      name: "esbuild",
      patterns: {
        esbuild: "ecmascript" /* Ecmascript */,
        "esbuild.config": "ecmascript" /* Ecmascript */
      }
    },
    { name: "spwn", fileExtensions: ["spwn"] },
    { name: "templ", fileExtensions: ["templ"] },
    { name: "chrome", fileExtensions: ["crx"] },
    { name: "stan", fileExtensions: ["stan"] },
    {
      name: "abap",
      fileExtensions: ["abap", "acds", "asddls"]
    },
    { name: "lottie", fileExtensions: ["lottie"] },
    {
      name: "puppeteer",
      patterns: {
        puppeteer: "cosmiconfig" /* Cosmiconfig */
      }
    },
    { name: "apps-script", fileExtensions: ["gs"] },
    {
      name: "pkl",
      fileExtensions: ["pkl"],
      fileNames: ["PklProject", "PklProject.deps.json"]
    },
    {
      name: "kubernetes",
      fileNames: [
        "k8s.yml",
        "k8s.yaml",
        "kubernetes.yml",
        "kubernetes.yaml",
        ".k8s.yml",
        ".k8s.yaml"
      ]
    },
    {
      name: "screwdriver",
      fileNames: ["screwdriver.yaml", "screwdriver.yml"]
    },
    {
      name: "snapcraft",
      fileNames: ["snapcraft.yaml", "snapcraft.yml"]
    },
    {
      name: "container",
      clone: {
        base: "3d",
        color: "#00b0ff"
      },
      fileNames: [".devcontainer/devcontainer.json"]
    },
    {
      name: "kcl",
      fileNames: ["kcl.mod", "kcl.yaml", "kcl.yml"],
      fileExtensions: ["k"]
    },
    {
      name: "verified",
      fileExtensions: ["sigstore.json"]
    },
    {
      name: "bruno",
      fileExtensions: ["bru"]
    },
    {
      name: "cairo",
      fileExtensions: ["cairo"]
    },
    {
      name: "grafana-alloy",
      fileExtensions: ["alloy"]
    },
    {
      name: "markdownlint",
      fileNames: [
        ".markdownlint.json",
        ".markdownlint.jsonc",
        ".markdownlint.yaml",
        ".markdownlint.yml",
        ".markdownlint-cli2.jsonc",
        ".markdownlint-cli2.yaml",
        ".markdownlint-cli2.cjs",
        ".markdownlint-cli2.mjs"
      ]
    },
    {
      name: "tsil",
      fileExtensions: ["\u0446"]
    },
    {
      name: "deepsource",
      fileNames: [".deepsource.toml"]
    },
    {
      name: "tape",
      fileExtensions: ["tape"],
      clone: { base: "video", color: "purple-300" }
    },
    {
      name: "hurl",
      fileExtensions: ["hurl"]
    }
  ])
};

// src/core/icons/folderIcons.ts
var folderIcons = [
  {
    name: "specific",
    defaultIcon: { name: "folder" },
    rootFolder: { name: "folder-root" },
    icons: [
      {
        name: "folder-robot",
        folderNames: ["bot", "robot"]
      },
      {
        name: "folder-src",
        folderNames: ["src", "srcs", "source", "sources", "code"]
      },
      {
        name: "folder-dist",
        folderNames: ["dist", "out", "build", "release", "bin"]
      },
      {
        name: "folder-css",
        folderNames: ["css", "stylesheet", "stylesheets", "style", "styles"]
      },
      { name: "folder-sass", folderNames: ["sass", "scss"] },
      { name: "folder-television", folderNames: ["tv", "television"] },
      { name: "folder-desktop", folderNames: ["desktop"] },
      { name: "folder-console", folderNames: ["console"] },
      {
        name: "folder-images",
        folderNames: [
          "images",
          "image",
          "imgs",
          "img",
          "icons",
          "icon",
          "icos",
          "ico",
          "figures",
          "figure",
          "figs",
          "fig",
          "screenshot",
          "screenshots",
          "screengrab",
          "screengrabs",
          "pic",
          "pics",
          "picture",
          "pictures",
          "photo",
          "photos",
          "photograph",
          "photographs"
        ]
      },
      {
        name: "folder-scripts",
        folderNames: ["script", "scripts", "scripting"]
      },
      { name: "folder-node", folderNames: ["node_modules"] },
      {
        name: "folder-javascript",
        folderNames: ["js", "javascript", "javascripts"]
      },
      { name: "folder-json", folderNames: ["json", "jsons"] },
      { name: "folder-font", folderNames: ["font", "fonts"] },
      { name: "folder-bower", folderNames: ["bower_components"] },
      {
        name: "folder-test",
        folderNames: ["test", "tests", "testing", "snapshots", "spec", "specs"]
      },
      {
        name: "folder-jinja",
        folderNames: ["jinja", "jinja2", "j2"],
        light: true
      },
      { name: "folder-markdown", folderNames: ["markdown", "md"] },
      { name: "folder-pdm", folderNames: ["pdm-plugins", "pdm-build"] },
      { name: "folder-php", folderNames: ["php"] },
      { name: "folder-phpmailer", folderNames: ["phpmailer"] },
      { name: "folder-sublime", folderNames: ["sublime"] },
      {
        name: "folder-docs",
        folderNames: [
          "doc",
          "docs",
          "document",
          "documents",
          "documentation",
          "post",
          "posts",
          "article",
          "articles"
        ]
      },
      { name: "folder-gh-workflows", folderNames: ["github/workflows"] },
      {
        name: "folder-git",
        folderNames: ["git", "patches", "githooks", "submodules"]
      },
      { name: "folder-github", folderNames: ["github"] },
      { name: "folder-gitlab", folderNames: ["gitlab"] },
      { name: "folder-vscode", folderNames: ["vscode", "vscode-test"] },
      {
        name: "folder-views",
        folderNames: [
          "view",
          "views",
          "screen",
          "screens",
          "page",
          "pages",
          "public_html",
          "html"
        ]
      },
      { name: "folder-vue", folderNames: ["vue"] },
      { name: "folder-vuepress", folderNames: ["vuepress"] },
      { name: "folder-expo", folderNames: ["expo", "expo-shared"] },
      {
        name: "folder-config",
        folderNames: [
          "cfg",
          "cfgs",
          "conf",
          "confs",
          "config",
          "configs",
          "configuration",
          "configurations",
          "setting",
          "settings",
          "META-INF",
          "option",
          "options"
        ]
      },
      {
        name: "folder-i18n",
        folderNames: [
          "i18n",
          "internationalization",
          "lang",
          "langs",
          "language",
          "languages",
          "locale",
          "locales",
          "l10n",
          "localization",
          "translation",
          "translate",
          "translations",
          "tx"
        ]
      },
      {
        name: "folder-components",
        folderNames: ["components", "widget", "widgets", "fragments"]
      },
      {
        name: "folder-verdaccio",
        folderNames: ["verdaccio"]
      },
      { name: "folder-aurelia", folderNames: ["aurelia_project"] },
      {
        name: "folder-resource",
        folderNames: [
          "resource",
          "resources",
          "res",
          "asset",
          "assets",
          "static",
          "report",
          "reports"
        ]
      },
      {
        name: "folder-lib",
        folderNames: [
          "lib",
          "libs",
          "library",
          "libraries",
          "vendor",
          "vendors",
          "third-party"
        ]
      },
      {
        name: "folder-theme",
        folderNames: [
          "themes",
          "theme",
          "color",
          "colors",
          "design",
          "designs"
        ]
      },
      { name: "folder-webpack", folderNames: ["webpack"] },
      { name: "folder-global", folderNames: ["global"] },
      {
        name: "folder-public",
        folderNames: [
          "public",
          "www",
          "wwwroot",
          "web",
          "website",
          "site",
          "browser",
          "browsers"
        ]
      },
      {
        name: "folder-include",
        folderNames: ["inc", "include", "includes", "partial", "partials"]
      },
      {
        name: "folder-docker",
        folderNames: ["docker", "dockerfiles", "dockerhub"]
      },
      {
        name: "folder-ngrx-effects",
        folderNames: ["effects"],
        enabledFor: ["angular_ngrx" /* Ngrx */]
      },
      {
        name: "folder-ngrx-store",
        folderNames: ["store"],
        enabledFor: ["angular_ngrx" /* Ngrx */]
      },
      {
        name: "folder-ngrx-state",
        folderNames: ["states", "state"],
        enabledFor: ["angular_ngrx" /* Ngrx */]
      },
      {
        name: "folder-ngrx-reducer",
        folderNames: ["reducers", "reducer"],
        enabledFor: ["angular_ngrx" /* Ngrx */]
      },
      {
        name: "folder-ngrx-actions",
        folderNames: ["actions"],
        enabledFor: ["angular_ngrx" /* Ngrx */]
      },
      {
        name: "folder-ngrx-entities",
        folderNames: ["entities"],
        enabledFor: ["angular_ngrx" /* Ngrx */]
      },
      {
        name: "folder-ngrx-selectors",
        folderNames: ["selectors"],
        enabledFor: ["angular_ngrx" /* Ngrx */]
      },
      {
        name: "folder-redux-reducer",
        folderNames: ["reducers", "reducer"],
        enabledFor: ["react_redux" /* Redux */]
      },
      {
        name: "folder-redux-actions",
        folderNames: ["actions"],
        enabledFor: ["react_redux" /* Redux */]
      },
      {
        name: "folder-redux-selector",
        folderNames: ["selectors", "selector"],
        enabledFor: ["react_redux" /* Redux */]
      },
      {
        name: "folder-redux-store",
        folderNames: ["store", "stores"],
        enabledFor: ["react_redux" /* Redux */]
      },
      {
        name: "folder-react-components",
        folderNames: ["components", "react", "jsx", "reactjs"],
        enabledFor: ["react" /* React */, "react_redux" /* Redux */]
      },
      {
        name: "folder-astro",
        folderNames: ["astro"]
      },
      {
        name: "folder-database",
        folderNames: ["db", "data", "database", "databases", "sql"]
      },
      { name: "folder-log", folderNames: ["log", "logs", "logging"] },
      { name: "folder-target", folderNames: ["target"] },
      {
        name: "folder-temp",
        folderNames: ["temp", "tmp", "cached", "cache"]
      },
      { name: "folder-aws", folderNames: ["aws"] },
      {
        name: "folder-audio",
        folderNames: [
          "aud",
          "auds",
          "audio",
          "audios",
          "music",
          "sound",
          "sounds"
        ]
      },
      {
        name: "folder-video",
        folderNames: ["vid", "vids", "video", "videos", "movie", "movies"]
      },
      {
        name: "folder-kubernetes",
        folderNames: ["kubernetes", "k8s"]
      },
      { name: "folder-import", folderNames: ["import", "imports", "imported"] },
      { name: "folder-export", folderNames: ["export", "exports", "exported"] },
      { name: "folder-wakatime", folderNames: ["wakatime"] },
      { name: "folder-circleci", folderNames: ["circleci"] },
      {
        name: "folder-wordpress",
        folderNames: ["wordpress-org", "wp-content"]
      },
      { name: "folder-gradle", folderNames: ["gradle"] },
      {
        name: "folder-coverage",
        folderNames: [
          "coverage",
          "nyc-output",
          "nyc_output",
          "e2e",
          "it",
          "integration-test",
          "integration-tests"
        ]
      },
      {
        name: "folder-class",
        folderNames: [
          "class",
          "classes",
          "model",
          "models",
          "schemas",
          "schema"
        ]
      },
      {
        name: "folder-other",
        folderNames: [
          "other",
          "others",
          "misc",
          "miscellaneous",
          "extra",
          "extras",
          "etc"
        ]
      },
      { name: "folder-lua", folderNames: ["lua"] },
      { name: "folder-turborepo", folderNames: ["turbo"] },
      {
        name: "folder-typescript",
        folderNames: ["typescript", "ts", "typings", "@types", "types"]
      },
      { name: "folder-graphql", folderNames: ["graphql", "gql"] },
      { name: "folder-routes", folderNames: ["routes", "router", "routers"] },
      { name: "folder-ci", folderNames: ["ci"] },
      {
        name: "folder-benchmark",
        folderNames: [
          "benchmark",
          "benchmarks",
          "performance",
          "measure",
          "measures",
          "measurement"
        ]
      },
      {
        name: "folder-messages",
        folderNames: [
          "messages",
          "messaging",
          "forum",
          "chat",
          "chats",
          "conversation",
          "conversations"
        ]
      },
      { name: "folder-less", folderNames: ["less"] },
      {
        name: "folder-gulp",
        folderNames: [
          "gulp",
          "gulp-tasks",
          "gulpfile.js",
          "gulpfile.mjs",
          "gulpfile.ts",
          "gulpfile.babel.js"
        ]
      },
      {
        name: "folder-python",
        folderNames: ["python", "pycache", "pytest_cache"]
      },
      {
        name: "folder-mojo",
        folderNames: ["mojo"]
      },
      { name: "folder-moon", folderNames: ["moon"] },
      { name: "folder-debug", folderNames: ["debug", "debugging"] },
      { name: "folder-fastlane", folderNames: ["fastlane"] },
      {
        name: "folder-plugin",
        folderNames: [
          "plugin",
          "plugins",
          "mod",
          "mods",
          "modding",
          "extension",
          "extensions",
          "addon",
          "addons",
          "module",
          "modules"
        ]
      },
      { name: "folder-middleware", folderNames: ["middleware", "middlewares"] },
      {
        name: "folder-controller",
        folderNames: [
          "controller",
          "controllers",
          "service",
          "services",
          "provider",
          "providers",
          "handler",
          "handlers"
        ]
      },
      { name: "folder-ansible", folderNames: ["ansible"] },
      {
        name: "folder-server",
        folderNames: ["server", "servers", "backend", "backends"]
      },
      {
        name: "folder-client",
        folderNames: ["client", "clients", "frontend", "frontends", "pwa"]
      },
      { name: "folder-tasks", folderNames: ["tasks", "tickets"] },
      { name: "folder-android", folderNames: ["android"] },
      { name: "folder-ios", folderNames: ["ios"] },
      {
        name: "folder-ui",
        folderNames: ["presentation", "gui", "ui", "ux"]
      },
      { name: "folder-upload", folderNames: ["uploads", "upload"] },
      { name: "folder-download", folderNames: ["downloads", "download"] },
      {
        name: "folder-tools",
        folderNames: [
          "tools",
          "toolkit",
          "toolkits",
          "toolbox",
          "toolboxes",
          "tooling"
        ]
      },
      { name: "folder-helper", folderNames: ["helpers", "helper"] },
      { name: "folder-serverless", folderNames: ["serverless"] },
      { name: "folder-api", folderNames: ["api", "apis", "restapi"] },
      { name: "folder-app", folderNames: ["app", "apps"] },
      {
        name: "folder-apollo",
        folderNames: [
          "apollo",
          "apollo-client",
          "apollo-cache",
          "apollo-config"
        ]
      },
      {
        name: "folder-archive",
        folderNames: [
          "arc",
          "arcs",
          "archive",
          "archives",
          "archival",
          "bkp",
          "bkps",
          "bak",
          "baks",
          "backup",
          "backups",
          "back-up",
          "back-ups",
          "history",
          "histories"
        ]
      },
      { name: "folder-batch", folderNames: ["batch", "batchs", "batches"] },
      { name: "folder-buildkite", folderNames: ["buildkite"] },
      { name: "folder-cluster", folderNames: ["cluster", "clusters"] },
      {
        name: "folder-command",
        folderNames: ["command", "commands", "cmd", "cli", "clis"]
      },
      { name: "folder-constant", folderNames: ["constant", "constants"] },
      {
        name: "folder-container",
        folderNames: ["container", "containers", "devcontainer"]
      },
      { name: "folder-content", folderNames: ["content", "contents"] },
      { name: "folder-context", folderNames: ["context", "contexts"] },
      { name: "folder-core", folderNames: ["core"] },
      { name: "folder-delta", folderNames: ["delta", "deltas", "changes"] },
      { name: "folder-dump", folderNames: ["dump", "dumps"] },
      {
        name: "folder-examples",
        folderNames: [
          "demo",
          "demos",
          "example",
          "examples",
          "sample",
          "samples",
          "sample-data"
        ]
      },
      {
        name: "folder-environment",
        folderNames: ["env", "envs", "environment", "environments", "venv"]
      },
      {
        name: "folder-functions",
        folderNames: [
          "func",
          "funcs",
          "function",
          "functions",
          "lambda",
          "lambdas",
          "logic",
          "math",
          "maths",
          "calc",
          "calcs",
          "calculation",
          "calculations"
        ]
      },
      {
        name: "folder-generator",
        folderNames: [
          "generator",
          "generators",
          "generated",
          "cfn-gen",
          "gen",
          "gens",
          "auto"
        ]
      },
      {
        name: "folder-hook",
        folderNames: ["hook", "hooks", "trigger", "triggers"]
      },
      { name: "folder-job", folderNames: ["job", "jobs"] },
      {
        name: "folder-keys",
        folderNames: [
          "key",
          "keys",
          "token",
          "tokens",
          "jwt",
          "secret",
          "secrets"
        ]
      },
      { name: "folder-layout", folderNames: ["layout", "layouts"] },
      {
        name: "folder-mail",
        folderNames: ["mail", "mails", "email", "emails", "smtp", "mailers"]
      },
      { name: "folder-mappings", folderNames: ["mappings", "mapping"] },
      { name: "folder-meta", folderNames: ["meta"] },
      { name: "folder-changesets", folderNames: ["changesets", "changeset"] },
      {
        name: "folder-packages",
        folderNames: ["package", "packages", "pkg", "pkgs"]
      },
      { name: "folder-shared", folderNames: ["shared", "common"] },
      {
        name: "folder-shader",
        folderNames: ["glsl", "hlsl", "shader", "shaders"]
      },
      { name: "folder-stack", folderNames: ["stack", "stacks"] },
      {
        name: "folder-template",
        folderNames: [
          "template",
          "templates",
          "github/ISSUE_TEMPLATE",
          "github/PULL_REQUEST_TEMPLATE"
        ]
      },
      {
        name: "folder-utils",
        folderNames: ["util", "utils", "utility", "utilities"]
      },
      { name: "folder-supabase", folderNames: ["supabase"] },
      { name: "folder-private", folderNames: ["private"] },
      { name: "folder-linux", folderNames: ["linux", "linuxbsd", "unix"] },
      { name: "folder-windows", folderNames: ["windows", "win", "win32"] },
      {
        name: "folder-macos",
        folderNames: ["macos", "mac", "osx", "DS_Store"]
      },
      {
        name: "folder-error",
        folderNames: ["error", "errors", "err", "errs", "crash", "crashes"]
      },
      { name: "folder-event", folderNames: ["event", "events"] },
      {
        name: "folder-secure",
        folderNames: [
          "auth",
          "authentication",
          "secure",
          "security",
          "cert",
          "certs",
          "certificate",
          "certificates",
          "ssl"
        ]
      },
      { name: "folder-custom", folderNames: ["custom", "customs"] },
      {
        name: "folder-mock",
        folderNames: [
          "draft",
          "drafts",
          "mock",
          "mocks",
          "fixture",
          "fixtures",
          "concept",
          "concepts",
          "sketch",
          "sketches"
        ]
      },
      {
        name: "folder-syntax",
        folderNames: ["syntax", "syntaxes", "spellcheck"]
      },
      { name: "folder-vm", folderNames: ["vm", "vms"] },
      { name: "folder-stylus", folderNames: ["stylus"] },
      { name: "folder-flow", folderNames: ["flow-typed"] },
      {
        name: "folder-rules",
        folderNames: [
          "rule",
          "rules",
          "validation",
          "validations",
          "validator",
          "validators"
        ]
      },
      {
        name: "folder-review",
        folderNames: ["review", "reviews", "revisal", "revisals", "reviewed"]
      },
      {
        name: "folder-animation",
        folderNames: ["anim", "anims", "animation", "animations", "animated"]
      },
      { name: "folder-guard", folderNames: ["guard", "guards"] },
      { name: "folder-prisma", folderNames: ["prisma", "prisma/schema"] },
      { name: "folder-pipe", folderNames: ["pipe", "pipes"] },
      { name: "folder-svg", folderNames: ["svg", "svgs"] },
      {
        name: "folder-vuex-store",
        folderNames: ["store", "stores"],
        enabledFor: ["vue_vuex" /* Vuex */]
      },
      {
        name: "folder-nuxt",
        folderNames: ["nuxt"],
        enabledFor: ["vue_vuex" /* Vuex */, "vue" /* Vue */]
      },
      {
        name: "folder-vue-directives",
        folderNames: ["directives"],
        enabledFor: ["vue_vuex" /* Vuex */, "vue" /* Vue */]
      },
      {
        name: "folder-vue",
        folderNames: ["components"],
        enabledFor: ["vue_vuex" /* Vuex */, "vue" /* Vue */]
      },
      { name: "folder-terraform", folderNames: ["terraform"] },
      {
        name: "folder-mobile",
        folderNames: ["mobile", "mobiles", "portable", "portability"]
      },
      { name: "folder-stencil", folderNames: ["stencil"] },
      { name: "folder-firebase", folderNames: ["firebase"] },
      { name: "folder-svelte", folderNames: ["svelte", "svelte-kit"] },
      {
        name: "folder-update",
        folderNames: ["update", "updates", "upgrade", "upgrades"]
      },
      { name: "folder-intellij", folderNames: ["idea"], light: true },
      {
        name: "folder-azure-pipelines",
        folderNames: ["azure-pipelines", "azure-pipelines-ci"]
      },
      { name: "folder-mjml", folderNames: ["mjml"] },
      {
        name: "folder-admin",
        folderNames: [
          "admin",
          "admins",
          "manager",
          "managers",
          "moderator",
          "moderators"
        ]
      },
      {
        name: "folder-jupyter",
        folderNames: ["jupyter", "notebook", "notebooks"]
      },
      { name: "folder-scala", folderNames: ["scala"] },
      {
        name: "folder-connection",
        folderNames: [
          "connection",
          "connections",
          "integration",
          "integrations"
        ]
      },
      { name: "folder-quasar", folderNames: ["quasar"] },
      { name: "folder-next", folderNames: ["next"] },
      { name: "folder-cobol", folderNames: ["cobol"] },
      { name: "folder-yarn", folderNames: ["yarn"] },
      { name: "folder-husky", folderNames: ["husky"] },
      {
        name: "folder-storybook",
        folderNames: ["storybook", "stories"]
      },
      { name: "folder-base", folderNames: ["base", "bases"] },
      {
        name: "folder-cart",
        folderNames: ["cart", "shopping-cart", "shopping", "shop"]
      },
      {
        name: "folder-home",
        folderNames: ["home", "start"]
      },
      {
        name: "folder-project",
        folderNames: ["project", "projects"]
      },
      {
        name: "folder-interface",
        folderNames: ["interface", "interfaces"]
      },
      { name: "folder-netlify", folderNames: ["netlify"] },
      {
        name: "folder-enum",
        folderNames: ["enum", "enums"]
      },
      {
        name: "folder-contract",
        folderNames: [
          "pact",
          "pacts",
          "contract",
          "contracts",
          "contract-testing",
          "contract-test",
          "contract-tests"
        ]
      },
      {
        name: "folder-helm",
        folderNames: ["helm", "helmchart", "helmcharts"]
      },
      {
        name: "folder-queue",
        folderNames: ["queue", "queues", "bull", "mq"]
      },
      {
        name: "folder-vercel",
        folderNames: ["vercel", "now"]
      },
      {
        name: "folder-cypress",
        folderNames: ["cypress"]
      },
      {
        name: "folder-decorators",
        folderNames: ["decorator", "decorators"]
      },
      {
        name: "folder-java",
        folderNames: ["java"]
      },
      {
        name: "folder-resolver",
        folderNames: ["resolver", "resolvers"]
      },
      {
        name: "folder-angular",
        folderNames: ["angular"]
      },
      {
        name: "folder-unity",
        folderNames: ["unity"]
      },
      {
        name: "folder-pdf",
        folderNames: ["pdf", "pdfs"]
      },
      {
        name: "folder-proto",
        folderNames: ["protobuf", "protobufs", "proto", "protos"]
      },
      {
        name: "folder-plastic",
        folderNames: ["plastic"]
      },
      {
        name: "folder-gamemaker",
        folderNames: ["gamemaker", "gamemaker2"]
      },
      {
        name: "folder-mercurial",
        folderNames: ["hg", "hghooks", "hgext"]
      },
      {
        name: "folder-godot",
        folderNames: ["godot", "godot-cpp"]
      },
      {
        name: "folder-lottie",
        folderNames: ["lottie", "lotties", "lottiefiles"]
      },
      {
        name: "folder-taskfile",
        folderNames: ["taskfile", "taskfiles"]
      },
      {
        name: "folder-cloudflare",
        folderNames: ["cloudflare"]
      },
      {
        name: "folder-seeders",
        folderNames: ["seeds", "seeders", "seed", "seeding"]
      },
      { name: "folder-bicep", folderNames: ["bicep"] },
      { name: "folder-snapcraft", folderNames: ["snap", "snapcraft"] }
    ]
  },
  {
    name: "classic",
    defaultIcon: { name: "folder" },
    rootFolder: { name: "folder-root" }
  },
  { name: "none", defaultIcon: { name: "" } }
];

// src/core/icons/languageIcons.ts
var languageIcons = [
  { icon: { name: "git" }, ids: ["git", "git-commit", "git-rebase", "ignore"] },
  {
    icon: { name: "yaml" },
    ids: [
      "yaml",
      "github-actions-workflow",
      "spring-boot-properties-yaml",
      "ansible",
      "ansible-jinja"
    ]
  },
  { icon: { name: "xml" }, ids: ["xml", "xquery", "xsl"] },
  { icon: { name: "matlab" }, ids: ["matlab"] },
  {
    icon: { name: "settings" },
    ids: ["makefile", "toml", "ini", "properties", "spring-boot-properties"]
  },
  { icon: { name: "shaderlab" }, ids: ["shaderlab"] },
  { icon: { name: "diff" }, ids: ["diff"] },
  { icon: { name: "json" }, ids: ["json", "jsonc", "json5"] },
  { icon: { name: "blink" }, ids: ["blink"] },
  { icon: { name: "java" }, ids: ["java"] },
  { icon: { name: "razor" }, ids: ["razor", "aspnetcorerazor"] },
  { icon: { name: "python" }, ids: ["python"] },
  { icon: { name: "mojo" }, ids: ["mojo"] },
  { icon: { name: "javascript" }, ids: ["javascript"] },
  { icon: { name: "typescript" }, ids: ["typescript"] },
  { icon: { name: "scala" }, ids: ["scala"] },
  { icon: { name: "handlebars" }, ids: ["handlebars"] },
  { icon: { name: "perl" }, ids: ["perl", "perl6"] },
  { icon: { name: "haxe" }, ids: ["haxe", "hxml"] },
  { icon: { name: "puppet" }, ids: ["puppet"] },
  { icon: { name: "elixir" }, ids: ["elixir"] },
  { icon: { name: "livescript" }, ids: ["livescript"] },
  { icon: { name: "erlang" }, ids: ["erlang"] },
  { icon: { name: "twig" }, ids: ["twig"] },
  { icon: { name: "julia" }, ids: ["julia"] },
  { icon: { name: "elm" }, ids: ["elm"] },
  { icon: { name: "purescript" }, ids: ["purescript"] },
  { icon: { name: "stylus" }, ids: ["stylus"] },
  { icon: { name: "nunjucks" }, ids: ["nunjucks"] },
  { icon: { name: "pug" }, ids: ["pug"] },
  { icon: { name: "robot" }, ids: ["robotframework"] },
  { icon: { name: "sass" }, ids: ["sass", "scss"] },
  { icon: { name: "less" }, ids: ["less"] },
  { icon: { name: "css" }, ids: ["css"] },
  { icon: { name: "visualstudio" }, ids: ["testOutput", "vb"] },
  { icon: { name: "angular" }, ids: ["ng-template"] },
  { icon: { name: "graphql" }, ids: ["graphql"] },
  { icon: { name: "solidity" }, ids: ["solidity"] },
  { icon: { name: "autoit" }, ids: ["autoit"] },
  { icon: { name: "haml" }, ids: ["haml"] },
  { icon: { name: "yang" }, ids: ["yang"] },
  { icon: { name: "terraform" }, ids: ["terraform"] },
  { icon: { name: "applescript" }, ids: ["applescript"] },
  { icon: { name: "cake" }, ids: ["cake"] },
  { icon: { name: "cucumber" }, ids: ["cucumber"] },
  { icon: { name: "nim" }, ids: ["nim", "nimble"] },
  { icon: { name: "apiblueprint" }, ids: ["apiblueprint"] },
  { icon: { name: "riot" }, ids: ["riot"] },
  { icon: { name: "postcss" }, ids: ["postcss"] },
  { icon: { name: "coldfusion" }, ids: ["lang-cfml"] },
  { icon: { name: "haskell" }, ids: ["haskell"] },
  { icon: { name: "dhall" }, ids: ["dhall"] },
  { icon: { name: "cabal" }, ids: ["cabal"] },
  { icon: { name: "nix" }, ids: ["nix"] },
  { icon: { name: "ruby" }, ids: ["ruby"] },
  { icon: { name: "slim" }, ids: ["slim"] },
  { icon: { name: "php" }, ids: ["php"] },
  { icon: { name: "php_elephant" }, ids: [] },
  { icon: { name: "php_elephant_pink" }, ids: [] },
  { icon: { name: "hack" }, ids: ["hack"] },
  { icon: { name: "react" }, ids: ["javascriptreact"] },
  { icon: { name: "mjml" }, ids: ["mjml"] },
  { icon: { name: "processing" }, ids: ["processing"] },
  { icon: { name: "hcl" }, ids: ["hcl"] },
  { icon: { name: "go" }, ids: ["go"] },
  { icon: { name: "go_gopher" }, ids: [] },
  { icon: { name: "nodejs_alt" }, ids: [] },
  { icon: { name: "django" }, ids: ["django-html", "django-txt"] },
  { icon: { name: "html" }, ids: ["html"] },
  { icon: { name: "godot" }, ids: ["gdscript"] },
  { icon: { name: "godot-assets" }, ids: ["gdresource", "gdshader"] },
  { icon: { name: "vim" }, ids: ["viml"] },
  { icon: { name: "silverstripe" }, ids: [] },
  { icon: { name: "prolog" }, ids: ["prolog"] },
  { icon: { name: "pawn" }, ids: ["pawn"] },
  { icon: { name: "reason" }, ids: ["reason", "reason_lisp"] },
  { icon: { name: "sml" }, ids: ["sml"] },
  { icon: { name: "tex" }, ids: ["tex", "doctex", "latex", "latex-expl3"] },
  { icon: { name: "salesforce" }, ids: ["apex"] },
  { icon: { name: "sas" }, ids: ["sas"] },
  { icon: { name: "docker" }, ids: ["dockerfile", "dockercompose"] },
  { icon: { name: "table" }, ids: ["csv", "tsv", "psv"] },
  { icon: { name: "csharp" }, ids: ["csharp"] },
  { icon: { name: "console" }, ids: ["bat", "awk", "shellscript"] },
  { icon: { name: "c" }, ids: ["c"] },
  { icon: { name: "cpp" }, ids: ["cpp"] },
  { icon: { name: "objective-c" }, ids: ["objective-c"] },
  { icon: { name: "objective-cpp" }, ids: ["objective-cpp"] },
  { icon: { name: "coffee" }, ids: ["coffeescript"] },
  { icon: { name: "fsharp" }, ids: ["fsharp"] },
  { icon: { name: "editorconfig" }, ids: ["editorconfig"] },
  { icon: { name: "clojure" }, ids: ["clojure"] },
  { icon: { name: "groovy" }, ids: ["groovy"] },
  { icon: { name: "markdown" }, ids: ["markdown"] },
  { icon: { name: "jinja" }, ids: ["jinja"] },
  { icon: { name: "proto" }, ids: ["proto"] },
  { icon: { name: "python-misc" }, ids: ["pip-requirements"] },
  { icon: { name: "vue" }, ids: ["vue", "vue-postcss", "vue-html"] },
  { icon: { name: "lua" }, ids: ["lua"] },
  { icon: { name: "lib" }, ids: ["bibtex", "bibtex-style"] },
  { icon: { name: "log" }, ids: ["log"] },
  { icon: { name: "jupyter" }, ids: ["jupyter"] },
  { icon: { name: "document" }, ids: ["plaintext"] },
  { icon: { name: "pdf" }, ids: ["pdf"] },
  { icon: { name: "powershell" }, ids: ["powershell"] },
  { icon: { name: "pug" }, ids: ["jade"] },
  { icon: { name: "r" }, ids: ["r", "rsweave"] },
  { icon: { name: "rust" }, ids: ["rust"] },
  { icon: { name: "database" }, ids: ["sql"] },
  { icon: { name: "kusto" }, ids: ["kql"] },
  { icon: { name: "lock" }, ids: ["ssh_config"] },
  { icon: { name: "svg" }, ids: ["svg"] },
  { icon: { name: "swift" }, ids: ["swift"] },
  { icon: { name: "react_ts" }, ids: ["typescriptreact"] },
  { icon: { name: "search" }, ids: ["search-result"] },
  { icon: { name: "minecraft" }, ids: ["mcfunction"] },
  { icon: { name: "rescript" }, ids: ["rescript"] },
  { icon: { name: "otne" }, ids: ["otne"] },
  {
    icon: { name: "twine" },
    ids: ["twee3", "twee3-harlowe-3", "twee3-chapbook-1", "twee3-sugarcube-2"]
  },
  { icon: { name: "grain" }, ids: ["grain"] },
  { icon: { name: "lolcode" }, ids: ["lolcode"] },
  { icon: { name: "idris" }, ids: ["idris"] },
  { icon: { name: "chess" }, ids: ["pgn"] },
  { icon: { name: "gemini" }, ids: ["gemini", "text-gemini"] },
  { icon: { name: "vlang" }, ids: ["v"] },
  { icon: { name: "wolframlanguage" }, ids: ["wolfram"] },
  { icon: { name: "shader" }, ids: ["hlsl", "glsl", "wgsl"] },
  { icon: { name: "tree" }, ids: ["tree"] },
  { icon: { name: "svelte" }, ids: ["svelte"] },
  { icon: { name: "dart" }, ids: ["dart"] },
  { icon: { name: "cadence" }, ids: ["cadence"] },
  { icon: { name: "stylable" }, ids: ["stylable"] },
  { icon: { name: "hjson" }, ids: ["hjson"] },
  { icon: { name: "huff" }, ids: ["huff"] },
  {
    icon: { name: "concourse" },
    ids: ["concourse-pipeline-yaml", "concourse-task-yaml"]
  }
];

// src/core/generator/languageGenerator.ts
var loadLanguageIconDefinitions = (languageIcons2, config, manifest) => {
  var _a;
  const enabledLanguages = disableLanguagesByPack(
    languageIcons2,
    config.activeIconPack
  );
  const customIcons = getCustomIcons3((_a = config.languages) == null ? void 0 : _a.associations);
  const allLanguageIcons = [...enabledLanguages, ...customIcons];
  allLanguageIcons.forEach((lang) => {
    if (lang.disabled) return;
    manifest = setIconDefinitions2(manifest, config, lang.icon);
    manifest = merge(
      manifest,
      setLanguageIdentifiers(lang.icon.name, lang.ids)
    );
    manifest.light = lang.icon.light ? merge(
      manifest.light,
      setLanguageIdentifiers(
        lang.icon.name + lightColorFileEnding,
        lang.ids
      )
    ) : manifest.light;
    manifest.highContrast = lang.icon.highContrast ? merge(
      manifest.highContrast,
      setLanguageIdentifiers(
        lang.icon.name + highContrastColorFileEnding,
        lang.ids
      )
    ) : manifest.highContrast;
  });
  return manifest;
};
var setIconDefinitions2 = (manifest, config, icon) => {
  manifest = createIconDefinitions2(manifest, config, icon.name);
  manifest = merge(
    manifest,
    icon.light ? createIconDefinitions2(
      manifest,
      config,
      icon.name + lightColorFileEnding
    ) : manifest.light
  );
  manifest = merge(
    manifest,
    icon.highContrast ? createIconDefinitions2(
      manifest,
      config,
      icon.name + highContrastColorFileEnding
    ) : manifest.highContrast
  );
  return manifest;
};
var createIconDefinitions2 = (manifest, config, iconName) => {
  const fileConfigHash = getFileConfigHash(config);
  if (manifest.iconDefinitions) {
    manifest.iconDefinitions[iconName] = {
      iconPath: `${iconFolderPath}${iconName}${fileConfigHash}.svg`
    };
  }
  return manifest;
};
var setLanguageIdentifiers = (iconName, languageIds) => {
  const obj = { languageIds: {} };
  languageIds.forEach((id) => {
    obj.languageIds[id] = iconName;
  });
  return obj;
};
var getCustomIcons3 = (languageAssociations) => {
  if (!languageAssociations) return [];
  const icons = Object.keys(languageAssociations).map((fa) => ({
    icon: { name: languageAssociations[fa].toLowerCase() },
    ids: [fa.toLowerCase()]
  }));
  return icons;
};
var disableLanguagesByPack = (languageIcons2, activatedIconPack) => {
  return languageIcons2.filter((language) => {
    return !language.enabledFor ? true : language.enabledFor.some((p) => p === activatedIconPack);
  });
};

// src/core/generator/generateManifest.ts
var generateManifest = (config) => {
  const refinedConfig = padWithDefaultConfig(config);
  const manifest = createEmptyManifest();
  const languageIconDefinitions = loadLanguageIconDefinitions(
    languageIcons,
    refinedConfig,
    manifest
  );
  const fileIconDefinitions = loadFileIconDefinitions(
    fileIcons,
    refinedConfig,
    manifest
  );
  const folderIconDefinitions = loadFolderIconDefinitions(
    folderIcons,
    refinedConfig,
    manifest
  );
  return merge(
    languageIconDefinitions,
    fileIconDefinitions,
    folderIconDefinitions
  );
};

// src/core/generator/renameIconFiles.ts
var import_node_fs2 = require("fs");
var import_node_path7 = require("path");
var renameIconFiles = (config) => {
  const defaultIconPath = resolvePath(iconFolderPath);
  const customPaths = getCustomIconPaths(config.files.associations);
  const iconPaths = [defaultIconPath, ...customPaths];
  const fileConfigHash = getFileConfigHash(config);
  for (const iconPath of iconPaths) {
    const files = (0, import_node_fs2.readdirSync)(iconPath).filter((f) => f.match(/\.svg/gi));
    for (const f of files) {
      const filePath = (0, import_node_path7.join)(iconPath, f);
      const newFilePath = (0, import_node_path7.join)(
        iconPath,
        f.replace(/(^[^\.~]+).*?(\.clone\.svg|\.svg)/, `$1${fileConfigHash}$2`)
      );
      try {
        if (filePath !== newFilePath) {
          if ((0, import_node_fs2.existsSync)(newFilePath)) {
            if ((0, import_node_fs2.existsSync)(filePath)) {
              logger.debug(`Deleting existing file: ${filePath}`);
              (0, import_node_fs2.unlinkSync)(filePath);
            }
          } else {
            if ((0, import_node_fs2.existsSync)(filePath)) {
              logger.debug(`Renaming file: ${filePath} to ${newFilePath}`);
              (0, import_node_fs2.renameSync)(filePath, newFilePath);
            }
          }
        }
      } catch (error) {
        logger.error(error);
      }
    }
  }
};

// src/core/helpers/iconPacks.ts
var availableIconPacks = Object.values(IconPack);

// src/core/helpers/titlecase.ts
var capitalizeFirstLetter = (name) => name.charAt(0).toUpperCase() + name.slice(1);
var toTitleCase = (value) => {
  return value.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
};

// src/core/i18n/translations/lang-cs.ts
var translation = {
  activate: "Aktivovat",
  activated: "Material Icon T\xE9ma je aktivn\xED.",
  iconPacks: {
    selectPack: "Vyberte sadu ikon",
    description: "Vyberte sadu ikon '%0'",
    disabled: "Zak\xE1zat bal\xED\u010Dky ikon"
  },
  folders: {
    toggleIcons: "Vyberte motiv slo\u017Eky",
    disabled: "\u017D\xE1dn\xE9 ikony slo\u017Eek",
    theme: {
      description: "Vyberte motiv slo\u017Eky '%0'"
    }
  },
  colorSelect: {
    color: "Vyberte barvu",
    hexCode: "Vlo\u017Ete hexadecim\xE1ln\xED k\xF3d barvy",
    wrongHexCode: "Neplatn\xFD hexadecim\xE1ln\xED k\xF3d barvy!"
  },
  opacity: {
    inputPlaceholder: "Hodnota pr\u016Fhlednosti (od 0 do 1)",
    wrongValue: "Zadejte desetinn\xE9 \u010D\xEDslo mezi 0 a 1."
  },
  toggleSwitch: {
    on: "ZAPNUTO",
    off: "VYPNUTO"
  },
  explorerArrows: {
    toggle: "\u0160ipky slo\u017Eek v pr\u016Fzkumn\xEDkovi",
    enable: "Zobrazit \u0161ipky slo\u017Eek v Pr\u016Fzkumn\xEDkovi",
    disable: "Skr\xFDt \u0161ipky slo\u017Eek v Pr\u016Fzkumn\xEDkovi"
  },
  grayscale: {
    toggle: "Zobrazovat ikony ve stupn\xEDch \u0161edi",
    enable: "Povolit ikony ve stupn\xEDch \u0161edi",
    disable: "Zak\xE1zat ikony ve stupn\xEDch \u0161edi"
  },
  saturation: {
    inputPlaceholder: "Hodnota sytosti (mezi 0 a 1)",
    wrongValue: "Zadejte desetinn\xE9 \u010D\xEDslo mezi 0 a 1."
  }
};

// src/core/i18n/translations/lang-de.ts
var translation2 = {
  activate: "Aktivieren",
  activated: "Material Icon Theme ist jetzt aktiviert.",
  iconPacks: {
    selectPack: "Icon Pack ausw\xE4hlen",
    description: "Das '%0' Icon Pack ausw\xE4hlen",
    disabled: "Icon Packs deaktivieren"
  },
  folders: {
    toggleIcons: "W\xE4hle ein Ordner Design",
    disabled: "Keine Ordner Icons",
    theme: {
      description: "W\xE4hle das '%0' Design"
    }
  },
  colorSelect: {
    color: "W\xE4hle eine Farbe",
    hexCode: "Gebe einen HEX Farbcode ein",
    wrongHexCode: "Ung\xFCltiger HEX Farbcode"
  },
  opacity: {
    inputPlaceholder: "Wert der Deckkraft (zwischen 0 und 1)",
    wrongValue: "Der Wert muss zwischen 0 und 1 liegen!"
  },
  toggleSwitch: {
    on: "EIN",
    off: "AUS"
  },
  explorerArrows: {
    toggle: "Pfeile im Explorer anpassen",
    enable: "Explorer Pfeile anzeigen",
    disable: "Explorer Pfeile ausblenden"
  },
  grayscale: {
    toggle: "Schaltet graustufige Icons um",
    enable: "Aktiviert graustufige Icons",
    disable: "Deaktiviert graustufige Icons"
  },
  saturation: {
    inputPlaceholder: "Wert der S\xE4ttigung (zwischen 0 und 1)",
    wrongValue: "Der Wert muss zwischen 0 und 1 liegen!"
  }
};

// src/core/i18n/translations/lang-en.ts
var translation3 = {
  activate: "Activate",
  activated: "Material Icon Theme is active.",
  iconPacks: {
    selectPack: "Select an icon pack",
    description: "Select the '%0' icon pack",
    disabled: "Disable icon packs"
  },
  folders: {
    toggleIcons: "Pick a folder theme",
    disabled: "No folder icons",
    theme: {
      description: "Select the '%0' folder theme"
    }
  },
  colorSelect: {
    color: "Choose a color",
    hexCode: "Insert a HEX color code",
    wrongHexCode: "Invalid HEX color code!"
  },
  opacity: {
    inputPlaceholder: "Opacity value (between 0 and 1)",
    wrongValue: "Please enter a floating-point number between 0 and 1."
  },
  toggleSwitch: {
    on: "ON",
    off: "OFF"
  },
  explorerArrows: {
    toggle: "Toggle folder arrows in Explorer",
    enable: "Show folder arrows in Explorer",
    disable: "Hide folder arrows in Explorer"
  },
  grayscale: {
    toggle: "Toggle grayscale icons",
    enable: "Enable grayscale icons",
    disable: "Disable grayscale icons"
  },
  saturation: {
    inputPlaceholder: "Saturation value (between 0 and 1)",
    wrongValue: "Please enter a floating-point number between 0 and 1."
  }
};

// src/core/i18n/translations/lang-es.ts
var translation4 = {
  activate: "Activar",
  activated: "Material Icon Theme est\xE1 activado.",
  iconPacks: {
    selectPack: "Seleccione un paquete de iconos",
    description: "Seleccione el paquete de iconos '%0'",
    disabled: "Desactivar paquetes de iconos"
  },
  folders: {
    toggleIcons: "Cambiar activaci\xF3n de iconos de carpetas",
    disabled: "Sin iconos de carpeta",
    theme: {
      description: "Iconos de carpeta '%0'"
    }
  },
  colorSelect: {
    color: "Elija un color",
    hexCode: "Insertar un c\xF3digo de color HEX",
    wrongHexCode: "\xA1C\xF3digo de color HEX inv\xE1lido!"
  },
  opacity: {
    inputPlaceholder: "Valor de opacidad (entre 0 y 1)",
    wrongValue: "\xA1El valor debe estar entre 0 y 1!"
  },
  toggleSwitch: {
    on: "ON",
    off: "OFF"
  },
  explorerArrows: {
    toggle: "Conmutar las flechas de carpetas",
    enable: "Mostrar flechas de carpeta",
    disable: "Ocultar las flechas de carpetas"
  },
  grayscale: {
    toggle: "Alternar los iconos en escala de grises",
    enable: "Activar los iconos en escala de grises",
    disable: "Desactivar los iconos en escala de grises"
  },
  saturation: {
    inputPlaceholder: "Valor de saturaci\xF3n (entre 0 y 1)",
    wrongValue: "El valor debe estar entre 0 y 1."
  }
};

// src/core/i18n/translations/lang-fr.ts
var translation5 = {
  activate: "Activer",
  activated: "Material Icon Theme est actif.",
  iconPacks: {
    selectPack: "S\xE9lectionnez un pack d'ic\xF4nes",
    description: "S\xE9lectionner le pack d'ic\xF4nes '%0'",
    disabled: "D\xE9sactiver les paquets d'ic\xF4nes"
  },
  folders: {
    toggleIcons: "Basculer les ic\xF4nes de dossiers",
    disabled: "Aucune ic\xF4nes de dossiers",
    theme: {
      description: "Ic\xF4nes de dossiers '%0'"
    }
  },
  colorSelect: {
    color: "Choisissez une couleur",
    hexCode: "Ins\xE9rer un code couleur HEX",
    wrongHexCode: "Code couleur HEX non valide!"
  },
  opacity: {
    inputPlaceholder: "Valeur d'opacit\xE9 (entre 0 et 1)",
    wrongValue: "La valeur doit \xEAtre comprise entre 0 et 1!"
  },
  toggleSwitch: {
    on: "ON",
    off: "OFF"
  },
  explorerArrows: {
    toggle: "Basculer les fl\xE8ches du dossier",
    enable: "Afficher les fl\xE8ches du dossier",
    disable: "Cacher les fl\xE8ches de dossier"
  },
  grayscale: {
    toggle: "Basculer les ic\xF4nes en niveaux de gris",
    enable: "Activer les ic\xF4nes en niveaux de gris",
    disable: "D\xE9sactiver les ic\xF4nes en niveaux de gris"
  },
  saturation: {
    inputPlaceholder: "Valeur de saturation (entre 0 et 1)",
    wrongValue: "La valeur doit \xEAtre comprise entre 0 et 1 !"
  }
};

// src/core/i18n/translations/lang-ja.ts
var translation6 = {
  activate: "\u6709\u52B9\u5316",
  activated: "Material Icon Theme \u306F\u6709\u52B9\u3067\u3059\u3002",
  iconPacks: {
    selectPack: "\u30A2\u30A4\u30B3\u30F3\u30D1\u30C3\u30AF\u3092\u9078\u629E\u3059\u308B",
    description: "\u30A2\u30A4\u30B3\u30F3\u30D1\u30C3\u30AF '%0' \u3092\u9078\u629E\u3059\u308B",
    disabled: "\u30A2\u30A4\u30B3\u30F3\u30D1\u30C3\u30AF\u3092\u7121\u52B9\u5316\u3059\u308B"
  },
  folders: {
    toggleIcons: "\u30D5\u30A9\u30EB\u30C0\u30FC\u30A2\u30A4\u30B3\u30F3\u3092\u5207\u308A\u66FF\u3048\u308B",
    disabled: "\u30D5\u30A9\u30EB\u30C0\u30FC\u30A2\u30A4\u30B3\u30F3\u3092\u8868\u793A\u3057\u306A\u3044",
    theme: {
      description: "\u30D5\u30A9\u30EB\u30C0\u30FC\u30C6\u30FC\u30DE '%0' \u3092\u9078\u629E\u3059\u308B"
    }
  },
  colorSelect: {
    color: "\u8272\u3092\u5909\u3048\u308B",
    hexCode: "HEX \u30AB\u30E9\u30FC\u30B3\u30FC\u30C9\u3092\u5165\u529B\u3059\u308B",
    wrongHexCode: "\u7121\u52B9\u306A HEX \u30AB\u30E9\u30FC\u30B3\u30FC\u30C9\u3067\u3059\uFF01"
  },
  opacity: {
    inputPlaceholder: "\u4E0D\u900F\u660E\u5EA6\uFF080\u301C1\uFF09",
    wrongValue: "\u5024\u306F0\u304B\u30891\u306E\u9593\u306B\u3057\u3066\u304F\u3060\u3055\u3044\uFF01"
  },
  toggleSwitch: {
    on: "ON",
    off: "OFF"
  },
  explorerArrows: {
    toggle: "\u30D5\u30A9\u30EB\u30C0\u30FC\u306E\u77E2\u5370\u3092\u5207\u308A\u66FF\u3048\u308B",
    enable: "\u30D5\u30A9\u30EB\u30C0\u30FC\u306E\u77E2\u5370\u3092\u8868\u793A\u3059\u308B",
    disable: "\u30D5\u30A9\u30EB\u30C0\u30FC\u306E\u77E2\u5370\u3092\u96A0\u3059"
  },
  grayscale: {
    toggle: "\u30B0\u30EC\u30FC\u30B9\u30B1\u30FC\u30EB\u30A2\u30A4\u30B3\u30F3\u3092\u5207\u308A\u66FF\u3048\u308B",
    enable: "\u30B0\u30EC\u30FC\u30B9\u30B1\u30FC\u30EB\u30A2\u30A4\u30B3\u30F3\u3092\u6709\u52B9\u306B\u3059\u308B",
    disable: "\u30B0\u30EC\u30FC\u30B9\u30B1\u30FC\u30EB\u30A2\u30A4\u30B3\u30F3\u3092\u7121\u52B9\u306B\u3059\u308B"
  },
  saturation: {
    inputPlaceholder: "\u5F69\u5EA6\uFF080\u301C1\uFF09",
    wrongValue: "\u5024\u306F0\u304B\u30891\u306E\u9593\u306B\u3057\u3066\u304F\u3060\u3055\u3044\uFF01"
  }
};

// src/core/i18n/translations/lang-ko.ts
var translation7 = {
  activate: "\uD65C\uC131\uD654",
  activated: "Material Icon Theme\uC774 \uD65C\uC131\uD654\uB418\uC5C8\uC2B5\uB2C8\uB2E4.",
  iconPacks: {
    selectPack: "\uC544\uC774\uCF58 \uD329 \uC120\uD0DD",
    description: "'%0' \uC544\uC774\uCF58 \uD329 \uC120\uD0DD",
    disabled: "\uC544\uC774\uCF58 \uD329 \uBE44\uD65C\uC131\uD654"
  },
  folders: {
    toggleIcons: "\uD3F4\uB354 \uD14C\uB9C8 \uC120\uD0DD",
    disabled: "\uD3F4\uB354 \uC544\uC774\uCF58 \uC5C6\uC74C",
    theme: {
      description: "'%0' \uD3F4\uB354 \uD14C\uB9C8 \uC120\uD0DD"
    }
  },
  colorSelect: {
    color: "\uC0C9\uC0C1 \uC120\uD0DD",
    hexCode: "HEX \uC0C9\uC0C1 \uCF54\uB4DC \uC785\uB825",
    wrongHexCode: "\uC720\uD6A8\uD558\uC9C0 \uC54A\uC740 HEX \uC0C9\uC0C1 \uCF54\uB4DC\uC785\uB2C8\uB2E4!"
  },
  opacity: {
    inputPlaceholder: "\uD22C\uBA85\uB3C4 \uAC12 (0\uACFC 1 \uC0AC\uC774)",
    wrongValue: "0\uACFC 1 \uC0AC\uC774\uC758 \uBD80\uB3D9 \uC18C\uC218\uC810 \uC22B\uC790\uB97C \uC785\uB825\uD558\uC138\uC694."
  },
  toggleSwitch: {
    on: "\uCF1C\uC9D0",
    off: "\uAEBC\uC9D0"
  },
  explorerArrows: {
    toggle: "\uD30C\uC77C \uD0D0\uC0C9\uAE30\uC758 \uD3F4\uB354 \uD654\uC0B4\uD45C \uC124\uC815",
    enable: "\uD30C\uC77C \uD0D0\uC0C9\uAE30\uC758 \uD3F4\uB354 \uD654\uC0B4\uD45C \uD45C\uC2DC",
    disable: "\uD30C\uC77C \uD0D0\uC0C9\uAE30\uC758 \uD3F4\uB354 \uD654\uC0B4\uD45C \uC228\uAE30\uAE30"
  },
  grayscale: {
    toggle: "\uADF8\uB808\uC774\uC2A4\uCF00\uC77C \uC544\uC774\uCF58 \uC124\uC815",
    enable: "\uADF8\uB808\uC774\uC2A4\uCF00\uC77C \uC544\uC774\uCF58 \uD65C\uC131\uD654",
    disable: "\uADF8\uB808\uC774\uC2A4\uCF00\uC77C \uC544\uC774\uCF58 \uBE44\uD65C\uC131\uD654"
  },
  saturation: {
    inputPlaceholder: "\uCC44\uB3C4 \uAC12 (0\uACFC 1 \uC0AC\uC774)",
    wrongValue: "0\uACFC 1 \uC0AC\uC774\uC758 \uBD80\uB3D9 \uC18C\uC218\uC810 \uC22B\uC790\uB97C \uC785\uB825\uD558\uC138\uC694."
  }
};

// src/core/i18n/translations/lang-nl.ts
var translation8 = {
  activate: "Activeer",
  activated: "Material Icon Thema is actief.",
  iconPacks: {
    selectPack: "Selecteer een iconpakket",
    description: "Selecteer het '%0' iconpakket",
    disabled: "Zet iconpaketten uit"
  },
  folders: {
    toggleIcons: "Kies een folderthema",
    disabled: "Geen foldericons",
    theme: {
      description: "Selecteer het '%0' folderthema"
    }
  },
  colorSelect: {
    color: "Kies een kleur",
    hexCode: "Voeg een HEX kleurcode in",
    wrongHexCode: "Ongeldige HEX kleurcode!"
  },
  opacity: {
    inputPlaceholder: "Doorzichtbaarheidswaarde (tussen 0 en 1)",
    wrongValue: "De waarde moet tussen de 0 en 1 zijn!"
  },
  toggleSwitch: {
    on: "AAN",
    off: "UIT"
  },
  explorerArrows: {
    toggle: "Zet folderpijlen aan of uit",
    enable: "Laat folderpijlen zien",
    disable: "Verberg folderpijlen"
  },
  grayscale: {
    toggle: "Zet grijsgetinte icons aan of uit",
    enable: "Zet grijsgetinte icons aan",
    disable: "Zet grijsgetinte icons uit"
  },
  saturation: {
    inputPlaceholder: "Saturatiewaarde (tussen 0 en 1)",
    wrongValue: "De waarde moet tussen de 0 en 1 zijn!"
  }
};

// src/core/i18n/translations/lang-pl.ts
var translation9 = {
  activate: "Aktywuj",
  activated: "Motyw Material Icon jest aktywny.",
  iconPacks: {
    selectPack: "Wybierz paczk\u0119 ikon",
    description: "Wybierz paczk\u0119 ikon '%0'",
    disabled: "Wy\u0142\u0105cz paczki ikon"
  },
  folders: {
    toggleIcons: "Wybierz motyw folder\xF3w",
    disabled: "Brak ikon folder\xF3w",
    theme: {
      description: "Wybierz motyw folder\xF3w '%0'"
    }
  },
  colorSelect: {
    color: "Wybierz kolor",
    hexCode: "Podaj kolor w formacie HEX",
    wrongHexCode: "Nieprawid\u0142owy kolor HEX!"
  },
  opacity: {
    inputPlaceholder: "Warto\u015B\u0107 przezroczysto\u015Bci (pomi\u0119dzy 0 a 1)",
    wrongValue: "Warto\u015B\u0107 musi by\u0107 pomi\u0119dzy 0 i 1!"
  },
  toggleSwitch: {
    on: "W\u0141\u0104CZONE",
    off: "WY\u0141\u0104CZONE"
  },
  explorerArrows: {
    toggle: "Prze\u0142\u0105cz strza\u0142ki przy folderach",
    enable: "Poka\u017C strza\u0142ki przy folderach",
    disable: "Schowaj strza\u0142ki przy folderach"
  },
  grayscale: {
    toggle: "Prze\u0142\u0105cz czarno-bia\u0142e ikony",
    enable: "W\u0142\u0105cz czarno-bia\u0142e ikony",
    disable: "Wy\u0142\u0105cz czarno-bia\u0142e ikony"
  },
  saturation: {
    inputPlaceholder: "Warto\u015B\u0107 nasycenia (pomi\u0119dzy 0 a 1)",
    wrongValue: "Warto\u015B\u0107 musi by\u0107 pomi\u0119dzy 0 i 1!"
  }
};

// src/core/i18n/translations/lang-pt-br.ts
var translation10 = {
  activate: "Ativar",
  activated: "O Material Icon Theme est\xE1 ativo.",
  iconPacks: {
    selectPack: "Selecione um pacote de \xEDcones",
    description: "Selecionar o pacote de \xEDcones '%0'",
    disabled: "Desabilitar pacotes de \xEDcones"
  },
  folders: {
    toggleIcons: "Escolha um tema para as pastas",
    disabled: "Nenhum \xEDcone de pasta",
    theme: {
      description: "Selecionar o tema para pastas '%0'"
    }
  },
  colorSelect: {
    color: "Escolha uma cor",
    hexCode: "Insira um c\xF3digo de cor hexadecimal",
    wrongHexCode: "C\xF3digo de cor hexadecimal inv\xE1lido!"
  },
  opacity: {
    inputPlaceholder: "Valor de opacidade (entre 0 e 1)",
    wrongValue: "O valor deve estar entre 0 e 1!"
  },
  toggleSwitch: {
    on: "ON",
    off: "OFF"
  },
  explorerArrows: {
    toggle: "Alternar setas do explorador de arquivos",
    enable: "Exibir setas do explorador de arquivos",
    disable: "Ocultar setas do explorador de arquivos"
  },
  grayscale: {
    toggle: "Alternar os \xEDcones em escala de cinza",
    enable: "Habilitar \xEDcones em escala de cinza",
    disable: "Desativar \xEDcones em escala de cinza"
  },
  saturation: {
    inputPlaceholder: "Valor de satura\xE7\xE3o (entre 0 e 1)",
    wrongValue: "O valor deve estar entre 0 e 1!"
  }
};

// src/core/i18n/translations/lang-pt-pt.ts
var translation11 = {
  activate: "Habilitar",
  activated: "O Material Icon Theme est\xE1 habilitado.",
  iconPacks: {
    selectPack: "Seleccione um pacote de \xEDcones",
    description: "Seleccionar o pacote de \xEDcones '%0'",
    disabled: "Desabilitar pacotes de \xEDcones"
  },
  folders: {
    toggleIcons: "Escolhe um tema para os direct\xF3rios",
    disabled: "Nenhum \xEDcone do direct\xF3rio",
    theme: {
      description: "Seleccionar o tema para direct\xF3rios '%0'"
    }
  },
  colorSelect: {
    color: "Escolhe uma cor",
    hexCode: "Insira um c\xF3digo de cor hexadecimal",
    wrongHexCode: "C\xF3digo de cor hexadecimal inv\xE1lido!"
  },
  opacity: {
    inputPlaceholder: "Valor de opacidade (entre 0 e 1)",
    wrongValue: "O valor deve estar entre 0 e 1!"
  },
  toggleSwitch: {
    on: "ON",
    off: "OFF"
  },
  explorerArrows: {
    toggle: "Alternar setas do explorador de ficheiros",
    enable: "Exibir setas do explorador de ficheiros",
    disable: "Ocultar setas do explorador de ficheiros"
  },
  grayscale: {
    toggle: "Alternar \xEDcones em escala de cinzentos",
    enable: "Habilitar \xEDcones em escala de cinzentos",
    disable: "Desactivar \xEDcones em escala de cinzentos"
  },
  saturation: {
    inputPlaceholder: "Valor de satura\xE7\xE3o (entre 0 e 1)",
    wrongValue: "O valor deve estar entre 0 e 1!"
  }
};

// src/core/i18n/translations/lang-ru.ts
var translation12 = {
  activate: "\u0410\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
  activated: "Material Icon Theme \u0430\u043A\u0442\u0438\u0432\u0435\u043D.",
  iconPacks: {
    selectPack: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043D\u0430\u0431\u043E\u0440 \u0438\u043A\u043E\u043D\u043E\u043A",
    description: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C '%0' \u043D\u0430\u0431\u043E\u0440 \u0438\u043A\u043E\u043D\u043E\u043A",
    disabled: "\u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043D\u0430\u0431\u043E\u0440 \u0438\u043A\u043E\u043D\u043E\u043A"
  },
  folders: {
    toggleIcons: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0442\u0435\u043C\u0443 \u043F\u0430\u043F\u043A\u0438",
    disabled: "\u041D\u0435\u0442 \u0438\u043A\u043E\u043D\u043E\u043A \u0434\u043B\u044F \u043F\u0430\u043F\u043A\u0438",
    theme: {
      description: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C '%0' \u0442\u0435\u043C\u0443 \u043F\u0430\u043F\u043A\u0438"
    }
  },
  colorSelect: {
    color: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0446\u0432\u0435\u0442",
    hexCode: "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C HEX-\u043A\u043E\u0434 \u0446\u0432\u0435\u0442\u0430",
    wrongHexCode: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 HEX-\u043A\u043E\u0434 \u0446\u0432\u0435\u0442\u0430!"
  },
  opacity: {
    inputPlaceholder: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043D\u0435\u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u0438 (\u043C\u0435\u0436\u0434\u0443 0 \u0438 1)",
    wrongValue: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043C\u0435\u0436\u0434\u0443 0 \u0438 1!"
  },
  toggleSwitch: {
    on: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C",
    off: "\u0412\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C"
  },
  explorerArrows: {
    toggle: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C/\u0441\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u0440\u0435\u043B\u043A\u0438 \u0443 \u043F\u0430\u043F\u043E\u043A",
    enable: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u0442\u0440\u0435\u043B\u043A\u0438 \u0443 \u043F\u0430\u043F\u043E\u043A",
    disable: "\u0421\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u0440\u0435\u043B\u043A\u0438 \u0443 \u043F\u0430\u043F\u043E\u043A"
  },
  grayscale: {
    toggle: "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0441\u0435\u0440\u044B\u0445 \u0437\u043D\u0430\u0447\u043A\u043E\u0432",
    enable: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0437\u043D\u0430\u0447\u043A\u0438 \u0432 \u043E\u0442\u0442\u0435\u043D\u043A\u0430\u0445 \u0441\u0435\u0440\u043E\u0433\u043E",
    disable: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0437\u043D\u0430\u0447\u043A\u0438 \u0432 \u043E\u0442\u0442\u0435\u043D\u043A\u0430\u0445 \u0441\u0435\u0440\u043E\u0433\u043E"
  },
  saturation: {
    inputPlaceholder: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043D\u0430\u0441\u044B\u0449\u0435\u043D\u043D\u043E\u0441\u0442\u0438 (\u043C\u0435\u0436\u0434\u0443 0 \u0438 1)",
    wrongValue: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043C\u0435\u0436\u0434\u0443 0 \u0438 1!"
  }
};

// src/core/i18n/translations/lang-uk.ts
var translation13 = {
  activate: "\u0410\u043A\u0442\u0438\u0432\u0443\u0432\u0430\u0442\u0438",
  activated: "Material Icon Theme \u0430\u043A\u0442\u0438\u0432\u043E\u0432\u0430\u043D\u0438\u0439.",
  iconPacks: {
    selectPack: "\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u043D\u0430\u0431\u0456\u0440 \u0456\u043A\u043E\u043D\u043E\u043A",
    description: "\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u043D\u0430\u0431\u0456\u0440 \u0437\u043D\u0430\u0447\u043A\u0456\u0432 '%0'",
    disabled: "\u0412\u0438\u043C\u043A\u043D\u0443\u0442\u0438 \u043F\u0430\u043A\u0435\u0442\u0438 \u0437\u043D\u0430\u0447\u043A\u0456\u0432"
  },
  folders: {
    toggleIcons: "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u0438 \u0442\u0435\u043A\u0443 icons",
    disabled: "\u041D\u0435\u043C\u0430\u0454 \u043F\u0456\u043A\u0442\u043E\u0433\u0440\u0430\u043C \u043F\u0430\u043F\u043E\u043A",
    theme: {
      description: "\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u0442\u0435\u043C\u0443 \u043F\u0430\u043F\u043A\u0438 '%0'"
    }
  },
  colorSelect: {
    color: "\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u043A\u043E\u043B\u0456\u0440",
    hexCode: "\u0412\u0432\u0435\u0434\u0456\u0442\u044C HEX \u043A\u043E\u043B\u0456\u0440\u043D\u0438\u0439 \u043A\u043E\u0434",
    wrongHexCode: "\u041D\u0435\u0434\u0456\u0439\u0441\u043D\u0438\u0439 HEX \u043A\u043E\u043B\u0456\u0440\u043D\u0438\u0439 \u043A\u043E\u0434!"
  },
  opacity: {
    inputPlaceholder: "\u0417\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u043D\u0435\u043F\u0440\u043E\u0437\u043E\u0440\u043E\u0441\u0442\u0456 (\u0432\u0456\u0434 0 \u0434\u043E 1)",
    wrongValue: "\u0417\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u043C\u0430\u0454 \u0431\u0443\u0442\u0438 \u0432\u0456\u0434 0 \u0434\u043E 1!"
  },
  toggleSwitch: {
    on: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u0438",
    off: "\u0412\u0456\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0438"
  },
  explorerArrows: {
    toggle: "\u0421\u0442\u0440\u0456\u043B\u043A\u0438 \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u043C\u0438\u043A\u0430\u043D\u043D\u044F \u043F\u0430\u043F\u043E\u043A",
    enable: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0441\u0442\u0440\u0456\u043B\u043A\u0438 \u043F\u0430\u043F\u043A\u0438",
    disable: "\u041F\u0440\u0438\u0445\u043E\u0432\u0430\u0442\u0438 \u0441\u0442\u0440\u0456\u043B\u043A\u0438 \u043F\u0430\u043F\u043A\u0438"
  },
  grayscale: {
    toggle: "\u041F\u0435\u0440\u0435\u043C\u0438\u043A\u0430\u043D\u043D\u044F \u0437\u043D\u0430\u0447\u043A\u0456\u0432 \u0443 \u0432\u0456\u0434\u0442\u0456\u043D\u043A\u0430\u0445 \u0441\u0456\u0440\u043E\u0433\u043E",
    enable: "\u0423\u0432\u0456\u043C\u043A\u043D\u0443\u0442\u0438 \u0437\u043D\u0430\u0447\u043A\u0438 \u0443 \u0432\u0456\u0434\u0442\u0456\u043D\u043A\u0430\u0445 \u0441\u0456\u0440\u043E\u0433\u043E",
    disable: "\u0412\u0438\u043C\u043A\u043D\u0443\u0442\u0438 \u0437\u043D\u0430\u0447\u043A\u0438 \u0443 \u0432\u0456\u0434\u0442\u0456\u043D\u043A\u0430\u0445 \u0441\u0456\u0440\u043E\u0433\u043E"
  },
  saturation: {
    inputPlaceholder: "\u0417\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u043D\u0430\u0441\u0438\u0447\u0435\u043D\u043D\u044F (\u0432\u0456\u0434 0 \u0434\u043E 1)",
    wrongValue: "\u0417\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u043C\u0430\u0454 \u0431\u0443\u0442\u0438 \u0432\u0456\u0434 0 \u0434\u043E 1!"
  }
};

// src/core/i18n/translations/lang-zh-cn.ts
var translation14 = {
  activate: "\u6FC0\u6D3B",
  activated: "Material\u4E3B\u9898\u56FE\u6807\u5DF2\u6FC0\u6D3B",
  iconPacks: {
    selectPack: "\u9009\u62E9\u56FE\u6807\u5305",
    description: "\u9009\u62E9\uFF050\u7B26\u53F7",
    disabled: "\u7981\u7528\u56FE\u6807\u5305"
  },
  folders: {
    toggleIcons: "\u5207\u6362\u6587\u4EF6\u5939\u56FE\u6807\u7684\u663E\u793A",
    disabled: "\u4E0D\u663E\u793A\u6587\u4EF6\u5939\u56FE\u6807",
    theme: {
      description: "'%0'\u4E3B\u9898\u7684\u6587\u4EF6\u5939\u56FE\u6807"
    }
  },
  colorSelect: {
    color: "\u9009\u62E9\u989C\u8272",
    hexCode: "\u63D2\u5165HEX\u989C\u8272\u4EE3\u7801",
    wrongHexCode: "\u65E0\u6548\u7684HEX\u989C\u8272\u4EE3\u7801\uFF01"
  },
  opacity: {
    inputPlaceholder: "\u4E0D\u900F\u660E\u5EA6\u503C\uFF080\u548C1\u4E4B\u95F4\uFF09",
    wrongValue: "\u8BE5\u503C\u5FC5\u987B\u4ECB\u4E8E0\u548C1\u4E4B\u95F4\uFF01"
  },
  toggleSwitch: {
    on: "ON",
    off: "OFF"
  },
  explorerArrows: {
    toggle: "\u5207\u6362\u6587\u4EF6\u5939\u7BAD\u5934",
    enable: "\u663E\u793A\u6587\u4EF6\u5939\u7BAD\u5934",
    disable: "\u9690\u85CF\u6587\u4EF6\u5939\u7BAD\u5934"
  },
  grayscale: {
    toggle: "\u5207\u6362\u7070\u5EA6\u56FE\u6807",
    enable: "\u542F\u7528\u7070\u5EA6\u56FE\u6807",
    disable: "\u7981\u7528\u7070\u5EA6\u56FE\u6807"
  },
  saturation: {
    inputPlaceholder: "\u9971\u548C\u5EA6\u503C\uFF08\u57280\u548C1\u4E4B\u95F4\uFF09\u3002",
    wrongValue: "\u8BE5\u503C\u5FC5\u987B\u57280\u548C1\u4E4B\u95F4!"
  }
};

// src/core/i18n/translations/lang-zh-tw.ts
var translation15 = {
  activate: "\u6FC0\u6D3B",
  activated: "Material\u4E3B\u984C\u5716\u6A19\u5DF2\u6FC0\u6D3B",
  iconPacks: {
    selectPack: "\u9078\u64C7\u5716\u6A19\u5305",
    description: "\u9078\u64C7\uFF050\u7B26\u865F",
    disabled: "\u7981\u7528\u5716\u6A19\u5305"
  },
  folders: {
    toggleIcons: "\u5207\u63DB\u6587\u4EF6\u593E\u5716\u6A19\u7684\u986F\u793A",
    disabled: "\u4E0D\u986F\u793A\u6587\u4EF6\u593E\u5716\u6A19",
    theme: {
      description: "'%0'\u4E3B\u984C\u7684\u6587\u4EF6\u593E\u5716\u6A19"
    }
  },
  colorSelect: {
    color: "\u9009\u62E9\u989C\u8272",
    hexCode: "\u63D2\u5165HEX\u984F\u8272\u4EE3\u78BC",
    wrongHexCode: "\u7121\u6548\u7684HEX\u984F\u8272\u4EE3\u78BC\uFF01"
  },
  opacity: {
    inputPlaceholder: "\u4E0D\u900F\u660E\u5EA6\u503C\uFF080\u548C1\u4E4B\u9593\uFF09",
    wrongValue: "\u8A72\u503C\u5FC5\u9808\u4ECB\u65BC0\u548C1\u4E4B\u9593\uFF01"
  },
  toggleSwitch: {
    on: "ON",
    off: "OFF"
  },
  explorerArrows: {
    toggle: "\u5207\u63DB\u6587\u4EF6\u593E\u7BAD\u982D",
    enable: "\u986F\u793A\u6587\u4EF6\u593E\u7BAD\u982D",
    disable: "\u96B1\u85CF\u6587\u4EF6\u593E\u7BAD\u982D"
  },
  grayscale: {
    toggle: "\u5207\u63DB\u7070\u5EA6\u5716\u6A19",
    enable: "\u555F\u7528\u7070\u5EA6\u5716\u6A19",
    disable: "\u7981\u7528\u7070\u5EA6\u5716\u6A19"
  },
  saturation: {
    inputPlaceholder: "\u98FD\u548C\u5EA6\u503C\uFF08\u57280\u548C1\u4E4B\u9593\uFF09\u3002",
    wrongValue: "\u8A72\u503C\u5FC5\u9808\u57280\u548C1\u4E4B\u9593!"
  }
};

// src/core/i18n/translate.ts
var currentTranslation;
var fallbackTranslation;
var placeholder = "%";
var initTranslations = async (language) => {
  try {
    currentTranslation = await loadTranslation(language);
    fallbackTranslation = await loadTranslation("en");
    logger.info("Translations initialized.");
  } catch (error) {
    logger.error(error);
  }
};
var loadTranslation = async (language) => {
  try {
    return await getTranslationObject(language);
  } catch {
    return await getTranslationObject("en");
  }
};
var getTranslationObject = async (language) => {
  switch (language) {
    case "cs":
      return translation;
    case "de":
      return translation2;
    case "en":
      return translation3;
    case "es":
      return translation4;
    case "fr":
      return translation5;
    case "ja":
      return translation6;
    case "ko":
      return translation7;
    case "nl":
      return translation8;
    case "pl":
      return translation9;
    case "pt-br":
      return translation10;
    case "pt-pt":
      return translation11;
    case "ru":
      return translation12;
    case "uk":
      return translation13;
    case "zh-cn":
      return translation14;
    case "zh-tw":
      return translation15;
    default:
      return translation3;
  }
};
var getTranslationValue = (key, translations = currentTranslation, fallback = fallbackTranslation) => {
  var _a;
  return (_a = get(translations, key)) != null ? _a : get(fallback, key);
};
var translate = (key, ...variables) => {
  const translation16 = getTranslationValue(key);
  if (variables.length === 0) return translation16 != null ? translation16 : key;
  return replace(translation16, ...variables);
};
var replace = (value = "", ...variables) => {
  let translation16 = value;
  variables.forEach((variable, i) => {
    translation16 = translation16.replace(`${placeholder}${i}`, variable);
  });
  return translation16;
};

// src/extension/logging/logger.ts
var import_vscode2 = require("vscode");

// src/extension/shared/config.ts
var import_vscode = require("vscode");
var getConfig = (section) => {
  return import_vscode.workspace.getConfiguration(section);
};
var getConfigProperties = () => {
  var _a, _b, _c, _d;
  return (_d = (_c = (_b = (_a = import_vscode.extensions.getExtension(`${extensionPublisher}.${extensionName}`)) == null ? void 0 : _a.packageJSON) == null ? void 0 : _b.contributes) == null ? void 0 : _c.configuration) == null ? void 0 : _d.properties;
};
var configPropertyNames = Object.keys(getConfigProperties());
var setConfig = (section, value, global = false) => {
  return getConfig().update(section, value, global);
};
var getThemeConfig = (section) => {
  const themeConfig = getConfig(extensionName).inspect(section);
  return getConfigValue(themeConfig);
};
var setThemeConfig = (section, value, global = false) => {
  return getConfig(extensionName).update(section, value, global);
};
var getConfigValue = (themeConfig) => {
  var _a, _b;
  let configValue;
  if (themeConfig === void 0) {
    return void 0;
  }
  if (typeof themeConfig.workspaceValue === "object" && themeConfig.workspaceValue && themeConfig.globalValue) {
    configValue = merge(themeConfig.workspaceValue, themeConfig.globalValue);
  } else {
    configValue = (_b = (_a = themeConfig.workspaceValue) != null ? _a : themeConfig.globalValue) != null ? _b : themeConfig.defaultValue;
  }
  return configValue;
};
var getCurrentConfig = () => {
  const updatedConfig = configPropertyNames.reduce(
    (acc, configNameWithExtensionId) => {
      var _a;
      const configName = configNameWithExtensionId.replace(
        `${extensionName}.`,
        ""
      );
      const configValue = (_a = getThemeConfig(configName)) != null ? _a : null;
      set(acc, configName, configValue);
      return acc;
    },
    {}
  );
  return updatedConfig;
};

// src/extension/logging/logger.ts
var eventEmitter;
var observeLogs = () => {
  var _a, _b;
  const logLevel = (_a = getThemeConfig("logLevel")) != null ? _a : "info";
  const isLoggingEnabled = (_b = getThemeConfig("enableLogging")) != null ? _b : false;
  let outputChannel;
  if (isLoggingEnabled) {
    outputChannel = import_vscode2.window.createOutputChannel(
      toTitleCase(extensionName.replaceAll("-", " "))
    );
  }
  eventEmitter = createLoggingObserver(logLevel, (event) => {
    if (outputChannel) {
      outputChannel.appendLine(event.message);
    } else {
      console.log(event.message);
    }
  });
};
var disableLogObserver = () => {
  if (eventEmitter) {
    eventEmitter.removeAllListeners();
  }
};

// src/extension/tools/changeDetection.ts
var import_node_path8 = require("path");
var import_fast_deep_equal = __toESM(require_fast_deep_equal());
var detectConfigChanges = async (event, context) => {
  if ((event == null ? void 0 : event.affectsConfiguration(extensionName)) === false) return;
  const oldConfig = getConfigFromStorage(context);
  const config = getCurrentConfig();
  if ((0, import_fast_deep_equal.default)(config, oldConfig)) return;
  await applyConfigToIcons(config, oldConfig);
  logger.info("Configuration changes detected and applied!");
  await renameIconFiles(config);
  const manifest = generateManifest(config);
  await clearCloneFolder(hasCustomClones(config));
  const manifestWithClones = merge(
    manifest,
    await customClonesIcons(manifest, config)
  );
  const iconJsonPath = (0, import_node_path8.join)(resolvePath(manifestName));
  await writeToFile(
    iconJsonPath,
    JSON.stringify(manifestWithClones, void 0, 2),
    "utf-8"
  );
  logger.info("Updated the manifest file.");
  logger.debug(
    "Applied configuration: " + JSON.stringify(config, void 0, 2)
  );
  syncConfigWithStorage(config, context);
};
var syncConfigWithStorage = (config, context) => {
  context.globalState.update("config", {
    version: context.extension.packageJSON.version,
    config
  });
};
var getConfigFromStorage = (context) => {
  const config = context.globalState.get(
    "config"
  );
  if (context.extension.packageJSON.version === (config == null ? void 0 : config.version)) {
    return padWithDefaultConfig(config == null ? void 0 : config.config);
  } else {
    return padWithDefaultConfig();
  }
};

// src/extension/tools/registered.ts
var import_vscode12 = require("vscode");

// src/extension/commands/activate.ts
var import_vscode3 = require("vscode");
var activateIcons = () => {
  return setIconTheme();
};
var setIconTheme = async () => {
  var _a;
  try {
    const section = "workbench.iconTheme";
    await getConfig().update(section, extensionName, true);
    if ((_a = getConfig().inspect(section)) == null ? void 0 : _a.workspaceValue) {
      getConfig().update(section, extensionName);
    }
    import_vscode3.window.showInformationMessage(translate("activated"));
  } catch (error) {
    logger.error(error);
  }
};

// src/extension/commands/explorerArrows.ts
var import_vscode4 = require("vscode");
var toggleExplorerArrows = async () => {
  try {
    const status = areExplorerArrowsHidden();
    const response = await showQuickPickItems(status);
    return handleQuickPickActions(response);
  } catch (error) {
    logger.error(error);
  }
};
var showQuickPickItems = (status) => {
  const on = {
    description: translate("toggleSwitch.on"),
    detail: translate("explorerArrows.enable"),
    label: !status ? "\u2714" : "\u25FB"
  };
  const off = {
    description: translate("toggleSwitch.off"),
    detail: translate("explorerArrows.disable"),
    label: status ? "\u2714" : "\u25FB"
  };
  return import_vscode4.window.showQuickPick([on, off], {
    placeHolder: translate("explorerArrows.toggle"),
    ignoreFocusOut: false,
    matchOnDescription: true
  });
};
var handleQuickPickActions = (value) => {
  if (!(value == null ? void 0 : value.description)) return;
  switch (value.description) {
    case translate("toggleSwitch.on"): {
      return setThemeConfig("hidesExplorerArrows", false, true);
    }
    case translate("toggleSwitch.off"): {
      return setThemeConfig("hidesExplorerArrows", true, true);
    }
    default:
      return;
  }
};
var areExplorerArrowsHidden = () => {
  return getThemeConfig("hidesExplorerArrows") === true;
};

// src/extension/commands/fileColor.ts
var import_vscode5 = require("vscode");
var iconPalette = [
  { label: "Grey (Default)", hex: "#90a4ae" },
  { label: "Blue", hex: "#42a5f5" },
  { label: "Green", hex: "#7CB342" },
  { label: "Teal", hex: "#26A69A" },
  { label: "Red", hex: "#EF5350" },
  { label: "Orange", hex: "#FF7043" },
  { label: "Yellow", hex: "#FDD835" },
  { label: "Custom Color", hex: "Custom HEX Code" }
];
var changeFileColor = async () => {
  try {
    const status = checkFileColorStatus();
    const response = await showQuickPickItems2(status);
    if (response) {
      handleQuickPickActions2(response);
    }
  } catch (error) {
    logger.error(error);
  }
};
var showQuickPickItems2 = (currentColor) => {
  const options = iconPalette.map(
    (color) => ({
      description: color.label,
      label: isColorActive(color, currentColor) ? "\u2714" : "\u25FB"
    })
  );
  return import_vscode5.window.showQuickPick(options, {
    placeHolder: translate("colorSelect.color"),
    ignoreFocusOut: false,
    matchOnDescription: true
  });
};
var handleQuickPickActions2 = async (value) => {
  var _a;
  if (!value || !value.description) return;
  if (value.description === "Custom Color") {
    const value2 = await import_vscode5.window.showInputBox({
      placeHolder: translate("colorSelect.hexCode"),
      ignoreFocusOut: true,
      validateInput: validateColorInput
    });
    if (value2) {
      setColorConfig(value2);
    }
  } else {
    const hexCode = (_a = iconPalette.find((c) => c.label === value.description)) == null ? void 0 : _a.hex;
    if (hexCode) {
      setColorConfig(hexCode);
    }
  }
};
var validateColorInput = (colorInput) => {
  if (!validateHEXColorCode(colorInput)) {
    return translate("colorSelect.wrongHexCode");
  }
  return void 0;
};
var checkFileColorStatus = () => {
  var _a;
  const defaultConfig = getDefaultConfig();
  return (_a = getThemeConfig("files.color")) != null ? _a : defaultConfig.files.color;
};
var setColorConfig = (value) => {
  setThemeConfig("files.color", value.toLowerCase(), true);
};
var isColorActive = (color, currentColor) => {
  if (color.label === "Custom Color") {
    return !iconPalette.some(
      (c) => c.hex.toLowerCase() === currentColor.toLowerCase()
    );
  }
  return color.hex.toLowerCase() === currentColor.toLowerCase();
};

// src/extension/commands/folderColor.ts
var import_vscode6 = require("vscode");
var iconPalette2 = [
  { label: "Grey (Default)", hex: "#90a4ae" },
  { label: "Blue", hex: "#42a5f5" },
  { label: "Green", hex: "#7CB342" },
  { label: "Teal", hex: "#26A69A" },
  { label: "Red", hex: "#EF5350" },
  { label: "Orange", hex: "#FF7043" },
  { label: "Yellow", hex: "#FDD835" },
  { label: "Custom Color", hex: "Custom HEX Code" }
];
var changeFolderColor = async () => {
  try {
    const status = checkFolderColorStatus();
    const response = await showQuickPickItems3(status);
    if (response) {
      handleQuickPickActions3(response);
    }
  } catch (error) {
    logger.error(error);
  }
};
var showQuickPickItems3 = (currentColor) => {
  const options = iconPalette2.map(
    (color) => ({
      description: color.label,
      label: isColorActive2(color, currentColor) ? "\u2714" : "\u25FB"
    })
  );
  return import_vscode6.window.showQuickPick(options, {
    placeHolder: translate("colorSelect.color"),
    ignoreFocusOut: false,
    matchOnDescription: true
  });
};
var handleQuickPickActions3 = async (value) => {
  var _a;
  if (!value || !value.description) return;
  if (value.description === "Custom Color") {
    const value2 = await import_vscode6.window.showInputBox({
      placeHolder: translate("colorSelect.hexCode"),
      ignoreFocusOut: true,
      validateInput: validateColorInput2
    });
    if (value2) {
      setColorConfig2(value2);
    }
  } else {
    const hexCode = (_a = iconPalette2.find((c) => c.label === value.description)) == null ? void 0 : _a.hex;
    if (hexCode) {
      setColorConfig2(hexCode);
    }
  }
};
var validateColorInput2 = (colorInput) => {
  if (!validateHEXColorCode(colorInput)) {
    return translate("colorSelect.wrongHexCode");
  }
  return void 0;
};
var checkFolderColorStatus = () => {
  const defaultConfig = getDefaultConfig();
  const folderColorConfig = getThemeConfig("folders.color");
  return folderColorConfig != null ? folderColorConfig : defaultConfig.folders.color;
};
var setColorConfig2 = (value) => {
  setThemeConfig("folders.color", value.toLowerCase(), true);
};
var isColorActive2 = (color, currentColor) => {
  if (color.label === "Custom Color") {
    return !iconPalette2.some(
      (c) => c.hex.toLowerCase() === currentColor.toLowerCase()
    );
  }
  return color.hex.toLowerCase() === currentColor.toLowerCase();
};

// src/extension/commands/folders.ts
var import_vscode7 = require("vscode");
var changeFolderTheme = async () => {
  try {
    const status = getFolderIconTheme();
    const response = await showQuickPickItems4(status);
    if (response) {
      handleQuickPickActions4(response);
    }
  } catch (error) {
    logger.error(error);
  }
};
var showQuickPickItems4 = (activeTheme) => {
  const options = folderIcons.map(
    (theme) => ({
      description: capitalizeFirstLetter(theme.name),
      detail: theme.name === "none" ? translate("folders.disabled") : translate(
        "folders.theme.description",
        capitalizeFirstLetter(theme.name)
      ),
      label: theme.name === activeTheme ? "\u2714" : "\u25FB"
    })
  );
  return import_vscode7.window.showQuickPick(options, {
    placeHolder: translate("folders.toggleIcons"),
    ignoreFocusOut: false,
    matchOnDescription: true
  });
};
var handleQuickPickActions4 = (value) => {
  if (!value || !value.description) return;
  return setThemeConfig("folders.theme", value.description.toLowerCase(), true);
};
var getFolderIconTheme = () => {
  var _a;
  return (_a = getThemeConfig("folders.theme")) != null ? _a : "none";
};

// src/extension/commands/grayscale.ts
var import_vscode8 = require("vscode");
var toggleGrayscale = async () => {
  try {
    const status = checkGrayscaleStatus();
    const response = await showQuickPickItems5(status);
    if (response) {
      handleQuickPickActions5(response);
    }
  } catch (error) {
    logger.error(error);
  }
};
var showQuickPickItems5 = (status) => {
  const on = {
    description: translate("toggleSwitch.on"),
    detail: translate("grayscale.enable"),
    label: status ? "\u2714" : "\u25FB"
  };
  const off = {
    description: translate("toggleSwitch.off"),
    detail: translate("grayscale.disable"),
    label: !status ? "\u2714" : "\u25FB"
  };
  return import_vscode8.window.showQuickPick([on, off], {
    placeHolder: translate("grayscale.toggle"),
    ignoreFocusOut: false,
    matchOnDescription: true
  });
};
var handleQuickPickActions5 = (value) => {
  if (!value || !value.description) return;
  switch (value.description) {
    case translate("toggleSwitch.on"): {
      return setThemeConfig("saturation", 0, true);
    }
    case translate("toggleSwitch.off"): {
      return setThemeConfig("saturation", 1, true);
    }
    default:
      return;
  }
};
var checkGrayscaleStatus = () => {
  return getThemeConfig("saturation") === 0;
};

// src/extension/commands/iconPacks.ts
var import_vscode9 = require("vscode");
var toggleIconPacks = async () => {
  try {
    const activeIconPack = getActiveIconPack();
    const response = await showQuickPickItems6(activeIconPack);
    if (response) {
      handleQuickPickActions6(response);
    }
  } catch (error) {
    logger.error(error);
  }
};
var showQuickPickItems6 = (activePack) => {
  const packs = [...availableIconPacks.sort(), "none"];
  const options = packs.map((pack) => {
    const packLabel = toTitleCase(pack.replace("_", " + "));
    const active = isPackActive(activePack, pack);
    const iconPacksDeactivated = pack === "none" && activePack === "";
    return {
      description: packLabel,
      detail: translate(
        `iconPacks.${pack === "none" ? "disabled" : "description"}`,
        packLabel
      ),
      label: iconPacksDeactivated ? "\u2714" : active ? "\u2714" : "\u25FB"
    };
  });
  return import_vscode9.window.showQuickPick(options, {
    placeHolder: translate("iconPacks.selectPack"),
    ignoreFocusOut: false,
    matchOnDescription: true,
    matchOnDetail: true
  });
};
var handleQuickPickActions6 = (value) => {
  if (!value || !value.description) return;
  const decision = value.description.replace(" + ", "_").toLowerCase();
  setThemeConfig("activeIconPack", decision === "none" ? "" : decision, true);
};
var getActiveIconPack = () => {
  var _a;
  return (_a = getThemeConfig("activeIconPack")) != null ? _a : "";
};
var isPackActive = (activePack, pack) => {
  return activePack.toLowerCase() === pack.toLowerCase();
};

// src/extension/commands/opacity.ts
var import_vscode10 = require("vscode");
var changeOpacity = async () => {
  try {
    const currentOpacityValue = getCurrentOpacityValue();
    const response = await showInput(currentOpacityValue);
    if (response) {
      await setOpacityConfig(+response);
    }
  } catch (error) {
    logger.error(error);
  }
};
var showInput = (opacity) => {
  return import_vscode10.window.showInputBox({
    placeHolder: translate("opacity.inputPlaceholder"),
    ignoreFocusOut: true,
    value: opacity.toString(),
    validateInput: validateOpacityInput
  });
};
var validateOpacityInput = (opacityInput) => {
  if (!validateOpacityValue(+opacityInput)) {
    return translate("opacity.wrongValue");
  }
  return void 0;
};
var getCurrentOpacityValue = () => {
  var _a;
  const defaultConfig = getDefaultConfig();
  return (_a = getThemeConfig("opacity")) != null ? _a : defaultConfig.opacity;
};
var setOpacityConfig = (opacity) => {
  return setThemeConfig("opacity", opacity, true);
};

// src/extension/commands/restoreConfig.ts
var restoreDefaultConfig = async () => {
  const configProperties = Object.keys(getConfigProperties());
  await Promise.all(
    configProperties.map(
      (configProperty) => setConfig(configProperty, void 0, true)
    )
  );
};

// src/extension/commands/saturation.ts
var import_vscode11 = require("vscode");
var changeSaturation = async () => {
  try {
    const currentSaturationValue = getCurrentSaturationValue();
    const response = await showInput2(currentSaturationValue);
    if (response) {
      await setSaturationConfig(+response);
    }
  } catch (error) {
    logger.error(error);
  }
};
var showInput2 = (saturation) => {
  return import_vscode11.window.showInputBox({
    placeHolder: translate("saturation.inputPlaceholder"),
    ignoreFocusOut: true,
    value: saturation.toString(),
    validateInput: validateSaturationInput
  });
};
var validateSaturationInput = (saturationInput) => {
  if (!validateSaturationValue(+saturationInput)) {
    return translate("saturation.wrongValue");
  }
  return void 0;
};
var getCurrentSaturationValue = () => {
  var _a;
  const defaultConfig = getDefaultConfig();
  return (_a = getThemeConfig("saturation")) != null ? _a : defaultConfig.saturation;
};
var setSaturationConfig = (saturation) => {
  return setThemeConfig("saturation", saturation, true);
};

// src/extension/tools/registered.ts
var extensionCommands = {
  activateIcons,
  toggleIconPacks,
  changeFolderTheme,
  changeFolderColor,
  changeFileColor,
  restoreDefaultConfig,
  toggleExplorerArrows,
  changeOpacity,
  toggleGrayscale,
  changeSaturation
};
var registered = Object.keys(extensionCommands).map((commandName) => {
  const callCommand = () => extensionCommands[commandName]();
  return import_vscode12.commands.registerCommand(
    `${extensionName}.${commandName}`,
    callCommand
  );
});

// src/extension/desktop/extension.ts
var activate = async (context) => {
  try {
    observeLogs();
    await initTranslations(import_vscode13.env.language);
    context.subscriptions.push(...registered);
    await detectConfigChanges(void 0, context);
    context.subscriptions.push(
      import_vscode13.workspace.onDidChangeConfiguration(
        async (event) => await detectConfigChanges(event, context)
      )
    );
    logger.info("Extension activated!");
  } catch (error) {
    logger.error(error);
  }
};
var deactivate = () => {
  disableLogObserver();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

deep-rename-keys/index.js:
  (*!
   * deep-rename-keys <https://github.com/jonschlinkert/deep-rename-keys>
   *
   * Copyright (c) 2015 Jon Schlinkert, contributors.
   * Licensed under the MIT license.
   *)

chroma-js/chroma.js:
  (**
   * chroma.js - JavaScript library for color conversions
   *
   * Copyright (c) 2011-2019, Gregor Aisch
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * 1. Redistributions of source code must retain the above copyright notice, this
   * list of conditions and the following disclaimer.
   *
   * 2. Redistributions in binary form must reproduce the above copyright notice,
   * this list of conditions and the following disclaimer in the documentation
   * and/or other materials provided with the distribution.
   *
   * 3. The name Gregor Aisch may not be used to endorse or promote products
   * derived from this software without specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
   * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
   * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
   * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
   * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
   * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
   * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
   * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
   * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   *
   * -------------------------------------------------------
   *
   * chroma.js includes colors from colorbrewer2.org, which are released under
   * the following license:
   *
   * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
   * and The Pennsylvania State University.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing,
   * software distributed under the License is distributed on an
   * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
   * either express or implied. See the License for the specific
   * language governing permissions and limitations under the License.
   *
   * ------------------------------------------------------
   *
   * Named colors are taken from X11 Color Names.
   * http://www.w3.org/TR/css3-color/#svg-color
   *
   * @preserve
   *)
*/
