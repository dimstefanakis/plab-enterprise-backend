import { useEffect } from 'react';
import Pricing from 'src/Pricing';
import { useSupabaseClient, useSession, useUser as useSupaUser } from '@supabase/auth-helpers-react';
import { getActiveProductsWithPrices } from 'utils/supabase-client';
import { useUser } from '@/utils/useUser';
import { Product } from 'types';
import Audiences from '@/components/features/Audiences';
import AudienceCard from '@/components/flat/AudienceCard';
import { GetStaticPropsResult } from 'next';

interface Props {
  products: Product[];
}

export default function Audience() {
  const supabaseClient = useSupabaseClient();
  const user = useSupaUser();

  return <Audiences />;
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
