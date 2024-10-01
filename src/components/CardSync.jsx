import { useState, useEffect } from "preact/hooks";
import { useFetch } from "../hooks/useFetch";
import { toast } from './Toast';

export default function CardSync({title, brand, urlBrand}){
  const [url, setUrl] = useState('')
  const [fetchTrigger, setFetchTrigger] = useState(0)
  const [shouldFetch, setShouldFetch] = useState(false)
  const {data, isLoading, hasError, fetch, error } = useFetch(url, shouldFetch, fetchTrigger)

  const handleOnClick = async (e) => {
    if(e.target.textContent === 'Productos'){
      setUrl(`${urlBrand}/sincronizar-productos`)
    }
    if(e.target.textContent === 'Categorias'){
      setUrl(`${urlBrand}/sincronizar-categorias`)
    }
    if(e.target.textContent === 'Packs'){
      setUrl(`${urlBrand}/sincronizar-packs`)
    }
    if(e.target.textContent === 'Packs Reserva'){
      setUrl(`${urlBrand}/sincronizar-packs-reserva`)
    }
    if(e.target.textContent === 'Marcas'){
      setUrl(`${urlBrand}/sincronizar-marcas`)
    }
    if(e.target.textContent === 'Opciones'){
      setUrl(`${urlBrand}/sincronizar-opciones`)
    }
    if(e.target.textContent === 'Menu'){
      setUrl(`${urlBrand}/sincronizar-menu`)
    }
    if(e.target.textContent === 'Filtros'){
      setUrl(`${urlBrand}/sincronizar-filtros`)
    }

    setShouldFetch(true)
    setFetchTrigger(fetchTrigger + 1)
  }

  useEffect(() => {
    if(!shouldFetch) return

    if(!isLoading){
      if (hasError) {
        toast(error.message, 'error');
      } else {
        toast(data, 'success');
      }
    }
  }, [isLoading])


  return (
    <li class="rounded-lg bg-slate-600 p-3 text-slate-100 hover:scale-[1.03]">
      <button class="w-full text-left" onClick={handleOnClick}>
        <div class="flex flex-row items-center">
          <figure class="w-10 h-10 mr-2">
            <img class="min-w-7" src={`logo-${brand}.webp`} alt="" />
          </figure>
          <p class="flex-1 text-center">
            {title}
          </p>
          {
            isLoading && <span class="loader"></span>
          }
        </div>
      </button>
    </li>
  )
}