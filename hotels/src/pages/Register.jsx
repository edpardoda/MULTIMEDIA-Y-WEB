import { useState } from 'react'

import { Box, Grid } from '@mui/material';
import TextMui from '../components/TextMui.jsx';



import ButtonMui from '../components/ButtonMui.jsx';
import InputMui from '../components/InputMui.jsx';

import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { LoginService } from '../utils/login.js';
import IconButton from '@mui/material/IconButton';

import { useNavigate } from 'react-router-dom';

function RegisterPage() {

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [name, setname] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [address, setaddress] = useState("");

    const handleSendForm = () => {

    }

    const handleRegister = () => {
        navigate('/registro');
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">

                    <Grid item xs={12}>
                        <TextMui variant="h4" value='Registro' />
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
                                <Grid size={6}>
                                    <InputMui
                                        startIcon={<PersonIcon />}
                                        placeholder="example@gmail.com"
                                        label="Ingresa tu correo electronico"
                                        value={email}
                                        onChange={(e) => { setemail(e.target.value) }}
                                        required />
                                </Grid>

                                <Grid size={6}>
                                    <InputMui
                                        startIcon={<PersonIcon />}
                                        placeholder="Pepe"
                                        label="Ingresa tu nombre"
                                        value={name}
                                        onChange={(e) => { setname(e.target.value) }}
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

export default RegisterPage
