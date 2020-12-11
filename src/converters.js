import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Converter from "./converter";
import { get_initial_values } from "./store";

const Converters = (props) => {
    const { get_initial_values } = props;

    useEffect(() => {
        get_initial_values();
    }, []);

    return (
        <Wrapper>
            {props.converters.map(converter => {
                return <Converter
                    key={converter.id}
                    converterId={converter.id}
                    toes={converter.toes}
                    currencies={converter.currencies}
                    defFromCurr={converter.from.currency}
                />
            })}
        </Wrapper>
    );
};

const mapStateToProps = (state) => ({
    converters: state.converters
});


const mapDispatchToProps = {
    get_initial_values,
};


export default connect(mapStateToProps, mapDispatchToProps)(Converters);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
`;