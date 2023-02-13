import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import LoadingDots from '@/components/flat/LoadingDots';
import Logo from 'src/icons/Logo';
import { getURL } from '@/utils/helpers';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';

const SignIn = () => {
  const router = useRouter();
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (user) {
      router.replace('/publish?authStatus=success');
    }
  }, [user]);

  if (!user)
    return (
      <Flex w="100%" justifyContent="center">
        <div className="flex justify-center height-screen-helper">
          <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
            <div className="flex justify-center pb-12 ">
              <Logo width="64px" height="64px" />
            </div>
            <div className="flex flex-col space-y-4">
              <Auth
                supabaseClient={supabaseClient}
                providers={['google']}
                redirectTo={'http://localhost:3000/publish?authStatus=success'}
                magicLink={true}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#404040',
                        brandAccent: '#52525b'
                      }
                    }
                  }
                }}
                theme="light"
              />
            </div>
          </div>
        </div>
      </Flex>
    );

  return (
    <div className="m-6">
      <LoadingDots />
    </div>
  );
};

export default SignIn;
