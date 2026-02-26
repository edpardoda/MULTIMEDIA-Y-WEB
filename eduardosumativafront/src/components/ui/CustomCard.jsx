import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function CustomCard({
    title,
    subtitle,
    children,
    sx = {},
    elevation = 0,
}) {
    return (
        <Card
            elevation={elevation}
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                background: '#111111',
                ...sx,
            }}
        >
            <CardContent>
                {title && (
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                )}
                {subtitle && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {subtitle}
                    </Typography>
                )}
                {children}
            </CardContent>
        </Card>
    );
}
