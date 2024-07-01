import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { customerName, starRating, comment } = req.body;
        try {
            const review = await prisma.review.create({
                data: {
                    customerName,
                    starRating,
                    comment,
                },
            });
            res.status(201).json(review);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating review' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
