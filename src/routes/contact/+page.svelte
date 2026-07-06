<script lang="ts">
  let name = $state("");
  let email = $state("");
  let message = $state("");
  let submitted = $state(false);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    // Wire up to a backend / email service (e.g. Resend, Formspree) later
    submitted = true;
  }
</script>

<svelte:head>
  <title>Contact — Lux</title>
  <meta
    name="description"
    content="Get in touch with Lux Ulonska for collaborations, bookings and enquiries."
  />
</svelte:head>

<section class="page-hero container">
  <p class="page-hero__label">Contact</p>
  <h1 class="page-hero__title">Get in touch</h1>
</section>

<section class="contact container">
  <div class="contact__grid">
    <!-- Left col: info -->
    <div class="contact__info">
      <p>
        Open to collaborations in dance, performance, and costume design.
        Whether you're a company, a fellow artist, or a curious stranger — say
        hello.
      </p>

      <ul class="contact__links" role="list">
        <li>
          <span class="contact__link-label">Email</span>
          <a
            href="mailto:connect@stefiliciouslux.art"
            class="contact__link-value">connect@stefiliciouslux.art</a
          >
        </li>
        <li>
          <span class="contact__link-label">Instagram</span>
          <a
            href="https://instagram.com/stefiliciouslux"
            class="contact__link-value"
            target="_blank"
            rel="noopener noreferrer">@stefiliciouslux</a
          >
        </li>
        <!-- Add more social/professional links here -->
      </ul>
    </div>

    <!-- Right col: form -->
    <div class="contact__form-col">
      {#if submitted}
        <div class="contact__success" role="status">
          <p>Thank you — your message has been sent. I'll be in touch soon.</p>
        </div>
      {:else}
        <form class="contact__form" onsubmit={handleSubmit} novalidate>
          <div class="field">
            <label for="name" class="field__label">Name</label>
            <input
              id="name"
              type="text"
              class="field__input"
              bind:value={name}
              required
              autocomplete="name"
            />
          </div>

          <div class="field">
            <label for="email" class="field__label">Email</label>
            <input
              id="email"
              type="email"
              class="field__input"
              bind:value={email}
              required
              autocomplete="email"
            />
          </div>

          <div class="field">
            <label for="message" class="field__label">Message</label>
            <textarea
              id="message"
              class="field__input field__textarea"
              bind:value={message}
              rows={6}
              required
            ></textarea>
          </div>

          <button type="submit" class="btn">Send message</button>
        </form>
      {/if}
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

  .contact {
    padding-block: var(--space-2xl);
  }

  .contact__grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: var(--space-xl);
    align-items: start;
  }

  .contact__info p {
    color: var(--color-muted);
    max-width: 40ch;
    margin-bottom: var(--space-xl);
  }

  .contact__links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .contact__link-label {
    display: block;
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin-bottom: 2px;
  }

  .contact__link-value {
    font-size: 0.95rem;
    color: var(--color-text);
    transition: color 0.2s;
  }

  .contact__link-value:hover {
    color: var(--color-accent);
  }

  /* ── Form ──────────────────────────────────────────── */
  .contact__form {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .field__label {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  .field__input {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 0.95rem;
    padding: 0.75rem 1rem;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }

  .field__input:focus {
    border-color: var(--color-accent);
  }

  .field__textarea {
    resize: vertical;
    min-height: 140px;
  }

  .btn {
    display: inline-block;
    align-self: flex-start;
    padding: 0.75rem 2rem;
    background: var(--color-accent);
    color: var(--color-bg);
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    border: 1px solid var(--color-accent);
    cursor: pointer;
    transition:
      background 0.2s,
      color 0.2s;
  }

  .btn:hover {
    background: transparent;
    color: var(--color-accent);
  }

  .contact__success {
    padding: var(--space-xl);
    border: 1px solid var(--color-accent);
    color: var(--color-accent);
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .contact__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
