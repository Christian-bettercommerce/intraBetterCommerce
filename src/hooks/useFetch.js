import { useState, useEffect } from 'preact/hooks';

export const useFetch = ( url, shouldFetch, fetchTrigger ) => {
  const [state, setState] = useState({
    data: null ,
    isLoading: true,
    hasError: false,
    error: null,
    fetch: false
  });

  useEffect(() => {
    getFetch();

  }, [url,fetchTrigger]);

  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null
    });
  }


  const getFetch = async() => {

    if ( !shouldFetch ) {
      setState({
        data: null,
        isLoading: false,
        hasError: false,
        error: null,
        fetch: false
      });
      return;
    }

    setLoadingState();

    const resp = await fetch(url);
    const text = await resp.text();

    if ( text !== "Proceso completado exitosamente.") {
      console.log(text)
      const data = JSON.parse(text)
      
      setState({
        data:null,
        isLoading: false,
        hasError: true,
        error: {
          message: data.messge,
        },
        fetch: true
      });
      return;
    }
  

    setState({
      data: text,
      isLoading: false,
      hasError: false,
      error: null,
      fetch: true
    })
    return
  }

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
    fetch: state.fetch,
    error: state.error
  }

}