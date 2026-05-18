import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Stack,
} from '@mui/material';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { projects } from '../data/resumeData';
import SectionHeader from './SectionHeader';

// ─── Styled Components ──────────────────────────────────────────────────────

const ProjectsWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: theme.palette.background.default,
}));

const ProjectCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3.5),
  background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.05)}, ${theme.palette.background.paper})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  borderRadius: 16,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'default',
  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.18)}`,
    '&::before': {
      opacity: 1,
    },
  },
}));

const CardIconBox = styled(Box)(({ theme }) => ({
  width: 52,
  height: 52,
  borderRadius: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
  color: theme.palette.primary.light,
  marginBottom: theme.spacing(2),
  flexShrink: 0,
}));

const TechChip = styled(Chip)(({ theme }) => ({
  background: alpha(theme.palette.primary.main, 0.1),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
  color: theme.palette.primary.light,
  fontWeight: 500,
  fontSize: '0.75rem',
  height: 26,
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.2),
  },
}));

const CardNumber = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 20,
  fontSize: '3rem',
  fontWeight: 900,
  color: alpha(theme.palette.primary.main, 0.07),
  lineHeight: 1,
  userSelect: 'none',
}));

// ─── Component ───────────────────────────────────────────────────────────────

const ProjectsSection: React.FC = () => {
  return (
    <ProjectsWrapper id="projects">
      <Container maxWidth="lg">
        <SectionHeader
          eyebrow="What I've Built"
          title="Featured Projects"
          subtitle="A selection of projects I've contributed to — from reward platforms to simulation apps."
        />

        <Grid container spacing={3} sx={{ mt: 1 }}>
          {projects.map((project, index) => (
            <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectCard elevation={0}>
                <CardNumber>0{index + 1}</CardNumber>

                <CardIconBox>
                  <CodeOutlinedIcon sx={{ fontSize: 26 }} />
                </CardIconBox>

                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 1, pr: 4 }}>
                  {project.name}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.75, flex: 1, mb: 3 }}>
                  {project.description}
                </Typography>

                <Box>
                  <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {project.techStack.map((tech) => (
                      <TechChip
                        key={`${project.id}-${tech}`}
                        label={tech}
                        size="small"
                        icon={<OpenInNewIcon style={{ fontSize: 10 }} />}
                      />
                    ))}
                  </Stack>
                </Box>
              </ProjectCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ProjectsWrapper>
  );
};

export default ProjectsSection;
