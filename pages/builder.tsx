import { useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import Builder from '@/components/features/Builder';
import useHeaderStore from '@/components/store/headerStore';

export default function BuilderPage() {
  const title = useHeaderStore((state) => state.title);
  const setTitle = useHeaderStore((state) => state.setTitle);

  useEffect(() => {
    setTitle('Build your survey');
  }, []);

  return (
    <Flex ml="310px" flexFlow="column">
      <Heading size="md" color="gray.600" mb={10}>
        {title}
      </Heading>
      <Builder />
    </Flex>
  );
}
