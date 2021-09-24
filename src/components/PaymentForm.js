import React, {useContext, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {paymentStateDataContext} from "../App";
import {
    findDebitCardType,
    minLength,
    stripeCardExpirValidation,
    stripeCardNumberValidation,
    textWithSpacesOnly
} from "./CreditCard/validations";
import {CARDARR, CARDICON} from "./CreditCard/constant";
import styled from "styled-components";

const Error = styled.span`
  font-size: 13px;
  font-weight: bold;
  color: red;
`;

export const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    }
}));

export default function PaymentForm({handleNext}) {
    const classes = useStyles();
    const {setPaymentState} = useContext(paymentStateDataContext)
    const [cardType, setCardType] = useState("");
    const [error, setError] = React.useState({});
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
            ref: "000000000",
            cardName: "",
            focus: "",
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

    const handleValidation = (type, value) => {
        let errorText;
        switch (type) {
            case "cardNumber":
                setCardType(findDebitCardType(value));
                errorText = stripeCardNumberValidation(value);
                setError({...error, cardError: errorText});
                break;
            case "cardName":
                errorText = value === "" ? "Required" : textWithSpacesOnly(value);
                setError({ ...error, cardNameError: errorText });
                break;
            case "expiryYear":
                errorText =
                    value === "" ? "Required" : stripeCardExpirValidation(value);
                setError({ ...error, expiryYearError: errorText });
                break;
            case "cvc":
                errorText = value === "" ? "Required" : minLength(3)(value);
                setError({ ...error, cvcError: errorText });
                break;
            default:
                break

        }

    }
    const handleBur = (event) => {
        handleValidation(event.target.name, event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if(formState.values.email === formState.values.confirmEmail){
            handleNext()
        }else {
            setError({...error, emailError: 'Please provide similar email'})
        }

    }
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <Typography variant="h6" gutterBottom>
                    Contact Information
                </Typography>
                {error && error.emailError && error.emailError.length > 1 && (
                    <Error>{error.emailError}</Error>
                )}
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
                <Typography variant="h6" gutterBottom style={{marginTop: "25px"}}>
                    Debit or Credit Payment
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="cardNumber"
                                name="cardNumber"
                                label="Card Number"
                                fullWidth
                                onChange={inputChangeHandler}
                                value={formState.values.cardNumber}
                                onBlur={handleBur}
                            />
                        {(!error || !error.cardError) && CARDARR.includes(cardType) && (
                            <img
                                style={{
                                    float: "right",
                                    position: "relative",
                                    top: "-35px"
                                }}
                                src={CARDICON[cardType]}
                                alt="card"
                                width="50px"
                                height="33px"
                            />
                        )}
                        {error && error.cardError && error.cardError.length > 1 && (
                            <Error>{error.cardError}</Error>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="cvc"
                            name="cvc"
                            label="CVC"
                            fullWidth
                            onChange={inputChangeHandler}
                            value={formState.values.cvc}
                            inputProps={{ maxLength: 4 }}
                            onBlur={handleBur}
                        />
                        {error && error.cvcError && error.cvcError.length > 1 && (
                            <Error>{error.cvcError}</Error>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="cardName"
                            name="cardName"
                            label="Card Name"
                            fullWidth
                            onChange={inputChangeHandler}
                            value={formState.values.cardName}
                            onBlur={handleBur}
                        />
                        {error && error.cardNameError && error.cardNameError.length > 1 && (
                            <Error>{error.cardNameError}</Error>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            name="expiryYear"
                            label="Expiry Date (MM/YY)"
                            fullWidth
                            inputProps={{ maxLength: 5 }}
                            onChange={inputChangeHandler}
                            value={formState.values.expiryYear}
                            onBlur={handleBur}
                        />
                        {error && error.expiryYearError && error.expiryYearError.length > 1 && (
                            <Error>{error.expiryYearError}</Error>
                        )}
                    </Grid>

                </Grid>
                <div className={classes.buttons}>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Next
                    </Button>
                </div>
            </form>

        </React.Fragment>
    );
}