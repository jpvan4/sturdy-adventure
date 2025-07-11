/*!
* jQuery JavaScript Library v3.2.1
* https://jquery.com/
*
* Includes Sizzle.js
* https://sizzlejs.com/
*
* Copyright JS Foundation and other contributors
* Released under the MIT license
* https://jquery.org/license
*
* Date: 2017-03-20T18:59Z
*/
( function( global, factory ) {
"use strict";
if ( typeof module === "object" && typeof module.exports === "object"
) {

// For CommonJS and CommonJS-like environments where a proper

`window`

// is present, execute the factory and get jQuery.
// For environments that do not have a `window` with a `document`
// (such as Node.js), expose a factory as module.exports.
// This accentuates the need for the creation of a real `window`.
// e.g. var jQuery = require("jquery")(window);
// See ticket #14549 for more info.
module.exports = global.document ?
factory( global, true ) :
function( w ) {
if ( !w.document ) {
throw new Error( "jQuery requires a window with

a document" );

}
return factory( w );
};
} else {
factory( global );
}
// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal
) {
// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6
- 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict

mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict
mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";
var arr = [];
var document = window.document;
var getProto = Object.getPrototypeOf;
var slice = arr.slice;
var concat = arr.concat;
var push = arr.push;
var indexOf = arr.indexOf;
var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call( Object );
var support = {};

function DOMEval( code, doc ) {
doc = doc || document;
var script = doc.createElement( "script" );
script.text = code;
doc.head.appendChild( script ).parentNode.removeChild( script );
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the
global
// unguarded in another place, it seems safer to define global only for this
module

var
version = "3.2.1",
// Define a local copy of jQuery
jQuery = function( selector, context ) {
// The jQuery object is actually just the init constructor

'enhanced'

// Need init if jQuery is called (just allow error to be thrown

if not included)

return new jQuery.fn.init( selector, context );
},
// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
// Matches dashed string for camelizing
rmsPrefix = /^-ms-/,
rdashAlpha = /-([a-z])/g,
// Used by jQuery.camelCase as callback to replace()
fcamelCase = function( all, letter ) {
return letter.toUpperCase();
};
jQuery.fn = jQuery.prototype = {
// The current version of jQuery being used
jquery: version,
constructor: jQuery,
// The default length of a jQuery object is 0
length: 0,
toArray: function() {
return slice.call( this );
},
// Get the Nth element in the matched element set OR
// Get the whole matched element set as a clean array
get: function( num ) {
// Return all the elements in a clean array
if ( num == null ) {

return slice.call( this );
}
// Return just the one element from the set
return num < 0 ? this[ num + this.length ] : this[ num ];
},
// Take an array of elements and push it onto the stack
// (returning the new matched element set)
pushStack: function( elems ) {
// Build a new jQuery matched element set
var ret = jQuery.merge( this.constructor(), elems );
// Add the old object onto the stack (as a reference)
ret.prevObject = this;
// Return the newly-formed element set
return ret;
},
// Execute a callback for every element in the matched set.
each: function( callback ) {
return jQuery.each( this, callback );
},
map: function( callback ) {
return this.pushStack( jQuery.map( this, function( elem, i ) {
return callback.call( elem, i, elem );
} ) );
},
slice: function() {
return this.pushStack( slice.apply( this, arguments ) );
},
first: function() {
return this.eq( 0 );
},
last: function() {
return this.eq( -1 );
},
eq: function( i ) {
var len = this.length,
j = +i + ( i < 0 ? len : 0 );
return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );

},
end: function() {
return this.prevObject || this.constructor();
},
// For internal use only.
// Behaves like an Array's method, not like a jQuery method.
push: push,
sort: arr.sort,
splice: arr.splice
};
jQuery.extend = jQuery.fn.extend = function() {
var options, name, src, copy, copyIsArray, clone,
target = arguments[ 0 ] || {},
i = 1,
length = arguments.length,
deep = false;
// Handle a deep copy situation
if ( typeof target === "boolean" ) {
deep = target;
// Skip the boolean and the target
target = arguments[ i ] || {};
i++;
}
// Handle case when target is a string or something (possible in deep
copy)
if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
target = {};
}
// Extend jQuery itself if only one argument is passed
if ( i === length ) {
target = this;
i--;
}
for ( ; i < length; i++ ) {
// Only deal with non-null/undefined values
if ( ( options = arguments[ i ] ) != null ) {
// Extend the base object
for ( name in options ) {

src = target[ name ];
copy = options[ name ];
// Prevent never-ending loop
if ( target === copy ) {
continue;
}
// Recurse if we're merging plain objects or arrays
if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
( copyIsArray = Array.isArray( copy ) ) ) ) {
if ( copyIsArray ) {
copyIsArray = false;
clone = src && Array.isArray( src ) ? src

: [];

} else {
clone = src && jQuery.isPlainObject( src

) ? src : {};

}
// Never move original objects, clone them
target[ name ] = jQuery.extend( deep, clone, copy

);

// Don't bring in undefined values
} else if ( copy !== undefined ) {
target[ name ] = copy;
}
}
}
}
// Return the modified object
return target;
};
jQuery.extend( {
// Unique for each copy of jQuery on the page
expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
// Assume jQuery is ready without the ready module
isReady: true,
error: function( msg ) {
throw new Error( msg );

},
noop: function() {},
isFunction: function( obj ) {
return jQuery.type( obj ) === "function";
},
isWindow: function( obj ) {
return obj != null && obj === obj.window;
},
isNumeric: function( obj ) {
// As of jQuery 3.0, isNumeric is limited to
// strings and numbers (primitives or objects)
// that can be coerced to finite numbers (gh-2662)
var type = jQuery.type( obj );
return ( type === "number" || type === "string" ) &&
// parseFloat NaNs numeric-cast false positives ("")
// ...but misinterprets leading-number strings,

particularly hex literals ("0x...")

// subtraction forces infinities to NaN
!isNaN( obj - parseFloat( obj ) );

},
isPlainObject: function( obj ) {
var proto, Ctor;
// Detect obvious negatives
// Use toString instead of jQuery.type to catch host objects
if ( !obj || toString.call( obj ) !== "[object Object]" ) {
return false;
}
proto = getProto( obj );
// Objects with no prototype (e.g., `Object.create( null )`) are

plain

if ( !proto ) {
return true;
}
// Objects with prototype are plain iff they were constructed by

a global Object function

Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
return typeof Ctor === "function" && fnToString.call( Ctor ) ===

ObjectFunctionString;
},
isEmptyObject: function( obj ) {
/* eslint-disable no-unused-vars */
// See https://github.com/eslint/eslint/issues/6125
var name;
for ( name in obj ) {
return false;
}
return true;
},
type: function( obj ) {
if ( obj == null ) {
return obj + "";
}
// Support: Android <=2.3 only (functionish RegExp)
return typeof obj === "object" || typeof obj === "function" ?
class2type[ toString.call( obj ) ] || "object" :
typeof obj;

},
// Evaluates a script in a global context
globalEval: function( code ) {
DOMEval( code );
},
// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 13
// Microsoft forgot to hump their vendor prefix (#9572)
camelCase: function( string ) {
return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha,

fcamelCase );
},
each: function( obj, callback ) {
var length, i = 0;
if ( isArrayLike( obj ) ) {
length = obj.length;
for ( ; i < length; i++ ) {
if ( callback.call( obj[ i ], i, obj[ i ] ) === false

) {

break;

}
}
} else {
for ( i in obj ) {
if ( callback.call( obj[ i ], i, obj[ i ] ) === false

) {

break;
}
}
}
return obj;
},
// Support: Android <=4.0 only
trim: function( text ) {
return text == null ?
"" :
( text + "" ).replace( rtrim, "" );

},
// results is for internal usage only
makeArray: function( arr, results ) {
var ret = results || [];
if ( arr != null ) {
if ( isArrayLike( Object( arr ) ) ) {
jQuery.merge( ret,
typeof arr === "string" ?
[ arr ] : arr
);
} else {
push.call( ret, arr );
}
}
return ret;
},
inArray: function( elem, arr, i ) {
return arr == null ? -1 : indexOf.call( arr, elem, i );
},
// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
merge: function( first, second ) {
var len = +second.length,
j = 0,

i = first.length;
for ( ; j < len; j++ ) {
first[ i++ ] = second[ j ];
}
first.length = i;
return first;
},
grep: function( elems, callback, invert ) {
var callbackInverse,
matches = [],
i = 0,
length = elems.length,
callbackExpect = !invert;
// Go through the array, only saving the items
// that pass the validator function
for ( ; i < length; i++ ) {
callbackInverse = !callback( elems[ i ], i );
if ( callbackInverse !== callbackExpect ) {
matches.push( elems[ i ] );
}
}
return matches;
},
// arg is for internal usage only
map: function( elems, callback, arg ) {
var length, value,
i = 0,
ret = [];
// Go through the array, translating each of the items to their

new values

if ( isArrayLike( elems ) ) {
length = elems.length;
for ( ; i < length; i++ ) {
value = callback( elems[ i ], i, arg );
if ( value != null ) {
ret.push( value );
}
}

// Go through every key on the object,
} else {
for ( i in elems ) {
value = callback( elems[ i ], i, arg );
if ( value != null ) {
ret.push( value );
}
}
}
// Flatten any nested arrays
return concat.apply( [], ret );
},
// A global GUID counter for objects
guid: 1,
// Bind a function to a context, optionally partially applying any
// arguments.
proxy: function( fn, context ) {
var tmp, args, proxy;
if ( typeof context === "string" ) {
tmp = fn[ context ];
context = fn;
fn = tmp;
}
// Quick check to determine if target is callable, in the spec
// this throws a TypeError, but we will just return undefined.
if ( !jQuery.isFunction( fn ) ) {
return undefined;
}
// Simulated bind
args = slice.call( arguments, 2 );
proxy = function() {
return fn.apply( context || this, args.concat( slice.call(

arguments ) ) );
};
// Set the guid of unique handler to the same of original handler,

so it can be removed

proxy.guid = fn.guid = fn.guid || jQuery.guid++;
return proxy;
},

now: Date.now,
// jQuery.support is not used in Core but other projects attach their
// properties to it so it needs to exist.
support: support
} );
if ( typeof Symbol === "function" ) {
jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error
Symbol".split( " " ),
function( i, name ) {
class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );
function isArrayLike( obj ) {
// Support: real iOS 8.2 only (not reproducible in simulator)
// `in` check used to prevent JIT error (gh-2145)
// hasOwn isn't used here due to false negatives
// regarding Nodelist length in IE
var length = !!obj && "length" in obj && obj.length,
type = jQuery.type( obj );
if ( type === "function" || jQuery.isWindow( obj ) ) {
return false;
}
return type === "array" || length === 0 ||
typeof length === "number" && length > 0 && ( length - 1 ) in obj;

}
var Sizzle =
/*!
* Sizzle CSS Selector Engine v2.3.3
* https://sizzlejs.com/
*
* Copyright jQuery Foundation and other contributors
* Released under the MIT license
* http://jquery.org/license
*
* Date: 2016-08-08
*/
(function( window ) {

var i,
support,
Expr,
getText,
isXML,
tokenize,
compile,
select,
outermostContext,
sortInput,
hasDuplicate,
// Local document vars
setDocument,
document,
docElem,
documentIsHTML,
rbuggyQSA,
rbuggyMatches,
matches,
contains,
// Instance-specific data
expando = "sizzle" + 1 * new Date(),
preferredDoc = window.document,
dirruns = 0,
done = 0,
classCache = createCache(),
tokenCache = createCache(),
compilerCache = createCache(),
sortOrder = function( a, b ) {
if ( a === b ) {
hasDuplicate = true;
}
return 0;
},
// Instance methods
hasOwn = ({}).hasOwnProperty,
arr = [],
pop = arr.pop,
push_native = arr.push,
push = arr.push,
slice = arr.slice,
// Use a stripped-down indexOf as it's faster than native
// https://jsperf.com/thor-indexof-vs-for/5
indexOf = function( list, elem ) {
var i = 0,

len = list.length;
for ( ; i < len; i++ ) {
if ( list[i] === elem ) {
return i;
}
}
return -1;
},
booleans =
"checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|
ismap|loop|multiple|open|readonly|required|scoped",
// Regular expressions
// http://www.w3.org/TR/css3-selectors/#whitespace
whitespace = "[\\x20\\t\\r\\n\\f]",
// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
// Attribute selectors:
http://www.w3.org/TR/selectors/#attribute-selectors
attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace
+

// Operator (capture 2)
"*([*^$|!~]?=)" + whitespace +
// "Attribute values must be CSS identifiers [capture 5] or strings

[capture 3 or capture 4]"

"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +

identifier + "))|)" + whitespace +

"*\\]",
pseudos = ":(" + identifier + ")(?:\\((" +
// To reduce the number of selectors needing tokenize in the

preFilter, prefer arguments:

// 1. quoted (capture 3; capture 4 or capture 5)
"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
// 2. simple (capture 6)
"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
// 3. anything else (capture 2)
".*" +
")\\)|)",
// Leading and non-escaped trailing whitespace, capturing some
non-whitespace characters preceding the latter
rwhitespace = new RegExp( whitespace + "+", "g" ),
rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +

whitespace + "+$", "g" ),
rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace
+ ")" + whitespace + "*" ),
rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" +
whitespace + "*\\]", "g" ),
rpseudo = new RegExp( pseudos ),
ridentifier = new RegExp( "^" + identifier + "$" ),
matchExpr = {
"ID": new RegExp( "^#(" + identifier + ")" ),
"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
"TAG": new RegExp( "^(" + identifier + "|[*])" ),
"ATTR": new RegExp( "^" + attributes ),
"PSEUDO": new RegExp( "^" + pseudos ),
"CHILD": new RegExp(

"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +

"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace +

"*(?:([+-]|)" + whitespace +

"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
// For use in libraries implementing .is()
// We use this for POS matching in `select`
"needsContext": new RegExp( "^" + whitespace +
"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +

whitespace + "*((?:-\\d)?\\d*)" + whitespace +

"*\\)|)(?=[^-]|$)", "i" )
},
rinputs = /^(?:input|select|textarea|button)$/i,
rheader = /^h\d$/i,
rnative = /^[^{]+\{\s*\[native \w/,
// Easily-parseable/retrievable ID or TAG or CLASS selectors
rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
rsibling = /[+~]/,
// CSS escapes
// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" +
whitespace + ")|.)", "ig" ),
funescape = function( _, escaped, escapedWhitespace ) {
var high = "0x" + escaped - 0x10000;

// NaN means non-codepoint
// Support: Firefox<24
// Workaround erroneous numeric interpretation of +"0x"
return high !== high || escapedWhitespace ?
escaped :
high < 0 ?
// BMP codepoint
String.fromCharCode( high + 0x10000 ) :
// Supplemental Plane codepoint (surrogate pair)
String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF

| 0xDC00 );
},
// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
fcssescape = function( ch, asCodePoint ) {
if ( asCodePoint ) {
// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
if ( ch === "\0" ) {
return "\uFFFD";
}
// Control characters and (dependent upon position) numbers

get escaped as code points

return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length

- 1 ).toString( 16 ) + " ";

}
// Other potentially-special ASCII characters get

backslash-escaped

return "\\" + ch;
},
// Used for iframes
// See setDocument()
// Removing the function wrapper causes a "Permission Denied"
// error in IE
unloadHandler = function() {
setDocument();
},
disabledAncestor = addCombinator(
function( elem ) {
return elem.disabled === true && ("form" in elem || "label"

in elem);
},

{ dir: "parentNode", next: "legend" }
);
// Optimize for push.apply( _, NodeList )
try {
push.apply(
(arr = slice.call( preferredDoc.childNodes )),
preferredDoc.childNodes
);
// Support: Android<4.0
// Detect silently failing push.apply
arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
push = { apply: arr.length ?
// Leverage slice if possible
function( target, els ) {
push_native.apply( target, slice.call(els) );
} :
// Support: IE<9
// Otherwise append directly
function( target, els ) {
var j = target.length,
i = 0;
// Can't trust NodeList.length
while ( (target[j++] = els[i++]) ) {}
target.length = j - 1;
}
};
}
function Sizzle( selector, context, results, seed ) {
var m, i, elem, nid, match, groups, newSelector,
newContext = context && context.ownerDocument,
// nodeType defaults to 9, since context defaults to document
nodeType = context ? context.nodeType : 9;
results = results || [];
// Return early from calls with invalid selector or context
if ( typeof selector !== "string" || !selector ||
nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
return results;
}

// Try to shortcut find operations (as opposed to filters) in HTML
documents
if ( !seed ) {
if ( ( context ? context.ownerDocument || context : preferredDoc

) !== document ) {

setDocument( context );
}
context = context || document;
if ( documentIsHTML ) {
// If the selector is sufficiently simple, try using a

"get*By*" DOM method

// (excepting DocumentFragment context, where the methods

don't exist)

if ( nodeType !== 11 && (match = rquickExpr.exec( selector

)) ) {

// ID selector
if ( (m = match[1]) ) {
// Document context
if ( nodeType === 9 ) {
if ( (elem = context.getElementById( m ))

) {

// Support: IE, Opera, Webkit
// TODO: identify versions
// getElementById can match elements

by name instead of ID

if ( elem.id === m ) {
results.push( elem );
return results;
}
} else {
return results;
}
// Element context
} else {
// Support: IE, Opera, Webkit
// TODO: identify versions
// getElementById can match elements by

name instead of ID

if ( newContext && (elem =

newContext.getElementById( m )) &&

contains( context, elem ) &&
elem.id === m ) {
results.push( elem );
return results;
}
}
// Type selector
} else if ( match[2] ) {
push.apply( results,
context.getElementsByTagName( selector ) );
return results;
// Class selector
} else if ( (m = match[3]) &&

support.getElementsByClassName &&

context.getElementsByClassName ) {
push.apply( results,

context.getElementsByClassName( m ) );
return results;
}
}
// Take advantage of querySelectorAll
if ( support.qsa &&
!compilerCache[ selector + " " ] &&
(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
if ( nodeType !== 1 ) {
newContext = context;
newSelector = selector;
// qSA looks outside Element context, which is not what

we want

// Thanks to Andrew Dupont for this workaround

technique

// Support: IE <=8
// Exclude object elements
} else if ( context.nodeName.toLowerCase() !==

"object" ) {

// Capture the context ID, setting it first if

necessary

if ( (nid = context.getAttribute( "id" )) ) {
nid = nid.replace( rcssescape, fcssescape

);

} else {
context.setAttribute( "id", (nid =

expando) );

}
// Prefix every selector in the list
groups = tokenize( selector );
i = groups.length;
while ( i-- ) {
groups[i] = "#" + nid + " " + toSelector(

groups[i] );

}
newSelector = groups.join( "," );
// Expand context for sibling selectors
newContext = rsibling.test( selector ) &&

testContext( context.parentNode ) ||
context;

}
if ( newSelector ) {
try {
push.apply( results,
newContext.querySelectorAll(

newSelector )

);
return results;
} catch ( qsaError ) {
} finally {
if ( nid === expando ) {
context.removeAttribute( "id" );
}
}
}
}
}
}
// All others
return select( selector.replace( rtrim, "$1" ), context, results, seed
);
}
/**
* Create key-value caches of limited size
* @returns {function(string, object)} Returns the Object data after storing
it on itself with
* property name the (space-suffixed) string and (if the cache is larger

than Expr.cacheLength)
* deleting the oldest entry
*/
function createCache() {
var keys = [];
function cache( key, value ) {
// Use (key + " ") to avoid collision with native prototype

properties (see Issue #157)

if ( keys.push( key + " " ) > Expr.cacheLength ) {
// Only keep the most recent entries
delete cache[ keys.shift() ];
}
return (cache[ key + " " ] = value);
}
return cache;
}
/**
* Mark a function for special use by Sizzle
* @param {Function} fn The function to mark
*/
function markFunction( fn ) {
fn[ expando ] = true;
return fn;
}
/**
* Support testing using an element
* @param {Function} fn Passed the created element and returns a boolean result
*/
function assert( fn ) {
var el = document.createElement("fieldset");
try {
return !!fn( el );
} catch (e) {
return false;
} finally {
// Remove from its parent by default
if ( el.parentNode ) {
el.parentNode.removeChild( el );
}
// release memory in IE
el = null;
}
}

/**
* Adds the same handler for all of the specified attrs
* @param {String} attrs Pipe-separated list of attributes
* @param {Function} handler The method that will be applied
*/
function addHandle( attrs, handler ) {
var arr = attrs.split("|"),
i = arr.length;
while ( i-- ) {
Expr.attrHandle[ arr[i] ] = handler;
}
}
/**
* Checks document order of two siblings
* @param {Element} a
* @param {Element} b
* @returns {Number} Returns less than 0 if a precedes b, greater than 0 if
a follows b
*/
function siblingCheck( a, b ) {
var cur = b && a,
diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
a.sourceIndex - b.sourceIndex;
// Use IE sourceIndex if available on both nodes
if ( diff ) {
return diff;
}
// Check if b follows a
if ( cur ) {
while ( (cur = cur.nextSibling) ) {
if ( cur === b ) {
return -1;
}
}
}
return a ? 1 : -1;
}
/**
* Returns a function to use in pseudos for input types
* @param {String} type
*/
function createInputPseudo( type ) {

return function( elem ) {
var name = elem.nodeName.toLowerCase();
return name === "input" && elem.type === type;
};
}
/**
* Returns a function to use in pseudos for buttons
* @param {String} type
*/
function createButtonPseudo( type ) {
return function( elem ) {
var name = elem.nodeName.toLowerCase();
return (name === "input" || name === "button") && elem.type ===

type;
};
}
/**
* Returns a function to use in pseudos for :enabled/:disabled
* @param {Boolean} disabled true for :disabled; false for :enabled
*/
function createDisabledPseudo( disabled ) {
// Known :disabled false positives: fieldset[disabled] >
legend:nth-of-type(n+2) :can-disable
return function( elem ) {
// Only certain elements can match :enabled or :disabled
//

https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled

//

https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled

if ( "form" in elem ) {
// Check for inherited disabledness on relevant non-disabled

elements:

// * listed form-associated elements in a disabled fieldset
//

https://html.spec.whatwg.org/multipage/forms.html#category-listed

//

https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled

// * option elements in a disabled optgroup
//

https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled

// All such elements have a "form" property.
if ( elem.parentNode && elem.disabled === false ) {

// Option elements defer to a parent optgroup if

present

if ( "label" in elem ) {
if ( "label" in elem.parentNode ) {
return elem.parentNode.disabled ===

disabled;

} else {
return elem.disabled === disabled;
}
}
// Support: IE 6 - 11
// Use the isDisabled shortcut property to check for

disabled fieldset ancestors

return elem.isDisabled === disabled ||
// Where there is no isDisabled, check manually
/* jshint -W018 */
elem.isDisabled !== !disabled &&
disabledAncestor( elem ) === disabled;

}
return elem.disabled === disabled;
// Try to winnow out elements that can't be disabled before trusting

the disabled property.

// Some victims get caught in our net (label, legend, menu, track),

but it shouldn't

// even exist on them, let alone have a boolean value.
} else if ( "label" in elem ) {
return elem.disabled === disabled;
}
// Remaining elements are neither :enabled nor :disabled
return false;
};
}
/**
* Returns a function to use in pseudos for positionals
* @param {Function} fn
*/
function createPositionalPseudo( fn ) {
return markFunction(function( argument ) {
argument = +argument;
return markFunction(function( seed, matches ) {
var j,
matchIndexes = fn( [], seed.length, argument ),

i = matchIndexes.length;
// Match elements found at the specified indexes
while ( i-- ) {
if ( seed[ (j = matchIndexes[i]) ] ) {
seed[j] = !(matches[j] = seed[j]);
}
}
});
});
}
/**
* Checks a node for validity as a Sizzle context
* @param {Element|Object=} context
* @returns {Element|Object|Boolean} The input node if acceptable, otherwise
a falsy value
*/
function testContext( context ) {
return context && typeof context.getElementsByTagName !== "undefined"
&& context;
}
// Expose support vars for convenience
support = Sizzle.support = {};
/**
* Detects XML nodes
* @param {Element|Object} elem An element or a document
* @returns {Boolean} True iff elem is a non-HTML XML node
*/
isXML = Sizzle.isXML = function( elem ) {
// documentElement is verified for cases where it doesn't yet exist
// (such as loading iframes in IE - #4833)
var documentElement = elem && (elem.ownerDocument ||
elem).documentElement;
return documentElement ? documentElement.nodeName !== "HTML" : false;
};
/**
* Sets document-related variables once based on the current document
* @param {Element|Object} [doc] An element or document object to use to set
the document
* @returns {Object} Returns the current document
*/
setDocument = Sizzle.setDocument = function( node ) {
var hasCompare, subWindow,
doc = node ? node.ownerDocument || node : preferredDoc;

// Return early if doc is invalid or already selected
if ( doc === document || doc.nodeType !== 9 || !doc.documentElement )
{

return document;
}
// Update global variables
document = doc;
docElem = document.documentElement;
documentIsHTML = !isXML( document );
// Support: IE 9-11, Edge
// Accessing iframe documents after unload throws "permission denied"
errors (jQuery #13936)
if ( preferredDoc !== document &&
(subWindow = document.defaultView) && subWindow.top !== subWindow

) {

// Support: IE 11, Edge
if ( subWindow.addEventListener ) {
subWindow.addEventListener( "unload", unloadHandler, false

);

// Support: IE 9 - 10 only
} else if ( subWindow.attachEvent ) {
subWindow.attachEvent( "onunload", unloadHandler );
}
}
/* Attributes
--------------------------------------------------------------------
-- */
// Support: IE<8
// Verify that getAttribute really returns attributes and not properties
// (excepting IE8 booleans)
support.attributes = assert(function( el ) {
el.className = "i";
return !el.getAttribute("className");
});
/* getElement(s)By*
--------------------------------------------------------------------
-- */
// Check if getElementsByTagName("*") returns only elements
support.getElementsByTagName = assert(function( el ) {

el.appendChild( document.createComment("") );
return !el.getElementsByTagName("*").length;
});
// Support: IE<9
support.getElementsByClassName = rnative.test(
document.getElementsByClassName );
// Support: IE<10
// Check if getElementById returns elements by name
// The broken getElementById methods don't pick up programmatically-set
names,
// so use a roundabout getElementsByName test
support.getById = assert(function( el ) {
docElem.appendChild( el ).id = expando;
return !document.getElementsByName ||
!document.getElementsByName( expando ).length;
});
// ID filter and find
if ( support.getById ) {
Expr.filter["ID"] = function( id ) {
var attrId = id.replace( runescape, funescape );
return function( elem ) {
return elem.getAttribute("id") === attrId;
};
};
Expr.find["ID"] = function( id, context ) {
if ( typeof context.getElementById !== "undefined" &&

documentIsHTML ) {

var elem = context.getElementById( id );
return elem ? [ elem ] : [];
}
};
} else {
Expr.filter["ID"] = function( id ) {
var attrId = id.replace( runescape, funescape );
return function( elem ) {
var node = typeof elem.getAttributeNode !==

"undefined" &&

elem.getAttributeNode("id");
return node && node.value === attrId;
};
};
// Support: IE 6 - 7 only
// getElementById is not reliable as a find shortcut
Expr.find["ID"] = function( id, context ) {

if ( typeof context.getElementById !== "undefined" &&

documentIsHTML ) {

var node, i, elems,
elem = context.getElementById( id );
if ( elem ) {
// Verify the id attribute
node = elem.getAttributeNode("id");
if ( node && node.value === id ) {
return [ elem ];
}
// Fall back on getElementsByName
elems = context.getElementsByName( id );
i = 0;
while ( (elem = elems[i++]) ) {
node = elem.getAttributeNode("id");
if ( node && node.value === id ) {
return [ elem ];
}
}
}
return [];
}
};
}
// Tag
Expr.find["TAG"] = support.getElementsByTagName ?
function( tag, context ) {
if ( typeof context.getElementsByTagName !== "undefined" )

{

return context.getElementsByTagName( tag );
// DocumentFragment nodes don't have gEBTN
} else if ( support.qsa ) {
return context.querySelectorAll( tag );
}
} :
function( tag, context ) {
var elem,
tmp = [],
i = 0,
// By happy coincidence, a (broken) gEBTN appears on

DocumentFragment nodes too

results = context.getElementsByTagName( tag );
// Filter out possible comments
if ( tag === "*" ) {
while ( (elem = results[i++]) ) {
if ( elem.nodeType === 1 ) {
tmp.push( elem );
}
}
return tmp;
}
return results;
};
// Class
Expr.find["CLASS"] = support.getElementsByClassName && function(
className, context ) {

if ( typeof context.getElementsByClassName !== "undefined" &&

documentIsHTML ) {

return context.getElementsByClassName( className );
}
};
/* QSA/matchesSelector
--------------------------------------------------------------------
-- */
// QSA and matchesSelector support
// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
rbuggyMatches = [];
// qSa(:focus) reports false when true (Chrome 21)
// We allow this because of a bug in IE8/9 that throws an error
// whenever `document.activeElement` is accessed on an iframe
// So, we allow :focus to pass through QSA all the time to avoid the IE
error
// See https://bugs.jquery.com/ticket/13378
rbuggyQSA = [];
if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
// Build QSA regex
// Regex strategy adopted from Diego Perini
assert(function( el ) {
// Select is set to empty string on purpose
// This is to test IE's treatment of not explicitly
// setting a boolean content attribute,

// since its presence should be enough
// https://bugs.jquery.com/ticket/12359
docElem.appendChild( el ).innerHTML = "<a id='" + expando

+ "'></a>" +

"<select id='" + expando + "-\r\\' msallowcapture=''>"

+

"<option selected=''></option></select>";
// Support: IE8, Opera 11-12.16
// Nothing should be selected when empty strings follow ^=

or $= or *=

// The test attribute must be unknown in Opera but "safe"

for WinRT

//

https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_sectio
n

if ( el.querySelectorAll("[msallowcapture^='']").length )

{

rbuggyQSA.push( "[*^$]=" + whitespace +

"*(?:''|\"\")" );
}
// Support: IE8
// Boolean attributes and "value" are not treated correctly
if ( !el.querySelectorAll("[selected]").length ) {
rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" +

booleans + ")" );
}
// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+,

PhantomJS<1.9.8+

if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length

) {

rbuggyQSA.push("~=");
}
// Webkit/Opera - :checked should return selected option

elements

//

http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked

// IE8 throws error here and will not see later tests
if ( !el.querySelectorAll(":checked").length ) {
rbuggyQSA.push(":checked");
}
// Support: Safari 8+, iOS 8+
// https://bugs.webkit.org/show_bug.cgi?id=136851
// In-page `selector#id sibling-combinator selector` fails

if ( !el.querySelectorAll( "a#" + expando + "+*" ).length

) {

rbuggyQSA.push(".#.+[+~]");
}
});
assert(function( el ) {
el.innerHTML = "<a href='' disabled='disabled'></a>" +
"<select disabled='disabled'><option/></select>";
// Support: Windows 8 Native Apps
// The type and name attributes are restricted during

.innerHTML assignment

var input = document.createElement("input");
input.setAttribute( "type", "hidden" );
el.appendChild( input ).setAttribute( "name", "D" );
// Support: IE8
// Enforce case-sensitivity of name attribute
if ( el.querySelectorAll("[name=d]").length ) {
rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
}
// FF 3.5 - :enabled/:disabled and hidden elements (hidden

elements are still enabled)

// IE8 throws error here and will not see later tests
if ( el.querySelectorAll(":enabled").length !== 2 ) {
rbuggyQSA.push( ":enabled", ":disabled" );
}
// Support: IE9-11+
// IE's :disabled selector does not pick up the children of

disabled fieldsets

docElem.appendChild( el ).disabled = true;
if ( el.querySelectorAll(":disabled").length !== 2 ) {
rbuggyQSA.push( ":enabled", ":disabled" );
}
// Opera 10-11 does not throw on post-comma invalid pseudos
el.querySelectorAll("*,:x");
rbuggyQSA.push(",.*:");
});
}
if ( (support.matchesSelector = rnative.test( (matches =
docElem.matches ||

docElem.webkitMatchesSelector ||
docElem.mozMatchesSelector ||

docElem.oMatchesSelector ||
docElem.msMatchesSelector) )) ) {
assert(function( el ) {
// Check to see if it's possible to do matchesSelector
// on a disconnected node (IE 9)
support.disconnectedMatch = matches.call( el, "*" );
// This should fail with an exception
// Gecko does not error, returns false instead
matches.call( el, "[s!='']:x" );
rbuggyMatches.push( "!=", pseudos );
});
}
rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
rbuggyMatches = rbuggyMatches.length && new RegExp(
rbuggyMatches.join("|") );
/* Contains
--------------------------------------------------------------------
-- */
hasCompare = rnative.test( docElem.compareDocumentPosition );
// Element contains another
// Purposefully self-exclusive
// As in, an element does not contain itself
contains = hasCompare || rnative.test( docElem.contains ) ?
function( a, b ) {
var adown = a.nodeType === 9 ? a.documentElement : a,
bup = b && b.parentNode;
return a === bup || !!( bup && bup.nodeType === 1 && (
adown.contains ?
adown.contains( bup ) :
a.compareDocumentPosition &&

a.compareDocumentPosition( bup ) & 16

));
} :
function( a, b ) {
if ( b ) {
while ( (b = b.parentNode) ) {
if ( b === a ) {
return true;
}
}
}
return false;
};

/* Sorting
--------------------------------------------------------------------
-- */
// Document order sorting
sortOrder = hasCompare ?
function( a, b ) {
// Flag for duplicate removal
if ( a === b ) {
hasDuplicate = true;
return 0;
}
// Sort on method existence if only one input has

compareDocumentPosition

var compare = !a.compareDocumentPosition -

!b.compareDocumentPosition;
if ( compare ) {
return compare;
}
// Calculate position if both inputs belong to the same document
compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b )

?

a.compareDocumentPosition( b ) :
// Otherwise we know they are disconnected
1;
// Disconnected nodes
if ( compare & 1 ||
(!support.sortDetached && b.compareDocumentPosition( a )

=== compare) ) {

// Choose the first element that is related to our preferred

document

if ( a === document || a.ownerDocument === preferredDoc &&

contains(preferredDoc, a) ) {
return -1;
}
if ( b === document || b.ownerDocument === preferredDoc &&

contains(preferredDoc, b) ) {
return 1;
}
// Maintain original order

return sortInput ?
( indexOf( sortInput, a ) - indexOf( sortInput, b ) )

:

0;

}
return compare & 4 ? -1 : 1;
} :
function( a, b ) {
// Exit early if the nodes are identical
if ( a === b ) {
hasDuplicate = true;
return 0;
}
var cur,
i = 0,
aup = a.parentNode,
bup = b.parentNode,
ap = [ a ],
bp = [ b ];
// Parentless nodes are either documents or disconnected
if ( !aup || !bup ) {
return a === document ? -1 :
b === document ? 1 :
aup ? -1 :
bup ? 1 :
sortInput ?
( indexOf( sortInput, a ) - indexOf( sortInput, b ) )

:

0;

// If the nodes are siblings, we can do a quick check
} else if ( aup === bup ) {
return siblingCheck( a, b );
}
// Otherwise we need full lists of their ancestors for comparison
cur = a;
while ( (cur = cur.parentNode) ) {
ap.unshift( cur );
}
cur = b;
while ( (cur = cur.parentNode) ) {
bp.unshift( cur );
}

// Walk down the tree looking for a discrepancy
while ( ap[i] === bp[i] ) {
i++;
}
return i ?
// Do a sibling check if the nodes have a common ancestor
siblingCheck( ap[i], bp[i] ) :
// Otherwise nodes in our document sort first
ap[i] === preferredDoc ? -1 :
bp[i] === preferredDoc ? 1 :
0;

};
return document;
};
Sizzle.matches = function( expr, elements ) {
return Sizzle( expr, null, null, elements );
};
Sizzle.matchesSelector = function( elem, expr ) {
// Set document vars if needed
if ( ( elem.ownerDocument || elem ) !== document ) {
setDocument( elem );
}
// Make sure that attribute selectors are quoted
expr = expr.replace( rattributeQuotes, "='$1']" );
if ( support.matchesSelector && documentIsHTML &&
!compilerCache[ expr + " " ] &&
( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
( !rbuggyQSA || !rbuggyQSA.test( expr ) ) ) {
try {
var ret = matches.call( elem, expr );
// IE 9's matchesSelector returns false on disconnected

nodes

if ( ret || support.disconnectedMatch ||

// As well, disconnected nodes are said to be in

a document

// fragment in IE 9
elem.document && elem.document.nodeType !== 11

) {

return ret;

}
} catch (e) {}
}
return Sizzle( expr, document, null, [ elem ] ).length > 0;
};
Sizzle.contains = function( context, elem ) {
// Set document vars if needed
if ( ( context.ownerDocument || context ) !== document ) {
setDocument( context );
}
return contains( context, elem );
};
Sizzle.attr = function( elem, name ) {
// Set document vars if needed
if ( ( elem.ownerDocument || elem ) !== document ) {
setDocument( elem );
}
var fn = Expr.attrHandle[ name.toLowerCase() ],
// Don't get fooled by Object.prototype properties (jQuery #13807)
val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
fn( elem, name, !documentIsHTML ) :
undefined;
return val !== undefined ?
val :
support.attributes || !documentIsHTML ?
elem.getAttribute( name ) :
(val = elem.getAttributeNode(name)) && val.specified ?
val.value :
null;

};
Sizzle.escape = function( sel ) {
return (sel + "").replace( rcssescape, fcssescape );
};
Sizzle.error = function( msg ) {
throw new Error( "Syntax error, unrecognized expression: " + msg );
};
/**
* Document sorting and removing duplicates
* @param {ArrayLike} results
*/

Sizzle.uniqueSort = function( results ) {
var elem,
duplicates = [],
j = 0,
i = 0;
// Unless we *know* we can detect duplicates, assume their presence
hasDuplicate = !support.detectDuplicates;
sortInput = !support.sortStable && results.slice( 0 );
results.sort( sortOrder );
if ( hasDuplicate ) {
while ( (elem = results[i++]) ) {
if ( elem === results[ i ] ) {
j = duplicates.push( i );
}
}
while ( j-- ) {
results.splice( duplicates[ j ], 1 );
}
}
// Clear input after sorting to release objects
// See https://github.com/jquery/sizzle/pull/225
sortInput = null;
return results;
};
/**
* Utility function for retrieving the text value of an array of DOM nodes
* @param {Array|Element} elem
*/
getText = Sizzle.getText = function( elem ) {
var node,
ret = "",
i = 0,
nodeType = elem.nodeType;
if ( !nodeType ) {
// If no nodeType, this is expected to be an array
while ( (node = elem[i++]) ) {
// Do not traverse comment nodes
ret += getText( node );
}
} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
// Use textContent for elements
// innerText usage removed for consistency of new lines (jQuery

#11153)

if ( typeof elem.textContent === "string" ) {
return elem.textContent;
} else {
// Traverse its children
for ( elem = elem.firstChild; elem; elem = elem.nextSibling

) {

ret += getText( elem );
}
}
} else if ( nodeType === 3 || nodeType === 4 ) {
return elem.nodeValue;
}
// Do not include comment or processing instruction nodes
return ret;
};
Expr = Sizzle.selectors = {
// Can be adjusted by the user
cacheLength: 50,
createPseudo: markFunction,
match: matchExpr,
attrHandle: {},
find: {},
relative: {
">": { dir: "parentNode", first: true },
" ": { dir: "parentNode" },
"+": { dir: "previousSibling", first: true },
"~": { dir: "previousSibling" }
},
preFilter: {
"ATTR": function( match ) {
match[1] = match[1].replace( runescape, funescape );
// Move the given value to match[3] whether quoted or

unquoted

match[3] = ( match[3] || match[4] || match[5] || ""

).replace( runescape, funescape );

if ( match[2] === "~=" ) {

match[3] = " " + match[3] + " ";
}
return match.slice( 0, 4 );
},
"CHILD": function( match ) {
/* matches from matchExpr["CHILD"]
1 type (only|nth|...)
2 what (child|of-type)
3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
4 xn-component of xn+y argument ([+-]?\d*n|)
5 sign of xn-component
6 x of xn-component
7 sign of y-component
8 y of y-component
*/
match[1] = match[1].toLowerCase();
if ( match[1].slice( 0, 3 ) === "nth" ) {
// nth-* requires argument
if ( !match[3] ) {
Sizzle.error( match[0] );
}
// numeric x and y parameters for Expr.filter.CHILD
// remember that false/true cast respectively to 0/1
match[4] = +( match[4] ? match[5] + (match[6] || 1) :

2 * ( match[3] === "even" || match[3] === "odd" ) );

match[5] = +( ( match[7] + match[8] ) || match[3] ===

"odd" );

// other types prohibit arguments
} else if ( match[3] ) {
Sizzle.error( match[0] );
}
return match;
},
"PSEUDO": function( match ) {
var excess,
unquoted = !match[6] && match[2];
if ( matchExpr["CHILD"].test( match[0] ) ) {
return null;
}

// Accept quoted arguments as-is
if ( match[3] ) {
match[2] = match[4] || match[5] || "";
// Strip excess characters from unquoted arguments
} else if ( unquoted && rpseudo.test( unquoted ) &&
// Get excess from tokenize (recursively)
(excess = tokenize( unquoted, true )) &&
// advance to the next closing parenthesis
(excess = unquoted.indexOf( ")", unquoted.length -

excess ) - unquoted.length) ) {

// excess is a negative index
match[0] = match[0].slice( 0, excess );
match[2] = unquoted.slice( 0, excess );
}
// Return only captures needed by the pseudo filter method

(type and argument)

return match.slice( 0, 3 );
}
},
filter: {
"TAG": function( nodeNameSelector ) {
var nodeName = nodeNameSelector.replace( runescape,

funescape ).toLowerCase();

return nodeNameSelector === "*" ?
function() { return true; } :
function( elem ) {
return elem.nodeName &&

elem.nodeName.toLowerCase() === nodeName;

};

},
"CLASS": function( className ) {
var pattern = classCache[ className + " " ];
return pattern ||
(pattern = new RegExp( "(^|" + whitespace + ")" +

className + "(" + whitespace + "|$)" )) &&

classCache( className, function( elem ) {
return pattern.test( typeof elem.className ===
"string" && elem.className || typeof elem.getAttribute !== "undefined" &&
elem.getAttribute("class") || "" );

});

},

"ATTR": function( name, operator, check ) {
return function( elem ) {
var result = Sizzle.attr( elem, name );
if ( result == null ) {
return operator === "!=";
}
if ( !operator ) {
return true;
}
result += "";
return operator === "=" ? result === check :
operator === "!=" ? result !== check :
operator === "^=" ? check && result.indexOf(

check ) === 0 :

operator === "*=" ? check && result.indexOf(

check ) > -1 :

operator === "$=" ? check && result.slice(

-check.length ) === check :

operator === "~=" ? ( " " + result.replace(

rwhitespace, " " ) + " " ).indexOf( check ) > -1 :

operator === "|=" ? result === check ||

result.slice( 0, check.length + 1 ) === check + "-" :

false;

};
},
"CHILD": function( type, what, argument, first, last ) {
var simple = type.slice( 0, 3 ) !== "nth",
forward = type.slice( -4 ) !== "last",
ofType = what === "of-type";
return first === 1 && last === 0 ?
// Shortcut for :nth-*(n)
function( elem ) {
return !!elem.parentNode;
} :
function( elem, context, xml ) {
var cache, uniqueCache, outerCache, node,

nodeIndex, start,

dir = simple !== forward ? "nextSibling"

: "previousSibling",

parent = elem.parentNode,

name = ofType &&

elem.nodeName.toLowerCase(),

useCache = !xml && !ofType,
diff = false;
if ( parent ) {
// :(first|last|only)-(child|of-type)
if ( simple ) {
while ( dir ) {
node = elem;
while ( (node = node[ dir ]) )

{

if ( ofType ?

node.nodeName.toLowerCase() === name :

node.nodeType ===

1 ) {

return false;
}
}
// Reverse direction for

:only-* (if we haven't yet done so)

start = dir = type === "only"

&& !start && "nextSibling";

}
return true;
}
start = [ forward ? parent.firstChild :

parent.lastChild ];

// non-xml :nth-child(...) stores cache

data on `parent`

if ( forward && useCache ) {
// Seek `elem` from a

previously-cached index

// ...in a gzip-friendly way
node = parent;
outerCache = node[ expando ] ||

(node[ expando ] = {});

// Support: IE <9 only
// Defend against cloned

attroperties (jQuery gh-1709)

uniqueCache = outerCache[

node.uniqueID ] ||

(outerCache[ node.uniqueID ]

= {});

cache = uniqueCache[ type ] || [];
nodeIndex = cache[ 0 ] === dirruns &&

cache[ 1 ];

diff = nodeIndex && cache[ 2 ];
node = nodeIndex &&

parent.childNodes[ nodeIndex ];

while ( (node = ++nodeIndex && node

&& node[ dir ] ||

// Fallback to seeking `elem`

from the start

(diff = nodeIndex = 0) ||

start.pop()) ) {

// When found, cache indexes

on `parent` and break

if ( node.nodeType === 1 &&

++diff && node === elem ) {

uniqueCache[ type ] = [

dirruns, nodeIndex, diff ];

break;
}
}
} else {
// Use previously-cached element

index if available

if ( useCache ) {
// ...in a gzip-friendly way
node = elem;
outerCache = node[ expando ]

|| (node[ expando ] = {});

// Support: IE <9 only
// Defend against cloned

attroperties (jQuery gh-1709)

uniqueCache = outerCache[

node.uniqueID ] ||

(outerCache[

node.uniqueID ] = {});

cache = uniqueCache[ type ] ||

[];

nodeIndex = cache[ 0 ] ===

dirruns && cache[ 1 ];

diff = nodeIndex;
}
// xml :nth-child(...)
// or :nth-last-child(...) or

:nth(-last)?-of-type(...)

if ( diff === false ) {
// Use the same loop as above

to seek `elem` from the start

while ( (node = ++nodeIndex &&

node && node[ dir ] ||

(diff = nodeIndex = 0) ||

start.pop()) ) {

if ( ( ofType ?

node.nodeName.toLowerCase() === name :

node.nodeType ===

1 ) &&

++diff ) {
// Cache the index

of each encountered element

if ( useCache ) {
outerCache

= node[ expando ] || (node[ expando ] = {});

// Support:

IE <9 only

// Defend

against cloned attroperties (jQuery gh-1709)

uniqueCache

= outerCache[ node.uniqueID ] ||
(outerCache[ node.uniqueID ] = {});

uniqueCache[ type ] = [ dirruns, diff ];

}
if ( node === elem

) {

break;
}
}

}
}
}
// Incorporate the offset, then check

against cycle size

diff -= last;
return diff === first || ( diff % first ===

0 && diff / first >= 0 );
}
};

},
"PSEUDO": function( pseudo, argument ) {
// pseudo-class names are case-insensitive
// http://www.w3.org/TR/selectors/#pseudo-classes
// Prioritize by case sensitivity in case custom pseudos are

added with uppercase letters

// Remember that setFilters inherits from pseudos
var args,
fn = Expr.pseudos[ pseudo ] || Expr.setFilters[

pseudo.toLowerCase() ] ||

Sizzle.error( "unsupported pseudo: " + pseudo );
// The user may use createPseudo to indicate that
// arguments are needed to create the filter function
// just as Sizzle does
if ( fn[ expando ] ) {
return fn( argument );
}
// But maintain support for old signatures
if ( fn.length > 1 ) {
args = [ pseudo, pseudo, "", argument ];
return Expr.setFilters.hasOwnProperty(

pseudo.toLowerCase() ) ?

markFunction(function( seed, matches ) {
var idx,
matched = fn( seed, argument ),
i = matched.length;
while ( i-- ) {
idx = indexOf( seed, matched[i] );
seed[ idx ] = !( matches[ idx ] =

matched[i] );

}
}) :
function( elem ) {
return fn( elem, 0, args );

};

}
return fn;
}
},
pseudos: {
// Potentially complex pseudos
"not": markFunction(function( selector ) {
// Trim the selector passed to compile
// to avoid treating leading and trailing
// spaces as combinators
var input = [],
results = [],
matcher = compile( selector.replace( rtrim, "$1" ) );
return matcher[ expando ] ?
markFunction(function( seed, matches, context, xml )

{

var elem,
unmatched = matcher( seed, null, xml, []

),

i = seed.length;
// Match elements unmatched by `matcher`
while ( i-- ) {
if ( (elem = unmatched[i]) ) {
seed[i] = !(matches[i] = elem);
}
}
}) :
function( elem, context, xml ) {
input[0] = elem;
matcher( input, null, xml, results );
// Don't keep the element (issue #299)
input[0] = null;
return !results.pop();
};

}),
"has": markFunction(function( selector ) {
return function( elem ) {
return Sizzle( selector, elem ).length > 0;
};
}),
"contains": markFunction(function( text ) {

text = text.replace( runescape, funescape );
return function( elem ) {
return ( elem.textContent || elem.innerText ||

getText( elem ) ).indexOf( text ) > -1;

};
}),
// "Whether an element is represented by a :lang() selector
// is based solely on the element's language value
// being equal to the identifier C,
// or beginning with the identifier C immediately followed by "-".
// The matching of C against the element's language value is

performed case-insensitively.

// The identifier C does not have to be a valid language name."
// http://www.w3.org/TR/selectors/#lang-pseudo
"lang": markFunction( function( lang ) {
// lang value must be a valid identifier
if ( !ridentifier.test(lang || "") ) {
Sizzle.error( "unsupported lang: " + lang );
}
lang = lang.replace( runescape, funescape ).toLowerCase();
return function( elem ) {
var elemLang;
do {
if ( (elemLang = documentIsHTML ?
elem.lang :
elem.getAttribute("xml:lang") ||

elem.getAttribute("lang")) ) {

elemLang = elemLang.toLowerCase();
return elemLang === lang ||

elemLang.indexOf( lang + "-" ) === 0;
}
} while ( (elem = elem.parentNode) && elem.nodeType ===

1 );

return false;
};
}),
// Miscellaneous
"target": function( elem ) {
var hash = window.location && window.location.hash;
return hash && hash.slice( 1 ) === elem.id;
},
"root": function( elem ) {
return elem === docElem;
},

"focus": function( elem ) {
return elem === document.activeElement &&

(!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href ||
~elem.tabIndex);
},
// Boolean properties
"enabled": createDisabledPseudo( false ),
"disabled": createDisabledPseudo( true ),
"checked": function( elem ) {
// In CSS3, :checked should return both checked and selected

elements

//

http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
var nodeName = elem.nodeName.toLowerCase();
return (nodeName === "input" && !!elem.checked) || (nodeName

=== "option" && !!elem.selected);

},
"selected": function( elem ) {
// Accessing this property makes selected-by-default
// options in Safari work properly
if ( elem.parentNode ) {
elem.parentNode.selectedIndex;
}
return elem.selected === true;
},
// Contents
"empty": function( elem ) {
// http://www.w3.org/TR/selectors/#empty-pseudo
// :empty is negated by element (1) or content nodes (text:

3; cdata: 4; entity ref: 5),

// but not by others (comment: 8; processing instruction:

7; etc.)

// nodeType < 6 works because attributes (2) do not appear

as children

for ( elem = elem.firstChild; elem; elem = elem.nextSibling

) {

if ( elem.nodeType < 6 ) {
return false;
}
}
return true;
},

"parent": function( elem ) {
return !Expr.pseudos["empty"]( elem );
},
// Element/input types
"header": function( elem ) {
return rheader.test( elem.nodeName );
},
"input": function( elem ) {
return rinputs.test( elem.nodeName );
},
"button": function( elem ) {
var name = elem.nodeName.toLowerCase();
return name === "input" && elem.type === "button" || name

=== "button";
},
"text": function( elem ) {
var attr;
return elem.nodeName.toLowerCase() === "input" &&
elem.type === "text" &&
// Support: IE<8
// New HTML5 attribute values (e.g., "search") appear

with elem.type === "text"

( (attr = elem.getAttribute("type")) == null ||

attr.toLowerCase() === "text" );

},
// Position-in-collection
"first": createPositionalPseudo(function() {
return [ 0 ];
}),
"last": createPositionalPseudo(function( matchIndexes, length )

{

return [ length - 1 ];
}),
"eq": createPositionalPseudo(function( matchIndexes, length,

argument ) {

return [ argument < 0 ? argument + length : argument ];
}),
"even": createPositionalPseudo(function( matchIndexes, length )

{

var i = 0;
for ( ; i < length; i += 2 ) {
matchIndexes.push( i );
}
return matchIndexes;
}),
"odd": createPositionalPseudo(function( matchIndexes, length ) {
var i = 1;
for ( ; i < length; i += 2 ) {
matchIndexes.push( i );
}
return matchIndexes;
}),
"lt": createPositionalPseudo(function( matchIndexes, length,

argument ) {

var i = argument < 0 ? argument + length : argument;
for ( ; --i >= 0; ) {
matchIndexes.push( i );
}
return matchIndexes;
}),
"gt": createPositionalPseudo(function( matchIndexes, length,

argument ) {

var i = argument < 0 ? argument + length : argument;
for ( ; ++i < length; ) {
matchIndexes.push( i );
}
return matchIndexes;
})
}
};
Expr.pseudos["nth"] = Expr.pseudos["eq"];
// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image:
true } ) {
Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
Expr.pseudos[ i ] = createButtonPseudo( i );
}
// Easy API for creating new setFilters

function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();
tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
var matched, match, tokens, type,
soFar, groups, preFilters,
cached = tokenCache[ selector + " " ];
if ( cached ) {
return parseOnly ? 0 : cached.slice( 0 );
}
soFar = selector;
groups = [];
preFilters = Expr.preFilter;
while ( soFar ) {
// Comma and first run
if ( !matched || (match = rcomma.exec( soFar )) ) {
if ( match ) {
// Don't consume trailing commas as valid
soFar = soFar.slice( match[0].length ) || soFar;
}
groups.push( (tokens = []) );
}
matched = false;
// Combinators
if ( (match = rcombinators.exec( soFar )) ) {
matched = match.shift();
tokens.push({
value: matched,
// Cast descendant combinators to space
type: match[0].replace( rtrim, " " )
});
soFar = soFar.slice( matched.length );
}
// Filters
for ( type in Expr.filter ) {
if ( (match = matchExpr[ type ].exec( soFar )) &&

(!preFilters[ type ] ||

(match = preFilters[ type ]( match ))) ) {
matched = match.shift();
tokens.push({

value: matched,
type: type,
matches: match
});
soFar = soFar.slice( matched.length );
}
}
if ( !matched ) {
break;
}
}
// Return the length of the invalid excess
// if we're just parsing
// Otherwise, throw an error or return tokens
return parseOnly ?
soFar.length :
soFar ?
Sizzle.error( selector ) :
// Cache the tokens
tokenCache( selector, groups ).slice( 0 );

};
function toSelector( tokens ) {
var i = 0,
len = tokens.length,
selector = "";
for ( ; i < len; i++ ) {
selector += tokens[i].value;
}
return selector;
}
function addCombinator( matcher, combinator, base ) {
var dir = combinator.dir,
skip = combinator.next,
key = skip || dir,
checkNonElements = base && key === "parentNode",
doneName = done++;
return combinator.first ?
// Check against closest ancestor/preceding element
function( elem, context, xml ) {
while ( (elem = elem[ dir ]) ) {
if ( elem.nodeType === 1 || checkNonElements ) {
return matcher( elem, context, xml );
}

}
return false;
} :
// Check against all ancestor/preceding elements
function( elem, context, xml ) {
var oldCache, uniqueCache, outerCache,
newCache = [ dirruns, doneName ];
// We can't set arbitrary data on XML nodes, so they don't

benefit from combinator caching
if ( xml ) {
while ( (elem = elem[ dir ]) ) {
if ( elem.nodeType === 1 || checkNonElements )

{

if ( matcher( elem, context, xml ) ) {
return true;
}
}
}
} else {
while ( (elem = elem[ dir ]) ) {
if ( elem.nodeType === 1 || checkNonElements )

{

outerCache = elem[ expando ] || (elem[

expando ] = {});

// Support: IE <9 only
// Defend against cloned attroperties

(jQuery gh-1709)

uniqueCache = outerCache[ elem.uniqueID ]

|| (outerCache[ elem.uniqueID ] = {});

if ( skip && skip ===

elem.nodeName.toLowerCase() ) {

elem = elem[ dir ] || elem;
} else if ( (oldCache = uniqueCache[ key

]) &&

oldCache[ 0 ] === dirruns &&

oldCache[ 1 ] === doneName ) {

// Assign to newCache so results

back-propagate to previous elements

return (newCache[ 2 ] = oldCache[ 2

]);

} else {
// Reuse newcache so results

back-propagate to previous elements

uniqueCache[ key ] = newCache;
// A match means we're done; a fail

means we have to keep checking

if ( (newCache[ 2 ] = matcher( elem,

context, xml )) ) {

return true;
}
}
}
}
}
return false;
};

}
function elementMatcher( matchers ) {
return matchers.length > 1 ?
function( elem, context, xml ) {
var i = matchers.length;
while ( i-- ) {
if ( !matchers[i]( elem, context, xml ) ) {
return false;
}
}
return true;
} :
matchers[0];

}
function multipleContexts( selector, contexts, results ) {
var i = 0,
len = contexts.length;
for ( ; i < len; i++ ) {
Sizzle( selector, contexts[i], results );
}
return results;
}
function condense( unmatched, map, filter, context, xml ) {
var elem,
newUnmatched = [],
i = 0,
len = unmatched.length,
mapped = map != null;
for ( ; i < len; i++ ) {
if ( (elem = unmatched[i]) ) {

if ( !filter || filter( elem, context, xml ) ) {
newUnmatched.push( elem );
if ( mapped ) {
map.push( i );
}
}
}
}
return newUnmatched;
}
function setMatcher( preFilter, selector, matcher, postFilter, postFinder,
postSelector ) {
if ( postFilter && !postFilter[ expando ] ) {
postFilter = setMatcher( postFilter );
}
if ( postFinder && !postFinder[ expando ] ) {
postFinder = setMatcher( postFinder, postSelector );
}
return markFunction(function( seed, results, context, xml ) {
var temp, i, elem,
preMap = [],
postMap = [],
preexisting = results.length,
// Get initial elements from seed or context
elems = seed || multipleContexts( selector || "*",

context.nodeType ? [ context ] : context, [] ),

// Prefilter to get matcher input, preserving a map for

seed-results synchronization

matcherIn = preFilter && ( seed || !selector ) ?
condense( elems, preMap, preFilter, context, xml ) :
elems,
matcherOut = matcher ?
// If we have a postFinder, or filtered seed, or

non-seed postFilter or preexisting results,

postFinder || ( seed ? preFilter : preexisting ||

postFilter ) ?

// ...intermediate processing is necessary
[] :
// ...otherwise use results directly
results :
matcherIn;

// Find primary matches
if ( matcher ) {
matcher( matcherIn, matcherOut, context, xml );
}
// Apply postFilter
if ( postFilter ) {
temp = condense( matcherOut, postMap );
postFilter( temp, [], context, xml );
// Un-match failing elements by moving them back to matcherIn
i = temp.length;
while ( i-- ) {
if ( (elem = temp[i]) ) {
matcherOut[ postMap[i] ] = !(matcherIn[

postMap[i] ] = elem);
}
}
}
if ( seed ) {
if ( postFinder || preFilter ) {
if ( postFinder ) {
// Get the final matcherOut by condensing this

intermediate into postFinder contexts
temp = [];
i = matcherOut.length;
while ( i-- ) {
if ( (elem = matcherOut[i]) ) {
// Restore matcherIn since elem is

not yet a final match

temp.push( (matcherIn[i] = elem) );
}
}
postFinder( null, (matcherOut = []), temp, xml

);

}
// Move matched elements from seed to results to keep

them synchronized

i = matcherOut.length;
while ( i-- ) {
if ( (elem = matcherOut[i]) &&
(temp = postFinder ? indexOf( seed, elem

) : preMap[i]) > -1 ) {

seed[temp] = !(results[temp] = elem);

}
}
}
// Add elements to results, through postFinder if defined
} else {
matcherOut = condense(
matcherOut === results ?
matcherOut.splice( preexisting,

matcherOut.length ) :

matcherOut

);
if ( postFinder ) {
postFinder( null, results, matcherOut, xml );
} else {
push.apply( results, matcherOut );
}
}
});
}
function matcherFromTokens( tokens ) {
var checkContext, matcher, j,
len = tokens.length,
leadingRelative = Expr.relative[ tokens[0].type ],
implicitRelative = leadingRelative || Expr.relative[" "],
i = leadingRelative ? 1 : 0,
// The foundational matcher ensures that elements are reachable

from top-level context(s)

matchContext = addCombinator( function( elem ) {
return elem === checkContext;
}, implicitRelative, true ),
matchAnyContext = addCombinator( function( elem ) {
return indexOf( checkContext, elem ) > -1;
}, implicitRelative, true ),
matchers = [ function( elem, context, xml ) {
var ret = ( !leadingRelative && ( xml || context !==

outermostContext ) ) || (

(checkContext = context).nodeType ?
matchContext( elem, context, xml ) :
matchAnyContext( elem, context, xml ) );

// Avoid hanging onto element (issue #299)
checkContext = null;
return ret;
} ];
for ( ; i < len; i++ ) {

if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
matchers = [ addCombinator(elementMatcher( matchers ),

matcher) ];

} else {
matcher = Expr.filter[ tokens[i].type ].apply( null,

tokens[i].matches );

// Return special upon seeing a positional matcher
if ( matcher[ expando ] ) {
// Find the next relative operator (if any) for proper

handling

j = ++i;
for ( ; j < len; j++ ) {
if ( Expr.relative[ tokens[j].type ] ) {
break;
}
}
return setMatcher(
i > 1 && elementMatcher( matchers ),
i > 1 && toSelector(
// If the preceding token was a descendant

combinator, insert an implicit any-element `*`

tokens.slice( 0, i - 1 ).concat({ value:

tokens[ i - 2 ].type === " " ? "*" : "" })

).replace( rtrim, "$1" ),
matcher,
i < j && matcherFromTokens( tokens.slice( i, j

) ),

j < len && matcherFromTokens( (tokens =

tokens.slice( j )) ),

j < len && toSelector( tokens )
);
}
matchers.push( matcher );
}
}
return elementMatcher( matchers );
}
function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
var bySet = setMatchers.length > 0,
byElement = elementMatchers.length > 0,
superMatcher = function( seed, context, xml, results, outermost

) {

var elem, j, matcher,
matchedCount = 0,
i = "0",

unmatched = seed && [],
setMatched = [],
contextBackup = outermostContext,
// We must always have either seed elements or

outermost context

elems = seed || byElement && Expr.find["TAG"]( "*",

outermost ),

// Use integer dirruns iff this is the outermost

matcher

dirrunsUnique = (dirruns += contextBackup == null ? 1

: Math.random() || 0.1),

len = elems.length;
if ( outermost ) {
outermostContext = context === document || context ||

outermost;

}
// Add elements passing elementMatchers directly to results
// Support: IE<9, Safari
// Tolerate NodeList properties (IE: "length"; Safari:

<number>) matching elements by id

for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
if ( byElement && elem ) {
j = 0;
if ( !context && elem.ownerDocument !== document

) {

setDocument( elem );
xml = !documentIsHTML;
}
while ( (matcher = elementMatchers[j++]) ) {
if ( matcher( elem, context || document,

xml) ) {

results.push( elem );
break;
}
}
if ( outermost ) {
dirruns = dirrunsUnique;
}
}
// Track unmatched elements for set filters
if ( bySet ) {
// They will have gone through all possible

matchers

if ( (elem = !matcher && elem) ) {
matchedCount--;

}
// Lengthen the array for every element, matched

or not

if ( seed ) {
unmatched.push( elem );
}
}
}
// `i` is now the count of elements visited above, and adding

it to `matchedCount`

// makes the latter nonnegative.
matchedCount += i;
// Apply set filters to unmatched elements
// NOTE: This can be skipped if there are no unmatched

elements (i.e., `matchedCount`

// equals `i`), unless we didn't visit _any_ elements in the

above loop because we have

// no element matchers and no seed.
// Incrementing an initially-string "0" `i` allows `i` to

remain a string only in that

// case, which will result in a "00" `matchedCount` that

differs from `i` but is also

// numerically zero.
if ( bySet && i !== matchedCount ) {
j = 0;
while ( (matcher = setMatchers[j++]) ) {
matcher( unmatched, setMatched, context, xml );
}
if ( seed ) {
// Reintegrate element matches to eliminate the

need for sorting

if ( matchedCount > 0 ) {
while ( i-- ) {
if ( !(unmatched[i] ||

setMatched[i]) ) {

setMatched[i] = pop.call(

results );

}
}
}
// Discard index placeholder values to get only

actual matches

setMatched = condense( setMatched );

}
// Add matches to results
push.apply( results, setMatched );
// Seedless set matches succeeding multiple successful

matchers stipulate sorting

if ( outermost && !seed && setMatched.length > 0 &&
( matchedCount + setMatchers.length ) > 1 ) {
Sizzle.uniqueSort( results );
}
}
// Override manipulation of globals by nested matchers
if ( outermost ) {
dirruns = dirrunsUnique;
outermostContext = contextBackup;
}
return unmatched;
};
return bySet ?
markFunction( superMatcher ) :
superMatcher;

}
compile = Sizzle.compile = function( selector, match /* Internal Use Only */
) {
var i,
setMatchers = [],
elementMatchers = [],
cached = compilerCache[ selector + " " ];
if ( !cached ) {
// Generate a function of recursive functions that can be used to

check each element

if ( !match ) {
match = tokenize( selector );
}
i = match.length;
while ( i-- ) {
cached = matcherFromTokens( match[i] );
if ( cached[ expando ] ) {
setMatchers.push( cached );
} else {
elementMatchers.push( cached );

}
}
// Cache the compiled function
cached = compilerCache( selector, matcherFromGroupMatchers(

elementMatchers, setMatchers ) );

// Save selector and tokenization
cached.selector = selector;
}
return cached;
};
/**
* A low-level selection function that works with Sizzle's compiled
* selector functions
* @param {String|Function} selector A selector or a pre-compiled
* selector function built with Sizzle.compile
* @param {Element} context
* @param {Array} [results]
* @param {Array} [seed] A set of elements to match against
*/
select = Sizzle.select = function( selector, context, results, seed ) {
var i, tokens, token, type, find,
compiled = typeof selector === "function" && selector,
match = !seed && tokenize( (selector = compiled.selector ||

selector) );
results = results || [];
// Try to minimize operations if there is only one selector in the list
and no seed
// (the latter of which guarantees us context)
if ( match.length === 1 ) {
// Reduce context if the leading compound selector is an ID
tokens = match[0] = match[0].slice( 0 );
if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
context.nodeType === 9 && documentIsHTML &&

Expr.relative[ tokens[1].type ] ) {

context = ( Expr.find["ID"](

token.matches[0].replace(runescape, funescape), context ) || [] )[0];

if ( !context ) {
return results;
// Precompiled matchers will still verify ancestry, so step

up a level

} else if ( compiled ) {
context = context.parentNode;
}
selector = selector.slice( tokens.shift().value.length );
}
// Fetch a seed set for right-to-left matching
i = matchExpr["needsContext"].test( selector ) ? 0 :

tokens.length;

while ( i-- ) {
token = tokens[i];
// Abort if we hit a combinator
if ( Expr.relative[ (type = token.type) ] ) {
break;
}
if ( (find = Expr.find[ type ]) ) {
// Search, expanding context for leading sibling

combinators

if ( (seed = find(
token.matches[0].replace( runescape, funescape

),

rsibling.test( tokens[0].type ) && testContext(

context.parentNode ) || context
)) ) {
// If seed is empty or no tokens remain, we can

return early

tokens.splice( i, 1 );
selector = seed.length && toSelector( tokens );
if ( !selector ) {
push.apply( results, seed );
return results;
}
break;
}
}
}
}
// Compile and execute a filtering function if one is not provided
// Provide `match` to avoid retokenization if we modified the selector
above
( compiled || compile( selector, match ) )(
seed,
context,

!documentIsHTML,
results,
!context || rsibling.test( selector ) && testContext(

context.parentNode ) || context
);
return results;
};
// One-time assignments
// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") ===
expando;
// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;
// Initialize against the default document
setDocument();
// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
// Should return 1, but returns 4 (following)
return el.compareDocumentPosition( document.createElement("fieldset")
) & 1;
});
// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
el.innerHTML = "<a href='#'></a>";
return el.firstChild.getAttribute("href") === "#" ;
}) ) {
addHandle( "type|href|height|width", function( elem, name, isXML ) {
if ( !isXML ) {
return elem.getAttribute( name, name.toLowerCase() ===

"type" ? 1 : 2 );
}
});
}
// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
el.innerHTML = "<input/>";

el.firstChild.setAttribute( "value", "" );
return el.firstChild.getAttribute( "value" ) === "";
}) ) {
addHandle( "value", function( elem, name, isXML ) {
if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
return elem.defaultValue;
}
});
}
// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
return el.getAttribute("disabled") == null;
}) ) {
addHandle( booleans, function( elem, name, isXML ) {
var val;
if ( !isXML ) {
return elem[ name ] === true ? name.toLowerCase() :
(val = elem.getAttributeNode( name )) &&

val.specified ?

val.value :
null;

}
});
}
return Sizzle;
})( window );

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;

var dir = function( elem, dir, until ) {

var matched = [],
truncate = until !== undefined;
while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
if ( elem.nodeType === 1 ) {
if ( truncate && jQuery( elem ).is( until ) ) {
break;
}
matched.push( elem );
}
}
return matched;
};

var siblings = function( n, elem ) {
var matched = [];
for ( ; n; n = n.nextSibling ) {
if ( n.nodeType === 1 && n !== elem ) {
matched.push( n );
}
}
return matched;
};

var rneedsContext = jQuery.expr.match.needsContext;

function nodeName( elem, name ) {
return elem.nodeName && elem.nodeName.toLowerCase() ===
name.toLowerCase();
};
var rsingleTag = (
/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );

var risSimple = /^.[^:#\[\.,]*$/;
// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
if ( jQuery.isFunction( qualifier ) ) {

return jQuery.grep( elements, function( elem, i ) {
return !!qualifier.call( elem, i, elem ) !== not;
} );
}
// Single element
if ( qualifier.nodeType ) {
return jQuery.grep( elements, function( elem ) {
return ( elem === qualifier ) !== not;
} );
}
// Arraylike of elements (jQuery, arguments, Array)
if ( typeof qualifier !== "string" ) {
return jQuery.grep( elements, function( elem ) {
return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
} );
}
// Simple selector that can be filtered directly, removing non-Elements
if ( risSimple.test( qualifier ) ) {
return jQuery.filter( qualifier, elements, not );
}
// Complex selector, compare the two sets, removing non-Elements
qualifier = jQuery.filter( qualifier, elements );
return jQuery.grep( elements, function( elem ) {
return ( indexOf.call( qualifier, elem ) > -1 ) !== not &&

elem.nodeType === 1;
} );
}
jQuery.filter = function( expr, elems, not ) {
var elem = elems[ 0 ];
if ( not ) {
expr = ":not(" + expr + ")";
}
if ( elems.length === 1 && elem.nodeType === 1 ) {
return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
}
return jQuery.find.matches( expr, jQuery.grep( elems, function( elem )
{

return elem.nodeType === 1;
} ) );
};

jQuery.fn.extend( {
find: function( selector ) {
var i, ret,
len = this.length,
self = this;
if ( typeof selector !== "string" ) {
return this.pushStack( jQuery( selector ).filter(

function() {

for ( i = 0; i < len; i++ ) {
if ( jQuery.contains( self[ i ], this ) ) {
return true;
}
}
} ) );
}
ret = this.pushStack( [] );
for ( i = 0; i < len; i++ ) {
jQuery.find( selector, self[ i ], ret );
}
return len > 1 ? jQuery.uniqueSort( ret ) : ret;
},
filter: function( selector ) {
return this.pushStack( winnow( this, selector || [], false ) );
},
not: function( selector ) {
return this.pushStack( winnow( this, selector || [], true ) );
},
is: function( selector ) {
return !!winnow(
this,
// If this is a positional/relative selector, check

membership in the returned set

// so $("p:first").is("p:last") won't return true for a doc

with two "p".

typeof selector === "string" && rneedsContext.test(

selector ) ?

jQuery( selector ) :
selector || [],
false
).length;
}
} );

// Initialize a jQuery object

// A central reference to the root jQuery(document)
var rootjQuery,
// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
// Strict HTML recognition (#11290: must start with <)
// Shortcut simple #id case for speed
rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
init = jQuery.fn.init = function( selector, context, root ) {
var match, elem;
// HANDLE: $(""), $(null), $(undefined), $(false)
if ( !selector ) {
return this;
}
// Method init() accepts an alternate rootjQuery
// so migrate can support jQuery.sub (gh-2101)
root = root || rootjQuery;
// Handle HTML strings
if ( typeof selector === "string" ) {
if ( selector[ 0 ] === "<" &&
selector[ selector.length - 1 ] === ">" &&
selector.length >= 3 ) {
// Assume that strings that start and end with <> are

HTML and skip the regex check

match = [ null, selector, null ];
} else {
match = rquickExpr.exec( selector );
}
// Match html or make sure no context is specified for #id
if ( match && ( match[ 1 ] || !context ) ) {
// HANDLE: $(html) -> $(array)
if ( match[ 1 ] ) {
context = context instanceof jQuery ? context[

0 ] : context;

// Option to run scripts is true for back-compat
// Intentionally let the error be thrown if

parseHTML is not present

jQuery.merge( this, jQuery.parseHTML(
match[ 1 ],
context && context.nodeType ?

context.ownerDocument || context : document,
true
) );
// HANDLE: $(html, props)
if ( rsingleTag.test( match[ 1 ] ) &&

jQuery.isPlainObject( context ) ) {

for ( match in context ) {
// Properties of context are called

as methods if possible

if ( jQuery.isFunction( this[ match

] ) ) {

this[ match ]( context[ match

] );

// ...and otherwise set as

attributes

} else {
this.attr( match, context[

match ] );

}
}
}
return this;
// HANDLE: $(#id)
} else {
elem = document.getElementById( match[ 2 ] );
if ( elem ) {
// Inject the element directly into the

jQuery object

this[ 0 ] = elem;
this.length = 1;
}
return this;
}
// HANDLE: $(expr, $(...))

} else if ( !context || context.jquery ) {
return ( context || root ).find( selector );
// HANDLE: $(expr, context)
// (which is just equivalent to: $(context).find(expr)
} else {
return this.constructor( context ).find( selector );
}
// HANDLE: $(DOMElement)
} else if ( selector.nodeType ) {
this[ 0 ] = selector;
this.length = 1;
return this;
// HANDLE: $(function)
// Shortcut for document ready
} else if ( jQuery.isFunction( selector ) ) {
return root.ready !== undefined ?
root.ready( selector ) :
// Execute immediately if ready is not present
selector( jQuery );

}
return jQuery.makeArray( selector, this );
};
// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;
// Initialize central reference
rootjQuery = jQuery( document );

var rparentsprev = /^(?:parents|prev(?:Until|All))/,
// Methods guaranteed to produce a unique set when starting from a unique
set
guaranteedUnique = {
children: true,
contents: true,
next: true,
prev: true
};
jQuery.fn.extend( {
has: function( target ) {

var targets = jQuery( target, this ),
l = targets.length;
return this.filter( function() {
var i = 0;
for ( ; i < l; i++ ) {
if ( jQuery.contains( this, targets[ i ] ) ) {
return true;
}
}
} );
},
closest: function( selectors, context ) {
var cur,
i = 0,
l = this.length,
matched = [],
targets = typeof selectors !== "string" && jQuery( selectors

);

// Positional selectors never match, since there's no _selection_

context

if ( !rneedsContext.test( selectors ) ) {
for ( ; i < l; i++ ) {
for ( cur = this[ i ]; cur && cur !== context; cur =

cur.parentNode ) {

// Always skip document fragments
if ( cur.nodeType < 11 && ( targets ?
targets.index( cur ) > -1 :
// Don't pass non-elements to Sizzle
cur.nodeType === 1 &&
jQuery.find.matchesSelector( cur,

selectors ) ) ) {

matched.push( cur );
break;
}
}
}
}
return this.pushStack( matched.length > 1 ? jQuery.uniqueSort(

matched ) : matched );
},

// Determine the position of an element within the set
index: function( elem ) {
// No argument, return index in parent
if ( !elem ) {
return ( this[ 0 ] && this[ 0 ].parentNode ) ?

this.first().prevAll().length : -1;

}
// Index in selector
if ( typeof elem === "string" ) {
return indexOf.call( jQuery( elem ), this[ 0 ] );
}
// Locate the position of the desired element
return indexOf.call( this,
// If it receives a jQuery object, the first element is used
elem.jquery ? elem[ 0 ] : elem
);
},
add: function( selector, context ) {
return this.pushStack(
jQuery.uniqueSort(
jQuery.merge( this.get(), jQuery( selector, context )

)

)
);
},
addBack: function( selector ) {
return this.add( selector == null ?
this.prevObject : this.prevObject.filter( selector )
);
}
} );
function sibling( cur, dir ) {
while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
return cur;
}
jQuery.each( {
parent: function( elem ) {
var parent = elem.parentNode;
return parent && parent.nodeType !== 11 ? parent : null;
},

parents: function( elem ) {
return dir( elem, "parentNode" );
},
parentsUntil: function( elem, i, until ) {
return dir( elem, "parentNode", until );
},
next: function( elem ) {
return sibling( elem, "nextSibling" );
},
prev: function( elem ) {
return sibling( elem, "previousSibling" );
},
nextAll: function( elem ) {
return dir( elem, "nextSibling" );
},
prevAll: function( elem ) {
return dir( elem, "previousSibling" );
},
nextUntil: function( elem, i, until ) {
return dir( elem, "nextSibling", until );
},
prevUntil: function( elem, i, until ) {
return dir( elem, "previousSibling", until );
},
siblings: function( elem ) {
return siblings( ( elem.parentNode || {} ).firstChild, elem );
},
children: function( elem ) {
return siblings( elem.firstChild );
},
contents: function( elem ) {
if ( nodeName( elem, "iframe" ) ) {
return elem.contentDocument;
}
// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
// Treat the template element as a regular one in browsers that
// don't support it.
if ( nodeName( elem, "template" ) ) {
elem = elem.content || elem;
}
return jQuery.merge( [], elem.childNodes );
}
}, function( name, fn ) {
jQuery.fn[ name ] = function( until, selector ) {
var matched = jQuery.map( this, fn, until );

if ( name.slice( -5 ) !== "Until" ) {
selector = until;
}
if ( selector && typeof selector === "string" ) {
matched = jQuery.filter( selector, matched );
}
if ( this.length > 1 ) {
// Remove duplicates
if ( !guaranteedUnique[ name ] ) {
jQuery.uniqueSort( matched );
}
// Reverse order for parents* and prev-derivatives
if ( rparentsprev.test( name ) ) {
matched.reverse();
}
}
return this.pushStack( matched );
};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );

// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
var object = {};
jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag )
{

object[ flag ] = true;
} );
return object;
}
/*
* Create a callback list using the following parameters:
*
* options: an optional list of space-separated options that will change
how
* the callback list behaves or a more traditional option object
*
* By default a callback list will act like an event callback list and can be
* "fired" multiple times.
*

* Possible options:
*
* once: will ensure the callback list can only be fired once
(like a Deferred)
*
* memory: will keep track of previous values and will call
any callback added
* after the list has been fired right away with the
latest "memorized"
* values (like a Deferred)
*
* unique: will ensure a callback can only be added once (no
duplicate in the list)
*
* stopOnFalse: interrupt callings when a callback returns false
*
*/
jQuery.Callbacks = function( options ) {
// Convert options from String-formatted to Object-formatted if needed
// (we check in cache first)
options = typeof options === "string" ?
createOptions( options ) :
jQuery.extend( {}, options );
var // Flag to know if list is currently firing
firing,
// Last fire value for non-forgettable lists
memory,
// Flag to know if list was already fired
fired,
// Flag to prevent firing
locked,
// Actual callback list
list = [],
// Queue of execution data for repeatable lists
queue = [],
// Index of currently firing callback (modified by add/remove as

needed)

firingIndex = -1,
// Fire callbacks

fire = function() {
// Enforce single-firing
locked = locked || options.once;
// Execute callbacks for all pending executions,
// respecting firingIndex overrides and runtime changes
fired = firing = true;
for ( ; queue.length; firingIndex = -1 ) {
memory = queue.shift();
while ( ++firingIndex < list.length ) {
// Run callback and check for early termination
if ( list[ firingIndex ].apply( memory[ 0 ],

memory[ 1 ] ) === false &&

options.stopOnFalse ) {
// Jump to end and forget the data so .add

doesn't re-fire

firingIndex = list.length;
memory = false;
}
}
}
// Forget the data if we're done with it
if ( !options.memory ) {
memory = false;
}
firing = false;
// Clean up if we're done firing for good
if ( locked ) {
// Keep an empty list if we have data for future add

calls

if ( memory ) {
list = [];
// Otherwise, this object is spent
} else {
list = "";
}
}
},
// Actual Callbacks object

self = {
// Add a callback or a collection of callbacks to the list
add: function() {
if ( list ) {
// If we have memory from a past run, we should

fire after adding

if ( memory && !firing ) {
firingIndex = list.length - 1;
queue.push( memory );
}
( function add( args ) {
jQuery.each( args, function( _, arg ) {
if ( jQuery.isFunction( arg ) ) {
if ( !options.unique ||

!self.has( arg ) ) {

list.push( arg );
}
} else if ( arg && arg.length &&

jQuery.type( arg ) !== "string" ) {

// Inspect recursively
add( arg );
}
} );
} )( arguments );
if ( memory && !firing ) {
fire();
}
}
return this;
},
// Remove a callback from the list
remove: function() {
jQuery.each( arguments, function( _, arg ) {
var index;
while ( ( index = jQuery.inArray( arg, list,

index ) ) > -1 ) {

list.splice( index, 1 );
// Handle firing indexes
if ( index <= firingIndex ) {
firingIndex--;
}

}
} );
return this;
},
// Check if a given callback is in the list.
// If no argument is given, return whether or not list has

callbacks attached.

has: function( fn ) {
return fn ?
jQuery.inArray( fn, list ) > -1 :
list.length > 0;

},
// Remove all callbacks from the list
empty: function() {
if ( list ) {
list = [];
}
return this;
},
// Disable .fire and .add
// Abort any current/pending executions
// Clear all callbacks and values
disable: function() {
locked = queue = [];
list = memory = "";
return this;
},
disabled: function() {
return !list;
},
// Disable .fire
// Also disable .add unless we have memory (since it would

have no effect)

// Abort any pending executions
lock: function() {
locked = queue = [];
if ( !memory && !firing ) {
list = memory = "";
}
return this;
},
locked: function() {
return !!locked;
},

// Call all callbacks with the given context and arguments
fireWith: function( context, args ) {
if ( !locked ) {
args = args || [];
args = [ context, args.slice ? args.slice() :

args ];

queue.push( args );
if ( !firing ) {
fire();
}
}
return this;
},
// Call all the callbacks with the given arguments
fire: function() {
self.fireWith( this, arguments );
return this;
},
// To know if the callbacks have already been called at least

once

fired: function() {
return !!fired;
}
};
return self;
};

function Identity( v ) {
return v;
}
function Thrower( ex ) {
throw ex;
}
function adoptValue( value, resolve, reject, noValue ) {
var method;
try {
// Check for promise aspect first to privilege synchronous behavior
if ( value && jQuery.isFunction( ( method = value.promise ) ) )

{

method.call( value ).done( resolve ).fail( reject );

// Other thenables
} else if ( value && jQuery.isFunction( ( method = value.then )

) ) {

method.call( value, resolve, reject );
// Other non-thenables
} else {
// Control `resolve` arguments by letting Array#slice cast

boolean `noValue` to integer:

// * false: [ value ].slice( 0 ) => resolve( value )
// * true: [ value ].slice( 1 ) => resolve()
resolve.apply( undefined, [ value ].slice( noValue ) );
}
// For Promises/A+, convert exceptions into rejections
// Since jQuery.when doesn't unwrap thenables, we can skip the extra
checks appearing in
// Deferred#then to conditionally suppress rejection.
} catch ( value ) {
// Support: Android 4.0 only
// Strict mode functions invoked without .call/.apply get

global-object context

reject.apply( undefined, [ value ] );
}
}
jQuery.extend( {
Deferred: function( func ) {
var tuples = [

// action, add listener, callbacks,
// ... .then handlers, argument index, [final state]
[ "notify", "progress", jQuery.Callbacks( "memory" ),
jQuery.Callbacks( "memory" ), 2 ],
[ "resolve", "done", jQuery.Callbacks( "once memory"

),

jQuery.Callbacks( "once memory" ), 0, "resolved"

],

[ "reject", "fail", jQuery.Callbacks( "once memory" ),
jQuery.Callbacks( "once memory" ), 1, "rejected"

]

],
state = "pending",
promise = {

state: function() {
return state;
},
always: function() {
deferred.done( arguments ).fail( arguments );
return this;
},
"catch": function( fn ) {
return promise.then( null, fn );
},
// Keep pipe for back-compat
pipe: function( /* fnDone, fnFail, fnProgress */ ) {
var fns = arguments;
return jQuery.Deferred( function( newDefer ) {
jQuery.each( tuples, function( i, tuple )

{

// Map tuples (progress, done, fail)

to arguments (done, fail, progress)

var fn = jQuery.isFunction( fns[

tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

// deferred.progress(function() {

bind to newDefer or newDefer.notify })

// deferred.done(function() { bind

to newDefer or newDefer.resolve })

// deferred.fail(function() { bind

to newDefer or newDefer.reject })

deferred[ tuple[ 1 ] ]( function() {
var returned = fn && fn.apply(

this, arguments );

if ( returned &&

jQuery.isFunction( returned.promise ) ) {

returned.promise()
.progress(

newDefer.notify )

.done(

newDefer.resolve )

.fail(

newDefer.reject );

} else {
newDefer[ tuple[ 0 ] +

"With" ](

this,
fn ? [ returned ] :

arguments

);
}
} );
} );
fns = null;
} ).promise();
},
then: function( onFulfilled, onRejected, onProgress )

{

var maxDepth = 0;
function resolve( depth, deferred, handler,

special ) {

return function() {
var that = this,
args = arguments,
mightThrow = function() {
var returned, then;
// Support: Promises/A+

section 2.3.3.3.3

//

https://promisesaplus.com/#point-59

// Ignore

double-resolution attempts

if ( depth < maxDepth )

{

return;
}
returned =

handler.apply( that, args );

// Support: Promises/A+

section 2.3.1

//

https://promisesaplus.com/#point-48

if ( returned ===

deferred.promise() ) {

throw new

TypeError( "Thenable self-resolution" );

}
// Support: Promises/A+

sections 2.3.3.1, 3.5

//

https://promisesaplus.com/#point-54

//

https://promisesaplus.com/#point-75

// Retrieve `then` only

once

then = returned &&
// Support:

Promises/A+ section 2.3.4

//

https://promisesaplus.com/#point-64

// Only check

objects and functions for thenability

( typeof returned

=== "object" ||

typeof

returned === "function" ) &&

returned.then;
// Handle a returned

thenable

if ( jQuery.isFunction(

then ) ) {

// Special

processors (notify) just wait for resolution

if ( special ) {
then.call(

returned,
resolve( maxDepth, deferred, Identity, special ),
resolve( maxDepth, deferred, Thrower, special )

);
// Normal

processors (resolve) also hook into progress

} else {
// ...and

disregard older resolution values

maxDepth++;
then.call(

returned,
resolve( maxDepth, deferred, Identity, special ),
resolve( maxDepth, deferred, Thrower, special ),

resolve( maxDepth, deferred, Identity,
deferred.notifyWith )

);
}
// Handle all other

returned values

} else {
// Only substitute

handlers pass on context

// and multiple

values (non-spec behavior)

if ( handler !==

Identity ) {

that =

undefined;

args = [

returned ];

}
// Process the

value(s)

// Default process

is resolve

( special ||

deferred.resolveWith )( that, args );

}
},
// Only normal processors

(resolve) catch and reject exceptions

process = special ?
mightThrow :
function() {
try {

mightThrow();

} catch ( e ) {
if (

jQuery.Deferred.exceptionHook ) {
jQuery.Deferred.exceptionHook( e,
process.stackTrace );

}
// Support:

Promises/A+ section 2.3.3.3.4.1

//

https://promisesaplus.com/#point-61

// Ignore

post-resolution exceptions

if ( depth +

1 >= maxDepth ) {

//

Only substitute handlers pass on context

// and

multiple values (non-spec behavior)

if (

handler !== Thrower ) {
that = undefined;
args = [ e ];

}

deferred.rejectWith( that, args );

}
}
};

// Support: Promises/A+ section

2.3.3.3.1

//

https://promisesaplus.com/#point-57

// Re-resolve promises immediately

to dodge false rejection from

// subsequent errors
if ( depth ) {
process();
} else {
// Call an optional hook to

record the stack, in case of exception

// since it's otherwise lost

when execution goes async

if (

jQuery.Deferred.getStackHook ) {

process.stackTrace =

jQuery.Deferred.getStackHook();

}
window.setTimeout( process );
}
};
}
return jQuery.Deferred( function( newDefer ) {
// progress_handlers.add( ... )
tuples[ 0 ][ 3 ].add(
resolve(
0,
newDefer,
jQuery.isFunction(

onProgress ) ?

onProgress :
Identity,
newDefer.notifyWith
)
);
// fulfilled_handlers.add( ... )
tuples[ 1 ][ 3 ].add(
resolve(
0,
newDefer,
jQuery.isFunction(

onFulfilled ) ?

onFulfilled :
Identity

)
);
// rejected_handlers.add( ... )
tuples[ 2 ][ 3 ].add(
resolve(
0,
newDefer,
jQuery.isFunction(

onRejected ) ?

onRejected :
Thrower

)
);
} ).promise();
},
// Get a promise for this deferred

// If obj is provided, the promise aspect is added to

the object

promise: function( obj ) {
return obj != null ? jQuery.extend( obj, promise

) : promise;

}
},
deferred = {};
// Add list-specific methods
jQuery.each( tuples, function( i, tuple ) {
var list = tuple[ 2 ],
stateString = tuple[ 5 ];
// promise.progress = list.add
// promise.done = list.add
// promise.fail = list.add
promise[ tuple[ 1 ] ] = list.add;
// Handle state
if ( stateString ) {
list.add(
function() {
// state = "resolved" (i.e., fulfilled)
// state = "rejected"
state = stateString;
},
// rejected_callbacks.disable
// fulfilled_callbacks.disable
tuples[ 3 - i ][ 2 ].disable,
// progress_callbacks.lock
tuples[ 0 ][ 2 ].lock
);
}
// progress_handlers.fire
// fulfilled_handlers.fire
// rejected_handlers.fire
list.add( tuple[ 3 ].fire );
// deferred.notify = function() { deferred.notifyWith(...)

}

// deferred.resolve = function() {

deferred.resolveWith(...) }

// deferred.reject = function() { deferred.rejectWith(...)

}

deferred[ tuple[ 0 ] ] = function() {
deferred[ tuple[ 0 ] + "With" ]( this === deferred ?

undefined : this, arguments );
return this;
};
// deferred.notifyWith = list.fireWith
// deferred.resolveWith = list.fireWith
// deferred.rejectWith = list.fireWith
deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
} );
// Make the deferred a promise
promise.promise( deferred );
// Call given func if any
if ( func ) {
func.call( deferred, deferred );
}
// All done!
return deferred;
},
// Deferred helper
when: function( singleValue ) {
var
// count of uncompleted subordinates
remaining = arguments.length,
// count of unprocessed arguments
i = remaining,
// subordinate fulfillment data
resolveContexts = Array( i ),
resolveValues = slice.call( arguments ),
// the master Deferred
master = jQuery.Deferred(),
// subordinate callback factory
updateFunc = function( i ) {
return function( value ) {
resolveContexts[ i ] = this;
resolveValues[ i ] = arguments.length > 1 ?

slice.call( arguments ) : value;

if ( !( --remaining ) ) {
master.resolveWith( resolveContexts,

resolveValues );

}
};
};
// Single- and empty arguments are adopted like Promise.resolve
if ( remaining <= 1 ) {
adoptValue( singleValue, master.done( updateFunc( i )

).resolve, master.reject,

!remaining );
// Use .then() to unwrap secondary thenables (cf. gh-3000)
if ( master.state() === "pending" ||
jQuery.isFunction( resolveValues[ i ] &&

resolveValues[ i ].then ) ) {

return master.then();
}
}
// Multiple arguments are aggregated like Promise.all array

elements

while ( i-- ) {
adoptValue( resolveValues[ i ], updateFunc( i ),

master.reject );
}
return master.promise();
}
} );

// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
jQuery.Deferred.exceptionHook = function( error, stack ) {
// Support: IE 8 - 9 only
// Console exists when dev tools are open, which can happen at any time
if ( window.console && window.console.warn && error && rerrorNames.test(
error.name ) ) {

window.console.warn( "jQuery.Deferred exception: " +

error.message, error.stack, stack );
}
};

jQuery.readyException = function( error ) {
window.setTimeout( function() {
throw error;
} );
};

// The deferred used on DOM ready
var readyList = jQuery.Deferred();
jQuery.fn.ready = function( fn ) {
readyList
.then( fn )
// Wrap jQuery.readyException in a function so that the lookup
// happens at the time of error handling instead of callback
// registration.
.catch( function( error ) {
jQuery.readyException( error );
} );
return this;
};
jQuery.extend( {
// Is the DOM ready to be used? Set to true once it occurs.
isReady: false,
// A counter to track how many items to wait for before
// the ready event fires. See #6781
readyWait: 1,
// Handle when the DOM is ready
ready: function( wait ) {
// Abort if there are pending holds or we're already ready
if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
return;
}

// Remember that the DOM is ready
jQuery.isReady = true;
// If a normal DOM Ready event fired, decrement, and wait if need

be

if ( wait !== true && --jQuery.readyWait > 0 ) {
return;
}
// If there are functions bound, to execute
readyList.resolveWith( document, [ jQuery ] );
}
} );
jQuery.ready.then = readyList.then;
// The ready event handler and self cleanup method
function completed() {
document.removeEventListener( "DOMContentLoaded", completed );
window.removeEventListener( "load", completed );
jQuery.ready();
}
// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
( document.readyState !== "loading" &&
!document.documentElement.doScroll ) ) {
// Handle it asynchronously to allow scripts the opportunity to delay
ready
window.setTimeout( jQuery.ready );
} else {
// Use the handy event callback
document.addEventListener( "DOMContentLoaded", completed );
// A fallback to window.onload, that will always work
window.addEventListener( "load", completed );
}

// Multifunctional method to get and set values of a collection

// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
var i = 0,
len = elems.length,
bulk = key == null;
// Sets many values
if ( jQuery.type( key ) === "object" ) {
chainable = true;
for ( i in key ) {
access( elems, fn, i, key[ i ], true, emptyGet, raw );
}
// Sets one value
} else if ( value !== undefined ) {
chainable = true;
if ( !jQuery.isFunction( value ) ) {
raw = true;
}
if ( bulk ) {
// Bulk operations run against the entire set
if ( raw ) {
fn.call( elems, value );
fn = null;
// ...except when executing function values
} else {
bulk = fn;
fn = function( elem, key, value ) {
return bulk.call( jQuery( elem ), value );
};
}
}
if ( fn ) {
for ( ; i < len; i++ ) {
fn(
elems[ i ], key, raw ?
value :
value.call( elems[ i ], i, fn( elems[ i ], key

) )

);
}
}
}

if ( chainable ) {
return elems;
}
// Gets
if ( bulk ) {
return fn.call( elems );
}
return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {
// Accepts only:
// - Node
// - Node.ELEMENT_NODE
// - Node.DOCUMENT_NODE
// - Object
// - Any
return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType
);
};

function Data() {
this.expando = jQuery.expando + Data.uid++;
}
Data.uid = 1;
Data.prototype = {
cache: function( owner ) {
// Check if the owner object already has a cache
var value = owner[ this.expando ];
// If not, create one
if ( !value ) {
value = {};
// We can accept data for non-element nodes in modern

browsers,

// but we should not, see #8335.
// Always return an empty object.

if ( acceptData( owner ) ) {
// If it is a node unlikely to be stringify-ed or looped

over

// use plain assignment
if ( owner.nodeType ) {
owner[ this.expando ] = value;
// Otherwise secure it in a non-enumerable property
// configurable must be true to allow the property to

be

// deleted when data is removed
} else {
Object.defineProperty( owner, this.expando, {
value: value,
configurable: true
} );
}
}
}
return value;
},
set: function( owner, data, value ) {
var prop,
cache = this.cache( owner );
// Handle: [ owner, key, value ] args
// Always use camelCase key (gh-2257)
if ( typeof data === "string" ) {
cache[ jQuery.camelCase( data ) ] = value;
// Handle: [ owner, { properties } ] args
} else {
// Copy the properties one-by-one to the cache object
for ( prop in data ) {
cache[ jQuery.camelCase( prop ) ] = data[ prop ];
}
}
return cache;
},
get: function( owner, key ) {
return key === undefined ?
this.cache( owner ) :
// Always use camelCase key (gh-2257)
owner[ this.expando ] && owner[ this.expando ][

jQuery.camelCase( key ) ];
},
access: function( owner, key, value ) {
// In cases where either:
//
// 1. No key was specified
// 2. A string key was specified, but no value provided
//
// Take the "read" path and allow the get method to determine
// which value to return, respectively either:
//
// 1. The entire cache object
// 2. The data stored at the key
//
if ( key === undefined ||

( ( key && typeof key === "string" ) && value ===

undefined ) ) {

return this.get( owner, key );
}
// When the key is not a string, or both a key and value
// are specified, set or extend (existing objects) with either:
//
// 1. An object of properties
// 2. A key and value
//
this.set( owner, key, value );
// Since the "set" path can have two possible entry points
// return the expected data based on which path was taken[*]
return value !== undefined ? value : key;
},
remove: function( owner, key ) {
var i,
cache = owner[ this.expando ];
if ( cache === undefined ) {
return;
}
if ( key !== undefined ) {
// Support array or space separated string of keys
if ( Array.isArray( key ) ) {
// If key is an array of keys...

// We always set camelCase keys, so remove that.
key = key.map( jQuery.camelCase );
} else {
key = jQuery.camelCase( key );
// If a key with the spaces exists, use it.
// Otherwise, create an array by matching

non-whitespace

key = key in cache ?
[ key ] :
( key.match( rnothtmlwhite ) || [] );

}
i = key.length;
while ( i-- ) {
delete cache[ key[ i ] ];
}
}
// Remove the expando if there's no more data
if ( key === undefined || jQuery.isEmptyObject( cache ) ) {
// Support: Chrome <=35 - 45
// Webkit & Blink performance suffers when deleting

properties

// from DOM nodes, so set to undefined instead
//

https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug
restricted)

if ( owner.nodeType ) {
owner[ this.expando ] = undefined;
} else {
delete owner[ this.expando ];
}
}
},
hasData: function( owner ) {
var cache = owner[ this.expando ];
return cache !== undefined && !jQuery.isEmptyObject( cache );
}
};
var dataPriv = new Data();
var dataUser = new Data();

// Implementation Summary
//
// 1. Enforce API surface and semantic compatibility with 1.9.x branch
// 2. Improve the module's maintainability by reducing the storage
// paths to a single mechanism.
// 3. Use the same single mechanism to support "private" and "user" data.
// 4. _Never_ expose "private" data to user code (TODO: Drop _data,
_removeData)
// 5. Avoid exposing implementation details on user objects (eg. expando
properties)
// 6. Provide a clear path for implementation upgrade to WeakMap in 2014
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
rmultiDash = /[A-Z]/g;
function getData( data ) {
if ( data === "true" ) {
return true;
}
if ( data === "false" ) {
return false;
}
if ( data === "null" ) {
return null;
}
// Only convert to a number if it doesn't change the string
if ( data === +data + "" ) {
return +data;
}
if ( rbrace.test( data ) ) {
return JSON.parse( data );
}
return data;
}
function dataAttr( elem, key, data ) {
var name;
// If nothing was found internally, try to fetch any
// data from the HTML5 data-* attribute
if ( data === undefined && elem.nodeType === 1 ) {
name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
data = elem.getAttribute( name );

if ( typeof data === "string" ) {
try {
data = getData( data );
} catch ( e ) {}
// Make sure we set the data so it isn't changed later
dataUser.set( elem, key, data );
} else {
data = undefined;
}
}
return data;
}
jQuery.extend( {
hasData: function( elem ) {
return dataUser.hasData( elem ) || dataPriv.hasData( elem );
},
data: function( elem, name, data ) {
return dataUser.access( elem, name, data );
},
removeData: function( elem, name ) {
dataUser.remove( elem, name );
},
// TODO: Now that all calls to _data and _removeData have been replaced
// with direct calls to dataPriv methods, these can be deprecated.
_data: function( elem, name, data ) {
return dataPriv.access( elem, name, data );
},
_removeData: function( elem, name ) {
dataPriv.remove( elem, name );
}
} );
jQuery.fn.extend( {
data: function( key, value ) {
var i, name, data,
elem = this[ 0 ],
attrs = elem && elem.attributes;
// Gets all values
if ( key === undefined ) {
if ( this.length ) {

data = dataUser.get( elem );
if ( elem.nodeType === 1 && !dataPriv.get( elem,

"hasDataAttrs" ) ) {

i = attrs.length;
while ( i-- ) {
// Support: IE 11 only
// The attrs elements can be null (#14894)
if ( attrs[ i ] ) {
name = attrs[ i ].name;
if ( name.indexOf( "data-" ) === 0 )

{

name = jQuery.camelCase(

name.slice( 5 ) );

dataAttr( elem, name, data[

name ] );

}
}
}
dataPriv.set( elem, "hasDataAttrs", true );
}
}
return data;
}
// Sets multiple values
if ( typeof key === "object" ) {
return this.each( function() {
dataUser.set( this, key );
} );
}
return access( this, function( value ) {
var data;
// The calling jQuery object (element matches) is not empty
// (and therefore has an element appears at this[ 0 ]) and

the

// `value` parameter was not undefined. An empty jQuery

object

// will result in `undefined` for elem = this[ 0 ] which will
// throw an exception if an attempt to read a data cache is

made.

if ( elem && value === undefined ) {
// Attempt to get data from the cache

// The key will always be camelCased in Data
data = dataUser.get( elem, key );
if ( data !== undefined ) {
return data;
}
// Attempt to "discover" the data in
// HTML5 custom data-* attrs
data = dataAttr( elem, key );
if ( data !== undefined ) {
return data;
}
// We tried really hard, but the data doesn't exist.
return;
}
// Set the data...
this.each( function() {
// We always store the camelCased key
dataUser.set( this, key, value );
} );
}, null, value, arguments.length > 1, null, true );
},
removeData: function( key ) {
return this.each( function() {
dataUser.remove( this, key );
} );
}
} );

jQuery.extend( {
queue: function( elem, type, data ) {
var queue;
if ( elem ) {
type = ( type || "fx" ) + "queue";
queue = dataPriv.get( elem, type );
// Speed up dequeue by getting out quickly if this is just

a lookup

if ( data ) {
if ( !queue || Array.isArray( data ) ) {
queue = dataPriv.access( elem, type,

jQuery.makeArray( data ) );

} else {
queue.push( data );
}
}
return queue || [];
}
},
dequeue: function( elem, type ) {
type = type || "fx";
var queue = jQuery.queue( elem, type ),
startLength = queue.length,
fn = queue.shift(),
hooks = jQuery._queueHooks( elem, type ),
next = function() {
jQuery.dequeue( elem, type );
};
// If the fx queue is dequeued, always remove the progress sentinel
if ( fn === "inprogress" ) {
fn = queue.shift();
startLength--;
}
if ( fn ) {
// Add a progress sentinel to prevent the fx queue from being
// automatically dequeued
if ( type === "fx" ) {
queue.unshift( "inprogress" );
}
// Clear up the last queue stop function
delete hooks.stop;
fn.call( elem, next, hooks );
}
if ( !startLength && hooks ) {
hooks.empty.fire();
}
},
// Not public - generate a queueHooks object, or return the current one
_queueHooks: function( elem, type ) {
var key = type + "queueHooks";
return dataPriv.get( elem, key ) || dataPriv.access( elem, key,

{

empty: jQuery.Callbacks( "once memory" ).add( function() {
dataPriv.remove( elem, [ type + "queue", key ] );
} )
} );
}
} );
jQuery.fn.extend( {
queue: function( type, data ) {
var setter = 2;
if ( typeof type !== "string" ) {
data = type;
type = "fx";
setter--;
}
if ( arguments.length < setter ) {
return jQuery.queue( this[ 0 ], type );
}
return data === undefined ?
this :
this.each( function() {
var queue = jQuery.queue( this, type, data );
// Ensure a hooks for this queue
jQuery._queueHooks( this, type );
if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
jQuery.dequeue( this, type );
}
} );

},
dequeue: function( type ) {
return this.each( function() {
jQuery.dequeue( this, type );
} );
},
clearQueue: function( type ) {
return this.queue( type || "fx", [] );
},
// Get a promise resolved when queues of a certain type
// are emptied (fx is the type by default)
promise: function( type, obj ) {
var tmp,
count = 1,

defer = jQuery.Deferred(),
elements = this,
i = this.length,
resolve = function() {
if ( !( --count ) ) {
defer.resolveWith( elements, [ elements ] );
}
};
if ( typeof type !== "string" ) {
obj = type;
type = undefined;
}
type = type || "fx";
while ( i-- ) {
tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
if ( tmp && tmp.empty ) {
count++;
tmp.empty.add( resolve );
}
}
resolve();
return defer.promise( obj );
}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;
var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
var isHiddenWithinTree = function( elem, el ) {

// isHiddenWithinTree might be called from jQuery#filter function;
// in that case, element will be second argument
elem = el || elem;
// Inline style trumps all
return elem.style.display === "none" ||
elem.style.display === "" &&
// Otherwise, check computed style
// Support: Firefox <=43 - 45
// Disconnected elements can have computed display: none,

so first confirm that elem is
// in the document.

jQuery.contains( elem.ownerDocument, elem ) &&
jQuery.css( elem, "display" ) === "none";

};
var swap = function( elem, options, callback, args ) {
var ret, name,
old = {};
// Remember the old values, and insert the new ones
for ( name in options ) {
old[ name ] = elem.style[ name ];
elem.style[ name ] = options[ name ];
}
ret = callback.apply( elem, args || [] );
// Revert the old values
for ( name in options ) {
elem.style[ name ] = old[ name ];
}
return ret;
};

function adjustCSS( elem, prop, valueParts, tween ) {
var adjusted,
scale = 1,
maxIterations = 20,
currentValue = tween ?
function() {
return tween.cur();
} :
function() {
return jQuery.css( elem, prop, "" );
},
initial = currentValue(),
unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop

] ? "" : "px" ),

// Starting value computation is required for potential unit

mismatches

initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" &&

+initial ) &&

rcssNum.exec( jQuery.css( elem, prop ) );

if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {
// Trust units reported by jQuery.css
unit = unit || initialInUnit[ 3 ];
// Make sure we update the tween properties later on
valueParts = valueParts || [];
// Iteratively approximate from a nonzero starting point
initialInUnit = +initial || 1;
do {
// If previous iteration zeroed out, double until we get

*something*.

// Use string for doubling so we don't accidentally see scale

as unchanged below

scale = scale || ".5";
// Adjust and apply
initialInUnit = initialInUnit / scale;
jQuery.style( elem, prop, initialInUnit + unit );
// Update scale, tolerating zero or NaN from tween.cur()
// Break the loop if scale is unchanged or perfect, or if we've

just had enough.
} while (
scale !== ( scale = currentValue() / initial ) && scale !==

1 && --maxIterations
);
}
if ( valueParts ) {
initialInUnit = +initialInUnit || +initial || 0;
// Apply relative offset (+=/-=) if specified
adjusted = valueParts[ 1 ] ?
initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ]

:

+valueParts[ 2 ];
if ( tween ) {
tween.unit = unit;
tween.start = initialInUnit;
tween.end = adjusted;
}
}
return adjusted;

}

var defaultDisplayMap = {};
function getDefaultDisplay( elem ) {
var temp,
doc = elem.ownerDocument,
nodeName = elem.nodeName,
display = defaultDisplayMap[ nodeName ];
if ( display ) {
return display;
}
temp = doc.body.appendChild( doc.createElement( nodeName ) );
display = jQuery.css( temp, "display" );
temp.parentNode.removeChild( temp );
if ( display === "none" ) {
display = "block";
}
defaultDisplayMap[ nodeName ] = display;
return display;
}
function showHide( elements, show ) {
var display, elem,
values = [],
index = 0,
length = elements.length;
// Determine new display value for elements that need to change
for ( ; index < length; index++ ) {
elem = elements[ index ];
if ( !elem.style ) {
continue;
}
display = elem.style.display;
if ( show ) {
// Since we force visibility upon cascade-hidden elements,

an immediate (and slow)

// check is required in this first loop unless we have a

nonempty display value (either

// inline or about-to-be-restored)
if ( display === "none" ) {
values[ index ] = dataPriv.get( elem, "display" ) ||

null;

if ( !values[ index ] ) {
elem.style.display = "";
}
}
if ( elem.style.display === "" && isHiddenWithinTree( elem

) ) {

values[ index ] = getDefaultDisplay( elem );
}
} else {
if ( display !== "none" ) {
values[ index ] = "none";
// Remember what we're overwriting
dataPriv.set( elem, "display", display );
}
}
}
// Set the display of the elements in a second loop to avoid constant
reflow
for ( index = 0; index < length; index++ ) {
if ( values[ index ] != null ) {
elements[ index ].style.display = values[ index ];
}
}
return elements;
}
jQuery.fn.extend( {
show: function() {
return showHide( this, true );
},
hide: function() {
return showHide( this );
},
toggle: function( state ) {
if ( typeof state === "boolean" ) {
return state ? this.show() : this.hide();
}
return this.each( function() {
if ( isHiddenWithinTree( this ) ) {
jQuery( this ).show();

} else {
jQuery( this ).hide();
}
} );
}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );
var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );
var rscriptType = ( /^$|\/(?:java|ecma)script/i );

// We have to close these tags to support XHTML (#13200)
var wrapMap = {
// Support: IE <=9 only
option: [ 1, "<select multiple='multiple'>", "</select>" ],
// XHTML parsers do not magically insert elements in the
// same way that tag soup parsers do. So we cannot shorten
// this by omitting <tbody> or other required elements.
thead: [ 1, "<table>", "</table>" ],
col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
tr: [ 2, "<table><tbody>", "</tbody></table>" ],
td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
_default: [ 0, "", "" ]
};
// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption =
wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
// Support: IE <=9 - 11 only
// Use typeof to avoid zero-argument method invocation on host objects
(#15151)
var ret;
if ( typeof context.getElementsByTagName !== "undefined" ) {
ret = context.getElementsByTagName( tag || "*" );

} else if ( typeof context.querySelectorAll !== "undefined" ) {
ret = context.querySelectorAll( tag || "*" );
} else {
ret = [];
}
if ( tag === undefined || tag && nodeName( context, tag ) ) {
return jQuery.merge( [ context ], ret );
}
return ret;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
var i = 0,
l = elems.length;
for ( ; i < l; i++ ) {
dataPriv.set(
elems[ i ],
"globalEval",
!refElements || dataPriv.get( refElements[ i ],

"globalEval" )
);
}
}

var rhtml = /<|&#?\w+;/;
function buildFragment( elems, context, scripts, selection, ignored ) {
var elem, tmp, tag, wrap, contains, j,
fragment = context.createDocumentFragment(),
nodes = [],
i = 0,
l = elems.length;
for ( ; i < l; i++ ) {
elem = elems[ i ];
if ( elem || elem === 0 ) {
// Add nodes directly
if ( jQuery.type( elem ) === "object" ) {

// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem

);

// Convert non-html into a text node
} else if ( !rhtml.test( elem ) ) {
nodes.push( context.createTextNode( elem ) );
// Convert html into DOM nodes
} else {
tmp = tmp || fragment.appendChild(

context.createElement( "div" ) );

// Deserialize a standard representation
tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1

].toLowerCase();

wrap = wrapMap[ tag ] || wrapMap._default;
tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem

) + wrap[ 2 ];

// Descend through wrappers to the right content
j = wrap[ 0 ];
while ( j-- ) {
tmp = tmp.lastChild;
}
// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
jQuery.merge( nodes, tmp.childNodes );
// Remember the top-level container
tmp = fragment.firstChild;
// Ensure the created nodes are orphaned (#12392)
tmp.textContent = "";
}
}
}
// Remove wrapper from fragment
fragment.textContent = "";
i = 0;
while ( ( elem = nodes[ i++ ] ) ) {
// Skip elements already in the context collection (trac-4087)

if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
if ( ignored ) {
ignored.push( elem );
}
continue;
}
contains = jQuery.contains( elem.ownerDocument, elem );
// Append to fragment
tmp = getAll( fragment.appendChild( elem ), "script" );
// Preserve script evaluation history
if ( contains ) {
setGlobalEval( tmp );
}
// Capture executables
if ( scripts ) {
j = 0;
while ( ( elem = tmp[ j++ ] ) ) {
if ( rscriptType.test( elem.type || "" ) ) {
scripts.push( elem );
}
}
}
}
return fragment;
}

( function() {
var fragment = document.createDocumentFragment(),
div = fragment.appendChild( document.createElement( "div" ) ),
input = document.createElement( "input" );
// Support: Android 4.0 - 4.3 only
// Check state lost if the name is set (#11217)
// Support: Windows Web Apps (WWA)
// `name` and `type` must use .setAttribute for WWA (#14901)
input.setAttribute( "type", "radio" );
input.setAttribute( "checked", "checked" );
input.setAttribute( "name", "t" );
div.appendChild( input );
// Support: Android <=4.1 only

// Older WebKit doesn't clone checked state correctly in fragments
support.checkClone = div.cloneNode( true ).cloneNode( true
).lastChild.checked;
// Support: IE <=11 only
// Make sure textarea (and checkbox) defaultValue is properly cloned
div.innerHTML = "<textarea>x</textarea>";
support.noCloneChecked = !!div.cloneNode( true
).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;

var
rkeyEvent = /^key/,
rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
function returnTrue() {
return true;
}
function returnFalse() {
return false;
}
// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
try {
return document.ac
