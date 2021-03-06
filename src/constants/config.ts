import { ITileConfig } from "../components/Tile";
import { FRONTEND_NOTES } from "../notes/frontend";

export const CANVAS_BG_COLOR = "#FFFFFF";

export const EPICS: string[] = [
  "前端",
  "后端",
  "DevOps",
  "Me",
  "架构",
  "测试",
  "游戏",
];
export const EPICS_AMOUNT = EPICS.length;

export const TILE_CONFIGS: ITileConfig[] = [
  {
    color: "#64B5F6",
    x: -18,
    y: 31,
  },
  {
    color: "#FFCA28",
    x: 18,
    y: 31,
  },
  {
    color: "#43A047",
    x: -36,
    y: 0,
  },
  {
    color: "#6200EA",
    x: 0,
    y: 0,
  },
  {
    color: "#F57F17",
    x: 36,
    y: 0,
  },
  {
    color: "#546E7A",
    x: -18,
    y: -31,
  },
  {
    color: "#F44336",
    x: 18,
    y: -31,
  },
];

export const TILE_NAVIGATION_X_LIST = [-114, -76, -38, 0, 38, 76, 114];
export const TILE_NAVIGATION_Y = 65;

export const CONTENT_LIST = [FRONTEND_NOTES, [], [], [], [], [], []];
