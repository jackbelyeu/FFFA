// api/rsvp.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { team },
  } = req;

  res.status(200).json({ team });
}
