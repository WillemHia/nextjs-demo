import Link from 'next/link';
import * as styles from './index.module.scss';
import Image from 'next/image';
export default function Layout({ children }) {
    return (
        <>
            <div className={[styles.container, 'flex-jc-pb', 'flex-ai-c'].join(' ')}>
                <Link href='/'><h1>Blogs.</h1></Link>
                <a href='https://github.com/WillemHia' target='_blank' className='flex-ai-c'>
                    <sapn>My</sapn>
                    <Image src="/github.svg" alt="logo" width={32} height={32} />
                </a>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </>
    )
}