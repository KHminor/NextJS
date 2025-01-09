import { useRouter } from "next/router"
import Link from 'next/link'

export default function MultiCheck() {
  const router = useRouter();
  if (!router.isReady) return <><div>로딩중...</div></>
  return (
    <>
      {router.query.slug?.map((i,idx)=> (
        <div key={idx}>multi: {i}</div>
      ))}
      <ul>
        <li><a href="/check/a/b">ab</a></li>
        <li><Link href="/">a</Link></li>
        <li><Link href="/cart/">cart</Link></li>
        <li><Link href={`/check/${router.query.slug}`}>cart-detail</Link></li>
      </ul>
    </>
  )
}