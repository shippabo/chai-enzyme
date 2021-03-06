'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wrap = require('./wrap');

var _wrap2 = _interopRequireDefault(_wrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChaiWrapper = function () {
  /**
   * Constructs a instance of the chai wrapper.
   *
   * @param chai the instance of chai to wrap around
   * @param utils the instance of the utils
   * @param debug the debug method
   */

  function ChaiWrapper(chai, utils, debug) {
    _classCallCheck(this, ChaiWrapper);

    this.chai = chai;
    this.Assertion = chai.Assertion;
    this.utils = utils;
    this.debug = debug;
  }

  /**
   * Adds or overwrites a assertion method.
   *
   * @param assertion the assertion to add
   * @param name the name of the assertion to add
   */

  _createClass(ChaiWrapper, [{
    key: 'addAssertion',
    value: function addAssertion(assertion, name) {
      if (this.chai.Assertion.prototype[name]) {
        this._overwriteMethod(assertion, name);
      } else {
        this._addMethod(assertion, name);
      }
    }

    /**
     * Adds a chainable method.
     *
     * @param assertion the assertion to add
     * @param [name] the name of the assertion to add
     */

  }, {
    key: 'addChainableMethod',
    value: function addChainableMethod(assertion, name) {
      this.Assertion.addChainableMethod(name, this._wrapAssertion(assertion, this));
    }

    /**
     * Overwrites a assertion property.
     *
     * @param assertion the assertion with which to overwrite the existing assertion
     * @param [name] the name of the assertion to overwrite
     */

  }, {
    key: 'overwriteProperty',
    value: function overwriteProperty(assertion, name) {
      var _wrapOverwriteAssertion = this._wrapOverwriteAssertion;
      var chaiWrapper = this;

      this.Assertion.overwriteProperty(name, function (_super) {
        return _wrapOverwriteAssertion(assertion, _super, chaiWrapper);
      });
    }

    /**
     * Overwrites a chainable assertion method, but NOT the chainingBehaviour
     * ChainingBehaviour calls any pre-existing method.
     *
     * @param assertion the assertion with which to overwrite the existing assertion
     * @param [name] the name of the assertion to overwrite
     */

  }, {
    key: 'overwriteChainableMethod',
    value: function overwriteChainableMethod(assertion, name) {
      name = name || assertion.name;

      var _wrapOverwriteAssertion = this._wrapOverwriteAssertion;
      var chaiWrapper = this;

      this.Assertion.overwriteChainableMethod(name, function (_super) {
        return _wrapOverwriteAssertion(assertion, _super, chaiWrapper);
      }, function (_super) {
        return function () {
          _super.call(this);
        };
      });
    }

    /**
     * Wraps the given assertion with a function passing in all the required
     * chai elements.
     *
     * @param assertion the assertion to wrap
     * @param _super the super as passed to the chai assertion
     * @param chaiWrapper the instance of the chaiWrapper
     * @returns {Function}
     * @private
     */

  }, {
    key: '_wrapOverwriteAssertion',
    value: function _wrapOverwriteAssertion(assertion, _super, chaiWrapper) {
      var _chaiWrapper$utils = chaiWrapper.utils,
          flag = _chaiWrapper$utils.flag,
          inspect = _chaiWrapper$utils.inspect;

      var debug = chaiWrapper.debug;

      return function (arg1, arg2) {
        var wrapper = (0, _wrap2.default)(flag(this, 'object'));

        if (!wrapper) {
          return _super.apply(this, arguments);
        }

        assertion.call(this, {
          markup: function markup() {
            return debug(wrapper);
          },
          sig: inspect(wrapper),
          wrapper: wrapper,
          arg1: arg1,
          arg2: arg2,
          flag: flag,
          inspect: inspect
        });
      };
    }

    /**
     * Wraps and overwrites a chai assertion method.
     *
     * @param assertion The new assertion to overwrite the existing with
     * @param [name] the name of the assertion
     * @private
     */

  }, {
    key: '_overwriteMethod',
    value: function _overwriteMethod(assertion, name) {
      name = name || assertion.name;

      var _wrapOverwriteAssertion = this._wrapOverwriteAssertion;
      var chaiWrapper = this;

      this.Assertion.overwriteMethod(name, function (_super) {
        return _wrapOverwriteAssertion(assertion, _super, chaiWrapper);
      });
    }

    /**
     * Wraps the given assertion with a function passing in all the required
     * chai elements.
     *
     * @param assertion the assertion to wrap
     * @param chaiWrapper the instance of the chai wrapper
     * @returns {Function}
     * @private
     */

  }, {
    key: '_wrapAssertion',
    value: function _wrapAssertion(assertion, chaiWrapper) {
      var _chaiWrapper$utils2 = chaiWrapper.utils,
          flag = _chaiWrapper$utils2.flag,
          inspect = _chaiWrapper$utils2.inspect;

      var debug = chaiWrapper.debug;

      return function (arg1, arg2) {
        var wrapper = (0, _wrap2.default)(flag(this, 'object'));
        var config = {
          markup: function markup() {
            return debug(wrapper);
          },
          sig: inspect(wrapper),
          wrapper: wrapper,
          arg1: arg1,
          flag: flag,
          inspect: inspect

          /**
           * Checking the length of the arguments array to make
           * sure that we have a defined argument assigned to arg2.
           * By default, 'undefined' is assigned to arg2 if no specific arguments exist...
           *
           */
        };if (arguments.length > 1) {
          config.arg2 = arg2;
        }

        assertion.call(this, config);
      };
    }

    /**
     * Wraps then adds the given assertion.
     *
     * @param assertion The assertion to add
     * @param [name] the name of the assertion
     * @private
     */

  }, {
    key: '_addMethod',
    value: function _addMethod(assertion, name) {
      name = name || assertion.name;

      this.Assertion.addMethod(name, this._wrapAssertion(assertion, this));
    }
  }]);

  return ChaiWrapper;
}();

exports.default = ChaiWrapper;