import { getPostData, getPostFiles } from "@/lib/post-util"
import Head from "next/head"
import Image from "next/image"
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import * as styles from '@/styles/post.module.scss';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

const PostDetailPage = ({ post }) => {
    const { title, excerpt, content, image, date } = post
    const imageSrc = `/images/${image}`
    const customRenderers = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
                <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            )
        },
    };
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={excerpt} />
            </Head>
            <article className={styles.article}>
                <header className={styles.header}>
                    <h1>{title}</h1>
                    <time>Posted: {date}</time>
                    <Image src={imageSrc} alt={title} width={460} height={220} />
                </header>
                <ReactMarkdown components={customRenderers} className={styles.markdown}>{content}</ReactMarkdown>
            </article>
        </>
    )
}

export function getStaticProps({ params }) {
    const { slug } = params
    const post = getPostData(slug)
    return {
        props: {
            post,
        },
    }
}

export function getStaticPaths() {
    const files = getPostFiles()
    const slugs = files.map(file => file.replace(/\.md$/, ''))
    return {
        paths: slugs.map(slug => ({ params: { slug } })),
        fallback: false,
    }
}

export default PostDetailPage