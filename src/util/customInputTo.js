import styled from "styled-components";
import { connect } from "react-redux";
import DeleteIcon from "../icons/delete.svg"

const CustomInputTo = (props) => {
    return (
        <Wrapper>
            <Select onChange={props.selectChange}>
                <option defaultValue >{props.currencies[0]}</option>
                {props.currencies.map(currency => <option key={currency}>{currency}</option>)}
            </Select>
            <Input value={isNaN(props.number) ? 0 : parseFloat(props.number).toFixed()} readOnly />
            <img src={DeleteIcon} onClick={props.removeTo} style={{ display: props.iconDisplay }} />
        </Wrapper>
    );
};


const mapStateToProps = (state) => ({
    currencies: state.currencies
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