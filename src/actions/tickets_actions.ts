'use server'

import { prisma } from "@/db/prisma"
import { TicketActionsProps } from "@/types/ticket_actions"
import { sentryLog } from "@/utils/sentry"
import { revalidatePath } from "next/cache"

export async function createTicket(prevState: TicketActionsProps, formData: FormData): Promise<TicketActionsProps> {
   try {
      const subject = formData.get('subject') as string
      const description = formData.get('description') as string
      const priority = formData.get('priority') as string

      if (!subject?.trim() || !description?.trim() || !priority) {
         sentryLog({
            category: 'ticket',
            message: 'Missing required fields',
            level: 'warning',
            data: {
               subject,
               description,
               priority
            }
         })
         return {
            success: false,
            message: 'Validation failed',
         }
      }

      const ticket = await prisma.ticket.create({
         data: {
            subject,
            description,
            priority
         }
      })

      sentryLog({
         message: `ticket created ${ticket.id}`,
         level: 'info',
         data: {
            ticket
         },
         category: `ticket`,
      })

      revalidatePath('/tickets')

      return {
         success: true,
         message: 'Ticket created successfully',
      }
   } catch (error) {
      sentryLog({
         message: 'Internal server error',
         level: 'error',
         data: {
            formData: Object.fromEntries(formData.entries()),
         },
         category: 'ticket',
         error: error,
      })
      return {
         success: false,
         message: 'Internal server error+',
      }
   }


}
