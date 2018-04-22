import PropTypes from 'prop-types'
import React, {Component} from 'react';
import Rating from "../shared/Rating";

class ArticleContent extends Component {
    static propTypes = {
        updateRating: PropTypes.func.isRequired,
        article: PropTypes.object
    };

    voteUp = () => {
        this.props.updateRating(this.props.article.id, true);
    };

    voteDown = () => {
        this.props.updateRating(this.props.article.id, false);
    };

    render() {
        const article = this.props.article;
        if (!article) {
            return null;
        }
        return (
            <div className="pt-xl-5">
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">{article.title}</h1>
                        <p className="lead">{article.text}</p>
                        <hr className="my-4"/>
                        <div className="btn-group">
                            <button onClick={this.voteUp} className="btn btn-success btn-lg">+</button>
                            <Rating rating={article.rating}/>
                            <button onClick={this.voteDown} className="btn btn-danger btn-lg">-</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ArticleContent;