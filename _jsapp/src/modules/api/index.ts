import { Article } from 'modules/models/Article'

// redux saga互換のapi
export module saga {
    export const articles = {
        fetchArticles: () => {
            const promiseFunc: Promise<Article[]> = new Promise((resolve, reject) => {
                resolve([mockArticle(1), mockArticle(2,"somesome"), mockArticle(3)])
            })
            return promiseFunc
        }
    }
}

export function mockArticle(n: number,description?:string): Article {
    return new Article(
			{
				id :n,
				name: ` ${n } : namename`,
				description : description
			}
		)
}
