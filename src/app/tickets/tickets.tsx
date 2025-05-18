import { getTickets } from "@/actions/ticket";
import { TicketPromiseProps } from "@/types/ticket_actions";

export const Tickets = async () => {
   const promise: TicketPromiseProps = await getTickets();

   return (
      <div>
         <h1 className="text-2xl font-bold">Tickets</h1>
         <p className="text-gray-500">List of tickets</p>
         <div className="flex flex-col gap-4">
            {promise.tickets?.map((ticket) => (
               <div key={ticket.id} className="border p-4 rounded-md">
                  <h2 className="text-lg font-bold">{ticket.subject}</h2>
                  <p>{ticket.description}</p>
                  <p className="text-sm text-gray-500">{ticket.priority}</p>
               </div>
            ))}
         </div>
      </div>
   );
}