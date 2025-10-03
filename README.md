# Hugo Gallery Theme

A very simple and opinionated photo gallery theme for Hugo.

- [Demo](https://nicokaiser.github.io/hugo-theme-gallery/)
- [Example site source](https://github.com/nicokaiser/hugo-theme-gallery/tree/main/exampleSite)

---

![Screenshot](https://github.com/nicokaiser/hugo-theme-gallery/raw/main/images/screenshot.jpg)

---

## Features

- Responsive design
- Dark color scheme (can be set per page)
- Private albums
- Justified album views with [Flickr's Justified Layout](https://github.com/flickr/justified-layout)
- Lightbox with [PhotoSwipe](https://photoswipe.com/)
- SEO with Open Graph tags
- Automatic (or manual) selection of feature/cover images

**Important note: do not try to use WebP images.** The golang WebP implementation used in Hugo has a bug which leads to wrong image levels (dull looking images) upon resize. See [nicokaiser/hugo-theme-gallery#102](https://github.com/nicokaiser/hugo-theme-gallery/issues/102) for more details.

## Installation

This theme requires Hugo Extended >= 0.123.0. Dependencies are bundled, so no Node.js/NPM and PostCSS is needed.

### As a Hugo Module

Requires the Go binary installed.

```sh
hugo mod init github.com/<your_user>/<your_project>
```

Then add the theme to your `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/nicokaiser/hugo-theme-gallery/v4"
```

### As Git Submodule

```sh
git submodule add --depth=1 https://github.com/nicokaiser/hugo-theme-gallery.git themes/gallery
```

## Usage

Page bundles which contain at least one image are listed as album or gallery:

```plain
content/
├── _index.md
├── about.md             <-- not listed in album list
├── animals/
│   ├── _index.md
│   ├── cats/
│   |   ├── index.md
│   |   ├── cat1.jpg
│   |   └── feature.jpg  <-- album cover
│   ├── dogs/
│   |   ├── index.md
│   |   ├── dog1.jpg     <-- album cover
│   |   └── dog2.jpg
│   └── feature.jpg
├── bridge.jpg           <-- site thumbnail (OpenGraph, etc.)
└── nature/
    ├── index.md         <-- contains `cover: true` for `tree.jpg`
    ├── nature1.jpg
    ├── nature2.jpg
    └── tree.jpg         <-- album thumbnail
```

- `/about.md` is not a Page Bundle and does not have image resources. It is not displayed in the album list.
- `/nature` is a Leaf Bundle (has `index.md` and no children) => displayed as gallery (`single` layout).
- `/animals` is a Branch Bundle (has `_index.md` and has children) => displayed as album list (`list` layout).
- The image resource with `*feature*` in its name or the first image found is used as thumbnail image for album lists.
- Albums without an image are not shown.

### Front matter

- `title` -- title of the album, shown in the album list and on the album page.
- `date` -- album date, used for sorting (newest first).
- `description` -- description shown on the album page. Rendered as markdown to enable adding links and some formatting.
- `weight` -- can be used to adjust sort order.
- `params.featured_image` -- name of the image file used for the album thumbnail. If not set, the first image which contains `feature` in its filename is used, otherwise the first image in the album. (Deprecated, use `resources.params.cover`)
- `params.private` -- if set to `true`, this album is not shown in the album overview and is excluded from RSS feeds.
- `params.featured` -- if set to `true`, this album is featured on the homepage (even if private).
- `params.sort_by` -- property used for sorting images in an album. Default is `Name` (filename), but can also be `Date`.
- `params.sort_order` -- sort order. Default is `asc`.
- `params.theme` -- color theme for this page. Defaults to `defaultTheme` from configuration.

### Album Cover

By default, the cover image of an album is the first image in its folder. To select a specific image (which must be part of the album), use the `cover` resource parameter in the front matter:

```plain
---
title: Nature
resources:
  - src: tree.jpg
    params:
      cover: true
---
```

You can hide images from the gallery and use them only as cover image:

```plain
---
title: Nature
resources:
  - src: nature-cover.jpg
    params:
      cover: true
      hidden: true
---
```

### Image Metadata

Image titles for the lightbox view are either taken from the `ImageDescription` EXIF tag, or the `title` in the resource metadata.

EXIF tags can be written using software like Adobe Lightroom or by using command line tools like exiftool:

```sh
exiftool -ImageDescription="A closeup of a gray cat's face" cat-4.jpg
```

Alternatively, the image title can be set in the front matter:

```plain
---
date: 2024-02-18T14:12:44+0100
title: Cats
resources:
  - src: cat-1.jpg
    title: Brown tabby cat on white stairs
    params:
      date: 2024-02-18T13:04:30+0100
  - src: cat-4.jpg
    title: A closeup of a gray cat's face
---
```

This also enables custom ordering:

```plain
---
sort_by: Params.weight
resources:
  - src: image-1.jpg
    params:
      weight: 20
  - src: image-2.jpg
    params:
      weight: 10
---
```

### Categories

If you use categories in your albums, the homepage displays a list of categories.
Make sure `term` is not included in `disabledKinds` in the site config.

content/dogs/index.md:

```plain
---
date: 2023-01-12
title: Dogs
categories: ["animals", "nature"]
resources:
  - src: dogs-title-image.jpg
    params:
      cover: true
---
```

Categories can also have custom titles and descriptions (by default, the "animals" category will have "Animals" as title and no description). Just create a `content/categories/<category>/_index.md`:

content/categories/animals/\_index.md:

```plain
---
title: Cute Animals
description: This is the description text of the "animals" category.
---
```

#### List of Categories

To enable a list of categories, each category must at least have an image in the `content/categores/<category>/` folder. Also, `taxonomy` must _not_ be included in the `disableKinds` in the site config.

Then, `/categories` displays a list of categories, with their cover image.

#### Other Taxonomies

You can also use other taxonomies like `series`. Note that only `categories` and `tags` are enabled by Hugo's default settings. Using `series` as additional taxonomy is left as an exercise for the reader.

### Featured Content on the Homepage

Albums (and also taxonomy pages like categories) can be marked as "featured":

```plain
---
title: Featured Album
params:
  featured: true
---
```

When used in combination with `private: true` this album is only shown as featured album on the homepage, and not in any album list.

Note that also categories or any other taxonomy term can be marked as featured, so you can feature a whole category, series, etc.

By default, the homepage displays

- the site title,
- links to all categories (if categories are enabled and used)
- the most recent featured content (even if private)
- all non-private top-level albums

This can easily be adjusted by using a local version of `layouts/_default/home.html`.

### Related Content

If related content is available for your site (e.g. when keywords or tags are used), related albums are shown below each gallery. Read more about this in the [Hugo Docs](https://gohugo.io/content-management/related/#configure-related-content).

Here is an example section in `config/_default/hugo.toml` to enable related content:

```toml
[related]
  includeNewer = true
  threshold = 10
  toLower = false
  [[related.indices]]
    applyFilter = false
    cardinalityThreshold = 0
    name = 'categories'
    pattern = ''
    toLower = false
    type = 'basic'
    weight = 10
  [[related.indices]]
    applyFilter = false
    cardinalityThreshold = 0
    name = 'keywords'
    pattern = ''
    toLower = false
    type = 'basic'
    weight = 50
```

### Social Icons

Use the `socialIcons` configuration key to add social icons on the bottom of each page:

```toml
[params]
  ...
  [params.socialIcons]
    facebook = "https://www.facebook.com/"
    instagram = "https://www.instagram.com/"
    github = "https://github.com/nicokaiser/hugo-theme-gallery/"
    youtube = "https://www.youtube.com/"
    email = "mailto:user@example.com"
    linkedin = "https://linkedin.com/"
```

### Exclude original photos

To exclude the original photos from the published site, and to disable the "Download" button, you can use the `build.publishResources` configuration option. Either add it to a specific album, or use `cascade` to omit the originals from all sub-albums. With `publishResources: false` only the resized images (without any metadata) are included in the published site, which can save quite some disk space.

```toml
cascade:
  build:
    publishResources: false
```

### Custom CSS

CSS is generated with Hugo Pipes, so you can add additional CSS in `assets/css/custom.css` (see example in `exampleSite`).

### Custom JavaScript

You can add additional JavaScript in `assets/js/custom.js`.

## Author

- [Nico Kaiser](https://kaiser.me/)
