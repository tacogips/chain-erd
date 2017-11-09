import * as React from 'react'

import { Article } from 'modules/models'
import { ArticleRow } from './articleRow'

export interface ArticleListProps extends React.Props<ArticleList> {
    articles?: Array<Article>
    loadArticles?: () => void
}

export class ArticleList extends React.Component<ArticleListProps, {}> {

    public componentDidMount() {
        if (this.props.loadArticles) {
            this.props.loadArticles()
        }
    }

    public render() {

        if (!this.props.articles || this.props.articles.length == 0) {
            return (<div>No data</div>)
        }

        return (
            <div>
                <h2>articles</h2>
                <ul>
                    {
                        this.props.articles.map((article: Article) =>
                            <ArticleRow article={article} />
                        )
                    }
                </ul>
            </div>
        )
    }
}


