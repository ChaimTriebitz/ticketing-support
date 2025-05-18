import { TicketProps } from "./ticket"

export type TicketPromiseProps = {
   success: boolean
   message: string
   tickets?: TicketProps[]
   ticket?: TicketProps
}
