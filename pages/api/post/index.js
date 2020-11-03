import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST /api/post
// Required fields in body: email, title
// Optional fields in body: content
export default async function handler(req, res) {
  const { title, content, email } = req.body;
  try {
    if (!req.method === "POST") {
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
    }
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email } },
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
