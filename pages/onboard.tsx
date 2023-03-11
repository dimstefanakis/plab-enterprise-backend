import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Flex, Select, Heading, Button } from '@chakra-ui/react';
import useHeaderStore from '@/components/store/headerStore';
import { v4 as uuidv4 } from 'uuid';

function OnBoard() {
  const router = useRouter();
  const setTitle = useHeaderStore((state) => state.setTitle);
  const title = useHeaderStore((state) => state.title);

  useEffect(() => {
    setTitle('Tell us a bit about what you are looking for');
  }, []);

  function onNextClick() {
    router.push('/audience');
  }

  async function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    let useCaseId = localStorage.getItem('useCaseId');
    if (!useCaseId) {
      useCaseId = uuidv4();
      localStorage.setItem('useCaseId', useCaseId);
    }

    const value = e.target.value;
    if (value) {
      let response = await fetch('/api/create-use-case', {
        method: 'POST',
        body: JSON.stringify({
          use_case: value,
          id: useCaseId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      console.log(response);
    }
  }

  return (
    <Flex w="100%" justifyContent="center">
      <Flex flexFlow="column" w="100%" maxW="600px" mx={5}>
        <Heading color="gray.600" size="md" mb={10}>
          {title}
        </Heading>
        <Select placeholder="Select option" onChange={onChange}>
          <option value="create">Create a survey</option>
          <option value="get_responses">
            Get responses to an existing survey
          </option>
          <option value="else">Something Else</option>
        </Select>
        <Button mt={10} colorScheme="blue" onClick={onNextClick}>
          Next
        </Button>
      </Flex>
    </Flex>
  );
}

export default OnBoard;
