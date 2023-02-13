import { NextApiRequest, NextApiResponse } from 'next';
import { retrieveAudiences } from '@/utils/supabase-admin';

export default async function getAudiences(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await retrieveAudiences();

    res.status(200).json(data);
  } catch (err: any) {
    console.log(err);

    res.status(500).json({ error: { statusCode: 500, message: err.message } });

    return err;
  }
}
