import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/Person';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { personalInfo, profileData, interests } from '../data/resumeData';
import SectionHeader from './SectionHeader';

// ─── Styled Components ──────────────────────────────────────────────────────

const AboutWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: theme.palette.background.default,
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.06)}, ${alpha(theme.palette.background.paper, 0.9)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  borderRadius: 16,
  backdropFilter: 'blur(10px)',
  height: '100%',
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.05)}, ${theme.palette.background.paper})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  borderRadius: 16,
  height: '100%',
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.5, 0),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
  '&:last-child': {
    borderBottom: 'none',
    paddingBottom: 0,
  },
  '&:first-of-type': {
    paddingTop: 0,
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  flexShrink: 0,
  color: theme.palette.primary.light,
}));

const HighlightText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.light,
  fontWeight: 600,
}));

// ─── Component ───────────────────────────────────────────────────────────────

const infoItems: Array<{ id: string; icon: React.ReactNode; label: string; value: string; href?: string }> = [
  { id: 'info-name', icon: <PersonOutlineIcon fontSize="small" />, label: 'Name', value: personalInfo.name },
  { id: 'info-dob', icon: <CakeOutlinedIcon fontSize="small" />, label: 'Date of Birth', value: personalInfo.dateOfBirth },
  { id: 'info-nationality', icon: <PublicOutlinedIcon fontSize="small" />, label: 'Nationality', value: personalInfo.nationality },
  { id: 'info-location', icon: <LocationOnOutlinedIcon fontSize="small" />, label: 'Location', value: personalInfo.location },
  {
    id: 'info-phone', icon: <PhoneOutlinedIcon fontSize="small" />, label: 'Phone',
    value: personalInfo.phone, href: `tel:${personalInfo.phone}`,
  },
  {
    id: 'info-email', icon: <EmailOutlinedIcon fontSize="small" />, label: 'Email',
    value: personalInfo.email, href: `mailto:${personalInfo.email}`,
  },
];

const AboutSection: React.FC = () => {
  return (
    <AboutWrapper id="about">
      <Container maxWidth="lg">
        <SectionHeader
          eyebrow="Who I Am"
          title="About Me"
          subtitle="A passionate developer dedicated to crafting clean, efficient, and scalable solutions."
        />

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* Profile summary */}
          <Grid size={{ xs: 12, md: 7 }}>
            <ProfileCard elevation={0}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: 'primary.light' }}>
                Profile Overview
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.9 }}>
                {profileData.summary}
              </Typography>
              <Box
                sx={{
                  mt: 3,
                  p: 2.5,
                  borderRadius: 3,
                  background: (t) => `linear-gradient(135deg, ${alpha(t.palette.primary.main, 0.08)}, transparent)`,
                  border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.15)}`,
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.8 }}>
                  Currently working as <HighlightText>SDE-1 at Calibraint Technologies</HighlightText>, I focus on building
                  full-stack web applications using modern frameworks and following
                  <HighlightText> spec-driven development</HighlightText> and
                  <HighlightText> AI-assisted workflows</HighlightText> to deliver high-quality software efficiently.
                </Typography>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', mb: 2 }}>
                  Areas of Interest
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {interests.map((interest) => (
                    <Chip
                      key={interest}
                      label={interest}
                      variant="outlined"
                      sx={{
                        borderColor: (t) => alpha(t.palette.primary.main, 0.25),
                        color: 'text.secondary',
                        fontWeight: 500,
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        '&:hover': {
                          borderColor: 'primary.main',
                          color: 'primary.light',
                          background: (t) => alpha(t.palette.primary.main, 0.08),
                          transform: 'translateY(-2px)',
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </ProfileCard>
          </Grid>

          {/* Personal Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <InfoCard elevation={0}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: 'primary.light' }}>
                Personal Info
              </Typography>
              {infoItems.map((item) => (
                <InfoRow key={item.id}>
                  <IconBox>{item.icon}</IconBox>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem' }}>
                      {item.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      component={item.href ? 'a' : 'p'}
                      href={item.href}
                      sx={{
                        color: item.href ? 'primary.light' : 'text.primary',
                        fontWeight: 500,
                        textDecoration: 'none',
                        display: 'block',
                        wordBreak: 'break-all',
                        mt: 0.25,
                        transition: 'color 0.2s',
                        '&:hover': item.href ? { color: 'primary.main' } : {},
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </InfoRow>
              ))}
            </InfoCard>
          </Grid>
        </Grid>
      </Container>
    </AboutWrapper>
  );
};

export default AboutSection;
