import { easeCubicOut, easeCubicInOut, easeQuadOut } from "d3-ease";
import {
  TILE_CONFIGS,
  TILE_NAVIGATION_X_LIST,
  TILE_NAVIGATION_Y,
} from "./config";

export const LANDING_DURATION = 2000;
export const CAMERA_LANDING_ORIGINAL_Z = 80;
export const CAMERA_LANDING_ANIMATED_Z = 120;
export const DIVING_DURATION = 1200;
export const CAMERA_DIVING_ANIMATED_Z = 200;

export const LANDING_ANIMATION_INIT_CONFIG = (index: number) => ({
  x: TILE_CONFIGS[index].x * 10,
  y: TILE_CONFIGS[index].y * 10,
  cameraZ: CAMERA_LANDING_ORIGINAL_Z,
  config: {
    duration: LANDING_DURATION,
    easing: easeCubicOut,
  },
});

export const LANDING_ANIMATION_UPDATE = (animatedIndex: number) => ({
  x: TILE_CONFIGS[animatedIndex].x,
  y: TILE_CONFIGS[animatedIndex].y,
  cameraZ: CAMERA_LANDING_ANIMATED_Z,
});

export const DIVING_ANIMATION_INIT_CONFIG = (index) => ({
  x: TILE_CONFIGS[index].x,
  y: TILE_CONFIGS[index].y,
  cameraZ: CAMERA_LANDING_ANIMATED_Z,

  config: {
    duration: DIVING_DURATION,
    easing: easeQuadOut,
  },
});

export const DIVING_ANIMATION_UPDATE = (animatedIndex) => ({
  x: TILE_NAVIGATION_X_LIST[animatedIndex],
  y: TILE_NAVIGATION_Y,
  cameraZ: CAMERA_DIVING_ANIMATED_Z,
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
