import { createMemo, createSignal, For, Show } from "solid-js";
import { createArtifact, type Artifact, type ArtifactKind } from "./core/artifact";

const artifactKinds: readonly ArtifactKind[] = [
  "ascii",
  "component",
  "text",
  "ui",
];

const starter = String.raw`┌──────────────────────────────┐
│            MATTRR            │
├──────────────────────────────┤
│  HAND-CODED ARTIFACT FORGE   │
└──────────────────────────────┘`;

export default function App() {
  const [kind, setKind] = createSignal<ArtifactKind>("ascii");
  const [name, setName] = createSignal("untitled-artifact");
  const [content, setContent] = createSignal(starter);
  const [artifacts, setArtifacts] = createSignal<Artifact<string>[]>([]);
  const [selectedId, setSelectedId] = createSignal<string>();

  const status = createMemo(() => {
    if (!name().trim() || !content().trim()) return "INCOMPLETE";
    return "READY";
  });

  const selectedArtifact = createMemo(() =>
    artifacts().find((artifact) => artifact.id === selectedId()),
  );

  const commitArtifact = () => {
    if (!name().trim() || !content().trim()) return;

    const artifact = createArtifact({
      id: crypto.randomUUID(),
      name: name().trim(),
      kind: kind(),
      payload: content(),
      source: { kind: "authored" },
    });

    setArtifacts((current) => [artifact, ...current]);
    setSelectedId(artifact.id);
  };

  const loadArtifact = (artifact: Artifact<string>) => {
    setSelectedId(artifact.id);
    setName(artifact.name);
    setKind(artifact.kind);
    setContent(artifact.payload);
  };

  return (
    <main class="app-shell">
      <header class="masthead">
        <div>
          <p class="eyebrow">MATTRR / HAND-CODED STUDIO</p>
          <h1>MATTRR</h1>
        </div>
        <div class="masthead-status">
          <span>LOCAL</span>
          <output class="status" aria-live="polite">
            {status()}
          </output>
        </div>
      </header>

      <section class="studio-grid" aria-label="Mattrr studio">
        <section class="panel editor-panel" aria-labelledby="scratchpad-title">
          <div class="panel-heading">
            <span>01</span>
            <h2 id="scratchpad-title">Scratchpad</h2>
          </div>

          <div class="field-row">
            <label>
              <span>Name</span>
              <input
                value={name()}
                onInput={(event) => setName(event.currentTarget.value)}
              />
            </label>
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

          <label class="content-field">
            <span>Artifact source</span>
            <textarea
              value={content()}
              spellcheck={false}
              onInput={(event) => setContent(event.currentTarget.value)}
            />
          </label>

          <div class="editor-actions">
            <span>authoring mode / no AI</span>
            <button type="button" class="primary-action" onClick={commitArtifact}>
              Commit artifact
            </button>
          </div>
        </section>

        <section class="panel preview-panel" aria-labelledby="preview-title">
          <div class="panel-heading">
            <span>02</span>
            <h2 id="preview-title">Preview</h2>
            <span class="panel-meta">{kind()}</span>
          </div>

          <div class="preview-stage">
            <pre>{content()}</pre>
          </div>

          <footer class="panel-footer">
            <span>{name()}</span>
            <span>{content().length} chars</span>
          </footer>
        </section>

        <section class="panel library-panel" aria-labelledby="library-title">
          <div class="panel-heading">
            <span>03</span>
            <h2 id="library-title">Artifacts</h2>
            <span class="panel-meta">{artifacts().length}</span>
          </div>

          <Show
            when={artifacts().length > 0}
            fallback={<p class="empty-state">No committed artifacts yet.</p>}
          >
            <div class="artifact-list">
              <For each={artifacts()}>
                {(artifact) => (
                  <button
                    type="button"
                    classList={{ selected: selectedId() === artifact.id }}
                    onClick={() => loadArtifact(artifact)}
                  >
                    <span>{artifact.name}</span>
                    <small>{artifact.kind}</small>
                  </button>
                )}
              </For>
            </div>
          </Show>
        </section>

        <section class="panel inspector-panel" aria-labelledby="inspector-title">
          <div class="panel-heading">
            <span>04</span>
            <h2 id="inspector-title">Inspector</h2>
          </div>

          <Show
            when={selectedArtifact()}
            fallback={<p class="empty-state">Select or commit an artifact to inspect it.</p>}
          >
            {(artifact) => (
              <dl class="inspector-grid">
                <div>
                  <dt>ID</dt>
                  <dd>{artifact().id}</dd>
                </div>
                <div>
                  <dt>Kind</dt>
                  <dd>{artifact().kind}</dd>
                </div>
                <div>
                  <dt>Source</dt>
                  <dd>{artifact().source.kind}</dd>
                </div>
                <div>
                  <dt>Created</dt>
                  <dd>{artifact().createdAt}</dd>
                </div>
              </dl>
            )}
          </Show>
        </section>
      </section>
    </main>
  );
}
