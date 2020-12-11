import styled from "styled-components";
import { connect } from "react-redux";

const CustomInputFrom = (props) => {
    return (
        <Wrapper>
            <h2>FROM</h2>
            <Input>
                <Select onChange={props.currencyChange}>
                    <option defaultValue="selected">{props.from}</option>
                    {props.currencies.map(currency => <option key={currency}>{currency}</option>)}
                </Select>
                <TextField type="number" onChange={props.amountChange} defaultValue="1" />
            </Input>
        </Wrapper>
    );
};

const mapStateToProps = (state) => ({
    currencies: state.currencies,
    from: state.from.currency
});

export default connect(mapStateToProps)(CustomInputFrom);

const Wrapper = styled.div` 
`;

const Input = styled.div`
    width: 250px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    border: 2px solid #2600ff;
    box-shadow: 0px 0px 10px 0px rgba(38,0,255,0.5);
    border-radius: 5px;
`;

const Select = styled.select`
    border: none; 
    border-radius: 5px;
    outline: none;
    font-weight: 700;
    font-size: 20px; 
`;

const TextField = styled.input`
    width: 160px;  
    border: none;
    border-radius: 5px;
    outline: none; 
    font-weight: 700;
    font-size: 20px; 
`;