import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import SendOutlined from '@mui/icons-material/SendOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import LinkedIn from '@mui/icons-material/LinkedIn';
import GitHub from '@mui/icons-material/GitHub';
import { personalInfo } from '../data/resumeData';
import SectionHeader from './SectionHeader';

// ─── Styled Components ──────────────────────────────────────────────────────

const ContactWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, #0D1629 100%)`,
}));

const ContactInfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.background.paper, 0.9)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  borderRadius: 16,
  height: '100%',
}));

const FormCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.05)}, ${theme.palette.background.paper})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.13)}`,
  borderRadius: 16,
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  padding: theme.spacing(2, 0),
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  '&:last-of-type': {
    borderBottom: 'none',
  },
}));

const ContactIconBox = styled(Box)(({ theme }) => ({
  width: 46,
  height: 46,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
  color: '#fff',
  flexShrink: 0,
  boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.3)}`,
}));

const SocialButton = styled(Button)(({ theme }) => ({
  borderRadius: 10,
  padding: theme.spacing(1.25, 2.5),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
  color: theme.palette.primary.light,
  fontWeight: 500,
  transition: 'all 0.25s ease',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.12),
    border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
    transform: 'translateY(-2px)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 10,
    background: alpha(theme.palette.primary.main, 0.04),
    transition: 'all 0.2s ease',
    '& fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.2),
    },
    '&:hover fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.4),
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused': {
      background: alpha(theme.palette.primary.main, 0.06),
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    '&.Mui-focused': {
      color: theme.palette.primary.light,
    },
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.text.primary,
  },
}));

const SendButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.6, 4),
  fontSize: '1rem',
  fontWeight: 600,
  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.35)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    boxShadow: `0 6px 30px ${alpha(theme.palette.primary.main, 0.55)}`,
    transform: 'translateY(-2px)',
  },
}));

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

const ContactSection: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [snackOpen, setSnackOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSnackOpen(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleSnackClose = (_: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
  };

  return (
    <ContactWrapper id="contact">
      <Container maxWidth="lg">
        <SectionHeader
          eyebrow="Let's Connect"
          title="Get In Touch"
          subtitle="Have a project in mind or just want to say hello? My inbox is always open."
        />

        <Grid container spacing={4} sx={{ mt: 1 }}>
          {/* Left – Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <ContactInfoCard elevation={0}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.light', mb: 3 }}>
                Contact Information
              </Typography>

              <ContactItem>
                <ContactIconBox>
                  <PhoneOutlined fontSize="small" />
                </ContactIconBox>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontSize: '0.7rem',
                    }}
                  >
                    Phone
                  </Typography>
                  <Box
                    component="a"
                    href={`tel:${personalInfo.phone}`}
                    sx={{
                      display: 'block',
                      color: 'text.primary',
                      fontWeight: 500,
                      textDecoration: 'none',
                      mt: 0.25,
                      '&:hover': { color: 'primary.light' },
                    }}
                  >
                    +91 {personalInfo.phone}
                  </Box>
                </Box>
              </ContactItem>

              <ContactItem>
                <ContactIconBox>
                  <EmailOutlined fontSize="small" />
                </ContactIconBox>
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontSize: '0.7rem',
                    }}
                  >
                    Email
                  </Typography>
                  <Box
                    component="a"
                    href={`mailto:${personalInfo.email}`}
                    sx={{
                      display: 'block',
                      color: 'text.primary',
                      fontWeight: 500,
                      textDecoration: 'none',
                      mt: 0.25,
                      wordBreak: 'break-all',
                      '&:hover': { color: 'primary.light' },
                    }}
                  >
                    {personalInfo.email}
                  </Box>
                </Box>
              </ContactItem>

              <ContactItem>
                <ContactIconBox>
                  <LocationOnOutlined fontSize="small" />
                </ContactIconBox>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontSize: '0.7rem',
                    }}
                  >
                    Location
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500, mt: 0.25 }}>
                    {personalInfo.location}
                  </Typography>
                </Box>
              </ContactItem>

              <Box sx={{ mt: 4 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  Connect on social platforms
                </Typography>
                <Stack direction="row" sx={{ gap: 2 }}>
                  <SocialButton
                    id="linkedin-btn"
                    variant="outlined"
                    startIcon={<LinkedIn />}
                    onClick={() => window.open('https://linkedin.com', '_blank', 'noopener,noreferrer')}
                  >
                    LinkedIn
                  </SocialButton>
                  <SocialButton
                    id="github-btn"
                    variant="outlined"
                    startIcon={<GitHub />}
                    onClick={() => window.open('https://github.com', '_blank', 'noopener,noreferrer')}
                  >
                    GitHub
                  </SocialButton>
                </Stack>
              </Box>
            </ContactInfoCard>
          </Grid>

          {/* Right – Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <FormCard elevation={0}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.light', mb: 3 }}>
                Send a Message
              </Typography>
              <Box component="form" id="contact-form" onSubmit={handleSubmit}>
                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <StyledTextField
                      id="contact-name"
                      name="name"
                      label="Your Name"
                      fullWidth
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <StyledTextField
                      id="contact-email"
                      name="email"
                      label="Your Email"
                      type="email"
                      fullWidth
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <StyledTextField
                      id="contact-subject"
                      name="subject"
                      label="Subject"
                      fullWidth
                      required
                      value={form.subject}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <StyledTextField
                      id="contact-message"
                      name="message"
                      label="Message"
                      multiline
                      rows={5}
                      fullWidth
                      required
                      value={form.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <SendButton
                      id="send-message-btn"
                      type="submit"
                      variant="contained"
                      fullWidth
                      endIcon={<SendOutlined />}
                    >
                      Send Message
                    </SendButton>
                  </Grid>
                </Grid>
              </Box>
            </FormCard>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackClose} severity="success" variant="filled" sx={{ borderRadius: 2 }}>
          Message sent successfully! I'll get back to you soon.
        </Alert>
      </Snackbar>
    </ContactWrapper>
  );
};

export default ContactSection;
