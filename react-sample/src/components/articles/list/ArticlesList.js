import React, {PureComponent} from 'react';
import ArticleListItem from "./ArticleListItem";
import PropTypes from "prop-types"

class ArticlesList extends PureComponent {
    render() {
        console.log('---render ArticlesList');
        const body = this.props.articles.map(article => {
            return (
                <ArticleListItem
                    key={article.id}
                    article={article}
                    onRowClick={this.props.selectArticle}
                    isSelected={article.id === this.props.selectedArticleId}
                />
            );
        });

        return (
            <div className="px-lg-5 mx-auto">
                <ul className="list-group ">
                    {body}
                </ul>
            </div>
        );
    }

    static propTypes = {
        articles: PropTypes.array.isRequired,
        selectArticle: PropTypes.func.isRequired,
        selectedArticleId: PropTypes.string
    }
}

export default ArticlesList;

