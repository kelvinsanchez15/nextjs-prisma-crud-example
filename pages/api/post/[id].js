import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DELETE /api/post/:id
export default async function handle(req, res) {
  const postId = req.query.id;
  try {
    if (!req.method === "DELETE") {
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
    }
    const post = await prisma.post.delete({
      where: { id: Number(postId) },
    });
    res.json(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
