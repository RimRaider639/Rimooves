import React from 'react'
import styles from '../styles/Home.module.css'
import Movie from './Movie'

const Movies = ({data}) => {
  return (
    <div className={styles.grid}>
        {data && data.map(movie=><Movie key={movie.id} {...movie}/>)}
    </div>
  )
}

export default Movies

