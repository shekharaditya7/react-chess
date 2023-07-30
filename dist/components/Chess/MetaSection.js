"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MetaSection;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _indexModule = _interopRequireDefault(require("./index.module.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function MetaSection(_ref) {
  let {
    isUndoAvailable,
    isRedoAvailable,
    handleUndo,
    handleRedo,
    handleReset
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _indexModule.default.metaSection
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(_indexModule.default.metaItem, {
      [_indexModule.default.diabledMetaItem]: !isUndoAvailable
    }),
    onClick: isUndoAvailable ? handleUndo : null
  }, "Undo"), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(_indexModule.default.metaItem, {
      [_indexModule.default.diabledMetaItem]: !isRedoAvailable
    }),
    onClick: handleRedo
  }, "Redo"), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(_indexModule.default.metaItem, {
      [_indexModule.default.diabledMetaItem]: !isUndoAvailable
    }),
    onClick: isUndoAvailable ? handleReset : null
  }, "Reset"));
}