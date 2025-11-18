export type CompanyTypes = {
  id: string;
  ticker: string;
  name: string;
  ceo: string;
  employees: number;
  sector: string;
  industry_category: string;
  industry_group: string;
  stock_exchange: string;
  hq_address_city: string;
  hq_state: string | null;
  hq_country: string;
  short_description: string;
  long_description: string;
  company_url: string;
  business_phone_no: string;
  entity_legal_form: string | null;
  entity_status: string | null;
};

export type SecurityTypes = {
  id: string;
  company_id: string;
  stock_exchange_id: string;
  name: string;
  type: string;
  code: string;
  share_class: string;
  currency: string;
  round_lot_size: number;
  ticker: string;
  exchange_ticker: string;
};

export type WidgetId = "widget1" | "widget2" | "widget3";

export interface TickerState {
  [key: string]: string;
}
