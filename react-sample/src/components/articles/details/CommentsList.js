import PropTypes from 'prop-types'
import React, {Component} from 'react';
import Comment from "./Comment";
import AddComment from "./add-comment";
import {getComments, addComment} from "../../../api/callApi";
import NumberOfComments from "../shared/NumberOfComments";

class CommentsList extends Component {
    static propTypes = {
        articleId: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            isLoaded: false,
            isLoading: false,
            articleId: null
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('---getDerivedStateFromProps CommentsList');
        if (nextProps.articleId !== prevState.articleId) {
            return {comments: [], isLoaded: false, articleId: nextProps.articleId};
        }

        return null;
    }

    componentDidMount() {
        console.log('---componentDidMount CommentsList');
        this._loadAsyncData(this.props.articleId);
    }

    componentDidUpdate() {
        console.log('---componentDidUpdate CommentsList');
        if (this.state.isLoaded === false && this.state.isLoading === false) {
            this._loadAsyncData(this.props.articleId);
        }
    }

    addComment = (comment) => {
        // bug here. Comments counter in articles list is inconsistent
        addComment(this.props.articleId, comment)
            .then(resp => {
                comment.id = resp.id;
                this.setState(state => ({comments: [comment, ...state.comments]}));
            });

    };

    render() {
        let content = null;

        if (this.state.isLoaded) {
            content = this.state.comments
                .map(comment => <Comment key={comment.id} comment={comment}/>);
        }

        return (
            <div>
                <div className="d-flex justify-content-between p-2">
                    <div className="p-2">
                        <h3>Comments</h3>
                    </div>
                    {this.state.isLoaded &&
                    <div className="p-2"><NumberOfComments numberOfComments={this.state.comments.length}/></div>}
                    <div className="ml-auto">
                        <AddComment articleId={this.state.articleId} onCommentAdd={this.addComment}/>
                    </div>
                </div>
                {!this.state.isLoaded && <div>Loading...</div>}
                <ul className="list-group list-group-flush">
                    {content}
                </ul>
            </div>
        );
    }

    _loadAsyncData(id) {
        this.setState({isLoading: true});
        getComments(id)
            .then(comments => this.setState({comments, isLoading: false, isLoaded: true}));
    }
}

export default CommentsList;