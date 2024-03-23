import Image from 'next/image';
import Link from 'next/link';

type Props = {
  slug: string;
  title: string;
  date: string;
  cover: string;
};

export function PostPreview({ slug, title, date, cover }: Props) {
  return (
    <div>
      <Link href={`/posts/${slug}`}>
        <Image src={`/${cover}`} width={1200} height={700} alt="No Image" />
        <h3 className="text-2xl">{title}</h3>
        {date}
      </Link>
    </div>
  );
}
