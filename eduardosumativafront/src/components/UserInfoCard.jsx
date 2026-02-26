import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import CustomCard from './ui/CustomCard';


export default function UserInfoCard() {
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    const email = localStorage.getItem('email') || '';
    const username = localStorage.getItem('username') || '';
    const image = localStorage.getItem('image') || '';

    return (
        <CustomCard
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: 3,
                p: 2,
            }}
        >
            <Avatar
                src={image}
                alt={firstName}
                sx={{
                    width: 80,
                    height: 80,
                    border: '3px solid',
                    borderColor: 'primary.main',
                    boxShadow: '0 0 20px rgba(255,255,255,0.15)',
                }}
            />

            <Box sx={{ flex: 1 }}>
                <Typography variant="h5" gutterBottom>
                    {firstName} {lastName}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip
                        icon={<PersonIcon />}
                        label={username}
                        variant="outlined"
                        size="small"
                        color="primary"
                    />
                    <Chip
                        icon={<EmailIcon />}
                        label={email}
                        variant="outlined"
                        size="small"
                        color="secondary"
                    />
                </Box>
            </Box>
        </CustomCard>
    );
}
