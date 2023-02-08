import { useEffect } from 'react';
import Pricing from 'src/Pricing';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { getActiveProductsWithPrices } from 'utils/supabase-client';
import { Product } from 'types';
import AudienceCard from '@/components/flat/AudienceCard';
import { GetStaticPropsResult } from 'next';

interface Props {
  products: Product[];
}

export default function Audience() {
  const supabaseClient = useSupabaseClient();

  return <AudienceCard />;
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
