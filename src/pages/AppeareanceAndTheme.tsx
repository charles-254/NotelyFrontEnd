import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Slider,
  FormControl,
  InputLabel,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
import { useState } from "react";

function AppearanceAndTheme() {
  const [theme, setTheme] = useState("system");
  const [fontSize, setFontSize] = useState(13);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [density, setDensity] = useState("comfortable");
  const [colorPalette, setColorPalette] = useState("default");

  return (
    <Stack
      border={"1px solid green"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Paper sx={{ width: "45rem", p: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          UI Settings
        </Typography>

        <Divider sx={{ mb: 2 }} />
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Theme
          </Typography>
          <RadioGroup
            row
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            <FormControlLabel
              value="system"
              control={<Radio />}
              label="System"
            />
          </RadioGroup>
        </FormControl>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Font Size (
            <Box component="span" color="primary.main">
              {fontSize}
            </Box>
            )px
          </Typography>
          <Slider
            size="small"
            min={8}
            max={24}
            step={1}
            value={fontSize}
            onChange={(_, val) => setFontSize(val as number)}
          />
        </Box>

        <Box sx={{ mb: "1.5rem" }}>
          <Typography variant="subtitle1" gutterBottom>
            Line Spacing (
            <Box component="span" color="primary.main">
              {lineSpacing}
            </Box>
            )
          </Typography>
          <Slider
            size="small"
            min={1}
            max={2}
            step={0.1}
            value={lineSpacing}
            onChange={(_, val) => setLineSpacing(val as number)}
          />
        </Box>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="density-label">UI Density</InputLabel>
          <Select
            labelId="density-label"
            value={density}
            onChange={(e) => setDensity(e.target.value)}
          >
            <MenuItem value="comfortable">Comfortable</MenuItem>
            <MenuItem value="compact">Compact</MenuItem>
            <MenuItem value="spacious">Spacious</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="palette-label">Color Palette</InputLabel>
          <Select
            labelId="palette-label"
            value={colorPalette}
            onChange={(e) => setColorPalette(e.target.value)}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="pastel">Pastel</MenuItem>
            <MenuItem value="neon">Neon</MenuItem>
            <MenuItem value="mono">Monochrome</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </Stack>
  );
}

export default AppearanceAndTheme;
