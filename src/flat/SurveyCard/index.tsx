import { useRouter } from 'next/router';
import { Flex, Text, Button } from '@chakra-ui/react';
import useBuilderStore from '@/components/store/builderStore';
import type { Database } from 'types_db';

interface SurveyCardProps {
  surveyData?: Database['public']['Tables']['surveys']['Row'];
  isCreated?: boolean;
}

function SurveyCard({ surveyData, isCreated = false }: SurveyCardProps = {}) {
  const router = useRouter();
  const data = useBuilderStore((state) => state.data);
  const setData = useBuilderStore((state) => state.setData);
  const parsedData = JSON.parse(JSON.stringify(surveyData?.data) || '{}');
  const setSurveyId = useBuilderStore((state) => state.setSurveyId);

  function onEdit() {
    if (surveyData) {
      setSurveyId(surveyData.id);
      setData(surveyData.data);
    }
    router.push('/builder');
  }

  return (
    <Flex
      flexFlow="column"
      h="100%"
      w="xs"
      boxShadow="var(--chakra-shadows-base)"
      borderRadius="md"
      mr={isCreated ? 2 : 0}
      p={5}
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        color="gray.800"
        textTransform="uppercase"
        letterSpacing="wide"
        mb={10}
      >
        {isCreated ? surveyData?.name : data.surveyName}
      </Text>
      <Text
        fontSize="sm"
        fontWeight="bold"
        color="gray.500"
        textTransform="uppercase"
        letterSpacing="wide"
        mb={2}
      >
        {isCreated ? parsedData.pages.length : data.pages.length} questions
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
        {isCreated ? parsedData.responsesNeeded : data.responsesNeeded}{' '}
        responses needed
      </Text>
      {isCreated && (
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="gray.700"
          letterSpacing="wide"
          mb={2}
        >
          Status: {surveyData?.status}
        </Text>
      )}
      <Button variant="solid" colorScheme="black" onClick={onEdit}>
        Edit
      </Button>
    </Flex>
  );
}

export default SurveyCard;
