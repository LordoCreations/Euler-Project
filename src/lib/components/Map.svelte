<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { mapLocations } from '$lib/data/euler';

	let mapContainer: HTMLDivElement;
	let activeId = $state(mapLocations[0].id);
	let mapInstance: import('leaflet').Map | null = null;
	let sectionEl: HTMLElement;
	const markers: Record<string, import('leaflet').CircleMarker> = {};

	const activeLocation = $derived(mapLocations.find((l) => l.id === activeId) ?? mapLocations[0]);

	onMount(async () => {
		const L = await import('leaflet');
		await import('leaflet/dist/leaflet.css');

		mapInstance = L.map(mapContainer, {
			scrollWheelZoom: false,
			zoomControl: true
		}).setView([52, 20], 4);

		L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
			maxZoom: 19
		}).addTo(mapInstance);

		const pathCoords: [number, number][] = [];

		mapLocations.forEach((loc) => {
			pathCoords.push([loc.lat, loc.lng]);

			const marker = L.circleMarker([loc.lat, loc.lng], {
				radius: 8,
				fillColor: '#65adf1',
				color: '#7ec8ff',
				weight: 2,
				opacity: 1,
				fillOpacity: 0.85
			}).addTo(mapInstance!);

			markers[loc.id] = marker;

			marker.on('click', () => {
				activeId = loc.id;
			});

			marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.period}`);
		});

		L.polyline(pathCoords, {
			color: '#a78bfa',
			weight: 2,
			opacity: 0.5,
			dashArray: '8 8'
		}).addTo(mapInstance);

		if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			const { gsap } = await import('gsap');
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);

			gsap.from(sectionEl.querySelectorAll('[data-map-reveal]'), {
				y: 40,
				opacity: 0,
				duration: 0.8,
				stagger: 0.15,
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top 85%',
					end: 'bottom 15%',
					toggleActions: 'play reverse play reverse'
				}
			});
		}

		// Svelte 5 effect to sync active marker state, map view, and popup
		$effect(() => {
			if (!mapInstance) return;
			const loc = mapLocations.find((l) => l.id === activeId);
			if (loc) {
				mapInstance.flyTo([loc.lat, loc.lng], 6, { duration: 1.2 });
			}

			Object.entries(markers).forEach(([id, marker]) => {
				if (id === activeId) {
					marker.setStyle({
						radius: 12,
						fillColor: '#7ec8ff',
						color: '#ffffff',
						weight: 3,
						fillOpacity: 0.95
					});
					setTimeout(() => {
						if (activeId === id) {
							marker.openPopup();
						}
					}, 350);
				} else {
					marker.setStyle({
						radius: 8,
						fillColor: '#65adf1',
						color: '#7ec8ff',
						weight: 2,
						fillOpacity: 0.85
					});
				}
			});
		});

		setTimeout(() => mapInstance?.invalidateSize(), 200);
	});

	onDestroy(() => {
		mapInstance?.remove();
	});

	function selectLocation(id: string) {
		activeId = id;
	}
</script>

<section id="map" bind:this={sectionEl}>
	<div class="section-inner">
		<p class="section-label" data-map-reveal>Where</p>
		<h2 class="section-title" data-map-reveal>
			Euler's <span class="gradient-text">journey across Europe</span>
		</h2>
		<p class="section-subtitle" data-map-reveal>
			Three cities shaped his career. Click a location to explore who he worked with and what he
			accomplished there.
		</p>

		<div class="map-layout">
			<div class="map-wrap glass-card" data-map-reveal bind:this={mapContainer}></div>

			<div class="location-panel" data-map-reveal>
				<div class="location-tabs">
					{#each mapLocations as loc}
						<button
							class="tab"
							class:active={activeId === loc.id}
							onclick={() => selectLocation(loc.id)}
						>
							{loc.name.split(',')[0]}
						</button>
					{/each}
				</div>

				<div class="location-detail glass-card">
					{#key activeId}
						<div
							in:fly={{ y: 15, duration: 350, delay: 100 }}
							out:fade={{ duration: 100 }}
							class="location-detail-content"
						>
							<span class="period">{activeLocation.period}</span>
							<h3>{activeLocation.name}</h3>
							<p>{activeLocation.description}</p>
							<div class="collaborators">
								<span class="collab-label">Collaborators</span>
								<div class="collab-tags">
									{#each activeLocation.collaborators as name}
										<span class="collab-tag">{name}</span>
									{/each}
								</div>
							</div>
						</div>
					{/key}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.map-layout {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 1.5rem;
		align-items: start;
	}

	.map-wrap {
		height: 480px;
		overflow: hidden;
		border-radius: var(--radius);
	}

	:global(.leaflet-container) {
		height: 100%;
		width: 100%;
		background: var(--bg-surface);
		font-family: var(--font-sans);
	}

	:global(.leaflet-popup-content-wrapper) {
		background: var(--bg-surface);
		color: var(--text);
		border-radius: var(--radius-sm);
		border: 1px solid var(--border);
	}

	:global(.leaflet-popup-tip) {
		background: var(--bg-surface);
	}

	.location-tabs {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.tab {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		padding: 0.5rem 1rem;
		font-family: var(--font-sans);
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--text-muted);
		cursor: pointer;
		transition: all var(--transition);
	}

	.tab:hover,
	.tab.active {
		color: var(--text);
		border-color: var(--border-glow);
		background: rgba(101, 173, 241, 0.1);
	}

	.tab.active {
		color: var(--accent-bright);
	}

	.location-detail {
		padding: 1.75rem;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		min-height: 290px;
	}

	.location-detail-content {
		grid-area: 1 / 1 / 2 / 2;
	}

	.period {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--accent);
		letter-spacing: 0.08em;
	}

	.location-detail h3 {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0.5rem 0 1rem;
	}

	.location-detail p {
		font-size: 0.925rem;
		color: var(--text-muted);
		line-height: 1.7;
		margin-bottom: 1.25rem;
	}

	.collab-label {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-muted);
		margin-bottom: 0.5rem;
	}

	.collab-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.collab-tag {
		font-size: 0.8rem;
		padding: 0.3rem 0.75rem;
		border-radius: 999px;
		background: rgba(167, 139, 250, 0.12);
		border: 1px solid rgba(167, 139, 250, 0.25);
		color: var(--accent-secondary);
	}

	@media (max-width: 900px) {
		.map-layout {
			grid-template-columns: 1fr;
		}

		.map-wrap {
			height: 320px;
		}
	}
</style>
