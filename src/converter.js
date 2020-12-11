import CustomInputFrom from "./util/customInputFrom";
import CustomInputTo from "./util/customInputTo";
import styled from "styled-components";
import { change_from_currency, change_from_amount, get_initial_values, change_to_currency, add_to, remove_to } from "./store/actions";
import { connect } from "react-redux";
import AddIcon from "./icons/add.svg";
import ArrowIcon from "./icons/arrow.svg";

const Converter = (props) => {
    const { change_from_currency, change_from_amount, change_to_currency, add_to, remove_to, converterId, currencies, defFromCurr, toes, fromAmount } = props;

    return (
        <Wrapper>
            <Inputs>
                <CustomInputFrom
                    currencyChange={(e) => change_from_currency(e.target.value, converterId)}
                    amountChange={(e) => change_from_amount(e.target.value, converterId)}
                    addClicked={() => add_to(converterId)}
                    currencies={currencies}
                    defFromCurr={defFromCurr}
                    fromAmount={fromAmount}
                />

                <img src={ArrowIcon} className="arrow" alt="arrow" />

                <Toes>
                    {toes.map((to) =>
                        <CustomInputTo
                            key={to.id}
                            toCurrency={to.currency}
                            toAmount={to.amount}
                            iconDisplay={to.id === 1 ? "none" : "block"}
                            toCurrencyChange={(e) => change_to_currency(e.target.value, to.id, converterId)}
                            removeTo={() => remove_to(to.id, converterId)}
                            currencies={currencies}
                        />
                    )}
                </Toes>

                <img src={AddIcon} onClick={() => add_to(converterId)} className="add" alt="add" />
            </Inputs>
        </Wrapper>
    );
};

const mapDispatchToProps = {
    change_from_currency,
    change_from_amount,
    get_initial_values,
    change_to_currency,
    add_to,
    remove_to
};

export default connect(null, mapDispatchToProps)(Converter);

const Wrapper = styled.div`
    display: flex;   
    margin: 10px 0; 
`;

const Toes = styled.div`
    display: flex;
`;

const Inputs = styled.div`
    display: flex; 
    align-items: center;

    .arrow {   
        min-width: 50px;
        margin: 0 15px; 
    }

    .add {
        min-width: 40px;
        margin: 0 15px; 
        cursor: pointer;
    }
`;

