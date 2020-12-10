import { useEffect, useState } from "react";
import CustomInputFrom from "./util/customInputFrom";
import CustomInputTo from "./util/customInputTo";
import { CustomButton } from "./util/myButton";
import styled from "styled-components";
import { getCurrencies } from "./store";
import { connect } from "react-redux";
import axios from "axios";

const Converter = (props) => {
    const [from, setFrom] = useState({ currency: "", amount: "" });
    const [to, setTo] = useState({ currency: "", amount: "0" });
    const [rates, setRates] = useState([]);

    useEffect(() => {
        props.getCurrencies();
    }, []);

    const currencyFromChange = (e) => {
        setFrom((prevState) => ({ ...prevState, currency: e.target.value }));

        axios.get(`https://api.exchangeratesapi.io/latest?base=${e.target.value}`).then(res => {
            setRates(res.data.rates);
        });
    };

    const inputFrom = (e) => {
        setFrom((prevState) => ({ ...prevState, amount: e.target.value }));
        setTo((prevState) => ({ ...prevState, amount: e.target.value * rates[to.currency] }))
    };

    const currencyToChange = (e) => {
        setTo((prevState) => ({ ...prevState, currency: e.target.value }));

    };

    return (
        <Wrapper>
            <CustomInputFrom selectChange={currencyFromChange} inputChange={inputFrom} />
            <div className="equal"><span /><span /></div>
            <CustomInputTo selectChange={currencyToChange} number={to.amount} />
            <CustomButton />
        </Wrapper>
    );
};

const mapDispatchToProps = {
    getCurrencies
};

export default connect(null, mapDispatchToProps)(Converter);

const Wrapper = styled.div`
    display: flex;
    width: auto; 
    align-items: center;

    .equal {
        width: 100px;
        height: 30px; 
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        span{
            width: 30px;
            height: 3px;
            background-color: #000;
        }
    }
`;
