import React from 'react'
import styles from './TopGroupLayout.module.scss'

 const TopGroupLayout = ({ children }) => {
  return (
    <div className={styles.topGroupLayout}>
        {children}
    </div>
  )
}

export default TopGroupLayout