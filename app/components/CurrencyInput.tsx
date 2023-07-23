"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

interface CurrentDto {
  timestamp: number;
  usdToKrw: number;
  usdToVnd: number;
}

const CurrencyInput = () => {
  const { data: currencyData } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios.get<CurrentDto>("/api/currency").then((res) => res.data),
  });
  const { usdToKrw, usdToVnd } = currencyData || {};
  const [currency, setCurrency] = useState({
    krw: 0,
    usd: 0,
    vnd: 0,
  });
  const { krw, usd, vnd } = currency;

  const onChangeKrw = (
    krw: number,
    usdToKrw: number | undefined,
    usdToVnd: number | undefined
  ) => {
    if (!usdToKrw || !usdToVnd) {
      return;
    }
    setCurrency({
      krw,
      usd: krw / usdToKrw,
      vnd: (krw / usdToKrw) * usdToVnd,
    });
  };

  const onChangeUsd = (
    usd: number,
    usdToKrw: number | undefined,
    usdToVnd: number | undefined
  ) => {
    if (!usdToKrw || !usdToVnd) {
      return;
    }
    setCurrency({
      krw: usd * usdToKrw,
      usd,
      vnd: usd * usdToVnd,
    });
  };

  const onChangeVnd = (
    vnd: number,
    usdToKrw: number | undefined,
    usdToVnd: number | undefined
  ) => {
    if (!usdToKrw || !usdToVnd) {
      return;
    }
    setCurrency({
      krw: (vnd / usdToVnd) * usdToKrw,
      usd: vnd / usdToVnd,
      vnd,
    });
  };

  useEffect(() => {
    if (currency.krw === 0) {
      onChangeKrw(10000, usdToKrw, usdToVnd);
    }
  }, [usdToKrw, usdToVnd]);

  return (
    <div className="flex flex-col mt-4 space-y-2">
      <div className="flex flex-row items-center justify-center space-x-2">
        <span>한국 원</span>
        <input
          className="text-secondary"
          value={Math.floor(krw).toLocaleString()}
          onChange={(e) => {
            onChangeKrw(
              Number(e.target.value.replaceAll(",", "")),
              usdToKrw,
              usdToVnd
            );
          }}
        />
      </div>
      <div className="flex flex-row items-center justify-center space-x-2">
        <span>베트남 동</span>
        <input
          className="text-secondary"
          value={Math.floor(vnd).toLocaleString()}
          onChange={(e) => {
            onChangeVnd(
              Number(e.target.value.replaceAll(",", "")),
              usdToKrw,
              usdToVnd
            );
          }}
        />
      </div>
      <div className="flex flex-row items-center justify-center space-x-2">
        <span>미국 달러</span>
        <input
          className="text-secondary"
          value={usd.toLocaleString()}
          onChange={(e) => {
            onChangeUsd(
              Number(e.target.value.replaceAll(",", "")),
              usdToKrw,
              usdToVnd
            );
          }}
        />
      </div>
    </div>
  );
};

export default CurrencyInput;
