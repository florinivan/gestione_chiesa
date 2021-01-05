import { rootAPI } from 'shared/api/Api';
import { Logger } from 'commons/utils/Logger';

export const receiptPrint = (ticketCode?: string | null) => {
  if (!ticketCode) {
    return;
  }

  const w = window.open('', '_blank');
  const subscription = rootAPI.getReceiptBase64(ticketCode).subscribe(
    (data: { xhr: { responseURL: any } }) => {
      w?.document.write(`<img id="print-image-element" src="${data.xhr.responseURL}" />`);
      w?.document.write(
        '<script>var img = document.getElementById("print-image-element"); img.addEventListener("load",function(){ window.focus(); window.print(); window.document.close(); window.close(); }); </script>'
      );
    },
    (error: any) => {
      Logger.error('ticket', 'receiptPrint', error);
    },
    () => {
      subscription.unsubscribe();
    }
  );
};
