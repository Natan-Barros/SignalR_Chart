import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr"; 
import { ChartModel } from '../interfaces/ChartModel';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})

export class SignalRService {
  public data: ChartModel[] = [];
  public bradcastedData: ChartModel[] = [];
  public user = Guid.create();
  
  private hubConnection: signalR.HubConnection =  new signalR.HubConnectionBuilder()
  .withUrl('https://localhost:5001/chart')
  .build();

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }


  public addTransferChartDataListener = () => {
    this.hubConnection.on(this.user.toString(), (data) => {
      this.data = data;
      console.log(data);
    });
  }

  public broadcastChartData = () => {

    const dataTemp = this.data.map(m => {
      const temp = {
        data: m.data,
        label: m.label
      }
      return temp;
    });
    
    console.log('socorro')
    console.log(JSON.stringify(dataTemp))
    this.hubConnection.invoke('broadcastchartdata', dataTemp)
    .catch(err => console.error(err));
  }

  public addBroadcastChartDataListener = () => {
    this.hubConnection.on('broadcastchartdata', (data) => {
      console.log(data)
      this.bradcastedData = data;
    })
  }
}
