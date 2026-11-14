export class Article {
	id :number;
	name :string;
	description :string;

  constructor	({id,name,description ="no description"}:{ id:number, name :string,description?:string}	){
		this.id  = id
		this.name  = name
		this.description  = description
	}
}

export type Articles = Article[]

