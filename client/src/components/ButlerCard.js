import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SubscriptionModal from "./SubscriptionModal";
import Grid from "@material-ui/core/Grid";
import ButlerCardExpand from './ButlerCardExpand';
import ButlerCardFoldedActions from './ButlerCardFoldedActions';

export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 345,
    maxWidth: 350,
    margin: 20,
    flex: "1 0 20"
  },
  media: {
    height: 140
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  username: {
    display: "flex",
    color: theme.palette.secondary.light
  },
  large: {
    display: 'flex',
    justifyContent: 'space-around',
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

function ButlerCard({
  open,
  handleClose,
  handleSubscribe,
  listOfSubscribedServices,
  setListOfSubscribedServices,
  handleOpen,
  allServices,
  rating
}) {

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

  const subscribeButtonText = (item) => {
    return listOfSubscribedServices.findIndex(i => i === item) !== -1
      ? "Subscribed!"
      : "Subscribe";
  }



  return (
    <div className={classes.container}>
      {allServices.filter(item => (!(item.userId === userFromLocalStorage[0].user._id))).map((item, index) => (
        <Card className={classes.root} key={index}>
          <CardMedia
            className={classes.media}
            image={require(`../resources/${item.img_url}`)}
            title="Profile picture"
          />
          <CardContent>
            <Grid container item xs={12}>
              <Grid item xs={11}>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.serviceName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.serviceDescription}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="h6"> {`$${item.servicePrice}`} </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid direction="row" item xs={12}>
              <Button
                size="small"
                color="primary"
                onClick={() => handleOpen(item)}
              >
                {subscribeButtonText(item)}
              </Button>
              <ButlerCardFoldedActions
                expanded={expanded}
                setExpanded={setExpanded}
              />
              <ButlerCardExpand
                expanded={expanded}
                rating={rating}
              />
            </Grid>
            <Typography variant="body1" className={classes.username}>
              {" "}
              {item.userName}{" "} </Typography><Grid>
            </Grid>
          </CardActions>
        </Card>
      ))}
      <SubscriptionModal
        open={open}
        handleClose={handleClose}
        handleSubscribe={handleSubscribe}
      />
    </div>
  );
}
export default ButlerCard;
