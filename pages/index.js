import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { PrismaClient } from "@prisma/client";

export async function getStaticProps() {
  const prisma = new PrismaClient();
  try {
    const postList = await prisma.post.findMany();
    postList.map((post) => (post.createdAt = post.createdAt.toISOString()));
    return {
      props: {
        postList,
      },
      revalidate: 2,
    };
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export default function Home({ postList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>next-prisma-crud-example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my{" "}
          <a href="https://nextjs.org">next-prisma-crud-example</a>
        </h1>

        <p className={styles.description}>
          Basic example with all CRUD operations against a PostgreSQL database!
        </p>

        <Link href="/new">
          <button>
            <a>New post</a>
          </button>
        </Link>

        <div className={styles.grid}>
          {postList.map((post) => (
            <Link href={`/p/${post.id}`} key={post.id}>
              <a className={styles.card}>
                <h3>{post.title} &rarr;</h3>
                <p>{post.content}</p>
              </a>
            </Link>
            // <div>xd</div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
