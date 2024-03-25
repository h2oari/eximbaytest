import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { EximbayFgkeyRequestData, getEximbayFgkey } from "./hooks/useMutation";
import { useRouter } from "next/router";
import Script from "next/script";

declare global {
  interface Window {
    EXIMBAY: any;
  }
}

export default function Home() {
  const [fgkey, setFgkey] = useState<string | null>(null);

  const router = useRouter();
  const getEximbayFgkeyMutation = useMutation({
    mutationFn: (userData: EximbayFgkeyRequestData) => {
      return getEximbayFgkey(userData);
    },
  });
  const { isSuccess, data, mutateAsync } = getEximbayFgkeyMutation;
  useEffect(() => {
    if (isSuccess) {
      setFgkey(data.fgkey);
    }
  }, [isSuccess]);

  const handleClick = async (): Promise<void> => {
    await mutateAsync({
      payment: {
        transaction_type: "PAYMENT",
        order_id: "20220819105102",
        currency: "USD",
        amount: "1",
        lang: "EN",
      },
      merchant: {
        mid: "1849705C64",
      },
      buyer: {
        name: "eximbay",
        email: "test@eximbay.com",
      },
      url: {
        return_url: "eximbay.com",
        status_url: "eximbay.com",
      },
    });
  };
  const handlePayment = () => {
    if (window.EXIMBAY) {
      window.EXIMBAY.request_pay({
        fgkey,
        payment: {
          transaction_type: "PAYMENT",
          order_id: "20220819105102",
          currency: "USD",
          amount: "1",
          lang: "EN",
        },
        merchant: {
          mid: "1849705C64",
        },
        buyer: {
          name: "eximbay",
          email: "test@eximbay.com",
        },
        url: {
          return_url: "eximbay.com",
          status_url: "eximbay.com",
        },
      });
    } else {
      console.error("EXIMBAY SDK not loaded");
    }
  };
  return (
    <div>
      <Script src="https://code.jquery.com/jquery-1.12.4.min.js" defer />
      <Script src="https://api-test.eximbay.com/v1/javascriptSDK.js" defer />
      <button onClick={handleClick}>fgkey 생성</button>
      <button type="button" onClick={handlePayment}>
        결제 창 연동
      </button>
    </div>
  );
}
