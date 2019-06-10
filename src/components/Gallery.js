import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import { makeStyles } from '@material-ui/core/styles'
import { fetchBreeds, fetchFavorites } from '../redux/actions'
import Tile from './Tile'
import Card from '@material-ui/core/Card';
import Info from './Info';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100vw',
    height: 'calc(100vh - 64px)',
  },
  bar: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    overflow: 'hidden'
  },
  loader: {
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const Gallery = (props) => {
  const dispatch = useDispatch()
  const { breeds, loading } = useSelector(state => state.cats)

  useEffect(() => {
    dispatch(fetchBreeds())
    dispatch(fetchFavorites())
  }, [dispatch])

  const classes = useStyles();

  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) {
      return 7;
    }

    if (isWidthUp('lg', props.width)) {
      return 5;
    }

    if (isWidthUp('md', props.width)) {
      return 4;
    }

    if (isWidthUp('sm', props.width)) {
      return 3;
    }

    if (isWidthDown('sm', props.width)) {
      return 2;
    }

    return 1;
  }

  return (
    <div style={{ marginTop: 64 }}>
      <GridList
        cellHeight={200}
        spacing={2}
        cols={getGridListCols()}
        className={classes.gridList}>
        {breeds.map(breed => (
          <GridListTile key={breed.id}>
            <Card>
              <Tile breed={breed} />
            </Card>
            <GridListTileBar
              classes={{ root: classes.bar }}
              title={breed.name}
              subtitle={<span>{breed.origin}</span>}
              actionIcon={
                <Info data={breed} />
              }
            />
          </GridListTile>
        ))}
      </GridList>
      {
        loading &&
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      }
    </div>
  )
}

Gallery.whyDidYouRender = true

export default withWidth()(Gallery)
