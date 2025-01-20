export default function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  console.log(props.searchParams);

  return <p>Customers Page</p>;
}
