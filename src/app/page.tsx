import Link from "next/link";
import { FaTicketAlt } from "react-icons/fa";


const HomePage = () => {
   return (
      <main>
         <h1 className="text-3xl font-bold underline">
            Hello world!
         </h1>
         <Link
            className="text-blue-500 hover:underline"
            href='tickets'
         >
            Tickets
         </Link>
         <Link
            href='tickets/new'
            className="text-blue-500 hover:underline"
         >
            New Ticket
         </Link>
      </main>
   );
}

export default HomePage;