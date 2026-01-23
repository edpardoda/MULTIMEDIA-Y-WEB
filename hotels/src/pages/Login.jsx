import { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material';
import ButtonMui from '../components/ButtonMui.jsx';
import InputMui from '../components/InputMui.jsx';

import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoginService } from '../utils/login.js';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import ModalMui from '../components/ModalMui.jsx';

import { setDataUser, rmDataUser } from '../storages/user.model.jsx';


function LoginPage() {


    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const [stateModal, setStateModal] = useState(
        {
            open: false,
            title: "Titulo Modal",
            message: "Este es el mensaje del modal",
            status: "info",

        }
    );

    const handleCloseModal = () => {
        setStateModal({ ...stateModal, open: false });
    }

    const handleSendForm = () => {
        const resLogin = LoginService(user, password);
        if (resLogin == null) {
            setStateModal(
                {
                    open: true,
                    title: "Error de autenticacion",
                    message: "Las credenciales ingresadas son incorrectas.",
                    status: "error"
                }
            )
            return;
        } 
        setDataUser(resLogin);

        navigateUser(resLogin?.role)
      
        
    }

    const navigateUser = (role)=>{

        switch (role) {
            case 'admin':
                navigate('/dashboard/gestionhoteles');
                break;
            default:
                break;
        }

    }

    const handleRegister = () => {
        navigate('/registro');
    }
    useEffect(
        () => {
            rmDataUser();
        },
        []
    );

    return (
        <>
            <ModalMui
                open={stateModal.open}
                title={stateModal.title}
                message={stateModal.message}
                status={stateModal.status}
                handleClose={handleCloseModal} />

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">

                    <Grid item xs={12}>
                        <h2>Iniciar Sesion</h2>
                    </Grid>

                    <Grid item size={{ lg: 4, md: 4, sm: 6, xs: 10 }}>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSendForm();
                        }}>
                            <Grid container
                                spacing={2}

                                alignItems="center"
                                justifyContent="center"
                            >
                                <Grid size={12}>
                                    <InputMui
                                        startIcon={<PersonIcon />}
                                        placeholder="Usuario123"
                                        label="Nombre de Usuario"
                                        value={user}
                                        onChange={(e) => { setUser(e.target.value) }}
                                        required />
                                </Grid>
                                <Grid size={12}>
                                    <InputMui
                                        endIcon={
                                            <IconButton onClick={() => { setShowPassword(!showPassword) }} size='small'>
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        }
                                        placeholder="password123"
                                        label="Contraseña"
                                        type={showPassword ? "text" : "password"}
                                        helperText="La contraseña es privada"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <ButtonMui name={`Ingresar`} backgroundColor='red' />
                                </Grid>
                                <Grid size={6}>

                                    <ButtonMui type='button' onClick={handleRegister} name={`Registrarse`} backgroundColor='blue' />
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>

            </Box>

        </>
    )
}

export default LoginPage
