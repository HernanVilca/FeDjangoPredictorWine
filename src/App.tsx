import { Home } from "./page/home/Home";
import imgVinos from "./assets/image/vinosclasi.jpg";
import styled from "styled-components";

function App() {
  return (
    <AppContainer>
      <ContentWrapper>
        <Home />
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${imgVinos});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  z-index: 1;
  color: white;
  text-align: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
`;
