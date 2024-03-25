import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const usePaymentVerification = () => {
  const router = useRouter();

  const verifyPayment = async () => {
    const data = router.query;

    const config = {
      headers: {
        Authorization: "Basic dGVzdF8xODQ5NzA1QzY0MkMyMTdFMEIyRDo=",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "https://api-test.eximbay.com/v1/payments/verify",
      data,
      config
    );
    return response.data.data;
  };
  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ["paymentVerification"],
    queryFn: verifyPayment,
  });

  useEffect(() => {
    if (isSuccess) {
      const url = `/myNextPage?currency=USD&card_number1=4111&transaction_date=20220927152250&card_number4=1111&mid=1849705C64&amount=100&access_country=KR&order_id=20220927152140&payment_method=P101&email=test@eximbay.com&ver=230&transaction_id=1849705C6420220927000016&param3=TEST&resmsg=Success.&card_holder=TESTP&rescode=0000&auth_code=309812&fgkey=2AE38D785E05E6AF57977328908C7CD84A273B3FE6C042D537A800B0CBC783EA&transaction_type=PAYMENT&pay_to=EXIMBAY.COM`;

      router.push(url);
    }
  }, [isSuccess, router]);

  return <div>{data}</div>;
};

export default usePaymentVerification;
