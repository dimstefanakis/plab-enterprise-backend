import { Flex } from '@chakra-ui/react';
import SurveyCard from '@/components/flat/SurveyCard';
import CreateNewSurvey from '../CreateNewSurvey';
import useBuilderStore from '@/components/store/builderStore';
import type { Database } from 'types_db';

interface MySurveysProps {
  surveys: Database['public']['Tables']['surveys']['Row'][];
}

function MySurveys({ surveys }: MySurveysProps) {
  const data = useBuilderStore((state) => state.data);

  return (
    <Flex flexFlow="row wrap">
      {surveys.map((survey) => (
        <SurveyCard key={survey.id} isCreated surveyData={survey} />
      ))}
      {data && <SurveyCard isCreated={false} surveyData={data} />}
      <CreateNewSurvey />
    </Flex>
  );
}

export default MySurveys;
