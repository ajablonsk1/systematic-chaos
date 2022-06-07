import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../utils/constants';
import { Role } from '../../utils/userRole';

const REDIRECT_ROUTES = {
    [Role.LOGGED_IN]: PageRoutes.HOME,
    [Role.NOT_LOGGED_IN]: PageRoutes.GAME_CARD,
};

function PageGuard(props) {
    const navigate = useNavigate();
    const isLoggedIn = props.isLoggedIn;
    const role = props.role;
    const child = props.children;

    useEffect(() => {
        let navigateRequired = false;

        switch (role) {
            case Role.LOGGED_IN:
                navigateRequired = !isLoggedIn;
                break;
            case Role.NOT_LOGGED_IN:
                navigateRequired = isLoggedIn;
                break;
            default:
                break;
        }

        if (navigateRequired) {
            navigate(REDIRECT_ROUTES[role]);
            window.location.reload(true); // without it, sidebar not reload after redirect
        }
    }, [navigate, role, isLoggedIn]);

    return <>{child}</>;
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    return {
        isLoggedIn,
    };
}
export default connect(mapStateToProps)(PageGuard);
