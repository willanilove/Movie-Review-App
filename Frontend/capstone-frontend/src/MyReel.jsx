import React, { useEffect, useState } from "react";
import { Paper, Title, Text, Button, Stack } from "@mantine/core";

function MyReel() {
  // State to store the user's reviews
  const [reviews, setReviews] = useState([]);

  // Temporary user ID until login system is added
  const userId = 1;

  // Fetch the user's reviews when the component loads
  useEffect(() => {
    const url = `http://127.0.0.1:5001/users/${userId}/reviews`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Update state with the list of reviews
        setReviews(data);
      })
      .catch((error) => {
        console.log("Error fetching reviews:", error);
      });
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      {/* Page Title */}
      <Title order={2} mb="lg">
        My Reviews
      </Title>

      {/* List of reviews */}
      <Stack gap="md">
        {/* Message when no reviews exist */}
        {reviews.length === 0 && <Text>No reviews yet.</Text>}

        {/* Render each review */}
        {reviews.map((review) => (
          <Paper key={review.id} p="md" shadow="sm" withBorder>
            <Text fw={700}>Movie ID: {review.movie_id}</Text>
            <Text>Rating: {review.rating} stars</Text>
            <Text mt="sm">{review.comment}</Text>

            {/* Buttons for my future edit/delete functionality */}
            <Stack mt="md" gap="xs">
              <Button color="blue">Edit Review</Button>
              <Button color="red">Delete Review</Button>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </div>
  );
}

export default MyReel;
