import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataComponent } from '../data/data.component';

@Component({
    selector: 'app-dataSearch',
    templateUrl: './data-search.component.html',
    styleUrls: ['./data-search.component.css']
})
export class DataSearchComponent implements OnInit {
    searchParams = {
        keyword: null,
        categoryid : null,
        region: null,
        start_date: null,
        end_date: null
    };
    showSearch: Boolean;
    searchMessage = "Filter Results";

    constructor(private _httpService: HttpService, private _data: DataComponent) { }

    ngOnInit() {
        this.showSearch = false;
    }

    filterCrimes() {
        console.log("filtering")
        let observable = this._httpService.filterCrimes(this.searchParams);
        observable.subscribe(data => {
            console.log(data);
            console.log("Crimes:")
            this._data.crimes = data["data"];
            console.log(this._data.crimes);
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