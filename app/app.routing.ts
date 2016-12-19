import { Routes } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { CreateComponent } from "./components/create/create.component";
import { MapExampleComponent } from "./components/googlemaps/google.maps.component";
import { AddMarkersComponent } from "./components/addmarkers/add.markers.component";
 
export const appRoutes: Routes = [
    { path: '', component: ListComponent },
    { path: "create", component: CreateComponent },
    { path: "map-example-component/:mode", component: MapExampleComponent },
    { path: "addMarkers", component: AddMarkersComponent }
];
 
export const appComponents: any = [
    ListComponent,
    CreateComponent,
    MapExampleComponent,
    AddMarkersComponent
];