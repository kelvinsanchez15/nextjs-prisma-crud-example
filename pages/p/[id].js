import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps({ params }) {
  const post = await prisma.post.findOne({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  post.createdAt = post.createdAt.toISOString();

  return {
    props: post,
  };

  // const feed = await prisma.post.findMany();
  // feed.map((post) => (post.createdAt = post.createdAt.toISOString()));

  // return {
  //   props: { feed },
  // };
}

export default function Post(post) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div key={post.id} className={styles.card}>
        <h3>{post.title} &rarr;</h3>
        <p>{post.content}</p>
        <p>By {post.author.name}</p>
      </div>
    </>
  );
}
