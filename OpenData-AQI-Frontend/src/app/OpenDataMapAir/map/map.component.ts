import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { enum_MarkerColor } from 'src/app/model/Enum/EMap';
import { SignalRService } from 'src/app/services/signalR.service';
import { OpenDataAQI } from '../../model/OpenData';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  signalrConnectionEstablished$: Observable<boolean>;
  openDataAQI$: Observable<OpenDataAQI>;
  openDataAQI: OpenDataAQI;
  chatmessages = [];

  constructor(
    private readonly signalRService: SignalRService
  ) { }

  ngOnInit(): void {
    this.signalrConnectionEstablished$ = this.signalRService.connectionEstablished$;
    this.openDataAQI = new OpenDataAQI();
    this.openDataAQI$ = this.signalRService.OpenDataAQI$;

    this.signalrConnectionEstablished$.subscribe((connected) => {
      if (connected == true) {
        this.signalRService.GetOpenData_AQI();
      }
    });

    this.openDataAQI$.subscribe((getopenData) => {
      this.openDataAQI = getopenData;
      console.log(this.openDataAQI);
      this.markerMap();
    });

  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private map() {

  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [23.7, 121],
      zoom: 8
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  //減少DOM操作(只更新修改過的地方)，提高效能
  trackByIndex(index, item) {
    return index;
  }

  private markerMap() {

    let markerIcon = L.icon({
      iconUrl: './assets/marker-icon-2x.png',
      // shadowUrl: 'leaf-shadow.png',
      iconSize: [15, 25], // size of the icon
      // shadowSize: [50, 64], // size of the shadow
      // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      // popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    if (this.openDataAQI.records != null) {

      this.openDataAQI.records.forEach(element => {
        // let marker = new L.marker([element.latitude, element.longitude], { icon: markerIcon }).addTo(this.map);
        let airColor = enum_MarkerColor.well;
        let airFillColor = enum_MarkerColor.well_fillColor;

        //AQI指標，資料來源:https://airtw.epa.gov.tw/CHT/Information/Standard/AirQualityIndicator.aspx
        if (element.AQI <= 50) {
          //良好 AQI(0~50)
          airColor = enum_MarkerColor.well;;
          airFillColor = enum_MarkerColor.well_fillColor;
        } else if (element.AQI > 50 && element.AQI <= 100) {
          //普通 AQI(50~100)
          airColor = enum_MarkerColor.general;
          airFillColor = enum_MarkerColor.general_fillColor;
        } else if (element.AQI > 100 && element.AQI <= 150) {
          //對敏感族群不健康 AQI(101~150)
          airColor = enum_MarkerColor.warning;
          airFillColor = enum_MarkerColor.warning_fillColor;
        } else if (element.AQI > 150 && element.AQI <= 200) {
          //對所有人不健康 AQI(151~200)
          airColor = enum_MarkerColor.unhealthy;
          airFillColor = enum_MarkerColor.unhealthy_fillColor;
        } else if (element.AQI > 200 && element.AQI <= 300) {
          //非常不健康 AQI(201~300)
          airColor = enum_MarkerColor.veryUnhealthy;
          airFillColor = enum_MarkerColor.veryUnhealthy_fillColor;
        } else {
          //危害 AQI(301~)
          airColor = enum_MarkerColor.harm;
          airFillColor = enum_MarkerColor.harm_fillColor;
        }

        let marker = new L.circle([element.Latitude, element.Longitude], {
          color: airColor,
          fillColor: airFillColor,
          fillOpacity: 0.3,
          radius: 665
        }).addTo(this.map);

      });
    }

  }



}
