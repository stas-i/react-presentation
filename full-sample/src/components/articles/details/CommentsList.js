import PropTypes from 'prop-types'
import React, {Component} from 'react';
import {connect} from 'react-redux'
import Comment from "./Comment";
import AddComment from "./add-comment";
import NumberOfComments from "../shared/NumberOfComments";
import {getArticleComments, commentsSelector} from "../../../ducks/comments";

class CommentsList extends Component {
    static propTypes = {
        articleId: PropTypes.string.isRequired,
        articleComments: PropTypes.object.isRequired,
        getArticleComments: PropTypes.func.isRequired
    };

    state = {};

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('---getDerivedStateFromProps CommentsList');
        if (nextProps.articleId !== prevState.previousArticleId) {
            return {previousArticleId: nextProps.articleId};
        }

        return null;
    }

    componentDidMount() {
        console.log('---componentDidMount CommentsList');
        this._loadAsyncData(this.props.articleId);
    }

    componentDidUpdate() {
        console.log('---componentDidUpdate CommentsList');
        const {articleId, articleComments} = this.props;

        if (!articleComments.isLoaded && !articleComments.isLoading) {
            this._loadAsyncData(articleId);
        }
    }

    render() {
        let content = null;
        const {isLoaded, isLoading, comments} = this.props.articleComments;

        if (isLoaded) {
            content = comments.map(comment => <Comment key={comment.id} comment={comment}/>);
        }

        return (
            <div>
                <div className="d-flex justify-content-between p-2">
                    <div className="p-2">
                        <h3>Comments</h3>
                    </div>
                    {isLoaded &&
                    <div className="p-2">
                        <NumberOfComments commentsLength={comments ? comments.length : 0}/>
                    </div>}
                    <div className="ml-auto">
                        <AddComment articleId={this.props.articleId}/>
                    </div>
                </div>
                {isLoading && <div>Loading...</div>}
                <ul className="list-group list-group-flush">
                    {content}
                </ul>
            </div>
        );
    }

    _loadAsyncData(id) {
        this.props.getArticleComments(id);
    }
}

const mapStateToProps = (state, props) => ({
    articleComments: commentsSelector(state, props)
});

export default connect(mapStateToProps, {getArticleComments})(CommentsList);