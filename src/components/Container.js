import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { PhotoContext } from "../context/PhotoContext";
import Gallery from "./Gallery";
import Loader from "./Loader";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {doCloseModal} from "../features/slice/mountainSlice"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 400,
    width:600
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  imageModal:{
    width: 600,
    height: "auto"
  }
}));



const Container =  ({ searchTerm }) => {
  const [content, setContent] = useState([]);
  const dispatch = useDispatch();
  const { images, loading, runSearch } = useContext(PhotoContext);
  const {bird, beach, mountain, food, search, modalView, modalLoading, image} = useSelector(store => store.mountain)
  const classes = useStyles();
  // const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    dispatch(
      doCloseModal()
    )
  };

  const filterList = ['beach', 'bird', 'food', 'mountain'];
  useEffect(() => {
    if (!filterList.includes(searchTerm)) {
      runSearch(searchTerm);
      setContent(images);
    }
  }, [searchTerm])


  const isEmpty = (array) => {
    if (array == undefined) {
      return true;
    }
    if (array)
      return ! (Array.isArray(array) && (array.length > 0 ));
    return false;
  }

  const getItems = (searchTerm) => {
    let response = runSearch(searchTerm);
    setContent(images);
    // content = beach;
  }

  
  useEffect( () => {
    switch(searchTerm) {
      case 'beach':
        if (beach)
          setContent(beach);
        else
          runSearch(searchTerm);
        break
      case 'bird':
        if (bird)
          setContent(bird);
        else
          runSearch(searchTerm);
        break
      case 'food':
        if (food)
          setContent(food);
        else
          runSearch(searchTerm);
        break
      case 'mountain':
        if (mountain)
          setContent(mountain);
        else
          runSearch(searchTerm);
        break
      default:
        setContent(search);
        break
    }
  }, [searchTerm, content, bird, beach, mountain, food, search]);

  return (
    <React.Fragment>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={modalView}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalView}>
              {modalLoading ? <Loader /> : 
                <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={image.url}
                    title={image.title["_content"]}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {image.title["_content"]}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {image.description["_content"]}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              }
          </Fade>
        </Modal>
      </div>
      <div className="photo-container">
        {loading ? <Loader /> : <Gallery data={content} />}
      </div>
    </React.Fragment>
  );
};

export default Container;
