import PropTypes from 'prop-types'
import React, {Component} from 'react';
import {connect} from 'react-redux'
import ModalDialog from "../../../shared/ModalDialog";
import {addComment} from "../../../../redux/actions/commentsActions";

class AddCommentForm extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        addComment: PropTypes.func.isRequired,
        articleId: PropTypes.string.isRequired
    };

    state = {
        comment: '',
        userName: '',
        isSaving: false
    };

    renderHeader = () => <strong>Add Comment</strong>;

    renderFooter = () => {
        const isSaving = this.state.isSaving;

        return (
            <div className="btn-group">
                <button
                    onClick={this.props.onClose}
                    type="button"
                    className="btn btn-secondary"
                    disabled={isSaving}
                >
                    Close
                </button>
                <button
                    onClick={this.onSaveClickHandler}
                    type="button"
                    className="btn btn-primary"
                    disabled={isSaving}
                >
                    {isSaving ? 'Saving...' : 'Save'}
                </button>
            </div>
        )
    };

    onSaveClickHandler = () => {
        this.props
            .addComment(this.props.articleId, {text: this.state.comment, user: this.state.userName})
            .then(() => this.props.onClose());
        this.setState({isSaving: true});
    };

    onCommentTextChange = (e) => {
        const value = e.target.value;
        this.setState({comment: value});
    };

    onUserNameChange = (e) => {
        const value = e.target.value;
        this.setState({userName: value});
    };

    render() {
        const {comment, userName, isSaving} = this.state;

        return (
            <ModalDialog
                closeModal={this.props.onClose}
                renderHeader={this.renderHeader}
                renderFooter={this.renderFooter}
            >
                <div>
                    <div className="form-group">
                        <label htmlFor="userName">Enter Your Name</label>
                        <input
                            onChange={this.onUserNameChange}
                            value={userName}
                            className="form-control"
                            id="userName"
                            disabled={isSaving}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Enter Your comment</label>
                        <textarea
                            onChange={this.onCommentTextChange}
                            value={comment}
                            className="form-control"
                            id="comment"
                            rows="6"
                            disabled={isSaving}
                        />
                    </div>
                </div>
            </ModalDialog>
        );
    }
}

export default connect(null, {addComment})(AddCommentForm);