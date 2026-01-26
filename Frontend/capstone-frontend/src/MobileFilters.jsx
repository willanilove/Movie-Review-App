import { useState } from "react";
import { Drawer, Button, Select, TextInput } from "@mantine/core";

function MobileFilters({ opened, onClose, onFilterChange }) {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState("");

  function handleApplyFilters() {
    const filters = {
      genre: selectedGenre || undefined,
      year: releaseYear || undefined,
      rating: minRating || undefined,
      sort: sortBy || undefined,
    };
    onFilterChange(filters);
    onClose();
  }

  return (
    <Drawer opened={opened} onClose={onClose} title="Search Filters" padding="md" size="80%" position="right">
      <Select
        label="Genre"
        placeholder="Select genre"
        data={["Action", "Comedy", "Drama", "Sci-Fi"]}
        value={selectedGenre}
        onChange={setSelectedGenre}
        mb="sm"
      />
      <TextInput
        label="Release Year"
        placeholder="e.g. 2024"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.currentTarget.value)}
        mb="sm"
      />
      <Select
        label="Minimum Rating"
        placeholder="Choose rating"
        data={["1+", "2+", "3+", "4+", "5"]}
        value={minRating}
        onChange={setMinRating}
        mb="sm"
      />
      <Select
        label="Sort By"
        placeholder="Select sort option"
        data={["Newest", "Oldest", "Highest Rated"]}
        value={sortBy}
        onChange={setSortBy}
        mb="md"
      />
      <Button
        fullWidth
        variant="gradient"
        gradient={{ from: "#354760", to: "#FFC72C", deg: 90 }}
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </Drawer>
  );
}

export default MobileFilters;
