import { Public } from "@material-ui/icons";
import Axios from "axios";

class ApiSettingsClass{
	private _baseurl = "http://localhost:5001/"

	public setup(){
		Axios.defaults.headers.common["Access-Control-Allow-Origin"]="*";
		Axios.defaults.baseURL=this._baseurl;
	}

	public get baseUrl(){
		return this._baseurl;
	}

	public getUrl(s: string | string[]) {
		if(typeof s === "string")
			return this._baseurl+s;
		let result = this._baseurl;
		s.forEach((str, idx)=>{
			if(idx === 0)
				result = result+str;
			else
				result = result+"/"+str;
		});
		return result;
	}
}

export const ApiSettings = new ApiSettingsClass();