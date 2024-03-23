import Image from 'next/image';

type Props = {
  title: string;
  cover: string;
  date: string;
};

export function PostHeader({ title, cover, date }: Props) {
  return (
    <>
      <div className="my-10">
        <h1>{title}</h1>
        <div className="text-right">{date}</div>
      </div>
      <div className="mx-40 mb-20">
        <Image src={`/${cover}`} width={1200} height={700} alt="No Image" />
      </div>
    </>
  );
}
