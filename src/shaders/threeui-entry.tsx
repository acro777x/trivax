import React from "react";
import {
  ThreeUIIntro,
  ParticleWordmark,
  AudioWordmark,
  type NeuformIsolatedEffectProps,
} from "./neuform-isolated/NeuformIsolatedEffects";

export interface TextAnimationCollectionProps extends NeuformIsolatedEffectProps {
  variant?: "threeui-intro" | "particle-wordmark" | "audio-wordmark" | string;
}

export function TextAnimationCollection({
  variant = "threeui-intro",
  ...props
}: TextAnimationCollectionProps) {
  if (variant === "threeui-intro") {
    return <ThreeUIIntro {...props} />;
  }
  if (variant === "particle-wordmark") {
    return <ParticleWordmark {...props} />;
  }
  if (variant === "audio-wordmark") {
    return <AudioWordmark {...props} />;
  }
  return <ThreeUIIntro {...props} />;
}

export * from "./neuform-isolated/NeuformIsolatedEffects";
export default TextAnimationCollection;
