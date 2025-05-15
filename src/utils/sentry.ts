import * as Sentry from "@sentry/nextjs";
import { SentryLogProps } from "../types/sentry";

export function sentryLog({ category, message, data, level = 'info', error }: SentryLogProps) {
   Sentry.addBreadcrumb({
      category,
      message,
      data,
      level
   })
   if (error) Sentry.captureException(error, { extra: data })
   else Sentry.captureMessage(message, level)
}