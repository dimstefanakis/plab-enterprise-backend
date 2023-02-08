import { Box, Flex, Text, Button } from '@chakra-ui/react';

interface QuestionTypeSelectorItemProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

function QuestionTypeSelectorItem({
  title,
  description,
  selected,
  onClick
}: QuestionTypeSelectorItemProps) {
  return (
    <Box
      onClick={onClick}
      cursor="pointer"
      p={4}
      mt={4}
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
      backgroundColor={selected ? 'gray.100' : 'white'}
      w="49%"
      _hover={{
        borderColor: 'gray.300'
      }}
    >
      <Flex flexFlow="column">
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          {title}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {description}
        </Text>
      </Flex>
    </Box>
  );
}

export default QuestionTypeSelectorItem;
