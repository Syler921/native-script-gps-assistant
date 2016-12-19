// /app/map-example.component.ts
"use strict";
var core_1 = require('@angular/core');
var element_registry_1 = require("nativescript-angular/element-registry");
var couchbaseinstance_1 = require("../../couchbaseinstance");
var nativescript_couchbase_1 = require('nativescript-couchbase');
var dialogs = require("ui/dialogs");
// Important - must register MapView plugin in order to use in Angular templates
element_registry_1.registerElement("MapView", function () { return require("nativescript-google-maps-sdk").MapView; });
//registerElement("MapsModule", () => require("nativescript-google-maps-sdk").MapsModule);
//registerElement("Marker", () => require("nativescript-google-maps-sdk").Marker);
//registerElement("MapsModule", () => require("nativescript-google-maps-sdk").MapsModule);
//var mapsModule = require("nativescript-google-maps-sdk");
//var geolocation = require("nativescript-geolocation");
//var geolocation = require("nativescript-geolocation");
//var imageSource = require("image-source");
//var vmModule = require("./main-view-model");
//var observableModule = require("data/observable");
var mapsModule = require("nativescript-google-maps-sdk");
var Image = require("ui/image").Image;
var imageSource = require("image-source");
var geolocation = require('nativescript-geolocation');
//var Color = require("color").Color;
//var style = require('./map-style.json');
var MapExampleComponent = (function () {
    function MapExampleComponent() {
        var _this = this;
        this.mapViewRef = null;
        this.watchId = null;
        this.centeredOnLocation = false;
        // @ViewChild("MapsModule") mapsModule: ElementRef;
        //  @ViewChild("MapsModule") mapsModule: MapView;
        //Map events
        //onMarkerSelect(event) {
        //  console.log('Clicked on ' + event.marker.title);
        // };
        //onMarkerSelect
        this.onMarkerSelect = function (event) {
            console.log("Clicked on " + event.marker.title);
        };
        this.onMapReady = function (event) {
            var mapView = event.object;
            _this.mapViewRef = mapView;
            // this location: Location;
            _this.database = new nativescript_couchbase_1.Couchbase("test-database");
            _this.couchbaseInstance = new couchbaseinstance_1.CouchbaseInstance;
            _this.database.createView("markers", "1", function (document, emitter) {
                if (document.type == "marker") {
                    emitter.emit(document._id, document);
                }
            });
            var mapsModule = require("nativescript-google-maps-sdk");
            var geolocation = require('nativescript-geolocation');
            //var imageSource = require("image-source");
            //var imageModule = require("ui/image");
            exports.mapView = mapsModule.MapView; //Doesn't work
            exports.mapView = new mapsModule.MapView(); //Doesn't work
            exports.mapView = mapsModule; //Doesn't work
            console.log('test');
            var marks = [
                {
                    latitude: 10.498086655450642,
                    longitude: -66.85348734185897,
                    title: "Test 1"
                },
                {
                    latitude: 42.498086655450642,
                    longitude: 43.85348734185897,
                    title: "Test 2"
                }
            ];
            // let mapView = args.object;
            console.log("Setting a marker...");
            //let marcas=vm.get("marks");
            for (var i = 0; i < marks.length; i++) {
                var marker = new mapsModule.Marker();
                marker.position = mapsModule.Position.positionFromLatLng(marks[i].latitude, marks[i].longitude);
                marker.userData = { index: i + 1 };
                marker.title = marks[i].title;
                var icon = new Image();
                icon.imageSource = imageSource.fromResource('camera');
                marker.icon = icon;
                // var icon = new imageModule.Image();
                //var bearing = 0
                //var output = []
                //imageSource.fromUrl
                //var imageSource = imageSource.fromUrl('http://www.uidownload.com/files/589/451/724/location-map-marker-monotone-pin-icon.png');
                // icon.imageSource = imageSource;
                // marker.icon = icon;
                //var tempIcon = new Image();
                //var img = imageSource.fromUrl('http://www.uidownload.com/files/589/451/724/location-map-marker-monotone-pin-icon.png');
                //let image = new ImageModule.Image();
                // image.src = "http://www.uidownload.com/files/589/451/724/location-map-marker-monotone-pin-icon.png";
                //imageSource.source = 
                //tempIcon.imageSource = imageSource.fromResource(String(icon));
                //icon = tempIcon;
                //marker.icon = image;//'http://www.uidownload.com/files/589/451/724/location-map-marker-monotone-pin-icon.png';
                // marker.data=marcas[i];
                mapView.addMarker(marker);
            }
            _this.enableLocation()
                .then(_this.getLocation)
                .then(function () {
                _this.watchId = geolocation.watchLocation(_this.locationReceived, _this.error, {
                    desiredAccuracy: 20,
                    updateDistance: 0,
                    minimumUpdateTime: 15000,
                    maximumAge: 6000
                });
                dialogs.alert("Your message").then(function () {
                    console.log("Dialog closed!");
                });
                console.log('refresh location');
            }, _this.error);
            console.log('test 1');
            _this.vzemiMarkeriOtBazataIgiLogni();
        };
        this.locationReceived = function (position) {
            console.log('GPS Update Received');
            if (_this.mapViewRef && position && !_this.centeredOnLocation) {
                _this.mapViewRef.latitude = position.latitude;
                _this.mapViewRef.longitude = position.longitude;
                _this.mapViewRef.zoom = 16;
                _this.centeredOnLocation = true;
            }
            _this.removeMarker(_this.gpsMarker);
            _this.gpsMarker = _this.addMarker({
                location: position,
                title: 'GPS Location'
            });
        };
    }
    MapExampleComponent.prototype.vzemiMarkeriOtBazataIgiLogni = function () {
        this.getMarkers();
    };
    ;
    MapExampleComponent.prototype.refresh = function () {
        this.DataMarkersObject = [];
        var rows = this.database.executeQuery("markers");
        for (var i = 0; i < rows.length; i++) {
            //console.log(rows[i].type)
            // console.log(rows[i].firstname)
            // console.log(rows[i].lastname)
            this.DataMarkersObject.push(rows[i]);
        }
    };
    ;
    MapExampleComponent.prototype.indexOfObjectId = function (needle, haystack) {
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i] != undefined && haystack[i].hasOwnProperty("_id")) {
                if (haystack[i]._id == needle) {
                    return i;
                }
            }
        }
        return -1;
    };
    ;
    MapExampleComponent.prototype.getMarkers = function () {
        var _this = this;
        console.log('test 2');
        this.couchbaseInstance.getDatabase();
        console.log('test 3');
        this.couchbaseInstance.startSync(true);
        //let location: Location;
        this.database.addDatabaseChangeListener(function (changes) {
            var changeIndex;
            var _loop_1 = function() {
                var documentId = changes[i].getDocumentId();
                changeIndex = _this.indexOfObjectId(documentId, _this.DataMarkersObject);
                var document_1 = _this.database.getDocument(documentId);
                _this.ngZone.run(function () {
                    if (changeIndex == -1) {
                        _this.DataMarkersObject.push(document_1);
                    }
                    else {
                        _this.DataMarkersObject[changeIndex] = document_1;
                    }
                });
            };
            for (var i = 0; i < changes.length; i++) {
                _loop_1();
            }
        });
        // this.location.subscribe((path) => {
        // this.refresh();
        //});
        this.refresh();
        console.log('test 4');
        this.DataMarkersObject = [];
        console.log('test 5');
        var rows = this.database.executeQuery("markers");
        console.log(rows.length);
        console.log('test 6');
        for (var i = 0; i < rows.length; i++) {
            console.log(rows[i].type);
            console.log(rows[i].firstname);
            console.log(rows[i].lastname);
            this.DataMarkersObject.push(rows[i]);
        }
        console.log('test 7');
    };
    ;
    MapExampleComponent.prototype.enableLocation = function () {
        if (!geolocation.isEnabled()) {
            console.log('Location not enabled, requesting.');
            return geolocation.enableLocationRequest();
        }
        else {
            return Promise.resolve(true);
        }
    };
    MapExampleComponent.prototype.addMarker = function (args) {
        console.log(this.mapViewRef);
        console.log(args);
        console.log(args.location);
        if (!this.mapViewRef || !args || !args.location)
            return;
        console.log('dsdsd');
        var marker = new mapsModule.Marker();
        marker.position = mapsModule.Position.positionFromLatLng(args.location.latitude, args.location.longitude);
        marker.title = args.title;
        console.log('dsds 1d');
        var icon = new Image();
        icon.imageSource = imageSource.fromResource('warning');
        marker.icon = icon;
        //console.log('dsds 2d') 
        marker.snippet = args.title;
        this.mapViewRef.addMarker(marker);
        // console.log('dsds 3d') 
        dialogs.alert('test loc : -- lat: ' + args.location.latitude + ' lon: ' + args.location.longitude).then(function () {
            console.log("Dialog closed!");
        });
        console.log('test loc : -- lat: ' + args.location.latitude + ' lon: ' + args.location.longitude);
        return marker;
    };
    ;
    MapExampleComponent.prototype.getLocation = function () {
        console.log('refresh loc ?????');
        if (geolocation.isEnabled()) {
            return geolocation.getCurrentLocation({
                desiredAccuracy: 20,
                updateDistance: 0,
                minimumUpdateTime: 15000,
                maximumAge: 6000
            });
        }
        return Promise.reject('Geolocation not enabled.');
    };
    MapExampleComponent.prototype.removeMarker = function (marker) {
        if (this.mapViewRef && marker) {
            this.mapViewRef.removeMarker(marker);
        }
    };
    MapExampleComponent.prototype.error = function (err) {
        console.log('Error: ' + JSON.stringify(err));
    };
    __decorate([
        core_1.ViewChild("MapView"), 
        __metadata('design:type', core_1.ElementRef)
    ], MapExampleComponent.prototype, "mapView", void 0);
    MapExampleComponent = __decorate([
        core_1.Component({
            selector: 'map-example-component',
            template: "\n    <GridLayout>\n        <MapView (mapReady)=\"onMapReady($event)\" (markerSelect)=\"onMarkerSelect($event)\"></MapView>\n    </GridLayout>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], MapExampleComponent);
    return MapExampleComponent;
}());
exports.MapExampleComponent = MapExampleComponent;
var AddMarkerArgs = (function () {
    function AddMarkerArgs() {
    }
    return AddMarkerArgs;
}());
exports.AddMarkerArgs = AddMarkerArgs;
//# sourceMappingURL=google.maps.component.js.map