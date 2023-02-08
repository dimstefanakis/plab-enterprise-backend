import { useState, useEffect } from 'react';
import { Flex, Box, Text, Input, Button, Stack } from '@chakra-ui/react';
import useBuilderStore from '@/components/store/builderStore';
import { v4 as uuidv4 } from 'uuid';

interface Choice {
  text: string;
  value: string;
  id?: string;
}

function Choices() {
  const currentPageNumber = useBuilderStore((state) => state.currentPage);
  const currentPage = useBuilderStore(
    (state) => state.data.pages[currentPageNumber]
  );
  const data = useBuilderStore((state) => state.data);
  const setData = useBuilderStore((state) => state.setData);

  const [choices, setChoices] = useState<Choice[]>(
    currentPage.elements[0]?.choices || []
  );

  function handleChoiceChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string | undefined
  ) {
    const { value } = e.target;
    const updatedChoices = choices.map((choice: Choice) => {
      if (choice.id === id) {
        return {
          text: value,
          value: value,
          id: choice.id
        };
      }
      return choice;
    });
    setChoices(updatedChoices);
  }

  function handleAddChoice() {
    setChoices([
      ...choices,
      {
        text: '',
        value: '',
        id: uuidv4()
      }
    ]);
  }

  // This useEffect is to update the data state when the choices state changes
  useEffect(() => {
    const updatedPages = data.pages.map((page: any, index: number) => {
      if (page.id === currentPage.id) {
        return {
          ...page,
          elements: [
            {
              ...page.elements[0],
              choices: choices.map((choice: Choice) => ({
                value: choice.value,
                text: choice.text,
                id: choice.id
              }))
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
  }, [choices]);

  // This useEffect is to update the choices state when the currentPageNumber changes
  useEffect(() => {
    setChoices(currentPage.elements[0]?.choices || []);
  }, [currentPageNumber]);

  return currentPage.elements[0]?.type === 'checkbox' ||
    currentPage.elements[0]?.type === 'radiogroup' ? (
    <Flex flexFlow="column" w="100%">
      <Text fontSize="xl" fontWeight="bold" mt={6} mb={4}>
        Choices
      </Text>
      <Stack>
        {currentPage.elements[0]?.choices?.map(
          (choice: Choice, index: number) => (
            <Input
              key={index}
              placeholder="Choice"
              value={choice.value}
              onChange={(e) => handleChoiceChange(e, choice?.id)}
            ></Input>
          )
        )}
        <Button onClick={handleAddChoice}>Add Choice</Button>
      </Stack>
    </Flex>
  ) : null;
}

export default Choices;
