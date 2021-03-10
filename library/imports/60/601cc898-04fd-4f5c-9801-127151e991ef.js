"use strict";
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