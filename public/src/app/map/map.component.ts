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
    crimes: any;
    map: any;
    heatmap: any;
    chicago = { lat: 41.8974, lng: -87.6352 };

    constructor(private _httpService: HttpService) { }

    ngOnInit() {
        Cache = null;
        this.getCrimes();
    }

    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: this.chicago,
            zoom: 12
        });
        var markers = [];
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
            let content = `<div id="content">` +
                `<div id="siteNotice">` +
                "</div>" +
                `<h2 id="firstHeading" class="firstHeading">${this.crimes[i].catname}</h2>` +
                `<div id="bodyContent">` +
                `<p>location: ${this.crimes[i].description.Location.toLowerCase()}</p>` +
                `<p>details: ${this.crimes[i].description.Details.toLowerCase()}</p>`;
            markers.push({ position: new google.maps.LatLng(Number(this.crimes[i].latitude), Number(this.crimes[i].longitude)), map: this.map, title: this.crimes[i].catname, content: content });
        }
        for (let i = 0; i < markers.length; i++) {
            var infowindow = new google.maps.InfoWindow({
                content: markers[i].content
            });
            var marker = new google.maps.Marker({
                position: markers[i].position,
                map: this.map,
                title: markers[i].title
            });
            google.maps.event.addListener(marker, 'mouseover', (function (marker, infowindow) {
                return function () {
                    console.log(infowindow);
                    infowindow.open(this.map, marker);
                }
          })(marker, infowindow));
            google.maps.event.addListener(marker, 'mouseout', (function(marker, infowindow){
              return function () {
                console.log(infowindow);
                infowindow.close(this.map, marker);
              }
            })(marker,infowindow));
            // marker.addListener("hover", function() {
            //     infowindow.open(map, marker);
            // })
        }
        console.log(markers);
        this.initHeatMap();
    }

    initHeatMap() {
        var heatmapData = [];
        for (let i = 0; i < this.crimes.length; i++) {
            heatmapData.push({ location: new google.maps.LatLng(Number(this.crimes[i].latitude), Number(this.crimes[i].longitude)), weight: 1000 });
        }
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
            this.crimes = data['data'];
            console.log(this.crimes);
            this.initMap();
        })
    }
}
