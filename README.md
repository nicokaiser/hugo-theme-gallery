# hugo-theme-gallery

A very simple and opinionated photo gallery theme for Hugo built with Tailwind CSS.

- [Demo](https://hugo-gallery-example.netlify.com)
- [Example site source](exampleSite)

---

## Features

- Responsive design
- Dark theme
- Private albums
- Automatic (or manual) selection of feature images
- Justified album views with [Flickr's Justified Gallery](https://github.com/nk-o/flickr-justified-gallery)
- Lightbox with [PhotoSwipe](https://photoswipe.com/)
- SEO with Open Graph tags

## Installation

### As a Hugo Module

Requires the Go binary installed.

```
$ hugo mod init github.com/<your_user>/<your_project>
```

Add the theme to your `hugo.toml`

```
theme = ["github.com/nicokaiser/hugo-theme-gallery"]
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

### Albums with images and sub-albums

In some cases it might be desirable to show images _and_ sub-albums on one page. 

This is configured by setting nodeGallery true for the entire site in hugo.toml:

```
  [params]
    nodeGallery = true
```

or for the nodes for which that should be the case in \_index.md:

```
---
...
nodeGallery: true
---
```

Such albums will always be shown even if they hold no images. 

By default, all images in such nodes will then be shown. To hide the featured_image, define hideFeatured to either
"always", "auto" or "never" for the entire site (hugo.toml) or for the relevant nodes (\_index.md), e.g.:

```
  [params]
    hideFeatured = "auto"
```

When set to "always", the featured images is hidden for all nodes (but NOT for leaf pages). When set to "never", 
the featured images will be shown in their corresponding node. When set to "auto", featured images in nodes that
only hold one image will be hidden otherwise not.

## Author

- [Nico Kaiser](https://kaiser.me/)
