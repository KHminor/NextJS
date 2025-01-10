import { useRouter } from "next/router"

export default function SimpleCheck() {
	const router = useRouter();
	console.log(router)
	return (
		<>
			<p>simple: {router.query.slug}</p>
		</>
	)
}