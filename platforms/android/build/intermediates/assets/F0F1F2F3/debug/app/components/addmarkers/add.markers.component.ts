import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {CouchbaseInstance} from "../../couchbaseinstance";
 
@Component({
    selector: "my-app",
    templateUrl: "components/addmarkers/add.markers.component.html"
})
export class AddMarkersComponent {
 
    private couchbaseInstance: CouchbaseInstance;
    private database: any;
    private location: Location;

    public firstname: string;
    public lastname: string;
    public picture: string;
    public coordinates: string;

    public type: string;


    constructor(location: Location, couchbaseInstance: CouchbaseInstance) {
       /* this.database = couchbaseInstance.getDatabase();
        this.location = location;
        this.firstname = "";
        this.lastname = "";
        this.type = "marker"*/
    }
 
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