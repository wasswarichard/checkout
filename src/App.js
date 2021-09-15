import './App.css';
import Checkout from "./pages/Checkout";
import React, {createContext, useState} from "react";

export const paymentStateDataContext = createContext({
    paymentState: '',
    setPaymentState: () => {}
})

function App() {
    const [paymentState, setPaymentState] = useState('');
  return (
    <div className="App">
        <paymentStateDataContext.Provider value={{paymentState, setPaymentState}}>
            <Checkout/>
        </paymentStateDataContext.Provider>
    </div>
  );
}

export default App;
