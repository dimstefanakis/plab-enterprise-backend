import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Flex, Text, Link, Input, Heading, useToast } from '@chakra-ui/react';
import useBuilderStore from '@/components/store/builderStore';
import useHeaderStore from '@/components/store/headerStore';

function SurveyName() {
  const toast = useToast();
  const router = useRouter();
  const surveyName = useBuilderStore((state) => state.data.surveyName);
  const setSurveyName = useBuilderStore((state) => state.setName);
  const title = useHeaderStore((state) => state.title);
  const setTitle = useHeaderStore((state) => state.setTitle);

  const responsesNeeded = useBuilderStore(
    (state) => state.data.responsesNeeded
  );
  const setResponsesNeeded = useBuilderStore(
    (state) => state.setResponsesNeeded
  );

  function onNextClick() {
    if (!surveyName) {
      toast({
        title: 'Survey name is required',
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true
      });
      return;
    }
    if (!responsesNeeded || responsesNeeded == 0) {
      toast({
        title: 'Responses is required and must be greater than 0',
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true
      });
      return;
    }
    router.push('/publish');
  }

  useEffect(() => {
    setTitle('What is your survey name?');
  }, []);

  return (
    <Flex flexFlow="column" w="100%">
      <Heading size="md" color="gray.600" mb={10}>
        {title}
      </Heading>
      <Input
        placeholder="Enter survey name"
        value={surveyName}
        onChange={(e) => setSurveyName(e.target.value)}
      />
      <Text
        fontSize="sm"
        fontWeight="bold"
        color="gray.500"
        letterSpacing="wide"
        mb={2}
        mt={10}
      >
        How many responses do you need?
      </Text>
      <Input
        placeholder="100"
        value={responsesNeeded}
        onChange={(e) => setResponsesNeeded(parseInt(e.target.value) || 0)}
      />
      <Button mt={10} colorScheme="blue" onClick={onNextClick}>
        Next
      </Button>
    </Flex>
  );
}

export default SurveyName;
