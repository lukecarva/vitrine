export default function Loading() {
  return (
    <>
      <section className="hero">
        <h1>
          Selected <em>work</em>, served headless.
        </h1>
        <p className="lead">Loading projects…</p>
      </section>

      <div className="section-head" id="projects">
        <h2>Projects</h2>
      </div>

      <section className="grid" aria-hidden="true">
        {['a', 'b', 'c', 'd'].map((key) => (
          <div key={key} className="skeleton-card" />
        ))}
      </section>
    </>
  );
}
