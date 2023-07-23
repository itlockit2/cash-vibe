import { redis } from "@/app/lib/redis";
import axios from "axios";
import { formatInTimeZone } from "date-fns-tz";
import { NextResponse } from "next/server";

interface CurrentDto {
  timestamp: number;
  rates: {
    KRW: number;
    VND: number;
  };
}

export async function GET() {
  const now = new Date();
  const koreaTime = formatInTimeZone(now, "Asia/Seoul", "yyyyMMddHH");
  const cachedValue = await redis.get(koreaTime);
  if (cachedValue) {
    return NextResponse.json(JSON.parse(cachedValue));
  }

  const result = await axios
    .get<CurrentDto>(
      `https://openexchangerates.org/api/latest.json?app_id=${process.env.CURRENCY_API_KEY}`
    )
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return null;
    });

  if (!result) {
    return NextResponse.json(
      {
        error: "환율 정보를 가져오는데 실패했습니다.",
      },
      { status: 500 }
    );
  }
  const {
    timestamp,
    rates: { KRW, VND },
  } = result;

  redis.set(
    koreaTime,
    JSON.stringify({
      timestamp,
      KRW,
      VND,
    })
  );

  return NextResponse.json({
    timestamp,
    KRW,
    VND,
  });
}
