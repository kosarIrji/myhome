// src/config.ts

export interface MahalleConfigItem {
  title: string;    // نام محله (فارسی)
  src: string;      // تصویر کاور
  rate: number;     // امتیاز
  update: string;   // تاریخ به‌روزرسانی (جلالی، رشته)
  sections: number; // تعداد قطعات (در صورت وجود)
  area: number;     // مساحت (مثلاً هکتار)
  url: string;      // لینک مقصد
  mahalleId?: number; // اختیاری: برای match بر اساس mahalle_ID
  logicalId?:number;
}

export const ALLEYS: MahalleConfigItem[] = [
  {
    title: "شهید بهشتی ",
    src: "assets/img/shahidbeheshti.png",
     logicalId: 1002,
    rate: 3,
    update: "18 / 06 / 1404",
    sections: 1828,
    area: 40,
    url: "/Shahidbeheshti"
  },{
    title: "ارتش",
    src: "assets/img/artesh.png",
    rate: 4.5,
    update: "20 / 05 / 1404",
    sections: 612,
    area: 36,
    url: "/Artesh"
  },{
    title: " دهخدا ",
    src: "assets/img/dehkhoda.png",
    rate: 4.5,
    update: "06 / 05/ 1404",
    sections: 1471,
    area:57 ,
    url: "/Dehkhoda"
  },{
    title: "جمهوری",
    src: "assets/img/jomhori.png",
    rate: 4,
    update: "08 / 05 / 1404",
    sections: 1138,
    area: 48,
    url: "/Jomhoori"
  },{
    title: "کوی معلم",
    src: "assets/img/kooyemoalem.png",
    rate: 4.5,
    update: "31 / 05 / 1404",
    sections: 971,
    area: 52,
    url: "/Kooyemoalem"
  },{
    title: " میرزا کوچک خان ",
    src: "assets/img/Mirzakoochak.jpg",
    rate: 4,
    update: "12 / 05/ 1404",
    sections: 621,
    area:23 ,
    url: "/Mirza"
  },
    {
      title: "بلوار",
      src: "assets/img/Bolvar.png",
      rate: 4.5,
      update: "06 / 05 / 1404",
      sections: 440,
      area: 23,
      url: "/Bolvar"
    },{
      title: "هفده شهریور",
      src: "assets/img/17shahrivar.png",
      logicalId: 1001,
      rate: 3.5,
      update: "07 / 05 / 1404",
      sections: 1625,
      area: 58.5,
      url: "/17shahrivar"
    },
    {
      title: "جاجرمی",
      src: "assets/img/jajarmi.jpg",
      rate: 3.5,
      update: "04 / 05 / 1404",
      sections: 1061,
      area: 30,
      url: "/Jajarmi"
    },
    {
      title: "حسینی معصوم",
      src: "assets/img/hosseini.png",
      rate: 3.5,
      update: "0 7/ 05/ 1404",
      sections: 1789,
      area:   63.5 ,
      url: "/Hoseinymasom"
    },
    {
      title:  "شریعتی شمالی",
      src: "assets/img/shariati.png",
      rate: 3.5,
      update: "04 / 05 / 1404",
      sections: 1828,
      area: 50,
      url: "/Shariati"
    },
    {
      title: "منبع آب - سیدی",
      src: "assets/img/seyyedi.png",
      rate:4 ,
      update: "15 / 06/ 1404",
      sections: 1297,
      area:   52,
      url: "/Seyedi"
    },{
      title: "چمران  ",
      src: "assets/img/chamran.png",
      rate: 3.5,
      update: "12 / 06 / 1404",
      sections: 0,
      area: 26,
      url: "/Chamran"
    },
    {
      title: "بسیج",
      src: "assets/img/Basij.png",
      rate: 4.4,
      update: "20 / 02 / 1404",
      sections: 486,
      area: 20,
      url: "/Basij"
    },
    {
      title: "مصلی",
      src: "assets/img/Mosalla.png",
      rate: 4,
      update: "1404 / 02 / 06",
      sections: 654,
      area: 35,
      url: "/Mosalla",
      
    },
    {
      title: "دوچنار",
      src: "assets/img/dochenar.png",
      rate:3.7,
      update: "13 / 05 / 1404",
      sections: 1126,
      area: 28,
      url: "/Dochenar"
    }

];

// نرمال‌سازی متن (حذف فاصله و نیم‌فاصله)
const normalizeTitle = (t: string) =>
  t.replace(/\s+/g, "").replace(/\u200c/g, "").trim();

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
