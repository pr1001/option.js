var object = (function() {
     function F() {}
     return function(o) {
        F.prototype = o;
        F.prototype.__value = null;
        F.prototype.isEmpty = function() { throw new Error() }
        F.prototype.isDefined = function() { return !this.isEmpty() }
        F.prototype.get = function() { throw new Error() }
        F.prototype.getOrElse = function(alternative) {
          return (this.isEmpty() ? alternative : this.get())
        }
        F.prototype.elements = function() { throw new Error() }
        F.prototype.foreach = function(f) {
          if (this.isDefined()) { f(this.get()) }
        }
        F.prototype.map = function(f) {
          return (this.isEmpty() ? None : Some(f(this.get())))
        }
        F.prototype.flatMap = function(f) {
          return (this.isEmpty() ? None : f(this.get()))
        }
        F.prototype.filter = function(f) {
          if (this.isEmpty() || f(this.get())) {
            return this
          }
          else {
            return None
          }
        }
        F.prototype.toArray = function() { return this.elements() }
        F.prototype.toString = function() { return "Option" }
        return new F();
     };
})();

function Option(val, proto) {
  var p = object(proto || Option.prototype);
  p.__value = val;
  return p;
}

function Some(val, proto) {
  if (typeof(val) == "undefined") { return None }
  var g = object(Option(val, proto || Some.prototype));
  g.__value = val;
  g.isEmpty = function() { return false }
  g.get = function() { return this.__value }
  g.elements = function() { return [this.get()] }
  g.toString = function() { return "Some(" + this.get() + ")" }
  return g;
}
Some.prototype = object(Option.prototype);
Some.__proto__ = Option.prototype;

function None(val, proto) {
  var g = object(Option(val, proto || None.prototype));
  g.isEmpty = function() { return true }
  g.elements = function() { return [] }
  g.toString = function() { return "None" }
  return g;
}
None.prototype = object(Option.prototype);
None.__proto__ = Option.prototype;
// create the None singleton
None = None();