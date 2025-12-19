import React from "react";
import { Box, Flex, Group, Anchor, Button, Image } from "@mantine/core";
import reeltalkLogo from "./assets/reeltalk-logo-removebg-preview.png";
import { Link } from "react-router-dom";

// Color variables to match my logo
const PRIMARY_NAV_BLUE = "#354760";
const ACCENT_STAR_YELLOW = "#FFC72C";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Movie Spotlight", href: "/spotlight" },
  { name: "Submit a Film", href: "/submit" },
  { name: "My Reel", href: "/my-reel" },
];

function Navbar() {
  // Style obj for the nav links
  const linkStyle = {
    fontSize: "16px",
    fontWeight: 500,
    textDecoration: "none",
    color: PRIMARY_NAV_BLUE,
    transition: "color 0.2s ease",
  };

  return (
    /* Outer container for the navbar (white background & subtle shadow) */
    <Box
      component="nav"
      bg="white"
      style={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        padding: "16px 32px",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Flex justify="space-between" align="center" h={60}>
        {/* Left side: Logo & Nav links grouped together */}
        <Group spacing="lg" align="center">
          {/* Renders the logo image */}
          <Image src={reeltalkLogo} alt="ReelTalk Logo" h="auto" w={380} fit="contain" />

          {/* Desktop Nav: looping through my links array */}
          <Group spacing="xl" visibleFrom="sm">
            {navLinks.map((link) => (
              <Anchor key={link.name} component={Link} to={link.href} style={linkStyle}>
                {link.name}
              </Anchor>
            ))}
          </Group>
        </Group>

        {/* Right side: Login & Signup buttons */}
        <Group spacing="md">
          {/* Sign In Button (Yellow background) */}
          <Button
            component={Link}
            to="/login"
            style={{
              backgroundColor: ACCENT_STAR_YELLOW,
              color: PRIMARY_NAV_BLUE,
            }}
          >
            Sign In
          </Button>

          {/* Sign Up Button (Navy background) */}
          <Button
            component={Link}
            to="/signup"
            style={{
              backgroundColor: PRIMARY_NAV_BLUE,
              color: "white",
            }}
          >
            Sign Up
          </Button>
        </Group>
      </Flex>
    </Box>
  );
}

export default Navbar;
