import PropTypes from 'prop-types'
import React, {Component} from 'react';

class NumberOfComments extends Component {
    static propTypes = {
        commentsLength: PropTypes.number.isRequired
    };

    render() {
        return (
            <span className="badge badge-pill badge-info">{this.props.commentsLength} comments</span>
        );
    }
}

export default NumberOfComments;