# hugo-theme-gallery

A very simple and opinionated photo gallery theme for Hugo built with Tailwind CSS.

- [Demo](https://hugo-gallery-example.netlify.com)
- [Example site source](exampleSite)

---

![Screenshot](https://github.com/nicokaiser/hugo-theme-gallery/raw/main/images/screenshot.jpg)

---

## Features

- Responsive design
- Dark theme
- Private albums
- Automatic (or manual) selection of feature images
- Justified album views with [Flickr's Justified Layout](https://github.com/flickr/justified-layout)
- Lightbox with [PhotoSwipe](https://photoswipe.com/)
- SEO with Open Graph tags

## Installation

This theme requires Hugo >= 0.113.

### As a Hugo Module

Requires the Go binary installed.

```
$ hugo mod init github.com/<your_user>/<your_project>
```

Add the theme to your `hugo.toml`

```
theme = ["github.com/nicokaiser/hugo-theme-gallery/v2"]
```

### As Git Submodule

```
$ git submodule add --depth=1 https://github.com/nicokaiser/hugo-theme-gallery.git themes/gallery
```

## Usage

Page bundles which contain at least one image are listed as album or gallery:

```
contents
|-- _index.md
|-- about.md             <-- not listed in album list
|-- animals
|   |-- _index.md
|   |-- cats
|   |   |-- index.md
|   |   |-- cat1.jpg
|   |   `-- feature.jpg  <-- album thumbnail
|   |-- dogs
|   |   |-- index.md
|   |   |-- dog1.jpg     <-- album thumbnail
|   |   `-- dog2.jpg
|   `-- feature.jpg
|-- bridge.jpg           <-- site thumbnail (OpenGraph, etc.)
`-- nature
    |-- index.md         <-- contains `featured_image: images/tree.jpg`
    |-- images
    |   `-- tree.jpg     <-- album thumbnail, not shown in gallery
    |-- nature1.jpg
    `-- nature2.jpg
```

- `/about.md` is not a Page Bundle and does not have image resources. It is not displayed in the album list.
- `/nature` is a Leaf Bundle (has `index.md` and no children) => displayed as gallery (`single` layout).
- `/animals` is a Branch Bundle (has `_index.md` and has children) => displayed as album list (`list` layout).
- The image resource with `*feature*` in its name or the first image found is used as thumbnail image for album lists.
- Albums without an image are not shown.
- Images in a sub-directory are not shown (here: `nature/images/tree.jpg`). This can be used to provide an album thumbnail that is not shown in the album itself.

### Front matter

- `title` -- title of the album, shown in the album list and on the album page.
- `date` -- album date, used for sorting (newest first).
- `description` -- description shown on the album page.
- `featured_image` -- name of the image file used for the album thumbnail. If not set, the first image which contains `feature` in its filename is used, otherwise the first image in the album.
- `weight` -- can be used to adjust sort order.
- `private` -- if set to `true`, this album is not shown in the album overview and is excluded from RSS feeds.
- `featured` -- if set to `true`, this album is listed on the homepage (even if private).
- `sort_by` -- property used for sorting images in an album. Default is `Name` (filename), but can also be `Exif.Date` (only works if all images have EXIF tags).
- `sort_order` -- sort order. Default is `asc`.

### Custom CSS

This theme uses Tailwind CSS and comes with a pre-built `styles.css`, so installing Node.js, PostCSS, etc. is not required. Some CSS variables can be used to create a customized look:

Add a `assets/css/custom.css` to your site and adjust the values to your needs:

```css
:root {
  --b1: 0 0% 100%; /* Base color of page */
  --b2: 0 0% 96.08%; /* Base color, a little darker */
  --bc: 0 0% 9.02%; /* Foreground content color */
}

html.dark {
  --b1: 0 0% 9.02%;
  --b2: 0 0% 14.9%;
  --bc: 0 0% 96.08%;
}
```

### Albums with images and sub-albums

In some cases it might be desirable to show images _and_ sub-albums on one page. To achive this, a local version of `list.html` needs to be added with something like this:

```diff
  {{ define "main" }}
    {{ partial "title.html" . }}
    {{ partial "albums.html" . }}
+   {{ partial "gallery.html" . }}
  {{ end }}
```

In this case, featured images for albums which only contain other albums need to be moved to a sub-directory to avoid being displayed.

### Folders with no images

Albums with no images are hidden by default. This is a design decision to keep the structure as simple as possible and hides pages like `about.md` or `imprint.md` from the album list without the need of defining a layout/section for each gallery.

[@baekgaard](https://github.com/baekgaard) made a [Pull request](https://github.com/nicokaiser/hugo-theme-gallery/pull/14) about handling of empty albums, which allows to modify this behaviour (which, for simplicity reasons, is not merged).

## Author

- [Nico Kaiser](https://kaiser.me/)
