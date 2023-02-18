import { useEffect } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import Pricing from 'src/Pricing';
import {
  useSupabaseClient,
  useSession,
  useUser as useSupaUser
} from '@supabase/auth-helpers-react';
import { getActiveProductsWithPrices } from 'utils/supabase-client';
import { useUser } from '@/utils/useUser';
import { Product } from 'types';
import Audiences from '@/components/features/Audiences';
import AudienceCard from '@/components/flat/AudienceCard';
import useHeaderStore from '@/components/store/headerStore';
import { GetStaticPropsResult } from 'next';

interface Props {
  products: Product[];
}

export default function Audience() {
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
      <Audiences />
    </Flex>
  );
}

// export default function PricingPage({ products }: Props) {
//   return <Pricing products={products} />;
// }

// export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
//   const products = await getActiveProductsWithPrices();

//   return {
//     props: {
//       products
//     },
//     revalidate: 60
//   };
// }
