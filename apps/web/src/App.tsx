import React, { useState, useEffect, useCallback } from "react";
import JobList from "./components/joblist";
import PostJob from "./components/postjob";
import Filter from "./components/filter";
import { Container, Box, Typography, AppBar, Toolbar, CssBaseline, Link } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme();

theme.typography.subtitle2 = {
  fontSize: '10rem',
};

const App: React.FC = () => {
  const [jobTypes, setJobTypes] = useState<string[]>([]);

  const handleFilter = useCallback((newJobTypes: string[]) => {
    setJobTypes(newJobTypes);
  }, []);

  useEffect(() => {
    const eventSource = new EventSource('/api/postings/sse');
    eventSource.onmessage = () => { };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar>
          <Container maxWidth="sm">
            <Box display="flex" flexDirection="row" alignItems="center" mt={2} mb={2}>
              <Box>
                <Typography variant="h5" color="textPrimary">jobby.dev</Typography>
                <Typography color="textSecondary">remote dev jobs</Typography>
              </Box>
              <Box display="flex" flexGrow={1} justifyContent="flex-end">
                <PostJob/>
              </Box>
            </Box>

            <Box mt={2} mb={2}>
              <Filter onFilter={handleFilter} />
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="sm">
          <JobList filters={{jobTypes}} />
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          py: 1.5,
          px: 1.5,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
          position: 'sticky',
          bottom: 0,
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.disabled" align="center">
            <Link color="text.disabled" href="https://github.com/smltr/Jobby" target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>github.com/smltr/Jobby</Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default App;