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
        categoryid: null,
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
            for (let i = 0; i < this._data.crimes.length; i++) {
                this._data.crimes[i].description = this._data.crimes[i].description.split('BR&gt;');
                let description = {};
                for (let j = 0; j < this._data.crimes[i].description.length; j++) {
                    this._data.crimes[i].description[j] = this._data.crimes[i].description[j].split(":");
                    console.log(this._data.crimes[i].description[j]);
                    if (this._data.crimes[i].description[j][2]) {
                        description[this._data.crimes[i].description[j][0]] = this._data.crimes[i].description[j][1] + ":" + this._data.crimes[i].description[j][2].replace("&lt;", "");
                    }
                    else if (this._data.crimes[i].description[j][1]) {
                        description[this._data.crimes[i].description[j][0]] = this._data.crimes[i].description[j][1].replace("&lt;", "");
                    }
                    else {
                        description[this._data.crimes[i].description[j][0]] = true;
                    }
                }
<<<<<<< HEAD
                this._data.crimes[i].description = description;
                console.log(this._data.crimes[i].description);
=======
                let image = {
                    url: `assets/img/${this._data.crimes[i].catname.split(" ").join("")}.png`,
                }
                this._data.crimes[i].description = description;
                console.log(this._data.crimes[i].description);
                this._data.crimes[i].icon = image;
>>>>>>> 0f3033d1dbb74bc923f489d4070972acad89b947
            }
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