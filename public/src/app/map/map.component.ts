import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    crimes = [];

    constructor(private _httpService: HttpService) { }

    ngOnInit() {
    }
    getCrimes() {
        let observable = this._httpService.getCrimes();
        observable.subscribe(data => {
            console.log(data);
            console.log("Crimes:")
            this.crimes = JSON.parse(data["data"])['items'];
            console.log(this.crimes[0]);
        })
    }
}
