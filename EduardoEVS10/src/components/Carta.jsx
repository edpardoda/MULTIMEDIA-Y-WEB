import { Card, CardContent, CardActions, Typography, Box } from '@mui/material'
import { useState } from 'react'
import BotonCarta from './BotonCarta'

export default function Carta({ data, onSelect }) {
  const [activa, setActiva] = useState(false)

  const handleClick = () => {
    const nuevoEstado = !activa
    setActiva(nuevoEstado)
    onSelect(data, nuevoEstado)
  }

  return (
    <Card sx={{ maxWidth: 250, minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

      {/* Área de imagen */}
      <Box sx={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
        {activa && (
          <Box
            component="img"
            src={data.imagen}
            sx={{ height: 140, width: '100%', objectFit: 'cover' }}
          />
        )}
      </Box>

      <CardContent>
        <Typography variant="h6" align="center">
          {data.titulo}
        </Typography>
      </CardContent>

      <CardActions>
        <BotonCarta activa={activa} onClick={handleClick} />
      </CardActions>

    </Card>
  )
}
