import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from '../../utils/Api';
import { PageRoutes } from '../../utils/constants';
import { AccountType, Role } from '../../utils/userRole';

function PageGuard(props) {
    const navigate = useNavigate();
    const isLoggedIn = props.isLoggedIn;
    const isStudent = props.user
        ? parseJwt(props.user.access_token).roles.includes(AccountType.STUDENT)
        : false;
    const role = props.role;
    const child = props.children;

    useEffect(() => {
        // think about better solution
        if (!isLoggedIn && role !== Role.NOT_LOGGED_IN) {
            navigate(PageRoutes.HOME);
            window.location.reload(true); // without it, sidebar not reload after redirect
        } else {
            if (
                (role === Role.LOGGED_IN_AS_STUDENT ||
                    (role === Role.NOT_LOGGED_IN && isLoggedIn)) &&
                !isStudent
            ) {
                navigate(PageRoutes.TEACHER_HOME);
                window.location.reload(true); // without it, sidebar not reload after redirect
            } else if (
                (role === Role.LOGGED_IS_AS_TEACHER ||
                    (role === Role.NOT_LOGGED_IN && isLoggedIn)) &&
                isStudent
            ) {
                navigate(PageRoutes.GAME_CARD);
                window.location.reload(true); // without it, sidebar not reload after redirect
            }
        }
    }, [navigate, role, isLoggedIn, isStudent]);

    return <>{child}</>;
}

function mapStateToProps(state) {
    const { isLoggedIn, user } = state.auth;
    return {
        isLoggedIn,
        user,
    };
}
export default connect(mapStateToProps)(PageGuard);
