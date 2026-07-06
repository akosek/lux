<footer class="footer">
  <div class="container footer__inner">
    <p class="footer__name">Lux</p>
    <p class="footer__roles">
      Dancer &middot; Mover &middot; Performer &middot; Costume Designer
    </p>
    <p class="footer__copy">
      &copy; {new Date().getFullYear()} All rights reserved
    </p>
  </div>
</footer>

<style>
  .footer {
    border-top: 1px solid var(--color-border);
    padding-block: var(--space-xl);
    margin-top: var(--space-2xl);
  }

  .footer__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    text-align: center;
  }

  .footer__name {
    font-family: var(--font-display);
    font-size: 1.2rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .footer__roles {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  .footer__copy {
    font-size: 0.7rem;
    color: var(--color-border);
  }
</style>
