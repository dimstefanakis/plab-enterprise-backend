import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Flex, Text, Box, Button, HStack, useToast } from '@chakra-ui/react';
import AudienceCard from '@/components/flat/AudienceCard';
import SurveyCard from '@/components/flat/SurveyCard';
import useBuilderStore from '@/components/store/builderStore';

function PublishSurvey() {
  const router = useRouter();
  const { authStatus } = router.query;
  const toast = useToast();
  const data = useBuilderStore((state) => state.data);
  const user = useUser();

  async function publish() {
    if (!user && !authStatus) {
      router.push('/signin');
    }
    const surveyData = JSON.parse(localStorage.getItem('survey') || '{}');
    try {
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
        toast({
          title: 'Survey In Review',
          description: 'Your survey is in review and will be published soon.',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        localStorage.removeItem('survey');
      }
      console.log(json);
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

  return (
    <Flex flexFlow="column" w="100%">
      <Text
        fontSize="sm"
        fontWeight="bold"
        color="gray.500"
        textTransform="uppercase"
        letterSpacing="wide"
        mb={2}
      >
        Audience
      </Text>
      <HStack>
        {data.audience && <AudienceCard audience={data.audience} isEditing />}
        <SurveyCard />
        <Button h="100%" w="xs" onClick={publish}>
          Publish
        </Button>
      </HStack>
    </Flex>
  );
}

export default PublishSurvey;
