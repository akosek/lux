<svelte:head>
  <title>About — Lux</title>
  <meta
    name="description"
    content="About Lux — dancer, mover, performer and costume designer."
  />
</svelte:head>

<section class="page-hero container">
  <p class="page-hero__label">About</p>
  <h1 class="page-hero__title">The artist</h1>
</section>

<section class="bio container">
  <div class="bio__grid">
    <div class="bio__image-col">
      <img
        src="/media/images/PBDI6134_comp_Baldemar Bottini.jpg"
        alt="Lux, portrait"
      />
    </div>

    <div class="bio__text-col">
      <h4>Lux Ulonska</h4>
      <p class="bio__tagline">dey/dem · Tanz · Theater · Drag · Kostümdesign</p>

      <p>
        Lux Ulonska (dey/dem) ist eine diplomierte, hexaglotte,
        multidisziplinäre Künstler*in und nichtbinäre Superheld*in aus Berlin.
        Nach einem Einsatz als Seenotretter*in auf dem Mittelmeer im Jahr 2022
        beschloss die damalige Bestsellerautor*in, den dystopischen Realitäten
        der Festung Europa zukünftig nur noch Kunst und einen radikal gelebten
        Queerfeminismus entgegenzusetzen.
      </p>

      <p>
        Deren breites Schaffen im zeitgenössischen Tanz, Theater, Drag und
        Kostümdesign liefert Arbeiten, die sich durch eine starke körperliche
        Intensität, emotionale Präsenz und konzeptionelle Vielschichtigkeit
        auszeichnen. Dey wirft einen neugierigen Blick auf die Unerhörtheiten
        unserer spätkapitalistischen Welt und die liebenswerten Widersprüche
        menschlicher Natur und bietet queere (lies: neue) Perspektiven.
      </p>

      <p>
        Lux verfügt über einen starken autodidaktischen Hintergrund in Zirkus,
        Tanz und Theater sowie intensive Ausbildungen am Berlin Dance Institute,
        Danceworks, motion*s und SENECA Intensiv. Neben Performances für
        Choreograph*innen wie Kalli Tarasidou und Rocio "Pez" Becerra tanzte dey
        zuletzt in "The Six Pieces" von Shayna Swanson. 2025 kreierte und
        performte Lux gemeinsam mit Thea Haug und Majó Rika das mehrfach vom
        KiA-Fonds geförderte Schattentheaterstück "UNDINI Uncut". 2026
        entwickelte dey das Solostück "GEWEBE".
      </p>

      <p>
        Als Teil des Berliner Dragthing-Kollektivs Creature Kin bespielt dey mit
        "Mushroom Tales" Bühnen in Berlin sowie zahlreiche Festivals in Europa.
        Parallel baut Lux sich einen Ruf als vielseitige Kostümdesigner*in auf —
        zur Zeit arbeitet dey an der vollen Kostümausstattung des 6-köpfigen
        Casts der Show "THE PIECES" der US-amerikanischen Zirkuscompany ALOFT
        CIRCUS, die im August 2026 am Edinburgh Fringe Festival Premiere feiert
        und international touren wird.
      </p>

      <p>
        <a
          href="https://www.stefiliciouslux.art"
          target="_blank"
          rel="noopener noreferrer">www.stefiliciouslux.art</a
        >
        <br />
        <a
          href="https://www.instagram.com/stefiliciouslux"
          target="_blank"
          rel="noopener noreferrer">https://www.instagram.com/stefiliciouslux</a
        >
      </p>

      <div class="bio__cv-link">
        <a href="/contact" class="btn">Get in Touch</a>
        <!-- Uncomment when CV is ready:
				<a href="/cv.pdf" class="link-arrow" target="_blank" rel="noopener">Download CV →</a>
				-->
      </div>
    </div>
  </div>
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

  .bio {
    padding-block: var(--space-2xl);
  }

  .bio__grid {
    display: grid;
    grid-template-columns: 5fr 7fr;
    gap: var(--space-xl);
    align-items: start;
  }

  .bio__image-col img {
    aspect-ratio: 3 / 4;
    width: 100%;
    object-fit: cover;
    border: 1px solid var(--color-border);
    display: block;
  }

  .bio__text-col {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .bio__text-col h4 {
    font-size: clamp(2rem, 4vw, 3.5rem);
  }

  .bio__tagline {
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .bio__text-col p {
    color: var(--color-muted);
    max-width: 55ch;
  }

  .bio__cv-link {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
    margin-top: var(--space-md);
  }

  .btn {
    display: inline-block;
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

  @media (max-width: 768px) {
    .bio__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
