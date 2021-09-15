import React, {useContext, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CreditCardInput from 'react-credit-card-input';
import {paymentStateDataContext} from "../App";

export default function PaymentForm() {
    const {setPaymentState} = useContext(paymentStateDataContext)
    const [formState, setFormState] = useState({
        values: {
            firstName: "",
            lastName: "",
            email: "",
            confirmEmail: "",
            cardNumber: "",
            expiryYear: "",
            cvc: ""

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
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Contact Information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        variant="outlined"
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
                        variant="outlined"
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
                        variant="outlined"
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
                        variant="outlined"
                        id="email"
                        name="confirmEmail"
                        label="Confirm Your Email"
                        fullWidth
                        autoComplete="email"
                        onChange={inputChangeHandler}
                        value={formState.values.confirmEmail}
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
        </React.Fragment>
    );
}