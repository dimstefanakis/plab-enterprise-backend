import 'styles/main.css';
import 'styles/chrome-bug.css';
import { useEffect, useState } from 'react';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

import Layout from '@/components/flat/Layout';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { AppProps } from 'next/app';
import { MyUserContextProvider } from 'utils/useUser';
import useBuilderStore from '@/components/store/builderStore';
import type { Database } from 'types_db';

const theme = extendTheme({
  colors: {
    black: {
      50: '#171923',
      100: '#171923',
      200: '#171923',
      300: '#171923',
      400: '#171923',
      500: 'black'
    }
  }
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );
  const data = useBuilderStore((state) => state.data);
  const setData = useBuilderStore((state) => state.setData);

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem('survey');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MyUserContextProvider>
      </SessionContextProvider>
    </ChakraProvider>
  );
}
