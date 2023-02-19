import { useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import Pricing from 'src/Pricing';
import {
  useSupabaseClient,
  useSession,
  useUser as useSupaUser
} from '@supabase/auth-helpers-react';
import {
  getActiveProductsWithPrices,
  getAudiences
} from 'utils/supabase-client';
import { useUser } from '@/utils/useUser';
import { Product } from 'types';
import Audiences from '@/components/features/Audiences';
import AudienceCard from '@/components/flat/AudienceCard';
import useHeaderStore from '@/components/store/headerStore';
import { GetStaticPropsResult } from 'next';
import type { Database } from 'types_db';

interface Props {
  audiences: Database['public']['Tables']['audiences']['Row'][];
}

export default function Audience({audiences}: Props) {
  const supabaseClient = useSupabaseClient();
  const user = useSupaUser();
  const title = useHeaderStore((state) => state.title);
  const setTitle = useHeaderStore((state) => state.setTitle);

  useEffect(() => {
    setTitle('Select Audience');
  }, []);

  return (
    <Flex w="100%" flexFlow="column">
      <Heading color="gray.600" size="md" mb={10}>
        {title}
      </Heading>
      <Audiences audiences={audiences} />
    </Flex>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const data = await getAudiences()
  
  return {
    props: {
      audiences: data
    },
    revalidate: 60
  };
}
