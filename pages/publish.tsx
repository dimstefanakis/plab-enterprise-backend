import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {
  Flex,
  Text,
  Box,
  Button,
  HStack,
  Heading,
  useToast
} from '@chakra-ui/react';
import AudienceCard from '@/components/flat/AudienceCard';
import SurveyCard from '@/components/flat/SurveyCard';
import useBuilderStore from '@/components/store/builderStore';
import useHeaderStore from '@/components/store/headerStore';

function PublishSurvey() {
  const router = useRouter();
  const { authStatus } = router.query;
  const toast = useToast();
  const data = useBuilderStore((state) => state.data);
  const title = useHeaderStore((state) => state.title);
  const setTitle = useHeaderStore((state) => state.setTitle);
  const user = useUser();

  async function publish() {
    if (!user && !authStatus) {
      router.push('/signin');
    }
    const surveyData = JSON.parse(localStorage.getItem('survey') || '{}');
    try {
      if (user) {
        toast({
          title: 'Publishing Survey',
          description: 'Your survey is being published.',
          status: 'info',
          duration: 5000,
          isClosable: true
        });
      }
      const res = await fetch('/api/publish-survey', {
        method: 'POST',
        body: JSON.stringify({
          survey: surveyData
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await res.json();
      if (res.status === 200) {
        // toast({
        //   title: 'Survey In Review',
        //   description: 'Your survey is in review and will be published soon.',
        //   status: 'success',
        //   duration: 5000,
        //   isClosable: true
        // });
        router.push('/success');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'There was an error publishing your survey.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      console.log(err);
    }
  }

  useEffect(() => {
    if (authStatus === 'success') {
      publish();
    }
  }, [authStatus, user]);

  useEffect(() => {
    setTitle('Publish Survey');
  }, []);

  useEffect(() => {
    if (data && !data.audience) {
      router.push('/audience');
    }
  }, [data]);

  return (
    <Flex flexFlow="column" w="100%">
      <Heading size="md" color="gray.600" mb={10}>
        {title}
      </Heading>
      <HStack>
        {data.audience && <AudienceCard audience={data.audience} isEditing />}
        <SurveyCard />
        <Button h="100%" colorScheme="blue" w="xs" onClick={publish}>
          Publish
        </Button>
      </HStack>
    </Flex>
  );
}

export default PublishSurvey;
