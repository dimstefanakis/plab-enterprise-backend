import { Flex, Box, Text, Stack } from '@chakra-ui/react';
import MapBelt from '../MapBelt';
import useBuilderStore from '@/components/store/builderStore';

function QuestionMap() {
  const data = useBuilderStore((state) => state.data);
  const currentPageNumber = useBuilderStore((state) => state.currentPage);

  function onClickQuestion(id: string) {
    useBuilderStore.setState({
      currentPage: data.pages.findIndex((page: any) => page.id === id)
    });
  }

  return (
    <Flex position="fixed" left="0" top="0" w="300px" h="100vh">
      <Box
        w="100%"
        h="100%"
        bg="white.100"
        p={4}
        boxShadow="md"
        overflow="auto"
      >
        <Text
          fontSize="sm"
          fontWeight="bold"
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="wide"
          mb={2}
        >
          Question Map
        </Text>
        <Stack spacing={2}>
          {data.pages.map((page: any, index: number) => (
            <Box
              key={index}
              onClick={() => onClickQuestion(page.id)}
              cursor="pointer"
              p={4}
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.200"
              backgroundColor={
                currentPageNumber === index ? 'gray.100' : 'white'
              }
              w="100%"
              _hover={{
                borderColor: 'gray.300'
              }}
            >
              <Flex flexFlow="column">
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  {page.name}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {page.elements[0]?.type}
                </Text>
                <MapBelt pageId={page.id} />
              </Flex>
            </Box>
          ))}
        </Stack>
      </Box>
    </Flex>
  );
}

export default QuestionMap;
