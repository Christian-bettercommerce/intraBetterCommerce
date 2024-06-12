import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const {url, token} = body;
  console.log(url,token)

  const response = await fetch(url, {
    method: 'PUT',
    headers:{
      "Content-Type": "application/json",
      'X-Auth-Token': token
    },
    body: JSON.stringify({ is_active: true })
  });

  const { data } = await response.json();

  return new Response(JSON.stringify({
    data
    })
  );
}
