addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const API_URL = 'https://cfw-takehome.developers.workers.dev/api/variants'
  let response = await fetchFromRequiredURL(API_URL);

  return new Response(response, {
    headers: { 'content-type': 'text/plain' },
  })
}

async function fetchFromRequiredURL(url) {
  let response = await fetch(url);

  if (response.ok) { 
    let json = await response.json();
    return json.variants;
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
