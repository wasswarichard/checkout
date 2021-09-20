import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';
import Grid from "@material-ui/core/Grid";
import Iframe from "react-iframe";
import {paymentStateDataContext} from "../App";

export const useStyles = makeStyles((theme) => ({
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


export default function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const {paymentState} = useContext(paymentStateDataContext);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <PaymentForm handleNext={handleNext}/>;
            case 1:
                return <Review handleNext={handleNext} handleBack={handleBack}/>;
            default:
                throw new Error('Unknown step');
        }
    }
    const paymentUrl =`https://topup.vercel.app/widget?amount=${paymentState.amount}&currency=${paymentState.currency}&ref=${paymentState.ref}`

    return (
        <React.Fragment>
            <CssBaseline />
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
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Iframe url={paymentUrl}
                                                width="100%"
                                                height="350px"
                                                position="relative"
                                                frameBorder="0"
                                                display="block"

                                        />
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}