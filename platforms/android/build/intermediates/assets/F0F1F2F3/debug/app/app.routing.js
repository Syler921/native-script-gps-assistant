"use strict";
var list_component_1 = require("./components/list/list.component");
var create_component_1 = require("./components/create/create.component");
var google_maps_component_1 = require("./components/googlemaps/google.maps.component");
var add_markers_component_1 = require("./components/addmarkers/add.markers.component");
exports.appRoutes = [
    { path: '', component: list_component_1.ListComponent },
    { path: "create", component: create_component_1.CreateComponent },
    { path: "map-example-component", component: google_maps_component_1.MapExampleComponent },
    { path: "addMarkers", component: add_markers_component_1.AddMarkersComponent }
];
exports.appComponents = [
    list_component_1.ListComponent,
    create_component_1.CreateComponent,
    google_maps_component_1.MapExampleComponent,
    add_markers_component_1.AddMarkersComponent
];
//# sourceMappingURL=app.routing.js.map