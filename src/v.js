
var V = (function() {

  "use strict";

  var self = this;

  this.VERSION = '1.0.0';

  // "protected" functions

  // public functions

  this.compose = function() {

    var as = arguments;

    return function(o) {
      for (var i = 0, l = as.length; i < l; i++) {
        if ( ! as[i](o)) return false;
      }
      return true;
    };
  };

  //this.narrow = function(x) {
  //  if (typeof x !== 'object') return x;
  //  if (Array.isArray(x)) return x;
  //  if (x.outerHTML) return x.value;
  //  return x;
  //};

  this.isString = function(o) { return (typeof o === 'string'); };
  this.isNumber = function(o) { return (typeof o === 'number'); };
  this.isArray = Array.isArray;
  this.isObject = function(o) { return (typeof o === 'object'); };
  this.isNull = function(o) { return o === null; };
  this.isUndefined = function(o) { return o === undefined; };
  this.isBoolean = function(o) { return (o === true || o === false); };

  this.isNil = self.compose(self.isNull, self.isUndefined);

  this.determineType = function(o) {
    var t = (typeof o);
    if (Array.isArray(o)) return 'array';
    if (o === null) return 'null';
    if (o === undefined) return 'undefined';
    return t;
  };

  this.length = function(o) {
    var t = self.determineType(o);
    if (t === 'string' || t === 'array') return o.length;
    if (t === 'object') return Object.keys(o).length;
    return undefined;
  };

  this.isEmpty = function(o) {
    var l = self.length(o); return l ? l < 0 : undefined;
  }
  this.hasAny = function(o) {
    var l = self.length(o); return l ? l > 0 : undefined;
  }

  // Took the regex from:
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
  //
  this.isEmail = function(o) {
    if ( ! isString(o)) return false;
    return o.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
  }

  //
  // done.

  return this;

}).apply({}); // end V

