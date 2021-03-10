
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/common/starReview.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '17a5bpiCUROtoTufMZ9GBwd', 'starReview');
// scripts/common/starReview.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StarReview = /** @class */ (function (_super) {
    __extends(StarReview, _super);
    function StarReview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stars = [];
        return _this;
    }
    StarReview.prototype.setReview = function (g) {
        for (var i = 0; i < g; i++)
            this.stars[i].active = true;
    };
    __decorate([
        property({
            type: [cc.Node]
        })
    ], StarReview.prototype, "stars", void 0);
    StarReview = __decorate([
        ccclass
    ], StarReview);
    return StarReview;
}(cc.Component));
exports.default = StarReview;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2NvbW1vbi9zdGFyUmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBV0M7UUFOVyxXQUFLLEdBQWMsRUFBRSxDQUFDOztJQU1sQyxDQUFDO0lBSkcsOEJBQVMsR0FBVCxVQUFVLENBQVM7UUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQUxEO1FBSEMsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztTQUNsQixDQUFDOzZDQUM0QjtJQUxiLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FXOUI7SUFBRCxpQkFBQztDQVhELEFBV0MsQ0FYdUMsRUFBRSxDQUFDLFNBQVMsR0FXbkQ7a0JBWG9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhclJldmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbY2MuTm9kZV1cbiAgICB9KVxuICAgIHByaXZhdGUgc3RhcnM6IGNjLk5vZGVbXSA9IFtdO1xuXG4gICAgc2V0UmV2aWV3KGc6IG51bWJlcikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGc7IGkrKylcbiAgICAgICAgICAgIHRoaXMuc3RhcnNbaV0uYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG4iXX0=