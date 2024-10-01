import { useState, useEffect } from "preact/hooks";
import webhooks from "../../webhooks.json"
import CardSync from "./CardSync"

export const ListSync = () => {
  const [{ CL, PE, CO }, setHook] = useState(webhooks)

  // const getHooks = async () => {
  //   console.log("llama hook")
  //   const response = await fetch('/api/list.json')
  //   const data = await response.json()
  //   console.log({data})
  //   return data
  // }

  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   const hk = await getHooks();
  //   //   setHook(hk)
  //   // };

  //   // fetchData();
  //   console.log({state})
  // }, []);

  return (
    <main>
      <section class="p-4 place-content-center">
        <h1 class="text-3xl p-4 font-extrabold text-slate-900">Syncronizaciones Chile</h1>
        <ul role="list" class="grid grid-cols-1 md:grid-cols-4 gap-5">
          {
            CL.map(e => (
              <div class="flex flex-col">
                <h2 class="p-4 font-extrabold text-slate-900">{e.name}</h2>
                <CardSync
                  title={"Productos"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Categorias"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Packs"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Packs Reserva"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Marcas"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Opciones"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Menu"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Filtros"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
              </div>
            ))
          }
        </ul>
      </section>
      <section class="p-4 place-content-center">
        <h1 class="text-3xl p-4 font-extrabold text-slate-900">Syncronizaciones Colombia</h1>
        <ul role="list" class="grid grid-cols-1 md:grid-cols-4 gap-5">
          {
            CO.map(e => (
              <div class="flex flex-col">
                <h2 class="p-4 font-extrabold text-slate-900">{e.name}</h2>
                <CardSync
                  title={"Productos"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Categorias"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Packs"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Packs Reserva"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Marcas"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Opciones"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Menu"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Filtros"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
              </div>
            ))
          }
        </ul>
      </section>
      <section class="p-4 place-content-center">
        <h1 class="text-3xl p-4 font-extrabold text-slate-900">Syncronizaciones Perú</h1>
        <ul role="list" class="grid grid-cols-1 md:grid-cols-4 gap-5">
          {
            PE.map(e => (
              <div class="flex flex-col">
                <h2 class="p-4 font-extrabold text-slate-900">{e.name}</h2>
                <CardSync
                  title={"Productos"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Categorias"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Packs"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Packs Reserva"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Marcas"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Opciones"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Menu"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
                <br />
                <CardSync
                  title={"Filtros"}
                  brand={e.brand}
                  urlBrand={e.url}
                />
              </div>
            ))
          }
        </ul>
      </section>
    </main>
  )
}