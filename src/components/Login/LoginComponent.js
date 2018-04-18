import React, {Component} from 'react'
import { Row, Col} from 'reactstrap'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import { login } from '../../actions/login'

export class LoginComponent extends Component {
    
    constructor(props) {
        super(props)
    }

    login = () => {
        this.props.actions.login()
    }

    render () {        
        return (
            <div>
                
                <h5 className="text-center"> Login {this.props.status.status} </h5>
                <button onClick={this.login}>Jazda</button> 
            </div>
        )
    }
}

const mapStateToProps = state => ({
    status: state.status
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({login},dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);