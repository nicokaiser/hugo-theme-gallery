# Hugo Gallery Theme

A very simple and opinionated photo gallery theme for Hugo.

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

This theme is built with Tailwind CSS and requires Hugo >= 0.113, Node.js and NPM.

### As a Hugo Module

Requires the Go binary installed.

```
$ hugo mod init github.com/<your_user>/<your_project>
```

Then add the theme to your `hugo.toml`:

```
[module]
  [[module.imports]]
    path = "github.com/nicokaiser/hugo-theme-gallery/v3"
```

Install required packages:

```
$ hugo mod npm pack
$ npm install
```

### As Git Submodule

```
$ git submodule add --depth=1 https://github.com/nicokaiser/hugo-theme-gallery.git themes/gallery
$ hugo mod npm pack
$ npm install
```

## Usage

Page bundles which contain at least one image are listed as album or gallery:

```
content/
├── _index.md
├── about.md             <-- not listed in album list
├── animals/
│   ├── _index.md
│   ├── cats/
│   |   ├── index.md
│   |   ├── cat1.jpg
│   |   └── feature.jpg  <-- album thumbnail
│   ├── dogs/
│   |   ├── index.md
│   |   ├── dog1.jpg     <-- album thumbnail
│   |   └── dog2.jpg
│   └── feature.jpg
├── bridge.jpg           <-- site thumbnail (OpenGraph, etc.)
└──  nature/
    ├── index.md         <-- contains `featured_image: images/tree.jpg`
    ├── images/
    |   └── tree.jpg     <-- album thumbnail
    ├── nature1.jpg
    └── nature2.jpg
```

- `/about.md` is not a Page Bundle and does not have image resources. It is not displayed in the album list.
- `/nature` is a Leaf Bundle (has `index.md` and no children) => displayed as gallery (`single` layout).
- `/animals` is a Branch Bundle (has `_index.md` and has children) => displayed as album list (`list` layout).
- The image resource with `*feature*` in its name or the first image found is used as thumbnail image for album lists.
- Albums without an image are not shown.

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

### Metadata

Image titles for the lightbox view are either taken from the `ImageDescription` EXIF tag, or the `title` in the resource metadata.

EXIF tags can be written using software like Adobe Lightroom or by using command line tools like exiftool:

```
exiftool -ImageDescription="A closeup of a gray cat's face" cat-4.jpg
```

Alternatively, the image title can be set in the front matter:

```markdown
---
date: 2024-02-18T14:12:44+0100
title: Cats
resources:
  - src: cat-1.jpg
    title: Brown tabby cat on white stairs
  - src: cat-2.jpg
    title: Selective focus photography of orange and white cat on brown table
---
```

Note: currently it is only possible to set the `title` in the front matter. Setting the `date` is not supported yet.

### Customization

The theme is very opinionated but kept simple to you can create a customized version. CSS is generated with Tailwind, PostCSS and Hugo Pipes, so you can use additional Tailwind utility classes in your custom templates.

Custom CSS can be used in `assets/css/custom.css` (see the example in `exampleSite`).

## Author

- [Nico Kaiser](https://kaiser.me/)
