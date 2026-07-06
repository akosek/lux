<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  type Category = "All" | "Performance" | "Costume Design";

  let allProjects = $derived(data.projects);

  let activeFilter = $state<Category>("All");
  const categories: Category[] = ["All", "Performance", "Costume Design"];

  let filtered = $derived(
    activeFilter === "All"
      ? allProjects
      : allProjects.filter((project) => project.category === activeFilter),
  );
</script>

<svelte:head>
  <title>Work — Lux</title>
  <meta
    name="description"
    content="Selected works by Lux across dance, performance and costume design."
  />
</svelte:head>

<section class="page-hero container">
  <p class="page-hero__label">Work</p>
  <h1 class="page-hero__title">Selected projects</h1>
</section>

<section class="projects container">
  <!-- Filter bar -->
  <nav class="filter-bar" aria-label="Filter projects by category">
    {#each categories as cat}
      <button
        class="filter-btn"
        class:active={activeFilter === cat}
        onclick={() => (activeFilter = cat)}
      >
        {cat}
      </button>
    {/each}
  </nav>

  <!-- Grid -->
  <ul class="projects__grid" role="list">
    {#each filtered as project (project.slug)}
      <li>
        <a
          class="project-card project-card--link"
          href={`/work/${project.slug}`}
        >
          <div class="project-card__media">
            <img
              class="project-card__image"
              src={project.coverImage}
              alt={project.title}
              loading="lazy"
            />
            {#if project.galleryImages.length > 1}
              <div class="project-card__thumbs">
                {#each project.galleryImages.slice(1, 3) as thumb}
                  <img
                    class="project-card__thumb"
                    src={thumb}
                    alt=""
                    loading="lazy"
                  />
                {/each}
              </div>
            {/if}
          </div>
          <div class="project-card__info">
            <div class="project-card__meta">
              <span class="project-card__category">{project.category}</span>
              <span class="project-card__year">{project.year}</span>
            </div>
            <h2 class="project-card__title">{project.title}</h2>
            <p class="project-card__desc">{project.description}</p>
          </div>
        </a>
      </li>
    {/each}
  </ul>

  {#if filtered.length === 0}
    <p class="projects__empty">No projects found in this category yet.</p>
  {/if}
</section>

<style>
  .page-hero {
    padding-top: calc(var(--nav-height) + var(--space-xl));
    padding-bottom: var(--space-xl);
    border-bottom: 1px solid var(--color-border);
  }

  .page-hero__label {
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin-bottom: var(--space-sm);
  }

  .page-hero__title {
    font-size: clamp(3rem, 8vw, 7rem);
    font-weight: 300;
    color: var(--color-text);
  }

  .projects {
    padding-block: var(--space-xl);
  }

  /* ── Filter ────────────────────────────────────────── */
  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin-bottom: var(--space-xl);
  }

  .filter-btn {
    padding: 0.4rem 1.2rem;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    background: none;
    border: 1px solid var(--color-border);
    color: var(--color-muted);
    cursor: pointer;
    transition:
      border-color 0.2s,
      color 0.2s;
  }

  .filter-btn:hover,
  .filter-btn.active {
    border-color: var(--color-accent);
    color: var(--color-text);
  }

  /* ── Grid ──────────────────────────────────────────── */
  .projects__grid {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-lg);
  }

  .project-card__image {
    aspect-ratio: 4 / 3;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    width: 100%;
    object-fit: cover;
    display: block;
    transition: border-color 0.3s;
    margin-bottom: var(--space-sm);
  }

  .project-card__thumbs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: var(--space-sm);
  }

  .project-card__thumb {
    aspect-ratio: 4 / 3;
    width: 100%;
    object-fit: cover;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    display: block;
  }

  .project-card--link {
    color: inherit;
    text-decoration: none;
    display: block;
  }

  .project-card:hover .project-card__image {
    border-color: var(--color-accent);
  }

  .project-card__meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin-bottom: var(--space-xs);
  }

  .project-card__title {
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--color-text);
    margin-bottom: var(--space-xs);
  }

  .project-card__desc {
    font-size: 0.85rem;
    color: var(--color-muted);
  }

  .projects__empty {
    margin-top: var(--space-lg);
    color: var(--color-muted);
    font-size: 0.9rem;
  }
</style>
