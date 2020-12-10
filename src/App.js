import styled from "styled-components";
import './App.css';
import { CustomButton } from "./util/myButton";
import { CustomInput } from "./util/myInput";
import Converter from "./converter";

function App() {
  return (
    <div className="App">
      <h2>Exchange Rate</h2>
      <Wrapper>
        <Converter />
      </Wrapper>
    </div>
  );
}

export default App;


const Wrapper = styled.div``;