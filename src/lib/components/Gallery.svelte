<script lang="ts">
  import { onMount } from "svelte";
  import { gallery } from "$lib/data/euler";
  import { fade } from "svelte/transition";

  let sectionEl: HTMLElement;
  let expandedId = $state<string | null>(null);

  onMount(async () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(sectionEl.querySelectorAll(".gallery-card"), {
      y: 60,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
      clearProps: "transform", // <-- Automatically removes inline transforms when done
      scrollTrigger: {
        trigger: sectionEl,
        start: "top 85%",
        end: "bottom 15%",
        // Changed to 'play none none none' so it doesn't break layout on scroll-out
        toggleActions: "play none none none",
      },
    });
  });

  function toggle(id: string) {
    expandedId = expandedId === id ? null : id;
  }

  function handleMouseMove(e: MouseEvent) {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
</script>

<section id="gallery" bind:this={sectionEl}>
  <div class="section-inner">
    <p class="section-label">Discoveries & Fun Facts</p>
    <h2 class="section-title">
      Gallery of <span class="gradient-text">genius</span>
    </h2>
    <p class="section-subtitle">
      Click any card to expand—Euler's reach extended from notation to graph
      theory, mechanics, and beyond.
    </p>

    <div class="gallery-grid">
      {#each gallery as item}
        <div
          class="gallery-card glass-card mouse-glow"
          class:expanded={expandedId === item.id}
          role="button"
          tabindex="0"
          onclick={() => toggle(item.id)}
          onkeydown={(e) =>
            (e.key === "Enter" || e.key === " ") &&
            (e.preventDefault(), toggle(item.id))}
          onmousemove={handleMouseMove}
        >
          <div class="glow-overlay"></div>

          <div class="card-image-wrap">
            <img src={item.image} alt={item.imageAlt} loading="lazy" />
            <span class="tag">{item.tag}</span>
          </div>
          <div class="card-content">
            <h3>{item.title}</h3>

            <div class="text-container">
              {#if expandedId === item.id}
                <p class="full-body" transition:fade={{ duration: 200 }}>
                  {@html item.body}
                </p>
              {:else}
                <p class="preview" transition:fade={{ duration: 200 }}>
                  {@html item.body.slice(0, 100)}…
                </p>
              {/if}
            </div>

            <span class="expand-hint"
              >{expandedId === item.id
                ? "Click to collapse"
                : "Click to read more"}</span
            >
          </div>
        </div>
      {/each}
    </div>
  </div>

  {#if expandedId}
    <button
      type="button"
      class="overlay no-print"
      aria-label="Close expanded card"
      transition:fade={{ duration: 200 }}
      onclick={() => (expandedId = null)}
    ></button>
  {/if}
</section>

<style>
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .gallery-card {
    overflow: hidden;
    position: relative;
    z-index: 1;
    cursor: pointer;
    /* Smooth transitions for hover animation */
    transition:
      transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
      box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
      border-color 0.3s ease;
    border: 1px solid var(--border);
  }

  /* Hover effect: lift and gentle shadow/border glow */
  .gallery-card:hover:not(.expanded) {
    transform: translateY(-6px);
    border-color: rgba(101, 173, 241, 0.4);
    box-shadow: 0 12px 32px rgba(101, 173, 241, 0.12);
  }

  .gallery-card.expanded {
    z-index: 10;
    border-color: var(--border-glow);
    box-shadow: 0 16px 48px rgba(101, 173, 241, 0.15);
    transform: scale(1.02);
  }

  /* Dynamic mouse glow utilizing your handleMouseMove variables */
  .glow-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
      rgba(101, 173, 241, 0.06),
      transparent 80%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 2;
  }

  .gallery-card:hover .glow-overlay {
    opacity: 1;
  }

  .card-image-wrap {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 10;
    background: var(--bg-surface);
  }

  .card-image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .gallery-card:hover .card-image-wrap img {
    transform: scale(1.05);
  }

  .tag {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    background: rgba(6, 8, 15, 0.75);
    backdrop-filter: blur(8px);
    color: var(--accent-bright);
    border: 1px solid var(--border);
    z-index: 3;
  }

  .card-content {
    padding: 1.25rem 1.5rem 1.5rem;
    position: relative;
    z-index: 3;
  }

  .card-content h3 {
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  /* Double text fix: Establish layout context */
  .text-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .card-content p {
    grid-area: 1 / 1 / 2 / 2; /* Force both paragraphs onto the exact same grid cell */
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.65;
    margin: 0;
  }

  .preview {
    opacity: 0.75;
  }

  .expand-hint {
    display: block;
    margin-top: 0.75rem;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--accent);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  @media (max-width: 900px) {
    .gallery-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
