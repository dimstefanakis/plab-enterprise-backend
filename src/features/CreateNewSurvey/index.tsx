import { useRouter } from 'next/router';
import { Flex, Button, Text } from '@chakra-ui/react';
import useBuilderStore from '@/components/store/builderStore';

function CreateNewSurvey() {
  const router = useRouter();
  const reset = useBuilderStore((state) => state.reset);
  const setStatus = useBuilderStore((state) => state.setStatus);

  function handleCreateNewSurvey() {
    reset();
    setStatus('draft');
    router.push('/builder');
  }

  return (
    <Button colorScheme="blue" w="xs" h="xs" onClick={handleCreateNewSurvey}>
      Create New Survey
    </Button>
  );
}

export default CreateNewSurvey;
