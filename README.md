# goofing off with bookshelf.js

New plan:

* goof off with bookshelf.js
* maybe something simpler than a whiteboard, like a markdown wiki?
  * have pages, users, and tags
  * users are their own page namespace `/u/:id/:page`
    * or `/:user_name/:id/:page` where `user_name` is ignored but looks nicer
  * have an index page that lists users, pages, and page tags
    * as a test of bookshelf's eager loading, mostly
