import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material'

export default function DialogDetalle({ open, onClose, carta }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Detalle de Carta</DialogTitle>
      <DialogContent>
        <Typography variant="h6">
          {carta?.titulo}
        </Typography>
        <Typography>
          {carta?.descripcion}
        </Typography>
      </DialogContent>
    </Dialog>
  )
}
