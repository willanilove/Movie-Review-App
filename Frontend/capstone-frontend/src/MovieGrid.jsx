import React, { useEffect, useState } from "react";
import { Card, Image, Text, Button, SimpleGrid, Loader, Group, Box, Stack, Modal } from "@mantine/core";
import { Link } from "react-router-dom";

function MovieGrid({ query, filters, isMobile }) {
  // State for movies & loading indicator
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Number of movies to show on mobile
  const [visibleCount, setVisibleCount] = useState(5);

  // State for opening/closing the trailer modal
  const [openedTrailerId, setOpenedTrailerId] = useState(null);

  // State for storing YouTube trailer key
  const [trailerKey, setTrailerKey] = useState(null);

  const API_KEY = "cc3900e52f180a5eabb5a0f32bbc48e4";

  // Fetch movies whenever the search query changes
  useEffect(() => {
    setLoading(true);

    let url = "";

    if (query !== "") {
      url = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&language=en-US&query=" + query;
    } else {
      url = "https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY + "&language=en-US&page=1";
    }

    fetch(url)
      .then((response) => response.json())
      .then(async (data) => {
        if (data && data.results) {
          const moviesWithCast = [];

          for (let i = 0; i < data.results.length; i++) {
            const movie = data.results[i];
            let topCast = [];

            try {
              const castRes = await fetch(
                "https://api.themoviedb.org/3/movie/" + movie.id + "/credits?api_key=" + API_KEY,
              );
              const castData = await castRes.json();

              if (castData.cast && Array.isArray(castData.cast)) {
                topCast = castData.cast.slice(0, 3).map((actor) => actor.name);
              }
            } catch {
              topCast = [];
            }

            moviesWithCast.push({ ...movie, topCast });
          }

          setMovies(moviesWithCast);
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  // Filter movies
  const filteredMovies = [];
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    let include = true;

    if (filters.year) {
      const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : "";
      if (releaseYear !== filters.year) include = false;
    }

    if (filters.rating) {
      if (movie.vote_average < parseInt(filters.rating)) include = false;
    }

    if (include) filteredMovies.push(movie);
  }

  // Sort movies
  let sortedMovies = [...filteredMovies];

  if (filters.sort === "newest") {
    sortedMovies.sort((a, b) => (a.release_date < b.release_date ? 1 : -1));
  }

  if (filters.sort === "highest") {
    sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
  }

  if (filters.sort === "alphabetical") {
    sortedMovies.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  // Limit movies shown on mobile
  let moviesToDisplay = sortedMovies;
  if (isMobile) {
    moviesToDisplay = sortedMovies.slice(0, visibleCount);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* Trailer modal */}
      <Modal
        opened={openedTrailerId !== null}
        onClose={() => {
          setOpenedTrailerId(null);
          setTrailerKey(null);
        }}
        title="Movie Trailer"
        size="lg"
        centered
      >
        {trailerKey ? (
          <iframe
            width="100%"
            height="400"
            src={"https://www.youtube.com/embed/" + trailerKey + "?autoplay=1&rel=0&modestbranding=1"}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <Text>No trailer available.</Text>
        )}

        <Button
          fullWidth
          mt="md"
          variant="gradient"
          gradient={{ from: "#7A7A7A", to: "#354760", deg: 90 }}
          onClick={() => {
            setOpenedTrailerId(null);
            setTrailerKey(null);
          }}
        >
          Close Trailer
        </Button>
      </Modal>

      {/* Movie grid layout */}
      <SimpleGrid
        spacing={isMobile ? "md" : "lg"}
        cols={isMobile ? 2 : 3}
        breakpoints={[
          { maxWidth: 980, cols: 2 },
          { maxWidth: 640, cols: 1 },
        ]}
      >
        {moviesToDisplay.map((movie) => {
          const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
          const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
          const castList =
            movie.topCast && movie.topCast.length > 0 ? movie.topCast.join(", ") : "Cast info not available";

          return (
            <Card key={movie.id} shadow="sm" padding="md" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  alt={movie.title}
                  height={isMobile ? 220 : 300}
                  fit="cover"
                />
              </Card.Section>

              {/* Movie title and year */}
              <Text weight={500} size="lg" mt="md" style={{ color: "white" }}>
                {movie.title + " (" + year + ")"}
              </Text>

              {/* Star rating */}
              <Text size="sm" mt={4} style={{ color: "#FFC72C" }}>
                ★★★☆☆ ({rating} avg)
              </Text>

              {/* Cast members */}
              <Box mt="sm">
                <Text fw={500} style={{ color: "white" }}>
                  Starring:
                </Text>
                <Stack gap={2}>
                  {movie.topCast.map((actor, index) => (
                    <Text
                      key={index}
                      size="sm"
                      italic
                      style={{ color: "#FFC72C", textShadow: "0.5px 0.5px 0.5px #ccc" }}
                    >
                      {actor}
                    </Text>
                  ))}
                </Stack>
              </Box>

              <Stack mt="md">
                <Button
                  fullWidth
                  variant="gradient"
                  gradient={{ from: "#354760", to: "#7A7A7A" }}
                  onClick={async () => {
                    let trailerKeyLocal = null;
                    try {
                      const res = await fetch(
                        "https://api.themoviedb.org/3/movie/" + movie.id + "/videos?api_key=" + API_KEY,
                      );
                      const data = await res.json();

                      for (let i = 0; i < data.results.length; i++) {
                        const vid = data.results[i];
                        if (vid.type === "Trailer" && vid.site === "YouTube") {
                          trailerKeyLocal = vid.key;
                          break;
                        }
                      }
                    } catch {
                      trailerKeyLocal = null;
                    }

                    setTrailerKey(trailerKeyLocal);
                    setOpenedTrailerId(movie.id);
                  }}
                >
                  Play Trailer
                </Button>

                <Button
                  component={Link}
                  to={"/spotlight/" + movie.id}
                  fullWidth
                  variant="gradient"
                  gradient={{ from: "#354760", to: "#7A7A7A" }}
                >
                  View Spotlight
                </Button>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>

      {/* Show more button for mobile */}
      {isMobile && moviesToDisplay.length < sortedMovies.length && (
        <Button fullWidth mt="md" variant="outline" onClick={() => setVisibleCount(visibleCount + 5)}>
          Show More Movies
        </Button>
      )}
    </>
  );
}

export default MovieGrid;
