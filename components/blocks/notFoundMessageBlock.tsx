export default function NotFoundMessageBlock({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center rounded-xl bg-white py-12 text-muted-foreground">
      <p>Nenhum {label} encontrado</p>
    </div>
  )
}
