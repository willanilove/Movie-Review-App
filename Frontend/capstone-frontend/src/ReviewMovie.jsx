import React, { useState } from "react";
import { TextInput, Button, SimpleGrid, Card, Image, Text, Title, Stack, Center } from "@mantine/core";
import { Link } from "react-router-dom";

function ReviewMovie() {
  // Store the search text the user types
  const [query, setQuery] = useState("");

  // Store the ist of movies returned from TMDb
  const [movies, setMovies] = useState([]);

  // TMDb API key
  const API_KEY = "cc3900e52f180a5eabb5a0f32bbc48e4";

  // Search TMDb for movies based on the user's query
  const handleSearch = async () => {
    // Don't search if the input is empty
    if (!query.trim()) {
      return;
    }

    try {
      // Build the API URL
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

      // Fetch the movie results
      const response = await fetch(url);
      const data = await response.json();

      // If any, update state with the results
      if (data && data.results) {
        setMovies(data.results);
      }
    } catch (error) {
      console.log("Error searching movies:", error);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      {/* Page Title */}
      <Title order={2} mb="lg" ta="center">
        Review a Movie
      </Title>

      {/* Search Input & Button */}
      <Stack align="center" mb="xl">
        <TextInput
          placeholder="Search for a movie..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          style={{ width: "60%" }}
        />

        <Button onClick={handleSearch} variant="gradient" gradient={{ from: "#354760", to: "#FFC72C", deg: 90 }}>
          Search
        </Button>
      </Stack>

      {/* Message when no movies are loaded */}
      {movies.length === 0 && (
        <Center>
          <Text c="dimmed">Search for a movie to begin reviewing.</Text>
        </Center>
      )}

      {/* Movie Results Grid */}
      <SimpleGrid cols={3} spacing="lg">
        {movies.map((movie) => (
          <Card key={movie.id} shadow="sm" padding="md" withBorder>
            {/* Movie Poster */}
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
              height={300}
              fit="cover"
            />

            {/* Movie Title */}
            <Text fw={700} mt="sm">
              {movie.title}
            </Text>

            {/* Movie Release Year */}
            <Text size="sm" c="dimmed">
              {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
            </Text>

            {/* View Spotlight CTA button */}
            <Button
              component={Link}
              to={`/spotlight/${movie.id}`}
              mt="md"
              variant="gradient"
              gradient={{ from: "#354760", to: "#FFC72C", deg: 90 }}
            >
              Review This Movie
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
}

export default ReviewMovie;
