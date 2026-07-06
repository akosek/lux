<script lang="ts">
  const media = (path: string) => encodeURI(path);

  const disciplines = [
    {
      icon: "◌",
      title: "Dance & Movement",
      description:
        "Contemporary, somatic, and improvisational practices exploring the full range of the body in space.",
    },
    {
      icon: "◎",
      title: "Performance",
      description:
        "Site-specific, theatrical, and collaborative works that blur the boundary between performer and spectator.",
    },
    {
      icon: "◈",
      title: "Costume Design",
      description:
        "Garments conceived as dramaturgy — constructed to move, transform, and tell stories on and off stage.",
    },
  ];

  const featuredWork = [
    {
      title: "Gewebe",
      category: "Performance",
      image: media(
        "/media/images/performance/project_GEWEBE/main_Joana Racaan.jpg",
      ),
    },
    {
      title: "Human Nature",
      category: "Performance",
      image: media(
        "/media/images/performance/project_Human Nature/main_241022-W.T.TS0110_Baldemar Bottini.jpg",
      ),
    },
    {
      title: "Mushroom Tales",
      category: "Performance",
      image: media(
        "/media/images/performance/project_Mushroom Tales/mainMUSHROOM_TALES-47.png",
      ),
    },
  ];

  const homeGalleryImages = [
    media("/media/images/PBDI6018_comp_Baldemar Bottini.jpg"),
    media("/media/images/PBDI6075_comp_Baldemar Bottini.jpg"),
    media("/media/images/PBDI6089_comp_Baldemar Bottini.jpg"),
    media("/media/images/PBDI6105_comp_Baldemar Bottini.jpg"),
    media("/media/images/PBDI6134_comp_Baldemar Bottini.jpg"),
    media("/media/images/PBDI6137_comp_Baldemar Bottini.jpg"),
  ];

  let lightboxOpen = $state(false);
  let activeImageIndex = $state(0);

  function openLightbox(index: number) {
    activeImageIndex = index;
    lightboxOpen = true;
  }

  function closeLightbox() {
    lightboxOpen = false;
  }

  function nextImage() {
    activeImageIndex = (activeImageIndex + 1) % homeGalleryImages.length;
  }

  function prevImage() {
    activeImageIndex =
      (activeImageIndex - 1 + homeGalleryImages.length) %
      homeGalleryImages.length;
  }

  function onWindowKeydown(event: KeyboardEvent) {
    if (!lightboxOpen) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") nextImage();
    if (event.key === "ArrowLeft") prevImage();
  }
</script>

<svelte:window onkeydown={onWindowKeydown} />

<svelte:head>
  <title>Lux Ulonska — Dancer, Mover, Performer, Costume Designer</title>
  <meta
    name="description"
    content="Portfolio of Lux Ulonska, a multidisciplinary artist working across dance, movement, performance and costume design."
  />
</svelte:head>

<!-- ── Hero ─────────────────────────────────────────── -->
<section class="hero">
  <div class="hero__content">
    <p class="hero__pre">Multidisciplinary Artist</p>
    <h1 class="hero__name">Lux Ulonska</h1>
    <p class="hero__roles">
      <span>Dancer</span>
      <span aria-hidden="true">/</span>
      <span>Mover</span>
      <span aria-hidden="true">/</span>
      <span>Performer</span>
      <span aria-hidden="true">/</span>
      <span>Costume&nbsp;Designer</span>
    </p>
    <a href="/work" class="btn">View Work</a>
  </div>

  <div class="hero__backdrop" aria-hidden="true"></div>
</section>

<!-- ── Brief intro ───────────────────────────────────── -->
<section class="intro container">
  <div class="intro__grid">
    <div class="intro__text">
      <h2 class="intro__heading">
        Body as medium, <br /><em>movement as language</em>
      </h2>
      <p>
        Lux Ulonska is a multidisciplinary artist whose practice sits at the
        intersection of contemporary dance, physical theatre, and wearable art.
        Through the body — and the garments that dress it — stories are told
        without words.
      </p>
      <a href="/about" class="link-arrow">Read more about Lux Ulonska →</a>
    </div>

    <div class="intro__disciplines">
      {#each disciplines as d}
        <article class="discipline-card">
          <span class="discipline-card__icon" aria-hidden="true">{d.icon}</span>
          <h3>{d.title}</h3>
          <p>{d.description}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- ── Featured Work teaser ──────────────────────────── -->
<section class="featured container">
  <h2 class="section-label">Selected Work</h2>
  <div class="featured__grid">
    {#each featuredWork as item}
      <a href="/work" class="work-card">
        <div class="work-card__image-frame">
          <img
            class="work-card__image"
            src={item.image}
            alt={item.title}
            loading="lazy"
          />
        </div>
        <div class="work-card__info">
          <span class="work-card__category">{item.category}</span>
          <h3 class="work-card__title">{item.title}</h3>
        </div>
      </a>
    {/each}
  </div>
  <div class="featured__cta">
    <a href="/work" class="btn btn--outline">All Projects</a>
  </div>
</section>

<section class="home-gallery container">
  <h2 class="section-label">Photographs</h2>
  <div class="home-gallery__grid">
    {#each homeGalleryImages as image, i}
      <button
        class="home-gallery__item"
        class:large={i === 0 || i === 3}
        onclick={() => openLightbox(i)}
        aria-label={`Open photograph ${i + 1}`}
      >
        <img src={image} alt={`Portfolio photograph ${i + 1}`} loading="lazy" />
      </button>
    {/each}
  </div>
</section>

{#if lightboxOpen}
  <div
    class="lightbox"
    role="dialog"
    aria-modal="true"
    aria-label="Photo viewer"
  >
    <button
      class="lightbox__close"
      onclick={closeLightbox}
      aria-label="Close photo viewer">✕</button
    >

    <button
      class="lightbox__nav lightbox__nav--prev"
      onclick={prevImage}
      aria-label="Previous image"
    >
      &#10094;
    </button>

    <figure class="lightbox__figure">
      <img
        src={homeGalleryImages[activeImageIndex]}
        alt={`Portfolio photograph ${activeImageIndex + 1}`}
        class="lightbox__image"
      />
      <figcaption class="lightbox__caption">
        {activeImageIndex + 1} / {homeGalleryImages.length}
      </figcaption>
    </figure>

    <button
      class="lightbox__nav lightbox__nav--next"
      onclick={nextImage}
      aria-label="Next image"
    >
      &#10095;
    </button>

    <button
      class="lightbox__backdrop"
      onclick={closeLightbox}
      aria-label="Close"
    ></button>
  </div>
{/if}

<style>
  /* ── Hero ──────────────────────────────────────────── */
  .hero {
    position: relative;
    min-height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: var(--nav-height);
    overflow: hidden;
  }

  .hero__backdrop {
    position: absolute;
    inset: 0;
    background: radial-gradient(
        ellipse 60% 60% at 70% 40%,
        rgba(139, 94, 82, 0.12) 0%,
        transparent 70%
      ),
      radial-gradient(
        ellipse 40% 50% at 30% 70%,
        rgba(200, 184, 154, 0.06) 0%,
        transparent 60%
      );
    pointer-events: none;
  }

  .hero__content {
    position: relative;
    z-index: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
  }

  .hero__pre {
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  .hero__name {
    font-size: clamp(5rem, 18vw, 14rem);
    font-weight: 300;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text);
    line-height: 1;
  }

  .hero__roles {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    justify-content: center;
    font-size: clamp(0.65rem, 1.5vw, 0.8rem);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  /* ── Buttons ───────────────────────────────────────── */
  .btn {
    display: inline-block;
    margin-top: var(--space-md);
    padding: 0.75rem 2rem;
    background: var(--color-accent);
    color: var(--color-bg);
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    border: 1px solid var(--color-accent);
    transition:
      background 0.2s,
      color 0.2s;
  }

  .btn:hover {
    background: transparent;
    color: var(--color-accent);
  }

  .btn--outline {
    background: transparent;
    color: var(--color-text);
    border-color: var(--color-border);
  }

  .btn--outline:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  /* ── Intro ─────────────────────────────────────────── */
  .intro {
    padding-block: var(--space-2xl);
  }

  .intro__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
    align-items: start;
  }

  .intro__heading {
    font-size: clamp(2rem, 4vw, 3.5rem);
    margin-bottom: var(--space-lg);
    color: var(--color-text);
  }

  .intro__heading em {
    color: var(--color-accent);
    font-style: italic;
  }

  .intro__text p {
    color: var(--color-muted);
    max-width: 44ch;
    margin-bottom: var(--space-lg);
  }

  .link-arrow {
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    color: var(--color-accent);
    transition: opacity 0.2s;
  }

  .link-arrow:hover {
    opacity: 0.7;
  }

  .intro__disciplines {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .discipline-card {
    padding: var(--space-lg);
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    transition: border-color 0.2s;
  }

  .discipline-card:hover {
    border-color: var(--color-accent);
  }

  .discipline-card__icon {
    font-size: 1.5rem;
    color: var(--color-accent);
    display: block;
    margin-bottom: var(--space-sm);
  }

  .discipline-card h3 {
    font-size: 1.2rem;
    margin-bottom: var(--space-xs);
  }

  .discipline-card p {
    font-size: 0.85rem;
    color: var(--color-muted);
  }

  /* ── Featured Work ─────────────────────────────────── */
  .featured {
    padding-block: var(--space-2xl);
    border-top: 1px solid var(--color-border);
  }

  .section-label {
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin-bottom: var(--space-xl);
  }

  .featured__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
  }

  .work-card {
    display: block;
    overflow: hidden;
  }

  .work-card__image-frame {
    aspect-ratio: 3 / 4;
    border: 1px solid var(--color-border);
    overflow: hidden;
    background: var(--color-surface);
    transition: border-color 0.3s;
  }

  .work-card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
  }

  .work-card:hover .work-card__image-frame {
    border-color: var(--color-accent);
  }

  .work-card:hover .work-card__image {
    transform: scale(1.03);
  }

  .work-card__info {
    padding: var(--space-sm) 0;
  }

  .work-card__category {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  .work-card__title {
    font-size: 1.1rem;
    color: var(--color-text);
    margin-top: var(--space-xs);
  }

  .featured__cta {
    margin-top: var(--space-xl);
    text-align: center;
  }

  .home-gallery {
    padding-bottom: var(--space-2xl);
  }

  .home-gallery__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);
  }

  .home-gallery__item {
    aspect-ratio: 4 / 5;
    overflow: hidden;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    cursor: zoom-in;
    padding: 0;
    transition:
      border-color 0.25s,
      transform 0.25s;
  }

  .home-gallery__item:hover {
    border-color: var(--color-accent);
    transform: translateY(-2px);
  }

  .home-gallery__item.large {
    grid-column: span 2;
    aspect-ratio: 16 / 9;
  }

  .home-gallery__item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 300;
    display: grid;
    place-items: center;
    padding: clamp(1rem, 3vw, 2.25rem);
  }

  .lightbox__backdrop {
    position: absolute;
    inset: 0;
    border: 0;
    background: rgba(5, 5, 5, 0.9);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    cursor: zoom-out;
  }

  .lightbox__figure {
    position: relative;
    z-index: 2;
    margin: 0;
    width: min(92vw, 1200px);
  }

  .lightbox__image {
    display: block;
    width: 100%;
    max-height: 82vh;
    object-fit: contain;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: #101010;
  }

  .lightbox__caption {
    margin-top: 0.7rem;
    text-align: center;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 0.68rem;
    color: rgba(232, 228, 220, 0.8);
  }

  .lightbox__close,
  .lightbox__nav {
    position: absolute;
    z-index: 3;
    width: 2.6rem;
    height: 2.6rem;
    border: 1px solid rgba(232, 228, 220, 0.22);
    background: rgba(15, 15, 15, 0.75);
    color: var(--color-text);
    font-size: 1.2rem;
    line-height: 1;
    cursor: pointer;
    transition:
      border-color 0.2s,
      background 0.2s;
  }

  .lightbox__close:hover,
  .lightbox__nav:hover {
    border-color: var(--color-accent);
    background: rgba(15, 15, 15, 0.95);
  }

  .lightbox__close {
    top: 1rem;
    right: 1rem;
  }

  .lightbox__nav--prev {
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .lightbox__nav--next {
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }

  /* ── Responsive ────────────────────────────────────── */
  @media (max-width: 768px) {
    .intro__grid {
      grid-template-columns: 1fr;
    }

    .featured__grid {
      grid-template-columns: 1fr;
    }

    .home-gallery__grid {
      grid-template-columns: 1fr;
    }

    .home-gallery__item.large {
      grid-column: auto;
      aspect-ratio: 4 / 5;
    }

    .lightbox__nav {
      top: auto;
      bottom: 0.8rem;
      transform: none;
    }

    .lightbox__nav--prev {
      left: 0.8rem;
    }

    .lightbox__nav--next {
      right: 0.8rem;
    }

    .lightbox__close {
      top: 0.8rem;
      right: 0.8rem;
    }
  }
</style>
