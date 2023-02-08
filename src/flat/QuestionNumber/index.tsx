import { Text } from '@chakra-ui/react';
import useBuilderStore from '@/components/store/builderStore';

function QuestionNumber() {
  const questionNumber = useBuilderStore((state) => state.currentPage);
  return (
    <Text
        fontSize="sm"
        fontWeight="bold"
        color="gray.500"
        textTransform="uppercase"
        letterSpacing="wide"
        mb={2}
        >
        Q{questionNumber + 1}
    </Text>
  )
}

export default QuestionNumber;
