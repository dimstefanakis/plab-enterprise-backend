import { NextApiRequest, NextApiResponse } from 'next';
import { createUseCaseRecord, getUserProfile } from '@/utils/supabase-admin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      try {
        const data = await createUseCaseRecord(req.body.id, req.body.use_case);
        return res.status(200).json({ data });
      } catch (err: any) {
        throw Error(err.message);
      }
    } catch (err: any) {
      console.log(err);
      res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } });
    }
  }
}
