import { easeCubicOut, easeCubicInOut } from "d3-ease";
import { TILE_CONFIGS } from "./config";

export const LANDING_DURATION = 2400;
export const CAMERA_ORIGINAL_Z = 80;
export const CAMERA_ANIMATED_Z = 120;

export const LANDING_ANIMATION_INIT_CONFIG = (index: number) => ({
  x: TILE_CONFIGS[index].x * 10,
  y: TILE_CONFIGS[index].y * 10,
  cameraZ: CAMERA_ORIGINAL_Z,
  config: {
    duration: LANDING_DURATION,
    easing: easeCubicOut,
  },
});

export const LANDING_ANIMATION_UPDATE = (animatedIndex: number) => ({
  x: TILE_CONFIGS[animatedIndex].x,
  y: TILE_CONFIGS[animatedIndex].y,
  cameraZ: CAMERA_ANIMATED_Z,
});

export const TILE_HOVER_DURATION = 700;
export const TILE_ORIGINAL_Z = 0;
export const TILE_TEXT_ORIGINAL_Z = 7;

export const TILE_HOVER_ANIMATION_INIT_CONFIG = () => ({
  z: TILE_ORIGINAL_Z,
  textZ: TILE_TEXT_ORIGINAL_Z,
  config: {
    duration: TILE_HOVER_DURATION,
    easing: easeCubicInOut,
  },
});
