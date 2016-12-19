"use strict";
var core_1 = require("@angular/core");
var nativescript_couchbase_1 = require('nativescript-couchbase');
var CouchbaseInstance = (function () {
    function CouchbaseInstance() {
        if (!this.isInstantiated) {
            this.database = new nativescript_couchbase_1.Couchbase("test-database");
            this.database.createView("people", "1", function (document, emitter) {
                emitter.emit(document._id, document);
            });
            this.database.createView("markers", "1", function (document, emitter) {
                if (document.type == "marker") {
                    emitter.emit(document._id, document);
                }
            });
            this.isInstantiated = true;
        }
    }
    CouchbaseInstance.prototype.getDatabase = function () {
        return this.database;
    };
    CouchbaseInstance.prototype.startSync = function (continuous) {
        this.push = this.database.createPushReplication("http://192.168.100.8:4984/test-database");
        this.pull = this.database.createPullReplication("http://192.168.100.8:4984/test-database");
        this.push.setContinuous(continuous);
        this.pull.setContinuous(continuous);
        this.push.start();
        this.pull.start();
    };
    CouchbaseInstance.prototype.stopSync = function () {
        this.push.stop();
        this.pull.stop();
    };
    CouchbaseInstance = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CouchbaseInstance);
    return CouchbaseInstance;
}());
exports.CouchbaseInstance = CouchbaseInstance;
//# sourceMappingURL=couchbaseinstance.js.map