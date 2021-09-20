import React, {useContext, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CreditCardInput from 'react-credit-card-input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {paymentStateDataContext} from "../App";

export const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

export default function PaymentForm({handleNext}) {
    const classes = useStyles();
    const {setPaymentState} = useContext(paymentStateDataContext)
    const [formState, setFormState] = useState({
        values: {
            firstName: "",
            lastName: "",
            email: "",
            confirmEmail: "",
            cardNumber: "",
            expiryYear: "",
            cvc: "",
            amount: "",
            currency: "",
            ref: "000000000"

        }
    })
    useEffect(() => {
        setPaymentState(formState.values)
    }, [setFormState, formState.values, setPaymentState])

    const inputChangeHandler = (event) => {
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name] : event.target.value
            }
        }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        handleNext()
    }
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <Typography variant="h6" gutterBottom>
                    Contact Information
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            fullWidth
                            autoComplete="fname"
                            onChange={inputChangeHandler}
                            value={formState.values.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            autoComplete="lname"
                            onChange={inputChangeHandler}
                            value={formState.values.lastName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Enter Your Email"
                            fullWidth
                            autoComplete="email"
                            onChange={inputChangeHandler}
                            value={formState.values.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="email"
                            name="confirmEmail"
                            label="Confirm Your Email"
                            fullWidth
                            autoComplete="email"
                            onChange={inputChangeHandler}
                            value={formState.values.confirmEmail}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel htmlFor="grouped-native-select">Currency</InputLabel>
                        <Select native={true}
                                id="currency"
                                name="currency"
                                fullWidth
                                required
                                defaultValue=""
                                onChange={ event => inputChangeHandler(event)}
                        >
                            <option aria-label="None" value="" />
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="RUB">RUB</option>
                            <option value="TRY">TRY</option>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="number"
                            inputProps={{className:'digitsOnly', min: 30}}
                            defaultValue="30"
                            required
                            id="amount"
                            name="amount"
                            label="amount"
                            fullWidth
                            onChange={inputChangeHandler}
                            value={formState.values.amount}
                        />
                    </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom style={{marginTop: "12px"}}>
                    Debit or Credit Payment
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CreditCardInput
                            containerClassName="custom-container"
                            containerStyle={{
                                border: '3px solid grey',
                                padding: '20px',
                                fontSize: '30px'
                            }}
                            cardNumberInputProps={{
                                name: 'cardNumber',
                                value: formState.values.cardNumber,
                                onChange: event => inputChangeHandler(event)
                            }}
                            cardExpiryInputProps={{
                                name: 'expiryYear',
                                value: formState.values.expiryYear,
                                onChange: event => inputChangeHandler(event)
                            }}
                            cardCVCInputProps={{
                                name: 'cvc',
                                value: formState.values.cvc,
                                onChange: event => inputChangeHandler(event)
                            }}
                        />
                    </Grid>
                </Grid>
                <div className={classes.buttons}>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Place order
                    </Button>
                </div>
            </form>

        </React.Fragment>
    );
}