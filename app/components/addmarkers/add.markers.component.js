"use strict";
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var couchbaseinstance_1 = require("../../couchbaseinstance");
var cameraModule = require("camera");
var imageModule = require("ui/image");
//import observableModule = require("data/observable");
var AddMarkersComponent = (function () {
    //public items: number[];
    function AddMarkersComponent(location, couchbaseInstance) {
        /* this.database = couchbaseInstance.getDatabase();
         this.location = location;
         this.firstname = "";
         this.lastname = "";
         this.type = "marker"*/
        cameraModule.takePicture().then(function (picture) {
            console.log("Result is an image source instance");
            var image = new imageModule.Image();
            image.imageSource = picture;
        });
        //this.items = [1, 2, 3];
    }
    AddMarkersComponent.prototype.logValues = function () {
        console.log(this.locationName + ' ----- ' + this.locationPicture + ' ------ ' + this.locationCoordinates);
    };
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