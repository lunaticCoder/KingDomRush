"use strict";
cc._RF.push(module, '6138fxs+4VFYrG5yshoOB2G', 'nodeSort');
// scripts/common/nodeSort.ts

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
var NodeSort = /** @class */ (function (_super) {
    __extends(NodeSort, _super);
    function NodeSort() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cT = 0;
        _this.cL = 1;
        return _this;
    }
    NodeSort.prototype.onLoad = function () {
        this.children = this.node.children;
    };
    NodeSort.prototype.start = function () {
    };
    NodeSort.prototype.update = function (dt) {
        if (this.children === undefined)
            return;
        this.cT += dt;
        if (this.cT >= this.cL) {
            this.cT = 0;
            this.children.sort(function (a, b) {
                if (a.y > b.y)
                    return -1;
                else
                    return 1;
            });
            for (var i = 0; i < this.children.length; i++)
                this.children[i].zIndex = 1000 + i;
        }
    };
    NodeSort = __decorate([
        ccclass
    ], NodeSort);
    return NodeSort;
}(cc.Component));
exports.default = NodeSort;

cc._RF.pop();