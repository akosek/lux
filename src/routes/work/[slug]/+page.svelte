<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

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
    activeImageIndex =
      (activeImageIndex + 1) % data.project.galleryImages.length;
  }

  function prevImage() {
    activeImageIndex =
      (activeImageIndex - 1 + data.project.galleryImages.length) %
      data.project.galleryImages.length;
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
  <title>{data.project.title} - Work - Lux Ulonska</title>
  <meta name="description" content={data.project.description} />
</svelte:head>

<section class="project-hero container">
  <a href="/work" class="back-link">← Back to all projects</a>
  <p class="project-hero__label">{data.project.category} project</p>
  <h1 class="project-hero__title">{data.project.title}</h1>
  <div class="project-hero__meta">
    <span>{data.project.year}</span>
    <span aria-hidden="true">•</span>
    <span
      >{data.project.folderName
        .replace("project_", "")
        .replaceAll("_", " ")}</span
    >
  </div>
</section>

<section class="project-intro container">
  <div class="project-intro__lead">
    <img
      src={data.project.coverImage}
      alt={data.project.title}
      class="project-intro__cover"
    />
  </div>
  <div class="project-intro__text">
    <p class="project-intro__summary">{data.project.description}</p>
    {#each data.project.fullDescription as paragraph}
      <p>{paragraph}</p>
    {/each}
  </div>
</section>

<section class="project-gallery container">
  <h2 class="project-gallery__title">Gallery</h2>
  <div class="project-gallery__grid">
    {#each data.project.galleryImages as image, i}
      <button
        class="project-gallery__item"
        class:project-gallery__item--wide={i % 5 === 0}
        onclick={() => openLightbox(i)}
        aria-label={`Open ${data.project.title} photo ${i + 1}`}
      >
        <img
          src={image}
          alt={`${data.project.title} photo ${i + 1}`}
          loading="lazy"
        />
      </button>
    {/each}
  </div>
</section>

{#if lightboxOpen}
  <div
    class="lightbox"
    role="dialog"
    aria-modal="true"
    aria-label="Project gallery viewer"
  >
    <button
      class="lightbox__close"
      onclick={closeLightbox}
      aria-label="Close gallery">✕</button
    >

    <button
      class="lightbox__nav lightbox__nav--prev"
      onclick={prevImage}
      aria-label="Previous image"
    >
      &#10094;
    </button>

    <div class="lightbox__viewport">
      <div
        class="lightbox__track"
        style={`transform: translateX(-${activeImageIndex * 100}%);`}
      >
        {#each data.project.galleryImages as image, i}
          <figure class="lightbox__slide">
            <img src={image} alt={`${data.project.title} photo ${i + 1}`} />
          </figure>
        {/each}
      </div>
      <p class="lightbox__counter">
        {activeImageIndex + 1} / {data.project.galleryImages.length}
      </p>
    </div>

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
  .project-hero {
    padding-top: calc(var(--nav-height) + var(--space-xl));
    padding-bottom: var(--space-xl);
    border-bottom: 1px solid var(--color-border);
  }

  .back-link {
    display: inline-block;
    margin-bottom: var(--space-lg);
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  .back-link:hover {
    color: var(--color-accent);
  }

  .project-hero__label {
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin-bottom: var(--space-sm);
  }

  .project-hero__title {
    font-size: clamp(2.4rem, 7vw, 6rem);
    line-height: 1;
  }

  .project-hero__meta {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-top: var(--space-md);
    font-size: 0.78rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .project-intro {
    padding-block: var(--space-xl);
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: var(--space-xl);
  }

  .project-intro__cover {
    width: 100%;
    height: min(72vh, 900px);
    object-fit: cover;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
  }

  .project-intro__text {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .project-intro__summary {
    font-size: 1.06rem;
    line-height: 1.8;
    color: var(--color-text);
  }

  .project-intro__text p {
    color: var(--color-muted);
    max-width: 62ch;
  }

  .project-gallery {
    padding-bottom: var(--space-2xl);
  }

  .project-gallery__title {
    font-size: 0.8rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin-bottom: var(--space-md);
  }

  .project-gallery__grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--space-md);
  }

  .project-gallery__item {
    grid-column: span 4;
    aspect-ratio: 4 / 5;
    border: 1px solid var(--color-border);
    overflow: hidden;
    background: var(--color-surface);
    cursor: zoom-in;
    padding: 0;
    transition:
      border-color 0.2s,
      transform 0.2s;
  }

  .project-gallery__item--wide {
    grid-column: span 8;
    aspect-ratio: 16 / 9;
  }

  .project-gallery__item:hover {
    border-color: var(--color-accent);
    transform: translateY(-2px);
  }

  .project-gallery__item img {
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
    padding: clamp(0.8rem, 2.2vw, 2rem);
  }

  .lightbox__backdrop {
    position: absolute;
    inset: 0;
    border: 0;
    background: rgba(5, 5, 5, 0.92);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    cursor: zoom-out;
  }

  .lightbox__viewport {
    position: relative;
    z-index: 2;
    width: min(92vw, 1300px);
    overflow: hidden;
  }

  .lightbox__track {
    display: flex;
    width: 100%;
    transition: transform 280ms ease;
    will-change: transform;
  }

  .lightbox__slide {
    margin: 0;
    width: 100%;
    min-width: 100%;
    display: grid;
    place-items: center;
  }

  .lightbox__slide img {
    width: 100%;
    max-height: 82vh;
    object-fit: contain;
    background: #101010;
    border: 1px solid rgba(255, 255, 255, 0.16);
    display: block;
  }

  .lightbox__counter {
    margin-top: 0.7rem;
    text-align: center;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-size: 0.68rem;
    color: rgba(232, 228, 220, 0.78);
  }

  .lightbox__close,
  .lightbox__nav {
    position: absolute;
    z-index: 3;
    width: 2.7rem;
    height: 2.7rem;
    border: 1px solid rgba(232, 228, 220, 0.22);
    background: rgba(15, 15, 15, 0.76);
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

  @media (max-width: 900px) {
    .project-intro {
      grid-template-columns: 1fr;
    }

    .project-gallery__item,
    .project-gallery__item--wide {
      grid-column: span 12;
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
