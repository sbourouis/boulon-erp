import {Action} from "@ngrx/store";

export const SET_IS_CUSTOMER = '[UI] SET IS CUSTOMER';

export class SetIsCustomer implements Action {
  readonly type = SET_IS_CUSTOMER;

  constructor(public payload?: boolean) {
  }
}

export type All = SetIsCustomer;
