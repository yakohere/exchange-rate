import { useEffect, useState } from "react";
import CustomInputFrom from "./util/customInputFrom";
import CustomInputTo from "./util/customInputTo";
import styled from "styled-components";
import { change_from_currency, change_from_amount, get_initial_values, change_to_currency, add_to, remove_to } from "./store";
import { connect } from "react-redux";
import AddIcon from "./icons/add.svg";
import ChangeIcon from "./icons/change.svg";

const Converter = (props) => {
    const { change_from_currency, change_from_amount, change_to_currency, get_initial_values, add_to, toes, remove_to } = props;

    useEffect(() => {
        get_initial_values();
    }, []);

    return (
        <Wrapper>
            <Inputs>
                <CustomInputFrom
                    currencyChange={(e) => change_from_currency(e.target.value)}
                    amountChange={(e) => change_from_amount(e.target.value)}
                />

                <img src={ChangeIcon} className="change" />

                <Wrapper2>
                    <h2>TO</h2>

                    <Toes>
                        {toes.map((to) =>
                            <CustomInputTo
                                key={to.id}
                                toCurrency={to.currency}
                                toAmount={to.amount}
                                iconDisplay={to.id === 1 ? "none" : "block"}
                                toCurrencyChange={(e) => change_to_currency(e.target.value, to.id)}
                                removeTo={() => remove_to(to.id)}
                            />
                        )}
                    </Toes>
                </Wrapper2>

                <img src={AddIcon} onClick={() => add_to()} className="add" />
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
    get_initial_values,
    change_to_currency,
    add_to,
    remove_to
};

export default connect(mapStateToProps, mapDispatchToProps)(Converter);


const Wrapper2 = styled.div``;

const Toes = styled.div`
    display: flex;
`;

const Inputs = styled.div`
    display: flex;
    overflow-x: auto;
    align-items: center;

    .change {   
        min-width: 50px;
        margin: 0 15px;
        margin-top: 70px;
    }

    .add {
        min-width: 50px;
        margin: 0 15px;
        margin-top: 70px;
         cursor: pointer;
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
