
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import LoginPage from "../pages/Login.jsx";
import NotFound from "../pages/NotFound.jsx";
import DashboardPage from "../pages/Dashboard.jsx";
import HomePage from "../pages/Home.jsx";
import RegisterPage from "../pages/Register.jsx";

import SessionGuard from "./SessionGuard.jsx";
import AuthAdmin from "./AuthAdmin.jsx";

import RegisterHotel from "../pages/Admin/components/RegisterHotel.jsx";
import Hotels from "../pages/Admin/components/Hotels.jsx"
import LayoutAdmin from "../pages/Admin/index.jsx";
function RouterPages() {
    return (
        <BrowserRouter>
            <Routes >
                <Route path="/ingreso" element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />
                <Route path="/" element={<HomePage />} />
            //? Protected Routes
               
                <Route element={<AuthAdmin></AuthAdmin>}>
                <Route           
                    path="/dashboard"
                    element={<LayoutAdmin></LayoutAdmin>}

                >
                    <Route path="registrohotel" element={<RegisterHotel />} />
                    <Route path="gestionhoteles" element={<Hotels />} />
                </Route>
            </Route>

                

                {/* <Route path="/dashboard/registrohotel" element={<AuthAdmin> <RegisterHotel /> </AuthAdmin>} />
                <Route path="/dashboard/gestionhoteles" element={<AuthAdmin> <ListHotel /> </AuthAdmin>} /> */}

                


                


                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    )
}
export default RouterPages;