addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with html from one of the variants
 * @param {Request} request
 */
async function handleRequest(request) {
  const API_URL = 'https://cfw-takehome.developers.workers.dev/api/variants'
  let response = await fetchFromRequiredURL(API_URL, true);

  let min = 0;
  let max = 2;
  let random = Math.floor(Math.random() * (max - min) + min);
  
  let final_response = await fetchFromRequiredURL(response.variants[random], false);
  let ele = new ElementHandler();
  let response_obj = new Response(final_response, {
    headers: {'content-type': 'text/html'}
  })
  let html = new HTMLRewriter().on('*', ele).transform(response_obj);
  return html;
}

class ElementHandler {
  element(element) {
    // An incoming element, such as `div`

    // Edit title of the page
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
      element.setInnerContent('Link to website')
      element.setAttribute('href', 'https://naman-sopho.github.io')
    }
    
  }

  comments(comment) {
    // An incoming comment
  }

  text(text) {
    // An incoming piece of text
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
