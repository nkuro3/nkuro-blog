import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <h2 className="mb-20">404 | Not Found</h2>
      <Link href="/" className="hover:underline">
        Return Home
      </Link>
    </>
  );
}
