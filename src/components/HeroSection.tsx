import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Avatar,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import { personalInfo, socials } from '../data/resumeData';
import { generateResumePdf } from '../utils/generateResumePdf';
import heroImage from '../assets/hero.png';

// ─── Styled Components ──────────────────────────────────────────────────────

const HeroWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #060B18 50%, #0D1629 100%)`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-20%',
    right: '-10%',
    width: '60%',
    height: '80%',
    background: `radial-gradient(ellipse at center, ${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 70%)`,
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-15%',
    left: '-5%',
    width: '50%',
    height: '60%',
    background: `radial-gradient(ellipse at center, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 70%)`,
    pointerEvents: 'none',
  },
}));

const GridLines = styled(Box)(() => ({
  position: 'absolute',
  inset: 0,
  backgroundImage: `
    linear-gradient(rgba(74, 144, 217, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(74, 144, 217, 0.05) 1px, transparent 1px)
  `,
  backgroundSize: '80px 80px',
  pointerEvents: 'none',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 220,
  height: 220,
  border: `4px solid ${alpha(theme.palette.primary.main, 0.4)}`,
  boxShadow: `0 0 50px ${alpha(theme.palette.primary.main, 0.45)}, 0 0 100px ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease',
  backgroundColor: '#0F1929',
  '& img': {
    objectFit: 'cover',
    objectPosition: 'center center',
  },
  '&:hover': {
    transform: 'scale(1.06) translateY(-4px) rotate(2deg)',
    boxShadow: `0 0 60px ${alpha(theme.palette.primary.light, 0.65)}, 0 0 120px ${alpha(theme.palette.secondary.main, 0.35)}`,
  },
  [theme.breakpoints.down('md')]: {
    width: 170,
    height: 170,
  },
}));

const GlowText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light}, #FFFFFF, ${theme.palette.secondary.light})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textShadow: `0 0 40px ${alpha(theme.palette.primary.main, 0.2)}`,
}));

const RoleBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.75, 2.2),
  borderRadius: 50,
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.15)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
  backdropFilter: 'blur(12px)',
  marginBottom: theme.spacing(2.5),
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.6, 4),
  fontSize: '1rem',
  fontWeight: 700,
  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.45)}`,
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    boxShadow: `0 6px 30px ${alpha(theme.palette.primary.main, 0.65)}`,
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

const OutlineButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.6, 4),
  fontSize: '1rem',
  fontWeight: 600,
  border: `1.5px solid ${alpha(theme.palette.primary.main, 0.55)}`,
  color: theme.palette.primary.light,
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    border: `1.5px solid ${theme.palette.primary.main}`,
    background: alpha(theme.palette.primary.main, 0.12),
    transform: 'translateY(-2px)',
  },
}));

const FloatingDot = styled(
  Box,
  { shouldForwardProp: (p) => !['dotSize', 'topPos', 'leftPos', 'rightPos', 'bottomPos', 'animDelay'].includes(p as string) }
)<{ dotSize?: number; topPos?: string; leftPos?: string; rightPos?: string; bottomPos?: string; animDelay?: string }>(
  ({ theme, dotSize = 6, topPos, leftPos, rightPos, bottomPos, animDelay = '0s' }) => ({
    position: 'absolute',
    width: dotSize,
    height: dotSize,
    borderRadius: '50%',
    background: theme.palette.primary.main,
    opacity: 0.35,
    top: topPos,
    left: leftPos,
    right: rightPos,
    bottom: bottomPos,
    animation: `dotFloat 5s ease-in-out infinite ${animDelay}`,
    '@keyframes dotFloat': {
      '0%, 100%': { transform: 'translateY(0px) scale(1)' },
      '50%': { transform: 'translateY(-16px) scale(1.15)', opacity: 0.5 },
    },
  })
);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const handleDownloadResume = (): void => {
  generateResumePdf();
};

// ─── Component ───────────────────────────────────────────────────────────────

const HeroSection: React.FC = () => {
  return (
    <HeroWrapper id="hero">
      <GridLines />
      <FloatingDot dotSize={9} topPos="18%" leftPos="6%" animDelay="0s" />
      <FloatingDot dotSize={6} topPos="42%" leftPos="14%" animDelay="1.2s" />
      <FloatingDot dotSize={11} topPos="68%" rightPos="10%" animDelay="2.4s" />
      <FloatingDot dotSize={7} topPos="12%" rightPos="22%" animDelay="0.6s" />
      <FloatingDot dotSize={5} bottomPos="22%" leftPos="28%" animDelay="1.8s" />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            py: { xs: 12, md: 8 },
            gap: { xs: 6, md: 6 },
          }}
        >
          {/* Left – Text Content */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <RoleBadge>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'success.main',
                  animation: 'pulseBadge 2s ease-in-out infinite',
                  '@keyframes pulseBadge': {
                    '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                    '50%': { opacity: 0.4, transform: 'scale(1.4)' },
                  },
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: 'primary.light',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                }}
              >
                Available for opportunities
              </Typography>
            </RoleBadge>

            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1, fontWeight: 400, letterSpacing: '0.05em' }}>
              Hello, I'm
            </Typography>

            <GlowText
              variant="h1"
              sx={{ fontSize: { xs: '3.2rem', sm: '4.2rem', md: '5.2rem' }, lineHeight: 1.1, mb: 1.5 }}
            >
              {personalInfo.name}
            </GlowText>

            <Typography
              variant="h4"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                mb: 3,
                letterSpacing: '0.02em',
                fontSize: { xs: '1.25rem', md: '1.6rem' },
              }}
            >
              {personalInfo.role}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 4.5,
                maxWidth: 540,
                lineHeight: 1.85,
                fontSize: '1.02rem',
                mx: { xs: 'auto', md: 0 },
              }}
            >
              Building robust, high-performance web applications using modern full-stack architectures. Focused on high scalability, clean code execution, and delivering dynamic developer velocity.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{ mb: 4.5, justifyContent: { xs: 'center', md: 'flex-start' }, gap: 2.5 }}
            >
              <PrimaryButton
                id="download-resume-btn"
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadResume}
              >
                Download Resume
              </PrimaryButton>
              <OutlineButton
                id="linkedin-hero-btn"
                variant="outlined"
                startIcon={<LinkedInIcon />}
                onClick={() => window.open(socials.linkedin, '_blank', 'noopener,noreferrer')}
              >
                Connect on LinkedIn
              </OutlineButton>
            </Stack>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'text.secondary',
                  fontSize: '0.92rem',
                  transition: 'color 0.2s',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                <LocationOnOutlined sx={{ fontSize: 18 }} />
                <span>{personalInfo.location}</span>
              </Box>
              <Box
                component="a"
                href={`mailto:${personalInfo.email}`}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'text.secondary',
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  '&:hover': { color: 'primary.light' },
                }}
              >
                <EmailOutlined sx={{ fontSize: 18 }} />
                <span>{personalInfo.email}</span>
              </Box>
            </Box>
          </Box>

          {/* Right – Avatar with Glow Backdrop */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              position: 'relative',
              px: { xs: 0, md: 4 },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: 280,
                height: 280,
                borderRadius: '50%',
                background: (t) => `radial-gradient(circle, ${alpha(t.palette.primary.main, 0.25)} 0%, transparent 70%)`,
                filter: 'blur(30px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              {/* Decorative rings */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: -20,
                  borderRadius: '50%',
                  border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.25)}`,
                  animation: 'spinRing 22s linear infinite',
                  '@keyframes spinRing': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                  },
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: -40,
                  borderRadius: '50%',
                  border: (t) => `1px dashed ${alpha(t.palette.primary.main, 0.15)}`,
                  animation: 'spinRingRev 32s linear infinite reverse',
                  '@keyframes spinRingRev': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                  },
                }}
              />
              <StyledAvatar src={heroImage} alt={personalInfo.name} />
            </Box>
          </Box>
        </Stack>
      </Container>

      {/* Scroll indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.2,
          opacity: 0.5,
          animation: 'heroBounce 2.5s ease-in-out infinite',
          '@keyframes heroBounce': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
            '50%': { transform: 'translateX(-50%) translateY(10px)' },
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontSize: '0.68rem',
            fontWeight: 600,
          }}
        >
          Scroll
        </Typography>
        <Box
          sx={{
            width: 1,
            height: 42,
            border: '1px solid',
            borderColor: 'text.secondary',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'center',
            pt: 0.5,
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 10,
              borderRadius: 2,
              bgcolor: 'primary.main',
              animation: 'scrollDot 2.2s ease-in-out infinite',
              '@keyframes scrollDot': {
                '0%': { transform: 'translateY(0)', opacity: 1 },
                '100%': { transform: 'translateY(22px)', opacity: 0 },
              },
            }}
          />
        </Box>
      </Box>
    </HeroWrapper>
  );
};

export default HeroSection;
