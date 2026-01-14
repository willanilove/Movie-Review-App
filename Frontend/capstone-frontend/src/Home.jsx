import { useState } from "react";
import { Container, Title, Box } from "@mantine/core";

import SearchBar from "./SearchBar.jsx";
import MovieGrid from "./MovieGrid.jsx";
import SidebarFilters from "./SidebarFilters.jsx";

function Home() {
  // State for the search query (this is shared b/t SearchBar & MovieGrid)
  const [query, setQuery] = useState("");

  // State for selected filters (this is shared b/t SidebarFilters & MovieGrid)
  const [filters, setFilters] = useState({});

  // Update filters when the user applies them in the sidebar
  function handleFilterChange(newFilters) {
    setFilters(newFilters);
  }

  return (
    <Box>
      <Container size="lg" py="xl">
        {/* Search bar section */}
        <Box
          bg="white"
          p="xl"
          mb="xl"
          style={{
            boxShadow: "0 4px 12px rgba(53, 71, 96, 0.3)",
            borderRadius: "8px",
          }}
        >
          <SearchBar query={query} setQuery={setQuery} />
        </Box>

        {/* Layout: sidebar filters on the left, movie grid on the right */}
        <Box style={{ display: "flex", gap: "2rem" }}>
          {/* Sidebar with filter options */}
          <SidebarFilters onFilterChange={handleFilterChange} />

          {/* Movie grid section */}
          <Box style={{ flex: 1 }}>
            <Title order={2} mt="xl" mb="md" fw={700} style={{ color: "#354760" }}>
              {query ? `Results for "${query}"` : "Popular Movies"}
            </Title>

            <MovieGrid query={query} filters={filters} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
