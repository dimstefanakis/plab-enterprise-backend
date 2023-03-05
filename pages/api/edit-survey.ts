import { withApiAuth } from '@supabase/auth-helpers-nextjs';
import { editSurveyRecord, getUserProfile } from '@/utils/supabase-admin';

export default withApiAuth(async function editSurvey(
  req,
  res,
  supabaseServerClient
) {
  if (req.method === 'POST') {
    try {
      const { data: user } = await supabaseServerClient.auth.getUser();
      if (!user) {
        throw Error('Could not get user');
      }
      const profile = await getUserProfile(user.user?.id || '');

      if (profile) {
        try {
          const data = await editSurveyRecord(
            req.body.survey,
            req.body.surveyId,
            profile
          );
          return res.status(200).json({ data });
        } catch (err: any) {
          throw Error(err.message);
        }
      } else {
        throw Error('Could not get user profile');
      }
    } catch (err: any) {
      console.log(err);
      res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } });
    }
  }
});
