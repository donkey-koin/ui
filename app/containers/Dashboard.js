import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import { filterableTable } from '../styles/filterableTable.scss';
import { bindActionCreators } from 'redux';

const Dashboard = () => {
    let input;

    return (
        <div className={filterableTable}>
            <input />
        </div>
    );
};

Dashboard.propTypes = {
    user: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({login},dispatch)
});

export default connect(
    mapDispatchToProps
)(Dashboard);
