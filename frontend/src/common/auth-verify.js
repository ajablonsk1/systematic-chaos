import React, { useEffect } from 'react';
import authService from '../services/auth.service';
import { parseJwt } from '../utils/Api';

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
