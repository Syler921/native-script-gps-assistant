"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var couchbaseinstance_1 = require("../../couchbaseinstance");
var ListComponent = (function () {
    function ListComponent(router, location, ngZone, couchbaseInstance) {
        var _this = this;
        this.router = router;
        this.ngZone = ngZone;
        this.database = couchbaseInstance.getDatabase();
        this.personList = [];
        couchbaseInstance.startSync(true);
        this.database.addDatabaseChangeListener(function (changes) {
            var changeIndex;
            var _loop_1 = function() {
                var documentId = changes[i].getDocumentId();
                changeIndex = _this.indexOfObjectId(documentId, _this.personList);
                var document_1 = _this.database.getDocument(documentId);
                _this.ngZone.run(function () {
                    if (changeIndex == -1) {
                        _this.personList.push(document_1);
                    }
                    else {
                        _this.personList[changeIndex] = document_1;
                    }
                });
            };
            for (var i = 0; i < changes.length; i++) {
                _loop_1();
            }
        });
        location.subscribe(function (path) {
            _this.refresh();
        });
        this.refresh();
    }
    ListComponent.prototype.create = function () {
        //this.router.navigate(["/map-example-component"]);
        this.router.navigate(["/create"]);
    };
    ListComponent.prototype.openMap = function (mode) {
        this.router.navigate(["/map-example-component/" + mode]);
    };
    ListComponent.prototype.openMenu = function () {
        this.router.navigate(["/addMarkers"]);
    };
    ListComponent.prototype.refresh = function () {
        this.personList = [];
        var rows = this.database.executeQuery("people");
        for (var i = 0; i < rows.length; i++) {
            this.personList.push(rows[i]);
        }
    };
    ListComponent.prototype.indexOfObjectId = function (needle, haystack) {
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i] != undefined && haystack[i].hasOwnProperty("_id")) {
                if (haystack[i]._id == needle) {
                    return i;
                }
            }
        }
        return -1;
    };
    ListComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "components/list/list.component.html",
        }), 
        __metadata('design:paramtypes', [router_1.Router, common_1.Location, core_1.NgZone, couchbaseinstance_1.CouchbaseInstance])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map