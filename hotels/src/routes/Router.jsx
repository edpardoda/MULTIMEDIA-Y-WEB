
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/Login.jsx";
import NotFound from "../pages/NotFound.jsx";
import DashboardPage from "../pages/Dashboard.jsx";
import HomePage from "../pages/Home.jsx";
import RegisterPage from "../pages/Register.jsx";

import SessionGuard from "./SessionGuard.jsx";
import AuthAdmin from "./AuthAdmin.jsx";

import RegisterHotel from "../pages/Admin/components/RegisterHotel.jsx";
import ListHotel from "../pages/Admin/components/ListHotel.jsx";
function RouterPages() {
    return (
        <BrowserRouter>
            <Routes >
                <Route path="/ingreso" element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />
                <Route path="/" element={<HomePage />} />
            //? Protected Routes
               
                <Route
                    path="/dashboard"
                    element={
                     <AuthAdmin></AuthAdmin>
                    }
                >
                    //?  = /dashboard/registrohotel
                    <Route path="registrohotel" element={<RegisterHotel/>}/>
                    
                    //? = /dashboard/gestionhoteles
                    <Route path="gestionhoteles" element={<ListHotel/>}/>

                </Route>

                {/* <Route path="/dashboard/registrohotel" element={<AuthAdmin> <RegisterHotel /> </AuthAdmin>} />
                <Route path="/dashboard/gestionhoteles" element={<AuthAdmin> <ListHotel /> </AuthAdmin>} /> */}

                


                


                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    )
}
export default RouterPages;