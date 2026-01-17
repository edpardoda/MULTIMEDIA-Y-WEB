import { Button } from '@mui/material'

export default function BotonCarta({ activa, onClick }) {
  return (
    <Button
      fullWidth
      variant="contained"
      onClick={onClick}
    >
      {activa ? 'Desactivar' : 'Activar'}
    </Button>
  )
}
