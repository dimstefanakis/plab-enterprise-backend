import { useRouter } from 'next/router';
import { Flex, Text, Button } from '@chakra-ui/react';
import useBuilderStore from '@/components/store/builderStore';

function SurveyCard() {
  const router = useRouter();
  const data = useBuilderStore((state) => state.data);

  function onEdit() {
    router.push('/builder');
  }

  return (
    <Flex
      flexFlow="column"
      h="100%"
      w="xs"
      boxShadow="var(--chakra-shadows-base)"
      borderRadius="md"
      p={5}
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        color="gray.800"
        textTransform="uppercase"
        letterSpacing="wide"
        mb={2}
      >
        {data.surveyName}
      </Text>
      <Text
        fontSize="sm"
        fontWeight="bold"
        color="gray.500"
        textTransform="uppercase"
        letterSpacing="wide"
        mb={2}
      >
        {data.pages.length} questions
      </Text>
      <Text
        fontSize="sm"
        fontWeight="bold"
        color="gray.500"
        textTransform="uppercase"
        letterSpacing="wide"
        mb={2}
        flex="1"
      >
        {data.responsesNeeded} responses needed
      </Text>
      <Button colorScheme="blue" onClick={onEdit}>
        Edit
      </Button>
    </Flex>
  );
}

export default SurveyCard;
