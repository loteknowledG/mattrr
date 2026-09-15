# Mattrr / Mattrreal / Mechanica — Design Handoff

**Status:** Working architecture / design direction  
**Date:** 2026-09-14  
**Purpose:** Preserve the decisions reached during design so work can resume later without reconstructing the conversation.

> **Canonical phrase:** Mattrreal makes Mechanica.

---

## 1. Core product split

There are three separate ideas/systems:

### Mattrr
**Mattrr creates artifacts.**

Mattrr is an independent artifact/component generator. Its output must remain useful without Mattrreal or Echo Mirage.

Primary direction:
- ASCII / FIGlet-style generation
- reusable generated components
- Web Components where useful
- generated text/content artifacts
- code-generated reusable UI pieces

Mattrr is **not** the Echo Mirage marquee formatting layer.

### Mattrreal
**Mattrreal is a machine-learning clanker that generates human UI for tools.**

Mattrreal:
- reads tool specifications
- understands human intent
- generates reactive UI
- adapts UI to the user and device
- co-designs apps with the user in a Scratchpad
- learns from those design sessions
- eventually generates UI on the fly

Mattrreal should **not depend on Mattrr**.

It may consume:
- Mattrr-generated artifacts
- hand-written components
- third-party components
- components or geometry it generates itself

Its job is to turn a tool contract plus human intent and context into an appropriate human-facing interface.

### Mechanica
**Mechanica is the UI system Mattrreal generates.**

Mechanica grew out of the earlier ASCII Morph idea.

Mechanica is:

> An ASCII-rooted, generated, reactive, procedural mechanical UI system built from reusable parts and adapted in real time to the user, tool, device, and current task.

Mechanica is **not limited to literal ASCII characters**.

It may use:
- CSS geometry
- DOM elements
- borders and text
- triangles made from CSS
- Web Components
- generated layout primitives
- reactive controls
- reusable panels, rails, sliders, toggles, selectors, inputs, and status surfaces

The important part is that Mechanica is **generated machinery**, not static artwork.

---

## 2. ASCII Morph origin

Mechanica preserves the original ASCII Morph DNA:
- reusable parts instead of hand-drawn screens
- fast procedural composition
- generated geometry instead of image-driven UI
- reactive, stateful controls
- a mechanical/terminal aesthetic that is desirable in its own right

ASCII is the origin and visual language, not a rendering restriction.

A CSS triangle, DOM rail, generated meter, or procedural panel still belongs to the same family.

---

## 3. Tool specs are the functional source of truth

Mattrreal uses the **tool definition itself as the behavioral specification**.

A tool contract defines:
- capability
- inputs
- required arguments
- ranges
- allowed values
- result types
- descriptions
- invocation semantics

Example mappings:

```text
string           -> text input
boolean          -> toggle
enum             -> selector
number + min/max -> slider or numeric input
array            -> repeatable control
object           -> grouped controls
```
```text
required         -> validation
description      -> help text
result schema    -> result display
```

Rule:

> The tool defines what the UI can do. Mattrreal decides how that capability should be presented to a human.

Mattrreal is therefore not a generic image/layout generator. It is a tool-driven UI materializer.

---

## 4. One tool can have many UIs

A tool has one capability contract but can have many human forms.

Mattrreal should be able to generate multiple Mechanica UIs for the same tool:
- beginner
- casual
- expert
- hardcore
- custom
- compact
- touch-first
- keyboard-first
- handheld
- foldable
- desktop

The capability stays constant. The interaction phenotype changes.

What may vary:
- density
- control choice
- grouping
- layout
- labels
- progressive disclosure
- diagnostics
- interaction flow
- visual emphasis

### User experience modes

**Beginner**
- guided
- obvious controls
- plain language
- minimal decisions
- advanced options hidden

**Casual**
- comfortable defaults
- some customization
- low cognitive load

**Expert**
- dense controls
- full arguments
- compact labels
- keyboard-friendly
- visible status/state

**Hardcore / Custom**
- everything exposed
- raw values
- traces and diagnostics
- clearances and events
- custom layout
- maximum control

Custom should not be a rigid fifth template. A user may say:

> "Start from expert, move results left, hide tooltips, show raw trace, and make it keyboard-first."

Mattrreal should regenerate accordingly.

---

## 5. Handedness and one-handed operation

Handedness is a first-class runtime constraint.

For handheld devices, left-hand/right-hand does **not** simply mean left panel/right panel. It means ergonomic reach zones.

Mechanica should adapt:
- primary controls near the active thumb zone
- secondary controls toward the center
- destructive controls away from accidental reach
- layout mirrored appropriately
- state preserved across the transition

Possible context:

```ts
{
  handedness: "left" | "right" | "ambidextrous",
  grip: "one-hand" | "two-hand",
  device: "phone" | "foldable" | "tablet" | "desktop"
}
```

### Flick gesture
Users should be able to switch handedness with a flick motion.

```text
flick left  -> left-hand UI
flick right -> right-hand UI
```

The handedness change should trigger a live morph.

Rule:

> Handedness changes layout, not capability state.

The goal is one-handed operation.

Principle:

> The app should conform to the hand, not make the hand conform to the app.

---

## 6. Runtime / real-time morphing

Mechanica should be capable of generating UI as the user needs it in real time.
Context changes can trigger morphing:

```text
right hand -> left hand
beginner -> expert
portrait -> landscape
phone -> foldable
simple task -> complex task
"show advanced controls"
"make this simpler"
```

Mechanica should recompose in place while preserving state.

Examples of preserved state:
- typed text
- selected values
- execution progress
- results
- active tool state

Rule:

> Morph the interface, not the application state.

This goes beyond responsive design.

Responsive design asks:

> How wide is the screen?

Mechanica asks:

> What interface does this human need right now?

---

## 7. Human intent is the entry point

The user should not have to hunt through menus.

Example:

> "I want to change the cursor."

The AI understands the request, finds the relevant capability/tool, and Mattrreal materializes the controls needed for the task.

Instead of:

```text
intent
-> search settings
-> find menu
-> find subsection
-> change value
```

Mattrreal enables:

```text
intent
-> AI understands task
-> find relevant tool
-> Mattrreal materializes controls
-> user operates controls
```

Principle:

> The user does not navigate to controls. The controls come to the user.

---

## 8. Voice + mechanical visual UX

The interaction model combines the strengths of natural language/voice with the strengths of tactile visual controls.

Voice / AI is best for:
- expressing intent
- discovery
- saying what the user wants to accomplish
- avoiding menu hunting

Mechanica is best for:
- precise adjustment
- dragging
- selecting
- comparing
- inspecting
- undoing
- seeing live state and feedback

Example:

> "Change my cursor."

Mattrreal can immediately materialize cursor controls for shape, size, blink, preview, and other relevant options.

The user does not have to keep saying "a little bigger... no, smaller... go back." Once intent is understood, mechanical visual controls take over where they are better.

Core principle:

> **AI for intent. Mechanica for control.**

Or:

> Tell the machine what you want. The machine gives you the best controls for doing it.

---

## 9. Device-local Mattrreal generator

A device can carry its own Mattrreal generator.

A local Mattrreal runtime may know:
- available tools and tool specs
- device geometry
- orientation
- handedness
- grip mode
- current user mode
- learned preferences
- current application state
- available Mechanica components

That allows the same tool to materialize differently on different devices:

```text
same tool
  -> phone: one-handed thumb UI
  -> foldable: split or hinge-aware UI
  -> desktop: dense expert console
  -> tiny terminal: minimal compact surface
```

The local generator can react immediately to context changes and may eventually operate offline once it has the required models, components, and tool definitions.

Important consequence:

> A Mattrreal-capable device does not need every app prebuilt. It can materialize the needed app surface when a capability becomes available.

---

## 10. Scratchpad: how Mattrreal apps begin

Mattrreal has a **Scratchpad** where the user and the clanker design Mechanica apps together.

The Scratchpad is not just a drawing canvas. It is a co-design environment.

Typical loop:

```text
user describes intent
-> Mattrreal proposes Mechanica
-> user tweaks it
-> Mattrreal revises it
-> working design is saved
-> Mattrreal learns the design decisions
-> pattern becomes reusable
```

Example requests:
- "Make me a compact right-handed media control."
- "Move volume closer to my thumb."
- "Make track controls bigger."
- "Hide advanced output routing."
- "Now make an expert version."

The goal is for early Mattrreal apps to be **human-guided**.

Over time, successful co-designed apps become examples and patterns Mattrreal can draw from when generating new interfaces.

Principle:

> First you teach Mattrreal how to build apps with you. Then Mattrreal learns to build them for the moment.

---

## 11. Mattrreal as a machine-learning clanker

Mattrreal should learn how a person actually uses Mechanica and improve its UI choices over time.

It can learn things such as:
- whether the user prefers expert controls immediately
- which hand the user normally operates with
- which controls are commonly used together
- which advanced sections are repeatedly expanded
- which controls are repeatedly ignored
- which layouts work best for certain tools
- which device contexts favor simpler or denser layouts

This does **not** require retraining a giant model for every preference.

The learning stack can start pragmatically with:
- interaction history
- preference ranking
- contextual selection
- saved design patterns
- embeddings where useful
- lightweight local models where useful
- explicit user corrections as strong signals

Mattrreal learns **how to present a tool**, not what the tool is allowed to do.

Tool capability and authorization remain separate concerns.

---

## 12. Reusable learning infrastructure

The learning loop should be reusable beyond Mattrreal.

Generic loop:

```text
human collaborates
-> system captures decisions
-> patterns are extracted
-> preferences are learned
-> future generation improves
```

Potential consumers:

```text
Mattrreal  -> learns UI composition
Coder      -> learns coding preferences
Researcher -> learns source/report preferences
DJ         -> learns music/transition preferences
Operator   -> learns workflow habits
```

The reusable capability is not "learn Mechanica." It is:

> Learn from guided collaboration, preserve the learned pattern, and apply it to future generation.

This may eventually become shared Echo Mirage/clanker infrastructure, but it should be designed as a reusable system rather than buried inside one UI feature.

---

## 13. Mechanica implementation constraints

Mechanica should prefer reusable, live, procedural UI over static imagery.

### Reusable parts first
The system should assemble from known primitives whenever possible:
- buttons
- sliders
- rails
- tabs
- meters
- panels
- selectors
- toggles
- frames
- status blocks
- input fields

Generated UI does **not** mean hand-drawn UI.

The AI should configure, arrange, connect, and recompose reusable parts first. It may synthesize a missing primitive from code/geometry when necessary.

### Images / SVG
Mechanica should **not depend on images or SVG as general UI content**.

Images or SVG are acceptable primarily for branding identity such as a logo/brand mark.

The functional UI itself should remain live, generated, and operable.

### Implementation freedom
ASCII roots do not mean implementation imprisonment.

Mattrreal may use whatever implementation technique is appropriate, including DOM, CSS, Web Components, local state, gesture handling, and generated geometry.

The constraint is not **how** the AI builds the UI. The constraints are what the UI must preserve:
- correct tool semantics
- reactive state
- state preservation across morphs
- user/device ergonomics
- appropriate experience mode
- clear mechanical affordances
- minimal unnecessary visual clutter

Principle:

> AI gets freedom in construction, but not freedom to violate the tool contract or the interaction rules.

---

## 14. Relationship to Robotech and Spark Gap

Current conceptual boundaries:

**Spark Gap** transports intent and results between participants.

**Robotech** turns tool intent into authorized machine action. It owns capability enforcement, clearance, dispatch, execution, and audit.

**Mattrreal** interprets human intent and generates the human-facing Mechanica surface for tools.

**Mechanica** is what the human operates.

Canonical execution loop:

```text
HUMAN
  ↓
AI / intent understanding
  ↓
MATTRREAL
  ↓
MECHANICA
  ↓
tool intent
  ↓
ROBOTECH
  ↓
clearance + execution
  ↓
result
  ↓
MECHANICA / MATTRREAL
  ↓
HUMAN
```

Mattrreal must not become the security boundary.

Rule:

> Mattrreal learns presentation. Robotech owns permission and execution.

---

## 15. Repository boundaries

Mattrr and Mattrreal should be **separate repositories**.

Recommended shape:

```text
github.com/loteknowledG/mattrr
github.com/loteknowledG/mattrreal
```

Echo Mirage may integrate with both, but neither should be buried inside the Echo Mirage repository.

Reasons:
- clean architecture
- independent product identity
- independent release cadence
- independent licensing choices
- reuse outside Echo Mirage

Important rule:

> Echo Mirage uses Mattrr and Mattrreal; it does not contain them.

Another important rule:

> Mattrreal may use Mattrr output, but Mattrreal must not depend on Mattrr.

Shared packages should only be extracted when real shared contracts emerge. Do not create shared infrastructure prematurely.

---

## 16. Licensing reason for the split

One original reason for keeping Mattrr separate from Echo Mirage was the ASCII / FIGlet library ecosystem and its licensing implications.

### Research finding: `@ascii-kit/fonts`
As researched on 2026-09-14:
- `@ascii-kit/fonts` declares GPL-3.0
- the related ASCII Kit font bundle/package also declares GPL-3.0
- the bundle contains a large historical FIGlet font collection
- individual FIGlet fonts come from many authors and eras
- package-level licensing and individual font provenance are separate questions

Therefore, do **not** assume that one package license proves identical provenance/rights for every historical font file.

This is an engineering/open-source-compliance conclusion, not legal advice.

### Safer Mattrr direction
Do not make `@ascii-kit/fonts` a required production dependency if licensing flexibility is important.

Prefer:
- a permissively licensed FIGlet renderer
- a deliberately curated font catalog
- per-font provenance metadata
- author/source/license/attribution tracking

The current `figlet` JavaScript package is MIT-licensed, and the original FIGlet implementation is BSD-3-Clause; these are better candidates to evaluate for the renderer layer.

Font data still needs its own provenance review.

A small set of known-clean fonts is preferable to inheriting hundreds of fonts with uneven provenance.

---

## 17. Current terminology

Use these definitions unless the design changes later:

**Mattrr** — artifact/component generator with ASCII/FIGlet roots. Creates independently useful artifacts.

**Mattrreal** — machine-learning clanker and generative adaptive UI runtime. Co-designs and eventually generates interfaces for tools.

**Mechanica** — ASCII-rooted, generated, reactive, procedural mechanical UI produced by Mattrreal.

**Scratchpad** — human + Mattrreal co-design workspace where Mechanica apps are taught, refined, saved, and learned from.

**Robotech** — tool transformer/execution boundary. Validates, authorizes, dispatches, executes, and audits tool actions.

**Spark Gap** — typed communication/transport layer for intent and results.

Useful shorthand:

> Mattrr creates artifacts.  
> Mattrreal learns and generates Mechanica.  
> Mechanica gives humans controls.  
> Robotech turns tool intent into authorized action.  
> Spark Gap transports intent and results.

---
## 18. Intentionally open questions / next design work

The following are **not settled yet** and should be designed before implementation hardens:

- exact canonical tool-spec format Mattrreal consumes
- Mechanica primitive/component contract
- how generated UI descriptions are represented and persisted
- Scratchpad project/file format
- how explicit user corrections become learning signals
- local preference model vs larger reasoning model responsibilities
- when a generated UI becomes a saved app vs remains temporary
- packaging/runtime strategy for device-local Mattrreal
- exact gesture detector and handedness transition behavior
- accessibility requirements alongside one-handed ergonomics
- curated FIGlet font list and per-font provenance
- final licenses for Mattrr, Mattrreal, and related packages

Do not prematurely turn Mattrreal into a Solid-only compiler or couple it to one framework.

Do not make Mattrr a required dependency of Mattrreal.

Do not reduce Mechanica to literal ASCII text rendering.

Do not reduce Mattrreal to static form generation; the target is reactive, adaptive, learned, runtime UI generation.

---

## 19. Where to resume

Next session should start by designing the **smallest Mattrreal Scratchpad loop**: one tool spec, one co-designed Mechanica surface, explicit user revisions, saved design decisions, and a reusable record of what Mattrreal learned.

Only after that loop is clear should on-the-fly generation and generalized machine learning be expanded.
