import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(_ => ({
  root: {
    position: 'relative'
  },
  loader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const Tile = ({ breed }) => {
  const [loaded, setLoaded] = useState(false)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <img
        src={breed.image}
        onLoad={() => {
          setTimeout(() => setLoaded(true), 1000)
        }}
        alt=""
        height={200} width="100%" />
      {
        !loaded &&
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      }
    </div>
  )
}

export default Tile
