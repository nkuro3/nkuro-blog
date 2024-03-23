import { PostBody } from '@/app/components/post-body';
import { PostHeader } from '@/app/components/post-header';
import { getPostBySlug } from '@/app/lib/api';

type Params = {
  params: {
    slug: string;
  };
};

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  return (
    <article className="mb-32">
      <PostHeader title={post.title} cover={post.cover} date={post.date} />
      <PostBody content={post.content} />
    </article>
  );
}
