export type DaySchedule = {
  open: string; // HH:mm
  close: string; // HH:mm
};

// 0 = Sunday ... 6 = Saturday
export const BUSINESS_HOURS: Record<number, DaySchedule | null> = {
  0: { open: "14:00", close: "21:15" }, // Sunday
  1: { open: "10:00", close: "21:30" }, // Monday
  2: { open: "10:00", close: "21:30" }, // Tuesday
  3: { open: "10:00", close: "21:30" }, // Wednesday
  4: { open: "10:00", close: "21:30" }, // Thursday
  5: { open: "10:00", close: "21:30" }, // Friday
  6: { open: "13:45", close: "21:30" }, // Saturday
};

export const DAY_LABELS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export type StoreStatus = {
  isOpen: boolean;
  label: string;
  nextChangeLabel: string;
};

export function getStoreStatus(date: Date = new Date()): StoreStatus {
  const day = date.getDay();
  const minutesNow = date.getHours() * 60 + date.getMinutes();
  const today = BUSINESS_HOURS[day];

  if (today) {
    const openMin = toMinutes(today.open);
    const closeMin = toMinutes(today.close);
    if (minutesNow >= openMin && minutesNow < closeMin) {
      return {
        isOpen: true,
        label: "Aberto agora",
        nextChangeLabel: `Fecha às ${today.close}`,
      };
    }
  }

  // find next opening
  for (let i = 0; i <= 7; i++) {
    const nextDay = (day + i) % 7;
    const schedule = BUSINESS_HOURS[nextDay];
    if (!schedule) continue;
    if (i === 0) {
      const openMin = toMinutes(schedule.open);
      if (minutesNow < openMin) {
        return {
          isOpen: false,
          label: "Fechado agora",
          nextChangeLabel: `Abre hoje às ${schedule.open}`,
        };
      }
      continue;
    }
    const label = i === 1 ? "amanhã" : `${DAY_LABELS[nextDay]}`;
    return {
      isOpen: false,
      label: "Fechado agora",
      nextChangeLabel: `Abre ${label} às ${schedule.open}`,
    };
  }

  return { isOpen: false, label: "Fechado agora", nextChangeLabel: "" };
}
