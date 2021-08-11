import { AfterViewInit } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { enum_CardBackgroundColor } from 'src/app/model/Enum/EMap';
import { RecordData } from 'src/app/model/OpenData';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit, AfterViewInit {
  @Input() opendata: RecordData;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

    const element = document.getElementById(this.opendata.SiteId);

    if (this.opendata.AQI <= 50) {
      //良好 AQI(0~50)
      element.style.backgroundColor = enum_CardBackgroundColor.well;
    } else if (this.opendata.AQI > 50 && this.opendata.AQI <= 100) {  
      //普通 AQI(50~100)
      element.style.backgroundColor = enum_CardBackgroundColor.general;
    } else if (this.opendata.AQI > 100 && this.opendata.AQI <= 150) { 
      //對敏感族群不健康 AQI(101~150)
      element.style.backgroundColor =enum_CardBackgroundColor.warning;
    } else if (this.opendata.AQI > 150 && this.opendata.AQI <= 200) { 
      //對所有人不健康 AQI(151~200)
      element.style.backgroundColor = enum_CardBackgroundColor.unhealthy;
    } else if (this.opendata.AQI > 200 && this.opendata.AQI <= 300) { 
      //非常不健康 AQI(201~300)
      element.style.backgroundColor = enum_CardBackgroundColor.veryUnhealthy;
    } else {  
      //危害 AQI(301~)
      element.style.backgroundColor =enum_CardBackgroundColor.harm;
    }


  }

}
