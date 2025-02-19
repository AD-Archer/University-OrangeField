export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-600">
          © {new Date().getFullYear()} <a href="/about">Orange Field University</a>. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 