function Option()
{
    this.__value = null;
}
Option.prototype.isEmpty = function() {
	throw new Error();
}
Option.prototype.isDefined = function() {
	throw new Error();
}
Option.prototype.get = function() {
	throw new Error();
}
Option.prototype.getOrElse = function(alternative) {
	throw new Error();
}
Option.prototype.elements = function() {
	if (this.isEmpty) { return []; }
	return [this.get()];
}

/* (new Some) instanceof Option -> false */
function Some(val)
{
    this.__value = val;
    this.isEmpty = false;
    this.isDefined = true;
}
Some.prototype = new Option;            // Hook up Option into Some's prototype chain
Some.prototype.constructor = Some;
Some.prototype.get = function() {
    return this.__value;
}
Some.prototype.getOrElse = function(alternative) {
	return this.get();
}

/* None instanceof Option -> true */
function None() {};
None.prototype = new Option;
None.prototype.constructor = None;
None.prototype.isEmpty = true;
None.prototype.isDefined = false;
None.prototype.getOrElse = function(alternative) {
	if (typeof(alternative) == "function") {
		return alternative();
	}
	return alternative;
}
/* ugly way to have None inherit from Option but still be a singleton */
var None = new None();

