import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {

    handleChange = (e) => {
        const value = e.target.value;
        this.props.onFilterTextChange(value);
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

    static propTypes = {
        filterText: PropTypes.string.isRequired,
        showOnlyPopular: PropTypes.bool.isRequired,
        onFilterTextChange: PropTypes.func.isRequired,
        toggleShowOnlyPopular: PropTypes.func.isRequired
    }
}

export default Filter;