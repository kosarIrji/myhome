// src/config.ts

export interface MahalleConfigItem {
  title: string; // نام محله (فارسی)

  rate: number; // امتیاز
  update: string; // تاریخ به‌روزرسانی (جلالی، رشته)
  sections: number; // تعداد قطعات (در صورت وجود)
  area: number; // مساحت (مثلاً هکتار)
  url: string; // لینک مقصد
  mahalleId?: number; // اختیاری: برای match بر اساس mahalle_ID
  logicalId?: number;
}

export const ALLEYS: MahalleConfigItem[] = [
  {
    title: "شهید بهشتی ",
    logicalId: 1002,
    rate: 3,
    update: "18 / 06 / 1404",
    sections: 1828,
    area: 40,
    url: "mahallat/Shahidbeheshti",
  },
  {
    title: "ارتش",
    rate: 4.5,
    update: "20 / 05 / 1404",
    sections: 612,
    area: 36,
    url: "mahallat/Artesh",
  },
  {
    title: " دهخدا ",
    rate: 4.5,
    update: "06 / 05/ 1404",
    sections: 1471,
    area: 57,
    url: "mahallat/Dehkhoda",
  },
  {
    title: "جمهوری",

    rate: 4,
    update: "08 / 05 / 1404",
    sections: 1138,
    area: 48,
    url: "mahallat/Jomhoori",
  },
  {
    title: "کوی معلم",

    rate: 4.5,
    update: "31 / 05 / 1404",
    sections: 971,
    area: 52,
    url: "mahallat/Kooyemoalem",
  },
  {
    title: " میرزا کوچک خان ",

    rate: 4,
    update: "12 / 05/ 1404",
    sections: 621,
    area: 23,
    url: "mahallat/Mirza",
  },
  {
    title: "بلوار",

    rate: 4.5,
    update: "06 / 05 / 1404",
    sections: 440,
    area: 23,
    url: "mahallat/Bolvar",
  },
  {
    title: "هفده شهریور",

    logicalId: 1001,
    rate: 3.5,
    update: "07 / 05 / 1404",
    sections: 1625,
    area: 58.5,
    url: "mahallat/17shahrivar",
  },
  {
    title: "جاجرمی",

    rate: 3.5,
    update: "04 / 05 / 1404",
    sections: 1061,
    area: 30,
    url: "mahallat/Jajarmi",
  },
  {
    title: "حسینی معصوم",

    rate: 3.5,
    update: "0 7/ 05/ 1404",
    sections: 1789,
    area: 63.5,
    url: "mahallat/Hoseinymasom",
  },
  {
    title: "شریعتی شمالی",

    rate: 3.5,
    update: "04 / 05 / 1404",
    sections: 1828,
    area: 50,
    url: "mahallat/Shariati",
  },
  {
    title: "منبع آب - سیدی",

    rate: 4,
    update: "15 / 06/ 1404",
    sections: 1297,
    area: 52,
    url: "mahallat/Seyedi",
  },
  {
    title: "چمران  ",

    rate: 3.5,
    update: "12 / 06 / 1404",
    sections: 792,
    area: 26,
    url: "mahallat/Chamran",
  },
  {
    title: "بسیج",

    rate: 4.4,
    update: "20 / 02 / 1404",
    sections: 486,
    area: 20,
    url: "mahallat/Basij",
  },
  {
    title: "مصلی",

    rate: 4,
    update: "1404 / 02 / 06",
    sections: 654,
    area: 35,
    url: "mahallat/Mosalla",
  },
  {
    title: "دوچنار",

    rate: 3.7,
    update: "13 / 05 / 1404",
    sections: 1126,
    area: 28,
    url: "mahallat/Dochenar",
  },
];

// نرمال‌سازی متن (حذف فاصله و نیم‌فاصله)
const normalizeTitle = (t: string) =>
  t
    .replace(/\s+/g, "")
    .replace(/\u200c/g, "")
    .trim();

// گرفتن meta با اولویت: mahalleId → title
export function getMahalleMeta(
  name: string,
  mahalleId?: number
): MahalleConfigItem | undefined {
  if (typeof mahalleId === "number") {
    const byId = ALLEYS.find((m) => m.mahalleId === mahalleId);
    if (byId) return byId;
  }
  const norm = normalizeTitle(name);
  return ALLEYS.find((m) => normalizeTitle(m.title) === norm);
}
