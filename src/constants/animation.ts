import { easeCubicOut, easeCubicInOut, easeQuadInOut } from "d3-ease";
import {
  TILE_CONFIGS,
  TILE_NAVIGATION_X_LIST,
  TILE_NAVIGATION_Y,
} from "./config";

export interface IAnimationConfig {
  duration?: number;
  easing?: (t: number) => number;
}

/* ----- Landing Animation ----- */
export const LANDING_DURATION = 2000;
export const CAMERA_LANDING_ORIGINAL_Z = 80;
export const CAMERA_LANDING_ANIMATED_Z = 120;

export interface ILandingAnimation {
  x: number;
  y: number;
  cameraZ: number;
}
export interface ILandingAnimationInit extends ILandingAnimation {
  config: IAnimationConfig;
}

export const LANDING_ANIMATION_INIT_CONFIG = (
  index: number
): ILandingAnimationInit => ({
  x: TILE_CONFIGS[index].x * 10,
  y: TILE_CONFIGS[index].y * 10,
  cameraZ: CAMERA_LANDING_ORIGINAL_Z,
  config: {
    duration: LANDING_DURATION,
    easing: easeCubicOut,
  },
});

export const LANDING_ANIMATION_UPDATE = (
  animatedIndex: number
): ILandingAnimation => ({
  x: TILE_CONFIGS[animatedIndex].x,
  y: TILE_CONFIGS[animatedIndex].y,
  cameraZ: CAMERA_LANDING_ANIMATED_Z,
});

/* ----- Diving Animation ----- */
export const DIVING_DURATION = 1000;

export interface IDivingAnimation {
  x: number;
  y: number;
}
export interface IDivingAnimationInit extends IDivingAnimation {
  config: IAnimationConfig;
}

export const DIVING_ANIMATION_INIT_CONFIG = (
  index: number
): IDivingAnimationInit => ({
  x: TILE_CONFIGS[index].x,
  y: TILE_CONFIGS[index].y,
  config: {
    duration: DIVING_DURATION,
    easing: easeQuadInOut,
  },
});

export const DIVING_ANIMATION_UPDATE =
  (tileIndex: number) =>
  (animatedIndex: number): IDivingAnimation => {
    if (tileIndex === animatedIndex)
      return {
        x: TILE_NAVIGATION_X_LIST[animatedIndex],
        y: TILE_NAVIGATION_Y,
      };
  };

/* ----- Diving Camera Animation ----- */
export const DIVING_CAMERA_DURATION = 1800;
export const CAMERA_DIVING_ANIMATED_Z = 200;

export interface IDivingCameraAnimation {
  cameraZ: number;
}
export interface IDivingCameraAnimationInit extends IDivingCameraAnimation {
  config: IAnimationConfig;
}

export const DIVING_CAMERA_ANIMATION_INIT_CONFIG =
  (): IDivingCameraAnimationInit => ({
    cameraZ: CAMERA_LANDING_ANIMATED_Z,
    config: {
      duration: DIVING_CAMERA_DURATION,
      easing: easeQuadInOut,
    },
  });

export const DIVING_CAMERA_ANIMATION_UPDATE = (): IDivingCameraAnimation => ({
  cameraZ: CAMERA_DIVING_ANIMATED_Z,
});

/* ----- Tile Hover Animation ----- */
export interface ITileHoverAnimation {
  z: number;
  textZ: number;
}
export interface ITileHoverAnimationInit extends ITileHoverAnimation {
  config: IAnimationConfig;
}

export const TILE_HOVER_DURATION = 700;
export const TILE_ORIGINAL_Z = 0;
export const TILE_TEXT_ORIGINAL_Z = 3;
export const TILE_ANIMATED_Z = 10;
export const TILE_TEXT_ANIMATED_Z = 13;

export const TILE_HOVER_ANIMATION_INIT_CONFIG =
  (): ITileHoverAnimationInit => ({
    z: TILE_ORIGINAL_Z,
    textZ: TILE_TEXT_ORIGINAL_Z,
    config: {
      duration: TILE_HOVER_DURATION,
      easing: easeCubicInOut,
    },
  });

export const TILE_HOVER_ANIMATION_UPDATE =
  (tileIndex: number) =>
  (animatedIndex: number): ITileHoverAnimation => {
    if (animatedIndex === tileIndex)
      return { z: TILE_ANIMATED_Z, textZ: TILE_TEXT_ANIMATED_Z };
  };

export const TILE_RESET_ANIMATION_UPDATE =
  (tileIndex: number) =>
  (animatedIndex: number): ITileHoverAnimation => {
    if (animatedIndex === tileIndex)
      return { z: TILE_ORIGINAL_Z, textZ: TILE_TEXT_ORIGINAL_Z };
  };

/* ----- Navigate Animation ----- */
export interface INavigateAnimation {
  color: string;
}
export interface INavigateAnimationInit extends INavigateAnimation {
  config: IAnimationConfig;
}

const DEFAULT_TILE_COLOR = "#000000";

export const NAVIGATING_ANIMATION_INIT_CONFIG =
  (index: number) => (): INavigateAnimationInit => ({
    color: index === 3 ? TILE_CONFIGS[index].color : DEFAULT_TILE_COLOR,
    config: {
      duration: DIVING_DURATION,
      easing: easeCubicOut,
    },
  });

export const NAVIGATING_ANIMATION_UPDATE = (
  active: boolean,
  tileIndex: number
): INavigateAnimation => ({
  color: active
    ? TILE_CONFIGS[tileIndex].color
    : tileIndex === 3
    ? TILE_CONFIGS[tileIndex].color
    : DEFAULT_TILE_COLOR,
});
