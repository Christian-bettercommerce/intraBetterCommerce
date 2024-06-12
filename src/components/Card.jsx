import { useState, useEffect } from "preact/hooks";

export default function Card({title, brand, url, token, status}){
  const [state, setState] = useState(status)

  const getStatusColor = (status) => {
    if(status){
      return 'bg-green-500'
    }
    return 'bg-red-500 animate-pulse'
  };

	const changeStatus = async (url, token) => {

		const response = await fetch('/api/update.json', {
				method: 'POST',
				body: JSON.stringify({ url, token })
			})

			const { data } = await response.json()
			return data?.is_active
	}

  const handleOnClick = async () => {
    const status = await changeStatus(url,token)
    setState(status)
  }

  return (
    <li class="rounded-lg bg-slate-600 p-3 text-slate-100 hover:scale-[1.03]">
      <button class="w-full text-left" onClick={handleOnClick}>
        <div class="flex flex-row items-center justify-between">
          <figure class="w-10 h-10 mr-2">
            <img class="min-w-7" src={`logo-${brand}.webp`} alt="" />
          </figure>
          <p class="">
            {title}
          </p>
          <span class={`status-indicator w-4 h-4 rounded-full ml-4 ${getStatusColor(state)}`} />	    
        </div>
      </button>
    </li>
  )
}