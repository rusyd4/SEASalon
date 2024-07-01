import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, phone, service, dateTime } = req.body;
    const newReservation = await prisma.reservation.create({
      data: {
        name,
        phone,
        service,
        dateTime: new Date(dateTime),
      },
    });
    res.json(newReservation);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
