import React from "react";
import { TextAnimationCollection } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame w-full h-full min-h-[300px] md:min-h-[400px] relative rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
      <TextAnimationCollection
        variant="threeui-intro"
        mode="dark"
        hue={0}
        saturation={1.00}
        brightness={1.00}
      />
    </div>
  );
}

export default Scene;
