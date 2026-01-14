import React, { useEffect, useState } from "react";
import { Card, Image, Text, Button, SimpleGrid, Loader } from "@mantine/core";
import { Link } from "react-router-dom";

function MovieGrid({ query, filters }) {
  // State for movies & loading indicator
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "cc3900e52f180a5eabb5a0f32bbc48e4";

  // Fetch movies whenever the search query changes
  useEffect(() => {
    // Start loading before making the request
    setLoading(true);

    // Decide which URL to use based on whether the user typed something
    let url = "";

    if (query) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`;
    } else {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    }

    // Fetch the movies from TMDb
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Make sure results exist before updating state
        if (data && data.results) {
          setMovies(data.results);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching movies:", error);
        setLoading(false);
      });
  }, [query]);

  // Filters to the movie list
  const filteredMovies = movies.filter((movie) => {
    // Filter by release year
    if (filters.year) {
      const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : "";
      if (releaseYear !== filters.year) {
        return false;
      }
    }

    // Filter by minimum rating
    if (filters.rating) {
      const minRating = parseInt(filters.rating);
      if (movie.vote_average < minRating) {
        return false;
      }
    }

    // Genre filtering skipped for now (TMDb uses genre_ids)
    return true;
  });

  // Sorting logic
  let sortedMovies = [...filteredMovies];

  if (filters.sort === "newest") {
    sortedMovies.sort((a, b) => {
      const dateA = a.release_date || "";
      const dateB = b.release_date || "";
      return dateB.localeCompare(dateA);
    });
  }

  if (filters.sort === "highest") {
    sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
  }

  if (filters.sort === "alphabetical") {
    sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
  }

  // While fetching; show loader
  if (loading) {
    return <Loader />;
  }

  // Render movie cards
  return (
    <SimpleGrid cols={3} spacing="lg">
      {sortedMovies.map((movie) => (
        <Card key={movie.id} shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} height={300} />
          </Card.Section>

          <Text weight={500} size="lg" mt="md">
            {movie.title} ({movie.release_date ? movie.release_date.slice(0, 4) : "N/A"})
          </Text>

          <Button
            component={Link}
            to={`/spotlight/${movie.id}`}
            mt="md"
            fullWidth
            variant="gradient"
            gradient={{ from: "#7A7A7A", to: "#354760", deg: 90 }}
          >
            View Spotlight
          </Button>
        </Card>
      ))}
    </SimpleGrid>
  );
}

export default MovieGrid;
