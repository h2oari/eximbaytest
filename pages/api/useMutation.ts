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
    "https://a6a9-121-138-151-6.ngrok-free.app/api/payments/ready",
    data,
    {
      headers: {
        "api-key": "MjpFWElNQkFZX1RFU1Q=",
      },
    }
  );
  return response.data.data;
};
