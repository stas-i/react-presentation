import PropTypes from 'prop-types'
import React, {Component} from 'react';
import {connect} from 'react-redux'
import CommentsList from './CommentsList';
import ArticleContent from './ArticleContent';
import {updateArticleRating, createArticleSelector} from "../../../ducks/articles";

class ArticleDetails extends Component {
    static propTypes = {
        articleId: PropTypes.string,
        article: PropTypes.object,
        updateArticleRating: PropTypes.func.isRequired
    };

    render() {
        const {article, articleId} = this.props;
        if (!article || !articleId) {
            return null;
        }

        return (
            <div>
                <ArticleContent article={article} updateRating={this.props.updateArticleRating}/>
                <CommentsList articleId={articleId}/>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const articleSelector = createArticleSelector();
    return {
        article: articleSelector(state, props)
    }
};

export default connect(mapStateToProps, {updateArticleRating})(ArticleDetails);