import * as Sentry from "@sentry/nextjs";

export type SentryLogProps = {
   category: string
   message: string
   data?: Record<string, any>
   level: Sentry.SeverityLevel
   error?: unknown
}


