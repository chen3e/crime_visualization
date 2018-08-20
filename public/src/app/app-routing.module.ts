import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './map/map.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
    { path: "", component: MapComponent, children: [
        { path: "", component: SearchComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
