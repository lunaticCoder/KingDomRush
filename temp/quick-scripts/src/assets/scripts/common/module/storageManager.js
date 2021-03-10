"use strict";
cc._RF.push(module, '5b356Jms5BGTa+3XY/EELA9', 'storageManager');
// scripts/common/module/storageManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StorageManager = /** @class */ (function () {
    function StorageManager() {
        this.ls = cc.sys.localStorage;
    }
    StorageManager.init = function () {
        this.ins = new StorageManager();
    };
    StorageManager.prototype.storageData = function (key, data) {
        this.ls.setItem(key, data);
    };
    StorageManager.prototype.getData = function (key) {
        return this.ls.getItem(key);
    };
    StorageManager.prototype.removeData = function (key) {
        this.ls.removeItem(key);
    };
    StorageManager.ins = null;
    return StorageManager;
}());
exports.default = StorageManager;

cc._RF.pop();