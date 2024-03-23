import { getAllPosts } from './lib/api';
import { Contents } from '@/app/components/contents';

export default function Home() {
  const posts = getAllPosts();

  return <>{posts.length > 0 && <Contents posts={posts} />}</>;
}
