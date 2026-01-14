import React, { useEffect, useState } from "react";
import { Box, Flex, Group, Anchor, Button, Image, Menu, Avatar } from "@mantine/core";
import reeltalkLogo from "./assets/reeltalk-logo-removebg-preview.png";
import { Link } from "react-router-dom";

// Colors used in the navigation bar
const PRIMARY_NAV_BLUE = "#354760";
const ACCENT_STAR_YELLOW = "#FFC72C";

// List of navigation links for the main menu
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Submit a Film", href: "/submit-a-film" },
  { name: "Review a Movie", href: "/review-a-movie" },
  { name: "My Reel", href: "/my-reel" },
];

function Navbar() {
  // Style obj for each nav links
  const linkStyle = {
    fontSize: "16px",
    fontWeight: 500,
    textDecoration: "none",
    color: PRIMARY_NAV_BLUE,
    transition: "color 0.2s ease",
  };

  // Login user
  const [user, setUser] = useState(null);

  // Check localstorage to see if someone is already logged in
  useEffect(() => {
    function loadUser() {
      try {
        const stored = localStorage.getItem("user");
        setUser(stored ? JSON.parse(stored) : null);
      } catch (err) {
        console.log("Error loading user:", err);
        setUser(null);
      }
    }

    loadUser();

    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
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
        {/* Left side: Logo & nav links */}
        <Group spacing="lg" align="center">
          <Image src={reeltalkLogo} alt="ReelTalk Logo" h="auto" w={380} fit="contain" />

          <Group spacing="xl" visibleFrom="sm">
            {navLinks.map((link) => (
              <Anchor key={link.name} component={Link} to={link.href} style={linkStyle}>
                {link.name}
              </Anchor>
            ))}
          </Group>
        </Group>

        {/* ⭐ Right side: Conditional rendering */}
        <Group spacing="md">
          {user ? (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar radius="xl" style={{ cursor: "pointer" }} />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>{user.username}</Menu.Label>
                <Menu.Item onClick={handleLogout}>Log Out</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <>
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

              <Button
                component={Link}
                to="/signup"
                style={{
                  backgroundColor: PRIMARY_NAV_BLUE,
                  color: "white",
                }}
              >
                Get Started
              </Button>
            </>
          )}
        </Group>
      </Flex>
    </Box>
  );
}

export default Navbar;
