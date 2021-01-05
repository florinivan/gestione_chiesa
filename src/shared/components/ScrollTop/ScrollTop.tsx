import React from 'react';
import { browserInfoStore } from 'services/BrowserInfoService/BrowserInfoStore';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import Config from 'shared/configuration';
import styles from 'shared/components/ScrollTop/scrollTop.module.scss';
import { map, distinctUntilChanged, skip } from 'rxjs/operators';

interface ScrollTopProps {
  isdesktop?: boolean;
  left?: number;
}

function computeIsVisible(scrollY: number): boolean {
  return scrollY > Config.SCROLL_TOP.VISIBILITY_THRESHOLD;
}

export const ScrollTop: React.FC<ScrollTopProps> = React.memo(({ isdesktop = true, left }) => {
  const [showScroll, setShowScroll] = React.useState(() =>
    computeIsVisible(browserInfoStore.scrollY$.getValue())
  );

  React.useEffect(() => {
    const isVisible$ = browserInfoStore.scrollY$.pipe(
      map(scrollY => scrollY > Config.SCROLL_TOP.VISIBILITY_THRESHOLD),
      distinctUntilChanged(),
      skip(1)
    );

    const subscription = isVisible$.subscribe(setShowScroll);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={styles.scrollTop}
      style={{ display: showScroll ? 'flex' : 'none', left: left ? `${left - 16}px` : undefined }}>
      <NewIcon className="" size="icon-size-33" name="Arrow-Up" color="white" onClick={scrollTop} />
    </div>
  );
});
