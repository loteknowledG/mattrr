export type ArtifactKind = "ascii" | "component" | "text" | "ui";

export interface ArtifactSource {
  readonly kind: "generated" | "authored" | "imported";
  readonly prompt?: string;
}

export interface Artifact<TPayload = unknown> {
  readonly id: string;
  readonly name: string;
  readonly kind: ArtifactKind;
  readonly payload: TPayload;
  readonly source: ArtifactSource;
  readonly createdAt: string;
}

export const createArtifact = <TPayload>(
  artifact: Omit<Artifact<TPayload>, "createdAt">,
): Artifact<TPayload> => ({
  ...artifact,
  createdAt: new Date().toISOString(),
});
