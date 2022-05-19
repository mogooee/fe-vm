import styled from "styled-components";
import { Button } from "components";

const PriceLabel = styled.span`
  display: grid;
  place-items: center;
  margin-top: 30px;
`;

function VendProduct({ name, price, stocked }) {
  return (
    <>
      <Button color={stocked ? "green" : "white"} size="small">
        <strong>{name}</strong>
      </Button>
      <PriceLabel>{price + "원"}</PriceLabel>
    </>
  );
}

export { VendProduct };
