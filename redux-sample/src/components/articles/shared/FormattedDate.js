import PropTypes from 'prop-types'
import React, {Component} from 'react';

class FormattedDate extends Component {

    static propTypes = {
        date: PropTypes.string
    };

    render() {
        const {date} = this.props;

        const parsedDate = Date.parse(date);
        if(!parsedDate){
            return null;
        }

        return <div className="p-2">{new Date(parsedDate).toDateString()}</div>
    }

}

export default FormattedDate;