import { useRouter } from "next/router"
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(()=> {
    console.log(router)
  },[])
  return (
    <>
      <h1>Hello, Next.js!</h1>
    </>
  )
}