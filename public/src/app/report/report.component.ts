import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    crime = {
        categoryid: "",
        catname: "",
        city: "Chicago",
        date: "",
        description: "",
        id: "",
        longitude: "",
        latitude: "",
        name: "",
        state: "IL"
    };
    crimeDict = {
        "1": "Battery",
        "2": "Assault",
        "3": "Motor Vehicle Theft",
        "4": "Theft",
        "5": "Criminal Damage",
        "6": "Burglary",
        "7": "Sex Offense",
        "8": "Robbery",
        "9": "Miscellaneous",
        "10": "Sexual Assault",
        "11": "Deceptive Practice",
        "12": "Weapons Violation",
        "13": "Narcotics",
        "14": "Prostitution",
        "15": "Arson",
        "16": "Homicide",
        "17": "Gambling",
        "18": "Kidnapping",
        "19": "Obscenity",
        "20": "Intimidation",
        "21": "Stalking"
    }
    errors = {};

    constructor(private _httpService: HttpService) { }

    ngOnInit() {
    }
    reportCrime() {
        this.errors = {};
        if (this.crime.categoryid) {
            this.crime.catname = this.crimeDict[this.crime.categoryid];
            this.crime.name = this.crime.catname.toUpperCase();
        }
        this.crime.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        console.log(this.crime);

        let observable = this._httpService.reportCrime(this.crime);
        observable.subscribe(data => {
            if (data['errors']) {
                console.log(data['errors'])
                for (let error in data['errors']['errors']) {
                    console.log(error)
                    this.errors[error] = data['errors']['errors'][error]['message'];
                }
                console.log(this.errors)
            }
            else {
                // console.log("Added author!", data);
                // this._router.navigate([''])
                console.log("Success!")
            }
        })
    }

}
