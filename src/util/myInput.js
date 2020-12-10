import styled from "styled-components";

export const CustomInput = (props) => {
    return (
        <Wrapper>
            <Select onChange={props.selectChange}>
                <option>UZS</option>
                <option>USD</option>
                <option>RUB</option>
            </Select>
            <Input type="number" />
        </Wrapper>
    );
}

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
    border-radius: 5px;
    width: 30%;
    border: none;
    outline: none;
    font-weight: 700;
    font-size: 20px; 
`;

const Input = styled.input`
    border-radius: 5px;
    width: 70%; 
    border: none;
    outline: none; 
`;