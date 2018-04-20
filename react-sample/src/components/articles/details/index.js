import PropTypes from 'prop-types'
import React, {Component} from 'react';
import CommentsList from './CommentsList';
import ArticleContent from './ArticleContent';

class ArticleDetails extends Component {
    static propTypes = {
        article: PropTypes.object,
        updateRating: PropTypes.func.isRequired
    };

    render() {
        const {article} = this.props;
        if (!article || !article.id) {
            return null;
        }

        return (
            <div>
                <ArticleContent article={article} updateRating={this.props.updateRating}/>
                <CommentsList articleId={article.id}/>
            </div>
        );
    }
}

export default ArticleDetails;