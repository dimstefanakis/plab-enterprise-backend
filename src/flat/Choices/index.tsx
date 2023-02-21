import { useState, useEffect, useRef } from 'react';
import {
  Flex,
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
  Stack,
  HStack
} from '@chakra-ui/react';
import { VscTrash } from 'react-icons/vsc';
import useBuilderStore from '@/components/store/builderStore';
import { v4 as uuidv4 } from 'uuid';

interface IChoice {
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

  const [choices, setChoices] = useState<IChoice[]>(
    currentPage.elements[0]?.choices || [
      {
        text: '',
        value: '',
        id: uuidv4()
      }
    ]
  );

  function handleChoiceChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string | undefined
  ) {
    const { value } = e.target;
    const updatedChoices = choices.map((choice: IChoice) => {
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

  function handleDeleteChoice(id: string | undefined) {
    const updatedChoices = choices.filter((choice: IChoice) => {
      return choice.id !== id;
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

  function handleAddOtherChoice() {
    setData({
      ...data,
      pages: data.pages.map((page: any, index: number) => {
        if (page.id === currentPage.id) {
          return {
            ...page,
            elements: [
              {
                ...page.elements[0],
                showOtherItem: true
              }
            ]
          };
        }
        return page;
      })
    });
  }

  function handleRemoveOtherChoice() {
    setData({
      ...data,
      pages: data.pages.map((page: any, index: number) => {
        if (page.id === currentPage.id) {
          return {
            ...page,
            elements: [
              {
                ...page.elements[0],
                showOtherItem: false
              }
            ]
          };
        }
        return page;
      })
    });
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
              choices: choices.map((choice: IChoice) => ({
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
    setChoices(
      currentPage.elements[0]?.choices || [
        {
          text: '',
          value: '',
          id: uuidv4()
        }
      ]
    );
  }, [currentPageNumber]);

  return currentPage.elements[0]?.type === 'checkbox' ||
    currentPage.elements[0]?.type === 'radiogroup' ? (
    <Flex flexFlow="column" w="100%">
      <Text fontSize="xl" fontWeight="bold" mt={6} mb={4}>
        Choices
      </Text>
      <Stack>
        {currentPage.elements[0]?.choices?.map(
          (choice: IChoice, index: number) => (
            <Choice
              key={index}
              choice={choice}
              onChange={handleChoiceChange}
              onDelete={handleDeleteChoice}
            ></Choice>
          )
        )}
        {currentPage.elements[0]?.showOtherItem ? (
          <InputGroup>
            <Input disabled placeholder="Other"></Input>
            <InputRightElement width="4.5rem">
              <IconButton
                h="1.75rem"
                size="sm"
                aria-label="Delete"
                icon={<VscTrash />}
                onClick={handleRemoveOtherChoice}
              ></IconButton>
            </InputRightElement>
          </InputGroup>
        ) : null}
        <HStack>
          <Button
            w={currentPage.elements[0]?.showOtherItem ? '100%' : '70%'}
            onClick={handleAddChoice}
          >
            Add Choice
          </Button>
          {!currentPage.elements[0]?.showOtherItem && (
            <Button w="30%" onClick={handleAddOtherChoice}>
              Add Other
            </Button>
          )}
        </HStack>
      </Stack>
    </Flex>
  ) : null;
}

function Choice({
  choice,
  onChange,
  onDelete
}: {
  choice: IChoice;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string | undefined
  ) => void;
  onDelete: (id: string | undefined) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <InputGroup>
      <Input
        ref={inputRef}
        placeholder="Enter a choice"
        value={choice.value}
        onChange={(e) => onChange(e, choice?.id)}
      ></Input>
      <InputRightElement width="4.5rem">
        <IconButton
          h="1.75rem"
          size="sm"
          aria-label="Delete"
          icon={<VscTrash />}
          onClick={() => onDelete(choice?.id)}
        ></IconButton>
      </InputRightElement>
    </InputGroup>
  );
}

export default Choices;
