import PropTypes from 'prop-types'
import React, {Component} from 'react';

class Comment extends Component {
    static propTypes = {
        comment: PropTypes.object.isRequired
    };

    render() {
        const {comment} = this.props;

        return (
            <li className="list-group-item">
                <div>

                    <p className="blockquote text-dark text-left">{comment.text}</p>
                    <footer className="blockquote-footer"><cite title={comment.user}>{comment.user}</cite></footer>
                </div>
            </li>
        );
    }
}

export default Comment;