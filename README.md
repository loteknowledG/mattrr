# Mattrr

**Mattrr is the semantic UI composition layer.**

The goal is to give humans and AI one small, renderer-neutral language for describing interfaces without forcing the composer to think in HTML, SVG paths, React, CSS, or pixels.

## Working model

```text
intent
  ↓
Mattrr
semantic UI description
  ↓
renderer / adapter
  ├─ ASCII → plain text
  ├─ SVG → vector markup
  ├─ Web Components → custom elements
  ├─ React → React components
  └─ Solid / other targets
```

A Mattrr composition should describe **what the interface means** — components, hierarchy, state, actions, bindings, layout relationships, and UX intent — while leaving the final rendering technology to a target adapter.

Example concept:

```ts
{
  type: "button",
  role: "primary",
  label: "LAUNCH",
  shape: "octagon",
  state: "ready"
}
```

The ASCII renderer could turn that into text:

```text
╱────────────╲
│   LAUNCH   │
╲────────────╱
```

An SVG renderer could produce vector geometry. A Web Component renderer could produce a custom element. The composer should not need to learn a different UX language for every output technology.

## Architectural boundary

**Mattrr describes. Renderers realize.**

Mattrr should stay independent of Lit, React, Solid, SVG, and Asciimorphism. Those are possible realization targets or design systems, not the semantic language itself.

## Relationship to Mattrreal

Current working distinction:

```text
Mattrr     = what we compose
Mattrreal  = how a composition becomes a real, usable interface
```

UXPad in Echo Mirage is expected to create/edit Mattrr compositions and preview or materialize them through Mattrreal.

## Status

Early architecture/design stage. The first task is to define the smallest useful Mattrr input/output contract before choosing implementation details.
