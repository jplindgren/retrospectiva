/*
function foo(){
	var bar = "bar function";
	baz();
}

function baz(){
		console.log(this.bar);
	}

bar = "bar global";
foo();
*/

var o1 = {
	bar: "bar1",
	foo: function(){
		console.log(this.bar);
	}
}

var o2 = { bar: "bar2", foo: o1.foo };

var bar = "bar global";
var foo = o1.foo;

foo();
o1.foo();
o2.foo();

console.log('********************** hard bind ********************')

foo = bind(foo, o1);
foo();
o1.foo();
foo.call(o2);


/* hard Bind */
function bind(fn, o){
	return function(){
		fn.call(o);
	}
}

/* or we can use a prototype of function to define a new bind method! */
if (!function.prototype.bind2){
	function.prototype.bind2 = function(o){
		var fn = this;
		return function(){
			fn.apply(o, arguments);
		};
	};
}
//example
//foo = foo.bind2(o1);
//foo.call(o2); should return o1 bar;