import { Navigate } from 'react-router-dom';
import { getDataUser } from '../storages/user.model';

function SessionGuard({ childrenPage }) {

    const isLogin =  getDataUser() ? true : false;

    return isLogin ? childrenPage : <Navigate to="/ingreso" replace />;
}

export default SessionGuard;