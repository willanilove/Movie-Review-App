import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Title, Text, Image, Box, Divider } from "@mantine/core";

function MovieSpotlight() {
  // Get the movie ID from  URL
  const { id } = useParams();

  // State for the movie details
  const [movie, setMovie] = useState(null);

  // State for the list of reviews
  const [reviews, setReviews] = useState([]);

  // Fetch movie details & reviews when the component loads
  useEffect(() => {
    // Build the API URL using the movie ID
    const url = `http://127.0.0.1:5001/api/movies/${id}`;

    // Fetch the movie & its reviews from backend
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Make sure the backend returned the expected structure
        if (data) {
          setMovie(data.movie);
          setReviews(data.reviews);
        }
      })
      .catch((error) => {
        console.log("Error fetching movie spotlight:", error);
      });
  }, [id]);

  // Show a loading message until the movie data is ready
  if (!movie) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container size="md" py="xl">
      {/* Movie details section */}
      <Box mb="xl">
        <Image src={movie.poster_url} alt={movie.title} height={400} />

        <Title order={2} mt="md">
          {movie.title} ({movie.year})
        </Title>

        <Text mt="sm">{movie.description}</Text>
      </Box>

      <Divider my="lg" />

      {/* Reviews section */}
      <Title order={3}>User Reviews</Title>

      {reviews.length === 0 ? (
        <Text mt="sm">No reviews yet.</Text>
      ) : (
        reviews.map((review) => (
          <Box
            key={review.id}
            mt="md"
            p="md"
            style={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
            }}
          >
            <Text weight={500}>{review.username}</Text>
            <Text>Rating: {review.rating} stars</Text>
            <Text>{review.comment}</Text>
          </Box>
        ))
      )}
    </Container>
  );
}

export default MovieSpotlight;
