import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Converter from "./converter";
import { get_initial_values, add_converter } from "./store/actions";
import AddIcon from "./icons/add.svg";

const Converters = (props) => {

    const { get_initial_values, add_converter } = props;

    useEffect(() => {
        const persistedData = localStorage.getItem("persist:state");
        if (!persistedData) {
            get_initial_values();
        }
    }, []);

    return (
        <Wrapper>
            <section>
                <h2>FROM</h2>
                <h2>TO</h2>
            </section>
            {props.converters.map(converter => {
                return <Converter
                    key={converter.id}
                    converterId={converter.id}
                    toes={converter.toes}
                    currencies={converter.currencies}
                    defFromCurr={converter.from.currency}
                    fromAmount={converter.from.amount}
                />
            })}

            <img src={AddIcon} onClick={() => add_converter()} alt="add" />
        </Wrapper>
    );
};

const mapStateToProps = (state) => ({
    converters: state.converters
});

const mapDispatchToProps = {
    get_initial_values,
    add_converter
};

export default connect(mapStateToProps, mapDispatchToProps)(Converters);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column; 
    padding: 50px;

    section { 
        width: 380px;
        margin-left: 45px;
        display: flex; 
        justify-content: space-between;
    }

    img {
        cursor: pointer;    
        width: 40px;
        margin-top: 15px;
        margin-left: 40px;
   }
`;