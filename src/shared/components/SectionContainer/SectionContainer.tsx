import React from 'react';
import classNames from 'classnames';
import { Text } from 'shared/atomic-ui/Text/Text';
import styles from 'shared/components/SectionContainer/sectionContainer.module.scss';

interface SectionContainerProps {
  title: string;
  accordion?: React.ReactNode;
  children: React.ReactNode;
  onAccordionClick?: () => void;
  searchBar?: React.ReactNode;
  className?: string;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  children,
  accordion,
  onAccordionClick,
  searchBar,
  className
}) => {
  return (
    <section className={classNames(className, 'w-100')}>
      <header className={styles.searchContainer}>
        <div className={styles.containerTitleSection}>
          <Text as="h5" color="text-black" className="title">
            {title}
          </Text>
        </div>
        {searchBar}
      </header>
      <div> {children}</div>
      {accordion && (
        <div className="d-flex">
          <span onClick={onAccordionClick} style={{ marginLeft: 'auto' }}>
            {accordion}
          </span>
        </div>
      )}
    </section>
  );
};
