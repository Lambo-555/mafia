import {
  GAME_ADD_HISTORY,
  GAME_CLEAR, GAME_NEXT_TURN,
  GAME_SET_CYCLE, GAME_SET_TURN,
  PLAYER_ADD, PLAYER_CHECK,
  PLAYER_DELETE,
  PLAYER_HEAL,
  PLAYER_KILL,
  PLAYER_MUTE, PLAYER_SET_MUTE,
  PLAYER_SET_NAME,
  PLAYER_SET_ROLE, PLAYER_SET_STATUS, PLAYER_UNMUTE
} from "./actionTypes";

export function playerAdd(name) {
  return {
    type: PLAYER_ADD,
    payload: name
  }
}

export function gameClear() {
  return {
    type: GAME_CLEAR
  }
}

export function gameAddHistory(stage) {
  return {
    type: GAME_ADD_HISTORY,
    payload: stage
  }
}

export function gameSetCycle(cycleName) {
  return {
    type: GAME_SET_CYCLE,
    payload: cycleName
  }
}

export function playerDelete(id) {
  return {
    type: PLAYER_DELETE,
    payload: id
  }
}

export function playerSetName(id, name) {
  return {
    type: PLAYER_SET_NAME,
    payload: {id: id, name: name}
  }
}

export function playerSetStatus(id, status) {
  return {
    type: PLAYER_SET_STATUS,
    payload: {id, status}
  }
}

export function playerSetRole(id, role) {
  return {
    type: PLAYER_SET_ROLE,
    payload: {id: id, role: role}
  }
}

export function playerKill(id) {
  return {
    type: PLAYER_KILL,
    payload: id
  }
}

export function playerHeal(id) {
  return {
    type: PLAYER_HEAL,
    payload: id
  }
}

export function playerMute(id) {
  return {
    type: PLAYER_MUTE,
    payload: id
  }
}

export function playerSetMute(id, muted) {
  return {
    type: PLAYER_SET_MUTE,
    payload: {id, muted}
  }
}

export function playerUnmute(id) {
  return {
    type: PLAYER_UNMUTE,
    payload: id
  }
}

export function playerCheck(id) {
  return {
    type: PLAYER_CHECK,
    payload: id
  }
}

export function gameSetTurn(num) {
  return {
    type: GAME_SET_TURN,
    payload: num
  }
}

export function gameNextTurn() {
  return {
    type: GAME_NEXT_TURN
  }
}

export function playerGenerate(num = 1) {
  return (dispatch) => {
    for (let i = 0; i < num; i++) {
      dispatch(playerAdd(Math.floor(Math.random() * 100)))
    }
  }
}


// export function timerAddAsync(number) {
//   return (dispatch) => {
//     let timerId = setInterval(() => {
//       dispatch(timerAdd(number))
//     }, 550)
//     setTimeout(() => {
//       clearInterval(timerId)
//     }, 5500)
//   };
// }
