
<p align="center">
  <img src="https://lastmilelink.github.io/cosmo-api-v2-slate/images/logo.png" alt="On the dot: API Documentation" width="226">
  <br>
  <!-- a href="https://travis-ci.org/lord/slate"><img src="https://travis-ci.org/lord/slate.svg?branch=master" alt="Build Status"></a -->
</p>

<p align="center">Slate helps us create a beautiful, intelligent and responsive API documentation.</p>

<p align="center"><img src="https://lastmilelink.github.io/cosmo-api-v2-slate/images/otd-docs.png" width=700 alt="Screenshot of On the dot Documentation created with Slate"></p>

<p align="center"><em>Check it out at <a href="https://lastmilelink.github.io/cosmo-api-v2-slate">https://lastmilelink.github.io/cosmo-api-v2-slate</a>.</em></p>

# On the dot APIs Documentation Conventions and Templates
* **Clean, intuitive design** — Created with [Slate](https://github.com/lord/slate), the description of our APIs is on the left side of documentation, and all the code examples are on the right side. Inspired by [Stripe's](https://stripe.com/docs/api) and [PayPal's](https://developer.paypal.com/webapps/developer/docs/api/) API docs. Slate is responsive, so it looks great on tablets, phones, and even in print.

* **Everything on a single page** — Slate puts the entire documentation on a single page. We haven't sacrificed linkability, though. As you scroll, your browser's hash will update to the nearest header, so linking to a particular point in the documentation is still natural and easy.

## Aside strips

Asides CSS class can be : [notice, success, warning]

**Examples**

<aside class="success">
Our Sandbox provisioning is self-service with no commitment required with AUP policy enforced.. All that is required is to register and obtain your developer `API Key.` Bootstrat your development with On the dot APIs. All transactional data is regularily purged. 
Should you need further clarification, please contact OTD partners team at [partners@onthedot.com](mailto:partners@onthedot.com).
</aside>

**Middle Section code blocks**

Code syntax highliting is supported via highlight.js and RedCarpet

<code>
function writeIt(){
// creates new window to display page - SECTION A.3
diswin = window.open();
diswin.document.open();
diswin.document.write(temp2);
diswin.document.close()
}
</code>

```Javascript
function writeIt(){
// creates new window to display page - SECTION A.3
diswin = window.open();
diswin.document.open();
diswin.document.write(temp2);
diswin.document.close()
}
```

## Code samples include in the right pannel 
### These code samples will be generated and injected into documentation via the pipeline or GitHub

* All code samples are inserted via Ruby `partial include` statement: `<% partial 'includes/booboo.md.erb' %>`
The files need to follow a naming convention in order to be updated by OTD pipeline.

### Code samples naming convention and location in Slate project.

* All code samples files naming convention follows Ruby partials pattern : `_booboo.md.erb` with the follwoing file structure:

```
Slate root
    |-source
          |-`includes`
                |- `_booboo.md.erb`
                |- `_http_resp.md.erb` - 
                |- `_http_verb.md.erb`
          |- `...`
```

* **Out-of-the-box syntax highlighting** for [over 100 languages](https://github.com/jneen/rouge/wiki/List-of-supported-languages-and-lexers), no configuration required.

* Code samples are wrapped in a collapsable panel , code shown below: Please `note` the first character `>` which is used to indicate a blockquote and send the code samples in the right dark pane of the page.
```html

<!-- Full Code sample block -->
**Cancel an order**

><%= partial 'includes/http_verb.md.erb', locals: {verb:"POST", url: "http://lol.com/`{:param}`/`{:param}`",bg_colour:"#49cc90"}  %>
><%= partial 'includes/http_verb.md.erb', locals: {verb:"PUT", url: "http://lol.com/`{:param}`/`{:param}`",bg_colour:"#fca130"}  %>
><%= partial 'includes/http_verb.md.erb', locals: {verb:"PATCH", url: "http://lol.com/`{:param}`/`{:param}`",bg_colour:"#50e3c2"}  %>
><%= partial 'includes/http_verb.md.erb', locals: {verb:"GET", url: "http://lol.com/`{:param}`/`{:param}`",bg_colour:"#61affe"}  %>
><%= partial 'includes/http_verb.md.erb', locals: {verb:"DELETE", url: "http://lol.com/`{:param}`/`{:param}`",bg_colour:"#f93e3e"}  %>
><details><summary class="highlight plaintext">Expand for request</summary><pre><code><%= partial 'includes/booboo.md.erb' %></code></pre></details>

><div class="code-block-no-wrap-header">Http reponse codes :<%= partial 'includes/http_resp.md.erb', locals: {resp:"201", resp_text: "",bg_colour:"#49cc90"} %><%= partial 'includes/http_resp.md.erb', locals: {resp:"4xx", resp_text: "",bg_colour:"red"} %></div>
><details><summary class="highlight plaintext">Expand for response</summary><pre><code><%= partial 'includes/booboo.md.erb' %></code></pre></details>

<!-- URL right section -->
><%= partial 'includes/http_verb.md.erb', locals: {verb:"DELETE", url: "http://lol.com/`{:param}`/`{:param}`",bg_colour:"#f93e3e"}  %>

<!-- Expandable code sample: REQUEST -->

><details><summary class="highlight plaintext">Expand for request</summary><pre><code><%= partial 'includes/booboo.md.erb' %></code></pre></details>

**OR**

<%= partial 'includes/code_exp_middle.md.erb', locals: {lang:"ruby", text_style:"xxx", summary:"zxxzxzxzx", file:"v2otdpublic.md.erb"} %>


<!-- HTTP codes : Responses -->
><div class="code-block-no-wrap-header">Http reponse codes :<%= partial 'includes/http_resp.md.erb', locals: {resp:"201", resp_text: "",bg_colour:"#49cc90"} %><%= partial 'includes/http_resp.md.erb', locals: {resp:"4xx", resp_text: "",bg_colour:"red"} %></div>

<!-- Expandable code sample: RESPONSE -->
><details><summary class="highlight plaintext">Expand for response</summary><pre><code><%= partial 'includes/booboo.md.erb' %></code></pre></details>
```

Slate Features
------------

* **Slate is just Markdown** — When you write docs with Slate, you're just writing Markdown, which makes it simple to edit and understand. Everything is written in Markdown — even the code samples are just Markdown code blocks.

* **Automatic, smoothly scrolling table of contents** on the far left of the page. As you scroll, it displays your current position in the document. It's fast, too. We're using Slate at TripIt to build documentation for our new API, where our table of contents has over 180 entries. We've made sure that the performance remains excellent, even for larger documents.

* **Let your users update your documentation for you** — By default, your Slate-generated documentation is hosted in a public GitHub repository. Not only does this mean you get free hosting for your docs with GitHub Pages, but it also makes it simple for other developers to make pull requests to your docs if they find typos or other problems. Of course, if you don't want to use GitHub, you're also welcome to host your docs elsewhere.

* **RTL Support** Full right-to-left layout for RTL languages such as Arabic, Persian (Farsi), Hebrew etc.

Getting Started with Slate
------------------------------

### Prerequisites

You're going to need:

 - **Linux or macOS** — Windows may work, but is unsupported.
 - **Ruby, version 2.3.1 or newer**
 - **Bundler** — If Ruby is already installed, but the `bundle` command doesn't work, just run `gem install bundler` in a terminal.

### Getting Slate Set Up

1. Fork this repository on GitHub.
2. Clone *your forked repository* (not our original one) to your hard drive with `git clone https://github.com/YOURUSERNAME/slate.git`
3. `cd slate`
4. Initialize and start Slate. You can either do this locally, or with Vagrant:

```shell
# either run this to run locally
bundle install
bundle exec middleman server

# OR run this to run with vagrant
vagrant up
```

You can now see the docs at http://localhost:4567. Whoa! That was fast!

Now that Slate is all set up on your machine, you'll probably want to learn more about [editing Slate markdown](https://github.com/lord/slate/wiki/Markdown-Syntax), or [how to publish your docs](https://github.com/lord/slate/wiki/Deploying-Slate).

If you'd prefer to use Docker, instructions are available [in the wiki](https://github.com/lord/slate/wiki/Docker).

### Note on JavaScript Runtime

For those who don't have JavaScript runtime or are experiencing JavaScript runtime issues with ExecJS, it is recommended to add the [rubyracer gem](https://github.com/cowboyd/therubyracer) to your gemfile and run `bundle` again.

Companies Using Slate
---------------------------------

* [NASA](https://api.nasa.gov)
* [Sony](http://developers.cimediacloud.com)
* [Best Buy](https://bestbuyapis.github.io/api-documentation/)
* [Travis-CI](https://docs.travis-ci.com/api/)
* [Greenhouse](https://developers.greenhouse.io/harvest.html)
* [Woocommerce](http://woocommerce.github.io/woocommerce-rest-api-docs/)
* [Dwolla](https://docs.dwolla.com/)
* [Clearbit](https://clearbit.com/docs)
* [Coinbase](https://developers.coinbase.com/api)
* [Parrot Drones](http://developer.parrot.com/docs/bebop/)
* [Scale](https://docs.scaleapi.com/)

You can view more in [the list on the wiki](https://github.com/lord/slate/wiki/Slate-in-the-Wild).

Contributors
--------------------

Slate was built by [Robert Lord](https://lord.io) while interning at [TripIt](https://www.tripit.com/).

Thanks to the following people who have submitted major pull requests:

- [@chrissrogers](https://github.com/chrissrogers)
- [@bootstraponline](https://github.com/bootstraponline)
- [@realityking](https://github.com/realityking)
- [@cvkef](https://github.com/cvkef)

Also, thanks to [Sauce Labs](http://saucelabs.com) for sponsoring the development of the responsive styles.

Special Thanks
--------------------
- [Middleman](https://github.com/middleman/middleman)
- [jquery.tocify.js](https://github.com/gfranko/jquery.tocify.js)
- [middleman-syntax](https://github.com/middleman/middleman-syntax)
- [middleman-gh-pages](https://github.com/edgecase/middleman-gh-pages)
- [Font Awesome](http://fortawesome.github.io/Font-Awesome/)
