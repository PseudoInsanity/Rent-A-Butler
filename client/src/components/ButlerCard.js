import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SubscriptionModal from "./SubscriptionModal";
import serviceData from "../helpers/serviceData";
import Grid from "@material-ui/core/Grid";
import useSelectedServices from "./useSelectedServices";


const useStyles = makeStyles({
  root: {
    minWidth: 345,
    maxWidth: 600,
    margin: 20,
    flex: "1 0 20"
  },
  media: {
    height: 140
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});
function ButlerCard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [subscribedService, setSubscribedService] = useState("");
  const [
    { listOfSubscribedServices },
    { setListOfSubscribedServices }
  ] = useSelectedServices();
  const handleOpen = name => {
    setOpen(true);
    setSubscribedService(name);
  };
  const handleSubscribe = () => {
    setOpen(false);
    setListOfSubscribedServices([
      ...listOfSubscribedServices,
      subscribedService
    ]);
  };
  useEffect(() => { }, [subscribedService, listOfSubscribedServices]);
  const handleClose = () => {
    setOpen(false);
    setSubscribedService("");
  };
  const subscribeButtonText = item =>
    listOfSubscribedServices.findIndex(i => i === item) !== -1
      ? "Subscribed!"
      : "Subscribe";

  return (
    <div className={classes.container}>
      {serviceData.map((item, index) => (
        <Card className={classes.root} key={index}>

          <CardMedia
            className={classes.media}
            image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />

          <CardContent>
            <Grid container xs={12}>
              <Grid item xs={11}>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.description}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="h6">{item.price}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => handleOpen(item.name)}
            >
              {subscribeButtonText(item.name)}
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
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