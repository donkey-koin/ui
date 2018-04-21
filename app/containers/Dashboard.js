import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import { filterableTable } from '../styles/filterableTable.scss';
import { bindActionCreators } from 'redux';

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
                <button onClick={this.log} />
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
