
import { ArticleList, ArticleListProps } from 'components/articleList'
import { State } from 'modules/rootReducer'
import { actionCreators, FetchArticleCondition } from 'modules/articles'
import { connect, Dispatch } from 'react-redux'


const mapStateToProps = (state: State, ownProps: ArticleListProps) => (<ArticleListProps>{
    articles: state.articles.latests
})

const mapDispatchToProps = (dispatch: Dispatch<State>) => (<ArticleListProps>{
    loadArticles: () => {
        return dispatch(actionCreators.requestArticles(new FetchArticleCondition()))
    }
})

const ContainerArticles = connect(mapStateToProps, mapDispatchToProps)(ArticleList)
export default ContainerArticles

