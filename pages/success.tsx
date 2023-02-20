import { useEffect } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex
} from '@chakra-ui/react';
import useBuilderStore from '@/components/store/builderStore';

export default function Success() {
  const reset = useBuilderStore((state) => state.reset);

  useEffect(() => {
    localStorage.removeItem('survey');
    reset();
  }, []);

  return (
    <Flex w="100%" align="center" justify="center" h="100vh" pb="100px">
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Success!
        </AlertTitle>
        <AlertDescription maxWidth="md">
          Your survey has been created and is now in review. You will receive an
          email when it is published.
        </AlertDescription>
      </Alert>
    </Flex>
  );
}
