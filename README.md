# Cloudflare Workers Internship Application: Full-Stack

## Tasks
- [x] Request the URLs from the API

    Make a fetch request inside of your script's event handler to the URL `https://cfw-takehome.developers.workers.dev/api/variants`, and parse the response as JSON. The response will be an array of URLs, which should be saved to a variable.

- [x] Request a (random: see #3) variant

    Make a fetch request to one of the two URLs, and return it as the response from the script.

- [x] Distribute requests between variants

    The `/api/variants` API route will return an array of two URLs. Requests should be evenly distributed between the two urls, in A/B testing style. This means that when a client makes a request to the Workers script, the script should roughly return each variant around 50% of the time.

- [x] (Deployment) Register a workers.dev subdomain

    Every Workers user has access to a free, unique workers.dev subdomain, which allows you to deploy your projects to a stable URL without needing to purchase domains and configure DNS records. Following the Quick Start linked above includes setting up a workers.dev subdomain!

- [x] (Deployment) A user should be able to visit the deployed version of the site

    Using wrangler's `publish` command, you can deploy your application and make it available under your workers.dev subdomain. Make sure to include this when you submit your project!

## Extra Credit Tasks

- [x] Changing copy/URLs

    For each variant page, there are a number of items on the page that can be customized. Try changing the following values inside of the variant, adding your own text or URLs:

    - `title`: the title of the web page, displayed on the window or tab title in your browser.
    - `h1#title`: the main title of the page. By default, this displays "Variant 1" or "Variant 2"
    - `p#description`: the description paragraph on the page. By default, this displays the text "This is variant X of the take home project!".
    - `a#url`: a Call to Action link with strong emphasis on the page. Try changing this to a URL of your choice, such as your personal website, and make sure to update the text "Return to cloudflare.com" as well!

    This can be done using the [HTMLRewriter](https://developers.cloudflare.com/workers/reference/apis/html-rewriter/) API built into the Workers runtime, or using simple text replacement.

- [x] Persisting variants

    If a user visits the site and receives one of the two URLs, persist which URL is chosen in a cookie so that they always see the same variant when they return to the application. A cookie would be a great way to implement this!

- [ ] Publish to a domain

    If you have a registered domain/zone with Cloudflare, try deploying your project by customizing the `zone_id` and `route` in your `wrangler.toml`. Make sure to check out the [Quick Start](https://developers.cloudflare.com/workers/quickstart) in the Workers docs for details on how to do this! **Note:** domains cost money, so if you don't have one, please don't feel obligated to buy one for this exercise. This is an extra credit task and you won't be penalized for skipping this one, we promise!
