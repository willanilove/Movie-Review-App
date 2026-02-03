import React from "react";
import { Box, Flex, Title, Text, TextInput, Button } from "@mantine/core";
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
      direction={isMobile ? "column" : "row"}
      justify="space-between"
      align={isMobile ? "stretch" : "center"}
      wrap="wrap"
      p={isMobile ? "md" : "xl"}
      bg="#354760"
      radius="md"
      shadow="sm"
      gap={isMobile ? "sm" : "md"}
      style={{ minHeight: isMobile ? "auto" : "100px" }}
    >
      {/* Heading & description */}
      <Box ta="center">
        <Title order={isMobile ? 4 : 2} ta="center" style={{ color: "white" }}>
          Ready for your next reel adventure?
        </Title>

        <Text c="#FFC72C" size={isMobile ? "xs" : "sm"} fw={700} mt={4} ta="center">
          Browse movies, reviews, and share your ratings.
        </Text>
      </Box>

      {/* Search input */}
      <TextInput
        placeholder="Search for a movie title..."
        radius="md"
        mt={isMobile ? "sm" : 0}
        rightSection={<IconSearch size={16} />}
        size="md"
        value={query}
        onChange={handleInputChange}
        w={isMobile ? "100%" : 300}
      />

      {/* Mobile buttons */}
      {isMobile ? (
        <Flex gap="sm" mt="sm">
          <Button
            fullWidth
            variant="gradient"
            gradient={{ from: "#354760", to: "#FFC72C", deg: 90 }}
            onClick={handleSearchClick}
          >
            Search
          </Button>

          <Button
            fullWidth
            variant="gradient"
            gradient={{ from: "#354760", to: "#FFC72C", deg: 90 }}
            onClick={onShowFilters}
          >
            Show Filters
          </Button>
        </Flex>
      ) : (
        /* Desktop button stays the same */
        <Button
          radius="md"
          variant="gradient"
          gradient={{ from: "#354760", to: "#FFC72C", deg: 90 }}
          size="md"
          onClick={handleSearchClick}
        >
          Search
        </Button>
      )}
    </Flex>
  );
}

export default SearchBar;
