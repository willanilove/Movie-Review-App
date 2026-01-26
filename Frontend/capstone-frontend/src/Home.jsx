import { useState, useEffect } from "react";
import { Container, Title, Box } from "@mantine/core";
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
        {/* Search bar section */}
        <Box
          bg="#354760"
          p="xl"
          mb="xl"
          style={{
            boxShadow: "0 4px 12px rgba(53, 71, 96, 0.3)",
            borderRadius: "8px",
          }}
        >
          <SearchBar query={query} setQuery={setQuery} onShowFilters={() => setDrawerOpen(true)} isMobile={isMobile} />
        </Box>

        {/* Layout: sidebar filters on the left, movie grid on the right */}
        <Box style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
          {/* Sidebar with filter options (DESKTOP ONLY) */}
          {!isMobile && <SidebarFilters onFilterChange={handleFilterChange} />}

          {/* Mobile filter drawer (MOBILE ONLY) */}
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

            <MovieGrid query={query} filters={filters} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
