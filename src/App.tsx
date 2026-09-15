import { createMemo, createSignal, For } from "solid-js";
import type { ArtifactKind } from "./core/artifact";

const artifactKinds: readonly ArtifactKind[] = [
  "ascii",
  "component",
  "text",
  "ui",
];

export default function App() {
  const [kind, setKind] = createSignal<ArtifactKind>("ascii");
  const [prompt, setPrompt] = createSignal("");

  const status = createMemo(() =>
    prompt().trim().length > 0 ? "READY TO FORGE" : "AWAITING MATERIAL",
  );

  return (
    <main class="shell">
      <header class="masthead">
        <div>
          <p class="eyebrow">ARTIFACT FORGE / SOLID RUNTIME</p>
          <h1>MATTRR</h1>
        </div>
        <output class="status" aria-live="polite">
          {status()}
        </output>
      </header>

      <section class="workbench" aria-labelledby="workbench-title">
        <div class="section-heading">
          <span>01</span>
          <h2 id="workbench-title">Scratchpad</h2>
        </div>

        <nav class="kind-rail" aria-label="Artifact kind">
          <For each={artifactKinds}>
            {(artifactKind) => (
              <button
                type="button"
                classList={{ active: kind() === artifactKind }}
                onClick={() => setKind(artifactKind)}
              >
                {artifactKind}
              </button>
            )}
          </For>
        </nav>

        <label class="prompt-field">
          <span>Describe what Mattrr should make</span>
          <textarea
            value={prompt()}
            onInput={(event) => setPrompt(event.currentTarget.value)}
            placeholder="Start with an artifact, component, ASCII form, or interface idea…"
          />
        </label>

        <footer class="bench-footer">
          <span>target: {kind()}</span>
          <span>solid + typescript + effect</span>
        </footer>
      </section>
    </main>
  );
}
