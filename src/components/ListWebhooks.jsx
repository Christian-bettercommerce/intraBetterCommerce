import { useState, useEffect } from "preact/hooks";
import Card from "./Card";

export default function ListWebhooks(){
  
  const [chile, setChile] = useState([])
  const [colombia, setColombia] = useState([])
  const [peru, setPeru] = useState([])

  const getHooks = async () => {
    const response = await fetch('/api/list.json')
    const data = await response.json()
    return data
  }

  useEffect(() => {
    const fetchData = async () => {
      const hk = await getHooks();
      console.log(hk)
      const [cl, pe, co] = hk
      setChile(cl);
      setColombia(co);
      setPeru(pe);
    };

    fetchData();
  }, []);

  return (
    <main>
      <section class="p-4 place-content-center">
        <h1 class="text-3xl p-4 font-extrabold text-slate-900">Webhooks Chile</h1>
        <ul role="list" class="grid grid-cols-1 md:grid-cols-4 gap-5">
          {
            chile.map(e => (
              <Card
                title={e.name}
                brand={e.brand}
                url={e.url}
                token={e.token}
                status={e.status}
              />
            ))
          }
        </ul>
      </section>
      <section class="p-4 place-content-center">
        <h1 class="text-3xl p-4 font-extrabold text-slate-900">Webhooks Colombia</h1>
        <ul role="list" class="grid grid-cols-1 md:grid-cols-4 gap-5">
          {
            colombia.map(e => (
              <Card
              title={e.name}
              brand={e.brand}
              url={e.url}
              token={e.token}
              status={e.status}
            />
            ))
          }
        </ul>
      </section>
      <section class="p-4 place-content-center">
        <h1 class="text-3xl p-4 font-extrabold text-slate-900">Webhooks Perú</h1>
        <ul role="list" class="grid grid-cols-1 md:grid-cols-4 gap-5">
          {
            peru.map(e => (
              <Card
              title={e.name}
              brand={e.brand}
              url={e.url}
              token={e.token}
              status={e.status}
            />
            ))
          }
        </ul>
      </section>
    </main>
  )
}