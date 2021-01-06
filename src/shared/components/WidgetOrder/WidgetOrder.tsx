import React, { Fragment } from 'react';
import { WidgetName } from 'commons/enums';
import { widgetsConfigService } from 'services/WidgetsConfigService';
import { useObservable } from 'shared/hooks/useObservable';

export interface WidgetOrderItemProps {
  widgetKey: WidgetName;
  render?: (label?: string) => React.ReactNode;
}

export const WidgetOrderItem: React.FC<WidgetOrderItemProps> = (params) => {
  return <Fragment key={params.widgetKey}>{params.children}</Fragment>;
};

export interface WidgetOrderProps {
  route: string;
}

export const WidgetOrder: React.FC<WidgetOrderProps> = ({ route, children }) => {
  const orderWidgets = useObservable(widgetsConfigService.orderWidgets(route), [route], []);

  const orderedWidgets = React.useMemo<
    {
      child: React.ReactElement;
      widgetOrderLabel?: string;
      render: (label?: string) => React.ReactNode;
    }[]
  >(() => {
    const ch =
      React.Children.map(children, (c) => c as React.ReactElement)?.map((c: React.ReactElement) => [
        c?.props?.widgetKey as string,
        c?.props?.children,
        c?.props?.render
      ]) ?? [];

    const foundWidgets = [];

    for (const [key, child, render] of ch) {
      const orderWidget = orderWidgets?.find((ow) => {
        if (ow === undefined) {
          throw new Error('One of the params must be provided.');
        }
        return ow.name === key;
      });

      if (orderWidget) {
        foundWidgets.push({
          child,
          key,
          order: orderWidget,
          render
        });
      }
    }

    const knownOrderWidgets = foundWidgets
      .sort((a, b) => a.order.position - b.order.position)
      .map(({ child, order, render }) => ({ child, widgetOrderLabel: order.label, render }));

    const unknownOrderWidgets = (ch || [])
      .filter(
        ([key]) =>
          !orderWidgets.find((ow) => {
            if (ow === undefined) {
              throw new Error('One of the params must be provided.');
            }
            return ow.name === key;
          })
      )
      .map(([, child, render]) => ({ child, widgetOrderLabel: undefined, render }));

    return [...knownOrderWidgets, ...unknownOrderWidgets];
  }, [children, orderWidgets]);

  return (
    <>
      {orderedWidgets.map(({ child, widgetOrderLabel, render }) => {
        return render ? render(widgetOrderLabel) : child;
      })}
    </>
  );
};
