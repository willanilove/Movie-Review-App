import { useState } from "react";
import SearchBar from "./SearchBar.jsx";
import MovieGrid from "./MovieGrid.jsx";
import { Container, Title, Box } from "@mantine/core";

function Home() {
  // State for search query (shared b/t SearchBar & MovieGrid)
  // This keeps track of what the user types to filter movies
  const [query, setQuery] = useState("");

  return (
    <Box>
      <Container size="lg" py="xl">
        <Box
          bg="white"
          p="xl"
          mb="xl"
          style={{
            boxShadow: "0 4px 12px rgba(53, 71, 96, 0.3)",
            borderRadius: "8px",
          }}
        >
          {/* SearchBar updates query state when typing */}
          <SearchBar query={query} setQuery={setQuery} />
        </Box>

        <Title order={2} mt="xl" mb="md" fw={700} style={{ color: "#354760" }}>
          {/* Title changes depending on search */}
          {query ? `Results for "${query}"` : "Popular Movies"}
        </Title>

        {/* MovieGrid component: fetches movies based on the query state */}
        {/* If the query is empty, it shows popular movies instead */}
        <MovieGrid query={query} />
      </Container>
    </Box>
  );
}

export default Home;
