import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
    LineChart: any;
    PieChart: any;
    line: Boolean;
    pie: Boolean;
    graph1 = [];
    searchParams: any;
    crimeLabels = [];
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
    colors = [
        'rgb(255,153,153)', 'rgb(255,204,153)', 'rgb(255,255,153)', 'rgb(204,255,153)', 'rgb(153,255,153)', 'rgb(153,255,204)', 'rgb(153,255,255)', 'rgb(153,204,255)', 'rgb(153,153,255)', 'rgb(204,153,255)', 'rgb(255,153,255)', 'rgb(255,153,204)', 'rgb(255,0,0)', 'rgb(255,128,0)', 'rgb(255,255,0)', 'rgb(0,255,0)', 'rgb(0,255,128)', 'rgb(0,255,255)', 'rgb(0,128,255)', 'rgb(0,0,255)', 'rgb(127,0,255)'
    ];
    dataColors = [];
    precrimeLabels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    dataCrimeArray = [];
    crimeData = [];
    crimes: any;
    showSearch: Boolean;
    searchMessage = "Filter Results";
    constructor(private _httpService: HttpService) { }
    ngOnInit() {
        this.initChart();
        // this.initPieChart();
        this.showSearch = false;
        this.line = true;
        this.pie = false;
    }
    initChart() {
        this.LineChart = new Chart('lineChart', {
            type: 'line',
            data: {

                labels: ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'],
                datasets: [{

                    label: 'Number of items sold in months',

                    data: [9, 2, 4, 15, 42, 88, 100, 5],
                    fill: false,
                    lineTension: 0.2,
                    borderColor: 'red',
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    text: 'Line Chart',
                    display: true
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
    }
    initChart2() {
        var canvas = <HTMLCanvasElement>document.getElementById('chart2');
        var ctx = canvas.getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                //labels for x axis - Dataset data will be at each point on this array - if this array is shorter
                // than the data array, it will leave the data points off that go beyond label array length
                labels: ['jan', 'feb', 'mar', 'april', 'may', 'june', 'july'],
                datasets: [{
                    //title/legend?
                    label: "My First dataset",
                    backgroundColor: 'pink',
                    borderColor: 'blue',
                    //this is the data we want to provide - ideally array length is same size as labels array
                    data: [2, 5, 6, 78, 4, 6]
                }]
            },
            options: {
                hover: {
                    mode: 'nearest',
                    intersect: false,
                }
            }
        });
    }
    makePieChart() {
        if (canvas) {
            console.log('it exisits');
        }
        console.log("making pie");
        console.log(this.crimeLabels);
        console.log(this.crimeData);
        var canvas = <HTMLCanvasElement>document.getElementById('pieChart');
        var ctx = canvas.getContext('2d');
        this.PieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data: this.crimeData,
                    backgroundColor: this.dataColors,
                    borderWidth: 0

                }],
                labels: this.crimeLabels
            },
            options: {
            }
        })
    }
    initPieChart() {
        console.log("Initializing pie chart with all data");
        this.getAllCrimes();
        this.makePieChart();
    }

    getAllCrimes() {
        console.log("In filter");
        let observable = this._httpService.filterCrimes({});
        observable.subscribe(data => {
            console.log("Here were the entered search params");
            console.log(this.searchParams);
            this.crimes = data["data"];

            for (var i = 0; i < data['data'].length; i++) {
                //console.log(data['data'][i]);
                //console.log('this is the category id', data['data'][i]['categoryid']);
                //console.log('this is the dict data of that id', this.crimeDict[data['data'][i]['categoryid']]);
                //console.log(this.crimeLabels[data['data'][i]['categoryid']]);
                this.precrimeLabels[data['data'][i]['categoryid']]++;
                //console.log(this.crimeLabels);
            }
            for (var j = 1; j < this.precrimeLabels.length; j++) {
                this.dataCrimeArray.push(this.precrimeLabels[j]);
            }
            for (var k = 0; k < this.dataCrimeArray.length; k++) {
                if (this.dataCrimeArray[k] != 0) {
                    this.crimeLabels.push(this.crimeDict[k + 1]);
                    this.crimeData.push(this.dataCrimeArray[k]);
                    this.dataColors.push(this.colors[k]);
                }
            }
            console.log(this.dataCrimeArray);
            console.log(this.crimeLabels);
            console.log("Here are some graph crimes");
            console.log(this.crimes);
            this.makePieChart();
        })
    }
    //filterCrimes() {
    //  this.crimeLabels = [];
    //  this.precrimeLabels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //  this.dataCrimeArray = [];
    //  this.dataColors = [];
    //  this.crimeData = [];
    //  console.log("In filter");
    //  let observable = this._httpService.filterCrimes(this.searchParams);
    //  observable.subscribe(data => {
    //    console.log("Here were the entered search params");
    //    console.log(this.searchParams);
    //    this.crimes = data["data"];

    //    for (var i = 0; i < data['data'].length; i++) {
    //      //console.log(data['data'][i]);
    //      //console.log('this is the category id', data['data'][i]['categoryid']);
    //      //console.log('this is the dict data of that id', this.crimeDict[data['data'][i]['categoryid']]);
    //      //console.log(this.crimeLabels[data['data'][i]['categoryid']]);
    //      this.precrimeLabels[data['data'][i]['categoryid']]++;
    //      //console.log(this.crimeLabels);
    //    }
    //    for (var j = 1; j < this.precrimeLabels.length; j++) {
    //      this.dataCrimeArray.push(this.precrimeLabels[j]);
    //    }
    //    for (var k = 0; k < this.dataCrimeArray.length; k++) {
    //      if (this.dataCrimeArray[k] != 0) {
    //        this.crimeLabels.push(this.crimeDict[k + 1]);
    //        this.crimeData.push(this.dataCrimeArray[k]);
    //        this.dataColors.push(this.colors[k]);
    //      }
    //    }
    //    console.log(this.dataCrimeArray);
    //    console.log(this.crimeLabels);
    //    console.log("Here are some graph crimes");
    //    console.log(this.crimes);
    //    this.makePieChart();
    //  })
    //}
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
    filterCrimes() {
        this.searchParams = {};
        console.log("In filter");
        let observable = this._httpService.filterCrimes(this.searchParams);
        observable.subscribe(data => {
            console.log(data);
            console.log("Crimes:")
            this.crimes = data["data"];
            console.log("Here are some graph crimes");
            console.log(this.crimes);
        })
    }

    pastWeek() {
        this.searchParams = {
            start_date: "2015-11-15",
            end_date: "2015-11-22"
        };
        this.filterCrimes();
    }

    pastMonth() {
        this.searchParams = {
            start_date: "2015-10-22",
            end_date: "2015-11-22"
        };
        this.filterCrimes();
    }

    pastYear() {
        this.searchParams = {
            start_date: "2014-10-22",
            end_date: "2015-11-22"
        };
        this.filterCrimes();
    }

    farNorthSide() {
        this.searchParams = {
            region: "farNorthSide",
        };
        this.filterCrimes();
    }

    northwestSide() {
        this.searchParams = {
            region: "northwestSide",
        };
        this.filterCrimes();
    }

    northSide() {
        this.searchParams = {
            region: "northSide",
        };
        this.filterCrimes();
    }

    westSide() {
        this.searchParams = {
            region: "westSide",
        };
        this.filterCrimes();
    }

    central() {
        this.searchParams = {
            region: "central",
        };
        this.filterCrimes();
    }

    southSide() {
        this.searchParams = {
            region: "southSide",
        };
        this.filterCrimes();
    }

    southwestSide() {
        this.searchParams = {
            region: "southwestSide",
        };
        this.filterCrimes();
    }

    farSouthwestSide() {
        this.searchParams = {
            region: "farSouthwestSide",
        };
        this.filterCrimes();
    }

    farSoutheastSide() {
        this.searchParams = {
            region: "farSoutheastSide",
        };
        this.filterCrimes();
    }
}
