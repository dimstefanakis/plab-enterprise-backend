import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import AudienceCard from '@/components/flat/AudienceCard';
import type { Database } from 'types_db';

function Audiences() {
  const [audiences, setAudiences] = useState<
    Database['public']['Tables']['audiences']['Row'][] | []
  >([]);

  useEffect(() => {
    fetch('/api/get-audiences')
      .then((res) => res.json())
      .then((data) => setAudiences(data));
  }, []);

  console.log(audiences);

  return (
    <Flex flexFlow="row wrap" w="100%" justifyContent="center">
      {audiences.map((audience) => (
        <AudienceCard key={audience.id} audience={audience} />
      ))}
    </Flex>
  );
}

export default Audiences;
