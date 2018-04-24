import PropTypes from 'prop-types'
import React, {Component} from 'react';
import ModalDialog from "../../../shared/ModalDialog";

class AddCommentForm extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        onCommentAdd: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            comment: '',
            userName: ''
        }
    }

    renderHeader = () => <strong>Add Comment</strong>;

    renderFooter = () => {
        return (
            <div className="btn-group">
                <button
                    onClick={this.props.onClose}
                    type="button"
                    className="btn btn-secondary"
                >
                    Close
                </button>
                <button
                    onClick={this.onSaveClickHandler}
                    type="button"
                    className="btn btn-primary"
                >
                    Save
                </button>
            </div>
        )
    };

    onSaveClickHandler = () => {
        this.props.onCommentAdd({text: this.state.comment, user: this.state.userName});
        this.props.onClose();
    };

    onCommentTextChangeHandler = (e) => {
        const value = e.target.value;
        this.setState({comment: value});
    };

    onUserNameChangeHandler = (e) => {
        const value = e.target.value;
        this.setState({userName: value});
    };

    render() {
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
                            onChange={this.onUserNameChangeHandler}
                            value={this.state.userName}
                            className="form-control"
                            id="userName"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Enter Your comment</label>
                        <textarea
                            onChange={this.onCommentTextChangeHandler}
                            value={this.state.comment}
                            className="form-control"
                            id="comment"
                            rows="6"
                        />
                    </div>
                </div>
            </ModalDialog>
        );
    }
}

export default AddCommentForm;