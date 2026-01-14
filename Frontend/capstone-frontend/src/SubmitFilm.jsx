import React, { useState } from "react";
import { TextInput, Textarea, Button, Paper, Title, Stack, Alert } from "@mantine/core";

function SubmitFilm() {
  // State for each form field
  const [title, setTitle] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [description, setDescription] = useState("");

  // State for success or error messages
  const [message, setMessage] = useState("");

  // Handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear any previous message
    setMessage("");

    try {
      // Build the request body
      const movieData = {
        title: title,
        poster_url: posterUrl,
        description: description,
      };

      // Send the POST request to the backend
      const response = await fetch("http://127.0.0.1:5001/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      // If the backend returns an error status
      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.error || "Something went wrong.");
        return;
      }

      // If the movie was added successfully
      const data = await response.json();
      setMessage(`Movie "${data.title}" was added successfully!`);

      // Reset the form fields
      setTitle("");
      setPosterUrl("");
      setDescription("");
    } catch (error) {
      console.log("Error submitting movie:", error);
      setMessage("Error submitting movie. Please try again.");
    }
  };

  return (
    <Paper shadow="md" radius="md" p="xl" withBorder style={{ maxWidth: 600, margin: "80px auto" }}>
      <Title order={2} mb="lg">
        Submit a Film
      </Title>

      {/* Show success or error message */}
      {message && (
        <Alert color="blue" mb="lg">
          {message}
        </Alert>
      )}

      {/* Form for adding a new movie */}
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label="Title"
            placeholder="Enter movie title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <TextInput
            label="Poster URL"
            placeholder="https://example.com/poster.jpg"
            value={posterUrl}
            onChange={(event) => setPosterUrl(event.target.value)}
            required
          />

          <Textarea
            label="Description"
            placeholder="Write a short summary of the movie"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            minRows={4}
            required
          />

          <Button type="submit" variant="gradient" gradient={{ from: "#354760", to: "#FFC72C", deg: 90 }}>
            Add Movie
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default SubmitFilm;
