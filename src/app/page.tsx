export default function Home() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">
        The Future of Minimal Blogging
      </h1>
      <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto mb-8">
        A clean, fast, and secure platform for your thoughts. Built with Next.js and passion.
      </p>
      <div className="flex gap-4 justify-center">
        <a href="/login" className="btn btn-primary px-8 py-3">Get Started</a>
        <a href="/about" className="btn bg-[var(--border)] text-[var(--foreground)] px-8 py-3 hover:bg-[var(--muted)] hover:text-white">Learn More</a>
      </div>
    </div>
  )
}