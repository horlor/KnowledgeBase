export class UrlBuilder {
	private url :string;
	constructor(url: string){
		this.url = `${url}?`
	}

	public appendWithQueryParam(name: string, param: string | null | undefined | number | boolean){
		if(param)
			this.url = `${this.url}${name}=${param}&`
	}

	public get(){
		return this.url;
	}
}