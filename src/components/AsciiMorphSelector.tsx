import { For, createSignal, onCleanup, onMount } from "solid-js";
import "./AsciiMorphSelector.css";

type AsciiMorphSelectorProps = {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
};

export function AsciiMorphSelector(props: AsciiMorphSelectorProps) {
  const [open, setOpen] = createSignal(false);
  let root!: HTMLDivElement;

  onMount(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (open() && !root.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    onCleanup(() => document.removeEventListener("pointerdown", onPointerDown));
  });

  return (
    <div
      ref={root}
      class={`mattrr-select${open() ? " is-open" : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open()) {
          event.preventDefault();
          setOpen(false);
        }
      }}
    >      <span class="mattrr-select__label">{props.label}</span>
      <button
        type="button"
        class="mattrr-menu-item mattrr-menu-item--checked mattrr-select__trigger"
        aria-label={props.label}
        aria-haspopup="listbox"
        aria-expanded={open()}
        onClick={() => setOpen((value) => !value)}
      >
        <span class="mattrr-menu-marker" aria-hidden="true">X</span>
        <span>{props.value.toUpperCase()}</span>
      </button>

      {open() ? (
        <div class="mattrr-select__menu" role="listbox" aria-label={props.label}>
          <For each={props.options}>
            {(option) => {
              const active = () => option === props.value;
              return (
                <button
                  type="button"
                  role="option"
                  aria-selected={active()}
                  class={`mattrr-menu-item${active() ? " mattrr-menu-item--checked" : ""}`}
                  onClick={() => {
                    props.onChange(option);
                    setOpen(false);
                  }}
                >                  <span class="mattrr-menu-marker" aria-hidden="true">{active() ? "X" : " "}</span>
                  <span>{option.toUpperCase()}</span>
                </button>
              );
            }}
          </For>
        </div>
      ) : null}
    </div>
  );
}
