import { Button } from '@chakra-ui/react';
import useBuilderStore from '@/components/store/builderStore';

function AddQuestion() {
  const addQuestion = useBuilderStore((state) => state.addPage);

  return (
    <Button w="100%" variant="outline" onClick={addQuestion}>
      Add Another Question
    </Button>
  );
}

export default AddQuestion;
