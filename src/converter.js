import { useEffect, useState } from "react";
import CustomInputFrom from "./util/customInputFrom";
import CustomInputTo from "./util/customInputTo";
import { CustomButton } from "./util/myButton";
import styled from "styled-components";
import { getCurrencies } from "./store";
import { connect } from "react-redux";
import axios from "axios";

const Converter = (props) => {
    const [from, setFrom] = useState({ currency: "", amount: 0 });
    const [to, setTo] = useState([{ id: 1, currency: "", amount: 0 }]);
    const [rates, setRates] = useState([]);

    useEffect(() => {
        props.getCurrencies();
    }, []);

    const fromSelectFieldChange = (e) => {
        setFrom((prevState) => ({ ...prevState, currency: e.target.value }));

        axios.get(`https://api.exchangeratesapi.io/latest?base=${e.target.value}`).then(res => {
            setRates(res.data.rates);
            let temporaryArray = to.slice();
            temporaryArray.map(array => array.amount = from.amount * res.data.rates[array.currency]);
            setTo(temporaryArray);
        });
    };

    const fromAmountFieldChange = (e) => {
        setFrom((prevState) => ({ ...prevState, amount: e.target.value }));
        let temporaryArray = to.slice();
        temporaryArray.map(array => array.amount = e.target.value * rates[array.currency]);
        setTo(temporaryArray);
    };

    const toSelectFieldChange = (e, id) => {
        let index = to.findIndex(x => x.id === id);
        let temporaryArray = to.slice();
        temporaryArray[index]["currency"] = e.target.value;
        temporaryArray.map(array => array.amount = from.amount * rates[array.currency]);
        setTo(temporaryArray);

    };

    const addCurrencyHandler = () => {
        setTo(prevState => [...prevState, { id: prevState[prevState.length - 1].id + 1, currency: "", amount: 0 }]);
        console.log(to);
    };

    const removeToHandler = (id) => {
        setTo(prevState => [...prevState.filter(el => el.id !== id)]);
        console.log(to);
    }

    return (
        <Wrapper>
            <CustomInputFrom selectChange={fromSelectFieldChange} inputChange={fromAmountFieldChange} />
            <div className="equal"><span /><span /></div>
            {to.map((el) =>
                <CustomInputTo
                    key={el.id}
                    selectChange={(e) => toSelectFieldChange(e, el.id)}
                    number={el.amount}
                    toLength={to.length}
                    iconDisplay={el.id === 1 ? "none" : "block"}
                    removeTo={() => removeToHandler(el.id)}
                />
            )}
            <CustomButton whenClicked={addCurrencyHandler} />
        </Wrapper>
    );
};

const mapDispatchToProps = {
    getCurrencies
};

export default connect(null, mapDispatchToProps)(Converter);

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: auto; 
    align-items: center;
    overflow: auto;

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
