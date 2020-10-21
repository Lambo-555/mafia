import React from 'react'
import {connect} from "react-redux";
import styles from './header.module.css'
import {Link} from "react-router-dom";

const Header = (props) => {
  return (
      <nav className={styles.Header}>
        <ul className={styles.Menu}>
          <div className={styles.Logo}/>
          <li className={styles.MenuItem}>
            <Link className={styles.MenuLink} to='/'>Game</Link>
          </li>
          {props.history.length > 0
              ? <li className={styles.MenuItem}>
                <Link className={styles.MenuLink} to='/history'>History</Link>
              </li>
              : ''
          }
          <li className={styles.MenuItem}>
            <Link className={styles.MenuLink} to='/about'>About</Link>
          </li>
        </ul>
      </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
