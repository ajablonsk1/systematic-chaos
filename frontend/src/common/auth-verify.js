import React, { useEffect } from 'react';
import authService from '../services/auth.service';

const parseJwt = token => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        console.log(e);
        return null;
    }
};

export default function AuthVerify(props) {
    let pathname = window.location.pathname;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const decodedJwt = parseJwt(user.access_token);
            if (decodedJwt.exp * 1000 < Date.now()) {
                authService.refreshToken(user.refresh_token);
            }
        }
    }, [pathname]);

    return <div />;
}
