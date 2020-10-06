import * as SignalR from "@microsoft/signalr"
import { MyNotification } from "../models/Notification";
import AuthService from "./AuthService";

class NotificationApi{
	private connection? :signalR.HubConnection
	
	public async subscribe() {
		this.connection =
			new SignalR.HubConnectionBuilder()
			.withUrl("http://localhost:5001/api/notificationhub", {accessTokenFactory:()=>{
				return AuthService.AccessToken;
			} })
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

	public async reconnect(){
		if(this.connection?.state === SignalR.HubConnectionState.Disconnected){
			await this.connection?.start()
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