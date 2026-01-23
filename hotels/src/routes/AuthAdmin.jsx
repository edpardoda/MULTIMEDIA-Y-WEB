import { Navigate, Outlet } from 'react-router-dom';
import { getDataUser } from '../storages/user.model';

function AuthAdmin({ }) {

    const dataUser =  getDataUser();
    
    return dataUser?.role == "admin" ? <Outlet/> : <Navigate to="/ingreso" replace />;
}

export default AuthAdmin;