import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
    lineChart: any;
    PieChart: any;
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
      'rgb(0,255,0)', 'rgb(255,204,153)', 'rgb(255,255,153)', 'rgb(255,0,0)', 'rgb(153,255,153)', 'rgb(255,153,255)', 'rgb(153,255,255)', 'rgb(153,204,255)', 'rgb(153,153,255)', 'rgb(204,153,255)', 'rgb(153,255,204)', 'rgb(255,153,204)', 'rgb(204,255,153)', 'rgb(255,128,0)', 'rgb(0,0,255)', 'rgb(255,153,153)', 'rgb(0,255,128)', 'rgb(0,255,255)', 'rgb(0,128,255)', 'rgb(255,255,0)', 'rgb(127,0,255)'
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
    lineSelection: any;
    dateArray = [];
    dateDict: any;
    dateDictToArray = [];
    line = false;
    label = "# of crimes per day";
    week = false;

    constructor(private _httpService: HttpService) { }

    ngOnInit() {
        this.initLineChart();
        this.initPieChart();
        this.showSearch = false;
        this.dateDict = {};
    }
    makeLineChart() {
        //console.log('trying to make lines');
        //console.log(this.crimeData);
        var canvas = <HTMLCanvasElement>document.getElementById('lineChart');
        var ctx = canvas.getContext('2d');
        this.lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{ 
                    data: this.dateArray,
                    label: this.label,
                    backgroundColor: 'lightgray',
                    borderWidth: 4,
                    borderColor: 'blue',

                }],
                labels: this.dateDictToArray
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                tooltips:{
                  mode: 'nearest',
                  intersect:false,
                },
                hover:{
                  mode: 'nearest',
                  intersect:true
                }
            }
        });
    }
    makePieChart() {
        if (canvas) {
            //console.log('it exisits');
        }
        //console.log("making pie");
        //console.log(this.crimeLabels);
        //console.log(this.crimeData);
        //console.log(this.colors);
        var canvas = <HTMLCanvasElement>document.getElementById('pieChart');
        var ctx = canvas.getContext('2d');
        this.myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data: this.crimeData,
                    backgroundColor: this.dataColors,
                    borderWidth: 0.5

                }],
                labels: this.crimeLabels
            },
            options: {
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var labels = data.labels;
                            //console.log(dataset)
                            //console.log(labels)
                            var currentValue = labels[tooltipItem.index] + " - " + dataset.data[tooltipItem.index];
                            return currentValue + "%";
                        }
                    }
                }
            }
        })
    }
    filterCrimesForPie() {
        //console.log("In filter");
        this.crimeLabels = [];
        this.precrimeLabels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.dataCrimeArray = [];
        this.dataColors = [];
        this.crimeData = [];
        let observable = this._httpService.filterCrimes(this.searchParams);
        observable.subscribe(data => {
            //console.log(data);
            //console.log("Crimes:")
            this.crimes = data["data"];
            //console.log("Here are some graph crimes");
            //console.log(this.crimes);

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
                //console.log(this.crimeData[l]);
                this.crimeData[l] = this.crimeData[l] / sum * 100;
                this.crimeData[l] = this.crimeData[l].toFixed(2);
            }
            //console.log(this.dataCrimeArray);
            //console.log(this.crimeLabels);
            //console.log("Here are some graph crimes");
            //console.log(this.crimes);
            data = [{ data: this.crimeData }];
            this.removePie(this.myPieChart);
            this.addPie(this.myPieChart, this.crimeLabels, this.crimeData);
        })
    }
    filterCrimesForLine() {
        //console.log("In filter for line");
        this.crimeLabels = [];
        this.dateDictToArray = [];
        this.precrimeLabels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.dataCrimeArray = [];
        this.dataColors = [];
        this.crimeData = [];
        if (this.week !== true) {
            this.dateDict = {};
            this.dateArray = [];
        }
        let observable = this._httpService.getCrimesCount(this.searchParams);
        observable.subscribe(data => {
            //console.log("*******************************Getting Crimes*********************************")
            //console.log(data);
            //console.log("Crimes:")
            this.crimes = data["data"];
            //console.log("Here are some graph crimes");
            //console.log(this.crimes);
            var count = 0;
            for (var i = 0; i < this.crimes.length; i++) {
                if (!this.dateDict[this.crimes[i]['date']]) {
                    this.dateDict[this.crimes[i]['date']] = count;
                    this.dateArray.push(1);
                    count++;
                }
                else {
                    this.dateArray[this.dateDict[this.crimes[i]['date']]]++;
                }
                //console.log("Here is dateDict", this.dateDict);
                //console.log("Here is dateArray", this.dateArray);
                //console.log(this.crimes[i]);
                //console.log('this is the category id', this.crimes[i]['categoryid']);
                //console.log('this is the dict data of that id', this.crimeDict[this.crimes[i]['categoryid']]);
                //console.log(this.crimeLabels[this.crimes[i]['categoryid']]);
                this.precrimeLabels[this.crimes[i]['categoryid']]++;
                //console.log(this.crimeLabels);
            }
            for (var key in this.dateDict) {
                this.dateDictToArray.push(key);
            }
            for (var j = 0; j < this.dateArray.length - 1; j++) {
                this.dateArray[j] = this.dateArray[j + 1];
            }
            this.dateArray.pop();
            //console.log('we should have altered datearray', this.dateArray);
            //console.log(this.dataCrimeArray);
            //console.log(this.crimeLabels);
            //console.log("Here are some graph crimes");
            //console.log(this.crimes);
            data = [{ data: this.crimeData }];
            //console.log("Here are dates", this.dateDictToArray);
            //console.log("Here are faoiwefjpaie", this.dateArray);
            this.removePie(this.lineChart);
            this.addPie(this.lineChart, this.dateDictToArray, this.dateArray);
        })
    }

    addPie(chart, label, data) {
        chart.data.labels = label;
        chart.data.datasets[0].data = data;
        chart.data.datasets[0].label = this.label;
        chart.update();
        //console.log(chart.data);
    }

    removePie(chart) {
        chart.data.labels = [];
        chart.data.datasets.forEach((dataset) => {
            dataset.data = {};
        });
        chart.update();
    }

    pastWeek() {
        this.week = true;
        this.searchParams = {};
        this.searchParams = {
            start_date: "2015-11-15",
            end_date: "2015-11-22"
        };

        this.dateArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.dateDict = {
            "2015-11-15": 1,
            "2015-11-16": 2, 
            "2015-11-17": 3,
            "2015-11-18": 4,
            "2015-11-19": 5,
            "2015-11-20": 6, 
            "2015-11-21": 7, 
            "2015-11-22": 8,
        }
        //I was going to add a feature to show which crime to display vs time - j
        this.searchParams.categoryid = this.lineSelection;
        if (this.lineSelection) {
            this.label = this.crimeDict[this.lineSelection];
        }
        this.filterCrimesForLine();
    }

    pastMonth() {
        this.week = false;
        this.searchParams = {};
        this.searchParams = {
            start_date: "2015-10-22",
            end_date: "2015-11-22"
        };
        this.searchParams.categoryid = this.lineSelection;
        this.filterCrimesForLine();
    }

    pastYear() {
        this.week = false;
        this.searchParams = {};
        this.searchParams = {
            start_date: "2014-10-22",
            end_date: "2015-11-22"
        };
        this.searchParams.categoryid=this.lineSelection;
        this.filterCrimesForLine();
    }

    farNorthSide() {
        this.searchParams = {};
        this.searchParams = {
            region: "farNorthSide",
        };
        this.filterCrimesForPie();
    }

    northwestSide() {
        this.searchParams = {};
        this.searchParams = {
            region: "northwestSide",
        };
        this.filterCrimesForPie();
    }

    northSide() {
        this.searchParams = {};
        this.searchParams = {
            region: "northSide",
        };
        this.filterCrimesForPie();
    }

    westSide() {
        this.searchParams = {};
        this.searchParams = {
            region: "westSide",
        };
        this.filterCrimesForPie();
    }

    central() {
        this.searchParams = {};
        this.searchParams = {
            region: "central",
        };
        this.filterCrimesForPie();
    }

    southSide() {
        this.searchParams = {};
        this.searchParams = {
            region: "southSide",
        };
        this.filterCrimesForPie();
    }

    southwestSide() {
        this.searchParams = {};
        this.searchParams = {
            region: "southwestSide",
        };
        this.filterCrimesForPie();
    }

    farSouthwestSide() {
        this.searchParams = {};
        this.searchParams = {
            region: "farSouthwestSide",
        };
        this.filterCrimesForPie();
    }

    farSoutheastSide() {
        this.searchParams = {};
        this.searchParams = {
            region: "farSoutheastSide",
        };
        this.filterCrimesForPie();
    }


    initPieChart() {
        //console.log("Initializing pie chart with all data");
        this.getAllCrimes();
    }
    initLineChart() {
        //console.log("Initializing line chart with all data");
        this.getCrimesForLine();
    }
    getAllCrimes() {
        //console.log("Getting all crimes");
        this.crimeLabels = [];
        this.precrimeLabels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.dataCrimeArray = [];
        this.dataColors = [];
        this.crimeData = [];
        let observable = this._httpService.filterCrimes({});
        observable.subscribe(data => {
            //console.log("Here were the entered search params");
            //console.log(this.searchParams);
            this.crimes = data["data"];
            this.formatData();
        })
    }
    getCrimesForLine() {
        //console.log("In GetCrimesForLine");
        this.searchParams = {};
        this.searchParams = {
            start_date: "2015-11-15",
            end_date: "2015-11-22"
        };
        let observable = this._httpService.getCrimesCount(this.searchParams);
        observable.subscribe(data => {
            //console.log("Here were the entered search params");
            //console.log(this.searchParams);
            this.crimes = data["data"];
            //console.log(this.crimes)
            this.formatDataForLine();
        })
    }

    formatData() {
        this.dataCrimeArray = [];
        this.crimeLabels = [];
        this.crimeData = [];
        this.dataColors = [];

        for (var i = 0; i < this.crimes.length; i++) {
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
            this.crimeData[l] = this.crimeData[l] / sum * 100;
            this.crimeData[l] = this.crimeData[l].toFixed(2).toString();
        }
        //console.log(this.dataCrimeArray);
        //console.log(this.crimeLabels);
        //console.log("Here are some graph crimes");
        //console.log(this.crimes);
        this.makePieChart();
    }
    formatDataForLine() {
        //console.log("In filter for line");
        this.crimeLabels = [];
        this.dateDictToArray = [];
        this.precrimeLabels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.dataCrimeArray = [];
        this.dataColors = [];
        this.crimeData = [];
        this.dateDict = {};
        this.dateArray = [];
        //console.log('here are the search params in format dataline', this.searchParams);
        let observable = this._httpService.getCrimesCount(this.searchParams);
        observable.subscribe(data => {
            //console.log(data);
            //console.log("Crimes:")
            this.crimes = data["data"];
            //console.log("Here are some graph crimes");
            //console.log(this.crimes);
            var count = 0;
            for (var i = 0; i < this.crimes.length; i++) {
                if (!this.dateDict[this.crimes[i]['date']]) {
                    this.dateDict[this.crimes[i]['date']] = count;
                    this.dateArray.push(1);
                    count++;
                }
                else {
                    this.dateArray[this.dateDict[this.crimes[i]['date']]]++;
                }
                //console.log(this.crimes[i]);
                //console.log('this is the category id', this.crimes[i]['categoryid']);
                //console.log('this is the dict data of that id', this.crimeDict[this.crimes[i]['categoryid']]);
                //console.log(this.crimeLabels[this.crimes[i]['categoryid']]);
                this.precrimeLabels[this.crimes[i]['categoryid']]++;
                //console.log(this.crimeLabels);
            }
            //console.log("Here is dateDict", this.dateDict);
            //console.log("Here is dateArray", this.dateArray);
            for (var key in this.dateDict) {
                this.dateDictToArray.push(key);
            }
            for (var j = 0; j < this.dateArray.length - 1; j++) {
                this.dateArray[j] = this.dateArray[j + 1];
            }
            this.dateArray.pop();
            //console.log('we should have altered datearray', this.dateArray);

            data = [{ data: this.crimeData }];
            this.makeLineChart();
        })
    }
}
