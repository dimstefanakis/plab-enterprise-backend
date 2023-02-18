import { Button, Box, Flex } from '@chakra-ui/react';
import useBuilderStore from '@/components/store/builderStore';

function AddQuestion() {
  const addQuestion = useBuilderStore((state) => state.addPage);

  return (
    <Flex
      onClick={addQuestion}
      cursor="pointer"
      p={4}
      minH="100px"
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
      backgroundColor="white"
      color="gray.500"
      justify="center"
      align="center"
      w="100%"
      _hover={{
        borderColor: 'gray.300',
        backgroundColor: 'gray.100'
      }}
    >
      Add Another Question
    </Flex>
  );
}

export default AddQuestion;
