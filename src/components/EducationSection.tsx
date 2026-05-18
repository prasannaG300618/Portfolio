import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import { education } from '../data/resumeData';
import SectionHeader from './SectionHeader';

// ─── Styled Components ──────────────────────────────────────────────────────

const EducationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: `linear-gradient(180deg, #0D1629 0%, ${theme.palette.background.default} 100%)`,
}));

const EducationCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3.5),
  background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.06)}, ${theme.palette.background.paper})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.13)}`,
  borderRadius: 16,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    border: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
    transform: 'translateY(-6px)',
    boxShadow: `0 16px 50px ${alpha(theme.palette.primary.main, 0.15)}`,
    '&::after': {
      opacity: 1,
    },
  },
}));

const DegreeIconBox = styled(Box)(({ theme }) => ({
  width: 54,
  height: 54,
  borderRadius: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
  boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
  color: '#fff',
  marginBottom: theme.spacing(2.5),
}));

const MetaRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),
  color: theme.palette.text.secondary,
  fontSize: '0.82rem',
  marginTop: theme.spacing(0.75),
}));

const ScoreBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  padding: theme.spacing(0.6, 1.5),
  borderRadius: 20,
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  color: theme.palette.primary.light,
  fontWeight: 700,
  fontSize: '0.85rem',
  marginTop: 'auto',
  paddingTop: theme.spacing(2),
  width: 'fit-content',
}));

// ─── Component ───────────────────────────────────────────────────────────────

const EducationSection: React.FC = () => {
  return (
    <EducationWrapper id="education">
      <Container maxWidth="lg">
        <SectionHeader
          eyebrow="Academic Background"
          title="Education"
          subtitle="My educational foundation that shaped my technical thinking and problem-solving approach."
        />

        <Grid container spacing={3} sx={{ mt: 1 }}>
          {education.map((edu) => (
            <Grid key={edu.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <EducationCard elevation={0}>
                <DegreeIconBox>
                  <SchoolOutlinedIcon sx={{ fontSize: 26 }} />
                </DegreeIconBox>

                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.3, mb: 1 }}>
                  {edu.degree}
                </Typography>

                <MetaRow>
                  <LocationCityOutlinedIcon sx={{ fontSize: 15, flexShrink: 0 }} />
                  <Typography variant="caption" sx={{ lineHeight: 1.4, color: 'text.secondary', fontSize: '0.82rem' }}>
                    {edu.institution}
                  </Typography>
                </MetaRow>

                <MetaRow>
                  <CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.82rem' }}>
                    {edu.duration}
                  </Typography>
                </MetaRow>

                <Box sx={{ flex: 1 }} />

                <ScoreBadge>
                  <EmojiEventsOutlinedIcon sx={{ fontSize: 16 }} />
                  {edu.score}
                </ScoreBadge>
              </EducationCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </EducationWrapper>
  );
};

export default EducationSection;
