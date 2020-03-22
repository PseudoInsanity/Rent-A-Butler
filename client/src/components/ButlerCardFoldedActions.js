import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ExpandMore from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import React from 'react';
import { useStyles } from './ButlerCard.js';

const ButlerCardFoldedActions = ({ expanded, setExpanded }) => {
    const classes = useStyles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    return (
        <Grid>
            <CardActions>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={() => handleExpandClick()}
                    aria-expanded={expanded}
                    aria-label="show more"
                    size="small"
                >
                    <ExpandMore />
                </IconButton>
            </CardActions>

        </Grid>
    )
};

export default ButlerCardFoldedActions;