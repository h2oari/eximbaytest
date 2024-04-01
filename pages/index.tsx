import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { getEximbayFgkey } from "./api/useMutation";

declare global {
  interface Window {
    EXIMBAY: any;
  }
}

export default function Home() {
  const getEximbayFgkeyMutation = useMutation({
    mutationFn: (userData: any) => {
      return getEximbayFgkey(userData);
    },
  });
  const { isSuccess, data, mutateAsync } = getEximbayFgkeyMutation;

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
      {isSuccess && <p>{data}</p>}
    </div>
  );
}
