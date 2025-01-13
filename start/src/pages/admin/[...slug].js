import { useRouter } from "next/router";

export default function Admin() {
    const router = useRouter();
    console.log(router);
    
    return (
        <>
            <p>hi</p>
        </>
    )
}