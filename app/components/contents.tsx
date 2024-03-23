import { PostPreview } from './post-preview';

export type PostPreview = {
  slug: string;
  title: string;
  date: string;
  cover: string;
};

type Props = {
  posts: PostPreview[];
};

export function Contents({ posts }: Props) {
  return (
    <section>
      <div className="grid grid-cols-3 gap-10">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            slug={post.slug}
            title={post.title}
            date={post.date}
            cover={post.cover}
          />
        ))}
      </div>
    </section>
  );
}
