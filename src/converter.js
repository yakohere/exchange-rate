import { useEffect, useState } from "react";
import CustomInputFrom from "./util/customInputFrom";
import CustomInputTo from "./util/customInputTo";
import { CustomButton } from "./util/myButton";
import styled from "styled-components";
import { getCurrencies } from "./store";
import { connect } from "react-redux";

const Converter = (props) => {
    const [from, setFrom] = useState({ currency: "", amount: "" });
    const [to, setTo] = useState([
        {
            currency: "",
            amount: ""
        }
    ]);

    useEffect(() => {
        props.getCurrencies();
    }, []);

    const selectChangeHandler = (e) => {
        setFrom((prevState) => ({ ...prevState, currency: e.target.value }));
    };

    const inputChangeHandler = (e) => {
        setFrom((prevState) => ({ ...prevState, amount: e.target.value }));
    }

    return (
        <Wrapper>
            <CustomInputFrom selectChange={selectChangeHandler} inputChange={inputChangeHandler} />

            <div className="equal"><span /><span /></div>

            {
                to.map(e => <CustomInputTo selectChange={selectChangeHandler} />)
            }

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
