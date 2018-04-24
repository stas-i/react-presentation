import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {changeFilterText, toggleShowOnlyPopular} from "../../../redux/actions/filterActions";

class Filter extends Component {
    static propTypes = {
        filterText: PropTypes.string.isRequired,
        showOnlyPopular: PropTypes.bool.isRequired,
        changeFilterText: PropTypes.func.isRequired,
        toggleShowOnlyPopular: PropTypes.func.isRequired
    };

    handleChange = (e) => {
        const value = e.target.value;
        this.props.changeFilterText(value);
    };

    render() {
        return (
            <div className="card card-body my-lg-3 mx-lg-5 mx-auto">
                <h5 className="card-title">Search Article</h5>
                <div className="form-group">
                    <input
                        placeholder="Search by name:"
                        className="form-control"
                        type="text"
                        value={this.props.filterText}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group form-check">
                    <input
                        className="form-check-input"
                        id="showOnlyPopular"
                        type="checkbox"
                        value={this.props.showOnlyPopular}
                        onChange={this.props.toggleShowOnlyPopular}
                    />
                    <label htmlFor="showOnlyPopular">Show Only Popular</label>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    showOnlyPopular: state.filter.showOnlyPopular,
    filterText: state.filter.filterText
});

export default connect(mapStateToProps, {changeFilterText, toggleShowOnlyPopular})(Filter);