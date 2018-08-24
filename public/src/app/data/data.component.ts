import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
// import { MapComponent } from '../map/map.component';

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
    crimes: [{
        catname: String,
        latitude: Number,
        longitude: Number,
        description: any
    }];

    constructor(
        private _httpService: HttpService,
        // private _map: MapComponent,
    ) { }

    ngOnInit() {
        this.getCrimes();
    }

    getCrimes() {
        let observable = this._httpService.getCrimes();
        observable.subscribe(data => {
            console.log(data);
            console.log("Crimes:")
            this.crimes = data["data"];
            console.log(this.crimes);
            for (let i = 0; i < this.crimes.length; i++) {
                this.crimes[i].description = this.crimes[i].description.split('BR&gt;');
                let description = {};
                for (let j = 0; j < this.crimes[i].description.length; j++) {
                    this.crimes[i].description[j] = this.crimes[i].description[j].split(":");
                    console.log(this.crimes[i].description[j]);
                    if (this.crimes[i].description[j][2]) {
                        description[this.crimes[i].description[j][0]] = this.crimes[i].description[j][1] + ":" + this.crimes[i].description[j][2].replace("&lt;", "");
                    }
                    else if (this.crimes[i].description[j][1]) {
                        description[this.crimes[i].description[j][0]] = this.crimes[i].description[j][1].replace("&lt;", "");
                    }
                    else {
                        description[this.crimes[i].description[j][0]] = true;
                    }
                }
                this.crimes[i].description = description;
                console.log(this.crimes[i].description);
            }
        })
    }
}
