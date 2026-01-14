import { createTheme } from "@mantine/core";

// 1. Define the exact color value
const PRIMARY_COLOR_VALUE = "#5d5fef";

// 2. Define the custom color palette with 10 shades
const myPrimaryPalette = [
  "#f3f0ff",
  "#e5dbff",
  "#d0bfff",
  PRIMARY_COLOR_VALUE,
  "#9775fa",
  "#845ef7",
  "#7950f2",
  "#7048e8",
  "#6741d9",
  "#5f3dc4",
];

// 3. Create and export the theme object
export const theme = createTheme({
  colors: {
    // Register the custom palette under the name 'my-primary'
    "my-primary": myPrimaryPalette,
  },
  // Set the default primary color for all Mantine components
  primaryColor: "my-primary",
});
