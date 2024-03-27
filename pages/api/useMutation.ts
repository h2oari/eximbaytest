import axios from "axios";

export interface EximbayFgkeyRequestData {
  payment: {
    transaction_type?: string;
    order_id?: string;
    currency?: string;
    amount: string;
    lang: string;
  };
  merchant: {
    mid: string;
  };
  buyer: {
    name: string;
    email: string;
  };
  url: {
    return_url: string;
    status_url: string;
  };
}

export const getEximbayFgkey = async (data: EximbayFgkeyRequestData) => {
  const response = await axios.post(
    `https://api-test.eximbay.com/v1/payments/ready`,
    data,
    {
      headers: {
        Authorization: "Basic dGVzdF8xODQ5NzA1QzY0MkMyMTdFMEIyRDo=",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
