import Image from "next/image";
import Link from "next/link";
import * as styles from "./index.module.scss";

const PostItem = ({ post }) => {
    const { title, slug, image, date, excerpt } = post;
    const imagePath = `/images/${image}`;
    const linkPath = `/posts/${slug}`;
    return (
        <li className={styles.contaienr}>
            <Link href={linkPath}>
                <div className={styles.image}>
                    <Image src={imagePath} alt={title} width={480} height={250} loading="lazy"/>
                </div>
                <div className={styles.content}>
                    <h2>{title}</h2>
                    <time>Posted: {date}</time>
                    <p>{excerpt}</p>
                </div>
            </Link>
        </li>
    );
}

export default PostItem;