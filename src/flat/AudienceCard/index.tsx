import { useRouter } from 'next/router';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Flex
} from '@chakra-ui/react';
import useBuilderStore from '@/components/store/builderStore';
import type { Database } from 'types_db';

function AudienceCard({
  audience
}: {
  audience: Database['public']['Tables']['audiences']['Row'];
}) {
  const router = useRouter();
  const setAudience = useBuilderStore((state) => state.setAudience);

  function onAudienceSelect() {
    setAudience(audience);
    router.push('/builder');
  }

  return (
    <Card maxW="xs" variant="elevated" mx={4}>
      <CardBody p={0}>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          borderBottomRadius={0}
        />
        <Stack mt="6" spacing="3" p={4}>
          <Heading size="md">United States Population</Heading>
          <Text>
            Direct access to a census balanced mix of 250k+ consumers in the US.
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <Flex w="100%">
          <Button
            variant="solid"
            colorScheme="black"
            w="100%"
            onClick={onAudienceSelect}
          >
            Select
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
}

export default AudienceCard;