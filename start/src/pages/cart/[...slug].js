import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Pages() {
  const router = useRouter();
  // useEffect(()=> {
    
  // },[])
  const click = () => {
    router.push("/?counter=10", undefined, {shallow:true})
  }
  return (
    <>
      {
        router.query.slug[0].split(",").map((i,idx)=> (
          <div key={idx} style={{color: `#${idx*2}12df3`}} onClick={click}>cart: {i}</div>
        ))
      }
    </>
  )
}