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

## Author

- [Nico Kaiser](https://kaiser.me/)
