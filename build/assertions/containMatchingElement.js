'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = containMatchingElement;

var _reactNodeToString = require('../reactNodeToString');

var _reactNodeToString2 = _interopRequireDefault(_reactNodeToString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function containMatchingElement(_ref) {
  var wrapper = _ref.wrapper,
      markup = _ref.markup,
      arg1 = _ref.arg1,
      sig = _ref.sig;

  this.assert(wrapper.wrapper.containsMatchingElement(arg1), function () {
    return 'expected ' + sig + ' to contain matching ' + (0, _reactNodeToString2.default)(arg1) + markup();
  }, function () {
    return 'expected ' + sig + ' not to contain matching ' + (0, _reactNodeToString2.default)(arg1) + markup();
  }, arg1);
}