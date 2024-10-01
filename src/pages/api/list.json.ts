import type { APIRoute } from 'astro';
import webhooks from '../../../webhooks.json';

export const prerender = false;

interface Webhook {
  id: number;
  brand: string;
  name: string;
}

interface Webhooks {
  [key: string]: Webhook[];
}

const typedWebhooks: Webhooks = webhooks as Webhooks;

export const GET: APIRoute = async ({ request }) => {
  const hooks = await Promise.all(Object.keys(webhooks).map(key => {
    let key_store = `PUBLIC_STORE_${key}`
    let env_store = import.meta.env[key_store]
    return Promise.all(typedWebhooks[key].map(async e => {
      if(e.brand === "FC" && key === "PE"){
        env_store = import.meta.env.PUBLIC_STORE_CL
      }
      const key_token = `PUBLIC_${key}_${e.brand}`
      const env_token = import.meta.env[key_token]
      const url = `https://api.bigcommerce.com/stores/${env_store}/v3/hooks/${e.id}`
      const response = await fetch(url, {
        method: 'GET',
        headers:{
          'X-Auth-Token': env_token
        }
      })
  
      const { data } = await response.json()
      return { url, brand: e.brand, token: env_token, name: e.name, status: data.is_active}
    }))
  }))
  return new Response(JSON.stringify(hooks), {
    status: 200
  })
};