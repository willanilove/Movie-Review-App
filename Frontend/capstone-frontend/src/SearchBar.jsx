import React from "react";
import { Box, Flex, Title, Text, TextInput, Button, Group } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

function SearchBar(props) {
  // query = current search text
  // setQuery = function that updates the search text
  // onShowFilters = function to open mobile drawer
  // isMobile = boolean to detect mobile view

  const { query, setQuery, onShowFilters, isMobile } = props;

  function handleInputChange(event) {
    // Update the search text as the user types
    setQuery(event.currentTarget.value);
  }

  function handleSearchClick() {
    if (isMobile) {
      // On mobile, open the filter drawer
      onShowFilters();
    } else {
      // On desktop, reuse the current query value
      setQuery(query);
    }
  }

  return (
    <Flex
      justify="space-between"
      align="center"
      wrap="wrap"
      p="xl"
      bg="#354760"
      radius="md"
      shadow="sm"
      gap="md"
      style={{ minHeight: "100px" }}
    >
      {/* Left side: heading & description */}
      <Box>
        <Title order={2} style={{ color: "white" }}>
          Ready for your next reel adventure?
        </Title>

        <Text c="#FFC72C" size="sm" fw={700}>
          Browse the latest movies, read reviews, and share your ratings.
        </Text>
      </Box>

      {/* Right side: search input & button */}
      <Group gap={0}>
        <TextInput
          placeholder="Search for a movie title..."
          radius={0}
          style={{
            borderTopLeftRadius: "6px",
            borderBottomLeftRadius: "6px",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            backgroundColor: "white",
          }}
          rightSection={<IconSearch size={16} />}
          size="md"
          w={300}
          value={query}
          onChange={handleInputChange}
        />

        <Button
          radius={0}
          variant="gradient"
          gradient={{ from: "#354760", to: "#FFC72C", deg: 90 }}
          style={{
            color: "white",
            borderTopRightRadius: "6px",
            borderBottomRightRadius: "6px",
          }}
          size="md"
          onClick={handleSearchClick}
        >
          {isMobile ? "Show Filters" : "Search"}
        </Button>
      </Group>
    </Flex>
  );
}

export default SearchBar;
