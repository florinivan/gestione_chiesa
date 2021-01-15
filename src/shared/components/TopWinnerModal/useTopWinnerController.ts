import { useState } from 'react';

export const useTopWinnerController = (showModal: boolean) => {
  const [nameSurname, setNameSurname] = useState('');
  const [numberChildrens, setNumberChildrens] = useState(0);
  const [numberPhone, setNumberPhone] = useState('');

  const [validated, setValidated] = useState(false);

  const [show, setShow] = useState(showModal);

  const handleClose = () => setShow(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    setShow(false);
  };

  return {
    setShow,
    show,
    handleClose,
    validated,
    handleSubmit,
    nameSurname,
    setNameSurname,
    numberChildrens,
    setNumberChildrens,
    numberPhone,
    setNumberPhone
  };
};
