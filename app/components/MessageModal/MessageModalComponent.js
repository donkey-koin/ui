import React, { Component } from 'react';
import { closeMessage } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class MessageModalComponent extends Component {

    render() {
        return(
            <div id="exitModal">
                <div id="exit-modal-content">
                    <div className="row text-center">
                        <h4>{this.props.messageState.wasError ? "ERROR": "INFO"}</h4>
                    </div>
                    &nbsp;
                    <div className="row text-center">
                        <button onClick={this.props.actions.closeMessage} className="btn">Close</button>
                    </div>
                </div>

            </div>
        )
    }

}

const mapStateToProps = state => ({
    messageState: state.messageReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ closeMessage }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageModalComponent);