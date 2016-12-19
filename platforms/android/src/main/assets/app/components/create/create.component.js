"use strict";
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var couchbaseinstance_1 = require("../../couchbaseinstance");
var CreateComponent = (function () {
    function CreateComponent(location, couchbaseInstance) {
        this.database = couchbaseInstance.getDatabase();
        this.location = location;
        this.firstname = "";
        this.lastname = "";
        this.type = "marker";
    }
    CreateComponent.prototype.save = function () {
        if (this.firstname != "" && this.lastname != "") {
            this.database.createDocument({
                "firstname": this.firstname,
                "lastname": this.lastname,
                "type": this.type
            });
            this.location.back();
        }
    };
    CreateComponent = __decorate([
        core_1.Component({
            selector: "create",
            templateUrl: "./components/create/create.component.html"
        }), 
        __metadata('design:paramtypes', [common_1.Location, couchbaseinstance_1.CouchbaseInstance])
    ], CreateComponent);
    return CreateComponent;
}());
exports.CreateComponent = CreateComponent;
//# sourceMappingURL=create.component.js.map