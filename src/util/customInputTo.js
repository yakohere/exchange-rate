import styled from "styled-components";
import { connect } from "react-redux";
import DeleteIcon from "../icons/delete.svg"

const CustomInputTo = (props) => {
    return (
        <Wrapper>
            <Select onChange={props.selectChange}>
                <option defaultValue="selected">{props.toCurrency}</option>
                {props.currencies.map(currency => <option key={currency}>{currency}</option>)}
            </Select>
            <Input value={props.toAmount} readOnly />
            <img src={DeleteIcon} onClick={props.removeTo} style={{ display: props.iconDisplay }} />
        </Wrapper>
    );
};


const mapStateToProps = (state) => ({
    currencies: state.currencies,
    to: state.to
});

export default connect(mapStateToProps)(CustomInputTo);

const Wrapper = styled.div`
    width: 250px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    border: 2px solid #2600ff;
    box-shadow: 0px 0px 10px 0px rgba(38,0,255,0.5);
    border-radius: 5px;
    margin: 0 10px;

    img {
        width: 40px; 
    }
`;

const Select = styled.select`
    border: none; 
    border-radius: 5px;
    outline: none;
    font-weight: 700;
    font-size: 20px; 
`;

const Input = styled.input`
    width: 150px;  
    border: none;
    border-radius: 5px;
    outline: none; 
    font-weight: 700;
    font-size: 20px; 
`;