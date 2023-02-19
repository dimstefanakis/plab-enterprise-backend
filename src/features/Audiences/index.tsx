import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import AudienceCard from '@/components/flat/AudienceCard';
import type { Database } from 'types_db';

interface Props {
  audiences: Database['public']['Tables']['audiences']['Row'][];
}

function Audiences({ audiences }: Props) {
  return (
    <Flex flexFlow="row wrap" w="100%">
      {audiences.map((audience) => (
        <AudienceCard key={audience.id} audience={audience} />
      ))}
    </Flex>
  );
}

export default Audiences;
