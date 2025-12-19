import React from "react";
import { Box, Flex, Title, Text, TextInput, Button, Group } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

// SearchBar now takes query & setQuery from Home
function SearchBar({ query, setQuery }) {
  // NOTE: query = current search text | setQuery = function to update it

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
      {/* Left side: intro text */}
      <Box>
        <Title order={2} style={{ color: "white" }}>
          Ready for your next reel adventure?
        </Title>
        <Text color="#FFC72C" size="sm">
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
          }}
          rightSection={<IconSearch size={16} />}
          size="md"
          w={300}
          value={query} // controlled input (value comes from state in Home)
          onChange={(event) => setQuery(event.currentTarget.value)} // update query when typing
        />
        <Button
          radius={0}
          variant="gradient"
          gradient={{ from: "#354760", to: "#FFC72C", deg: 90 }}
          style={{
            color: "white", // Gradient buttons usually look better with white text
            borderTopRightRadius: "6px",
            borderBottomRightRadius: "6px",
          }}
          size="md"
          onClick={() => setQuery(query)}
        >
          Search
        </Button>
      </Group>
    </Flex>
  );
}

export default SearchBar;
