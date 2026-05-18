import { styled, alpha } from '@mui/material/styles';
import { Box, Container, Typography, Stack, IconButton } from '@mui/material';
import LinkedIn from '@mui/icons-material/LinkedIn';
import GitHub from '@mui/icons-material/GitHub';
import { personalInfo, socials } from '../data/resumeData';

const FooterWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  background: '#060B14',
  borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  borderRadius: 10,
  transition: 'all 0.25s ease',
  '&:hover': {
    color: theme.palette.primary.light,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
    background: alpha(theme.palette.primary.main, 0.1),
    transform: 'translateY(-3px)',
  },
}));

interface SocialLinkProps {
  id: string;
  href: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ id, href, target, rel, children }) => (
  <SocialIcon
    id={id}
    size="small"
    onClick={() => window.open(href, target ?? '_self', rel)}
    aria-label={id}
  >
    {children}
  </SocialIcon>
);

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2 }}
        >
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {personalInfo.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {personalInfo.role} · {personalInfo.location}
            </Typography>
          </Box>

          <Stack direction="row" sx={{ gap: 1 }}>
            <SocialLink id="footer-linkedin" href={socials.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedIn fontSize="small" />
            </SocialLink>
            <SocialLink id="footer-github" href={socials.github} target="_blank" rel="noopener noreferrer">
              <GitHub fontSize="small" />
            </SocialLink>
          </Stack>

          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', textAlign: { xs: 'center', sm: 'right' } }}
          >
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
