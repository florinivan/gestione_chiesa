import React from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useCurrentWidth } from 'react-socks';
import classNames from 'classnames';

import { getBreakpoint } from 'shared/utils/breakpoint';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import { Button } from 'shared/atomic-ui/Button/Button';
import { Text } from 'shared/atomic-ui/Text/Text';
import { usePreferedPointOfSaleController } from 'shared/components/PreferedPointOfSale/usePreferedPointOfSaleController';
import { InputComponent } from 'shared/components/PreferedPointOfSale/InputComponent';
import { Box } from 'shared/atomic-ui/Layout/Box';
import { Column } from 'shared/atomic-ui/Layout/Column';

import styles from 'shared/components/PreferedPointOfSale/preferedPointOfSale.module.scss';

const {
  ['card-header']: cardHeader,
  ['card-header-border-down']: cardHeaderBorderDown,
  ['alert-border-up']: alertBorderUp,
  ['alert-border-down']: alertBorderDown,
  alert
} = styles;

export const PreferedPointOfSale: React.FC = () => {
  const width = useCurrentWidth();
  const desktop = width >= getBreakpoint('desktopLarge');
  const [isOpenPanel, setIsOpenPanel] = React.useState<boolean>(false);

  const {
    code,
    nickname,
    disabledEdit,
    disabledSave,
    showAlert,
    initialMessage,
    onEventHandler,
    onSave,
    onEdit
  } = usePreferedPointOfSaleController();

  return (
    <Card className="container-fluid mt-3 mt-lg-5">
      <Card.Header className="p-0">
        <div
          className={classNames(
            !desktop && !isOpenPanel ? `${cardHeaderBorderDown}` : `${cardHeader}`,
            'bg-medium-green py-2 pr-2 align-items-center'
          )}>
          <div className="d-flex justify-content-between pl-2">
            <div className="d-flex">
              <NewIcon name="Retail" className="d-flex mr-2" color="white" size="icon-size-26" />
              <Text as="p" className="h5 text-white strong mt-lg-1">
                <FormattedMessage id="fr.component.PreferedPointOfSale.setFavoriteStore" />
              </Text>
            </div>

            <div className="d-flex">
              {!desktop && (
                <div onClick={() => setIsOpenPanel(!isOpenPanel)}>
                  {isOpenPanel ? (
                    <NewIcon
                      name="Arrow-Up"
                      color="white"
                      className="d-flex mr-2"
                      size="icon-size-24"
                    />
                  ) : (
                    <NewIcon
                      name="Arrow-Down"
                      color="white"
                      className="d-flex mr-2"
                      size="icon-size-24"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card.Header>

      <Card.Body
        className={`p-0 ${!desktop && !isOpenPanel ? 'hide-animation' : 'show-animation'}`}>
        {initialMessage && (
          <>
            <Card.Title className="p text-12 text-black mt-2">
              <FormattedMessage id="fr.component.PreferedPointOfSale.titleText" />
            </Card.Title>
            <Card.Text className="body text-10 text-grey">
              <FormattedMessage id="fr.component.PreferedPointOfSale.bodyText" />
            </Card.Text>
          </>
        )}

        <Alert
          variant="success"
          show={showAlert}
          className={classNames(
            desktop ? `${alertBorderUp}` : `${alertBorderDown}`,
            alert,
            'p-2 text-12'
          )}>
          <FormattedMessage id="fr.component.PreferedPointOfSale.dataSavedMessage" />
        </Alert>

        <Form>
          <Box type="row" className="mt-3">
            <InputComponent name="code" state={code} onEventHandler={onEventHandler} />

            <InputComponent
              name="nickname"
              state={nickname}
              onEventHandler={onEventHandler}
              maxLength={13}
            />

            <Column xs="12" md="3" lg="12">
              <Button
                type="button"
                variant="outline-primary"
                fluid={true}
                onClick={onEdit}
                disabled={!disabledEdit}>
                <FormattedMessage id="fr.component.PreferedPointOfSale.edit" />
              </Button>
            </Column>

            <Column xs="12" md="3" lg="12">
              <Button
                type="button"
                variant="primary"
                fluid={true}
                onClick={onSave}
                disabled={!disabledSave}>
                <FormattedMessage id="fr.component.PreferedPointOfSale.save" />
              </Button>
            </Column>
          </Box>
        </Form>
      </Card.Body>
    </Card>
  );
};
