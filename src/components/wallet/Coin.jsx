import styled from "styled-components";
import { Button } from "components";

const CoinContainer = styled.ul`
  li {
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 50% 50%;
    margin: 10px;

    span {
      width: 100%;
      background-color: #fff7bc;
      display: grid;
      place-items: center;
      height: 50px;
      color: #000;
      border-radius: 10px;
    }
  }
`;

function Coin({ coin }) {
  return (
    <CoinContainer>
      {coin.map(({ id, unit, count }) => (
        <li key={id}>
          <Button color="yellow" size="medium">
            <strong>{unit}</strong>
          </Button>
          <span>{count}</span>
        </li>
      ))}
    </CoinContainer>
  );
}

export { Coin };
