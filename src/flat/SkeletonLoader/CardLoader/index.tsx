import { Skeleton, SkeletonText, Flex } from '@chakra-ui/react';

function CardLoader() {
  return (
    <Flex flexFlow="row wrap">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} w="xs" h="300px" borderRadius="md" mr={2} mt={2}>
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Skeleton>
      ))}
    </Flex>
  );
}

export default CardLoader;
