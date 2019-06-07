import React, { useState } from 'react'
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
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Rating from 'react-rating'

const useStyles = makeStyles(_ => ({
  contentRoot: {
    padding: 0,
    overflow: 'hidden',
    height: '80vh'
  },
  main: {
    padding: '8px 16px',
    maxHeight: 'calc(80vh - 282px)',
    overflowY: 'auto'
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
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow in ref={ref} {...props} />;
});

const Info = ({ data }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
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
          <div className={classes.image}
              style={{ backgroundImage: `url(${data.image})` }}></div>
          <div className={classes.main}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h4" gutterBottom>
                { data.name }
              </Typography>
              <Chip
                color="primary"
                label={data.origin}
                avatar={<Avatar><Location /></Avatar>} />
            </div>
            <DialogContentText>
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

export default Info
