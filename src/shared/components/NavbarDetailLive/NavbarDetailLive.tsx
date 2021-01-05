import React from 'react';
import { NavLinkProps, useRouteMatch, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import { Regulator } from 'commons/models/Regulator';
import { Competition } from 'commons/models/Competition';
import { DetailLiveCompetitionHeader } from 'shared/components/DetailCompetitionHeader/components/DetailLiveCompetitionHeader';
import { DropdownLive } from 'shared/components/DropdownLive/DropdownLive';
import { DropdownMyLive } from 'shared/components/DropdownMyLive/DropdownMyLive';
import { Sport } from 'commons/models/Sport';
import { MyLiveEye } from 'containers/MyLive/MyLiveEye/MyLiveEye';
import { MyLiveCardProps } from 'containers/MyLive/MyLiveCard/MyLiveCard';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import { ModalCustom } from 'shared/components/ModalCustom/ModalCustom';
import { Statistics } from 'shared/components/Statistics/Statistics';
import { useIntl } from 'react-intl';
import Config from 'shared/configuration';

interface NavbarDetailLiveProps {
  toBack: NavLinkProps['to'];
  regulatorsMap: Map<string, Regulator[]>;
  currentRegulator: Regulator;
  competition: Competition;
  sport?: Sport | undefined;
  competitions: Competition[];
  cards?: MyLiveCardProps[];
  competitionsFromMyLive?: Competition[];
}

export const NavbarDetailLive: React.FC<NavbarDetailLiveProps> = ({
  regulatorsMap,
  currentRegulator,
  competition,
  sport,
  competitions,
  cards,
  competitionsFromMyLive
}) => {
  const flagImageUrl = competition.iconUrl;

  const history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };

  const [show, setShow] = React.useState(false);
  function handleClick() {
    setShow(!show);
  }
  const myLivePage = useRouteMatch(Config.BROWSER_ROUTER_PATH_MAP.FAVORITE_LIVE);
  const isMyLivePage = !!myLivePage;

  const betradarId = currentRegulator.getIdBetradarProvider([Config.EXT_PROVIDERS.BETRADAR_ID]);
  const intl = useIntl();
  const statisticsModalTitle = intl.formatMessage({
    id: 'fr.containers.statistics.modal.title'
  });

  const statisticsElements = (
    <div onClick={handleClick} style={{ cursor: 'pointer' }} className="d-flex align-items-center">
      <NewIcon size="icon-size-22" name="Statistics" color="white" className="mr-3 d-flex" />
      <ModalCustom show={show} title={statisticsModalTitle} sizeModal="medium" colorTitle="green">
        <Statistics id={betradarId} />
      </ModalCustom>
    </div>
  );

  return (
    <>
      <Breakpoint tablet down>
        {!isMyLivePage && (
          <Container fluid className="px-0">
            <div className="bg-dark-blue">
              <DropdownLive
                dropDownItemRoutingAction="REPLACE"
                regulatorsMap={regulatorsMap}
                onBackClick={handleBackClick}
                currentRegulator={currentRegulator}
                competitions={competitions}
              />
            </div>
          </Container>
        )}
      </Breakpoint>

      <Breakpoint desktopLarge up>
        <Container fluid className="px-0">
          {!isMyLivePage ? (
            <>
              <DetailLiveCompetitionHeader
                backgroundColor="bg-gradient-blue-green"
                onBackClick={handleBackClick}
                sport={sport}
                iconUrl={flagImageUrl}
                competitionDescription={competition.descriptionDesktop}
              />
              <div className=" d-flex bg-dark-blue mx-0">
                <div className="d-flex flex-grow-1">
                  <DropdownLive
                    dropDownItemRoutingAction="REPLACE"
                    regulatorsMap={regulatorsMap}
                    onBackClick={handleBackClick}
                    currentRegulator={currentRegulator}
                    competitions={competitions}
                  />
                </div>
                {statisticsElements}
                <div className="my-live-container d-flex mr-2 align-items-center d-flex">
                  <MyLiveEye regulatorKey={currentRegulator.key} />
                </div>
              </div>
            </>
          ) : (
            competitionsFromMyLive &&
            cards && (
              <div className=" d-flex bg-dark-blue mx-0">
                <div className="d-flex flex-grow-1">
                  <DropdownMyLive
                    dropDownItemRoutingAction="REPLACE"
                    currentRegulator={currentRegulator}
                    competitionsFromMyLive={competitionsFromMyLive}
                    cards={cards}
                  />
                </div>
                {statisticsElements}
              </div>
            )
          )}
        </Container>
      </Breakpoint>
    </>
  );
};
