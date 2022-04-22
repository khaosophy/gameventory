import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="container">
      <h1>Hello World!</h1>
      <p>Review <Link to="/games">your board game collection.</Link></p>
    </div>
  )
}