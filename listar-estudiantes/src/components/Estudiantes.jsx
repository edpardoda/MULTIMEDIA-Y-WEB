import { useState } from "react";
import {
  AppBar,
  Toolbar,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Estudiantes() {

  const [estudiantes, setEstudiantes] = useState([
    {
      numero: 1,
      codigo: "31411",
      nombre: "Eduardo",
      correo: "edpardoda@uide.edu.ec",
      telefono: "0996877366"
    }
  ]);

  const [buscar, setBuscar] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({
    numero: "",
    codigo: "",
    nombre: "",
    correo: "",
    telefono: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const agregar = () => {
    setEstudiantes([...estudiantes, form]);
    setForm({ numero: "", codigo: "", nombre: "", correo: "", telefono: "" });
    setMostrarForm(false);
  };

  const eliminar = (i) => {
    const copia = [...estudiantes];
    copia.splice(i, 1);
    setEstudiantes(copia);
  };

  const modificar = (i) => {
    const nombre = prompt("Nuevo nombre", estudiantes[i].nombre);
    if (!nombre) return;

    const correo = prompt("Nuevo correo", estudiantes[i].correo);
    const telefono = prompt("Nuevo teléfono", estudiantes[i].telefono);

    const copia = [...estudiantes];
    copia[i] = { ...copia[i], nombre, correo, telefono };
    setEstudiantes(copia);
  };

  const filtrados = estudiantes.filter(e =>
    e.nombre.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #57a6da, #c8e3f9)"
      }}
    >
      {/* BARRA SUPERIOR */}
      <AppBar position="static" sx={{ backgroundColor: "#1d75b6" }}>
        <Toolbar>
          <TextField
            size="small"
            placeholder="Ingresar nombre de usuario"
            sx={{ backgroundColor: "white", borderRadius: 1, mr: 1 }}
            onChange={(e) => setBuscar(e.target.value)}
          />
          <Button
            variant="contained"
            color="warning"
            startIcon={<SearchIcon />}
          >
            Buscar
          </Button>

          <Button
            variant="contained"
            color="warning"
            startIcon={<AddIcon />}
            sx={{ marginLeft: "auto" }}
            onClick={() => setMostrarForm(!mostrarForm)}
          >
            Agregar
          </Button>
        </Toolbar>
      </AppBar>

      {/* TÍTULO */}
      <Typography
        variant="h4"
        align="center"
        sx={{ color: "white", mt: 4, mb: 3 }}
      >
        LISTAR ESTUDIANTES
      </Typography>

      <Container>
        {/* FORMULARIO */}
        {mostrarForm && (
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField label="Nro" name="numero" onChange={handleChange} />
              <TextField label="Código" name="codigo" onChange={handleChange} />
              <TextField label="Nombre" name="nombre" onChange={handleChange} />
              <TextField label="Correo" name="correo" onChange={handleChange} />
              <TextField label="Teléfono" name="telefono" onChange={handleChange} />
              <Button variant="contained" color="warning" onClick={agregar}>
                Registrar
              </Button>
            </Box>
          </Paper>
        )}

        {/* TABLA */}
        <Paper>
          <Table>
            <TableHead sx={{ backgroundColor: "#1d75b6" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Nro</TableCell>
                <TableCell sx={{ color: "white" }}>Código</TableCell>
                <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                <TableCell sx={{ color: "white" }}>Correo</TableCell>
                <TableCell sx={{ color: "white" }}>Teléfono</TableCell>
                <TableCell sx={{ color: "white" }}>Acción</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtrados.map((e, i) => (
                <TableRow key={i}>
                  <TableCell>{e.numero}</TableCell>
                  <TableCell>{e.codigo}</TableCell>
                  <TableCell>{e.nombre}</TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined">
                      {e.correo}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined">
                      {e.telefono}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton color="warning" onClick={() => modificar(i)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="warning" onClick={() => eliminar(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Box>
  );
}
