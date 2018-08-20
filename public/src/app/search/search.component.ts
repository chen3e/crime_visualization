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
        keyword: "",
        categoryid : null,
        region: null,
        start_date: null,
        end_date: null
    };

    constructor(private _httpService: HttpService, private _map: MapComponent) { }

    ngOnInit() {
    }

    filterCrimes() {
        let catStr = "";
        for (let i = 0; i < this.searchParams.categoryid.length; i++) {
            catStr += this.searchParams.categoryid[i];
            if (i !== this.searchParams.categoryid.length - 1) {
                catStr += ",";
            }
        }
        this.searchParams.categoryid = catStr;

        let observable = this._httpService.filterCrimes(this.searchParams);
        observable.subscribe(data => {
            console.log(data);
            console.log("Crimes:")
            this._map.crimes = JSON.parse(data["data"])['items'];
            console.log(this._map.crimes);
        })
    }
}
