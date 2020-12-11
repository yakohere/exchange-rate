import styled from "styled-components";
import { connect } from "react-redux";
import DeleteIcon from "../icons/delete.svg"

const CustomInputTo = (props) => {
    return (
        <Wrapper>
            <h2>TO</h2>
            <Input>
                <Select onChange={props.toCurrencyChange}>
                    <option defaultValue="selected">{props.toCurrency}</option>
                    {props.currencies.map(currency => <option key={currency}>{currency}</option>)}
                </Select>
                <TextField value={parseFloat(props.toAmount).toFixed(2)} readOnly />
                <img src={DeleteIcon} onClick={props.removeTo} style={{ display: props.iconDisplay }} />
            </Input>
        </Wrapper>
    );
};


const mapStateToProps = (state) => ({
    currencies: state.currencies,
});

export default connect(mapStateToProps)(CustomInputTo);

const Wrapper = styled.div`
    margin: 0 10px;
    
    img { 
        width: 40px; 
        cursor: pointer;
    }
`;

const Input = styled.div`
    width: 250px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    border: 2px solid #2600ff;
    box-shadow: 0px 0px 10px 0px rgba(38,0,255,0.5);
    border-radius: 5px;
    float: right;
`;

const Select = styled.select`
    border: none; 
    border-radius: 5px;
    outline: none;
    font-weight: 700;
    font-size: 20px; 
`;

const TextField = styled.input`
    width: 150px;  
    border: none;
    border-radius: 5px;
    outline: none; 
    font-weight: 700;
    font-size: 20px; 
`;