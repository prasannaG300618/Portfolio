import { styled, alpha } from '@mui/material/styles';
import { Box, Typography, Stack } from '@mui/material';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

const EyebrowText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontSize: '0.8rem',
}));

const TitleText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${alpha(theme.palette.primary.light, 0.9)})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 800,
}));

const Divider = styled(Box)(({ theme }) => ({
  height: 4,
  width: 60,
  borderRadius: 2,
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
}));

const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, subtitle, align = 'center' }) => {
  const isCenter = align === 'center';

  return (
    <Stack spacing={1.5} sx={{ mb: 6, textAlign: isCenter ? 'center' : 'left', alignItems: isCenter ? 'center' : 'flex-start' }}>
      <EyebrowText variant="overline">{eyebrow}</EyebrowText>
      <TitleText variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.75rem' } }}>
        {title}
      </TitleText>
      <Divider />
      {subtitle && (
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 580, lineHeight: 1.7, mt: 1 }}>
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};

export default SectionHeader;
