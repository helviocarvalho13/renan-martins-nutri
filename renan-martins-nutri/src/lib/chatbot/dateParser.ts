import {
  addDays,
  nextMonday,
  nextTuesday,
  nextWednesday,
  nextThursday,
  nextFriday,
  nextSaturday,
  nextSunday,
  setDate,
  setMonth,
  parse,
  isValid,
  format,
  startOfDay,
} from "date-fns";

const MONTH_MAP: Record<string, number> = {
  janeiro: 0,
  fevereiro: 1,
  marco: 2,
  março: 2,
  abril: 3,
  maio: 4,
  junho: 5,
  julho: 6,
  agosto: 7,
  setembro: 8,
  outubro: 9,
  novembro: 10,
  dezembro: 11,
  jan: 0,
  fev: 1,
  mar: 2,
  abr: 3,
  mai: 4,
  jun: 5,
  jul: 6,
  ago: 7,
  set: 8,
  out: 9,
  nov: 10,
  dez: 11,
};

const DAY_OF_WEEK_FN: Record<string, (date: Date) => Date> = {
  segunda: nextMonday,
  "segunda-feira": nextMonday,
  terca: nextTuesday,
  "terca-feira": nextTuesday,
  terça: nextTuesday,
  "terça-feira": nextTuesday,
  quarta: nextWednesday,
  "quarta-feira": nextWednesday,
  quinta: nextThursday,
  "quinta-feira": nextThursday,
  sexta: nextFriday,
  "sexta-feira": nextFriday,
  sabado: nextSaturday,
  sábado: nextSaturday,
  domingo: nextSunday,
};

function normalize(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function parseDatePtBr(input: string): Date | null {
  const raw = input.toLowerCase().trim();
  const normalized = normalize(input);
  const today = startOfDay(new Date());

  if (normalized === "hoje") {
    return today;
  }

  if (normalized === "amanha") {
    return addDays(today, 1);
  }

  if (normalized === "depois de amanha") {
    return addDays(today, 2);
  }

  const nextDayMatch = normalized.match(
    /^(?:proxima?|próxima?|prox\.?)\s+(.+)$/
  );
  if (nextDayMatch) {
    const dayName = nextDayMatch[1].trim();
    for (const [key, fn] of Object.entries(DAY_OF_WEEK_FN)) {
      if (normalize(key) === normalize(dayName)) {
        return fn(today);
      }
    }
  }

  for (const [key, fn] of Object.entries(DAY_OF_WEEK_FN)) {
    if (normalized === normalize(key)) {
      return fn(today);
    }
  }

  const ddmmyyyySlash = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (ddmmyyyySlash) {
    const [, d, m, y] = ddmmyyyySlash;
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    if (isValid(date)) return startOfDay(date);
  }

  const ddmmSlash = raw.match(/^(\d{1,2})\/(\d{1,2})$/);
  if (ddmmSlash) {
    const [, d, m] = ddmmSlash;
    let year = today.getFullYear();
    let date = new Date(year, Number(m) - 1, Number(d));
    if (date < today) {
      date = new Date(year + 1, Number(m) - 1, Number(d));
    }
    if (isValid(date)) return startOfDay(date);
  }

  const diaNumMatch = normalized.match(/^dia\s+(\d{1,2})$/);
  if (diaNumMatch) {
    const day = Number(diaNumMatch[1]);
    let date = setDate(today, day);
    if (date < today) {
      date = setDate(addDays(today, 30), day);
      date = setMonth(date, today.getMonth() + 1);
    }
    if (isValid(date) && date.getDate() === day) return startOfDay(date);
  }

  const dayDeMonthMatch = normalized.match(
    /^(\d{1,2})\s+de\s+([a-zçã]+)$/
  );
  if (dayDeMonthMatch) {
    const day = Number(dayDeMonthMatch[1]);
    const monthStr = dayDeMonthMatch[2];
    const month = MONTH_MAP[monthStr] ?? MONTH_MAP[normalize(monthStr)];
    if (month !== undefined) {
      let year = today.getFullYear();
      let date = new Date(year, month, day);
      if (date < today) {
        date = new Date(year + 1, month, day);
      }
      if (isValid(date) && date.getDate() === day) return startOfDay(date);
    }
  }

  const ddmmyyyyDash = raw.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (ddmmyyyyDash) {
    const [, d, m, y] = ddmmyyyyDash;
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    if (isValid(date)) return startOfDay(date);
  }

  return null;
}

export function formatDatePtBr(date: Date): string {
  return format(date, "dd/MM/yyyy");
}

export function formatDateISO(date: Date): string {
  return format(date, "yyyy-MM-dd");
}
