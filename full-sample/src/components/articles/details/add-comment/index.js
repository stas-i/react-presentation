import PropTypes from 'prop-types'
import React, {Component} from 'react';
import AddCommentForm from "./AddCommentForm";

class AddComment extends Component {
    static propTypes = {
        articleId: PropTypes.string.isRequired
    };

    state = {
        showModal: false,
    };

    toggleModal = () => {
        this.setState(state => ({showModal: !state.showModal}));
    };

    render() {
        if (this.state.showModal) {
            return (
                <AddCommentForm
                    articleId={this.props.articleId}
                    onClose={this.toggleModal}/>
            )
        }

        return (
            <input
                onClick={this.toggleModal}
                className="btn btn-primary"
                type="button"
                value="Add Comment"
            />
        )
    }
}

export default AddComment;