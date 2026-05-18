import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  Paper,
} from '@mui/material';
import Star from '@mui/icons-material/Star';
import { skills, techSkills } from '../data/resumeData';
import SectionHeader from './SectionHeader';

// ─── Styled Components ──────────────────────────────────────────────────────

const SkillsWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: theme.palette.background.default,
}));

const SkillsPanel = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.06)}, ${theme.palette.background.paper})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.13)}`,
  borderRadius: 16,
  height: '100%',
}));

const SoftSkillChip = styled(Chip)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.secondary.main, 0.06)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
  color: theme.palette.text.primary,
  fontWeight: 500,
  padding: theme.spacing(2, 0.5),
  fontSize: '0.88rem',
  transition: 'all 0.25s ease',
  '&:hover': {
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.22)}, ${alpha(theme.palette.secondary.main, 0.12)})`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
    color: theme.palette.primary.light,
  },
}));

const TechSkillItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.25, 2),
  borderRadius: 10,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  background: alpha(theme.palette.primary.main, 0.04),
  transition: 'all 0.25s ease',
  '&:hover': {
    border: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
    background: alpha(theme.palette.primary.main, 0.1),
    transform: 'translateX(4px)',
    color: theme.palette.primary.light,
  },
}));

const PanelTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.light,
  marginBottom: theme.spacing(3),
  paddingBottom: theme.spacing(1.5),
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
}));

// ─── Component ───────────────────────────────────────────────────────────────

const SkillsSection: React.FC = () => {
  return (
    <SkillsWrapper id="skills">
      <Container maxWidth="lg">
        <SectionHeader
          eyebrow="What I Know"
          title="Skills & Expertise"
          subtitle="A blend of technical proficiency and professional competencies that drive impactful outcomes."
        />

        <Grid container spacing={4} sx={{ mt: 1 }}>
          {/* Soft / Professional Skills */}
          <Grid size={{ xs: 12, md: 6 }}>
            <SkillsPanel elevation={0}>
              <PanelTitle variant="h5">Professional Skills</PanelTitle>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {skills.map((skill) => (
                  <SoftSkillChip
                    key={skill.id}
                    id={skill.id}
                    label={skill.label}
                    icon={<Star style={{ fontSize: 16 }} />}
                  />
                ))}
              </Box>
            </SkillsPanel>
          </Grid>

          {/* Technical Skills */}
          <Grid size={{ xs: 12, md: 6 }}>
            <SkillsPanel elevation={0}>
              <PanelTitle variant="h5">Technical Stack</PanelTitle>
              <Grid container spacing={1.5}>
                {techSkills.map((tech) => (
                  <Grid key={tech.id} size={{ xs: 12, sm: 6 }}>
                    <TechSkillItem>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: (t) =>
                            `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 500, color: 'inherit' }}>
                        {tech.label}
                      </Typography>
                    </TechSkillItem>
                  </Grid>
                ))}
              </Grid>
            </SkillsPanel>
          </Grid>
        </Grid>
      </Container>
    </SkillsWrapper>
  );
};

export default SkillsSection;
