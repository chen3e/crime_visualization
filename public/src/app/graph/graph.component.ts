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
    // crimeLabels are the type of crime, stored as an array so they can be displayed on the chart. Array size is variable
    crimeLabels = [];
    // crimeDict contains 21 values, and we used this to grab and store/compare data.
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
    // colors is a fixed array of length 21, containing 21 rgb color values.  Feel free to change these.
    colors = [
        'rgb(255,153,153)', 'rgb(255,204,153)', 'rgb(255,255,153)', 'rgb(204,255,153)', 'rgb(153,255,153)', 'rgb(153,255,204)', 'rgb(153,255,255)', 'rgb(153,204,255)', 'rgb(153,153,255)', 'rgb(204,153,255)', 'rgb(255,153,255)', 'rgb(255,153,204)', 'rgb(255,0,0)', 'rgb(255,128,0)', 'rgb(255,255,0)', 'rgb(0,255,0)', 'rgb(0,255,128)', 'rgb(0,255,255)', 'rgb(0,128,255)', 'rgb(0,0,255)', 'rgb(127,0,255)'
    ];
    // This is the array that gets passed to the chart. Variable size, so it needs to be reset every time.
    dataColors = [];
    precrimeLabels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    dataCrimeArray = [];
    crimeData = [];
    crimes: any;
    showSearch: Boolean;
    searchMessage = "Filter Results";
    myPieChart: any;

    constructor(private _httpService: HttpService) { }

    ngOnInit() {
        this.initChart();
        this.initPieChart();
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
    filterCrimes() {
        console.log("In filter");
        this.crimeLabels = [];
        this.precrimeLabels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.dataCrimeArray = [];
        this.dataColors = [];
        this.crimeData = [];
        let observable = this._httpService.filterCrimes(this.searchParams);
        observable.subscribe(data => {
            console.log(data);
            console.log("Crimes:")
            this.crimes = data["data"];
            console.log("Here are some graph crimes");
            console.log(this.crimes);

            for (var i = 0; i < this.crimes.length; i++) {
                //console.log(this.crimes[i]);
                //console.log('this is the category id', this.crimes[i]['categoryid']);
                //console.log('this is the dict data of that id', this.crimeDict[this.crimes[i]['categoryid']]);
                //console.log(this.crimeLabels[this.crimes[i]['categoryid']]);
                this.precrimeLabels[this.crimes[i]['categoryid']]++;
                //console.log(this.crimeLabels);
            }
            for (var j = 1; j < this.precrimeLabels.length; j++) {
                this.dataCrimeArray.push(this.precrimeLabels[j]);
            }
            let sum = 0;
            for (var k = 0; k < this.dataCrimeArray.length; k++) {
                if (this.dataCrimeArray[k] != 0) {
                    this.crimeLabels.push(this.crimeDict[k + 1]);
                    this.crimeData.push(this.dataCrimeArray[k]);
                    this.dataColors.push(this.colors[k]);
                    sum += this.dataCrimeArray[k];
                }
            }
            for (var l = 0; l < this.crimeData.length; l++) {
                console.log(this.crimeData[l]);
                this.crimeData[l] = this.crimeData[l] / sum * 100;
                this.crimeData[l] = this.crimeData[l].toFixed(2);
            }
            console.log(this.dataCrimeArray);
            console.log(this.crimeLabels);
            console.log("Here are some graph crimes");
            console.log(this.crimes);
            data = [{ data: this.crimeData }];
            this.removePie(this.myPieChart);
            this.addPie(this.myPieChart, this.crimeLabels, this.crimeData);
        })
    }

    addPie(chart, label, data) {
        chart.data.labels = label;
        chart.data.datasets[0].data = data;
        chart.update();
        console.log(chart.data);
    }

    removePie(chart) {
        chart.data.labels = [];
        chart.data.datasets.forEach((dataset) => {
            dataset.data = {};
        });
        chart.update();
    }

    pastWeek() {
        this.searchParams = {};
        this.searchParams = {
            start_date: "2015-11-15",
            end_date: "2015-11-22"
        };
        this.filterCrimes();
    }

    pastMonth() {
        this.searchParams = {};
        this.searchParams = {
            start_date: "2015-10-22",
            end_date: "2015-11-22"
        };
        this.filterCrimes();
    }

    pastYear() {
        this.searchParams = {};
        this.searchParams = {
            start_date: "2014-10-22",
            end_date: "2015-11-22"
        };
        this.filterCrimes();
    }

    farNorthSide() {
        this.searchParams = {};
        this.searchParams = {
            region: "farNorthSide",
        };
        this.filterCrimes();
    }

    northwestSide() {
        this.searchParams = {};
        this.searchParams = {
            region: "northwestSide",
        };
        this.filterCrimes();
    }

    northSide() {
        this.searchParams = {};
        this.searchParams = {
            region: "northSide",
        };
        this.filterCrimes();
    }

    westSide() {
        this.searchParams = {};
        this.searchParams = {
            region: "westSide",
        };
        this.filterCrimes();
    }

    central() {
        this.searchParams = {};
        this.searchParams = {
            region: "central",
        };
        this.filterCrimes();
    }

    southSide() {
        this.searchParams = {};
        this.searchParams = {
            region: "southSide",
        };
        this.filterCrimes();
    }

    southwestSide() {
        this.searchParams = {};
        this.searchParams = {
            region: "southwestSide",
        };
        this.filterCrimes();
    }

    farSouthwestSide() {
        this.searchParams = {};
        this.searchParams = {
            region: "farSouthwestSide",
        };
        this.filterCrimes();
    }

    farSoutheastSide() {
        this.searchParams = {};
        this.searchParams = {
            region: "farSoutheastSide",
        };
        this.filterCrimes();
    }
    makePieChart() {
        if (canvas) {
            console.log('it exisits');
        }
        console.log("making pie");
        console.log(this.crimeLabels);
        console.log(this.crimeData);
        console.log(this.colors);
        var canvas = <HTMLCanvasElement>document.getElementById('pieChart');
        var ctx = canvas.getContext('2d');
        this.myPieChart = new Chart(ctx, {
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
    }
    getAllCrimes() {
        console.log("Getting all crimes");
        this.crimeLabels = [];
        this.precrimeLabels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.dataCrimeArray = [];
        this.dataColors = [];
        this.crimeData = [];
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
            let sum = 0;
            for (var k = 0; k < this.dataCrimeArray.length; k++) {
                if (this.dataCrimeArray[k] != 0) {
                    this.crimeLabels.push(this.crimeDict[k + 1]);
                    this.crimeData.push(this.dataCrimeArray[k]);
                    this.dataColors.push(this.colors[k]);
                    sum += this.dataCrimeArray[k];
                }
            }
            console.log("making pie");
            console.log(this.crimeLabels);
            console.log(this.crimeData);
            console.log(this.colors);
            var canvas = <HTMLCanvasElement>document.getElementById('pieChart');
            var ctx = canvas.getContext('2d');
            this.myPieChart = new Chart(ctx, {
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
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                var dataset = data.datasets[tooltipItem.datasetIndex];
                                var labels = data.labels;
                                console.log(dataset)
                                console.log(labels)
                                var currentValue = labels[tooltipItem.index] + " - " + dataset.data[tooltipItem.index];
                                return currentValue + "%";
                            }
                        }
                    }
                }
            })
        })
    }
}
