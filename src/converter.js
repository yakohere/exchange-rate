import { useState } from "react";
import { CustomInput } from "./util/myInput";
import { CustomButton } from "./util/myButton";
import styled from "styled-components";

const Converter = () => {
    const [from, setFrom] = useState("RUB");
    const [to, setTo] = useState([]);

    const selectChangeHandler = (e) => {
        setFrom(e.target.value);
    }

    return (
        <Wrapper>
            <CustomInput selectChange={selectChangeHandler} />
            <div className="equal"><span /><span /></div>
            <CustomInput selectChange={selectChangeHandler} />
        </Wrapper>
    );
}

export default Converter;

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
