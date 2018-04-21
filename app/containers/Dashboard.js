import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import { filterableTable } from '../styles/filterableTable.scss';
import { bindActionCreators } from 'redux';
import { Login as LoginComponent} from '../components/Login'

export class Dashboard extends Component {

    constructor(props) {
        super(props)
    }

    log = () => {
        this.props.actions.login({username: "xd", password: "gmd"})
    }

    render() {
        return (
            <div className={filterableTable}>
                <LoginComponent/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({login},dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
