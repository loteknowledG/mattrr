import { createMemo, createSignal, For } from "solid-js";
import fontCatalog from "@ascii-kit/fonts";
import figlet from "figlet/browser";
import ansiShadow from "figlet/fonts/ANSI Shadow";
import bigMoney from "figlet/fonts/Big Money-ne";
import doom from "figlet/fonts/Doom";
import slant from "figlet/fonts/Slant";
import standard from "figlet/fonts/Standard";

const fontDecks = [
  { id: "ansi--shadow", label: "ANSI SHADOW", name: "ANSI Shadow", data: ansiShadow },
  { id: "big--money-ne", label: "BIG MONEY", name: "Big Money-ne", data: bigMoney },
  { id: "doom", label: "DOOM", name: "Doom", data: doom },
  { id: "slant", label: "SLANT", name: "Slant", data: slant },
  { id: "standard", label: "STANDARD", name: "Standard", data: standard },
] as const;

for (const deck of fontDecks) figlet.parseFont(deck.name, deck.data);

export default function App() {
  const [fontId, setFontId] = createSignal<(typeof fontDecks)[number]["id"]>("ansi--shadow");
  const [text, setText] = createSignal("MATTRR");
  const selected = createMemo(() => fontDecks.find((deck) => deck.id === fontId()) ?? fontDecks[0]);
  const specimen = createMemo(() => figlet.textSync(text().trim().slice(0, 18) || "MATTRR", {
    font: selected().name,
    horizontalLayout: "default",
    whitespaceBreak: true,
  }));

  return (
    <main class="machine-shell">
      <header class="command-header">
        <div class="identity">
          <span class="system-mark" aria-hidden="true">MU/TH/UR</span>
          <div><p class="kicker">MECHANICA GENERATION SYSTEM</p><h1>MATTRR</h1></div>
        </div>
        <div class="telemetry" aria-label="System telemetry">
          <span><i class="lamp online" />FONT CORE</span>
          <span><i class="lamp online" />RENDER BUS</span>
          <span class="catalog-count">{fontCatalog.length} DECKS INDEXED</span>
        </div>
      </header>

      <section class="console" aria-labelledby="console-title">
        <div class="console-bar"><span>ASCII MORPH / SPECIMEN TERMINAL</span><output>STATUS: LIVE</output></div>
        <div class="console-grid">
          <aside class="font-bank" aria-label="ASCII font selector">
            <div class="rail-heading"><span>01</span><h2 id="console-title">FONT BANK</h2></div>
            <label class="material-input">
              <span>INPUT MATERIAL</span>
              <div>
                <b aria-hidden="true">&gt;</b>
                <textarea
                  value={text()}
                  maxlength="36"
                  rows="3"
                  spellcheck={false}
                  onInput={(event) => setText(event.currentTarget.value.toUpperCase())}
                  aria-label="ASCII specimen text"
                />
              </div>
            </label>
            <For each={fontDecks}>{(deck, index) => (
              <button type="button" classList={{ selected: fontId() === deck.id }} onClick={() => setFontId(deck.id)}>
                <span>{String(index() + 1).padStart(2, "0")}</span><strong>{deck.label}</strong><i aria-hidden="true" />
              </button>
            )}</For>
          </aside>

          <div class="display-stack">
            <div class="display-label"><span>ACTIVE DECK / {selected().label}</span><span>FIGFONT // ASCII-KIT</span></div>
            <div class="specimen-window"><div class="scanline" aria-hidden="true" /><pre aria-live="polite">{specimen()}</pre></div>
            <label class="quick-input">
              <span>QUICK INPUT</span>
              <div>
                <b aria-hidden="true">&gt;</b>
                <input
                  value={text()}
                  maxlength="18"
                  spellcheck={false}
                  onInput={(event) => setText(event.currentTarget.value.toUpperCase())}
                  aria-label="Quick ASCII specimen text"
                />
              </div>
            </label>
          </div>
        </div>
        <footer class="console-footer"><span>SELECT DECK // ENTER MATERIAL // OBSERVE FORM</span><span>MATTRREAL PROTOCOL 00.01</span></footer>
      </section>
    </main>
  );
}
