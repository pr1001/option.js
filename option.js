function Option()
{
  this.__value = null;
  this.isEmpty = function() { throw new Error() }
  this.isDefined = function() { return !this.isEmpty() }
  this.get = function() { throw new Error() }
  this.getOrElse = function(alternative) {
    return (this.isEmpty() ? alternative : this.get())
  }
  this.elements = function() { throw new Error() }
  this.foreach = function(f) {
    if (!this.isEmpty()) { return f(this.get()) }
  }
  this.map = function(f) {
    return (this.isEmpty() ? None : new Some(f(this.get())))
  }
  this.flatMap = function(f) {
    return (this.isEmpty() ? None : f(this.get()))
  }
  this.filter = function(f) {
    if (this.isEmpty() || f(this.get())) {
      return this
    }
    else {
      return None
    }
  }
  this.toArray = function() { return this.elements() }
  this.toString = function() { return "Option" }
}


/* (new Some) instanceof Option -> true */
function Some(val) {
  // if you try to create a Some with no value, you're actually dealing with a None
  if (typeof(val) == "undefined") { return None }
  this.__value = val;
  this.isEmpty = function() { return false }
  this.get = function() { return this.__value }
  this.elements = function() { return [this.get()] }
  this.toString = function() { return "Some(" + this.get() + ")" }
}
Some.prototype = new Option
Some.prototype.constructor = Some

/* None instanceof Option -> true */
function None() {
  this.isEmpty = function() { return true }
  this.elements = function() { return [] }
  this.toString = function() { return "None" }
}
None.prototype = new Option
None.prototype.constructor = None
/* ugly way to have None inherit from Option but still be a singleton */
var None = new None()
