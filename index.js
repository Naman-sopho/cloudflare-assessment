addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const API_URL = 'https://cfw-takehome.developers.workers.dev/api/variants'
  let response = await fetchFromRequiredURL(API_URL, true);

  let random = Math.floor(Math.random() % 2);
  
  let final_response = await fetchFromRequiredURL(response.variants[random], false);
  return new Response(final_response, {
    headers: { 'content-type': 'text/html' },
  })
}

async function fetchFromRequiredURL(url, returnJson) {
  let response = await fetch(url);

  if (response.ok) { 
    if (returnJson) {
    let json = await response.json();
    return json;
    }
    else {
      let text = await response.text();
      return text;
    }
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
