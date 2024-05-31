export default function Container({children})
{
  return(
    <div className="bg-zinc-950 h-screen overflow-auto">
      {children}
    </div>
  )
}