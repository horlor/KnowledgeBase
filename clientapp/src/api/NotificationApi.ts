import * as SignalR from "@microsoft/signalr"
import { MyNotification } from "../models/Notification";

class NotificationApi{
	private connection? :signalR.HubConnection
	
	public async subscribe(token: string) {
		this.connection =
			new SignalR.HubConnectionBuilder()
			.withUrl("http://localhost:5001/api/notificationhub", {accessTokenFactory:()=> token})
			.configureLogging(SignalR.LogLevel.Debug)
			.withAutomaticReconnect()
			.build();
		await this.connection?.start();
	}

	public setOnNotification(onNotification:(notification: MyNotification)=> void){
		console.log("test")
		if(this.connection){
			this.connection.on("RecieveNotification",onNotification);
		}
			
	}

	public async ping(){
		if(this.connection)
			await this.connection.invoke("Ping");
	}


	public async unsubscribe(){
		await this.connection?.stop();
	}
}

export const NotificationService = new NotificationApi();