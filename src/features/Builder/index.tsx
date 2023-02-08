import { useEffect } from 'react';
import { Flex, Text, Input, Box, HStack, Button } from '@chakra-ui/react';
import QuestionNumber from '@/components/flat/QuestionNumber';
import QuestionTypeSelector from '@/components/flat/QuestionTypeSelector';
import QuestionMap from '../QuestionMap';
import AddQuestion from '@/components/flat/AddQuestion';
import useBuilderStore from '@/components/store/builderStore';

function Builder() {
  const currentPageNumber = useBuilderStore((state) => state.currentPage);
  const currentPage = useBuilderStore(
    (state) => state.data.pages[currentPageNumber]
  );
  const setCurrentPage = useBuilderStore((state) => state.setCurrentPage);
  const data = useBuilderStore((state) => state.data);
  const setData = useBuilderStore((state) => state.setData);

  console.log(data, 'Data');
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const updatedPages = data.pages.map((page: any, index: number) => {
      if (page.id === currentPage.id) {
        return {
          ...page,
          name: value,
          elements: [
            {
              ...page.elements[0],
              name: value
            }
          ]
        };
      }
      return page;
    });

    setData({
      ...data,
      pages: updatedPages
    });
  }

  useEffect(() => {
    setCurrentPage(data.pages.length - 1);
  }, [data.pages.length]);

  return (
    <Flex flexFlow="column" w="100%">
      <QuestionMap />
      <QuestionNumber />
      <Input
        placeholder="Question Name"
        value={currentPage.name}
        onChange={handleNameChange}
      ></Input>
      <Box w="100%" mt={6}>
        <QuestionTypeSelector />
      </Box>
      <HStack mt={10}>
        <AddQuestion />
        <Button colorScheme="blue" w="100%">Next Step</Button>
      </HStack>
    </Flex>
  );
}

export default Builder;
