import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getEximbayFgkey } from "./api/useMutation";
import Script from "next/script";

declare global {
  interface Window {
    EXIMBAY: any;
  }
}

export default function Home() {
  const [fgkey, setFgkey] = useState<string | null>(null);

  const getEximbayFgkeyMutation = useMutation({
    mutationFn: (userData: any) => {
      return getEximbayFgkey(userData);
    },
  });
  const { isSuccess, data, mutateAsync } = getEximbayFgkeyMutation;

  useEffect(() => {
    if (isSuccess) {
      setFgkey(data?.fgkey);
    }
  }, [isSuccess, data?.fgkey]);

  const handleClick = async () => {
    await mutateAsync({
      payment: {
        orderId: "20220819105102",
        amount: 10000,
        lang: "KR",
      },
      buyer: {
        name: "eximbay",
        phoneNumber: "01012345678",
        email: "test@eximbay.com",
      },
      product: [
        {
          name: "상품명",
          quantity: "1",
          unitPrice: 10000,
        },
      ],
      surcharge: [
        {
          name: "쿠폰할인, 배송비 등..",
          quantity: "1",
          unitPrice: 10000,
        },
      ],
      url: {
        returnUrl: "https://www.naver.com",
      },
      settings: {
        displayType: "P",
        autoclose: "Y",
        callFromApp: "N",
        callFromScheme: "parnashotelAppiOS://",
        issuerCountry: "KR",
        ostype: "P",
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
          currency: "KRW",
          amount: "100",
          lang: "KR",
          payment_method: "P000",
        },
        merchant: {
          mid: "1849705C64",
          shop: "가맹점명",
        },
        buyer: {
          name: "손유정",
          phone_number: "01022553219",
          email: "ari.son@h2ohospitality.io",
        },
        url: {
          return_url: "eximbay.com",
          status_url: "eximbay.com",
        },

        tax: {
          amount_tax_free: "10",
          amount_taxable: "10",
          amount_vat: "10",
          amount_service_fee: "10",
        },
        otherParam: {
          param1: "string",
          param2: "string",
        },
        product: [
          {
            name: "상품명",
            quantity: "1",
            unit_price: "10000",
          },
        ],
        surchargeArray: [
          {
            name: "쿠폰할인",
            quantity: "1",
            unit_price: "-10.00",
          },
          {
            name: "배송비",
            quantity: "1",
            unit_price: "5.00",
          },
        ],
        ship_to: {
          city: "Seoul",
          country: "KR",
          first_name: "John",
          last_name: "Doe",
          phone_number: "010-1234-5678",
          postal_code: "12345",
          state: "",
          street1: "123 Street, Apartment 45",
        },
        bill_to: {
          city: "Seoul",
          country: "KR",
          first_name: "John",
          last_name: "Doe",
          phone_number: "010-1234-5678",
          postal_code: "12345",
          state: "",
          street1: "123 Street, Apartment 45",
        },
        settings: {
          displayType: "R",
          autoclose: "Y",
          callFromApp: "N",
          issuerCountry: "KR",
          ostype: "P",
          site_foreign_currency: "",
          call_from_app:
            typeof navigator !== "undefined" &&
            (/Android/.test(navigator.userAgent) ||
              /iPad|iPhone|iPod/.test(navigator.userAgent))
              ? "Y"
              : "N",
          call_from_scheme: "",
          issuer_country: "",
        },
      });
    } else {
      console.error("EXIMBAY SDK not loaded");
    }
  };
  useEffect(() => {
    const handleMessage = (event: any) => {
      const message = event.data;
      console.log("Message received in Next.js:", message);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div>
      <script src="https://code.jquery.com/jquery-1.12.4.min.js" defer />
      <script src="https://api-test.eximbay.com/v1/javascriptSDK.js" defer />
      <button onClick={handleClick}>fgkey 생성</button>
      <button type="button" onClick={handlePayment}>
        결제 창 연동
      </button>
    </div>
  );
}
