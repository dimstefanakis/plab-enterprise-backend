import { useEffect, useState } from 'react';
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
import MySurveys from '@/components/features/MySurveys';
import CardLoader from '@/components/flat/SkeletonLoader/CardLoader';
import useHeaderStore from '@/components/store/headerStore';
import { GetStaticPropsResult } from 'next';
import type { Database } from 'types_db';

interface Props {
  audiences: Database['public']['Tables']['audiences']['Row'][];
}

export default function Home({ audiences }: Props) {
  const supabaseClient = useSupabaseClient();
  const { user, isLoading } = useUser();
  const [mySurveys, setMySurveys] = useState<
    Database['public']['Tables']['surveys']['Row'][]
  >([]);
  const title = useHeaderStore((state) => state.title);
  const setTitle = useHeaderStore((state) => state.setTitle);

  async function getMySurveys() {
    const data = await fetch('/api/get-my-surveys', {
      method: 'POST',
      body: JSON.stringify({
        user_id: user?.id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await data.json();
    setMySurveys(json);
  }

  useEffect(() => {
    if (user) {
      setTitle('My Surveys');
    } else {
      setTitle('Select Audience');
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getMySurveys();
    }
  }, [user]);

  return (
    <Flex w="100%" flexFlow="column">
      <Heading color="gray.600" size="md" mb={10}>
        {title}
      </Heading>
      {isLoading ? (
        <CardLoader />
      ) : user ? (
        <MySurveys surveys={mySurveys} />
      ) : (
        <Audiences audiences={audiences} />
      )}
    </Flex>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const data = await getAudiences();

  return {
    props: {
      audiences: data
    },
    revalidate: 60
  };
}
