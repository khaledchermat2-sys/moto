import Navbar from "./components/Navbar"
import "./globals.css"

export const metadata = {
  title: "MOTORCYCLE DZ — High-End Showroom Algérie",
  description: "Découvrez l'excellence sur deux roues. La plus grande sélection de motos premium en Algérie au meilleur prix.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main style={{ paddingTop: '70px' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
