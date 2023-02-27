import React from "react";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { MdScreenSearchDesktop } from "react-icons/md";

function SearchDocumentForm(props) {
  const { titleRequest, ...rest } = props;

  return (
    <Form style={{ marginRight: 10, marginLeft: 10 }}>
      <Form.Label
        htmlFor="searchDoc"
        style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
      >
        Search By {titleRequest}
      </Form.Label>
      <InputGroup>
        <InputGroup.Text>
          <MdScreenSearchDesktop />
        </InputGroup.Text>
        <Form.Control type="text" {...rest} size="sm" />
      </InputGroup>
    </Form>
  );
}

export default SearchDocumentForm;
