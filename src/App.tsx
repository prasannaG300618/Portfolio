import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          overflowX: 'hidden',
          scrollBehavior: 'smooth',
          '& *': { boxSizing: 'border-box' },
        }}
      >
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
          <SkillsSection />
        </main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
