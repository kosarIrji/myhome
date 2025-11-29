// mapping بین نام‌های GIS و محله نمایشی روی نقشه
export const mahalleGroupMap: Record<
  string,
  { title: string; logicalId: number }
> = {
  // گروه 1: هفده شهریور شمالی
  "ینگه قلعه": {
    title: "هفده شهریور شمالی",
    logicalId: 1001,
  },
  "کلانتری11": {
    title: "هفده شهریور شمالی",
    logicalId: 1001,
  },

  // گروه 2: شهید بهشتی شمالی
  "پورآدینه": {
    title: "شهید بهشتی شمالی",
    logicalId: 1002,
  },
  "ساربان محله": {
    title: "شهید بهشتی شمالی",
    logicalId: 1002,
  },
};
