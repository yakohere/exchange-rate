import { useEffect, useState } from "react";
import CustomInputFrom from "./util/customInputFrom";
import CustomInputTo from "./util/customInputTo";
import styled from "styled-components";
import { change_from_currency, change_from_amount, get_initial_values } from "./store";
import { connect } from "react-redux";
import axios from "axios";
import AddIcon from "./icons/add.svg";

const Converter = (props) => {
    const [from, setFrom] = useState({ currency: "", amount: 0 });
    const [to, setTo] = useState([{ id: 1, currency: "", amount: 0 }]);
    const [rates, setRates] = useState([]);

    const { change_from_currency, change_from_amount, get_initial_values, toes, state } = props;

    console.log(state);

    useEffect(() => {
        get_initial_values();
    }, []);

    // const fromSelectFieldChange = (e) => {
    //     setFrom((prevState) => ({ ...prevState, currency: e.target.value }));

    //     axios.get(`https://api.exchangeratesapi.io/latest?base=${e.target.value}`).then(res => {
    //         setRates(res.data.rates);
    //         let temporaryArray = to.slice();
    //         temporaryArray.map(array => array.amount = from.amount * res.data.rates[array.currency]);
    //         setTo(temporaryArray);
    //     });
    // };

    // const fromAmountFieldChange = (e) => {
    //     setFrom((prevState) => ({ ...prevState, amount: e.target.value }));
    //     //currencies
    //     let temporaryArray = to.slice();
    //     temporaryArray.map(array => array.amount = e.target.value * rates[array.currency]);
    //     setTo(temporaryArray);
    // };

    const toSelectFieldChange = (e, id) => {
        let index = to.findIndex(x => x.id === id);
        let temporaryArray = to.slice();
        temporaryArray[index]["currency"] = e.target.value;
        temporaryArray.map(array => array.amount = from.amount * rates[array.currency]);
        setTo(temporaryArray);
    };

    const addCurrencyHandler = () => {
        setTo(prevState => [...prevState, { id: prevState[prevState.length - 1].id + 1, currency: "", amount: 0 }]);
    };

    const removeToHandler = (id) => {
        setTo(prevState => [...prevState.filter(el => el.id !== id)]);
    };

    return (
        <Wrapper>
            <Inputs>
                <CustomInputFrom
                    currencyChange={(e) => change_from_currency(e.target.value)}
                    amountChange={(e) => change_from_amount(e.target.value)}
                />

                <div className="equal"><span /><span /></div>
                {toes.map((to) =>
                    <CustomInputTo
                        key={to.id}
                        toCurrency={to.currency}
                        toAmount={to.amount}
                        iconDisplay={to.id === 1 ? "none" : "block"}
                        removeTo={() => removeToHandler(to.id)}
                        selectChange={(e) => toSelectFieldChange(e, to.id)}
                    />
                )}
                <img src={AddIcon} onClick={addCurrencyHandler} />
            </Inputs>
        </Wrapper>
    );
};

const mapStateToProps = (state) => ({
    currencies: state.currencies,
    state: state,
    toes: state.toes
});


const mapDispatchToProps = {
    change_from_currency,
    change_from_amount,
    get_initial_values
};

export default connect(mapStateToProps, mapDispatchToProps)(Converter);

const Inputs = styled.div`
    display: flex;
    overflow-x: auto;
    align-items: center;

    img {
        width: 50px;
        cursor: pointer;
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
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
