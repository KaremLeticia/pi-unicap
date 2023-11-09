export default function Page({ params }: 
  {params: { id: string}}) {
  return <h1>oi {params.id}</h1>
}