# Mattrr

**Mattrr creates artifacts.**

Mattrr is an independent artifact and component generator. Its output should remain useful without Mattrreal or Echo Mirage.

Primary directions:

- ASCII / FIGlet-style generation
- reusable generated components
- generated text and content artifacts
- code-generated UI pieces
- renderer-neutral artifact contracts where useful

Mattrr is **not** the Echo Mirage marquee formatting layer.

## Mattrr / Mattrreal / Mechanica

```text
Mattrr     -> creates artifacts and reusable parts
Mattrreal  -> learns and generates human-facing UI
Mechanica  -> the generated mechanical UI system Mattrreal produces
```

Mattrreal may consume Mattrr artifacts, but **Mattrreal must not depend on Mattrr**.

The full working architecture is preserved in [`docs/MATTRR-MATTRREAL-HANDOFF.md`](docs/MATTRR-MATTRREAL-HANDOFF.md).

## Current application stack

```text
SolidJS
TypeScript
Vite
pnpm
Effect
GitHub Pages
```

The first web shell is intentionally small: a Solid scratchpad/workbench and an initial typed artifact contract. We will grow generators and renderers behind explicit seams rather than baking one renderer into the core.

## Development

```bash
pnpm install
pnpm dev
```

Production build:

```bash
pnpm build
```

GitHub Pages deployment is handled by `.github/workflows/pages.yml` after changes land on `main`.

## ASCII font licensing

`@ascii-kit/fonts` is **not installed in the runtime dependency graph**. It declares GPL-3.0, so font/rendering integration should stay isolated until the project chooses an explicit licensing strategy.

## Status

Early foundation. Current focus: establish the artifact model, scratchpad, generator seams, and renderer boundaries before adding machine-learning behavior.
