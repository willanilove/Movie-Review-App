import { useState } from "react";
import { Select, TextInput, Button, Stack, Title, Divider } from "@mantine/core";

// This component shows a sidebar with filters for movies
// The parent componenet will receive the selected filters
function SidebarFilters({ onFilterChange }) {
  // State for each filter option
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("");

  // When user clicks "Apply Filters", send all selected filters back to the parent component
  function handleApplyFilters() {
    const filters = {
      genre: genre,
      year: year,
      rating: rating,
      sort: sort,
    };
    // This sends the filters back to the parent component
    onFilterChange(filters);
  }

  // Sidebar layout is built via Mantine componenets
  return (
    <div
      style={{
        width: "250px",
        padding: "1rem",
        borderRight: "1px solid lightgray",
        backgroundColor: "#f8f8f8",
      }}
    >
      {/* Sidebar Title */}
      <Title order={4}>Filter Movies</Title>
      <Divider my="sm" />

      {/* Filter Inputs */}
      <Stack spacing="sm">
        {/* Genre Filter */}
        <Select
          label="Genre"
          placeholder="Select genre"
          data={["Action", "Comedy", "Drama", "Horror", "Romance"]}
          value={genre}
          onChange={(value) => {
            setGenre(value);
          }}
        />

        {/* Release Year Filter */}
        <TextInput
          label="Release Year"
          placeholder="e.g. 2024"
          value={year}
          onChange={(event) => {
            setYear(event.target.value);
          }}
        />

        {/* Rating Filter */}
        <Select
          label="Minimum Rating"
          placeholder="Choose rating"
          data={[
            { value: "1", label: "1+ stars" },
            { value: "2", label: "2+ stars" },
            { value: "3", label: "3+ stars" },
            { value: "4", label: "4+ stars" },
            { value: "5", label: "5 stars only" },
          ]}
          value={rating}
          onChange={(value) => {
            setRating(value);
          }}
        />

        {/* Sort Order Filter */}
        <Select
          label="Sort By"
          placeholder="Choose sort order"
          data={[
            { value: "newest", label: "Newest" },
            { value: "highest", label: "Highest Rated" },
            { value: "alphabetical", label: "A–Z" },
          ]}
          value={sort}
          onChange={(value) => {
            setSort(value);
          }}
        />

        {/* Apply Filters Button */}
        <Button variant="gradient" gradient={{ from: "#354760", to: "#FFC72C", deg: 90 }} onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </Stack>
    </div>
  );
}

export default SidebarFilters;
