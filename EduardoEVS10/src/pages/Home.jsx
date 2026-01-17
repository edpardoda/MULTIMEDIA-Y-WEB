import { Container, Typography, Grid } from '@mui/material'
import { useState } from 'react'
import Carta from '../components/Carta'
import DialogDetalle from '../components/DialogDetalle'
import BarraProgreso from '../components/BarraProgreso'

export default function Home() {

  const nombreTutor = "Ing. Wilson Valverde"

  const cartasData = [
    {
      id: 1,
      titulo: "Bob",
      descripcion: "Carta de Bob",
      imagen: new URL('../assets/imagenes/bob.jpeg', import.meta.url).href
    },
    {
      id: 2,
      titulo: "Pepe",
      descripcion: "Carta de Pepe",
      imagen: new URL('../assets/imagenes/pepe.png', import.meta.url).href
    },
    {
      id: 3,
      titulo: "Zzzz",
      descripcion: "Carta de Zzzz",
      imagen: new URL('../assets/imagenes/zzzz.png', import.meta.url).href
    }
  ]

  const [activadas, setActivadas] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null)

  const handleSelect = (carta, estado) => {
    setActivadas(prev => estado ? prev + 1 : prev - 1)
    setCartaSeleccionada(carta)
    setDialogOpen(true)
  }

  return (
    <Container sx={{ mt: 4 }}>

      <Typography variant="h4" align="center" gutterBottom>
        Evaluación EVS10 - Eduardo Pardo
      </Typography>

      <Typography variant="h6" align="center" gutterBottom>
        {nombreTutor}
      </Typography>

      <BarraProgreso activadas={activadas} total={cartasData.length} />

      <Grid container spacing={3} justifyContent="center">
        {cartasData.map(carta => (
          <Grid item key={carta.id}>
            <Carta data={carta} onSelect={handleSelect} />
          </Grid>
        ))}
      </Grid>

      <DialogDetalle
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        carta={cartaSeleccionada}
      />

    </Container>
  )
}
