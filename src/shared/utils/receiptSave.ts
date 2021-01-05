import { rootAPI } from 'shared/api/Api';
import { Logger } from 'commons/utils/Logger';

export const receiptSave = (ticketCode?: string | null) => {
  if (!ticketCode) {
    return;
  }

  const subscription = rootAPI.getReceiptBase64(ticketCode).subscribe(
    (data: { xhr: { responseURL: string } }) => {
      const a = document.createElement('a');
      a.href = data.xhr.responseURL;
      a.download = `${ticketCode}.png`;
      a.click();
    },
    (error: any) => {
      Logger.error('ticket', 'receiptSave', error);
    },
    () => {
      subscription.unsubscribe();
    }
  );
};
