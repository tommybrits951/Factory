

export default function PartsList({parts}) {

  const content = !parts ? <p>Loading...</p> : (
    <section className="h-full">
      <h3 className="text-3xl font-mono border-2 bg-stone-400 p-2 w-full text-center">Parts List</h3>
      <ul>
        {parts.map((part, idx) => {
          return (
            <li key={idx}>
              
                <h3>Name: {part.partName}</h3>
                <h3>Part Number: {part.partNo}</h3>
                <div></div>
                <ul>
                  {part.stock.map((stk, idz) => {
                    return (
                      <li key={idx * idz * 1000}>
                        <p>{stk.location}</p>
                        <p>{stk.amount}</p>
                        <p>{stk.lot}</p>
                        <p>{stk.dateMade}</p>
                      </li>
                    )
                  })}
                </ul>
            </li>
          )
        })}
      </ul>
    </section>
  )
  return content
}
