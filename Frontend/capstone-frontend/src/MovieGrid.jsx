import React, { useEffect, useState } from "react";
import { Card, Image, Text, Button, SimpleGrid, Loader } from "@mantine/core";

function MovieGrid({ query }) {
  // State for movies & loading spinner
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "cc3900e52f180a5eabb5a0f32bbc48e4";

  useEffect(() => {
    setLoading(true); // show loader while fetching

    // If query is empty show popular movies
    // If query has text search API
    const url = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetch(url)
      // Convert the response to JSON format
      .then((response) => response.json())
      .then((data) => {
        // Step 3: Save movies into state if we get results
        if (data.results) {
          setMovies(data.results); // save movies into state
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false); // stop loading even if there’s an error
      });
  }, [query]); // runs again whenever query changes

  if (loading) {
    return <Loader />;
  }

  return (
    /* Using SimpleGrid to show 3 movies per row */
    <SimpleGrid cols={3} spacing="lg">
      {movies.map((movie) => (
        <Card key={movie.id} shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            {/* Poster image */}
            <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} height={300} />
          </Card.Section>

          {/* Movie title & release year */}
          <Text weight={500} size="lg" mt="md">
            {movie.title} ({movie.release_date?.slice(0, 4)})
          </Text>

          {/* TODO: Later connect this button to reviews page */}
          <Button mt="md" fullWidth variant="gradient" gradient={{ from: "#7A7A7A", to: "#354760", deg: 90 }}>
            View Reviews
          </Button>
        </Card>
      ))}
    </SimpleGrid>
  );
}

export default MovieGrid;
