import { z } from "zod";

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const slotSchema = z
  .object({
    start: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    end: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  })
  .superRefine((slot, ctx) => {
    const start = timeToMinutes(slot.start);
    const end = timeToMinutes(slot.end);

    if (start >= end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["end"],
        message: "End time must be after start time.",
      });
    }

    if (end - start < 30) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["end"],
        message: "Each slot must be at least 30 minutes.",
      });
    }
  });

const dayAvailabilitySchema = z
  .object({
    day: z.enum([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]),
    slots: z.array(slotSchema),
  })
  .superRefine((day, ctx) => {
    const sortedSlots = [...day.slots].sort(
      (a, b) => timeToMinutes(a.start) - timeToMinutes(b.start)
    );

    for (let i = 1; i < sortedSlots.length; i++) {
      const previous = sortedSlots[i - 1];
      const current = sortedSlots[i];

      if (timeToMinutes(current.start) < timeToMinutes(previous.end)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["slots"],
          message: `Time slots overlap on ${day.day}.`,
        });

        break;
      }
    }
  });

export const availabilitySchema = z.object({
  availability: z
    .array(dayAvailabilitySchema)
    .length(7, "Availability must contain all seven days."),
});