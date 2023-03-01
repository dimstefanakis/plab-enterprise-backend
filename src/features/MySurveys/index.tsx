import { Flex } from '@chakra-ui/react';
import SurveyCard from '@/components/flat/SurveyCard';
import CreateNewSurvey from '../CreateNewSurvey';
import type { Database } from 'types_db';

interface MySurveysProps {
  surveys: Database['public']['Tables']['surveys']['Row'][];
}

function MySurveys({ surveys }: MySurveysProps) {
  return (
    <Flex flexFlow="row wrap">
      {surveys.map((survey) => (
        <SurveyCard key={survey.id} isCreated surveyData={survey} />
      ))}
      <CreateNewSurvey />
    </Flex>
  );
}

export default MySurveys;
