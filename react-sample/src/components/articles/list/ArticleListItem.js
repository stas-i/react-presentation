import PropTypes from 'prop-types'
import React, {Component} from 'react';
import NumberOfComments from "../shared/NumberOfComments";
import Rating from "../shared/Rating";
import FormattedDate from "../shared/FormattedDate";

class ArticleListItem extends Component {
    static propTypes = {
        article: PropTypes.object.isRequired,
        onRowClick: PropTypes.func.isRequired,
        isSelected: PropTypes.bool.isRequired
    };

    onClickHandler = () => {
        this.props.onRowClick(this.props.article.id);
    };

    render() {
        const {article, isSelected} = this.props;
        let className = 'list-group-item list-group-item-action';
        if (isSelected) {
            className += ' list-group-item-success';
        }
        return (
            <li className={className} onClick={this.onClickHandler}>
                <div className="d-flex align-content-end">
                    <h3 className="mr-auto p-2">{article.title}</h3>
                    <Rating rating={article.rating}/>
                    <FormattedDate date={article.date}/>
                    <div className="p-2">
                        <NumberOfComments numberOfComments={article.commentsIds ? article.commentsIds.length : 0}/>
                    </div>
                </div>
            </li>
        );
    }
}

export default ArticleListItem;