'use server'

import { prisma } from "@/db/prisma"
import { TicketProps, TicketsProps } from "@/types/ticket"
import { TicketPromiseProps } from "@/types/ticket_actions"
import { sentryLog } from "@/utils/sentry"
import { revalidatePath } from "next/cache"

export async function getTickets(): Promise<TicketPromiseProps> {
   try {
      const tickets = await prisma.ticket.findMany({
         orderBy: {
            createdAt: 'desc'
         }
      })
      sentryLog({
         message: `tickets fetched`,
         level: 'info',
         data: {
            tickets
         },
         category: `ticket`,
      })
      return {
         success: true,
         message: 'Tickets fetched successfully',
         tickets,
      }
   } catch (error) {
      sentryLog({
         message: 'Internal server error',
         level: 'error',
         data: {
            error
         },
         category: 'ticket',
      })
      return {
         success: false,
         message: 'Internal server error+',
      }
   }
}

export async function getTicket(id: string): Promise<TicketPromiseProps> {
   try {
      const ticket = await prisma.ticket.findUnique({
         where: {
            id: +id
         }
      })
      if (!ticket) {
         sentryLog({
            message: `ticket not found`,
            level: 'warning',
            data: {
               id
            },
            category: `ticket`,
         })
         return {
            success: false,
            message: 'Ticket not found',
         }
      }
      sentryLog({
         message: `ticket fetched`,
         level: 'info',
         data: {
            ticket
         },
         category: `ticket`,
      })
      return {
         success: true,
         message: 'Ticket fetched successfully',
         ticket,
      }
   } catch (error) {
      sentryLog({
         message: 'Internal server error',
         level: 'error',
         data: {
            error
         },
         category: 'ticket',
      })
      return {
         success: false,
         message: 'Internal server error+',
      }
   }
}

export async function createTicket(prevState: TicketPromiseProps, formData: FormData): Promise<TicketPromiseProps> {
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
export async function updateTicket(prevState: TicketPromiseProps, formData: FormData): Promise<TicketPromiseProps> {
   try {
      const id = formData.get('id') as string
      const subject = formData.get('subject') as string
      const description = formData.get('description') as string
      const priority = formData.get('priority') as string

      if (!id || !subject?.trim() || !description?.trim() || !priority) {
         sentryLog({
            category: 'ticket',
            message: 'Missing required fields',
            level: 'warning',
            data: {
               id,
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
      const ticket = await prisma.ticket.update({
         where: {
            id: +id as number
         },
         data: {
            subject,
            description,
            priority
         }
      })
      sentryLog({
         message: `ticket updated ${ticket.id}`,
         level: 'info',
         data: {
            ticket
         },
         category: `ticket`,
      })
      revalidatePath('/tickets')
      return {
         success: true,
         message: 'Ticket updated successfully',
      }
   }
   catch (error) {
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
export async function deleteTicket(prevState: TicketPromiseProps, formData: FormData): Promise<TicketPromiseProps> {
   try {
      const id = formData.get('id') as string

      if (!id) {
         sentryLog({
            category: 'ticket',
            message: 'Missing required fields',
            level: 'warning',
            data: {
               id
            }
         })
         return {
            success: false,
            message: 'Validation failed',
         }
      }
      const ticket = await prisma.ticket.delete({
         where: {
            id: +id as number
         }
      })
      sentryLog({
         message: `ticket deleted ${ticket.id}`,
         level: 'info',
         data: {
            ticket
         },
         category: `ticket`,
      })
      revalidatePath('/tickets')
      return {
         success: true,
         message: 'Ticket deleted successfully',
      }
   }
   catch (error) {
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



