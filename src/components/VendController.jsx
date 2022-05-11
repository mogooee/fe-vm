import styled from "styled-components";
import { HistoryBox } from "components";

const StyledVendController = styled.div`
  width: 300px;

  div {
    display: grid;
    place-items: center;
    margin: 0px 0px 10px 10px;
    font-size: 1.5em;
  }

  div + div {
    margin-top: 20px;
  }
`;

const InsertCoin = styled.input`
  width: 100%;
  height: 70px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 10px;
  margin: 0px 10px 10px 10px;
  text-align: center;
  font-size: 1.5em;

  &:focus {
    outline: none;
  }
`;

const ChangeOutlet = styled.div`
  height: 70px;
  background-color: #000;
  margin-left: 10px;
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;

function VendController() {
  return (
    <StyledVendController>
      <InsertCoin type="number" min="0" placeholder="INSERT COIN" />
      <ChangeOutlet>Change</ChangeOutlet>
      <HistoryBox />
    </StyledVendController>
  );
}

export { VendController };
