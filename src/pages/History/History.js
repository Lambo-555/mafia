import React from 'react'
import {connect} from "react-redux";
import styles from './history.module.css'

const History = props => {

  return (
      <div className={styles.History}>
        <div className={styles.Line}/>
        <div className={styles.Box}>
          <h4>HISTORY (new at bottom)</h4>
          {props.history.length > 0
              ? props.history.map((stage, index) => {
                return (
                    <div>
                      <div className={styles.Stage} key={index}>
                        {index === 0 ? <h4>GAME START</h4> : ''}
                        <small>{index + 1} -</small>
                        {stage}

                      </div>
                      {stage === "DAY IS OVER"
                          ? <div className={styles.Hr}/>
                          : ''}
                    </div>
                )
              })
              : ''
          }
        </div>
      </div>
  )
};

function mapStateToProps(state) {
  return {
    history: state.mafiaReducer.history,
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(History);