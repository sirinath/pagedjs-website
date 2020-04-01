(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.PagedPolyfill = factory());
}(this, (function () { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	function getCjsExportFromNamespace (n) {
		return n && n['default'] || n;
	}

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	var interopRequireWildcard = createCommonjsModule(function (module) {
	function _getRequireWildcardCache() {
	  if (typeof WeakMap !== "function") return null;
	  var cache = new WeakMap();

	  _getRequireWildcardCache = function _getRequireWildcardCache() {
	    return cache;
	  };

	  return cache;
	}

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  }

	  if (obj === null || _typeof_1(obj) !== "object" && typeof obj !== "function") {
	    return {
	      "default": obj
	    };
	  }

	  var cache = _getRequireWildcardCache();

	  if (cache && cache.has(obj)) {
	    return cache.get(obj);
	  }

	  var newObj = {};
	  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

	  for (var key in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, key)) {
	      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

	      if (desc && (desc.get || desc.set)) {
	        Object.defineProperty(newObj, key, desc);
	      } else {
	        newObj[key] = obj[key];
	      }
	    }
	  }

	  newObj["default"] = obj;

	  if (cache) {
	    cache.set(obj, newObj);
	  }

	  return newObj;
	}

	module.exports = _interopRequireWildcard;
	});

	unwrapExports(interopRequireWildcard);

	var interopRequireDefault = createCommonjsModule(function (module) {
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	}

	module.exports = _interopRequireDefault;
	});

	unwrapExports(interopRequireDefault);

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator, PromiseImpl) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return PromiseImpl.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return PromiseImpl.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new PromiseImpl(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	    if (PromiseImpl === void 0) PromiseImpl = Promise;

	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList),
	      PromiseImpl
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	   module.exports 
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  Function("r", "regeneratorRuntime = r")(runtime);
	}
	});

	var regenerator = runtime_1;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	var asyncToGenerator = _asyncToGenerator;

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	var arrayLikeToArray = _arrayLikeToArray;

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return arrayLikeToArray(arr);
	}

	var arrayWithoutHoles = _arrayWithoutHoles;

	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
	}

	var iterableToArray = _iterableToArray;

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(n);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
	}

	var unsupportedIterableToArray = _unsupportedIterableToArray;

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	var nonIterableSpread = _nonIterableSpread;

	function _toConsumableArray(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
	}

	var toConsumableArray = _toConsumableArray;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	var isImplemented = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== "function") return false;
		obj = { foo: "raz" };
		assign(obj, { bar: "dwa" }, { trzy: "trzy" });
		return (obj.foo + obj.bar + obj.trzy) === "razdwatrzy";
	};

	var isImplemented$1 = function () {
		try {
			Object.keys("primitive");
			return true;
		} catch (e) {
	 return false;
	}
	};

	// eslint-disable-next-line no-empty-function
	var noop = function () {};

	var _undefined = noop(); // Support ES3 engines

	var isValue = function (val) {
	 return (val !== _undefined) && (val !== null);
	};

	var keys = Object.keys;

	var shim = function (object) {
		return keys(isValue(object) ? Object(object) : object);
	};

	var keys$1 = isImplemented$1()
		? Object.keys
		: shim;

	var validValue = function (value) {
		if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
		return value;
	};

	var max   = Math.max;

	var shim$1 = function (dest, src /*, …srcn*/) {
		var error, i, length = max(arguments.length, 2), assign;
		dest = Object(validValue(dest));
		assign = function (key) {
			try {
				dest[key] = src[key];
			} catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < length; ++i) {
			src = arguments[i];
			keys$1(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};

	var assign = isImplemented()
		? Object.assign
		: shim$1;

	var forEach = Array.prototype.forEach, create = Object.create;

	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};

	// eslint-disable-next-line no-unused-vars
	var normalizeOptions = function (opts1 /*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (!isValue(options)) return;
			process(Object(options), result);
		});
		return result;
	};

	// Deprecated

	var isCallable = function (obj) {
	 return typeof obj === "function";
	};

	var str = "razdwatrzy";

	var isImplemented$2 = function () {
		if (typeof str.contains !== "function") return false;
		return (str.contains("dwa") === true) && (str.contains("foo") === false);
	};

	var indexOf = String.prototype.indexOf;

	var shim$2 = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};

	var contains = isImplemented$2()
		? String.prototype.contains
		: shim$2;

	var d_1 = createCommonjsModule(function (module) {

	var d;

	d = module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if ((arguments.length < 2) || (typeof dscr !== 'string')) {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOptions(options), desc);
	};

	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOptions(options), desc);
	};
	});

	var validCallable = function (fn) {
		if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
		return fn;
	};

	var eventEmitter = createCommonjsModule(function (module, exports) {

	var apply = Function.prototype.apply, call = Function.prototype.call
	  , create = Object.create, defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , descriptor = { configurable: true, enumerable: false, writable: true }

	  , on, once, off, emit, methods, descriptors, base;

	on = function (type, listener) {
		var data;

		validCallable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) {
			data = descriptor.value = create(null);
			defineProperty(this, '__ee__', descriptor);
			descriptor.value = null;
		} else {
			data = this.__ee__;
		}
		if (!data[type]) data[type] = listener;
		else if (typeof data[type] === 'object') data[type].push(listener);
		else data[type] = [data[type], listener];

		return this;
	};

	once = function (type, listener) {
		var once, self;

		validCallable(listener);
		self = this;
		on.call(this, type, once = function () {
			off.call(self, type, once);
			apply.call(listener, this, arguments);
		});

		once.__eeOnceListener__ = listener;
		return this;
	};

	off = function (type, listener) {
		var data, listeners, candidate, i;

		validCallable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) return this;
		data = this.__ee__;
		if (!data[type]) return this;
		listeners = data[type];

		if (typeof listeners === 'object') {
			for (i = 0; (candidate = listeners[i]); ++i) {
				if ((candidate === listener) ||
						(candidate.__eeOnceListener__ === listener)) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
					else listeners.splice(i, 1);
				}
			}
		} else {
			if ((listeners === listener) ||
					(listeners.__eeOnceListener__ === listener)) {
				delete data[type];
			}
		}

		return this;
	};

	emit = function (type) {
		var i, l, listener, listeners, args;

		if (!hasOwnProperty.call(this, '__ee__')) return;
		listeners = this.__ee__[type];
		if (!listeners) return;

		if (typeof listeners === 'object') {
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

			listeners = listeners.slice();
			for (i = 0; (listener = listeners[i]); ++i) {
				apply.call(listener, this, args);
			}
		} else {
			switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
			}
		}
	};

	methods = {
		on: on,
		once: once,
		off: off,
		emit: emit
	};

	descriptors = {
		on: d_1(on),
		once: d_1(once),
		off: d_1(off),
		emit: d_1(emit)
	};

	base = defineProperties({}, descriptors);

	module.exports = exports = function (o) {
		return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;
	});
	var eventEmitter_1 = eventEmitter.methods;

	var hook = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	/**
	 * Hooks allow for injecting functions that must all complete in order before finishing
	 * They will execute in parallel but all must finish before continuing
	 * Functions may return a promise if they are asycn.
	 * From epubjs/src/utils/hooks
	 * @param {any} context scope of this
	 * @example this.content = new Hook(this);
	 */
	var Hook =
	/*#__PURE__*/
	function () {
	  function Hook(context) {
	    (0, _classCallCheck2["default"])(this, Hook);
	    this.context = context || this;
	    this.hooks = [];
	  }
	  /**
	   * Adds a function to be run before a hook completes
	   * @example this.content.register(function(){...});
	   * @return {undefined} void
	   */


	  (0, _createClass2["default"])(Hook, [{
	    key: "register",
	    value: function register() {
	      for (var i = 0; i < arguments.length; ++i) {
	        if (typeof arguments[i] === "function") {
	          this.hooks.push(arguments[i]);
	        } else {
	          // unpack array
	          for (var j = 0; j < arguments[i].length; ++j) {
	            this.hooks.push(arguments[i][j]);
	          }
	        }
	      }
	    }
	    /**
	     * Triggers a hook to run all functions
	     * @example this.content.trigger(args).then(function(){...});
	     * @return {Promise} results
	     */

	  }, {
	    key: "trigger",
	    value: function trigger() {
	      var args = arguments;
	      var context = this.context;
	      var promises = [];
	      this.hooks.forEach(function (task) {
	        var executing = task.apply(context, args);

	        if (executing && typeof executing["then"] === "function") {
	          // Task is a function that returns a promise
	          promises.push(executing);
	        } // Otherwise Task resolves immediately, add resolved promise with result


	        promises.push(new Promise(function (resolve, reject) {
	          resolve(executing);
	        }));
	      });
	      return Promise.all(promises);
	    }
	    /**
	      * Triggers a hook to run all functions synchronously
	      * @example this.content.trigger(args).then(function(){...});
	      * @return {Array} results
	      */

	  }, {
	    key: "triggerSync",
	    value: function triggerSync() {
	      var args = arguments;
	      var context = this.context;
	      var results = [];
	      this.hooks.forEach(function (task) {
	        var executing = task.apply(context, args);
	        results.push(executing);
	      });
	      return results;
	    } // Adds a function to be run before a hook completes

	  }, {
	    key: "list",
	    value: function list() {
	      return this.hooks;
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      return this.hooks = [];
	    }
	  }]);
	  return Hook;
	}();

	var _default = Hook;
	exports["default"] = _default;
	});

	unwrapExports(hook);

	function _AwaitValue(value) {
	  this.wrapped = value;
	}

	var AwaitValue = _AwaitValue;

	function _awaitAsyncGenerator(value) {
	  return new AwaitValue(value);
	}

	var awaitAsyncGenerator = _awaitAsyncGenerator;

	function AsyncGenerator(gen) {
	  var front, back;

	  function send(key, arg) {
	    return new Promise(function (resolve, reject) {
	      var request = {
	        key: key,
	        arg: arg,
	        resolve: resolve,
	        reject: reject,
	        next: null
	      };

	      if (back) {
	        back = back.next = request;
	      } else {
	        front = back = request;
	        resume(key, arg);
	      }
	    });
	  }

	  function resume(key, arg) {
	    try {
	      var result = gen[key](arg);
	      var value = result.value;
	      var wrappedAwait = value instanceof AwaitValue;
	      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
	        if (wrappedAwait) {
	          resume(key === "return" ? "return" : "next", arg);
	          return;
	        }

	        settle(result.done ? "return" : "normal", arg);
	      }, function (err) {
	        resume("throw", err);
	      });
	    } catch (err) {
	      settle("throw", err);
	    }
	  }

	  function settle(type, value) {
	    switch (type) {
	      case "return":
	        front.resolve({
	          value: value,
	          done: true
	        });
	        break;

	      case "throw":
	        front.reject(value);
	        break;

	      default:
	        front.resolve({
	          value: value,
	          done: false
	        });
	        break;
	    }

	    front = front.next;

	    if (front) {
	      resume(front.key, front.arg);
	    } else {
	      back = null;
	    }
	  }

	  this._invoke = send;

	  if (typeof gen["return"] !== "function") {
	    this["return"] = undefined;
	  }
	}

	if (typeof Symbol === "function" && Symbol.asyncIterator) {
	  AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
	    return this;
	  };
	}

	AsyncGenerator.prototype.next = function (arg) {
	  return this._invoke("next", arg);
	};

	AsyncGenerator.prototype["throw"] = function (arg) {
	  return this._invoke("throw", arg);
	};

	AsyncGenerator.prototype["return"] = function (arg) {
	  return this._invoke("return", arg);
	};

	var AsyncGenerator_1 = AsyncGenerator;

	function _wrapAsyncGenerator(fn) {
	  return function () {
	    return new AsyncGenerator_1(fn.apply(this, arguments));
	  };
	}

	var wrapAsyncGenerator = _wrapAsyncGenerator;

	var utils = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getBoundingClientRect = getBoundingClientRect;
	exports.getClientRects = getClientRects;
	exports.UUID = UUID;
	exports.positionInNodeList = positionInNodeList;
	exports.findCssSelector = findCssSelector;
	exports.attr = attr;
	exports.querySelectorEscape = querySelectorEscape;
	exports.defer = defer;
	exports.CSSValueToString = CSSValueToString;
	exports.requestIdleCallback = void 0;

	function getBoundingClientRect(element) {
	  if (!element) {
	    return;
	  }

	  var rect;

	  if (typeof element.getBoundingClientRect !== "undefined") {
	    rect = element.getBoundingClientRect();
	  } else {
	    var range = document.createRange();
	    range.selectNode(element);
	    rect = range.getBoundingClientRect();
	  }

	  return rect;
	}

	function getClientRects(element) {
	  if (!element) {
	    return;
	  }

	  var rect;

	  if (typeof element.getClientRects !== "undefined") {
	    rect = element.getClientRects();
	  } else {
	    var range = document.createRange();
	    range.selectNode(element);
	    rect = range.getClientRects();
	  }

	  return rect;
	}
	/**
	 * Generates a UUID
	 * based on: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
	 * @returns {string} uuid
	 */


	function UUID() {
	  var d = new Date().getTime();

	  if (typeof performance !== "undefined" && typeof performance.now === "function") {
	    d += performance.now(); //use high-precision timer if available
	  }

	  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
	    var r = (d + Math.random() * 16) % 16 | 0;
	    d = Math.floor(d / 16);
	    return (c === "x" ? r : r & 0x3 | 0x8).toString(16);
	  });
	} // From: https://hg.mozilla.org/mozilla-central/file/tip/toolkit/modules/css-selector.js#l52

	/**
	 * Find the position of [element] in [nodeList].
	 * @param {Element} element to check
	 * @param {NodeList} nodeList to find in
	 * @returns {int} an index of the match, or -1 if there is no match
	 */


	function positionInNodeList(element, nodeList) {
	  for (var i = 0; i < nodeList.length; i++) {
	    if (element === nodeList[i]) {
	      return i;
	    }
	  }

	  return -1;
	}
	/**
	 * Find a unique CSS selector for a given element
	 * @param {Element} ele to check
	 * @returns {string} a string such that ele.ownerDocument.querySelector(reply) === ele
	 * and ele.ownerDocument.querySelectorAll(reply).length === 1
	 */


	function findCssSelector(ele) {
	  var document = ele.ownerDocument; // Fred: commented out to allow for parsing in fragments
	  // if (!document || !document.contains(ele)) {
	  //   throw new Error("findCssSelector received element not inside document");
	  // }

	  var cssEscape = window.CSS.escape; // document.querySelectorAll("#id") returns multiple if elements share an ID

	  if (ele.id && document.querySelectorAll("#" + cssEscape(ele.id)).length === 1) {
	    return "#" + cssEscape(ele.id);
	  } // Inherently unique by tag name


	  var tagName = ele.localName;

	  if (tagName === "html") {
	    return "html";
	  }

	  if (tagName === "head") {
	    return "head";
	  }

	  if (tagName === "body") {
	    return "body";
	  } // We might be able to find a unique class name


	  var selector, index, matches;

	  if (ele.classList.length > 0) {
	    for (var i = 0; i < ele.classList.length; i++) {
	      // Is this className unique by itself?
	      selector = "." + cssEscape(ele.classList.item(i));
	      matches = document.querySelectorAll(selector);

	      if (matches.length === 1) {
	        return selector;
	      } // Maybe it's unique with a tag name?


	      selector = cssEscape(tagName) + selector;
	      matches = document.querySelectorAll(selector);

	      if (matches.length === 1) {
	        return selector;
	      } // Maybe it's unique using a tag name and nth-child


	      index = positionInNodeList(ele, ele.parentNode.children) + 1;
	      selector = selector + ":nth-child(" + index + ")";
	      matches = document.querySelectorAll(selector);

	      if (matches.length === 1) {
	        return selector;
	      }
	    }
	  } // Not unique enough yet.  As long as it's not a child of the document,
	  // continue recursing up until it is unique enough.


	  if (ele.parentNode !== document && ele.parentNode.nodeType === 1) {
	    index = positionInNodeList(ele, ele.parentNode.children) + 1;
	    selector = findCssSelector(ele.parentNode) + " > " + cssEscape(tagName) + ":nth-child(" + index + ")";
	  }

	  return selector;
	}

	function attr(element, attributes) {
	  for (var i = 0; i < attributes.length; i++) {
	    if (element.hasAttribute(attributes[i])) {
	      return element.getAttribute(attributes[i]);
	    }
	  }
	}
	/* Based on by https://mths.be/cssescape v1.5.1 by @mathias | MIT license
	 * Allows # and .
	 */


	function querySelectorEscape(value) {
	  if (arguments.length == 0) {
	    throw new TypeError("`CSS.escape` requires an argument.");
	  }

	  var string = String(value);
	  var length = string.length;
	  var index = -1;
	  var codeUnit;
	  var result = "";
	  var firstCodeUnit = string.charCodeAt(0);

	  while (++index < length) {
	    codeUnit = string.charCodeAt(index); // Note: there’s no need to special-case astral symbols, surrogate
	    // pairs, or lone surrogates.
	    // If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
	    // (U+FFFD).

	    if (codeUnit == 0x0000) {
	      result += "\uFFFD";
	      continue;
	    }

	    if ( // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
	    // U+007F, […]
	    codeUnit >= 0x0001 && codeUnit <= 0x001F || codeUnit == 0x007F || // If the character is the first character and is in the range [0-9]
	    // (U+0030 to U+0039), […]
	    index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039 || // If the character is the second character and is in the range [0-9]
	    // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
	    index == 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit == 0x002D) {
	      // https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
	      result += "\\" + codeUnit.toString(16) + " ";
	      continue;
	    }

	    if ( // If the character is the first character and is a `-` (U+002D), and
	    // there is no second character, […]
	    index == 0 && length == 1 && codeUnit == 0x002D) {
	      result += "\\" + string.charAt(index);
	      continue;
	    } // If the character is not handled by one of the above rules and is
	    // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
	    // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
	    // U+005A), or [a-z] (U+0061 to U+007A), […]


	    if (codeUnit >= 0x0080 || codeUnit == 0x002D || codeUnit == 0x005F || codeUnit == 35 || // Allow #
	    codeUnit == 46 || // Allow .
	    codeUnit >= 0x0030 && codeUnit <= 0x0039 || codeUnit >= 0x0041 && codeUnit <= 0x005A || codeUnit >= 0x0061 && codeUnit <= 0x007A) {
	      // the character itself
	      result += string.charAt(index);
	      continue;
	    } // Otherwise, the escaped character.
	    // https://drafts.csswg.org/cssom/#escape-a-character


	    result += "\\" + string.charAt(index);
	  }

	  return result;
	}
	/**
	 * Creates a new pending promise and provides methods to resolve or reject it.
	 * From: https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred#backwards_forwards_compatible
	 * @returns {object} defered
	 */


	function defer() {
	  var _this = this;

	  this.resolve = null;
	  this.reject = null;
	  this.id = UUID();
	  this.promise = new Promise(function (resolve, reject) {
	    _this.resolve = resolve;
	    _this.reject = reject;
	  });
	  Object.freeze(this);
	}

	var requestIdleCallback = typeof window !== "undefined" && ("requestIdleCallback" in window ? window.requestIdleCallback : window.requestAnimationFrame);
	exports.requestIdleCallback = requestIdleCallback;

	function CSSValueToString(obj) {
	  return obj.value + (obj.unit || "");
	}
	});

	unwrapExports(utils);
	var utils_1 = utils.getBoundingClientRect;
	var utils_2 = utils.getClientRects;
	var utils_3 = utils.UUID;
	var utils_4 = utils.positionInNodeList;
	var utils_5 = utils.findCssSelector;
	var utils_6 = utils.attr;
	var utils_7 = utils.querySelectorEscape;
	var utils_8 = utils.defer;
	var utils_9 = utils.CSSValueToString;
	var utils_10 = utils.requestIdleCallback;

	var dom = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isElement = isElement;
	exports.isText = isText;
	exports.walk = walk;
	exports.nodeAfter = nodeAfter;
	exports.nodeBefore = nodeBefore;
	exports.elementAfter = elementAfter;
	exports.elementBefore = elementBefore;
	exports.stackChildren = stackChildren;
	exports.rebuildAncestors = rebuildAncestors;
	exports.needsBreakBefore = needsBreakBefore;
	exports.needsBreakAfter = needsBreakAfter;
	exports.needsPreviousBreakAfter = needsPreviousBreakAfter;
	exports.needsPageBreak = needsPageBreak;
	exports.words = words;
	exports.letters = letters;
	exports.isContainer = isContainer;
	exports.cloneNode = cloneNode;
	exports.findElement = findElement;
	exports.findRef = findRef;
	exports.validNode = validNode;
	exports.prevValidNode = prevValidNode;
	exports.nextValidNode = nextValidNode;
	exports.indexOf = indexOf;
	exports.child = child;
	exports.isVisible = isVisible;
	exports.hasContent = hasContent;
	exports.hasTextContent = hasTextContent;
	exports.indexOfTextNode = indexOfTextNode;

	var _regenerator = interopRequireDefault(regenerator);

	var _marked =
	/*#__PURE__*/
	_regenerator["default"].mark(walk),
	    _marked2 =
	/*#__PURE__*/
	_regenerator["default"].mark(words),
	    _marked3 =
	/*#__PURE__*/
	_regenerator["default"].mark(letters);

	function isElement(node) {
	  return node && node.nodeType === 1;
	}

	function isText(node) {
	  return node && node.nodeType === 3;
	}

	function walk(start, limiter) {
	  var node;
	  return _regenerator["default"].wrap(function walk$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          node = start;

	        case 1:
	          if (!node) {
	            _context.next = 27;
	            break;
	          }

	          _context.next = 4;
	          return node;

	        case 4:
	          if (!node.childNodes.length) {
	            _context.next = 8;
	            break;
	          }

	          node = node.firstChild;
	          _context.next = 25;
	          break;

	        case 8:
	          if (!node.nextSibling) {
	            _context.next = 15;
	            break;
	          }

	          if (!(limiter && node === limiter)) {
	            _context.next = 12;
	            break;
	          }

	          node = undefined;
	          return _context.abrupt("break", 27);

	        case 12:
	          node = node.nextSibling;
	          _context.next = 25;
	          break;

	        case 15:
	          if (!node) {
	            _context.next = 25;
	            break;
	          }

	          node = node.parentNode;

	          if (!(limiter && node === limiter)) {
	            _context.next = 20;
	            break;
	          }

	          node = undefined;
	          return _context.abrupt("break", 25);

	        case 20:
	          if (!(node && node.nextSibling)) {
	            _context.next = 23;
	            break;
	          }

	          node = node.nextSibling;
	          return _context.abrupt("break", 25);

	        case 23:
	          _context.next = 15;
	          break;

	        case 25:
	          _context.next = 1;
	          break;

	        case 27:
	        case "end":
	          return _context.stop();
	      }
	    }
	  }, _marked);
	}

	function nodeAfter(node, limiter) {
	  var after = node;

	  if (after.nextSibling) {
	    if (limiter && node === limiter) {
	      return;
	    }

	    after = after.nextSibling;
	  } else {
	    while (after) {
	      after = after.parentNode;

	      if (limiter && after === limiter) {
	        after = undefined;
	        break;
	      }

	      if (after && after.nextSibling) {
	        after = after.nextSibling;
	        break;
	      }
	    }
	  }

	  return after;
	}

	function nodeBefore(node, limiter) {
	  var before = node;

	  if (before.previousSibling) {
	    if (limiter && node === limiter) {
	      return;
	    }

	    before = before.previousSibling;
	  } else {
	    while (before) {
	      before = before.parentNode;

	      if (limiter && before === limiter) {
	        before = undefined;
	        break;
	      }

	      if (before && before.previousSibling) {
	        before = before.previousSibling;
	        break;
	      }
	    }
	  }

	  return before;
	}

	function elementAfter(node, limiter) {
	  var after = nodeAfter(node);

	  while (after && after.nodeType !== 1) {
	    after = nodeAfter(after);
	  }

	  return after;
	}

	function elementBefore(node, limiter) {
	  var before = nodeAfter(node);

	  while (before && before.nodeType !== 1) {
	    before = nodeAfter(before);
	  }

	  return before;
	}

	function stackChildren(currentNode, stacked) {
	  var stack = stacked || [];
	  stack.unshift(currentNode);
	  var children = currentNode.children;

	  for (var i = 0, length = children.length; i < length; i++) {
	    stackChildren(children[i], stack);
	  }

	  return stack;
	}

	function rebuildAncestors(node) {
	  var parent, ancestor;
	  var ancestors = [];
	  var added = [];
	  var fragment = document.createDocumentFragment(); // Gather all ancestors

	  var element = node;

	  while (element.parentNode && element.parentNode.nodeType === 1) {
	    ancestors.unshift(element.parentNode);
	    element = element.parentNode;
	  }

	  for (var i = 0; i < ancestors.length; i++) {
	    ancestor = ancestors[i];
	    parent = ancestor.cloneNode(false);
	    parent.setAttribute("data-split-from", parent.getAttribute("data-ref")); // ancestor.setAttribute("data-split-to", parent.getAttribute("data-ref"));

	    if (parent.hasAttribute("id")) {
	      var dataID = parent.getAttribute("id");
	      parent.setAttribute("data-id", dataID);
	      parent.removeAttribute("id");
	    } // This is handled by css :not, but also tidied up here


	    if (parent.hasAttribute("data-break-before")) {
	      parent.removeAttribute("data-break-before");
	    }

	    if (parent.hasAttribute("data-previous-break-after")) {
	      parent.removeAttribute("data-previous-break-after");
	    }

	    if (added.length) {
	      var container = added[added.length - 1];
	      container.appendChild(parent);
	    } else {
	      fragment.appendChild(parent);
	    }

	    added.push(parent);
	  }

	  added = undefined;
	  return fragment;
	}
	/*
	export function split(bound, cutElement, breakAfter) {
			let needsRemoval = [];
			let index = indexOf(cutElement);

			if (!breakAfter && index === 0) {
				return;
			}

			if (breakAfter && index === (cutElement.parentNode.children.length - 1)) {
				return;
			}

			// Create a fragment with rebuilt ancestors
			let fragment = rebuildAncestors(cutElement);

			// Clone cut
			if (!breakAfter) {
				let clone = cutElement.cloneNode(true);
				let ref = cutElement.parentNode.getAttribute('data-ref');
				let parent = fragment.querySelector("[data-ref='" + ref + "']");
				parent.appendChild(clone);
				needsRemoval.push(cutElement);
			}

			// Remove all after cut
			let next = nodeAfter(cutElement, bound);
			while (next) {
				let clone = next.cloneNode(true);
				let ref = next.parentNode.getAttribute('data-ref');
				let parent = fragment.querySelector("[data-ref='" + ref + "']");
				parent.appendChild(clone);
				needsRemoval.push(next);
				next = nodeAfter(next, bound);
			}

			// Remove originals
			needsRemoval.forEach((node) => {
				if (node) {
					node.remove();
				}
			});

			// Insert after bounds
			bound.parentNode.insertBefore(fragment, bound.nextSibling);
			return [bound, bound.nextSibling];
	}
	*/


	function needsBreakBefore(node) {
	  if (typeof node !== "undefined" && typeof node.dataset !== "undefined" && typeof node.dataset.breakBefore !== "undefined" && (node.dataset.breakBefore === "always" || node.dataset.breakBefore === "page" || node.dataset.breakBefore === "left" || node.dataset.breakBefore === "right" || node.dataset.breakBefore === "recto" || node.dataset.breakBefore === "verso")) {
	    return true;
	  }

	  return false;
	}

	function needsBreakAfter(node) {
	  if (typeof node !== "undefined" && typeof node.dataset !== "undefined" && typeof node.dataset.breakAfter !== "undefined" && (node.dataset.breakAfter === "always" || node.dataset.breakAfter === "page" || node.dataset.breakAfter === "left" || node.dataset.breakAfter === "right" || node.dataset.breakAfter === "recto" || node.dataset.breakAfter === "verso")) {
	    return true;
	  }

	  return false;
	}

	function needsPreviousBreakAfter(node) {
	  if (typeof node !== "undefined" && typeof node.dataset !== "undefined" && typeof node.dataset.previousBreakAfter !== "undefined" && (node.dataset.previousBreakAfter === "always" || node.dataset.previousBreakAfter === "page" || node.dataset.previousBreakAfter === "left" || node.dataset.previousBreakAfter === "right" || node.dataset.previousBreakAfter === "recto" || node.dataset.previousBreakAfter === "verso")) {
	    return true;
	  }

	  return false;
	}

	function needsPageBreak(node) {
	  if (typeof node !== "undefined" && typeof node.dataset !== "undefined" && (node.dataset.page || node.dataset.afterPage)) {
	    return true;
	  }

	  return false;
	}

	function words(node) {
	  var currentText, max, currentOffset, currentLetter, range;
	  return _regenerator["default"].wrap(function words$(_context2) {
	    while (1) {
	      switch (_context2.prev = _context2.next) {
	        case 0:
	          currentText = node.nodeValue;
	          max = currentText.length;
	          currentOffset = 0;

	        case 3:
	          if (!(currentOffset < max)) {
	            _context2.next = 17;
	            break;
	          }

	          currentLetter = currentText[currentOffset];

	          if (!/^[\S\u202F\u00A0]$/.test(currentLetter)) {
	            _context2.next = 9;
	            break;
	          }

	          if (!range) {
	            range = document.createRange();
	            range.setStart(node, currentOffset);
	          }

	          _context2.next = 14;
	          break;

	        case 9:
	          if (!range) {
	            _context2.next = 14;
	            break;
	          }

	          range.setEnd(node, currentOffset);
	          _context2.next = 13;
	          return range;

	        case 13:
	          range = undefined;

	        case 14:
	          currentOffset += 1;
	          _context2.next = 3;
	          break;

	        case 17:
	          if (!range) {
	            _context2.next = 22;
	            break;
	          }

	          range.setEnd(node, currentOffset);
	          _context2.next = 21;
	          return range;

	        case 21:
	          range = undefined;

	        case 22:
	        case "end":
	          return _context2.stop();
	      }
	    }
	  }, _marked2);
	}

	function letters(wordRange) {
	  var currentText, max, currentOffset, range;
	  return _regenerator["default"].wrap(function letters$(_context3) {
	    while (1) {
	      switch (_context3.prev = _context3.next) {
	        case 0:
	          currentText = wordRange.startContainer;
	          max = currentText.length;
	          currentOffset = wordRange.startOffset; // let currentLetter;

	        case 3:
	          if (!(currentOffset < max)) {
	            _context3.next = 12;
	            break;
	          }

	          // currentLetter = currentText[currentOffset];
	          range = document.createRange();
	          range.setStart(currentText, currentOffset);
	          range.setEnd(currentText, currentOffset + 1);
	          _context3.next = 9;
	          return range;

	        case 9:
	          currentOffset += 1;
	          _context3.next = 3;
	          break;

	        case 12:
	        case "end":
	          return _context3.stop();
	      }
	    }
	  }, _marked3);
	}

	function isContainer(node) {
	  var container;

	  if (typeof node.tagName === "undefined") {
	    return true;
	  }

	  if (node.style.display === "none") {
	    return false;
	  }

	  switch (node.tagName) {
	    // Inline
	    case "A":
	    case "ABBR":
	    case "ACRONYM":
	    case "B":
	    case "BDO":
	    case "BIG":
	    case "BR":
	    case "BUTTON":
	    case "CITE":
	    case "CODE":
	    case "DFN":
	    case "EM":
	    case "I":
	    case "IMG":
	    case "INPUT":
	    case "KBD":
	    case "LABEL":
	    case "MAP":
	    case "OBJECT":
	    case "Q":
	    case "SAMP":
	    case "SCRIPT":
	    case "SELECT":
	    case "SMALL":
	    case "SPAN":
	    case "STRONG":
	    case "SUB":
	    case "SUP":
	    case "TEXTAREA":
	    case "TIME":
	    case "TT":
	    case "VAR":
	    case "P":
	    case "H1":
	    case "H2":
	    case "H3":
	    case "H4":
	    case "H5":
	    case "H6":
	    case "FIGCAPTION":
	    case "BLOCKQUOTE":
	    case "PRE":
	    case "LI":
	    case "TR":
	    case "DT":
	    case "DD":
	    case "VIDEO":
	    case "CANVAS":
	      container = false;
	      break;

	    default:
	      container = true;
	  }

	  return container;
	}

	function cloneNode(n) {
	  var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	  return n.cloneNode(deep);
	}

	function findElement(node, doc) {
	  var ref = node.getAttribute("data-ref");
	  return findRef(ref, doc);
	}

	function findRef(ref, doc) {
	  return doc.querySelector("[data-ref='".concat(ref, "']"));
	}

	function validNode(node) {
	  if (isText(node)) {
	    return true;
	  }

	  if (isElement(node) && node.dataset.ref) {
	    return true;
	  }

	  return false;
	}

	function prevValidNode(node) {
	  while (!validNode(node)) {
	    if (node.previousSibling) {
	      node = node.previousSibling;
	    } else {
	      node = node.parentNode;
	    }

	    if (!node) {
	      break;
	    }
	  }

	  return node;
	}

	function nextValidNode(node) {
	  while (!validNode(node)) {
	    if (node.nextSibling) {
	      node = node.nextSibling;
	    } else {
	      node = node.parentNode.nextSibling;
	    }

	    if (!node) {
	      break;
	    }
	  }

	  return node;
	}

	function indexOf(node) {
	  var parent = node.parentNode;

	  if (!parent) {
	    return 0;
	  }

	  return Array.prototype.indexOf.call(parent.childNodes, node);
	}

	function child(node, index) {
	  return node.childNodes[index];
	}

	function isVisible(node) {
	  if (isElement(node) && window.getComputedStyle(node).display !== "none") {
	    return true;
	  } else if (isText(node) && hasTextContent(node) && window.getComputedStyle(node.parentNode).display !== "none") {
	    return true;
	  }

	  return false;
	}

	function hasContent(node) {
	  if (isElement(node)) {
	    return true;
	  } else if (isText(node) && node.textContent.trim().length) {
	    return true;
	  }

	  return false;
	}

	function hasTextContent(node) {
	  if (isElement(node)) {
	    var _child;

	    for (var i = 0; i < node.childNodes.length; i++) {
	      _child = node.childNodes[i];

	      if (_child && isText(_child) && _child.textContent.trim().length) {
	        return true;
	      }
	    }
	  } else if (isText(node) && node.textContent.trim().length) {
	    return true;
	  }

	  return false;
	}

	function indexOfTextNode(node, parent) {
	  if (!isText(node)) {
	    return -1;
	  }

	  var nodeTextContent = node.textContent;
	  var child;
	  var index = -1;

	  for (var i = 0; i < parent.childNodes.length; i++) {
	    child = parent.childNodes[i];

	    if (child.nodeType === 3) {
	      var text = parent.childNodes[i].textContent;

	      if (text.includes(nodeTextContent)) {
	        index = i;
	        break;
	      }
	    }
	  }

	  return index;
	}
	});

	unwrapExports(dom);
	var dom_1 = dom.isElement;
	var dom_2 = dom.isText;
	var dom_3 = dom.walk;
	var dom_4 = dom.nodeAfter;
	var dom_5 = dom.nodeBefore;
	var dom_6 = dom.elementAfter;
	var dom_7 = dom.elementBefore;
	var dom_8 = dom.stackChildren;
	var dom_9 = dom.rebuildAncestors;
	var dom_10 = dom.needsBreakBefore;
	var dom_11 = dom.needsBreakAfter;
	var dom_12 = dom.needsPreviousBreakAfter;
	var dom_13 = dom.needsPageBreak;
	var dom_14 = dom.words;
	var dom_15 = dom.letters;
	var dom_16 = dom.isContainer;
	var dom_17 = dom.cloneNode;
	var dom_18 = dom.findElement;
	var dom_19 = dom.findRef;
	var dom_20 = dom.validNode;
	var dom_21 = dom.prevValidNode;
	var dom_22 = dom.nextValidNode;
	var dom_23 = dom.indexOf;
	var dom_24 = dom.child;
	var dom_25 = dom.isVisible;
	var dom_26 = dom.hasContent;
	var dom_27 = dom.hasTextContent;
	var dom_28 = dom.indexOfTextNode;

	var layout = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _regenerator = interopRequireDefault(regenerator);

	var _asyncToGenerator2 = interopRequireDefault(asyncToGenerator);

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);





	var _eventEmitter = interopRequireDefault(eventEmitter);

	var _hook = interopRequireDefault(hook);

	var MAX_CHARS_PER_BREAK = 1500;
	/**
	 * Layout
	 * @class
	 */

	var Layout =
	/*#__PURE__*/
	function () {
	  function Layout(element, hooks, options) {
	    (0, _classCallCheck2["default"])(this, Layout);
	    this.element = element;
	    this.bounds = this.element.getBoundingClientRect();

	    if (hooks) {
	      this.hooks = hooks;
	    } else {
	      this.hooks = {};
	      this.hooks.layout = new _hook["default"]();
	      this.hooks.renderNode = new _hook["default"]();
	      this.hooks.layoutNode = new _hook["default"]();
	      this.hooks.beforeOverflow = new _hook["default"]();
	      this.hooks.onOverflow = new _hook["default"]();
	      this.hooks.onBreakToken = new _hook["default"]();
	    }

	    this.settings = options || {};
	    this.maxChars = this.settings.maxChars || MAX_CHARS_PER_BREAK;
	  }

	  (0, _createClass2["default"])(Layout, [{
	    key: "renderTo",
	    value: function () {
	      var _renderTo = (0, _asyncToGenerator2["default"])(
	      /*#__PURE__*/
	      _regenerator["default"].mark(function _callee(wrapper, source, breakToken) {
	        var bounds,
	            start,
	            walker,
	            node,
	            done,
	            next,
	            hasRenderedContent,
	            newBreakToken,
	            length,
	            imgs,
	            _imgs,
	            shallow,
	            rendered,
	            _imgs2,
	            _args = arguments;

	        return _regenerator["default"].wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                bounds = _args.length > 3 && _args[3] !== undefined ? _args[3] : this.bounds;
	                start = this.getStart(source, breakToken);
	                walker = (0, dom.walk)(start, source);
	                hasRenderedContent = false;
	                length = 0;

	              case 5:
	                if (!(!done && !newBreakToken)) {
	                  _context.next = 43;
	                  break;
	                }

	                next = walker.next();
	                node = next.value;
	                done = next.done;

	                if (node) {
	                  _context.next = 17;
	                  break;
	                }

	                this.hooks && this.hooks.layout.trigger(wrapper, this);
	                imgs = wrapper.querySelectorAll("img");

	                if (!imgs.length) {
	                  _context.next = 15;
	                  break;
	                }

	                _context.next = 15;
	                return this.waitForImages(imgs);

	              case 15:
	                newBreakToken = this.findBreakToken(wrapper, source, bounds);
	                return _context.abrupt("return", newBreakToken);

	              case 17:
	                this.hooks && this.hooks.layoutNode.trigger(node); // Check if the rendered element has a break set

	                if (!(hasRenderedContent && this.shouldBreak(node))) {
	                  _context.next = 28;
	                  break;
	                }

	                this.hooks && this.hooks.layout.trigger(wrapper, this);
	                _imgs = wrapper.querySelectorAll("img");

	                if (!_imgs.length) {
	                  _context.next = 24;
	                  break;
	                }

	                _context.next = 24;
	                return this.waitForImages(_imgs);

	              case 24:
	                newBreakToken = this.findBreakToken(wrapper, source, bounds);

	                if (!newBreakToken) {
	                  newBreakToken = this.breakAt(node);
	                }

	                length = 0;
	                return _context.abrupt("break", 43);

	              case 28:
	                // Should the Node be a shallow or deep clone
	                shallow = (0, dom.isContainer)(node);
	                rendered = this.append(node, wrapper, breakToken, shallow);
	                length += rendered.textContent.length; // Check if layout has content yet

	                if (!hasRenderedContent) {
	                  hasRenderedContent = (0, dom.hasContent)(node);
	                } // Skip to the next node if a deep clone was rendered


	                if (!shallow) {
	                  walker = (0, dom.walk)((0, dom.nodeAfter)(node, source), source);
	                } // Only check x characters


	                if (!(length >= this.maxChars)) {
	                  _context.next = 41;
	                  break;
	                }

	                this.hooks && this.hooks.layout.trigger(wrapper, this);
	                _imgs2 = wrapper.querySelectorAll("img");

	                if (!_imgs2.length) {
	                  _context.next = 39;
	                  break;
	                }

	                _context.next = 39;
	                return this.waitForImages(_imgs2);

	              case 39:
	                newBreakToken = this.findBreakToken(wrapper, source, bounds);

	                if (newBreakToken) {
	                  length = 0;
	                }

	              case 41:
	                _context.next = 5;
	                break;

	              case 43:
	                return _context.abrupt("return", newBreakToken);

	              case 44:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function renderTo(_x, _x2, _x3) {
	        return _renderTo.apply(this, arguments);
	      }

	      return renderTo;
	    }()
	  }, {
	    key: "breakAt",
	    value: function breakAt(node) {
	      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      return {
	        node: node,
	        offset: offset
	      };
	    }
	  }, {
	    key: "shouldBreak",
	    value: function shouldBreak(node) {
	      var previousSibling = node.previousSibling;
	      var parentNode = node.parentNode;
	      var parentBreakBefore = (0, dom.needsBreakBefore)(node) && parentNode && !previousSibling && (0, dom.needsBreakBefore)(parentNode);
	      var doubleBreakBefore;

	      if (parentBreakBefore) {
	        doubleBreakBefore = node.dataset.breakBefore === parentNode.dataset.breakBefore;
	      }

	      return !doubleBreakBefore && (0, dom.needsBreakBefore)(node) || (0, dom.needsPreviousBreakAfter)(node) || (0, dom.needsPageBreak)(node);
	    }
	  }, {
	    key: "getStart",
	    value: function getStart(source, breakToken) {
	      var start;
	      var node = breakToken && breakToken.node;

	      if (node) {
	        start = node;
	      } else {
	        start = source.firstChild;
	      }

	      return start;
	    }
	  }, {
	    key: "append",
	    value: function append(node, dest, breakToken) {
	      var shallow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	      var rebuild = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
	      var clone = (0, dom.cloneNode)(node, !shallow);

	      if (node.parentNode && (0, dom.isElement)(node.parentNode)) {
	        var parent = (0, dom.findElement)(node.parentNode, dest); // Rebuild chain

	        if (parent) {
	          parent.appendChild(clone);
	        } else if (rebuild) {
	          var fragment = (0, dom.rebuildAncestors)(node);
	          parent = (0, dom.findElement)(node.parentNode, fragment);

	          if (!parent) {
	            dest.appendChild(clone);
	          } else if (breakToken && (0, dom.isText)(breakToken.node) && breakToken.offset > 0) {
	            clone.textContent = clone.textContent.substring(breakToken.offset);
	            parent.appendChild(clone);
	          } else {
	            parent.appendChild(clone);
	          }

	          dest.appendChild(fragment);
	        } else {
	          dest.appendChild(clone);
	        }
	      } else {
	        dest.appendChild(clone);
	      }

	      var nodeHooks = this.hooks.renderNode.triggerSync(clone, node);
	      nodeHooks.forEach(function (newNode) {
	        if (typeof newNode != "undefined") {
	          clone = newNode;
	        }
	      });
	      return clone;
	    }
	  }, {
	    key: "waitForImages",
	    value: function () {
	      var _waitForImages = (0, _asyncToGenerator2["default"])(
	      /*#__PURE__*/
	      _regenerator["default"].mark(function _callee3(imgs) {
	        var _this = this;

	        var results;
	        return _regenerator["default"].wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                results = Array.from(imgs).map(
	                /*#__PURE__*/
	                function () {
	                  var _ref = (0, _asyncToGenerator2["default"])(
	                  /*#__PURE__*/
	                  _regenerator["default"].mark(function _callee2(img) {
	                    return _regenerator["default"].wrap(function _callee2$(_context2) {
	                      while (1) {
	                        switch (_context2.prev = _context2.next) {
	                          case 0:
	                            return _context2.abrupt("return", _this.awaitImageLoaded(img));

	                          case 1:
	                          case "end":
	                            return _context2.stop();
	                        }
	                      }
	                    }, _callee2);
	                  }));

	                  return function (_x5) {
	                    return _ref.apply(this, arguments);
	                  };
	                }());
	                _context3.next = 3;
	                return Promise.all(results);

	              case 3:
	              case "end":
	                return _context3.stop();
	            }
	          }
	        }, _callee3);
	      }));

	      function waitForImages(_x4) {
	        return _waitForImages.apply(this, arguments);
	      }

	      return waitForImages;
	    }()
	  }, {
	    key: "awaitImageLoaded",
	    value: function () {
	      var _awaitImageLoaded = (0, _asyncToGenerator2["default"])(
	      /*#__PURE__*/
	      _regenerator["default"].mark(function _callee4(image) {
	        return _regenerator["default"].wrap(function _callee4$(_context4) {
	          while (1) {
	            switch (_context4.prev = _context4.next) {
	              case 0:
	                return _context4.abrupt("return", new Promise(function (resolve) {
	                  if (image.complete !== true) {
	                    image.onload = function () {
	                      var _window$getComputedSt = window.getComputedStyle(image),
	                          width = _window$getComputedSt.width,
	                          height = _window$getComputedSt.height;

	                      resolve(width, height);
	                    };

	                    image.onerror = function (e) {
	                      var _window$getComputedSt2 = window.getComputedStyle(image),
	                          width = _window$getComputedSt2.width,
	                          height = _window$getComputedSt2.height;

	                      resolve(width, height, e);
	                    };
	                  } else {
	                    var _window$getComputedSt3 = window.getComputedStyle(image),
	                        width = _window$getComputedSt3.width,
	                        height = _window$getComputedSt3.height;

	                    resolve(width, height);
	                  }
	                }));

	              case 1:
	              case "end":
	                return _context4.stop();
	            }
	          }
	        }, _callee4);
	      }));

	      function awaitImageLoaded(_x6) {
	        return _awaitImageLoaded.apply(this, arguments);
	      }

	      return awaitImageLoaded;
	    }()
	  }, {
	    key: "avoidBreakInside",
	    value: function avoidBreakInside(node, limiter) {
	      var breakNode;

	      if (node === limiter) {
	        return;
	      }

	      while (node.parentNode) {
	        node = node.parentNode;

	        if (node === limiter) {
	          break;
	        }

	        if (window.getComputedStyle(node)["break-inside"] === "avoid") {
	          breakNode = node;
	          break;
	        }
	      }

	      return breakNode;
	    }
	  }, {
	    key: "createBreakToken",
	    value: function createBreakToken(overflow, rendered, source) {
	      var container = overflow.startContainer;
	      var offset = overflow.startOffset;
	      var node, renderedNode, parent, index, temp;

	      if ((0, dom.isElement)(container)) {
	        temp = (0, dom.child)(container, offset);

	        if ((0, dom.isElement)(temp)) {
	          renderedNode = (0, dom.findElement)(temp, rendered);

	          if (!renderedNode) {
	            // Find closest element with data-ref
	            renderedNode = (0, dom.findElement)((0, dom.prevValidNode)(temp), rendered);
	            return;
	          }

	          node = (0, dom.findElement)(renderedNode, source);
	          offset = 0;
	        } else {
	          renderedNode = (0, dom.findElement)(container, rendered);

	          if (!renderedNode) {
	            renderedNode = (0, dom.findElement)((0, dom.prevValidNode)(container), rendered);
	          }

	          parent = (0, dom.findElement)(renderedNode, source);
	          index = (0, dom.indexOfTextNode)(temp, parent);
	          node = (0, dom.child)(parent, index);
	          offset = 0;
	        }
	      } else {
	        renderedNode = (0, dom.findElement)(container.parentNode, rendered);

	        if (!renderedNode) {
	          renderedNode = (0, dom.findElement)((0, dom.prevValidNode)(container.parentNode), rendered);
	        }

	        parent = (0, dom.findElement)(renderedNode, source);
	        index = (0, dom.indexOfTextNode)(container, parent);

	        if (index === -1) {
	          return;
	        }

	        node = (0, dom.child)(parent, index);
	        offset += node.textContent.indexOf(container.textContent);
	      }

	      if (!node) {
	        return;
	      }

	      return {
	        node: node,
	        offset: offset
	      };
	    }
	  }, {
	    key: "findBreakToken",
	    value: function findBreakToken(rendered, source) {
	      var bounds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bounds;
	      var extract = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	      var overflow = this.findOverflow(rendered, bounds);
	      var breakToken, breakLetter;
	      var overflowHooks = this.hooks.onOverflow.triggerSync(overflow, rendered, bounds, this);
	      overflowHooks.forEach(function (newOverflow) {
	        if (typeof newOverflow != "undefined") {
	          overflow = newOverflow;
	        }
	      });

	      if (overflow) {
	        breakToken = this.createBreakToken(overflow, rendered, source);

	        if (breakToken["node"] && breakToken["offset"] && breakToken["node"].textContent) {
	          breakLetter = breakToken["node"].textContent.charAt(breakToken["offset"]);
	        } else {
	          breakLetter = undefined;
	        }

	        var breakHooks = this.hooks.onBreakToken.triggerSync(breakToken, overflow, rendered, this);
	        breakHooks.forEach(function (newToken) {
	          if (typeof newToken != "undefined") {
	            breakToken = newToken;
	          }
	        });

	        if (breakToken && breakToken.node && extract) {
	          this.removeOverflow(overflow, breakLetter);
	        }
	      }

	      return breakToken;
	    }
	  }, {
	    key: "hasOverflow",
	    value: function hasOverflow(element) {
	      var bounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bounds;
	      var constrainingElement = element && element.parentNode; // this gets the element, instead of the wrapper for the width workaround

	      var _element$getBoundingC = element.getBoundingClientRect(),
	          width = _element$getBoundingC.width;

	      var scrollWidth = constrainingElement ? constrainingElement.scrollWidth : 0;
	      return Math.max(Math.floor(width), scrollWidth) > Math.round(bounds.width);
	    }
	  }, {
	    key: "findOverflow",
	    value: function findOverflow(rendered) {
	      var bounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bounds;
	      if (!this.hasOverflow(rendered, bounds)) return;
	      var start = Math.round(bounds.left);
	      var end = Math.round(bounds.right);
	      var range;
	      var walker = (0, dom.walk)(rendered.firstChild, rendered); // Find Start

	      var next, done, node, offset, skip, breakAvoid, prev, br;

	      while (!done) {
	        next = walker.next();
	        done = next.done;
	        node = next.value;
	        skip = false;
	        breakAvoid = false;
	        prev = undefined;
	        br = undefined;

	        if (node) {
	          var pos = (0, utils.getBoundingClientRect)(node);
	          var left = Math.floor(pos.left);
	          var right = Math.floor(pos.right);

	          if (!range && left >= end) {
	            // Check if it is a float
	            var isFloat = false;

	            if ((0, dom.isElement)(node)) {
	              var styles = window.getComputedStyle(node);
	              isFloat = styles.getPropertyValue("float") !== "none";
	              skip = styles.getPropertyValue("break-inside") === "avoid";
	              breakAvoid = node.dataset.breakBefore === "avoid" || node.dataset.previousBreakAfter === "avoid";
	              prev = breakAvoid && (0, dom.nodeBefore)(node, rendered);
	              br = node.tagName === "BR" || node.tagName === "WBR";
	            }

	            if (prev) {
	              range = document.createRange();
	              range.setStartBefore(prev);
	              break;
	            }

	            if (!br && !isFloat && (0, dom.isElement)(node)) {
	              range = document.createRange();
	              range.setStartBefore(node);
	              break;
	            }

	            if ((0, dom.isText)(node) && node.textContent.trim().length) {
	              range = document.createRange();
	              range.setStartBefore(node);
	              break;
	            }
	          }

	          if (!range && (0, dom.isText)(node) && node.textContent.trim().length && window.getComputedStyle(node.parentNode)["break-inside"] !== "avoid") {
	            var rects = (0, utils.getClientRects)(node);
	            var rect = void 0;
	            left = 0;

	            for (var i = 0; i != rects.length; i++) {
	              rect = rects[i];

	              if (rect.width > 0 && (!left || rect.left > left)) {
	                left = rect.left;
	              }
	            }

	            if (left >= end) {
	              range = document.createRange();
	              offset = this.textBreak(node, start, end);

	              if (!offset) {
	                range = undefined;
	              } else {
	                range.setStart(node, offset);
	              }

	              break;
	            }
	          } // Skip children


	          if (skip || right < end) {
	            next = (0, dom.nodeAfter)(node, rendered);

	            if (next) {
	              walker = (0, dom.walk)(next, rendered);
	            }
	          }
	        }
	      } // Find End


	      if (range) {
	        range.setEndAfter(rendered.lastChild);
	        return range;
	      }
	    }
	  }, {
	    key: "findEndToken",
	    value: function findEndToken(rendered, source) {
	      var bounds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bounds;

	      if (rendered.childNodes.length === 0) {
	        return;
	      }

	      var lastChild = rendered.lastChild;
	      var lastNodeIndex;

	      while (lastChild && lastChild.lastChild) {
	        if (!(0, dom.validNode)(lastChild)) {
	          // Only get elements with refs
	          lastChild = lastChild.previousSibling;
	        } else if (!(0, dom.validNode)(lastChild.lastChild)) {
	          // Deal with invalid dom items
	          lastChild = (0, dom.prevValidNode)(lastChild.lastChild);
	          break;
	        } else {
	          lastChild = lastChild.lastChild;
	        }
	      }

	      if ((0, dom.isText)(lastChild)) {
	        if (lastChild.parentNode.dataset.ref) {
	          lastNodeIndex = (0, dom.indexOf)(lastChild);
	          lastChild = lastChild.parentNode;
	        } else {
	          lastChild = lastChild.previousSibling;
	        }
	      }

	      var original = (0, dom.findElement)(lastChild, source);

	      if (lastNodeIndex) {
	        original = original.childNodes[lastNodeIndex];
	      }

	      var after = (0, dom.nodeAfter)(original);
	      return this.breakAt(after);
	    }
	  }, {
	    key: "textBreak",
	    value: function textBreak(node, start, end) {
	      var wordwalker = (0, dom.words)(node);
	      var left = 0;
	      var right = 0;
	      var word, next, done, pos;
	      var offset;

	      while (!done) {
	        next = wordwalker.next();
	        word = next.value;
	        done = next.done;

	        if (!word) {
	          break;
	        }

	        pos = (0, utils.getBoundingClientRect)(word);
	        left = Math.floor(pos.left);
	        right = Math.floor(pos.right);

	        if (left >= end) {
	          offset = word.startOffset;
	          break;
	        }

	        if (right > end) {
	          var letterwalker = (0, dom.letters)(word);
	          var letter = void 0,
	              nextLetter = void 0,
	              doneLetter = void 0;

	          while (!doneLetter) {
	            nextLetter = letterwalker.next();
	            letter = nextLetter.value;
	            doneLetter = nextLetter.done;

	            if (!letter) {
	              break;
	            }

	            pos = (0, utils.getBoundingClientRect)(letter);
	            left = Math.floor(pos.left);

	            if (left >= end) {
	              offset = letter.startOffset;
	              done = true;
	              break;
	            }
	          }
	        }
	      }

	      return offset;
	    }
	  }, {
	    key: "removeOverflow",
	    value: function removeOverflow(overflow, breakLetter) {
	      var startContainer = overflow.startContainer;
	      var extracted = overflow.extractContents();
	      this.hyphenateAtBreak(startContainer, breakLetter);
	      return extracted;
	    }
	  }, {
	    key: "hyphenateAtBreak",
	    value: function hyphenateAtBreak(startContainer, breakLetter) {
	      if ((0, dom.isText)(startContainer)) {
	        var startText = startContainer.textContent;
	        var prevLetter = startText[startText.length - 1]; // Add a hyphen if previous character is a letter or soft hyphen

	        if (breakLetter && /^\w|\u00AD$/.test(prevLetter) && /^\w|\u00AD$/.test(breakLetter) || !breakLetter && /^\w|\u00AD$/.test(prevLetter)) {
	          startContainer.parentNode.classList.add("pagedjs_hyphen");
	          startContainer.textContent += this.settings.hyphenGlyph || "\u2011";
	        }
	      }
	    }
	  }]);
	  return Layout;
	}();

	(0, _eventEmitter["default"])(Layout.prototype);
	var _default = Layout;
	exports["default"] = _default;
	});

	unwrapExports(layout);

	var page = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _regenerator = interopRequireDefault(regenerator);

	var _asyncToGenerator2 = interopRequireDefault(asyncToGenerator);

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _layout2 = interopRequireDefault(layout);

	var _eventEmitter = interopRequireDefault(eventEmitter);

	/**
	 * Render a page
	 * @class
	 */
	var Page =
	/*#__PURE__*/
	function () {
	  function Page(pagesArea, pageTemplate, blank, hooks) {
	    (0, _classCallCheck2["default"])(this, Page);
	    this.pagesArea = pagesArea;
	    this.pageTemplate = pageTemplate;
	    this.blank = blank;
	    this.width = undefined;
	    this.height = undefined;
	    this.hooks = hooks; // this.element = this.create(this.pageTemplate);
	  }

	  (0, _createClass2["default"])(Page, [{
	    key: "create",
	    value: function create(template, after) {
	      //let documentFragment = document.createRange().createContextualFragment( TEMPLATE );
	      //let page = documentFragment.children[0];
	      var clone = document.importNode(this.pageTemplate.content, true);
	      var page, index;

	      if (after) {
	        this.pagesArea.insertBefore(clone, after.nextElementSibling);
	        index = Array.prototype.indexOf.call(this.pagesArea.children, after.nextElementSibling);
	        page = this.pagesArea.children[index];
	      } else {
	        this.pagesArea.appendChild(clone);
	        page = this.pagesArea.lastChild;
	      }

	      var pagebox = page.querySelector(".pagedjs_pagebox");
	      var area = page.querySelector(".pagedjs_page_content");
	      var size = area.getBoundingClientRect();
	      area.style.columnWidth = Math.round(size.width) + "px";
	      area.style.columnGap = "calc(var(--pagedjs-margin-right) + var(--pagedjs-margin-left))"; // area.style.overflow = "scroll";

	      this.width = Math.round(size.width);
	      this.height = Math.round(size.height);
	      this.element = page;
	      this.pagebox = pagebox;
	      this.area = area;
	      return page;
	    }
	  }, {
	    key: "createWrapper",
	    value: function createWrapper() {
	      var wrapper = document.createElement("div");
	      this.area.appendChild(wrapper);
	      this.wrapper = wrapper;
	      return wrapper;
	    }
	  }, {
	    key: "index",
	    value: function index(pgnum) {
	      this.position = pgnum;
	      var page = this.element; // let pagebox = this.pagebox;

	      var index = pgnum + 1;
	      var id = "page-".concat(index);
	      this.id = id; // page.dataset.pageNumber = index;

	      page.dataset.pageNumber = index;
	      page.setAttribute("id", id);

	      if (this.name) {
	        page.classList.add("pagedjs_" + this.name + "_page");
	      }

	      if (this.blank) {
	        page.classList.add("pagedjs_blank_page");
	      }

	      if (pgnum === 0) {
	        page.classList.add("pagedjs_first_page");
	      }

	      if (pgnum % 2 !== 1) {
	        page.classList.remove("pagedjs_left_page");
	        page.classList.add("pagedjs_right_page");
	      } else {
	        page.classList.remove("pagedjs_right_page");
	        page.classList.add("pagedjs_left_page");
	      }
	    }
	    /*
	    size(width, height) {
	    	if (width === this.width && height === this.height) {
	    		return;
	    	}
	    	this.width = width;
	    	this.height = height;
	    		this.element.style.width = Math.round(width) + "px";
	    	this.element.style.height = Math.round(height) + "px";
	    	this.element.style.columnWidth = Math.round(width) + "px";
	    }
	    */

	  }, {
	    key: "layout",
	    value: function () {
	      var _layout = (0, _asyncToGenerator2["default"])(
	      /*#__PURE__*/
	      _regenerator["default"].mark(function _callee(contents, breakToken, maxChars) {
	        var newBreakToken;
	        return _regenerator["default"].wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                this.clear();
	                this.startToken = breakToken;
	                this.layoutMethod = new _layout2["default"](this.area, this.hooks, maxChars);
	                _context.next = 5;
	                return this.layoutMethod.renderTo(this.wrapper, contents, breakToken);

	              case 5:
	                newBreakToken = _context.sent;
	                this.addListeners(contents);
	                this.endToken = newBreakToken;
	                return _context.abrupt("return", newBreakToken);

	              case 9:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function layout(_x, _x2, _x3) {
	        return _layout.apply(this, arguments);
	      }

	      return layout;
	    }()
	  }, {
	    key: "append",
	    value: function () {
	      var _append = (0, _asyncToGenerator2["default"])(
	      /*#__PURE__*/
	      _regenerator["default"].mark(function _callee2(contents, breakToken) {
	        var newBreakToken;
	        return _regenerator["default"].wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                if (this.layoutMethod) {
	                  _context2.next = 2;
	                  break;
	                }

	                return _context2.abrupt("return", this.layout(contents, breakToken));

	              case 2:
	                _context2.next = 4;
	                return this.layoutMethod.renderTo(this.wrapper, contents, breakToken);

	              case 4:
	                newBreakToken = _context2.sent;
	                this.endToken = newBreakToken;
	                return _context2.abrupt("return", newBreakToken);

	              case 7:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function append(_x4, _x5) {
	        return _append.apply(this, arguments);
	      }

	      return append;
	    }()
	  }, {
	    key: "getByParent",
	    value: function getByParent(ref, entries) {
	      var e;

	      for (var i = 0; i < entries.length; i++) {
	        e = entries[i];

	        if (e.dataset.ref === ref) {
	          return e;
	        }
	      }
	    }
	  }, {
	    key: "onOverflow",
	    value: function onOverflow(func) {
	      this._onOverflow = func;
	    }
	  }, {
	    key: "onUnderflow",
	    value: function onUnderflow(func) {
	      this._onUnderflow = func;
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      this.removeListeners();
	      this.wrapper && this.wrapper.remove();
	      this.createWrapper();
	    }
	  }, {
	    key: "addListeners",
	    value: function addListeners(contents) {
	      if (typeof ResizeObserver !== "undefined") {
	        this.addResizeObserver(contents);
	      } else {
	        this._checkOverflowAfterResize = this.checkOverflowAfterResize.bind(this, contents);
	        this.element.addEventListener("overflow", this._checkOverflowAfterResize, false);
	        this.element.addEventListener("underflow", this._checkOverflowAfterResize, false);
	      } // TODO: fall back to mutation observer?


	      this._onScroll = function () {
	        if (this.listening) {
	          this.element.scrollLeft = 0;
	        }
	      }.bind(this); // Keep scroll left from changing


	      this.element.addEventListener("scroll", this._onScroll);
	      this.listening = true;
	      return true;
	    }
	  }, {
	    key: "removeListeners",
	    value: function removeListeners() {
	      this.listening = false;

	      if (typeof ResizeObserver !== "undefined" && this.ro) {
	        this.ro.disconnect();
	      } else if (this.element) {
	        this.element.removeEventListener("overflow", this._checkOverflowAfterResize, false);
	        this.element.removeEventListener("underflow", this._checkOverflowAfterResize, false);
	      }

	      this.element && this.element.removeEventListener("scroll", this._onScroll);
	    }
	  }, {
	    key: "addResizeObserver",
	    value: function addResizeObserver(contents) {
	      var _this = this;

	      var wrapper = this.wrapper;
	      var prevHeight = wrapper.getBoundingClientRect().height;
	      this.ro = new ResizeObserver(function (entries) {
	        if (!_this.listening) {
	          return;
	        }

	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var entry = _step.value;
	            var cr = entry.contentRect;

	            if (cr.height > prevHeight) {
	              _this.checkOverflowAfterResize(contents);

	              prevHeight = wrapper.getBoundingClientRect().height;
	            } else if (cr.height < prevHeight) {
	              // TODO: calc line height && (prevHeight - cr.height) >= 22
	              _this.checkUnderflowAfterResize(contents);

	              prevHeight = cr.height;
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
	              _iterator["return"]();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      });
	      this.ro.observe(wrapper);
	    }
	  }, {
	    key: "checkOverflowAfterResize",
	    value: function checkOverflowAfterResize(contents) {
	      if (!this.listening || !this.layoutMethod) {
	        return;
	      }

	      var newBreakToken = this.layoutMethod.findBreakToken(this.wrapper, contents);

	      if (newBreakToken) {
	        this.endToken = newBreakToken;
	        this._onOverflow && this._onOverflow(newBreakToken);
	      }
	    }
	  }, {
	    key: "checkUnderflowAfterResize",
	    value: function checkUnderflowAfterResize(contents) {
	      if (!this.listening || !this.layoutMethod) {
	        return;
	      }

	      var endToken = this.layoutMethod.findEndToken(this.wrapper, contents); // let newBreakToken = this.layoutMethod.findBreakToken(this.wrapper, contents);

	      if (endToken) {
	        this._onUnderflow && this._onUnderflow(endToken);
	      }
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.removeListeners();
	      this.element.remove();
	      this.element = undefined;
	      this.wrapper = undefined;
	    }
	  }]);
	  return Page;
	}();

	(0, _eventEmitter["default"])(Page.prototype);
	var _default = Page;
	exports["default"] = _default;
	});

	unwrapExports(page);

	var parser = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);





	/**
	 * Render a flow of text offscreen
	 * @class
	 */
	var ContentParser =
	/*#__PURE__*/
	function () {
	  function ContentParser(content, cb) {
	    (0, _classCallCheck2["default"])(this, ContentParser);

	    if (content && content.nodeType) {
	      // handle dom
	      this.dom = this.add(content);
	    } else if (typeof content === "string") {
	      this.dom = this.parse(content);
	    }

	    return this.dom;
	  }

	  (0, _createClass2["default"])(ContentParser, [{
	    key: "parse",
	    value: function parse(markup, mime) {
	      var range = document.createRange();
	      var fragment = range.createContextualFragment(markup);
	      this.addRefs(fragment);
	      this.removeEmpty(fragment);
	      return fragment;
	    }
	  }, {
	    key: "add",
	    value: function add(contents) {
	      // let fragment = document.createDocumentFragment();
	      //
	      // let children = [...contents.childNodes];
	      // for (let child of children) {
	      // 	let clone = child.cloneNode(true);
	      // 	fragment.appendChild(clone);
	      // }
	      this.addRefs(contents);
	      this.removeEmpty(contents);
	      return contents;
	    }
	  }, {
	    key: "addRefs",
	    value: function addRefs(content) {
	      var treeWalker = document.createTreeWalker(content, NodeFilter.SHOW_ELEMENT, {
	        acceptNode: function acceptNode(node) {
	          return NodeFilter.FILTER_ACCEPT;
	        }
	      }, false);
	      var node = treeWalker.nextNode();

	      while (node) {
	        if (!node.hasAttribute("data-ref")) {
	          var uuid = (0, utils.UUID)();
	          node.setAttribute("data-ref", uuid);
	        }

	        if (node.id) {
	          node.setAttribute("data-id", node.id);
	        } // node.setAttribute("data-children", node.childNodes.length);
	        // node.setAttribute("data-text", node.textContent.trim().length);


	        node = treeWalker.nextNode();
	      }
	    }
	  }, {
	    key: "removeEmpty",
	    value: function removeEmpty(content) {
	      var treeWalker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
	        acceptNode: function acceptNode(node) {
	          // Only remove more than a single space
	          if (node.textContent.length > 1 && !node.textContent.trim()) {
	            // Don't touch whitespace if text is preformated
	            var parent = node.parentNode;
	            var pre = (0, dom.isElement)(parent) && parent.closest("pre");

	            if (pre) {
	              return NodeFilter.FILTER_REJECT;
	            }

	            return NodeFilter.FILTER_ACCEPT;
	          } else {
	            return NodeFilter.FILTER_REJECT;
	          }
	        }
	      }, false);
	      var node;
	      var current;
	      node = treeWalker.nextNode();

	      while (node) {
	        current = node;
	        node = treeWalker.nextNode(); // if (!current.nextSibling || (current.nextSibling && current.nextSibling.nodeType === 1)) {

	        current.parentNode.removeChild(current); // }
	      }
	    }
	  }, {
	    key: "find",
	    value: function find(ref) {
	      return this.refs[ref];
	    } // isWrapper(element) {
	    //   return wrappersRegex.test(element.nodeName);
	    // }

	  }, {
	    key: "isText",
	    value: function isText(node) {
	      return node.tagName === "TAG";
	    }
	  }, {
	    key: "isElement",
	    value: function isElement(node) {
	      return node.nodeType === 1;
	    }
	  }, {
	    key: "hasChildren",
	    value: function hasChildren(node) {
	      return node.childNodes && node.childNodes.length;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.refs = undefined;
	      this.dom = undefined;
	    }
	  }]);
	  return ContentParser;
	}();

	var _default = ContentParser;
	exports["default"] = _default;
	});

	unwrapExports(parser);

	var queue = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Task = exports["default"] = void 0;

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);



	/**
	 * Queue for handling tasks one at a time
	 * @class
	 * @param {scope} context what this will resolve to in the tasks
	 */
	var Queue =
	/*#__PURE__*/
	function () {
	  function Queue(context) {
	    (0, _classCallCheck2["default"])(this, Queue);
	    this._q = [];
	    this.context = context;
	    this.tick = requestAnimationFrame;
	    this.running = false;
	    this.paused = false;
	  }
	  /**
	   * Add an item to the queue
	   * @return {Promise} enqueued
	   */


	  (0, _createClass2["default"])(Queue, [{
	    key: "enqueue",
	    value: function enqueue() {
	      var deferred, promise;
	      var queued;
	      var task = [].shift.call(arguments);
	      var args = arguments; // Handle single args without context
	      // if(args && !Array.isArray(args)) {
	      //   args = [args];
	      // }

	      if (!task) {
	        throw new Error("No Task Provided");
	      }

	      if (typeof task === "function") {
	        deferred = new utils.defer();
	        promise = deferred.promise;
	        queued = {
	          "task": task,
	          "args": args,
	          //"context"  : context,
	          "deferred": deferred,
	          "promise": promise
	        };
	      } else {
	        // Task is a promise
	        queued = {
	          "promise": task
	        };
	      }

	      this._q.push(queued); // Wait to start queue flush


	      if (this.paused == false && !this.running) {
	        this.run();
	      }

	      return queued.promise;
	    }
	    /**
	     * Run one item
	     * @return {Promise} dequeued
	     */

	  }, {
	    key: "dequeue",
	    value: function dequeue() {
	      var inwait, task, result;

	      if (this._q.length && !this.paused) {
	        inwait = this._q.shift();
	        task = inwait.task;

	        if (task) {
	          // console.log(task)
	          result = task.apply(this.context, inwait.args);

	          if (result && typeof result["then"] === "function") {
	            // Task is a function that returns a promise
	            return result.then(function () {
	              inwait.deferred.resolve.apply(this.context, arguments);
	            }.bind(this), function () {
	              inwait.deferred.reject.apply(this.context, arguments);
	            }.bind(this));
	          } else {
	            // Task resolves immediately
	            inwait.deferred.resolve.apply(this.context, result);
	            return inwait.promise;
	          }
	        } else if (inwait.promise) {
	          // Task is a promise
	          return inwait.promise;
	        }
	      } else {
	        inwait = new utils.defer();
	        inwait.deferred.resolve();
	        return inwait.promise;
	      }
	    } // Run All Immediately

	  }, {
	    key: "dump",
	    value: function dump() {
	      while (this._q.length) {
	        this.dequeue();
	      }
	    }
	    /**
	     * Run all tasks sequentially, at convince
	     * @return {Promise} all run
	     */

	  }, {
	    key: "run",
	    value: function run() {
	      var _this = this;

	      if (!this.running) {
	        this.running = true;
	        this.defered = new utils.defer();
	      }

	      this.tick.call(window, function () {
	        if (_this._q.length) {
	          _this.dequeue().then(function () {
	            this.run();
	          }.bind(_this));
	        } else {
	          _this.defered.resolve();

	          _this.running = undefined;
	        }
	      }); // Unpause

	      if (this.paused == true) {
	        this.paused = false;
	      }

	      return this.defered.promise;
	    }
	    /**
	     * Flush all, as quickly as possible
	     * @return {Promise} ran
	     */

	  }, {
	    key: "flush",
	    value: function flush() {
	      if (this.running) {
	        return this.running;
	      }

	      if (this._q.length) {
	        this.running = this.dequeue().then(function () {
	          this.running = undefined;
	          return this.flush();
	        }.bind(this));
	        return this.running;
	      }
	    }
	    /**
	     * Clear all items in wait
	     * @return {void}
	     */

	  }, {
	    key: "clear",
	    value: function clear() {
	      this._q = [];
	    }
	    /**
	     * Get the number of tasks in the queue
	     * @return {number} tasks
	     */

	  }, {
	    key: "length",
	    value: function length() {
	      return this._q.length;
	    }
	    /**
	     * Pause a running queue
	     * @return {void}
	     */

	  }, {
	    key: "pause",
	    value: function pause() {
	      this.paused = true;
	    }
	    /**
	     * End the queue
	     * @return {void}
	     */

	  }, {
	    key: "stop",
	    value: function stop() {
	      this._q = [];
	      this.running = false;
	      this.paused = true;
	    }
	  }]);
	  return Queue;
	}();
	/**
	 * Create a new task from a callback
	 * @class
	 * @private
	 * @param {function} task task to complete
	 * @param {array} args arguments for the task
	 * @param {scope} context scope of the task
	 * @return {function} task
	 */


	var Task = function Task(task, args, context) {
	  (0, _classCallCheck2["default"])(this, Task);
	  return function () {
	    var _this2 = this;

	    var toApply = arguments || [];
	    return new Promise(function (resolve, reject) {
	      var callback = function callback(value, err) {
	        if (!value && err) {
	          reject(err);
	        } else {
	          resolve(value);
	        }
	      }; // Add the callback to the arguments list


	      toApply.push(callback); // Apply all arguments to the functions

	      task.apply(context || _this2, toApply);
	    });
	  };
	};

	exports.Task = Task;
	var _default = Queue;
	exports["default"] = _default;
	});

	unwrapExports(queue);
	var queue_1 = queue.Task;

	var chunker = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _regenerator = interopRequireDefault(regenerator);

	var _asyncToGenerator2 = interopRequireDefault(asyncToGenerator);

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _awaitAsyncGenerator2 = interopRequireDefault(awaitAsyncGenerator);

	var _wrapAsyncGenerator2 = interopRequireDefault(wrapAsyncGenerator);

	var _page = interopRequireDefault(page);

	var _parser = interopRequireDefault(parser);

	var _eventEmitter = interopRequireDefault(eventEmitter);

	var _hook = interopRequireDefault(hook);

	var _queue = interopRequireDefault(queue);
	var TEMPLATE = "\n<div class=\"pagedjs_page\">\n\t<div class=\"pagedjs_sheet\">\n\t\t<div class=\"pagedjs_bleed pagedjs_bleed-top\">\n\t\t\t<div class=\"pagedjs_marks-crop\"></div>\n\t\t\t<div class=\"pagedjs_marks-middle\">\n\t\t\t\t<div class=\"pagedjs_marks-cross\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_marks-crop\"></div>\n\t\t</div>\n\t\t<div class=\"pagedjs_bleed pagedjs_bleed-bottom\">\n\t\t\t<div class=\"pagedjs_marks-crop\"></div>\n\t\t\t<div class=\"pagedjs_marks-middle\">\n\t\t\t\t<div class=\"pagedjs_marks-cross\"></div>\n\t\t\t</div>\t\t<div class=\"pagedjs_marks-crop\"></div>\n\t\t</div>\n\t\t<div class=\"pagedjs_bleed pagedjs_bleed-left\">\n\t\t\t<div class=\"pagedjs_marks-crop\"></div>\n\t\t\t<div class=\"pagedjs_marks-middle\">\n\t\t\t\t<div class=\"pagedjs_marks-cross\"></div>\n\t\t\t</div>\t\t<div class=\"pagedjs_marks-crop\"></div>\n\t\t</div>\n\t\t<div class=\"pagedjs_bleed pagedjs_bleed-right\">\n\t\t\t<div class=\"pagedjs_marks-crop\"></div>\n\t\t\t<div class=\"pagedjs_marks-middle\">\n\t\t\t\t<div class=\"pagedjs_marks-cross\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_marks-crop\"></div>\n\t\t</div>\n\t\t<div class=\"pagedjs_pagebox\">\n\t\t\t<div class=\"pagedjs_margin-top-left-corner-holder\">\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-top-left-corner\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_margin-top\">\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-top-left\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-top-center\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-top-right\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_margin-top-right-corner-holder\">\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-top-right-corner\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_margin-right\">\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-right-top\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-right-middle\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-right-bottom\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_margin-left\">\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-left-top\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-left-middle\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-left-bottom\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_margin-bottom-left-corner-holder\">\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-bottom-left-corner\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_margin-bottom\">\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-bottom-left\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-bottom-center\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-bottom-right\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_margin-bottom-right-corner-holder\">\n\t\t\t\t<div class=\"pagedjs_margin pagedjs_margin-bottom-right-corner\"><div class=\"pagedjs_margin-content\"></div></div>\n\t\t\t</div>\n\t\t\t<div class=\"pagedjs_area\">\n\t\t\t\t<div class=\"pagedjs_page_content\"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>";
	/**
	 * Chop up text into flows
	 * @class
	 */

	var Chunker =
	/*#__PURE__*/
	function () {
	  function Chunker(content, renderTo, options) {
	    (0, _classCallCheck2["default"])(this, Chunker);
	    // this.preview = preview;
	    this.settings = options || {};
	    this.hooks = {};
	    this.hooks.beforeParsed = new _hook["default"](this);
	    this.hooks.afterParsed = new _hook["default"](this);
	    this.hooks.beforePageLayout = new _hook["default"](this);
	    this.hooks.layout = new _hook["default"](this);
	    this.hooks.renderNode = new _hook["default"](this);
	    this.hooks.layoutNode = new _hook["default"](this);
	    this.hooks.onOverflow = new _hook["default"](this);
	    this.hooks.onBreakToken = new _hook["default"]();
	    this.hooks.afterPageLayout = new _hook["default"](this);
	    this.hooks.afterRendered = new _hook["default"](this);
	    this.pages = [];
	    this.total = 0;
	    this.q = new _queue["default"](this);
	    this.stopped = false;
	    this.rendered = false;
	    this.content = content;
	    this.charsPerBreak = [];
	    this.maxChars;

	    if (content) {
	      this.flow(content, renderTo);
	    }
	  }

	  (0, _createClass2["default"])(Chunker, [{
	    key: "setup",
	    value: function setup(renderTo) {
	      this.pagesArea = document.createElement("div");
	      this.pagesArea.classList.add("pagedjs_pages");

	      if (renderTo) {
	        renderTo.appendChild(this.pagesArea);
	      } else {
	        document.querySelector("body").appendChild(this.pagesArea);
	      }

	      this.pageTemplate = document.createElement("template");
	      this.pageTemplate.innerHTML = TEMPLATE;
	    }
	  }, {
	    key: "flow",
	    value: function () {
	      var _flow = (0, _asyncToGenerator2["default"])(
	      /*#__PURE__*/
	      _regenerator["default"].mark(function _callee(content, renderTo) {
	        var parsed, rendered;
	        return _regenerator["default"].wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.next = 2;
	                return this.hooks.beforeParsed.trigger(content, this);

	              case 2:
	                parsed = new _parser["default"](content);
	                this.source = parsed;
	                this.breakToken = undefined;

	                if (this.pagesArea && this.pageTemplate) {
	                  this.q.clear();
	                  this.removePages();
	                } else {
	                  this.setup(renderTo);
	                }

	                this.emit("rendering", content);
	                _context.next = 9;
	                return this.hooks.afterParsed.trigger(parsed, this);

	              case 9:
	                _context.next = 11;
	                return this.loadFonts();

	              case 11:
	                _context.next = 13;
	                return this.render(parsed, this.breakToken);

	              case 13:
	                rendered = _context.sent;

	              case 14:
	                if (!rendered.canceled) {
	                  _context.next = 21;
	                  break;
	                }

	                this.start();
	                _context.next = 18;
	                return this.render(parsed, this.breakToken);

	              case 18:
	                rendered = _context.sent;
	                _context.next = 14;
	                break;

	              case 21:
	                this.rendered = true;
	                this.pagesArea.style.setProperty("--pagedjs-page-count", this.total);
	                _context.next = 25;
	                return this.hooks.afterRendered.trigger(this.pages, this);

	              case 25:
	                this.emit("rendered", this.pages);
	                return _context.abrupt("return", this);

	              case 27:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function flow(_x, _x2) {
	        return _flow.apply(this, arguments);
	      }

	      return flow;
	    }() // oversetPages() {
	    // 	let overset = [];
	    // 	for (let i = 0; i < this.pages.length; i++) {
	    // 		let page = this.pages[i];
	    // 		if (page.overset) {
	    // 			overset.push(page);
	    // 			// page.overset = false;
	    // 		}
	    // 	}
	    // 	return overset;
	    // }
	    //
	    // async handleOverset(parsed) {
	    // 	let overset = this.oversetPages();
	    // 	if (overset.length) {
	    // 		console.log("overset", overset);
	    // 		let index = this.pages.indexOf(overset[0]) + 1;
	    // 		console.log("INDEX", index);
	    //
	    // 		// Remove pages
	    // 		// this.removePages(index);
	    //
	    // 		// await this.render(parsed, overset[0].overset);
	    //
	    // 		// return this.handleOverset(parsed);
	    // 	}
	    // }

	  }, {
	    key: "render",
	    value: function () {
	      var _render = (0, _asyncToGenerator2["default"])(
	      /*#__PURE__*/
	      _regenerator["default"].mark(function _callee2(parsed, startAt) {
	        var _this2 = this;

	        var renderer, done, result;
	        return _regenerator["default"].wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                renderer = this.layout(parsed, startAt, this.settings);
	                done = false;

	              case 2:
	                if (done) {
	                  _context2.next = 9;
	                  break;
	                }

	                _context2.next = 5;
	                return this.q.enqueue(function () {
	                  return _this2.renderAsync(renderer);
	                });

	              case 5:
	                result = _context2.sent;
	                done = result.done;
	                _context2.next = 2;
	                break;

	              case 9:
	                return _context2.abrupt("return", result);

	              case 10:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function render(_x3, _x4) {
	        return _render.apply(this, arguments);
	      }

	      return render;
	    }()
	  }, {
	    key: "start",
	    value: function start() {
	      this.rendered = false;
	      this.stopped = false;
	    }
	  }, {
	    key: "stop",
	    value: function stop() {
	      this.stopped = true; // this.q.clear();
	    }
	  }, {
	    key: "renderOnIdle",
	    value: function renderOnIdle(renderer) {
	      var _this3 = this;

	      return new Promise(function (resolve) {
	        (0, utils.requestIdleCallback)(
	        /*#__PURE__*/
	        (0, _asyncToGenerator2["default"])(
	        /*#__PURE__*/
	        _regenerator["default"].mark(function _callee3() {
	          var result;
	          return _regenerator["default"].wrap(function _callee3$(_context3) {
	            while (1) {
	              switch (_context3.prev = _context3.next) {
	                case 0:
	                  if (!_this3.stopped) {
	                    _context3.next = 2;
	                    break;
	                  }

	                  return _context3.abrupt("return", resolve({
	                    done: true,
	                    canceled: true
	                  }));

	                case 2:
	                  _context3.next = 4;
	                  return renderer.next();

	                case 4:
	                  result = _context3.sent;

	                  if (_this3.stopped) {
	                    resolve({
	                      done: true,
	                      canceled: true
	                    });
	                  } else {
	                    resolve(result);
	                  }

	                case 6:
	                case "end":
	                  return _context3.stop();
	              }
	            }
	          }, _callee3);
	        })));
	      });
	    }
	  }, {
	    key: "renderAsync",
	    value: function () {
	      var _renderAsync = (0, _asyncToGenerator2["default"])(
	      /*#__PURE__*/
	      _regenerator["default"].mark(function _callee4(renderer) {
	        var result;
	        return _regenerator["default"].wrap(function _callee4$(_context4) {
	          while (1) {
	            switch (_context4.prev = _context4.next) {
	              case 0:
	                if (!this.stopped) {
	                  _context4.next = 2;
	                  break;
	                }

	                return _context4.abrupt("return", {
	                  done: true,
	                  canceled: true
	                });

	              case 2:
	                _context4.next = 4;
	                return renderer.next();

	              case 4:
	                result = _context4.sent;

	                if (!this.stopped) {
	                  _context4.next = 9;
	                  break;
	                }

	                return _context4.abrupt("return", {
	                  done: true,
	                  canceled: true
	                });

	              case 9:
	                return _context4.abrupt("return", result);

	              case 10:
	              case "end":
	                return _context4.stop();
	            }
	          }
	        }, _callee4, this);
	      }));

	      function renderAsync(_x5) {
	        return _renderAsync.apply(this, arguments);
	      }

	      return renderAsync;
	    }()
	  }, {
	    key: "handleBreaks",
	    value: function () {
	      var _handleBreaks = (0, _asyncToGenerator2["default"])(
	      /*#__PURE__*/
	      _regenerator["default"].mark(function _callee5(node) {
	        var currentPage, currentPosition, currentSide, previousBreakAfter, breakBefore, page;
	        return _regenerator["default"].wrap(function _callee5$(_context5) {
	          while (1) {
	            switch (_context5.prev = _context5.next) {
	              case 0:
	                currentPage = this.total + 1;
	                currentPosition = currentPage % 2 === 0 ? "left" : "right"; // TODO: Recto and Verso should reverse for rtl languages

	                currentSide = currentPage % 2 === 0 ? "verso" : "recto";

	                if (!(currentPage === 1)) {
	                  _context5.next = 5;
	                  break;
	                }

	                return _context5.abrupt("return");

	              case 5:
	                if (node && typeof node.dataset !== "undefined" && typeof node.dataset.previousBreakAfter !== "undefined") {
	                  previousBreakAfter = node.dataset.previousBreakAfter;
	                }

	                if (node && typeof node.dataset !== "undefined" && typeof node.dataset.breakBefore !== "undefined") {
	                  breakBefore = node.dataset.breakBefore;
	                }

	                if (previousBreakAfter && (previousBreakAfter === "left" || previousBreakAfter === "right") && previousBreakAfter !== currentPosition) {
	                  page = this.addPage(true);
	                } else if (previousBreakAfter && (previousBreakAfter === "verso" || previousBreakAfter === "recto") && previousBreakAfter !== currentSide) {
	                  page = this.addPage(true);
	                } else if (breakBefore && (breakBefore === "left" || breakBefore === "right") && breakBefore !== currentPosition) {
	                  page = this.addPage(true);
	                } else if (breakBefore && (breakBefore === "verso" || breakBefore === "recto") && breakBefore !== currentSide) {
	                  page = this.addPage(true);
	                }

	                if (!page) {
	                  _context5.next = 15;
	                  break;
	                }

	                _context5.next = 11;
	                return this.hooks.beforePageLayout.trigger(page, undefined, undefined, this);

	              case 11:
	                this.emit("page", page); // await this.hooks.layout.trigger(page.element, page, undefined, this);

	                _context5.next = 14;
	                return this.hooks.afterPageLayout.trigger(page.element, page, undefined, this);

	              case 14:
	                this.emit("renderedPage", page);

	              case 15:
	              case "end":
	                return _context5.stop();
	            }
	          }
	        }, _callee5, this);
	      }));

	      function handleBreaks(_x6) {
	        return _handleBreaks.apply(this, arguments);
	      }

	      return handleBreaks;
	    }()
	  }, {
	    key: "layout",
	    value: function layout(content, startAt) {
	      var _this = this;

	      return (0, _wrapAsyncGenerator2["default"])(
	      /*#__PURE__*/
	      _regenerator["default"].mark(function _callee6() {
	        var breakToken, page;
	        return _regenerator["default"].wrap(function _callee6$(_context6) {
	          while (1) {
	            switch (_context6.prev = _context6.next) {
	              case 0:
	                breakToken = startAt || false;

	              case 1:
	                if (!(breakToken !== undefined && ( true))) {
	                  _context6.next = 24;
	                  break;
	                }

	                if (!(breakToken && breakToken.node)) {
	                  _context6.next = 7;
	                  break;
	                }

	                _context6.next = 5;
	                return (0, _awaitAsyncGenerator2["default"])(_this.handleBreaks(breakToken.node));

	              case 5:
	                _context6.next = 9;
	                break;

	              case 7:
	                _context6.next = 9;
	                return (0, _awaitAsyncGenerator2["default"])(_this.handleBreaks(content.firstChild));

	              case 9:
	                page = _this.addPage();
	                _context6.next = 12;
	                return (0, _awaitAsyncGenerator2["default"])(_this.hooks.beforePageLayout.trigger(page, content, breakToken, _this));

	              case 12:
	                _this.emit("page", page); // Layout content in the page, starting from the breakToken


	                _context6.next = 15;
	                return (0, _awaitAsyncGenerator2["default"])(page.layout(content, breakToken, _this.maxChars));

	              case 15:
	                breakToken = _context6.sent;
	                _context6.next = 18;
	                return (0, _awaitAsyncGenerator2["default"])(_this.hooks.afterPageLayout.trigger(page.element, page, breakToken, _this));

	              case 18:
	                _this.emit("renderedPage", page);

	                _this.recoredCharLength(page.wrapper.textContent.length);

	                _context6.next = 22;
	                return breakToken;

	              case 22:
	                _context6.next = 1;
	                break;

	              case 24:
	              case "end":
	                return _context6.stop();
	            }
	          }
	        }, _callee6);
	      }))();
	    }
	  }, {
	    key: "recoredCharLength",
	    value: function recoredCharLength(length) {
	      if (length === 0) {
	        return;
	      }

	      this.charsPerBreak.push(length); // Keep the length of the last few breaks

	      if (this.charsPerBreak.length > 4) {
	        this.charsPerBreak.shift();
	      }

	      this.maxChars = this.charsPerBreak.reduce(function (a, b) {
	        return a + b;
	      }, 0) / this.charsPerBreak.length;
	    }
	  }, {
	    key: "removePages",
	    value: function removePages() {
	      var fromIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      if (fromIndex >= this.pages.length) {
	        return;
	      } // Remove pages


	      for (var i = fromIndex; i < this.pages.length; i++) {
	        this.pages[i].destroy();
	      }

	      if (fromIndex > 0) {
	        this.pages.splice(fromIndex);
	      } else {
	        this.pages = [];
	      }

	      this.total = this.pages.length;
	    }
	  }, {
	    key: "addPage",
	    value: function addPage(blank) {
	      var _this4 = this;

	      var lastPage = this.pages[this.pages.length - 1]; // Create a new page from the template

	      var page = new _page["default"](this.pagesArea, this.pageTemplate, blank, this.hooks);
	      this.pages.push(page); // Create the pages

	      page.create(undefined, lastPage && lastPage.element);
	      page.index(this.total);

	      if (!blank) {
	        // Listen for page overflow
	        page.onOverflow(function (overflowToken) {
	          console.warn("overflow on", page.id, overflowToken); // Only reflow while rendering

	          if (_this4.rendered) {
	            return;
	          }

	          var index = _this4.pages.indexOf(page) + 1; // Stop the rendering

	          _this4.stop(); // Set the breakToken to resume at


	          _this4.breakToken = overflowToken; // Remove pages

	          _this4.removePages(index);

	          if (_this4.rendered === true) {
	            _this4.rendered = false;

	            _this4.q.enqueue(
	            /*#__PURE__*/
	            (0, _asyncToGenerator2["default"])(
	            /*#__PURE__*/
	            _regenerator["default"].mark(function _callee7() {
	              return _regenerator["default"].wrap(function _callee7$(_context7) {
	                while (1) {
	                  switch (_context7.prev = _context7.next) {
	                    case 0:
	                      _this4.start();

	                      _context7.next = 3;
	                      return _this4.render(_this4.source, _this4.breakToken);

	                    case 3:
	                      _this4.rendered = true;

	                    case 4:
	                    case "end":
	                      return _context7.stop();
	                  }
	                }
	              }, _callee7);
	            })));
	          }
	        });
	        page.onUnderflow(function (overflowToken) {// console.log("underflow on", page.id, overflowToken);
	          // page.append(this.source, overflowToken);
	        });
	      }

	      this.total = this.pages.length;
	      return page;
	    }
	    /*
	    insertPage(index, blank) {
	    	let lastPage = this.pages[index];
	    	// Create a new page from the template
	    	let page = new Page(this.pagesArea, this.pageTemplate, blank, this.hooks);
	    		let total = this.pages.splice(index, 0, page);
	    		// Create the pages
	    	page.create(undefined, lastPage && lastPage.element);
	    		page.index(index + 1);
	    		for (let i = index + 2; i < this.pages.length; i++) {
	    		this.pages[i].index(i);
	    	}
	    		if (!blank) {
	    		// Listen for page overflow
	    		page.onOverflow((overflowToken) => {
	    			if (total < this.pages.length) {
	    				this.pages[total].layout(this.source, overflowToken);
	    			} else {
	    				let newPage = this.addPage();
	    				newPage.layout(this.source, overflowToken);
	    			}
	    		});
	    			page.onUnderflow(() => {
	    			// console.log("underflow on", page.id);
	    		});
	    	}
	    		this.total += 1;
	    		return page;
	    }
	    */

	  }, {
	    key: "loadFonts",
	    value: function loadFonts() {
	      var fontPromises = [];
	      (document.fonts || []).forEach(function (fontFace) {
	        if (fontFace.status !== "loaded") {
	          var fontLoaded = fontFace.load().then(function (r) {
	            return fontFace.family;
	          }, function (r) {
	            console.warn("Failed to preload font-family:", fontFace.family);
	            return fontFace.family;
	          });
	          fontPromises.push(fontLoaded);
	        }
	      });
	      return Promise.all(fontPromises)["catch"](function (err) {
	        console.warn(err);
	      });
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.pagesArea.remove();
	      this.pageTemplate.remove();
	    }
	  }]);
	  return Chunker;
	}();

	(0, _eventEmitter["default"])(Chunker.prototype);
	var _default = Chunker;
	exports["default"] = _default;
	});

	unwrapExports(chunker);

	//
	//                              list
	//                            ┌──────┐
	//             ┌──────────────┼─head │
	//             │              │ tail─┼──────────────┐
	//             │              └──────┘              │
	//             ▼                                    ▼
	//            item        item        item        item
	//          ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐
	//  null ◀──┼─prev │◀───┼─prev │◀───┼─prev │◀───┼─prev │
	//          │ next─┼───▶│ next─┼───▶│ next─┼───▶│ next─┼──▶ null
	//          ├──────┤    ├──────┤    ├──────┤    ├──────┤
	//          │ data │    │ data │    │ data │    │ data │
	//          └──────┘    └──────┘    └──────┘    └──────┘
	//

	function createItem(data) {
	    return {
	        prev: null,
	        next: null,
	        data: data
	    };
	}

	function allocateCursor(node, prev, next) {
	    var cursor;

	    if (cursors !== null) {
	        cursor = cursors;
	        cursors = cursors.cursor;
	        cursor.prev = prev;
	        cursor.next = next;
	        cursor.cursor = node.cursor;
	    } else {
	        cursor = {
	            prev: prev,
	            next: next,
	            cursor: node.cursor
	        };
	    }

	    node.cursor = cursor;

	    return cursor;
	}

	function releaseCursor(node) {
	    var cursor = node.cursor;

	    node.cursor = cursor.cursor;
	    cursor.prev = null;
	    cursor.next = null;
	    cursor.cursor = cursors;
	    cursors = cursor;
	}

	var cursors = null;
	var List = function() {
	    this.cursor = null;
	    this.head = null;
	    this.tail = null;
	};

	List.createItem = createItem;
	List.prototype.createItem = createItem;

	List.prototype.updateCursors = function(prevOld, prevNew, nextOld, nextNew) {
	    var cursor = this.cursor;

	    while (cursor !== null) {
	        if (cursor.prev === prevOld) {
	            cursor.prev = prevNew;
	        }

	        if (cursor.next === nextOld) {
	            cursor.next = nextNew;
	        }

	        cursor = cursor.cursor;
	    }
	};

	List.prototype.getSize = function() {
	    var size = 0;
	    var cursor = this.head;

	    while (cursor) {
	        size++;
	        cursor = cursor.next;
	    }

	    return size;
	};

	List.prototype.fromArray = function(array) {
	    var cursor = null;

	    this.head = null;

	    for (var i = 0; i < array.length; i++) {
	        var item = createItem(array[i]);

	        if (cursor !== null) {
	            cursor.next = item;
	        } else {
	            this.head = item;
	        }

	        item.prev = cursor;
	        cursor = item;
	    }

	    this.tail = cursor;

	    return this;
	};

	List.prototype.toArray = function() {
	    var cursor = this.head;
	    var result = [];

	    while (cursor) {
	        result.push(cursor.data);
	        cursor = cursor.next;
	    }

	    return result;
	};

	List.prototype.toJSON = List.prototype.toArray;

	List.prototype.isEmpty = function() {
	    return this.head === null;
	};

	List.prototype.first = function() {
	    return this.head && this.head.data;
	};

	List.prototype.last = function() {
	    return this.tail && this.tail.data;
	};

	List.prototype.each = function(fn, context) {
	    var item;

	    if (context === undefined) {
	        context = this;
	    }

	    // push cursor
	    var cursor = allocateCursor(this, null, this.head);

	    while (cursor.next !== null) {
	        item = cursor.next;
	        cursor.next = item.next;

	        fn.call(context, item.data, item, this);
	    }

	    // pop cursor
	    releaseCursor(this);
	};

	List.prototype.forEach = List.prototype.each;

	List.prototype.eachRight = function(fn, context) {
	    var item;

	    if (context === undefined) {
	        context = this;
	    }

	    // push cursor
	    var cursor = allocateCursor(this, this.tail, null);

	    while (cursor.prev !== null) {
	        item = cursor.prev;
	        cursor.prev = item.prev;

	        fn.call(context, item.data, item, this);
	    }

	    // pop cursor
	    releaseCursor(this);
	};

	List.prototype.forEachRight = List.prototype.eachRight;

	List.prototype.nextUntil = function(start, fn, context) {
	    if (start === null) {
	        return;
	    }

	    var item;

	    if (context === undefined) {
	        context = this;
	    }

	    // push cursor
	    var cursor = allocateCursor(this, null, start);

	    while (cursor.next !== null) {
	        item = cursor.next;
	        cursor.next = item.next;

	        if (fn.call(context, item.data, item, this)) {
	            break;
	        }
	    }

	    // pop cursor
	    releaseCursor(this);
	};

	List.prototype.prevUntil = function(start, fn, context) {
	    if (start === null) {
	        return;
	    }

	    var item;

	    if (context === undefined) {
	        context = this;
	    }

	    // push cursor
	    var cursor = allocateCursor(this, start, null);

	    while (cursor.prev !== null) {
	        item = cursor.prev;
	        cursor.prev = item.prev;

	        if (fn.call(context, item.data, item, this)) {
	            break;
	        }
	    }

	    // pop cursor
	    releaseCursor(this);
	};

	List.prototype.some = function(fn, context) {
	    var cursor = this.head;

	    if (context === undefined) {
	        context = this;
	    }

	    while (cursor !== null) {
	        if (fn.call(context, cursor.data, cursor, this)) {
	            return true;
	        }

	        cursor = cursor.next;
	    }

	    return false;
	};

	List.prototype.map = function(fn, context) {
	    var result = new List();
	    var cursor = this.head;

	    if (context === undefined) {
	        context = this;
	    }

	    while (cursor !== null) {
	        result.appendData(fn.call(context, cursor.data, cursor, this));
	        cursor = cursor.next;
	    }

	    return result;
	};

	List.prototype.filter = function(fn, context) {
	    var result = new List();
	    var cursor = this.head;

	    if (context === undefined) {
	        context = this;
	    }

	    while (cursor !== null) {
	        if (fn.call(context, cursor.data, cursor, this)) {
	            result.appendData(cursor.data);
	        }
	        cursor = cursor.next;
	    }

	    return result;
	};

	List.prototype.clear = function() {
	    this.head = null;
	    this.tail = null;
	};

	List.prototype.copy = function() {
	    var result = new List();
	    var cursor = this.head;

	    while (cursor !== null) {
	        result.insert(createItem(cursor.data));
	        cursor = cursor.next;
	    }

	    return result;
	};

	List.prototype.prepend = function(item) {
	    //      head
	    //    ^
	    // item
	    this.updateCursors(null, item, this.head, item);

	    // insert to the beginning of the list
	    if (this.head !== null) {
	        // new item <- first item
	        this.head.prev = item;

	        // new item -> first item
	        item.next = this.head;
	    } else {
	        // if list has no head, then it also has no tail
	        // in this case tail points to the new item
	        this.tail = item;
	    }

	    // head always points to new item
	    this.head = item;

	    return this;
	};

	List.prototype.prependData = function(data) {
	    return this.prepend(createItem(data));
	};

	List.prototype.append = function(item) {
	    return this.insert(item);
	};

	List.prototype.appendData = function(data) {
	    return this.insert(createItem(data));
	};

	List.prototype.insert = function(item, before) {
	    if (before !== undefined && before !== null) {
	        // prev   before
	        //      ^
	        //     item
	        this.updateCursors(before.prev, item, before, item);

	        if (before.prev === null) {
	            // insert to the beginning of list
	            if (this.head !== before) {
	                throw new Error('before doesn\'t belong to list');
	            }

	            // since head points to before therefore list doesn't empty
	            // no need to check tail
	            this.head = item;
	            before.prev = item;
	            item.next = before;

	            this.updateCursors(null, item);
	        } else {

	            // insert between two items
	            before.prev.next = item;
	            item.prev = before.prev;

	            before.prev = item;
	            item.next = before;
	        }
	    } else {
	        // tail
	        //      ^
	        //      item
	        this.updateCursors(this.tail, item, null, item);

	        // insert to the ending of the list
	        if (this.tail !== null) {
	            // last item -> new item
	            this.tail.next = item;

	            // last item <- new item
	            item.prev = this.tail;
	        } else {
	            // if list has no tail, then it also has no head
	            // in this case head points to new item
	            this.head = item;
	        }

	        // tail always points to new item
	        this.tail = item;
	    }

	    return this;
	};

	List.prototype.insertData = function(data, before) {
	    return this.insert(createItem(data), before);
	};

	List.prototype.remove = function(item) {
	    //      item
	    //       ^
	    // prev     next
	    this.updateCursors(item, item.prev, item, item.next);

	    if (item.prev !== null) {
	        item.prev.next = item.next;
	    } else {
	        if (this.head !== item) {
	            throw new Error('item doesn\'t belong to list');
	        }

	        this.head = item.next;
	    }

	    if (item.next !== null) {
	        item.next.prev = item.prev;
	    } else {
	        if (this.tail !== item) {
	            throw new Error('item doesn\'t belong to list');
	        }

	        this.tail = item.prev;
	    }

	    item.prev = null;
	    item.next = null;

	    return item;
	};

	List.prototype.push = function(data) {
	    this.insert(createItem(data));
	};

	List.prototype.pop = function() {
	    if (this.tail !== null) {
	        return this.remove(this.tail);
	    }
	};

	List.prototype.unshift = function(data) {
	    this.prepend(createItem(data));
	};

	List.prototype.shift = function() {
	    if (this.head !== null) {
	        return this.remove(this.head);
	    }
	};

	List.prototype.prependList = function(list) {
	    return this.insertList(list, this.head);
	};

	List.prototype.appendList = function(list) {
	    return this.insertList(list);
	};

	List.prototype.insertList = function(list, before) {
	    // ignore empty lists
	    if (list.head === null) {
	        return this;
	    }

	    if (before !== undefined && before !== null) {
	        this.updateCursors(before.prev, list.tail, before, list.head);

	        // insert in the middle of dist list
	        if (before.prev !== null) {
	            // before.prev <-> list.head
	            before.prev.next = list.head;
	            list.head.prev = before.prev;
	        } else {
	            this.head = list.head;
	        }

	        before.prev = list.tail;
	        list.tail.next = before;
	    } else {
	        this.updateCursors(this.tail, list.tail, null, list.head);

	        // insert to end of the list
	        if (this.tail !== null) {
	            // if destination list has a tail, then it also has a head,
	            // but head doesn't change

	            // dest tail -> source head
	            this.tail.next = list.head;

	            // dest tail <- source head
	            list.head.prev = this.tail;
	        } else {
	            // if list has no a tail, then it also has no a head
	            // in this case points head to new item
	            this.head = list.head;
	        }

	        // tail always start point to new item
	        this.tail = list.tail;
	    }

	    list.head = null;
	    list.tail = null;

	    return this;
	};

	List.prototype.replace = function(oldItem, newItemOrList) {
	    if ('head' in newItemOrList) {
	        this.insertList(newItemOrList, oldItem);
	    } else {
	        this.insert(newItemOrList, oldItem);
	    }

	    this.remove(oldItem);
	};

	var List_1 = List;

	var createCustomError = function createCustomError(name, message) {
	    // use Object.create(), because some VMs prevent setting line/column otherwise
	    // (iOS Safari 10 even throws an exception)
	    var error = Object.create(SyntaxError.prototype);
	    var errorStack = new Error();

	    error.name = name;
	    error.message = message;

	    Object.defineProperty(error, 'stack', {
	        get: function() {
	            return (errorStack.stack || '').replace(/^(.+\n){1,3}/, name + ': ' + message + '\n');
	        }
	    });

	    return error;
	};

	var MAX_LINE_LENGTH = 100;
	var OFFSET_CORRECTION = 60;
	var TAB_REPLACEMENT = '    ';

	function sourceFragment(error, extraLines) {
	    function processLines(start, end) {
	        return lines.slice(start, end).map(function(line, idx) {
	            var num = String(start + idx + 1);

	            while (num.length < maxNumLength) {
	                num = ' ' + num;
	            }

	            return num + ' |' + line;
	        }).join('\n');
	    }

	    var lines = error.source.split(/\r\n?|\n|\f/);
	    var line = error.line;
	    var column = error.column;
	    var startLine = Math.max(1, line - extraLines) - 1;
	    var endLine = Math.min(line + extraLines, lines.length + 1);
	    var maxNumLength = Math.max(4, String(endLine).length) + 1;
	    var cutLeft = 0;

	    // column correction according to replaced tab before column
	    column += (TAB_REPLACEMENT.length - 1) * (lines[line - 1].substr(0, column - 1).match(/\t/g) || []).length;

	    if (column > MAX_LINE_LENGTH) {
	        cutLeft = column - OFFSET_CORRECTION + 3;
	        column = OFFSET_CORRECTION - 2;
	    }

	    for (var i = startLine; i <= endLine; i++) {
	        if (i >= 0 && i < lines.length) {
	            lines[i] = lines[i].replace(/\t/g, TAB_REPLACEMENT);
	            lines[i] =
	                (cutLeft > 0 && lines[i].length > cutLeft ? '\u2026' : '') +
	                lines[i].substr(cutLeft, MAX_LINE_LENGTH - 2) +
	                (lines[i].length > cutLeft + MAX_LINE_LENGTH - 1 ? '\u2026' : '');
	        }
	    }

	    return [
	        processLines(startLine, line),
	        new Array(column + maxNumLength + 2).join('-') + '^',
	        processLines(line, endLine)
	    ].filter(Boolean).join('\n');
	}

	var SyntaxError$1 = function(message, source, offset, line, column) {
	    var error = createCustomError('SyntaxError', message);

	    error.source = source;
	    error.offset = offset;
	    error.line = line;
	    error.column = column;

	    error.sourceFragment = function(extraLines) {
	        return sourceFragment(error, isNaN(extraLines) ? 0 : extraLines);
	    };
	    Object.defineProperty(error, 'formattedMessage', {
	        get: function() {
	            return (
	                'Parse error: ' + error.message + '\n' +
	                sourceFragment(error, 2)
	            );
	        }
	    });

	    // for backward capability
	    error.parseError = {
	        offset: offset,
	        line: line,
	        column: column
	    };

	    return error;
	};

	var _SyntaxError = SyntaxError$1;

	// CSS Syntax Module Level 3
	// https://www.w3.org/TR/css-syntax-3/
	var TYPE = {
	    EOF: 0,                 // <EOF-token>
	    Ident: 1,               // <ident-token>
	    Function: 2,            // <function-token>
	    AtKeyword: 3,           // <at-keyword-token>
	    Hash: 4,                // <hash-token>
	    String: 5,              // <string-token>
	    BadString: 6,           // <bad-string-token>
	    Url: 7,                 // <url-token>
	    BadUrl: 8,              // <bad-url-token>
	    Delim: 9,               // <delim-token>
	    Number: 10,             // <number-token>
	    Percentage: 11,         // <percentage-token>
	    Dimension: 12,          // <dimension-token>
	    WhiteSpace: 13,         // <whitespace-token>
	    CDO: 14,                // <CDO-token>
	    CDC: 15,                // <CDC-token>
	    Colon: 16,              // <colon-token>     :
	    Semicolon: 17,          // <semicolon-token> ;
	    Comma: 18,              // <comma-token>     ,
	    LeftSquareBracket: 19,  // <[-token>
	    RightSquareBracket: 20, // <]-token>
	    LeftParenthesis: 21,    // <(-token>
	    RightParenthesis: 22,   // <)-token>
	    LeftCurlyBracket: 23,   // <{-token>
	    RightCurlyBracket: 24,  // <}-token>
	    Comment: 25
	};

	var NAME = Object.keys(TYPE).reduce(function(result, key) {
	    result[TYPE[key]] = key;
	    return result;
	}, {});

	var _const = {
	    TYPE: TYPE,
	    NAME: NAME
	};

	var EOF = 0;

	// https://drafts.csswg.org/css-syntax-3/
	// § 4.2. Definitions

	// digit
	// A code point between U+0030 DIGIT ZERO (0) and U+0039 DIGIT NINE (9).
	function isDigit(code) {
	    return code >= 0x0030 && code <= 0x0039;
	}

	// hex digit
	// A digit, or a code point between U+0041 LATIN CAPITAL LETTER A (A) and U+0046 LATIN CAPITAL LETTER F (F),
	// or a code point between U+0061 LATIN SMALL LETTER A (a) and U+0066 LATIN SMALL LETTER F (f).
	function isHexDigit(code) {
	    return (
	        isDigit(code) || // 0 .. 9
	        (code >= 0x0041 && code <= 0x0046) || // A .. F
	        (code >= 0x0061 && code <= 0x0066)    // a .. f
	    );
	}

	// uppercase letter
	// A code point between U+0041 LATIN CAPITAL LETTER A (A) and U+005A LATIN CAPITAL LETTER Z (Z).
	function isUppercaseLetter(code) {
	    return code >= 0x0041 && code <= 0x005A;
	}

	// lowercase letter
	// A code point between U+0061 LATIN SMALL LETTER A (a) and U+007A LATIN SMALL LETTER Z (z).
	function isLowercaseLetter(code) {
	    return code >= 0x0061 && code <= 0x007A;
	}

	// letter
	// An uppercase letter or a lowercase letter.
	function isLetter(code) {
	    return isUppercaseLetter(code) || isLowercaseLetter(code);
	}

	// non-ASCII code point
	// A code point with a value equal to or greater than U+0080 <control>.
	function isNonAscii(code) {
	    return code >= 0x0080;
	}

	// name-start code point
	// A letter, a non-ASCII code point, or U+005F LOW LINE (_).
	function isNameStart(code) {
	    return isLetter(code) || isNonAscii(code) || code === 0x005F;
	}

	// name code point
	// A name-start code point, a digit, or U+002D HYPHEN-MINUS (-).
	function isName(code) {
	    return isNameStart(code) || isDigit(code) || code === 0x002D;
	}

	// non-printable code point
	// A code point between U+0000 NULL and U+0008 BACKSPACE, or U+000B LINE TABULATION,
	// or a code point between U+000E SHIFT OUT and U+001F INFORMATION SEPARATOR ONE, or U+007F DELETE.
	function isNonPrintable(code) {
	    return (
	        (code >= 0x0000 && code <= 0x0008) ||
	        (code === 0x000B) ||
	        (code >= 0x000E && code <= 0x001F) ||
	        (code === 0x007F)
	    );
	}

	// newline
	// U+000A LINE FEED. Note that U+000D CARRIAGE RETURN and U+000C FORM FEED are not included in this definition,
	// as they are converted to U+000A LINE FEED during preprocessing.
	// TODO: we doesn't do a preprocessing, so check a code point for U+000D CARRIAGE RETURN and U+000C FORM FEED
	function isNewline(code) {
	    return code === 0x000A || code === 0x000D || code === 0x000C;
	}

	// whitespace
	// A newline, U+0009 CHARACTER TABULATION, or U+0020 SPACE.
	function isWhiteSpace(code) {
	    return isNewline(code) || code === 0x0020 || code === 0x0009;
	}

	// § 4.3.8. Check if two code points are a valid escape
	function isValidEscape(first, second) {
	    // If the first code point is not U+005C REVERSE SOLIDUS (\), return false.
	    if (first !== 0x005C) {
	        return false;
	    }

	    // Otherwise, if the second code point is a newline or EOF, return false.
	    if (isNewline(second) || second === EOF) {
	        return false;
	    }

	    // Otherwise, return true.
	    return true;
	}

	// § 4.3.9. Check if three code points would start an identifier
	function isIdentifierStart(first, second, third) {
	    // Look at the first code point:

	    // U+002D HYPHEN-MINUS
	    if (first === 0x002D) {
	        // If the second code point is a name-start code point or a U+002D HYPHEN-MINUS,
	        // or the second and third code points are a valid escape, return true. Otherwise, return false.
	        return (
	            isNameStart(second) ||
	            second === 0x002D ||
	            isValidEscape(second, third)
	        );
	    }

	    // name-start code point
	    if (isNameStart(first)) {
	        // Return true.
	        return true;
	    }

	    // U+005C REVERSE SOLIDUS (\)
	    if (first === 0x005C) {
	        // If the first and second code points are a valid escape, return true. Otherwise, return false.
	        return isValidEscape(first, second);
	    }

	    // anything else
	    // Return false.
	    return false;
	}

	// § 4.3.10. Check if three code points would start a number
	function isNumberStart(first, second, third) {
	    // Look at the first code point:

	    // U+002B PLUS SIGN (+)
	    // U+002D HYPHEN-MINUS (-)
	    if (first === 0x002B || first === 0x002D) {
	        // If the second code point is a digit, return true.
	        if (isDigit(second)) {
	            return 2;
	        }

	        // Otherwise, if the second code point is a U+002E FULL STOP (.)
	        // and the third code point is a digit, return true.
	        // Otherwise, return false.
	        return second === 0x002E && isDigit(third) ? 3 : 0;
	    }

	    // U+002E FULL STOP (.)
	    if (first === 0x002E) {
	        // If the second code point is a digit, return true. Otherwise, return false.
	        return isDigit(second) ? 2 : 0;
	    }

	    // digit
	    if (isDigit(first)) {
	        // Return true.
	        return 1;
	    }

	    // anything else
	    // Return false.
	    return 0;
	}

	//
	// Misc
	//

	// detect BOM (https://en.wikipedia.org/wiki/Byte_order_mark)
	function isBOM(code) {
	    // UTF-16BE
	    if (code === 0xFEFF) {
	        return 1;
	    }

	    // UTF-16LE
	    if (code === 0xFFFE) {
	        return 1;
	    }

	    return 0;
	}

	// Fast code category
	//
	// https://drafts.csswg.org/css-syntax/#tokenizer-definitions
	// > non-ASCII code point
	// >   A code point with a value equal to or greater than U+0080 <control>
	// > name-start code point
	// >   A letter, a non-ASCII code point, or U+005F LOW LINE (_).
	// > name code point
	// >   A name-start code point, a digit, or U+002D HYPHEN-MINUS (-)
	// That means only ASCII code points has a special meaning and we define a maps for 0..127 codes only
	var CATEGORY = new Array(0x80);
	charCodeCategory.Eof = 0x80;
	charCodeCategory.WhiteSpace = 0x82;
	charCodeCategory.Digit = 0x83;
	charCodeCategory.NameStart = 0x84;
	charCodeCategory.NonPrintable = 0x85;

	for (var i = 0; i < CATEGORY.length; i++) {
	    switch (true) {
	        case isWhiteSpace(i):
	            CATEGORY[i] = charCodeCategory.WhiteSpace;
	            break;

	        case isDigit(i):
	            CATEGORY[i] = charCodeCategory.Digit;
	            break;

	        case isNameStart(i):
	            CATEGORY[i] = charCodeCategory.NameStart;
	            break;

	        case isNonPrintable(i):
	            CATEGORY[i] = charCodeCategory.NonPrintable;
	            break;

	        default:
	            CATEGORY[i] = i || charCodeCategory.Eof;
	    }
	}

	function charCodeCategory(code) {
	    return code < 0x80 ? CATEGORY[code] : charCodeCategory.NameStart;
	}
	var charCodeDefinitions = {
	    isDigit: isDigit,
	    isHexDigit: isHexDigit,
	    isUppercaseLetter: isUppercaseLetter,
	    isLowercaseLetter: isLowercaseLetter,
	    isLetter: isLetter,
	    isNonAscii: isNonAscii,
	    isNameStart: isNameStart,
	    isName: isName,
	    isNonPrintable: isNonPrintable,
	    isNewline: isNewline,
	    isWhiteSpace: isWhiteSpace,
	    isValidEscape: isValidEscape,
	    isIdentifierStart: isIdentifierStart,
	    isNumberStart: isNumberStart,

	    isBOM: isBOM,
	    charCodeCategory: charCodeCategory
	};

	var isDigit$1 = charCodeDefinitions.isDigit;
	var isHexDigit$1 = charCodeDefinitions.isHexDigit;
	var isUppercaseLetter$1 = charCodeDefinitions.isUppercaseLetter;
	var isName$1 = charCodeDefinitions.isName;
	var isWhiteSpace$1 = charCodeDefinitions.isWhiteSpace;
	var isValidEscape$1 = charCodeDefinitions.isValidEscape;

	function getCharCode(source, offset) {
	    return offset < source.length ? source.charCodeAt(offset) : 0;
	}

	function getNewlineLength(source, offset, code) {
	    if (code === 13 /* \r */ && getCharCode(source, offset + 1) === 10 /* \n */) {
	        return 2;
	    }

	    return 1;
	}

	function cmpChar(testStr, offset, referenceCode) {
	    var code = testStr.charCodeAt(offset);

	    // code.toLowerCase() for A..Z
	    if (isUppercaseLetter$1(code)) {
	        code = code | 32;
	    }

	    return code === referenceCode;
	}

	function cmpStr(testStr, start, end, referenceStr) {
	    if (end - start !== referenceStr.length) {
	        return false;
	    }

	    if (start < 0 || end > testStr.length) {
	        return false;
	    }

	    for (var i = start; i < end; i++) {
	        var testCode = testStr.charCodeAt(i);
	        var referenceCode = referenceStr.charCodeAt(i - start);

	        // testCode.toLowerCase() for A..Z
	        if (isUppercaseLetter$1(testCode)) {
	            testCode = testCode | 32;
	        }

	        if (testCode !== referenceCode) {
	            return false;
	        }
	    }

	    return true;
	}

	function findWhiteSpaceStart(source, offset) {
	    for (; offset >= 0; offset--) {
	        if (!isWhiteSpace$1(source.charCodeAt(offset))) {
	            break;
	        }
	    }

	    return offset + 1;
	}

	function findWhiteSpaceEnd(source, offset) {
	    for (; offset < source.length; offset++) {
	        if (!isWhiteSpace$1(source.charCodeAt(offset))) {
	            break;
	        }
	    }

	    return offset;
	}

	function findDecimalNumberEnd(source, offset) {
	    for (; offset < source.length; offset++) {
	        if (!isDigit$1(source.charCodeAt(offset))) {
	            break;
	        }
	    }

	    return offset;
	}

	// § 4.3.7. Consume an escaped code point
	function consumeEscaped(source, offset) {
	    // It assumes that the U+005C REVERSE SOLIDUS (\) has already been consumed and
	    // that the next input code point has already been verified to be part of a valid escape.
	    offset += 2;

	    // hex digit
	    if (isHexDigit$1(getCharCode(source, offset - 1))) {
	        // Consume as many hex digits as possible, but no more than 5.
	        // Note that this means 1-6 hex digits have been consumed in total.
	        for (var maxOffset = Math.min(source.length, offset + 5); offset < maxOffset; offset++) {
	            if (!isHexDigit$1(getCharCode(source, offset))) {
	                break;
	            }
	        }

	        // If the next input code point is whitespace, consume it as well.
	        var code = getCharCode(source, offset);
	        if (isWhiteSpace$1(code)) {
	            offset += getNewlineLength(source, offset, code);
	        }
	    }

	    return offset;
	}

	// §4.3.11. Consume a name
	// Note: This algorithm does not do the verification of the first few code points that are necessary
	// to ensure the returned code points would constitute an <ident-token>. If that is the intended use,
	// ensure that the stream starts with an identifier before calling this algorithm.
	function consumeName(source, offset) {
	    // Let result initially be an empty string.
	    // Repeatedly consume the next input code point from the stream:
	    for (; offset < source.length; offset++) {
	        var code = source.charCodeAt(offset);

	        // name code point
	        if (isName$1(code)) {
	            // Append the code point to result.
	            continue;
	        }

	        // the stream starts with a valid escape
	        if (isValidEscape$1(code, getCharCode(source, offset + 1))) {
	            // Consume an escaped code point. Append the returned code point to result.
	            offset = consumeEscaped(source, offset) - 1;
	            continue;
	        }

	        // anything else
	        // Reconsume the current input code point. Return result.
	        break;
	    }

	    return offset;
	}

	// §4.3.12. Consume a number
	function consumeNumber(source, offset) {
	    var code = source.charCodeAt(offset);

	    // 2. If the next input code point is U+002B PLUS SIGN (+) or U+002D HYPHEN-MINUS (-),
	    // consume it and append it to repr.
	    if (code === 0x002B || code === 0x002D) {
	        code = source.charCodeAt(offset += 1);
	    }

	    // 3. While the next input code point is a digit, consume it and append it to repr.
	    if (isDigit$1(code)) {
	        offset = findDecimalNumberEnd(source, offset + 1);
	        code = source.charCodeAt(offset);
	    }

	    // 4. If the next 2 input code points are U+002E FULL STOP (.) followed by a digit, then:
	    if (code === 0x002E && isDigit$1(source.charCodeAt(offset + 1))) {
	        // 4.1 Consume them.
	        // 4.2 Append them to repr.
	        code = source.charCodeAt(offset += 2);

	        // 4.3 Set type to "number".
	        // TODO

	        // 4.4 While the next input code point is a digit, consume it and append it to repr.

	        offset = findDecimalNumberEnd(source, offset);
	    }

	    // 5. If the next 2 or 3 input code points are U+0045 LATIN CAPITAL LETTER E (E)
	    // or U+0065 LATIN SMALL LETTER E (e), ... , followed by a digit, then:
	    if (cmpChar(source, offset, 101 /* e */)) {
	        var sign = 0;
	        code = source.charCodeAt(offset + 1);

	        // ... optionally followed by U+002D HYPHEN-MINUS (-) or U+002B PLUS SIGN (+) ...
	        if (code === 0x002D || code === 0x002B) {
	            sign = 1;
	            code = source.charCodeAt(offset + 2);
	        }

	        // ... followed by a digit
	        if (isDigit$1(code)) {
	            // 5.1 Consume them.
	            // 5.2 Append them to repr.

	            // 5.3 Set type to "number".
	            // TODO

	            // 5.4 While the next input code point is a digit, consume it and append it to repr.
	            offset = findDecimalNumberEnd(source, offset + 1 + sign + 1);
	        }
	    }

	    return offset;
	}

	// § 4.3.14. Consume the remnants of a bad url
	// ... its sole use is to consume enough of the input stream to reach a recovery point
	// where normal tokenizing can resume.
	function consumeBadUrlRemnants(source, offset) {
	    // Repeatedly consume the next input code point from the stream:
	    for (; offset < source.length; offset++) {
	        var code = source.charCodeAt(offset);

	        // U+0029 RIGHT PARENTHESIS ())
	        // EOF
	        if (code === 0x0029) {
	            // Return.
	            offset++;
	            break;
	        }

	        if (isValidEscape$1(code, getCharCode(source, offset + 1))) {
	            // Consume an escaped code point.
	            // Note: This allows an escaped right parenthesis ("\)") to be encountered
	            // without ending the <bad-url-token>. This is otherwise identical to
	            // the "anything else" clause.
	            offset = consumeEscaped(source, offset);
	        }
	    }

	    return offset;
	}

	var utils$1 = {
	    consumeEscaped: consumeEscaped,
	    consumeName: consumeName,
	    consumeNumber: consumeNumber,
	    consumeBadUrlRemnants: consumeBadUrlRemnants,

	    cmpChar: cmpChar,
	    cmpStr: cmpStr,

	    getNewlineLength: getNewlineLength,
	    findWhiteSpaceStart: findWhiteSpaceStart,
	    findWhiteSpaceEnd: findWhiteSpaceEnd
	};

	var TYPE$1 = _const.TYPE;
	var NAME$1 = _const.NAME;


	var cmpStr$1 = utils$1.cmpStr;

	var EOF$1 = TYPE$1.EOF;
	var WHITESPACE = TYPE$1.WhiteSpace;
	var COMMENT = TYPE$1.Comment;

	var OFFSET_MASK = 0x00FFFFFF;
	var TYPE_SHIFT = 24;

	var TokenStream = function() {
	    this.offsetAndType = null;
	    this.balance = null;

	    this.reset();
	};

	TokenStream.prototype = {
	    reset: function() {
	        this.eof = false;
	        this.tokenIndex = -1;
	        this.tokenType = 0;
	        this.tokenStart = this.firstCharOffset;
	        this.tokenEnd = this.firstCharOffset;
	    },

	    lookupType: function(offset) {
	        offset += this.tokenIndex;

	        if (offset < this.tokenCount) {
	            return this.offsetAndType[offset] >> TYPE_SHIFT;
	        }

	        return EOF$1;
	    },
	    lookupOffset: function(offset) {
	        offset += this.tokenIndex;

	        if (offset < this.tokenCount) {
	            return this.offsetAndType[offset - 1] & OFFSET_MASK;
	        }

	        return this.source.length;
	    },
	    lookupValue: function(offset, referenceStr) {
	        offset += this.tokenIndex;

	        if (offset < this.tokenCount) {
	            return cmpStr$1(
	                this.source,
	                this.offsetAndType[offset - 1] & OFFSET_MASK,
	                this.offsetAndType[offset] & OFFSET_MASK,
	                referenceStr
	            );
	        }

	        return false;
	    },
	    getTokenStart: function(tokenIndex) {
	        if (tokenIndex === this.tokenIndex) {
	            return this.tokenStart;
	        }

	        if (tokenIndex > 0) {
	            return tokenIndex < this.tokenCount
	                ? this.offsetAndType[tokenIndex - 1] & OFFSET_MASK
	                : this.offsetAndType[this.tokenCount] & OFFSET_MASK;
	        }

	        return this.firstCharOffset;
	    },

	    // TODO: -> skipUntilBalanced
	    getRawLength: function(startToken, mode) {
	        var cursor = startToken;
	        var balanceEnd;
	        var offset = this.offsetAndType[Math.max(cursor - 1, 0)] & OFFSET_MASK;
	        var type;

	        loop:
	        for (; cursor < this.tokenCount; cursor++) {
	            balanceEnd = this.balance[cursor];

	            // stop scanning on balance edge that points to offset before start token
	            if (balanceEnd < startToken) {
	                break loop;
	            }

	            type = this.offsetAndType[cursor] >> TYPE_SHIFT;

	            // check token is stop type
	            switch (mode(type, this.source, offset)) {
	                case 1:
	                    break loop;

	                case 2:
	                    cursor++;
	                    break loop;

	                default:
	                    offset = this.offsetAndType[cursor] & OFFSET_MASK;

	                    // fast forward to the end of balanced block
	                    if (this.balance[balanceEnd] === cursor) {
	                        cursor = balanceEnd;
	                    }
	            }
	        }

	        return cursor - this.tokenIndex;
	    },
	    isBalanceEdge: function(pos) {
	        return this.balance[this.tokenIndex] < pos;
	    },
	    isDelim: function(code, offset) {
	        if (offset) {
	            return (
	                this.lookupType(offset) === TYPE$1.Delim &&
	                this.source.charCodeAt(this.lookupOffset(offset)) === code
	            );
	        }

	        return (
	            this.tokenType === TYPE$1.Delim &&
	            this.source.charCodeAt(this.tokenStart) === code
	        );
	    },

	    getTokenValue: function() {
	        return this.source.substring(this.tokenStart, this.tokenEnd);
	    },
	    getTokenLength: function() {
	        return this.tokenEnd - this.tokenStart;
	    },
	    substrToCursor: function(start) {
	        return this.source.substring(start, this.tokenStart);
	    },

	    skipWS: function() {
	        for (var i = this.tokenIndex, skipTokenCount = 0; i < this.tokenCount; i++, skipTokenCount++) {
	            if ((this.offsetAndType[i] >> TYPE_SHIFT) !== WHITESPACE) {
	                break;
	            }
	        }

	        if (skipTokenCount > 0) {
	            this.skip(skipTokenCount);
	        }
	    },
	    skipSC: function() {
	        while (this.tokenType === WHITESPACE || this.tokenType === COMMENT) {
	            this.next();
	        }
	    },
	    skip: function(tokenCount) {
	        var next = this.tokenIndex + tokenCount;

	        if (next < this.tokenCount) {
	            this.tokenIndex = next;
	            this.tokenStart = this.offsetAndType[next - 1] & OFFSET_MASK;
	            next = this.offsetAndType[next];
	            this.tokenType = next >> TYPE_SHIFT;
	            this.tokenEnd = next & OFFSET_MASK;
	        } else {
	            this.tokenIndex = this.tokenCount;
	            this.next();
	        }
	    },
	    next: function() {
	        var next = this.tokenIndex + 1;

	        if (next < this.tokenCount) {
	            this.tokenIndex = next;
	            this.tokenStart = this.tokenEnd;
	            next = this.offsetAndType[next];
	            this.tokenType = next >> TYPE_SHIFT;
	            this.tokenEnd = next & OFFSET_MASK;
	        } else {
	            this.tokenIndex = this.tokenCount;
	            this.eof = true;
	            this.tokenType = EOF$1;
	            this.tokenStart = this.tokenEnd = this.source.length;
	        }
	    },

	    dump: function() {
	        var offset = this.firstCharOffset;

	        return Array.prototype.slice.call(this.offsetAndType, 0, this.tokenCount).map(function(item, idx) {
	            var start = offset;
	            var end = item & OFFSET_MASK;

	            offset = end;

	            return {
	                idx: idx,
	                type: NAME$1[item >> TYPE_SHIFT],
	                chunk: this.source.substring(start, end),
	                balance: this.balance[idx]
	            };
	        }, this);
	    }
	};

	var TokenStream_1 = TokenStream;

	function noop$1(value) {
	    return value;
	}

	function generateMultiplier(multiplier) {
	    if (multiplier.min === 0 && multiplier.max === 0) {
	        return '*';
	    }

	    if (multiplier.min === 0 && multiplier.max === 1) {
	        return '?';
	    }

	    if (multiplier.min === 1 && multiplier.max === 0) {
	        return multiplier.comma ? '#' : '+';
	    }

	    if (multiplier.min === 1 && multiplier.max === 1) {
	        return '';
	    }

	    return (
	        (multiplier.comma ? '#' : '') +
	        (multiplier.min === multiplier.max
	            ? '{' + multiplier.min + '}'
	            : '{' + multiplier.min + ',' + (multiplier.max !== 0 ? multiplier.max : '') + '}'
	        )
	    );
	}

	function generateTypeOpts(node) {
	    switch (node.type) {
	        case 'Range':
	            return (
	                ' [' +
	                (node.min === null ? '-∞' : node.min) +
	                ',' +
	                (node.max === null ? '∞' : node.max) +
	                ']'
	            );

	        default:
	            throw new Error('Unknown node type `' + node.type + '`');
	    }
	}

	function generateSequence(node, decorate, forceBraces, compact) {
	    var combinator = node.combinator === ' ' || compact ? node.combinator : ' ' + node.combinator + ' ';
	    var result = node.terms.map(function(term) {
	        return generate(term, decorate, forceBraces, compact);
	    }).join(combinator);

	    if (node.explicit || forceBraces) {
	        result = (compact || result[0] === ',' ? '[' : '[ ') + result + (compact ? ']' : ' ]');
	    }

	    return result;
	}

	function generate(node, decorate, forceBraces, compact) {
	    var result;

	    switch (node.type) {
	        case 'Group':
	            result =
	                generateSequence(node, decorate, forceBraces, compact) +
	                (node.disallowEmpty ? '!' : '');
	            break;

	        case 'Multiplier':
	            // return since node is a composition
	            return (
	                generate(node.term, decorate, forceBraces, compact) +
	                decorate(generateMultiplier(node), node)
	            );

	        case 'Type':
	            result = '<' + node.name + (node.opts ? decorate(generateTypeOpts(node.opts), node.opts) : '') + '>';
	            break;

	        case 'Property':
	            result = '<\'' + node.name + '\'>';
	            break;

	        case 'Keyword':
	            result = node.name;
	            break;

	        case 'AtKeyword':
	            result = '@' + node.name;
	            break;

	        case 'Function':
	            result = node.name + '(';
	            break;

	        case 'String':
	        case 'Token':
	            result = node.value;
	            break;

	        case 'Comma':
	            result = ',';
	            break;

	        default:
	            throw new Error('Unknown node type `' + node.type + '`');
	    }

	    return decorate(result, node);
	}

	var generate_1 = function(node, options) {
	    var decorate = noop$1;
	    var forceBraces = false;
	    var compact = false;

	    if (typeof options === 'function') {
	        decorate = options;
	    } else if (options) {
	        forceBraces = Boolean(options.forceBraces);
	        compact = Boolean(options.compact);
	        if (typeof options.decorate === 'function') {
	            decorate = options.decorate;
	        }
	    }

	    return generate(node, decorate, forceBraces, compact);
	};

	function fromMatchResult(matchResult) {
	    var tokens = matchResult.tokens;
	    var longestMatch = matchResult.longestMatch;
	    var node = longestMatch < tokens.length ? tokens[longestMatch].node : null;
	    var mismatchOffset = -1;
	    var entries = 0;
	    var css = '';

	    for (var i = 0; i < tokens.length; i++) {
	        if (i === longestMatch) {
	            mismatchOffset = css.length;
	        }

	        if (node !== null && tokens[i].node === node) {
	            if (i <= longestMatch) {
	                entries++;
	            } else {
	                entries = 0;
	            }
	        }

	        css += tokens[i].value;
	    }

	    return {
	        node: node,
	        css: css,
	        mismatchOffset: mismatchOffset === -1 ? css.length : mismatchOffset,
	        last: node === null || entries > 1
	    };
	}

	function getLocation(node, point) {
	    var loc = node && node.loc && node.loc[point];

	    if (loc) {
	        return {
	            offset: loc.offset,
	            line: loc.line,
	            column: loc.column
	        };
	    }

	    return null;
	}

	var SyntaxReferenceError = function(type, referenceName) {
	    var error = createCustomError(
	        'SyntaxReferenceError',
	        type + (referenceName ? ' `' + referenceName + '`' : '')
	    );

	    error.reference = referenceName;

	    return error;
	};

	var MatchError = function(message, syntax, node, matchResult) {
	    var error = createCustomError('SyntaxMatchError', message);
	    var details = fromMatchResult(matchResult);
	    var mismatchOffset = details.mismatchOffset || 0;
	    var badNode = details.node || node;
	    var end = getLocation(badNode, 'end');
	    var start = details.last ? end : getLocation(badNode, 'start');
	    var css = details.css;

	    error.rawMessage = message;
	    error.syntax = syntax ? generate_1(syntax) : '<generic>';
	    error.css = css;
	    error.mismatchOffset = mismatchOffset;
	    error.loc = {
	        source: (badNode && badNode.loc && badNode.loc.source) || '<unknown>',
	        start: start,
	        end: end
	    };
	    error.line = start ? start.line : undefined;
	    error.column = start ? start.column : undefined;
	    error.offset = start ? start.offset : undefined;
	    error.message = message + '\n' +
	        '  syntax: ' + error.syntax + '\n' +
	        '   value: ' + (error.css || '<empty string>') + '\n' +
	        '  --------' + new Array(error.mismatchOffset + 1).join('-') + '^';

	    return error;
	};

	var error = {
	    SyntaxReferenceError: SyntaxReferenceError,
	    MatchError: MatchError
	};

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var keywords = Object.create(null);
	var properties = Object.create(null);
	var HYPHENMINUS = 45; // '-'.charCodeAt()

	function isCustomProperty(str, offset) {
	    offset = offset || 0;

	    return str.length - offset >= 2 &&
	           str.charCodeAt(offset) === HYPHENMINUS &&
	           str.charCodeAt(offset + 1) === HYPHENMINUS;
	}

	function getVendorPrefix(str, offset) {
	    offset = offset || 0;

	    // verdor prefix should be at least 3 chars length
	    if (str.length - offset >= 3) {
	        // vendor prefix starts with hyper minus following non-hyper minus
	        if (str.charCodeAt(offset) === HYPHENMINUS &&
	            str.charCodeAt(offset + 1) !== HYPHENMINUS) {
	            // vendor prefix should contain a hyper minus at the ending
	            var secondDashIndex = str.indexOf('-', offset + 2);

	            if (secondDashIndex !== -1) {
	                return str.substring(offset, secondDashIndex + 1);
	            }
	        }
	    }

	    return '';
	}

	function getKeywordDescriptor(keyword) {
	    if (hasOwnProperty.call(keywords, keyword)) {
	        return keywords[keyword];
	    }

	    var name = keyword.toLowerCase();

	    if (hasOwnProperty.call(keywords, name)) {
	        return keywords[keyword] = keywords[name];
	    }

	    var custom = isCustomProperty(name, 0);
	    var vendor = !custom ? getVendorPrefix(name, 0) : '';

	    return keywords[keyword] = Object.freeze({
	        basename: name.substr(vendor.length),
	        name: name,
	        vendor: vendor,
	        prefix: vendor,
	        custom: custom
	    });
	}

	function getPropertyDescriptor(property) {
	    if (hasOwnProperty.call(properties, property)) {
	        return properties[property];
	    }

	    var name = property;
	    var hack = property[0];

	    if (hack === '/') {
	        hack = property[1] === '/' ? '//' : '/';
	    } else if (hack !== '_' &&
	               hack !== '*' &&
	               hack !== '$' &&
	               hack !== '#' &&
	               hack !== '+' &&
	               hack !== '&') {
	        hack = '';
	    }

	    var custom = isCustomProperty(name, hack.length);

	    // re-use result when possible (the same as for lower case)
	    if (!custom) {
	        name = name.toLowerCase();
	        if (hasOwnProperty.call(properties, name)) {
	            return properties[property] = properties[name];
	        }
	    }

	    var vendor = !custom ? getVendorPrefix(name, hack.length) : '';
	    var prefix = name.substr(0, hack.length + vendor.length);

	    return properties[property] = Object.freeze({
	        basename: name.substr(prefix.length),
	        name: name.substr(hack.length),
	        hack: hack,
	        vendor: vendor,
	        prefix: prefix,
	        custom: custom
	    });
	}

	var names = {
	    keyword: getKeywordDescriptor,
	    property: getPropertyDescriptor,
	    isCustomProperty: isCustomProperty,
	    vendorPrefix: getVendorPrefix
	};

	var MIN_SIZE = 16 * 1024;
	var SafeUint32Array = typeof Uint32Array !== 'undefined' ? Uint32Array : Array; // fallback on Array when TypedArray is not supported

	var adoptBuffer = function adoptBuffer(buffer, size) {
	    if (buffer === null || buffer.length < size) {
	        return new SafeUint32Array(Math.max(size + 1024, MIN_SIZE));
	    }

	    return buffer;
	};

	var TYPE$2 = _const.TYPE;


	var isNewline$1 = charCodeDefinitions.isNewline;
	var isName$2 = charCodeDefinitions.isName;
	var isValidEscape$2 = charCodeDefinitions.isValidEscape;
	var isNumberStart$1 = charCodeDefinitions.isNumberStart;
	var isIdentifierStart$1 = charCodeDefinitions.isIdentifierStart;
	var charCodeCategory$1 = charCodeDefinitions.charCodeCategory;
	var isBOM$1 = charCodeDefinitions.isBOM;


	var cmpStr$2 = utils$1.cmpStr;
	var getNewlineLength$1 = utils$1.getNewlineLength;
	var findWhiteSpaceEnd$1 = utils$1.findWhiteSpaceEnd;
	var consumeEscaped$1 = utils$1.consumeEscaped;
	var consumeName$1 = utils$1.consumeName;
	var consumeNumber$1 = utils$1.consumeNumber;
	var consumeBadUrlRemnants$1 = utils$1.consumeBadUrlRemnants;

	var OFFSET_MASK$1 = 0x00FFFFFF;
	var TYPE_SHIFT$1 = 24;

	function tokenize(source, stream) {
	    function getCharCode(offset) {
	        return offset < sourceLength ? source.charCodeAt(offset) : 0;
	    }

	    // § 4.3.3. Consume a numeric token
	    function consumeNumericToken() {
	        // Consume a number and let number be the result.
	        offset = consumeNumber$1(source, offset);

	        // If the next 3 input code points would start an identifier, then:
	        if (isIdentifierStart$1(getCharCode(offset), getCharCode(offset + 1), getCharCode(offset + 2))) {
	            // Create a <dimension-token> with the same value and type flag as number, and a unit set initially to the empty string.
	            // Consume a name. Set the <dimension-token>’s unit to the returned value.
	            // Return the <dimension-token>.
	            type = TYPE$2.Dimension;
	            offset = consumeName$1(source, offset);
	            return;
	        }

	        // Otherwise, if the next input code point is U+0025 PERCENTAGE SIGN (%), consume it.
	        if (getCharCode(offset) === 0x0025) {
	            // Create a <percentage-token> with the same value as number, and return it.
	            type = TYPE$2.Percentage;
	            offset++;
	            return;
	        }

	        // Otherwise, create a <number-token> with the same value and type flag as number, and return it.
	        type = TYPE$2.Number;
	    }

	    // § 4.3.4. Consume an ident-like token
	    function consumeIdentLikeToken() {
	        const nameStartOffset = offset;

	        // Consume a name, and let string be the result.
	        offset = consumeName$1(source, offset);

	        // If string’s value is an ASCII case-insensitive match for "url",
	        // and the next input code point is U+0028 LEFT PARENTHESIS ((), consume it.
	        if (cmpStr$2(source, nameStartOffset, offset, 'url') && getCharCode(offset) === 0x0028) {
	            // While the next two input code points are whitespace, consume the next input code point.
	            offset = findWhiteSpaceEnd$1(source, offset + 1);

	            // If the next one or two input code points are U+0022 QUOTATION MARK ("), U+0027 APOSTROPHE ('),
	            // or whitespace followed by U+0022 QUOTATION MARK (") or U+0027 APOSTROPHE ('),
	            // then create a <function-token> with its value set to string and return it.
	            if (getCharCode(offset) === 0x0022 ||
	                getCharCode(offset) === 0x0027) {
	                type = TYPE$2.Function;
	                offset = nameStartOffset + 4;
	                return;
	            }

	            // Otherwise, consume a url token, and return it.
	            consumeUrlToken();
	            return;
	        }

	        // Otherwise, if the next input code point is U+0028 LEFT PARENTHESIS ((), consume it.
	        // Create a <function-token> with its value set to string and return it.
	        if (getCharCode(offset) === 0x0028) {
	            type = TYPE$2.Function;
	            offset++;
	            return;
	        }

	        // Otherwise, create an <ident-token> with its value set to string and return it.
	        type = TYPE$2.Ident;
	    }

	    // § 4.3.5. Consume a string token
	    function consumeStringToken(endingCodePoint) {
	        // This algorithm may be called with an ending code point, which denotes the code point
	        // that ends the string. If an ending code point is not specified,
	        // the current input code point is used.
	        if (!endingCodePoint) {
	            endingCodePoint = getCharCode(offset++);
	        }

	        // Initially create a <string-token> with its value set to the empty string.
	        type = TYPE$2.String;

	        // Repeatedly consume the next input code point from the stream:
	        for (; offset < source.length; offset++) {
	            var code = source.charCodeAt(offset);

	            switch (charCodeCategory$1(code)) {
	                // ending code point
	                case endingCodePoint:
	                    // Return the <string-token>.
	                    offset++;
	                    return;

	                // EOF
	                case charCodeCategory$1.Eof:
	                    // This is a parse error. Return the <string-token>.
	                    return;

	                // newline
	                case charCodeCategory$1.WhiteSpace:
	                    if (isNewline$1(code)) {
	                        // This is a parse error. Reconsume the current input code point,
	                        // create a <bad-string-token>, and return it.
	                        offset += getNewlineLength$1(source, offset, code);
	                        type = TYPE$2.BadString;
	                        return;
	                    }
	                    break;

	                // U+005C REVERSE SOLIDUS (\)
	                case 0x005C:
	                    // If the next input code point is EOF, do nothing.
	                    if (offset === source.length - 1) {
	                        break;
	                    }

	                    var nextCode = getCharCode(offset + 1);

	                    // Otherwise, if the next input code point is a newline, consume it.
	                    if (isNewline$1(nextCode)) {
	                        offset += getNewlineLength$1(source, offset + 1, nextCode);
	                    } else if (isValidEscape$2(code, nextCode)) {
	                        // Otherwise, (the stream starts with a valid escape) consume
	                        // an escaped code point and append the returned code point to
	                        // the <string-token>’s value.
	                        offset = consumeEscaped$1(source, offset) - 1;
	                    }
	                    break;

	                // anything else
	                // Append the current input code point to the <string-token>’s value.
	            }
	        }
	    }

	    // § 4.3.6. Consume a url token
	    // Note: This algorithm assumes that the initial "url(" has already been consumed.
	    // This algorithm also assumes that it’s being called to consume an "unquoted" value, like url(foo).
	    // A quoted value, like url("foo"), is parsed as a <function-token>. Consume an ident-like token
	    // automatically handles this distinction; this algorithm shouldn’t be called directly otherwise.
	    function consumeUrlToken() {
	        // Initially create a <url-token> with its value set to the empty string.
	        type = TYPE$2.Url;

	        // Consume as much whitespace as possible.
	        offset = findWhiteSpaceEnd$1(source, offset);

	        // Repeatedly consume the next input code point from the stream:
	        for (; offset < source.length; offset++) {
	            var code = source.charCodeAt(offset);

	            switch (charCodeCategory$1(code)) {
	                // U+0029 RIGHT PARENTHESIS ())
	                case 0x0029:
	                    // Return the <url-token>.
	                    offset++;
	                    return;

	                // EOF
	                case charCodeCategory$1.Eof:
	                    // This is a parse error. Return the <url-token>.
	                    return;

	                // whitespace
	                case charCodeCategory$1.WhiteSpace:
	                    // Consume as much whitespace as possible.
	                    offset = findWhiteSpaceEnd$1(source, offset);

	                    // If the next input code point is U+0029 RIGHT PARENTHESIS ()) or EOF,
	                    // consume it and return the <url-token>
	                    // (if EOF was encountered, this is a parse error);
	                    if (getCharCode(offset) === 0x0029 || offset >= source.length) {
	                        if (offset < source.length) {
	                            offset++;
	                        }
	                        return;
	                    }

	                    // otherwise, consume the remnants of a bad url, create a <bad-url-token>,
	                    // and return it.
	                    offset = consumeBadUrlRemnants$1(source, offset);
	                    type = TYPE$2.BadUrl;
	                    return;

	                // U+0022 QUOTATION MARK (")
	                // U+0027 APOSTROPHE (')
	                // U+0028 LEFT PARENTHESIS (()
	                // non-printable code point
	                case 0x0022:
	                case 0x0027:
	                case 0x0028:
	                case charCodeCategory$1.NonPrintable:
	                    // This is a parse error. Consume the remnants of a bad url,
	                    // create a <bad-url-token>, and return it.
	                    offset = consumeBadUrlRemnants$1(source, offset);
	                    type = TYPE$2.BadUrl;
	                    return;

	                // U+005C REVERSE SOLIDUS (\)
	                case 0x005C:
	                    // If the stream starts with a valid escape, consume an escaped code point and
	                    // append the returned code point to the <url-token>’s value.
	                    if (isValidEscape$2(code, getCharCode(offset + 1))) {
	                        offset = consumeEscaped$1(source, offset) - 1;
	                        break;
	                    }

	                    // Otherwise, this is a parse error. Consume the remnants of a bad url,
	                    // create a <bad-url-token>, and return it.
	                    offset = consumeBadUrlRemnants$1(source, offset);
	                    type = TYPE$2.BadUrl;
	                    return;

	                // anything else
	                // Append the current input code point to the <url-token>’s value.
	            }
	        }
	    }

	    if (!stream) {
	        stream = new TokenStream_1();
	    }

	    // ensure source is a string
	    source = String(source || '');

	    var sourceLength = source.length;
	    var offsetAndType = adoptBuffer(stream.offsetAndType, sourceLength + 1); // +1 because of eof-token
	    var balance = adoptBuffer(stream.balance, sourceLength + 1);
	    var tokenCount = 0;
	    var start = isBOM$1(getCharCode(0));
	    var offset = start;
	    var balanceCloseType = 0;
	    var balanceStart = 0;
	    var balancePrev = 0;

	    // https://drafts.csswg.org/css-syntax-3/#consume-token
	    // § 4.3.1. Consume a token
	    while (offset < sourceLength) {
	        var code = source.charCodeAt(offset);
	        var type = 0;

	        balance[tokenCount] = sourceLength;

	        switch (charCodeCategory$1(code)) {
	            // whitespace
	            case charCodeCategory$1.WhiteSpace:
	                // Consume as much whitespace as possible. Return a <whitespace-token>.
	                type = TYPE$2.WhiteSpace;
	                offset = findWhiteSpaceEnd$1(source, offset + 1);
	                break;

	            // U+0022 QUOTATION MARK (")
	            case 0x0022:
	                // Consume a string token and return it.
	                consumeStringToken();
	                break;

	            // U+0023 NUMBER SIGN (#)
	            case 0x0023:
	                // If the next input code point is a name code point or the next two input code points are a valid escape, then:
	                if (isName$2(getCharCode(offset + 1)) || isValidEscape$2(getCharCode(offset + 1), getCharCode(offset + 2))) {
	                    // Create a <hash-token>.
	                    type = TYPE$2.Hash;

	                    // If the next 3 input code points would start an identifier, set the <hash-token>’s type flag to "id".
	                    // if (isIdentifierStart(getCharCode(offset + 1), getCharCode(offset + 2), getCharCode(offset + 3))) {
	                    //     // TODO: set id flag
	                    // }

	                    // Consume a name, and set the <hash-token>’s value to the returned string.
	                    offset = consumeName$1(source, offset + 1);

	                    // Return the <hash-token>.
	                } else {
	                    // Otherwise, return a <delim-token> with its value set to the current input code point.
	                    type = TYPE$2.Delim;
	                    offset++;
	                }

	                break;

	            // U+0027 APOSTROPHE (')
	            case 0x0027:
	                // Consume a string token and return it.
	                consumeStringToken();
	                break;

	            // U+0028 LEFT PARENTHESIS (()
	            case 0x0028:
	                // Return a <(-token>.
	                type = TYPE$2.LeftParenthesis;
	                offset++;
	                break;

	            // U+0029 RIGHT PARENTHESIS ())
	            case 0x0029:
	                // Return a <)-token>.
	                type = TYPE$2.RightParenthesis;
	                offset++;
	                break;

	            // U+002B PLUS SIGN (+)
	            case 0x002B:
	                // If the input stream starts with a number, ...
	                if (isNumberStart$1(code, getCharCode(offset + 1), getCharCode(offset + 2))) {
	                    // ... reconsume the current input code point, consume a numeric token, and return it.
	                    consumeNumericToken();
	                } else {
	                    // Otherwise, return a <delim-token> with its value set to the current input code point.
	                    type = TYPE$2.Delim;
	                    offset++;
	                }
	                break;

	            // U+002C COMMA (,)
	            case 0x002C:
	                // Return a <comma-token>.
	                type = TYPE$2.Comma;
	                offset++;
	                break;

	            // U+002D HYPHEN-MINUS (-)
	            case 0x002D:
	                // If the input stream starts with a number, reconsume the current input code point, consume a numeric token, and return it.
	                if (isNumberStart$1(code, getCharCode(offset + 1), getCharCode(offset + 2))) {
	                    consumeNumericToken();
	                } else {
	                    // Otherwise, if the next 2 input code points are U+002D HYPHEN-MINUS U+003E GREATER-THAN SIGN (->), consume them and return a <CDC-token>.
	                    if (getCharCode(offset + 1) === 0x002D &&
	                        getCharCode(offset + 2) === 0x003E) {
	                        type = TYPE$2.CDC;
	                        offset = offset + 3;
	                    } else {
	                        // Otherwise, if the input stream starts with an identifier, ...
	                        if (isIdentifierStart$1(code, getCharCode(offset + 1), getCharCode(offset + 2))) {
	                            // ... reconsume the current input code point, consume an ident-like token, and return it.
	                            consumeIdentLikeToken();
	                        } else {
	                            // Otherwise, return a <delim-token> with its value set to the current input code point.
	                            type = TYPE$2.Delim;
	                            offset++;
	                        }
	                    }
	                }
	                break;

	            // U+002E FULL STOP (.)
	            case 0x002E:
	                // If the input stream starts with a number, ...
	                if (isNumberStart$1(code, getCharCode(offset + 1), getCharCode(offset + 2))) {
	                    // ... reconsume the current input code point, consume a numeric token, and return it.
	                    consumeNumericToken();
	                } else {
	                    // Otherwise, return a <delim-token> with its value set to the current input code point.
	                    type = TYPE$2.Delim;
	                    offset++;
	                }

	                break;

	            // U+002F SOLIDUS (/)
	            case 0x002F:
	                // If the next two input code point are U+002F SOLIDUS (/) followed by a U+002A ASTERISK (*),
	                if (getCharCode(offset + 1) === 0x002A) {
	                    // ... consume them and all following code points up to and including the first U+002A ASTERISK (*)
	                    // followed by a U+002F SOLIDUS (/), or up to an EOF code point.
	                    type = TYPE$2.Comment;
	                    offset = source.indexOf('*/', offset + 2) + 2;
	                    if (offset === 1) {
	                        offset = source.length;
	                    }
	                } else {
	                    type = TYPE$2.Delim;
	                    offset++;
	                }
	                break;

	            // U+003A COLON (:)
	            case 0x003A:
	                // Return a <colon-token>.
	                type = TYPE$2.Colon;
	                offset++;
	                break;

	            // U+003B SEMICOLON (;)
	            case 0x003B:
	                // Return a <semicolon-token>.
	                type = TYPE$2.Semicolon;
	                offset++;
	                break;

	            // U+003C LESS-THAN SIGN (<)
	            case 0x003C:
	                // If the next 3 input code points are U+0021 EXCLAMATION MARK U+002D HYPHEN-MINUS U+002D HYPHEN-MINUS (!--), ...
	                if (getCharCode(offset + 1) === 0x0021 &&
	                    getCharCode(offset + 2) === 0x002D &&
	                    getCharCode(offset + 3) === 0x002D) {
	                    // ... consume them and return a <CDO-token>.
	                    type = TYPE$2.CDO;
	                    offset = offset + 4;
	                } else {
	                    // Otherwise, return a <delim-token> with its value set to the current input code point.
	                    type = TYPE$2.Delim;
	                    offset++;
	                }

	                break;

	            // U+0040 COMMERCIAL AT (@)
	            case 0x0040:
	                // If the next 3 input code points would start an identifier, ...
	                if (isIdentifierStart$1(getCharCode(offset + 1), getCharCode(offset + 2), getCharCode(offset + 3))) {
	                    // ... consume a name, create an <at-keyword-token> with its value set to the returned value, and return it.
	                    type = TYPE$2.AtKeyword;
	                    offset = consumeName$1(source, offset + 1);
	                } else {
	                    // Otherwise, return a <delim-token> with its value set to the current input code point.
	                    type = TYPE$2.Delim;
	                    offset++;
	                }

	                break;

	            // U+005B LEFT SQUARE BRACKET ([)
	            case 0x005B:
	                // Return a <[-token>.
	                type = TYPE$2.LeftSquareBracket;
	                offset++;
	                break;

	            // U+005C REVERSE SOLIDUS (\)
	            case 0x005C:
	                // If the input stream starts with a valid escape, ...
	                if (isValidEscape$2(code, getCharCode(offset + 1))) {
	                    // ... reconsume the current input code point, consume an ident-like token, and return it.
	                    consumeIdentLikeToken();
	                } else {
	                    // Otherwise, this is a parse error. Return a <delim-token> with its value set to the current input code point.
	                    type = TYPE$2.Delim;
	                    offset++;
	                }
	                break;

	            // U+005D RIGHT SQUARE BRACKET (])
	            case 0x005D:
	                // Return a <]-token>.
	                type = TYPE$2.RightSquareBracket;
	                offset++;
	                break;

	            // U+007B LEFT CURLY BRACKET ({)
	            case 0x007B:
	                // Return a <{-token>.
	                type = TYPE$2.LeftCurlyBracket;
	                offset++;
	                break;

	            // U+007D RIGHT CURLY BRACKET (})
	            case 0x007D:
	                // Return a <}-token>.
	                type = TYPE$2.RightCurlyBracket;
	                offset++;
	                break;

	            // digit
	            case charCodeCategory$1.Digit:
	                // Reconsume the current input code point, consume a numeric token, and return it.
	                consumeNumericToken();
	                break;

	            // name-start code point
	            case charCodeCategory$1.NameStart:
	                // Reconsume the current input code point, consume an ident-like token, and return it.
	                consumeIdentLikeToken();
	                break;

	            // EOF
	            case charCodeCategory$1.Eof:
	                // Return an <EOF-token>.
	                break;

	            // anything else
	            default:
	                // Return a <delim-token> with its value set to the current input code point.
	                type = TYPE$2.Delim;
	                offset++;
	        }

	        switch (type) {
	            case balanceCloseType:
	                balancePrev = balanceStart & OFFSET_MASK$1;
	                balanceStart = balance[balancePrev];
	                balanceCloseType = balanceStart >> TYPE_SHIFT$1;
	                balance[tokenCount] = balancePrev;
	                balance[balancePrev++] = tokenCount;
	                for (; balancePrev < tokenCount; balancePrev++) {
	                    if (balance[balancePrev] === sourceLength) {
	                        balance[balancePrev] = tokenCount;
	                    }
	                }
	                break;

	            case TYPE$2.LeftParenthesis:
	            case TYPE$2.Function:
	                balance[tokenCount] = balanceStart;
	                balanceCloseType = TYPE$2.RightParenthesis;
	                balanceStart = (balanceCloseType << TYPE_SHIFT$1) | tokenCount;
	                break;

	            case TYPE$2.LeftSquareBracket:
	                balance[tokenCount] = balanceStart;
	                balanceCloseType = TYPE$2.RightSquareBracket;
	                balanceStart = (balanceCloseType << TYPE_SHIFT$1) | tokenCount;
	                break;

	            case TYPE$2.LeftCurlyBracket:
	                balance[tokenCount] = balanceStart;
	                balanceCloseType = TYPE$2.RightCurlyBracket;
	                balanceStart = (balanceCloseType << TYPE_SHIFT$1) | tokenCount;
	                break;
	        }

	        offsetAndType[tokenCount++] = (type << TYPE_SHIFT$1) | offset;
	    }

	    // finalize buffers
	    offsetAndType[tokenCount] = (TYPE$2.EOF << TYPE_SHIFT$1) | offset; // <EOF-token>
	    balance[tokenCount] = sourceLength;
	    balance[sourceLength] = sourceLength; // prevents false positive balance match with any token
	    while (balanceStart !== 0) {
	        balancePrev = balanceStart & OFFSET_MASK$1;
	        balanceStart = balance[balancePrev];
	        balance[balancePrev] = sourceLength;
	    }

	    // update stream
	    stream.source = source;
	    stream.firstCharOffset = start;
	    stream.offsetAndType = offsetAndType;
	    stream.tokenCount = tokenCount;
	    stream.balance = balance;
	    stream.reset();
	    stream.next();

	    return stream;
	}

	// extend tokenizer with constants
	Object.keys(_const).forEach(function(key) {
	    tokenize[key] = _const[key];
	});

	// extend tokenizer with static methods from utils
	Object.keys(charCodeDefinitions).forEach(function(key) {
	    tokenize[key] = charCodeDefinitions[key];
	});
	Object.keys(utils$1).forEach(function(key) {
	    tokenize[key] = utils$1[key];
	});

	var tokenizer = tokenize;

	var isDigit$2 = tokenizer.isDigit;
	var cmpChar$1 = tokenizer.cmpChar;
	var TYPE$3 = tokenizer.TYPE;

	var DELIM = TYPE$3.Delim;
	var WHITESPACE$1 = TYPE$3.WhiteSpace;
	var COMMENT$1 = TYPE$3.Comment;
	var IDENT = TYPE$3.Ident;
	var NUMBER = TYPE$3.Number;
	var DIMENSION = TYPE$3.Dimension;
	var PLUSSIGN = 0x002B;    // U+002B PLUS SIGN (+)
	var HYPHENMINUS$1 = 0x002D; // U+002D HYPHEN-MINUS (-)
	var N = 0x006E;           // U+006E LATIN SMALL LETTER N (n)
	var DISALLOW_SIGN = true;
	var ALLOW_SIGN = false;

	function isDelim(token, code) {
	    return token !== null && token.type === DELIM && token.value.charCodeAt(0) === code;
	}

	function skipSC(token, offset, getNextToken) {
	    while (token !== null && (token.type === WHITESPACE$1 || token.type === COMMENT$1)) {
	        token = getNextToken(++offset);
	    }

	    return offset;
	}

	function checkInteger(token, valueOffset, disallowSign, offset) {
	    if (!token) {
	        return 0;
	    }

	    var code = token.value.charCodeAt(valueOffset);

	    if (code === PLUSSIGN || code === HYPHENMINUS$1) {
	        if (disallowSign) {
	            // Number sign is not allowed
	            return 0;
	        }
	        valueOffset++;
	    }

	    for (; valueOffset < token.value.length; valueOffset++) {
	        if (!isDigit$2(token.value.charCodeAt(valueOffset))) {
	            // Integer is expected
	            return 0;
	        }
	    }

	    return offset + 1;
	}

	// ... <signed-integer>
	// ... ['+' | '-'] <signless-integer>
	function consumeB(token, offset_, getNextToken) {
	    var sign = false;
	    var offset = skipSC(token, offset_, getNextToken);

	    token = getNextToken(offset);

	    if (token === null) {
	        return offset_;
	    }

	    if (token.type !== NUMBER) {
	        if (isDelim(token, PLUSSIGN) || isDelim(token, HYPHENMINUS$1)) {
	            sign = true;
	            offset = skipSC(getNextToken(++offset), offset, getNextToken);
	            token = getNextToken(offset);

	            if (token === null && token.type !== NUMBER) {
	                return 0;
	            }
	        } else {
	            return offset_;
	        }
	    }

	    if (!sign) {
	        var code = token.value.charCodeAt(0);
	        if (code !== PLUSSIGN && code !== HYPHENMINUS$1) {
	            // Number sign is expected
	            return 0;
	        }
	    }

	    return checkInteger(token, sign ? 0 : 1, sign, offset);
	}

	// An+B microsyntax https://www.w3.org/TR/css-syntax-3/#anb
	var genericAnPlusB = function anPlusB(token, getNextToken) {
	    /* eslint-disable brace-style*/
	    var offset = 0;

	    if (!token) {
	        return 0;
	    }

	    // <integer>
	    if (token.type === NUMBER) {
	        return checkInteger(token, 0, ALLOW_SIGN, offset); // b
	    }

	    // -n
	    // -n <signed-integer>
	    // -n ['+' | '-'] <signless-integer>
	    // -n- <signless-integer>
	    // <dashndashdigit-ident>
	    else if (token.type === IDENT && token.value.charCodeAt(0) === HYPHENMINUS$1) {
	        // expect 1st char is N
	        if (!cmpChar$1(token.value, 1, N)) {
	            return 0;
	        }

	        switch (token.value.length) {
	            // -n
	            // -n <signed-integer>
	            // -n ['+' | '-'] <signless-integer>
	            case 2:
	                return consumeB(getNextToken(++offset), offset, getNextToken);

	            // -n- <signless-integer>
	            case 3:
	                if (token.value.charCodeAt(2) !== HYPHENMINUS$1) {
	                    return 0;
	                }

	                offset = skipSC(getNextToken(++offset), offset, getNextToken);
	                token = getNextToken(offset);

	                return checkInteger(token, 0, DISALLOW_SIGN, offset);

	            // <dashndashdigit-ident>
	            default:
	                if (token.value.charCodeAt(2) !== HYPHENMINUS$1) {
	                    return 0;
	                }

	                return checkInteger(token, 3, DISALLOW_SIGN, offset);
	        }
	    }

	    // '+'? n
	    // '+'? n <signed-integer>
	    // '+'? n ['+' | '-'] <signless-integer>
	    // '+'? n- <signless-integer>
	    // '+'? <ndashdigit-ident>
	    else if (token.type === IDENT || (isDelim(token, PLUSSIGN) && getNextToken(offset + 1).type === IDENT)) {
	        // just ignore a plus
	        if (token.type !== IDENT) {
	            token = getNextToken(++offset);
	        }

	        if (token === null || !cmpChar$1(token.value, 0, N)) {
	            return 0;
	        }

	        switch (token.value.length) {
	            // '+'? n
	            // '+'? n <signed-integer>
	            // '+'? n ['+' | '-'] <signless-integer>
	            case 1:
	                return consumeB(getNextToken(++offset), offset, getNextToken);

	            // '+'? n- <signless-integer>
	            case 2:
	                if (token.value.charCodeAt(1) !== HYPHENMINUS$1) {
	                    return 0;
	                }

	                offset = skipSC(getNextToken(++offset), offset, getNextToken);
	                token = getNextToken(offset);

	                return checkInteger(token, 0, DISALLOW_SIGN, offset);

	            // '+'? <ndashdigit-ident>
	            default:
	                if (token.value.charCodeAt(1) !== HYPHENMINUS$1) {
	                    return 0;
	                }

	                return checkInteger(token, 2, DISALLOW_SIGN, offset);
	        }
	    }

	    // <ndashdigit-dimension>
	    // <ndash-dimension> <signless-integer>
	    // <n-dimension>
	    // <n-dimension> <signed-integer>
	    // <n-dimension> ['+' | '-'] <signless-integer>
	    else if (token.type === DIMENSION) {
	        var code = token.value.charCodeAt(0);
	        var sign = code === PLUSSIGN || code === HYPHENMINUS$1 ? 1 : 0;

	        for (var i = sign; i < token.value.length; i++) {
	            if (!isDigit$2(token.value.charCodeAt(i))) {
	                break;
	            }
	        }

	        if (i === sign) {
	            // Integer is expected
	            return 0;
	        }

	        if (!cmpChar$1(token.value, i, N)) {
	            return 0;
	        }

	        // <n-dimension>
	        // <n-dimension> <signed-integer>
	        // <n-dimension> ['+' | '-'] <signless-integer>
	        if (i + 1 === token.value.length) {
	            return consumeB(getNextToken(++offset), offset, getNextToken);
	        } else {
	            if (token.value.charCodeAt(i + 1) !== HYPHENMINUS$1) {
	                return 0;
	            }

	            // <ndash-dimension> <signless-integer>
	            if (i + 2 === token.value.length) {
	                offset = skipSC(getNextToken(++offset), offset, getNextToken);
	                token = getNextToken(offset);

	                return checkInteger(token, 0, DISALLOW_SIGN, offset);
	            }
	            // <ndashdigit-dimension>
	            else {
	                return checkInteger(token, i + 2, DISALLOW_SIGN, offset);
	            }
	        }
	    }

	    return 0;
	};

	var isHexDigit$2 = tokenizer.isHexDigit;
	var cmpChar$2 = tokenizer.cmpChar;
	var TYPE$4 = tokenizer.TYPE;

	var IDENT$1 = TYPE$4.Ident;
	var DELIM$1 = TYPE$4.Delim;
	var NUMBER$1 = TYPE$4.Number;
	var DIMENSION$1 = TYPE$4.Dimension;
	var PLUSSIGN$1 = 0x002B;     // U+002B PLUS SIGN (+)
	var HYPHENMINUS$2 = 0x002D;  // U+002D HYPHEN-MINUS (-)
	var QUESTIONMARK = 0x003F; // U+003F QUESTION MARK (?)
	var U = 0x0075;            // U+0075 LATIN SMALL LETTER U (u)

	function isDelim$1(token, code) {
	    return token !== null && token.type === DELIM$1 && token.value.charCodeAt(0) === code;
	}

	function startsWith(token, code) {
	    return token.value.charCodeAt(0) === code;
	}

	function hexSequence(token, offset, allowDash) {
	    for (var pos = offset, hexlen = 0; pos < token.value.length; pos++) {
	        var code = token.value.charCodeAt(pos);

	        if (code === HYPHENMINUS$2 && allowDash && hexlen !== 0) {
	            if (hexSequence(token, offset + hexlen + 1, false) > 0) {
	                return 6; // dissallow following question marks
	            }

	            return 0; // dash at the ending of a hex sequence is not allowed
	        }

	        if (!isHexDigit$2(code)) {
	            return 0; // not a hex digit
	        }

	        if (++hexlen > 6) {
	            return 0; // too many hex digits
	        }    }

	    return hexlen;
	}

	function withQuestionMarkSequence(consumed, length, getNextToken) {
	    if (!consumed) {
	        return 0; // nothing consumed
	    }

	    while (isDelim$1(getNextToken(length), QUESTIONMARK)) {
	        if (++consumed > 6) {
	            return 0; // too many question marks
	        }

	        length++;
	    }

	    return length;
	}

	// https://drafts.csswg.org/css-syntax/#urange
	// Informally, the <urange> production has three forms:
	// U+0001
	//      Defines a range consisting of a single code point, in this case the code point "1".
	// U+0001-00ff
	//      Defines a range of codepoints between the first and the second value, in this case
	//      the range between "1" and "ff" (255 in decimal) inclusive.
	// U+00??
	//      Defines a range of codepoints where the "?" characters range over all hex digits,
	//      in this case defining the same as the value U+0000-00ff.
	// In each form, a maximum of 6 digits is allowed for each hexadecimal number (if you treat "?" as a hexadecimal digit).
	//
	// <urange> =
	//   u '+' <ident-token> '?'* |
	//   u <dimension-token> '?'* |
	//   u <number-token> '?'* |
	//   u <number-token> <dimension-token> |
	//   u <number-token> <number-token> |
	//   u '+' '?'+
	var genericUrange = function urange(token, getNextToken) {
	    var length = 0;

	    // should start with `u` or `U`
	    if (token === null || token.type !== IDENT$1 || !cmpChar$2(token.value, 0, U)) {
	        return 0;
	    }

	    token = getNextToken(++length);
	    if (token === null) {
	        return 0;
	    }

	    // u '+' <ident-token> '?'*
	    // u '+' '?'+
	    if (isDelim$1(token, PLUSSIGN$1)) {
	        token = getNextToken(++length);
	        if (token === null) {
	            return 0;
	        }

	        if (token.type === IDENT$1) {
	            // u '+' <ident-token> '?'*
	            return withQuestionMarkSequence(hexSequence(token, 0, true), ++length, getNextToken);
	        }

	        if (isDelim$1(token, QUESTIONMARK)) {
	            // u '+' '?'+
	            return withQuestionMarkSequence(1, ++length, getNextToken);
	        }

	        // Hex digit or question mark is expected
	        return 0;
	    }

	    // u <number-token> '?'*
	    // u <number-token> <dimension-token>
	    // u <number-token> <number-token>
	    if (token.type === NUMBER$1) {
	        if (!startsWith(token, PLUSSIGN$1)) {
	            return 0;
	        }

	        var consumedHexLength = hexSequence(token, 1, true);
	        if (consumedHexLength === 0) {
	            return 0;
	        }

	        token = getNextToken(++length);
	        if (token === null) {
	            // u <number-token> <eof>
	            return length;
	        }

	        if (token.type === DIMENSION$1 || token.type === NUMBER$1) {
	            // u <number-token> <dimension-token>
	            // u <number-token> <number-token>
	            if (!startsWith(token, HYPHENMINUS$2) || !hexSequence(token, 1, false)) {
	                return 0;
	            }

	            return length + 1;
	        }

	        // u <number-token> '?'*
	        return withQuestionMarkSequence(consumedHexLength, length, getNextToken);
	    }

	    // u <dimension-token> '?'*
	    if (token.type === DIMENSION$1) {
	        if (!startsWith(token, PLUSSIGN$1)) {
	            return 0;
	        }

	        return withQuestionMarkSequence(hexSequence(token, 1, true), ++length, getNextToken);
	    }

	    return 0;
	};

	var isIdentifierStart$2 = tokenizer.isIdentifierStart;
	var isHexDigit$3 = tokenizer.isHexDigit;
	var isDigit$3 = tokenizer.isDigit;
	var cmpStr$3 = tokenizer.cmpStr;
	var consumeNumber$2 = tokenizer.consumeNumber;
	var TYPE$5 = tokenizer.TYPE;



	var cssWideKeywords = ['unset', 'initial', 'inherit'];
	var calcFunctionNames = ['calc(', '-moz-calc(', '-webkit-calc('];

	// https://www.w3.org/TR/css-values-3/#lengths
	var LENGTH = {
	    // absolute length units
	    'px': true,
	    'mm': true,
	    'cm': true,
	    'in': true,
	    'pt': true,
	    'pc': true,
	    'q': true,

	    // relative length units
	    'em': true,
	    'ex': true,
	    'ch': true,
	    'rem': true,

	    // viewport-percentage lengths
	    'vh': true,
	    'vw': true,
	    'vmin': true,
	    'vmax': true,
	    'vm': true
	};

	var ANGLE = {
	    'deg': true,
	    'grad': true,
	    'rad': true,
	    'turn': true
	};

	var TIME = {
	    's': true,
	    'ms': true
	};

	var FREQUENCY = {
	    'hz': true,
	    'khz': true
	};

	// https://www.w3.org/TR/css-values-3/#resolution (https://drafts.csswg.org/css-values/#resolution)
	var RESOLUTION = {
	    'dpi': true,
	    'dpcm': true,
	    'dppx': true,
	    'x': true      // https://github.com/w3c/csswg-drafts/issues/461
	};

	// https://drafts.csswg.org/css-grid/#fr-unit
	var FLEX = {
	    'fr': true
	};

	// https://www.w3.org/TR/css3-speech/#mixing-props-voice-volume
	var DECIBEL = {
	    'db': true
	};

	// https://www.w3.org/TR/css3-speech/#voice-props-voice-pitch
	var SEMITONES = {
	    'st': true
	};

	// safe char code getter
	function charCode(str, index) {
	    return index < str.length ? str.charCodeAt(index) : 0;
	}

	function eqStr(actual, expected) {
	    return cmpStr$3(actual, 0, actual.length, expected);
	}

	function eqStrAny(actual, expected) {
	    for (var i = 0; i < expected.length; i++) {
	        if (eqStr(actual, expected[i])) {
	            return true;
	        }
	    }

	    return false;
	}

	// IE postfix hack, i.e. 123\0 or 123px\9
	function isPostfixIeHack(str, offset) {
	    if (offset !== str.length - 2) {
	        return false;
	    }

	    return (
	        str.charCodeAt(offset) === 0x005C &&  // U+005C REVERSE SOLIDUS (\)
	        isDigit$3(str.charCodeAt(offset + 1))
	    );
	}

	function outOfRange(opts, value, numEnd) {
	    if (opts && opts.type === 'Range') {
	        var num = Number(
	            numEnd !== undefined && numEnd !== value.length
	                ? value.substr(0, numEnd)
	                : value
	        );

	        if (isNaN(num)) {
	            return true;
	        }

	        if (opts.min !== null && num < opts.min) {
	            return true;
	        }

	        if (opts.max !== null && num > opts.max) {
	            return true;
	        }
	    }

	    return false;
	}

	function consumeFunction(token, getNextToken) {
	    var startIdx = token.index;
	    var length = 0;

	    // balanced token consuming
	    do {
	        length++;

	        if (token.balance <= startIdx) {
	            break;
	        }
	    } while (token = getNextToken(length));

	    return length;
	}

	// TODO: implement
	// can be used wherever <length>, <frequency>, <angle>, <time>, <percentage>, <number>, or <integer> values are allowed
	// https://drafts.csswg.org/css-values/#calc-notation
	function calc(next) {
	    return function(token, getNextToken, opts) {
	        if (token === null) {
	            return 0;
	        }

	        if (token.type === TYPE$5.Function && eqStrAny(token.value, calcFunctionNames)) {
	            return consumeFunction(token, getNextToken);
	        }

	        return next(token, getNextToken, opts);
	    };
	}

	function tokenType(expectedTokenType) {
	    return function(token) {
	        if (token === null || token.type !== expectedTokenType) {
	            return 0;
	        }

	        return 1;
	    };
	}

	function func(name) {
	    name = name + '(';

	    return function(token, getNextToken) {
	        if (token !== null && eqStr(token.value, name)) {
	            return consumeFunction(token, getNextToken);
	        }

	        return 0;
	    };
	}

	// =========================
	// Complex types
	//

	// https://drafts.csswg.org/css-values-4/#custom-idents
	// 4.2. Author-defined Identifiers: the <custom-ident> type
	// Some properties accept arbitrary author-defined identifiers as a component value.
	// This generic data type is denoted by <custom-ident>, and represents any valid CSS identifier
	// that would not be misinterpreted as a pre-defined keyword in that property’s value definition.
	//
	// See also: https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident
	function customIdent(token) {
	    if (token === null || token.type !== TYPE$5.Ident) {
	        return 0;
	    }

	    var name = token.value.toLowerCase();

	    // The CSS-wide keywords are not valid <custom-ident>s
	    if (eqStrAny(name, cssWideKeywords)) {
	        return 0;
	    }

	    // The default keyword is reserved and is also not a valid <custom-ident>
	    if (eqStr(name, 'default')) {
	        return 0;
	    }

	    // TODO: ignore property specific keywords (as described https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident)
	    // Specifications using <custom-ident> must specify clearly what other keywords
	    // are excluded from <custom-ident>, if any—for example by saying that any pre-defined keywords
	    // in that property’s value definition are excluded. Excluded keywords are excluded
	    // in all ASCII case permutations.

	    return 1;
	}

	// https://drafts.csswg.org/css-variables/#typedef-custom-property-name
	// A custom property is any property whose name starts with two dashes (U+002D HYPHEN-MINUS), like --foo.
	// The <custom-property-name> production corresponds to this: it’s defined as any valid identifier
	// that starts with two dashes, except -- itself, which is reserved for future use by CSS.
	// NOTE: Current implementation treat `--` as a valid name since most (all?) major browsers treat it as valid.
	function customPropertyName(token) {
	    // ... defined as any valid identifier
	    if (token === null || token.type !== TYPE$5.Ident) {
	        return 0;
	    }

	    // ... that starts with two dashes (U+002D HYPHEN-MINUS)
	    if (charCode(token.value, 0) !== 0x002D || charCode(token.value, 1) !== 0x002D) {
	        return 0;
	    }

	    return 1;
	}

	// https://drafts.csswg.org/css-color-4/#hex-notation
	// The syntax of a <hex-color> is a <hash-token> token whose value consists of 3, 4, 6, or 8 hexadecimal digits.
	// In other words, a hex color is written as a hash character, "#", followed by some number of digits 0-9 or
	// letters a-f (the case of the letters doesn’t matter - #00ff00 is identical to #00FF00).
	function hexColor(token) {
	    if (token === null || token.type !== TYPE$5.Hash) {
	        return 0;
	    }

	    var length = token.value.length;

	    // valid values (length): #rgb (4), #rgba (5), #rrggbb (7), #rrggbbaa (9)
	    if (length !== 4 && length !== 5 && length !== 7 && length !== 9) {
	        return 0;
	    }

	    for (var i = 1; i < length; i++) {
	        if (!isHexDigit$3(token.value.charCodeAt(i))) {
	            return 0;
	        }
	    }

	    return 1;
	}

	function idSelector(token) {
	    if (token === null || token.type !== TYPE$5.Hash) {
	        return 0;
	    }

	    if (!isIdentifierStart$2(charCode(token.value, 1), charCode(token.value, 2), charCode(token.value, 3))) {
	        return 0;
	    }

	    return 1;
	}

	// https://drafts.csswg.org/css-syntax/#any-value
	// It represents the entirety of what a valid declaration can have as its value.
	function declarationValue(token, getNextToken) {
	    if (!token) {
	        return 0;
	    }

	    var length = 0;
	    var level = 0;
	    var startIdx = token.index;

	    // The <declaration-value> production matches any sequence of one or more tokens,
	    // so long as the sequence ...
	    scan:
	    do {
	        switch (token.type) {
	            // ... does not contain <bad-string-token>, <bad-url-token>,
	            case TYPE$5.BadString:
	            case TYPE$5.BadUrl:
	                break scan;

	            // ... unmatched <)-token>, <]-token>, or <}-token>,
	            case TYPE$5.RightCurlyBracket:
	            case TYPE$5.RightParenthesis:
	            case TYPE$5.RightSquareBracket:
	                if (token.balance > token.index || token.balance < startIdx) {
	                    break scan;
	                }

	                level--;
	                break;

	            // ... or top-level <semicolon-token> tokens
	            case TYPE$5.Semicolon:
	                if (level === 0) {
	                    break scan;
	                }

	                break;

	            // ... or <delim-token> tokens with a value of "!"
	            case TYPE$5.Delim:
	                if (token.value === '!' && level === 0) {
	                    break scan;
	                }

	                break;

	            case TYPE$5.Function:
	            case TYPE$5.LeftParenthesis:
	            case TYPE$5.LeftSquareBracket:
	            case TYPE$5.LeftCurlyBracket:
	                level++;
	                break;
	        }

	        length++;

	        // until balance closing
	        if (token.balance <= startIdx) {
	            break;
	        }
	    } while (token = getNextToken(length));

	    return length;
	}

	// https://drafts.csswg.org/css-syntax/#any-value
	// The <any-value> production is identical to <declaration-value>, but also
	// allows top-level <semicolon-token> tokens and <delim-token> tokens
	// with a value of "!". It represents the entirety of what valid CSS can be in any context.
	function anyValue(token, getNextToken) {
	    if (!token) {
	        return 0;
	    }

	    var startIdx = token.index;
	    var length = 0;

	    // The <any-value> production matches any sequence of one or more tokens,
	    // so long as the sequence ...
	    scan:
	    do {
	        switch (token.type) {
	            // ... does not contain <bad-string-token>, <bad-url-token>,
	            case TYPE$5.BadString:
	            case TYPE$5.BadUrl:
	                break scan;

	            // ... unmatched <)-token>, <]-token>, or <}-token>,
	            case TYPE$5.RightCurlyBracket:
	            case TYPE$5.RightParenthesis:
	            case TYPE$5.RightSquareBracket:
	                if (token.balance > token.index || token.balance < startIdx) {
	                    break scan;
	                }

	                break;
	        }

	        length++;

	        // until balance closing
	        if (token.balance <= startIdx) {
	            break;
	        }
	    } while (token = getNextToken(length));

	    return length;
	}

	// =========================
	// Dimensions
	//

	function dimension(type) {
	    return function(token, getNextToken, opts) {
	        if (token === null || token.type !== TYPE$5.Dimension) {
	            return 0;
	        }

	        var numberEnd = consumeNumber$2(token.value, 0);

	        // check unit
	        if (type !== null) {
	            // check for IE postfix hack, i.e. 123px\0 or 123px\9
	            var reverseSolidusOffset = token.value.indexOf('\\', numberEnd);
	            var unit = reverseSolidusOffset === -1 || !isPostfixIeHack(token.value, reverseSolidusOffset)
	                ? token.value.substr(numberEnd)
	                : token.value.substring(numberEnd, reverseSolidusOffset);

	            if (type.hasOwnProperty(unit.toLowerCase()) === false) {
	                return 0;
	            }
	        }

	        // check range if specified
	        if (outOfRange(opts, token.value, numberEnd)) {
	            return 0;
	        }

	        return 1;
	    };
	}

	// =========================
	// Percentage
	//

	// §5.5. Percentages: the <percentage> type
	// https://drafts.csswg.org/css-values-4/#percentages
	function percentage(token, getNextToken, opts) {
	    // ... corresponds to the <percentage-token> production
	    if (token === null || token.type !== TYPE$5.Percentage) {
	        return 0;
	    }

	    // check range if specified
	    if (outOfRange(opts, token.value, token.value.length - 1)) {
	        return 0;
	    }

	    return 1;
	}

	// =========================
	// Numeric
	//

	// https://drafts.csswg.org/css-values-4/#numbers
	// The value <zero> represents a literal number with the value 0. Expressions that merely
	// evaluate to a <number> with the value 0 (for example, calc(0)) do not match <zero>;
	// only literal <number-token>s do.
	function zero(next) {
	    if (typeof next !== 'function') {
	        next = function() {
	            return 0;
	        };
	    }

	    return function(token, getNextToken, opts) {
	        if (token !== null && token.type === TYPE$5.Number) {
	            if (Number(token.value) === 0) {
	                return 1;
	            }
	        }

	        return next(token, getNextToken, opts);
	    };
	}

	// § 5.3. Real Numbers: the <number> type
	// https://drafts.csswg.org/css-values-4/#numbers
	// Number values are denoted by <number>, and represent real numbers, possibly with a fractional component.
	// ... It corresponds to the <number-token> production
	function number(token, getNextToken, opts) {
	    if (token === null) {
	        return 0;
	    }

	    var numberEnd = consumeNumber$2(token.value, 0);
	    var isNumber = numberEnd === token.value.length;
	    if (!isNumber && !isPostfixIeHack(token.value, numberEnd)) {
	        return 0;
	    }

	    // check range if specified
	    if (outOfRange(opts, token.value, numberEnd)) {
	        return 0;
	    }

	    return 1;
	}

	// §5.2. Integers: the <integer> type
	// https://drafts.csswg.org/css-values-4/#integers
	function integer(token, getNextToken, opts) {
	    // ... corresponds to a subset of the <number-token> production
	    if (token === null || token.type !== TYPE$5.Number) {
	        return 0;
	    }

	    // The first digit of an integer may be immediately preceded by `-` or `+` to indicate the integer’s sign.
	    var i = token.value.charCodeAt(0) === 0x002B ||       // U+002B PLUS SIGN (+)
	            token.value.charCodeAt(0) === 0x002D ? 1 : 0; // U+002D HYPHEN-MINUS (-)

	    // When written literally, an integer is one or more decimal digits 0 through 9 ...
	    for (; i < token.value.length; i++) {
	        if (!isDigit$3(token.value.charCodeAt(i))) {
	            return 0;
	        }
	    }

	    // check range if specified
	    if (outOfRange(opts, token.value, i)) {
	        return 0;
	    }

	    return 1;
	}

	var generic = {
	    // token types
	    'ident-token': tokenType(TYPE$5.Ident),
	    'function-token': tokenType(TYPE$5.Function),
	    'at-keyword-token': tokenType(TYPE$5.AtKeyword),
	    'hash-token': tokenType(TYPE$5.Hash),
	    'string-token': tokenType(TYPE$5.String),
	    'bad-string-token': tokenType(TYPE$5.BadString),
	    'url-token': tokenType(TYPE$5.Url),
	    'bad-url-token': tokenType(TYPE$5.BadUrl),
	    'delim-token': tokenType(TYPE$5.Delim),
	    'number-token': tokenType(TYPE$5.Number),
	    'percentage-token': tokenType(TYPE$5.Percentage),
	    'dimension-token': tokenType(TYPE$5.Dimension),
	    'whitespace-token': tokenType(TYPE$5.WhiteSpace),
	    'CDO-token': tokenType(TYPE$5.CDO),
	    'CDC-token': tokenType(TYPE$5.CDC),
	    'colon-token': tokenType(TYPE$5.Colon),
	    'semicolon-token': tokenType(TYPE$5.Semicolon),
	    'comma-token': tokenType(TYPE$5.Comma),
	    '[-token': tokenType(TYPE$5.LeftSquareBracket),
	    ']-token': tokenType(TYPE$5.RightSquareBracket),
	    '(-token': tokenType(TYPE$5.LeftParenthesis),
	    ')-token': tokenType(TYPE$5.RightParenthesis),
	    '{-token': tokenType(TYPE$5.LeftCurlyBracket),
	    '}-token': tokenType(TYPE$5.RightCurlyBracket),

	    // token type aliases
	    'string': tokenType(TYPE$5.String),
	    'ident': tokenType(TYPE$5.Ident),

	    // complex types
	    'custom-ident': customIdent,
	    'custom-property-name': customPropertyName,
	    'hex-color': hexColor,
	    'id-selector': idSelector, // element( <id-selector> )
	    'an-plus-b': genericAnPlusB,
	    'urange': genericUrange,
	    'declaration-value': declarationValue,
	    'any-value': anyValue,

	    // dimensions
	    'dimension': calc(dimension(null)),
	    'angle': calc(dimension(ANGLE)),
	    'decibel': calc(dimension(DECIBEL)),
	    'frequency': calc(dimension(FREQUENCY)),
	    'flex': calc(dimension(FLEX)),
	    'length': calc(zero(dimension(LENGTH))),
	    'resolution': calc(dimension(RESOLUTION)),
	    'semitones': calc(dimension(SEMITONES)),
	    'time': calc(dimension(TIME)),

	    // percentage
	    'percentage': calc(percentage),

	    // numeric
	    'zero': zero(),
	    'number': calc(number),
	    'integer': calc(integer),

	    // old IE stuff
	    '-ms-legacy-expression': func('expression')
	};

	var _SyntaxError$1 = function SyntaxError(message, input, offset) {
	    var error = createCustomError('SyntaxError', message);

	    error.input = input;
	    error.offset = offset;
	    error.rawMessage = message;
	    error.message = error.rawMessage + '\n' +
	        '  ' + error.input + '\n' +
	        '--' + new Array((error.offset || error.input.length) + 1).join('-') + '^';

	    return error;
	};

	var TAB = 9;
	var N$1 = 10;
	var F = 12;
	var R = 13;
	var SPACE = 32;

	var Tokenizer = function(str) {
	    this.str = str;
	    this.pos = 0;
	};

	Tokenizer.prototype = {
	    charCodeAt: function(pos) {
	        return pos < this.str.length ? this.str.charCodeAt(pos) : 0;
	    },
	    charCode: function() {
	        return this.charCodeAt(this.pos);
	    },
	    nextCharCode: function() {
	        return this.charCodeAt(this.pos + 1);
	    },
	    nextNonWsCode: function(pos) {
	        return this.charCodeAt(this.findWsEnd(pos));
	    },
	    findWsEnd: function(pos) {
	        for (; pos < this.str.length; pos++) {
	            var code = this.str.charCodeAt(pos);
	            if (code !== R && code !== N$1 && code !== F && code !== SPACE && code !== TAB) {
	                break;
	            }
	        }

	        return pos;
	    },
	    substringToPos: function(end) {
	        return this.str.substring(this.pos, this.pos = end);
	    },
	    eat: function(code) {
	        if (this.charCode() !== code) {
	            this.error('Expect `' + String.fromCharCode(code) + '`');
	        }

	        this.pos++;
	    },
	    peek: function() {
	        return this.pos < this.str.length ? this.str.charAt(this.pos++) : '';
	    },
	    error: function(message) {
	        throw new _SyntaxError$1(message, this.str, this.pos);
	    }
	};

	var tokenizer$1 = Tokenizer;

	var TAB$1 = 9;
	var N$2 = 10;
	var F$1 = 12;
	var R$1 = 13;
	var SPACE$1 = 32;
	var EXCLAMATIONMARK = 33;    // !
	var NUMBERSIGN = 35;         // #
	var AMPERSAND = 38;          // &
	var APOSTROPHE = 39;         // '
	var LEFTPARENTHESIS = 40;    // (
	var RIGHTPARENTHESIS = 41;   // )
	var ASTERISK = 42;           // *
	var PLUSSIGN$2 = 43;           // +
	var COMMA = 44;              // ,
	var HYPERMINUS = 45;         // -
	var LESSTHANSIGN = 60;       // <
	var GREATERTHANSIGN = 62;    // >
	var QUESTIONMARK$1 = 63;       // ?
	var COMMERCIALAT = 64;       // @
	var LEFTSQUAREBRACKET = 91;  // [
	var RIGHTSQUAREBRACKET = 93; // ]
	var LEFTCURLYBRACKET = 123;  // {
	var VERTICALLINE = 124;      // |
	var RIGHTCURLYBRACKET = 125; // }
	var INFINITY = 8734;         // ∞
	var NAME_CHAR = createCharMap(function(ch) {
	    return /[a-zA-Z0-9\-]/.test(ch);
	});
	var COMBINATOR_PRECEDENCE = {
	    ' ': 1,
	    '&&': 2,
	    '||': 3,
	    '|': 4
	};

	function createCharMap(fn) {
	    var array = typeof Uint32Array === 'function' ? new Uint32Array(128) : new Array(128);
	    for (var i = 0; i < 128; i++) {
	        array[i] = fn(String.fromCharCode(i)) ? 1 : 0;
	    }
	    return array;
	}

	function scanSpaces(tokenizer) {
	    return tokenizer.substringToPos(
	        tokenizer.findWsEnd(tokenizer.pos)
	    );
	}

	function scanWord(tokenizer) {
	    var end = tokenizer.pos;

	    for (; end < tokenizer.str.length; end++) {
	        var code = tokenizer.str.charCodeAt(end);
	        if (code >= 128 || NAME_CHAR[code] === 0) {
	            break;
	        }
	    }

	    if (tokenizer.pos === end) {
	        tokenizer.error('Expect a keyword');
	    }

	    return tokenizer.substringToPos(end);
	}

	function scanNumber(tokenizer) {
	    var end = tokenizer.pos;

	    for (; end < tokenizer.str.length; end++) {
	        var code = tokenizer.str.charCodeAt(end);
	        if (code < 48 || code > 57) {
	            break;
	        }
	    }

	    if (tokenizer.pos === end) {
	        tokenizer.error('Expect a number');
	    }

	    return tokenizer.substringToPos(end);
	}

	function scanString(tokenizer) {
	    var end = tokenizer.str.indexOf('\'', tokenizer.pos + 1);

	    if (end === -1) {
	        tokenizer.pos = tokenizer.str.length;
	        tokenizer.error('Expect an apostrophe');
	    }

	    return tokenizer.substringToPos(end + 1);
	}

	function readMultiplierRange(tokenizer) {
	    var min = null;
	    var max = null;

	    tokenizer.eat(LEFTCURLYBRACKET);

	    min = scanNumber(tokenizer);

	    if (tokenizer.charCode() === COMMA) {
	        tokenizer.pos++;
	        if (tokenizer.charCode() !== RIGHTCURLYBRACKET) {
	            max = scanNumber(tokenizer);
	        }
	    } else {
	        max = min;
	    }

	    tokenizer.eat(RIGHTCURLYBRACKET);

	    return {
	        min: Number(min),
	        max: max ? Number(max) : 0
	    };
	}

	function readMultiplier(tokenizer) {
	    var range = null;
	    var comma = false;

	    switch (tokenizer.charCode()) {
	        case ASTERISK:
	            tokenizer.pos++;

	            range = {
	                min: 0,
	                max: 0
	            };

	            break;

	        case PLUSSIGN$2:
	            tokenizer.pos++;

	            range = {
	                min: 1,
	                max: 0
	            };

	            break;

	        case QUESTIONMARK$1:
	            tokenizer.pos++;

	            range = {
	                min: 0,
	                max: 1
	            };

	            break;

	        case NUMBERSIGN:
	            tokenizer.pos++;

	            comma = true;

	            if (tokenizer.charCode() === LEFTCURLYBRACKET) {
	                range = readMultiplierRange(tokenizer);
	            } else {
	                range = {
	                    min: 1,
	                    max: 0
	                };
	            }

	            break;

	        case LEFTCURLYBRACKET:
	            range = readMultiplierRange(tokenizer);
	            break;

	        default:
	            return null;
	    }

	    return {
	        type: 'Multiplier',
	        comma: comma,
	        min: range.min,
	        max: range.max,
	        term: null
	    };
	}

	function maybeMultiplied(tokenizer, node) {
	    var multiplier = readMultiplier(tokenizer);

	    if (multiplier !== null) {
	        multiplier.term = node;
	        return multiplier;
	    }

	    return node;
	}

	function maybeToken(tokenizer) {
	    var ch = tokenizer.peek();

	    if (ch === '') {
	        return null;
	    }

	    return {
	        type: 'Token',
	        value: ch
	    };
	}

	function readProperty(tokenizer) {
	    var name;

	    tokenizer.eat(LESSTHANSIGN);
	    tokenizer.eat(APOSTROPHE);

	    name = scanWord(tokenizer);

	    tokenizer.eat(APOSTROPHE);
	    tokenizer.eat(GREATERTHANSIGN);

	    return maybeMultiplied(tokenizer, {
	        type: 'Property',
	        name: name
	    });
	}

	// https://drafts.csswg.org/css-values-3/#numeric-ranges
	// 4.1. Range Restrictions and Range Definition Notation
	//
	// Range restrictions can be annotated in the numeric type notation using CSS bracketed
	// range notation—[min,max]—within the angle brackets, after the identifying keyword,
	// indicating a closed range between (and including) min and max.
	// For example, <integer [0, 10]> indicates an integer between 0 and 10, inclusive.
	function readTypeRange(tokenizer) {
	    // use null for Infinity to make AST format JSON serializable/deserializable
	    var min = null; // -Infinity
	    var max = null; // Infinity
	    var sign = 1;

	    tokenizer.eat(LEFTSQUAREBRACKET);

	    if (tokenizer.charCode() === HYPERMINUS) {
	        tokenizer.peek();
	        sign = -1;
	    }

	    if (sign == -1 && tokenizer.charCode() === INFINITY) {
	        tokenizer.peek();
	    } else {
	        min = sign * Number(scanNumber(tokenizer));
	    }

	    scanSpaces(tokenizer);
	    tokenizer.eat(COMMA);
	    scanSpaces(tokenizer);

	    if (tokenizer.charCode() === INFINITY) {
	        tokenizer.peek();
	    } else {
	        sign = 1;

	        if (tokenizer.charCode() === HYPERMINUS) {
	            tokenizer.peek();
	            sign = -1;
	        }

	        max = sign * Number(scanNumber(tokenizer));
	    }

	    tokenizer.eat(RIGHTSQUAREBRACKET);

	    // If no range is indicated, either by using the bracketed range notation
	    // or in the property description, then [−∞,∞] is assumed.
	    if (min === null && max === null) {
	        return null;
	    }

	    return {
	        type: 'Range',
	        min: min,
	        max: max
	    };
	}

	function readType(tokenizer) {
	    var name;
	    var opts = null;

	    tokenizer.eat(LESSTHANSIGN);
	    name = scanWord(tokenizer);

	    if (tokenizer.charCode() === LEFTPARENTHESIS &&
	        tokenizer.nextCharCode() === RIGHTPARENTHESIS) {
	        tokenizer.pos += 2;
	        name += '()';
	    }

	    if (tokenizer.charCodeAt(tokenizer.findWsEnd(tokenizer.pos)) === LEFTSQUAREBRACKET) {
	        scanSpaces(tokenizer);
	        opts = readTypeRange(tokenizer);
	    }

	    tokenizer.eat(GREATERTHANSIGN);

	    return maybeMultiplied(tokenizer, {
	        type: 'Type',
	        name: name,
	        opts: opts
	    });
	}

	function readKeywordOrFunction(tokenizer) {
	    var name;

	    name = scanWord(tokenizer);

	    if (tokenizer.charCode() === LEFTPARENTHESIS) {
	        tokenizer.pos++;

	        return {
	            type: 'Function',
	            name: name
	        };
	    }

	    return maybeMultiplied(tokenizer, {
	        type: 'Keyword',
	        name: name
	    });
	}

	function regroupTerms(terms, combinators) {
	    function createGroup(terms, combinator) {
	        return {
	            type: 'Group',
	            terms: terms,
	            combinator: combinator,
	            disallowEmpty: false,
	            explicit: false
	        };
	    }

	    combinators = Object.keys(combinators).sort(function(a, b) {
	        return COMBINATOR_PRECEDENCE[a] - COMBINATOR_PRECEDENCE[b];
	    });

	    while (combinators.length > 0) {
	        var combinator = combinators.shift();
	        for (var i = 0, subgroupStart = 0; i < terms.length; i++) {
	            var term = terms[i];
	            if (term.type === 'Combinator') {
	                if (term.value === combinator) {
	                    if (subgroupStart === -1) {
	                        subgroupStart = i - 1;
	                    }
	                    terms.splice(i, 1);
	                    i--;
	                } else {
	                    if (subgroupStart !== -1 && i - subgroupStart > 1) {
	                        terms.splice(
	                            subgroupStart,
	                            i - subgroupStart,
	                            createGroup(terms.slice(subgroupStart, i), combinator)
	                        );
	                        i = subgroupStart + 1;
	                    }
	                    subgroupStart = -1;
	                }
	            }
	        }

	        if (subgroupStart !== -1 && combinators.length) {
	            terms.splice(
	                subgroupStart,
	                i - subgroupStart,
	                createGroup(terms.slice(subgroupStart, i), combinator)
	            );
	        }
	    }

	    return combinator;
	}

	function readImplicitGroup(tokenizer) {
	    var terms = [];
	    var combinators = {};
	    var token;
	    var prevToken = null;
	    var prevTokenPos = tokenizer.pos;

	    while (token = peek(tokenizer)) {
	        if (token.type !== 'Spaces') {
	            if (token.type === 'Combinator') {
	                // check for combinator in group beginning and double combinator sequence
	                if (prevToken === null || prevToken.type === 'Combinator') {
	                    tokenizer.pos = prevTokenPos;
	                    tokenizer.error('Unexpected combinator');
	                }

	                combinators[token.value] = true;
	            } else if (prevToken !== null && prevToken.type !== 'Combinator') {
	                combinators[' '] = true;  // a b
	                terms.push({
	                    type: 'Combinator',
	                    value: ' '
	                });
	            }

	            terms.push(token);
	            prevToken = token;
	            prevTokenPos = tokenizer.pos;
	        }
	    }

	    // check for combinator in group ending
	    if (prevToken !== null && prevToken.type === 'Combinator') {
	        tokenizer.pos -= prevTokenPos;
	        tokenizer.error('Unexpected combinator');
	    }

	    return {
	        type: 'Group',
	        terms: terms,
	        combinator: regroupTerms(terms, combinators) || ' ',
	        disallowEmpty: false,
	        explicit: false
	    };
	}

	function readGroup(tokenizer) {
	    var result;

	    tokenizer.eat(LEFTSQUAREBRACKET);
	    result = readImplicitGroup(tokenizer);
	    tokenizer.eat(RIGHTSQUAREBRACKET);

	    result.explicit = true;

	    if (tokenizer.charCode() === EXCLAMATIONMARK) {
	        tokenizer.pos++;
	        result.disallowEmpty = true;
	    }

	    return result;
	}

	function peek(tokenizer) {
	    var code = tokenizer.charCode();

	    if (code < 128 && NAME_CHAR[code] === 1) {
	        return readKeywordOrFunction(tokenizer);
	    }

	    switch (code) {
	        case RIGHTSQUAREBRACKET:
	            // don't eat, stop scan a group
	            break;

	        case LEFTSQUAREBRACKET:
	            return maybeMultiplied(tokenizer, readGroup(tokenizer));

	        case LESSTHANSIGN:
	            return tokenizer.nextCharCode() === APOSTROPHE
	                ? readProperty(tokenizer)
	                : readType(tokenizer);

	        case VERTICALLINE:
	            return {
	                type: 'Combinator',
	                value: tokenizer.substringToPos(
	                    tokenizer.nextCharCode() === VERTICALLINE
	                        ? tokenizer.pos + 2
	                        : tokenizer.pos + 1
	                )
	            };

	        case AMPERSAND:
	            tokenizer.pos++;
	            tokenizer.eat(AMPERSAND);

	            return {
	                type: 'Combinator',
	                value: '&&'
	            };

	        case COMMA:
	            tokenizer.pos++;
	            return {
	                type: 'Comma'
	            };

	        case APOSTROPHE:
	            return maybeMultiplied(tokenizer, {
	                type: 'String',
	                value: scanString(tokenizer)
	            });

	        case SPACE$1:
	        case TAB$1:
	        case N$2:
	        case R$1:
	        case F$1:
	            return {
	                type: 'Spaces',
	                value: scanSpaces(tokenizer)
	            };

	        case COMMERCIALAT:
	            code = tokenizer.nextCharCode();

	            if (code < 128 && NAME_CHAR[code] === 1) {
	                tokenizer.pos++;
	                return {
	                    type: 'AtKeyword',
	                    name: scanWord(tokenizer)
	                };
	            }

	            return maybeToken(tokenizer);

	        case ASTERISK:
	        case PLUSSIGN$2:
	        case QUESTIONMARK$1:
	        case NUMBERSIGN:
	        case EXCLAMATIONMARK:
	            // prohibited tokens (used as a multiplier start)
	            break;

	        case LEFTCURLYBRACKET:
	            // LEFTCURLYBRACKET is allowed since mdn/data uses it w/o quoting
	            // check next char isn't a number, because it's likely a disjoined multiplier
	            code = tokenizer.nextCharCode();

	            if (code < 48 || code > 57) {
	                return maybeToken(tokenizer);
	            }

	            break;

	        default:
	            return maybeToken(tokenizer);
	    }
	}

	function parse(source) {
	    var tokenizer = new tokenizer$1(source);
	    var result = readImplicitGroup(tokenizer);

	    if (tokenizer.pos !== source.length) {
	        tokenizer.error('Unexpected input');
	    }

	    // reduce redundant groups with single group term
	    if (result.terms.length === 1 && result.terms[0].type === 'Group') {
	        result = result.terms[0];
	    }

	    return result;
	}

	// warm up parse to elimitate code branches that never execute
	// fix soft deoptimizations (insufficient type feedback)
	parse('[a&&<b>#|<\'c\'>*||e() f{2} /,(% g#{1,2} h{2,})]!');

	var parse_1 = parse;

	var noop$2 = function() {};

	function ensureFunction(value) {
	    return typeof value === 'function' ? value : noop$2;
	}

	var walk = function(node, options, context) {
	    function walk(node) {
	        enter.call(context, node);

	        switch (node.type) {
	            case 'Group':
	                node.terms.forEach(walk);
	                break;

	            case 'Multiplier':
	                walk(node.term);
	                break;

	            case 'Type':
	            case 'Property':
	            case 'Keyword':
	            case 'AtKeyword':
	            case 'Function':
	            case 'String':
	            case 'Token':
	            case 'Comma':
	                break;

	            default:
	                throw new Error('Unknown type: ' + node.type);
	        }

	        leave.call(context, node);
	    }

	    var enter = noop$2;
	    var leave = noop$2;

	    if (typeof options === 'function') {
	        enter = options;
	    } else if (options) {
	        enter = ensureFunction(options.enter);
	        leave = ensureFunction(options.leave);
	    }

	    if (enter === noop$2 && leave === noop$2) {
	        throw new Error('Neither `enter` nor `leave` walker handler is set or both aren\'t a function');
	    }

	    walk(node);
	};

	var tokenStream = new TokenStream_1();
	var astToTokens = {
	    decorator: function(handlers) {
	        var curNode = null;
	        var prev = { len: 0, node: null };
	        var nodes = [prev];
	        var buffer = '';

	        return {
	            children: handlers.children,
	            node: function(node) {
	                var tmp = curNode;
	                curNode = node;
	                handlers.node.call(this, node);
	                curNode = tmp;
	            },
	            chunk: function(chunk) {
	                buffer += chunk;
	                if (prev.node !== curNode) {
	                    nodes.push({
	                        len: chunk.length,
	                        node: curNode
	                    });
	                } else {
	                    prev.len += chunk.length;
	                }
	            },
	            result: function() {
	                return prepareTokens(buffer, nodes);
	            }
	        };
	    }
	};

	function prepareTokens(str, nodes) {
	    var tokens = [];
	    var nodesOffset = 0;
	    var nodesIndex = 0;
	    var currentNode = nodes ? nodes[nodesIndex].node : null;

	    tokenizer(str, tokenStream);

	    while (!tokenStream.eof) {
	        if (nodes) {
	            while (nodesIndex < nodes.length && nodesOffset + nodes[nodesIndex].len <= tokenStream.tokenStart) {
	                nodesOffset += nodes[nodesIndex++].len;
	                currentNode = nodes[nodesIndex].node;
	            }
	        }

	        tokens.push({
	            type: tokenStream.tokenType,
	            value: tokenStream.getTokenValue(),
	            index: tokenStream.tokenIndex, // TODO: remove it, temporary solution
	            balance: tokenStream.balance[tokenStream.tokenIndex], // TODO: remove it, temporary solution
	            node: currentNode
	        });
	        tokenStream.next();
	        // console.log({ ...tokens[tokens.length - 1], node: undefined });
	    }

	    return tokens;
	}

	var prepareTokens_1 = function(value, syntax) {
	    if (typeof value === 'string') {
	        return prepareTokens(value, null);
	    }

	    return syntax.generate(value, astToTokens);
	};

	var MATCH = { type: 'Match' };
	var MISMATCH = { type: 'Mismatch' };
	var DISALLOW_EMPTY = { type: 'DisallowEmpty' };
	var LEFTPARENTHESIS$1 = 40;  // (
	var RIGHTPARENTHESIS$1 = 41; // )

	function createCondition(match, thenBranch, elseBranch) {
	    // reduce node count
	    if (thenBranch === MATCH && elseBranch === MISMATCH) {
	        return match;
	    }

	    if (match === MATCH && thenBranch === MATCH && elseBranch === MATCH) {
	        return match;
	    }

	    if (match.type === 'If' && match.else === MISMATCH && thenBranch === MATCH) {
	        thenBranch = match.then;
	        match = match.match;
	    }

	    return {
	        type: 'If',
	        match: match,
	        then: thenBranch,
	        else: elseBranch
	    };
	}

	function isFunctionType(name) {
	    return (
	        name.length > 2 &&
	        name.charCodeAt(name.length - 2) === LEFTPARENTHESIS$1 &&
	        name.charCodeAt(name.length - 1) === RIGHTPARENTHESIS$1
	    );
	}

	function isEnumCapatible(term) {
	    return (
	        term.type === 'Keyword' ||
	        term.type === 'AtKeyword' ||
	        term.type === 'Function' ||
	        term.type === 'Type' && isFunctionType(term.name)
	    );
	}

	function buildGroupMatchGraph(combinator, terms, atLeastOneTermMatched) {
	    switch (combinator) {
	        case ' ':
	            // Juxtaposing components means that all of them must occur, in the given order.
	            //
	            // a b c
	            // =
	            // match a
	            //   then match b
	            //     then match c
	            //       then MATCH
	            //       else MISMATCH
	            //     else MISMATCH
	            //   else MISMATCH
	            var result = MATCH;

	            for (var i = terms.length - 1; i >= 0; i--) {
	                var term = terms[i];

	                result = createCondition(
	                    term,
	                    result,
	                    MISMATCH
	                );
	            }
	            return result;

	        case '|':
	            // A bar (|) separates two or more alternatives: exactly one of them must occur.
	            //
	            // a | b | c
	            // =
	            // match a
	            //   then MATCH
	            //   else match b
	            //     then MATCH
	            //     else match c
	            //       then MATCH
	            //       else MISMATCH

	            var result = MISMATCH;
	            var map = null;

	            for (var i = terms.length - 1; i >= 0; i--) {
	                var term = terms[i];

	                // reduce sequence of keywords into a Enum
	                if (isEnumCapatible(term)) {
	                    if (map === null && i > 0 && isEnumCapatible(terms[i - 1])) {
	                        map = Object.create(null);
	                        result = createCondition(
	                            {
	                                type: 'Enum',
	                                map: map
	                            },
	                            MATCH,
	                            result
	                        );
	                    }

	                    if (map !== null) {
	                        var key = (isFunctionType(term.name) ? term.name.slice(0, -1) : term.name).toLowerCase();
	                        if (key in map === false) {
	                            map[key] = term;
	                            continue;
	                        }
	                    }
	                }

	                map = null;

	                // create a new conditonal node
	                result = createCondition(
	                    term,
	                    MATCH,
	                    result
	                );
	            }
	            return result;

	        case '&&':
	            // A double ampersand (&&) separates two or more components,
	            // all of which must occur, in any order.

	            // Use MatchOnce for groups with a large number of terms,
	            // since &&-groups produces at least N!-node trees
	            if (terms.length > 5) {
	                return {
	                    type: 'MatchOnce',
	                    terms: terms,
	                    all: true
	                };
	            }

	            // Use a combination tree for groups with small number of terms
	            //
	            // a && b && c
	            // =
	            // match a
	            //   then [b && c]
	            //   else match b
	            //     then [a && c]
	            //     else match c
	            //       then [a && b]
	            //       else MISMATCH
	            //
	            // a && b
	            // =
	            // match a
	            //   then match b
	            //     then MATCH
	            //     else MISMATCH
	            //   else match b
	            //     then match a
	            //       then MATCH
	            //       else MISMATCH
	            //     else MISMATCH
	            var result = MISMATCH;

	            for (var i = terms.length - 1; i >= 0; i--) {
	                var term = terms[i];
	                var thenClause;

	                if (terms.length > 1) {
	                    thenClause = buildGroupMatchGraph(
	                        combinator,
	                        terms.filter(function(newGroupTerm) {
	                            return newGroupTerm !== term;
	                        }),
	                        false
	                    );
	                } else {
	                    thenClause = MATCH;
	                }

	                result = createCondition(
	                    term,
	                    thenClause,
	                    result
	                );
	            }
	            return result;

	        case '||':
	            // A double bar (||) separates two or more options:
	            // one or more of them must occur, in any order.

	            // Use MatchOnce for groups with a large number of terms,
	            // since ||-groups produces at least N!-node trees
	            if (terms.length > 5) {
	                return {
	                    type: 'MatchOnce',
	                    terms: terms,
	                    all: false
	                };
	            }

	            // Use a combination tree for groups with small number of terms
	            //
	            // a || b || c
	            // =
	            // match a
	            //   then [b || c]
	            //   else match b
	            //     then [a || c]
	            //     else match c
	            //       then [a || b]
	            //       else MISMATCH
	            //
	            // a || b
	            // =
	            // match a
	            //   then match b
	            //     then MATCH
	            //     else MATCH
	            //   else match b
	            //     then match a
	            //       then MATCH
	            //       else MATCH
	            //     else MISMATCH
	            var result = atLeastOneTermMatched ? MATCH : MISMATCH;

	            for (var i = terms.length - 1; i >= 0; i--) {
	                var term = terms[i];
	                var thenClause;

	                if (terms.length > 1) {
	                    thenClause = buildGroupMatchGraph(
	                        combinator,
	                        terms.filter(function(newGroupTerm) {
	                            return newGroupTerm !== term;
	                        }),
	                        true
	                    );
	                } else {
	                    thenClause = MATCH;
	                }

	                result = createCondition(
	                    term,
	                    thenClause,
	                    result
	                );
	            }
	            return result;
	    }
	}

	function buildMultiplierMatchGraph(node) {
	    var result = MATCH;
	    var matchTerm = buildMatchGraph(node.term);

	    if (node.max === 0) {
	        // disable repeating of empty match to prevent infinite loop
	        matchTerm = createCondition(
	            matchTerm,
	            DISALLOW_EMPTY,
	            MISMATCH
	        );

	        // an occurrence count is not limited, make a cycle;
	        // to collect more terms on each following matching mismatch
	        result = createCondition(
	            matchTerm,
	            null, // will be a loop
	            MISMATCH
	        );

	        result.then = createCondition(
	            MATCH,
	            MATCH,
	            result // make a loop
	        );

	        if (node.comma) {
	            result.then.else = createCondition(
	                { type: 'Comma', syntax: node },
	                result,
	                MISMATCH
	            );
	        }
	    } else {
	        // create a match node chain for [min .. max] interval with optional matches
	        for (var i = node.min || 1; i <= node.max; i++) {
	            if (node.comma && result !== MATCH) {
	                result = createCondition(
	                    { type: 'Comma', syntax: node },
	                    result,
	                    MISMATCH
	                );
	            }

	            result = createCondition(
	                matchTerm,
	                createCondition(
	                    MATCH,
	                    MATCH,
	                    result
	                ),
	                MISMATCH
	            );
	        }
	    }

	    if (node.min === 0) {
	        // allow zero match
	        result = createCondition(
	            MATCH,
	            MATCH,
	            result
	        );
	    } else {
	        // create a match node chain to collect [0 ... min - 1] required matches
	        for (var i = 0; i < node.min - 1; i++) {
	            if (node.comma && result !== MATCH) {
	                result = createCondition(
	                    { type: 'Comma', syntax: node },
	                    result,
	                    MISMATCH
	                );
	            }

	            result = createCondition(
	                matchTerm,
	                result,
	                MISMATCH
	            );
	        }
	    }

	    return result;
	}

	function buildMatchGraph(node) {
	    if (typeof node === 'function') {
	        return {
	            type: 'Generic',
	            fn: node
	        };
	    }

	    switch (node.type) {
	        case 'Group':
	            var result = buildGroupMatchGraph(
	                node.combinator,
	                node.terms.map(buildMatchGraph),
	                false
	            );

	            if (node.disallowEmpty) {
	                result = createCondition(
	                    result,
	                    DISALLOW_EMPTY,
	                    MISMATCH
	                );
	            }

	            return result;

	        case 'Multiplier':
	            return buildMultiplierMatchGraph(node);

	        case 'Type':
	        case 'Property':
	            return {
	                type: node.type,
	                name: node.name,
	                syntax: node
	            };

	        case 'Keyword':
	            return {
	                type: node.type,
	                name: node.name.toLowerCase(),
	                syntax: node
	            };

	        case 'AtKeyword':
	            return {
	                type: node.type,
	                name: '@' + node.name.toLowerCase(),
	                syntax: node
	            };

	        case 'Function':
	            return {
	                type: node.type,
	                name: node.name.toLowerCase() + '(',
	                syntax: node
	            };

	        case 'String':
	            // convert a one char length String to a Token
	            if (node.value.length === 3) {
	                return {
	                    type: 'Token',
	                    value: node.value.charAt(1),
	                    syntax: node
	                };
	            }

	            // otherwise use it as is
	            return {
	                type: node.type,
	                value: node.value.substr(1, node.value.length - 2).replace(/\\'/g, '\''),
	                syntax: node
	            };

	        case 'Token':
	            return {
	                type: node.type,
	                value: node.value,
	                syntax: node
	            };

	        case 'Comma':
	            return {
	                type: node.type,
	                syntax: node
	            };

	        default:
	            throw new Error('Unknown node type:', node.type);
	    }
	}

	var matchGraph = {
	    MATCH: MATCH,
	    MISMATCH: MISMATCH,
	    DISALLOW_EMPTY: DISALLOW_EMPTY,
	    buildMatchGraph: function(syntaxTree, ref) {
	        if (typeof syntaxTree === 'string') {
	            syntaxTree = parse_1(syntaxTree);
	        }

	        return {
	            type: 'MatchGraph',
	            match: buildMatchGraph(syntaxTree),
	            syntax: ref || null,
	            source: syntaxTree
	        };
	    }
	};

	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

	var MATCH$1 = matchGraph.MATCH;
	var MISMATCH$1 = matchGraph.MISMATCH;
	var DISALLOW_EMPTY$1 = matchGraph.DISALLOW_EMPTY;
	var TYPE$6 = _const.TYPE;

	var STUB = 0;
	var TOKEN = 1;
	var OPEN_SYNTAX = 2;
	var CLOSE_SYNTAX = 3;

	var EXIT_REASON_MATCH = 'Match';
	var EXIT_REASON_MISMATCH = 'Mismatch';
	var EXIT_REASON_ITERATION_LIMIT = 'Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)';

	var ITERATION_LIMIT = 15000;
	var totalIterationCount = 0;

	function reverseList(list) {
	    var prev = null;
	    var next = null;
	    var item = list;

	    while (item !== null) {
	        next = item.prev;
	        item.prev = prev;
	        prev = item;
	        item = next;
	    }

	    return prev;
	}

	function areStringsEqualCaseInsensitive(testStr, referenceStr) {
	    if (testStr.length !== referenceStr.length) {
	        return false;
	    }

	    for (var i = 0; i < testStr.length; i++) {
	        var testCode = testStr.charCodeAt(i);
	        var referenceCode = referenceStr.charCodeAt(i);

	        // testCode.toLowerCase() for U+0041 LATIN CAPITAL LETTER A (A) .. U+005A LATIN CAPITAL LETTER Z (Z).
	        if (testCode >= 0x0041 && testCode <= 0x005A) {
	            testCode = testCode | 32;
	        }

	        if (testCode !== referenceCode) {
	            return false;
	        }
	    }

	    return true;
	}

	function isCommaContextStart(token) {
	    if (token === null) {
	        return true;
	    }

	    return (
	        token.type === TYPE$6.Comma ||
	        token.type === TYPE$6.Function ||
	        token.type === TYPE$6.LeftParenthesis ||
	        token.type === TYPE$6.LeftSquareBracket ||
	        token.type === TYPE$6.LeftCurlyBracket ||
	        token.type === TYPE$6.Delim
	    );
	}

	function isCommaContextEnd(token) {
	    if (token === null) {
	        return true;
	    }

	    return (
	        token.type === TYPE$6.RightParenthesis ||
	        token.type === TYPE$6.RightSquareBracket ||
	        token.type === TYPE$6.RightCurlyBracket ||
	        token.type === TYPE$6.Delim
	    );
	}

	function internalMatch(tokens, state, syntaxes) {
	    function moveToNextToken() {
	        do {
	            tokenIndex++;
	            token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;
	        } while (token !== null && (token.type === TYPE$6.WhiteSpace || token.type === TYPE$6.Comment));
	    }

	    function getNextToken(offset) {
	        var nextIndex = tokenIndex + offset;

	        return nextIndex < tokens.length ? tokens[nextIndex] : null;
	    }

	    function stateSnapshotFromSyntax(nextState, prev) {
	        return {
	            nextState: nextState,
	            matchStack: matchStack,
	            syntaxStack: syntaxStack,
	            thenStack: thenStack,
	            tokenIndex: tokenIndex,
	            prev: prev
	        };
	    }

	    function pushThenStack(nextState) {
	        thenStack = {
	            nextState: nextState,
	            matchStack: matchStack,
	            syntaxStack: syntaxStack,
	            prev: thenStack
	        };
	    }

	    function pushElseStack(nextState) {
	        elseStack = stateSnapshotFromSyntax(nextState, elseStack);
	    }

	    function addTokenToMatch() {
	        matchStack = {
	            type: TOKEN,
	            syntax: state.syntax,
	            token: token,
	            prev: matchStack
	        };

	        moveToNextToken();
	        syntaxStash = null;

	        if (tokenIndex > longestMatch) {
	            longestMatch = tokenIndex;
	        }
	    }

	    function openSyntax() {
	        syntaxStack = {
	            syntax: state.syntax,
	            opts: state.syntax.opts || (syntaxStack !== null && syntaxStack.opts) || null,
	            prev: syntaxStack
	        };

	        matchStack = {
	            type: OPEN_SYNTAX,
	            syntax: state.syntax,
	            token: matchStack.token,
	            prev: matchStack
	        };
	    }

	    function closeSyntax() {
	        if (matchStack.type === OPEN_SYNTAX) {
	            matchStack = matchStack.prev;
	        } else {
	            matchStack = {
	                type: CLOSE_SYNTAX,
	                syntax: syntaxStack.syntax,
	                token: matchStack.token,
	                prev: matchStack
	            };
	        }

	        syntaxStack = syntaxStack.prev;
	    }

	    var syntaxStack = null;
	    var thenStack = null;
	    var elseStack = null;

	    // null – stashing allowed, nothing stashed
	    // false – stashing disabled, nothing stashed
	    // anithing else – fail stashable syntaxes, some syntax stashed
	    var syntaxStash = null;

	    var iterationCount = 0; // count iterations and prevent infinite loop
	    var exitReason = null;

	    var token = null;
	    var tokenIndex = -1;
	    var longestMatch = 0;
	    var matchStack = {
	        type: STUB,
	        syntax: null,
	        token: null,
	        prev: null
	    };

	    moveToNextToken();

	    while (exitReason === null && ++iterationCount < ITERATION_LIMIT) {
	        // function mapList(list, fn) {
	        //     var result = [];
	        //     while (list) {
	        //         result.unshift(fn(list));
	        //         list = list.prev;
	        //     }
	        //     return result;
	        // }
	        // console.log('--\n',
	        //     '#' + iterationCount,
	        //     require('util').inspect({
	        //         match: mapList(matchStack, x => x.type === TOKEN ? x.token && x.token.value : x.syntax ? ({ [OPEN_SYNTAX]: '<', [CLOSE_SYNTAX]: '</' }[x.type] || x.type) + '!' + x.syntax.name : null),
	        //         token: token && token.value,
	        //         tokenIndex,
	        //         syntax: syntax.type + (syntax.id ? ' #' + syntax.id : '')
	        //     }, { depth: null })
	        // );
	        switch (state.type) {
	            case 'Match':
	                if (thenStack === null) {
	                    // turn to MISMATCH when some tokens left unmatched
	                    if (token !== null) {
	                        // doesn't mismatch if just one token left and it's an IE hack
	                        if (tokenIndex !== tokens.length - 1 || (token.value !== '\\0' && token.value !== '\\9')) {
	                            state = MISMATCH$1;
	                            break;
	                        }
	                    }

	                    // break the main loop, return a result - MATCH
	                    exitReason = EXIT_REASON_MATCH;
	                    break;
	                }

	                // go to next syntax (`then` branch)
	                state = thenStack.nextState;

	                // check match is not empty
	                if (state === DISALLOW_EMPTY$1) {
	                    if (thenStack.matchStack === matchStack) {
	                        state = MISMATCH$1;
	                        break;
	                    } else {
	                        state = MATCH$1;
	                    }
	                }

	                // close syntax if needed
	                while (thenStack.syntaxStack !== syntaxStack) {
	                    closeSyntax();
	                }

	                // pop stack
	                thenStack = thenStack.prev;
	                break;

	            case 'Mismatch':
	                // when some syntax is stashed
	                if (syntaxStash !== null && syntaxStash !== false) {
	                    // there is no else branches or a branch reduce match stack
	                    if (elseStack === null || tokenIndex > elseStack.tokenIndex) {
	                        // restore state from the stash
	                        elseStack = syntaxStash;
	                        syntaxStash = false; // disable stashing
	                    }
	                } else if (elseStack === null) {
	                    // no else branches -> break the main loop
	                    // return a result - MISMATCH
	                    exitReason = EXIT_REASON_MISMATCH;
	                    break;
	                }

	                // go to next syntax (`else` branch)
	                state = elseStack.nextState;

	                // restore all the rest stack states
	                thenStack = elseStack.thenStack;
	                syntaxStack = elseStack.syntaxStack;
	                matchStack = elseStack.matchStack;
	                tokenIndex = elseStack.tokenIndex;
	                token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;

	                // pop stack
	                elseStack = elseStack.prev;
	                break;

	            case 'MatchGraph':
	                state = state.match;
	                break;

	            case 'If':
	                // IMPORTANT: else stack push must go first,
	                // since it stores the state of thenStack before changes
	                if (state.else !== MISMATCH$1) {
	                    pushElseStack(state.else);
	                }

	                if (state.then !== MATCH$1) {
	                    pushThenStack(state.then);
	                }

	                state = state.match;
	                break;

	            case 'MatchOnce':
	                state = {
	                    type: 'MatchOnceBuffer',
	                    syntax: state,
	                    index: 0,
	                    mask: 0
	                };
	                break;

	            case 'MatchOnceBuffer':
	                var terms = state.syntax.terms;

	                if (state.index === terms.length) {
	                    // no matches at all or it's required all terms to be matched
	                    if (state.mask === 0 || state.syntax.all) {
	                        state = MISMATCH$1;
	                        break;
	                    }

	                    // a partial match is ok
	                    state = MATCH$1;
	                    break;
	                }

	                // all terms are matched
	                if (state.mask === (1 << terms.length) - 1) {
	                    state = MATCH$1;
	                    break;
	                }

	                for (; state.index < terms.length; state.index++) {
	                    var matchFlag = 1 << state.index;

	                    if ((state.mask & matchFlag) === 0) {
	                        // IMPORTANT: else stack push must go first,
	                        // since it stores the state of thenStack before changes
	                        pushElseStack(state);
	                        pushThenStack({
	                            type: 'AddMatchOnce',
	                            syntax: state.syntax,
	                            mask: state.mask | matchFlag
	                        });

	                        // match
	                        state = terms[state.index++];
	                        break;
	                    }
	                }
	                break;

	            case 'AddMatchOnce':
	                state = {
	                    type: 'MatchOnceBuffer',
	                    syntax: state.syntax,
	                    index: 0,
	                    mask: state.mask
	                };
	                break;

	            case 'Enum':
	                if (token !== null) {
	                    var name = token.value.toLowerCase();

	                    // drop \0 and \9 hack from keyword name
	                    if (name.indexOf('\\') !== -1) {
	                        name = name.replace(/\\[09].*$/, '');
	                    }

	                    if (hasOwnProperty$1.call(state.map, name)) {
	                        state = state.map[name];
	                        break;
	                    }
	                }

	                state = MISMATCH$1;
	                break;

	            case 'Generic':
	                var opts = syntaxStack !== null ? syntaxStack.opts : null;
	                var lastTokenIndex = tokenIndex + Math.floor(state.fn(token, getNextToken, opts));

	                if (!isNaN(lastTokenIndex) && lastTokenIndex > tokenIndex) {
	                    while (tokenIndex < lastTokenIndex) {
	                        addTokenToMatch();
	                    }

	                    state = MATCH$1;
	                } else {
	                    state = MISMATCH$1;
	                }

	                break;

	            case 'Type':
	            case 'Property':
	                var syntaxDict = state.type === 'Type' ? 'types' : 'properties';
	                var dictSyntax = hasOwnProperty$1.call(syntaxes, syntaxDict) ? syntaxes[syntaxDict][state.name] : null;

	                if (!dictSyntax || !dictSyntax.match) {
	                    throw new Error(
	                        'Bad syntax reference: ' +
	                        (state.type === 'Type'
	                            ? '<' + state.name + '>'
	                            : '<\'' + state.name + '\'>')
	                    );
	                }

	                // stash a syntax for types with low priority
	                if (syntaxStash !== false && token !== null && state.type === 'Type') {
	                    var lowPriorityMatching =
	                        // https://drafts.csswg.org/css-values-4/#custom-idents
	                        // When parsing positionally-ambiguous keywords in a property value, a <custom-ident> production
	                        // can only claim the keyword if no other unfulfilled production can claim it.
	                        (state.name === 'custom-ident' && token.type === TYPE$6.Ident) ||

	                        // https://drafts.csswg.org/css-values-4/#lengths
	                        // ... if a `0` could be parsed as either a <number> or a <length> in a property (such as line-height),
	                        // it must parse as a <number>
	                        (state.name === 'length' && token.value === '0');

	                    if (lowPriorityMatching) {
	                        if (syntaxStash === null) {
	                            syntaxStash = stateSnapshotFromSyntax(state, elseStack);
	                        }

	                        state = MISMATCH$1;
	                        break;
	                    }
	                }

	                openSyntax();
	                state = dictSyntax.match;
	                break;

	            case 'Keyword':
	                var name = state.name;

	                if (token !== null) {
	                    var keywordName = token.value;

	                    // drop \0 and \9 hack from keyword name
	                    if (keywordName.indexOf('\\') !== -1) {
	                        keywordName = keywordName.replace(/\\[09].*$/, '');
	                    }

	                    if (areStringsEqualCaseInsensitive(keywordName, name)) {
	                        addTokenToMatch();
	                        state = MATCH$1;
	                        break;
	                    }
	                }

	                state = MISMATCH$1;
	                break;

	            case 'AtKeyword':
	            case 'Function':
	                if (token !== null && areStringsEqualCaseInsensitive(token.value, state.name)) {
	                    addTokenToMatch();
	                    state = MATCH$1;
	                    break;
	                }

	                state = MISMATCH$1;
	                break;

	            case 'Token':
	                if (token !== null && token.value === state.value) {
	                    addTokenToMatch();
	                    state = MATCH$1;
	                    break;
	                }

	                state = MISMATCH$1;
	                break;

	            case 'Comma':
	                if (token !== null && token.type === TYPE$6.Comma) {
	                    if (isCommaContextStart(matchStack.token)) {
	                        state = MISMATCH$1;
	                    } else {
	                        addTokenToMatch();
	                        state = isCommaContextEnd(token) ? MISMATCH$1 : MATCH$1;
	                    }
	                } else {
	                    state = isCommaContextStart(matchStack.token) || isCommaContextEnd(token) ? MATCH$1 : MISMATCH$1;
	                }

	                break;

	            case 'String':
	                var string = '';

	                for (var lastTokenIndex = tokenIndex; lastTokenIndex < tokens.length && string.length < state.value.length; lastTokenIndex++) {
	                    string += tokens[lastTokenIndex].value;
	                }

	                if (areStringsEqualCaseInsensitive(string, state.value)) {
	                    while (tokenIndex < lastTokenIndex) {
	                        addTokenToMatch();
	                    }

	                    state = MATCH$1;
	                } else {
	                    state = MISMATCH$1;
	                }

	                break;

	            default:
	                throw new Error('Unknown node type: ' + state.type);
	        }
	    }

	    totalIterationCount += iterationCount;

	    switch (exitReason) {
	        case null:
	            console.warn('[csstree-match] BREAK after ' + ITERATION_LIMIT + ' iterations');
	            exitReason = EXIT_REASON_ITERATION_LIMIT;
	            matchStack = null;
	            break;

	        case EXIT_REASON_MATCH:
	            while (syntaxStack !== null) {
	                closeSyntax();
	            }
	            break;

	        default:
	            matchStack = null;
	    }

	    return {
	        tokens: tokens,
	        reason: exitReason,
	        iterations: iterationCount,
	        match: matchStack,
	        longestMatch: longestMatch
	    };
	}

	function matchAsList(tokens, matchGraph, syntaxes) {
	    var matchResult = internalMatch(tokens, matchGraph, syntaxes || {});

	    if (matchResult.match !== null) {
	        var item = reverseList(matchResult.match).prev;

	        matchResult.match = [];

	        while (item !== null) {
	            switch (item.type) {
	                case STUB:
	                    break;

	                case OPEN_SYNTAX:
	                case CLOSE_SYNTAX:
	                    matchResult.match.push({
	                        type: item.type,
	                        syntax: item.syntax
	                    });
	                    break;

	                default:
	                    matchResult.match.push({
	                        token: item.token.value,
	                        node: item.token.node
	                    });
	                    break;
	            }

	            item = item.prev;
	        }
	    }

	    return matchResult;
	}

	function matchAsTree(tokens, matchGraph, syntaxes) {
	    var matchResult = internalMatch(tokens, matchGraph, syntaxes || {});

	    if (matchResult.match === null) {
	        return matchResult;
	    }

	    var item = matchResult.match;
	    var host = matchResult.match = {
	        syntax: matchGraph.syntax || null,
	        match: []
	    };
	    var hostStack = [host];

	    // revert a list and start with 2nd item since 1st is a stub item
	    item = reverseList(item).prev;

	    // build a tree
	    while (item !== null) {
	        switch (item.type) {
	            case OPEN_SYNTAX:
	                host.match.push(host = {
	                    syntax: item.syntax,
	                    match: []
	                });
	                hostStack.push(host);
	                break;

	            case CLOSE_SYNTAX:
	                hostStack.pop();
	                host = hostStack[hostStack.length - 1];
	                break;

	            default:
	                host.match.push({
	                    syntax: item.syntax || null,
	                    token: item.token.value,
	                    node: item.token.node
	                });
	        }

	        item = item.prev;
	    }

	    return matchResult;
	}

	var match = {
	    matchAsList: matchAsList,
	    matchAsTree: matchAsTree,
	    getTotalIterationCount: function() {
	        return totalIterationCount;
	    }
	};

	function getTrace(node) {
	    function shouldPutToTrace(syntax) {
	        if (syntax === null) {
	            return false;
	        }

	        return (
	            syntax.type === 'Type' ||
	            syntax.type === 'Property' ||
	            syntax.type === 'Keyword'
	        );
	    }

	    function hasMatch(matchNode) {
	        if (Array.isArray(matchNode.match)) {
	            // use for-loop for better perfomance
	            for (var i = 0; i < matchNode.match.length; i++) {
	                if (hasMatch(matchNode.match[i])) {
	                    if (shouldPutToTrace(matchNode.syntax)) {
	                        result.unshift(matchNode.syntax);
	                    }

	                    return true;
	                }
	            }
	        } else if (matchNode.node === node) {
	            result = shouldPutToTrace(matchNode.syntax)
	                ? [matchNode.syntax]
	                : [];

	            return true;
	        }

	        return false;
	    }

	    var result = null;

	    if (this.matched !== null) {
	        hasMatch(this.matched);
	    }

	    return result;
	}

	function testNode(match, node, fn) {
	    var trace = getTrace.call(match, node);

	    if (trace === null) {
	        return false;
	    }

	    return trace.some(fn);
	}

	function isType(node, type) {
	    return testNode(this, node, function(matchNode) {
	        return matchNode.type === 'Type' && matchNode.name === type;
	    });
	}

	function isProperty(node, property) {
	    return testNode(this, node, function(matchNode) {
	        return matchNode.type === 'Property' && matchNode.name === property;
	    });
	}

	function isKeyword(node) {
	    return testNode(this, node, function(matchNode) {
	        return matchNode.type === 'Keyword';
	    });
	}

	var trace = {
	    getTrace: getTrace,
	    isType: isType,
	    isProperty: isProperty,
	    isKeyword: isKeyword
	};

	function getFirstMatchNode(matchNode) {
	    if ('node' in matchNode) {
	        return matchNode.node;
	    }

	    return getFirstMatchNode(matchNode.match[0]);
	}

	function getLastMatchNode(matchNode) {
	    if ('node' in matchNode) {
	        return matchNode.node;
	    }

	    return getLastMatchNode(matchNode.match[matchNode.match.length - 1]);
	}

	function matchFragments(lexer, ast, match, type, name) {
	    function findFragments(matchNode) {
	        if (matchNode.syntax !== null &&
	            matchNode.syntax.type === type &&
	            matchNode.syntax.name === name) {
	            var start = getFirstMatchNode(matchNode);
	            var end = getLastMatchNode(matchNode);

	            lexer.syntax.walk(ast, function(node, item, list) {
	                if (node === start) {
	                    var nodes = new List_1();

	                    do {
	                        nodes.appendData(item.data);

	                        if (item.data === end) {
	                            break;
	                        }

	                        item = item.next;
	                    } while (item !== null);

	                    fragments.push({
	                        parent: list,
	                        nodes: nodes
	                    });
	                }
	            });
	        }

	        if (Array.isArray(matchNode.match)) {
	            matchNode.match.forEach(findFragments);
	        }
	    }

	    var fragments = [];

	    if (match.matched !== null) {
	        findFragments(match.matched);
	    }

	    return fragments;
	}

	var search = {
	    matchFragments: matchFragments
	};

	var hasOwnProperty$2 = Object.prototype.hasOwnProperty;

	function isValidNumber(value) {
	    // Number.isInteger(value) && value >= 0
	    return (
	        typeof value === 'number' &&
	        isFinite(value) &&
	        Math.floor(value) === value &&
	        value >= 0
	    );
	}

	function isValidLocation(loc) {
	    return (
	        Boolean(loc) &&
	        isValidNumber(loc.offset) &&
	        isValidNumber(loc.line) &&
	        isValidNumber(loc.column)
	    );
	}

	function createNodeStructureChecker(type, fields) {
	    return function checkNode(node, warn) {
	        if (!node || node.constructor !== Object) {
	            return warn(node, 'Type of node should be an Object');
	        }

	        for (var key in node) {
	            var valid = true;

	            if (hasOwnProperty$2.call(node, key) === false) {
	                continue;
	            }

	            if (key === 'type') {
	                if (node.type !== type) {
	                    warn(node, 'Wrong node type `' + node.type + '`, expected `' + type + '`');
	                }
	            } else if (key === 'loc') {
	                if (node.loc === null) {
	                    continue;
	                } else if (node.loc && node.loc.constructor === Object) {
	                    if (typeof node.loc.source !== 'string') {
	                        key += '.source';
	                    } else if (!isValidLocation(node.loc.start)) {
	                        key += '.start';
	                    } else if (!isValidLocation(node.loc.end)) {
	                        key += '.end';
	                    } else {
	                        continue;
	                    }
	                }

	                valid = false;
	            } else if (fields.hasOwnProperty(key)) {
	                for (var i = 0, valid = false; !valid && i < fields[key].length; i++) {
	                    var fieldType = fields[key][i];

	                    switch (fieldType) {
	                        case String:
	                            valid = typeof node[key] === 'string';
	                            break;

	                        case Boolean:
	                            valid = typeof node[key] === 'boolean';
	                            break;

	                        case null:
	                            valid = node[key] === null;
	                            break;

	                        default:
	                            if (typeof fieldType === 'string') {
	                                valid = node[key] && node[key].type === fieldType;
	                            } else if (Array.isArray(fieldType)) {
	                                valid = node[key] instanceof List_1;
	                            }
	                    }
	                }
	            } else {
	                warn(node, 'Unknown field `' + key + '` for ' + type + ' node type');
	            }

	            if (!valid) {
	                warn(node, 'Bad value for `' + type + '.' + key + '`');
	            }
	        }

	        for (var key in fields) {
	            if (hasOwnProperty$2.call(fields, key) &&
	                hasOwnProperty$2.call(node, key) === false) {
	                warn(node, 'Field `' + type + '.' + key + '` is missed');
	            }
	        }
	    };
	}

	function processStructure(name, nodeType) {
	    var structure = nodeType.structure;
	    var fields = {
	        type: String,
	        loc: true
	    };
	    var docs = {
	        type: '"' + name + '"'
	    };

	    for (var key in structure) {
	        if (hasOwnProperty$2.call(structure, key) === false) {
	            continue;
	        }

	        var docsTypes = [];
	        var fieldTypes = fields[key] = Array.isArray(structure[key])
	            ? structure[key].slice()
	            : [structure[key]];

	        for (var i = 0; i < fieldTypes.length; i++) {
	            var fieldType = fieldTypes[i];
	            if (fieldType === String || fieldType === Boolean) {
	                docsTypes.push(fieldType.name);
	            } else if (fieldType === null) {
	                docsTypes.push('null');
	            } else if (typeof fieldType === 'string') {
	                docsTypes.push('<' + fieldType + '>');
	            } else if (Array.isArray(fieldType)) {
	                docsTypes.push('List'); // TODO: use type enum
	            } else {
	                throw new Error('Wrong value `' + fieldType + '` in `' + name + '.' + key + '` structure definition');
	            }
	        }

	        docs[key] = docsTypes.join(' | ');
	    }

	    return {
	        docs: docs,
	        check: createNodeStructureChecker(name, fields)
	    };
	}

	var structure = {
	    getStructureFromConfig: function(config) {
	        var structure = {};

	        if (config.node) {
	            for (var name in config.node) {
	                if (hasOwnProperty$2.call(config.node, name)) {
	                    var nodeType = config.node[name];

	                    if (nodeType.structure) {
	                        structure[name] = processStructure(name, nodeType);
	                    } else {
	                        throw new Error('Missed `structure` field in `' + name + '` node type definition');
	                    }
	                }
	            }
	        }

	        return structure;
	    }
	};

	var SyntaxReferenceError$1 = error.SyntaxReferenceError;
	var MatchError$1 = error.MatchError;






	var buildMatchGraph$1 = matchGraph.buildMatchGraph;
	var matchAsTree$1 = match.matchAsTree;


	var getStructureFromConfig = structure.getStructureFromConfig;
	var cssWideKeywords$1 = buildMatchGraph$1('inherit | initial | unset');
	var cssWideKeywordsWithExpression = buildMatchGraph$1('inherit | initial | unset | <-ms-legacy-expression>');

	function dumpMapSyntax(map, compact, syntaxAsAst) {
	    var result = {};

	    for (var name in map) {
	        if (map[name].syntax) {
	            result[name] = syntaxAsAst
	                ? map[name].syntax
	                : generate_1(map[name].syntax, { compact: compact });
	        }
	    }

	    return result;
	}

	function valueHasVar(tokens) {
	    for (var i = 0; i < tokens.length; i++) {
	        if (tokens[i].value.toLowerCase() === 'var(') {
	            return true;
	        }
	    }

	    return false;
	}

	function buildMatchResult(match, error, iterations) {
	    return {
	        matched: match,
	        iterations: iterations,
	        error: error,
	        getTrace: trace.getTrace,
	        isType: trace.isType,
	        isProperty: trace.isProperty,
	        isKeyword: trace.isKeyword
	    };
	}

	function matchSyntax(lexer, syntax, value, useCommon) {
	    var tokens = prepareTokens_1(value, lexer.syntax);
	    var result;

	    if (valueHasVar(tokens)) {
	        return buildMatchResult(null, new Error('Matching for a tree with var() is not supported'));
	    }

	    if (useCommon) {
	        result = matchAsTree$1(tokens, lexer.valueCommonSyntax, lexer);
	    }

	    if (!useCommon || !result.match) {
	        result = matchAsTree$1(tokens, syntax.match, lexer);
	        if (!result.match) {
	            return buildMatchResult(
	                null,
	                new MatchError$1(result.reason, syntax.syntax, value, result),
	                result.iterations
	            );
	        }
	    }

	    return buildMatchResult(result.match, null, result.iterations);
	}

	var Lexer = function(config, syntax, structure) {
	    this.valueCommonSyntax = cssWideKeywords$1;
	    this.syntax = syntax;
	    this.generic = false;
	    this.atrules = {};
	    this.properties = {};
	    this.types = {};
	    this.structure = structure || getStructureFromConfig(config);

	    if (config) {
	        if (config.types) {
	            for (var name in config.types) {
	                this.addType_(name, config.types[name]);
	            }
	        }

	        if (config.generic) {
	            this.generic = true;
	            for (var name in generic) {
	                this.addType_(name, generic[name]);
	            }
	        }

	        if (config.atrules) {
	            for (var name in config.atrules) {
	                this.addAtrule_(name, config.atrules[name]);
	            }
	        }

	        if (config.properties) {
	            for (var name in config.properties) {
	                this.addProperty_(name, config.properties[name]);
	            }
	        }
	    }
	};

	Lexer.prototype = {
	    structure: {},
	    checkStructure: function(ast) {
	        function collectWarning(node, message) {
	            warns.push({
	                node: node,
	                message: message
	            });
	        }

	        var structure = this.structure;
	        var warns = [];

	        this.syntax.walk(ast, function(node) {
	            if (structure.hasOwnProperty(node.type)) {
	                structure[node.type].check(node, collectWarning);
	            } else {
	                collectWarning(node, 'Unknown node type `' + node.type + '`');
	            }
	        });

	        return warns.length ? warns : false;
	    },

	    createDescriptor: function(syntax, type, name) {
	        var ref = {
	            type: type,
	            name: name
	        };
	        var descriptor = {
	            type: type,
	            name: name,
	            syntax: null,
	            match: null
	        };

	        if (typeof syntax === 'function') {
	            descriptor.match = buildMatchGraph$1(syntax, ref);
	        } else {
	            if (typeof syntax === 'string') {
	                // lazy parsing on first access
	                Object.defineProperty(descriptor, 'syntax', {
	                    get: function() {
	                        Object.defineProperty(descriptor, 'syntax', {
	                            value: parse_1(syntax)
	                        });

	                        return descriptor.syntax;
	                    }
	                });
	            } else {
	                descriptor.syntax = syntax;
	            }

	            // lazy graph build on first access
	            Object.defineProperty(descriptor, 'match', {
	                get: function() {
	                    Object.defineProperty(descriptor, 'match', {
	                        value: buildMatchGraph$1(descriptor.syntax, ref)
	                    });

	                    return descriptor.match;
	                }
	            });
	        }

	        return descriptor;
	    },
	    addAtrule_: function(name, syntax) {
	        this.atrules[name] = {
	            prelude: syntax.prelude ? this.createDescriptor(syntax.prelude, 'AtrulePrelude', name) : null,
	            descriptors: syntax.descriptors
	                ? Object.keys(syntax.descriptors).reduce((res, name) => {
	                    res[name] = this.createDescriptor(syntax.descriptors[name], 'AtruleDescriptor', name);
	                    return res;
	                }, {})
	                : null
	        };
	    },
	    addProperty_: function(name, syntax) {
	        this.properties[name] = this.createDescriptor(syntax, 'Property', name);
	    },
	    addType_: function(name, syntax) {
	        this.types[name] = this.createDescriptor(syntax, 'Type', name);

	        if (syntax === generic['-ms-legacy-expression']) {
	            this.valueCommonSyntax = cssWideKeywordsWithExpression;
	        }
	    },

	    matchAtrulePrelude: function(atruleName, prelude) {
	        var atrule = names.keyword(atruleName);

	        var atrulePreludeSyntax = atrule.vendor
	            ? this.getAtrulePrelude(atrule.name) || this.getAtrulePrelude(atrule.basename)
	            : this.getAtrulePrelude(atrule.name);

	        if (!atrulePreludeSyntax) {
	            if (atrule.basename in this.atrules) {
	                return buildMatchResult(null, new Error('At-rule `' + atruleName + '` should not contain a prelude'));
	            }

	            return buildMatchResult(null, new SyntaxReferenceError$1('Unknown at-rule', atruleName));
	        }

	        return matchSyntax(this, atrulePreludeSyntax, prelude, true);
	    },
	    matchAtruleDescriptor: function(atruleName, descriptorName, value) {
	        var atrule = names.keyword(atruleName);
	        var descriptor = names.keyword(descriptorName);

	        var atruleEntry = atrule.vendor
	            ? this.atrules[atrule.name] || this.atrules[atrule.basename]
	            : this.atrules[atrule.name];

	        if (!atruleEntry) {
	            return buildMatchResult(null, new SyntaxReferenceError$1('Unknown at-rule', atruleName));
	        }

	        if (!atruleEntry.descriptors) {
	            return buildMatchResult(null, new Error('At-rule `' + atruleName + '` has no known descriptors'));
	        }

	        var atruleDescriptorSyntax = descriptor.vendor
	            ? atruleEntry.descriptors[descriptor.name] || atruleEntry.descriptors[descriptor.basename]
	            : atruleEntry.descriptors[descriptor.name];

	        if (!atruleDescriptorSyntax) {
	            return buildMatchResult(null, new SyntaxReferenceError$1('Unknown at-rule descriptor', descriptorName));
	        }

	        return matchSyntax(this, atruleDescriptorSyntax, value, true);
	    },
	    matchDeclaration: function(node) {
	        if (node.type !== 'Declaration') {
	            return buildMatchResult(null, new Error('Not a Declaration node'));
	        }

	        return this.matchProperty(node.property, node.value);
	    },
	    matchProperty: function(propertyName, value) {
	        var property = names.property(propertyName);

	        // don't match syntax for a custom property
	        if (property.custom) {
	            return buildMatchResult(null, new Error('Lexer matching doesn\'t applicable for custom properties'));
	        }

	        var propertySyntax = property.vendor
	            ? this.getProperty(property.name) || this.getProperty(property.basename)
	            : this.getProperty(property.name);

	        if (!propertySyntax) {
	            return buildMatchResult(null, new SyntaxReferenceError$1('Unknown property', propertyName));
	        }

	        return matchSyntax(this, propertySyntax, value, true);
	    },
	    matchType: function(typeName, value) {
	        var typeSyntax = this.getType(typeName);

	        if (!typeSyntax) {
	            return buildMatchResult(null, new SyntaxReferenceError$1('Unknown type', typeName));
	        }

	        return matchSyntax(this, typeSyntax, value, false);
	    },
	    match: function(syntax, value) {
	        if (typeof syntax !== 'string' && (!syntax || !syntax.type)) {
	            return buildMatchResult(null, new SyntaxReferenceError$1('Bad syntax'));
	        }

	        if (typeof syntax === 'string' || !syntax.match) {
	            syntax = this.createDescriptor(syntax, 'Type', 'anonymous');
	        }

	        return matchSyntax(this, syntax, value, false);
	    },

	    findValueFragments: function(propertyName, value, type, name) {
	        return search.matchFragments(this, value, this.matchProperty(propertyName, value), type, name);
	    },
	    findDeclarationValueFragments: function(declaration, type, name) {
	        return search.matchFragments(this, declaration.value, this.matchDeclaration(declaration), type, name);
	    },
	    findAllFragments: function(ast, type, name) {
	        var result = [];

	        this.syntax.walk(ast, {
	            visit: 'Declaration',
	            enter: function(declaration) {
	                result.push.apply(result, this.findDeclarationValueFragments(declaration, type, name));
	            }.bind(this)
	        });

	        return result;
	    },

	    getAtrulePrelude: function(atruleName) {
	        return this.atrules.hasOwnProperty(atruleName) ? this.atrules[atruleName].prelude : null;
	    },
	    getAtruleDescriptor: function(atruleName, name) {
	        return this.atrules.hasOwnProperty(atruleName) && this.atrules.declarators
	            ? this.atrules[atruleName].declarators[name] || null
	            : null;
	    },
	    getProperty: function(name) {
	        return this.properties.hasOwnProperty(name) ? this.properties[name] : null;
	    },
	    getType: function(name) {
	        return this.types.hasOwnProperty(name) ? this.types[name] : null;
	    },

	    validate: function() {
	        function validate(syntax, name, broken, descriptor) {
	            if (broken.hasOwnProperty(name)) {
	                return broken[name];
	            }

	            broken[name] = false;
	            if (descriptor.syntax !== null) {
	                walk(descriptor.syntax, function(node) {
	                    if (node.type !== 'Type' && node.type !== 'Property') {
	                        return;
	                    }

	                    var map = node.type === 'Type' ? syntax.types : syntax.properties;
	                    var brokenMap = node.type === 'Type' ? brokenTypes : brokenProperties;

	                    if (!map.hasOwnProperty(node.name) || validate(syntax, node.name, brokenMap, map[node.name])) {
	                        broken[name] = true;
	                    }
	                }, this);
	            }
	        }

	        var brokenTypes = {};
	        var brokenProperties = {};

	        for (var key in this.types) {
	            validate(this, key, brokenTypes, this.types[key]);
	        }

	        for (var key in this.properties) {
	            validate(this, key, brokenProperties, this.properties[key]);
	        }

	        brokenTypes = Object.keys(brokenTypes).filter(function(name) {
	            return brokenTypes[name];
	        });
	        brokenProperties = Object.keys(brokenProperties).filter(function(name) {
	            return brokenProperties[name];
	        });

	        if (brokenTypes.length || brokenProperties.length) {
	            return {
	                types: brokenTypes,
	                properties: brokenProperties
	            };
	        }

	        return null;
	    },
	    dump: function(syntaxAsAst, pretty) {
	        return {
	            generic: this.generic,
	            types: dumpMapSyntax(this.types, !pretty, syntaxAsAst),
	            properties: dumpMapSyntax(this.properties, !pretty, syntaxAsAst)
	        };
	    },
	    toString: function() {
	        return JSON.stringify(this.dump());
	    }
	};

	var Lexer_1 = Lexer;

	var definitionSyntax = {
	    SyntaxError: _SyntaxError$1,
	    parse: parse_1,
	    generate: generate_1,
	    walk: walk
	};

	var isBOM$2 = tokenizer.isBOM;

	var N$3 = 10;
	var F$2 = 12;
	var R$2 = 13;

	function computeLinesAndColumns(host, source) {
	    var sourceLength = source.length;
	    var lines = adoptBuffer(host.lines, sourceLength); // +1
	    var line = host.startLine;
	    var columns = adoptBuffer(host.columns, sourceLength);
	    var column = host.startColumn;
	    var startOffset = source.length > 0 ? isBOM$2(source.charCodeAt(0)) : 0;

	    for (var i = startOffset; i < sourceLength; i++) { // -1
	        var code = source.charCodeAt(i);

	        lines[i] = line;
	        columns[i] = column++;

	        if (code === N$3 || code === R$2 || code === F$2) {
	            if (code === R$2 && i + 1 < sourceLength && source.charCodeAt(i + 1) === N$3) {
	                i++;
	                lines[i] = line;
	                columns[i] = column;
	            }

	            line++;
	            column = 1;
	        }
	    }

	    lines[i] = line;
	    columns[i] = column;

	    host.lines = lines;
	    host.columns = columns;
	}

	var OffsetToLocation = function() {
	    this.lines = null;
	    this.columns = null;
	    this.linesAndColumnsComputed = false;
	};

	OffsetToLocation.prototype = {
	    setSource: function(source, startOffset, startLine, startColumn) {
	        this.source = source;
	        this.startOffset = typeof startOffset === 'undefined' ? 0 : startOffset;
	        this.startLine = typeof startLine === 'undefined' ? 1 : startLine;
	        this.startColumn = typeof startColumn === 'undefined' ? 1 : startColumn;
	        this.linesAndColumnsComputed = false;
	    },

	    ensureLinesAndColumnsComputed: function() {
	        if (!this.linesAndColumnsComputed) {
	            computeLinesAndColumns(this, this.source);
	            this.linesAndColumnsComputed = true;
	        }
	    },
	    getLocation: function(offset, filename) {
	        this.ensureLinesAndColumnsComputed();

	        return {
	            source: filename,
	            offset: this.startOffset + offset,
	            line: this.lines[offset],
	            column: this.columns[offset]
	        };
	    },
	    getLocationRange: function(start, end, filename) {
	        this.ensureLinesAndColumnsComputed();

	        return {
	            source: filename,
	            start: {
	                offset: this.startOffset + start,
	                line: this.lines[start],
	                column: this.columns[start]
	            },
	            end: {
	                offset: this.startOffset + end,
	                line: this.lines[end],
	                column: this.columns[end]
	            }
	        };
	    }
	};

	var OffsetToLocation_1 = OffsetToLocation;

	var TYPE$7 = tokenizer.TYPE;
	var WHITESPACE$2 = TYPE$7.WhiteSpace;
	var COMMENT$2 = TYPE$7.Comment;

	var sequence = function readSequence(recognizer) {
	    var children = this.createList();
	    var child = null;
	    var context = {
	        recognizer: recognizer,
	        space: null,
	        ignoreWS: false,
	        ignoreWSAfter: false
	    };

	    this.scanner.skipSC();

	    while (!this.scanner.eof) {
	        switch (this.scanner.tokenType) {
	            case COMMENT$2:
	                this.scanner.next();
	                continue;

	            case WHITESPACE$2:
	                if (context.ignoreWS) {
	                    this.scanner.next();
	                } else {
	                    context.space = this.WhiteSpace();
	                }
	                continue;
	        }

	        child = recognizer.getNode.call(this, context);

	        if (child === undefined) {
	            break;
	        }

	        if (context.space !== null) {
	            children.push(context.space);
	            context.space = null;
	        }

	        children.push(child);

	        if (context.ignoreWSAfter) {
	            context.ignoreWSAfter = false;
	            context.ignoreWS = true;
	        } else {
	            context.ignoreWS = false;
	        }
	    }

	    return children;
	};

	var findWhiteSpaceStart$1 = utils$1.findWhiteSpaceStart;

	var noop$3 = function() {};

	var TYPE$8 = _const.TYPE;
	var NAME$2 = _const.NAME;
	var WHITESPACE$3 = TYPE$8.WhiteSpace;
	var IDENT$2 = TYPE$8.Ident;
	var FUNCTION = TYPE$8.Function;
	var URL$1 = TYPE$8.Url;
	var HASH = TYPE$8.Hash;
	var PERCENTAGE = TYPE$8.Percentage;
	var NUMBER$2 = TYPE$8.Number;
	var NUMBERSIGN$1 = 0x0023; // U+0023 NUMBER SIGN (#)
	var NULL = 0;

	function createParseContext(name) {
	    return function() {
	        return this[name]();
	    };
	}

	function processConfig(config) {
	    var parserConfig = {
	        context: {},
	        scope: {},
	        atrule: {},
	        pseudo: {}
	    };

	    if (config.parseContext) {
	        for (var name in config.parseContext) {
	            switch (typeof config.parseContext[name]) {
	                case 'function':
	                    parserConfig.context[name] = config.parseContext[name];
	                    break;

	                case 'string':
	                    parserConfig.context[name] = createParseContext(config.parseContext[name]);
	                    break;
	            }
	        }
	    }

	    if (config.scope) {
	        for (var name in config.scope) {
	            parserConfig.scope[name] = config.scope[name];
	        }
	    }

	    if (config.atrule) {
	        for (var name in config.atrule) {
	            var atrule = config.atrule[name];

	            if (atrule.parse) {
	                parserConfig.atrule[name] = atrule.parse;
	            }
	        }
	    }

	    if (config.pseudo) {
	        for (var name in config.pseudo) {
	            var pseudo = config.pseudo[name];

	            if (pseudo.parse) {
	                parserConfig.pseudo[name] = pseudo.parse;
	            }
	        }
	    }

	    if (config.node) {
	        for (var name in config.node) {
	            parserConfig[name] = config.node[name].parse;
	        }
	    }

	    return parserConfig;
	}

	var create$1 = function createParser(config) {
	    var parser = {
	        scanner: new TokenStream_1(),
	        locationMap: new OffsetToLocation_1(),

	        filename: '<unknown>',
	        needPositions: false,
	        onParseError: noop$3,
	        onParseErrorThrow: false,
	        parseAtrulePrelude: true,
	        parseRulePrelude: true,
	        parseValue: true,
	        parseCustomProperty: false,

	        readSequence: sequence,

	        createList: function() {
	            return new List_1();
	        },
	        createSingleNodeList: function(node) {
	            return new List_1().appendData(node);
	        },
	        getFirstListNode: function(list) {
	            return list && list.first();
	        },
	        getLastListNode: function(list) {
	            return list.last();
	        },

	        parseWithFallback: function(consumer, fallback) {
	            var startToken = this.scanner.tokenIndex;

	            try {
	                return consumer.call(this);
	            } catch (e) {
	                if (this.onParseErrorThrow) {
	                    throw e;
	                }

	                var fallbackNode = fallback.call(this, startToken);

	                this.onParseErrorThrow = true;
	                this.onParseError(e, fallbackNode);
	                this.onParseErrorThrow = false;

	                return fallbackNode;
	            }
	        },

	        lookupNonWSType: function(offset) {
	            do {
	                var type = this.scanner.lookupType(offset++);
	                if (type !== WHITESPACE$3) {
	                    return type;
	                }
	            } while (type !== NULL);

	            return NULL;
	        },

	        eat: function(tokenType) {
	            if (this.scanner.tokenType !== tokenType) {
	                var offset = this.scanner.tokenStart;
	                var message = NAME$2[tokenType] + ' is expected';

	                // tweak message and offset
	                switch (tokenType) {
	                    case IDENT$2:
	                        // when identifier is expected but there is a function or url
	                        if (this.scanner.tokenType === FUNCTION || this.scanner.tokenType === URL$1) {
	                            offset = this.scanner.tokenEnd - 1;
	                            message = 'Identifier is expected but function found';
	                        } else {
	                            message = 'Identifier is expected';
	                        }
	                        break;

	                    case HASH:
	                        if (this.scanner.isDelim(NUMBERSIGN$1)) {
	                            this.scanner.next();
	                            offset++;
	                            message = 'Name is expected';
	                        }
	                        break;

	                    case PERCENTAGE:
	                        if (this.scanner.tokenType === NUMBER$2) {
	                            offset = this.scanner.tokenEnd;
	                            message = 'Percent sign is expected';
	                        }
	                        break;

	                    default:
	                        // when test type is part of another token show error for current position + 1
	                        // e.g. eat(HYPHENMINUS) will fail on "-foo", but pointing on "-" is odd
	                        if (this.scanner.source.charCodeAt(this.scanner.tokenStart) === tokenType) {
	                            offset = offset + 1;
	                        }
	                }

	                this.error(message, offset);
	            }

	            this.scanner.next();
	        },

	        consume: function(tokenType) {
	            var value = this.scanner.getTokenValue();

	            this.eat(tokenType);

	            return value;
	        },
	        consumeFunctionName: function() {
	            var name = this.scanner.source.substring(this.scanner.tokenStart, this.scanner.tokenEnd - 1);

	            this.eat(FUNCTION);

	            return name;
	        },

	        getLocation: function(start, end) {
	            if (this.needPositions) {
	                return this.locationMap.getLocationRange(
	                    start,
	                    end,
	                    this.filename
	                );
	            }

	            return null;
	        },
	        getLocationFromList: function(list) {
	            if (this.needPositions) {
	                var head = this.getFirstListNode(list);
	                var tail = this.getLastListNode(list);
	                return this.locationMap.getLocationRange(
	                    head !== null ? head.loc.start.offset - this.locationMap.startOffset : this.scanner.tokenStart,
	                    tail !== null ? tail.loc.end.offset - this.locationMap.startOffset : this.scanner.tokenStart,
	                    this.filename
	                );
	            }

	            return null;
	        },

	        error: function(message, offset) {
	            var location = typeof offset !== 'undefined' && offset < this.scanner.source.length
	                ? this.locationMap.getLocation(offset)
	                : this.scanner.eof
	                    ? this.locationMap.getLocation(findWhiteSpaceStart$1(this.scanner.source, this.scanner.source.length - 1))
	                    : this.locationMap.getLocation(this.scanner.tokenStart);

	            throw new _SyntaxError(
	                message || 'Unexpected input',
	                this.scanner.source,
	                location.offset,
	                location.line,
	                location.column
	            );
	        }
	    };

	    config = processConfig(config || {});
	    for (var key in config) {
	        parser[key] = config[key];
	    }

	    return function(source, options) {
	        options = options || {};

	        var context = options.context || 'default';
	        var ast;

	        tokenizer(source, parser.scanner);
	        parser.locationMap.setSource(
	            source,
	            options.offset,
	            options.line,
	            options.column
	        );

	        parser.filename = options.filename || '<unknown>';
	        parser.needPositions = Boolean(options.positions);
	        parser.onParseError = typeof options.onParseError === 'function' ? options.onParseError : noop$3;
	        parser.onParseErrorThrow = false;
	        parser.parseAtrulePrelude = 'parseAtrulePrelude' in options ? Boolean(options.parseAtrulePrelude) : true;
	        parser.parseRulePrelude = 'parseRulePrelude' in options ? Boolean(options.parseRulePrelude) : true;
	        parser.parseValue = 'parseValue' in options ? Boolean(options.parseValue) : true;
	        parser.parseCustomProperty = 'parseCustomProperty' in options ? Boolean(options.parseCustomProperty) : false;

	        if (!parser.context.hasOwnProperty(context)) {
	            throw new Error('Unknown context `' + context + '`');
	        }

	        ast = parser.context[context].call(parser, options);

	        if (!parser.scanner.eof) {
	            parser.error();
	        }

	        return ast;
	    };
	};

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

	/**
	 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
	 */
	var encode = function (number) {
	  if (0 <= number && number < intToCharMap.length) {
	    return intToCharMap[number];
	  }
	  throw new TypeError("Must be between 0 and 63: " + number);
	};

	/**
	 * Decode a single base 64 character code digit to an integer. Returns -1 on
	 * failure.
	 */
	var decode = function (charCode) {
	  var bigA = 65;     // 'A'
	  var bigZ = 90;     // 'Z'

	  var littleA = 97;  // 'a'
	  var littleZ = 122; // 'z'

	  var zero = 48;     // '0'
	  var nine = 57;     // '9'

	  var plus = 43;     // '+'
	  var slash = 47;    // '/'

	  var littleOffset = 26;
	  var numberOffset = 52;

	  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
	  if (bigA <= charCode && charCode <= bigZ) {
	    return (charCode - bigA);
	  }

	  // 26 - 51: abcdefghijklmnopqrstuvwxyz
	  if (littleA <= charCode && charCode <= littleZ) {
	    return (charCode - littleA + littleOffset);
	  }

	  // 52 - 61: 0123456789
	  if (zero <= charCode && charCode <= nine) {
	    return (charCode - zero + numberOffset);
	  }

	  // 62: +
	  if (charCode == plus) {
	    return 62;
	  }

	  // 63: /
	  if (charCode == slash) {
	    return 63;
	  }

	  // Invalid base64 digit.
	  return -1;
	};

	var base64 = {
		encode: encode,
		decode: decode
	};

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 *
	 * Based on the Base 64 VLQ implementation in Closure Compiler:
	 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
	 *
	 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are
	 * met:
	 *
	 *  * Redistributions of source code must retain the above copyright
	 *    notice, this list of conditions and the following disclaimer.
	 *  * Redistributions in binary form must reproduce the above
	 *    copyright notice, this list of conditions and the following
	 *    disclaimer in the documentation and/or other materials provided
	 *    with the distribution.
	 *  * Neither the name of Google Inc. nor the names of its
	 *    contributors may be used to endorse or promote products derived
	 *    from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */



	// A single base 64 digit can contain 6 bits of data. For the base 64 variable
	// length quantities we use in the source map spec, the first bit is the sign,
	// the next four bits are the actual value, and the 6th bit is the
	// continuation bit. The continuation bit tells us whether there are more
	// digits in this value following this digit.
	//
	//   Continuation
	//   |    Sign
	//   |    |
	//   V    V
	//   101011

	var VLQ_BASE_SHIFT = 5;

	// binary: 100000
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

	// binary: 011111
	var VLQ_BASE_MASK = VLQ_BASE - 1;

	// binary: 100000
	var VLQ_CONTINUATION_BIT = VLQ_BASE;

	/**
	 * Converts from a two-complement value to a value where the sign bit is
	 * placed in the least significant bit.  For example, as decimals:
	 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	 */
	function toVLQSigned(aValue) {
	  return aValue < 0
	    ? ((-aValue) << 1) + 1
	    : (aValue << 1) + 0;
	}

	/**
	 * Converts to a two-complement value from a value where the sign bit is
	 * placed in the least significant bit.  For example, as decimals:
	 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	 */
	function fromVLQSigned(aValue) {
	  var isNegative = (aValue & 1) === 1;
	  var shifted = aValue >> 1;
	  return isNegative
	    ? -shifted
	    : shifted;
	}

	/**
	 * Returns the base 64 VLQ encoded value.
	 */
	var encode$1 = function base64VLQ_encode(aValue) {
	  var encoded = "";
	  var digit;

	  var vlq = toVLQSigned(aValue);

	  do {
	    digit = vlq & VLQ_BASE_MASK;
	    vlq >>>= VLQ_BASE_SHIFT;
	    if (vlq > 0) {
	      // There are still more digits in this value, so we must make sure the
	      // continuation bit is marked.
	      digit |= VLQ_CONTINUATION_BIT;
	    }
	    encoded += base64.encode(digit);
	  } while (vlq > 0);

	  return encoded;
	};

	/**
	 * Decodes the next base 64 VLQ value from the given string and returns the
	 * value and the rest of the string via the out parameter.
	 */
	var decode$1 = function base64VLQ_decode(aStr, aIndex, aOutParam) {
	  var strLen = aStr.length;
	  var result = 0;
	  var shift = 0;
	  var continuation, digit;

	  do {
	    if (aIndex >= strLen) {
	      throw new Error("Expected more digits in base 64 VLQ value.");
	    }

	    digit = base64.decode(aStr.charCodeAt(aIndex++));
	    if (digit === -1) {
	      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
	    }

	    continuation = !!(digit & VLQ_CONTINUATION_BIT);
	    digit &= VLQ_BASE_MASK;
	    result = result + (digit << shift);
	    shift += VLQ_BASE_SHIFT;
	  } while (continuation);

	  aOutParam.value = fromVLQSigned(result);
	  aOutParam.rest = aIndex;
	};

	var base64Vlq = {
		encode: encode$1,
		decode: decode$1
	};

	var util = createCommonjsModule(function (module, exports) {
	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	/**
	 * This is a helper function for getting values from parameter/options
	 * objects.
	 *
	 * @param args The object we are extracting values from
	 * @param name The name of the property we are getting.
	 * @param defaultValue An optional value to return if the property is missing
	 * from the object. If this is not specified and the property is missing, an
	 * error will be thrown.
	 */
	function getArg(aArgs, aName, aDefaultValue) {
	  if (aName in aArgs) {
	    return aArgs[aName];
	  } else if (arguments.length === 3) {
	    return aDefaultValue;
	  } else {
	    throw new Error('"' + aName + '" is a required argument.');
	  }
	}
	exports.getArg = getArg;

	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;

	function urlParse(aUrl) {
	  var match = aUrl.match(urlRegexp);
	  if (!match) {
	    return null;
	  }
	  return {
	    scheme: match[1],
	    auth: match[2],
	    host: match[3],
	    port: match[4],
	    path: match[5]
	  };
	}
	exports.urlParse = urlParse;

	function urlGenerate(aParsedUrl) {
	  var url = '';
	  if (aParsedUrl.scheme) {
	    url += aParsedUrl.scheme + ':';
	  }
	  url += '//';
	  if (aParsedUrl.auth) {
	    url += aParsedUrl.auth + '@';
	  }
	  if (aParsedUrl.host) {
	    url += aParsedUrl.host;
	  }
	  if (aParsedUrl.port) {
	    url += ":" + aParsedUrl.port;
	  }
	  if (aParsedUrl.path) {
	    url += aParsedUrl.path;
	  }
	  return url;
	}
	exports.urlGenerate = urlGenerate;

	/**
	 * Normalizes a path, or the path portion of a URL:
	 *
	 * - Replaces consecutive slashes with one slash.
	 * - Removes unnecessary '.' parts.
	 * - Removes unnecessary '<dir>/..' parts.
	 *
	 * Based on code in the Node.js 'path' core module.
	 *
	 * @param aPath The path or url to normalize.
	 */
	function normalize(aPath) {
	  var path = aPath;
	  var url = urlParse(aPath);
	  if (url) {
	    if (!url.path) {
	      return aPath;
	    }
	    path = url.path;
	  }
	  var isAbsolute = exports.isAbsolute(path);

	  var parts = path.split(/\/+/);
	  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
	    part = parts[i];
	    if (part === '.') {
	      parts.splice(i, 1);
	    } else if (part === '..') {
	      up++;
	    } else if (up > 0) {
	      if (part === '') {
	        // The first part is blank if the path is absolute. Trying to go
	        // above the root is a no-op. Therefore we can remove all '..' parts
	        // directly after the root.
	        parts.splice(i + 1, up);
	        up = 0;
	      } else {
	        parts.splice(i, 2);
	        up--;
	      }
	    }
	  }
	  path = parts.join('/');

	  if (path === '') {
	    path = isAbsolute ? '/' : '.';
	  }

	  if (url) {
	    url.path = path;
	    return urlGenerate(url);
	  }
	  return path;
	}
	exports.normalize = normalize;

	/**
	 * Joins two paths/URLs.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be joined with the root.
	 *
	 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	 *   first.
	 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	 *   is updated with the result and aRoot is returned. Otherwise the result
	 *   is returned.
	 *   - If aPath is absolute, the result is aPath.
	 *   - Otherwise the two paths are joined with a slash.
	 * - Joining for example 'http://' and 'www.example.com' is also supported.
	 */
	function join(aRoot, aPath) {
	  if (aRoot === "") {
	    aRoot = ".";
	  }
	  if (aPath === "") {
	    aPath = ".";
	  }
	  var aPathUrl = urlParse(aPath);
	  var aRootUrl = urlParse(aRoot);
	  if (aRootUrl) {
	    aRoot = aRootUrl.path || '/';
	  }

	  // `join(foo, '//www.example.org')`
	  if (aPathUrl && !aPathUrl.scheme) {
	    if (aRootUrl) {
	      aPathUrl.scheme = aRootUrl.scheme;
	    }
	    return urlGenerate(aPathUrl);
	  }

	  if (aPathUrl || aPath.match(dataUrlRegexp)) {
	    return aPath;
	  }

	  // `join('http://', 'www.example.com')`
	  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
	    aRootUrl.host = aPath;
	    return urlGenerate(aRootUrl);
	  }

	  var joined = aPath.charAt(0) === '/'
	    ? aPath
	    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

	  if (aRootUrl) {
	    aRootUrl.path = joined;
	    return urlGenerate(aRootUrl);
	  }
	  return joined;
	}
	exports.join = join;

	exports.isAbsolute = function (aPath) {
	  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
	};

	/**
	 * Make a path relative to a URL or another path.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be made relative to aRoot.
	 */
	function relative(aRoot, aPath) {
	  if (aRoot === "") {
	    aRoot = ".";
	  }

	  aRoot = aRoot.replace(/\/$/, '');

	  // It is possible for the path to be above the root. In this case, simply
	  // checking whether the root is a prefix of the path won't work. Instead, we
	  // need to remove components from the root one by one, until either we find
	  // a prefix that fits, or we run out of components to remove.
	  var level = 0;
	  while (aPath.indexOf(aRoot + '/') !== 0) {
	    var index = aRoot.lastIndexOf("/");
	    if (index < 0) {
	      return aPath;
	    }

	    // If the only part of the root that is left is the scheme (i.e. http://,
	    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
	    // have exhausted all components, so the path is not relative to the root.
	    aRoot = aRoot.slice(0, index);
	    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
	      return aPath;
	    }

	    ++level;
	  }

	  // Make sure we add a "../" for each component we removed from the root.
	  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;

	var supportsNullProto = (function () {
	  var obj = Object.create(null);
	  return !('__proto__' in obj);
	}());

	function identity (s) {
	  return s;
	}

	/**
	 * Because behavior goes wacky when you set `__proto__` on objects, we
	 * have to prefix all the strings in our set with an arbitrary character.
	 *
	 * See https://github.com/mozilla/source-map/pull/31 and
	 * https://github.com/mozilla/source-map/issues/30
	 *
	 * @param String aStr
	 */
	function toSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return '$' + aStr;
	  }

	  return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;

	function fromSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return aStr.slice(1);
	  }

	  return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;

	function isProtoString(s) {
	  if (!s) {
	    return false;
	  }

	  var length = s.length;

	  if (length < 9 /* "__proto__".length */) {
	    return false;
	  }

	  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
	      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
	      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
	      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
	      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
	      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 9) !== 95  /* '_' */) {
	    return false;
	  }

	  for (var i = length - 10; i >= 0; i--) {
	    if (s.charCodeAt(i) !== 36 /* '$' */) {
	      return false;
	    }
	  }

	  return true;
	}

	/**
	 * Comparator between two mappings where the original positions are compared.
	 *
	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	 * mappings with the same original source/line/column, but different generated
	 * line and column the same. Useful when searching for a mapping with a
	 * stubbed out mapping.
	 */
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
	  var cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0 || onlyCompareOriginal) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;

	/**
	 * Comparator between two mappings with deflated source and name indices where
	 * the generated positions are compared.
	 *
	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	 * mappings with the same generated line and column, but different
	 * source/name/original line and column the same. Useful when searching for a
	 * mapping with a stubbed out mapping.
	 */
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
	  var cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0 || onlyCompareGenerated) {
	    return cmp;
	  }

	  cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

	function strcmp(aStr1, aStr2) {
	  if (aStr1 === aStr2) {
	    return 0;
	  }

	  if (aStr1 === null) {
	    return 1; // aStr2 !== null
	  }

	  if (aStr2 === null) {
	    return -1; // aStr1 !== null
	  }

	  if (aStr1 > aStr2) {
	    return 1;
	  }

	  return -1;
	}

	/**
	 * Comparator between two mappings with inflated source and name strings where
	 * the generated positions are compared.
	 */
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
	  var cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

	/**
	 * Strip any JSON XSSI avoidance prefix from the string (as documented
	 * in the source maps specification), and then parse the string as
	 * JSON.
	 */
	function parseSourceMapInput(str) {
	  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
	}
	exports.parseSourceMapInput = parseSourceMapInput;

	/**
	 * Compute the URL of a source given the the source root, the source's
	 * URL, and the source map's URL.
	 */
	function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
	  sourceURL = sourceURL || '';

	  if (sourceRoot) {
	    // This follows what Chrome does.
	    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
	      sourceRoot += '/';
	    }
	    // The spec says:
	    //   Line 4: An optional source root, useful for relocating source
	    //   files on a server or removing repeated values in the
	    //   “sources” entry.  This value is prepended to the individual
	    //   entries in the “source” field.
	    sourceURL = sourceRoot + sourceURL;
	  }

	  // Historically, SourceMapConsumer did not take the sourceMapURL as
	  // a parameter.  This mode is still somewhat supported, which is why
	  // this code block is conditional.  However, it's preferable to pass
	  // the source map URL to SourceMapConsumer, so that this function
	  // can implement the source URL resolution algorithm as outlined in
	  // the spec.  This block is basically the equivalent of:
	  //    new URL(sourceURL, sourceMapURL).toString()
	  // ... except it avoids using URL, which wasn't available in the
	  // older releases of node still supported by this library.
	  //
	  // The spec says:
	  //   If the sources are not absolute URLs after prepending of the
	  //   “sourceRoot”, the sources are resolved relative to the
	  //   SourceMap (like resolving script src in a html document).
	  if (sourceMapURL) {
	    var parsed = urlParse(sourceMapURL);
	    if (!parsed) {
	      throw new Error("sourceMapURL could not be parsed");
	    }
	    if (parsed.path) {
	      // Strip the last path component, but keep the "/".
	      var index = parsed.path.lastIndexOf('/');
	      if (index >= 0) {
	        parsed.path = parsed.path.substring(0, index + 1);
	      }
	    }
	    sourceURL = join(urlGenerate(parsed), sourceURL);
	  }

	  return normalize(sourceURL);
	}
	exports.computeSourceURL = computeSourceURL;
	});
	var util_1 = util.getArg;
	var util_2 = util.urlParse;
	var util_3 = util.urlGenerate;
	var util_4 = util.normalize;
	var util_5 = util.join;
	var util_6 = util.isAbsolute;
	var util_7 = util.relative;
	var util_8 = util.toSetString;
	var util_9 = util.fromSetString;
	var util_10 = util.compareByOriginalPositions;
	var util_11 = util.compareByGeneratedPositionsDeflated;
	var util_12 = util.compareByGeneratedPositionsInflated;
	var util_13 = util.parseSourceMapInput;
	var util_14 = util.computeSourceURL;

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */


	var has = Object.prototype.hasOwnProperty;
	var hasNativeMap = typeof Map !== "undefined";

	/**
	 * A data structure which is a combination of an array and a set. Adding a new
	 * member is O(1), testing for membership is O(1), and finding the index of an
	 * element is O(1). Removing elements from the set is not supported. Only
	 * strings are supported for membership.
	 */
	function ArraySet() {
	  this._array = [];
	  this._set = hasNativeMap ? new Map() : Object.create(null);
	}

	/**
	 * Static method for creating ArraySet instances from an existing array.
	 */
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
	  var set = new ArraySet();
	  for (var i = 0, len = aArray.length; i < len; i++) {
	    set.add(aArray[i], aAllowDuplicates);
	  }
	  return set;
	};

	/**
	 * Return how many unique items are in this ArraySet. If duplicates have been
	 * added, than those do not count towards the size.
	 *
	 * @returns Number
	 */
	ArraySet.prototype.size = function ArraySet_size() {
	  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
	};

	/**
	 * Add the given string to this set.
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
	  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
	  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
	  var idx = this._array.length;
	  if (!isDuplicate || aAllowDuplicates) {
	    this._array.push(aStr);
	  }
	  if (!isDuplicate) {
	    if (hasNativeMap) {
	      this._set.set(aStr, idx);
	    } else {
	      this._set[sStr] = idx;
	    }
	  }
	};

	/**
	 * Is the given string a member of this set?
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.has = function ArraySet_has(aStr) {
	  if (hasNativeMap) {
	    return this._set.has(aStr);
	  } else {
	    var sStr = util.toSetString(aStr);
	    return has.call(this._set, sStr);
	  }
	};

	/**
	 * What is the index of the given string in the array?
	 *
	 * @param String aStr
	 */
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
	  if (hasNativeMap) {
	    var idx = this._set.get(aStr);
	    if (idx >= 0) {
	        return idx;
	    }
	  } else {
	    var sStr = util.toSetString(aStr);
	    if (has.call(this._set, sStr)) {
	      return this._set[sStr];
	    }
	  }

	  throw new Error('"' + aStr + '" is not in the set.');
	};

	/**
	 * What is the element at the given index?
	 *
	 * @param Number aIdx
	 */
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
	  if (aIdx >= 0 && aIdx < this._array.length) {
	    return this._array[aIdx];
	  }
	  throw new Error('No element indexed by ' + aIdx);
	};

	/**
	 * Returns the array representation of this set (which has the proper indices
	 * indicated by indexOf). Note that this is a copy of the internal array used
	 * for storing the members so that no one can mess with internal state.
	 */
	ArraySet.prototype.toArray = function ArraySet_toArray() {
	  return this._array.slice();
	};

	var ArraySet_1 = ArraySet;

	var arraySet = {
		ArraySet: ArraySet_1
	};

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2014 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */



	/**
	 * Determine whether mappingB is after mappingA with respect to generated
	 * position.
	 */
	function generatedPositionAfter(mappingA, mappingB) {
	  // Optimized for most common case
	  var lineA = mappingA.generatedLine;
	  var lineB = mappingB.generatedLine;
	  var columnA = mappingA.generatedColumn;
	  var columnB = mappingB.generatedColumn;
	  return lineB > lineA || lineB == lineA && columnB >= columnA ||
	         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}

	/**
	 * A data structure to provide a sorted view of accumulated mappings in a
	 * performance conscious manner. It trades a neglibable overhead in general
	 * case for a large speedup in case of mappings being added in order.
	 */
	function MappingList() {
	  this._array = [];
	  this._sorted = true;
	  // Serves as infimum
	  this._last = {generatedLine: -1, generatedColumn: 0};
	}

	/**
	 * Iterate through internal items. This method takes the same arguments that
	 * `Array.prototype.forEach` takes.
	 *
	 * NOTE: The order of the mappings is NOT guaranteed.
	 */
	MappingList.prototype.unsortedForEach =
	  function MappingList_forEach(aCallback, aThisArg) {
	    this._array.forEach(aCallback, aThisArg);
	  };

	/**
	 * Add the given source mapping.
	 *
	 * @param Object aMapping
	 */
	MappingList.prototype.add = function MappingList_add(aMapping) {
	  if (generatedPositionAfter(this._last, aMapping)) {
	    this._last = aMapping;
	    this._array.push(aMapping);
	  } else {
	    this._sorted = false;
	    this._array.push(aMapping);
	  }
	};

	/**
	 * Returns the flat, sorted array of mappings. The mappings are sorted by
	 * generated position.
	 *
	 * WARNING: This method returns internal data without copying, for
	 * performance. The return value must NOT be mutated, and should be treated as
	 * an immutable borrow. If you want to take ownership, you must make your own
	 * copy.
	 */
	MappingList.prototype.toArray = function MappingList_toArray() {
	  if (!this._sorted) {
	    this._array.sort(util.compareByGeneratedPositionsInflated);
	    this._sorted = true;
	  }
	  return this._array;
	};

	var MappingList_1 = MappingList;

	var mappingList = {
		MappingList: MappingList_1
	};

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */



	var ArraySet$1 = arraySet.ArraySet;
	var MappingList$1 = mappingList.MappingList;

	/**
	 * An instance of the SourceMapGenerator represents a source map which is
	 * being built incrementally. You may pass an object with the following
	 * properties:
	 *
	 *   - file: The filename of the generated source.
	 *   - sourceRoot: A root for all relative URLs in this source map.
	 */
	function SourceMapGenerator(aArgs) {
	  if (!aArgs) {
	    aArgs = {};
	  }
	  this._file = util.getArg(aArgs, 'file', null);
	  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
	  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
	  this._sources = new ArraySet$1();
	  this._names = new ArraySet$1();
	  this._mappings = new MappingList$1();
	  this._sourcesContents = null;
	}

	SourceMapGenerator.prototype._version = 3;

	/**
	 * Creates a new SourceMapGenerator based on a SourceMapConsumer
	 *
	 * @param aSourceMapConsumer The SourceMap.
	 */
	SourceMapGenerator.fromSourceMap =
	  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
	    var sourceRoot = aSourceMapConsumer.sourceRoot;
	    var generator = new SourceMapGenerator({
	      file: aSourceMapConsumer.file,
	      sourceRoot: sourceRoot
	    });
	    aSourceMapConsumer.eachMapping(function (mapping) {
	      var newMapping = {
	        generated: {
	          line: mapping.generatedLine,
	          column: mapping.generatedColumn
	        }
	      };

	      if (mapping.source != null) {
	        newMapping.source = mapping.source;
	        if (sourceRoot != null) {
	          newMapping.source = util.relative(sourceRoot, newMapping.source);
	        }

	        newMapping.original = {
	          line: mapping.originalLine,
	          column: mapping.originalColumn
	        };

	        if (mapping.name != null) {
	          newMapping.name = mapping.name;
	        }
	      }

	      generator.addMapping(newMapping);
	    });
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var sourceRelative = sourceFile;
	      if (sourceRoot !== null) {
	        sourceRelative = util.relative(sourceRoot, sourceFile);
	      }

	      if (!generator._sources.has(sourceRelative)) {
	        generator._sources.add(sourceRelative);
	      }

	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        generator.setSourceContent(sourceFile, content);
	      }
	    });
	    return generator;
	  };

	/**
	 * Add a single mapping from original source line and column to the generated
	 * source's line and column for this source map being created. The mapping
	 * object should have the following properties:
	 *
	 *   - generated: An object with the generated line and column positions.
	 *   - original: An object with the original line and column positions.
	 *   - source: The original source file (relative to the sourceRoot).
	 *   - name: An optional original token name for this mapping.
	 */
	SourceMapGenerator.prototype.addMapping =
	  function SourceMapGenerator_addMapping(aArgs) {
	    var generated = util.getArg(aArgs, 'generated');
	    var original = util.getArg(aArgs, 'original', null);
	    var source = util.getArg(aArgs, 'source', null);
	    var name = util.getArg(aArgs, 'name', null);

	    if (!this._skipValidation) {
	      this._validateMapping(generated, original, source, name);
	    }

	    if (source != null) {
	      source = String(source);
	      if (!this._sources.has(source)) {
	        this._sources.add(source);
	      }
	    }

	    if (name != null) {
	      name = String(name);
	      if (!this._names.has(name)) {
	        this._names.add(name);
	      }
	    }

	    this._mappings.add({
	      generatedLine: generated.line,
	      generatedColumn: generated.column,
	      originalLine: original != null && original.line,
	      originalColumn: original != null && original.column,
	      source: source,
	      name: name
	    });
	  };

	/**
	 * Set the source content for a source file.
	 */
	SourceMapGenerator.prototype.setSourceContent =
	  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
	    var source = aSourceFile;
	    if (this._sourceRoot != null) {
	      source = util.relative(this._sourceRoot, source);
	    }

	    if (aSourceContent != null) {
	      // Add the source content to the _sourcesContents map.
	      // Create a new _sourcesContents map if the property is null.
	      if (!this._sourcesContents) {
	        this._sourcesContents = Object.create(null);
	      }
	      this._sourcesContents[util.toSetString(source)] = aSourceContent;
	    } else if (this._sourcesContents) {
	      // Remove the source file from the _sourcesContents map.
	      // If the _sourcesContents map is empty, set the property to null.
	      delete this._sourcesContents[util.toSetString(source)];
	      if (Object.keys(this._sourcesContents).length === 0) {
	        this._sourcesContents = null;
	      }
	    }
	  };

	/**
	 * Applies the mappings of a sub-source-map for a specific source file to the
	 * source map being generated. Each mapping to the supplied source file is
	 * rewritten using the supplied source map. Note: The resolution for the
	 * resulting mappings is the minimium of this map and the supplied map.
	 *
	 * @param aSourceMapConsumer The source map to be applied.
	 * @param aSourceFile Optional. The filename of the source file.
	 *        If omitted, SourceMapConsumer's file property will be used.
	 * @param aSourceMapPath Optional. The dirname of the path to the source map
	 *        to be applied. If relative, it is relative to the SourceMapConsumer.
	 *        This parameter is needed when the two source maps aren't in the same
	 *        directory, and the source map to be applied contains relative source
	 *        paths. If so, those relative source paths need to be rewritten
	 *        relative to the SourceMapGenerator.
	 */
	SourceMapGenerator.prototype.applySourceMap =
	  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
	    var sourceFile = aSourceFile;
	    // If aSourceFile is omitted, we will use the file property of the SourceMap
	    if (aSourceFile == null) {
	      if (aSourceMapConsumer.file == null) {
	        throw new Error(
	          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
	          'or the source map\'s "file" property. Both were omitted.'
	        );
	      }
	      sourceFile = aSourceMapConsumer.file;
	    }
	    var sourceRoot = this._sourceRoot;
	    // Make "sourceFile" relative if an absolute Url is passed.
	    if (sourceRoot != null) {
	      sourceFile = util.relative(sourceRoot, sourceFile);
	    }
	    // Applying the SourceMap can add and remove items from the sources and
	    // the names array.
	    var newSources = new ArraySet$1();
	    var newNames = new ArraySet$1();

	    // Find mappings for the "sourceFile"
	    this._mappings.unsortedForEach(function (mapping) {
	      if (mapping.source === sourceFile && mapping.originalLine != null) {
	        // Check if it can be mapped by the source map, then update the mapping.
	        var original = aSourceMapConsumer.originalPositionFor({
	          line: mapping.originalLine,
	          column: mapping.originalColumn
	        });
	        if (original.source != null) {
	          // Copy mapping
	          mapping.source = original.source;
	          if (aSourceMapPath != null) {
	            mapping.source = util.join(aSourceMapPath, mapping.source);
	          }
	          if (sourceRoot != null) {
	            mapping.source = util.relative(sourceRoot, mapping.source);
	          }
	          mapping.originalLine = original.line;
	          mapping.originalColumn = original.column;
	          if (original.name != null) {
	            mapping.name = original.name;
	          }
	        }
	      }

	      var source = mapping.source;
	      if (source != null && !newSources.has(source)) {
	        newSources.add(source);
	      }

	      var name = mapping.name;
	      if (name != null && !newNames.has(name)) {
	        newNames.add(name);
	      }

	    }, this);
	    this._sources = newSources;
	    this._names = newNames;

	    // Copy sourcesContents of applied map.
	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	      if (content != null) {
	        if (aSourceMapPath != null) {
	          sourceFile = util.join(aSourceMapPath, sourceFile);
	        }
	        if (sourceRoot != null) {
	          sourceFile = util.relative(sourceRoot, sourceFile);
	        }
	        this.setSourceContent(sourceFile, content);
	      }
	    }, this);
	  };

	/**
	 * A mapping can have one of the three levels of data:
	 *
	 *   1. Just the generated position.
	 *   2. The Generated position, original position, and original source.
	 *   3. Generated and original position, original source, as well as a name
	 *      token.
	 *
	 * To maintain consistency, we validate that any new mapping being added falls
	 * in to one of these categories.
	 */
	SourceMapGenerator.prototype._validateMapping =
	  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
	                                              aName) {
	    // When aOriginal is truthy but has empty values for .line and .column,
	    // it is most likely a programmer error. In this case we throw a very
	    // specific error message to try to guide them the right way.
	    // For example: https://github.com/Polymer/polymer-bundler/pull/519
	    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
	        throw new Error(
	            'original.line and original.column are not numbers -- you probably meant to omit ' +
	            'the original mapping entirely and only map the generated position. If so, pass ' +
	            'null for the original mapping instead of an object with empty or null values.'
	        );
	    }

	    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	        && aGenerated.line > 0 && aGenerated.column >= 0
	        && !aOriginal && !aSource && !aName) {
	      // Case 1.
	      return;
	    }
	    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
	             && aGenerated.line > 0 && aGenerated.column >= 0
	             && aOriginal.line > 0 && aOriginal.column >= 0
	             && aSource) {
	      // Cases 2 and 3.
	      return;
	    }
	    else {
	      throw new Error('Invalid mapping: ' + JSON.stringify({
	        generated: aGenerated,
	        source: aSource,
	        original: aOriginal,
	        name: aName
	      }));
	    }
	  };

	/**
	 * Serialize the accumulated mappings in to the stream of base 64 VLQs
	 * specified by the source map format.
	 */
	SourceMapGenerator.prototype._serializeMappings =
	  function SourceMapGenerator_serializeMappings() {
	    var previousGeneratedColumn = 0;
	    var previousGeneratedLine = 1;
	    var previousOriginalColumn = 0;
	    var previousOriginalLine = 0;
	    var previousName = 0;
	    var previousSource = 0;
	    var result = '';
	    var next;
	    var mapping;
	    var nameIdx;
	    var sourceIdx;

	    var mappings = this._mappings.toArray();
	    for (var i = 0, len = mappings.length; i < len; i++) {
	      mapping = mappings[i];
	      next = '';

	      if (mapping.generatedLine !== previousGeneratedLine) {
	        previousGeneratedColumn = 0;
	        while (mapping.generatedLine !== previousGeneratedLine) {
	          next += ';';
	          previousGeneratedLine++;
	        }
	      }
	      else {
	        if (i > 0) {
	          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
	            continue;
	          }
	          next += ',';
	        }
	      }

	      next += base64Vlq.encode(mapping.generatedColumn
	                                 - previousGeneratedColumn);
	      previousGeneratedColumn = mapping.generatedColumn;

	      if (mapping.source != null) {
	        sourceIdx = this._sources.indexOf(mapping.source);
	        next += base64Vlq.encode(sourceIdx - previousSource);
	        previousSource = sourceIdx;

	        // lines are stored 0-based in SourceMap spec version 3
	        next += base64Vlq.encode(mapping.originalLine - 1
	                                   - previousOriginalLine);
	        previousOriginalLine = mapping.originalLine - 1;

	        next += base64Vlq.encode(mapping.originalColumn
	                                   - previousOriginalColumn);
	        previousOriginalColumn = mapping.originalColumn;

	        if (mapping.name != null) {
	          nameIdx = this._names.indexOf(mapping.name);
	          next += base64Vlq.encode(nameIdx - previousName);
	          previousName = nameIdx;
	        }
	      }

	      result += next;
	    }

	    return result;
	  };

	SourceMapGenerator.prototype._generateSourcesContent =
	  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
	    return aSources.map(function (source) {
	      if (!this._sourcesContents) {
	        return null;
	      }
	      if (aSourceRoot != null) {
	        source = util.relative(aSourceRoot, source);
	      }
	      var key = util.toSetString(source);
	      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
	        ? this._sourcesContents[key]
	        : null;
	    }, this);
	  };

	/**
	 * Externalize the source map.
	 */
	SourceMapGenerator.prototype.toJSON =
	  function SourceMapGenerator_toJSON() {
	    var map = {
	      version: this._version,
	      sources: this._sources.toArray(),
	      names: this._names.toArray(),
	      mappings: this._serializeMappings()
	    };
	    if (this._file != null) {
	      map.file = this._file;
	    }
	    if (this._sourceRoot != null) {
	      map.sourceRoot = this._sourceRoot;
	    }
	    if (this._sourcesContents) {
	      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
	    }

	    return map;
	  };

	/**
	 * Render the source map being generated to a string.
	 */
	SourceMapGenerator.prototype.toString =
	  function SourceMapGenerator_toString() {
	    return JSON.stringify(this.toJSON());
	  };

	var SourceMapGenerator_1 = SourceMapGenerator;

	var sourceMapGenerator = {
		SourceMapGenerator: SourceMapGenerator_1
	};

	var SourceMapGenerator$1 = sourceMapGenerator.SourceMapGenerator;
	var trackNodes = {
	    Atrule: true,
	    Selector: true,
	    Declaration: true
	};

	var sourceMap = function generateSourceMap(handlers) {
	    var map = new SourceMapGenerator$1();
	    var line = 1;
	    var column = 0;
	    var generated = {
	        line: 1,
	        column: 0
	    };
	    var original = {
	        line: 0, // should be zero to add first mapping
	        column: 0
	    };
	    var sourceMappingActive = false;
	    var activatedGenerated = {
	        line: 1,
	        column: 0
	    };
	    var activatedMapping = {
	        generated: activatedGenerated
	    };

	    var handlersNode = handlers.node;
	    handlers.node = function(node) {
	        if (node.loc && node.loc.start && trackNodes.hasOwnProperty(node.type)) {
	            var nodeLine = node.loc.start.line;
	            var nodeColumn = node.loc.start.column - 1;

	            if (original.line !== nodeLine ||
	                original.column !== nodeColumn) {
	                original.line = nodeLine;
	                original.column = nodeColumn;

	                generated.line = line;
	                generated.column = column;

	                if (sourceMappingActive) {
	                    sourceMappingActive = false;
	                    if (generated.line !== activatedGenerated.line ||
	                        generated.column !== activatedGenerated.column) {
	                        map.addMapping(activatedMapping);
	                    }
	                }

	                sourceMappingActive = true;
	                map.addMapping({
	                    source: node.loc.source,
	                    original: original,
	                    generated: generated
	                });
	            }
	        }

	        handlersNode.call(this, node);

	        if (sourceMappingActive && trackNodes.hasOwnProperty(node.type)) {
	            activatedGenerated.line = line;
	            activatedGenerated.column = column;
	        }
	    };

	    var handlersChunk = handlers.chunk;
	    handlers.chunk = function(chunk) {
	        for (var i = 0; i < chunk.length; i++) {
	            if (chunk.charCodeAt(i) === 10) { // \n
	                line++;
	                column = 0;
	            } else {
	                column++;
	            }
	        }

	        handlersChunk(chunk);
	    };

	    var handlersResult = handlers.result;
	    handlers.result = function() {
	        if (sourceMappingActive) {
	            map.addMapping(activatedMapping);
	        }

	        return {
	            css: handlersResult(),
	            map: map
	        };
	    };

	    return handlers;
	};

	var hasOwnProperty$3 = Object.prototype.hasOwnProperty;

	function processChildren(node, delimeter) {
	    var list = node.children;
	    var prev = null;

	    if (typeof delimeter !== 'function') {
	        list.forEach(this.node, this);
	    } else {
	        list.forEach(function(node) {
	            if (prev !== null) {
	                delimeter.call(this, prev);
	            }

	            this.node(node);
	            prev = node;
	        }, this);
	    }
	}

	var create$2 = function createGenerator(config) {
	    function processNode(node) {
	        if (hasOwnProperty$3.call(types, node.type)) {
	            types[node.type].call(this, node);
	        } else {
	            throw new Error('Unknown node type: ' + node.type);
	        }
	    }

	    var types = {};

	    if (config.node) {
	        for (var name in config.node) {
	            types[name] = config.node[name].generate;
	        }
	    }

	    return function(node, options) {
	        var buffer = '';
	        var handlers = {
	            children: processChildren,
	            node: processNode,
	            chunk: function(chunk) {
	                buffer += chunk;
	            },
	            result: function() {
	                return buffer;
	            }
	        };

	        if (options) {
	            if (typeof options.decorator === 'function') {
	                handlers = options.decorator(handlers);
	            }

	            if (options.sourceMap) {
	                handlers = sourceMap(handlers);
	            }
	        }

	        handlers.node(node);

	        return handlers.result();
	    };
	};

	var create$3 = function createConvertors(walk) {
	    return {
	        fromPlainObject: function(ast) {
	            walk(ast, {
	                enter: function(node) {
	                    if (node.children && node.children instanceof List_1 === false) {
	                        node.children = new List_1().fromArray(node.children);
	                    }
	                }
	            });

	            return ast;
	        },
	        toPlainObject: function(ast) {
	            walk(ast, {
	                leave: function(node) {
	                    if (node.children && node.children instanceof List_1) {
	                        node.children = node.children.toArray();
	                    }
	                }
	            });

	            return ast;
	        }
	    };
	};

	var hasOwnProperty$4 = Object.prototype.hasOwnProperty;
	var noop$4 = function() {};

	function ensureFunction$1(value) {
	    return typeof value === 'function' ? value : noop$4;
	}

	function invokeForType(fn, type) {
	    return function(node, item, list) {
	        if (node.type === type) {
	            fn.call(this, node, item, list);
	        }
	    };
	}

	function getWalkersFromStructure(name, nodeType) {
	    var structure = nodeType.structure;
	    var walkers = [];

	    for (var key in structure) {
	        if (hasOwnProperty$4.call(structure, key) === false) {
	            continue;
	        }

	        var fieldTypes = structure[key];
	        var walker = {
	            name: key,
	            type: false,
	            nullable: false
	        };

	        if (!Array.isArray(structure[key])) {
	            fieldTypes = [structure[key]];
	        }

	        for (var i = 0; i < fieldTypes.length; i++) {
	            var fieldType = fieldTypes[i];
	            if (fieldType === null) {
	                walker.nullable = true;
	            } else if (typeof fieldType === 'string') {
	                walker.type = 'node';
	            } else if (Array.isArray(fieldType)) {
	                walker.type = 'list';
	            }
	        }

	        if (walker.type) {
	            walkers.push(walker);
	        }
	    }

	    if (walkers.length) {
	        return {
	            context: nodeType.walkContext,
	            fields: walkers
	        };
	    }

	    return null;
	}

	function getTypesFromConfig(config) {
	    var types = {};

	    for (var name in config.node) {
	        if (hasOwnProperty$4.call(config.node, name)) {
	            var nodeType = config.node[name];

	            if (!nodeType.structure) {
	                throw new Error('Missed `structure` field in `' + name + '` node type definition');
	            }

	            types[name] = getWalkersFromStructure(name, nodeType);
	        }
	    }

	    return types;
	}

	function createTypeIterator(config, reverse) {
	    var fields = config.fields.slice();
	    var contextName = config.context;
	    var useContext = typeof contextName === 'string';

	    if (reverse) {
	        fields.reverse();
	    }

	    return function(node, context, walk) {
	        var prevContextValue;

	        if (useContext) {
	            prevContextValue = context[contextName];
	            context[contextName] = node;
	        }

	        for (var i = 0; i < fields.length; i++) {
	            var field = fields[i];
	            var ref = node[field.name];

	            if (!field.nullable || ref) {
	                if (field.type === 'list') {
	                    if (reverse) {
	                        ref.forEachRight(walk);
	                    } else {
	                        ref.forEach(walk);
	                    }
	                } else {
	                    walk(ref);
	                }
	            }
	        }

	        if (useContext) {
	            context[contextName] = prevContextValue;
	        }
	    };
	}

	function createFastTraveralMap(iterators) {
	    return {
	        Atrule: {
	            StyleSheet: iterators.StyleSheet,
	            Atrule: iterators.Atrule,
	            Rule: iterators.Rule,
	            Block: iterators.Block
	        },
	        Rule: {
	            StyleSheet: iterators.StyleSheet,
	            Atrule: iterators.Atrule,
	            Rule: iterators.Rule,
	            Block: iterators.Block
	        },
	        Declaration: {
	            StyleSheet: iterators.StyleSheet,
	            Atrule: iterators.Atrule,
	            Rule: iterators.Rule,
	            Block: iterators.Block,
	            DeclarationList: iterators.DeclarationList
	        }
	    };
	}

	var create$4 = function createWalker(config) {
	    var types = getTypesFromConfig(config);
	    var iteratorsNatural = {};
	    var iteratorsReverse = {};

	    for (var name in types) {
	        if (hasOwnProperty$4.call(types, name) && types[name] !== null) {
	            iteratorsNatural[name] = createTypeIterator(types[name], false);
	            iteratorsReverse[name] = createTypeIterator(types[name], true);
	        }
	    }

	    var fastTraversalIteratorsNatural = createFastTraveralMap(iteratorsNatural);
	    var fastTraversalIteratorsReverse = createFastTraveralMap(iteratorsReverse);

	    var walk = function(root, options) {
	        function walkNode(node, item, list) {
	            enter.call(context, node, item, list);

	            if (iterators.hasOwnProperty(node.type)) {
	                iterators[node.type](node, context, walkNode);
	            }

	            leave.call(context, node, item, list);
	        }

	        var enter = noop$4;
	        var leave = noop$4;
	        var iterators = iteratorsNatural;
	        var context = {
	            root: root,
	            stylesheet: null,
	            atrule: null,
	            atrulePrelude: null,
	            rule: null,
	            selector: null,
	            block: null,
	            declaration: null,
	            function: null
	        };

	        if (typeof options === 'function') {
	            enter = options;
	        } else if (options) {
	            enter = ensureFunction$1(options.enter);
	            leave = ensureFunction$1(options.leave);

	            if (options.reverse) {
	                iterators = iteratorsReverse;
	            }

	            if (options.visit) {
	                if (fastTraversalIteratorsNatural.hasOwnProperty(options.visit)) {
	                    iterators = options.reverse
	                        ? fastTraversalIteratorsReverse[options.visit]
	                        : fastTraversalIteratorsNatural[options.visit];
	                } else if (!types.hasOwnProperty(options.visit)) {
	                    throw new Error('Bad value `' + options.visit + '` for `visit` option (should be: ' + Object.keys(types).join(', ') + ')');
	                }

	                enter = invokeForType(enter, options.visit);
	                leave = invokeForType(leave, options.visit);
	            }
	        }

	        if (enter === noop$4 && leave === noop$4) {
	            throw new Error('Neither `enter` nor `leave` walker handler is set or both aren\'t a function');
	        }

	        // swap handlers in reverse mode to invert visit order
	        if (options.reverse) {
	            var tmp = enter;
	            enter = leave;
	            leave = tmp;
	        }

	        walkNode(root);
	    };

	    walk.find = function(ast, fn) {
	        var found = null;

	        walk(ast, function(node, item, list) {
	            if (found === null && fn.call(this, node, item, list)) {
	                found = node;
	            }
	        });

	        return found;
	    };

	    walk.findLast = function(ast, fn) {
	        var found = null;

	        walk(ast, {
	            reverse: true,
	            enter: function(node, item, list) {
	                if (found === null && fn.call(this, node, item, list)) {
	                    found = node;
	                }
	            }
	        });

	        return found;
	    };

	    walk.findAll = function(ast, fn) {
	        var found = [];

	        walk(ast, function(node, item, list) {
	            if (fn.call(this, node, item, list)) {
	                found.push(node);
	            }
	        });

	        return found;
	    };

	    return walk;
	};

	var clone = function clone(node) {
	    var result = {};

	    for (var key in node) {
	        var value = node[key];

	        if (value) {
	            if (Array.isArray(value) || value instanceof List_1) {
	                value = value.map(clone);
	            } else if (value.constructor === Object) {
	                value = clone(value);
	            }
	        }

	        result[key] = value;
	    }

	    return result;
	};

	var hasOwnProperty$5 = Object.prototype.hasOwnProperty;
	var shape = {
	    generic: true,
	    types: {},
	    atrules: {},
	    properties: {},
	    parseContext: {},
	    scope: {},
	    atrule: ['parse'],
	    pseudo: ['parse'],
	    node: ['name', 'structure', 'parse', 'generate', 'walkContext']
	};

	function isObject(value) {
	    return value && value.constructor === Object;
	}

	function copy(value) {
	    if (isObject(value)) {
	        return Object.assign({}, value);
	    } else {
	        return value;
	    }
	}
	function extend(dest, src) {
	    for (var key in src) {
	        if (hasOwnProperty$5.call(src, key)) {
	            if (isObject(dest[key])) {
	                extend(dest[key], copy(src[key]));
	            } else {
	                dest[key] = copy(src[key]);
	            }
	        }
	    }
	}

	function mix(dest, src, shape) {
	    for (var key in shape) {
	        if (hasOwnProperty$5.call(shape, key) === false) {
	            continue;
	        }

	        if (shape[key] === true) {
	            if (key in src) {
	                if (hasOwnProperty$5.call(src, key)) {
	                    dest[key] = copy(src[key]);
	                }
	            }
	        } else if (shape[key]) {
	            if (isObject(shape[key])) {
	                var res = {};
	                extend(res, dest[key]);
	                extend(res, src[key]);
	                dest[key] = res;
	            } else if (Array.isArray(shape[key])) {
	                var res = {};
	                var innerShape = shape[key].reduce(function(s, k) {
	                    s[k] = true;
	                    return s;
	                }, {});
	                for (var name in dest[key]) {
	                    if (hasOwnProperty$5.call(dest[key], name)) {
	                        res[name] = {};
	                        if (dest[key] && dest[key][name]) {
	                            mix(res[name], dest[key][name], innerShape);
	                        }
	                    }
	                }
	                for (var name in src[key]) {
	                    if (hasOwnProperty$5.call(src[key], name)) {
	                        if (!res[name]) {
	                            res[name] = {};
	                        }
	                        if (src[key] && src[key][name]) {
	                            mix(res[name], src[key][name], innerShape);
	                        }
	                    }
	                }
	                dest[key] = res;
	            }
	        }
	    }
	    return dest;
	}

	var mix_1 = function(dest, src) {
	    return mix(dest, src, shape);
	};

	function createSyntax(config) {
	    var parse = create$1(config);
	    var walk = create$4(config);
	    var generate = create$2(config);
	    var convert = create$3(walk);

	    var syntax = {
	        List: List_1,
	        SyntaxError: _SyntaxError,
	        TokenStream: TokenStream_1,
	        Lexer: Lexer_1,

	        vendorPrefix: names.vendorPrefix,
	        keyword: names.keyword,
	        property: names.property,
	        isCustomProperty: names.isCustomProperty,

	        definitionSyntax: definitionSyntax,
	        lexer: null,
	        createLexer: function(config) {
	            return new Lexer_1(config, syntax, syntax.lexer.structure);
	        },

	        tokenize: tokenizer,
	        parse: parse,
	        walk: walk,
	        generate: generate,

	        find: walk.find,
	        findLast: walk.findLast,
	        findAll: walk.findAll,

	        clone: clone,
	        fromPlainObject: convert.fromPlainObject,
	        toPlainObject: convert.toPlainObject,

	        createSyntax: function(config) {
	            return createSyntax(mix_1({}, config));
	        },
	        fork: function(extension) {
	            var base = mix_1({}, config); // copy of config
	            return createSyntax(
	                typeof extension === 'function'
	                    ? extension(base, Object.assign)
	                    : mix_1(base, extension)
	            );
	        }
	    };

	    syntax.lexer = new Lexer_1({
	        generic: true,
	        types: config.types,
	        atrules: config.atrules,
	        properties: config.properties,
	        node: config.node
	    }, syntax);

	    return syntax;
	}
	var create_1 = function(config) {
	    return createSyntax(mix_1({}, config));
	};

	var create$5 = {
		create: create_1
	};

	var atRules = {
		"@charset": {
		syntax: "@charset \"<charset>\";",
		groups: [
			"CSS Charsets"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@charset"
	},
		"@counter-style": {
		syntax: "@counter-style <counter-style-name> {\n  [ system: <counter-system>; ] ||\n  [ symbols: <counter-symbols>; ] ||\n  [ additive-symbols: <additive-symbols>; ] ||\n  [ negative: <negative-symbol>; ] ||\n  [ prefix: <prefix>; ] ||\n  [ suffix: <suffix>; ] ||\n  [ range: <range>; ] ||\n  [ pad: <padding>; ] ||\n  [ speak-as: <speak-as>; ] ||\n  [ fallback: <counter-style-name>; ]\n}",
		interfaces: [
			"CSSCounterStyleRule"
		],
		groups: [
			"CSS Counter Styles"
		],
		descriptors: {
			"additive-symbols": {
				syntax: "[ <integer> && <symbol> ]#",
				media: "all",
				initial: "N/A",
				percentages: "no",
				computed: "asSpecified",
				order: "orderOfAppearance",
				status: "standard"
			},
			fallback: {
				syntax: "<counter-style-name>",
				media: "all",
				initial: "decimal",
				percentages: "no",
				computed: "asSpecified",
				order: "uniqueOrder",
				status: "standard"
			},
			negative: {
				syntax: "<symbol> <symbol>?",
				media: "all",
				initial: "\"-\" hyphen-minus",
				percentages: "no",
				computed: "asSpecified",
				order: "orderOfAppearance",
				status: "standard"
			},
			pad: {
				syntax: "<integer> && <symbol>",
				media: "all",
				initial: "0 \"\"",
				percentages: "no",
				computed: "asSpecified",
				order: "uniqueOrder",
				status: "standard"
			},
			prefix: {
				syntax: "<symbol>",
				media: "all",
				initial: "\"\"",
				percentages: "no",
				computed: "asSpecified",
				order: "uniqueOrder",
				status: "standard"
			},
			range: {
				syntax: "[ [ <integer> | infinite ]{2} ]# | auto",
				media: "all",
				initial: "auto",
				percentages: "no",
				computed: "asSpecified",
				order: "orderOfAppearance",
				status: "standard"
			},
			"speak-as": {
				syntax: "auto | bullets | numbers | words | spell-out | <counter-style-name>",
				media: "all",
				initial: "auto",
				percentages: "no",
				computed: "asSpecified",
				order: "uniqueOrder",
				status: "standard"
			},
			suffix: {
				syntax: "<symbol>",
				media: "all",
				initial: "\". \"",
				percentages: "no",
				computed: "asSpecified",
				order: "uniqueOrder",
				status: "standard"
			},
			symbols: {
				syntax: "<symbol>+",
				media: "all",
				initial: "N/A",
				percentages: "no",
				computed: "asSpecified",
				order: "orderOfAppearance",
				status: "standard"
			},
			system: {
				syntax: "cyclic | numeric | alphabetic | symbolic | additive | [ fixed <integer>? ] | [ extends <counter-style-name> ]",
				media: "all",
				initial: "symbolic",
				percentages: "no",
				computed: "asSpecified",
				order: "uniqueOrder",
				status: "standard"
			}
		},
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@counter-style"
	},
		"@document": {
		syntax: "@document [ <url> | url-prefix(<string>) | domain(<string>) | media-document(<string>) | regexp(<string>) ]# {\n  <group-rule-body>\n}",
		interfaces: [
			"CSSGroupingRule",
			"CSSConditionRule"
		],
		groups: [
			"CSS Conditional Rules"
		],
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@document"
	},
		"@font-face": {
		syntax: "@font-face {\n  [ font-family: <family-name>; ] ||\n  [ src: <src>; ] ||\n  [ unicode-range: <unicode-range>; ] ||\n  [ font-variant: <font-variant>; ] ||\n  [ font-feature-settings: <font-feature-settings>; ] ||\n  [ font-variation-settings: <font-variation-settings>; ] ||\n  [ font-stretch: <font-stretch>; ] ||\n  [ font-weight: <font-weight>; ] ||\n  [ font-style: <font-style>; ]\n}",
		interfaces: [
			"CSSFontFaceRule"
		],
		groups: [
			"CSS Fonts"
		],
		descriptors: {
			"font-display": {
				syntax: "[ auto | block | swap | fallback | optional ]",
				media: "visual",
				percentages: "no",
				initial: "auto",
				computed: "asSpecified",
				order: "uniqueOrder",
				status: "experimental"
			},
			"font-family": {
				syntax: "<family-name>",
				media: "all",
				initial: "n/a (required)",
				percentages: "no",
				computed: "asSpecified",
				order: "uniqueOrder",
				status: "standard"
			},
			"font-feature-settings": {
				syntax: "normal | <feature-tag-value>#",
				media: "all",
				initial: "normal",
				percentages: "no",
				computed: "asSpecified",
				order: "orderOfAppearance",
				status: "standard"
			},
			"font-variation-settings": {
				syntax: "normal | [ <string> <number> ]#",
				media: "all",
				initial: "normal",
				percentages: "no",
				computed: "asSpecified",
				order: "orderOfAppearance",
				status: "standard"
			},
			"font-stretch": {
				syntax: "<font-stretch-absolute>{1,2}",
				media: "all",
				initial: "normal",
				percentages: "no",
				computed: "asSpecified",
				order: "uniqueOrder",
				status: "standard"
			},
			"font-style": {
				syntax: "normal | italic | oblique <angle>{0,2}",
				media: "all",
				initial: "normal",
				percentages: "no",
				computed: "asSpecified",
				order: "uniqueOrder",
				status: "standard"
			},
			"font-weight": {
				syntax: "<font-weight-absolute>{1,2}",
				media: "all",
				initial: "normal",
				percentages: "no",
				computed: "asSpecified",
				order: "uniqueOrder",
				status: "standard"
			},
			"font-variant": {
				syntax: "normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic(<feature-value-name>) || historical-forms || styleset(<feature-value-name>#) || character-variant(<feature-value-name>#) || swash(<feature-value-name>) || ornaments(<feature-value-name>) || annotation(<feature-value-name>) || [ small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps ] || <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero || <east-asian-variant-values> || <east-asian-width-values> || ruby ]",
				media: "all",
				initial: "normal",
				percentages: "no",
				computed: "asSpecified",
				order: "orderOfAppearance",
				status: "standard"
			},
			src: {
				syntax: "[ <url> [ format( <string># ) ]? | local( <family-name> ) ]#",
				media: "all",
				initial: "n/a (required)",
				percentages: "no",
				computed: "asSpecified",
				order: "orderOfAppearance",
				status: "standard"
			},
			"unicode-range": {
				syntax: "<unicode-range>#",
				media: "all",
				initial: "U+0-10FFFF",
				percentages: "no",
				computed: "asSpecified",
				order: "orderOfAppearance",
				status: "standard"
			}
		},
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@font-face"
	},
		"@font-feature-values": {
		syntax: "@font-feature-values <family-name># {\n  <feature-value-block-list>\n}",
		interfaces: [
			"CSSFontFeatureValuesRule"
		],
		groups: [
			"CSS Fonts"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@font-feature-values"
	},
		"@import": {
		syntax: "@import [ <string> | <url> ] [ <media-query-list> ]?;",
		groups: [
			"Media Queries"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@import"
	},
		"@keyframes": {
		syntax: "@keyframes <keyframes-name> {\n  <keyframe-block-list>\n}",
		interfaces: [
			"CSSKeyframeRule",
			"CSSKeyframesRule"
		],
		groups: [
			"CSS Animations"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@keyframes"
	},
		"@media": {
		syntax: "@media <media-query-list> {\n  <group-rule-body>\n}",
		interfaces: [
			"CSSGroupingRule",
			"CSSConditionRule",
			"CSSMediaRule",
			"CSSCustomMediaRule"
		],
		groups: [
			"CSS Conditional Rules",
			"Media Queries"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@media"
	},
		"@namespace": {
		syntax: "@namespace <namespace-prefix>? [ <string> | <url> ];",
		groups: [
			"CSS Namespaces"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@namespace"
	},
		"@page": {
		syntax: "@page <page-selector-list> {\n  <page-body>\n}",
		interfaces: [
			"CSSPageRule"
		],
		groups: [
			"CSS Pages"
		],
		descriptors: {
			bleed: {
				syntax: "auto | <length>",
				media: [
					"visual",
					"paged"
				],
				initial: "auto",
				percentages: "no",
				computed: "asSpecified",
				order: "uniqueOrder",
				status: "experimental"
			},
			marks: {
				syntax: "none | [ crop || cross ]",
				media: [
					"visual",
					"paged"
				],
				initial: "none",
				percentages: "no",
				computed: "asSpecified",
				order: "orderOfAppearance",
				status: "experimental"
			}
		},
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@page"
	},
		"@supports": {
		syntax: "@supports <supports-condition> {\n  <group-rule-body>\n}",
		interfaces: [
			"CSSGroupingRule",
			"CSSConditionRule",
			"CSSSupportsRule"
		],
		groups: [
			"CSS Conditional Rules"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@supports"
	},
		"@viewport": {
		syntax: "@viewport {\n  <group-rule-body>\n}",
		interfaces: [
			"CSSViewportRule"
		],
		groups: [
			"CSS Device Adaptation"
		],
		descriptors: {
			height: {
				syntax: "<viewport-length>{1,2}",
				media: [
					"visual",
					"continuous"
				],
				initial: [
					"min-height",
					"max-height"
				],
				percentages: [
					"min-height",
					"max-height"
				],
				computed: [
					"min-height",
					"max-height"
				],
				order: "orderOfAppearance",
				status: "standard"
			},
			"max-height": {
				syntax: "<viewport-length>",
				media: [
					"visual",
					"continuous"
				],
				initial: "auto",
				percentages: "referToHeightOfInitialViewport",
				computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto",
				order: "uniqueOrder",
				status: "standard"
			},
			"max-width": {
				syntax: "<viewport-length>",
				media: [
					"visual",
					"continuous"
				],
				initial: "auto",
				percentages: "referToWidthOfInitialViewport",
				computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto",
				order: "uniqueOrder",
				status: "standard"
			},
			"max-zoom": {
				syntax: "auto | <number> | <percentage>",
				media: [
					"visual",
					"continuous"
				],
				initial: "auto",
				percentages: "the zoom factor itself",
				computed: "autoNonNegativeOrPercentage",
				order: "uniqueOrder",
				status: "standard"
			},
			"min-height": {
				syntax: "<viewport-length>",
				media: [
					"visual",
					"continuous"
				],
				initial: "auto",
				percentages: "referToHeightOfInitialViewport",
				computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto",
				order: "uniqueOrder",
				status: "standard"
			},
			"min-width": {
				syntax: "<viewport-length>",
				media: [
					"visual",
					"continuous"
				],
				initial: "auto",
				percentages: "referToWidthOfInitialViewport",
				computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto",
				order: "uniqueOrder",
				status: "standard"
			},
			"min-zoom": {
				syntax: "auto | <number> | <percentage>",
				media: [
					"visual",
					"continuous"
				],
				initial: "auto",
				percentages: "the zoom factor itself",
				computed: "autoNonNegativeOrPercentage",
				order: "uniqueOrder",
				status: "standard"
			},
			orientation: {
				syntax: "auto | portrait | landscape",
				media: [
					"visual",
					"continuous"
				],
				initial: "auto",
				percentages: "referToSizeOfBoundingBox",
				computed: "asSpecified",
				order: "uniqueOrder",
				status: "standard"
			},
			"user-zoom": {
				syntax: "zoom | fixed",
				media: [
					"visual",
					"continuous"
				],
				initial: "zoom",
				percentages: "referToSizeOfBoundingBox",
				computed: "asSpecified",
				order: "uniqueOrder",
				status: "standard"
			},
			width: {
				syntax: "<viewport-length>{1,2}",
				media: [
					"visual",
					"continuous"
				],
				initial: [
					"min-width",
					"max-width"
				],
				percentages: [
					"min-width",
					"max-width"
				],
				computed: [
					"min-width",
					"max-width"
				],
				order: "orderOfAppearance",
				status: "standard"
			},
			zoom: {
				syntax: "auto | <number> | <percentage>",
				media: [
					"visual",
					"continuous"
				],
				initial: "auto",
				percentages: "the zoom factor itself",
				computed: "autoNonNegativeOrPercentage",
				order: "uniqueOrder",
				status: "standard"
			}
		},
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/@viewport"
	}
	};

	var atRules$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': atRules
	});

	var all = {
		syntax: "initial | inherit | unset | revert",
		media: "noPracticalMedia",
		inherited: false,
		animationType: "eachOfShorthandPropertiesExceptUnicodeBiDiAndDirection",
		percentages: "no",
		groups: [
			"CSS Miscellaneous"
		],
		initial: "noPracticalInitialValue",
		appliesto: "allElements",
		computed: "asSpecifiedAppliesToEachProperty",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/all"
	};
	var animation = {
		syntax: "<single-animation>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Animations"
		],
		initial: [
			"animation-name",
			"animation-duration",
			"animation-timing-function",
			"animation-delay",
			"animation-iteration-count",
			"animation-direction",
			"animation-fill-mode",
			"animation-play-state"
		],
		appliesto: "allElementsAndPseudos",
		computed: [
			"animation-name",
			"animation-duration",
			"animation-timing-function",
			"animation-delay",
			"animation-direction",
			"animation-iteration-count",
			"animation-fill-mode",
			"animation-play-state"
		],
		order: "orderOfAppearance",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation"
	};
	var appearance = {
		syntax: "none | auto | button | textfield | <compat>",
		media: "all",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Basic User Interface"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-appearance"
	};
	var azimuth = {
		syntax: "<angle> | [ [ left-side | far-left | left | center-left | center | center-right | right | far-right | right-side ] || behind ] | leftwards | rightwards",
		media: "aural",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Speech"
		],
		initial: "center",
		appliesto: "allElements",
		computed: "normalizedAngle",
		order: "orderOfAppearance",
		status: "obsolete",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/azimuth"
	};
	var background = {
		syntax: "[ <bg-layer> , ]* <final-bg-layer>",
		media: "visual",
		inherited: false,
		animationType: [
			"background-color",
			"background-image",
			"background-clip",
			"background-position",
			"background-size",
			"background-repeat",
			"background-attachment"
		],
		percentages: [
			"background-position",
			"background-size"
		],
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: [
			"background-image",
			"background-position",
			"background-size",
			"background-repeat",
			"background-origin",
			"background-clip",
			"background-attachment",
			"background-color"
		],
		appliesto: "allElements",
		computed: [
			"background-image",
			"background-position",
			"background-size",
			"background-repeat",
			"background-origin",
			"background-clip",
			"background-attachment",
			"background-color"
		],
		order: "orderOfAppearance",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background"
	};
	var border = {
		syntax: "<line-width> || <line-style> || <color>",
		media: "visual",
		inherited: false,
		animationType: [
			"border-color",
			"border-style",
			"border-width"
		],
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: [
			"border-width",
			"border-style",
			"border-color"
		],
		appliesto: "allElements",
		computed: [
			"border-width",
			"border-style",
			"border-color"
		],
		order: "orderOfAppearance",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border"
	};
	var bottom = {
		syntax: "<length> | <percentage> | auto",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToContainingBlockHeight",
		groups: [
			"CSS Positioning"
		],
		initial: "auto",
		appliesto: "positionedElements",
		computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/bottom"
	};
	var clear = {
		syntax: "none | left | right | both | inline-start | inline-end",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Positioning"
		],
		initial: "none",
		appliesto: "blockLevelElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/clear"
	};
	var clip = {
		syntax: "<shape> | auto",
		media: "visual",
		inherited: false,
		animationType: "rectangle",
		percentages: "no",
		groups: [
			"CSS Masking"
		],
		initial: "auto",
		appliesto: "absolutelyPositionedElements",
		computed: "autoOrRectangle",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/clip"
	};
	var color = {
		syntax: "<color>",
		media: "visual",
		inherited: true,
		animationType: "color",
		percentages: "no",
		groups: [
			"CSS Color"
		],
		initial: "variesFromBrowserToBrowser",
		appliesto: "allElements",
		computed: "translucentValuesRGBAOtherwiseRGB",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/color"
	};
	var columns = {
		syntax: "<'column-width'> || <'column-count'>",
		media: "visual",
		inherited: false,
		animationType: [
			"column-width",
			"column-count"
		],
		percentages: "no",
		groups: [
			"CSS Columns"
		],
		initial: [
			"column-width",
			"column-count"
		],
		appliesto: "blockContainersExceptTableWrappers",
		computed: [
			"column-width",
			"column-count"
		],
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/columns"
	};
	var contain = {
		syntax: "none | strict | content | [ size || layout || style || paint ]",
		media: "all",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Containment"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/contain"
	};
	var content = {
		syntax: "normal | none | [ <content-replacement> | <content-list> ] [/ <string> ]?",
		media: "all",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Generated Content"
		],
		initial: "normal",
		appliesto: "beforeAndAfterPseudos",
		computed: "normalOnElementsForPseudosNoneAbsoluteURIStringOrAsSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/content"
	};
	var cursor = {
		syntax: "[ [ <url> [ <x> <y> ]? , ]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out | grab | grabbing ] ]",
		media: [
			"visual",
			"interactive"
		],
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Basic User Interface"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecifiedURLsAbsolute",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/cursor"
	};
	var direction = {
		syntax: "ltr | rtl",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Writing Modes"
		],
		initial: "ltr",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/direction"
	};
	var display = {
		syntax: "[ <display-outside> || <display-inside> ] | <display-listitem> | <display-internal> | <display-box> | <display-legacy>",
		media: "all",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Display"
		],
		initial: "inline",
		appliesto: "allElements",
		computed: "asSpecifiedExceptPositionedFloatingAndRootElementsKeywordMaybeDifferent",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/display"
	};
	var filter = {
		syntax: "none | <filter-function-list>",
		media: "visual",
		inherited: false,
		animationType: "filterList",
		percentages: "no",
		groups: [
			"Filter Effects"
		],
		initial: "none",
		appliesto: "allElementsSVGContainerElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/filter"
	};
	var flex = {
		syntax: "none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]",
		media: "visual",
		inherited: false,
		animationType: [
			"flex-grow",
			"flex-shrink",
			"flex-basis"
		],
		percentages: "no",
		groups: [
			"CSS Flexible Box Layout"
		],
		initial: [
			"flex-grow",
			"flex-shrink",
			"flex-basis"
		],
		appliesto: "flexItemsAndInFlowPseudos",
		computed: [
			"flex-grow",
			"flex-shrink",
			"flex-basis"
		],
		order: "orderOfAppearance",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/flex"
	};
	var float = {
		syntax: "left | right | none | inline-start | inline-end",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Positioning"
		],
		initial: "none",
		appliesto: "allElementsNoEffectIfDisplayNone",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/float"
	};
	var font = {
		syntax: "[ [ <'font-style'> || <font-variant-css21> || <'font-weight'> || <'font-stretch'> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'> ] | caption | icon | menu | message-box | small-caption | status-bar",
		media: "visual",
		inherited: true,
		animationType: [
			"font-style",
			"font-variant",
			"font-weight",
			"font-stretch",
			"font-size",
			"line-height",
			"font-family"
		],
		percentages: [
			"font-size",
			"line-height"
		],
		groups: [
			"CSS Fonts"
		],
		initial: [
			"font-style",
			"font-variant",
			"font-weight",
			"font-stretch",
			"font-size",
			"line-height",
			"font-family"
		],
		appliesto: "allElements",
		computed: [
			"font-style",
			"font-variant",
			"font-weight",
			"font-stretch",
			"font-size",
			"line-height",
			"font-family"
		],
		order: "orderOfAppearance",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font"
	};
	var gap = {
		syntax: "<'row-gap'> <'column-gap'>?",
		media: "visual",
		inherited: false,
		animationType: [
			"row-gap",
			"column-gap"
		],
		percentages: "no",
		groups: [
			"CSS Box Alignment"
		],
		initial: [
			"row-gap",
			"column-gap"
		],
		appliesto: "gridContainers",
		computed: [
			"row-gap",
			"column-gap"
		],
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/gap"
	};
	var grid = {
		syntax: "<'grid-template'> | <'grid-template-rows'> / [ auto-flow && dense? ] <'grid-auto-columns'>? | [ auto-flow && dense? ] <'grid-auto-rows'>? / <'grid-template-columns'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: [
			"grid-template-rows",
			"grid-template-columns",
			"grid-auto-rows",
			"grid-auto-columns"
		],
		groups: [
			"CSS Grid Layout"
		],
		initial: [
			"grid-template-rows",
			"grid-template-columns",
			"grid-template-areas",
			"grid-auto-rows",
			"grid-auto-columns",
			"grid-auto-flow",
			"grid-column-gap",
			"grid-row-gap",
			"column-gap",
			"row-gap"
		],
		appliesto: "gridContainers",
		computed: [
			"grid-template-rows",
			"grid-template-columns",
			"grid-template-areas",
			"grid-auto-rows",
			"grid-auto-columns",
			"grid-auto-flow",
			"grid-column-gap",
			"grid-row-gap",
			"column-gap",
			"row-gap"
		],
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid"
	};
	var height = {
		syntax: "[ <length> | <percentage> ] && [ border-box | content-box ]? | available | min-content | max-content | fit-content | auto",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "regardingHeightOfGeneratedBoxContainingBlockPercentagesRelativeToContainingBlock",
		groups: [
			"CSS Box Model"
		],
		initial: "auto",
		appliesto: "allElementsButNonReplacedAndTableColumns",
		computed: "percentageAutoOrAbsoluteLength",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/height"
	};
	var hyphens = {
		syntax: "none | manual | auto",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text"
		],
		initial: "manual",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/hyphens"
	};
	var inset = {
		syntax: "<'top'>{1,4}",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "logicalHeightOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "auto",
		appliesto: "positionedElements",
		computed: "sameAsBoxOffsets",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/inset"
	};
	var isolation = {
		syntax: "auto | isolate",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Compositing and Blending"
		],
		initial: "auto",
		appliesto: "allElementsSVGContainerGraphicsAndGraphicsReferencingElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/isolation"
	};
	var left = {
		syntax: "<length> | <percentage> | auto",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Positioning"
		],
		initial: "auto",
		appliesto: "positionedElements",
		computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/left"
	};
	var margin = {
		syntax: "[ <length> | <percentage> | auto ]{1,4}",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Box Model"
		],
		initial: [
			"margin-bottom",
			"margin-left",
			"margin-right",
			"margin-top"
		],
		appliesto: "allElementsExceptTableDisplayTypes",
		computed: [
			"margin-bottom",
			"margin-left",
			"margin-right",
			"margin-top"
		],
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin"
	};
	var mask = {
		syntax: "<mask-layer>#",
		media: "visual",
		inherited: false,
		animationType: [
			"mask-image",
			"mask-mode",
			"mask-repeat",
			"mask-position",
			"mask-clip",
			"mask-origin",
			"mask-size",
			"mask-composite"
		],
		percentages: [
			"mask-position"
		],
		groups: [
			"CSS Masking"
		],
		initial: [
			"mask-image",
			"mask-mode",
			"mask-repeat",
			"mask-position",
			"mask-clip",
			"mask-origin",
			"mask-size",
			"mask-composite"
		],
		appliesto: "allElementsSVGContainerElements",
		computed: [
			"mask-image",
			"mask-mode",
			"mask-repeat",
			"mask-position",
			"mask-clip",
			"mask-origin",
			"mask-size",
			"mask-composite"
		],
		order: "perGrammar",
		stacking: true,
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask"
	};
	var offset = {
		syntax: "[ <'offset-position'>? [ <'offset-path'> [ <'offset-distance'> || <'offset-rotate'> ]? ]? ]! [ / <'offset-anchor'> ]?",
		media: "visual",
		inherited: false,
		animationType: [
			"offset-position",
			"offset-path",
			"offset-distance",
			"offset-anchor",
			"offset-rotate"
		],
		percentages: [
			"offset-position",
			"offset-distance",
			"offset-anchor"
		],
		groups: [
			"CSS Motion Path"
		],
		initial: [
			"offset-position",
			"offset-path",
			"offset-distance",
			"offset-anchor",
			"offset-rotate"
		],
		appliesto: "transformableElements",
		computed: [
			"offset-position",
			"offset-path",
			"offset-distance",
			"offset-anchor",
			"offset-rotate"
		],
		order: "perGrammar",
		stacking: true,
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/offset"
	};
	var opacity = {
		syntax: "<alpha-value>",
		media: "visual",
		inherited: false,
		animationType: "number",
		percentages: "no",
		groups: [
			"CSS Color"
		],
		initial: "1.0",
		appliesto: "allElements",
		computed: "specifiedValueClipped0To1",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/opacity"
	};
	var order = {
		syntax: "<integer>",
		media: "visual",
		inherited: false,
		animationType: "integer",
		percentages: "no",
		groups: [
			"CSS Flexible Box Layout"
		],
		initial: "0",
		appliesto: "flexItemsAndAbsolutelyPositionedFlexContainerChildren",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/order"
	};
	var orphans = {
		syntax: "<integer>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fragmentation"
		],
		initial: "2",
		appliesto: "blockContainerElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/orphans"
	};
	var outline = {
		syntax: "[ <'outline-color'> || <'outline-style'> || <'outline-width'> ]",
		media: [
			"visual",
			"interactive"
		],
		inherited: false,
		animationType: [
			"outline-color",
			"outline-width",
			"outline-style"
		],
		percentages: "no",
		groups: [
			"CSS Basic User Interface"
		],
		initial: [
			"outline-color",
			"outline-style",
			"outline-width"
		],
		appliesto: "allElements",
		computed: [
			"outline-color",
			"outline-width",
			"outline-style"
		],
		order: "orderOfAppearance",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/outline"
	};
	var overflow = {
		syntax: "[ visible | hidden | clip | scroll | auto ]{1,2}",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Overflow"
		],
		initial: "visible",
		appliesto: "blockContainersFlexContainersGridContainers",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overflow"
	};
	var padding = {
		syntax: "[ <length> | <percentage> ]{1,4}",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Box Model"
		],
		initial: [
			"padding-bottom",
			"padding-left",
			"padding-right",
			"padding-top"
		],
		appliesto: "allElementsExceptInternalTableDisplayTypes",
		computed: [
			"padding-bottom",
			"padding-left",
			"padding-right",
			"padding-top"
		],
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding"
	};
	var perspective = {
		syntax: "none | <length>",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "no",
		groups: [
			"CSS Transforms"
		],
		initial: "none",
		appliesto: "transformableElements",
		computed: "absoluteLengthOrNone",
		order: "uniqueOrder",
		stacking: true,
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/perspective"
	};
	var position = {
		syntax: "static | relative | absolute | sticky | fixed",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Positioning"
		],
		initial: "static",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		stacking: true,
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/position"
	};
	var quotes = {
		syntax: "none | auto | [ <string> <string> ]+",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Generated Content"
		],
		initial: "dependsOnUserAgent",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/quotes"
	};
	var resize = {
		syntax: "none | both | horizontal | vertical | block | inline",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Basic User Interface"
		],
		initial: "none",
		appliesto: "elementsWithOverflowNotVisibleAndReplacedElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/resize"
	};
	var right = {
		syntax: "<length> | <percentage> | auto",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Positioning"
		],
		initial: "auto",
		appliesto: "positionedElements",
		computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/right"
	};
	var rotate = {
		syntax: "none | <angle> | [ x | y | z | <number>{3} ] && <angle>",
		media: "visual",
		inherited: false,
		animationType: "transform",
		percentages: "no",
		groups: [
			"CSS Transforms"
		],
		initial: "none",
		appliesto: "transformableElements",
		computed: "asSpecified",
		order: "perGrammar",
		stacking: true,
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/rotate"
	};
	var scale = {
		syntax: "none | <number>{1,3}",
		media: "visual",
		inherited: false,
		animationType: "transform",
		percentages: "no",
		groups: [
			"CSS Transforms"
		],
		initial: "none",
		appliesto: "transformableElements",
		computed: "asSpecified",
		order: "perGrammar",
		stacking: true,
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scale"
	};
	var top = {
		syntax: "<length> | <percentage> | auto",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToContainingBlockHeight",
		groups: [
			"CSS Positioning"
		],
		initial: "auto",
		appliesto: "positionedElements",
		computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/top"
	};
	var transform = {
		syntax: "none | <transform-list>",
		media: "visual",
		inherited: false,
		animationType: "transform",
		percentages: "referToSizeOfBoundingBox",
		groups: [
			"CSS Transforms"
		],
		initial: "none",
		appliesto: "transformableElements",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "uniqueOrder",
		stacking: true,
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transform"
	};
	var transition = {
		syntax: "<single-transition>#",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Transitions"
		],
		initial: [
			"transition-delay",
			"transition-duration",
			"transition-property",
			"transition-timing-function"
		],
		appliesto: "allElementsAndPseudos",
		computed: [
			"transition-delay",
			"transition-duration",
			"transition-property",
			"transition-timing-function"
		],
		order: "orderOfAppearance",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transition"
	};
	var translate = {
		syntax: "none | <length-percentage> [ <length-percentage> <length>? ]?",
		media: "visual",
		inherited: false,
		animationType: "transform",
		percentages: "referToSizeOfBoundingBox",
		groups: [
			"CSS Transforms"
		],
		initial: "none",
		appliesto: "transformableElements",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "perGrammar",
		stacking: true,
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/translate"
	};
	var visibility = {
		syntax: "visible | hidden | collapse",
		media: "visual",
		inherited: true,
		animationType: "visibility",
		percentages: "no",
		groups: [
			"CSS Box Model"
		],
		initial: "visible",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/visibility"
	};
	var widows = {
		syntax: "<integer>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fragmentation"
		],
		initial: "2",
		appliesto: "blockContainerElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/widows"
	};
	var width = {
		syntax: "[ <length> | <percentage> ] && [ border-box | content-box ]? | available | min-content | max-content | fit-content | auto",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Box Model"
		],
		initial: "auto",
		appliesto: "allElementsButNonReplacedAndTableRows",
		computed: "percentageAutoOrAbsoluteLength",
		order: "lengthOrPercentageBeforeKeywordIfBothPresent",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/width"
	};
	var zoom = {
		syntax: "normal | reset | <number> | <percentage>",
		media: "visual",
		inherited: false,
		animationType: "integer",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/zoom"
	};
	var properties$1 = {
		"--*": {
		syntax: "<declaration-value>",
		media: "all",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Variables"
		],
		initial: "seeProse",
		appliesto: "allElements",
		computed: "asSpecifiedWithVarsSubstituted",
		order: "perGrammar",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/--*"
	},
		"-ms-accelerator": {
		syntax: "false | true",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "false",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-accelerator"
	},
		"-ms-block-progression": {
		syntax: "tb | rl | bt | lr",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "tb",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-block-progression"
	},
		"-ms-content-zoom-chaining": {
		syntax: "none | chained",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "none",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-chaining"
	},
		"-ms-content-zooming": {
		syntax: "none | zoom",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "zoomForTheTopLevelNoneForTheRest",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-content-zooming"
	},
		"-ms-content-zoom-limit": {
		syntax: "<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: [
			"-ms-content-zoom-limit-max",
			"-ms-content-zoom-limit-min"
		],
		groups: [
			"Microsoft Extensions"
		],
		initial: [
			"-ms-content-zoom-limit-max",
			"-ms-content-zoom-limit-min"
		],
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: [
			"-ms-content-zoom-limit-max",
			"-ms-content-zoom-limit-min"
		],
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-limit"
	},
		"-ms-content-zoom-limit-max": {
		syntax: "<percentage>",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "maxZoomFactor",
		groups: [
			"Microsoft Extensions"
		],
		initial: "400%",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-limit-max"
	},
		"-ms-content-zoom-limit-min": {
		syntax: "<percentage>",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "minZoomFactor",
		groups: [
			"Microsoft Extensions"
		],
		initial: "100%",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-limit-min"
	},
		"-ms-content-zoom-snap": {
		syntax: "<'-ms-content-zoom-snap-type'> || <'-ms-content-zoom-snap-points'>",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: [
			"-ms-content-zoom-snap-type",
			"-ms-content-zoom-snap-points"
		],
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: [
			"-ms-content-zoom-snap-type",
			"-ms-content-zoom-snap-points"
		],
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-snap"
	},
		"-ms-content-zoom-snap-points": {
		syntax: "snapInterval( <percentage>, <percentage> ) | snapList( <percentage># )",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "snapInterval(0%, 100%)",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-snap-points"
	},
		"-ms-content-zoom-snap-type": {
		syntax: "none | proximity | mandatory",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "none",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-snap-type"
	},
		"-ms-filter": {
		syntax: "<string>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "\"\"",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-filter"
	},
		"-ms-flow-from": {
		syntax: "[ none | <custom-ident> ]#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "none",
		appliesto: "nonReplacedElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-flow-from"
	},
		"-ms-flow-into": {
		syntax: "[ none | <custom-ident> ]#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "none",
		appliesto: "iframeElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-flow-into"
	},
		"-ms-high-contrast-adjust": {
		syntax: "auto | none",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-high-contrast-adjust"
	},
		"-ms-hyphenate-limit-chars": {
		syntax: "auto | <integer>{1,3}",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-hyphenate-limit-chars"
	},
		"-ms-hyphenate-limit-lines": {
		syntax: "no-limit | <integer>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "no-limit",
		appliesto: "blockContainerElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-hyphenate-limit-lines"
	},
		"-ms-hyphenate-limit-zone": {
		syntax: "<percentage> | <length>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "referToLineBoxWidth",
		groups: [
			"Microsoft Extensions"
		],
		initial: "0",
		appliesto: "blockContainerElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-hyphenate-limit-zone"
	},
		"-ms-ime-align": {
		syntax: "auto | after",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-ime-align"
	},
		"-ms-overflow-style": {
		syntax: "auto | none | scrollbar | -ms-autohiding-scrollbar",
		media: "interactive",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "auto",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-overflow-style"
	},
		"-ms-scrollbar-3dlight-color": {
		syntax: "<color>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "dependsOnUserAgent",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-3dlight-color"
	},
		"-ms-scrollbar-arrow-color": {
		syntax: "<color>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "ButtonText",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-arrow-color"
	},
		"-ms-scrollbar-base-color": {
		syntax: "<color>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "dependsOnUserAgent",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-base-color"
	},
		"-ms-scrollbar-darkshadow-color": {
		syntax: "<color>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "ThreeDDarkShadow",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-darkshadow-color"
	},
		"-ms-scrollbar-face-color": {
		syntax: "<color>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "ThreeDFace",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-face-color"
	},
		"-ms-scrollbar-highlight-color": {
		syntax: "<color>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "ThreeDHighlight",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-highlight-color"
	},
		"-ms-scrollbar-shadow-color": {
		syntax: "<color>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "ThreeDDarkShadow",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-shadow-color"
	},
		"-ms-scrollbar-track-color": {
		syntax: "<color>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "Scrollbar",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-track-color"
	},
		"-ms-scroll-chaining": {
		syntax: "chained | none",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "chained",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-chaining"
	},
		"-ms-scroll-limit": {
		syntax: "<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: [
			"-ms-scroll-limit-x-min",
			"-ms-scroll-limit-y-min",
			"-ms-scroll-limit-x-max",
			"-ms-scroll-limit-y-max"
		],
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: [
			"-ms-scroll-limit-x-min",
			"-ms-scroll-limit-y-min",
			"-ms-scroll-limit-x-max",
			"-ms-scroll-limit-y-max"
		],
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit"
	},
		"-ms-scroll-limit-x-max": {
		syntax: "auto | <length>",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "auto",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit-x-max"
	},
		"-ms-scroll-limit-x-min": {
		syntax: "<length>",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "0",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit-x-min"
	},
		"-ms-scroll-limit-y-max": {
		syntax: "auto | <length>",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "auto",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit-y-max"
	},
		"-ms-scroll-limit-y-min": {
		syntax: "<length>",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "0",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit-y-min"
	},
		"-ms-scroll-rails": {
		syntax: "none | railed",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "railed",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-rails"
	},
		"-ms-scroll-snap-points-x": {
		syntax: "snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "snapInterval(0px, 100%)",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-points-x"
	},
		"-ms-scroll-snap-points-y": {
		syntax: "snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "snapInterval(0px, 100%)",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-points-y"
	},
		"-ms-scroll-snap-type": {
		syntax: "none | proximity | mandatory",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "none",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-type"
	},
		"-ms-scroll-snap-x": {
		syntax: "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: [
			"-ms-scroll-snap-type",
			"-ms-scroll-snap-points-x"
		],
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: [
			"-ms-scroll-snap-type",
			"-ms-scroll-snap-points-x"
		],
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-x"
	},
		"-ms-scroll-snap-y": {
		syntax: "<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: [
			"-ms-scroll-snap-type",
			"-ms-scroll-snap-points-y"
		],
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: [
			"-ms-scroll-snap-type",
			"-ms-scroll-snap-points-y"
		],
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-y"
	},
		"-ms-scroll-translation": {
		syntax: "none | vertical-to-horizontal",
		media: "interactive",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-translation"
	},
		"-ms-text-autospace": {
		syntax: "none | ideograph-alpha | ideograph-numeric | ideograph-parenthesis | ideograph-space",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-text-autospace"
	},
		"-ms-touch-select": {
		syntax: "grippers | none",
		media: "interactive",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "grippers",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-touch-select"
	},
		"-ms-user-select": {
		syntax: "none | element | text",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "text",
		appliesto: "nonReplacedElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-user-select"
	},
		"-ms-wrap-flow": {
		syntax: "auto | both | start | end | maximum | clear",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "auto",
		appliesto: "blockLevelElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-wrap-flow"
	},
		"-ms-wrap-margin": {
		syntax: "<length>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "0",
		appliesto: "exclusionElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-wrap-margin"
	},
		"-ms-wrap-through": {
		syntax: "wrap | none",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Microsoft Extensions"
		],
		initial: "wrap",
		appliesto: "blockLevelElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-ms-wrap-through"
	},
		"-moz-appearance": {
		syntax: "none | button | button-arrow-down | button-arrow-next | button-arrow-previous | button-arrow-up | button-bevel | button-focus | caret | checkbox | checkbox-container | checkbox-label | checkmenuitem | dualbutton | groupbox | listbox | listitem | menuarrow | menubar | menucheckbox | menuimage | menuitem | menuitemtext | menulist | menulist-button | menulist-text | menulist-textfield | menupopup | menuradio | menuseparator | meterbar | meterchunk | progressbar | progressbar-vertical | progresschunk | progresschunk-vertical | radio | radio-container | radio-label | radiomenuitem | range | range-thumb | resizer | resizerpanel | scale-horizontal | scalethumbend | scalethumb-horizontal | scalethumbstart | scalethumbtick | scalethumb-vertical | scale-vertical | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | separator | sheet | spinner | spinner-downbutton | spinner-textfield | spinner-upbutton | splitter | statusbar | statusbarpanel | tab | tabpanel | tabpanels | tab-scroll-arrow-back | tab-scroll-arrow-forward | textfield | textfield-multiline | toolbar | toolbarbutton | toolbarbutton-dropdown | toolbargripper | toolbox | tooltip | treeheader | treeheadercell | treeheadersortarrow | treeitem | treeline | treetwisty | treetwistyopen | treeview | -moz-mac-unified-toolbar | -moz-win-borderless-glass | -moz-win-browsertabbar-toolbox | -moz-win-communicationstext | -moz-win-communications-toolbox | -moz-win-exclude-glass | -moz-win-glass | -moz-win-mediatext | -moz-win-media-toolbox | -moz-window-button-box | -moz-window-button-box-maximized | -moz-window-button-close | -moz-window-button-maximize | -moz-window-button-minimize | -moz-window-button-restore | -moz-window-frame-bottom | -moz-window-frame-left | -moz-window-frame-right | -moz-window-titlebar | -moz-window-titlebar-maximized",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions",
			"WebKit Extensions"
		],
		initial: "noneButOverriddenInUserAgentCSS",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-appearance"
	},
		"-moz-binding": {
		syntax: "<url> | none",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "none",
		appliesto: "allElementsExceptGeneratedContentOrPseudoElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-binding"
	},
		"-moz-border-bottom-colors": {
		syntax: "<color>+ | none",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-border-bottom-colors"
	},
		"-moz-border-left-colors": {
		syntax: "<color>+ | none",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-border-left-colors"
	},
		"-moz-border-right-colors": {
		syntax: "<color>+ | none",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-border-right-colors"
	},
		"-moz-border-top-colors": {
		syntax: "<color>+ | none",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-border-top-colors"
	},
		"-moz-context-properties": {
		syntax: "none | [ fill | fill-opacity | stroke | stroke-opacity ]#",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "none",
		appliesto: "allElementsThatCanReferenceImages",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-context-properties"
	},
		"-moz-float-edge": {
		syntax: "border-box | content-box | margin-box | padding-box",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "content-box",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-float-edge"
	},
		"-moz-force-broken-image-icon": {
		syntax: "<integer>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "0",
		appliesto: "images",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-force-broken-image-icon"
	},
		"-moz-image-region": {
		syntax: "<shape> | auto",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "auto",
		appliesto: "xulImageElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-image-region"
	},
		"-moz-orient": {
		syntax: "inline | block | horizontal | vertical",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "inline",
		appliesto: "anyElementEffectOnProgressAndMeter",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-orient"
	},
		"-moz-outline-radius": {
		syntax: "<outline-radius>{1,4} [ / <outline-radius>{1,4} ]?",
		media: "visual",
		inherited: false,
		animationType: [
			"-moz-outline-radius-topleft",
			"-moz-outline-radius-topright",
			"-moz-outline-radius-bottomright",
			"-moz-outline-radius-bottomleft"
		],
		percentages: [
			"-moz-outline-radius-topleft",
			"-moz-outline-radius-topright",
			"-moz-outline-radius-bottomright",
			"-moz-outline-radius-bottomleft"
		],
		groups: [
			"Mozilla Extensions"
		],
		initial: [
			"-moz-outline-radius-topleft",
			"-moz-outline-radius-topright",
			"-moz-outline-radius-bottomright",
			"-moz-outline-radius-bottomleft"
		],
		appliesto: "allElements",
		computed: [
			"-moz-outline-radius-topleft",
			"-moz-outline-radius-topright",
			"-moz-outline-radius-bottomright",
			"-moz-outline-radius-bottomleft"
		],
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius"
	},
		"-moz-outline-radius-bottomleft": {
		syntax: "<outline-radius>",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToDimensionOfBorderBox",
		groups: [
			"Mozilla Extensions"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-bottomleft"
	},
		"-moz-outline-radius-bottomright": {
		syntax: "<outline-radius>",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToDimensionOfBorderBox",
		groups: [
			"Mozilla Extensions"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-bottomright"
	},
		"-moz-outline-radius-topleft": {
		syntax: "<outline-radius>",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToDimensionOfBorderBox",
		groups: [
			"Mozilla Extensions"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-topleft"
	},
		"-moz-outline-radius-topright": {
		syntax: "<outline-radius>",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToDimensionOfBorderBox",
		groups: [
			"Mozilla Extensions"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-topright"
	},
		"-moz-stack-sizing": {
		syntax: "ignore | stretch-to-fit",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "stretch-to-fit",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-stack-sizing"
	},
		"-moz-text-blink": {
		syntax: "none | blink",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-text-blink"
	},
		"-moz-user-focus": {
		syntax: "ignore | normal | select-after | select-before | select-menu | select-same | select-all | none",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-user-focus"
	},
		"-moz-user-input": {
		syntax: "auto | none | enabled | disabled",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-user-input"
	},
		"-moz-user-modify": {
		syntax: "read-only | read-write | write-only",
		media: "interactive",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "read-only",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-user-modify"
	},
		"-moz-window-dragging": {
		syntax: "drag | no-drag",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "drag",
		appliesto: "allElementsCreatingNativeWindows",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-window-dragging"
	},
		"-moz-window-shadow": {
		syntax: "default | menu | tooltip | sheet | none",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "default",
		appliesto: "allElementsCreatingNativeWindows",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-window-shadow"
	},
		"-webkit-appearance": {
		syntax: "none | button | button-bevel | caret | checkbox | default-button | inner-spin-button | listbox | listitem | media-controls-background | media-controls-fullscreen-background | media-current-time-display | media-enter-fullscreen-button | media-exit-fullscreen-button | media-fullscreen-button | media-mute-button | media-overlay-play-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | media-time-remaining-display | media-toggle-closed-captions-button | media-volume-slider | media-volume-slider-container | media-volume-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | meter | progress-bar | progress-bar-value | push-button | radio | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "noneButOverriddenInUserAgentCSS",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-moz-appearance"
	},
		"-webkit-border-before": {
		syntax: "<'border-width'> || <'border-style'> || <'color'>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: [
			"-webkit-border-before-width"
		],
		groups: [
			"WebKit Extensions"
		],
		initial: [
			"border-width",
			"border-style",
			"color"
		],
		appliesto: "allElements",
		computed: [
			"border-width",
			"border-style",
			"color"
		],
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-border-before"
	},
		"-webkit-border-before-color": {
		syntax: "<'color'>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "currentcolor",
		appliesto: "allElements",
		computed: "computedColor",
		order: "uniqueOrder",
		status: "nonstandard"
	},
		"-webkit-border-before-style": {
		syntax: "<'border-style'>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard"
	},
		"-webkit-border-before-width": {
		syntax: "<'border-width'>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "logicalWidthOfContainingBlock",
		groups: [
			"WebKit Extensions"
		],
		initial: "medium",
		appliesto: "allElements",
		computed: "absoluteLengthZeroIfBorderStyleNoneOrHidden",
		order: "uniqueOrder",
		status: "nonstandard"
	},
		"-webkit-box-reflect": {
		syntax: "[ above | below | right | left ]? <length>? <image>?",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-box-reflect"
	},
		"-webkit-line-clamp": {
		syntax: "none | <integer>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "no",
		groups: [
			"WebKit Extensions",
			"CSS Overflow"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-line-clamp"
	},
		"-webkit-mask": {
		syntax: "[ <mask-reference> || <position> [ / <bg-size> ]? || <repeat-style> || [ <box> | border | padding | content | text ] || [ <box> | border | padding | content ] ]#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: [
			"-webkit-mask-image",
			"-webkit-mask-repeat",
			"-webkit-mask-attachment",
			"-webkit-mask-position",
			"-webkit-mask-origin",
			"-webkit-mask-clip"
		],
		appliesto: "allElements",
		computed: [
			"-webkit-mask-image",
			"-webkit-mask-repeat",
			"-webkit-mask-attachment",
			"-webkit-mask-position",
			"-webkit-mask-origin",
			"-webkit-mask-clip"
		],
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask"
	},
		"-webkit-mask-attachment": {
		syntax: "<attachment>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "scroll",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "orderOfAppearance",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-attachment"
	},
		"-webkit-mask-clip": {
		syntax: "[ <box> | border | padding | content | text ]#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "border",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "orderOfAppearance",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-clip"
	},
		"-webkit-mask-composite": {
		syntax: "<composite-style>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "source-over",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "orderOfAppearance",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-composite"
	},
		"-webkit-mask-image": {
		syntax: "<mask-reference>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "absoluteURIOrNone",
		order: "orderOfAppearance",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-image"
	},
		"-webkit-mask-origin": {
		syntax: "[ <box> | border | padding | content ]#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "padding",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "orderOfAppearance",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-origin"
	},
		"-webkit-mask-position": {
		syntax: "<position>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "referToSizeOfElement",
		groups: [
			"WebKit Extensions"
		],
		initial: "0% 0%",
		appliesto: "allElements",
		computed: "absoluteLengthOrPercentage",
		order: "orderOfAppearance",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-position"
	},
		"-webkit-mask-position-x": {
		syntax: "[ <length-percentage> | left | center | right ]#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "referToSizeOfElement",
		groups: [
			"WebKit Extensions"
		],
		initial: "0%",
		appliesto: "allElements",
		computed: "absoluteLengthOrPercentage",
		order: "orderOfAppearance",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-position-x"
	},
		"-webkit-mask-position-y": {
		syntax: "[ <length-percentage> | top | center | bottom ]#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "referToSizeOfElement",
		groups: [
			"WebKit Extensions"
		],
		initial: "0%",
		appliesto: "allElements",
		computed: "absoluteLengthOrPercentage",
		order: "orderOfAppearance",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-position-y"
	},
		"-webkit-mask-repeat": {
		syntax: "<repeat-style>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "repeat",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "orderOfAppearance",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-repeat"
	},
		"-webkit-mask-repeat-x": {
		syntax: "repeat | no-repeat | space | round",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "repeat",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "orderOfAppearance",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-repeat-x"
	},
		"-webkit-mask-repeat-y": {
		syntax: "repeat | no-repeat | space | round",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "repeat",
		appliesto: "allElements",
		computed: "absoluteLengthOrPercentage",
		order: "orderOfAppearance",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-repeat-y"
	},
		"-webkit-mask-size": {
		syntax: "<bg-size>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "relativeToBackgroundPositioningArea",
		groups: [
			"WebKit Extensions"
		],
		initial: "auto auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "orderOfAppearance",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-size"
	},
		"-webkit-overflow-scrolling": {
		syntax: "auto | touch",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "auto",
		appliesto: "scrollingBoxes",
		computed: "asSpecified",
		order: "orderOfAppearance",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-overflow-scrolling"
	},
		"-webkit-tap-highlight-color": {
		syntax: "<color>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "black",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-tap-highlight-color"
	},
		"-webkit-text-fill-color": {
		syntax: "<color>",
		media: "visual",
		inherited: true,
		animationType: "color",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "currentcolor",
		appliesto: "allElements",
		computed: "computedColor",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-text-fill-color"
	},
		"-webkit-text-stroke": {
		syntax: "<length> || <color>",
		media: "visual",
		inherited: true,
		animationType: [
			"-webkit-text-stroke-width",
			"-webkit-text-stroke-color"
		],
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: [
			"-webkit-text-stroke-width",
			"-webkit-text-stroke-color"
		],
		appliesto: "allElements",
		computed: [
			"-webkit-text-stroke-width",
			"-webkit-text-stroke-color"
		],
		order: "canonicalOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke"
	},
		"-webkit-text-stroke-color": {
		syntax: "<color>",
		media: "visual",
		inherited: true,
		animationType: "color",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "currentcolor",
		appliesto: "allElements",
		computed: "computedColor",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke-color"
	},
		"-webkit-text-stroke-width": {
		syntax: "<length>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "absoluteLength",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke-width"
	},
		"-webkit-touch-callout": {
		syntax: "default | none",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "default",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/-webkit-touch-callout"
	},
		"-webkit-user-modify": {
		syntax: "read-only | read-write | read-write-plaintext-only",
		media: "interactive",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"WebKit Extensions"
		],
		initial: "read-only",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard"
	},
		"align-content": {
		syntax: "normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Box Alignment"
		],
		initial: "normal",
		appliesto: "multilineFlexContainers",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/align-content"
	},
		"align-items": {
		syntax: "normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ]",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Box Alignment"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/align-items"
	},
		"align-self": {
		syntax: "auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Box Alignment"
		],
		initial: "auto",
		appliesto: "flexItemsGridItemsAndAbsolutelyPositionedBoxes",
		computed: "autoOnAbsolutelyPositionedElementsValueOfAlignItemsOnParent",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/align-self"
	},
		all: all,
		animation: animation,
		"animation-delay": {
		syntax: "<time>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Animations"
		],
		initial: "0s",
		appliesto: "allElementsAndPseudos",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation-delay"
	},
		"animation-direction": {
		syntax: "<single-animation-direction>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Animations"
		],
		initial: "normal",
		appliesto: "allElementsAndPseudos",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation-direction"
	},
		"animation-duration": {
		syntax: "<time>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Animations"
		],
		initial: "0s",
		appliesto: "allElementsAndPseudos",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation-duration"
	},
		"animation-fill-mode": {
		syntax: "<single-animation-fill-mode>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Animations"
		],
		initial: "none",
		appliesto: "allElementsAndPseudos",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation-fill-mode"
	},
		"animation-iteration-count": {
		syntax: "<single-animation-iteration-count>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Animations"
		],
		initial: "1",
		appliesto: "allElementsAndPseudos",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation-iteration-count"
	},
		"animation-name": {
		syntax: "[ none | <keyframes-name> ]#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Animations"
		],
		initial: "none",
		appliesto: "allElementsAndPseudos",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation-name"
	},
		"animation-play-state": {
		syntax: "<single-animation-play-state>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Animations"
		],
		initial: "running",
		appliesto: "allElementsAndPseudos",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation-play-state"
	},
		"animation-timing-function": {
		syntax: "<timing-function>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Animations"
		],
		initial: "ease",
		appliesto: "allElementsAndPseudos",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/animation-timing-function"
	},
		appearance: appearance,
		"aspect-ratio": {
		syntax: "auto | <ratio>",
		media: "all",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Basic User Interface"
		],
		initial: "auto",
		appliesto: "allElementsExceptInlineBoxesAndInternalRubyOrTableBoxes",
		computed: "asSpecified",
		order: "perGrammar",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/aspect-ratio"
	},
		azimuth: azimuth,
		"backdrop-filter": {
		syntax: "none | <filter-function-list>",
		media: "visual",
		inherited: false,
		animationType: "filterList",
		percentages: "no",
		groups: [
			"Filter Effects"
		],
		initial: "none",
		appliesto: "allElementsSVGContainerElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/backdrop-filter"
	},
		"backface-visibility": {
		syntax: "visible | hidden",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Transforms"
		],
		initial: "visible",
		appliesto: "transformableElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/backface-visibility"
	},
		background: background,
		"background-attachment": {
		syntax: "<attachment>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "scroll",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-attachment"
	},
		"background-blend-mode": {
		syntax: "<blend-mode>#",
		media: "none",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Compositing and Blending"
		],
		initial: "normal",
		appliesto: "allElementsSVGContainerGraphicsAndGraphicsReferencingElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-blend-mode"
	},
		"background-clip": {
		syntax: "<box>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "border-box",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-clip"
	},
		"background-color": {
		syntax: "<color>",
		media: "visual",
		inherited: false,
		animationType: "color",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "transparent",
		appliesto: "allElements",
		computed: "computedColor",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-color"
	},
		"background-image": {
		syntax: "<bg-image>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecifiedURLsAbsolute",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-image"
	},
		"background-origin": {
		syntax: "<box>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "padding-box",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-origin"
	},
		"background-position": {
		syntax: "<bg-position>#",
		media: "visual",
		inherited: false,
		animationType: "repeatableListOfSimpleListOfLpc",
		percentages: "referToSizeOfBackgroundPositioningAreaMinusBackgroundImageSize",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "0% 0%",
		appliesto: "allElements",
		computed: "listEachItemTwoKeywordsOriginOffsets",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-position"
	},
		"background-position-x": {
		syntax: "[ center | [ left | right | x-start | x-end ]? <length-percentage>? ]#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "referToWidthOfBackgroundPositioningAreaMinusBackgroundImageHeight",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "left",
		appliesto: "allElements",
		computed: "listEachItemConsistingOfAbsoluteLengthPercentageAndOrigin",
		order: "uniqueOrder",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-position-x"
	},
		"background-position-y": {
		syntax: "[ center | [ top | bottom | y-start | y-end ]? <length-percentage>? ]#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "referToHeightOfBackgroundPositioningAreaMinusBackgroundImageHeight",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "top",
		appliesto: "allElements",
		computed: "listEachItemConsistingOfAbsoluteLengthPercentageAndOrigin",
		order: "uniqueOrder",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-position-y"
	},
		"background-repeat": {
		syntax: "<repeat-style>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "repeat",
		appliesto: "allElements",
		computed: "listEachItemHasTwoKeywordsOnePerDimension",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-repeat"
	},
		"background-size": {
		syntax: "<bg-size>#",
		media: "visual",
		inherited: false,
		animationType: "repeatableListOfSimpleListOfLpc",
		percentages: "relativeToBackgroundPositioningArea",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "auto auto",
		appliesto: "allElements",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/background-size"
	},
		"block-overflow": {
		syntax: "clip | ellipsis | <string>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Overflow"
		],
		initial: "clip",
		appliesto: "blockContainers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "experimental"
	},
		"block-size": {
		syntax: "<'width'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "blockSizeOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "auto",
		appliesto: "sameAsWidthAndHeight",
		computed: "sameAsWidthAndHeight",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/block-size"
	},
		border: border,
		"border-block": {
		syntax: "<'border-top-width'> || <'border-top-style'> || <'color'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: [
			"border-top-width",
			"border-top-style",
			"border-top-color"
		],
		appliesto: "allElements",
		computed: [
			"border-top-width",
			"border-top-style",
			"border-top-color"
		],
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block"
	},
		"border-block-color": {
		syntax: "<'border-top-color'>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: "currentcolor",
		appliesto: "allElements",
		computed: "computedColor",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-color"
	},
		"border-block-style": {
		syntax: "<'border-top-style'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-style"
	},
		"border-block-width": {
		syntax: "<'border-top-width'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "logicalWidthOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "medium",
		appliesto: "allElements",
		computed: "absoluteLengthZeroIfBorderStyleNoneOrHidden",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-width"
	},
		"border-block-end": {
		syntax: "<'border-top-width'> || <'border-top-style'> || <'color'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: [
			"border-top-width",
			"border-top-style",
			"border-top-color"
		],
		appliesto: "allElements",
		computed: [
			"border-top-width",
			"border-top-style",
			"border-top-color"
		],
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-end"
	},
		"border-block-end-color": {
		syntax: "<'border-top-color'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: "currentcolor",
		appliesto: "allElements",
		computed: "computedColor",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-end-color"
	},
		"border-block-end-style": {
		syntax: "<'border-top-style'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-end-style"
	},
		"border-block-end-width": {
		syntax: "<'border-top-width'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "logicalWidthOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "medium",
		appliesto: "allElements",
		computed: "absoluteLengthZeroIfBorderStyleNoneOrHidden",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-end-width"
	},
		"border-block-start": {
		syntax: "<'border-top-width'> || <'border-top-style'> || <'color'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: [
			"border-width",
			"border-style",
			"color"
		],
		appliesto: "allElements",
		computed: [
			"border-width",
			"border-style",
			"border-block-start-color"
		],
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-start"
	},
		"border-block-start-color": {
		syntax: "<'border-top-color'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: "currentcolor",
		appliesto: "allElements",
		computed: "computedColor",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-start-color"
	},
		"border-block-start-style": {
		syntax: "<'border-top-style'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-start-style"
	},
		"border-block-start-width": {
		syntax: "<'border-top-width'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "logicalWidthOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "medium",
		appliesto: "allElements",
		computed: "absoluteLengthZeroIfBorderStyleNoneOrHidden",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-block-start-width"
	},
		"border-bottom": {
		syntax: "<line-width> || <line-style> || <color>",
		media: "visual",
		inherited: false,
		animationType: [
			"border-bottom-color",
			"border-bottom-style",
			"border-bottom-width"
		],
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: [
			"border-bottom-width",
			"border-bottom-style",
			"border-bottom-color"
		],
		appliesto: "allElements",
		computed: [
			"border-bottom-width",
			"border-bottom-style",
			"border-bottom-color"
		],
		order: "orderOfAppearance",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom"
	},
		"border-bottom-color": {
		syntax: "<'border-top-color'>",
		media: "visual",
		inherited: false,
		animationType: "color",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "currentcolor",
		appliesto: "allElements",
		computed: "computedColor",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom-color"
	},
		"border-bottom-left-radius": {
		syntax: "<length-percentage>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToDimensionOfBorderBox",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "0",
		appliesto: "allElementsUAsNotRequiredWhenCollapse",
		computed: "twoAbsoluteLengthOrPercentages",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom-left-radius"
	},
		"border-bottom-right-radius": {
		syntax: "<length-percentage>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToDimensionOfBorderBox",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "0",
		appliesto: "allElementsUAsNotRequiredWhenCollapse",
		computed: "twoAbsoluteLengthOrPercentages",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom-right-radius"
	},
		"border-bottom-style": {
		syntax: "<line-style>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom-style"
	},
		"border-bottom-width": {
		syntax: "<line-width>",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "medium",
		appliesto: "allElements",
		computed: "absoluteLengthOr0IfBorderBottomStyleNoneOrHidden",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-bottom-width"
	},
		"border-collapse": {
		syntax: "collapse | separate",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Table"
		],
		initial: "separate",
		appliesto: "tableElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-collapse"
	},
		"border-color": {
		syntax: "<color>{1,4}",
		media: "visual",
		inherited: false,
		animationType: [
			"border-bottom-color",
			"border-left-color",
			"border-right-color",
			"border-top-color"
		],
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: [
			"border-top-color",
			"border-right-color",
			"border-bottom-color",
			"border-left-color"
		],
		appliesto: "allElements",
		computed: [
			"border-bottom-color",
			"border-left-color",
			"border-right-color",
			"border-top-color"
		],
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-color"
	},
		"border-end-end-radius": {
		syntax: "<length-percentage>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToDimensionOfBorderBox",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "allElementsUAsNotRequiredWhenCollapse",
		computed: "twoAbsoluteLengthOrPercentages",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-end-end-radius"
	},
		"border-end-start-radius": {
		syntax: "<length-percentage>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToDimensionOfBorderBox",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "allElementsUAsNotRequiredWhenCollapse",
		computed: "twoAbsoluteLengthOrPercentages",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-end-start-radius"
	},
		"border-image": {
		syntax: "<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: [
			"border-image-slice",
			"border-image-width"
		],
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: [
			"border-image-source",
			"border-image-slice",
			"border-image-width",
			"border-image-outset",
			"border-image-repeat"
		],
		appliesto: "allElementsExceptTableElementsWhenCollapse",
		computed: [
			"border-image-outset",
			"border-image-repeat",
			"border-image-slice",
			"border-image-source",
			"border-image-width"
		],
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-image"
	},
		"border-image-outset": {
		syntax: "[ <length> | <number> ]{1,4}",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "0",
		appliesto: "allElementsExceptTableElementsWhenCollapse",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-image-outset"
	},
		"border-image-repeat": {
		syntax: "[ stretch | repeat | round | space ]{1,2}",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "stretch",
		appliesto: "allElementsExceptTableElementsWhenCollapse",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-image-repeat"
	},
		"border-image-slice": {
		syntax: "<number-percentage>{1,4} && fill?",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "referToSizeOfBorderImage",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "100%",
		appliesto: "allElementsExceptTableElementsWhenCollapse",
		computed: "oneToFourPercentagesOrAbsoluteLengthsPlusFill",
		order: "percentagesOrLengthsFollowedByFill",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-image-slice"
	},
		"border-image-source": {
		syntax: "none | <image>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "none",
		appliesto: "allElementsExceptTableElementsWhenCollapse",
		computed: "noneOrImageWithAbsoluteURI",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-image-source"
	},
		"border-image-width": {
		syntax: "[ <length-percentage> | <number> | auto ]{1,4}",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "referToWidthOrHeightOfBorderImageArea",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "1",
		appliesto: "allElementsExceptTableElementsWhenCollapse",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-image-width"
	},
		"border-inline": {
		syntax: "<'border-top-width'> || <'border-top-style'> || <'color'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: [
			"border-top-width",
			"border-top-style",
			"border-top-color"
		],
		appliesto: "allElements",
		computed: [
			"border-top-width",
			"border-top-style",
			"border-top-color"
		],
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline"
	},
		"border-inline-end": {
		syntax: "<'border-top-width'> || <'border-top-style'> || <'color'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: [
			"border-width",
			"border-style",
			"color"
		],
		appliesto: "allElements",
		computed: [
			"border-width",
			"border-style",
			"border-inline-end-color"
		],
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-end"
	},
		"border-inline-color": {
		syntax: "<'border-top-color'>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: "currentcolor",
		appliesto: "allElements",
		computed: "computedColor",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-color"
	},
		"border-inline-style": {
		syntax: "<'border-top-style'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-style"
	},
		"border-inline-width": {
		syntax: "<'border-top-width'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "logicalWidthOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "medium",
		appliesto: "allElements",
		computed: "absoluteLengthZeroIfBorderStyleNoneOrHidden",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-width"
	},
		"border-inline-end-color": {
		syntax: "<'border-top-color'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: "currentcolor",
		appliesto: "allElements",
		computed: "computedColor",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-end-color"
	},
		"border-inline-end-style": {
		syntax: "<'border-top-style'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-end-style"
	},
		"border-inline-end-width": {
		syntax: "<'border-top-width'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "logicalWidthOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "medium",
		appliesto: "allElements",
		computed: "absoluteLengthZeroIfBorderStyleNoneOrHidden",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-end-width"
	},
		"border-inline-start": {
		syntax: "<'border-top-width'> || <'border-top-style'> || <'color'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: [
			"border-width",
			"border-style",
			"color"
		],
		appliesto: "allElements",
		computed: [
			"border-width",
			"border-style",
			"border-inline-start-color"
		],
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-start"
	},
		"border-inline-start-color": {
		syntax: "<'border-top-color'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: "currentcolor",
		appliesto: "allElements",
		computed: "computedColor",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-start-color"
	},
		"border-inline-start-style": {
		syntax: "<'border-top-style'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Logical Properties"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-start-style"
	},
		"border-inline-start-width": {
		syntax: "<'border-top-width'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "logicalWidthOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "medium",
		appliesto: "allElements",
		computed: "absoluteLengthZeroIfBorderStyleNoneOrHidden",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-inline-start-width"
	},
		"border-left": {
		syntax: "<line-width> || <line-style> || <color>",
		media: "visual",
		inherited: false,
		animationType: [
			"border-left-color",
			"border-left-style",
			"border-left-width"
		],
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: [
			"border-left-width",
			"border-left-style",
			"border-left-color"
		],
		appliesto: "allElements",
		computed: [
			"border-left-width",
			"border-left-style",
			"border-left-color"
		],
		order: "orderOfAppearance",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-left"
	},
		"border-left-color": {
		syntax: "<color>",
		media: "visual",
		inherited: false,
		animationType: "color",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "currentcolor",
		appliesto: "allElements",
		computed: "computedColor",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-left-color"
	},
		"border-left-style": {
		syntax: "<line-style>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-left-style"
	},
		"border-left-width": {
		syntax: "<line-width>",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "medium",
		appliesto: "allElements",
		computed: "absoluteLengthOr0IfBorderLeftStyleNoneOrHidden",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-left-width"
	},
		"border-radius": {
		syntax: "<length-percentage>{1,4} [ / <length-percentage>{1,4} ]?",
		media: "visual",
		inherited: false,
		animationType: [
			"border-top-left-radius",
			"border-top-right-radius",
			"border-bottom-right-radius",
			"border-bottom-left-radius"
		],
		percentages: "referToDimensionOfBorderBox",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: [
			"border-top-left-radius",
			"border-top-right-radius",
			"border-bottom-right-radius",
			"border-bottom-left-radius"
		],
		appliesto: "allElementsUAsNotRequiredWhenCollapse",
		computed: [
			"border-bottom-left-radius",
			"border-bottom-right-radius",
			"border-top-left-radius",
			"border-top-right-radius"
		],
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-radius"
	},
		"border-right": {
		syntax: "<line-width> || <line-style> || <color>",
		media: "visual",
		inherited: false,
		animationType: [
			"border-right-color",
			"border-right-style",
			"border-right-width"
		],
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: [
			"border-right-width",
			"border-right-style",
			"border-right-color"
		],
		appliesto: "allElements",
		computed: [
			"border-right-width",
			"border-right-style",
			"border-right-color"
		],
		order: "orderOfAppearance",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-right"
	},
		"border-right-color": {
		syntax: "<color>",
		media: "visual",
		inherited: false,
		animationType: "color",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "currentcolor",
		appliesto: "allElements",
		computed: "computedColor",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-right-color"
	},
		"border-right-style": {
		syntax: "<line-style>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-right-style"
	},
		"border-right-width": {
		syntax: "<line-width>",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "medium",
		appliesto: "allElements",
		computed: "absoluteLengthOr0IfBorderRightStyleNoneOrHidden",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-right-width"
	},
		"border-spacing": {
		syntax: "<length> <length>?",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Table"
		],
		initial: "0",
		appliesto: "tableElements",
		computed: "twoAbsoluteLengths",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-spacing"
	},
		"border-start-end-radius": {
		syntax: "<length-percentage>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToDimensionOfBorderBox",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "allElementsUAsNotRequiredWhenCollapse",
		computed: "twoAbsoluteLengthOrPercentages",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-start-end-radius"
	},
		"border-start-start-radius": {
		syntax: "<length-percentage>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToDimensionOfBorderBox",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "allElementsUAsNotRequiredWhenCollapse",
		computed: "twoAbsoluteLengthOrPercentages",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-start-start-radius"
	},
		"border-style": {
		syntax: "<line-style>{1,4}",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: [
			"border-top-style",
			"border-right-style",
			"border-bottom-style",
			"border-left-style"
		],
		appliesto: "allElements",
		computed: [
			"border-bottom-style",
			"border-left-style",
			"border-right-style",
			"border-top-style"
		],
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-style"
	},
		"border-top": {
		syntax: "<line-width> || <line-style> || <color>",
		media: "visual",
		inherited: false,
		animationType: [
			"border-top-color",
			"border-top-style",
			"border-top-width"
		],
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: [
			"border-top-width",
			"border-top-style",
			"border-top-color"
		],
		appliesto: "allElements",
		computed: [
			"border-top-width",
			"border-top-style",
			"border-top-color"
		],
		order: "orderOfAppearance",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-top"
	},
		"border-top-color": {
		syntax: "<color>",
		media: "visual",
		inherited: false,
		animationType: "color",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "currentcolor",
		appliesto: "allElements",
		computed: "computedColor",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-top-color"
	},
		"border-top-left-radius": {
		syntax: "<length-percentage>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToDimensionOfBorderBox",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "0",
		appliesto: "allElementsUAsNotRequiredWhenCollapse",
		computed: "twoAbsoluteLengthOrPercentages",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-top-left-radius"
	},
		"border-top-right-radius": {
		syntax: "<length-percentage>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToDimensionOfBorderBox",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "0",
		appliesto: "allElementsUAsNotRequiredWhenCollapse",
		computed: "twoAbsoluteLengthOrPercentages",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-top-right-radius"
	},
		"border-top-style": {
		syntax: "<line-style>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-top-style"
	},
		"border-top-width": {
		syntax: "<line-width>",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "medium",
		appliesto: "allElements",
		computed: "absoluteLengthOr0IfBorderTopStyleNoneOrHidden",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-top-width"
	},
		"border-width": {
		syntax: "<line-width>{1,4}",
		media: "visual",
		inherited: false,
		animationType: [
			"border-bottom-width",
			"border-left-width",
			"border-right-width",
			"border-top-width"
		],
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: [
			"border-top-width",
			"border-right-width",
			"border-bottom-width",
			"border-left-width"
		],
		appliesto: "allElements",
		computed: [
			"border-bottom-width",
			"border-left-width",
			"border-right-width",
			"border-top-width"
		],
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/border-width"
	},
		bottom: bottom,
		"box-align": {
		syntax: "start | center | end | baseline | stretch",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions",
			"WebKit Extensions"
		],
		initial: "stretch",
		appliesto: "elementsWithDisplayBoxOrInlineBox",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-align"
	},
		"box-decoration-break": {
		syntax: "slice | clone",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fragmentation"
		],
		initial: "slice",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-decoration-break"
	},
		"box-direction": {
		syntax: "normal | reverse | inherit",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions",
			"WebKit Extensions"
		],
		initial: "normal",
		appliesto: "elementsWithDisplayBoxOrInlineBox",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-direction"
	},
		"box-flex": {
		syntax: "<number>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions",
			"WebKit Extensions"
		],
		initial: "0",
		appliesto: "directChildrenOfElementsWithDisplayMozBoxMozInlineBox",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-flex"
	},
		"box-flex-group": {
		syntax: "<integer>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions",
			"WebKit Extensions"
		],
		initial: "1",
		appliesto: "inFlowChildrenOfBoxElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-flex-group"
	},
		"box-lines": {
		syntax: "single | multiple",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions",
			"WebKit Extensions"
		],
		initial: "single",
		appliesto: "boxElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-lines"
	},
		"box-ordinal-group": {
		syntax: "<integer>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions",
			"WebKit Extensions"
		],
		initial: "1",
		appliesto: "childrenOfBoxElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-ordinal-group"
	},
		"box-orient": {
		syntax: "horizontal | vertical | inline-axis | block-axis | inherit",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions",
			"WebKit Extensions"
		],
		initial: "inlineAxisHorizontalInXUL",
		appliesto: "elementsWithDisplayBoxOrInlineBox",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-orient"
	},
		"box-pack": {
		syntax: "start | center | end | justify",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions",
			"WebKit Extensions"
		],
		initial: "start",
		appliesto: "elementsWithDisplayMozBoxMozInlineBox",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-pack"
	},
		"box-shadow": {
		syntax: "none | <shadow>#",
		media: "visual",
		inherited: false,
		animationType: "shadowList",
		percentages: "no",
		groups: [
			"CSS Backgrounds and Borders"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "absoluteLengthsSpecifiedColorAsSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-shadow"
	},
		"box-sizing": {
		syntax: "content-box | border-box",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Basic User Interface"
		],
		initial: "content-box",
		appliesto: "allElementsAcceptingWidthOrHeight",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/box-sizing"
	},
		"break-after": {
		syntax: "auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fragmentation"
		],
		initial: "auto",
		appliesto: "blockLevelElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/break-after"
	},
		"break-before": {
		syntax: "auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fragmentation"
		],
		initial: "auto",
		appliesto: "blockLevelElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/break-before"
	},
		"break-inside": {
		syntax: "auto | avoid | avoid-page | avoid-column | avoid-region",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fragmentation"
		],
		initial: "auto",
		appliesto: "blockLevelElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/break-inside"
	},
		"caption-side": {
		syntax: "top | bottom | block-start | block-end | inline-start | inline-end",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Table"
		],
		initial: "top",
		appliesto: "tableCaptionElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/caption-side"
	},
		"caret-color": {
		syntax: "auto | <color>",
		media: "interactive",
		inherited: true,
		animationType: "color",
		percentages: "no",
		groups: [
			"CSS Basic User Interface"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asAutoOrColor",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/caret-color"
	},
		clear: clear,
		clip: clip,
		"clip-path": {
		syntax: "<clip-source> | [ <basic-shape> || <geometry-box> ] | none",
		media: "visual",
		inherited: false,
		animationType: "basicShapeOtherwiseNo",
		percentages: "referToReferenceBoxWhenSpecifiedOtherwiseBorderBox",
		groups: [
			"CSS Masking"
		],
		initial: "none",
		appliesto: "allElementsSVGContainerElements",
		computed: "asSpecifiedURLsAbsolute",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/clip-path"
	},
		color: color,
		"color-adjust": {
		syntax: "economy | exact",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Color"
		],
		initial: "economy",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/color-adjust"
	},
		"column-count": {
		syntax: "<integer> | auto",
		media: "visual",
		inherited: false,
		animationType: "integer",
		percentages: "no",
		groups: [
			"CSS Columns"
		],
		initial: "auto",
		appliesto: "blockContainersExceptTableWrappers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-count"
	},
		"column-fill": {
		syntax: "auto | balance | balance-all",
		media: "visualInContinuousMediaNoEffectInOverflowColumns",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Columns"
		],
		initial: "balance",
		appliesto: "multicolElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-fill"
	},
		"column-gap": {
		syntax: "normal | <length-percentage>",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToDimensionOfContentArea",
		groups: [
			"CSS Box Alignment"
		],
		initial: "normal",
		appliesto: "multiColumnElementsFlexContainersGridContainers",
		computed: "asSpecifiedWithLengthsAbsoluteAndNormalComputingToZeroExceptMultiColumn",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-gap"
	},
		"column-rule": {
		syntax: "<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>",
		media: "visual",
		inherited: false,
		animationType: [
			"column-rule-color",
			"column-rule-style",
			"column-rule-width"
		],
		percentages: "no",
		groups: [
			"CSS Columns"
		],
		initial: [
			"column-rule-width",
			"column-rule-style",
			"column-rule-color"
		],
		appliesto: "multicolElements",
		computed: [
			"column-rule-color",
			"column-rule-style",
			"column-rule-width"
		],
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-rule"
	},
		"column-rule-color": {
		syntax: "<color>",
		media: "visual",
		inherited: false,
		animationType: "color",
		percentages: "no",
		groups: [
			"CSS Columns"
		],
		initial: "currentcolor",
		appliesto: "multicolElements",
		computed: "computedColor",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-rule-color"
	},
		"column-rule-style": {
		syntax: "<'border-style'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Columns"
		],
		initial: "none",
		appliesto: "multicolElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-rule-style"
	},
		"column-rule-width": {
		syntax: "<'border-width'>",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "no",
		groups: [
			"CSS Columns"
		],
		initial: "medium",
		appliesto: "multicolElements",
		computed: "absoluteLength0IfColumnRuleStyleNoneOrHidden",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-rule-width"
	},
		"column-span": {
		syntax: "none | all",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Columns"
		],
		initial: "none",
		appliesto: "inFlowBlockLevelElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-span"
	},
		"column-width": {
		syntax: "<length> | auto",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "no",
		groups: [
			"CSS Columns"
		],
		initial: "auto",
		appliesto: "blockContainersExceptTableWrappers",
		computed: "absoluteLengthZeroOrLarger",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-width"
	},
		columns: columns,
		contain: contain,
		content: content,
		"counter-increment": {
		syntax: "[ <custom-ident> <integer>? ]+ | none",
		media: "all",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Counter Styles"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/counter-increment"
	},
		"counter-reset": {
		syntax: "[ <custom-ident> <integer>? ]+ | none",
		media: "all",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Counter Styles"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/counter-reset"
	},
		"counter-set": {
		syntax: "[ <custom-ident> <integer>? ]+ | none",
		media: "all",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Counter Styles"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/counter-set"
	},
		cursor: cursor,
		direction: direction,
		display: display,
		"empty-cells": {
		syntax: "show | hide",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Table"
		],
		initial: "show",
		appliesto: "tableCellElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/empty-cells"
	},
		filter: filter,
		flex: flex,
		"flex-basis": {
		syntax: "content | <'width'>",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToFlexContainersInnerMainSize",
		groups: [
			"CSS Flexible Box Layout"
		],
		initial: "auto",
		appliesto: "flexItemsAndInFlowPseudos",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "lengthOrPercentageBeforeKeywordIfBothPresent",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/flex-basis"
	},
		"flex-direction": {
		syntax: "row | row-reverse | column | column-reverse",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Flexible Box Layout"
		],
		initial: "row",
		appliesto: "flexContainers",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/flex-direction"
	},
		"flex-flow": {
		syntax: "<'flex-direction'> || <'flex-wrap'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Flexible Box Layout"
		],
		initial: [
			"flex-direction",
			"flex-wrap"
		],
		appliesto: "flexContainers",
		computed: [
			"flex-direction",
			"flex-wrap"
		],
		order: "orderOfAppearance",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/flex-flow"
	},
		"flex-grow": {
		syntax: "<number>",
		media: "visual",
		inherited: false,
		animationType: "number",
		percentages: "no",
		groups: [
			"CSS Flexible Box Layout"
		],
		initial: "0",
		appliesto: "flexItemsAndInFlowPseudos",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/flex-grow"
	},
		"flex-shrink": {
		syntax: "<number>",
		media: "visual",
		inherited: false,
		animationType: "number",
		percentages: "no",
		groups: [
			"CSS Flexible Box Layout"
		],
		initial: "1",
		appliesto: "flexItemsAndInFlowPseudos",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/flex-shrink"
	},
		"flex-wrap": {
		syntax: "nowrap | wrap | wrap-reverse",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Flexible Box Layout"
		],
		initial: "nowrap",
		appliesto: "flexContainers",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/flex-wrap"
	},
		float: float,
		font: font,
		"font-family": {
		syntax: "[ <family-name> | <generic-family> ]#",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "dependsOnUserAgent",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-family"
	},
		"font-feature-settings": {
		syntax: "normal | <feature-tag-value>#",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-feature-settings"
	},
		"font-kerning": {
		syntax: "auto | normal | none",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-kerning"
	},
		"font-language-override": {
		syntax: "normal | <string>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-language-override"
	},
		"font-optical-sizing": {
		syntax: "auto | none",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-optical-sizing"
	},
		"font-variation-settings": {
		syntax: "normal | [ <string> <number> ]#",
		media: "visual",
		inherited: true,
		animationType: "transform",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-variation-settings"
	},
		"font-size": {
		syntax: "<absolute-size> | <relative-size> | <length-percentage>",
		media: "visual",
		inherited: true,
		animationType: "length",
		percentages: "referToParentElementsFontSize",
		groups: [
			"CSS Fonts"
		],
		initial: "medium",
		appliesto: "allElements",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-size"
	},
		"font-size-adjust": {
		syntax: "none | <number>",
		media: "visual",
		inherited: true,
		animationType: "number",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-size-adjust"
	},
		"font-stretch": {
		syntax: "<font-stretch-absolute>",
		media: "visual",
		inherited: true,
		animationType: "fontStretch",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-stretch"
	},
		"font-style": {
		syntax: "normal | italic | oblique <angle>?",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-style"
	},
		"font-synthesis": {
		syntax: "none | [ weight || style ]",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "weight style",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "orderOfAppearance",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-synthesis"
	},
		"font-variant": {
		syntax: "normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) || [ small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps ] || <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero || <east-asian-variant-values> || <east-asian-width-values> || ruby ]",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-variant"
	},
		"font-variant-alternates": {
		syntax: "normal | [ stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) ]",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "orderOfAppearance",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-alternates"
	},
		"font-variant-caps": {
		syntax: "normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-caps"
	},
		"font-variant-east-asian": {
		syntax: "normal | [ <east-asian-variant-values> || <east-asian-width-values> || ruby ]",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "orderOfAppearance",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-east-asian"
	},
		"font-variant-ligatures": {
		syntax: "normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> ]",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "orderOfAppearance",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-ligatures"
	},
		"font-variant-numeric": {
		syntax: "normal | [ <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero ]",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "orderOfAppearance",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-numeric"
	},
		"font-variant-position": {
		syntax: "normal | sub | super",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-variant-position"
	},
		"font-weight": {
		syntax: "<font-weight-absolute> | bolder | lighter",
		media: "visual",
		inherited: true,
		animationType: "fontWeight",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "keywordOrNumericalValueBolderLighterTransformedToRealValue",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/font-weight"
	},
		gap: gap,
		grid: grid,
		"grid-area": {
		syntax: "<grid-line> [ / <grid-line> ]{0,3}",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Grid Layout"
		],
		initial: [
			"grid-row-start",
			"grid-column-start",
			"grid-row-end",
			"grid-column-end"
		],
		appliesto: "gridItemsAndBoxesWithinGridContainer",
		computed: [
			"grid-row-start",
			"grid-column-start",
			"grid-row-end",
			"grid-column-end"
		],
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-area"
	},
		"grid-auto-columns": {
		syntax: "<track-size>+",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "referToDimensionOfContentArea",
		groups: [
			"CSS Grid Layout"
		],
		initial: "auto",
		appliesto: "gridContainers",
		computed: "percentageAsSpecifiedOrAbsoluteLength",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-auto-columns"
	},
		"grid-auto-flow": {
		syntax: "[ row | column ] || dense",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Grid Layout"
		],
		initial: "row",
		appliesto: "gridContainers",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-auto-flow"
	},
		"grid-auto-rows": {
		syntax: "<track-size>+",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "referToDimensionOfContentArea",
		groups: [
			"CSS Grid Layout"
		],
		initial: "auto",
		appliesto: "gridContainers",
		computed: "percentageAsSpecifiedOrAbsoluteLength",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-auto-rows"
	},
		"grid-column": {
		syntax: "<grid-line> [ / <grid-line> ]?",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Grid Layout"
		],
		initial: [
			"grid-column-start",
			"grid-column-end"
		],
		appliesto: "gridItemsAndBoxesWithinGridContainer",
		computed: [
			"grid-column-start",
			"grid-column-end"
		],
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-column"
	},
		"grid-column-end": {
		syntax: "<grid-line>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Grid Layout"
		],
		initial: "auto",
		appliesto: "gridItemsAndBoxesWithinGridContainer",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-column-end"
	},
		"grid-column-gap": {
		syntax: "<length-percentage>",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "referToDimensionOfContentArea",
		groups: [
			"CSS Grid Layout"
		],
		initial: "0",
		appliesto: "gridContainers",
		computed: "percentageAsSpecifiedOrAbsoluteLength",
		order: "uniqueOrder",
		status: "obsolete",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/column-gap"
	},
		"grid-column-start": {
		syntax: "<grid-line>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Grid Layout"
		],
		initial: "auto",
		appliesto: "gridItemsAndBoxesWithinGridContainer",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-column-start"
	},
		"grid-gap": {
		syntax: "<'grid-row-gap'> <'grid-column-gap'>?",
		media: "visual",
		inherited: false,
		animationType: [
			"grid-row-gap",
			"grid-column-gap"
		],
		percentages: "no",
		groups: [
			"CSS Grid Layout"
		],
		initial: [
			"grid-row-gap",
			"grid-column-gap"
		],
		appliesto: "gridContainers",
		computed: [
			"grid-row-gap",
			"grid-column-gap"
		],
		order: "uniqueOrder",
		status: "obsolete",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/gap"
	},
		"grid-row": {
		syntax: "<grid-line> [ / <grid-line> ]?",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Grid Layout"
		],
		initial: [
			"grid-row-start",
			"grid-row-end"
		],
		appliesto: "gridItemsAndBoxesWithinGridContainer",
		computed: [
			"grid-row-start",
			"grid-row-end"
		],
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-row"
	},
		"grid-row-end": {
		syntax: "<grid-line>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Grid Layout"
		],
		initial: "auto",
		appliesto: "gridItemsAndBoxesWithinGridContainer",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-row-end"
	},
		"grid-row-gap": {
		syntax: "<length-percentage>",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "referToDimensionOfContentArea",
		groups: [
			"CSS Grid Layout"
		],
		initial: "0",
		appliesto: "gridContainers",
		computed: "percentageAsSpecifiedOrAbsoluteLength",
		order: "uniqueOrder",
		status: "obsolete",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/row-gap"
	},
		"grid-row-start": {
		syntax: "<grid-line>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Grid Layout"
		],
		initial: "auto",
		appliesto: "gridItemsAndBoxesWithinGridContainer",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-row-start"
	},
		"grid-template": {
		syntax: "none | [ <'grid-template-rows'> / <'grid-template-columns'> ] | [ <line-names>? <string> <track-size>? <line-names>? ]+ [ / <explicit-track-list> ]?",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: [
			"grid-template-columns",
			"grid-template-rows"
		],
		groups: [
			"CSS Grid Layout"
		],
		initial: [
			"grid-template-columns",
			"grid-template-rows",
			"grid-template-areas"
		],
		appliesto: "gridContainers",
		computed: [
			"grid-template-columns",
			"grid-template-rows",
			"grid-template-areas"
		],
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-template"
	},
		"grid-template-areas": {
		syntax: "none | <string>+",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Grid Layout"
		],
		initial: "none",
		appliesto: "gridContainers",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-template-areas"
	},
		"grid-template-columns": {
		syntax: "none | <track-list> | <auto-track-list> | subgrid <line-name-list>?",
		media: "visual",
		inherited: false,
		animationType: "simpleListOfLpcDifferenceLpc",
		percentages: "referToDimensionOfContentArea",
		groups: [
			"CSS Grid Layout"
		],
		initial: "none",
		appliesto: "gridContainers",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-template-columns"
	},
		"grid-template-rows": {
		syntax: "none | <track-list> | <auto-track-list> | subgrid <line-name-list>?",
		media: "visual",
		inherited: false,
		animationType: "simpleListOfLpcDifferenceLpc",
		percentages: "referToDimensionOfContentArea",
		groups: [
			"CSS Grid Layout"
		],
		initial: "none",
		appliesto: "gridContainers",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/grid-template-rows"
	},
		"hanging-punctuation": {
		syntax: "none | [ first || [ force-end | allow-end ] || last ]",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/hanging-punctuation"
	},
		height: height,
		hyphens: hyphens,
		"image-orientation": {
		syntax: "from-image | <angle> | [ <angle>? flip ]",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Images"
		],
		initial: "0deg",
		appliesto: "allElements",
		computed: "angleRoundedToNextQuarter",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/image-orientation"
	},
		"image-rendering": {
		syntax: "auto | crisp-edges | pixelated",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Images"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/image-rendering"
	},
		"image-resolution": {
		syntax: "[ from-image || <resolution> ] && snap?",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Images"
		],
		initial: "1dppx",
		appliesto: "allElements",
		computed: "asSpecifiedWithExceptionOfResolution",
		order: "uniqueOrder",
		status: "experimental"
	},
		"ime-mode": {
		syntax: "auto | normal | active | inactive | disabled",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Basic User Interface"
		],
		initial: "auto",
		appliesto: "textFields",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "obsolete",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/ime-mode"
	},
		"initial-letter": {
		syntax: "normal | [ <number> <integer>? ]",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Inline"
		],
		initial: "normal",
		appliesto: "firstLetterPseudoElementsAndInlineLevelFirstChildren",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/initial-letter"
	},
		"initial-letter-align": {
		syntax: "[ auto | alphabetic | hanging | ideographic ]",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Inline"
		],
		initial: "auto",
		appliesto: "firstLetterPseudoElementsAndInlineLevelFirstChildren",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/initial-letter-align"
	},
		"inline-size": {
		syntax: "<'width'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "inlineSizeOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "auto",
		appliesto: "sameAsWidthAndHeight",
		computed: "sameAsWidthAndHeight",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/inline-size"
	},
		inset: inset,
		"inset-block": {
		syntax: "<'top'>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "logicalHeightOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "auto",
		appliesto: "positionedElements",
		computed: "sameAsBoxOffsets",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/inset-block"
	},
		"inset-block-end": {
		syntax: "<'top'>",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "logicalHeightOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "auto",
		appliesto: "positionedElements",
		computed: "sameAsBoxOffsets",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/inset-block-end"
	},
		"inset-block-start": {
		syntax: "<'top'>",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "logicalHeightOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "auto",
		appliesto: "positionedElements",
		computed: "sameAsBoxOffsets",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/inset-block-start"
	},
		"inset-inline": {
		syntax: "<'top'>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "logicalWidthOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "auto",
		appliesto: "positionedElements",
		computed: "sameAsBoxOffsets",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/inset-inline"
	},
		"inset-inline-end": {
		syntax: "<'top'>",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "logicalWidthOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "auto",
		appliesto: "positionedElements",
		computed: "sameAsBoxOffsets",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/inset-inline-end"
	},
		"inset-inline-start": {
		syntax: "<'top'>",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "logicalWidthOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "auto",
		appliesto: "positionedElements",
		computed: "sameAsBoxOffsets",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/inset-inline-start"
	},
		isolation: isolation,
		"justify-content": {
		syntax: "normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Box Alignment"
		],
		initial: "normal",
		appliesto: "flexContainers",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/justify-content"
	},
		"justify-items": {
		syntax: "normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ] | legacy | legacy && [ left | right | center ]",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Box Alignment"
		],
		initial: "legacy",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/justify-items"
	},
		"justify-self": {
		syntax: "auto | normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ]",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Box Alignment"
		],
		initial: "auto",
		appliesto: "blockLevelBoxesAndAbsolutelyPositionedBoxesAndGridItems",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/justify-self"
	},
		left: left,
		"letter-spacing": {
		syntax: "normal | <length>",
		media: "visual",
		inherited: true,
		animationType: "length",
		percentages: "no",
		groups: [
			"CSS Text"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "optimumValueOfAbsoluteLengthOrNormal",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/letter-spacing"
	},
		"line-break": {
		syntax: "auto | loose | normal | strict | anywhere",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/line-break"
	},
		"line-clamp": {
		syntax: "none | <integer>",
		media: "visual",
		inherited: false,
		animationType: "integer",
		percentages: "no",
		groups: [
			"CSS Overflow"
		],
		initial: "none",
		appliesto: "blockContainersExceptMultiColumnContainers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "experimental"
	},
		"line-height": {
		syntax: "normal | <number> | <length> | <percentage>",
		media: "visual",
		inherited: true,
		animationType: "numberOrLength",
		percentages: "referToElementFontSize",
		groups: [
			"CSS Fonts"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "absoluteLengthOrAsSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/line-height"
	},
		"line-height-step": {
		syntax: "<length>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Fonts"
		],
		initial: "0",
		appliesto: "blockContainers",
		computed: "absoluteLength",
		order: "perGrammar",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/line-height-step"
	},
		"list-style": {
		syntax: "<'list-style-type'> || <'list-style-position'> || <'list-style-image'>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Lists and Counters"
		],
		initial: [
			"list-style-type",
			"list-style-position",
			"list-style-image"
		],
		appliesto: "listItems",
		computed: [
			"list-style-image",
			"list-style-position",
			"list-style-type"
		],
		order: "orderOfAppearance",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/list-style"
	},
		"list-style-image": {
		syntax: "<url> | none",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Lists and Counters"
		],
		initial: "none",
		appliesto: "listItems",
		computed: "noneOrImageWithAbsoluteURI",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/list-style-image"
	},
		"list-style-position": {
		syntax: "inside | outside",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Lists and Counters"
		],
		initial: "outside",
		appliesto: "listItems",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/list-style-position"
	},
		"list-style-type": {
		syntax: "<counter-style> | <string> | none",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Lists and Counters"
		],
		initial: "disc",
		appliesto: "listItems",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/list-style-type"
	},
		margin: margin,
		"margin-block": {
		syntax: "<'margin-left'>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "dependsOnLayoutModel",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "sameAsMargin",
		computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-block"
	},
		"margin-block-end": {
		syntax: "<'margin-left'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "dependsOnLayoutModel",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "sameAsMargin",
		computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-block-end"
	},
		"margin-block-start": {
		syntax: "<'margin-left'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "dependsOnLayoutModel",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "sameAsMargin",
		computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-block-start"
	},
		"margin-bottom": {
		syntax: "<length> | <percentage> | auto",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Box Model"
		],
		initial: "0",
		appliesto: "allElementsExceptTableDisplayTypes",
		computed: "percentageAsSpecifiedOrAbsoluteLength",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-bottom"
	},
		"margin-inline": {
		syntax: "<'margin-left'>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "dependsOnLayoutModel",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "sameAsMargin",
		computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-inline"
	},
		"margin-inline-end": {
		syntax: "<'margin-left'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "dependsOnLayoutModel",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "sameAsMargin",
		computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-inline-end"
	},
		"margin-inline-start": {
		syntax: "<'margin-left'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "dependsOnLayoutModel",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "sameAsMargin",
		computed: "lengthAbsolutePercentageAsSpecifiedOtherwiseAuto",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-inline-start"
	},
		"margin-left": {
		syntax: "<length> | <percentage> | auto",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Box Model"
		],
		initial: "0",
		appliesto: "allElementsExceptTableDisplayTypes",
		computed: "percentageAsSpecifiedOrAbsoluteLength",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-left"
	},
		"margin-right": {
		syntax: "<length> | <percentage> | auto",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Box Model"
		],
		initial: "0",
		appliesto: "allElementsExceptTableDisplayTypes",
		computed: "percentageAsSpecifiedOrAbsoluteLength",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-right"
	},
		"margin-top": {
		syntax: "<length> | <percentage> | auto",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Box Model"
		],
		initial: "0",
		appliesto: "allElementsExceptTableDisplayTypes",
		computed: "percentageAsSpecifiedOrAbsoluteLength",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/margin-top"
	},
		mask: mask,
		"mask-border": {
		syntax: "<'mask-border-source'> || <'mask-border-slice'> [ / <'mask-border-width'>? [ / <'mask-border-outset'> ]? ]? || <'mask-border-repeat'> || <'mask-border-mode'>",
		media: "visual",
		inherited: false,
		animationType: [
			"mask-border-mode",
			"mask-border-outset",
			"mask-border-repeat",
			"mask-border-slice",
			"mask-border-source",
			"mask-border-width"
		],
		percentages: [
			"mask-border-slice",
			"mask-border-width"
		],
		groups: [
			"CSS Masking"
		],
		initial: [
			"mask-border-mode",
			"mask-border-outset",
			"mask-border-repeat",
			"mask-border-slice",
			"mask-border-source",
			"mask-border-width"
		],
		appliesto: "allElementsSVGContainerElements",
		computed: [
			"mask-border-mode",
			"mask-border-outset",
			"mask-border-repeat",
			"mask-border-slice",
			"mask-border-source",
			"mask-border-width"
		],
		order: "perGrammar",
		stacking: true,
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-border"
	},
		"mask-border-mode": {
		syntax: "luminance | alpha",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Masking"
		],
		initial: "alpha",
		appliesto: "allElementsSVGContainerElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-mode"
	},
		"mask-border-outset": {
		syntax: "[ <length> | <number> ]{1,4}",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Masking"
		],
		initial: "0",
		appliesto: "allElementsSVGContainerElements",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "perGrammar",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-outset"
	},
		"mask-border-repeat": {
		syntax: "[ stretch | repeat | round | space ]{1,2}",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Masking"
		],
		initial: "stretch",
		appliesto: "allElementsSVGContainerElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-repeat"
	},
		"mask-border-slice": {
		syntax: "<number-percentage>{1,4} fill?",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "referToSizeOfMaskBorderImage",
		groups: [
			"CSS Masking"
		],
		initial: "0",
		appliesto: "allElementsSVGContainerElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-slice"
	},
		"mask-border-source": {
		syntax: "none | <image>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Masking"
		],
		initial: "none",
		appliesto: "allElementsSVGContainerElements",
		computed: "asSpecifiedURLsAbsolute",
		order: "perGrammar",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-source"
	},
		"mask-border-width": {
		syntax: "[ <length-percentage> | <number> | auto ]{1,4}",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "relativeToMaskBorderImageArea",
		groups: [
			"CSS Masking"
		],
		initial: "auto",
		appliesto: "allElementsSVGContainerElements",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "perGrammar",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-border-width"
	},
		"mask-clip": {
		syntax: "[ <geometry-box> | no-clip ]#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Masking"
		],
		initial: "border-box",
		appliesto: "allElementsSVGContainerElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-clip"
	},
		"mask-composite": {
		syntax: "<compositing-operator>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Masking"
		],
		initial: "add",
		appliesto: "allElementsSVGContainerElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-composite"
	},
		"mask-image": {
		syntax: "<mask-reference>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Masking"
		],
		initial: "none",
		appliesto: "allElementsSVGContainerElements",
		computed: "asSpecifiedURLsAbsolute",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-image"
	},
		"mask-mode": {
		syntax: "<masking-mode>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Masking"
		],
		initial: "match-source",
		appliesto: "allElementsSVGContainerElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-mode"
	},
		"mask-origin": {
		syntax: "<geometry-box>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Masking"
		],
		initial: "border-box",
		appliesto: "allElementsSVGContainerElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-origin"
	},
		"mask-position": {
		syntax: "<position>#",
		media: "visual",
		inherited: false,
		animationType: "repeatableListOfSimpleListOfLpc",
		percentages: "referToSizeOfMaskPaintingArea",
		groups: [
			"CSS Masking"
		],
		initial: "center",
		appliesto: "allElementsSVGContainerElements",
		computed: "consistsOfTwoKeywordsForOriginAndOffsets",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-position"
	},
		"mask-repeat": {
		syntax: "<repeat-style>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Masking"
		],
		initial: "no-repeat",
		appliesto: "allElementsSVGContainerElements",
		computed: "consistsOfTwoDimensionKeywords",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-repeat"
	},
		"mask-size": {
		syntax: "<bg-size>#",
		media: "visual",
		inherited: false,
		animationType: "repeatableListOfSimpleListOfLpc",
		percentages: "no",
		groups: [
			"CSS Masking"
		],
		initial: "auto",
		appliesto: "allElementsSVGContainerElements",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-size"
	},
		"mask-type": {
		syntax: "luminance | alpha",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Masking"
		],
		initial: "luminance",
		appliesto: "maskElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mask-type"
	},
		"max-block-size": {
		syntax: "<'max-width'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "blockSizeOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "sameAsWidthAndHeight",
		computed: "sameAsMaxWidthAndMaxHeight",
		order: "uniqueOrder",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/max-block-size"
	},
		"max-height": {
		syntax: "<length> | <percentage> | none | max-content | min-content | fit-content | fill-available",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "regardingHeightOfGeneratedBoxContainingBlockPercentagesNone",
		groups: [
			"CSS Box Model"
		],
		initial: "none",
		appliesto: "allElementsButNonReplacedAndTableColumns",
		computed: "percentageAsSpecifiedAbsoluteLengthOrNone",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/max-height"
	},
		"max-inline-size": {
		syntax: "<'max-width'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "inlineSizeOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "sameAsWidthAndHeight",
		computed: "sameAsMaxWidthAndMaxHeight",
		order: "uniqueOrder",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/max-inline-size"
	},
		"max-lines": {
		syntax: "none | <integer>",
		media: "visual",
		inherited: false,
		animationType: "integer",
		percentages: "no",
		groups: [
			"CSS Overflow"
		],
		initial: "none",
		appliesto: "blockContainersExceptMultiColumnContainers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "experimental"
	},
		"max-width": {
		syntax: "<length> | <percentage> | none | max-content | min-content | fit-content | fill-available",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Box Model"
		],
		initial: "none",
		appliesto: "allElementsButNonReplacedAndTableRows",
		computed: "percentageAsSpecifiedAbsoluteLengthOrNone",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/max-width"
	},
		"min-block-size": {
		syntax: "<'min-width'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "blockSizeOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "sameAsWidthAndHeight",
		computed: "sameAsMinWidthAndMinHeight",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/min-block-size"
	},
		"min-height": {
		syntax: "<length> | <percentage> | auto | max-content | min-content | fit-content | fill-available",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "regardingHeightOfGeneratedBoxContainingBlockPercentages0",
		groups: [
			"CSS Box Model"
		],
		initial: "auto",
		appliesto: "allElementsButNonReplacedAndTableColumns",
		computed: "percentageAsSpecifiedOrAbsoluteLength",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/min-height"
	},
		"min-inline-size": {
		syntax: "<'min-width'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "inlineSizeOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "sameAsWidthAndHeight",
		computed: "sameAsMinWidthAndMinHeight",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/min-inline-size"
	},
		"min-width": {
		syntax: "<length> | <percentage> | auto | max-content | min-content | fit-content | fill-available",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Box Model"
		],
		initial: "auto",
		appliesto: "allElementsButNonReplacedAndTableRows",
		computed: "percentageAsSpecifiedOrAbsoluteLength",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/min-width"
	},
		"mix-blend-mode": {
		syntax: "<blend-mode>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Compositing and Blending"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		stacking: true,
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/mix-blend-mode"
	},
		"object-fit": {
		syntax: "fill | contain | cover | none | scale-down",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Images"
		],
		initial: "fill",
		appliesto: "replacedElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/object-fit"
	},
		"object-position": {
		syntax: "<position>",
		media: "visual",
		inherited: true,
		animationType: "repeatableListOfSimpleListOfLpc",
		percentages: "referToWidthAndHeightOfElement",
		groups: [
			"CSS Images"
		],
		initial: "50% 50%",
		appliesto: "replacedElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/object-position"
	},
		offset: offset,
		"offset-anchor": {
		syntax: "auto | <position>",
		media: "visual",
		inherited: false,
		animationType: "position",
		percentages: "relativeToWidthAndHeight",
		groups: [
			"CSS Motion Path"
		],
		initial: "auto",
		appliesto: "transformableElements",
		computed: "forLengthAbsoluteValueOtherwisePercentage",
		order: "perGrammar",
		status: "experimental"
	},
		"offset-distance": {
		syntax: "<length-percentage>",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToTotalPathLength",
		groups: [
			"CSS Motion Path"
		],
		initial: "0",
		appliesto: "transformableElements",
		computed: "forLengthAbsoluteValueOtherwisePercentage",
		order: "perGrammar",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/offset-distance"
	},
		"offset-path": {
		syntax: "none | ray( [ <angle> && <size>? && contain? ] ) | <path()> | <url> | [ <basic-shape> || <geometry-box> ]",
		media: "visual",
		inherited: false,
		animationType: "angleOrBasicShapeOrPath",
		percentages: "no",
		groups: [
			"CSS Motion Path"
		],
		initial: "none",
		appliesto: "transformableElements",
		computed: "asSpecified",
		order: "perGrammar",
		stacking: true,
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/offset-path"
	},
		"offset-position": {
		syntax: "auto | <position>",
		media: "visual",
		inherited: false,
		animationType: "position",
		percentages: "referToSizeOfContainingBlock",
		groups: [
			"CSS Motion Path"
		],
		initial: "auto",
		appliesto: "transformableElements",
		computed: "forLengthAbsoluteValueOtherwisePercentage",
		order: "perGrammar",
		status: "experimental"
	},
		"offset-rotate": {
		syntax: "[ auto | reverse ] || <angle>",
		media: "visual",
		inherited: false,
		animationType: "angleOrBasicShapeOrPath",
		percentages: "no",
		groups: [
			"CSS Motion Path"
		],
		initial: "auto",
		appliesto: "transformableElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/offset-rotate"
	},
		opacity: opacity,
		order: order,
		orphans: orphans,
		outline: outline,
		"outline-color": {
		syntax: "<color> | invert",
		media: [
			"visual",
			"interactive"
		],
		inherited: false,
		animationType: "color",
		percentages: "no",
		groups: [
			"CSS Basic User Interface"
		],
		initial: "invertOrCurrentColor",
		appliesto: "allElements",
		computed: "invertForTranslucentColorRGBAOtherwiseRGB",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/outline-color"
	},
		"outline-offset": {
		syntax: "<length>",
		media: [
			"visual",
			"interactive"
		],
		inherited: false,
		animationType: "length",
		percentages: "no",
		groups: [
			"CSS Basic User Interface"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/outline-offset"
	},
		"outline-style": {
		syntax: "auto | <'border-style'>",
		media: [
			"visual",
			"interactive"
		],
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Basic User Interface"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/outline-style"
	},
		"outline-width": {
		syntax: "<line-width>",
		media: [
			"visual",
			"interactive"
		],
		inherited: false,
		animationType: "length",
		percentages: "no",
		groups: [
			"CSS Basic User Interface"
		],
		initial: "medium",
		appliesto: "allElements",
		computed: "absoluteLength0ForNone",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/outline-width"
	},
		overflow: overflow,
		"overflow-anchor": {
		syntax: "auto | none",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Scroll Anchoring"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "experimental"
	},
		"overflow-block": {
		syntax: "visible | hidden | clip | scroll | auto",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Overflow"
		],
		initial: "auto",
		appliesto: "blockContainersFlexContainersGridContainers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "experimental"
	},
		"overflow-clip-box": {
		syntax: "padding-box | content-box",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Mozilla Extensions"
		],
		initial: "padding-box",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Mozilla/CSS/overflow-clip-box"
	},
		"overflow-inline": {
		syntax: "visible | hidden | clip | scroll | auto",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Overflow"
		],
		initial: "auto",
		appliesto: "blockContainersFlexContainersGridContainers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "experimental"
	},
		"overflow-wrap": {
		syntax: "normal | break-word | anywhere",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text"
		],
		initial: "normal",
		appliesto: "nonReplacedInlineElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overflow-wrap"
	},
		"overflow-x": {
		syntax: "visible | hidden | clip | scroll | auto",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Overflow"
		],
		initial: "visible",
		appliesto: "blockContainersFlexContainersGridContainers",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overflow-x"
	},
		"overflow-y": {
		syntax: "visible | hidden | clip | scroll | auto",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Overflow"
		],
		initial: "visible",
		appliesto: "blockContainersFlexContainersGridContainers",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overflow-y"
	},
		"overscroll-behavior": {
		syntax: "[ contain | none | auto ]{1,2}",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Box Model"
		],
		initial: "auto",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior"
	},
		"overscroll-behavior-x": {
		syntax: "contain | none | auto",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Box Model"
		],
		initial: "auto",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-x"
	},
		"overscroll-behavior-y": {
		syntax: "contain | none | auto",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Box Model"
		],
		initial: "auto",
		appliesto: "nonReplacedBlockAndInlineBlockElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-y"
	},
		padding: padding,
		"padding-block": {
		syntax: "<'padding-left'>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "logicalWidthOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asLength",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-block"
	},
		"padding-block-end": {
		syntax: "<'padding-left'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "logicalWidthOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asLength",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-block-end"
	},
		"padding-block-start": {
		syntax: "<'padding-left'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "logicalWidthOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asLength",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-block-start"
	},
		"padding-bottom": {
		syntax: "<length> | <percentage>",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Box Model"
		],
		initial: "0",
		appliesto: "allElementsExceptInternalTableDisplayTypes",
		computed: "percentageAsSpecifiedOrAbsoluteLength",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-bottom"
	},
		"padding-inline": {
		syntax: "<'padding-left'>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "logicalWidthOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asLength",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-inline"
	},
		"padding-inline-end": {
		syntax: "<'padding-left'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "logicalWidthOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asLength",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-inline-end"
	},
		"padding-inline-start": {
		syntax: "<'padding-left'>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "logicalWidthOfContainingBlock",
		groups: [
			"CSS Logical Properties"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asLength",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-inline-start"
	},
		"padding-left": {
		syntax: "<length> | <percentage>",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Box Model"
		],
		initial: "0",
		appliesto: "allElementsExceptInternalTableDisplayTypes",
		computed: "percentageAsSpecifiedOrAbsoluteLength",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-left"
	},
		"padding-right": {
		syntax: "<length> | <percentage>",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Box Model"
		],
		initial: "0",
		appliesto: "allElementsExceptInternalTableDisplayTypes",
		computed: "percentageAsSpecifiedOrAbsoluteLength",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-right"
	},
		"padding-top": {
		syntax: "<length> | <percentage>",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Box Model"
		],
		initial: "0",
		appliesto: "allElementsExceptInternalTableDisplayTypes",
		computed: "percentageAsSpecifiedOrAbsoluteLength",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/padding-top"
	},
		"page-break-after": {
		syntax: "auto | always | avoid | left | right | recto | verso",
		media: [
			"visual",
			"paged"
		],
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Pages"
		],
		initial: "auto",
		appliesto: "blockElementsInNormalFlow",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/page-break-after"
	},
		"page-break-before": {
		syntax: "auto | always | avoid | left | right | recto | verso",
		media: [
			"visual",
			"paged"
		],
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Pages"
		],
		initial: "auto",
		appliesto: "blockElementsInNormalFlow",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/page-break-before"
	},
		"page-break-inside": {
		syntax: "auto | avoid",
		media: [
			"visual",
			"paged"
		],
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Pages"
		],
		initial: "auto",
		appliesto: "blockElementsInNormalFlow",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/page-break-inside"
	},
		"paint-order": {
		syntax: "normal | [ fill || stroke || markers ]",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text"
		],
		initial: "normal",
		appliesto: "textElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/paint-order"
	},
		perspective: perspective,
		"perspective-origin": {
		syntax: "<position>",
		media: "visual",
		inherited: false,
		animationType: "simpleListOfLpc",
		percentages: "referToSizeOfBoundingBox",
		groups: [
			"CSS Transforms"
		],
		initial: "50% 50%",
		appliesto: "transformableElements",
		computed: "forLengthAbsoluteValueOtherwisePercentage",
		order: "oneOrTwoValuesLengthAbsoluteKeywordsPercentages",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/perspective-origin"
	},
		"place-content": {
		syntax: "<'align-content'> <'justify-content'>?",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Box Alignment"
		],
		initial: "normal",
		appliesto: "multilineFlexContainers",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/place-content"
	},
		"place-items": {
		syntax: "<'align-items'> <'justify-items'>?",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Box Alignment"
		],
		initial: [
			"align-items",
			"justify-items"
		],
		appliesto: "allElements",
		computed: [
			"align-items",
			"justify-items"
		],
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/place-items"
	},
		"place-self": {
		syntax: "<'align-self'> <'justify-self'>?",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Box Alignment"
		],
		initial: [
			"align-self",
			"justify-self"
		],
		appliesto: "blockLevelBoxesAndAbsolutelyPositionedBoxesAndGridItems",
		computed: [
			"align-self",
			"justify-self"
		],
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/place-self"
	},
		"pointer-events": {
		syntax: "auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Pointer Events"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/pointer-events"
	},
		position: position,
		quotes: quotes,
		resize: resize,
		right: right,
		rotate: rotate,
		"row-gap": {
		syntax: "normal | <length-percentage>",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToDimensionOfContentArea",
		groups: [
			"CSS Box Alignment"
		],
		initial: "normal",
		appliesto: "multiColumnElementsFlexContainersGridContainers",
		computed: "asSpecifiedWithLengthsAbsoluteAndNormalComputingToZeroExceptMultiColumn",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/row-gap"
	},
		"ruby-align": {
		syntax: "start | center | space-between | space-around",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Ruby"
		],
		initial: "space-around",
		appliesto: "rubyBasesAnnotationsBaseAnnotationContainers",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/ruby-align"
	},
		"ruby-merge": {
		syntax: "separate | collapse | auto",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Ruby"
		],
		initial: "separate",
		appliesto: "rubyAnnotationsContainers",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "experimental"
	},
		"ruby-position": {
		syntax: "over | under | inter-character",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Ruby"
		],
		initial: "over",
		appliesto: "rubyAnnotationsContainers",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/ruby-position"
	},
		scale: scale,
		"scrollbar-color": {
		syntax: "auto | dark | light | <color>{2}",
		media: "visual",
		inherited: true,
		animationType: "color",
		percentages: "no",
		groups: [
			"CSS Scrollbars"
		],
		initial: "auto",
		appliesto: "scrollingBoxes",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scrollbar-color"
	},
		"scrollbar-width": {
		syntax: "auto | thin | none",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Scrollbars"
		],
		initial: "auto",
		appliesto: "scrollingBoxes",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scrollbar-width"
	},
		"scroll-behavior": {
		syntax: "auto | smooth",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSSOM View"
		],
		initial: "auto",
		appliesto: "scrollingBoxes",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-behavior"
	},
		"scroll-margin": {
		syntax: "<length>{1,4}",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "no",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin"
	},
		"scroll-margin-block": {
		syntax: "<length>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "no",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block"
	},
		"scroll-margin-block-start": {
		syntax: "<length>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "no",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block-start"
	},
		"scroll-margin-block-end": {
		syntax: "<length>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "no",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block-end"
	},
		"scroll-margin-bottom": {
		syntax: "<length>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "no",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-bottom"
	},
		"scroll-margin-inline": {
		syntax: "<length>{1,2}",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "no",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline"
	},
		"scroll-margin-inline-start": {
		syntax: "<length>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "no",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline-start"
	},
		"scroll-margin-inline-end": {
		syntax: "<length>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "no",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline-end"
	},
		"scroll-margin-left": {
		syntax: "<length>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "no",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-left"
	},
		"scroll-margin-right": {
		syntax: "<length>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "no",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-right"
	},
		"scroll-margin-top": {
		syntax: "<length>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "no",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "0",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-margin-top"
	},
		"scroll-padding": {
		syntax: "[ auto | <length-percentage> ]{1,4}",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "relativeToTheScrollContainersScrollport",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "auto",
		appliesto: "scrollContainers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding"
	},
		"scroll-padding-block": {
		syntax: "[ auto | <length-percentage> ]{1,2}",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "relativeToTheScrollContainersScrollport",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "auto",
		appliesto: "scrollContainers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block"
	},
		"scroll-padding-block-start": {
		syntax: "auto | <length-percentage>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "relativeToTheScrollContainersScrollport",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "auto",
		appliesto: "scrollContainers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block-start"
	},
		"scroll-padding-block-end": {
		syntax: "auto | <length-percentage>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "relativeToTheScrollContainersScrollport",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "auto",
		appliesto: "scrollContainers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block-end"
	},
		"scroll-padding-bottom": {
		syntax: "auto | <length-percentage>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "relativeToTheScrollContainersScrollport",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "auto",
		appliesto: "scrollContainers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-bottom"
	},
		"scroll-padding-inline": {
		syntax: "[ auto | <length-percentage> ]{1,2}",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "relativeToTheScrollContainersScrollport",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "auto",
		appliesto: "scrollContainers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline"
	},
		"scroll-padding-inline-start": {
		syntax: "auto | <length-percentage>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "relativeToTheScrollContainersScrollport",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "auto",
		appliesto: "scrollContainers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline-start"
	},
		"scroll-padding-inline-end": {
		syntax: "auto | <length-percentage>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "relativeToTheScrollContainersScrollport",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "auto",
		appliesto: "scrollContainers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline-end"
	},
		"scroll-padding-left": {
		syntax: "auto | <length-percentage>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "relativeToTheScrollContainersScrollport",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "auto",
		appliesto: "scrollContainers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-left"
	},
		"scroll-padding-right": {
		syntax: "auto | <length-percentage>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "relativeToTheScrollContainersScrollport",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "auto",
		appliesto: "scrollContainers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-right"
	},
		"scroll-padding-top": {
		syntax: "auto | <length-percentage>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "relativeToTheScrollContainersScrollport",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "auto",
		appliesto: "scrollContainers",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-padding-top"
	},
		"scroll-snap-align": {
		syntax: "[ none | start | end | center ]{1,2}",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-align"
	},
		"scroll-snap-coordinate": {
		syntax: "none | <position>#",
		media: "interactive",
		inherited: false,
		animationType: "position",
		percentages: "referToBorderBox",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "uniqueOrder",
		status: "obsolete",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-coordinate"
	},
		"scroll-snap-destination": {
		syntax: "<position>",
		media: "interactive",
		inherited: false,
		animationType: "position",
		percentages: "relativeToScrollContainerPaddingBoxAxis",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "0px 0px",
		appliesto: "scrollContainers",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "uniqueOrder",
		status: "obsolete",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-destination"
	},
		"scroll-snap-points-x": {
		syntax: "none | repeat( <length-percentage> )",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "relativeToScrollContainerPaddingBoxAxis",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "none",
		appliesto: "scrollContainers",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "uniqueOrder",
		status: "obsolete",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-points-x"
	},
		"scroll-snap-points-y": {
		syntax: "none | repeat( <length-percentage> )",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "relativeToScrollContainerPaddingBoxAxis",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "none",
		appliesto: "scrollContainers",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "uniqueOrder",
		status: "obsolete",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-points-y"
	},
		"scroll-snap-stop": {
		syntax: "normal | always",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "perGrammar",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-stop"
	},
		"scroll-snap-type": {
		syntax: "none | [ x | y | block | inline | both ] [ mandatory | proximity ]?",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type"
	},
		"scroll-snap-type-x": {
		syntax: "none | mandatory | proximity",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "none",
		appliesto: "scrollContainers",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "obsolete",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type-x"
	},
		"scroll-snap-type-y": {
		syntax: "none | mandatory | proximity",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Scroll Snap"
		],
		initial: "none",
		appliesto: "scrollContainers",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "obsolete",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type-y"
	},
		"shape-image-threshold": {
		syntax: "<alpha-value>",
		media: "visual",
		inherited: false,
		animationType: "number",
		percentages: "no",
		groups: [
			"CSS Shapes"
		],
		initial: "0.0",
		appliesto: "floats",
		computed: "specifiedValueNumberClipped0To1",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/shape-image-threshold"
	},
		"shape-margin": {
		syntax: "<length-percentage>",
		media: "visual",
		inherited: false,
		animationType: "lpc",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Shapes"
		],
		initial: "0",
		appliesto: "floats",
		computed: "asSpecifiedRelativeToAbsoluteLengths",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/shape-margin"
	},
		"shape-outside": {
		syntax: "none | <shape-box> || <basic-shape> | <image>",
		media: "visual",
		inherited: false,
		animationType: "basicShapeOtherwiseNo",
		percentages: "no",
		groups: [
			"CSS Shapes"
		],
		initial: "none",
		appliesto: "floats",
		computed: "asDefinedForBasicShapeWithAbsoluteURIOtherwiseAsSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/shape-outside"
	},
		"tab-size": {
		syntax: "<integer> | <length>",
		media: "visual",
		inherited: true,
		animationType: "length",
		percentages: "no",
		groups: [
			"CSS Text"
		],
		initial: "8",
		appliesto: "blockContainers",
		computed: "specifiedIntegerOrAbsoluteLength",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/tab-size"
	},
		"table-layout": {
		syntax: "auto | fixed",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Table"
		],
		initial: "auto",
		appliesto: "tableElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/table-layout"
	},
		"text-align": {
		syntax: "start | end | left | right | center | justify | match-parent",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text"
		],
		initial: "startOrNamelessValueIfLTRRightIfRTL",
		appliesto: "blockContainers",
		computed: "asSpecifiedExceptMatchParent",
		order: "orderOfAppearance",
		alsoAppliesTo: [
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-align"
	},
		"text-align-last": {
		syntax: "auto | start | end | left | right | center | justify",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text"
		],
		initial: "auto",
		appliesto: "blockContainers",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-align-last"
	},
		"text-combine-upright": {
		syntax: "none | all | [ digits <integer>? ]",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Writing Modes"
		],
		initial: "none",
		appliesto: "nonReplacedInlineElements",
		computed: "keywordPlusIntegerIfDigits",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-combine-upright"
	},
		"text-decoration": {
		syntax: "<'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'> || <'text-decoration-thickness'>",
		media: "visual",
		inherited: false,
		animationType: [
			"text-decoration-color",
			"text-decoration-style",
			"text-decoration-line",
			"text-decoration-thickness"
		],
		percentages: "no",
		groups: [
			"CSS Text Decoration"
		],
		initial: [
			"text-decoration-color",
			"text-decoration-style",
			"text-decoration-line"
		],
		appliesto: "allElements",
		computed: [
			"text-decoration-line",
			"text-decoration-style",
			"text-decoration-color",
			"text-decoration-thickness"
		],
		order: "orderOfAppearance",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration"
	},
		"text-decoration-color": {
		syntax: "<color>",
		media: "visual",
		inherited: false,
		animationType: "color",
		percentages: "no",
		groups: [
			"CSS Text Decoration"
		],
		initial: "currentcolor",
		appliesto: "allElements",
		computed: "computedColor",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-color"
	},
		"text-decoration-line": {
		syntax: "none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text Decoration"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "orderOfAppearance",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-line"
	},
		"text-decoration-skip": {
		syntax: "none | [ objects || [ spaces | [ leading-spaces || trailing-spaces ] ] || edges || box-decoration ]",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text Decoration"
		],
		initial: "objects",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "orderOfAppearance",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-skip"
	},
		"text-decoration-skip-ink": {
		syntax: "auto | none",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text Decoration"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "orderOfAppearance",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-skip-ink"
	},
		"text-decoration-style": {
		syntax: "solid | double | dotted | dashed | wavy",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text Decoration"
		],
		initial: "solid",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-style"
	},
		"text-decoration-thickness": {
		syntax: "auto | from-font | <length>",
		media: "visual",
		inherited: false,
		animationType: "byComputedValueType",
		percentages: "no",
		groups: [
			"CSS Text Decoration"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-decoration-thickness"
	},
		"text-emphasis": {
		syntax: "<'text-emphasis-style'> || <'text-emphasis-color'>",
		media: "visual",
		inherited: false,
		animationType: [
			"text-emphasis-color",
			"text-emphasis-style"
		],
		percentages: "no",
		groups: [
			"CSS Text Decoration"
		],
		initial: [
			"text-emphasis-style",
			"text-emphasis-color"
		],
		appliesto: "allElements",
		computed: [
			"text-emphasis-style",
			"text-emphasis-color"
		],
		order: "orderOfAppearance",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-emphasis"
	},
		"text-emphasis-color": {
		syntax: "<color>",
		media: "visual",
		inherited: false,
		animationType: "color",
		percentages: "no",
		groups: [
			"CSS Text Decoration"
		],
		initial: "currentcolor",
		appliesto: "allElements",
		computed: "computedColor",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-emphasis-color"
	},
		"text-emphasis-position": {
		syntax: "[ over | under ] && [ right | left ]",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text Decoration"
		],
		initial: "over right",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-emphasis-position"
	},
		"text-emphasis-style": {
		syntax: "none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text Decoration"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-emphasis-style"
	},
		"text-indent": {
		syntax: "<length-percentage> && hanging? && each-line?",
		media: "visual",
		inherited: true,
		animationType: "lpc",
		percentages: "referToWidthOfContainingBlock",
		groups: [
			"CSS Text"
		],
		initial: "0",
		appliesto: "blockContainers",
		computed: "percentageOrAbsoluteLengthPlusKeywords",
		order: "lengthOrPercentageBeforeKeywords",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-indent"
	},
		"text-justify": {
		syntax: "auto | inter-character | inter-word | none",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text"
		],
		initial: "auto",
		appliesto: "inlineLevelAndTableCellElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-justify"
	},
		"text-orientation": {
		syntax: "mixed | upright | sideways",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Writing Modes"
		],
		initial: "mixed",
		appliesto: "allElementsExceptTableRowGroupsRowsColumnGroupsAndColumns",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-orientation"
	},
		"text-overflow": {
		syntax: "[ clip | ellipsis | <string> ]{1,2}",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Basic User Interface"
		],
		initial: "clip",
		appliesto: "blockContainerElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-overflow"
	},
		"text-rendering": {
		syntax: "auto | optimizeSpeed | optimizeLegibility | geometricPrecision",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Miscellaneous"
		],
		initial: "auto",
		appliesto: "textElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-rendering"
	},
		"text-shadow": {
		syntax: "none | <shadow-t>#",
		media: "visual",
		inherited: true,
		animationType: "shadowList",
		percentages: "no",
		groups: [
			"CSS Text Decoration"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "colorPlusThreeAbsoluteLengths",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-shadow"
	},
		"text-size-adjust": {
		syntax: "none | auto | <percentage>",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "referToSizeOfFont",
		groups: [
			"CSS Text"
		],
		initial: "autoForSmartphoneBrowsersSupportingInflation",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "experimental",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-size-adjust"
	},
		"text-transform": {
		syntax: "none | capitalize | uppercase | lowercase | full-width | full-size-kana",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text"
		],
		initial: "none",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-transform"
	},
		"text-underline-offset": {
		syntax: "auto | from-font | <length>",
		media: "visual",
		inherited: true,
		animationType: "byComputedValueType",
		percentages: "no",
		groups: [
			"CSS Text Decoration"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-underline-offset"
	},
		"text-underline-position": {
		syntax: "auto | [ under || [ left | right ] ]",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text Decoration"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "orderOfAppearance",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/text-underline-position"
	},
		top: top,
		"touch-action": {
		syntax: "auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"Pointer Events"
		],
		initial: "auto",
		appliesto: "allElementsExceptNonReplacedInlineElementsTableRowsColumnsRowColumnGroups",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/touch-action"
	},
		transform: transform,
		"transform-box": {
		syntax: "border-box | fill-box | view-box",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Transforms"
		],
		initial: "border-box ",
		appliesto: "transformableElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transform-box"
	},
		"transform-origin": {
		syntax: "[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?",
		media: "visual",
		inherited: false,
		animationType: "simpleListOfLpc",
		percentages: "referToSizeOfBoundingBox",
		groups: [
			"CSS Transforms"
		],
		initial: "50% 50% 0",
		appliesto: "transformableElements",
		computed: "forLengthAbsoluteValueOtherwisePercentage",
		order: "oneOrTwoValuesLengthAbsoluteKeywordsPercentages",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transform-origin"
	},
		"transform-style": {
		syntax: "flat | preserve-3d",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Transforms"
		],
		initial: "flat",
		appliesto: "transformableElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		stacking: true,
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transform-style"
	},
		transition: transition,
		"transition-delay": {
		syntax: "<time>#",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Transitions"
		],
		initial: "0s",
		appliesto: "allElementsAndPseudos",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transition-delay"
	},
		"transition-duration": {
		syntax: "<time>#",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Transitions"
		],
		initial: "0s",
		appliesto: "allElementsAndPseudos",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transition-duration"
	},
		"transition-property": {
		syntax: "none | <single-transition-property>#",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Transitions"
		],
		initial: "all",
		appliesto: "allElementsAndPseudos",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transition-property"
	},
		"transition-timing-function": {
		syntax: "<timing-function>#",
		media: "interactive",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Transitions"
		],
		initial: "ease",
		appliesto: "allElementsAndPseudos",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/transition-timing-function"
	},
		translate: translate,
		"unicode-bidi": {
		syntax: "normal | embed | isolate | bidi-override | isolate-override | plaintext",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Writing Modes"
		],
		initial: "normal",
		appliesto: "allElementsSomeValuesNoEffectOnNonInlineElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/unicode-bidi"
	},
		"user-select": {
		syntax: "auto | text | none | contain | all",
		media: "visual",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Basic User Interface"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "nonstandard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/user-select"
	},
		"vertical-align": {
		syntax: "baseline | sub | super | text-top | text-bottom | middle | top | bottom | <percentage> | <length>",
		media: "visual",
		inherited: false,
		animationType: "length",
		percentages: "referToLineHeight",
		groups: [
			"CSS Table"
		],
		initial: "baseline",
		appliesto: "inlineLevelAndTableCellElements",
		computed: "absoluteLengthOrKeyword",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/vertical-align"
	},
		visibility: visibility,
		"white-space": {
		syntax: "normal | pre | nowrap | pre-wrap | pre-line | break-spaces",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/white-space"
	},
		widows: widows,
		width: width,
		"will-change": {
		syntax: "auto | <animateable-feature>#",
		media: "all",
		inherited: false,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Will Change"
		],
		initial: "auto",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/will-change"
	},
		"word-break": {
		syntax: "normal | break-all | keep-all | break-word",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/word-break"
	},
		"word-spacing": {
		syntax: "normal | <length-percentage>",
		media: "visual",
		inherited: true,
		animationType: "length",
		percentages: "referToWidthOfAffectedGlyph",
		groups: [
			"CSS Text"
		],
		initial: "normal",
		appliesto: "allElements",
		computed: "optimumMinAndMaxValueOfAbsoluteLengthPercentageOrNormal",
		order: "uniqueOrder",
		alsoAppliesTo: [
			"::first-letter",
			"::first-line",
			"::placeholder"
		],
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/word-spacing"
	},
		"word-wrap": {
		syntax: "normal | break-word",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Text"
		],
		initial: "normal",
		appliesto: "nonReplacedInlineElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/overflow-wrap"
	},
		"writing-mode": {
		syntax: "horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr",
		media: "visual",
		inherited: true,
		animationType: "discrete",
		percentages: "no",
		groups: [
			"CSS Writing Modes"
		],
		initial: "horizontal-tb",
		appliesto: "allElementsExceptTableRowColumnGroupsTableRowsColumns",
		computed: "asSpecified",
		order: "uniqueOrder",
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/writing-mode"
	},
		"z-index": {
		syntax: "auto | <integer>",
		media: "visual",
		inherited: false,
		animationType: "integer",
		percentages: "no",
		groups: [
			"CSS Positioning"
		],
		initial: "auto",
		appliesto: "positionedElements",
		computed: "asSpecified",
		order: "uniqueOrder",
		stacking: true,
		status: "standard",
		mdn_url: "https://developer.mozilla.org/docs/Web/CSS/z-index"
	},
		zoom: zoom
	};

	var properties$2 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		all: all,
		animation: animation,
		appearance: appearance,
		azimuth: azimuth,
		background: background,
		border: border,
		bottom: bottom,
		clear: clear,
		clip: clip,
		color: color,
		columns: columns,
		contain: contain,
		content: content,
		cursor: cursor,
		direction: direction,
		display: display,
		filter: filter,
		flex: flex,
		float: float,
		font: font,
		gap: gap,
		grid: grid,
		height: height,
		hyphens: hyphens,
		inset: inset,
		isolation: isolation,
		left: left,
		margin: margin,
		mask: mask,
		offset: offset,
		opacity: opacity,
		order: order,
		orphans: orphans,
		outline: outline,
		overflow: overflow,
		padding: padding,
		perspective: perspective,
		position: position,
		quotes: quotes,
		resize: resize,
		right: right,
		rotate: rotate,
		scale: scale,
		top: top,
		transform: transform,
		transition: transition,
		translate: translate,
		visibility: visibility,
		widows: widows,
		width: width,
		zoom: zoom,
		'default': properties$1
	});

	var attachment = {
		syntax: "scroll | fixed | local"
	};
	var box = {
		syntax: "border-box | padding-box | content-box"
	};
	var color$1 = {
		syntax: "<rgb()> | <rgba()> | <hsl()> | <hsla()> | <hex-color> | <named-color> | currentcolor | <deprecated-system-color>"
	};
	var combinator = {
		syntax: "'>' | '+' | '~' | [ '||' ]"
	};
	var compat = {
		syntax: "searchfield | textarea | push-button | button-bevel | slider-horizontal | checkbox | radio | square-button | menulist | menulist-button | listbox | meter | progress-bar"
	};
	var gradient = {
		syntax: "<linear-gradient()> | <repeating-linear-gradient()> | <radial-gradient()> | <repeating-radial-gradient()> | <conic-gradient()>"
	};
	var hue = {
		syntax: "<number> | <angle>"
	};
	var image = {
		syntax: "<url> | <image()> | <image-set()> | <element()> | <paint()> | <cross-fade()> | <gradient>"
	};
	var nth = {
		syntax: "<an-plus-b> | even | odd"
	};
	var position$1 = {
		syntax: "[ [ left | center | right ] || [ top | center | bottom ] | [ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ]? | [ [ left | right ] <length-percentage> ] && [ [ top | bottom ] <length-percentage> ] ]"
	};
	var quote = {
		syntax: "open-quote | close-quote | no-open-quote | no-close-quote"
	};
	var shadow = {
		syntax: "inset? && <length>{2,4} && <color>?"
	};
	var shape$1 = {
		syntax: "rect(<top>, <right>, <bottom>, <left>)"
	};
	var size = {
		syntax: "closest-side | farthest-side | closest-corner | farthest-corner | <length> | <length-percentage>{2}"
	};
	var symbol = {
		syntax: "<string> | <image> | <custom-ident>"
	};
	var target = {
		syntax: "<target-counter()> | <target-counters()> | <target-text()>"
	};
	var syntaxes = {
		"absolute-size": {
		syntax: "xx-small | x-small | small | medium | large | x-large | xx-large | xxx-large"
	},
		"alpha-value": {
		syntax: "<number> | <percentage>"
	},
		"angle-percentage": {
		syntax: "<angle> | <percentage>"
	},
		"angular-color-hint": {
		syntax: "<angle-percentage>"
	},
		"angular-color-stop": {
		syntax: "<color> && <color-stop-angle>?"
	},
		"angular-color-stop-list": {
		syntax: "[ <angular-color-stop> [, <angular-color-hint>]? ]# , <angular-color-stop>"
	},
		"animateable-feature": {
		syntax: "scroll-position | contents | <custom-ident>"
	},
		attachment: attachment,
		"attr()": {
		syntax: "attr( <attr-name> <type-or-unit>? [, <attr-fallback> ]? )"
	},
		"attr-matcher": {
		syntax: "[ '~' | '|' | '^' | '$' | '*' ]? '='"
	},
		"attr-modifier": {
		syntax: "i | s"
	},
		"attribute-selector": {
		syntax: "'[' <wq-name> ']' | '[' <wq-name> <attr-matcher> [ <string-token> | <ident-token> ] <attr-modifier>? ']'"
	},
		"auto-repeat": {
		syntax: "repeat( [ auto-fill | auto-fit ] , [ <line-names>? <fixed-size> ]+ <line-names>? )"
	},
		"auto-track-list": {
		syntax: "[ <line-names>? [ <fixed-size> | <fixed-repeat> ] ]* <line-names>? <auto-repeat>\n[ <line-names>? [ <fixed-size> | <fixed-repeat> ] ]* <line-names>?"
	},
		"baseline-position": {
		syntax: "[ first | last ]? baseline"
	},
		"basic-shape": {
		syntax: "<inset()> | <circle()> | <ellipse()> | <polygon()>"
	},
		"bg-image": {
		syntax: "none | <image>"
	},
		"bg-layer": {
		syntax: "<bg-image> || <bg-position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box>"
	},
		"bg-position": {
		syntax: "[ [ left | center | right | top | bottom | <length-percentage> ] | [ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ] | [ center | [ left | right ] <length-percentage>? ] && [ center | [ top | bottom ] <length-percentage>? ] ]"
	},
		"bg-size": {
		syntax: "[ <length-percentage> | auto ]{1,2} | cover | contain"
	},
		"blur()": {
		syntax: "blur( <length> )"
	},
		"blend-mode": {
		syntax: "normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity"
	},
		box: box,
		"brightness()": {
		syntax: "brightness( <number-percentage> )"
	},
		"calc()": {
		syntax: "calc( <calc-sum> )"
	},
		"calc-sum": {
		syntax: "<calc-product> [ [ '+' | '-' ] <calc-product> ]*"
	},
		"calc-product": {
		syntax: "<calc-value> [ '*' <calc-value> | '/' <number> ]*"
	},
		"calc-value": {
		syntax: "<number> | <dimension> | <percentage> | ( <calc-sum> )"
	},
		"cf-final-image": {
		syntax: "<image> | <color>"
	},
		"cf-mixing-image": {
		syntax: "<percentage>? && <image>"
	},
		"circle()": {
		syntax: "circle( [ <shape-radius> ]? [ at <position> ]? )"
	},
		"clamp()": {
		syntax: "clamp( <calc-sum>#{3} )"
	},
		"class-selector": {
		syntax: "'.' <ident-token>"
	},
		"clip-source": {
		syntax: "<url>"
	},
		color: color$1,
		"color-stop": {
		syntax: "<color-stop-length> | <color-stop-angle>"
	},
		"color-stop-angle": {
		syntax: "<angle-percentage>{1,2}"
	},
		"color-stop-length": {
		syntax: "<length-percentage>{1,2}"
	},
		"color-stop-list": {
		syntax: "[ <linear-color-stop> [, <linear-color-hint>]? ]# , <linear-color-stop>"
	},
		combinator: combinator,
		"common-lig-values": {
		syntax: "[ common-ligatures | no-common-ligatures ]"
	},
		compat: compat,
		"composite-style": {
		syntax: "clear | copy | source-over | source-in | source-out | source-atop | destination-over | destination-in | destination-out | destination-atop | xor"
	},
		"compositing-operator": {
		syntax: "add | subtract | intersect | exclude"
	},
		"compound-selector": {
		syntax: "[ <type-selector>? <subclass-selector>* [ <pseudo-element-selector> <pseudo-class-selector>* ]* ]!"
	},
		"compound-selector-list": {
		syntax: "<compound-selector>#"
	},
		"complex-selector": {
		syntax: "<compound-selector> [ <combinator>? <compound-selector> ]*"
	},
		"complex-selector-list": {
		syntax: "<complex-selector>#"
	},
		"conic-gradient()": {
		syntax: "conic-gradient( [ from <angle> ]? [ at <position> ]?, <angular-color-stop-list> )"
	},
		"contextual-alt-values": {
		syntax: "[ contextual | no-contextual ]"
	},
		"content-distribution": {
		syntax: "space-between | space-around | space-evenly | stretch"
	},
		"content-list": {
		syntax: "[ <string> | contents | <image> | <quote> | <target> | <leader()> ]+"
	},
		"content-position": {
		syntax: "center | start | end | flex-start | flex-end"
	},
		"content-replacement": {
		syntax: "<image>"
	},
		"contrast()": {
		syntax: "contrast( [ <number-percentage> ] )"
	},
		"counter()": {
		syntax: "counter( <custom-ident>, <counter-style>? )"
	},
		"counter-style": {
		syntax: "<counter-style-name> | symbols()"
	},
		"counter-style-name": {
		syntax: "<custom-ident>"
	},
		"counters()": {
		syntax: "counters( <custom-ident>, <string>, <counter-style>? )"
	},
		"cross-fade()": {
		syntax: "cross-fade( <cf-mixing-image> , <cf-final-image>? )"
	},
		"cubic-bezier-timing-function": {
		syntax: "ease | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>)"
	},
		"deprecated-system-color": {
		syntax: "ActiveBorder | ActiveCaption | AppWorkspace | Background | ButtonFace | ButtonHighlight | ButtonShadow | ButtonText | CaptionText | GrayText | Highlight | HighlightText | InactiveBorder | InactiveCaption | InactiveCaptionText | InfoBackground | InfoText | Menu | MenuText | Scrollbar | ThreeDDarkShadow | ThreeDFace | ThreeDHighlight | ThreeDLightShadow | ThreeDShadow | Window | WindowFrame | WindowText"
	},
		"discretionary-lig-values": {
		syntax: "[ discretionary-ligatures | no-discretionary-ligatures ]"
	},
		"display-box": {
		syntax: "contents | none"
	},
		"display-inside": {
		syntax: "flow | flow-root | table | flex | grid | ruby"
	},
		"display-internal": {
		syntax: "table-row-group | table-header-group | table-footer-group | table-row | table-cell | table-column-group | table-column | table-caption | ruby-base | ruby-text | ruby-base-container | ruby-text-container"
	},
		"display-legacy": {
		syntax: "inline-block | inline-list-item | inline-table | inline-flex | inline-grid"
	},
		"display-listitem": {
		syntax: "<display-outside>? && [ flow | flow-root ]? && list-item"
	},
		"display-outside": {
		syntax: "block | inline | run-in"
	},
		"drop-shadow()": {
		syntax: "drop-shadow( <length>{2,3} <color>? )"
	},
		"east-asian-variant-values": {
		syntax: "[ jis78 | jis83 | jis90 | jis04 | simplified | traditional ]"
	},
		"east-asian-width-values": {
		syntax: "[ full-width | proportional-width ]"
	},
		"element()": {
		syntax: "element( <id-selector> )"
	},
		"ellipse()": {
		syntax: "ellipse( [ <shape-radius>{2} ]? [ at <position> ]? )"
	},
		"ending-shape": {
		syntax: "circle | ellipse"
	},
		"env()": {
		syntax: "env( <custom-ident> , <declaration-value>? )"
	},
		"explicit-track-list": {
		syntax: "[ <line-names>? <track-size> ]+ <line-names>?"
	},
		"family-name": {
		syntax: "<string> | <custom-ident>+"
	},
		"feature-tag-value": {
		syntax: "<string> [ <integer> | on | off ]?"
	},
		"feature-type": {
		syntax: "@stylistic | @historical-forms | @styleset | @character-variant | @swash | @ornaments | @annotation"
	},
		"feature-value-block": {
		syntax: "<feature-type> '{' <feature-value-declaration-list> '}'"
	},
		"feature-value-block-list": {
		syntax: "<feature-value-block>+"
	},
		"feature-value-declaration": {
		syntax: "<custom-ident>: <integer>+;"
	},
		"feature-value-declaration-list": {
		syntax: "<feature-value-declaration>"
	},
		"feature-value-name": {
		syntax: "<custom-ident>"
	},
		"fill-rule": {
		syntax: "nonzero | evenodd"
	},
		"filter-function": {
		syntax: "<blur()> | <brightness()> | <contrast()> | <drop-shadow()> | <grayscale()> | <hue-rotate()> | <invert()> | <opacity()> | <saturate()> | <sepia()>"
	},
		"filter-function-list": {
		syntax: "[ <filter-function> | <url> ]+"
	},
		"final-bg-layer": {
		syntax: "<'background-color'> || <bg-image> || <bg-position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box>"
	},
		"fit-content()": {
		syntax: "fit-content( [ <length> | <percentage> ] )"
	},
		"fixed-breadth": {
		syntax: "<length-percentage>"
	},
		"fixed-repeat": {
		syntax: "repeat( [ <positive-integer> ] , [ <line-names>? <fixed-size> ]+ <line-names>? )"
	},
		"fixed-size": {
		syntax: "<fixed-breadth> | minmax( <fixed-breadth> , <track-breadth> ) | minmax( <inflexible-breadth> , <fixed-breadth> )"
	},
		"font-stretch-absolute": {
		syntax: "normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | <percentage>"
	},
		"font-variant-css21": {
		syntax: "[ normal | small-caps ]"
	},
		"font-weight-absolute": {
		syntax: "normal | bold | <number>"
	},
		"frequency-percentage": {
		syntax: "<frequency> | <percentage>"
	},
		"general-enclosed": {
		syntax: "[ <function-token> <any-value> ) ] | ( <ident> <any-value> )"
	},
		"generic-family": {
		syntax: "serif | sans-serif | cursive | fantasy | monospace"
	},
		"generic-name": {
		syntax: "serif | sans-serif | cursive | fantasy | monospace"
	},
		"geometry-box": {
		syntax: "<shape-box> | fill-box | stroke-box | view-box"
	},
		gradient: gradient,
		"grayscale()": {
		syntax: "grayscale( <number-percentage> )"
	},
		"grid-line": {
		syntax: "auto | <custom-ident> | [ <integer> && <custom-ident>? ] | [ span && [ <integer> || <custom-ident> ] ]"
	},
		"historical-lig-values": {
		syntax: "[ historical-ligatures | no-historical-ligatures ]"
	},
		"hsl()": {
		syntax: "hsl( <hue> <percentage> <percentage> [ / <alpha-value> ]? ) | hsl( <hue>, <percentage>, <percentage>, <alpha-value>? )"
	},
		"hsla()": {
		syntax: "hsla( <hue> <percentage> <percentage> [ / <alpha-value> ]? ) | hsla( <hue>, <percentage>, <percentage>, <alpha-value>? )"
	},
		hue: hue,
		"hue-rotate()": {
		syntax: "hue-rotate( <angle> )"
	},
		"id-selector": {
		syntax: "<hash-token>"
	},
		image: image,
		"image()": {
		syntax: "image( <image-tags>? [ <image-src>? , <color>? ]! )"
	},
		"image-set()": {
		syntax: "image-set( <image-set-option># )"
	},
		"image-set-option": {
		syntax: "[ <image> | <string> ] <resolution>"
	},
		"image-src": {
		syntax: "<url> | <string>"
	},
		"image-tags": {
		syntax: "ltr | rtl"
	},
		"inflexible-breadth": {
		syntax: "<length> | <percentage> | min-content | max-content | auto"
	},
		"inset()": {
		syntax: "inset( <length-percentage>{1,4} [ round <'border-radius'> ]? )"
	},
		"invert()": {
		syntax: "invert( <number-percentage> )"
	},
		"keyframes-name": {
		syntax: "<custom-ident> | <string>"
	},
		"keyframe-block": {
		syntax: "<keyframe-selector># {\n  <declaration-list>\n}"
	},
		"keyframe-block-list": {
		syntax: "<keyframe-block>+"
	},
		"keyframe-selector": {
		syntax: "from | to | <percentage>"
	},
		"leader()": {
		syntax: "leader( <leader-type> )"
	},
		"leader-type": {
		syntax: "dotted | solid | space | <string>"
	},
		"length-percentage": {
		syntax: "<length> | <percentage>"
	},
		"line-names": {
		syntax: "'[' <custom-ident>* ']'"
	},
		"line-name-list": {
		syntax: "[ <line-names> | <name-repeat> ]+"
	},
		"line-style": {
		syntax: "none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset"
	},
		"line-width": {
		syntax: "<length> | thin | medium | thick"
	},
		"linear-color-hint": {
		syntax: "<length-percentage>"
	},
		"linear-color-stop": {
		syntax: "<color> <color-stop-length>?"
	},
		"linear-gradient()": {
		syntax: "linear-gradient( [ <angle> | to <side-or-corner> ]? , <color-stop-list> )"
	},
		"mask-layer": {
		syntax: "<mask-reference> || <position> [ / <bg-size> ]? || <repeat-style> || <geometry-box> || [ <geometry-box> | no-clip ] || <compositing-operator> || <masking-mode>"
	},
		"mask-position": {
		syntax: "[ <length-percentage> | left | center | right ] [ <length-percentage> | top | center | bottom ]?"
	},
		"mask-reference": {
		syntax: "none | <image> | <mask-source>"
	},
		"mask-source": {
		syntax: "<url>"
	},
		"masking-mode": {
		syntax: "alpha | luminance | match-source"
	},
		"matrix()": {
		syntax: "matrix( <number>#{6} )"
	},
		"matrix3d()": {
		syntax: "matrix3d( <number>#{16} )"
	},
		"max()": {
		syntax: "max( <calc-sum># )"
	},
		"media-and": {
		syntax: "<media-in-parens> [ and <media-in-parens> ]+"
	},
		"media-condition": {
		syntax: "<media-not> | <media-and> | <media-or> | <media-in-parens>"
	},
		"media-condition-without-or": {
		syntax: "<media-not> | <media-and> | <media-in-parens>"
	},
		"media-feature": {
		syntax: "( [ <mf-plain> | <mf-boolean> | <mf-range> ] )"
	},
		"media-in-parens": {
		syntax: "( <media-condition> ) | <media-feature> | <general-enclosed>"
	},
		"media-not": {
		syntax: "not <media-in-parens>"
	},
		"media-or": {
		syntax: "<media-in-parens> [ or <media-in-parens> ]+"
	},
		"media-query": {
		syntax: "<media-condition> | [ not | only ]? <media-type> [ and <media-condition-without-or> ]?"
	},
		"media-query-list": {
		syntax: "<media-query>#"
	},
		"media-type": {
		syntax: "<ident>"
	},
		"mf-boolean": {
		syntax: "<mf-name>"
	},
		"mf-name": {
		syntax: "<ident>"
	},
		"mf-plain": {
		syntax: "<mf-name> : <mf-value>"
	},
		"mf-range": {
		syntax: "<mf-name> [ '<' | '>' ]? '='? <mf-value>\n| <mf-value> [ '<' | '>' ]? '='? <mf-name>\n| <mf-value> '<' '='? <mf-name> '<' '='? <mf-value>\n| <mf-value> '>' '='? <mf-name> '>' '='? <mf-value>"
	},
		"mf-value": {
		syntax: "<number> | <dimension> | <ident> | <ratio>"
	},
		"min()": {
		syntax: "min( <calc-sum># )"
	},
		"minmax()": {
		syntax: "minmax( [ <length> | <percentage> | <flex> | min-content | max-content | auto ] , [ <length> | <percentage> | <flex> | min-content | max-content | auto ] )"
	},
		"named-color": {
		syntax: "transparent | aliceblue | antiquewhite | aqua | aquamarine | azure | beige | bisque | black | blanchedalmond | blue | blueviolet | brown | burlywood | cadetblue | chartreuse | chocolate | coral | cornflowerblue | cornsilk | crimson | cyan | darkblue | darkcyan | darkgoldenrod | darkgray | darkgreen | darkgrey | darkkhaki | darkmagenta | darkolivegreen | darkorange | darkorchid | darkred | darksalmon | darkseagreen | darkslateblue | darkslategray | darkslategrey | darkturquoise | darkviolet | deeppink | deepskyblue | dimgray | dimgrey | dodgerblue | firebrick | floralwhite | forestgreen | fuchsia | gainsboro | ghostwhite | gold | goldenrod | gray | green | greenyellow | grey | honeydew | hotpink | indianred | indigo | ivory | khaki | lavender | lavenderblush | lawngreen | lemonchiffon | lightblue | lightcoral | lightcyan | lightgoldenrodyellow | lightgray | lightgreen | lightgrey | lightpink | lightsalmon | lightseagreen | lightskyblue | lightslategray | lightslategrey | lightsteelblue | lightyellow | lime | limegreen | linen | magenta | maroon | mediumaquamarine | mediumblue | mediumorchid | mediumpurple | mediumseagreen | mediumslateblue | mediumspringgreen | mediumturquoise | mediumvioletred | midnightblue | mintcream | mistyrose | moccasin | navajowhite | navy | oldlace | olive | olivedrab | orange | orangered | orchid | palegoldenrod | palegreen | paleturquoise | palevioletred | papayawhip | peachpuff | peru | pink | plum | powderblue | purple | rebeccapurple | red | rosybrown | royalblue | saddlebrown | salmon | sandybrown | seagreen | seashell | sienna | silver | skyblue | slateblue | slategray | slategrey | snow | springgreen | steelblue | tan | teal | thistle | tomato | turquoise | violet | wheat | white | whitesmoke | yellow | yellowgreen"
	},
		"namespace-prefix": {
		syntax: "<ident>"
	},
		"ns-prefix": {
		syntax: "[ <ident-token> | '*' ]? '|'"
	},
		"number-percentage": {
		syntax: "<number> | <percentage>"
	},
		"numeric-figure-values": {
		syntax: "[ lining-nums | oldstyle-nums ]"
	},
		"numeric-fraction-values": {
		syntax: "[ diagonal-fractions | stacked-fractions ]"
	},
		"numeric-spacing-values": {
		syntax: "[ proportional-nums | tabular-nums ]"
	},
		nth: nth,
		"opacity()": {
		syntax: "opacity( [ <number-percentage> ] )"
	},
		"overflow-position": {
		syntax: "unsafe | safe"
	},
		"outline-radius": {
		syntax: "<length> | <percentage>"
	},
		"page-body": {
		syntax: "<declaration>? [ ; <page-body> ]? | <page-margin-box> <page-body>"
	},
		"page-margin-box": {
		syntax: "<page-margin-box-type> '{' <declaration-list> '}'"
	},
		"page-margin-box-type": {
		syntax: "@top-left-corner | @top-left | @top-center | @top-right | @top-right-corner | @bottom-left-corner | @bottom-left | @bottom-center | @bottom-right | @bottom-right-corner | @left-top | @left-middle | @left-bottom | @right-top | @right-middle | @right-bottom"
	},
		"page-selector-list": {
		syntax: "[ <page-selector># ]?"
	},
		"page-selector": {
		syntax: "<pseudo-page>+ | <ident> <pseudo-page>*"
	},
		"paint()": {
		syntax: "paint( <ident>, <declaration-value>? )"
	},
		"perspective()": {
		syntax: "perspective( <length> )"
	},
		"polygon()": {
		syntax: "polygon( <fill-rule>? , [ <length-percentage> <length-percentage> ]# )"
	},
		position: position$1,
		"pseudo-class-selector": {
		syntax: "':' <ident-token> | ':' <function-token> <any-value> ')'"
	},
		"pseudo-element-selector": {
		syntax: "':' <pseudo-class-selector>"
	},
		"pseudo-page": {
		syntax: ": [ left | right | first | blank ]"
	},
		quote: quote,
		"radial-gradient()": {
		syntax: "radial-gradient( [ <ending-shape> || <size> ]? [ at <position> ]? , <color-stop-list> )"
	},
		"relative-selector": {
		syntax: "<combinator>? <complex-selector>"
	},
		"relative-selector-list": {
		syntax: "<relative-selector>#"
	},
		"relative-size": {
		syntax: "larger | smaller"
	},
		"repeat-style": {
		syntax: "repeat-x | repeat-y | [ repeat | space | round | no-repeat ]{1,2}"
	},
		"repeating-linear-gradient()": {
		syntax: "repeating-linear-gradient( [ <angle> | to <side-or-corner> ]? , <color-stop-list> )"
	},
		"repeating-radial-gradient()": {
		syntax: "repeating-radial-gradient( [ <ending-shape> || <size> ]? [ at <position> ]? , <color-stop-list> )"
	},
		"rgb()": {
		syntax: "rgb( <percentage>{3} [ / <alpha-value> ]? ) | rgb( <number>{3} [ / <alpha-value> ]? ) | rgb( <percentage>#{3} , <alpha-value>? ) | rgb( <number>#{3} , <alpha-value>? )"
	},
		"rgba()": {
		syntax: "rgba( <percentage>{3} [ / <alpha-value> ]? ) | rgba( <number>{3} [ / <alpha-value> ]? ) | rgba( <percentage>#{3} , <alpha-value>? ) | rgba( <number>#{3} , <alpha-value>? )"
	},
		"rotate()": {
		syntax: "rotate( [ <angle> | <zero> ] )"
	},
		"rotate3d()": {
		syntax: "rotate3d( <number> , <number> , <number> , [ <angle> | <zero> ] )"
	},
		"rotateX()": {
		syntax: "rotateX( [ <angle> | <zero> ] )"
	},
		"rotateY()": {
		syntax: "rotateY( [ <angle> | <zero> ] )"
	},
		"rotateZ()": {
		syntax: "rotateZ( [ <angle> | <zero> ] )"
	},
		"saturate()": {
		syntax: "saturate( <number-percentage> )"
	},
		"scale()": {
		syntax: "scale( <number> , <number>? )"
	},
		"scale3d()": {
		syntax: "scale3d( <number> , <number> , <number> )"
	},
		"scaleX()": {
		syntax: "scaleX( <number> )"
	},
		"scaleY()": {
		syntax: "scaleY( <number> )"
	},
		"scaleZ()": {
		syntax: "scaleZ( <number> )"
	},
		"self-position": {
		syntax: "center | start | end | self-start | self-end | flex-start | flex-end"
	},
		"shape-radius": {
		syntax: "<length-percentage> | closest-side | farthest-side"
	},
		"skew()": {
		syntax: "skew( [ <angle> | <zero> ] , [ <angle> | <zero> ]? )"
	},
		"skewX()": {
		syntax: "skewX( [ <angle> | <zero> ] )"
	},
		"skewY()": {
		syntax: "skewY( [ <angle> | <zero> ] )"
	},
		"sepia()": {
		syntax: "sepia( <number-percentage> )"
	},
		shadow: shadow,
		"shadow-t": {
		syntax: "[ <length>{2,3} && <color>? ]"
	},
		shape: shape$1,
		"shape-box": {
		syntax: "<box> | margin-box"
	},
		"side-or-corner": {
		syntax: "[ left | right ] || [ top | bottom ]"
	},
		"single-animation": {
		syntax: "<time> || <timing-function> || <time> || <single-animation-iteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state> || [ none | <keyframes-name> ]"
	},
		"single-animation-direction": {
		syntax: "normal | reverse | alternate | alternate-reverse"
	},
		"single-animation-fill-mode": {
		syntax: "none | forwards | backwards | both"
	},
		"single-animation-iteration-count": {
		syntax: "infinite | <number>"
	},
		"single-animation-play-state": {
		syntax: "running | paused"
	},
		"single-transition": {
		syntax: "[ none | <single-transition-property> ] || <time> || <timing-function> || <time>"
	},
		"single-transition-property": {
		syntax: "all | <custom-ident>"
	},
		size: size,
		"step-position": {
		syntax: "jump-start | jump-end | jump-none | jump-both | start | end"
	},
		"step-timing-function": {
		syntax: "step-start | step-end | steps(<integer>[, <step-position>]?)"
	},
		"subclass-selector": {
		syntax: "<id-selector> | <class-selector> | <attribute-selector> | <pseudo-class-selector>"
	},
		"supports-condition": {
		syntax: "not <supports-in-parens> | <supports-in-parens> [ and <supports-in-parens> ]* | <supports-in-parens> [ or <supports-in-parens> ]*"
	},
		"supports-in-parens": {
		syntax: "( <supports-condition> ) | <supports-feature> | <general-enclosed>"
	},
		"supports-feature": {
		syntax: "<supports-decl> | <supports-selector-fn>"
	},
		"supports-decl": {
		syntax: "( <declaration> )"
	},
		"supports-selector-fn": {
		syntax: "selector( <complex-selector> )"
	},
		symbol: symbol,
		target: target,
		"target-counter()": {
		syntax: "target-counter( [ <string> | <url> ] , <custom-ident> , <counter-style>? )"
	},
		"target-counters()": {
		syntax: "target-counters( [ <string> | <url> ] , <custom-ident> , <string> , <counter-style>? )"
	},
		"target-text()": {
		syntax: "target-text( [ <string> | <url> ] , [ content | before | after | first-letter ]? )"
	},
		"time-percentage": {
		syntax: "<time> | <percentage>"
	},
		"timing-function": {
		syntax: "linear | <cubic-bezier-timing-function> | <step-timing-function>"
	},
		"track-breadth": {
		syntax: "<length-percentage> | <flex> | min-content | max-content | auto"
	},
		"track-list": {
		syntax: "[ <line-names>? [ <track-size> | <track-repeat> ] ]+ <line-names>?"
	},
		"track-repeat": {
		syntax: "repeat( [ <positive-integer> ] , [ <line-names>? <track-size> ]+ <line-names>? )"
	},
		"track-size": {
		syntax: "<track-breadth> | minmax( <inflexible-breadth> , <track-breadth> ) | fit-content( [ <length> | <percentage> ] )"
	},
		"transform-function": {
		syntax: "<matrix()> | <translate()> | <translateX()> | <translateY()> | <scale()> | <scaleX()> | <scaleY()> | <rotate()> | <skew()> | <skewX()> | <skewY()> | <matrix3d()> | <translate3d()> | <translateZ()> | <scale3d()> | <scaleZ()> | <rotate3d()> | <rotateX()> | <rotateY()> | <rotateZ()> | <perspective()>"
	},
		"transform-list": {
		syntax: "<transform-function>+"
	},
		"translate()": {
		syntax: "translate( <length-percentage> , <length-percentage>? )"
	},
		"translate3d()": {
		syntax: "translate3d( <length-percentage> , <length-percentage> , <length> )"
	},
		"translateX()": {
		syntax: "translateX( <length-percentage> )"
	},
		"translateY()": {
		syntax: "translateY( <length-percentage> )"
	},
		"translateZ()": {
		syntax: "translateZ( <length> )"
	},
		"type-or-unit": {
		syntax: "string | color | url | integer | number | length | angle | time | frequency | cap | ch | em | ex | ic | lh | rlh | rem | vb | vi | vw | vh | vmin | vmax | mm | Q | cm | in | pt | pc | px | deg | grad | rad | turn | ms | s | Hz | kHz | %"
	},
		"type-selector": {
		syntax: "<wq-name> | <ns-prefix>? '*'"
	},
		"var()": {
		syntax: "var( <custom-property-name> , <declaration-value>? )"
	},
		"viewport-length": {
		syntax: "auto | <length-percentage>"
	},
		"wq-name": {
		syntax: "<ns-prefix>? <ident-token>"
	}
	};

	var syntaxes$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		attachment: attachment,
		box: box,
		color: color$1,
		combinator: combinator,
		compat: compat,
		gradient: gradient,
		hue: hue,
		image: image,
		nth: nth,
		position: position$1,
		quote: quote,
		shadow: shadow,
		shape: shape$1,
		size: size,
		symbol: symbol,
		target: target,
		'default': syntaxes
	});

	var properties$3 = {
		"-moz-background-clip": {
			comment: "deprecated syntax in old Firefox, https://developer.mozilla.org/en/docs/Web/CSS/background-clip",
			syntax: "padding | border"
		},
		"-moz-border-radius-bottomleft": {
			comment: "https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-left-radius",
			syntax: "<'border-bottom-left-radius'>"
		},
		"-moz-border-radius-bottomright": {
			comment: "https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius",
			syntax: "<'border-bottom-right-radius'>"
		},
		"-moz-border-radius-topleft": {
			comment: "https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-left-radius",
			syntax: "<'border-top-left-radius'>"
		},
		"-moz-border-radius-topright": {
			comment: "https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius",
			syntax: "<'border-bottom-right-radius'>"
		},
		"-moz-control-character-visibility": {
			comment: "firefox specific keywords, https://bugzilla.mozilla.org/show_bug.cgi?id=947588",
			syntax: "visible | hidden"
		},
		"-moz-osx-font-smoothing": {
			comment: "misssed old syntax https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth",
			syntax: "auto | grayscale"
		},
		"-moz-user-select": {
			comment: "https://developer.mozilla.org/en-US/docs/Web/CSS/user-select",
			syntax: "none | text | all | -moz-none"
		},
		"-ms-flex-align": {
			comment: "misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align",
			syntax: "start | end | center | baseline | stretch"
		},
		"-ms-flex-item-align": {
			comment: "misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align",
			syntax: "auto | start | end | center | baseline | stretch"
		},
		"-ms-flex-line-pack": {
			comment: "misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-line-pack",
			syntax: "start | end | center | justify | distribute | stretch"
		},
		"-ms-flex-negative": {
			comment: "misssed old syntax implemented in IE; TODO: find references for comfirmation",
			syntax: "<'flex-shrink'>"
		},
		"-ms-flex-pack": {
			comment: "misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-pack",
			syntax: "start | end | center | justify | distribute"
		},
		"-ms-flex-order": {
			comment: "misssed old syntax implemented in IE; https://msdn.microsoft.com/en-us/library/jj127303(v=vs.85).aspx",
			syntax: "<integer>"
		},
		"-ms-flex-positive": {
			comment: "misssed old syntax implemented in IE; TODO: find references for comfirmation",
			syntax: "<'flex-grow'>"
		},
		"-ms-flex-preferred-size": {
			comment: "misssed old syntax implemented in IE; TODO: find references for comfirmation",
			syntax: "<'flex-basis'>"
		},
		"-ms-interpolation-mode": {
			comment: "https://msdn.microsoft.com/en-us/library/ff521095(v=vs.85).aspx",
			syntax: "nearest-neighbor | bicubic"
		},
		"-ms-grid-column-align": {
			comment: "add this property first since it uses as fallback for flexbox, https://msdn.microsoft.com/en-us/library/windows/apps/hh466338.aspx",
			syntax: "start | end | center | stretch"
		},
		"-ms-grid-columns": {
			comment: "misssed old syntax implemented in IE; https://www.w3.org/TR/2012/WD-css3-grid-layout-20120322/#grid-columns",
			syntax: "<track-list-v0>"
		},
		"-ms-grid-row-align": {
			comment: "add this property first since it uses as fallback for flexbox, https://msdn.microsoft.com/en-us/library/windows/apps/hh466348.aspx",
			syntax: "start | end | center | stretch"
		},
		"-ms-grid-rows": {
			comment: "misssed old syntax implemented in IE; https://www.w3.org/TR/2012/WD-css3-grid-layout-20120322/#grid-rows",
			syntax: "<track-list-v0>"
		},
		"-ms-hyphenate-limit-last": {
			comment: "misssed old syntax implemented in IE; https://www.w3.org/TR/css-text-4/#hyphenate-line-limits",
			syntax: "none | always | column | page | spread"
		},
		"-webkit-appearance": {
			comment: "webkit specific keywords",
			references: [
				"http://css-infos.net/property/-webkit-appearance"
			],
			syntax: "none | button | button-bevel | caps-lock-indicator | caret | checkbox | default-button | listbox | listitem | media-fullscreen-button | media-mute-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | push-button | radio | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbargripper-horizontal | scrollbargripper-vertical | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield"
		},
		"-webkit-background-clip": {
			comment: "https://developer.mozilla.org/en/docs/Web/CSS/background-clip",
			syntax: "[ <box> | border | padding | content | text ]#"
		},
		"-webkit-column-break-after": {
			comment: "added, http://help.dottoro.com/lcrthhhv.php",
			syntax: "always | auto | avoid"
		},
		"-webkit-column-break-before": {
			comment: "added, http://help.dottoro.com/lcxquvkf.php",
			syntax: "always | auto | avoid"
		},
		"-webkit-column-break-inside": {
			comment: "added, http://help.dottoro.com/lclhnthl.php",
			syntax: "always | auto | avoid"
		},
		"-webkit-font-smoothing": {
			comment: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth",
			syntax: "auto | none | antialiased | subpixel-antialiased"
		},
		"-webkit-mask-box-image": {
			comment: "missed; https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-box-image",
			syntax: "[ <url> | <gradient> | none ] [ <length-percentage>{4} <-webkit-mask-box-repeat>{2} ]?"
		},
		"-webkit-print-color-adjust": {
			comment: "missed",
			references: [
				"https://developer.mozilla.org/en/docs/Web/CSS/-webkit-print-color-adjust"
			],
			syntax: "economy | exact"
		},
		"-webkit-text-security": {
			comment: "missed; http://help.dottoro.com/lcbkewgt.php",
			syntax: "none | circle | disc | square"
		},
		"-webkit-user-drag": {
			comment: "missed; http://help.dottoro.com/lcbixvwm.php",
			syntax: "none | element | auto"
		},
		"-webkit-user-select": {
			comment: "auto is supported by old webkit, https://developer.mozilla.org/en-US/docs/Web/CSS/user-select",
			syntax: "auto | none | text | all"
		},
		"alignment-baseline": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/text.html#AlignmentBaselineProperty"
			],
			syntax: "auto | baseline | before-edge | text-before-edge | middle | central | after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical"
		},
		"baseline-shift": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/text.html#BaselineShiftProperty"
			],
			syntax: "baseline | sub | super | <svg-length>"
		},
		behavior: {
			comment: "added old IE property https://msdn.microsoft.com/en-us/library/ms530723(v=vs.85).aspx",
			syntax: "<url>+"
		},
		"clip-rule": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/masking.html#ClipRuleProperty"
			],
			syntax: "nonzero | evenodd"
		},
		cue: {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "<'cue-before'> <'cue-after'>?"
		},
		"cue-after": {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "<url> <decibel>? | none"
		},
		"cue-before": {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "<url> <decibel>? | none"
		},
		cursor: {
			comment: "added legacy keywords: hand, -webkit-grab. -webkit-grabbing, -webkit-zoom-in, -webkit-zoom-out, -moz-grab, -moz-grabbing, -moz-zoom-in, -moz-zoom-out",
			references: [
				"https://www.sitepoint.com/css3-cursor-styles/"
			],
			syntax: "[ [ <url> [ <x> <y> ]? , ]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out | grab | grabbing | hand | -webkit-grab | -webkit-grabbing | -webkit-zoom-in | -webkit-zoom-out | -moz-grab | -moz-grabbing | -moz-zoom-in | -moz-zoom-out ] ]"
		},
		display: {
			comment: "extended with -ms-flexbox",
			syntax: "block | contents | flex | flow | flow-root | grid | inline | inline-block | inline-flex | inline-grid | inline-list-item | inline-table | list-item | none | ruby | ruby-base | ruby-base-container | ruby-text | ruby-text-container | run-in | table | table-caption | table-cell | table-column | table-column-group | table-footer-group | table-header-group | table-row | table-row-group | -ms-flexbox | -ms-inline-flexbox | -ms-grid | -ms-inline-grid | -webkit-flex | -webkit-inline-flex | -webkit-box | -webkit-inline-box | -moz-inline-stack | -moz-box | -moz-inline-box"
		},
		position: {
			comment: "extended with -webkit-sticky",
			syntax: "static | relative | absolute | sticky | fixed | -webkit-sticky"
		},
		"dominant-baseline": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/text.html#DominantBaselineProperty"
			],
			syntax: "auto | use-script | no-change | reset-size | ideographic | alphabetic | hanging | mathematical | central | middle | text-after-edge | text-before-edge"
		},
		"image-rendering": {
			comment: "extended with <-non-standard-image-rendering>, added SVG keywords optimizeSpeed and optimizeQuality",
			references: [
				"https://developer.mozilla.org/en/docs/Web/CSS/image-rendering",
				"https://www.w3.org/TR/SVG/painting.html#ImageRenderingProperty"
			],
			syntax: "auto | crisp-edges | pixelated | optimizeSpeed | optimizeQuality | <-non-standard-image-rendering>"
		},
		fill: {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/painting.html#FillProperty"
			],
			syntax: "<paint>"
		},
		"fill-opacity": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/painting.html#FillProperty"
			],
			syntax: "<number-zero-one>"
		},
		"fill-rule": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/painting.html#FillProperty"
			],
			syntax: "nonzero | evenodd"
		},
		filter: {
			comment: "extend with IE legacy syntaxes",
			syntax: "none | <filter-function-list> | <-ms-filter-function-list>"
		},
		"glyph-orientation-horizontal": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/text.html#GlyphOrientationHorizontalProperty"
			],
			syntax: "<angle>"
		},
		"glyph-orientation-vertical": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/text.html#GlyphOrientationVerticalProperty"
			],
			syntax: "<angle>"
		},
		kerning: {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/text.html#KerningProperty"
			],
			syntax: "auto | <svg-length>"
		},
		"letter-spacing": {
			comment: "fix syntax <length> -> <length-percentage>",
			references: [
				"https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/letter-spacing"
			],
			syntax: "normal | <length-percentage>"
		},
		marker: {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/painting.html#MarkerProperties"
			],
			syntax: "none | <url>"
		},
		"marker-end": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/painting.html#MarkerProperties"
			],
			syntax: "none | <url>"
		},
		"marker-mid": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/painting.html#MarkerProperties"
			],
			syntax: "none | <url>"
		},
		"marker-start": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/painting.html#MarkerProperties"
			],
			syntax: "none | <url>"
		},
		"max-width": {
			comment: "extend by non-standard width keywords https://developer.mozilla.org/en-US/docs/Web/CSS/max-width",
			syntax: "<length> | <percentage> | none | max-content | min-content | fit-content | fill-available | <-non-standard-width>"
		},
		"min-width": {
			comment: "extend by non-standard width keywords https://developer.mozilla.org/en-US/docs/Web/CSS/width",
			syntax: "<length> | <percentage> | auto | max-content | min-content | fit-content | fill-available | <-non-standard-width>"
		},
		opacity: {
			comment: "strict to 0..1 <number> -> <number-zero-one>",
			syntax: "<number-zero-one>"
		},
		overflow: {
			comment: "extend by vendor keywords https://developer.mozilla.org/en-US/docs/Web/CSS/overflow",
			syntax: "[ visible | hidden | clip | scroll | auto ]{1,2} | <-non-standard-overflow>"
		},
		pause: {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "<'pause-before'> <'pause-after'>?"
		},
		"pause-after": {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "<time> | none | x-weak | weak | medium | strong | x-strong"
		},
		"pause-before": {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "<time> | none | x-weak | weak | medium | strong | x-strong"
		},
		rest: {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "<'rest-before'> <'rest-after'>?"
		},
		"rest-after": {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "<time> | none | x-weak | weak | medium | strong | x-strong"
		},
		"rest-before": {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "<time> | none | x-weak | weak | medium | strong | x-strong"
		},
		"shape-rendering": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/painting.html#ShapeRenderingPropert"
			],
			syntax: "auto | optimizeSpeed | crispEdges | geometricPrecision"
		},
		src: {
			comment: "added @font-face's src property https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src",
			syntax: "[ <url> [ format( <string># ) ]? | local( <family-name> ) ]#"
		},
		speak: {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "auto | none | normal"
		},
		"speak-as": {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "normal | spell-out || digits || [ literal-punctuation | no-punctuation ]"
		},
		stroke: {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/painting.html#StrokeProperties"
			],
			syntax: "<paint>"
		},
		"stroke-dasharray": {
			comment: "added SVG property; a list of comma and/or white space separated <length>s and <percentage>s",
			references: [
				"https://www.w3.org/TR/SVG/painting.html#StrokeProperties"
			],
			syntax: "none | [ <svg-length>+ ]#"
		},
		"stroke-dashoffset": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/painting.html#StrokeProperties"
			],
			syntax: "<svg-length>"
		},
		"stroke-linecap": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/painting.html#StrokeProperties"
			],
			syntax: "butt | round | square"
		},
		"stroke-linejoin": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/painting.html#StrokeProperties"
			],
			syntax: "miter | round | bevel"
		},
		"stroke-miterlimit": {
			comment: "added SVG property (<miterlimit> = <number-one-or-greater>) ",
			references: [
				"https://www.w3.org/TR/SVG/painting.html#StrokeProperties"
			],
			syntax: "<number-one-or-greater>"
		},
		"stroke-opacity": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/painting.html#StrokeProperties"
			],
			syntax: "<number-zero-one>"
		},
		"stroke-width": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/painting.html#StrokeProperties"
			],
			syntax: "<svg-length>"
		},
		"text-anchor": {
			comment: "added SVG property",
			references: [
				"https://www.w3.org/TR/SVG/text.html#TextAlignmentProperties"
			],
			syntax: "start | middle | end"
		},
		"unicode-bidi": {
			comment: "added prefixed keywords https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi",
			syntax: "normal | embed | isolate | bidi-override | isolate-override | plaintext | -moz-isolate | -moz-isolate-override | -moz-plaintext | -webkit-isolate"
		},
		"unicode-range": {
			comment: "added missed property https://developer.mozilla.org/en-US/docs/Web/CSS/%40font-face/unicode-range",
			syntax: "<urange>#"
		},
		"voice-balance": {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "<number> | left | center | right | leftwards | rightwards"
		},
		"voice-duration": {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "auto | <time>"
		},
		"voice-family": {
			comment: "<name> -> <family-name>, https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "[ [ <family-name> | <generic-voice> ] , ]* [ <family-name> | <generic-voice> ] | preserve"
		},
		"voice-pitch": {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "<frequency> && absolute | [ [ x-low | low | medium | high | x-high ] || [ <frequency> | <semitones> | <percentage> ] ]"
		},
		"voice-range": {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "<frequency> && absolute | [ [ x-low | low | medium | high | x-high ] || [ <frequency> | <semitones> | <percentage> ] ]"
		},
		"voice-rate": {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "[ normal | x-slow | slow | medium | fast | x-fast ] || <percentage>"
		},
		"voice-stress": {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "normal | strong | moderate | none | reduced"
		},
		"voice-volume": {
			comment: "https://www.w3.org/TR/css3-speech/#property-index",
			syntax: "silent | [ [ x-soft | soft | medium | loud | x-loud ] || <decibel> ]"
		},
		"writing-mode": {
			comment: "extend with SVG keywords",
			syntax: "horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr | <svg-writing-mode>"
		}
	};
	var syntaxes$2 = {
		"-legacy-gradient": {
			comment: "added collection of legacy gradient syntaxes",
			syntax: "<-webkit-gradient()> | <-legacy-linear-gradient> | <-legacy-repeating-linear-gradient> | <-legacy-radial-gradient> | <-legacy-repeating-radial-gradient>"
		},
		"-legacy-linear-gradient": {
			comment: "like standard syntax but w/o `to` keyword https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient",
			syntax: "-moz-linear-gradient( <-legacy-linear-gradient-arguments> ) | -webkit-linear-gradient( <-legacy-linear-gradient-arguments> ) | -o-linear-gradient( <-legacy-linear-gradient-arguments> )"
		},
		"-legacy-repeating-linear-gradient": {
			comment: "like standard syntax but w/o `to` keyword https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient",
			syntax: "-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> ) | -webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> ) | -o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )"
		},
		"-legacy-linear-gradient-arguments": {
			comment: "like standard syntax but w/o `to` keyword https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient",
			syntax: "[ <angle> | <side-or-corner> ]? , <color-stop-list>"
		},
		"-legacy-radial-gradient": {
			comment: "deprecated syntax that implemented by some browsers https://www.w3.org/TR/2011/WD-css3-images-20110908/#radial-gradients",
			syntax: "-moz-radial-gradient( <-legacy-radial-gradient-arguments> ) | -webkit-radial-gradient( <-legacy-radial-gradient-arguments> ) | -o-radial-gradient( <-legacy-radial-gradient-arguments> )"
		},
		"-legacy-repeating-radial-gradient": {
			comment: "deprecated syntax that implemented by some browsers https://www.w3.org/TR/2011/WD-css3-images-20110908/#radial-gradients",
			syntax: "-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> ) | -webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> ) | -o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )"
		},
		"-legacy-radial-gradient-arguments": {
			comment: "deprecated syntax that implemented by some browsers https://www.w3.org/TR/2011/WD-css3-images-20110908/#radial-gradients",
			syntax: "[ <position> , ]? [ [ [ <-legacy-radial-gradient-shape> || <-legacy-radial-gradient-size> ] | [ <length> | <percentage> ]{2} ] , ]? <color-stop-list>"
		},
		"-legacy-radial-gradient-size": {
			comment: "before a standard it contains 2 extra keywords (`contain` and `cover`) https://www.w3.org/TR/2011/WD-css3-images-20110908/#ltsize",
			syntax: "closest-side | closest-corner | farthest-side | farthest-corner | contain | cover"
		},
		"-legacy-radial-gradient-shape": {
			comment: "define to double sure it doesn't extends in future https://www.w3.org/TR/2011/WD-css3-images-20110908/#ltshape",
			syntax: "circle | ellipse"
		},
		"-non-standard-font": {
			comment: "non standard fonts",
			references: [
				"https://webkit.org/blog/3709/using-the-system-font-in-web-content/"
			],
			syntax: "-apple-system-body | -apple-system-headline | -apple-system-subheadline | -apple-system-caption1 | -apple-system-caption2 | -apple-system-footnote | -apple-system-short-body | -apple-system-short-headline | -apple-system-short-subheadline | -apple-system-short-caption1 | -apple-system-short-footnote | -apple-system-tall-body"
		},
		"-non-standard-color": {
			comment: "non standard colors",
			references: [
				"http://cssdot.ru/%D0%A1%D0%BF%D1%80%D0%B0%D0%B2%D0%BE%D1%87%D0%BD%D0%B8%D0%BA_CSS/color-i305.html",
				"https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Mozilla_Color_Preference_Extensions"
			],
			syntax: "-moz-ButtonDefault | -moz-ButtonHoverFace | -moz-ButtonHoverText | -moz-CellHighlight | -moz-CellHighlightText | -moz-Combobox | -moz-ComboboxText | -moz-Dialog | -moz-DialogText | -moz-dragtargetzone | -moz-EvenTreeRow | -moz-Field | -moz-FieldText | -moz-html-CellHighlight | -moz-html-CellHighlightText | -moz-mac-accentdarkestshadow | -moz-mac-accentdarkshadow | -moz-mac-accentface | -moz-mac-accentlightesthighlight | -moz-mac-accentlightshadow | -moz-mac-accentregularhighlight | -moz-mac-accentregularshadow | -moz-mac-chrome-active | -moz-mac-chrome-inactive | -moz-mac-focusring | -moz-mac-menuselect | -moz-mac-menushadow | -moz-mac-menutextselect | -moz-MenuHover | -moz-MenuHoverText | -moz-MenuBarText | -moz-MenuBarHoverText | -moz-nativehyperlinktext | -moz-OddTreeRow | -moz-win-communicationstext | -moz-win-mediatext | -moz-activehyperlinktext | -moz-default-background-color | -moz-default-color | -moz-hyperlinktext | -moz-visitedhyperlinktext | -webkit-activelink | -webkit-focus-ring-color | -webkit-link | -webkit-text"
		},
		"-non-standard-image-rendering": {
			comment: "non-standard keywords http://phrogz.net/tmp/canvas_image_zoom.html",
			syntax: "optimize-contrast | -moz-crisp-edges | -o-crisp-edges | -webkit-optimize-contrast"
		},
		"-non-standard-overflow": {
			comment: "non-standard keywords https://developer.mozilla.org/en-US/docs/Web/CSS/overflow",
			syntax: "-moz-scrollbars-none | -moz-scrollbars-horizontal | -moz-scrollbars-vertical | -moz-hidden-unscrollable"
		},
		"-non-standard-width": {
			comment: "non-standard keywords https://developer.mozilla.org/en-US/docs/Web/CSS/width",
			syntax: "min-intrinsic | intrinsic | -moz-min-content | -moz-max-content | -webkit-min-content | -webkit-max-content"
		},
		"-webkit-gradient()": {
			comment: "first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/ - TODO: simplify when after match algorithm improvement ( [, point, radius | , point] -> [, radius]? , point )",
			syntax: "-webkit-gradient( <-webkit-gradient-type>, <-webkit-gradient-point> [, <-webkit-gradient-point> | , <-webkit-gradient-radius>, <-webkit-gradient-point> ] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )"
		},
		"-webkit-gradient-color-stop": {
			comment: "first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/",
			syntax: "from( <color> ) | color-stop( [ <number-zero-one> | <percentage> ] , <color> ) | to( <color> )"
		},
		"-webkit-gradient-point": {
			comment: "first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/",
			syntax: "[ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ]"
		},
		"-webkit-gradient-radius": {
			comment: "first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/",
			syntax: "<length> | <percentage>"
		},
		"-webkit-gradient-type": {
			comment: "first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/",
			syntax: "linear | radial"
		},
		"-webkit-mask-box-repeat": {
			comment: "missed; https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-box-image",
			syntax: "repeat | stretch | round"
		},
		"-webkit-mask-clip-style": {
			comment: "missed; there is no enough information about `-webkit-mask-clip` property, but looks like all those keywords are working",
			syntax: "border | border-box | padding | padding-box | content | content-box | text"
		},
		"-ms-filter-function-list": {
			comment: "https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter",
			syntax: "<-ms-filter-function>+"
		},
		"-ms-filter-function": {
			comment: "https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter",
			syntax: "<-ms-filter-function-progid> | <-ms-filter-function-legacy>"
		},
		"-ms-filter-function-progid": {
			comment: "https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter",
			syntax: "'progid:' [ <ident-token> '.' ]* [ <ident-token> | <function-token> <any-value>? ) ]"
		},
		"-ms-filter-function-legacy": {
			comment: "https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter",
			syntax: "<ident-token> | <function-token> <any-value>? )"
		},
		"-ms-filter": {
			syntax: "<string>"
		},
		age: {
			comment: "https://www.w3.org/TR/css3-speech/#voice-family",
			syntax: "child | young | old"
		},
		"attr-name": {
			syntax: "<wq-name>"
		},
		"attr-fallback": {
			syntax: "<any-value>"
		},
		"border-radius": {
			comment: "missed, https://drafts.csswg.org/css-backgrounds-3/#the-border-radius",
			syntax: "<length-percentage>{1,2}"
		},
		bottom: {
			comment: "missed; not sure we should add it, but no others except `shape` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect",
			syntax: "<length> | auto"
		},
		"content-list": {
			comment: "missed -> https://drafts.csswg.org/css-content/#typedef-content-list (document-url, <target> and leader() is omitted util stabilization)",
			syntax: "[ <string> | contents | <url> | <quote> | <attr()> | counter( <ident>, <'list-style-type'>? ) ]+"
		},
		"generic-voice": {
			comment: "https://www.w3.org/TR/css3-speech/#voice-family",
			syntax: "[ <age>? <gender> <integer>? ]"
		},
		gender: {
			comment: "https://www.w3.org/TR/css3-speech/#voice-family",
			syntax: "male | female | neutral"
		},
		"generic-family": {
			comment: "added -apple-system",
			references: [
				"https://webkit.org/blog/3709/using-the-system-font-in-web-content/"
			],
			syntax: "serif | sans-serif | cursive | fantasy | monospace | -apple-system"
		},
		gradient: {
			comment: "added legacy syntaxes support",
			syntax: "<linear-gradient()> | <repeating-linear-gradient()> | <radial-gradient()> | <repeating-radial-gradient()> | <conic-gradient()> | <-legacy-gradient>"
		},
		left: {
			comment: "missed; not sure we should add it, but no others except `shape` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect",
			syntax: "<length> | auto"
		},
		"mask-image": {
			comment: "missed; https://drafts.fxtf.org/css-masking-1/#the-mask-image",
			syntax: "<mask-reference>#"
		},
		"name-repeat": {
			comment: "missed, and looks like obsolete, keep it as is since other property syntaxes should be changed too; https://www.w3.org/TR/2015/WD-css-grid-1-20150917/#typedef-name-repeat",
			syntax: "repeat( [ <positive-integer> | auto-fill ], <line-names>+)"
		},
		"named-color": {
			comment: "added non standard color names",
			syntax: "transparent | aliceblue | antiquewhite | aqua | aquamarine | azure | beige | bisque | black | blanchedalmond | blue | blueviolet | brown | burlywood | cadetblue | chartreuse | chocolate | coral | cornflowerblue | cornsilk | crimson | cyan | darkblue | darkcyan | darkgoldenrod | darkgray | darkgreen | darkgrey | darkkhaki | darkmagenta | darkolivegreen | darkorange | darkorchid | darkred | darksalmon | darkseagreen | darkslateblue | darkslategray | darkslategrey | darkturquoise | darkviolet | deeppink | deepskyblue | dimgray | dimgrey | dodgerblue | firebrick | floralwhite | forestgreen | fuchsia | gainsboro | ghostwhite | gold | goldenrod | gray | green | greenyellow | grey | honeydew | hotpink | indianred | indigo | ivory | khaki | lavender | lavenderblush | lawngreen | lemonchiffon | lightblue | lightcoral | lightcyan | lightgoldenrodyellow | lightgray | lightgreen | lightgrey | lightpink | lightsalmon | lightseagreen | lightskyblue | lightslategray | lightslategrey | lightsteelblue | lightyellow | lime | limegreen | linen | magenta | maroon | mediumaquamarine | mediumblue | mediumorchid | mediumpurple | mediumseagreen | mediumslateblue | mediumspringgreen | mediumturquoise | mediumvioletred | midnightblue | mintcream | mistyrose | moccasin | navajowhite | navy | oldlace | olive | olivedrab | orange | orangered | orchid | palegoldenrod | palegreen | paleturquoise | palevioletred | papayawhip | peachpuff | peru | pink | plum | powderblue | purple | rebeccapurple | red | rosybrown | royalblue | saddlebrown | salmon | sandybrown | seagreen | seashell | sienna | silver | skyblue | slateblue | slategray | slategrey | snow | springgreen | steelblue | tan | teal | thistle | tomato | turquoise | violet | wheat | white | whitesmoke | yellow | yellowgreen | <-non-standard-color>"
		},
		paint: {
			comment: "used by SVG https://www.w3.org/TR/SVG/painting.html#SpecifyingPaint",
			syntax: "none | <color> | <url> [ none | <color> ]? | context-fill | context-stroke"
		},
		"path()": {
			comment: "missed, `motion` property was renamed, but left it as is for now; path() syntax was get from last draft https://drafts.fxtf.org/motion-1/#funcdef-offset-path-path",
			syntax: "path( <string> )"
		},
		ratio: {
			comment: "missed, https://drafts.csswg.org/mediaqueries-4/#typedef-ratio",
			syntax: "<integer> / <integer>"
		},
		right: {
			comment: "missed; not sure we should add it, but no others except `shape` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect",
			syntax: "<length> | auto"
		},
		shape: {
			comment: "missed spaces in function body and add backwards compatible syntax",
			syntax: "rect( <top>, <right>, <bottom>, <left> ) | rect( <top> <right> <bottom> <left> )"
		},
		"svg-length": {
			comment: "All coordinates and lengths in SVG can be specified with or without a unit identifier",
			references: [
				"https://www.w3.org/TR/SVG11/coords.html#Units"
			],
			syntax: "<percentage> | <length> | <number>"
		},
		"svg-writing-mode": {
			comment: "SVG specific keywords (deprecated for CSS)",
			references: [
				"https://developer.mozilla.org/en/docs/Web/CSS/writing-mode",
				"https://www.w3.org/TR/SVG/text.html#WritingModeProperty"
			],
			syntax: "lr-tb | rl-tb | tb-rl | lr | rl | tb"
		},
		top: {
			comment: "missed; not sure we should add it, but no others except `shape` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect",
			syntax: "<length> | auto"
		},
		"track-group": {
			comment: "used by old grid-columns and grid-rows syntax v0",
			syntax: "'(' [ <string>* <track-minmax> <string>* ]+ ')' [ '[' <positive-integer> ']' ]? | <track-minmax>"
		},
		"track-list-v0": {
			comment: "used by old grid-columns and grid-rows syntax v0",
			syntax: "[ <string>* <track-group> <string>* ]+ | none"
		},
		"track-minmax": {
			comment: "used by old grid-columns and grid-rows syntax v0",
			syntax: "minmax( <track-breadth> , <track-breadth> ) | auto | <track-breadth> | fit-content"
		},
		x: {
			comment: "missed; not sure we should add it, but no others except `cursor` is using it so it's ok for now; https://drafts.csswg.org/css-ui-3/#cursor",
			syntax: "<number>"
		},
		y: {
			comment: "missed; not sure we should add it, but no others except `cursor` is using so it's ok for now; https://drafts.csswg.org/css-ui-3/#cursor",
			syntax: "<number>"
		},
		declaration: {
			comment: "missed, restored by https://drafts.csswg.org/css-syntax",
			syntax: "<ident-token> : <declaration-value>? [ '!' important ]?"
		},
		"declaration-list": {
			comment: "missed, restored by https://drafts.csswg.org/css-syntax",
			syntax: "[ <declaration>? ';' ]* <declaration>?"
		},
		url: {
			comment: "https://drafts.csswg.org/css-values-4/#urls",
			syntax: "url( <string> <url-modifier>* ) | <url-token>"
		},
		"url-modifier": {
			comment: "https://drafts.csswg.org/css-values-4/#typedef-url-modifier",
			syntax: "<ident> | <function-token> <any-value> )"
		},
		"number-zero-one": {
			syntax: "<number [0,1]>"
		},
		"number-one-or-greater": {
			syntax: "<number [1,∞]>"
		},
		"positive-integer": {
			syntax: "<integer [0,∞]>"
		}
	};
	var patch = {
		properties: properties$3,
		syntaxes: syntaxes$2
	};

	var patch$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		properties: properties$3,
		syntaxes: syntaxes$2,
		'default': patch
	});

	var mdnAtrules = getCjsExportFromNamespace(atRules$1);

	var mdnProperties = getCjsExportFromNamespace(properties$2);

	var mdnSyntaxes = getCjsExportFromNamespace(syntaxes$1);

	var patch$2 = getCjsExportFromNamespace(patch$1);

	function preprocessAtrules(dict) {
	    var result = Object.create(null);

	    for (var atruleName in dict) {
	        var atrule = dict[atruleName];
	        var descriptors = null;

	        if (atrule.descriptors) {
	            descriptors = Object.create(null);

	            for (var descriptor in atrule.descriptors) {
	                descriptors[descriptor] = atrule.descriptors[descriptor].syntax;
	            }
	        }

	        result[atruleName.substr(1)] = {
	            prelude: atrule.syntax.trim().match(/^@\S+\s+([^;\{]*)/)[1].trim() || null,
	            descriptors
	        };
	    }

	    return result;
	}

	function buildDictionary(dict, patchDict) {
	    var result = {};

	    // copy all syntaxes for an original dict
	    for (var key in dict) {
	        result[key] = dict[key].syntax;
	    }

	    // apply a patch
	    for (var key in patchDict) {
	        if (key in dict) {
	            if (patchDict[key].syntax) {
	                result[key] = patchDict[key].syntax;
	            } else {
	                delete result[key];
	            }
	        } else {
	            if (patchDict[key].syntax) {
	                result[key] = patchDict[key].syntax;
	            }
	        }
	    }

	    return result;
	}

	var data = {
	    types: buildDictionary(mdnSyntaxes, patch$2.syntaxes),
	    atrules: preprocessAtrules(mdnAtrules),
	    properties: buildDictionary(mdnProperties, patch$2.properties)
	};

	var cmpChar$3 = tokenizer.cmpChar;
	var isDigit$4 = tokenizer.isDigit;
	var TYPE$9 = tokenizer.TYPE;

	var WHITESPACE$4 = TYPE$9.WhiteSpace;
	var COMMENT$3 = TYPE$9.Comment;
	var IDENT$3 = TYPE$9.Ident;
	var NUMBER$3 = TYPE$9.Number;
	var DIMENSION$2 = TYPE$9.Dimension;
	var PLUSSIGN$3 = 0x002B;    // U+002B PLUS SIGN (+)
	var HYPHENMINUS$3 = 0x002D; // U+002D HYPHEN-MINUS (-)
	var N$4 = 0x006E;           // U+006E LATIN SMALL LETTER N (n)
	var DISALLOW_SIGN$1 = true;
	var ALLOW_SIGN$1 = false;

	function checkInteger$1(offset, disallowSign) {
	    var pos = this.scanner.tokenStart + offset;
	    var code = this.scanner.source.charCodeAt(pos);

	    if (code === PLUSSIGN$3 || code === HYPHENMINUS$3) {
	        if (disallowSign) {
	            this.error('Number sign is not allowed');
	        }
	        pos++;
	    }

	    for (; pos < this.scanner.tokenEnd; pos++) {
	        if (!isDigit$4(this.scanner.source.charCodeAt(pos))) {
	            this.error('Integer is expected', pos);
	        }
	    }
	}

	function checkTokenIsInteger(disallowSign) {
	    return checkInteger$1.call(this, 0, disallowSign);
	}

	function expectCharCode(offset, code) {
	    if (!cmpChar$3(this.scanner.source, this.scanner.tokenStart + offset, code)) {
	        var msg = '';

	        switch (code) {
	            case N$4:
	                msg = 'N is expected';
	                break;
	            case HYPHENMINUS$3:
	                msg = 'HyphenMinus is expected';
	                break;
	        }

	        this.error(msg, this.scanner.tokenStart + offset);
	    }
	}

	// ... <signed-integer>
	// ... ['+' | '-'] <signless-integer>
	function consumeB$1() {
	    var offset = 0;
	    var sign = 0;
	    var type = this.scanner.tokenType;

	    while (type === WHITESPACE$4 || type === COMMENT$3) {
	        type = this.scanner.lookupType(++offset);
	    }

	    if (type !== NUMBER$3) {
	        if (this.scanner.isDelim(PLUSSIGN$3, offset) ||
	            this.scanner.isDelim(HYPHENMINUS$3, offset)) {
	            sign = this.scanner.isDelim(PLUSSIGN$3, offset) ? PLUSSIGN$3 : HYPHENMINUS$3;

	            do {
	                type = this.scanner.lookupType(++offset);
	            } while (type === WHITESPACE$4 || type === COMMENT$3);

	            if (type !== NUMBER$3) {
	                this.scanner.skip(offset);
	                checkTokenIsInteger.call(this, DISALLOW_SIGN$1);
	            }
	        } else {
	            return null;
	        }
	    }

	    if (offset > 0) {
	        this.scanner.skip(offset);
	    }

	    if (sign === 0) {
	        type = this.scanner.source.charCodeAt(this.scanner.tokenStart);
	        if (type !== PLUSSIGN$3 && type !== HYPHENMINUS$3) {
	            this.error('Number sign is expected');
	        }
	    }

	    checkTokenIsInteger.call(this, sign !== 0);
	    return sign === HYPHENMINUS$3 ? '-' + this.consume(NUMBER$3) : this.consume(NUMBER$3);
	}

	// An+B microsyntax https://www.w3.org/TR/css-syntax-3/#anb
	var AnPlusB = {
	    name: 'AnPlusB',
	    structure: {
	        a: [String, null],
	        b: [String, null]
	    },
	    parse: function() {
	        /* eslint-disable brace-style*/
	        var start = this.scanner.tokenStart;
	        var a = null;
	        var b = null;

	        // <integer>
	        if (this.scanner.tokenType === NUMBER$3) {
	            checkTokenIsInteger.call(this, ALLOW_SIGN$1);
	            b = this.consume(NUMBER$3);
	        }

	        // -n
	        // -n <signed-integer>
	        // -n ['+' | '-'] <signless-integer>
	        // -n- <signless-integer>
	        // <dashndashdigit-ident>
	        else if (this.scanner.tokenType === IDENT$3 && cmpChar$3(this.scanner.source, this.scanner.tokenStart, HYPHENMINUS$3)) {
	            a = '-1';

	            expectCharCode.call(this, 1, N$4);

	            switch (this.scanner.getTokenLength()) {
	                // -n
	                // -n <signed-integer>
	                // -n ['+' | '-'] <signless-integer>
	                case 2:
	                    this.scanner.next();
	                    b = consumeB$1.call(this);
	                    break;

	                // -n- <signless-integer>
	                case 3:
	                    expectCharCode.call(this, 2, HYPHENMINUS$3);

	                    this.scanner.next();
	                    this.scanner.skipSC();

	                    checkTokenIsInteger.call(this, DISALLOW_SIGN$1);

	                    b = '-' + this.consume(NUMBER$3);
	                    break;

	                // <dashndashdigit-ident>
	                default:
	                    expectCharCode.call(this, 2, HYPHENMINUS$3);
	                    checkInteger$1.call(this, 3, DISALLOW_SIGN$1);
	                    this.scanner.next();

	                    b = this.scanner.substrToCursor(start + 2);
	            }
	        }

	        // '+'? n
	        // '+'? n <signed-integer>
	        // '+'? n ['+' | '-'] <signless-integer>
	        // '+'? n- <signless-integer>
	        // '+'? <ndashdigit-ident>
	        else if (this.scanner.tokenType === IDENT$3 || (this.scanner.isDelim(PLUSSIGN$3) && this.scanner.lookupType(1) === IDENT$3)) {
	            var sign = 0;
	            a = '1';

	            // just ignore a plus
	            if (this.scanner.isDelim(PLUSSIGN$3)) {
	                sign = 1;
	                this.scanner.next();
	            }

	            expectCharCode.call(this, 0, N$4);

	            switch (this.scanner.getTokenLength()) {
	                // '+'? n
	                // '+'? n <signed-integer>
	                // '+'? n ['+' | '-'] <signless-integer>
	                case 1:
	                    this.scanner.next();
	                    b = consumeB$1.call(this);
	                    break;

	                // '+'? n- <signless-integer>
	                case 2:
	                    expectCharCode.call(this, 1, HYPHENMINUS$3);

	                    this.scanner.next();
	                    this.scanner.skipSC();

	                    checkTokenIsInteger.call(this, DISALLOW_SIGN$1);

	                    b = '-' + this.consume(NUMBER$3);
	                    break;

	                // '+'? <ndashdigit-ident>
	                default:
	                    expectCharCode.call(this, 1, HYPHENMINUS$3);
	                    checkInteger$1.call(this, 2, DISALLOW_SIGN$1);
	                    this.scanner.next();

	                    b = this.scanner.substrToCursor(start + sign + 1);
	            }
	        }

	        // <ndashdigit-dimension>
	        // <ndash-dimension> <signless-integer>
	        // <n-dimension>
	        // <n-dimension> <signed-integer>
	        // <n-dimension> ['+' | '-'] <signless-integer>
	        else if (this.scanner.tokenType === DIMENSION$2) {
	            var code = this.scanner.source.charCodeAt(this.scanner.tokenStart);
	            var sign = code === PLUSSIGN$3 || code === HYPHENMINUS$3;

	            for (var i = this.scanner.tokenStart + sign; i < this.scanner.tokenEnd; i++) {
	                if (!isDigit$4(this.scanner.source.charCodeAt(i))) {
	                    break;
	                }
	            }

	            if (i === this.scanner.tokenStart + sign) {
	                this.error('Integer is expected', this.scanner.tokenStart + sign);
	            }

	            expectCharCode.call(this, i - this.scanner.tokenStart, N$4);
	            a = this.scanner.source.substring(start, i);

	            // <n-dimension>
	            // <n-dimension> <signed-integer>
	            // <n-dimension> ['+' | '-'] <signless-integer>
	            if (i + 1 === this.scanner.tokenEnd) {
	                this.scanner.next();
	                b = consumeB$1.call(this);
	            } else {
	                expectCharCode.call(this, i - this.scanner.tokenStart + 1, HYPHENMINUS$3);

	                // <ndash-dimension> <signless-integer>
	                if (i + 2 === this.scanner.tokenEnd) {
	                    this.scanner.next();
	                    this.scanner.skipSC();
	                    checkTokenIsInteger.call(this, DISALLOW_SIGN$1);
	                    b = '-' + this.consume(NUMBER$3);
	                }
	                // <ndashdigit-dimension>
	                else {
	                    checkInteger$1.call(this, i - this.scanner.tokenStart + 2, DISALLOW_SIGN$1);
	                    this.scanner.next();
	                    b = this.scanner.substrToCursor(i + 1);
	                }
	            }
	        } else {
	            this.error();
	        }

	        if (a !== null && a.charCodeAt(0) === PLUSSIGN$3) {
	            a = a.substr(1);
	        }

	        if (b !== null && b.charCodeAt(0) === PLUSSIGN$3) {
	            b = b.substr(1);
	        }

	        return {
	            type: 'AnPlusB',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            a: a,
	            b: b
	        };
	    },
	    generate: function(node) {
	        var a = node.a !== null && node.a !== undefined;
	        var b = node.b !== null && node.b !== undefined;

	        if (a) {
	            this.chunk(
	                node.a === '+1' ? '+n' : // eslint-disable-line operator-linebreak, indent
	                node.a ===  '1' ?  'n' : // eslint-disable-line operator-linebreak, indent
	                node.a === '-1' ? '-n' : // eslint-disable-line operator-linebreak, indent
	                node.a + 'n'             // eslint-disable-line operator-linebreak, indent
	            );

	            if (b) {
	                b = String(node.b);
	                if (b.charAt(0) === '-' || b.charAt(0) === '+') {
	                    this.chunk(b.charAt(0));
	                    this.chunk(b.substr(1));
	                } else {
	                    this.chunk('+');
	                    this.chunk(b);
	                }
	            }
	        } else {
	            this.chunk(String(node.b));
	        }
	    }
	};

	var TYPE$a = tokenizer.TYPE;

	var WhiteSpace = TYPE$a.WhiteSpace;
	var Semicolon = TYPE$a.Semicolon;
	var LeftCurlyBracket = TYPE$a.LeftCurlyBracket;
	var Delim = TYPE$a.Delim;
	var EXCLAMATIONMARK$1 = 0x0021; // U+0021 EXCLAMATION MARK (!)

	function getOffsetExcludeWS() {
	    if (this.scanner.tokenIndex > 0) {
	        if (this.scanner.lookupType(-1) === WhiteSpace) {
	            return this.scanner.tokenIndex > 1
	                ? this.scanner.getTokenStart(this.scanner.tokenIndex - 1)
	                : this.scanner.firstCharOffset;
	        }
	    }

	    return this.scanner.tokenStart;
	}

	// 0, 0, false
	function balanceEnd() {
	    return 0;
	}

	// LEFTCURLYBRACKET, 0, false
	function leftCurlyBracket(tokenType) {
	    return tokenType === LeftCurlyBracket ? 1 : 0;
	}

	// LEFTCURLYBRACKET, SEMICOLON, false
	function leftCurlyBracketOrSemicolon(tokenType) {
	    return tokenType === LeftCurlyBracket || tokenType === Semicolon ? 1 : 0;
	}

	// EXCLAMATIONMARK, SEMICOLON, false
	function exclamationMarkOrSemicolon(tokenType, source, offset) {
	    if (tokenType === Delim && source.charCodeAt(offset) === EXCLAMATIONMARK$1) {
	        return 1;
	    }

	    return tokenType === Semicolon ? 1 : 0;
	}

	// 0, SEMICOLON, true
	function semicolonIncluded(tokenType) {
	    return tokenType === Semicolon ? 2 : 0;
	}

	var Raw = {
	    name: 'Raw',
	    structure: {
	        value: String
	    },
	    parse: function(startToken, mode, excludeWhiteSpace) {
	        var startOffset = this.scanner.getTokenStart(startToken);
	        var endOffset;

	        this.scanner.skip(
	            this.scanner.getRawLength(startToken, mode || balanceEnd)
	        );

	        if (excludeWhiteSpace && this.scanner.tokenStart > startOffset) {
	            endOffset = getOffsetExcludeWS.call(this);
	        } else {
	            endOffset = this.scanner.tokenStart;
	        }

	        return {
	            type: 'Raw',
	            loc: this.getLocation(startOffset, endOffset),
	            value: this.scanner.source.substring(startOffset, endOffset)
	        };
	    },
	    generate: function(node) {
	        this.chunk(node.value);
	    },

	    mode: {
	        default: balanceEnd,
	        leftCurlyBracket: leftCurlyBracket,
	        leftCurlyBracketOrSemicolon: leftCurlyBracketOrSemicolon,
	        exclamationMarkOrSemicolon: exclamationMarkOrSemicolon,
	        semicolonIncluded: semicolonIncluded
	    }
	};

	var TYPE$b = tokenizer.TYPE;
	var rawMode = Raw.mode;

	var ATKEYWORD = TYPE$b.AtKeyword;
	var SEMICOLON = TYPE$b.Semicolon;
	var LEFTCURLYBRACKET$1 = TYPE$b.LeftCurlyBracket;
	var RIGHTCURLYBRACKET$1 = TYPE$b.RightCurlyBracket;

	function consumeRaw(startToken) {
	    return this.Raw(startToken, rawMode.leftCurlyBracketOrSemicolon, true);
	}

	function isDeclarationBlockAtrule() {
	    for (var offset = 1, type; type = this.scanner.lookupType(offset); offset++) {
	        if (type === RIGHTCURLYBRACKET$1) {
	            return true;
	        }

	        if (type === LEFTCURLYBRACKET$1 ||
	            type === ATKEYWORD) {
	            return false;
	        }
	    }

	    return false;
	}

	var Atrule = {
	    name: 'Atrule',
	    structure: {
	        name: String,
	        prelude: ['AtrulePrelude', 'Raw', null],
	        block: ['Block', null]
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;
	        var name;
	        var nameLowerCase;
	        var prelude = null;
	        var block = null;

	        this.eat(ATKEYWORD);

	        name = this.scanner.substrToCursor(start + 1);
	        nameLowerCase = name.toLowerCase();
	        this.scanner.skipSC();

	        // parse prelude
	        if (this.scanner.eof === false &&
	            this.scanner.tokenType !== LEFTCURLYBRACKET$1 &&
	            this.scanner.tokenType !== SEMICOLON) {
	            if (this.parseAtrulePrelude) {
	                prelude = this.parseWithFallback(this.AtrulePrelude.bind(this, name), consumeRaw);

	                // turn empty AtrulePrelude into null
	                if (prelude.type === 'AtrulePrelude' && prelude.children.head === null) {
	                    prelude = null;
	                }
	            } else {
	                prelude = consumeRaw.call(this, this.scanner.tokenIndex);
	            }

	            this.scanner.skipSC();
	        }

	        switch (this.scanner.tokenType) {
	            case SEMICOLON:
	                this.scanner.next();
	                break;

	            case LEFTCURLYBRACKET$1:
	                if (this.atrule.hasOwnProperty(nameLowerCase) &&
	                    typeof this.atrule[nameLowerCase].block === 'function') {
	                    block = this.atrule[nameLowerCase].block.call(this);
	                } else {
	                    // TODO: should consume block content as Raw?
	                    block = this.Block(isDeclarationBlockAtrule.call(this));
	                }

	                break;
	        }

	        return {
	            type: 'Atrule',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            name: name,
	            prelude: prelude,
	            block: block
	        };
	    },
	    generate: function(node) {
	        this.chunk('@');
	        this.chunk(node.name);

	        if (node.prelude !== null) {
	            this.chunk(' ');
	            this.node(node.prelude);
	        }

	        if (node.block) {
	            this.node(node.block);
	        } else {
	            this.chunk(';');
	        }
	    },
	    walkContext: 'atrule'
	};

	var TYPE$c = tokenizer.TYPE;

	var SEMICOLON$1 = TYPE$c.Semicolon;
	var LEFTCURLYBRACKET$2 = TYPE$c.LeftCurlyBracket;

	var AtrulePrelude = {
	    name: 'AtrulePrelude',
	    structure: {
	        children: [[]]
	    },
	    parse: function(name) {
	        var children = null;

	        if (name !== null) {
	            name = name.toLowerCase();
	        }

	        this.scanner.skipSC();

	        if (this.atrule.hasOwnProperty(name) &&
	            typeof this.atrule[name].prelude === 'function') {
	            // custom consumer
	            children = this.atrule[name].prelude.call(this);
	        } else {
	            // default consumer
	            children = this.readSequence(this.scope.AtrulePrelude);
	        }

	        this.scanner.skipSC();

	        if (this.scanner.eof !== true &&
	            this.scanner.tokenType !== LEFTCURLYBRACKET$2 &&
	            this.scanner.tokenType !== SEMICOLON$1) {
	            this.error('Semicolon or block is expected');
	        }

	        if (children === null) {
	            children = this.createList();
	        }

	        return {
	            type: 'AtrulePrelude',
	            loc: this.getLocationFromList(children),
	            children: children
	        };
	    },
	    generate: function(node) {
	        this.children(node);
	    },
	    walkContext: 'atrulePrelude'
	};

	var TYPE$d = tokenizer.TYPE;

	var IDENT$4 = TYPE$d.Ident;
	var STRING = TYPE$d.String;
	var COLON = TYPE$d.Colon;
	var LEFTSQUAREBRACKET$1 = TYPE$d.LeftSquareBracket;
	var RIGHTSQUAREBRACKET$1 = TYPE$d.RightSquareBracket;
	var DOLLARSIGN = 0x0024;       // U+0024 DOLLAR SIGN ($)
	var ASTERISK$1 = 0x002A;         // U+002A ASTERISK (*)
	var EQUALSSIGN = 0x003D;       // U+003D EQUALS SIGN (=)
	var CIRCUMFLEXACCENT = 0x005E; // U+005E (^)
	var VERTICALLINE$1 = 0x007C;     // U+007C VERTICAL LINE (|)
	var TILDE = 0x007E;            // U+007E TILDE (~)

	function getAttributeName() {
	    if (this.scanner.eof) {
	        this.error('Unexpected end of input');
	    }

	    var start = this.scanner.tokenStart;
	    var expectIdent = false;
	    var checkColon = true;

	    if (this.scanner.isDelim(ASTERISK$1)) {
	        expectIdent = true;
	        checkColon = false;
	        this.scanner.next();
	    } else if (!this.scanner.isDelim(VERTICALLINE$1)) {
	        this.eat(IDENT$4);
	    }

	    if (this.scanner.isDelim(VERTICALLINE$1)) {
	        if (this.scanner.source.charCodeAt(this.scanner.tokenStart + 1) !== EQUALSSIGN) {
	            this.scanner.next();
	            this.eat(IDENT$4);
	        } else if (expectIdent) {
	            this.error('Identifier is expected', this.scanner.tokenEnd);
	        }
	    } else if (expectIdent) {
	        this.error('Vertical line is expected');
	    }

	    if (checkColon && this.scanner.tokenType === COLON) {
	        this.scanner.next();
	        this.eat(IDENT$4);
	    }

	    return {
	        type: 'Identifier',
	        loc: this.getLocation(start, this.scanner.tokenStart),
	        name: this.scanner.substrToCursor(start)
	    };
	}

	function getOperator() {
	    var start = this.scanner.tokenStart;
	    var code = this.scanner.source.charCodeAt(start);

	    if (code !== EQUALSSIGN &&        // =
	        code !== TILDE &&             // ~=
	        code !== CIRCUMFLEXACCENT &&  // ^=
	        code !== DOLLARSIGN &&        // $=
	        code !== ASTERISK$1 &&          // *=
	        code !== VERTICALLINE$1         // |=
	    ) {
	        this.error('Attribute selector (=, ~=, ^=, $=, *=, |=) is expected');
	    }

	    this.scanner.next();

	    if (code !== EQUALSSIGN) {
	        if (!this.scanner.isDelim(EQUALSSIGN)) {
	            this.error('Equal sign is expected');
	        }

	        this.scanner.next();
	    }

	    return this.scanner.substrToCursor(start);
	}

	// '[' <wq-name> ']'
	// '[' <wq-name> <attr-matcher> [ <string-token> | <ident-token> ] <attr-modifier>? ']'
	var AttributeSelector = {
	    name: 'AttributeSelector',
	    structure: {
	        name: 'Identifier',
	        matcher: [String, null],
	        value: ['String', 'Identifier', null],
	        flags: [String, null]
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;
	        var name;
	        var matcher = null;
	        var value = null;
	        var flags = null;

	        this.eat(LEFTSQUAREBRACKET$1);
	        this.scanner.skipSC();

	        name = getAttributeName.call(this);
	        this.scanner.skipSC();

	        if (this.scanner.tokenType !== RIGHTSQUAREBRACKET$1) {
	            // avoid case `[name i]`
	            if (this.scanner.tokenType !== IDENT$4) {
	                matcher = getOperator.call(this);

	                this.scanner.skipSC();

	                value = this.scanner.tokenType === STRING
	                    ? this.String()
	                    : this.Identifier();

	                this.scanner.skipSC();
	            }

	            // attribute flags
	            if (this.scanner.tokenType === IDENT$4) {
	                flags = this.scanner.getTokenValue();
	                this.scanner.next();

	                this.scanner.skipSC();
	            }
	        }

	        this.eat(RIGHTSQUAREBRACKET$1);

	        return {
	            type: 'AttributeSelector',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            name: name,
	            matcher: matcher,
	            value: value,
	            flags: flags
	        };
	    },
	    generate: function(node) {
	        var flagsPrefix = ' ';

	        this.chunk('[');
	        this.node(node.name);

	        if (node.matcher !== null) {
	            this.chunk(node.matcher);

	            if (node.value !== null) {
	                this.node(node.value);

	                // space between string and flags is not required
	                if (node.value.type === 'String') {
	                    flagsPrefix = '';
	                }
	            }
	        }

	        if (node.flags !== null) {
	            this.chunk(flagsPrefix);
	            this.chunk(node.flags);
	        }

	        this.chunk(']');
	    }
	};

	var TYPE$e = tokenizer.TYPE;
	var rawMode$1 = Raw.mode;

	var WHITESPACE$5 = TYPE$e.WhiteSpace;
	var COMMENT$4 = TYPE$e.Comment;
	var SEMICOLON$2 = TYPE$e.Semicolon;
	var ATKEYWORD$1 = TYPE$e.AtKeyword;
	var LEFTCURLYBRACKET$3 = TYPE$e.LeftCurlyBracket;
	var RIGHTCURLYBRACKET$2 = TYPE$e.RightCurlyBracket;

	function consumeRaw$1(startToken) {
	    return this.Raw(startToken, null, true);
	}
	function consumeRule() {
	    return this.parseWithFallback(this.Rule, consumeRaw$1);
	}
	function consumeRawDeclaration(startToken) {
	    return this.Raw(startToken, rawMode$1.semicolonIncluded, true);
	}
	function consumeDeclaration() {
	    if (this.scanner.tokenType === SEMICOLON$2) {
	        return consumeRawDeclaration.call(this, this.scanner.tokenIndex);
	    }

	    var node = this.parseWithFallback(this.Declaration, consumeRawDeclaration);

	    if (this.scanner.tokenType === SEMICOLON$2) {
	        this.scanner.next();
	    }

	    return node;
	}

	var Block = {
	    name: 'Block',
	    structure: {
	        children: [[
	            'Atrule',
	            'Rule',
	            'Declaration'
	        ]]
	    },
	    parse: function(isDeclaration) {
	        var consumer = isDeclaration ? consumeDeclaration : consumeRule;

	        var start = this.scanner.tokenStart;
	        var children = this.createList();

	        this.eat(LEFTCURLYBRACKET$3);

	        scan:
	        while (!this.scanner.eof) {
	            switch (this.scanner.tokenType) {
	                case RIGHTCURLYBRACKET$2:
	                    break scan;

	                case WHITESPACE$5:
	                case COMMENT$4:
	                    this.scanner.next();
	                    break;

	                case ATKEYWORD$1:
	                    children.push(this.parseWithFallback(this.Atrule, consumeRaw$1));
	                    break;

	                default:
	                    children.push(consumer.call(this));
	            }
	        }

	        if (!this.scanner.eof) {
	            this.eat(RIGHTCURLYBRACKET$2);
	        }

	        return {
	            type: 'Block',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            children: children
	        };
	    },
	    generate: function(node) {
	        this.chunk('{');
	        this.children(node, function(prev) {
	            if (prev.type === 'Declaration') {
	                this.chunk(';');
	            }
	        });
	        this.chunk('}');
	    },
	    walkContext: 'block'
	};

	var TYPE$f = tokenizer.TYPE;

	var LEFTSQUAREBRACKET$2 = TYPE$f.LeftSquareBracket;
	var RIGHTSQUAREBRACKET$2 = TYPE$f.RightSquareBracket;

	var Brackets = {
	    name: 'Brackets',
	    structure: {
	        children: [[]]
	    },
	    parse: function(readSequence, recognizer) {
	        var start = this.scanner.tokenStart;
	        var children = null;

	        this.eat(LEFTSQUAREBRACKET$2);

	        children = readSequence.call(this, recognizer);

	        if (!this.scanner.eof) {
	            this.eat(RIGHTSQUAREBRACKET$2);
	        }

	        return {
	            type: 'Brackets',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            children: children
	        };
	    },
	    generate: function(node) {
	        this.chunk('[');
	        this.children(node);
	        this.chunk(']');
	    }
	};

	var CDC = tokenizer.TYPE.CDC;

	var CDC_1 = {
	    name: 'CDC',
	    structure: [],
	    parse: function() {
	        var start = this.scanner.tokenStart;

	        this.eat(CDC); // -->

	        return {
	            type: 'CDC',
	            loc: this.getLocation(start, this.scanner.tokenStart)
	        };
	    },
	    generate: function() {
	        this.chunk('-->');
	    }
	};

	var CDO = tokenizer.TYPE.CDO;

	var CDO_1 = {
	    name: 'CDO',
	    structure: [],
	    parse: function() {
	        var start = this.scanner.tokenStart;

	        this.eat(CDO); // <!--

	        return {
	            type: 'CDO',
	            loc: this.getLocation(start, this.scanner.tokenStart)
	        };
	    },
	    generate: function() {
	        this.chunk('<!--');
	    }
	};

	var TYPE$g = tokenizer.TYPE;

	var IDENT$5 = TYPE$g.Ident;
	var FULLSTOP = 0x002E; // U+002E FULL STOP (.)

	// '.' ident
	var ClassSelector = {
	    name: 'ClassSelector',
	    structure: {
	        name: String
	    },
	    parse: function() {
	        if (!this.scanner.isDelim(FULLSTOP)) {
	            this.error('Full stop is expected');
	        }

	        this.scanner.next();

	        return {
	            type: 'ClassSelector',
	            loc: this.getLocation(this.scanner.tokenStart - 1, this.scanner.tokenEnd),
	            name: this.consume(IDENT$5)
	        };
	    },
	    generate: function(node) {
	        this.chunk('.');
	        this.chunk(node.name);
	    }
	};

	var TYPE$h = tokenizer.TYPE;

	var IDENT$6 = TYPE$h.Ident;
	var PLUSSIGN$4 = 0x002B;        // U+002B PLUS SIGN (+)
	var SOLIDUS = 0x002F;         // U+002F SOLIDUS (/)
	var GREATERTHANSIGN$1 = 0x003E; // U+003E GREATER-THAN SIGN (>)
	var TILDE$1 = 0x007E;           // U+007E TILDE (~)

	// + | > | ~ | /deep/
	var Combinator = {
	    name: 'Combinator',
	    structure: {
	        name: String
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;
	        var code = this.scanner.source.charCodeAt(this.scanner.tokenStart);

	        switch (code) {
	            case GREATERTHANSIGN$1:
	            case PLUSSIGN$4:
	            case TILDE$1:
	                this.scanner.next();
	                break;

	            case SOLIDUS:
	                this.scanner.next();

	                if (this.scanner.tokenType !== IDENT$6 || this.scanner.lookupValue(0, 'deep') === false) {
	                    this.error('Identifier `deep` is expected');
	                }

	                this.scanner.next();

	                if (!this.scanner.isDelim(SOLIDUS)) {
	                    this.error('Solidus is expected');
	                }

	                this.scanner.next();
	                break;

	            default:
	                this.error('Combinator is expected');
	        }

	        return {
	            type: 'Combinator',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            name: this.scanner.substrToCursor(start)
	        };
	    },
	    generate: function(node) {
	        this.chunk(node.name);
	    }
	};

	var TYPE$i = tokenizer.TYPE;

	var COMMENT$5 = TYPE$i.Comment;
	var ASTERISK$2 = 0x002A;        // U+002A ASTERISK (*)
	var SOLIDUS$1 = 0x002F;         // U+002F SOLIDUS (/)

	// '/*' .* '*/'
	var Comment = {
	    name: 'Comment',
	    structure: {
	        value: String
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;
	        var end = this.scanner.tokenEnd;

	        this.eat(COMMENT$5);

	        if ((end - start + 2) >= 2 &&
	            this.scanner.source.charCodeAt(end - 2) === ASTERISK$2 &&
	            this.scanner.source.charCodeAt(end - 1) === SOLIDUS$1) {
	            end -= 2;
	        }

	        return {
	            type: 'Comment',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            value: this.scanner.source.substring(start + 2, end)
	        };
	    },
	    generate: function(node) {
	        this.chunk('/*');
	        this.chunk(node.value);
	        this.chunk('*/');
	    }
	};

	var isCustomProperty$1 = names.isCustomProperty;
	var TYPE$j = tokenizer.TYPE;
	var rawMode$2 = Raw.mode;

	var IDENT$7 = TYPE$j.Ident;
	var HASH$1 = TYPE$j.Hash;
	var COLON$1 = TYPE$j.Colon;
	var SEMICOLON$3 = TYPE$j.Semicolon;
	var DELIM$2 = TYPE$j.Delim;
	var EXCLAMATIONMARK$2 = 0x0021; // U+0021 EXCLAMATION MARK (!)
	var NUMBERSIGN$2 = 0x0023;      // U+0023 NUMBER SIGN (#)
	var DOLLARSIGN$1 = 0x0024;      // U+0024 DOLLAR SIGN ($)
	var AMPERSAND$1 = 0x0026;       // U+0026 ANPERSAND (&)
	var ASTERISK$3 = 0x002A;        // U+002A ASTERISK (*)
	var PLUSSIGN$5 = 0x002B;        // U+002B PLUS SIGN (+)
	var SOLIDUS$2 = 0x002F;         // U+002F SOLIDUS (/)

	function consumeValueRaw(startToken) {
	    return this.Raw(startToken, rawMode$2.exclamationMarkOrSemicolon, true);
	}

	function consumeCustomPropertyRaw(startToken) {
	    return this.Raw(startToken, rawMode$2.exclamationMarkOrSemicolon, false);
	}

	function consumeValue() {
	    var startValueToken = this.scanner.tokenIndex;
	    var value = this.Value();

	    if (value.type !== 'Raw' &&
	        this.scanner.eof === false &&
	        this.scanner.tokenType !== SEMICOLON$3 &&
	        this.scanner.isDelim(EXCLAMATIONMARK$2) === false &&
	        this.scanner.isBalanceEdge(startValueToken) === false) {
	        this.error();
	    }

	    return value;
	}

	var Declaration = {
	    name: 'Declaration',
	    structure: {
	        important: [Boolean, String],
	        property: String,
	        value: ['Value', 'Raw']
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;
	        var startToken = this.scanner.tokenIndex;
	        var property = readProperty$1.call(this);
	        var customProperty = isCustomProperty$1(property);
	        var parseValue = customProperty ? this.parseCustomProperty : this.parseValue;
	        var consumeRaw = customProperty ? consumeCustomPropertyRaw : consumeValueRaw;
	        var important = false;
	        var value;

	        this.scanner.skipSC();
	        this.eat(COLON$1);

	        if (!customProperty) {
	            this.scanner.skipSC();
	        }

	        if (parseValue) {
	            value = this.parseWithFallback(consumeValue, consumeRaw);
	        } else {
	            value = consumeRaw.call(this, this.scanner.tokenIndex);
	        }

	        if (this.scanner.isDelim(EXCLAMATIONMARK$2)) {
	            important = getImportant.call(this);
	            this.scanner.skipSC();
	        }

	        // Do not include semicolon to range per spec
	        // https://drafts.csswg.org/css-syntax/#declaration-diagram

	        if (this.scanner.eof === false &&
	            this.scanner.tokenType !== SEMICOLON$3 &&
	            this.scanner.isBalanceEdge(startToken) === false) {
	            this.error();
	        }

	        return {
	            type: 'Declaration',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            important: important,
	            property: property,
	            value: value
	        };
	    },
	    generate: function(node) {
	        this.chunk(node.property);
	        this.chunk(':');
	        this.node(node.value);

	        if (node.important) {
	            this.chunk(node.important === true ? '!important' : '!' + node.important);
	        }
	    },
	    walkContext: 'declaration'
	};

	function readProperty$1() {
	    var start = this.scanner.tokenStart;

	    // hacks
	    if (this.scanner.tokenType === DELIM$2) {
	        switch (this.scanner.source.charCodeAt(this.scanner.tokenStart)) {
	            case ASTERISK$3:
	            case DOLLARSIGN$1:
	            case PLUSSIGN$5:
	            case NUMBERSIGN$2:
	            case AMPERSAND$1:
	                this.scanner.next();
	                break;

	            // TODO: not sure we should support this hack
	            case SOLIDUS$2:
	                this.scanner.next();
	                if (this.scanner.isDelim(SOLIDUS$2)) {
	                    this.scanner.next();
	                }
	                break;
	        }
	    }

	    if (this.scanner.tokenType === HASH$1) {
	        this.eat(HASH$1);
	    } else {
	        this.eat(IDENT$7);
	    }

	    return this.scanner.substrToCursor(start);
	}

	// ! ws* important
	function getImportant() {
	    this.eat(DELIM$2);
	    this.scanner.skipSC();

	    var important = this.consume(IDENT$7);

	    // store original value in case it differ from `important`
	    // for better original source restoring and hacks like `!ie` support
	    return important === 'important' ? true : important;
	}

	var TYPE$k = tokenizer.TYPE;
	var rawMode$3 = Raw.mode;

	var WHITESPACE$6 = TYPE$k.WhiteSpace;
	var COMMENT$6 = TYPE$k.Comment;
	var SEMICOLON$4 = TYPE$k.Semicolon;

	function consumeRaw$2(startToken) {
	    return this.Raw(startToken, rawMode$3.semicolonIncluded, true);
	}

	var DeclarationList = {
	    name: 'DeclarationList',
	    structure: {
	        children: [[
	            'Declaration'
	        ]]
	    },
	    parse: function() {
	        var children = this.createList();

	        
	        while (!this.scanner.eof) {
	            switch (this.scanner.tokenType) {
	                case WHITESPACE$6:
	                case COMMENT$6:
	                case SEMICOLON$4:
	                    this.scanner.next();
	                    break;

	                default:
	                    children.push(this.parseWithFallback(this.Declaration, consumeRaw$2));
	            }
	        }

	        return {
	            type: 'DeclarationList',
	            loc: this.getLocationFromList(children),
	            children: children
	        };
	    },
	    generate: function(node) {
	        this.children(node, function(prev) {
	            if (prev.type === 'Declaration') {
	                this.chunk(';');
	            }
	        });
	    }
	};

	var consumeNumber$3 = utils$1.consumeNumber;
	var TYPE$l = tokenizer.TYPE;

	var DIMENSION$3 = TYPE$l.Dimension;

	var Dimension = {
	    name: 'Dimension',
	    structure: {
	        value: String,
	        unit: String
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;
	        var numberEnd = consumeNumber$3(this.scanner.source, start);

	        this.eat(DIMENSION$3);

	        return {
	            type: 'Dimension',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            value: this.scanner.source.substring(start, numberEnd),
	            unit: this.scanner.source.substring(numberEnd, this.scanner.tokenStart)
	        };
	    },
	    generate: function(node) {
	        this.chunk(node.value);
	        this.chunk(node.unit);
	    }
	};

	var TYPE$m = tokenizer.TYPE;

	var RIGHTPARENTHESIS$2 = TYPE$m.RightParenthesis;

	// <function-token> <sequence> )
	var _Function = {
	    name: 'Function',
	    structure: {
	        name: String,
	        children: [[]]
	    },
	    parse: function(readSequence, recognizer) {
	        var start = this.scanner.tokenStart;
	        var name = this.consumeFunctionName();
	        var nameLowerCase = name.toLowerCase();
	        var children;

	        children = recognizer.hasOwnProperty(nameLowerCase)
	            ? recognizer[nameLowerCase].call(this, recognizer)
	            : readSequence.call(this, recognizer);

	        if (!this.scanner.eof) {
	            this.eat(RIGHTPARENTHESIS$2);
	        }

	        return {
	            type: 'Function',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            name: name,
	            children: children
	        };
	    },
	    generate: function(node) {
	        this.chunk(node.name);
	        this.chunk('(');
	        this.children(node);
	        this.chunk(')');
	    },
	    walkContext: 'function'
	};

	var TYPE$n = tokenizer.TYPE;

	var HASH$2 = TYPE$n.Hash;

	// '#' ident
	var HexColor = {
	    name: 'HexColor',
	    structure: {
	        value: String
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;

	        this.eat(HASH$2);

	        return {
	            type: 'HexColor',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            value: this.scanner.substrToCursor(start + 1)
	        };
	    },
	    generate: function(node) {
	        this.chunk('#');
	        this.chunk(node.value);
	    }
	};

	var TYPE$o = tokenizer.TYPE;

	var IDENT$8 = TYPE$o.Ident;

	var Identifier = {
	    name: 'Identifier',
	    structure: {
	        name: String
	    },
	    parse: function() {
	        return {
	            type: 'Identifier',
	            loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
	            name: this.consume(IDENT$8)
	        };
	    },
	    generate: function(node) {
	        this.chunk(node.name);
	    }
	};

	var TYPE$p = tokenizer.TYPE;

	var HASH$3 = TYPE$p.Hash;

	// <hash-token>
	var IdSelector = {
	    name: 'IdSelector',
	    structure: {
	        name: String
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;

	        // TODO: check value is an ident
	        this.eat(HASH$3);

	        return {
	            type: 'IdSelector',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            name: this.scanner.substrToCursor(start + 1)
	        };
	    },
	    generate: function(node) {
	        this.chunk('#');
	        this.chunk(node.name);
	    }
	};

	var TYPE$q = tokenizer.TYPE;

	var IDENT$9 = TYPE$q.Ident;
	var NUMBER$4 = TYPE$q.Number;
	var DIMENSION$4 = TYPE$q.Dimension;
	var LEFTPARENTHESIS$2 = TYPE$q.LeftParenthesis;
	var RIGHTPARENTHESIS$3 = TYPE$q.RightParenthesis;
	var COLON$2 = TYPE$q.Colon;
	var DELIM$3 = TYPE$q.Delim;

	var MediaFeature = {
	    name: 'MediaFeature',
	    structure: {
	        name: String,
	        value: ['Identifier', 'Number', 'Dimension', 'Ratio', null]
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;
	        var name;
	        var value = null;

	        this.eat(LEFTPARENTHESIS$2);
	        this.scanner.skipSC();

	        name = this.consume(IDENT$9);
	        this.scanner.skipSC();

	        if (this.scanner.tokenType !== RIGHTPARENTHESIS$3) {
	            this.eat(COLON$2);
	            this.scanner.skipSC();

	            switch (this.scanner.tokenType) {
	                case NUMBER$4:
	                    if (this.lookupNonWSType(1) === DELIM$3) {
	                        value = this.Ratio();
	                    } else {
	                        value = this.Number();
	                    }

	                    break;

	                case DIMENSION$4:
	                    value = this.Dimension();
	                    break;

	                case IDENT$9:
	                    value = this.Identifier();

	                    break;

	                default:
	                    this.error('Number, dimension, ratio or identifier is expected');
	            }

	            this.scanner.skipSC();
	        }

	        this.eat(RIGHTPARENTHESIS$3);

	        return {
	            type: 'MediaFeature',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            name: name,
	            value: value
	        };
	    },
	    generate: function(node) {
	        this.chunk('(');
	        this.chunk(node.name);
	        if (node.value !== null) {
	            this.chunk(':');
	            this.node(node.value);
	        }
	        this.chunk(')');
	    }
	};

	var TYPE$r = tokenizer.TYPE;

	var WHITESPACE$7 = TYPE$r.WhiteSpace;
	var COMMENT$7 = TYPE$r.Comment;
	var IDENT$a = TYPE$r.Ident;
	var LEFTPARENTHESIS$3 = TYPE$r.LeftParenthesis;

	var MediaQuery = {
	    name: 'MediaQuery',
	    structure: {
	        children: [[
	            'Identifier',
	            'MediaFeature',
	            'WhiteSpace'
	        ]]
	    },
	    parse: function() {
	        this.scanner.skipSC();

	        var children = this.createList();
	        var child = null;
	        var space = null;

	        scan:
	        while (!this.scanner.eof) {
	            switch (this.scanner.tokenType) {
	                case COMMENT$7:
	                    this.scanner.next();
	                    continue;

	                case WHITESPACE$7:
	                    space = this.WhiteSpace();
	                    continue;

	                case IDENT$a:
	                    child = this.Identifier();
	                    break;

	                case LEFTPARENTHESIS$3:
	                    child = this.MediaFeature();
	                    break;

	                default:
	                    break scan;
	            }

	            if (space !== null) {
	                children.push(space);
	                space = null;
	            }

	            children.push(child);
	        }

	        if (child === null) {
	            this.error('Identifier or parenthesis is expected');
	        }

	        return {
	            type: 'MediaQuery',
	            loc: this.getLocationFromList(children),
	            children: children
	        };
	    },
	    generate: function(node) {
	        this.children(node);
	    }
	};

	var COMMA$1 = tokenizer.TYPE.Comma;

	var MediaQueryList = {
	    name: 'MediaQueryList',
	    structure: {
	        children: [[
	            'MediaQuery'
	        ]]
	    },
	    parse: function(relative) {
	        var children = this.createList();

	        this.scanner.skipSC();

	        while (!this.scanner.eof) {
	            children.push(this.MediaQuery(relative));

	            if (this.scanner.tokenType !== COMMA$1) {
	                break;
	            }

	            this.scanner.next();
	        }

	        return {
	            type: 'MediaQueryList',
	            loc: this.getLocationFromList(children),
	            children: children
	        };
	    },
	    generate: function(node) {
	        this.children(node, function() {
	            this.chunk(',');
	        });
	    }
	};

	var Nth = {
	    name: 'Nth',
	    structure: {
	        nth: ['AnPlusB', 'Identifier'],
	        selector: ['SelectorList', null]
	    },
	    parse: function(allowOfClause) {
	        this.scanner.skipSC();

	        var start = this.scanner.tokenStart;
	        var end = start;
	        var selector = null;
	        var query;

	        if (this.scanner.lookupValue(0, 'odd') || this.scanner.lookupValue(0, 'even')) {
	            query = this.Identifier();
	        } else {
	            query = this.AnPlusB();
	        }

	        this.scanner.skipSC();

	        if (allowOfClause && this.scanner.lookupValue(0, 'of')) {
	            this.scanner.next();

	            selector = this.SelectorList();

	            if (this.needPositions) {
	                end = this.getLastListNode(selector.children).loc.end.offset;
	            }
	        } else {
	            if (this.needPositions) {
	                end = query.loc.end.offset;
	            }
	        }

	        return {
	            type: 'Nth',
	            loc: this.getLocation(start, end),
	            nth: query,
	            selector: selector
	        };
	    },
	    generate: function(node) {
	        this.node(node.nth);
	        if (node.selector !== null) {
	            this.chunk(' of ');
	            this.node(node.selector);
	        }
	    }
	};

	var NUMBER$5 = tokenizer.TYPE.Number;

	var _Number = {
	    name: 'Number',
	    structure: {
	        value: String
	    },
	    parse: function() {
	        return {
	            type: 'Number',
	            loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
	            value: this.consume(NUMBER$5)
	        };
	    },
	    generate: function(node) {
	        this.chunk(node.value);
	    }
	};

	// '/' | '*' | ',' | ':' | '+' | '-'
	var Operator = {
	    name: 'Operator',
	    structure: {
	        value: String
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;

	        this.scanner.next();

	        return {
	            type: 'Operator',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            value: this.scanner.substrToCursor(start)
	        };
	    },
	    generate: function(node) {
	        this.chunk(node.value);
	    }
	};

	var TYPE$s = tokenizer.TYPE;

	var LEFTPARENTHESIS$4 = TYPE$s.LeftParenthesis;
	var RIGHTPARENTHESIS$4 = TYPE$s.RightParenthesis;

	var Parentheses = {
	    name: 'Parentheses',
	    structure: {
	        children: [[]]
	    },
	    parse: function(readSequence, recognizer) {
	        var start = this.scanner.tokenStart;
	        var children = null;

	        this.eat(LEFTPARENTHESIS$4);

	        children = readSequence.call(this, recognizer);

	        if (!this.scanner.eof) {
	            this.eat(RIGHTPARENTHESIS$4);
	        }

	        return {
	            type: 'Parentheses',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            children: children
	        };
	    },
	    generate: function(node) {
	        this.chunk('(');
	        this.children(node);
	        this.chunk(')');
	    }
	};

	var consumeNumber$4 = utils$1.consumeNumber;
	var TYPE$t = tokenizer.TYPE;

	var PERCENTAGE$1 = TYPE$t.Percentage;

	var Percentage = {
	    name: 'Percentage',
	    structure: {
	        value: String
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;
	        var numberEnd = consumeNumber$4(this.scanner.source, start);

	        this.eat(PERCENTAGE$1);

	        return {
	            type: 'Percentage',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            value: this.scanner.source.substring(start, numberEnd)
	        };
	    },
	    generate: function(node) {
	        this.chunk(node.value);
	        this.chunk('%');
	    }
	};

	var TYPE$u = tokenizer.TYPE;

	var IDENT$b = TYPE$u.Ident;
	var FUNCTION$1 = TYPE$u.Function;
	var COLON$3 = TYPE$u.Colon;
	var RIGHTPARENTHESIS$5 = TYPE$u.RightParenthesis;

	// : [ <ident> | <function-token> <any-value>? ) ]
	var PseudoClassSelector = {
	    name: 'PseudoClassSelector',
	    structure: {
	        name: String,
	        children: [['Raw'], null]
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;
	        var children = null;
	        var name;
	        var nameLowerCase;

	        this.eat(COLON$3);

	        if (this.scanner.tokenType === FUNCTION$1) {
	            name = this.consumeFunctionName();
	            nameLowerCase = name.toLowerCase();

	            if (this.pseudo.hasOwnProperty(nameLowerCase)) {
	                this.scanner.skipSC();
	                children = this.pseudo[nameLowerCase].call(this);
	                this.scanner.skipSC();
	            } else {
	                children = this.createList();
	                children.push(
	                    this.Raw(this.scanner.tokenIndex, null, false)
	                );
	            }

	            this.eat(RIGHTPARENTHESIS$5);
	        } else {
	            name = this.consume(IDENT$b);
	        }

	        return {
	            type: 'PseudoClassSelector',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            name: name,
	            children: children
	        };
	    },
	    generate: function(node) {
	        this.chunk(':');
	        this.chunk(node.name);

	        if (node.children !== null) {
	            this.chunk('(');
	            this.children(node);
	            this.chunk(')');
	        }
	    },
	    walkContext: 'function'
	};

	var TYPE$v = tokenizer.TYPE;

	var IDENT$c = TYPE$v.Ident;
	var FUNCTION$2 = TYPE$v.Function;
	var COLON$4 = TYPE$v.Colon;
	var RIGHTPARENTHESIS$6 = TYPE$v.RightParenthesis;

	// :: [ <ident> | <function-token> <any-value>? ) ]
	var PseudoElementSelector = {
	    name: 'PseudoElementSelector',
	    structure: {
	        name: String,
	        children: [['Raw'], null]
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;
	        var children = null;
	        var name;
	        var nameLowerCase;

	        this.eat(COLON$4);
	        this.eat(COLON$4);

	        if (this.scanner.tokenType === FUNCTION$2) {
	            name = this.consumeFunctionName();
	            nameLowerCase = name.toLowerCase();

	            if (this.pseudo.hasOwnProperty(nameLowerCase)) {
	                this.scanner.skipSC();
	                children = this.pseudo[nameLowerCase].call(this);
	                this.scanner.skipSC();
	            } else {
	                children = this.createList();
	                children.push(
	                    this.Raw(this.scanner.tokenIndex, null, false)
	                );
	            }

	            this.eat(RIGHTPARENTHESIS$6);
	        } else {
	            name = this.consume(IDENT$c);
	        }

	        return {
	            type: 'PseudoElementSelector',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            name: name,
	            children: children
	        };
	    },
	    generate: function(node) {
	        this.chunk('::');
	        this.chunk(node.name);

	        if (node.children !== null) {
	            this.chunk('(');
	            this.children(node);
	            this.chunk(')');
	        }
	    },
	    walkContext: 'function'
	};

	var isDigit$5 = tokenizer.isDigit;
	var TYPE$w = tokenizer.TYPE;

	var NUMBER$6 = TYPE$w.Number;
	var DELIM$4 = TYPE$w.Delim;
	var SOLIDUS$3 = 0x002F;  // U+002F SOLIDUS (/)
	var FULLSTOP$1 = 0x002E; // U+002E FULL STOP (.)

	// Terms of <ratio> should be a positive numbers (not zero or negative)
	// (see https://drafts.csswg.org/mediaqueries-3/#values)
	// However, -o-min-device-pixel-ratio takes fractional values as a ratio's term
	// and this is using by various sites. Therefore we relax checking on parse
	// to test a term is unsigned number without an exponent part.
	// Additional checking may be applied on lexer validation.
	function consumeNumber$5() {
	    this.scanner.skipWS();

	    var value = this.consume(NUMBER$6);

	    for (var i = 0; i < value.length; i++) {
	        var code = value.charCodeAt(i);
	        if (!isDigit$5(code) && code !== FULLSTOP$1) {
	            this.error('Unsigned number is expected', this.scanner.tokenStart - value.length + i);
	        }
	    }

	    if (Number(value) === 0) {
	        this.error('Zero number is not allowed', this.scanner.tokenStart - value.length);
	    }

	    return value;
	}

	// <positive-integer> S* '/' S* <positive-integer>
	var Ratio = {
	    name: 'Ratio',
	    structure: {
	        left: String,
	        right: String
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;
	        var left = consumeNumber$5.call(this);
	        var right;

	        this.scanner.skipWS();

	        if (!this.scanner.isDelim(SOLIDUS$3)) {
	            this.error('Solidus is expected');
	        }
	        this.eat(DELIM$4);
	        right = consumeNumber$5.call(this);

	        return {
	            type: 'Ratio',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            left: left,
	            right: right
	        };
	    },
	    generate: function(node) {
	        this.chunk(node.left);
	        this.chunk('/');
	        this.chunk(node.right);
	    }
	};

	var TYPE$x = tokenizer.TYPE;
	var rawMode$4 = Raw.mode;

	var LEFTCURLYBRACKET$4 = TYPE$x.LeftCurlyBracket;

	function consumeRaw$3(startToken) {
	    return this.Raw(startToken, rawMode$4.leftCurlyBracket, true);
	}

	function consumePrelude() {
	    var prelude = this.SelectorList();

	    if (prelude.type !== 'Raw' &&
	        this.scanner.eof === false &&
	        this.scanner.tokenType !== LEFTCURLYBRACKET$4) {
	        this.error();
	    }

	    return prelude;
	}

	var Rule = {
	    name: 'Rule',
	    structure: {
	        prelude: ['SelectorList', 'Raw'],
	        block: ['Block']
	    },
	    parse: function() {
	        var startToken = this.scanner.tokenIndex;
	        var startOffset = this.scanner.tokenStart;
	        var prelude;
	        var block;

	        if (this.parseRulePrelude) {
	            prelude = this.parseWithFallback(consumePrelude, consumeRaw$3);
	        } else {
	            prelude = consumeRaw$3.call(this, startToken);
	        }

	        block = this.Block(true);

	        return {
	            type: 'Rule',
	            loc: this.getLocation(startOffset, this.scanner.tokenStart),
	            prelude: prelude,
	            block: block
	        };
	    },
	    generate: function(node) {
	        this.node(node.prelude);
	        this.node(node.block);
	    },
	    walkContext: 'rule'
	};

	var Selector = {
	    name: 'Selector',
	    structure: {
	        children: [[
	            'TypeSelector',
	            'IdSelector',
	            'ClassSelector',
	            'AttributeSelector',
	            'PseudoClassSelector',
	            'PseudoElementSelector',
	            'Combinator',
	            'WhiteSpace'
	        ]]
	    },
	    parse: function() {
	        var children = this.readSequence(this.scope.Selector);

	        // nothing were consumed
	        if (this.getFirstListNode(children) === null) {
	            this.error('Selector is expected');
	        }

	        return {
	            type: 'Selector',
	            loc: this.getLocationFromList(children),
	            children: children
	        };
	    },
	    generate: function(node) {
	        this.children(node);
	    }
	};

	var TYPE$y = tokenizer.TYPE;

	var COMMA$2 = TYPE$y.Comma;

	var SelectorList = {
	    name: 'SelectorList',
	    structure: {
	        children: [[
	            'Selector',
	            'Raw'
	        ]]
	    },
	    parse: function() {
	        var children = this.createList();

	        while (!this.scanner.eof) {
	            children.push(this.Selector());

	            if (this.scanner.tokenType === COMMA$2) {
	                this.scanner.next();
	                continue;
	            }

	            break;
	        }

	        return {
	            type: 'SelectorList',
	            loc: this.getLocationFromList(children),
	            children: children
	        };
	    },
	    generate: function(node) {
	        this.children(node, function() {
	            this.chunk(',');
	        });
	    },
	    walkContext: 'selector'
	};

	var STRING$1 = tokenizer.TYPE.String;

	var _String = {
	    name: 'String',
	    structure: {
	        value: String
	    },
	    parse: function() {
	        return {
	            type: 'String',
	            loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
	            value: this.consume(STRING$1)
	        };
	    },
	    generate: function(node) {
	        this.chunk(node.value);
	    }
	};

	var TYPE$z = tokenizer.TYPE;

	var WHITESPACE$8 = TYPE$z.WhiteSpace;
	var COMMENT$8 = TYPE$z.Comment;
	var ATKEYWORD$2 = TYPE$z.AtKeyword;
	var CDO$1 = TYPE$z.CDO;
	var CDC$1 = TYPE$z.CDC;
	var EXCLAMATIONMARK$3 = 0x0021; // U+0021 EXCLAMATION MARK (!)

	function consumeRaw$4(startToken) {
	    return this.Raw(startToken, null, false);
	}

	var StyleSheet = {
	    name: 'StyleSheet',
	    structure: {
	        children: [[
	            'Comment',
	            'CDO',
	            'CDC',
	            'Atrule',
	            'Rule',
	            'Raw'
	        ]]
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;
	        var children = this.createList();
	        var child;

	        
	        while (!this.scanner.eof) {
	            switch (this.scanner.tokenType) {
	                case WHITESPACE$8:
	                    this.scanner.next();
	                    continue;

	                case COMMENT$8:
	                    // ignore comments except exclamation comments (i.e. /*! .. */) on top level
	                    if (this.scanner.source.charCodeAt(this.scanner.tokenStart + 2) !== EXCLAMATIONMARK$3) {
	                        this.scanner.next();
	                        continue;
	                    }

	                    child = this.Comment();
	                    break;

	                case CDO$1: // <!--
	                    child = this.CDO();
	                    break;

	                case CDC$1: // -->
	                    child = this.CDC();
	                    break;

	                // CSS Syntax Module Level 3
	                // §2.2 Error handling
	                // At the "top level" of a stylesheet, an <at-keyword-token> starts an at-rule.
	                case ATKEYWORD$2:
	                    child = this.parseWithFallback(this.Atrule, consumeRaw$4);
	                    break;

	                // Anything else starts a qualified rule ...
	                default:
	                    child = this.parseWithFallback(this.Rule, consumeRaw$4);
	            }

	            children.push(child);
	        }

	        return {
	            type: 'StyleSheet',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            children: children
	        };
	    },
	    generate: function(node) {
	        this.children(node);
	    },
	    walkContext: 'stylesheet'
	};

	var TYPE$A = tokenizer.TYPE;

	var IDENT$d = TYPE$A.Ident;
	var ASTERISK$4 = 0x002A;     // U+002A ASTERISK (*)
	var VERTICALLINE$2 = 0x007C; // U+007C VERTICAL LINE (|)

	function eatIdentifierOrAsterisk() {
	    if (this.scanner.tokenType !== IDENT$d &&
	        this.scanner.isDelim(ASTERISK$4) === false) {
	        this.error('Identifier or asterisk is expected');
	    }

	    this.scanner.next();
	}

	// ident
	// ident|ident
	// ident|*
	// *
	// *|ident
	// *|*
	// |ident
	// |*
	var TypeSelector = {
	    name: 'TypeSelector',
	    structure: {
	        name: String
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;

	        if (this.scanner.isDelim(VERTICALLINE$2)) {
	            this.scanner.next();
	            eatIdentifierOrAsterisk.call(this);
	        } else {
	            eatIdentifierOrAsterisk.call(this);

	            if (this.scanner.isDelim(VERTICALLINE$2)) {
	                this.scanner.next();
	                eatIdentifierOrAsterisk.call(this);
	            }
	        }

	        return {
	            type: 'TypeSelector',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            name: this.scanner.substrToCursor(start)
	        };
	    },
	    generate: function(node) {
	        this.chunk(node.name);
	    }
	};

	var isHexDigit$4 = tokenizer.isHexDigit;
	var cmpChar$4 = tokenizer.cmpChar;
	var TYPE$B = tokenizer.TYPE;
	var NAME$3 = tokenizer.NAME;

	var IDENT$e = TYPE$B.Ident;
	var NUMBER$7 = TYPE$B.Number;
	var DIMENSION$5 = TYPE$B.Dimension;
	var PLUSSIGN$6 = 0x002B;     // U+002B PLUS SIGN (+)
	var HYPHENMINUS$4 = 0x002D;  // U+002D HYPHEN-MINUS (-)
	var QUESTIONMARK$2 = 0x003F; // U+003F QUESTION MARK (?)
	var U$1 = 0x0075;            // U+0075 LATIN SMALL LETTER U (u)

	function eatHexSequence(offset, allowDash) {
	    for (var pos = this.scanner.tokenStart + offset, len = 0; pos < this.scanner.tokenEnd; pos++) {
	        var code = this.scanner.source.charCodeAt(pos);

	        if (code === HYPHENMINUS$4 && allowDash && len !== 0) {
	            if (eatHexSequence.call(this, offset + len + 1, false) === 0) {
	                this.error();
	            }

	            return -1;
	        }

	        if (!isHexDigit$4(code)) {
	            this.error(
	                allowDash && len !== 0
	                    ? 'HyphenMinus' + (len < 6 ? ' or hex digit' : '') + ' is expected'
	                    : (len < 6 ? 'Hex digit is expected' : 'Unexpected input'),
	                pos
	            );
	        }

	        if (++len > 6) {
	            this.error('Too many hex digits', pos);
	        }    }

	    this.scanner.next();
	    return len;
	}

	function eatQuestionMarkSequence(max) {
	    var count = 0;

	    while (this.scanner.isDelim(QUESTIONMARK$2)) {
	        if (++count > max) {
	            this.error('Too many question marks');
	        }

	        this.scanner.next();
	    }
	}

	function startsWith$1(code) {
	    if (this.scanner.source.charCodeAt(this.scanner.tokenStart) !== code) {
	        this.error(NAME$3[code] + ' is expected');
	    }
	}

	// https://drafts.csswg.org/css-syntax/#urange
	// Informally, the <urange> production has three forms:
	// U+0001
	//      Defines a range consisting of a single code point, in this case the code point "1".
	// U+0001-00ff
	//      Defines a range of codepoints between the first and the second value, in this case
	//      the range between "1" and "ff" (255 in decimal) inclusive.
	// U+00??
	//      Defines a range of codepoints where the "?" characters range over all hex digits,
	//      in this case defining the same as the value U+0000-00ff.
	// In each form, a maximum of 6 digits is allowed for each hexadecimal number (if you treat "?" as a hexadecimal digit).
	//
	// <urange> =
	//   u '+' <ident-token> '?'* |
	//   u <dimension-token> '?'* |
	//   u <number-token> '?'* |
	//   u <number-token> <dimension-token> |
	//   u <number-token> <number-token> |
	//   u '+' '?'+
	function scanUnicodeRange() {
	    var hexLength = 0;

	    // u '+' <ident-token> '?'*
	    // u '+' '?'+
	    if (this.scanner.isDelim(PLUSSIGN$6)) {
	        this.scanner.next();

	        if (this.scanner.tokenType === IDENT$e) {
	            hexLength = eatHexSequence.call(this, 0, true);
	            if (hexLength > 0) {
	                eatQuestionMarkSequence.call(this, 6 - hexLength);
	            }
	            return;
	        }

	        if (this.scanner.isDelim(QUESTIONMARK$2)) {
	            this.scanner.next();
	            eatQuestionMarkSequence.call(this, 5);
	            return;
	        }

	        this.error('Hex digit or question mark is expected');
	        return;
	    }

	    // u <number-token> '?'*
	    // u <number-token> <dimension-token>
	    // u <number-token> <number-token>
	    if (this.scanner.tokenType === NUMBER$7) {
	        startsWith$1.call(this, PLUSSIGN$6);
	        hexLength = eatHexSequence.call(this, 1, true);

	        if (this.scanner.isDelim(QUESTIONMARK$2)) {
	            eatQuestionMarkSequence.call(this, 6 - hexLength);
	            return;
	        }

	        if (this.scanner.tokenType === DIMENSION$5 ||
	            this.scanner.tokenType === NUMBER$7) {
	            startsWith$1.call(this, HYPHENMINUS$4);
	            eatHexSequence.call(this, 1, false);
	            return;
	        }

	        return;
	    }

	    // u <dimension-token> '?'*
	    if (this.scanner.tokenType === DIMENSION$5) {
	        startsWith$1.call(this, PLUSSIGN$6);
	        hexLength = eatHexSequence.call(this, 1, true);

	        if (hexLength > 0) {
	            eatQuestionMarkSequence.call(this, 6 - hexLength);
	        }

	        return;
	    }

	    this.error();
	}

	var UnicodeRange = {
	    name: 'UnicodeRange',
	    structure: {
	        value: String
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;

	        // U or u
	        if (!cmpChar$4(this.scanner.source, start, U$1)) {
	            this.error('U is expected');
	        }

	        if (!cmpChar$4(this.scanner.source, start + 1, PLUSSIGN$6)) {
	            this.error('Plus sign is expected');
	        }

	        this.scanner.next();
	        scanUnicodeRange.call(this);

	        return {
	            type: 'UnicodeRange',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            value: this.scanner.substrToCursor(start)
	        };
	    },
	    generate: function(node) {
	        this.chunk(node.value);
	    }
	};

	var isWhiteSpace$2 = tokenizer.isWhiteSpace;
	var cmpStr$4 = tokenizer.cmpStr;
	var TYPE$C = tokenizer.TYPE;

	var FUNCTION$3 = TYPE$C.Function;
	var URL$2 = TYPE$C.Url;
	var RIGHTPARENTHESIS$7 = TYPE$C.RightParenthesis;

	// <url-token> | <function-token> <string> )
	var Url = {
	    name: 'Url',
	    structure: {
	        value: ['String', 'Raw']
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;
	        var value;

	        switch (this.scanner.tokenType) {
	            case URL$2:
	                var rawStart = start + 4;
	                var rawEnd = this.scanner.tokenEnd - 1;

	                while (rawStart < rawEnd && isWhiteSpace$2(this.scanner.source.charCodeAt(rawStart))) {
	                    rawStart++;
	                }

	                while (rawStart < rawEnd && isWhiteSpace$2(this.scanner.source.charCodeAt(rawEnd - 1))) {
	                    rawEnd--;
	                }

	                value = {
	                    type: 'Raw',
	                    loc: this.getLocation(rawStart, rawEnd),
	                    value: this.scanner.source.substring(rawStart, rawEnd)
	                };

	                this.eat(URL$2);
	                break;

	            case FUNCTION$3:
	                if (!cmpStr$4(this.scanner.source, this.scanner.tokenStart, this.scanner.tokenEnd, 'url(')) {
	                    this.error('Function name must be `url`');
	                }

	                this.eat(FUNCTION$3);
	                this.scanner.skipSC();
	                value = this.String();
	                this.scanner.skipSC();
	                this.eat(RIGHTPARENTHESIS$7);
	                break;

	            default:
	                this.error('Url or Function is expected');
	        }

	        return {
	            type: 'Url',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            value: value
	        };
	    },
	    generate: function(node) {
	        this.chunk('url');
	        this.chunk('(');
	        this.node(node.value);
	        this.chunk(')');
	    }
	};

	var Value = {
	    name: 'Value',
	    structure: {
	        children: [[]]
	    },
	    parse: function() {
	        var start = this.scanner.tokenStart;
	        var children = this.readSequence(this.scope.Value);

	        return {
	            type: 'Value',
	            loc: this.getLocation(start, this.scanner.tokenStart),
	            children: children
	        };
	    },
	    generate: function(node) {
	        this.children(node);
	    }
	};

	var WHITESPACE$9 = tokenizer.TYPE.WhiteSpace;
	var SPACE$2 = Object.freeze({
	    type: 'WhiteSpace',
	    loc: null,
	    value: ' '
	});

	var WhiteSpace$1 = {
	    name: 'WhiteSpace',
	    structure: {
	        value: String
	    },
	    parse: function() {
	        this.eat(WHITESPACE$9);
	        return SPACE$2;

	        // return {
	        //     type: 'WhiteSpace',
	        //     loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
	        //     value: this.consume(WHITESPACE)
	        // };
	    },
	    generate: function(node) {
	        this.chunk(node.value);
	    }
	};

	var node = {
	    AnPlusB: AnPlusB,
	    Atrule: Atrule,
	    AtrulePrelude: AtrulePrelude,
	    AttributeSelector: AttributeSelector,
	    Block: Block,
	    Brackets: Brackets,
	    CDC: CDC_1,
	    CDO: CDO_1,
	    ClassSelector: ClassSelector,
	    Combinator: Combinator,
	    Comment: Comment,
	    Declaration: Declaration,
	    DeclarationList: DeclarationList,
	    Dimension: Dimension,
	    Function: _Function,
	    HexColor: HexColor,
	    Identifier: Identifier,
	    IdSelector: IdSelector,
	    MediaFeature: MediaFeature,
	    MediaQuery: MediaQuery,
	    MediaQueryList: MediaQueryList,
	    Nth: Nth,
	    Number: _Number,
	    Operator: Operator,
	    Parentheses: Parentheses,
	    Percentage: Percentage,
	    PseudoClassSelector: PseudoClassSelector,
	    PseudoElementSelector: PseudoElementSelector,
	    Ratio: Ratio,
	    Raw: Raw,
	    Rule: Rule,
	    Selector: Selector,
	    SelectorList: SelectorList,
	    String: _String,
	    StyleSheet: StyleSheet,
	    TypeSelector: TypeSelector,
	    UnicodeRange: UnicodeRange,
	    Url: Url,
	    Value: Value,
	    WhiteSpace: WhiteSpace$1
	};

	var lexer = {
	    generic: true,
	    types: data.types,
	    atrules: data.atrules,
	    properties: data.properties,
	    node: node
	};

	var cmpChar$5 = tokenizer.cmpChar;
	var cmpStr$5 = tokenizer.cmpStr;
	var TYPE$D = tokenizer.TYPE;

	var IDENT$f = TYPE$D.Ident;
	var STRING$2 = TYPE$D.String;
	var NUMBER$8 = TYPE$D.Number;
	var FUNCTION$4 = TYPE$D.Function;
	var URL$3 = TYPE$D.Url;
	var HASH$4 = TYPE$D.Hash;
	var DIMENSION$6 = TYPE$D.Dimension;
	var PERCENTAGE$2 = TYPE$D.Percentage;
	var LEFTPARENTHESIS$5 = TYPE$D.LeftParenthesis;
	var LEFTSQUAREBRACKET$3 = TYPE$D.LeftSquareBracket;
	var COMMA$3 = TYPE$D.Comma;
	var DELIM$5 = TYPE$D.Delim;
	var NUMBERSIGN$3 = 0x0023;  // U+0023 NUMBER SIGN (#)
	var ASTERISK$5 = 0x002A;    // U+002A ASTERISK (*)
	var PLUSSIGN$7 = 0x002B;    // U+002B PLUS SIGN (+)
	var HYPHENMINUS$5 = 0x002D; // U+002D HYPHEN-MINUS (-)
	var SOLIDUS$4 = 0x002F;     // U+002F SOLIDUS (/)
	var U$2 = 0x0075;           // U+0075 LATIN SMALL LETTER U (u)

	var _default = function defaultRecognizer(context) {
	    switch (this.scanner.tokenType) {
	        case HASH$4:
	            return this.HexColor();

	        case COMMA$3:
	            context.space = null;
	            context.ignoreWSAfter = true;
	            return this.Operator();

	        case LEFTPARENTHESIS$5:
	            return this.Parentheses(this.readSequence, context.recognizer);

	        case LEFTSQUAREBRACKET$3:
	            return this.Brackets(this.readSequence, context.recognizer);

	        case STRING$2:
	            return this.String();

	        case DIMENSION$6:
	            return this.Dimension();

	        case PERCENTAGE$2:
	            return this.Percentage();

	        case NUMBER$8:
	            return this.Number();

	        case FUNCTION$4:
	            return cmpStr$5(this.scanner.source, this.scanner.tokenStart, this.scanner.tokenEnd, 'url(')
	                ? this.Url()
	                : this.Function(this.readSequence, context.recognizer);

	        case URL$3:
	            return this.Url();

	        case IDENT$f:
	            // check for unicode range, it should start with u+ or U+
	            if (cmpChar$5(this.scanner.source, this.scanner.tokenStart, U$2) &&
	                cmpChar$5(this.scanner.source, this.scanner.tokenStart + 1, PLUSSIGN$7)) {
	                return this.UnicodeRange();
	            } else {
	                return this.Identifier();
	            }

	        case DELIM$5:
	            var code = this.scanner.source.charCodeAt(this.scanner.tokenStart);

	            if (code === SOLIDUS$4 ||
	                code === ASTERISK$5 ||
	                code === PLUSSIGN$7 ||
	                code === HYPHENMINUS$5) {
	                return this.Operator(); // TODO: replace with Delim
	            }

	            // TODO: produce a node with Delim node type

	            if (code === NUMBERSIGN$3) {
	                this.error('Hex or identifier is expected', this.scanner.tokenStart + 1);
	            }

	            break;
	    }
	};

	var atrulePrelude = {
	    getNode: _default
	};

	var TYPE$E = tokenizer.TYPE;

	var DELIM$6 = TYPE$E.Delim;
	var IDENT$g = TYPE$E.Ident;
	var DIMENSION$7 = TYPE$E.Dimension;
	var PERCENTAGE$3 = TYPE$E.Percentage;
	var NUMBER$9 = TYPE$E.Number;
	var HASH$5 = TYPE$E.Hash;
	var COLON$5 = TYPE$E.Colon;
	var LEFTSQUAREBRACKET$4 = TYPE$E.LeftSquareBracket;
	var NUMBERSIGN$4 = 0x0023;      // U+0023 NUMBER SIGN (#)
	var ASTERISK$6 = 0x002A;        // U+002A ASTERISK (*)
	var PLUSSIGN$8 = 0x002B;        // U+002B PLUS SIGN (+)
	var SOLIDUS$5 = 0x002F;         // U+002F SOLIDUS (/)
	var FULLSTOP$2 = 0x002E;        // U+002E FULL STOP (.)
	var GREATERTHANSIGN$2 = 0x003E; // U+003E GREATER-THAN SIGN (>)
	var VERTICALLINE$3 = 0x007C;    // U+007C VERTICAL LINE (|)
	var TILDE$2 = 0x007E;           // U+007E TILDE (~)

	function getNode(context) {
	    switch (this.scanner.tokenType) {
	        case LEFTSQUAREBRACKET$4:
	            return this.AttributeSelector();

	        case HASH$5:
	            return this.IdSelector();

	        case COLON$5:
	            if (this.scanner.lookupType(1) === COLON$5) {
	                return this.PseudoElementSelector();
	            } else {
	                return this.PseudoClassSelector();
	            }

	        case IDENT$g:
	            return this.TypeSelector();

	        case NUMBER$9:
	        case PERCENTAGE$3:
	            return this.Percentage();

	        case DIMENSION$7:
	            // throws when .123ident
	            if (this.scanner.source.charCodeAt(this.scanner.tokenStart) === FULLSTOP$2) {
	                this.error('Identifier is expected', this.scanner.tokenStart + 1);
	            }
	            break;

	        case DELIM$6:
	            var code = this.scanner.source.charCodeAt(this.scanner.tokenStart);

	            switch (code) {
	                case PLUSSIGN$8:
	                case GREATERTHANSIGN$2:
	                case TILDE$2:
	                    context.space = null;
	                    context.ignoreWSAfter = true;
	                    return this.Combinator();

	                case SOLIDUS$5:  // /deep/
	                    return this.Combinator();

	                case FULLSTOP$2:
	                    return this.ClassSelector();

	                case ASTERISK$6:
	                case VERTICALLINE$3:
	                    return this.TypeSelector();

	                case NUMBERSIGN$4:
	                    return this.IdSelector();
	            }

	            break;
	    }
	}
	var selector = {
	    getNode: getNode
	};

	// https://drafts.csswg.org/css-images-4/#element-notation
	// https://developer.mozilla.org/en-US/docs/Web/CSS/element
	var element = function() {
	    this.scanner.skipSC();

	    var children = this.createSingleNodeList(
	        this.IdSelector()
	    );

	    this.scanner.skipSC();

	    return children;
	};

	// legacy IE function
	// expression( <any-value> )
	var expression = function() {
	    return this.createSingleNodeList(
	        this.Raw(this.scanner.tokenIndex, null, false)
	    );
	};

	var TYPE$F = tokenizer.TYPE;
	var rawMode$5 = Raw.mode;

	var COMMA$4 = TYPE$F.Comma;

	// var( <ident> , <value>? )
	var _var = function() {
	    var children = this.createList();

	    this.scanner.skipSC();

	    // NOTE: Don't check more than a first argument is an ident, rest checks are for lexer
	    children.push(this.Identifier());

	    this.scanner.skipSC();

	    if (this.scanner.tokenType === COMMA$4) {
	        children.push(this.Operator());
	        children.push(this.parseCustomProperty
	            ? this.Value(null)
	            : this.Raw(this.scanner.tokenIndex, rawMode$5.exclamationMarkOrSemicolon, false)
	        );
	    }

	    return children;
	};

	var value = {
	    getNode: _default,
	    '-moz-element': element,
	    'element': element,
	    'expression': expression,
	    'var': _var
	};

	var scope = {
	    AtrulePrelude: atrulePrelude,
	    Selector: selector,
	    Value: value
	};

	var fontFace = {
	    parse: {
	        prelude: null,
	        block: function() {
	            return this.Block(true);
	        }
	    }
	};

	var TYPE$G = tokenizer.TYPE;

	var STRING$3 = TYPE$G.String;
	var IDENT$h = TYPE$G.Ident;
	var URL$4 = TYPE$G.Url;
	var FUNCTION$5 = TYPE$G.Function;
	var LEFTPARENTHESIS$6 = TYPE$G.LeftParenthesis;

	var _import = {
	    parse: {
	        prelude: function() {
	            var children = this.createList();

	            this.scanner.skipSC();

	            switch (this.scanner.tokenType) {
	                case STRING$3:
	                    children.push(this.String());
	                    break;

	                case URL$4:
	                case FUNCTION$5:
	                    children.push(this.Url());
	                    break;

	                default:
	                    this.error('String or url() is expected');
	            }

	            if (this.lookupNonWSType(0) === IDENT$h ||
	                this.lookupNonWSType(0) === LEFTPARENTHESIS$6) {
	                children.push(this.WhiteSpace());
	                children.push(this.MediaQueryList());
	            }

	            return children;
	        },
	        block: null
	    }
	};

	var media = {
	    parse: {
	        prelude: function() {
	            return this.createSingleNodeList(
	                this.MediaQueryList()
	            );
	        },
	        block: function() {
	            return this.Block(false);
	        }
	    }
	};

	var page$1 = {
	    parse: {
	        prelude: function() {
	            return this.createSingleNodeList(
	                this.SelectorList()
	            );
	        },
	        block: function() {
	            return this.Block(true);
	        }
	    }
	};

	var TYPE$H = tokenizer.TYPE;

	var WHITESPACE$a = TYPE$H.WhiteSpace;
	var COMMENT$9 = TYPE$H.Comment;
	var IDENT$i = TYPE$H.Ident;
	var FUNCTION$6 = TYPE$H.Function;
	var COLON$6 = TYPE$H.Colon;
	var LEFTPARENTHESIS$7 = TYPE$H.LeftParenthesis;

	function consumeRaw$5() {
	    return this.createSingleNodeList(
	        this.Raw(this.scanner.tokenIndex, null, false)
	    );
	}

	function parentheses() {
	    this.scanner.skipSC();

	    if (this.scanner.tokenType === IDENT$i &&
	        this.lookupNonWSType(1) === COLON$6) {
	        return this.createSingleNodeList(
	            this.Declaration()
	        );
	    }

	    return readSequence.call(this);
	}

	function readSequence() {
	    var children = this.createList();
	    var space = null;
	    var child;

	    this.scanner.skipSC();

	    scan:
	    while (!this.scanner.eof) {
	        switch (this.scanner.tokenType) {
	            case WHITESPACE$a:
	                space = this.WhiteSpace();
	                continue;

	            case COMMENT$9:
	                this.scanner.next();
	                continue;

	            case FUNCTION$6:
	                child = this.Function(consumeRaw$5, this.scope.AtrulePrelude);
	                break;

	            case IDENT$i:
	                child = this.Identifier();
	                break;

	            case LEFTPARENTHESIS$7:
	                child = this.Parentheses(parentheses, this.scope.AtrulePrelude);
	                break;

	            default:
	                break scan;
	        }

	        if (space !== null) {
	            children.push(space);
	            space = null;
	        }

	        children.push(child);
	    }

	    return children;
	}

	var supports = {
	    parse: {
	        prelude: function() {
	            var children = readSequence.call(this);

	            if (this.getFirstListNode(children) === null) {
	                this.error('Condition is expected');
	            }

	            return children;
	        },
	        block: function() {
	            return this.Block(false);
	        }
	    }
	};

	var atrule = {
	    'font-face': fontFace,
	    'import': _import,
	    'media': media,
	    'page': page$1,
	    'supports': supports
	};

	var dir = {
	    parse: function() {
	        return this.createSingleNodeList(
	            this.Identifier()
	        );
	    }
	};

	var has$1 = {
	    parse: function() {
	        return this.createSingleNodeList(
	            this.SelectorList()
	        );
	    }
	};

	var lang = {
	    parse: function() {
	        return this.createSingleNodeList(
	            this.Identifier()
	        );
	    }
	};

	var selectorList = {
	    parse: function selectorList() {
	        return this.createSingleNodeList(
	            this.SelectorList()
	        );
	    }
	};

	var matches = selectorList;

	var not = selectorList;

	var ALLOW_OF_CLAUSE = true;

	var nthWithOfClause = {
	    parse: function nthWithOfClause() {
	        return this.createSingleNodeList(
	            this.Nth(ALLOW_OF_CLAUSE)
	        );
	    }
	};

	var nthChild = nthWithOfClause;

	var nthLastChild = nthWithOfClause;

	var DISALLOW_OF_CLAUSE = false;

	var nth$1 = {
	    parse: function nth() {
	        return this.createSingleNodeList(
	            this.Nth(DISALLOW_OF_CLAUSE)
	        );
	    }
	};

	var nthLastOfType = nth$1;

	var nthOfType = nth$1;

	var slotted = {
	    parse: function compoundSelector() {
	        return this.createSingleNodeList(
	            this.Selector()
	        );
	    }
	};

	var pseudo = {
	    'dir': dir,
	    'has': has$1,
	    'lang': lang,
	    'matches': matches,
	    'not': not,
	    'nth-child': nthChild,
	    'nth-last-child': nthLastChild,
	    'nth-last-of-type': nthLastOfType,
	    'nth-of-type': nthOfType,
	    'slotted': slotted
	};

	var parser$1 = {
	    parseContext: {
	        default: 'StyleSheet',
	        stylesheet: 'StyleSheet',
	        atrule: 'Atrule',
	        atrulePrelude: function(options) {
	            return this.AtrulePrelude(options.atrule ? String(options.atrule) : null);
	        },
	        mediaQueryList: 'MediaQueryList',
	        mediaQuery: 'MediaQuery',
	        rule: 'Rule',
	        selectorList: 'SelectorList',
	        selector: 'Selector',
	        block: function() {
	            return this.Block(true);
	        },
	        declarationList: 'DeclarationList',
	        declaration: 'Declaration',
	        value: 'Value'
	    },
	    scope: scope,
	    atrule: atrule,
	    pseudo: pseudo,
	    node: node
	};

	var walker = {
	    node: node
	};

	function merge() {
	    var dest = {};

	    for (var i = 0; i < arguments.length; i++) {
	        var src = arguments[i];
	        for (var key in src) {
	            dest[key] = src[key];
	        }
	    }

	    return dest;
	}

	var syntax = create$5.create(
	    merge(
	        lexer,
	        parser$1,
	        walker
	    )
	);

	var lib = syntax;

	var sheet = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _regenerator = interopRequireDefault(regenerator);

	var _asyncToGenerator2 = interopRequireDefault(asyncToGenerator);

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _cssTree = interopRequireDefault(lib);



	var _hook = interopRequireDefault(hook);

	var Sheet =
	/*#__PURE__*/
	function () {
	  function Sheet(url, hooks) {
	    (0, _classCallCheck2["default"])(this, Sheet);

	    if (hooks) {
	      this.hooks = hooks;
	    } else {
	      this.hooks = {};
	      this.hooks.onUrl = new _hook["default"](this);
	      this.hooks.onAtPage = new _hook["default"](this);
	      this.hooks.onAtMedia = new _hook["default"](this);
	      this.hooks.onRule = new _hook["default"](this);
	      this.hooks.onDeclaration = new _hook["default"](this);
	      this.hooks.onSelector = new _hook["default"](this);
	      this.hooks.onPseudoSelector = new _hook["default"](this);
	      this.hooks.onContent = new _hook["default"](this);
	      this.hooks.onImport = new _hook["default"](this);
	      this.hooks.beforeTreeParse = new _hook["default"](this);
	      this.hooks.beforeTreeWalk = new _hook["default"](this);
	      this.hooks.afterTreeWalk = new _hook["default"](this);
	    }

	    try {
	      this.url = new URL(url, window.location.href);
	    } catch (e) {
	      this.url = new URL(window.location.href);
	    }
	  } // parse


	  (0, _createClass2["default"])(Sheet, [{
	    key: "parse",
	    value: function () {
	      var _parse = (0, _asyncToGenerator2["default"])(
	      /*#__PURE__*/
	      _regenerator["default"].mark(function _callee(text) {
	        return _regenerator["default"].wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                this.text = text;
	                _context.next = 3;
	                return this.hooks.beforeTreeParse.trigger(this.text, this);

	              case 3:
	                // send to csstree
	                this.ast = _cssTree["default"].parse(this._text);
	                _context.next = 6;
	                return this.hooks.beforeTreeWalk.trigger(this.ast);

	              case 6:
	                // Replace urls
	                this.replaceUrls(this.ast); // Scope

	                this.id = (0, utils.UUID)(); // this.addScope(this.ast, this.uuid);
	                // Replace IDs with data-id

	                this.replaceIds(this.ast);
	                this.imported = []; // Trigger Hooks

	                this.urls(this.ast);
	                this.rules(this.ast);
	                this.atrules(this.ast);
	                _context.next = 15;
	                return this.hooks.afterTreeWalk.trigger(this.ast, this);

	              case 15:
	                return _context.abrupt("return", this.ast);

	              case 16:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function parse(_x) {
	        return _parse.apply(this, arguments);
	      }

	      return parse;
	    }()
	  }, {
	    key: "insertRule",
	    value: function insertRule(rule) {
	      var _this = this;

	      var inserted = this.ast.children.appendData(rule);
	      inserted.forEach(function (item) {
	        _this.declarations(item);
	      });
	    }
	  }, {
	    key: "urls",
	    value: function urls(ast) {
	      var _this2 = this;

	      _cssTree["default"].walk(ast, {
	        visit: "Url",
	        enter: function enter(node, item, list) {
	          _this2.hooks.onUrl.trigger(node, item, list);
	        }
	      });
	    }
	  }, {
	    key: "atrules",
	    value: function atrules(ast) {
	      var _this3 = this;

	      _cssTree["default"].walk(ast, {
	        visit: "Atrule",
	        enter: function enter(node, item, list) {
	          var basename = _cssTree["default"].keyword(node.name).basename;

	          if (basename === "page") {
	            _this3.hooks.onAtPage.trigger(node, item, list);

	            _this3.declarations(node, item, list);
	          }

	          if (basename === "media") {
	            _this3.hooks.onAtMedia.trigger(node, item, list);

	            _this3.declarations(node, item, list);
	          }

	          if (basename === "import") {
	            _this3.hooks.onImport.trigger(node, item, list);

	            _this3.imports(node, item, list);
	          }
	        }
	      });
	    }
	  }, {
	    key: "rules",
	    value: function rules(ast) {
	      var _this4 = this;

	      _cssTree["default"].walk(ast, {
	        visit: "Rule",
	        enter: function enter(ruleNode, ruleItem, rulelist) {
	          // console.log("rule", ruleNode);
	          _this4.hooks.onRule.trigger(ruleNode, ruleItem, rulelist);

	          _this4.declarations(ruleNode, ruleItem, rulelist);

	          _this4.onSelector(ruleNode, ruleItem, rulelist);
	        }
	      });
	    }
	  }, {
	    key: "declarations",
	    value: function declarations(ruleNode, ruleItem, rulelist) {
	      var _this5 = this;

	      _cssTree["default"].walk(ruleNode, {
	        visit: "Declaration",
	        enter: function enter(declarationNode, dItem, dList) {
	          // console.log(declarationNode);
	          _this5.hooks.onDeclaration.trigger(declarationNode, dItem, dList, {
	            ruleNode: ruleNode,
	            ruleItem: ruleItem,
	            rulelist: rulelist
	          });

	          if (declarationNode.property === "content") {
	            _cssTree["default"].walk(declarationNode, {
	              visit: "Function",
	              enter: function enter(funcNode, fItem, fList) {
	                _this5.hooks.onContent.trigger(funcNode, fItem, fList, {
	                  declarationNode: declarationNode,
	                  dItem: dItem,
	                  dList: dList
	                }, {
	                  ruleNode: ruleNode,
	                  ruleItem: ruleItem,
	                  rulelist: rulelist
	                });
	              }
	            });
	          }
	        }
	      });
	    } // add pseudo elements to parser

	  }, {
	    key: "onSelector",
	    value: function onSelector(ruleNode, ruleItem, rulelist) {
	      var _this6 = this;

	      _cssTree["default"].walk(ruleNode, {
	        visit: "Selector",
	        enter: function enter(selectNode, selectItem, selectList) {
	          // console.log(selectNode);
	          _this6.hooks.onSelector.trigger(selectNode, selectItem, selectList, {
	            ruleNode: ruleNode,
	            ruleItem: ruleItem,
	            rulelist: rulelist
	          });

	          if (selectNode.children.forEach(function (node) {
	            if (node.type === "PseudoElementSelector") {
	              _cssTree["default"].walk(node, {
	                visit: "PseudoElementSelector",
	                enter: function enter(pseudoNode, pItem, pList) {
	                  _this6.hooks.onPseudoSelector.trigger(pseudoNode, pItem, pList, {
	                    selectNode: selectNode,
	                    selectItem: selectItem,
	                    selectList: selectList
	                  }, {
	                    ruleNode: ruleNode,
	                    ruleItem: ruleItem,
	                    rulelist: rulelist
	                  });
	                }
	              });
	            }
	          })) ; // else {
	          // 	console.log("dommage");
	          // }
	        }
	      });
	    }
	  }, {
	    key: "replaceUrls",
	    value: function replaceUrls(ast) {
	      var _this7 = this;

	      _cssTree["default"].walk(ast, {
	        visit: "Url",
	        enter: function enter(node, item, list) {
	          var content = node.value.value;

	          if (node.value.type === "Raw" && content.startsWith("data:") || node.value.type === "String" && (content.startsWith("\"data:") || content.startsWith("'data:"))) ; else {
	            var href = content.replace(/["']/g, "");
	            var url = new URL(href, _this7.url);
	            node.value.value = url.toString();
	          }
	        }
	      });
	    }
	  }, {
	    key: "addScope",
	    value: function addScope(ast, id) {
	      // Get all selector lists
	      // add an id
	      _cssTree["default"].walk(ast, {
	        visit: "Selector",
	        enter: function enter(node, item, list) {
	          var children = node.children;
	          children.prepend(children.createItem({
	            type: "WhiteSpace",
	            value: " "
	          }));
	          children.prepend(children.createItem({
	            type: "IdSelector",
	            name: id,
	            loc: null,
	            children: null
	          }));
	        }
	      });
	    }
	  }, {
	    key: "getNamedPageSelectors",
	    value: function getNamedPageSelectors(ast) {
	      var namedPageSelectors = {};

	      _cssTree["default"].walk(ast, {
	        visit: "Rule",
	        enter: function enter(node, item, list) {
	          _cssTree["default"].walk(node, {
	            visit: "Declaration",
	            enter: function enter(declaration, dItem, dList) {
	              if (declaration.property === "page") {
	                var value = declaration.value.children.first();
	                var name = value.name;

	                var selector = _cssTree["default"].generate(node.prelude);

	                namedPageSelectors[name] = {
	                  name: name,
	                  selector: selector
	                }; // dList.remove(dItem);
	                // Add in page break

	                declaration.property = "break-before";
	                value.type = "Identifier";
	                value.name = "always";
	              }
	            }
	          });
	        }
	      });

	      return namedPageSelectors;
	    }
	  }, {
	    key: "replaceIds",
	    value: function replaceIds(ast) {
	      _cssTree["default"].walk(ast, {
	        visit: "Rule",
	        enter: function enter(node, item, list) {
	          _cssTree["default"].walk(node, {
	            visit: "IdSelector",
	            enter: function enter(idNode, idItem, idList) {
	              var name = idNode.name;
	              idNode.flags = null;
	              idNode.matcher = "=";
	              idNode.name = {
	                type: "Identifier",
	                loc: null,
	                name: "data-id"
	              };
	              idNode.type = "AttributeSelector";
	              idNode.value = {
	                type: "String",
	                loc: null,
	                value: "\"".concat(name, "\"")
	              };
	            }
	          });
	        }
	      });
	    }
	  }, {
	    key: "imports",
	    value: function imports(node, item, list) {
	      var _this8 = this;

	      // console.log("import", node, item, list);
	      var queries = [];

	      _cssTree["default"].walk(node, {
	        visit: "MediaQuery",
	        enter: function enter(mqNode, mqItem, mqList) {
	          _cssTree["default"].walk(mqNode, {
	            visit: "Identifier",
	            enter: function enter(identNode, identItem, identList) {
	              queries.push(identNode.name);
	            }
	          });
	        }
	      }); // Just basic media query support for now


	      var shouldNotApply = queries.some(function (query, index) {
	        var q = query;

	        if (q === "not") {
	          q = queries[index + 1];
	          return !(q === "screen" || q === "speech");
	        } else {
	          return q === "screen" || q === "speech";
	        }
	      });

	      if (shouldNotApply) {
	        return;
	      }

	      _cssTree["default"].walk(node, {
	        visit: "String",
	        enter: function enter(urlNode, urlItem, urlList) {
	          var href = urlNode.value.replace(/["']/g, "");
	          var url = new URL(href, _this8.url);
	          var value = url.toString();

	          _this8.imported.push(value); // Remove the original


	          list.remove(item);
	        }
	      });
	    }
	  }, {
	    key: "toString",
	    // generate string
	    value: function toString(ast) {
	      return _cssTree["default"].generate(ast || this.ast);
	    }
	  }, {
	    key: "text",
	    set: function set(t) {
	      this._text = t;
	    },
	    get: function get() {
	      return this._text;
	    }
	  }]);
	  return Sheet;
	}();

	var _default = Sheet;
	exports["default"] = _default;
	});

	unwrapExports(sheet);

	var base = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;
	var _default = "\n:root {\n\t--pagedjs-width: 8.5in;\n\t--pagedjs-height: 11in;\n\t--pagedjs-width-right: 8.5in;\n\t--pagedjs-height-right: 11in;\n\t--pagedjs-width-left: 8.5in;\n\t--pagedjs-height-left: 11in;\n\t--pagedjs-pagebox-width: 8.5in;\n\t--pagedjs-pagebox-height: 11in;\n\t--pagedjs-margin-top: 1in;\n\t--pagedjs-margin-right: 1in;\n\t--pagedjs-margin-bottom: 1in;\n\t--pagedjs-margin-left: 1in;\n\t--pagedjs-padding-top: 0mm;\n\t--pagedjs-padding-right: 0mm;\n\t--pagedjs-padding-bottom: 0mm;\n\t--pagedjs-padding-left: 0mm;\n\t--pagedjs-bleed-top: 0mm;\n\t--pagedjs-bleed-right: 0mm;\n\t--pagedjs-bleed-bottom: 0mm;\n\t--pagedjs-bleed-left: 0mm;\n\t--pagedjs-bleed-right-top: 0mm;\n\t--pagedjs-bleed-right-right: 0mm;\n\t--pagedjs-bleed-right-bottom: 0mm;\n\t--pagedjs-bleed-right-left: 0mm;\n\t--pagedjs-bleed-left-top: 0mm;\n\t--pagedjs-bleed-left-right: 0mm;\n\t--pagedjs-bleed-left-bottom: 0mm;\n\t--pagedjs-bleed-left-left: 0mm;\n\t--pagedjs-crop-color: black;\n\t--pagedjs-crop-offset: 2mm;\n\t--pagedjs-crop-stroke: 1px;\n\t--pagedjs-cross-size: 5mm;\n\t--pagedjs-mark-cross-display: none;\n\t--pagedjs-mark-crop-display: none;\n\t--pagedjs-page-count: 0;\n}\n\n@page {\n\tsize: letter;\n\tmargin: 0;\n}\n\n.pagedjs_sheet {\n\tbox-sizing: border-box;\n\twidth: var(--pagedjs-width);\n\theight: var(--pagedjs-height);\n\toverflow: hidden;\n\tposition: relative;\n\tdisplay: grid;\n\tgrid-template-columns: [bleed-left] var(--pagedjs-bleed-left) [sheet-center] calc(var(--pagedjs-width) - var(--pagedjs-bleed-left) - var(--pagedjs-bleed-right)) [bleed-right] var(--pagedjs-bleed-right);\n\tgrid-template-rows: [bleed-top] var(--pagedjs-bleed-top) [sheet-middle] calc(var(--pagedjs-height) - var(--pagedjs-bleed-top) - var(--pagedjs-bleed-bottom)) [bleed-bottom] var(--pagedjs-bleed-bottom);\n}\n\n.pagedjs_right_page .pagedjs_sheet {\n\twidth: var(--pagedjs-width-right);\n\theight: var(--pagedjs-height-right);\n\tgrid-template-columns: [bleed-left] var(--pagedjs-bleed-right-left) [sheet-center] calc(var(--pagedjs-width) - var(--pagedjs-bleed-right-left) - var(--pagedjs-bleed-right-right)) [bleed-right] var(--pagedjs-bleed-right-right);\n\tgrid-template-rows: [bleed-top] var(--pagedjs-bleed-right-top) [sheet-middle] calc(var(--pagedjs-height) - var(--pagedjs-bleed-right-top) - var(--pagedjs-bleed-right-bottom)) [bleed-bottom] var(--pagedjs-bleed-right-bottom);\n}\n\n.pagedjs_left_page .pagedjs_sheet {\n\twidth: var(--pagedjs-width-left);\n\theight: var(--pagedjs-height-left);\n\tgrid-template-columns: [bleed-left] var(--pagedjs-bleed-left-left) [sheet-center] calc(var(--pagedjs-width) - var(--pagedjs-bleed-left-left) - var(--pagedjs-bleed-left-right)) [bleed-right] var(--pagedjs-bleed-left-right);\n\tgrid-template-rows: [bleed-top] var(--pagedjs-bleed-left-top) [sheet-middle] calc(var(--pagedjs-height) - var(--pagedjs-bleed-left-top) - var(--pagedjs-bleed-left-bottom)) [bleed-bottom] var(--pagedjs-bleed-left-bottom);\n}\n\n.pagedjs_bleed {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tflex-wrap: nowrap;\n\toverflow: hidden;\n}\n\n.pagedjs_bleed-top {\n\tgrid-column: bleed-left / -1;\n\tgrid-row: bleed-top;\n\tflex-direction: row;\n}\n\n.pagedjs_bleed-bottom {\n\tgrid-column: bleed-left / -1;\n\tgrid-row: bleed-bottom;\n\tflex-direction: row;\n}\n\n.pagedjs_bleed-left {\n\tgrid-column: bleed-left;\n\tgrid-row: bleed-top / -1;\n\tflex-direction: column;\n}\n\n.pagedjs_bleed-right {\n\tgrid-column: bleed-right;\n\tgrid-row: bleed-top / -1;\n\tflex-direction: column;\n}\n\n.pagedjs_marks-crop {\n\tdisplay: var(--pagedjs-mark-crop-display);\n\tflex-grow: 0;\n\tflex-shrink: 0;\n}\n\n.pagedjs_bleed-top .pagedjs_marks-crop:nth-child(1),\n.pagedjs_bleed-bottom .pagedjs_marks-crop:nth-child(1) {\n\twidth: calc(var(--pagedjs-bleed-left) - var(--pagedjs-crop-stroke));\n\tborder-right: var(--pagedjs-crop-stroke) solid var(--pagedjs-crop-color);\n}\n\n.pagedjs_right_page .pagedjs_bleed-top .pagedjs_marks-crop:nth-child(1),\n.pagedjs_right_page .pagedjs_bleed-bottom .pagedjs_marks-crop:nth-child(1) {\n\twidth: calc(var(--pagedjs-bleed-right-left) - var(--pagedjs-crop-stroke));\n}\n\n.pagedjs_left_page .pagedjs_bleed-top .pagedjs_marks-crop:nth-child(1),\n.pagedjs_left_page .pagedjs_bleed-bottom .pagedjs_marks-crop:nth-child(1) {\n\twidth: calc(var(--pagedjs-bleed-left-left) - var(--pagedjs-crop-stroke));\n}\n\n.pagedjs_bleed-top .pagedjs_marks-crop:nth-child(3),\n.pagedjs_bleed-bottom .pagedjs_marks-crop:nth-child(3) {\n\twidth: calc(var(--pagedjs-bleed-right) - var(--pagedjs-crop-stroke));\n\tborder-left: var(--pagedjs-crop-stroke) solid var(--pagedjs-crop-color);\n}\n\n.pagedjs_right_page .pagedjs_bleed-top .pagedjs_marks-crop:nth-child(3),\n.pagedjs_right_page .pagedjs_bleed-bottom .pagedjs_marks-crop:nth-child(3) {\n\twidth: calc(var(--pagedjs-bleed-right-right) - var(--pagedjs-crop-stroke));\n}\n\n.pagedjs_left_page .pagedjs_bleed-top .pagedjs_marks-crop:nth-child(3),\n.pagedjs_left_page .pagedjs_bleed-bottom .pagedjs_marks-crop:nth-child(3) {\n\twidth: calc(var(--pagedjs-bleed-left-right) - var(--pagedjs-crop-stroke));\n}\n\n.pagedjs_bleed-top .pagedjs_marks-crop {\n\talign-self: flex-start;\n\theight: calc(var(--pagedjs-bleed-top) - var(--pagedjs-crop-offset));\n}\n\n.pagedjs_right_page .pagedjs_bleed-top .pagedjs_marks-crop {\n\theight: calc(var(--pagedjs-bleed-right-top) - var(--pagedjs-crop-offset));\n}\n\n.pagedjs_left_page .pagedjs_bleed-top .pagedjs_marks-crop {\n\theight: calc(var(--pagedjs-bleed-left-top) - var(--pagedjs-crop-offset));\n}\n\n.pagedjs_bleed-bottom .pagedjs_marks-crop {\n\talign-self: flex-end;\n\theight: calc(var(--pagedjs-bleed-bottom) - var(--pagedjs-crop-offset));\n}\n\n.pagedjs_right_page .pagedjs_bleed-bottom .pagedjs_marks-crop {\n\theight: calc(var(--pagedjs-bleed-right-bottom) - var(--pagedjs-crop-offset));\n}\n\n.pagedjs_left_page .pagedjs_bleed-bottom .pagedjs_marks-crop {\n\theight: calc(var(--pagedjs-bleed-left-bottom) - var(--pagedjs-crop-offset));\n}\n\n.pagedjs_bleed-left .pagedjs_marks-crop:nth-child(1),\n.pagedjs_bleed-right .pagedjs_marks-crop:nth-child(1) {\n\theight: calc(var(--pagedjs-bleed-top) - var(--pagedjs-crop-stroke));\n\tborder-bottom: var(--pagedjs-crop-stroke) solid var(--pagedjs-crop-color);\n}\n\n.pagedjs_right_page .pagedjs_bleed-left .pagedjs_marks-crop:nth-child(1),\n.pagedjs_right_page .pagedjs_bleed-right .pagedjs_marks-crop:nth-child(1) {\n\theight: calc(var(--pagedjs-bleed-right-top) - var(--pagedjs-crop-stroke));\n}\n\n.pagedjs_left_page .pagedjs_bleed-left .pagedjs_marks-crop:nth-child(1),\n.pagedjs_left_page .pagedjs_bleed-right .pagedjs_marks-crop:nth-child(1) {\n\theight: calc(var(--pagedjs-bleed-left-top) - var(--pagedjs-crop-stroke));\n}\n\n.pagedjs_bleed-left .pagedjs_marks-crop:nth-child(3),\n.pagedjs_bleed-right .pagedjs_marks-crop:nth-child(3) {\n\theight: calc(var(--pagedjs-bleed-bottom) - var(--pagedjs-crop-stroke));\n\tborder-top: var(--pagedjs-crop-stroke) solid var(--pagedjs-crop-color);\n}\n\n.pagedjs_right_page .pagedjs_bleed-left .pagedjs_marks-crop:nth-child(3),\n.pagedjs_right_page .pagedjs_bleed-right .pagedjs_marks-crop:nth-child(3) {\n\theight: calc(var(--pagedjs-bleed-right-bottom) - var(--pagedjs-crop-stroke));\n}\n\n.pagedjs_left_page .pagedjs_bleed-left .pagedjs_marks-crop:nth-child(3),\n.pagedjs_left_page .pagedjs_bleed-right .pagedjs_marks-crop:nth-child(3) {\n\theight: calc(var(--pagedjs-bleed-left-bottom) - var(--pagedjs-crop-stroke));\n}\n\n.pagedjs_bleed-left .pagedjs_marks-crop {\n\twidth: calc(var(--pagedjs-bleed-left) - var(--pagedjs-crop-offset));\n\talign-self: flex-start;\n}\n\n.pagedjs_right_page .pagedjs_bleed-left .pagedjs_marks-crop {\n\twidth: calc(var(--pagedjs-bleed-right-left) - var(--pagedjs-crop-offset));\n}\n\n.pagedjs_left_page .pagedjs_bleed-left .pagedjs_marks-crop {\n\twidth: calc(var(--pagedjs-bleed-left-left) - var(--pagedjs-crop-offset));\n}\n\n.pagedjs_bleed-right .pagedjs_marks-crop {\n\twidth: calc(var(--pagedjs-bleed-right) - var(--pagedjs-crop-offset));\n\talign-self: flex-end;\n}\n\n.pagedjs_right_page .pagedjs_bleed-right .pagedjs_marks-crop {\n\twidth: calc(var(--pagedjs-bleed-right-right) - var(--pagedjs-crop-offset));\n}\n\n.pagedjs_left_page .pagedjs_bleed-right .pagedjs_marks-crop {\n\twidth: calc(var(--pagedjs-bleed-left-right) - var(--pagedjs-crop-offset));\n}\n\n.pagedjs_marks-middle {\n\tdisplay: flex;\n\tflex-grow: 1;\n\tflex-shrink: 0;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n.pagedjs_marks-cross {\n\tdisplay: var(--pagedjs-mark-cross-display);\n\tbackground-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIzMi41MzdweCIgaGVpZ2h0PSIzMi41MzdweCIgdmlld0JveD0iMC4xMDQgMC4xMDQgMzIuNTM3IDMyLjUzNyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwLjEwNCAwLjEwNCAzMi41MzcgMzIuNTM3IiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMy4zODkzIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0yOS45MzEsMTYuMzczYzAsNy40ODktNi4wNjgsMTMuNTYtMTMuNTU4LDEzLjU2Yy03LjQ4MywwLTEzLjU1Ny02LjA3Mi0xMy41NTctMTMuNTZjMC03LjQ4Niw2LjA3NC0xMy41NTQsMTMuNTU3LTEzLjU1NEMyMy44NjIsMi44MTksMjkuOTMxLDguODg3LDI5LjkzMSwxNi4zNzN6Ii8+PGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjMuMzg5MyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMC4xMDQiIHkxPSIxNi4zNzMiIHgyPSIzMi42NDIiIHkyPSIxNi4zNzMiLz48bGluZSBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMy4zODkzIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHgxPSIxNi4zNzMiIHkxPSIwLjEwNCIgeDI9IjE2LjM3MyIgeTI9IjMyLjY0MiIvPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIzLjM4OTMiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTI0LjUwOCwxNi4zNzNjMCw0LjQ5Ni0zLjYzOCw4LjEzNS04LjEzNSw4LjEzNWMtNC40OTEsMC04LjEzNS0zLjYzOC04LjEzNS04LjEzNWMwLTQuNDg5LDMuNjQ0LTguMTM1LDguMTM1LTguMTM1QzIwLjg2OSw4LjIzOSwyNC41MDgsMTEuODg0LDI0LjUwOCwxNi4zNzN6Ii8+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuNjc3OCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMjkuOTMxLDE2LjM3M2MwLDcuNDg5LTYuMDY4LDEzLjU2LTEzLjU1OCwxMy41NmMtNy40ODMsMC0xMy41NTctNi4wNzItMTMuNTU3LTEzLjU2YzAtNy40ODYsNi4wNzQtMTMuNTU0LDEzLjU1Ny0xMy41NTRDMjMuODYyLDIuODE5LDI5LjkzMSw4Ljg4NywyOS45MzEsMTYuMzczeiIvPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwLjY3NzgiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjAuMTA0IiB5MT0iMTYuMzczIiB4Mj0iMzIuNjQyIiB5Mj0iMTYuMzczIi8+PGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuNjc3OCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMTYuMzczIiB5MT0iMC4xMDQiIHgyPSIxNi4zNzMiIHkyPSIzMi42NDIiLz48cGF0aCBkPSJNMjQuNTA4LDE2LjM3M2MwLDQuNDk2LTMuNjM4LDguMTM1LTguMTM1LDguMTM1Yy00LjQ5MSwwLTguMTM1LTMuNjM4LTguMTM1LTguMTM1YzAtNC40ODksMy42NDQtOC4xMzUsOC4xMzUtOC4xMzVDMjAuODY5LDguMjM5LDI0LjUwOCwxMS44ODQsMjQuNTA4LDE2LjM3MyIvPjxsaW5lIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIwLjY3NzgiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgeDE9IjguMjM5IiB5MT0iMTYuMzczIiB4Mj0iMjQuNTA4IiB5Mj0iMTYuMzczIi8+PGxpbmUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjAuNjc3OCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiB4MT0iMTYuMzczIiB5MT0iOC4yMzkiIHgyPSIxNi4zNzMiIHkyPSIyNC41MDgiLz48L3N2Zz4=);\n  background-repeat: no-repeat;\n  background-position: 50% 50%;\n  background-size: var(--pagedjs-cross-size);\n\n  z-index: 2147483647;\n\twidth: var(--pagedjs-cross-size);\n\theight: var(--pagedjs-cross-size);\n}\n\n.pagedjs_pagebox {\n\tbox-sizing: border-box;\n\twidth: var(--pagedjs-pagebox-width);\n\theight: var(--pagedjs-pagebox-height);\n\tposition: relative;\n\tdisplay: grid;\n\tgrid-template-columns: [left] var(--pagedjs-margin-left) [center] calc(var(--pagedjs-pagebox-width) - var(--pagedjs-margin-left) - var(--pagedjs-margin-right)) [right] var(--pagedjs-margin-right);\n\tgrid-template-rows: [header] var(--pagedjs-margin-top) [page] calc(var(--pagedjs-pagebox-height) - var(--pagedjs-margin-top) - var(--pagedjs-margin-bottom)) [footer] var(--pagedjs-margin-bottom);\n\tgrid-column: sheet-center;\n\tgrid-row: sheet-middle;\n}\n\n.pagedjs_pagebox * {\n\tbox-sizing: border-box;\n}\n\n.pagedjs_margin-top {\n\twidth: calc(var(--pagedjs-pagebox-width) - var(--pagedjs-margin-left) - var(--pagedjs-margin-right));\n\theight: var(--pagedjs-margin-top);\n\tgrid-column: center;\n\tgrid-row: header;\n\tflex-wrap: nowrap;\n\tdisplay: grid;\n\tgrid-template-columns: repeat(3, 1fr);\n\tgrid-template-rows: 100%;\n}\n\n.pagedjs_margin-top-left-corner-holder {\n\twidth: var(--pagedjs-margin-left);\n\theight: var(--pagedjs-margin-top);\n\tdisplay: flex;\n\tgrid-column: left;\n\tgrid-row: header;\n}\n\n.pagedjs_margin-top-right-corner-holder {\n\twidth: var(--pagedjs-margin-right);\n\theight: var(--pagedjs-margin-top);\n\tdisplay: flex;\n\tgrid-column: right;\n\tgrid-row: header;\n}\n\n.pagedjs_margin-top-left-corner {\n\twidth: var(--pagedjs-margin-left);\n}\n\n.pagedjs_margin-top-right-corner {\n\twidth: var(--pagedjs-margin-right);\n}\n\n.pagedjs_margin-right {\n\theight: calc(var(--pagedjs-pagebox-height) - var(--pagedjs-margin-top) - var(--pagedjs-margin-bottom));\n\twidth: var(--pagedjs-margin-right);\n\tright: 0;\n\tgrid-column: right;\n\tgrid-row: page;\n\tdisplay: grid;\n\tgrid-template-rows: repeat(3, 33.3333%);\n\tgrid-template-columns: 100%;\n}\n\n.pagedjs_margin-bottom {\n\twidth: calc(var(--pagedjs-pagebox-width) - var(--pagedjs-margin-left) - var(--pagedjs-margin-right));\n\theight: var(--pagedjs-margin-bottom);\n\tgrid-column: center;\n\tgrid-row: footer;\n\tdisplay: grid;\n\tgrid-template-columns: repeat(3, 1fr);\n\tgrid-template-rows: 100%;\n}\n\n.pagedjs_margin-bottom-left-corner-holder {\n\twidth: var(--pagedjs-margin-left);\n\theight: var(--pagedjs-margin-bottom);\n\tdisplay: flex;\n\tgrid-column: left;\n\tgrid-row: footer;\n}\n\n.pagedjs_margin-bottom-right-corner-holder {\n\twidth: var(--pagedjs-margin-right);\n\theight: var(--pagedjs-margin-bottom);\n\tdisplay: flex;\n\tgrid-column: right;\n\tgrid-row: footer;\n}\n\n.pagedjs_margin-bottom-left-corner {\n\twidth: var(--pagedjs-margin-left);\n}\n\n.pagedjs_margin-bottom-right-corner {\n\twidth: var(--pagedjs-margin-right);\n}\n\n\n\n.pagedjs_margin-left {\n\theight: calc(var(--pagedjs-pagebox-height) - var(--pagedjs-margin-top) - var(--pagedjs-margin-bottom));\n\twidth: var(--pagedjs-margin-left);\n\tgrid-column: left;\n\tgrid-row: page;\n\tdisplay: grid;\n\tgrid-template-rows: repeat(3, 33.33333%);\n\tgrid-template-columns: 100%;\n}\n\n.pagedjs_pages .pagedjs_pagebox .pagedjs_margin:not(.hasContent) {\n\tvisibility: hidden;\n}\n\n.pagedjs_pagebox > .pagedjs_area {\n\tgrid-column: center;\n\tgrid-row: page;\n\twidth: 100%;\n\theight: 100%;\n\tpadding: var(--pagedjs-padding-top) var(--pagedjs-padding-right) var(--pagedjs-padding-bottom) var(--pagedjs-padding-left) \n\n}\n\n.pagedjs_pagebox > .pagedjs_area > .pagedjs_page_content {\n\twidth: 100%;\n\theight: 100%;\n\tposition: relative;\n\tcolumn-fill: auto;\n}\n\n.pagedjs_page {\n\tcounter-increment: page;\n\twidth: var(--pagedjs-width);\n\theight: var(--pagedjs-height);\n}\n\n.pagedjs_page.pagedjs_right_page {\n\tcounter-increment: page;\n\twidth: var(--pagedjs-width-right);\n\theight: var(--pagedjs-height-right);\n}\n\n.pagedjs_page.pagedjs_left_page {\n\tcounter-increment: page;\n\twidth: var(--pagedjs-width-left);\n\theight: var(--pagedjs-height-left);\n}\n\n.pagedjs_pages {\n\tcounter-reset: pages var(--pagedjs-page-count);\n}\n\n\n.pagedjs_pagebox .pagedjs_margin-top-left-corner,\n.pagedjs_pagebox .pagedjs_margin-top-right-corner,\n.pagedjs_pagebox .pagedjs_margin-bottom-left-corner,\n.pagedjs_pagebox .pagedjs_margin-bottom-right-corner,\n.pagedjs_pagebox .pagedjs_margin-top-left,\n.pagedjs_pagebox .pagedjs_margin-top-right,\n.pagedjs_pagebox .pagedjs_margin-bottom-left,\n.pagedjs_pagebox .pagedjs_margin-bottom-right,\n.pagedjs_pagebox .pagedjs_margin-top-center,\n.pagedjs_pagebox .pagedjs_margin-bottom-center,\n.pagedjs_pagebox .pagedjs_margin-top-center,\n.pagedjs_pagebox .pagedjs_margin-bottom-center,\n.pagedjs_margin-right-middle,\n.pagedjs_margin-left-middle  {\n\tdisplay: flex;\n\talign-items: center;\n}\n\n.pagedjs_margin-right-top,\n.pagedjs_margin-left-top  {\n\tdisplay: flex;\n\talign-items: flex-top;\n}\n\n\n.pagedjs_margin-right-bottom,\n.pagedjs_margin-left-bottom  {\n\tdisplay: flex;\n\talign-items: flex-end;\n}\n\n\n\n/*\n.pagedjs_pagebox .pagedjs_margin-top-center,\n.pagedjs_pagebox .pagedjs_margin-bottom-center {\n\theight: 100%;\n\tdisplay: none;\n\talign-items: center;\n\tflex: 1 0 33%;\n\tmargin: 0 auto;\n}\n\n.pagedjs_pagebox .pagedjs_margin-top-left-corner,\n.pagedjs_pagebox .pagedjs_margin-top-right-corner,\n.pagedjs_pagebox .pagedjs_margin-bottom-right-corner,\n.pagedjs_pagebox .pagedjs_margin-bottom-left-corner {\n\tdisplay: none;\n\talign-items: center;\n}\n\n.pagedjs_pagebox .pagedjs_margin-left-top,\n.pagedjs_pagebox .pagedjs_margin-right-top {\n\tdisplay: none;\n\talign-items: flex-start;\n}\n\n.pagedjs_pagebox .pagedjs_margin-right-middle,\n.pagedjs_pagebox .pagedjs_margin-left-middle {\n\tdisplay: none;\n\talign-items: center;\n}\n\n.pagedjs_pagebox .pagedjs_margin-left-bottom,\n.pagedjs_pagebox .pagedjs_margin-right-bottom {\n\tdisplay: none;\n\talign-items: flex-end;\n}\n*/\n\n.pagedjs_pagebox .pagedjs_margin-top-left,\n.pagedjs_pagebox .pagedjs_margin-top-right-corner,\n.pagedjs_pagebox .pagedjs_margin-bottom-left,\n.pagedjs_pagebox .pagedjs_margin-bottom-right-corner { text-align: left; }\n\n.pagedjs_pagebox .pagedjs_margin-top-left-corner,\n.pagedjs_pagebox .pagedjs_margin-top-right,\n.pagedjs_pagebox .pagedjs_margin-bottom-left-corner,\n.pagedjs_pagebox .pagedjs_margin-bottom-right { text-align: right; }\n\n.pagedjs_pagebox .pagedjs_margin-top-center,\n.pagedjs_pagebox .pagedjs_margin-bottom-center,\n.pagedjs_pagebox .pagedjs_margin-left-top,\n.pagedjs_pagebox .pagedjs_margin-left-middle,\n.pagedjs_pagebox .pagedjs_margin-left-bottom,\n.pagedjs_pagebox .pagedjs_margin-right-top,\n.pagedjs_pagebox .pagedjs_margin-right-middle,\n.pagedjs_pagebox .pagedjs_margin-right-bottom { text-align: center; }\n\n.pagedjs_pages .pagedjs_margin .pagedjs_margin-content {\n\twidth: 100%;\n}\n\n.pagedjs_pages .pagedjs_margin-left .pagedjs_margin-content::after,\n.pagedjs_pages .pagedjs_margin-top .pagedjs_margin-content::after,\n.pagedjs_pages .pagedjs_margin-right .pagedjs_margin-content::after,\n.pagedjs_pages .pagedjs_margin-bottom .pagedjs_margin-content::after {\n\tdisplay: block;\n}\n\n.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div [data-split-to] {\n\tmargin-bottom: unset;\n\tpadding-bottom: unset;\n}\n\n.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div [data-split-from] {\n\ttext-indent: unset;\n\tmargin-top: unset;\n\tpadding-top: unset;\n\tinitial-letter: unset;\n}\n\n.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div [data-split-from] > *::first-letter,\n.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div [data-split-from]::first-letter {\n\tcolor: unset;\n\tfont-size: unset;\n\tfont-weight: unset;\n\tfont-family: unset;\n\tcolor: unset;\n\tline-height: unset;\n\tfloat: unset;\n\tpadding: unset;\n\tmargin: unset;\n}\n\n.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div [data-split-to]:after,\n.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div [data-split-to]::after {\n\tcontent: unset;\n}\n\n.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div [data-split-from]:before,\n.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div [data-split-from]::before {\n\tcontent: unset;\n}\n\n.pagedjs_pages > .pagedjs_page > .pagedjs_sheet > .pagedjs_pagebox > .pagedjs_area > div li[data-split-from]:first-of-type {\n\tlist-style: none;\n}\n\n/*\n[data-page]:not([data-split-from]),\n[data-break-before=\"page\"]:not([data-split-from]),\n[data-break-before=\"always\"]:not([data-split-from]),\n[data-break-before=\"left\"]:not([data-split-from]),\n[data-break-before=\"right\"]:not([data-split-from]),\n[data-break-before=\"recto\"]:not([data-split-from]),\n[data-break-before=\"verso\"]:not([data-split-from])\n{\n\tbreak-before: column;\n}\n\n[data-page]:not([data-split-to]),\n[data-break-after=\"page\"]:not([data-split-to]),\n[data-break-after=\"always\"]:not([data-split-to]),\n[data-break-after=\"left\"]:not([data-split-to]),\n[data-break-after=\"right\"]:not([data-split-to]),\n[data-break-after=\"recto\"]:not([data-split-to]),\n[data-break-after=\"verso\"]:not([data-split-to])\n{\n\tbreak-after: column;\n}\n*/\n\n.pagedjs_clear-after::after {\n\tcontent: none !important;\n}\n\nimg {\n\theight: auto;\n}\n\n[data-align-last-split-element='justify'] {\n\ttext-align-last: justify;\n}\n\n\n@media print {\n\thtml {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t}\n\tbody {\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\twidth: 100% !important;\n\t\theight: 100% !important;\n\t\tmin-width: 100%;\n\t\tmax-width: 100%;\n\t\tmin-height: 100%;\n\t\tmax-height: 100%;\n\t}\n\t.pagedjs_pages {\n\t\twidth: auto;\n\t\tdisplay: block !important;\n\t\ttransform: none !important;\n\t\theight: 100% !important;\n\t\tmin-height: 100%;\n\t\tmax-height: 100%;\n\t\toverflow: visible;\n\t}\n\t.pagedjs_page {\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\tmax-height: 100%;\n\t\tmin-height: 100%;\n\t\theight: 100% !important;\n\t\tpage-break-after: always;\n\t\tbreak-after: page;\n\t}\n\t.pagedjs_sheet {\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\tmax-height: 100%;\n\t\tmin-height: 100%;\n\t\theight: 100% !important;\n\t}\n}\n";
	exports["default"] = _default;
	});

	unwrapExports(base);

	var request_1 = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = request;

	var _regenerator = interopRequireDefault(regenerator);

	var _asyncToGenerator2 = interopRequireDefault(asyncToGenerator);

	function request(_x) {
	  return _request.apply(this, arguments);
	}

	function _request() {
	  _request = (0, _asyncToGenerator2["default"])(
	  /*#__PURE__*/
	  _regenerator["default"].mark(function _callee(url) {
	    var options,
	        _args = arguments;
	    return _regenerator["default"].wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
	            return _context.abrupt("return", new Promise(function (resolve, reject) {
	              var request = new XMLHttpRequest();
	              request.open(options.method || "get", url, true);

	              for (var i in options.headers) {
	                request.setRequestHeader(i, options.headers[i]);
	              }

	              request.withCredentials = options.credentials === "include";

	              request.onload = function () {
	                // Chrome returns a status code of 0 for local files
	                var status = request.status === 0 && url.startsWith("file://") ? 200 : request.status;
	                resolve(new Response(request.responseText, {
	                  status: status
	                }));
	              };

	              request.onerror = reject;
	              request.send(options.body || null);
	            }));

	          case 2:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _request.apply(this, arguments);
	}
	});

	unwrapExports(request_1);

	var polisher = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _regenerator = interopRequireDefault(regenerator);

	var _typeof2 = interopRequireDefault(_typeof_1);

	var _asyncToGenerator2 = interopRequireDefault(asyncToGenerator);

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _sheet = interopRequireDefault(sheet);

	var _base = interopRequireDefault(base);

	var _hook = interopRequireDefault(hook);

	var _request = interopRequireDefault(request_1);

	var Polisher =
	/*#__PURE__*/
	function () {
	  function Polisher(setup) {
	    (0, _classCallCheck2["default"])(this, Polisher);
	    this.sheets = [];
	    this.inserted = [];
	    this.hooks = {};
	    this.hooks.onUrl = new _hook["default"](this);
	    this.hooks.onAtPage = new _hook["default"](this);
	    this.hooks.onAtMedia = new _hook["default"](this);
	    this.hooks.onRule = new _hook["default"](this);
	    this.hooks.onDeclaration = new _hook["default"](this);
	    this.hooks.onContent = new _hook["default"](this);
	    this.hooks.onSelector = new _hook["default"](this);
	    this.hooks.onPseudoSelector = new _hook["default"](this);
	    this.hooks.onImport = new _hook["default"](this);
	    this.hooks.beforeTreeParse = new _hook["default"](this);
	    this.hooks.beforeTreeWalk = new _hook["default"](this);
	    this.hooks.afterTreeWalk = new _hook["default"](this);

	    if (setup !== false) {
	      this.setup();
	    }
	  }

	  (0, _createClass2["default"])(Polisher, [{
	    key: "setup",
	    value: function setup() {
	      this.base = this.insert(_base["default"]);
	      this.styleEl = document.createElement("style");
	      document.head.appendChild(this.styleEl);
	      this.styleSheet = this.styleEl.sheet;
	      return this.styleSheet;
	    }
	  }, {
	    key: "add",
	    value: function () {
	      var _add = (0, _asyncToGenerator2["default"])(
	      /*#__PURE__*/
	      _regenerator["default"].mark(function _callee2() {
	        var _arguments = arguments,
	            _this = this;

	        var fetched,
	            urls,
	            i,
	            f,
	            _loop,
	            url,
	            _args2 = arguments;

	        return _regenerator["default"].wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                fetched = [];
	                urls = [];

	                for (i = 0; i < _args2.length; i++) {
	                  f = void 0;

	                  if ((0, _typeof2["default"])(_args2[i]) === "object") {
	                    _loop = function _loop(url) {
	                      var obj = _arguments[i];
	                      f = new Promise(function (resolve, reject) {
	                        urls.push(url);
	                        resolve(obj[url]);
	                      });
	                    };

	                    for (url in _args2[i]) {
	                      _loop(url);
	                    }
	                  } else {
	                    urls.push(_args2[i]);
	                    f = (0, _request["default"])(_args2[i]).then(function (response) {
	                      return response.text();
	                    });
	                  }

	                  fetched.push(f);
	                }

	                _context2.next = 5;
	                return Promise.all(fetched).then(
	                /*#__PURE__*/
	                function () {
	                  var _ref = (0, _asyncToGenerator2["default"])(
	                  /*#__PURE__*/
	                  _regenerator["default"].mark(function _callee(originals) {
	                    var text, index;
	                    return _regenerator["default"].wrap(function _callee$(_context) {
	                      while (1) {
	                        switch (_context.prev = _context.next) {
	                          case 0:
	                            text = "";
	                            index = 0;

	                          case 2:
	                            if (!(index < originals.length)) {
	                              _context.next = 10;
	                              break;
	                            }

	                            _context.next = 5;
	                            return _this.convertViaSheet(originals[index], urls[index]);

	                          case 5:
	                            text = _context.sent;

	                            _this.insert(text);

	                          case 7:
	                            index++;
	                            _context.next = 2;
	                            break;

	                          case 10:
	                            return _context.abrupt("return", text);

	                          case 11:
	                          case "end":
	                            return _context.stop();
	                        }
	                      }
	                    }, _callee);
	                  }));

	                  return function (_x) {
	                    return _ref.apply(this, arguments);
	                  };
	                }());

	              case 5:
	                return _context2.abrupt("return", _context2.sent);

	              case 6:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2);
	      }));

	      function add() {
	        return _add.apply(this, arguments);
	      }

	      return add;
	    }()
	  }, {
	    key: "convertViaSheet",
	    value: function () {
	      var _convertViaSheet = (0, _asyncToGenerator2["default"])(
	      /*#__PURE__*/
	      _regenerator["default"].mark(function _callee3(cssStr, href) {
	        var sheet, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, url, str, text;

	        return _regenerator["default"].wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                sheet = new _sheet["default"](href, this.hooks);
	                _context3.next = 3;
	                return sheet.parse(cssStr);

	              case 3:
	                // Insert the imported sheets first
	                _iteratorNormalCompletion = true;
	                _didIteratorError = false;
	                _iteratorError = undefined;
	                _context3.prev = 6;
	                _iterator = sheet.imported[Symbol.iterator]();

	              case 8:
	                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
	                  _context3.next = 20;
	                  break;
	                }

	                url = _step.value;
	                _context3.next = 12;
	                return (0, _request["default"])(url).then(function (response) {
	                  return response.text();
	                });

	              case 12:
	                str = _context3.sent;
	                _context3.next = 15;
	                return this.convertViaSheet(str, url);

	              case 15:
	                text = _context3.sent;
	                this.insert(text);

	              case 17:
	                _iteratorNormalCompletion = true;
	                _context3.next = 8;
	                break;

	              case 20:
	                _context3.next = 26;
	                break;

	              case 22:
	                _context3.prev = 22;
	                _context3.t0 = _context3["catch"](6);
	                _didIteratorError = true;
	                _iteratorError = _context3.t0;

	              case 26:
	                _context3.prev = 26;
	                _context3.prev = 27;

	                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
	                  _iterator["return"]();
	                }

	              case 29:
	                _context3.prev = 29;

	                if (!_didIteratorError) {
	                  _context3.next = 32;
	                  break;
	                }

	                throw _iteratorError;

	              case 32:
	                return _context3.finish(29);

	              case 33:
	                return _context3.finish(26);

	              case 34:
	                this.sheets.push(sheet);

	                if (typeof sheet.width !== "undefined") {
	                  this.width = sheet.width;
	                }

	                if (typeof sheet.height !== "undefined") {
	                  this.height = sheet.height;
	                }

	                if (typeof sheet.orientation !== "undefined") {
	                  this.orientation = sheet.orientation;
	                }

	                return _context3.abrupt("return", sheet.toString());

	              case 39:
	              case "end":
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this, [[6, 22, 26, 34], [27,, 29, 33]]);
	      }));

	      function convertViaSheet(_x2, _x3) {
	        return _convertViaSheet.apply(this, arguments);
	      }

	      return convertViaSheet;
	    }()
	  }, {
	    key: "insert",
	    value: function insert(text) {
	      var head = document.querySelector("head");
	      var style = document.createElement("style");
	      style.type = "text/css";
	      style.setAttribute("data-pagedjs-inserted-styles", "true");
	      style.appendChild(document.createTextNode(text));
	      head.appendChild(style);
	      this.inserted.push(style);
	      return style;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.styleEl.remove();
	      this.inserted.forEach(function (s) {
	        s.remove();
	      });
	      this.sheets = [];
	    }
	  }]);
	  return Polisher;
	}();

	var _default = Polisher;
	exports["default"] = _default;
	});

	unwrapExports(polisher);

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var assertThisInitialized = _assertThisInitialized;

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	var possibleConstructorReturn = _possibleConstructorReturn;

	var getPrototypeOf = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	});

	var setPrototypeOf = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	});

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) setPrototypeOf(subClass, superClass);
	}

	var inherits = _inherits;

	var handler = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _eventEmitter = interopRequireDefault(eventEmitter);

	var Handler = function Handler(chunker, polisher, caller) {
	  (0, _classCallCheck2["default"])(this, Handler);
	  var hooks = Object.assign({}, chunker && chunker.hooks, polisher && polisher.hooks, caller && caller.hooks);
	  this.chunker = chunker;
	  this.polisher = polisher;
	  this.caller = caller;

	  for (var name in hooks) {
	    if (name in this) {
	      var hook = hooks[name];
	      hook.register(this[name].bind(this));
	    }
	  }
	};

	(0, _eventEmitter["default"])(Handler.prototype);
	var _default = Handler;
	exports["default"] = _default;
	});

	unwrapExports(handler);

	var sizes = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;
	// https://www.w3.org/TR/css3-page/#page-size-prop
	var _default = {
	  "A0": {
	    width: {
	      value: 841,
	      unit: "mm"
	    },
	    height: {
	      value: 1189,
	      unit: "mm"
	    }
	  },
	  "A1": {
	    width: {
	      value: 594,
	      unit: "mm"
	    },
	    height: {
	      value: 841,
	      unit: "mm"
	    }
	  },
	  "A2": {
	    width: {
	      value: 420,
	      unit: "mm"
	    },
	    height: {
	      value: 594,
	      unit: "mm"
	    }
	  },
	  "A3": {
	    width: {
	      value: 297,
	      unit: "mm"
	    },
	    height: {
	      value: 420,
	      unit: "mm"
	    }
	  },
	  "A4": {
	    width: {
	      value: 210,
	      unit: "mm"
	    },
	    height: {
	      value: 297,
	      unit: "mm"
	    }
	  },
	  "A5": {
	    width: {
	      value: 148,
	      unit: "mm"
	    },
	    height: {
	      value: 210,
	      unit: "mm"
	    }
	  },
	  "A6": {
	    width: {
	      value: 105,
	      unit: "mm"
	    },
	    height: {
	      value: 148,
	      unit: "mm"
	    }
	  },
	  "A7": {
	    width: {
	      value: 74,
	      unit: "mm"
	    },
	    height: {
	      value: 105,
	      unit: "mm"
	    }
	  },
	  "A8": {
	    width: {
	      value: 52,
	      unit: "mm"
	    },
	    height: {
	      value: 74,
	      unit: "mm"
	    }
	  },
	  "A9": {
	    width: {
	      value: 37,
	      unit: "mm"
	    },
	    height: {
	      value: 52,
	      unit: "mm"
	    }
	  },
	  "A10": {
	    width: {
	      value: 26,
	      unit: "mm"
	    },
	    height: {
	      value: 37,
	      unit: "mm"
	    }
	  },
	  "B4": {
	    width: {
	      value: 250,
	      unit: "mm"
	    },
	    height: {
	      value: 353,
	      unit: "mm"
	    }
	  },
	  "B5": {
	    width: {
	      value: 176,
	      unit: "mm"
	    },
	    height: {
	      value: 250,
	      unit: "mm"
	    }
	  },
	  "letter": {
	    width: {
	      value: 8.5,
	      unit: "in"
	    },
	    height: {
	      value: 11,
	      unit: "in"
	    }
	  },
	  "legal": {
	    width: {
	      value: 8.5,
	      unit: "in"
	    },
	    height: {
	      value: 14,
	      unit: "in"
	    }
	  },
	  "ledger": {
	    width: {
	      value: 11,
	      unit: "in"
	    },
	    height: {
	      value: 17,
	      unit: "in"
	    }
	  }
	};
	exports["default"] = _default;
	});

	unwrapExports(sizes);

	var atpage = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inherits2 = interopRequireDefault(inherits);

	var _handler = interopRequireDefault(handler);

	var _cssTree = interopRequireDefault(lib);

	var _sizes = interopRequireDefault(sizes);





	var AtPage =
	/*#__PURE__*/
	function (_Handler) {
	  (0, _inherits2["default"])(AtPage, _Handler);

	  function AtPage(chunker, polisher, caller) {
	    var _this;

	    (0, _classCallCheck2["default"])(this, AtPage);
	    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AtPage).call(this, chunker, polisher, caller));
	    _this.pages = {};
	    _this.width = undefined;
	    _this.height = undefined;
	    _this.orientation = undefined;
	    _this.marginalia = {};
	    return _this;
	  }

	  (0, _createClass2["default"])(AtPage, [{
	    key: "pageModel",
	    value: function pageModel(selector) {
	      return {
	        selector: selector,
	        name: undefined,
	        psuedo: undefined,
	        nth: undefined,
	        marginalia: {},
	        width: undefined,
	        height: undefined,
	        orientation: undefined,
	        margin: {
	          top: {},
	          right: {},
	          left: {},
	          bottom: {}
	        },
	        padding: {
	          top: {},
	          right: {},
	          left: {},
	          bottom: {}
	        },
	        block: {},
	        marks: undefined
	      };
	    } // Find and Remove @page rules

	  }, {
	    key: "onAtPage",
	    value: function onAtPage(node, item, list) {
	      var page, marginalia;
	      var selector = "";
	      var named, psuedo, nth;
	      var needsMerge = false;

	      if (node.prelude) {
	        named = this.getTypeSelector(node);
	        psuedo = this.getPsuedoSelector(node);
	        nth = this.getNthSelector(node);
	        selector = _cssTree["default"].generate(node.prelude);
	      } else {
	        selector = "*";
	      }

	      if (selector in this.pages) {
	        // this.pages[selector] = Object.assign(this.pages[selector], page);
	        // console.log("after", selector, this.pages[selector]);
	        // this.pages[selector].added = false;
	        page = this.pages[selector];
	        marginalia = this.replaceMarginalia(node);
	        needsMerge = true;
	      } else {
	        page = this.pageModel(selector);
	        marginalia = this.replaceMarginalia(node);
	        this.pages[selector] = page;
	      }

	      page.name = named;
	      page.psuedo = psuedo;
	      page.nth = nth;

	      if (needsMerge) {
	        page.marginalia = Object.assign(page.marginalia, marginalia);
	      } else {
	        page.marginalia = marginalia;
	      }

	      var declarations = this.replaceDeclartations(node);

	      if (declarations.size) {
	        page.size = declarations.size;
	        page.width = declarations.size.width;
	        page.height = declarations.size.height;
	        page.orientation = declarations.size.orientation;
	        page.format = declarations.size.format;
	      }

	      if (declarations.bleed && declarations.bleed[0] != "auto") {
	        switch (declarations.bleed.length) {
	          case 4:
	            // top right bottom left
	            page.bleed = {
	              top: declarations.bleed[0],
	              right: declarations.bleed[1],
	              bottom: declarations.bleed[2],
	              left: declarations.bleed[3]
	            };
	            break;

	          case 3:
	            // top right bottom right
	            page.bleed = {
	              top: declarations.bleed[0],
	              right: declarations.bleed[1],
	              bottom: declarations.bleed[2],
	              left: declarations.bleed[1]
	            };
	            break;

	          case 2:
	            // top right top right
	            page.bleed = {
	              top: declarations.bleed[0],
	              right: declarations.bleed[1],
	              bottom: declarations.bleed[0],
	              left: declarations.bleed[1]
	            };
	            break;

	          default:
	            page.bleed = {
	              top: declarations.bleed[0],
	              right: declarations.bleed[0],
	              bottom: declarations.bleed[0],
	              left: declarations.bleed[0]
	            };
	        }
	      }

	      if (declarations.marks) {
	        if (!declarations.bleed || declarations.bleed && declarations.bleed[0] === "auto") {
	          // Spec say 6pt, but needs more space for marks
	          page.bleed = {
	            top: {
	              value: 6,
	              unit: "mm"
	            },
	            right: {
	              value: 6,
	              unit: "mm"
	            },
	            bottom: {
	              value: 6,
	              unit: "mm"
	            },
	            left: {
	              value: 6,
	              unit: "mm"
	            }
	          };
	        }

	        page.marks = declarations.marks;
	      }

	      if (declarations.margin) {
	        page.margin = declarations.margin;
	      }

	      if (declarations.padding) {
	        page.padding = declarations.padding;
	      }

	      if (declarations.marks) {
	        page.marks = declarations.marks;
	      }

	      if (needsMerge) {
	        page.block.children.appendList(node.block.children);
	      } else {
	        page.block = node.block;
	      } // Remove the rule


	      list.remove(item);
	    }
	    /* Handled in breaks */

	    /*
	    afterParsed(parsed) {
	    	for (let b in this.named) {
	    		// Find elements
	    		let elements = parsed.querySelectorAll(b);
	    		// Add break data
	    		for (var i = 0; i < elements.length; i++) {
	    			elements[i].setAttribute("data-page", this.named[b]);
	    		}
	    	}
	    }
	    */

	  }, {
	    key: "afterTreeWalk",
	    value: function afterTreeWalk(ast, sheet) {
	      this.addPageClasses(this.pages, ast, sheet);

	      if ("*" in this.pages) {
	        var width = this.pages["*"].width;
	        var height = this.pages["*"].height;
	        var format = this.pages["*"].format;
	        var orientation = this.pages["*"].orientation;
	        var bleed = this.pages["*"].bleed;
	        var marks = this.pages["*"].marks;
	        var bleedverso = undefined;
	        var bleedrecto = undefined;

	        if (":left" in this.pages) {
	          bleedverso = this.pages[":left"].bleed;
	        }

	        if (":right" in this.pages) {
	          bleedrecto = this.pages[":right"].bleed;
	        }

	        if (width && height && (this.width !== width || this.height !== height)) {
	          this.width = width;
	          this.height = height;
	          this.format = format;
	          this.orientation = orientation;
	          this.addRootVars(ast, width, height, orientation, bleed, bleedrecto, bleedverso, marks);
	          this.addRootPage(ast, this.pages["*"].size, bleed, bleedrecto, bleedverso);
	          this.emit("size", {
	            width: width,
	            height: height,
	            orientation: orientation,
	            format: format,
	            bleed: bleed
	          });
	          this.emit("atpages", this.pages);
	        }
	      }
	    }
	  }, {
	    key: "getTypeSelector",
	    value: function getTypeSelector(ast) {
	      // Find page name
	      var name;

	      _cssTree["default"].walk(ast, {
	        visit: "TypeSelector",
	        enter: function enter(node, item, list) {
	          name = node.name;
	        }
	      });

	      return name;
	    }
	  }, {
	    key: "getPsuedoSelector",
	    value: function getPsuedoSelector(ast) {
	      // Find if it has :left & :right & :black & :first
	      var name;

	      _cssTree["default"].walk(ast, {
	        visit: "PseudoClassSelector",
	        enter: function enter(node, item, list) {
	          if (node.name !== "nth") {
	            name = node.name;
	          }
	        }
	      });

	      return name;
	    }
	  }, {
	    key: "getNthSelector",
	    value: function getNthSelector(ast) {
	      // Find if it has :nth
	      var nth;

	      _cssTree["default"].walk(ast, {
	        visit: "PseudoClassSelector",
	        enter: function enter(node, item, list) {
	          if (node.name === "nth" && node.children) {
	            var raw = node.children.first();
	            nth = raw.value;
	          }
	        }
	      });

	      return nth;
	    }
	  }, {
	    key: "replaceMarginalia",
	    value: function replaceMarginalia(ast) {
	      var parsed = {};

	      _cssTree["default"].walk(ast.block, {
	        visit: "Atrule",
	        enter: function enter(node, item, list) {
	          var name = node.name;

	          if (name === "top") {
	            name = "top-center";
	          }

	          if (name === "right") {
	            name = "right-middle";
	          }

	          if (name === "left") {
	            name = "left-middle";
	          }

	          if (name === "bottom") {
	            name = "bottom-center";
	          }

	          parsed[name] = node.block;
	          list.remove(item);
	        }
	      });

	      return parsed;
	    }
	  }, {
	    key: "replaceDeclartations",
	    value: function replaceDeclartations(ast) {
	      var _this2 = this;

	      var parsed = {};

	      _cssTree["default"].walk(ast.block, {
	        visit: "Declaration",
	        enter: function enter(declaration, dItem, dList) {
	          var prop = _cssTree["default"].property(declaration.property).name; // let value = declaration.value;


	          if (prop === "marks") {
	            parsed.marks = [];

	            _cssTree["default"].walk(declaration, {
	              visit: "Identifier",
	              enter: function enter(ident) {
	                parsed.marks.push(ident.name);
	              }
	            });

	            dList.remove(dItem);
	          } else if (prop === "margin") {
	            parsed.margin = _this2.getMargins(declaration);
	            dList.remove(dItem);
	          } else if (prop.indexOf("margin-") === 0) {
	            var m = prop.substring("margin-".length);

	            if (!parsed.margin) {
	              parsed.margin = {
	                top: {},
	                right: {},
	                left: {},
	                bottom: {}
	              };
	            }

	            parsed.margin[m] = declaration.value.children.first();
	            dList.remove(dItem);
	          } else if (prop === "padding") {
	            parsed.padding = _this2.getPaddings(declaration.value);
	            dList.remove(dItem);
	          } else if (prop.indexOf("padding-") === 0) {
	            var p = prop.substring("padding-".length);

	            if (!parsed.padding) {
	              parsed.padding = {
	                top: {},
	                right: {},
	                left: {},
	                bottom: {}
	              };
	            }

	            parsed.padding[p] = declaration.value.children.first();
	            dList.remove(dItem);
	          } else if (prop === "size") {
	            parsed.size = _this2.getSize(declaration);
	            dList.remove(dItem);
	          } else if (prop === "bleed") {
	            parsed.bleed = [];

	            _cssTree["default"].walk(declaration, {
	              enter: function enter(subNode) {
	                switch (subNode.type) {
	                  case "String":
	                    // bleed: "auto"
	                    if (subNode.value.indexOf("auto") > -1) {
	                      parsed.bleed.push("auto");
	                    }

	                    break;

	                  case "Dimension":
	                    // bleed: 1in 2in, bleed: 20px ect.
	                    parsed.bleed.push({
	                      value: subNode.value,
	                      unit: subNode.unit
	                    });
	                    break;

	                  case "Number":
	                    parsed.bleed.push({
	                      value: subNode.value,
	                      unit: "px"
	                    });
	                    break;

	                }
	              }
	            });

	            dList.remove(dItem);
	          }
	        }
	      });

	      return parsed;
	    }
	  }, {
	    key: "getSize",
	    value: function getSize(declaration) {
	      var width, height, orientation, format; // Get size: Xmm Ymm

	      _cssTree["default"].walk(declaration, {
	        visit: "Dimension",
	        enter: function enter(node, item, list) {
	          var value = node.value,
	              unit = node.unit;

	          if (typeof width === "undefined") {
	            width = {
	              value: value,
	              unit: unit
	            };
	          } else if (typeof height === "undefined") {
	            height = {
	              value: value,
	              unit: unit
	            };
	          }
	        }
	      }); // Get size: "A4"


	      _cssTree["default"].walk(declaration, {
	        visit: "String",
	        enter: function enter(node, item, list) {
	          var name = node.value.replace(/["|']/g, "");
	          var s = _sizes["default"][name];

	          if (s) {
	            width = s.width;
	            height = s.height;
	          }
	        }
	      }); // Get Format or Landscape or Portrait


	      _cssTree["default"].walk(declaration, {
	        visit: "Identifier",
	        enter: function enter(node, item, list) {
	          var name = node.name;

	          if (name === "landscape" || name === "portrait") {
	            orientation = node.name;
	          } else if (name !== "auto") {
	            var s = _sizes["default"][name];

	            if (s) {
	              width = s.width;
	              height = s.height;
	            }

	            format = name;
	          }
	        }
	      });

	      return {
	        width: width,
	        height: height,
	        orientation: orientation,
	        format: format
	      };
	    }
	  }, {
	    key: "getMargins",
	    value: function getMargins(declaration) {
	      var margins = [];
	      var margin = {
	        top: {},
	        right: {},
	        left: {},
	        bottom: {}
	      };

	      _cssTree["default"].walk(declaration, {
	        visit: "Dimension",
	        enter: function enter(node, item, list) {
	          margins.push(node);
	        }
	      });

	      if (margins.length === 1) {
	        for (var m in margin) {
	          margin[m] = margins[0];
	        }
	      } else if (margins.length === 2) {
	        margin.top = margins[0];
	        margin.right = margins[1];
	        margin.bottom = margins[0];
	        margin.left = margins[1];
	      } else if (margins.length === 3) {
	        margin.top = margins[0];
	        margin.right = margins[1];
	        margin.bottom = margins[2];
	        margin.left = margins[1];
	      } else if (margins.length === 4) {
	        margin.top = margins[0];
	        margin.right = margins[1];
	        margin.bottom = margins[2];
	        margin.left = margins[3];
	      }

	      return margin;
	    }
	  }, {
	    key: "getPaddings",
	    value: function getPaddings(declaration) {
	      var paddings = [];
	      var padding = {
	        top: {},
	        right: {},
	        left: {},
	        bottom: {}
	      };

	      _cssTree["default"].walk(declaration, {
	        visit: "Dimension",
	        enter: function enter(node, item, list) {
	          paddings.push(node);
	        }
	      });

	      if (paddings.length === 1) {
	        for (var p in padding) {
	          padding[p] = paddings[0];
	        }
	      } else if (paddings.length === 2) {
	        padding.top = paddings[0];
	        padding.right = paddings[1];
	        padding.bottom = paddings[0];
	        padding.left = paddings[1];
	      } else if (paddings.length === 3) {
	        padding.top = paddings[0];
	        padding.right = paddings[1];
	        padding.bottom = paddings[2];
	        padding.left = paddings[1];
	      } else if (paddings.length === 4) {
	        padding.top = paddings[0];
	        padding.right = paddings[1];
	        padding.bottom = paddings[2];
	        padding.left = paddings[3];
	      }

	      return padding;
	    }
	  }, {
	    key: "addPageClasses",
	    value: function addPageClasses(pages, ast, sheet) {
	      // First add * page
	      if ("*" in pages && !pages["*"].added) {
	        var p = this.createPage(pages["*"], ast.children, sheet);
	        sheet.insertRule(p);
	        pages["*"].added = true;
	      } // Add :left & :right


	      if (":left" in pages && !pages[":left"].added) {
	        var left = this.createPage(pages[":left"], ast.children, sheet);
	        sheet.insertRule(left);
	        pages[":left"].added = true;
	      }

	      if (":right" in pages && !pages[":right"].added) {
	        var right = this.createPage(pages[":right"], ast.children, sheet);
	        sheet.insertRule(right);
	        pages[":right"].added = true;
	      } // Add :first & :blank


	      if (":first" in pages && !pages[":first"].first) {
	        var first = this.createPage(pages[":first"], ast.children, sheet);
	        sheet.insertRule(first);
	        pages[":first"].added = true;
	      }

	      if (":blank" in pages && !pages[":blank"].added) {
	        var blank = this.createPage(pages[":blank"], ast.children, sheet);
	        sheet.insertRule(blank);
	        pages[":blank"].added = true;
	      } // Add nth pages


	      for (var pg in pages) {
	        if (pages[pg].nth && !pages[pg].added) {
	          var nth = this.createPage(pages[pg], ast.children, sheet);
	          sheet.insertRule(nth);
	          pages[pg].added = true;
	        }
	      } // Add named pages


	      for (var _pg in pages) {
	        if (pages[_pg].name && !pages[_pg].added) {
	          var named = this.createPage(pages[_pg], ast.children, sheet);
	          sheet.insertRule(named);
	          pages[_pg].added = true;
	        }
	      }
	    }
	  }, {
	    key: "createPage",
	    value: function createPage(page, ruleList, sheet) {
	      var selectors = this.selectorsForPage(page);
	      var children = page.block.children.copy();
	      var block = {
	        type: "Block",
	        loc: 0,
	        children: children
	      };
	      var rule = this.createRule(selectors, block);
	      this.addMarginVars(page.margin, children, children.first());
	      this.addPaddingVars(page.padding, children, children.first());

	      if (page.width) {
	        this.addDimensions(page.width, page.height, page.orientation, children, children.first());
	      }

	      if (page.marginalia) {
	        this.addMarginaliaStyles(page, ruleList, rule, sheet);
	        this.addMarginaliaContent(page, ruleList, rule, sheet);
	      }

	      return rule;
	    }
	  }, {
	    key: "addMarginVars",
	    value: function addMarginVars(margin, list, item) {
	      // variables for margins
	      for (var m in margin) {
	        if (typeof margin[m].value !== "undefined") {
	          var value = margin[m].value + (margin[m].unit || "");
	          var mVar = list.createItem({
	            type: "Declaration",
	            property: "--pagedjs-margin-" + m,
	            value: {
	              type: "Raw",
	              value: value
	            }
	          });
	          list.append(mVar, item);
	        }
	      }
	    }
	  }, {
	    key: "addPaddingVars",
	    value: function addPaddingVars(padding, list, item) {
	      // variables for padding
	      for (var p in padding) {
	        if (typeof padding[p].value !== "undefined") {
	          var value = padding[p].value + (padding[p].unit || "");
	          var pVar = list.createItem({
	            type: "Declaration",
	            property: "--pagedjs-padding-" + p,
	            value: {
	              type: "Raw",
	              value: value
	            }
	          });
	          list.append(pVar, item);
	        }
	      }
	    }
	  }, {
	    key: "addDimensions",
	    value: function addDimensions(width, height, orientation, list, item) {
	      var widthString, heightString;
	      widthString = (0, utils.CSSValueToString)(width);
	      heightString = (0, utils.CSSValueToString)(height);

	      if (orientation && orientation !== "portrait") {
	        // reverse for orientation
	        var _ref = [heightString, widthString];
	        widthString = _ref[0];
	        heightString = _ref[1];
	      } // width variable


	      var wVar = this.createVariable("--pagedjs-pagebox-width", widthString);
	      list.appendData(wVar); // height variable

	      var hVar = this.createVariable("--pagedjs-pagebox-height", heightString);
	      list.appendData(hVar); // let w = this.createDimension("width", width);
	      // let h = this.createDimension("height", height);
	      // list.appendData(w);
	      // list.appendData(h);
	    }
	  }, {
	    key: "addMarginaliaStyles",
	    value: function addMarginaliaStyles(page, list, item, sheet) {
	      var _this3 = this;

	      var _loop = function _loop(loc) {
	        var block = _cssTree["default"].clone(page.marginalia[loc]);

	        var hasContent = false;

	        if (block.children.isEmpty()) {
	          return "continue";
	        }

	        _cssTree["default"].walk(block, {
	          visit: "Declaration",
	          enter: function enter(node, item, list) {
	            if (node.property === "content") {
	              if (node.value.children && node.value.children.first().name === "none") {
	                hasContent = false;
	              } else {
	                hasContent = true;
	              }

	              list.remove(item);
	            }

	            if (node.property === "vertical-align") {
	              _cssTree["default"].walk(node, {
	                visit: "Identifier",
	                enter: function enter(identNode, identItem, identlist) {
	                  var name = identNode.name;

	                  if (name === "top") {
	                    identNode.name = "flex-start";
	                  } else if (name === "middle") {
	                    identNode.name = "center";
	                  } else if (name === "bottom") {
	                    identNode.name = "flex-end";
	                  }
	                }
	              });

	              node.property = "align-items";
	            }

	            if (node.property === "width" && (loc === "top-left" || loc === "top-center" || loc === "top-right" || loc === "bottom-left" || loc === "bottom-center" || loc === "bottom-right")) {
	              var c = _cssTree["default"].clone(node);

	              c.property = "max-width";
	              list.appendData(c);
	            }

	            if (node.property === "height" && (loc === "left-top" || loc === "left-middle" || loc === "left-bottom" || loc === "right-top" || loc === "right-middle" || loc === "right-bottom")) {
	              var _c = _cssTree["default"].clone(node);

	              _c.property = "max-height";
	              list.appendData(_c);
	            }
	          }
	        });

	        var marginSelectors = _this3.selectorsForPageMargin(page, loc);

	        var marginRule = _this3.createRule(marginSelectors, block);

	        list.appendData(marginRule);

	        var sel = _cssTree["default"].generate({
	          type: "Selector",
	          children: marginSelectors
	        });

	        _this3.marginalia[sel] = {
	          page: page,
	          selector: sel,
	          block: page.marginalia[loc],
	          hasContent: hasContent
	        };
	      };

	      for (var loc in page.marginalia) {
	        var _ret = _loop(loc);

	        if (_ret === "continue") continue;
	      }
	    }
	  }, {
	    key: "addMarginaliaContent",
	    value: function addMarginaliaContent(page, list, item, sheet) {
	      var displayNone; // Just content

	      for (var loc in page.marginalia) {
	        var content = _cssTree["default"].clone(page.marginalia[loc]);

	        _cssTree["default"].walk(content, {
	          visit: "Declaration",
	          enter: function enter(node, item, list) {
	            if (node.property !== "content") {
	              list.remove(item);
	            }

	            if (node.value.children && node.value.children.first().name === "none") {
	              displayNone = true;
	            }
	          }
	        });

	        if (content.children.isEmpty()) {
	          continue;
	        }

	        var displaySelectors = this.selectorsForPageMargin(page, loc);
	        var displayDeclaration = void 0;
	        displaySelectors.insertData({
	          type: "Combinator",
	          name: ">"
	        });
	        displaySelectors.insertData({
	          type: "ClassSelector",
	          name: "pagedjs_margin-content"
	        });
	        displaySelectors.insertData({
	          type: "Combinator",
	          name: ">"
	        });
	        displaySelectors.insertData({
	          type: "TypeSelector",
	          name: "*"
	        });

	        if (displayNone) {
	          displayDeclaration = this.createDeclaration("display", "none");
	        } else {
	          displayDeclaration = this.createDeclaration("display", "block");
	        }

	        var displayRule = this.createRule(displaySelectors, [displayDeclaration]);
	        sheet.insertRule(displayRule); // insert content rule

	        var contentSelectors = this.selectorsForPageMargin(page, loc);
	        contentSelectors.insertData({
	          type: "Combinator",
	          name: ">"
	        });
	        contentSelectors.insertData({
	          type: "ClassSelector",
	          name: "pagedjs_margin-content"
	        });
	        contentSelectors.insertData({
	          type: "PseudoElementSelector",
	          name: "after",
	          children: null
	        });
	        var contentRule = this.createRule(contentSelectors, content);
	        sheet.insertRule(contentRule);
	      }
	    }
	  }, {
	    key: "addRootVars",
	    value: function addRootVars(ast, width, height, orientation, bleed, bleedrecto, bleedverso, marks) {
	      var _this4 = this;

	      var rules = [];
	      var selectors = new _cssTree["default"].List();
	      selectors.insertData({
	        type: "PseudoClassSelector",
	        name: "root",
	        children: null
	      });
	      var widthString, heightString;
	      var widthStringRight, heightStringRight;
	      var widthStringLeft, heightStringLeft;

	      if (!bleed) {
	        widthString = (0, utils.CSSValueToString)(width);
	        heightString = (0, utils.CSSValueToString)(height);
	        widthStringRight = (0, utils.CSSValueToString)(width);
	        heightStringRight = (0, utils.CSSValueToString)(height);
	        widthStringLeft = (0, utils.CSSValueToString)(width);
	        heightStringLeft = (0, utils.CSSValueToString)(height);
	      } else {
	        widthString = "calc( ".concat((0, utils.CSSValueToString)(width), " + ").concat((0, utils.CSSValueToString)(bleed.left), " + ").concat((0, utils.CSSValueToString)(bleed.right), " )");
	        heightString = "calc( ".concat((0, utils.CSSValueToString)(height), " + ").concat((0, utils.CSSValueToString)(bleed.top), " + ").concat((0, utils.CSSValueToString)(bleed.bottom), " )");
	        widthStringRight = "calc( ".concat((0, utils.CSSValueToString)(width), " + ").concat((0, utils.CSSValueToString)(bleed.left), " + ").concat((0, utils.CSSValueToString)(bleed.right), " )");
	        heightStringRight = "calc( ".concat((0, utils.CSSValueToString)(height), " + ").concat((0, utils.CSSValueToString)(bleed.top), " + ").concat((0, utils.CSSValueToString)(bleed.bottom), " )");
	        widthStringLeft = "calc( ".concat((0, utils.CSSValueToString)(width), " + ").concat((0, utils.CSSValueToString)(bleed.left), " + ").concat((0, utils.CSSValueToString)(bleed.right), " )");
	        heightStringLeft = "calc( ".concat((0, utils.CSSValueToString)(height), " + ").concat((0, utils.CSSValueToString)(bleed.top), " + ").concat((0, utils.CSSValueToString)(bleed.bottom), " )");
	        var bleedTop = this.createVariable("--pagedjs-bleed-top", (0, utils.CSSValueToString)(bleed.top));
	        var bleedRight = this.createVariable("--pagedjs-bleed-right", (0, utils.CSSValueToString)(bleed.right));
	        var bleedBottom = this.createVariable("--pagedjs-bleed-bottom", (0, utils.CSSValueToString)(bleed.bottom));
	        var bleedLeft = this.createVariable("--pagedjs-bleed-left", (0, utils.CSSValueToString)(bleed.left));
	        var bleedTopRecto = this.createVariable("--pagedjs-bleed-right-top", (0, utils.CSSValueToString)(bleed.top));
	        var bleedRightRecto = this.createVariable("--pagedjs-bleed-right-right", (0, utils.CSSValueToString)(bleed.right));
	        var bleedBottomRecto = this.createVariable("--pagedjs-bleed-right-bottom", (0, utils.CSSValueToString)(bleed.bottom));
	        var bleedLeftRecto = this.createVariable("--pagedjs-bleed-right-left", (0, utils.CSSValueToString)(bleed.left));
	        var bleedTopVerso = this.createVariable("--pagedjs-bleed-left-top", (0, utils.CSSValueToString)(bleed.top));
	        var bleedRightVerso = this.createVariable("--pagedjs-bleed-left-right", (0, utils.CSSValueToString)(bleed.right));
	        var bleedBottomVerso = this.createVariable("--pagedjs-bleed-left-bottom", (0, utils.CSSValueToString)(bleed.bottom));
	        var bleedLeftVerso = this.createVariable("--pagedjs-bleed-left-left", (0, utils.CSSValueToString)(bleed.left));

	        if (bleedrecto) {
	          bleedTopRecto = this.createVariable("--pagedjs-bleed-right-top", (0, utils.CSSValueToString)(bleedrecto.top));
	          bleedRightRecto = this.createVariable("--pagedjs-bleed-right-right", (0, utils.CSSValueToString)(bleedrecto.right));
	          bleedBottomRecto = this.createVariable("--pagedjs-bleed-right-bottom", (0, utils.CSSValueToString)(bleedrecto.bottom));
	          bleedLeftRecto = this.createVariable("--pagedjs-bleed-right-left", (0, utils.CSSValueToString)(bleedrecto.left));
	          widthStringRight = "calc( ".concat((0, utils.CSSValueToString)(width), " + ").concat((0, utils.CSSValueToString)(bleedrecto.left), " + ").concat((0, utils.CSSValueToString)(bleedrecto.right), " )");
	          heightStringRight = "calc( ".concat((0, utils.CSSValueToString)(height), " + ").concat((0, utils.CSSValueToString)(bleedrecto.top), " + ").concat((0, utils.CSSValueToString)(bleedrecto.bottom), " )");
	        }

	        if (bleedverso) {
	          bleedTopVerso = this.createVariable("--pagedjs-bleed-left-top", (0, utils.CSSValueToString)(bleedverso.top));
	          bleedRightVerso = this.createVariable("--pagedjs-bleed-left-right", (0, utils.CSSValueToString)(bleedverso.right));
	          bleedBottomVerso = this.createVariable("--pagedjs-bleed-left-bottom", (0, utils.CSSValueToString)(bleedverso.bottom));
	          bleedLeftVerso = this.createVariable("--pagedjs-bleed-left-left", (0, utils.CSSValueToString)(bleedverso.left));
	          widthStringLeft = "calc( ".concat((0, utils.CSSValueToString)(width), " + ").concat((0, utils.CSSValueToString)(bleedverso.left), " + ").concat((0, utils.CSSValueToString)(bleedverso.right), " )");
	          heightStringLeft = "calc( ".concat((0, utils.CSSValueToString)(height), " + ").concat((0, utils.CSSValueToString)(bleedverso.top), " + ").concat((0, utils.CSSValueToString)(bleedverso.bottom), " )");
	        }

	        var pageWidthVar = this.createVariable("--pagedjs-width", (0, utils.CSSValueToString)(width));
	        var pageHeightVar = this.createVariable("--pagedjs-height", (0, utils.CSSValueToString)(height));
	        rules.push(bleedTop, bleedRight, bleedBottom, bleedLeft, bleedTopRecto, bleedRightRecto, bleedBottomRecto, bleedLeftRecto, bleedTopVerso, bleedRightVerso, bleedBottomVerso, bleedLeftVerso, pageWidthVar, pageHeightVar);
	      }

	      if (marks) {
	        marks.forEach(function (mark) {
	          var markDisplay = _this4.createVariable("--pagedjs-mark-" + mark + "-display", "block");

	          rules.push(markDisplay);
	        });
	      } // orientation variable


	      if (orientation) {
	        var oVar = this.createVariable("--pagedjs-orientation", orientation);
	        rules.push(oVar);

	        if (orientation !== "portrait") {
	          // reverse for orientation
	          var _ref2 = [heightString, widthString];
	          widthString = _ref2[0];
	          heightString = _ref2[1];
	          var _ref3 = [heightStringRight, widthStringRight];
	          widthStringRight = _ref3[0];
	          heightStringRight = _ref3[1];
	          var _ref4 = [heightStringLeft, widthStringLeft];
	          widthStringLeft = _ref4[0];
	          heightStringLeft = _ref4[1];
	        }
	      }

	      var wVar = this.createVariable("--pagedjs-width", widthString);
	      var hVar = this.createVariable("--pagedjs-height", heightString);
	      var wVarR = this.createVariable("--pagedjs-width-right", widthStringRight);
	      var hVarR = this.createVariable("--pagedjs-height-right", heightStringRight);
	      var wVarL = this.createVariable("--pagedjs-width-left", widthStringLeft);
	      var hVarL = this.createVariable("--pagedjs-height-left", heightStringLeft);
	      rules.push(wVar, hVar, wVarR, hVarR, wVarL, hVarL);
	      var rule = this.createRule(selectors, rules);
	      ast.children.appendData(rule);
	    }
	    /*
	    @page {
	    	size: var(--pagedjs-width) var(--pagedjs-height);
	    	margin: 0;
	    	padding: 0;
	    }
	    */

	  }, {
	    key: "addRootPage",
	    value: function addRootPage(ast, size, bleed, bleedrecto, bleedverso) {
	      var width = size.width,
	          height = size.height,
	          orientation = size.orientation,
	          format = size.format;
	      var children = new _cssTree["default"].List();
	      var childrenLeft = new _cssTree["default"].List();
	      var childrenRight = new _cssTree["default"].List();
	      var dimensions = new _cssTree["default"].List();
	      var dimensionsLeft = new _cssTree["default"].List();
	      var dimensionsRight = new _cssTree["default"].List();

	      if (bleed) {
	        var widthCalculations = new _cssTree["default"].List();
	        var heightCalculations = new _cssTree["default"].List(); // width

	        widthCalculations.appendData({
	          type: "Dimension",
	          unit: width.unit,
	          value: width.value
	        });
	        widthCalculations.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        widthCalculations.appendData({
	          type: "Operator",
	          value: "+"
	        });
	        widthCalculations.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        widthCalculations.appendData({
	          type: "Dimension",
	          unit: bleed.left.unit,
	          value: bleed.left.value
	        });
	        widthCalculations.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        widthCalculations.appendData({
	          type: "Operator",
	          value: "+"
	        });
	        widthCalculations.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        widthCalculations.appendData({
	          type: "Dimension",
	          unit: bleed.right.unit,
	          value: bleed.right.value
	        }); // height

	        heightCalculations.appendData({
	          type: "Dimension",
	          unit: height.unit,
	          value: height.value
	        });
	        heightCalculations.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        heightCalculations.appendData({
	          type: "Operator",
	          value: "+"
	        });
	        heightCalculations.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        heightCalculations.appendData({
	          type: "Dimension",
	          unit: bleed.top.unit,
	          value: bleed.top.value
	        });
	        heightCalculations.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        heightCalculations.appendData({
	          type: "Operator",
	          value: "+"
	        });
	        heightCalculations.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        heightCalculations.appendData({
	          type: "Dimension",
	          unit: bleed.bottom.unit,
	          value: bleed.bottom.value
	        });
	        dimensions.appendData({
	          type: "Function",
	          name: "calc",
	          children: widthCalculations
	        });
	        dimensions.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        dimensions.appendData({
	          type: "Function",
	          name: "calc",
	          children: heightCalculations
	        });
	      } else if (format) {
	        dimensions.appendData({
	          type: "Identifier",
	          name: format
	        });

	        if (orientation) {
	          dimensions.appendData({
	            type: "WhiteSpace",
	            value: " "
	          });
	          dimensions.appendData({
	            type: "Identifier",
	            name: orientation
	          });
	        }
	      } else {
	        dimensions.appendData({
	          type: "Dimension",
	          unit: width.unit,
	          value: width.value
	        });
	        dimensions.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        dimensions.appendData({
	          type: "Dimension",
	          unit: height.unit,
	          value: height.value
	        });
	      }

	      children.appendData({
	        type: "Declaration",
	        property: "size",
	        loc: null,
	        value: {
	          type: "Value",
	          children: dimensions
	        }
	      });
	      children.appendData({
	        type: "Declaration",
	        property: "margin",
	        loc: null,
	        value: {
	          type: "Value",
	          children: [{
	            type: "Dimension",
	            unit: "px",
	            value: 0
	          }]
	        }
	      });
	      children.appendData({
	        type: "Declaration",
	        property: "padding",
	        loc: null,
	        value: {
	          type: "Value",
	          children: [{
	            type: "Dimension",
	            unit: "px",
	            value: 0
	          }]
	        }
	      });
	      children.appendData({
	        type: "Declaration",
	        property: "padding",
	        loc: null,
	        value: {
	          type: "Value",
	          children: [{
	            type: "Dimension",
	            unit: "px",
	            value: 0
	          }]
	        }
	      });
	      var rule = ast.children.createItem({
	        type: "Atrule",
	        prelude: null,
	        name: "page",
	        block: {
	          type: "Block",
	          loc: null,
	          children: children
	        }
	      });
	      ast.children.append(rule);

	      if (bleedverso) {
	        var widthCalculationsLeft = new _cssTree["default"].List();
	        var heightCalculationsLeft = new _cssTree["default"].List(); // width

	        widthCalculationsLeft.appendData({
	          type: "Dimension",
	          unit: width.unit,
	          value: width.value
	        });
	        widthCalculationsLeft.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        widthCalculationsLeft.appendData({
	          type: "Operator",
	          value: "+"
	        });
	        widthCalculationsLeft.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        widthCalculationsLeft.appendData({
	          type: "Dimension",
	          unit: bleedverso.left.unit,
	          value: bleedverso.left.value
	        });
	        widthCalculationsLeft.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        widthCalculationsLeft.appendData({
	          type: "Operator",
	          value: "+"
	        });
	        widthCalculationsLeft.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        widthCalculationsLeft.appendData({
	          type: "Dimension",
	          unit: bleedverso.right.unit,
	          value: bleedverso.right.value
	        }); // height

	        heightCalculationsLeft.appendData({
	          type: "Dimension",
	          unit: height.unit,
	          value: height.value
	        });
	        heightCalculationsLeft.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        heightCalculationsLeft.appendData({
	          type: "Operator",
	          value: "+"
	        });
	        heightCalculationsLeft.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        heightCalculationsLeft.appendData({
	          type: "Dimension",
	          unit: bleedverso.top.unit,
	          value: bleedverso.top.value
	        });
	        heightCalculationsLeft.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        heightCalculationsLeft.appendData({
	          type: "Operator",
	          value: "+"
	        });
	        heightCalculationsLeft.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        heightCalculationsLeft.appendData({
	          type: "Dimension",
	          unit: bleedverso.bottom.unit,
	          value: bleedverso.bottom.value
	        });
	        dimensionsLeft.appendData({
	          type: "Function",
	          name: "calc",
	          children: widthCalculationsLeft
	        });
	        dimensionsLeft.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        dimensionsLeft.appendData({
	          type: "Function",
	          name: "calc",
	          children: heightCalculationsLeft
	        });
	        childrenLeft.appendData({
	          type: "Declaration",
	          property: "size",
	          loc: null,
	          value: {
	            type: "Value",
	            children: dimensionsLeft
	          }
	        });
	        var ruleLeft = ast.children.createItem({
	          type: "Atrule",
	          prelude: null,
	          name: "page :left",
	          block: {
	            type: "Block",
	            loc: null,
	            children: childrenLeft
	          }
	        });
	        ast.children.append(ruleLeft);
	      }

	      if (bleedrecto) {
	        var widthCalculationsRight = new _cssTree["default"].List();
	        var heightCalculationsRight = new _cssTree["default"].List(); // width

	        widthCalculationsRight.appendData({
	          type: "Dimension",
	          unit: width.unit,
	          value: width.value
	        });
	        widthCalculationsRight.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        widthCalculationsRight.appendData({
	          type: "Operator",
	          value: "+"
	        });
	        widthCalculationsRight.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        widthCalculationsRight.appendData({
	          type: "Dimension",
	          unit: bleedrecto.left.unit,
	          value: bleedrecto.left.value
	        });
	        widthCalculationsRight.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        widthCalculationsRight.appendData({
	          type: "Operator",
	          value: "+"
	        });
	        widthCalculationsRight.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        widthCalculationsRight.appendData({
	          type: "Dimension",
	          unit: bleedrecto.right.unit,
	          value: bleedrecto.right.value
	        }); // height

	        heightCalculationsRight.appendData({
	          type: "Dimension",
	          unit: height.unit,
	          value: height.value
	        });
	        heightCalculationsRight.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        heightCalculationsRight.appendData({
	          type: "Operator",
	          value: "+"
	        });
	        heightCalculationsRight.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        heightCalculationsRight.appendData({
	          type: "Dimension",
	          unit: bleedrecto.top.unit,
	          value: bleedrecto.top.value
	        });
	        heightCalculationsRight.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        heightCalculationsRight.appendData({
	          type: "Operator",
	          value: "+"
	        });
	        heightCalculationsRight.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        heightCalculationsRight.appendData({
	          type: "Dimension",
	          unit: bleedrecto.bottom.unit,
	          value: bleedrecto.bottom.value
	        });
	        dimensionsRight.appendData({
	          type: "Function",
	          name: "calc",
	          children: widthCalculationsRight
	        });
	        dimensionsRight.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });
	        dimensionsRight.appendData({
	          type: "Function",
	          name: "calc",
	          children: heightCalculationsRight
	        });
	        childrenRight.appendData({
	          type: "Declaration",
	          property: "size",
	          loc: null,
	          value: {
	            type: "Value",
	            children: dimensionsRight
	          }
	        });
	        var ruleRight = ast.children.createItem({
	          type: "Atrule",
	          prelude: null,
	          name: "page :right",
	          block: {
	            type: "Block",
	            loc: null,
	            children: childrenRight
	          }
	        });
	        ast.children.append(ruleRight);
	      }
	    }
	  }, {
	    key: "getNth",
	    value: function getNth(nth) {
	      var n = nth.indexOf("n");
	      var plus = nth.indexOf("+");
	      var splitN = nth.split("n");
	      var splitP = nth.split("+");
	      var a = null;
	      var b = null;

	      if (n > -1) {
	        a = splitN[0];

	        if (plus > -1) {
	          b = splitP[1];
	        }
	      } else {
	        b = nth;
	      }

	      return {
	        type: "Nth",
	        loc: null,
	        selector: null,
	        nth: {
	          type: "AnPlusB",
	          loc: null,
	          a: a,
	          b: b
	        }
	      };
	    }
	  }, {
	    key: "addPageAttributes",
	    value: function addPageAttributes(page, start, pages) {
	      var named = start.dataset.page;

	      if (named) {
	        page.name = named;
	        page.element.classList.add("pagedjs_named_page");
	        page.element.classList.add("pagedjs_" + named + "_page");

	        if (!start.dataset.splitFrom) {
	          page.element.classList.add("pagedjs_" + named + "_first_page");
	        }
	      }
	    }
	  }, {
	    key: "getStartElement",
	    value: function getStartElement(content, breakToken) {
	      var node = breakToken && breakToken.node;

	      if (!content && !breakToken) {
	        return;
	      } // No break


	      if (!node) {
	        return content.children[0];
	      } // Top level element


	      if (node.nodeType === 1 && node.parentNode.nodeType === 11) {
	        return node;
	      } // Named page


	      if (node.nodeType === 1 && node.dataset.page) {
	        return node;
	      } // Get top level Named parent


	      var fragment = (0, dom.rebuildAncestors)(node);
	      var pages = fragment.querySelectorAll("[data-page]");

	      if (pages.length) {
	        return pages[pages.length - 1];
	      } else {
	        return fragment.children[0];
	      }
	    }
	  }, {
	    key: "beforePageLayout",
	    value: function beforePageLayout(page, contents, breakToken, chunker) {
	      var start = this.getStartElement(contents, breakToken);

	      if (start) {
	        this.addPageAttributes(page, start, chunker.pages);
	      }
	    }
	  }, {
	    key: "afterPageLayout",
	    value: function afterPageLayout(fragment, page, breakToken, chunker) {
	      for (var m in this.marginalia) {
	        var margin = this.marginalia[m];
	        var sels = m.split(" ");
	        var content = void 0;

	        if (page.element.matches(sels[0]) && margin.hasContent) {
	          content = page.element.querySelector(sels[1]);
	          content.classList.add("hasContent");
	        }
	      } // check center


	      ["top", "bottom"].forEach(function (loc) {
	        var marginGroup = page.element.querySelector(".pagedjs_margin-" + loc);
	        var center = page.element.querySelector(".pagedjs_margin-" + loc + "-center");
	        var left = page.element.querySelector(".pagedjs_margin-" + loc + "-left");
	        var right = page.element.querySelector(".pagedjs_margin-" + loc + "-right");
	        var centerContent = center.classList.contains("hasContent");
	        var leftContent = left.classList.contains("hasContent");
	        var rightContent = right.classList.contains("hasContent");
	        var centerWidth, leftWidth, rightWidth;

	        if (leftContent) {
	          leftWidth = window.getComputedStyle(left)["max-width"];
	        }

	        if (rightContent) {
	          rightWidth = window.getComputedStyle(right)["max-width"];
	        }

	        if (centerContent) {
	          centerWidth = window.getComputedStyle(center)["max-width"];

	          if (centerWidth === "none" || centerWidth === "auto") {
	            if (!leftContent && !rightContent) {
	              marginGroup.style["grid-template-columns"] = "0 1fr 0";
	            } else if (leftContent) {
	              if (!rightContent) {
	                if (leftWidth !== "none" && leftWidth !== "auto") {
	                  marginGroup.style["grid-template-columns"] = leftWidth + " 1fr " + leftWidth;
	                } else {
	                  marginGroup.style["grid-template-columns"] = "auto auto 1fr";
	                  left.style["white-space"] = "nowrap";
	                  center.style["white-space"] = "nowrap";
	                  var leftOuterWidth = left.offsetWidth;
	                  var centerOuterWidth = center.offsetWidth;
	                  var outerwidths = leftOuterWidth + centerOuterWidth;
	                  var newcenterWidth = centerOuterWidth * 100 / outerwidths;
	                  marginGroup.style["grid-template-columns"] = "minmax(16.66%, 1fr) minmax(33%, " + newcenterWidth + "%) minmax(16.66%, 1fr)";
	                  left.style["white-space"] = "normal";
	                  center.style["white-space"] = "normal";
	                }
	              } else {
	                if (leftWidth !== "none" && leftWidth !== "auto") {
	                  if (rightWidth !== "none" && rightWidth !== "auto") {
	                    marginGroup.style["grid-template-columns"] = leftWidth + " 1fr " + rightWidth;
	                  } else {
	                    marginGroup.style["grid-template-columns"] = leftWidth + " 1fr " + leftWidth;
	                  }
	                } else {
	                  if (rightWidth !== "none" && rightWidth !== "auto") {
	                    marginGroup.style["grid-template-columns"] = rightWidth + " 1fr " + rightWidth;
	                  } else {
	                    marginGroup.style["grid-template-columns"] = "auto auto 1fr";
	                    left.style["white-space"] = "nowrap";
	                    center.style["white-space"] = "nowrap";
	                    right.style["white-space"] = "nowrap";
	                    var _leftOuterWidth = left.offsetWidth;
	                    var _centerOuterWidth = center.offsetWidth;
	                    var rightOuterWidth = right.offsetWidth;

	                    var _outerwidths = _leftOuterWidth + _centerOuterWidth + rightOuterWidth;

	                    var _newcenterWidth = _centerOuterWidth * 100 / _outerwidths;

	                    if (_newcenterWidth > 40) {
	                      marginGroup.style["grid-template-columns"] = "minmax(16.66%, 1fr) minmax(33%, " + _newcenterWidth + "%) minmax(16.66%, 1fr)";
	                    } else {
	                      marginGroup.style["grid-template-columns"] = "repeat(3, 1fr)";
	                    }

	                    left.style["white-space"] = "normal";
	                    center.style["white-space"] = "normal";
	                    right.style["white-space"] = "normal";
	                  }
	                }
	              }
	            } else {
	              if (rightWidth !== "none" && rightWidth !== "auto") {
	                marginGroup.style["grid-template-columns"] = rightWidth + " 1fr " + rightWidth;
	              } else {
	                marginGroup.style["grid-template-columns"] = "auto auto 1fr";
	                right.style["white-space"] = "nowrap";
	                center.style["white-space"] = "nowrap";
	                var _rightOuterWidth = right.offsetWidth;
	                var _centerOuterWidth2 = center.offsetWidth;

	                var _outerwidths2 = _rightOuterWidth + _centerOuterWidth2;

	                var _newcenterWidth2 = _centerOuterWidth2 * 100 / _outerwidths2;

	                marginGroup.style["grid-template-columns"] = "minmax(16.66%, 1fr) minmax(33%, " + _newcenterWidth2 + "%) minmax(16.66%, 1fr)";
	                right.style["white-space"] = "normal";
	                center.style["white-space"] = "normal";
	              }
	            }
	          } else if (centerWidth !== "none" && centerWidth !== "auto") {
	            if (leftContent && leftWidth !== "none" && leftWidth !== "auto") {
	              marginGroup.style["grid-template-columns"] = leftWidth + " " + centerWidth + " 1fr";
	            } else if (rightContent && rightWidth !== "none" && rightWidth !== "auto") {
	              marginGroup.style["grid-template-columns"] = "1fr " + centerWidth + " " + rightWidth;
	            } else {
	              marginGroup.style["grid-template-columns"] = "1fr " + centerWidth + " 1fr";
	            }
	          }
	        } else {
	          if (leftContent) {
	            if (!rightContent) {
	              marginGroup.style["grid-template-columns"] = "1fr 0 0";
	            } else {
	              if (leftWidth !== "none" && leftWidth !== "auto") {
	                if (rightWidth !== "none" && rightWidth !== "auto") {
	                  marginGroup.style["grid-template-columns"] = leftWidth + " 1fr " + rightWidth;
	                } else {
	                  marginGroup.style["grid-template-columns"] = leftWidth + " 0 1fr";
	                }
	              } else {
	                if (rightWidth !== "none" && rightWidth !== "auto") {
	                  marginGroup.style["grid-template-columns"] = "1fr 0 " + rightWidth;
	                } else {
	                  marginGroup.style["grid-template-columns"] = "auto 1fr auto";
	                  left.style["white-space"] = "nowrap";
	                  right.style["white-space"] = "nowrap";
	                  var _leftOuterWidth2 = left.offsetWidth;
	                  var _rightOuterWidth2 = right.offsetWidth;

	                  var _outerwidths3 = _leftOuterWidth2 + _rightOuterWidth2;

	                  var newLeftWidth = _leftOuterWidth2 * 100 / _outerwidths3;
	                  marginGroup.style["grid-template-columns"] = "minmax(16.66%, " + newLeftWidth + "%) 0 1fr";
	                  left.style["white-space"] = "normal";
	                  right.style["white-space"] = "normal";
	                }
	              }
	            }
	          } else {
	            if (rightWidth !== "none" && rightWidth !== "auto") {
	              marginGroup.style["grid-template-columns"] = "1fr 0 " + rightWidth;
	            } else {
	              marginGroup.style["grid-template-columns"] = "0 0 1fr";
	            }
	          }
	        }
	      }); // check middle

	      ["left", "right"].forEach(function (loc) {
	        var middle = page.element.querySelector(".pagedjs_margin-" + loc + "-middle.hasContent");
	        var marginGroup = page.element.querySelector(".pagedjs_margin-" + loc);
	        var top = page.element.querySelector(".pagedjs_margin-" + loc + "-top");
	        var bottom = page.element.querySelector(".pagedjs_margin-" + loc + "-bottom");
	        var topContent = top.classList.contains("hasContent");
	        var bottomContent = bottom.classList.contains("hasContent");
	        var middleHeight, topHeight, bottomHeight;

	        if (topContent) {
	          topHeight = window.getComputedStyle(top)["max-height"];
	        }

	        if (bottomContent) {
	          bottomHeight = window.getComputedStyle(bottom)["max-height"];
	        }

	        if (middle) {
	          middleHeight = window.getComputedStyle(middle)["max-height"];

	          if (middleHeight === "none" || middleHeight === "auto") {
	            if (!topContent && !bottomContent) {
	              marginGroup.style["grid-template-rows"] = "0 1fr 0";
	            } else if (topContent) {
	              if (!bottomContent) {
	                if (topHeight !== "none" && topHeight !== "auto") {
	                  marginGroup.style["grid-template-rows"] = topHeight + " calc(100% - " + topHeight + "*2) " + topHeight;
	                }
	              } else {
	                if (topHeight !== "none" && topHeight !== "auto") {
	                  if (bottomHeight !== "none" && bottomHeight !== "auto") {
	                    marginGroup.style["grid-template-rows"] = topHeight + " calc(100% - " + topHeight + " - " + bottomHeight + ") " + bottomHeight;
	                  } else {
	                    marginGroup.style["grid-template-rows"] = topHeight + " calc(100% - " + topHeight + "*2) " + topHeight;
	                  }
	                } else {
	                  if (bottomHeight !== "none" && bottomHeight !== "auto") {
	                    marginGroup.style["grid-template-rows"] = bottomHeight + " calc(100% - " + bottomHeight + "*2) " + bottomHeight;
	                  }
	                }
	              }
	            } else {
	              if (bottomHeight !== "none" && bottomHeight !== "auto") {
	                marginGroup.style["grid-template-rows"] = bottomHeight + " calc(100% - " + bottomHeight + "*2) " + bottomHeight;
	              }
	            }
	          } else {
	            if (topContent && topHeight !== "none" && topHeight !== "auto") {
	              marginGroup.style["grid-template-rows"] = topHeight + " " + middleHeight + " calc(100% - (" + topHeight + " + " + middleHeight + "))";
	            } else if (bottomContent && bottomHeight !== "none" && bottomHeight !== "auto") {
	              marginGroup.style["grid-template-rows"] = "1fr " + middleHeight + " " + bottomHeight;
	            } else {
	              marginGroup.style["grid-template-rows"] = "calc((100% - " + middleHeight + ")/2) " + middleHeight + " calc((100% - " + middleHeight + ")/2)";
	            }
	          }
	        } else {
	          if (topContent) {
	            if (!bottomContent) {
	              marginGroup.style["grid-template-rows"] = "1fr 0 0";
	            } else {
	              if (topHeight !== "none" && topHeight !== "auto") {
	                if (bottomHeight !== "none" && bottomHeight !== "auto") {
	                  marginGroup.style["grid-template-rows"] = topHeight + " 1fr " + bottomHeight;
	                } else {
	                  marginGroup.style["grid-template-rows"] = topHeight + " 0 1fr";
	                }
	              } else {
	                if (bottomHeight !== "none" && bottomHeight !== "auto") {
	                  marginGroup.style["grid-template-rows"] = "1fr 0 " + bottomHeight;
	                } else {
	                  marginGroup.style["grid-template-rows"] = "1fr 0 1fr";
	                }
	              }
	            }
	          } else {
	            if (bottomHeight !== "none" && bottomHeight !== "auto") {
	              marginGroup.style["grid-template-rows"] = "1fr 0 " + bottomHeight;
	            } else {
	              marginGroup.style["grid-template-rows"] = "0 0 1fr";
	            }
	          }
	        }
	      });
	    } // CSS Tree Helpers

	  }, {
	    key: "selectorsForPage",
	    value: function selectorsForPage(page) {
	      var nthlist;
	      var nth;
	      var selectors = new _cssTree["default"].List();
	      selectors.insertData({
	        type: "ClassSelector",
	        name: "pagedjs_page"
	      }); // Named page

	      if (page.name) {
	        selectors.insertData({
	          type: "ClassSelector",
	          name: "pagedjs_named_page"
	        });
	        selectors.insertData({
	          type: "ClassSelector",
	          name: "pagedjs_" + page.name + "_page"
	        });
	      } // PsuedoSelector


	      if (page.psuedo && !(page.name && page.psuedo === "first")) {
	        selectors.insertData({
	          type: "ClassSelector",
	          name: "pagedjs_" + page.psuedo + "_page"
	        });
	      }

	      if (page.name && page.psuedo === "first") {
	        selectors.insertData({
	          type: "ClassSelector",
	          name: "pagedjs_" + page.name + "_" + page.psuedo + "_page"
	        });
	      } // Nth


	      if (page.nth) {
	        nthlist = new _cssTree["default"].List();
	        nth = this.getNth(page.nth);
	        nthlist.insertData(nth);
	        selectors.insertData({
	          type: "PseudoClassSelector",
	          name: "nth-of-type",
	          children: nthlist
	        });
	      }

	      return selectors;
	    }
	  }, {
	    key: "selectorsForPageMargin",
	    value: function selectorsForPageMargin(page, margin) {
	      var selectors = this.selectorsForPage(page);
	      selectors.insertData({
	        type: "Combinator",
	        name: " "
	      });
	      selectors.insertData({
	        type: "ClassSelector",
	        name: "pagedjs_margin-" + margin
	      });
	      return selectors;
	    }
	  }, {
	    key: "createDeclaration",
	    value: function createDeclaration(property, value, important) {
	      var children = new _cssTree["default"].List();
	      children.insertData({
	        type: "Identifier",
	        loc: null,
	        name: value
	      });
	      return {
	        type: "Declaration",
	        loc: null,
	        important: important,
	        property: property,
	        value: {
	          type: "Value",
	          loc: null,
	          children: children
	        }
	      };
	    }
	  }, {
	    key: "createVariable",
	    value: function createVariable(property, value) {
	      return {
	        type: "Declaration",
	        loc: null,
	        property: property,
	        value: {
	          type: "Raw",
	          value: value
	        }
	      };
	    }
	  }, {
	    key: "createCalculatedDimension",
	    value: function createCalculatedDimension(property, items, important) {
	      var operator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "+";
	      var children = new _cssTree["default"].List();
	      var calculations = new _cssTree["default"].List();
	      items.forEach(function (item, index) {
	        calculations.appendData({
	          type: "Dimension",
	          unit: item.unit,
	          value: item.value
	        });
	        calculations.appendData({
	          type: "WhiteSpace",
	          value: " "
	        });

	        if (index + 1 < items.length) {
	          calculations.appendData({
	            type: "Operator",
	            value: operator
	          });
	          calculations.appendData({
	            type: "WhiteSpace",
	            value: " "
	          });
	        }
	      });
	      children.insertData({
	        type: "Function",
	        loc: null,
	        name: "calc",
	        children: calculations
	      });
	      return {
	        type: "Declaration",
	        loc: null,
	        important: important,
	        property: property,
	        value: {
	          type: "Value",
	          loc: null,
	          children: children
	        }
	      };
	    }
	  }, {
	    key: "createDimension",
	    value: function createDimension(property, cssValue, important) {
	      var children = new _cssTree["default"].List();
	      children.insertData({
	        type: "Dimension",
	        loc: null,
	        value: cssValue.value,
	        unit: cssValue.unit
	      });
	      return {
	        type: "Declaration",
	        loc: null,
	        important: important,
	        property: property,
	        value: {
	          type: "Value",
	          loc: null,
	          children: children
	        }
	      };
	    }
	  }, {
	    key: "createBlock",
	    value: function createBlock(declarations) {
	      var block = new _cssTree["default"].List();
	      declarations.forEach(function (declaration) {
	        block.insertData(declaration);
	      });
	      return {
	        type: "Block",
	        loc: null,
	        children: block
	      };
	    }
	  }, {
	    key: "createRule",
	    value: function createRule(selectors, block) {
	      var selectorList = new _cssTree["default"].List();
	      selectorList.insertData({
	        type: "Selector",
	        children: selectors
	      });

	      if (Array.isArray(block)) {
	        block = this.createBlock(block);
	      }

	      return {
	        type: "Rule",
	        prelude: {
	          type: "SelectorList",
	          children: selectorList
	        },
	        block: block
	      };
	    }
	  }]);
	  return AtPage;
	}(_handler["default"]);

	var _default = AtPage;
	exports["default"] = _default;
	});

	unwrapExports(atpage);

	var breaks = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inherits2 = interopRequireDefault(inherits);

	var _handler = interopRequireDefault(handler);

	var _cssTree = interopRequireDefault(lib);



	var Breaks =
	/*#__PURE__*/
	function (_Handler) {
	  (0, _inherits2["default"])(Breaks, _Handler);

	  function Breaks(chunker, polisher, caller) {
	    var _this;

	    (0, _classCallCheck2["default"])(this, Breaks);
	    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Breaks).call(this, chunker, polisher, caller));
	    _this.breaks = {};
	    return _this;
	  }

	  (0, _createClass2["default"])(Breaks, [{
	    key: "onDeclaration",
	    value: function onDeclaration(declaration, dItem, dList, rule) {
	      var _this2 = this;

	      var property = declaration.property;

	      if (property === "page") {
	        var children = declaration.value.children.first();
	        var value = children.name;

	        var selector = _cssTree["default"].generate(rule.ruleNode.prelude);

	        var name = value;
	        var breaker = {
	          property: property,
	          value: value,
	          selector: selector,
	          name: name
	        };
	        selector.split(",").forEach(function (s) {
	          if (!_this2.breaks[s]) {
	            _this2.breaks[s] = [breaker];
	          } else {
	            _this2.breaks[s].push(breaker);
	          }
	        });
	        dList.remove(dItem);
	      }

	      if (property === "break-before" || property === "break-after" || property === "page-break-before" || property === "page-break-after") {
	        var child = declaration.value.children.first();
	        var _value = child.name;

	        var _selector = _cssTree["default"].generate(rule.ruleNode.prelude);

	        if (property === "page-break-before") {
	          property = "break-before";
	        } else if (property === "page-break-after") {
	          property = "break-after";
	        }

	        var _breaker = {
	          property: property,
	          value: _value,
	          selector: _selector
	        };

	        _selector.split(",").forEach(function (s) {
	          if (!_this2.breaks[s]) {
	            _this2.breaks[s] = [_breaker];
	          } else {
	            _this2.breaks[s].push(_breaker);
	          }
	        }); // Remove from CSS -- handle right / left in module


	        dList.remove(dItem);
	      }
	    }
	  }, {
	    key: "afterParsed",
	    value: function afterParsed(parsed) {
	      this.processBreaks(parsed, this.breaks);
	    }
	  }, {
	    key: "processBreaks",
	    value: function processBreaks(parsed, breaks) {
	      for (var b in breaks) {
	        // Find elements
	        var elements = parsed.querySelectorAll(b); // Add break data

	        for (var i = 0; i < elements.length; i++) {
	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;

	          try {
	            for (var _iterator = breaks[b][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var prop = _step.value;

	              if (prop.property === "break-after") {
	                var nodeAfter = (0, dom.elementAfter)(elements[i], parsed);
	                elements[i].setAttribute("data-break-after", prop.value);

	                if (nodeAfter) {
	                  nodeAfter.setAttribute("data-previous-break-after", prop.value);
	                }
	              } else if (prop.property === "page") {
	                elements[i].setAttribute("data-page", prop.value);

	                var _nodeAfter = (0, dom.elementAfter)(elements[i], parsed);

	                if (_nodeAfter) {
	                  _nodeAfter.setAttribute("data-after-page", prop.value);
	                }
	              } else {
	                elements[i].setAttribute("data-" + prop.property, prop.value);
	              }
	            }
	          } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
	                _iterator["return"]();
	              }
	            } finally {
	              if (_didIteratorError) {
	                throw _iteratorError;
	              }
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: "mergeBreaks",
	    value: function mergeBreaks(pageBreaks, newBreaks) {
	      for (var b in newBreaks) {
	        if (b in pageBreaks) {
	          pageBreaks[b] = pageBreaks[b].concat(newBreaks[b]);
	        } else {
	          pageBreaks[b] = newBreaks[b];
	        }
	      }

	      return pageBreaks;
	    }
	  }, {
	    key: "addBreakAttributes",
	    value: function addBreakAttributes(pageElement, page) {
	      var before = pageElement.querySelector("[data-break-before]");
	      var after = pageElement.querySelector("[data-break-after]");
	      var previousBreakAfter = pageElement.querySelector("[data-previous-break-after]");

	      if (before) {
	        if (before.dataset.splitFrom) {
	          page.splitFrom = before.dataset.splitFrom;
	          pageElement.setAttribute("data-split-from", before.dataset.splitFrom);
	        } else if (before.dataset.breakBefore && before.dataset.breakBefore !== "avoid") {
	          page.breakBefore = before.dataset.breakBefore;
	          pageElement.setAttribute("data-break-before", before.dataset.breakBefore);
	        }
	      }

	      if (after && after.dataset) {
	        if (after.dataset.splitTo) {
	          page.splitTo = after.dataset.splitTo;
	          pageElement.setAttribute("data-split-to", after.dataset.splitTo);
	        } else if (after.dataset.breakAfter && after.dataset.breakAfter !== "avoid") {
	          page.breakAfter = after.dataset.breakAfter;
	          pageElement.setAttribute("data-break-after", after.dataset.breakAfter);
	        }
	      }

	      if (previousBreakAfter && previousBreakAfter.dataset) {
	        if (previousBreakAfter.dataset.previousBreakAfter && previousBreakAfter.dataset.previousBreakAfter !== "avoid") {
	          page.previousBreakAfter = previousBreakAfter.dataset.previousBreakAfter;
	        }
	      }
	    }
	  }, {
	    key: "afterPageLayout",
	    value: function afterPageLayout(pageElement, page) {
	      this.addBreakAttributes(pageElement, page);
	    }
	  }]);
	  return Breaks;
	}(_handler["default"]);

	var _default = Breaks;
	exports["default"] = _default;
	});

	unwrapExports(breaks);

	var printMedia = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inherits2 = interopRequireDefault(inherits);

	var _handler = interopRequireDefault(handler);

	var _cssTree = interopRequireDefault(lib);

	var PrintMedia =
	/*#__PURE__*/
	function (_Handler) {
	  (0, _inherits2["default"])(PrintMedia, _Handler);

	  function PrintMedia(chunker, polisher, caller) {
	    (0, _classCallCheck2["default"])(this, PrintMedia);
	    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(PrintMedia).call(this, chunker, polisher, caller));
	  }

	  (0, _createClass2["default"])(PrintMedia, [{
	    key: "onAtMedia",
	    value: function onAtMedia(node, item, list) {
	      var media = this.getMediaName(node);
	      var rules;

	      if (media === "print") {
	        rules = node.block.children; // Remove rules from the @media block

	        node.block.children = new _cssTree["default"].List(); // Append rules to the end of main rules list

	        list.appendList(rules);
	      }
	    }
	  }, {
	    key: "getMediaName",
	    value: function getMediaName(node) {
	      var media = "";

	      if (typeof node.prelude === "undefined" || node.prelude.type !== "AtrulePrelude") {
	        return;
	      }

	      _cssTree["default"].walk(node.prelude, {
	        visit: "Identifier",
	        enter: function enter(identNode, iItem, iList) {
	          media = identNode.name;
	        }
	      });

	      return media;
	    }
	  }]);
	  return PrintMedia;
	}(_handler["default"]);

	var _default = PrintMedia;
	exports["default"] = _default;
	});

	unwrapExports(printMedia);

	var splits = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inherits2 = interopRequireDefault(inherits);

	var _handler = interopRequireDefault(handler);

	var Splits =
	/*#__PURE__*/
	function (_Handler) {
	  (0, _inherits2["default"])(Splits, _Handler);

	  function Splits(chunker, polisher, caller) {
	    (0, _classCallCheck2["default"])(this, Splits);
	    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Splits).call(this, chunker, polisher, caller));
	  }

	  (0, _createClass2["default"])(Splits, [{
	    key: "afterPageLayout",
	    value: function afterPageLayout(pageElement, page, breakToken, chunker) {
	      var splits = Array.from(pageElement.querySelectorAll("[data-split-from]"));
	      var pages = pageElement.parentNode;
	      var index = Array.prototype.indexOf.call(pages.children, pageElement);
	      var prevPage;

	      if (index === 0) {
	        return;
	      }

	      prevPage = pages.children[index - 1];
	      var from; // Capture the last from element

	      splits.forEach(function (split) {
	        var ref = split.dataset.ref;
	        from = prevPage.querySelector("[data-ref='" + ref + "']:not([data-split-to])");

	        if (from) {
	          from.dataset.splitTo = ref;

	          if (!from.dataset.splitFrom) {
	            from.dataset.splitOriginal = true;
	          }
	        }
	      }); // Fix alignment on the deepest split element

	      if (from) {
	        this.handleAlignment(from);
	      }
	    }
	  }, {
	    key: "handleAlignment",
	    value: function handleAlignment(node) {
	      var styles = window.getComputedStyle(node);
	      var align = styles["text-align"];
	      var alignLast = styles["text-align-last"];
	      node.dataset.lastSplitElement = "true";

	      if (align === "justify" && alignLast === "auto") {
	        node.dataset.alignLastSplitElement = "justify";
	      } else {
	        node.dataset.alignLastSplitElement = alignLast;
	      }
	    }
	  }]);
	  return Splits;
	}(_handler["default"]);

	var _default = Splits;
	exports["default"] = _default;
	});

	unwrapExports(splits);

	var counters = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inherits2 = interopRequireDefault(inherits);

	var _handler = interopRequireDefault(handler);

	var _cssTree = interopRequireDefault(lib);

	var Counters =
	/*#__PURE__*/
	function (_Handler) {
	  (0, _inherits2["default"])(Counters, _Handler);

	  function Counters(chunker, polisher, caller) {
	    var _this;

	    (0, _classCallCheck2["default"])(this, Counters);
	    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Counters).call(this, chunker, polisher, caller));
	    _this.styleSheet = polisher.styleSheet;
	    _this.counters = {};
	    return _this;
	  }

	  (0, _createClass2["default"])(Counters, [{
	    key: "onDeclaration",
	    value: function onDeclaration(declaration, dItem, dList, rule) {
	      var property = declaration.property;

	      if (property === "counter-increment") {
	        var inc = this.handleIncrement(declaration, rule);

	        if (inc) {
	          dList.remove(dItem);
	        }
	      } else if (property === "counter-reset") {
	        var reset = this.handleReset(declaration, rule);

	        if (reset) {
	          dList.remove(dItem);
	        }
	      }
	    }
	  }, {
	    key: "onContent",
	    value: function onContent(funcNode, fItem, fList, declaration, rule) {
	      if (funcNode.name === "counter") ;
	    }
	  }, {
	    key: "afterParsed",
	    value: function afterParsed(parsed) {
	      this.processCounters(parsed, this.counters);
	      this.scopeCounters(this.counters);
	    }
	  }, {
	    key: "addCounter",
	    value: function addCounter(name) {
	      if (name in this.counters) {
	        return this.counters[name];
	      }

	      this.counters[name] = {
	        name: name,
	        increments: {},
	        resets: {}
	      };
	      return this.counters[name];
	    }
	  }, {
	    key: "handleIncrement",
	    value: function handleIncrement(declaration, rule) {
	      var identifier = declaration.value.children.first();
	      var number = declaration.value.children.getSize() > 1 && declaration.value.children.last().value;
	      var name = identifier && identifier.name;

	      if (name === "page" || name.indexOf("target-counter-") === 0) {
	        return;
	      }

	      var selector = _cssTree["default"].generate(rule.ruleNode.prelude);

	      var counter;

	      if (!(name in this.counters)) {
	        counter = this.addCounter(name);
	      } else {
	        counter = this.counters[name];
	      }

	      return counter.increments[selector] = {
	        selector: selector,
	        number: number || 1
	      };
	    }
	  }, {
	    key: "handleReset",
	    value: function handleReset(declaration, rule) {
	      var identifier = declaration.value.children.first();
	      var number = declaration.value.children.getSize() > 1 && declaration.value.children.last().value;
	      var name = identifier && identifier.name;

	      var selector = _cssTree["default"].generate(rule.ruleNode.prelude);

	      var counter;

	      if (!(name in this.counters)) {
	        counter = this.addCounter(name);
	      } else {
	        counter = this.counters[name];
	      }

	      return counter.resets[selector] = {
	        selector: selector,
	        number: number || 0
	      };
	    }
	  }, {
	    key: "processCounters",
	    value: function processCounters(parsed, counters) {
	      var counter;

	      for (var c in counters) {
	        counter = this.counters[c];
	        this.processCounterIncrements(parsed, counter);
	        this.processCounterResets(parsed, counter);
	        this.addCounterValues(parsed, counter);
	      }
	    }
	  }, {
	    key: "scopeCounters",
	    value: function scopeCounters(counters) {
	      var countersArray = [];

	      for (var c in counters) {
	        countersArray.push("".concat(counters[c].name, " 0"));
	      } // Add to pages to allow cross page scope


	      this.insertRule(".pagedjs_pages { counter-reset: ".concat(countersArray.join(" "), "}"));
	    }
	  }, {
	    key: "insertRule",
	    value: function insertRule(rule) {
	      this.styleSheet.insertRule(rule, this.styleSheet.cssRules.length);
	    }
	  }, {
	    key: "processCounterIncrements",
	    value: function processCounterIncrements(parsed, counter) {
	      var increment;

	      for (var inc in counter.increments) {
	        increment = counter.increments[inc]; // Find elements for increments

	        var incrementElements = parsed.querySelectorAll(increment.selector); // Add counter data

	        for (var i = 0; i < incrementElements.length; i++) {
	          incrementElements[i].setAttribute("data-counter-" + counter.name + "-increment", increment.number);
	          incrementElements[i].setAttribute("data-counter-increment", counter.name);
	        }
	      }
	    }
	  }, {
	    key: "processCounterResets",
	    value: function processCounterResets(parsed, counter) {
	      var reset;

	      for (var r in counter.resets) {
	        reset = counter.resets[r]; // Find elements for resets

	        var resetElements = parsed.querySelectorAll(reset.selector); // Add counter data

	        for (var i = 0; i < resetElements.length; i++) {
	          resetElements[i].setAttribute("data-counter-" + counter.name + "-reset", reset.number);
	          resetElements[i].setAttribute("data-counter-reset", counter.name);
	        }
	      }
	    }
	  }, {
	    key: "addCounterValues",
	    value: function addCounterValues(parsed, counter) {
	      var counterName = counter.name;
	      var elements = parsed.querySelectorAll("[data-counter-" + counterName + "-reset], [data-counter-" + counterName + "-increment]");
	      var count = 0;
	      var element;
	      var increment, reset;
	      var resetValue, incrementValue, resetDelta;
	      var incrementArray;

	      for (var i = 0; i < elements.length; i++) {
	        element = elements[i];
	        resetDelta = 0;
	        incrementArray = [];

	        if (element.hasAttribute("data-counter-" + counterName + "-reset")) {
	          reset = element.getAttribute("data-counter-" + counterName + "-reset");
	          resetValue = parseInt(reset); // Use negative increment value inplace of reset

	          resetDelta = resetValue - count;
	          incrementArray.push("".concat(counterName, " ").concat(resetDelta));
	          count = resetValue;
	        }

	        if (element.hasAttribute("data-counter-" + counterName + "-increment")) {
	          increment = element.getAttribute("data-counter-" + counterName + "-increment");
	          incrementValue = parseInt(increment);
	          count += incrementValue;
	          element.setAttribute("data-counter-" + counterName + "-value", count);
	          incrementArray.push("".concat(counterName, " ").concat(incrementValue));
	        }

	        if (incrementArray.length > 0) {
	          this.incrementCounterForElement(element, incrementArray);
	        }
	      }
	    }
	  }, {
	    key: "incrementCounterForElement",
	    value: function incrementCounterForElement(element, incrementArray) {
	      if (!element || !incrementArray || incrementArray.length === 0) return;
	      var ref = element.dataset.ref;
	      var prevIncrements = Array.from(this.styleSheet.cssRules).filter(function (rule) {
	        return rule.selectorText === "[data-ref=\"".concat(element.dataset.ref, "\"]:not([data-split-from])") && rule.style[0] === "counter-increment";
	      });
	      var increments = [];
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = prevIncrements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var styleRule = _step.value;
	          var values = styleRule.style.counterIncrement.split(" ");

	          for (var i = 0; i < values.length; i += 2) {
	            increments.push(values[i] + " " + values[i + 1]);
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
	            _iterator["return"]();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      Array.prototype.push.apply(increments, incrementArray);
	      this.insertRule("[data-ref=\"".concat(ref, "\"]:not([data-split-from]) { counter-increment: ").concat(increments.join(" "), " }"));
	    }
	  }, {
	    key: "afterPageLayout",
	    value: function afterPageLayout(pageElement, page) {
	      var _this2 = this;

	      var pgreset = pageElement.querySelectorAll("[data-counter-page-reset]");
	      pgreset.forEach(function (reset) {
	        var value = reset.datasetCounterPageReset;

	        _this2.styleSheet.insertRule("[data-page-number=\"".concat(pageElement.dataset.pageNumber, "\"] { counter-reset: page ").concat(value, " }"), _this2.styleSheet.cssRules.length);
	      });
	    }
	  }]);
	  return Counters;
	}(_handler["default"]);

	var _default = Counters;
	exports["default"] = _default;
	});

	unwrapExports(counters);

	var lists = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inherits2 = interopRequireDefault(inherits);

	var _handler = interopRequireDefault(handler);

	var Lists =
	/*#__PURE__*/
	function (_Handler) {
	  (0, _inherits2["default"])(Lists, _Handler);

	  function Lists(chunker, polisher, caller) {
	    (0, _classCallCheck2["default"])(this, Lists);
	    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Lists).call(this, chunker, polisher, caller));
	  }

	  (0, _createClass2["default"])(Lists, [{
	    key: "afterParsed",
	    value: function afterParsed(content) {
	      var orderedLists = content.querySelectorAll("ol");
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = orderedLists[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var list = _step.value;
	          this.addDataNumbers(list);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
	            _iterator["return"]();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: "afterPageLayout",
	    value: function afterPageLayout(pageElement, page, breakToken, chunker) {
	      var orderedLists = pageElement.getElementsByTagName("ol");
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = orderedLists[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var list = _step2.value;

	          if (list.hasChildNodes()) {
	            list.start = list.firstElementChild.dataset.itemNum;
	          } else {
	            list.parentNode.removeChild(list);
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
	            _iterator2["return"]();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	  }, {
	    key: "addDataNumbers",
	    value: function addDataNumbers(list) {
	      var items = list.children;

	      for (var i = 0; i < items.length; i++) {
	        items[i].setAttribute("data-item-num", i + 1);
	      }
	    }
	  }]);
	  return Lists;
	}(_handler["default"]);

	var _default = Lists;
	exports["default"] = _default;
	});

	unwrapExports(lists);

	var pagedMedia = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _atpage = interopRequireDefault(atpage);

	var _breaks = interopRequireDefault(breaks);

	var _printMedia = interopRequireDefault(printMedia);

	var _splits = interopRequireDefault(splits);

	var _counters = interopRequireDefault(counters);

	var _lists = interopRequireDefault(lists);

	var _default = [_atpage["default"], _breaks["default"], _printMedia["default"], _splits["default"], _counters["default"], _lists["default"]];
	exports["default"] = _default;
	});

	unwrapExports(pagedMedia);

	var runningHeaders = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inherits2 = interopRequireDefault(inherits);

	var _handler = interopRequireDefault(handler);

	var _cssTree = interopRequireDefault(lib);

	var RunningHeaders =
	/*#__PURE__*/
	function (_Handler) {
	  (0, _inherits2["default"])(RunningHeaders, _Handler);

	  function RunningHeaders(chunker, polisher, caller) {
	    var _this;

	    (0, _classCallCheck2["default"])(this, RunningHeaders);
	    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RunningHeaders).call(this, chunker, polisher, caller));
	    _this.runningSelectors = {};
	    _this.elements = {};
	    return _this;
	  }

	  (0, _createClass2["default"])(RunningHeaders, [{
	    key: "onDeclaration",
	    value: function onDeclaration(declaration, dItem, dList, rule) {
	      var _this2 = this;

	      if (declaration.property === "position") {
	        var selector = _cssTree["default"].generate(rule.ruleNode.prelude);

	        var identifier = declaration.value.children.first().name;

	        if (identifier === "running") {
	          var value;

	          _cssTree["default"].walk(declaration, {
	            visit: "Function",
	            enter: function enter(node, item, list) {
	              value = node.children.first().name;
	            }
	          });

	          this.runningSelectors[value] = {
	            identifier: identifier,
	            value: value,
	            selector: selector
	          };
	        }
	      }

	      if (declaration.property === "content") {
	        _cssTree["default"].walk(declaration, {
	          visit: "Function",
	          enter: function enter(funcNode, fItem, fList) {
	            if (funcNode.name.indexOf("element") > -1) {
	              var _selector = _cssTree["default"].generate(rule.ruleNode.prelude);

	              var func = funcNode.name;
	              var _value = funcNode.children.first().name;
	              var args = [_value]; // we only handle first for now

	              var style = "first";

	              _selector.split(",").forEach(function (s) {
	                // remove before / after
	                s = s.replace(/::after|::before/, "");
	                _this2.elements[s] = {
	                  func: func,
	                  args: args,
	                  value: _value,
	                  style: style || "first",
	                  selector: s,
	                  fullSelector: _selector
	                };
	              });
	            }
	          }
	        });
	      }
	    }
	  }, {
	    key: "afterParsed",
	    value: function afterParsed(fragment) {
	      for (var _i = 0, _Object$keys = Object.keys(this.runningSelectors); _i < _Object$keys.length; _i++) {
	        var name = _Object$keys[_i];
	        var set = this.runningSelectors[name];
	        var selected = Array.from(fragment.querySelectorAll(set.selector));

	        if (set.identifier === "running") {
	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;

	          try {
	            for (var _iterator = selected[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var header = _step.value;
	              header.style.display = "none";
	            }
	          } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
	                _iterator["return"]();
	              }
	            } finally {
	              if (_didIteratorError) {
	                throw _iteratorError;
	              }
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: "afterPageLayout",
	    value: function afterPageLayout(fragment) {
	      for (var _i2 = 0, _Object$keys2 = Object.keys(this.runningSelectors); _i2 < _Object$keys2.length; _i2++) {
	        var name = _Object$keys2[_i2];
	        var set = this.runningSelectors[name];
	        var selected = fragment.querySelector(set.selector);

	        if (selected) {
	          // let cssVar;
	          if (set.identifier === "running") {
	            // cssVar = selected.textContent.replace(/\\([\s\S])|(["|'])/g,"\\$1$2");
	            // this.styleSheet.insertRule(`:root { --string-${name}: "${cssVar}"; }`, this.styleSheet.cssRules.length);
	            // fragment.style.setProperty(`--string-${name}`, `"${cssVar}"`);
	            set.first = selected;
	          } else {
	            console.warn(set.value + "needs css replacement");
	          }
	        }
	      } // move elements


	      if (!this.orderedSelectors) {
	        this.orderedSelectors = this.orderSelectors(this.elements);
	      }

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.orderedSelectors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var selector = _step2.value;

	          if (selector) {
	            var el = this.elements[selector];

	            var _selected = fragment.querySelector(selector);

	            if (_selected) {
	              var running = this.runningSelectors[el.args[0]];

	              if (running && running.first) {
	                _selected.innerHTML = ""; // Clear node
	                // selected.classList.add("pagedjs_clear-after"); // Clear ::after

	                var clone = running.first.cloneNode(true);
	                clone.style.display = null;

	                _selected.appendChild(clone);
	              }
	            }
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
	            _iterator2["return"]();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	    /**
	    * Assign a weight to @page selector classes
	    * 1) page
	    * 2) left & right
	    * 3) blank
	    * 4) first & nth
	    * 5) named page
	    * 6) named left & right
	    * 7) named first & nth
	    * @param {string} [s] selector string
	    * @return {int} weight
	    */

	  }, {
	    key: "pageWeight",
	    value: function pageWeight(s) {
	      var weight = 1;
	      var selector = s.split(" ");
	      var parts = selector.length && selector[0].split(".");
	      parts.shift(); // remove empty first part

	      switch (parts.length) {
	        case 4:
	          if (parts[3] === "pagedjs_first_page") {
	            weight = 7;
	          } else if (parts[3] === "pagedjs_left_page" || parts[3] === "pagedjs_right_page") {
	            weight = 6;
	          }

	          break;

	        case 3:
	          if (parts[1] === "pagedjs_named_page") {
	            if (parts[2].indexOf(":nth-of-type") > -1) {
	              weight = 7;
	            } else {
	              weight = 5;
	            }
	          }

	          break;

	        case 2:
	          if (parts[1] === "pagedjs_first_page") {
	            weight = 4;
	          } else if (parts[1] === "pagedjs_blank_page") {
	            weight = 3;
	          } else if (parts[1] === "pagedjs_left_page" || parts[1] === "pagedjs_right_page") {
	            weight = 2;
	          }

	          break;

	        default:
	          if (parts[0].indexOf(":nth-of-type") > -1) {
	            weight = 4;
	          } else {
	            weight = 1;
	          }

	      }

	      return weight;
	    }
	    /**
	    * Orders the selectors based on weight
	    *
	    * Does not try to deduplicate base on specifity of the selector
	    * Previous matched selector will just be overwritten
	    * @param {obj} [obj] selectors object
	    * @return {Array} orderedSelectors
	    */

	  }, {
	    key: "orderSelectors",
	    value: function orderSelectors(obj) {
	      var selectors = Object.keys(obj);
	      var weighted = {
	        1: [],
	        2: [],
	        3: [],
	        4: [],
	        5: [],
	        6: [],
	        7: []
	      };
	      var orderedSelectors = [];

	      for (var _i3 = 0, _selectors = selectors; _i3 < _selectors.length; _i3++) {
	        var s = _selectors[_i3];
	        var w = this.pageWeight(s);
	        weighted[w].unshift(s);
	      }

	      for (var i = 1; i <= 7; i++) {
	        orderedSelectors = orderedSelectors.concat(weighted[i]);
	      }

	      return orderedSelectors;
	    }
	  }, {
	    key: "beforeTreeParse",
	    value: function beforeTreeParse(text, sheet) {
	      // element(x) is parsed as image element selector, so update element to element-ident
	      sheet.text = text.replace(/element[\s]*\(([^|^#)]*)\)/g, "element-ident($1)");
	    }
	  }]);
	  return RunningHeaders;
	}(_handler["default"]);

	var _default = RunningHeaders;
	exports["default"] = _default;
	});

	unwrapExports(runningHeaders);

	var css = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.cleanPseudoContent = cleanPseudoContent;

	function cleanPseudoContent(el) {
	  var trim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "\"' ";
	  return el.replace(new RegExp("^[".concat(trim, "]+")), "").replace(new RegExp("[".concat(trim, "]+$")), "").replace(/["']/g, function (match) {
	    return "\\" + match;
	  }).replace(/[\n]/g, function (match) {
	    return "\\00000A";
	  });
	}
	});

	unwrapExports(css);
	var css_1 = css.cleanPseudoContent;

	var stringSets = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inherits2 = interopRequireDefault(inherits);

	var _handler = interopRequireDefault(handler);

	var _cssTree = interopRequireDefault(lib);



	var StringSets =
	/*#__PURE__*/
	function (_Handler) {
	  (0, _inherits2["default"])(StringSets, _Handler);

	  function StringSets(chunker, polisher, caller) {
	    var _this;

	    (0, _classCallCheck2["default"])(this, StringSets);
	    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(StringSets).call(this, chunker, polisher, caller));
	    _this.stringSetSelectors = {};
	    _this.type; // pageLastString = last string variable defined on the page 

	    _this.pageLastString;
	    return _this;
	  }

	  (0, _createClass2["default"])(StringSets, [{
	    key: "onDeclaration",
	    value: function onDeclaration(declaration, dItem, dList, rule) {
	      if (declaration.property === "string-set") {
	        var selector = _cssTree["default"].generate(rule.ruleNode.prelude);

	        var identifier = declaration.value.children.first().name;
	        var value;

	        _cssTree["default"].walk(declaration, {
	          visit: "Function",
	          enter: function enter(node, item, list) {
	            value = _cssTree["default"].generate(node);
	          }
	        });

	        this.stringSetSelectors[identifier] = {
	          identifier: identifier,
	          value: value,
	          selector: selector
	        };
	      }
	    }
	  }, {
	    key: "onContent",
	    value: function onContent(funcNode, fItem, fList, declaration, rule) {
	      if (funcNode.name === "string") {
	        var identifier = funcNode.children && funcNode.children.first().name;
	        this.type = funcNode.children.last().name;
	        funcNode.name = "var";
	        funcNode.children = new _cssTree["default"].List();
	        funcNode.children.append(funcNode.children.createItem({
	          type: "Identifier",
	          loc: null,
	          name: "--pagedjs-string-" + identifier
	        }));
	      }
	    }
	  }, {
	    key: "afterPageLayout",
	    value: function afterPageLayout(fragment) {
	      var _this2 = this;

	      // get the value of the previous last string
	      var previousPageLastString = this.pageLastString;

	      var _loop = function _loop() {
	        var name = _Object$keys[_i];
	        var set = _this2.stringSetSelectors[name];
	        var selected = fragment.querySelectorAll(set.selector);
	        var cssVar = previousPageLastString;
	        selected.forEach(function (sel) {
	          // push each content into the array to define in the variable the first and the last element of the page.
	          _this2.pageLastString = selected[selected.length - 1].textContent;

	          if (_this2.type === "first") {
	            cssVar = selected[0].textContent;
	          } else if (_this2.type === "last") {
	            cssVar = selected[selected.length - 1].textContent;
	          } else if (_this2.type === "start") {
	            if (sel.parentElement.firstChild === sel) {
	              cssVar = sel.textContent;
	            }
	          } else if (_this2.type === "first-except") {
	            cssVar = "";
	          } else {
	            cssVar = selected[0].textContent;
	          }
	        });
	        fragment.setAttribute("data-string", "string-type-".concat(_this2.type, "-").concat(name)); // fragment.style.setProperty(`--pagedjs-string-${name}`, `"${cssVar.replace(/\\([\s\S])|(["|'])/g, "\\$1$2")}"`);

	        fragment.style.setProperty("--pagedjs-string-".concat(name), "\"".concat((0, css.cleanPseudoContent)(cssVar))); // if there is no new string on the page

	        if (!fragment.hasAttribute("data-string")) {
	          fragment.style.setProperty("--pagedjs-string-".concat(name), "\"".concat(_this2.pageLastString, "\""));
	        }
	      };

	      for (var _i = 0, _Object$keys = Object.keys(this.stringSetSelectors); _i < _Object$keys.length; _i++) {
	        _loop();
	      }
	    }
	  }]);
	  return StringSets;
	}(_handler["default"]);

	var _default = StringSets;
	exports["default"] = _default;
	});

	unwrapExports(stringSets);

	var targetCounters = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inherits2 = interopRequireDefault(inherits);

	var _handler = interopRequireDefault(handler);



	var _cssTree = interopRequireDefault(lib);

	var TargetCounters =
	/*#__PURE__*/
	function (_Handler) {
	  (0, _inherits2["default"])(TargetCounters, _Handler);

	  function TargetCounters(chunker, polisher, caller) {
	    var _this;

	    (0, _classCallCheck2["default"])(this, TargetCounters);
	    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TargetCounters).call(this, chunker, polisher, caller));
	    _this.styleSheet = polisher.styleSheet;
	    _this.counterTargets = {};
	    return _this;
	  }

	  (0, _createClass2["default"])(TargetCounters, [{
	    key: "onContent",
	    value: function onContent(funcNode, fItem, fList, declaration, rule) {
	      var _this2 = this;

	      if (funcNode.name === "target-counter") {
	        var selector = _cssTree["default"].generate(rule.ruleNode.prelude);

	        var first = funcNode.children.first();
	        var func = first.name;

	        var value = _cssTree["default"].generate(funcNode);

	        var args = [];
	        first.children.forEach(function (child) {
	          if (child.type === "Identifier") {
	            args.push(child.name);
	          }
	        });
	        var counter;
	        var style;
	        var styleIdentifier;
	        funcNode.children.forEach(function (child) {
	          if (child.type === "Identifier") {
	            if (!counter) {
	              counter = child.name;
	            } else if (!style) {
	              styleIdentifier = _cssTree["default"].clone(child);
	              style = child.name;
	            }
	          }
	        });
	        var variable = "target-counter-" + (0, utils.UUID)();
	        selector.split(",").forEach(function (s) {
	          _this2.counterTargets[s] = {
	            func: func,
	            args: args,
	            value: value,
	            counter: counter,
	            style: style,
	            selector: s,
	            fullSelector: selector,
	            variable: variable
	          };
	        }); // Replace with counter

	        funcNode.name = "counter";
	        funcNode.children = new _cssTree["default"].List();
	        funcNode.children.appendData({
	          type: "Identifier",
	          loc: 0,
	          name: variable
	        });

	        if (styleIdentifier) {
	          funcNode.children.appendData({
	            type: "Operator",
	            loc: null,
	            value: ","
	          });
	          funcNode.children.appendData(styleIdentifier);
	        }
	      }
	    }
	  }, {
	    key: "afterPageLayout",
	    value: function afterPageLayout(fragment, page, breakToken, chunker) {
	      var _this3 = this;

	      Object.keys(this.counterTargets).forEach(function (name) {
	        var target = _this3.counterTargets[name];
	        var split = target.selector.split("::");
	        var query = split[0];
	        var queried = chunker.pagesArea.querySelectorAll(query + ":not([data-" + target.variable + "])");
	        queried.forEach(function (selected, index) {
	          // TODO: handle func other than attr
	          if (target.func !== "attr") {
	            return;
	          }

	          var val = (0, utils.attr)(selected, target.args);
	          var element = chunker.pagesArea.querySelector((0, utils.querySelectorEscape)(val));

	          if (element) {
	            var selector = (0, utils.UUID)();
	            selected.setAttribute("data-" + target.variable, selector); // TODO: handle other counter types (by query)

	            var pseudo = "";

	            if (split.length > 1) {
	              pseudo += "::" + split[1];
	            }

	            if (target.counter === "page") {
	              var pages = chunker.pagesArea.querySelectorAll(".pagedjs_page");
	              var pg = 0;

	              for (var i = 0; i < pages.length; i++) {
	                var styles = window.getComputedStyle(pages[i]);
	                var reset = styles["counter-reset"].replace("page", "").trim();

	                if (reset !== "none") {
	                  pg = parseInt(reset);
	                }

	                pg += 1;

	                if (pages[i].contains(element)) {
	                  break;
	                }
	              }

	              _this3.styleSheet.insertRule("[data-".concat(target.variable, "=\"").concat(selector, "\"]").concat(pseudo, " { counter-reset: ").concat(target.variable, " ").concat(pg, "; }"), _this3.styleSheet.cssRules.length);
	            } else {
	              var value = element.getAttribute("data-counter-".concat(target.counter, "-value"));

	              if (value) {
	                _this3.styleSheet.insertRule("[data-".concat(target.variable, "=\"").concat(selector, "\"]").concat(pseudo, " { counter-reset: ").concat(target.variable, " ").concat(target.variable, " ").concat(parseInt(value), "; }"), _this3.styleSheet.cssRules.length);
	              }
	            }
	          }
	        });
	      });
	    }
	  }]);
	  return TargetCounters;
	}(_handler["default"]);

	var _default = TargetCounters;
	exports["default"] = _default;
	});

	unwrapExports(targetCounters);

	var targetText = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inherits2 = interopRequireDefault(inherits);

	var _handler = interopRequireDefault(handler);





	var _cssTree = interopRequireDefault(lib);

	// import { nodeAfter } from "../../utils/dom";
	var TargetText =
	/*#__PURE__*/
	function (_Handler) {
	  (0, _inherits2["default"])(TargetText, _Handler);

	  function TargetText(chunker, polisher, caller) {
	    var _this;

	    (0, _classCallCheck2["default"])(this, TargetText);
	    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TargetText).call(this, chunker, polisher, caller));
	    _this.styleSheet = polisher.styleSheet;
	    _this.textTargets = {};
	    _this.beforeContent = "";
	    _this.afterContent = "";
	    _this.selector = {};
	    return _this;
	  }

	  (0, _createClass2["default"])(TargetText, [{
	    key: "onContent",
	    value: function onContent(funcNode, fItem, fList, declaration, rule) {
	      var _this2 = this;

	      if (funcNode.name === "target-text") {
	        this.selector = _cssTree["default"].generate(rule.ruleNode.prelude);
	        var first = funcNode.children.first();
	        var last = funcNode.children.last();
	        var func = first.name;

	        var value = _cssTree["default"].generate(funcNode);

	        var args = [];
	        first.children.forEach(function (child) {
	          if (child.type === "Identifier") {
	            args.push(child.name);
	          }
	        });
	        var style;

	        if (last !== first) {
	          style = last.name;
	        }

	        var variable = "--pagedjs-" + (0, utils.UUID)();
	        this.selector.split(",").forEach(function (s) {
	          _this2.textTargets[s] = {
	            func: func,
	            args: args,
	            value: value,
	            style: style || "content",
	            selector: s,
	            fullSelector: _this2.selector,
	            variable: variable
	          };
	        }); // Replace with variable

	        funcNode.name = "var";
	        funcNode.children = new _cssTree["default"].List();
	        funcNode.children.appendData({
	          type: "Identifier",
	          loc: 0,
	          name: variable
	        });
	      }
	    } //   parse this on the ONCONTENT : get all before and after and replace the value with a variable

	  }, {
	    key: "onPseudoSelector",
	    value: function onPseudoSelector(pseudoNode, pItem, pList, selector, rule) {
	      var _this3 = this;

	      // console.log(pseudoNode);
	      // console.log(rule);
	      rule.ruleNode.block.children.forEach(function (properties) {
	        if (pseudoNode.name === "before" && properties.property === "content") {
	          // let beforeVariable = "--pagedjs-" + UUID();
	          var contenu = properties.value.children;
	          contenu.forEach(function (prop) {
	            if (prop.type === "String") {
	              _this3.beforeContent = prop.value;
	            }
	          });
	        } else if (pseudoNode.name === "after" && properties.property === "content") {
	          properties.value.children.forEach(function (prop) {
	            if (prop.type === "String") {
	              _this3.afterContent = prop.value;
	            }
	          });
	        }
	      });
	    }
	  }, {
	    key: "afterParsed",
	    value: function afterParsed(fragment) {
	      var _this4 = this;

	      Object.keys(this.textTargets).forEach(function (name) {
	        var target = _this4.textTargets[name];
	        var split = target.selector.split("::");
	        var query = split[0];
	        var queried = fragment.querySelectorAll(query);
	        var textContent;
	        queried.forEach(function (selected, index) {
	          var val = (0, utils.attr)(selected, target.args);
	          var element = fragment.querySelector((0, utils.querySelectorEscape)(val));

	          if (element) {
	            // content & first-letter & before & after refactorized
	            if (target.style) {
	              _this4.selector = (0, utils.UUID)();
	              selected.setAttribute("data-target-text", _this4.selector);
	              var psuedo = "";

	              if (split.length > 1) {
	                psuedo += "::" + split[1];
	              }

	              if (target.style === "before" || target.style === "after") {
	                var pseudoType = "".concat(target.style, "Content");
	                textContent = (0, css.cleanPseudoContent)(_this4[pseudoType]);
	              } else {
	                textContent = (0, css.cleanPseudoContent)(element.textContent, " ");
	              }

	              textContent = target.style === "first-letter" ? textContent.charAt(0) : textContent;

	              _this4.styleSheet.insertRule("[data-target-text=\"".concat(_this4.selector, "\"]").concat(psuedo, " { ").concat(target.variable, ": \"").concat(textContent, "\" }"));
	            } else {
	              console.warn("missed target", val);
	            }
	          }
	        });
	      });
	    }
	  }]);
	  return TargetText;
	}(_handler["default"]);

	var _default = TargetText;
	exports["default"] = _default;
	});

	unwrapExports(targetText);

	var generatedContent = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _runningHeaders = interopRequireDefault(runningHeaders);

	var _stringSets = interopRequireDefault(stringSets);

	var _targetCounters = interopRequireDefault(targetCounters);

	var _targetText = interopRequireDefault(targetText);

	var _default = [_runningHeaders["default"], _stringSets["default"], _targetCounters["default"], _targetText["default"]];
	exports["default"] = _default;
	});

	unwrapExports(generatedContent);

	var isImplemented$3 = function () {
		var from = Array.from, arr, result;
		if (typeof from !== "function") return false;
		arr = ["raz", "dwa"];
		result = from(arr);
		return Boolean(result && (result !== arr) && (result[1] === "dwa"));
	};

	var validTypes = { object: true, symbol: true };

	var isImplemented$4 = function () {
		var symbol;
		if (typeof Symbol !== 'function') return false;
		symbol = Symbol('test symbol');
		try { String(symbol); } catch (e) { return false; }

		// Return 'true' also for polyfills
		if (!validTypes[typeof Symbol.iterator]) return false;
		if (!validTypes[typeof Symbol.toPrimitive]) return false;
		if (!validTypes[typeof Symbol.toStringTag]) return false;

		return true;
	};

	var isSymbol = function (x) {
		if (!x) return false;
		if (typeof x === 'symbol') return true;
		if (!x.constructor) return false;
		if (x.constructor.name !== 'Symbol') return false;
		return (x[x.constructor.toStringTag] === 'Symbol');
	};

	var validateSymbol = function (value) {
		if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
		return value;
	};

	var create$6 = Object.create, defineProperties = Object.defineProperties
	  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
	  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create$6(null)
	  , isNativeSafe;

	if (typeof Symbol === 'function') {
		NativeSymbol = Symbol;
		try {
			String(NativeSymbol());
			isNativeSafe = true;
		} catch (ignore) {}
	}

	var generateName = (function () {
		var created = create$6(null);
		return function (desc) {
			var postfix = 0, name, ie11BugWorkaround;
			while (created[desc + (postfix || '')]) ++postfix;
			desc += (postfix || '');
			created[desc] = true;
			name = '@@' + desc;
			defineProperty(objPrototype, name, d_1.gs(null, function (value) {
				// For IE11 issue see:
				// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
				//    ie11-broken-getters-on-dom-objects
				// https://github.com/medikoo/es6-symbol/issues/12
				if (ie11BugWorkaround) return;
				ie11BugWorkaround = true;
				defineProperty(this, name, d_1(value));
				ie11BugWorkaround = false;
			}));
			return name;
		};
	}());

	// Internal constructor (not one exposed) for creating Symbol instances.
	// This one is used to ensure that `someSymbol instanceof Symbol` always return false
	HiddenSymbol = function Symbol(description) {
		if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
		return SymbolPolyfill(description);
	};

	// Exposed `Symbol` constructor
	// (returns instances of HiddenSymbol)
	var polyfill = SymbolPolyfill = function Symbol(description) {
		var symbol;
		if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');
		if (isNativeSafe) return NativeSymbol(description);
		symbol = create$6(HiddenSymbol.prototype);
		description = (description === undefined ? '' : String(description));
		return defineProperties(symbol, {
			__description__: d_1('', description),
			__name__: d_1('', generateName(description))
		});
	};
	defineProperties(SymbolPolyfill, {
		for: d_1(function (key) {
			if (globalSymbols[key]) return globalSymbols[key];
			return (globalSymbols[key] = SymbolPolyfill(String(key)));
		}),
		keyFor: d_1(function (s) {
			var key;
			validateSymbol(s);
			for (key in globalSymbols) if (globalSymbols[key] === s) return key;
		}),

		// To ensure proper interoperability with other native functions (e.g. Array.from)
		// fallback to eventual native implementation of given symbol
		hasInstance: d_1('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
		isConcatSpreadable: d_1('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
			SymbolPolyfill('isConcatSpreadable')),
		iterator: d_1('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
		match: d_1('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
		replace: d_1('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
		search: d_1('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
		species: d_1('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
		split: d_1('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
		toPrimitive: d_1('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
		toStringTag: d_1('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
		unscopables: d_1('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
	});

	// Internal tweaks for real symbol producer
	defineProperties(HiddenSymbol.prototype, {
		constructor: d_1(SymbolPolyfill),
		toString: d_1('', function () { return this.__name__; })
	});

	// Proper implementation of methods exposed on Symbol.prototype
	// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
	defineProperties(SymbolPolyfill.prototype, {
		toString: d_1(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
		valueOf: d_1(function () { return validateSymbol(this); })
	});
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d_1('', function () {
		var symbol = validateSymbol(this);
		if (typeof symbol === 'symbol') return symbol;
		return symbol.toString();
	}));
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d_1('c', 'Symbol'));

	// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
		d_1('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

	// Note: It's important to define `toPrimitive` as last one, as some implementations
	// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
	// And that may invoke error in definition flow:
	// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
		d_1('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));

	var es6Symbol = isImplemented$4() ? Symbol : polyfill;

	var objToString = Object.prototype.toString
	  , id = objToString.call(
		(function () {
			return arguments;
		})()
	);

	var isArguments = function (value) {
		return objToString.call(value) === id;
	};

	var objToString$1 = Object.prototype.toString, id$1 = objToString$1.call(noop);

	var isFunction = function (value) {
		return typeof value === "function" && objToString$1.call(value) === id$1;
	};

	var isImplemented$5 = function () {
		var sign = Math.sign;
		if (typeof sign !== "function") return false;
		return (sign(10) === 1) && (sign(-20) === -1);
	};

	var shim$3 = function (value) {
		value = Number(value);
		if (isNaN(value) || (value === 0)) return value;
		return value > 0 ? 1 : -1;
	};

	var sign = isImplemented$5()
		? Math.sign
		: shim$3;

	var abs = Math.abs, floor = Math.floor;

	var toInteger = function (value) {
		if (isNaN(value)) return 0;
		value = Number(value);
		if ((value === 0) || !isFinite(value)) return value;
		return sign(value) * floor(abs(value));
	};

	var max$1 = Math.max;

	var toPosInteger = function (value) {
	 return max$1(0, toInteger(value));
	};

	var objToString$2 = Object.prototype.toString, id$2 = objToString$2.call("");

	var isString = function (value) {
		return (
			typeof value === "string" ||
			(value &&
				typeof value === "object" &&
				(value instanceof String || objToString$2.call(value) === id$2)) ||
			false
		);
	};

	var iteratorSymbol = es6Symbol.iterator
	  , isArray        = Array.isArray
	  , call           = Function.prototype.call
	  , desc           = { configurable: true, enumerable: true, writable: true, value: null }
	  , defineProperty$1 = Object.defineProperty;

	// eslint-disable-next-line complexity
	var shim$4 = function (arrayLike /*, mapFn, thisArg*/) {
		var mapFn = arguments[1]
		  , thisArg = arguments[2]
		  , Context
		  , i
		  , j
		  , arr
		  , length
		  , code
		  , iterator
		  , result
		  , getIterator
		  , value;

		arrayLike = Object(validValue(arrayLike));

		if (isValue(mapFn)) validCallable(mapFn);
		if (!this || this === Array || !isFunction(this)) {
			// Result: Plain array
			if (!mapFn) {
				if (isArguments(arrayLike)) {
					// Source: Arguments
					length = arrayLike.length;
					if (length !== 1) return Array.apply(null, arrayLike);
					arr = new Array(1);
					arr[0] = arrayLike[0];
					return arr;
				}
				if (isArray(arrayLike)) {
					// Source: Array
					arr = new Array(length = arrayLike.length);
					for (i = 0; i < length; ++i) arr[i] = arrayLike[i];
					return arr;
				}
			}
			arr = [];
		} else {
			// Result: Non plain array
			Context = this;
		}

		if (!isArray(arrayLike)) {
			if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
				// Source: Iterator
				iterator = validCallable(getIterator).call(arrayLike);
				if (Context) arr = new Context();
				result = iterator.next();
				i = 0;
				while (!result.done) {
					value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
					if (Context) {
						desc.value = value;
						defineProperty$1(arr, i, desc);
					} else {
						arr[i] = value;
					}
					result = iterator.next();
					++i;
				}
				length = i;
			} else if (isString(arrayLike)) {
				// Source: String
				length = arrayLike.length;
				if (Context) arr = new Context();
				for (i = 0, j = 0; i < length; ++i) {
					value = arrayLike[i];
					if (i + 1 < length) {
						code = value.charCodeAt(0);
						// eslint-disable-next-line max-depth
						if (code >= 0xd800 && code <= 0xdbff) value += arrayLike[++i];
					}
					value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
					if (Context) {
						desc.value = value;
						defineProperty$1(arr, j, desc);
					} else {
						arr[j] = value;
					}
					++j;
				}
				length = j;
			}
		}
		if (length === undefined) {
			// Source: array or array-like
			length = toPosInteger(arrayLike.length);
			if (Context) arr = new Context(length);
			for (i = 0; i < length; ++i) {
				value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
				if (Context) {
					desc.value = value;
					defineProperty$1(arr, i, desc);
				} else {
					arr[i] = value;
				}
			}
		}
		if (Context) {
			desc.value = null;
			arr.length = length;
		}
		return arr;
	};

	var from_1 = isImplemented$3()
		? Array.from
		: shim$4;

	var isImplemented$6 = function () {
		var numberIsNaN = Number.isNaN;
		if (typeof numberIsNaN !== "function") return false;
		return !numberIsNaN({}) && numberIsNaN(NaN) && !numberIsNaN(34);
	};

	var shim$5 = function (value) {
		// eslint-disable-next-line no-self-compare
		return value !== value;
	};

	var isNan = isImplemented$6()
		? Number.isNaN
		: shim$5;

	var indexOf$1           = Array.prototype.indexOf
	  , objHasOwnProperty = Object.prototype.hasOwnProperty
	  , abs$1               = Math.abs
	  , floor$1             = Math.floor;

	var eIndexOf = function (searchElement /*, fromIndex*/) {
		var i, length, fromIndex, val;
		if (!isNan(searchElement)) return indexOf$1.apply(this, arguments);

		length = toPosInteger(validValue(this).length);
		fromIndex = arguments[1];
		if (isNaN(fromIndex)) fromIndex = 0;
		else if (fromIndex >= 0) fromIndex = floor$1(fromIndex);
		else fromIndex = toPosInteger(this.length) - floor$1(abs$1(fromIndex));

		for (i = fromIndex; i < length; ++i) {
			if (objHasOwnProperty.call(this, i)) {
				val = this[i];
				if (isNan(val)) return i; // Jslint: ignore
			}
		}
		return -1;
	};

	var forEach$1 = Array.prototype.forEach
	  , splice  = Array.prototype.splice;

	// eslint-disable-next-line no-unused-vars
	var remove = function (itemToRemove /*, …item*/) {
		forEach$1.call(
			arguments,
			function (item) {
				var index = eIndexOf.call(this, item);
				if (index !== -1) splice.call(this, index, 1);
			},
			this
		);
	};

	var map = { function: true, object: true };

	var isObject$1 = function (value) {
		return (isValue(value) && map[typeof value]) || false;
	};

	var validObject = function (value) {
		if (!isObject$1(value)) throw new TypeError(value + " is not an Object");
		return value;
	};

	var emit           = eventEmitter.methods.emit

	  , defineProperty$2 = Object.defineProperty
	  , hasOwnProperty$6 = Object.prototype.hasOwnProperty
	  , getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	var pipe = function (e1, e2/*, name*/) {
		var pipes, pipe, desc, name;

		(validObject(e1) && validObject(e2));
		name = arguments[2];
		if (name === undefined) name = 'emit';

		pipe = {
			close: function () { remove.call(pipes, e2); }
		};
		if (hasOwnProperty$6.call(e1, '__eePipes__')) {
			(pipes = e1.__eePipes__).push(e2);
			return pipe;
		}
		defineProperty$2(e1, '__eePipes__', d_1('c', pipes = [e2]));
		desc = getOwnPropertyDescriptor(e1, name);
		if (!desc) {
			desc = d_1('c', undefined);
		} else {
			delete desc.get;
			delete desc.set;
		}
		desc.value = function () {
			var i, emitter, data = from_1(pipes);
			emit.apply(this, arguments);
			for (i = 0; (emitter = data[i]); ++i) emit.apply(emitter, arguments);
		};
		defineProperty$2(e1, name, desc);
		return pipe;
	};

	var handlers = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.registerHandlers = registerHandlers;
	exports.initializeHandlers = initializeHandlers;
	exports.Handlers = exports.registeredHandlers = void 0;

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _toConsumableArray2 = interopRequireDefault(toConsumableArray);

	var _index = interopRequireDefault(pagedMedia);

	var _index2 = interopRequireDefault(generatedContent);

	var _eventEmitter = interopRequireDefault(eventEmitter);

	var _pipe = interopRequireDefault(pipe);

	var registeredHandlers = [].concat((0, _toConsumableArray2["default"])(_index["default"]), (0, _toConsumableArray2["default"])(_index2["default"]));
	exports.registeredHandlers = registeredHandlers;

	var Handlers = function Handlers(chunker, polisher, caller) {
	  var _this = this;

	  (0, _classCallCheck2["default"])(this, Handlers);
	  registeredHandlers.forEach(function (Handler) {
	    var handler = new Handler(chunker, polisher, caller);
	    (0, _pipe["default"])(handler, _this);
	  });
	};

	exports.Handlers = Handlers;
	(0, _eventEmitter["default"])(Handlers.prototype);

	function registerHandlers() {
	  for (var i = 0; i < arguments.length; i++) {
	    registeredHandlers.push(arguments[i]);
	  }
	}

	function initializeHandlers(chunker, polisher, caller) {
	  var handlers = new Handlers(chunker, polisher, caller);
	  return handlers;
	}
	});

	unwrapExports(handlers);
	var handlers_1 = handlers.registerHandlers;
	var handlers_2 = handlers.initializeHandlers;
	var handlers_3 = handlers.Handlers;
	var handlers_4 = handlers.registeredHandlers;

	var previewer = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _regenerator = interopRequireDefault(regenerator);

	var _toConsumableArray2 = interopRequireDefault(toConsumableArray);

	var _asyncToGenerator2 = interopRequireDefault(asyncToGenerator);

	var _classCallCheck2 = interopRequireDefault(classCallCheck);

	var _createClass2 = interopRequireDefault(createClass);

	var _eventEmitter = interopRequireDefault(eventEmitter);

	var _hook = interopRequireDefault(hook);

	var _chunker = interopRequireDefault(chunker);

	var _polisher = interopRequireDefault(polisher);



	var Previewer =
	/*#__PURE__*/
	function () {
	  function Previewer(options) {
	    var _this = this;

	    (0, _classCallCheck2["default"])(this, Previewer);
	    // this.preview = this.getParams("preview") !== "false";
	    this.settings = options || {}; // Process styles

	    this.polisher = new _polisher["default"](false); // Chunk contents

	    this.chunker = new _chunker["default"](undefined, undefined, this.settings); // Hooks

	    this.hooks = {};
	    this.hooks.beforePreview = new _hook["default"](this);
	    this.hooks.afterPreview = new _hook["default"](this); // default size

	    this.size = {
	      width: {
	        value: 8.5,
	        unit: "in"
	      },
	      height: {
	        value: 11,
	        unit: "in"
	      },
	      format: undefined,
	      orientation: undefined
	    };
	    this.chunker.on("page", function (page) {
	      _this.emit("page", page);
	    });
	    this.chunker.on("rendering", function () {
	      _this.emit("rendering", _this.chunker);
	    });
	  }

	  (0, _createClass2["default"])(Previewer, [{
	    key: "initializeHandlers",
	    value: function initializeHandlers() {
	      var _this2 = this;

	      var handlers$1 = (0, handlers.initializeHandlers)(this.chunker, this.polisher, this);
	      handlers$1.on("size", function (size) {
	        _this2.size = size;

	        _this2.emit("size", size);
	      });
	      handlers$1.on("atpages", function (pages) {
	        _this2.atpages = pages;

	        _this2.emit("atpages", pages);
	      });
	      return handlers$1;
	    }
	  }, {
	    key: "registerHandlers",
	    value: function registerHandlers() {
	      return handlers.registerHandlers.apply(handlers.registerHandlers, arguments);
	    }
	  }, {
	    key: "getParams",
	    value: function getParams(name) {
	      var param;
	      var url = new URL(window.location);
	      var params = new URLSearchParams(url.search);
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = params.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var pair = _step.value;

	          if (pair[0] === name) {
	            param = pair[1];
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
	            _iterator["return"]();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return param;
	    }
	  }, {
	    key: "wrapContent",
	    value: function wrapContent() {
	      // Wrap body in template tag
	      var body = document.querySelector("body"); // Check if a template exists

	      var template;
	      template = body.querySelector(":scope > template[data-ref='pagedjs-content']");

	      if (!template) {
	        // Otherwise create one
	        template = document.createElement("template");
	        template.dataset.ref = "pagedjs-content";
	        template.innerHTML = body.innerHTML;
	        body.innerHTML = "";
	        body.appendChild(template);
	      }

	      return template.content;
	    }
	  }, {
	    key: "removeStyles",
	    value: function removeStyles() {
	      var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      // Get all stylesheets
	      var stylesheets = Array.from(doc.querySelectorAll("link[rel='stylesheet']"));
	      var hrefs = stylesheets.map(function (sheet) {
	        sheet.remove();
	        return sheet.href;
	      }); // Get inline styles

	      var inlineStyles = Array.from(doc.querySelectorAll("style:not([data-pagedjs-inserted-styles])"));
	      inlineStyles.forEach(function (inlineStyle) {
	        var obj = {};
	        obj[window.location.href] = inlineStyle.textContent;
	        hrefs.push(obj);
	        inlineStyle.remove();
	      });
	      return hrefs;
	    }
	  }, {
	    key: "preview",
	    value: function () {
	      var _preview = (0, _asyncToGenerator2["default"])(
	      /*#__PURE__*/
	      _regenerator["default"].mark(function _callee(content, stylesheets, renderTo) {
	        var _this$polisher;

	        var startTime, flow, endTime;
	        return _regenerator["default"].wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.next = 2;
	                return this.hooks.beforePreview.trigger(content, renderTo);

	              case 2:
	                if (!content) {
	                  content = this.wrapContent();
	                }

	                if (!stylesheets) {
	                  stylesheets = this.removeStyles();
	                }

	                this.polisher.setup();
	                this.handlers = this.initializeHandlers();
	                _context.next = 8;
	                return (_this$polisher = this.polisher).add.apply(_this$polisher, (0, _toConsumableArray2["default"])(stylesheets));

	              case 8:
	                startTime = performance.now(); // Render flow

	                _context.next = 11;
	                return this.chunker.flow(content, renderTo);

	              case 11:
	                flow = _context.sent;
	                endTime = performance.now();
	                flow.performance = endTime - startTime;
	                flow.size = this.size;
	                this.emit("rendered", flow);
	                _context.next = 18;
	                return this.hooks.afterPreview.trigger(flow.pages);

	              case 18:
	                return _context.abrupt("return", flow);

	              case 19:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function preview(_x, _x2, _x3) {
	        return _preview.apply(this, arguments);
	      }

	      return preview;
	    }()
	  }]);
	  return Previewer;
	}();

	(0, _eventEmitter["default"])(Previewer.prototype);
	var _default = Previewer;
	exports["default"] = _default;
	});

	unwrapExports(previewer);

	var lib$1 = createCommonjsModule(function (module, exports) {



	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	Object.defineProperty(exports, "Chunker", {
	  enumerable: true,
	  get: function get() {
	    return _chunker["default"];
	  }
	});
	Object.defineProperty(exports, "Polisher", {
	  enumerable: true,
	  get: function get() {
	    return _polisher["default"];
	  }
	});
	Object.defineProperty(exports, "Previewer", {
	  enumerable: true,
	  get: function get() {
	    return _previewer["default"];
	  }
	});
	Object.defineProperty(exports, "Handler", {
	  enumerable: true,
	  get: function get() {
	    return _handler["default"];
	  }
	});
	Object.defineProperty(exports, "registerHandlers", {
	  enumerable: true,
	  get: function get() {
	    return handlers.registerHandlers;
	  }
	});
	Object.defineProperty(exports, "initializeHandlers", {
	  enumerable: true,
	  get: function get() {
	    return handlers.initializeHandlers;
	  }
	});

	var _chunker = interopRequireDefault(chunker);

	var _polisher = interopRequireDefault(polisher);

	var _previewer = interopRequireDefault(previewer);

	var _handler = interopRequireDefault(handler);
	});

	unwrapExports(lib$1);

	var polyfill$1 = createCommonjsModule(function (module, exports) {





	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _regenerator = interopRequireDefault(regenerator);

	var _asyncToGenerator2 = interopRequireDefault(asyncToGenerator);

	var _previewer = interopRequireDefault(previewer);

	var Paged = interopRequireWildcard(lib$1);

	window.Paged = Paged;
	var ready = new Promise(function (resolve, reject) {
	  if (document.readyState === "interactive" || document.readyState === "complete") {
	    resolve(document.readyState);
	    return;
	  }

	  document.onreadystatechange = function ($) {
	    if (document.readyState === "interactive") {
	      resolve(document.readyState);
	    }
	  };
	});
	var config = window.PagedConfig || {
	  auto: true,
	  before: undefined,
	  after: undefined,
	  content: undefined,
	  stylesheets: undefined,
	  renderTo: undefined,
	  settings: undefined
	};
	var previewer$1 = new _previewer["default"](config.settings);
	ready.then(
	/*#__PURE__*/
	(0, _asyncToGenerator2["default"])(
	/*#__PURE__*/
	_regenerator["default"].mark(function _callee() {
	  var done;
	  return _regenerator["default"].wrap(function _callee$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          if (!config.before) {
	            _context.next = 3;
	            break;
	          }

	          _context.next = 3;
	          return config.before();

	        case 3:
	          if (!(config.auto !== false)) {
	            _context.next = 7;
	            break;
	          }

	          _context.next = 6;
	          return previewer$1.preview(config.content, config.stylesheets, config.renderTo);

	        case 6:
	          done = _context.sent;

	        case 7:
	          if (!config.after) {
	            _context.next = 10;
	            break;
	          }

	          _context.next = 10;
	          return config.after(done);

	        case 10:
	        case "end":
	          return _context.stop();
	      }
	    }
	  }, _callee);
	})));
	var _default = previewer$1;
	exports["default"] = _default;
	});

	var polyfill$2 = unwrapExports(polyfill$1);

	return polyfill$2;

})));