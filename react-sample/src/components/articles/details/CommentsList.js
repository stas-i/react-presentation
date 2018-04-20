import PropTypes from 'prop-types'
import React, {Component} from 'react';
import Comment from "./Comment";
import AddComment from "./AddComment";
import {getComments, getArticle} from "../../../data-mocks/api";
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
        console.log('---getDerivedStateFromProps CommentsList');
        if (this.state.isLoaded === false && this.state.isLoading === false) {
            this._loadAsyncData(this.props.articleId);
        }
    }

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
                    {this.state.isLoaded && <div className="p-2"><NumberOfComments comments={this.state.comments}/></div>}
                    <div className="ml-auto"><AddComment/></div>

                </div>
                {!this.state.isLoaded && <div>Loading...</div>}
                <ul className="list-group list-group-flush">
                    {content}
                </ul>

            </div>
        );
    }

    _loadAsyncData(id) {
        console.log('---id', id);
        this.setState({isLoading: true});
        const article = getArticle(id);
        const comments = article && article.comments && article.comments.length > 0 ? getComments(article.comments) : [];
        setTimeout(() => this.setState({comments, isLoading: false, isLoaded: true}), 1500);
    }
}

export default CommentsList;