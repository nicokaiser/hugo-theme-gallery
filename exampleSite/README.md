# Mantas Zdancius Photography Portfolio

The source files for my photography portfolio website.

## Development

```bash
# Install Hugo module dependencies
hugo mod get

# Run local development server
hugo server

# Build for production
hugo --gc --minify
```

## Adding New Galleries

1. Create a folder in `content/` with your gallery name
2. Add an `index.md` file with title and description
3. Add your images to the folder
4. The first image or one named with "feature" becomes the cover

See the main README for detailed instructions.
