import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {CouchbaseInstance} from "../../couchbaseinstance";
import cameraModule = require("camera");
import imageModule = require("ui/image");
//import observableModule = require("data/observable");

@Component({
    selector: "my-app",
    templateUrl: "components/addmarkers/add.markers.component.html"
})
export class AddMarkersComponent {
 
    private couchbaseInstance: CouchbaseInstance;
    private database: any;
    private location: Location;

    public firstname: string;
    public locationName: string;
    public locationPicture: string;
    public locationCoordinates: string;

    public type: string;
    //public items: number[];

    constructor(location: Location, couchbaseInstance: CouchbaseInstance) {
       /* this.database = couchbaseInstance.getDatabase();
        this.location = location;
        this.firstname = "";
        this.lastname = "";
        this.type = "marker"*/

        cameraModule.takePicture().then(picture => {
            console.log("Result is an image source instance");
            var image = new imageModule.Image();
            image.imageSource = picture;
        });
       //this.items = [1, 2, 3];
    }
    logValues (){
        console.log(this.locationName + ' ----- ' + this.locationPicture  + ' ------ ' + this.locationCoordinates);
    }
    //onPageLoaded () {

    //}
    //public selectedLocationIndex(picker) {
     //   console.log('picker selection: ' + picker.selectedIndex);
    //}
  
    /*save() {
        if(this.firstname != "" && this.lastname != "") {
            this.database.createDocument({
                "firstname": this.firstname,
                "lastname": this.lastname,
                "type": this.type
            });
            this.location.back();
        }
    }*/
 
}

