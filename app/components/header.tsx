import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b mb-10">
      <h2 className="px-40 py-10">
        <Link href="/">nkuro blog</Link>
      </h2>
    </header>
  );
};

export default Header;
