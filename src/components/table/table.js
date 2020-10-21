import React from 'react'
import {connect} from "react-redux";
import styles from './table.module.css'
import {gameAddHistory, gameNextTurn, playerSetRole} from "../../storage/actions/mafiaActions";
import {overlayOpen} from "../../storage/actions/overlayActions";

const Table = props => {
  function getClass(player) {
    let playerRoles = getPlayersRoles(props.players);
    if (player.status === 'dead') {
      return 'dead'
    }
    if (player.role === playerRoles[props.gameTurn]) {
      return ''
    }
    return props.cycle !== 'citizen' ? 'sleep' : ''
  }

  function playerActionHandler(player) {
    let muted = [];
    let dead = [];
    let role = getPlayersRoles(props.players)[props.gameTurn];
    props.players.forEach((player) => {
      if (player.role === role) {
        muted.push(player.muted);
        dead.push(player.status);
      }
    });
    muted = [...new Set(muted)];
    dead = [...new Set(dead)];

    let isActorNotMuted = muted.length === 2 || muted[0] === 'speak';
    let isActorNotDead = dead.length === 2 || dead[0] === 'alive';
    let isActorDoctor = role === 'doctor';
    // let isActorCitizen = role === 'citizen';
    let isTargetAlive = player.status === 'alive';

    //______ DOCTOR _________
    //doctor can be dead and can heal himself
    if (isActorDoctor && isActorNotMuted) {
      props.gameAddHistory(
          `${
              role
              } ${
              getRole(player).actionText
              } ${
              player.name
              } (${
              player.role
              })`);
      props.onRunRoleAction({
            action: getRole(player).actionRun,
            id: player.id
          },
      )
    }
    //______ OTHER _________
    if (isActorNotDead && isActorNotMuted) {
      if (isTargetAlive) {
        props.gameAddHistory(
            `${
                role
                } ${
                getRole(player).actionText
                } ${
                player.name
                } (${
                player.role
                })`);
        props.onRunRoleAction({
              action: getRole(player).actionRun,
              id: player.id
            },
        )
      } else {
        props.gameAddHistory(`${role} try to ${getRole(player).actionText} ${player.name}(${player.role})`);
        props.gameNextTurn();
      }
    } else {
      props.gameAddHistory(
          `${
              role
              } ${
              isActorNotDead
                  ? 'alive'
                  : 'dead'
              }${
              isActorNotMuted
                  ? ', can speak'
                  : ', muted'
              } and can't ${
              getRole(player).actionText
              } ${
              player.name
              } (${
              player.role
              })`
      );
      props.gameNextTurn();
    }

  }

  function getRole(player) {
    return props.roles[getPlayersRoles(props.players)[props.gameTurn]];
  }

  function getPlayersRoles(players) {
    let roles = [];
    let hasBitch = false;
    players.forEach((player) => {
      if (player.role === 'bitch') {
        hasBitch = true;
      }
      if (player.role !== 'citizen') {
        roles.push(player.role)
      }
    });
    if (hasBitch) roles.unshift('bitch');
    roles.push('citizen');
    roles = [...new Set(roles)];
    return roles
  }

  return (
      <>
        <table>
          <thead>
          <tr>
            <th>id</th>
            <th>name <small>15</small></th>
            <th>role</th>
            <th>status <small>5/15</small></th>
            <th>action</th>
          </tr>
          </thead>
          <tbody>{
            props.players.map((player, index) => {
              return (
                  <tr key={index}
                      className={styles[getClass(player)]}>
                    <td
                        onClick={() => props.overlayOpen(player)}
                    >{player.id}</td>
                    <td
                        onClick={() => props.overlayOpen(player)}
                    >{player.name}{
                      player.muted === 'muted' ? '🔇' : '🔊'
                    }</td>
                    <td
                        onClick={() => props.overlayOpen(player)}
                    >{player.role}
                    </td>
                    <td
                        onClick={() => props.overlayOpen(player)}
                    >{player.status}</td>
                    <td
                        onClick={() => playerActionHandler(player)}
                        className={styles.action}>
                      {getRole(player).actionText}
                    </td>
                  </tr>
              )
            })
          }</tbody>
        </table>
      </>
  )
};

function mapStateToProps(state) {
  return {
    players: state.mafiaReducer.players,
    roles: state.mafiaReducer.roles,
    gameTurn: state.mafiaReducer.gameTurn,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onRunRoleAction: (data) => dispatch(data.action(data.id)),
    playerSetRole: (data) => dispatch(playerSetRole(data)),
    overlayOpen: (player) => dispatch(overlayOpen(player)),
    gameNextTurn: () => dispatch(gameNextTurn()),
    gameAddHistory: (stage) => dispatch(gameAddHistory(stage)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);

