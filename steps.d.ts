/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');

declare namespace CodeceptJS {
  interface SupportObject {
    I: I,
    current: any
  }

  interface Methods extends Playwright {
  }

  interface I extends ReturnType<steps_file> {
  }

  namespace Translation {
    interface Actions {
    }
  }

  interface REST extends Helper {
    sendGetRequest(url: string): Promise<any>;

    sendPostRequest(url: string, payload: any): Promise<any>;

    sendPutRequest(url: string, payload: any): Promise<any>;

    sendDeleteRequest(url: string): Promise<any>;

    haveRequestHeaders(headers: Record<string, string>): void;
  }

  interface I extends WithTranslation<REST> {
  }

  interface SupportObject {
    I: I
  }
}
