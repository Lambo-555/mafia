import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import styles from './game.module.css'
import Table from '../../components/table/table'
import {
  gameAddHistory,
  gameClear,
  gameSetCycle,
  gameSetTurn,
  playerDelete,
  playerUnmute
} from "../../storage/actions/mafiaActions";

const Home = props => {
  let history = useHistory();
  const [players, setPlayers] = useState('');
  const [playersRoles, setPlayersRoles] = useState('');
  const [gameTurn, setGameTurn] = useState('');
  useEffect(() => {
    setPlayers(props.players);
    setPlayersRoles(getPlayersRoles(props.players));
    setGameTurn(props.gameTurn);
    gameCycle();
  }, [props]);

  if (parseInt(gameTurn) === playersRoles.length) {
    props.gameSetTurn(0);
    players.forEach((player) => {
      if(player.status === "dead"){
        props.playerDelete(player.id);
      }
      if (player.muted === 'muted') {
        props.playerUnmute(player.id);
      }
    });

    props.gameAddHistory("DAY IS OVER");

    history.push("/history");
  }

  function gameCycle() {
    props.gameSetCycle(playersRoles[gameTurn]);
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
      <div className={styles.Game}>
        <div className={styles.Status_bar}>

          <div className={styles.Status_bar__item}>
            <span role="img" aria-label="day status">{
              playersRoles[gameTurn] !== 'citizen' ? '🌙' : '🌞'
            }</span> <br/>
            <small>{
              playersRoles[gameTurn] !== 'citizen' ? 'Night' : 'Day'
            }</small>
          </div>

          <div className={styles.Status_bar__item}
               style={{flex: 1}}>
            <span>
              {playersRoles[props.gameTurn] || ''
              }&nbsp;turn:&nbsp;
            </span>
            <br/>
            <small>{
              players
                  ? players.filter(p => {
                    let roleOk = p.role === playersRoles[gameTurn];
                    let statusOk = p.status !== "dead";
                    return !!roleOk && !!statusOk
                  }).length
                  : 0
            }&nbsp;
              left,&nbsp;
              {
                players
                    ? players.filter(p => {
                      let roleOk = p.role === playersRoles[gameTurn];
                      let statusOk = p.status === "dead";
                      return !!roleOk && !!statusOk
                    }).length
                    : 0
              }&nbsp;dead
            </small>
          </div>

          <div className={styles.Status_bar__item}
               style={{background: 'Yellow', color: 'Black'}}>
            <span><strong>Menu</strong></span> <br/>
            <small>
              {gameTurn}
              /
              {playersRoles
                  ? playersRoles.length
                  : ''
              }&nbsp;steps
            </small>
          </div>
        </div>

        <Table/>
      </div>
  )
};

function mapStateToProps(state) {
  return {
    players: state.mafiaReducer.players,
    roles: state.mafiaReducer.roles,
    gameTurn: state.mafiaReducer.gameTurn,
    cycle: state.mafiaReducer.cycle,
    history: state.mafiaReducer.history,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    gameClear: () => dispatch(gameClear()),
    gameAddHistory: (stage) => dispatch(gameAddHistory(stage)),
    gameSetCycle: (cycleName) => dispatch(gameSetCycle(gameSetCycle)),
    gameSetTurn: (num) => dispatch(gameSetTurn(num)),
    playerUnmute: (id) => dispatch(playerUnmute(id)),
    playerDelete: (id) => dispatch(playerDelete(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);