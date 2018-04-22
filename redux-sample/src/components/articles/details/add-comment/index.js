import PropTypes from 'prop-types'
import React, {Component} from 'react';
import AddCommentForm from "./AddCommentForm";

class AddComment extends Component {
    static propTypes = {
        articleId: PropTypes.string.isRequired,
        onCommentAdd: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        }
    }

    toggleModal = () => {
        this.setState(state => ({showModal: !state.showModal}));
    };

    render() {
        if (this.state.showModal) {
            return <AddCommentForm
                onCommentAdd={this.props.onCommentAdd}
                onClose={this.toggleModal}
            />
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