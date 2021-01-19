//import moment from 'moment';
import { useState } from 'react';

export const useTopWinnerController = (handleClose: () => void) => {
  const [nameSurname, setNameSurname] = useState('');
  const [numberChildrens, setNumberChildrens] = useState(0);
  const [numberPhone, setNumberPhone] = useState('');

  const [validated, setValidated] = useState(false);
  //const dateNow = Date.now();
  //const dayName = moment(new Date(dateNow)).format('dddd DD MMM').toLocaleUpperCase();

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    handleClose();
  };

  return {
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
