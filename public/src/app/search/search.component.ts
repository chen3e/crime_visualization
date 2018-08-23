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
        start_date: null,
        end_date: null
    };
    showSearch: Boolean;
    searchMessage = "Filter Results";

    constructor(private _httpService: HttpService, private _map: MapComponent) { }

    ngOnInit() {
        this.showSearch = false;
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

    show() {
        if (!this.showSearch) {
            console.log("Showing")
            this.showSearch = true;
            this.searchMessage = "Hide Search";
        }
        else {
            console.log("Hiding")
            this.showSearch = false;
            this.searchMessage = "Filter Results"
        }
    }
}
