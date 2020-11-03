import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const postId = req.query.id;
  switch (req.method) {
    case "PUT":
      const { title, content } = req.body;
      const updates = { ...(title && { title }), ...(content && { content }) };
      try {
        const post = await prisma.post.update({
          where: { id: Number(postId) },
          data: updates,
        });
        res.json(post);
      } catch (error) {
        res.status(400).send(error.message);
      }
      break;
    case "DELETE":
      try {
        const post = await prisma.post.delete({
          where: { id: Number(postId) },
        });
        res.json(post);
      } catch (error) {
        res.status(400).send(error.message);
      }
      break;
    default:
      res
        .status(405)
        .send(`The HTTP ${req.method} method is not supported at this route.`);
      break;
  }
}
