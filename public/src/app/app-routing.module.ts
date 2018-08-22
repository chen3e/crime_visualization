import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './map/map.component';
import { SearchComponent } from './search/search.component';
import { DataComponent } from './data/data.component';
import { GraphComponent } from './graph/graph.component';

const routes: Routes = [
    {
        path: "", component: MapComponent, children: [
            {
                path: "", component: SearchComponent
            },
        ]
    },
    {
        path: "data", component: DataComponent
    },
    {
        path:'graph', component:GraphComponent
    },
    {
        path:'map', component: MapComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
