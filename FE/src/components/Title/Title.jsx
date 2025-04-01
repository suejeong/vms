import React from 'react'
import styles from './Title.module.scss'

function Title({ text }) {
  return (
    <h2 className={styles.h2Title}>{text}</h2>
  )
}

export default Title