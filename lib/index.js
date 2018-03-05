(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var State = /** @class */ (function () {
        function State(option) {
            var _this = this;
            option.list.forEach(function (item) { return _this.proxy(item); });
        }
        State.prototype.proxy = function (item) {
            var _this = this;
            var name = item.name, value = item.value, watch = item.watch;
            this['$' + name] = value;
            Object.defineProperty(this, name, {
                set: function (value) {
                    typeof watch === 'function' && watch(value, _this['$' + value]);
                    _this['$' + name] = value;
                },
                get: function () {
                    return _this['$' + name];
                }
            });
        };
        State.prototype.setState = function (data, value) {
            var _this = this;
            if (typeof data === 'string') {
                // if value is function, then pass in the old data
                if (typeof value === 'function') {
                    this[data] = value(this[data]);
                }
                else {
                    // value is not function but pure value, then assign
                    this[data] = value;
                }
                return;
            }
            // react like
            Object.entries(data).map(function (_a) {
                var key = _a[0], val = _a[1];
                _this[key] = val;
            });
        };
        State.prototype.getItem = function (key) {
            return this[key];
        };
        return State;
    }());
    exports.default = State;
});
