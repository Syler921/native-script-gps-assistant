"use strict";
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var couchbaseinstance_1 = require("../../couchbaseinstance");
var AddMarkersComponent = (function () {
    function AddMarkersComponent(location, couchbaseInstance) {
        /* this.database = couchbaseInstance.getDatabase();
         this.location = location;
         this.firstname = "";
         this.lastname = "";
         this.type = "marker"*/
    }
    AddMarkersComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "components/addmarkers/add.markers.component.html"
        }), 
        __metadata('design:paramtypes', [common_1.Location, couchbaseinstance_1.CouchbaseInstance])
    ], AddMarkersComponent);
    return AddMarkersComponent;
}());
exports.AddMarkersComponent = AddMarkersComponent;
//# sourceMappingURL=add.markers.component.js.map