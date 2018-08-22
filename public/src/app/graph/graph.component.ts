import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  LineChart = [];

  constructor() { }
  ngOnInit() {
    this.initChart();
    this.initChart2();
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
        labels: ['jan', 'feb', 'mar', 'april', 'may', 'june', 'july'],
        datasets: [{
          label: "My First dataset",
          backgroundColor: 'pink',
          borderColor: 'blue',
          data: [2, 5, 6, 78, 4, 6]
        }]
      },
      options: {}
    });
  }
}
