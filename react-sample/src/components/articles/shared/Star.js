import PropTypes from 'prop-types'
import React, {Component} from 'react';

export const STAR_TYPE = {
    DEFAULT: 0,
    ALERT: 1,
    EMPTY: 2,
};

class Star extends Component {

    static propTypes = {
        starType: PropTypes.number.isRequired
    };

    render() {
        const {starType} = this.props;

        switch (starType){
            case STAR_TYPE.DEFAULT:
                return <span className="fas fa-star" style={{color: 'yellow'}} />;
            case STAR_TYPE.ALERT:
                return <span className="far fa-star" style={{color: 'red'}} />;
            case STAR_TYPE.EMPTY:
                return <span className="far fa-star" />;
            default:
                return null;
        }
    }

}

export default Star;