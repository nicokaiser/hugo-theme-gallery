# Mantas Zdancius Photography Portfolio

A personal photography portfolio website showcasing my work in fashion & beauty, nature, and creative photography.

**Live Site:** [View Portfolio](https://mantexas.github.io/space/)

## About

I make hard things look easy. Technical depth meets human understanding.

This portfolio features curated collections of my photography work, built with Hugo and the Gallery theme for a fast, responsive, and visually stunning experience.

## Collections

- **Fashion & Beauty** - Elegant portraits and editorial photography celebrating style and self-expression
- **Nature** - Capturing the raw beauty of the natural world
- **Portfolio** - A curated selection of my finest work

## Adding New Galleries

To add a new gallery, simply:

1. Create a new folder in `exampleSite/content/` with your gallery name (e.g., `my-new-gallery/`)
2. Add an `index.md` file with front matter:
   ```yaml
   ---
   title: My New Gallery
   description: Description of this gallery
   weight: 4
   params:
     theme: dark
   resources:
     - src: cover-image.jpeg
       params:
         cover: true
   ---
   ```
3. Add your images (JPEG format recommended) to the folder
4. Commit and push - the site will automatically rebuild

## Technical Details

- **Framework:** [Hugo](https://gohugo.io/) (Static Site Generator)
- **Theme:** [Hugo Gallery Theme](https://github.com/nicokaiser/hugo-theme-gallery)
- **Features:**
  - Responsive justified gallery layout
  - PhotoSwipe lightbox for immersive viewing
  - Dark/light theme support per gallery
  - Automatic image optimization
  - SEO optimized with Open Graph tags

## Development

```bash
# Navigate to the example site
cd exampleSite

# Run development server
hugo server

# Build for production
hugo --gc --minify
```

## Contact

- **Email:** [mantas.zdancius@me.com](mailto:mantas.zdancius@me.com)
- **Instagram:** [@mantas.tv](https://www.instagram.com/mantas.tv)
- **GitHub:** [Mantexas](https://github.com/Mantexas)
- **LinkedIn:** [finetune](https://www.linkedin.com/in/finetune)

## License

This portfolio website and its content are personal work by Mantas Zdancius.
The underlying Hugo Gallery Theme is MIT licensed.
