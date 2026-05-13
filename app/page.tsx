import css from "./page.module.css"
import Link from "next/link";

export default function Home() {
  return (
    <section className={css.homeContainer}>
      <div className={css.homeContent}>
        <div className={css.homeTextContainer}>
          <h1>Find your perfect rental car</h1>
          <h2>Reliable and budget-friendly rentals for any journey</h2>
        </div>
        <Link href="/catalog">
          <button className={css.homeButton}>View Catalog</button>
        </Link>
      </div>
    </section>
  )
}