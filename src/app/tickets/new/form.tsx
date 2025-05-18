"use client";
import { createTicket } from "@/actions/ticket";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function NewTicketsPage() {
   const router = useRouter();

   const [state, formAction] = useActionState(createTicket, {
      success: false,
      message: "",
   });

   useEffect(() => {
      if (state.success) {
         toast.success("Ticket created successfully");
         router.push("/tickets");
      }
   }, [state.success, router]);

   return (
      <div>
         {!state.success && <p className="bg-red-900">{state.message}</p>}
         <form action={formAction}>
            <input type="text" name="subject" id="subject" placeholder="subject" />
            <textarea
               name="description"
               id="description"
               placeholder="description"
            />
            <select name="priority" id="priority" defaultValue="low">
               <option value="low">Low</option>
               <option value="medium">Medium</option>
               <option value="high">High</option>
            </select>
            <button type="submit">submit</button>
         </form>
      </div>
   );
}
