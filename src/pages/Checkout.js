import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';
import {paymentStateDataContext} from "../App";
import axios from "axios";
import * as config from '../helpers/config'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
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

const steps = ['Payment information', 'Review your order'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <PaymentForm />;
        case 1:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [error, setError] = useState(null);
    const {paymentState} = useContext(paymentStateDataContext);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handlePlaceOrder = () => {
        const amount = 10;
        const ref = '00000000001';
        const currency = 'USD';
        axios.get(`${config.apiUrl}/widget?amount=${amount}&currency=${currency}&ref=${ref}`)
            .then(response => {
                setError(null)
                console.log(response)
                handleNext()
            }).catch(error => {
                setError(error.response);
                console.log(error)
        })
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Company name
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Payment Information
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your purchase !.
                                </Typography>

                                <Typography variant="h7" gutterBottom>
                                    Event Name
                                </Typography>
                                <Typography variant="subtitle1">
                                    International Tour Operator Meeting 2021
                                </Typography>

                                <Typography variant="h7">
                                    Dates & Times
                                </Typography>
                                <Typography variant="subtitle1">
                                    October 1st 2021 to November 1st 2021
                                </Typography>

                                <Typography variant="h7" gutterBottom>
                                    Organizer
                                </Typography>
                                <Typography variant="subtitle1">
                                    Wood Smith infor@rizwanasafaris.com
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>Back</Button>
                                    )}
                                    <Button variant="contained" color="primary" onClick={handlePlaceOrder} className={classes.button}>
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}