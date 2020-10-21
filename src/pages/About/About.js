import React from 'react'
import {connect} from "react-redux";
import styles from './about.module.css'

const About = props => {
  return (
      <div className={styles.About}>
        <div className={styles.Line}/>
        <div className={styles.Box}>
          <h1>MAFIA GAME</h1>
          <br/>
          <br/>
          <br/>
          <small>Apps for organizations</small>
          <small>Author: <strong>Malyshev Stanislav</strong></small>
          <small>2020</small>
        </div>
      </div>
  )
};

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(About);