import PropTypes from 'prop-types'
import React, {Component} from 'react';

class NumberOfComments extends Component {

    static defaultProps = {
        comments: []
    };

    static propTypes = {
        comments: PropTypes.array
    };

    render() {
        const commentsLength = this.props.comments.length;
        return (
            <span className="badge badge-pill badge-info">{commentsLength} comments</span>
        );
    }

}

export default NumberOfComments;