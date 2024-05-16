import Head from "next/head";
import PostItem from "@/components/PostItem";
import styles from "@/styles/Home.module.scss";
import { getAllPosts } from "@/lib/post-util";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>个人博客</title>
        <meta name="description" content="个人博客网站" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <ul className="flex-column">
          {posts.map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
