import * as React from 'react'
import { Article } from 'modules/models'

export interface Props extends React.Props<ArticleRow> {
    article: Article
}

export class ArticleRow extends React.Component<Props, {}> {
    public render() {
        return (
            <li>
                {this.props.article.description}
            </li>
        )
    }
}


