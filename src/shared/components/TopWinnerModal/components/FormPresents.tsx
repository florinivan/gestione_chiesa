import React from 'react';

import { Button, Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

interface FormPresentsProps {
  onEventHandler: (event: any) => void;
  validated: boolean;
  nameSurname: string;
  numberChildrens: number;
  numberPhone: string;
  setNameSurname: React.Dispatch<React.SetStateAction<string>>;
  setNumberChildrens: React.Dispatch<React.SetStateAction<number>>;
  setNumberPhone: React.Dispatch<React.SetStateAction<string>>;
}
export const FormPresents: React.FC<FormPresentsProps> = ({
  onEventHandler,
  validated,
  nameSurname,
  numberChildrens,
  numberPhone,
  setNameSurname,
  setNumberChildrens,
  setNumberPhone
}) => {
  return (
    <Form noValidate validated={validated} onSubmit={onEventHandler}>
      <Form.Group controlId="validationCustom01">
        <FormattedMessage id="fr.containers.table.name" />
        <Form.Control
          required
          type="text"
          className={`input border rounded p-2 w-100 text-12`}
          value={nameSurname}
          onChange={(e) => setNameSurname(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="validationCustom02">
        <FormattedMessage id="fr.containers.table.number_childrens_14" />
        <Form.Control
          required
          type="number"
          className={`input border rounded p-2 w-100 text-12`}
          value={numberChildrens}
          onChange={(e) => setNumberChildrens(parseInt(e.target.value) || 0)}
        />
      </Form.Group>
      <Form.Group controlId="validationCustom03">
        <FormattedMessage id="fr.containers.table.phone" />
        <Form.Control
          required
          type="text"
          className={`input border rounded p-2 w-100 text-12`}
          value={numberPhone}
          onChange={(e) => setNumberPhone(e.target.value)}
        />
      </Form.Group>
      <Button variant="outline-success" type="submit">
        <FormattedMessage id={'fr.component.PreferedPointOfSale.save'} />
      </Button>
    </Form>
  );
};
