import { useState, useEffect } from "react";
import { Container, Title, Box, Text, TextInput, Button, Group, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import SearchBar from "./SearchBar.jsx";
import MovieGrid from "./MovieGrid.jsx";
import SidebarFilters from "./SidebarFilters.jsx";
import MobileFilters from "./MobileFilters.jsx";

function Home() {
  // State for the search query (this is shared b/t SearchBar & MovieGrid)
  const [query, setQuery] = useState("");

  // State for selected filters (this is shared b/t SidebarFilters & MovieGrid)
  const [filters, setFilters] = useState({});

  // State to control mobile drawer visibility
  const [drawerOpen, setDrawerOpen] = useState(false);

  // useEffect(() => {
  //   document.body.classList.add("home-page");
  //   return () => {
  //     document.body.classList.remove("home-page");
  //   };
  // }, []);

  // Update filters when the user applies them in the sidebar or mobile drawer
  function handleFilterChange(newFilters) {
    setFilters(newFilters);
  }

  let showResultsTitle = false;

  if (query !== "") {
    showResultsTitle = true;
  }

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Container size="lg" py="xl">
        {/* Mobile Hero Section */}
        {isMobile && (
          <Box
            bg="#354760"
            p="xl"
            mb="xl"
            style={{
              boxShadow: "0 4px 12px rgba(53, 71, 96, 0.3)",
              borderRadius: "8px",
            }}
          >
            <Stack spacing="xs" align="center">
              <Title order={2} ta="center" style={{ color: "white" }}>
                Ready for your next reel adventure?
              </Title>
              <Text size="sm" fw={700} ta="center" style={{ color: "#FFC72C" }}>
                Browse the latest movies, read reviews, and share your ratings.
              </Text>

              <TextInput
                placeholder="Search for a movie title..."
                radius="md"
                size="md"
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
              />
              <Group position="center" mt="md">
                <Button
                  radius="md"
                  size="md"
                  variant="gradient"
                  gradient={{ from: "#354760", to: "#FFC72C", deg: 90 }}
                  onClick={() => {}}
                >
                  Search
                </Button>

                <Button
                  radius="md"
                  size="md"
                  variant="gradient"
                  gradient={{ from: "#354760", to: "#FFC72C", deg: 90 }}
                  onClick={() => setDrawerOpen(true)}
                >
                  Show Filters
                </Button>
              </Group>

              {/* Clear Filters link (MOBILE ONLY) */}
              <Text
                size="sm"
                style={{ color: "white", textDecoration: "underline", cursor: "pointer", marginTop: "8px" }}
                onClick={() => {
                  setFilters({});
                  setQuery("");
                }}
              >
                Clear Filters
              </Text>
            </Stack>
          </Box>
        )}

        {/* Search bar section (DESKTOP ONLY) */}
        {!isMobile && (
          <Box
            bg="#354760"
            p="xl"
            mb="xl"
            style={{
              boxShadow: "0 4px 12px rgba(53, 71, 96, 0.3)",
              borderRadius: "8px",
            }}
          >
            <SearchBar
              query={query}
              setQuery={setQuery}
              onShowFilters={() => setDrawerOpen(true)}
              isMobile={isMobile}
            />
          </Box>
        )}

        {/* Layout: sidebar filters on the left, movie grid on the right */}
        <Box
          style={{
            display: "flex",
            gap: isMobile ? "1rem" : "2rem",
            marginTop: isMobile ? "1rem" : "2rem",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {/* Sidebar with filter options (DESKTOP ONLY) */}
          {!isMobile && <SidebarFilters onFilterChange={handleFilterChange} />}

          {/* Mobile filter drawer */}
          {isMobile && (
            <MobileFilters
              opened={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              onFilterChange={handleFilterChange}
            />
          )}

          {/* Movie grid section */}
          <Box style={{ flex: 1 }}>
            {/* Search results title */}
            {showResultsTitle === true && (
              <Title
                order={2}
                mb="md"
                fw={700}
                ta="center"
                style={{
                  color: "#354760",
                  marginTop: 0,
                }}
              >
                Results for "{query}"
              </Title>
            )}

            {/* Pass isMobile to MovieGrid to control the layout */}
            <MovieGrid query={query} filters={filters} isMobile={isMobile} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
