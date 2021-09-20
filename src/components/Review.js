import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {paymentStateDataContext} from "../App";
import Button from '@material-ui/core/Button';
import axios from "axios";
import * as config from "../helpers/config";

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

export default function Review({handleBack, handleNext}) {
    const classes = useStyles();
    const {paymentState} = useContext(paymentStateDataContext);
    const handlePlaceOrder = () => {
        axios.get(`${config.apiUrl}/widget?amount=${paymentState.amount}&currency=${paymentState.currency}&ref=${paymentState.ref}`)
            .then(response => {
                if(response.status === 200) {
                    handleNext()
                }
            }).catch(error => {
            console.log(error)
        })
    }
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {paymentState.amount} {paymentState.currency}
                    </Typography>
                </ListItem>
            </List>
            <div className={classes.buttons}>
                <Button onClick={handleBack} className={classes.button}>Back</Button>
                <Button onClick={handlePlaceOrder} variant="contained" color="primary" className={classes.button}>
                   Place order
                </Button>
            </div>
        </React.Fragment>
    );
}