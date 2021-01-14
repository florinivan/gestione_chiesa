import React, { CSSProperties } from 'react';
import sum from 'lodash/sum';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import styles from 'shared/components/HorizontalScroll/horizontalScroll.module.scss';

interface HorizontalScrollProps {
  children: React.ReactNode;
  removeIconAction?: boolean;
  iconPrev?: React.ReactNode;
  iconNext?: React.ReactNode;
  animationTransition?: 'auto' | 'smooth';
  removeActiveStyle?: boolean;
  activeElementHandler?: (activeElement: string) => void;
  backgroundColorStyle?: string;
  className?: string;
  scrollElementStep?: number;

  /**
   * use this property for scroll to active element
   */
  activeElement?: number | string;
  positionIcon?: 'margin' | 'top';
  isDisabledAnimation?: boolean;
  /**
   * animation speed in seconds
   */
  animationSpeed?: number;
  stepAmount?: number;

  detectContainerWidth?: (nmb: number | undefined) => void;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  iconNext,
  iconPrev,
  children,
  detectContainerWidth,
  removeIconAction = false,
  backgroundColorStyle,
  className,
  isDisabledAnimation = false,
  positionIcon = 'margin',
  scrollElementStep = 1
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const childrenRefs = React.useRef<HTMLDivElement[]>([]);
  const [scroll, setScroll] = React.useState(0);
  const [leftDisabled, setLeftDisabled] = React.useState(true);
  const [rightDisabled, setRightDisabled] = React.useState(true);
  const [containerWidth, setContainerWidth] = React.useState<number | undefined>(0);
  const [childrenWidth, setChildrenWidth] = React.useState<number | undefined>(0);

  const scrollRef = React.useRef(scroll);
  scrollRef.current = scroll;

  React.useEffect(() => {
    setLeftDisabled(scroll === 0);
    setRightDisabled(
      !!containerRef.current &&
        scroll + containerRef.current.clientWidth >= containerRef.current.scrollWidth * 0.999
    );
  }, [children, scroll]);

  const containerOffsetWidth = containerRef.current?.offsetWidth;
  const childrenOffsetWidth = sum(childrenRefs.current?.map((ch) => ch?.offsetWidth));
  React.useEffect(() => {
    setContainerWidth(containerOffsetWidth);
    setChildrenWidth(childrenOffsetWidth);
  }, [containerOffsetWidth, childrenOffsetWidth]);

  React.useEffect(() => {
    detectContainerWidth?.(containerWidth);
  }, [detectContainerWidth, containerWidth]);

  const scrollToIndexElement = React.useCallback((i: number, disableAnimation = false) => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const oldScrollBehavior = container.style.scrollBehavior;
    if (disableAnimation) {
      container.style.scrollBehavior = 'unset';
      container.scrollLeft = scrollRef.current;
    }
    const safeIndex = Math.max(Math.min(i, childrenRefs.current.length), 0);
    const newScroll =
      childrenRefs.current[safeIndex]?.offsetLeft ?? containerRef.current.scrollLeft;

    containerRef.current.scrollLeft = newScroll;
    setScroll(newScroll);

    if (disableAnimation) {
      container.style.scrollBehavior = oldScrollBehavior;
    }
  }, []);

  if (!backgroundColorStyle) {
    backgroundColorStyle = '#f7f7f7';
  }

  const onArrowClick = React.useCallback(
    (direction: 1 | -1) => {
      if (!containerRef.current) {
        return;
      }

      const currentScrollPosition = containerRef.current?.scrollLeft ?? 0;

      const currentElementIndex = childrenRefs.current.reduce((acc, curr, i) => {
        const next = curr?.offsetLeft + curr?.offsetWidth;
        if (next > currentScrollPosition) {
          return acc;
        }

        return i + 1;
      }, 0);

      const nextScrollIndex = currentElementIndex + direction * scrollElementStep;

      scrollToIndexElement(nextScrollIndex);
    },
    [scrollElementStep, scrollToIndexElement]
  );

  const nextIcon = React.useMemo(() => {
    if (containerWidth && childrenWidth && containerWidth >= childrenWidth) {
      return null;
    }
    if (removeIconAction) {
      return null;
    }
    if (iconNext) {
      return iconNext;
    }

    const disabled = rightDisabled;
    const color = disabled ? 'grey' : 'invision-light-black';

    return (
      <div className="iconContainer" onClick={() => onArrowClick(1)}>
        <NewIcon className="d-flex" size="icon-size-22" name="Arrow-Forward" color={color} />
      </div>
    );
  }, [iconNext, onArrowClick, removeIconAction, rightDisabled, containerWidth, childrenWidth]);

  const prevIcon = React.useMemo(() => {
    if (containerWidth && childrenWidth && containerWidth >= childrenWidth) {
      return null;
    }
    if (removeIconAction) {
      return null;
    }
    if (iconPrev) {
      return iconPrev;
    }

    const disabled = leftDisabled;
    const color = disabled ? 'grey' : 'invision-light-black';

    return (
      <div className="iconContainer" onClick={() => onArrowClick(-1)}>
        <NewIcon className="d-flex" size="icon-size-22" name="Arrow-Back" color={color} />
      </div>
    );
  }, [iconPrev, onArrowClick, removeIconAction, leftDisabled, containerWidth, childrenWidth]);

  const content = React.useMemo(() => {
    const style: CSSProperties = {
      scrollBehavior: isDisabledAnimation ? 'unset' : 'smooth'
    };

    if (backgroundColorStyle) {
      style.backgroundColor = backgroundColorStyle;
    }

    return (
      <div
        className={styles.container}
        ref={containerRef}
        style={style}
        onScroll={(event) => setScroll(event.currentTarget.scrollLeft)}>
        {React.Children.map(children, (element, i) => {
          return (
            <div
              ref={(ref) => {
                if (ref) {
                  childrenRefs.current[i] = ref;
                }
              }}
              className={className}>
              {element}
            </div>
          );
        })}
      </div>
    );
  }, [backgroundColorStyle, children, className, isDisabledAnimation]);

  if (!React.Children.count(children)) {
    return null;
  }

  return (
    <div className={styles.horizontalScroll}>
      {positionIcon === 'top' && (
        <div className={styles.iconPositionTop}>
          {prevIcon} {nextIcon}
        </div>
      )}

      {positionIcon === 'margin' && prevIcon}
      {content}
      {positionIcon === 'margin' && nextIcon}
    </div>
  );
};
