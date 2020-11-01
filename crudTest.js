// File to test CRUD operations directly on the prisma client
require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create user
  // const newUser = await prisma.user.create({
  //   data: {
  //     email: "test@test.com",
  //     name: "test",
  //   },
  // });
  // console.log(newUser);
  //
  // Create post (connecting to specific user by email or id)
  // const newPost = await prisma.post.create({
  //   data: {
  //     title: "Best post ever2!",
  //     author: {
  //       connect: { email: "test@test.com" },
  //     },
  //   },
  // });
  // console.log(newPost);
  //
  // Read all users
  // const allUsers = await prisma.user.findMany();
  // console.log(allUsers);
  //
  // Read user by email
  // const user = await prisma.user.findOne({
  //   where: {
  //     email: "test@test.com",
  //   },
  // });
  // console.log(user);
  //
  // Read user by email and include posts
  // const user = await prisma.user.findOne({
  //   where: {
  //     email: "test@test.com",
  //   },
  //   include: { posts: true },
  // });
  // console.log(user);
  //
  // Read posts of specific user
  // const posts = await prisma.user
  //   .findOne({
  //     where: {
  //       email: "test@test.com",
  //     },
  //   })
  //   .posts();
  // console.log(posts);
  //
  // Update user
  // const updatedUser = await prisma.user.update({
  //   where: {
  //     email: "test@test.com",
  //   },
  //   data: {
  //     name: "newName",
  //   },
  // });
  // console.log(updatedUser);
  //
  // Delete user
  // const deletedUser = await prisma.user.delete({
  //   where: {
  //     email: "kelvin@prisma.io",
  //   },
  // });
  // console.log(deletedUser);
  //
  // Delete post
  // const deletedPost = prisma.post.delete({
  //   where: { id: 1 },
  // });
  // console.log(deletedPost);
  //
  await prisma.user.deleteMany({});

  await prisma.user.create({
    data: {
      name: "Kelvin",
      email: "kelvin@prisma.io",
      posts: {
        create: [
          {
            title: "a title",
            content: "a content",
          },
          {
            title: "another title",
            content: "another content",
          },
          {
            title: "last title",
            content: "last content",
          },
        ],
      },
    },
  });

  const user = await prisma.user.findOne({
    where: { email: "kelvin@prisma.io" },
    include: {
      posts: true,
    },
  });
  console.dir(user, { depth: null });

  console.log(user.posts);

  // Create comments
  const comment = await prisma.comment.create({
    data: {
      content: "this is a comment",
      author: {
        connect: {
          email: "kelvin@prisma.io",
        },
      },
      post: {
        connect: { id: user.posts[0].id },
      },
    },
  });

  console.log(comment);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
