import PropTypes from 'prop-types'
import React, {Component} from 'react';

class ModalDialog extends Component {
    static propTypes = {
        closeModal: PropTypes.func.isRequired,
        renderHeader: PropTypes.func.isRequired,
        renderFooter: PropTypes.func.isRequired,
        children: PropTypes.object.isRequired
    };

    render() {
        return (
            <div className="modal-mask">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.renderHeader()}</h5>
                            <button onClick={this.props.closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            {this.props.renderFooter()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalDialog;