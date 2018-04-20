import PropTypes from 'prop-types'
import React, {Component} from 'react';
import Star, {STAR_TYPE} from './Star';

class Rating extends Component {

    static defaultProps = {
        rating: 0
    };

    static propTypes = {
        rating: PropTypes.number
    };

    render() {
        let ratingStars = [];
        const {rating} = this.props;
        if (rating < 0) {
            ratingStars = [<Star key={1} starType={STAR_TYPE.ALERT}/>];
        }
        else {
            const flags = [rating > 0, rating > 10, rating >= 20];

            ratingStars = flags.map((flag, index) =>
                <Star key={index} starType={flag ? STAR_TYPE.DEFAULT : STAR_TYPE.EMPTY}/>
            )
        }

        return (
            <div className="p-2">
                <span>{ratingStars}</span>
                <span>({rating})</span>
            </div>
        );
    }

}

export default Rating;