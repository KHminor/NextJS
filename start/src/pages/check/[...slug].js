import { useRouter } from "next/router"
import Link from 'next/link'

export default function MultiCheck() {
  const router = useRouter();
  const click = () => {
    router.push("/cart")
  }

  if (!router.isReady) return <><div>로딩중...</div></>
  return (
    <>
      {router.query.slug?.map((i,idx)=> (
        <div key={idx}>multi: {i}</div>
      ))}
      <ul>
        <li><Link href="/">a</Link></li>
        <li><Link href="/cart/">cart</Link></li>
        <li><Link href={`/cart/${router.query.slug}`}>cart-detail</Link></li>
      </ul>
      <button onClick={click}>카트로 슈욱</button>
    </>
  )
}