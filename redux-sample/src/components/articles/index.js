import React, {Component} from 'react';
import Filter from './filter/Filter';
import ArticlesList from './list/ArticlesList';
import ArticleDetails from './details';


class ArticlesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedArticleId: null,
        }
    }

    selectArticle = (articleId) => {
        this.setState({selectedArticleId: articleId});
    };

    render() {
        const {selectedArticleId} = this.state;

        return (
            <div className="d-flex flex-row w-100">
                <div className="p-2 w-50">
                    <Filter/>
                    <ArticlesList selectedArticleId={selectedArticleId} selectArticle={this.selectArticle}/>
                </div>
                <div className="p-2 w-50">
                    <ArticleDetails articleId={selectedArticleId}/>
                </div>
            </div>
        )
    }
}

export default ArticlesScreen;