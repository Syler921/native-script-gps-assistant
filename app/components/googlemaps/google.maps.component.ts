// /app/map-example.component.ts
 
import {Component,ElementRef, ViewChild,NgZone} from '@angular/core';
import {registerElement} from "nativescript-angular/element-registry";
import {Marker, Polyline, Position} from 'nativescript-google-maps-sdk';
import {CouchbaseInstance} from "../../couchbaseinstance";
import {Couchbase} from 'nativescript-couchbase';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import dialogs = require("ui/dialogs");
// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
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
let geolocation = require('nativescript-geolocation');

//var Color = require("color").Color;
//var style = require('./map-style.json');


@Component({
    selector: 'map-example-component',
    template: `
    <GridLayout>
        <MapView (mapReady)="onMapReady($event)" (markerSelect)="onMarkerSelect($event)"></MapView>
    </GridLayout>
    `
})
/*
export class AddMarkerArgs {
    public location:Position;
    public title:string;
};
*/
export class MapExampleComponent {


    mapViewRef:any = null;
    watchId:number = null;
    //gpsLine:Polyline;
    tapLine:Polyline;
    tapMarker:any;
    gpsMarker:any;
    centeredOnLocation:boolean = false;
    public DataMarkersObject: Array<Object>;
    public database: any;  
    public location: Location;
    public couchbaseInstance: CouchbaseInstance;
    public ngZone: NgZone;
    @ViewChild("MapView") mapView: ElementRef;
   // @ViewChild("MapsModule") mapsModule: ElementRef;
    
  //  @ViewChild("MapsModule") mapsModule: MapView;
    
    //Map events
    mode: number;
    constructor(private route: ActivatedRoute) {
        this.route.params
        .forEach((params) => { this.mode = +params['mode']; });
    }
    //onMarkerSelect(event) {
      //  console.log('Clicked on ' + event.marker.title);
   // };
    //onMarkerSelect
    onMarkerSelect = (event) => {
        console.log("Clicked on " + event.marker.title);
    };

    onMapReady = (event) => {
        dialogs.alert("Your mode: " + this.mode ).then(()=> {
            console.log(this.mode);
        });
        let mapView = event.object;
        this.mapViewRef = mapView;
       // this location: Location;
        this.database = new Couchbase("test-database");
        this.couchbaseInstance = new CouchbaseInstance;

        this.database.createView("markers", "1", (document, emitter) => {
                if ( document.type == "marker")
                {
                    emitter.emit(document._id, document);
                }
            });
        var mapsModule = require("nativescript-google-maps-sdk");
        let geolocation = require('nativescript-geolocation');
        //var imageSource = require("image-source");
        //var imageModule = require("ui/image");
        exports.mapView = mapsModule.MapView; //Doesn't work

        exports.mapView = new mapsModule.MapView(); //Doesn't work
        exports.mapView = mapsModule; //Doesn't work
        console.log('test');

        let marks: { latitude: number, longitude: number, title: string  }[] = [
     
            {
                latitude: 10.498086655450642,
                longitude: -66.85348734185897,
                title : "Test 1"
            },
            {
                latitude: 42.498086655450642,
                longitude: 43.85348734185897,
                title : "Test 2"
            }
        ];

       // let mapView = args.object;
        console.log("Setting a marker...");
        //let marcas=vm.get("marks");
        for (let i=0; i<marks.length; i++){
            let marker = new mapsModule.Marker();
            marker.position = mapsModule.Position.positionFromLatLng(marks[i].latitude, marks[i].longitude);
            marker.userData = { index : i+1};
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


        this.enableLocation()
            .then(this.getLocation)
            .then(() => {
                this.watchId = geolocation.watchLocation(this.locationReceived, this.error, {
                    desiredAccuracy: 20,
                    updateDistance: 0,
                    minimumUpdateTime: 15000,
                    maximumAge: 6000
                });
                
dialogs.alert("Your message").then(()=> {
  console.log("Dialog closed!");
});
         console.log('refresh location');   
         }, this.error);
        console.log('test 1');
       this.vzemiMarkeriOtBazataIgiLogni();
       
    };

    vzemiMarkeriOtBazataIgiLogni () {
        

       this.getMarkers();
    };

    refresh() {
        this.DataMarkersObject = [];
        let rows = this.database.executeQuery("markers");
        for(let i = 0; i < rows.length; i++) {
              //console.log(rows[i].type)
              // console.log(rows[i].firstname)
               // console.log(rows[i].lastname)
            this.DataMarkersObject.push(rows[i]);
        }
    };
 
    indexOfObjectId(needle: string, haystack: any) {
        for (let i = 0; i < haystack.length; i++) {
            if (haystack[i] != undefined && haystack[i].hasOwnProperty("_id")) {
                if (haystack[i]._id == needle) {
                    return i;
                }
            }
        }
        return -1;
    };

    getMarkers () {
         console.log('test 2')
       
        this.couchbaseInstance.getDatabase();
           console.log('test 3')

        this.couchbaseInstance.startSync(true);


        //let location: Location;
        this.database.addDatabaseChangeListener((changes) => {
            let changeIndex;
            for (var i = 0; i < changes.length; i++) {
                let documentId = changes[i].getDocumentId();
                changeIndex = this.indexOfObjectId(documentId, this.DataMarkersObject);
                let document = this.database.getDocument(documentId);
                this.ngZone.run(() => {
                    if (changeIndex == -1) {
                        this.DataMarkersObject.push(document);
                    } else {
                        this.DataMarkersObject[changeIndex] = document;
                    }
                });
            }
        });
 
       // this.location.subscribe((path) => {
           // this.refresh();
        //});
 
        this.refresh();

           console.log('test 4')
        this.DataMarkersObject = [];
         console.log('test 5')
        let rows = this.database.executeQuery("markers");
         console.log(rows.length)
         console.log('test 6')
        for(let i = 0; i < rows.length; i++) {
           console.log(rows[i].type)
              console.log(rows[i].firstname)
               console.log(rows[i].lastname)
            this.DataMarkersObject.push(rows[i]);
        }
         console.log('test 7')
    };
    
    locationReceived = (position:Position) => {
        console.log('GPS Update Received');
        

        if (this.mapViewRef && position && !this.centeredOnLocation) {
            this.mapViewRef.latitude = position.latitude;
            this.mapViewRef.longitude = position.longitude;
            this.mapViewRef.zoom = 16;
            this.centeredOnLocation = true;
        }



        this.removeMarker(this.gpsMarker);
        this.gpsMarker = this.addMarker({
            location: position,
            title: 'GPS Location'
        });
    };

     enableLocation() {
        if (!geolocation.isEnabled()) {
            console.log('Location not enabled, requesting.');
            return geolocation.enableLocationRequest();
        } else {
            return Promise.resolve(true);
        }
    }

    addMarker(args:AddMarkerArgs) {
        console.log(this.mapViewRef)
        console.log(args)
         console.log(args.location)
        if (!this.mapViewRef || !args || !args.location) return;
            console.log('dsdsd')
        let marker = new mapsModule.Marker();
        marker.position = mapsModule.Position.positionFromLatLng(args.location.latitude, args.location.longitude);
        marker.title = args.title;
 console.log('dsds 1d')
        var icon = new Image();
        icon.imageSource = imageSource.fromResource('warning'); 
        marker.icon = icon;
 //console.log('dsds 2d') 
        marker.snippet = args.title;
        this.mapViewRef.addMarker(marker);
// console.log('dsds 3d') 
dialogs.alert('test loc : -- lat: ' + args.location.latitude + ' lon: ' + args.location.longitude).then(()=> {
  console.log("Dialog closed!");
});
console.log('test loc : -- lat: ' + args.location.latitude + ' lon: ' + args.location.longitude)
        return marker;
    }; 

    getLocation() {console.log('refresh loc ?????')
        if (geolocation.isEnabled()) {
            return geolocation.getCurrentLocation({
                desiredAccuracy: 20,
                updateDistance: 0,
                minimumUpdateTime: 15000,
                maximumAge: 6000
            })
        }
        return Promise.reject('Geolocation not enabled.');
    }

    removeMarker(marker:Marker) {
        if (this.mapViewRef && marker) {
            this.mapViewRef.removeMarker(marker);
        }
    }
    error(err) {
        console.log('Error: ' + JSON.stringify(err));
    }
}

export class AddMarkerArgs {
    public location:Position;
    public title:string;
}