import { useRouter } from 'next/router';
import { Button, Flex, Text, Link, Input } from '@chakra-ui/react';
import useBuilderStore from '@/components/store/builderStore';

function SurveyName() {
  const router = useRouter();
  const surveyName = useBuilderStore((state) => state.data.surveyName);
  const setSurveyName = useBuilderStore((state) => state.setName);

  const responsesNeeded = useBuilderStore(
    (state) => state.data.responsesNeeded
  );
  const setResponsesNeeded = useBuilderStore(
    (state) => state.setResponsesNeeded
  );

  function onNextClick() {
    router.push('/publish');
  }

  return (
    <Flex flexFlow="column" w="100%">
      <Text
        fontSize="sm"
        fontWeight="bold"
        color="gray.500"
        textTransform="uppercase"
        letterSpacing="wide"
        mb={2}
      >
        Give your survey a name to publish it
      </Text>
      <Input
        placeholder="Enter survey name"
        value={surveyName}
        onChange={(e) => setSurveyName(e.target.value)}
      />
      <Text
        fontSize="sm"
        fontWeight="bold"
        color="gray.500"
        textTransform="uppercase"
        letterSpacing="wide"
        mb={2}
        mt={10}
      >
        Responses needed
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
