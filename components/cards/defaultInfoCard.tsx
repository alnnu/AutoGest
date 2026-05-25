export default function DefaultInfoCard({
  label,
  info,
}: {
  label: string
  info: any
}) {
  return (
    <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
      <h3 className="text-sm">{label}</h3>
      <p className="mt-4 text-2xl font-bold">{info}</p>
    </div>
  )
}
