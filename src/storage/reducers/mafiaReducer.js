import {
  GAME_ADD_HISTORY,
  GAME_CLEAR, GAME_NEXT_TURN,
  GAME_SET_CYCLE, GAME_SET_TURN,
  PLAYER_ADD, PLAYER_CHECK,
  PLAYER_DELETE,
  PLAYER_HEAL,
  PLAYER_KILL, PLAYER_MUTE, PLAYER_ROLE_ACTION, PLAYER_SET_MUTE,
  PLAYER_SET_NAME,
  PLAYER_SET_ROLE, PLAYER_SET_STATUS, PLAYER_UNMUTE
} from "../actions/actionTypes";
import {playerCheck, playerHeal, playerKill, playerMute} from "../actions/mafiaActions";

const initialState = {
  cycle: '',
  gameTurn: 0,
  roles: {
    "mafia": {actionText: "kill", players: [], actionRun: playerKill},
    "doctor": {actionText: "heal", players: [], actionRun: playerHeal},
    "citizen": {actionText: "vote", players: [], actionRun: playerKill},
    "bitch": {actionText: "mute", players: [], actionRun: playerMute},
    "police": {actionText: "check", players: [], actionRun: playerCheck},
  },
  players: [
    {
      id: 0,
      name: "Stas",
      role: "mafia",
      status: "alive", //dead//alive
      muted: "speak", //muted//speak
    },
    {
      id: 1,
      name: "Cris",
      role: "bitch",
      status: "alive", //dead
      muted: "speak", //muted
    },
    {
      id: 2,
      name: "Anna",
      role: "doctor",
      status: "alive", //dead
      muted: "speak", //muted
    },
    {
      id: 3,
      name: "Nastya",
      role: "citizen",
      status: "alive", //dead
      muted: "speak", //muted
    },
    {
      id: 4,
      name: "Vitya",
      role: "police",
      status: "alive", //dead
      muted: "speak", //muted
    }],
  history: [],
  id: 1
};

export default function mafiaReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_SET_STATUS:
      let playerListForStatus = [...state.players];
      playerListForStatus.forEach((player) => {
        if (parseInt(player.id) === parseInt(action.payload.id)) {
          player.status = action.payload.status;
        }
      });
      return {
        ...state,
        players: playerListForStatus
      };
    case GAME_NEXT_TURN:
      return {...state, gameTurn: state.gameTurn+1};
    case GAME_SET_CYCLE:
      return {...state, cycle: action.payload};
    case GAME_ADD_HISTORY:
      return {...state, history: [...state.history, action.payload]};
    case GAME_CLEAR:
      return {...state, history: [], cycle: 'day', gameTurn: 0};
    case PLAYER_ADD:
      let newName = {};
      newName.name = action.payload || "Noname";
      newName.status = "alive";
      newName.role = "citizen";
      newName.id = state.id;
      newName.muted = false;
      return {
        ...state,
        id: state.id + 1,
        players: [...state.players, newName]
      };

    case PLAYER_DELETE:
      let newList = [...state.players];
      newList.forEach((player, index) => {
            if (parseInt(player.id) === parseInt(action.payload)) {
              newList.splice(index, 1);
            }
          }
      );
      return {
        ...state,
        players: newList
      };

    case PLAYER_SET_NAME:
      let renameList = [...state.players];
      renameList.forEach((player) => {
        if (parseInt(player.id) === parseInt(action.payload.id)) {
          player.name = action.payload.name;
        }
      });
      return {
        ...state,
        players: renameList
      };
    case PLAYER_SET_ROLE:
      let playerSetRole = [...state.players];
      playerSetRole.forEach((player) => {
        if (parseInt(player.id) === parseInt(action.payload.id)) {
          player.role = action.payload.role;
        }
      });
      return {
        ...state,
        players: playerSetRole
      };

    case PLAYER_KILL:
      let playerListForKill = [...state.players];
      playerListForKill.forEach((player) => {
        if (parseInt(player.id) === parseInt(action.payload)) {
          player.status = 'dead';
        }
      });
      return {
        ...state,
        players: playerListForKill,
        gameTurn: state.gameTurn + 1
      };

    case PLAYER_HEAL:
      let playerListForHeal = [...state.players];
      playerListForHeal.forEach((player) => {
        if (parseInt(player.id) === parseInt(action.payload)) {
          player.status = 'alive';
        }
      });
      return {
        ...state,
        players: playerListForHeal,
        gameTurn: state.gameTurn + 1
      };
    case PLAYER_MUTE:
      let playerListForMute = [...state.players];
      playerListForMute.forEach((player) => {
        if (parseInt(player.id) === parseInt(action.payload)) {
          player.muted = 'muted';
        }
      });
      return {
        ...state,
        players: playerListForMute,
        gameTurn: state.gameTurn + 1
      };
    case PLAYER_UNMUTE:
      let playerListForUnmute = [...state.players];
      playerListForUnmute.forEach((player) => {
        if (parseInt(player.id) === parseInt(action.payload)) {
          player.muted = 'speak';
        }
      });
      return {
        ...state,
        players: playerListForUnmute,
        gameTurn: state.gameTurn + 1
      };
    case PLAYER_SET_MUTE:
      let setMuteList = [...state.players];
      setMuteList.forEach((player) => {
        if (parseInt(player.id) === parseInt(action.payload.id)) {
          player.muted = action.payload.muted;
        }
      });
      return {
        ...state,
        players: setMuteList
      };
    case PLAYER_ROLE_ACTION:
      return state;
    case PLAYER_CHECK:
      return {...state, gameTurn: state.gameTurn + 1};
    case GAME_SET_TURN:
      return {...state, gameTurn: action.payload};
    default:
      return state;
  }
}