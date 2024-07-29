import { jwtDecode } from 'jwt-decode';

export const GetCurrentUserC = () => {
    const token = localStorage.getItem('idToken');
    const decodedToken = jwtDecode(token);
    return decodedToken;
}

