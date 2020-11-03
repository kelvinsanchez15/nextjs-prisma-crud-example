import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import { PrismaClient } from "@prisma/client";

export async function getStaticPaths() {
  const prisma = new PrismaClient();
  try {
    const postList = await prisma.post.findMany();
    const paths = postList.map((post) => ({
      params: {
        id: post.id.toString(),
      },
    }));
    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient();
  let post = null;
  try {
    post = await prisma.post.findOne({
      where: {
        id: Number(params?.id) || -1,
      },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });
    if (post) {
      post.createdAt = post.createdAt.toISOString();
    }
    return {
      props: {
        post,
      },
      revalidate: 2,
    };
  } catch (error) {
    if (error.status !== 404) {
      console.log(error);
      throw error;
    }
  } finally {
    await prisma.$disconnect();
  }
}

export default function Post({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>loading...</div>;
  }

  if (!post) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <div>404 - Page not found!</div>
      </>
    );
  }

  async function deletePost(id) {
    await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });
    router.push("/");
  }

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
        <button onClick={() => deletePost(post.id)}>Delete</button>
      </div>
    </>
  );
}
