import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useScrollTrigger,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';

// ─── Styled Components ──────────────────────────────────────────────────────

const StyledAppBar = styled(AppBar)<{ scrolled: string }>(({ theme, scrolled }) => ({
  background:
    scrolled === 'true'
      ? `linear-gradient(135deg, ${alpha('#0A0F1E', 0.98)}, ${alpha('#0D1629', 0.98)})`
      : 'transparent',
  backdropFilter: scrolled === 'true' ? 'blur(20px)' : 'none',
  boxShadow:
    scrolled === 'true' ? `0 1px 0 ${alpha(theme.palette.primary.main, 0.15)}` : 'none',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const LogoBrand = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.4rem',
  background: `linear-gradient(135deg, ${theme.palette.primary.light}, #FFFFFF)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  cursor: 'pointer',
  letterSpacing: '-0.01em',
}));

const NavButton = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
  color: active ? theme.palette.primary.light : theme.palette.text.secondary,
  fontWeight: active ? 600 : 500,
  fontSize: '0.9rem',
  padding: theme.spacing(0.75, 1.5),
  position: 'relative',
  transition: 'all 0.2s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 4,
    left: '50%',
    transform: active ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
    width: '60%',
    height: 2,
    background: theme.palette.primary.main,
    borderRadius: 1,
    transition: 'transform 0.25s ease',
  },
  '&:hover': {
    color: theme.palette.primary.light,
    background: 'transparent',
    '&::after': {
      transform: 'translateX(-50%) scaleX(1)',
    },
  },
}));

const ResumeButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  padding: theme.spacing(0.75, 2),
  border: `1.5px solid ${alpha(theme.palette.primary.main, 0.5)}`,
  color: theme.palette.primary.light,
  fontWeight: 600,
  fontSize: '0.85rem',
  transition: 'all 0.25s ease',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.12),
    border: `1.5px solid ${theme.palette.primary.main}`,
    transform: 'translateY(-1px)',
  },
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  width: 280,
  height: '100%',
  background: `linear-gradient(180deg, #0A0F1E, #0D1629)`,
  padding: theme.spacing(3, 2),
  display: 'flex',
  flexDirection: 'column',
}));

const DrawerNavItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 10,
  margin: theme.spacing(0.4, 0),
  transition: 'all 0.2s ease',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.12),
    color: theme.palette.primary.light,
    paddingLeft: theme.spacing(3),
  },
}));

import { generateResumePdf } from '../utils/generateResumePdf';

// ─── Types & Data ────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
];

const handleDownloadResume = (): void => {
  generateResumePdf();
};

// ─── Component ───────────────────────────────────────────────────────────────

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 80 });

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'experience', 'projects', 'education', 'skills'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string): void => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setDrawerOpen(false);
  };

  return (
    <>
      <StyledAppBar position="fixed" scrolled={trigger.toString()}>
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
          {/* Logo */}
          <LogoBrand onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            PG
          </LogoBrand>

          <Box sx={{ flex: 1 }} />

          {/* Desktop Nav */}
          <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {navItems.map((item) => (
              <NavButton
                key={item.href}
                id={`nav-${item.label.toLowerCase()}`}
                active={activeSection === item.href}
                onClick={() => scrollTo(item.href)}
              >
                {item.label}
              </NavButton>
            ))}
            <ResumeButton
              id="nav-download-resume"
              variant="outlined"
              startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
              onClick={handleDownloadResume}
              sx={{ ml: 1 }}
            >
              Resume
            </ResumeButton>
          </Stack>

          {/* Mobile Hamburger */}
          <IconButton
            id="mobile-menu-btn"
            edge="end"
            sx={{ display: { md: 'none' }, color: 'text.secondary' }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <LogoBrand>PG</LogoBrand>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'text.secondary' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <DrawerNavItem onClick={() => scrollTo(item.href)}>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontWeight: activeSection === item.href ? 700 : 400,
                          color: activeSection === item.href ? 'primary.light' : 'text.primary',
                        },
                      },
                    }}
                  />
                </DrawerNavItem>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 'auto' }}>
            <Button
              id="drawer-download-resume"
              variant="contained"
              startIcon={<DownloadIcon />}
              fullWidth
              onClick={() => { handleDownloadResume(); setDrawerOpen(false); }}
              sx={{
                background: (t) => `linear-gradient(135deg, ${t.palette.primary.dark}, ${t.palette.primary.main})`,
                py: 1.5,
                borderRadius: 2,
              }}
            >
              Download Resume
            </Button>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
