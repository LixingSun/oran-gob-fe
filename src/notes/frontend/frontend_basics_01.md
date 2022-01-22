# Frontend Basics - 01 JavaScrpt Types

## Basic Types
- Undefined 
- Null
- Boolean
- String
- Number
- Symbol
- Object

## Special Notes
### Undefinied, Null
- As undefinied is a varaible, its value can be changed by accident. So use void 0 instead would be better.
- Undefined, Null: Type; undefined, null: value
- null compared with undefined: defined but empty.

### String
- Max length 2^53 - 1, UTF 16

### Number
- Special value: NaN, Infnity, -Infinity
- +0, -0
- Non-integer cannot use == to compare 
```javascrpt
<= Number.EPSILON
```
  
### Symbol
- Introduced in ES6
- Non-string object key
- Symbol.iterator

### Object
- key type: String or Symbol
- Object type: Number, String, Boolean, Symbol
```javascript
new Number(3)
```
- Change prototype of object type will apply to primitive type
```javascript
Symbol.prototype.hello = () => console.log("hello")
var a = Symbol("a");
a.hello(); // hello
```

## Type Conversion
### StringToNumber
- StringToNumber supports: DEC, BIN, OCT, HEX, scientific notation
- Normally using Number is better than parseInt and parseFloat

### NumberToString
- Extreme large or small value will use scientific notation

