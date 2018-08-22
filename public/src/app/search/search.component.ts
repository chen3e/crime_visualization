import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { MapComponent } from '../map/map.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    searchParams = {
        keyword: null,
        categoryid : null,
        region: null,
        date: null
    };

    constructor(private _httpService: HttpService, private _map: MapComponent) { }

    ngOnInit() {
    }

    filterCrimes() {
        let observable = this._httpService.filterCrimes(this.searchParams);
        observable.subscribe(data => {
            console.log(data);
            console.log("Crimes:")
            this._map.crimes = data["data"];
            console.log(this._map.crimes);
            this._map.initMap();
        })
    }
}
