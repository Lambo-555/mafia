import {OVERLAY_CLOSE, OVERLAY_OPEN} from "./actionTypes";

export function overlayClose() {
  return {
    type: OVERLAY_CLOSE,
  }
}

export function overlayOpen(player) {
  return {
    type: OVERLAY_OPEN,
    payload: player,
  }
}