import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Paper,
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/Work';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircle';
import { experiences } from '../data/resumeData';
import SectionHeader from './SectionHeader';

// ─── Styled Components ──────────────────────────────────────────────────────

const ExperienceWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, #0D1629 100%)`,
}));

const TimelineContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 19,
    top: 0,
    bottom: 0,
    width: 2,
    background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.1)})`,
    [theme.breakpoints.up('md')]: {
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
}));

const TimelineItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    width: '50%',
    paddingRight: theme.spacing(5),
    '&:nth-of-type(even)': {
      marginLeft: '50%',
      paddingRight: 0,
      paddingLeft: theme.spacing(5),
      flexDirection: 'row',
    },
  },
}));

const TimelineDot = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
  border: `3px solid ${theme.palette.background.default}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.2)}, 0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`,
  color: '#fff',
  zIndex: 1,
  [theme.breakpoints.up('md')]: {
    position: 'absolute',
    right: -20,
    top: 20,
    '&.even': {
      right: 'auto',
      left: -20,
    },
  },
}));

const ExperienceCard = styled(Paper)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3.5),
  background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.07)}, ${theme.palette.background.paper})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  borderRadius: 16,
  transition: 'all 0.3s ease',
  '&:hover': {
    border: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
  },
}));

const MetaBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  padding: theme.spacing(0.5, 1.25),
  borderRadius: 6,
  background: alpha(theme.palette.primary.main, 0.1),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  color: theme.palette.primary.light,
  fontSize: '0.8rem',
  fontWeight: 500,
}));

const BulletPoint = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(1.5),
  color: theme.palette.text.secondary,
}));

// ─── Component ───────────────────────────────────────────────────────────────

const ExperienceSection: React.FC = () => {
  const bulletPoints = experiences[0].description.split('. ').filter(Boolean);

  return (
    <ExperienceWrapper id="experience">
      <Container maxWidth="lg">
        <SectionHeader
          eyebrow="My Journey"
          title="Work Experience"
          subtitle="Professional experience building and delivering high-quality software solutions."
        />

        <TimelineContainer>
          {experiences.map((exp, index) => (
            <TimelineItem key={exp.id}>
              <TimelineDot className={index % 2 !== 0 ? 'even' : ''}>
                <WorkOutlineIcon sx={{ fontSize: 18 }} />
              </TimelineDot>

              <ExperienceCard elevation={0}>
                {/* Header */}
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                  {exp.role}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
                  <MetaBadge>
                    <BusinessOutlinedIcon sx={{ fontSize: 14 }} />
                    {exp.company}
                  </MetaBadge>
                  <MetaBadge>
                    <CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />
                    {exp.duration}
                  </MetaBadge>
                </Box>

                {/* Bullet Points */}
                <Box>
                  {bulletPoints.map((point, i) => (
                    <BulletPoint key={`${exp.id}-bullet-${i}`}>
                      <CheckCircleOutlineIcon sx={{ fontSize: 18, color: 'primary.main', mt: 0.15, flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                        {point}{!point.endsWith('.') ? '.' : ''}
                      </Typography>
                    </BulletPoint>
                  ))}
                </Box>
              </ExperienceCard>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </Container>
    </ExperienceWrapper>
  );
};

export default ExperienceSection;
