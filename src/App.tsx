import figletFonts from "@ascii-kit/fonts";
import { createMemo, createSignal } from "solid-js";
import { AsciiMorphSelector } from "./components/AsciiMorphSelector";

export default function App() {
  const [prompt, setPrompt] = createSignal("");
  const [font, setFont] = createSignal("standard");

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
        <div class="forge-controls">
          <AsciiMorphSelector
            label="FIGLET FONT"
            value={font()}
            options={figletFonts}
            onChange={setFont}
          />
        </div>

        <label class="prompt-field">
          <span>Describe what Mattrr should make</span>
          <textarea
            value={prompt()}
            onInput={(event) => setPrompt(event.currentTarget.value)}
            placeholder="Start with an artifact, component, ASCII form, or interface idea…"
          />
        </label>

        <footer class="bench-footer">
          <span>solid + typescript + effect</span>
          <span>figlet / {font()}</span>
        </footer>
      </section>
    </main>
  );
}
