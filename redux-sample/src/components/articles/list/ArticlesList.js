import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from "prop-types"
import ArticleListItem from "./ArticleListItem";
import {getArticles} from "../../../redux/actions/articlesActions";
import {getFilteredItems} from "../../../selectors/articles-selectors";

class ArticlesList extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        selectArticle: PropTypes.func.isRequired,
        selectedArticleId: PropTypes.string
    };

    componentDidMount() {
        this.props.getArticles();
    }

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
}

const mapStateToProps = state => ({
    articles: getFilteredItems(state.filter, state.articles)
});

export default connect(mapStateToProps, {getArticles})(ArticlesList);


