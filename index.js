addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with html from one of the variants
 * @param {Request} request
 */
async function handleRequest(request) {

  // Get index from cookie or genrate randomly
  // Extra credits Task 2
  let cookie = getCookie(request, 'url_index')
  let index = null
  if (cookie != null) {
    index = cookie
  }
  else {
    // generate an index randomly if there is no cookie recieved
    let min = 0;
    let max = 2;
    index = Math.floor(Math.random() * (max - min) + min);
  }

  // Task 1, send fetch request
  const API_URL = 'https://cfw-takehome.developers.workers.dev/api/variants'
  let response = await fetchFromRequiredURL(API_URL, true);
  
  // Task 2 & 3, return HTML response recieved from one of the URLs
  let final_response = await fetchFromRequiredURL(response.variants[index], false);
  let ele = new ElementHandler();
  let response_obj = new Response(final_response, {
    headers: {'content-type': 'text/html'}
  })

  response_obj.headers.set('Set-cookie', 'url_index='+index)

  // Extra credits Task 1
  let html = new HTMLRewriter().on('*', ele).transform(response_obj);
  return html;
}

/**
 * ElementHandler class for HTMLRewriter.
 * Specific for tasks mentioned Extra Credits Task 1.
 */
class ElementHandler {
  element(element) {
    if (element.tagName == 'title') {
      element.setInnerContent('Naman Tiwari')
    }

    else if (element.tagName == 'h1' && element.getAttribute('id') == 'title') {
      element.setInnerContent('Naman Tiwari')
    }

    else if (element.tagName == 'p' && element.getAttribute('id') == 'description') {
      element.setInnerContent('Placeholder for some witty oneliner!!!')
    }

    else if (element.tagName == 'a' && element.getAttribute('id') == 'url') {
      element.setInnerContent('Link to personal website')
      element.setAttribute('href', 'https://naman-sopho.github.io')
    }
  }
}

/**
 * Generic function to handle simple fetch requests to an url.
 * @param {*} url The url to which the fetch request is sent.
 * @param {*} returnJson Returns json object if true else returns plain text.
 */
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

/**
 * Gets the cookie with the given name
 * Reference: https://developers.cloudflare.com/workers/templates/pages/cookie_extract/
 * @param {Request} request 
 * @param {string} name 
 */
function getCookie(request, name) {
  let result = null
  if (request.headers == null) return null
  let cookieString = request.headers.get('Cookie')
  console.log(cookieString)
  if (cookieString) {
    let cookies = cookieString.split(';')
    cookies.forEach(cookie => {
      let cookieName = cookie.split('=')[0].trim()
      if (cookieName === name) {
        let cookieVal = cookie.split('=')[1]
        result = cookieVal
      }
    })
  }
  return result
}
