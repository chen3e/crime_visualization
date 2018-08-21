import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { } from '@types/googlemaps';

declare var google: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    crimes = [];
    map: any;
    heatmap:any;

    constructor(private _httpService: HttpService) { }

  ngOnInit() {
    Cache = null;
      this.initMap();
    }
    initMap(){
      
      var chicago = { lat: 41.8974, lng: -87.6352 };
      var heatmapData = [
        { location: new google.maps.LatLng(41.897, -87.635), weight: 1000 },
        { location: new google.maps.LatLng(41.897, -87.637), weight: 1000 },
        { location: new google.maps.LatLng(41.897, -87.639), weight: 1000 },
        { location: new google.maps.LatLng(41.897, -87.641), weight: 1000 },
        { location: new google.maps.LatLng(41.890, -87.637), weight: 1000 },
        { location: new google.maps.LatLng(41.890, -87.638), weight: 1000 },
        { location: new google.maps.LatLng(41.890, -87.630), weight: 1000 },
        { location: new google.maps.LatLng(41.890, -87.632), weight: 1000 },
        { location: new google.maps.LatLng(41.890, -87.633), weight: 1000 },
      ];
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: chicago,
        zoom: 16
      });
      var marker = new google.maps.Marker({ position: chicago, map: this.map });
      this.heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: this.map
      });
  }
    toggleHeatmap() {
        this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
    }
    changeGradient() {
        var gradient = [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]
        this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient);
    }
    changeRadius() {
        this.heatmap.set('radius', this.heatmap.get('radius') ? null : 20);
    }
    changeOpacity() {
        this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.2);
    }
    getCrimes() {
        let observable = this._httpService.getCrimes();
        observable.subscribe(data => {
            console.log(data);
            console.log("Crimes:")
            this.crimes = JSON.parse(data["data"])['items'];
            console.log(this.crimes);
        })
    }
}
