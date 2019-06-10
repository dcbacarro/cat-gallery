import React, { useState, useEffect, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import InfoIcon from '@material-ui/icons/Info'
import Grow from '@material-ui/core/Grow'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Location from '@material-ui/icons/LocationOnRounded'
import StarFull from '@material-ui/icons/StarRounded'
import StarEmpty from '@material-ui/icons/StarBorderRounded'
import Checkbox from '@material-ui/core/Checkbox'
import Favorite from '@material-ui/icons/FavoriteRounded'
import FavoriteOutline from '@material-ui/icons/FavoriteBorderRounded'
import Link from '@material-ui/core/Link'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Rating from 'react-rating'
import SwipeableView from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import { fetchFavorites } from '../redux/actions'
import deepEqual from 'deep-equal'

const AutoSwipeView = autoPlay(SwipeableView)

const useStyles = makeStyles(_ => ({
  contentRoot: {
    padding: 0,
    height: '80vh'
  },
  main: {
    padding: '8px 16px',
    // maxHeight: 'calc(80vh - 282px)',
    // overflowY: 'auto'
  },
  image: {
    height: 250,
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  rates: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    padding: '8px 0',
    backgroundColor: '#ffffff'
  },
  slides: {
    position: 'relative'
  },
  fav: {
    position: 'absolute',
    top: 8,
    right: 8
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow in ref={ref} {...props} />;
});

const fetchImages = async(breedId) => {
  const res = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=8`)
  const raw = await res.json()
  return raw.map(r => {
    return {
      url: r.url,
      id: r.id
    }
  })
}

const Info = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const classes = useStyles()
  const theme = useTheme()
  const favorites = useSelector(state => state.cats.favorites)
  const dispatch = useDispatch()

  const addFavorite = async(imageId) => {
    await fetch(`https://api.thecatapi.com/v1/favourites`, {
      method: 'POST',
      body: JSON.stringify({
        image_id: imageId,
        sub_id: "Me"
      }),
      headers: {
        "x-api-key": "41245267-003b-48d3-a1bf-6d19f75dc6b3",
        "Content-Type": "application/json"
      }
    })
    dispatch(fetchFavorites())
  }

  const deleteFavorite = async(favoriteId) => {
    if (typeof favoriteId !== "boolean") {
      await fetch(`https://api.thecatapi.com/v1/favourites/${favoriteId}`, {
        method: 'DELETE',
        headers: {
          "x-api-key": "41245267-003b-48d3-a1bf-6d19f75dc6b3"
        }
      })
      dispatch(fetchFavorites())
    }
  }

  useEffect(() => {
    if (open) {
      async function doFetch() {
        let imgs = await fetchImages(data.id)
        imgs = imgs.map(image => {
          const index = favorites.findIndex(fav => fav.image_id === image.id)
          if (index !== -1)
            image.favoriteId = favorites[index].id
          else
            image.favoriteId = null
          return image
        })
        if (!deepEqual(images, imgs)) setImages(imgs)
      }
      doFetch()
    }
  }, [open, data.id, favorites, images])

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleStepChange(step) {
    setActiveIndex(step);
  }

  return (
    <>
      <IconButton onClick={handleClickOpen} className={classes.icon}>
        <InfoIcon />
      </IconButton> 
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
      >
        <DialogContent classes={{ root: classes.contentRoot }}>
          {
            images.length > 0 &&
            <AutoSwipeView
              interval={8000}
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeIndex}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {images.map((step, index) => (
                <div className={classes.slides} key={step.id}>
                  {Math.abs(activeIndex - index) <= 2 ? (
                    <div className={classes.image}
                      style={{ backgroundImage: `url(${step.url})` }}></div>
                  ) : null}
                  <div className={classes.fav}>
                    <Checkbox
                      defaultChecked={Boolean(step.favoriteId)}
                      onChange={() => {
                        if (!Boolean(step.favoriteId)) addFavorite(step.id)
                        else deleteFavorite(step.favoriteId)
                      }}
                      checkedIcon={<Favorite />}
                      icon={<FavoriteOutline color="secondary" opacity={0.3} />} />
                  </div>
                </div>
              ))}
            </AutoSwipeView>
          }
          <div className={classes.main}>
            <div className={classes.title}>
              <Typography variant="h4" gutterBottom>
                { data.name }
              </Typography>
              <Chip
                color="primary"
                label={data.origin}
                avatar={<Avatar><Location /></Avatar>} />
            </div>
            <DialogContentText>
              <strong>{ data.imageVotes }</strong>
              { data.description }
            </DialogContentText>
            <div style={{ marginBottom: 16 }}>
              {
                data.temperament.split(",").map(t => (
                  <Chip style={{ marginRight: 4 }} size="small" key={t} label={t.trim()} />
                ))
              }
            </div>
            <div className={classes.rates}>
              <Typography variant="subtitle2">Affection</Typography>
              <Rating
                emptySymbol={<StarEmpty color="primary" />}
                fullSymbol={<StarFull color="primary" />}
                readonly={true}
                initialRating={data.affection_level} />
            </div>
            <div className={classes.rates}>
              <Typography variant="subtitle2">Adaptability</Typography>
              <Rating
                emptySymbol={<StarEmpty color="primary" />}
                fullSymbol={<StarFull color="primary" />}
                readonly={true}
                initialRating={data.adaptability} />
            </div>
            <div className={classes.rates}>
              <Typography variant="subtitle2">Child Friendly</Typography>
              <Rating
                emptySymbol={<StarEmpty color="primary" />}
                fullSymbol={<StarFull color="primary" />}
                readonly={true}
                initialRating={data.child_friendly} />
            </div>
            <div className={classes.rates}>
              <Typography variant="subtitle2">Dog Friendly</Typography>
              <Rating
                emptySymbol={<StarEmpty color="primary" />}
                fullSymbol={<StarFull color="primary" />}
                readonly={true}
                initialRating={data.dog_friendly} />
            </div>
            <div className={classes.rates}>
              <Typography variant="subtitle2">Energy Level</Typography>
              <Rating
                emptySymbol={<StarEmpty color="primary" />}
                fullSymbol={<StarFull color="primary" />}
                readonly={true}
                initialRating={data.energy_level} />
            </div>
            <div className={classes.rates}>
              <Typography variant="subtitle2">Grooming</Typography>
              <Rating
                emptySymbol={<StarEmpty color="primary" />}
                fullSymbol={<StarFull color="primary" />}
                readonly={true}
                initialRating={data.grooming} />
            </div>
            <div className={classes.rates}>
              <Typography variant="subtitle2">Health Issues</Typography>
              <Rating
                emptySymbol={<StarEmpty color="primary" />}
                fullSymbol={<StarFull color="primary" />}
                readonly={true}
                initialRating={data.health_issues} />
            </div>
            <div className={classes.rates}>
              <Typography variant="subtitle2">Intelligence</Typography>
              <Rating
                emptySymbol={<StarEmpty color="primary" />}
                fullSymbol={<StarFull color="primary" />}
                readonly={true}
                initialRating={data.intelligence} />
            </div>
            <div className={classes.rates}>
              <Typography variant="subtitle2">Shedding Level</Typography>
              <Rating
                emptySymbol={<StarEmpty color="primary" />}
                fullSymbol={<StarFull color="primary" />}
                readonly={true}
                initialRating={data.shedding_level} />
            </div>
            <div className={classes.rates}>
              <Typography variant="subtitle2">Social Needs</Typography>
              <Rating
                emptySymbol={<StarEmpty color="primary" />}
                fullSymbol={<StarFull color="primary" />}
                readonly={true}
                initialRating={data.social_needs} />
            </div>
            <div className={classes.rates}>
              <Typography variant="subtitle2">Stranger Friendly</Typography>
              <Rating
                emptySymbol={<StarEmpty color="primary" />}
                fullSymbol={<StarFull color="primary" />}
                readonly={true}
                initialRating={data.stranger_friendly} />
            </div>
            <div className={classes.rates}>
              <Typography variant="subtitle2">Vocalisation</Typography>
              <Rating
                emptySymbol={<StarEmpty color="primary" />}
                fullSymbol={<StarFull color="primary" />}
                readonly={true}
                initialRating={data.vocalisation} />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Link href={data.wikipedia_url} target="_blank">
            <Button color="primary">
              Wikipedia
            </Button>
          </Link>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

Info.whyDidYouRender = true

export default memo(Info)
