import { Box, Typography, LinearProgress } from '@mui/material'

export default function BarraProgreso({ activadas, total }) {

  const progreso = (activadas / total) * 100

  return (
    <Box sx={{ my: 3 }}>
      <Typography align="center">
        Cartas activas: {activadas} de {total}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={progreso}
        sx={{ height: 10, borderRadius: 5, mt: 1 }}
      />
    </Box>
  )
}
