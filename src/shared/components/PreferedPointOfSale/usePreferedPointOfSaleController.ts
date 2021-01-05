import React from 'react';
import { useBehaviorSubject } from 'shared/hooks/useBehaviorSubject';
import { userInfoStore } from 'services/UserInfoService/UserInfoStore';

export interface InputState {
  initialValue: string;
  value: string;
  initialValidation: boolean;
  valid: boolean;
  disabled: boolean;
  touched: boolean;
  text: string;
  textColor: string;
  borderColor: string;
}

enum Values {
  Code = 'fr.component.PreferedPointOfSale.posCode',
  IncorrectCode = 'fr.component.PreferedPointOfSale.incorrectCode',
  CodeRegex = '^[a-zA-Z]{2}[a-zA-Z0-9]*[0-9]{2}$',
  Nickname = 'fr.component.PreferedPointOfSale.nickname',
  IncorrectNickname = 'fr.component.PreferedPointOfSale.incorrectNickname',
  NicknameRegex = '^[a-zA-Z0-9]+$',
  DefaultText = 'text-black',
  ErrorText = 'text-red',
  ValidText = 'text-medium-green',
  DefaultBorder = 'border-grey',
  ErrorBorder = 'border-red',
  ValidBorder = 'border-medium-green'
}

export const usePreferedPointOfSaleController = () => {
  const pointOfSaleInfo = useBehaviorSubject(userInfoStore.pointOfSaleInfo$);
  const [code, setCode] = React.useState<InputState>({
    initialValue: pointOfSaleInfo.favoritePdv || '',
    value: pointOfSaleInfo.favoritePdv || '',
    initialValidation: false,
    valid: false,
    disabled: (!!pointOfSaleInfo.favoritePdv && !!pointOfSaleInfo.nickname) || false,
    touched: false,
    text: Values.Code,
    textColor: Values.DefaultText,
    borderColor: Values.DefaultBorder
  });

  const [nickname, setNickname] = React.useState<InputState>({
    initialValue: pointOfSaleInfo.nickname || '',
    value: pointOfSaleInfo.nickname || '',
    initialValidation: false,
    valid: false,
    disabled: (!!pointOfSaleInfo.favoritePdv && !!pointOfSaleInfo.nickname) || false,
    touched: false,
    text: Values.Nickname,
    textColor: Values.DefaultText,
    borderColor: Values.DefaultBorder
  });

  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const [initialMessage, setInitialMessage] = React.useState<boolean>(
    (!code.initialValue && !nickname.initialValue) || false
  );
  const [disabledSave, setDisabledSave] = React.useState<boolean>(true);
  const [disabledEdit, setDisabledEdit] = React.useState<boolean>(
    (!!code.initialValue && !!nickname.initialValue) || false
  );

  // on change event set state.value, also set true state.initialValidation the first time validation happen
  const onChange = (
    state: InputState,
    setState: (state: InputState) => void,
    length: number,
    value: string
  ) => {
    if (code.initialValue && nickname.initialValue) {
      setCode({ ...code, initialValidation: true });
      setNickname({ ...nickname, initialValidation: true });
    }

    if (value.length > length) {
      setState({
        ...state,
        initialValidation: true,
        value
      });
      return;
    }
    setState({
      ...state,
      value
    });
  };

  // on focus set state.touched true, for input to start validate only if user touched it before
  const onFocus = (state: InputState, setState: (state: InputState) => void) => {
    setState({
      ...state,
      touched: true
    });
  };

  // on blur if state.valid change color & text from valid to default, else keep error
  const onBlur = (
    state: InputState,
    setState: (state: InputState) => void,
    text: string,
    invalidText: string
  ) => {
    if (state.value && !state.valid) {
      setState({
        ...state,
        text: invalidText,
        textColor: Values.ErrorText,
        borderColor: Values.ErrorBorder
      });
      return;
    }
    setState({
      ...state,
      text: text,
      textColor: Values.DefaultText,
      borderColor: Values.DefaultBorder
    });
  };

  // since code and nickname have almost the same behaviour, onEventHandle collect all the event
  const onEventHandler = (event: string, name: string, value: string) => {
    if (name === 'code') {
      switch (event) {
        case 'onChange':
          onChange(code, setCode, 3, value);
          break;
        case 'onFocus':
          onFocus(code, setCode);
          break;
        case 'onBlur':
          onBlur(code, setCode, Values.Code, Values.IncorrectCode);
          break;
      }
    } else if (name === 'nickname') {
      switch (event) {
        case 'onChange':
          onChange(nickname, setNickname, 1, value);
          break;
        case 'onFocus':
          onFocus(nickname, setNickname);
          break;
        case 'onBlur':
          onBlur(nickname, setNickname, Values.Nickname, Values.IncorrectNickname);
          break;
      }
    }
  };

  // if state is touched and initialValidation is true, start to validate the input base on the regex that is required
  const checkValidation = (
    state: InputState,
    setState: (state: InputState) => void,
    regex: string,
    validText: string,
    invalidText: string
  ) => {
    if (state.initialValidation) {
      if (state.value.match(new RegExp(regex))) {
        setState({
          ...state,
          valid: true,
          text: validText,
          textColor: Values.ValidText,
          borderColor: Values.ValidBorder
        });
        return;
      }
      setState({
        ...state,
        valid: false,
        text: invalidText,
        textColor: Values.ErrorText,
        borderColor: Values.ErrorBorder
      });
    }

    if (!state.value) {
      setState({
        ...state,
        text: validText,
        textColor: Values.DefaultText,
        borderColor: Values.DefaultBorder
      });
    }
  };
  const checkInitValidation = (
    state: InputState,
    setState: (state: InputState) => void,
    regex: string
  ) => {
    if (state.initialValidation) {
      if (state.value.match(new RegExp(regex))) {
        setState({
          ...state,
          valid: true
        });
        return;
      }
      setState({
        ...state,
        valid: false
      });
    }
  };
  // validate code in value changed
  React.useEffect(() => {
    checkValidation(code, setCode, Values.CodeRegex, Values.Code, Values.IncorrectCode);
    checkInitValidation(nickname, setNickname, Values.NicknameRegex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code.value]);

  // validate nickname in value changed
  React.useEffect(() => {
    checkInitValidation(code, setCode, Values.CodeRegex);
    checkValidation(
      nickname,
      setNickname,
      Values.NicknameRegex,
      Values.Nickname,
      Values.IncorrectNickname
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickname.value]);

  // enable save button only if inputs are valid and not disabled
  React.useMemo(() => {
    if (!code.value && !nickname.value) {
      setDisabledSave(true);
      return;
    } else if (!code.value || !nickname.value) {
      setDisabledSave(false);
      return;
    } else if (code.value || nickname.value) {
      if (code.valid && nickname.valid && !code.disabled && !nickname.disabled) {
        setDisabledSave(true);
        return;
      }
      setDisabledSave(false);
      return;
    }
  }, [code, nickname]);

  // on Save event save the data in localStorage, show success alert and  enable edit button
  const onSave = () => {
    setCode({ ...code, initialValue: code.value, disabled: true });
    setNickname({ ...nickname, initialValue: nickname.value, disabled: true });
    userInfoStore.updatePointOfSaleInfo({ nickname: nickname.value, favoritePdv: code.value });
    setDisabledEdit(true);
    setShowAlert(true);
    setInitialMessage(false);
    setTimeout(() => {
      setShowAlert(false);
    }, 3500);
  };

  // on Edit event enable inputs and disable edit button
  const onEdit = () => {
    setCode({ ...code, value: code.value || code.initialValue, disabled: false });
    setNickname({ ...nickname, value: nickname.value || nickname.initialValue, disabled: false });
    setDisabledEdit(false);
  };

  return {
    code,
    nickname,
    disabledEdit,
    disabledSave,
    showAlert,
    initialMessage,
    onEventHandler,
    onSave,
    onEdit
  };
};
