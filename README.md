# Safer JSON

JSON has become the de facto standard for the exchange of data between the Web browser and the backend server. However, there are numerous examples where the processing of JSON (parsing and stringifying) is performed in a non-defensive manner. That is to say, with little to no regard for the potential for such processes to go wrong and throw an exception. The functions contained in the library are intended to be drop-in replacements for the standard calls, with a minor change to the interface, that provide additional protection and reporting.

## When might you want to use these functions?

The safer-JSON functions are not intended to be used as a replacement for the standard JSON methods from the outset. Instead they are probably most useful for established projects where JSON data is being communicated between the client and the server via HTTP request/response or over a Web socket. They might also be useful if structure data is being maintained on the client-side using Web storage.
In new projects it would be more beneficial to establish project-wide guidance on how best to use the JSON methods in a defensive manner, rather than introduce yet another (pointless) external dependency.

## What do the library functions do that makes then "safer"?

A quick check of the MDN documentation of the standard JSON methods will show there are circumstances when the methods can fail and throw an exception. If thrown in the browser an error message might be logged to the console the user is oblivious to, leaving them only to wonder what has gone wrong.

Parsing can easily fail if the supplied text is malformed in some way. The stringify operation can fail through a recursive reference (creating a cyclic process) or by attempting to create a string for an incompatible value, such as a BigInt, method or regular expression. Some of these are niche edge cases for the majority of applications but, if the application could accept user input in JSON format, additional care needs to (and can easily) be taken.

## How do the library functions differ from the standard JSON methods and how do they offer additional protection?

The input parameters for the "safer" functions are identical to the standard methods but the return value is different. Instead of the stringify operation potentially returning a string or throw an exception, the alternative functions always return an object, as described below, likewise, the parse method could return a data value or structure, but could also return nothing and throw an exception. 

The "safer" functions always return an object containing one of two properties, data or error.
The data property will be set to the result of a successful operation, but should an exception be thrown, the returned object will contain an error property with the value being the Error object that was raised.
