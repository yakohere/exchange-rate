import styled from "styled-components";
import DeleteIcon from "../icons/delete.svg"

const CustomInputTo = (props) => {

    const numberWithSpaces = (x) => {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }

    return (
        <Input>
            <Select onChange={props.toCurrencyChange}>
                <option defaultValue="selected">{props.toCurrency}</option>
                {props.currencies.map(currency => <option key={currency}>{currency}</option>)}
            </Select>
            <TextField value={numberWithSpaces(parseFloat(props.toAmount).toFixed(2))} readOnly />
            <img id="remove" src={DeleteIcon} onClick={props.removeTo} style={{ display: props.iconDisplay }} alt="remove" />
        </Input>
    );
};

export default CustomInputTo;


const Input = styled.div`
    width: 250px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid #2600ff;
    box-shadow: 0px 0px 10px 0px rgba(38,0,255,0.5);
    border-radius: 5px;
    margin: 0 10px;

    #remove { 
        width: 25px;  
        margin: 0; 
    }

`;

const Select = styled.select`
    border: none; 
    border-radius: 5px;
    outline: none;
    font-weight: 700;
    font-size: 20px;  
`;

const TextField = styled.input`
    width: 130px;  
    border: none;
    border-radius: 5px;
    outline: none; 
    font-weight: 700;
    font-size: 20px; 
`;