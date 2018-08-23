import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './map/map.component';
import { SearchComponent } from './search/search.component';
import { DataComponent } from './data/data.component';
import { GraphComponent } from './graph/graph.component';
import { ReportComponent } from './report/report.component';
import { DataSearchComponent } from './data-search/data-search.component';

const routes: Routes = [
    {
        path: "", component: MapComponent, children: [
            {
                path: "", component: SearchComponent
            },
        ]
    },
    {
        path: "data", component: DataComponent, children: [
            {
                path: "", component: DataSearchComponent
            },
        ]
    },
    {
        path:'graph', component: GraphComponent
    },
    {
        path: 'report', component: ReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
