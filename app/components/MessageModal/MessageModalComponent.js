import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as messageModalStyles from '../../styles/message-modal.scss';

export default class MessageModalComponent extends Component {

    render() {
        return(
            <div className={messageModalStyles.exitModal}>
                <div className={messageModalStyles.exitModalContent}>
                    <div className={messageModalStyles.text}>
                        <h4>{this.props.error ? "ERROR": "INFO"}</h4>
                        <hr/>
                        <p>{this.props.message}</p>
                    </div>
                    <div className={messageModalStyles.button}>
                        <button onClick={this.props.closeMessageHandler} className={this.props.error ? "btn btn-danger" : "btn btn-info"} >Close</button>
                    </div>
                </div>

            </div>
        )
    }

}