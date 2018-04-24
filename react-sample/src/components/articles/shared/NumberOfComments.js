import PropTypes from 'prop-types'
import React, {Component} from 'react';

class NumberOfComments extends Component {
    static propTypes = {
        numberOfComments: PropTypes.number
    };

    render() {
        return <span className="badge badge-pill badge-info">{this.props.numberOfComments} comments</span>;
    }
}

export default NumberOfComments;