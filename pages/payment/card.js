import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const CardPaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(event.target);
  }

  return (
    <div className="w-1/5 flex flex-col ml-48 mt-16">
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Label for="cardNumber">Card Number</Label>
          <Input
            type="tel"
            autoComplete="cc-number"
            id="cardNumber"
            pattern="[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}"
            title="Must be a valid 16-digit credit card number."
            placeholder="1234 5678 1234 5678"
            onChange={(e) => {
              setCardNumber(e.target.value);
            }}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label for="cvv">CVV</Label>
          <Input
            type="tel"
            autoComplete="cc-csc"
            id="cardNumber"
            pattern="[0-9]{3}"
            placeholder="CVV"
            title="Must be a 3-digit CVV number"
            onChange={(e) => {
              setCvv(e.target.value);
            }}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label for="expiry">Expiry</Label>
          <Input
            type=""
            autoComplete="cc-exp"
            id="expiry"
            title="MM/YYYY"
            placeholder="MM/YYYY"
            onChange={(e) => {
              setExpiry(e.target.value);
            }}
          ></Input>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default CardPaymentForm;
