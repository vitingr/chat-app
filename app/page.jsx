import Link from "next/link"

export default function Home() {
  return (
    <div>
      <h1>
        <Link href="/login" className="text-c1">
          Clique Aqui
        </Link>
      </h1>
    </div>
  )
}
