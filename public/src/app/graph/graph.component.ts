import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
    line: Boolean;
    pie: Boolean;
    LineChart = [];
    searchParams = {
        keyword: null,
        categoryid: null,
        region: null,
        date: null
    };
    crimes: any;
    constructor(private _httpService: HttpService) { }
    ngOnInit() {
        this.initChart();
        this.initChart2();
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
    filterCrimes() {
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
}
