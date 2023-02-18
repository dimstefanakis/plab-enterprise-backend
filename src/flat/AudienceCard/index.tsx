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
  audience,
  isEditing
}: {
  audience: Database['public']['Tables']['audiences']['Row'];
  isEditing?: boolean;
}) {
  const router = useRouter();
  const setAudience = useBuilderStore((state) => state.setAudience);

  function onAudienceSelect() {
    setAudience(audience);
    if (isEditing) {
      router.push('/');
    } else {
      router.push('/builder');
    }
  }

  return (
    <Card maxW="xs" variant="elevated" mr={isEditing ? 0 : 4}>
      <CardBody p={0}>
        <Image
          src={audience.image_url || ''}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          borderBottomRadius={0}
        />
        <Stack mt="6" spacing="3" p={4}>
          <Heading size="md">{audience.name}</Heading>
          <Text>{audience.description}</Text>
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
            {isEditing ? 'Edit' : 'Select'}
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
}

export default AudienceCard;
