
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/levelScene/settlementFace.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '601cciYBP1PXJgBEnFR6ZHv', 'settlementFace');
// scripts/levelScene/settlementFace.ts

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
var starReview_1 = require("../common/starReview");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SettlementFace = /** @class */ (function (_super) {
    __extends(SettlementFace, _super);
    function SettlementFace() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.failFace = null;
        _this.passFace = null;
        _this.starReview = null;
        return _this;
    }
    SettlementFace.prototype.start = function () {
    };
    SettlementFace.prototype.outFailFace = function () {
        this.outFace(this.failFace);
    };
    SettlementFace.prototype.hiddenFailFace = function () {
        this.hiddenFace(this.failFace);
    };
    SettlementFace.prototype.outPassFace = function (g) {
        this.starReview.setReview(g);
        this.outFace(this.passFace);
    };
    SettlementFace.prototype.hiddenPassFace = function () {
        this.hiddenFace(this.passFace);
    };
    SettlementFace.prototype.hiddenSettleFace = function () {
        if (this.failFace.active)
            this.hiddenFailFace();
        if (this.passFace.active)
            this.hiddenPassFace();
    };
    SettlementFace.prototype.outFace = function (node) {
        node.active = true;
        node.runAction(cc.fadeIn(0.2));
        this.scheduleOnce(function () {
            cc.director.pause();
        }, 0.2);
    };
    SettlementFace.prototype.hiddenFace = function (node) {
        cc.director.resume();
        node.runAction(cc.fadeOut(0.2));
        this.scheduleOnce(function () {
            node.active = false;
        }.bind(this), 0.2);
    };
    __decorate([
        property({ type: cc.Node })
    ], SettlementFace.prototype, "failFace", void 0);
    __decorate([
        property({ type: cc.Node })
    ], SettlementFace.prototype, "passFace", void 0);
    __decorate([
        property({ type: starReview_1.default })
    ], SettlementFace.prototype, "starReview", void 0);
    SettlementFace = __decorate([
        ccclass
    ], SettlementFace);
    return SettlementFace;
}(cc.Component));
exports.default = SettlementFace;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2xldmVsU2NlbmUvc2V0dGxlbWVudEZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBRXhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBc0RDO1FBbkRXLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixnQkFBVSxHQUFlLElBQUksQ0FBQzs7SUE2QzFDLENBQUM7SUEzQ0csOEJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCxvQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNPLHVDQUFjLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELG9DQUFXLEdBQVgsVUFBWSxDQUFTO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDTyx1Q0FBYyxHQUF0QjtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCx5Q0FBZ0IsR0FBaEI7UUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTTtZQUNwQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDMUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07WUFDcEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBRTlCLENBQUM7SUFFTyxnQ0FBTyxHQUFmLFVBQWdCLElBQWE7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ1gsQ0FBQztJQUVPLG1DQUFVLEdBQWxCLFVBQW1CLElBQWE7UUFDNUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBakREO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvREFDSztJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7b0RBQ0s7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsb0JBQVUsRUFBRSxDQUFDO3NEQUNPO0lBVHJCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FzRGxDO0lBQUQscUJBQUM7Q0F0REQsQUFzREMsQ0F0RDJDLEVBQUUsQ0FBQyxTQUFTLEdBc0R2RDtrQkF0RG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RhclJldmlldyBmcm9tIFwiLi4vY29tbW9uL3N0YXJSZXZpZXdcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRsZW1lbnRGYWNlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUgfSlcbiAgICBwcml2YXRlIGZhaWxGYWNlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUgfSlcbiAgICBwcml2YXRlIHBhc3NGYWNlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFN0YXJSZXZpZXcgfSlcbiAgICBwcml2YXRlIHN0YXJSZXZpZXc6IFN0YXJSZXZpZXcgPSBudWxsO1xuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBvdXRGYWlsRmFjZSgpIHtcbiAgICAgICAgdGhpcy5vdXRGYWNlKHRoaXMuZmFpbEZhY2UpO1xuICAgIH1cbiAgICBwcml2YXRlIGhpZGRlbkZhaWxGYWNlKCkge1xuICAgICAgICB0aGlzLmhpZGRlbkZhY2UodGhpcy5mYWlsRmFjZSk7XG4gICAgfVxuXG4gICAgb3V0UGFzc0ZhY2UoZzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc3RhclJldmlldy5zZXRSZXZpZXcoZyk7XG4gICAgICAgIHRoaXMub3V0RmFjZSh0aGlzLnBhc3NGYWNlKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBoaWRkZW5QYXNzRmFjZSgpIHtcbiAgICAgICAgdGhpcy5oaWRkZW5GYWNlKHRoaXMucGFzc0ZhY2UpO1xuICAgIH1cblxuICAgIGhpZGRlblNldHRsZUZhY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmZhaWxGYWNlLmFjdGl2ZSlcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuRmFpbEZhY2UoKTtcbiAgICAgICAgaWYgKHRoaXMucGFzc0ZhY2UuYWN0aXZlKVxuICAgICAgICAgICAgdGhpcy5oaWRkZW5QYXNzRmFjZSgpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvdXRGYWNlKG5vZGU6IGNjLk5vZGUpIHtcbiAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5mYWRlSW4oMC4yKSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLnBhdXNlKCk7XG4gICAgICAgIH0sIDAuMilcbiAgICB9XG5cbiAgICBwcml2YXRlIGhpZGRlbkZhY2Uobm9kZTogY2MuTm9kZSkge1xuICAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTtcbiAgICAgICAgbm9kZS5ydW5BY3Rpb24oY2MuZmFkZU91dCgwLjIpKVxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9LmJpbmQodGhpcyksIDAuMik7XG4gICAgfVxuXG59XG4iXX0=