import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <header>
        <Link href="/" aria-label="Go to homepage">
          <Image
            src="/logo.svg"
            alt="RentalCar"
            width={104}
            height={16}
            priority
          />
        </Link>
        <nav>
          <ul>
            <li>
              <Link href="/" aria-label="Go to homepage">
                Home
              </Link>
            </li>
            <li>
              <Link href="/catalog" aria-label="Go to catalog page">
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div>
          <h1>Find your perfect rental car</h1>
          <h2>Reliable and budget-friendly rentals for any journey</h2>
        </div>
        <button>View Catalog</button>
      </main>
    </>
  )
}