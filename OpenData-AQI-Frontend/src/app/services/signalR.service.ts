import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@aspnet/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OpenDataAQI } from '../model/OpenData';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  OpenDataAQI$ = new Subject<OpenDataAQI>();
  Application_Start$ = new Subject<string>();
  connectionEstablished$ = new BehaviorSubject<boolean>(false);

  private hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  GetOpenData_AQI() {
    this.hubConnection.invoke('GetAQIData');
  }


  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.baseUrls.server + 'opendatahub')
      .configureLogging(LogLevel.Information)
      .build();
  }

  private startConnection() {
    if (this.hubConnection.state === HubConnectionState.Connected) {
      return;
    }

    this.hubConnection.start().then(
      () => {
        console.log('Hub connection started!');
        this.connectionEstablished$.next(true);
      },
      error => console.error(error)
    );
  }

  private registerOnServerEvents(): void {
    //AQI
    this.hubConnection.on('FeedOpenData', (data: any) => {
      this.OpenDataAQI$.next(data);
    });

  }

  public disconnect(){
    this.hubConnection.stop();
  }
}
