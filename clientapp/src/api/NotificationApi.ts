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
		try{
			await this.connection?.start();
		}
		catch(ex){
			console.log(ex);
		}
		
	}

	public setRecieveNotification(onNotification:(notification: MyNotification)=> void){
		console.log("test")
		if(this.connection){
			this.connection.on("RecieveNotification",onNotification);
		}
			
	}

	public async setImportantOnNotification(notification: MyNotification, to: boolean){
		if(this.connection)
			await this.connection.invoke("SetNotificationImportant",notification.id,to);
		else
			throw SignalR.HttpError;
	}

	public async setSeenOnNotification(notification: MyNotification, to: boolean){
		if(this.connection)
			await this.connection.invoke("SetNotificationSeen",notification.id,to);
		else
			throw SignalR.HttpError;
	}


	public async unsubscribe(){
		await this.connection?.stop();
	}
}

export const NotificationService = new NotificationApi();