import { ERROR_NETWORK_CODE } from '../../config';
const handleData = (errorCode: any, errorMsg: string, data: any, susses: any) => {
  return { code: errorCode, message: errorMsg, data: data, status: susses };
};

export const HandleErrorApi = (status: any) => {
  switch (status) {
    case ERROR_NETWORK_CODE:
      return handleData(
        ERROR_NETWORK_CODE,
        "",
        null,
        false,
      );
    case 0:
      return handleData(status, "", null, false);
    case 400:
      return handleData(status, "", null, false);
    case 401:
      return handleData(status, "", null, false);
    case 402:
      return handleData(status, "", null, false);
    case 403:
      return handleData(status, "", null, false);
    case 404:
      return handleData(status, "", null, false);
    case 405:
      return handleData(status, "", null, false);
    case 406:
      return handleData(status, "", null, false);
    case 407:
      return handleData(status, "", null, false);
    case 408:
      return handleData(status, "", null, false);

    case 409:
      return handleData(status, "", null, false);
    case 410:
      return handleData(status, "", null, false);

    case 411:
      return handleData(status, "", null, false);
    case 412:
      return handleData(status, "", null, false);

    case 413:
      return handleData(status, "", null, false);
    case 414:
      return handleData(status, "", null, false);
    case 415:
      return handleData(status, "", null, false);
    case 416:
      return handleData(status, "", null, false);
    case 417:
      return handleData(status, "", null, false);
    case 500:
      return handleData(status, "", null, false);
    case 501:
      return handleData(status, "", null, false);
    case 502:
      return handleData(status, "", null, false);
    case 503:
      return handleData(status, "", null, false);
    case 504:
      return handleData(status, "", null, false);
    case 505:
      return handleData(status, 'error:505', null, false);

    default:
      if (status > 503) {
        return handleData(status, 'error:serverError', null, false);
      } else if (status < 500 && status >= 400) {
        return handleData(status, 'error:errorOnRequest', null, false);
      } else {
        return handleData(status, 'error:errorOnHandle', null, false);
      }
  }
};
