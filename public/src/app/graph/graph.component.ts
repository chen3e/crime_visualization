import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  LineChart = [];
  graph1 = [];
  searchParams = {
    keyword: null,
    categoryid: null,
    region: null,
    date: null
  };
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
  precrimeLabels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  dataCrimeArray = [];
  crimeData = [];
  crimes: any;
  showSearch: Boolean;
  searchMessage = "Filter Results";
  constructor(private _httpService: HttpService) { }
  ngOnInit() {
    //this.initChart();
    //this.initChart2();
    //this.initPieChart();
    this.showSearch = false;
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
  initPieChart() {
    if (canvas) {
      console.log('it exisits');
    }
    console.log("making pie");
    console.log(this.crimeLabels);
    console.log(this.crimeData);
    var canvas = <HTMLCanvasElement>document.getElementById('pieChart');
    var ctx = canvas.getContext('2d');
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          data: this.crimeData,
          backgroundColor: ['red', 'yellow', 'blue', 'green'],
          borderWidth: 0
          
        }],
        labels: this.crimeLabels
      },
      options: {
      }
    })
  }
  filterCrimes() {
    this.crimeLabels = [];
    this.precrimeLabels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.dataCrimeArray = [];
    this.crimeData = [];
    console.log("In filter");
    let observable = this._httpService.filterCrimes(this.searchParams);
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
        }
      }
      console.log(this.dataCrimeArray);
      console.log(this.crimeLabels);
      console.log("Here are some graph crimes");
      console.log(this.crimes);
      this.initPieChart();
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
