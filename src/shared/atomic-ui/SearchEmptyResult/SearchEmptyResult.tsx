import React from 'react';
import { Text } from 'shared/atomic-ui/Text/Text';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import { FormattedMessage } from 'react-intl';
import styles from 'shared/atomic-ui/SearchEmptyResult/SearchEmptyResult.module.scss';
import classNames from 'classnames';

interface SearchEmptyResultProps {
  className?: string;
}

export const SearchEmptyResult = function SearchEmptyResult({ className }: SearchEmptyResultProps) {
  const searchEmptyResultClass = classNames(styles.noResultInfo, className);
  return (
    <div className={searchEmptyResultClass}>
      <NewIcon name="No-Results" className={styles.iconNoResult} size="icon-size-64" />
      <div className={styles.noResultText}>
        <Text as="h3">
          <FormattedMessage id="fr.containers.SearchContainer.SearchResult.title" />
        </Text>
        <Text as="p" size="text-12">
          <FormattedMessage id="fr.containers.SearchContainer.SearchResult.description" />
        </Text>
      </div>
    </div>
  );
};
