<script lang="ts">
  import { page } from "$app/stores";

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/contact", label: "Contact" },
  ];

  let menuOpen = $state(false);

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }
</script>

<header class="nav-wrapper">
  <nav class="container nav">
    <a href="/" class="wordmark" onclick={closeMenu}> Lux </a>

    <!-- Desktop links -->
    <ul class="nav__links" role="list">
      {#each links as { href, label }}
        <li>
          <a
            {href}
            class="nav__link"
            class:active={$page.url.pathname === href}
          >
            {label}
          </a>
        </li>
      {/each}
    </ul>

    <!-- Mobile burger -->
    <button
      class="burger"
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen}
      onclick={toggleMenu}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </nav>

  <!-- Mobile drawer -->
  {#if menuOpen}
    <ul class="nav__mobile" role="list">
      {#each links as { href, label }}
        <li>
          <a
            {href}
            class="nav__mobile-link"
            class:active={$page.url.pathname === href}
            onclick={closeMenu}
          >
            {label}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</header>

<style>
  .nav-wrapper {
    position: fixed;
    top: 0;
    inset-inline: 0;
    z-index: 100;
    background: rgba(12, 10, 24, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--color-border);
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .wordmark {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .nav__links {
    display: flex;
    gap: var(--space-lg);
    list-style: none;
  }

  .nav__link {
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-muted);
    transition: color 0.2s;
  }

  .nav__link:hover,
  .nav__link.active {
    color: var(--color-text);
  }

  .burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-sm);
  }

  .burger span {
    display: block;
    width: 22px;
    height: 1px;
    background: var(--color-text);
    transition: opacity 0.2s;
  }

  .nav__mobile {
    position: absolute;
    top: var(--nav-height);
    inset-inline: 0;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    list-style: none;
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .nav__mobile-link {
    font-size: 1.5rem;
    font-family: var(--font-display);
    color: var(--color-muted);
  }

  .nav__mobile-link:hover,
  .nav__mobile-link.active {
    color: var(--color-text);
  }

  @media (max-width: 640px) {
    .nav__links {
      display: none;
    }
    .burger {
      display: flex;
    }
  }
</style>
