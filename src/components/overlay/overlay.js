import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import classes from './overlay.module.css'
import {overlayClose} from "../../storage/actions/overlayActions";
import {
  gameClear,
  playerDelete, playerGenerate,
  playerSetMute,
  playerSetName,
  playerSetRole,
  playerSetStatus,
} from "../../storage/actions/mafiaActions";

const Overlay = props => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');
  const [muted, setMuted] = useState('');
  useEffect(()=>{
    setId(props.player.id);
    setName(props.player.name);
    setStatus(props.player.status);
    setRole(props.player.role);
    setMuted(props.player.muted)
  },[props]);

  if (!props.isOpen) {
    return ''
  }

  return (
      <>
        <div className={classes.Overlay}
             onClick={() => props.overlayClose()}>
        </div>

        <div className={classes.Overlay_box}>

          <div className={classes.Overlay_menu}>
            <div className={classes.Overlay_h3}>
              Id <br/>
              <small> {props.player.id}</small>
            </div>
          </div>

          <div className={classes.Overlay_menu}>
            <div className={classes.Overlay_h3}>
              Name <br/>
              <small> {props.player.name}</small>
            </div>
            <input
                type="text"
                className={classes.Overlay_select}
                value={name || ''}
                placeholder="Set name"
                autoComplete="off"
                onChange={e=>setName(e.target.value)}
                onBlur={()=>props.playerSetName(props.player.id, name)}
            />
          </div>

          <div className={classes.Overlay_menu}>
            <div className={classes.Overlay_h3}>
              Role <br/>
              <small> {props.player.role}</small>
            </div>
            <select
                name="role"
                id="role"
                className={classes.Overlay_select}
                value={role|| 'citizen'}
                onChange={e => {
                  setRole(e.target.value);
                  props.playerSetRole(id, e.target.value)
                }}
            >
              <option value="citizen">citizen</option>
              <option value="mafia">mafia</option>
              <option value="bitch">bitch</option>
              <option value="doctor">doctor</option>
              <option value="police">police</option>
            </select>
          </div>

          <div className={classes.Overlay_menu}>
            <div className={classes.Overlay_h3}>
              Status <br/>
              <small> {props.player.status}</small>
            </div>
            <select
                name="status"
                id="status"
                className={classes.Overlay_select}
                value={status || 'alive'}
                onChange={e => {
                  setStatus(e.target.value);
                  props.playerSetStatus(id, e.target.value)
                }}
            >
              <option value="dead">dead</option>
              <option value="alive">alive</option>
            </select>
          </div>

          <div className={classes.Overlay_menu}>
            <div className={classes.Overlay_h3}>
              Muted <br/>
              <small> {props.player.muted}</small>
            </div>
            <select
                value={muted || 'speak'}
                name="status"
                id="status"
                className={classes.Overlay_select}
                onChange={e => {
                  setMuted(e.target.value);
                  props.playerSetMute(id, e.target.value);
                }}
            >
              <option value="speak">speak</option>
              <option value="muted">muted</option>
            </select>
          </div>

          {/*ACTIONS*/}
          <div className={classes.Overlay_menu}
               onClick={() => props.playerDelete(id)}
          >
            <p className={classes.Overlay_h3}
               onClick={() => props.playerDelete(props.player.id)}
            >
              Delete this player
            </p>
          </div>
          <div className={classes.Overlay_menu}
               onClick={() => props.playerGenerate(4)}
          >
            <p className={classes.Overlay_h3}>
              Generate 4 players
            </p>
          </div>
          <div className={classes.Overlay_menu}
               onClick={() => props.gameClear()}
          >
            <p className={classes.Overlay_h3}>
              Restart Game
            </p>
          </div>

        </div>
      </>
  )
};

function mapStateToProps(state) {
  return {
    isOpen: state.overlayReducer.isOpen,
    player: state.overlayReducer.player,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    overlayClose: () => dispatch(overlayClose()),
    playerSetRole: (id,role) => dispatch(playerSetRole(id,role)),
    playerSetStatus: (id, status) =>
        dispatch(playerSetStatus(id, status)),
    playerSetName: (id, name) => dispatch(playerSetName(id, name)),
    playerDelete: (id) => dispatch(playerDelete(id)),
    playerSetMute: (id, muted) => dispatch(playerSetMute(id, muted)),
    playerGenerate: (num) => dispatch(playerGenerate(num)),
    gameClear: () => dispatch(gameClear()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);