# Stop AutoRefresh


Stop pages' auto refresh with http-equiv + refresh meta tags

## License
GPL3


This extension disables the annoying page auto refresh fired by the meta "http-equiv" + "refresh" that is used in several sites just to increase page views.

## Implementation notes

Chrome and Chromium don't allow to disable the refresh meta tag, nor they provide an easy method for cancelling it. The extension uses a http trick. When the [unavoidable] refresh is fired, it intercepts it, checks if it's the refresh event, if so, it redirects the connection to a small script (currently meneame.net -free App Engine is too slow-). This script just returns a 204 http status code, so the browser does not modify the content of the page, and doesn't try to refresh it again.
