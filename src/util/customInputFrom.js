import styled from "styled-components";
import { connect } from "react-redux";

const CustomInputFrom = (props) => {
    return (
        <Wrapper>
            <Select onChange={props.selectChange}>
                <option defaultValue="selected">SELECT</option>
                {props.currencies.map(currency => <option key={currency}>{currency}</option>)}
            </Select>
            <Input type="number" onChange={props.inputChange} defaultValue="0" />
        </Wrapper>
    );
};


const mapStateToProps = (state) => ({
    currencies: state.currencies
});

export default connect(mapStateToProps)(CustomInputFrom);

const Wrapper = styled.div`
    width: 250px;
    height: 50px;
    display: flex;
    border: 2px solid #2600ff;
    box-shadow: 0px 0px 10px 0px rgba(38,0,255,0.5);
    border-radius: 5px;
    margin: 0 10px;
`;

const Select = styled.select`
    border: none;
    border-radius: 5px;
    outline: none;
    font-weight: 700;
    font-size: 20px; 
`;

const Input = styled.input`
    width: 55%; 
    border: none;
    border-radius: 5px;
    outline: none; 
    font-weight: 700;
    font-size: 20px; 
`;