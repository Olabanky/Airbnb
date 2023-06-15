import "./globals.css";
import { Nunito } from "next/font/google";

import Navbar from "./commponents/navbar/Navbar";
import ClientOnly from "./commponents/ClientOnly"; /* to protect against hydration error */
import RegisterModal from "./commponents/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./commponents/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./commponents/modals/RentModal";
import SearchModal from "./commponents/modals/SearchModal";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone site",
};

const font = Nunito({ subsets: ["latin"] });

export default async function RootLayout({
  /**async was added because we used await for currentUser*/ children,
}: {
  children: React.ReactNode;
}) {
  //we can easily write this here because layout.tsx is by default a server component
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
