import { NextApiRequest, NextApiResponse } from 'next';
import { retrieveMySurveys } from '@/utils/supabase-admin';

export default async function getAudiences(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body);
    const userId = req.body.user_id as string;
    console.log(userId);
    const data = await retrieveMySurveys(userId);

    res.status(200).json(data);
  } catch (err: any) {
    console.log(err);

    res.status(500).json({ error: { statusCode: 500, message: err.message } });

    return err;
  }
}
