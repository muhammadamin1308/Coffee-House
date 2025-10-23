# Legacy Coffee House Project - Context

## Overview
This `old` folder contains the original implementation of the Coffee House website before the TypeScript/modern build system refactoring. It serves as a reference for understanding the project's evolution and legacy patterns.

## Project Structure

### HTML Files
- **`index.html`** - Main landing page with navigation and product showcase
- **`coffee.html`** - Detailed coffee products page with filtering and categories

### Data
- **`products.json`** - Static product catalog containing coffee, tea, and dessert items with:
  - Product names, descriptions, prices
  - Category assignments (coffee, tea, dessert)
  - Asset references and URLs

### JavaScript (`script/`)
- **`main.js`** - Core application logic including:
  - Navigation/routing between pages
  - DOM manipulation and event handlers
  - Dynamic product loading from `products.json`
  
- **`coffee.js`** - Coffee-specific functionality:
  - Product filtering by category
  - Display updates and list management
  - Interactive features unique to coffee page

### Styles (`styles/`)
- **`main.css`** - Global styling (layout, colors, typography, spacing)
- **`coffee.css`** - Coffee page specific styles (product cards, filtering UI)
- **`fonts.css`** - Custom font definitions and icon fonts

### Assets (`assets/`)
```
assets/
├── coffee/
│   ├── dessert/     # Dessert product images
│   └── tea/         # Tea product images
└── main/            # General/hero images
```

## Key Legacy Patterns

### 1. Static Data Model
- Products stored in `products.json` as a flat array
- Categories handled as string properties
- No database or dynamic API calls

### 2. Simple Routing
- Page switching via hash-based navigation or direct HTML linking
- No routing library - manual DOM swaps in `main.js`

### 3. DOM-Based Rendering
- Products dynamically inserted into DOM using string templates
- Event delegation on product lists
- Direct DOM queries and manipulation

### 4. CSS Architecture
- Separate stylesheets per major feature/page
- Global `main.css` contains foundational styles
- BEM-like class naming in some areas

## Migration to Modern Stack

The `coffee-house/` folder represents the modernized version with:
- **TypeScript** for type safety
- **Module-based architecture** (`models/`, `pages/`, `services/`, `navigation/`)
- **Service layer** for product data (`productService.ts`)
- **Router system** for navigation (`navigation/router.ts`)
- **Build tooling** (via `package.json` and `tsconfig.json`)

### Key Changes
| Legacy | Modern |
|--------|--------|
| `products.json` static data | `productService.ts` service layer |
| `main.js` routing | `navigation/router.ts` router |
| Direct DOM manipulation | Page modules (`pages/*.ts`) |
| Global CSS files | Scoped styles with modern bundling |
| Flat file structure | Organized module structure |

## Files to Reference When Understanding
- **`products.json`** - The core data model used by both systems
- **`script/main.js`** - Original navigation and app initialization logic
- **`script/coffee.js`** - Original filtering and display patterns
- **`styles/main.css`** - Design system (colors, typography, spacing)

## Development Notes

### Asset Paths
- Old: `assets/coffee/` relative paths in HTML/JS
- New: Migrated to `public/assets/` structure with build-time optimization

### Responsive Design
- Old implementation uses media queries in CSS files
- New branch (`responsive`) is enhancing mobile/responsive experiences

### Current Status
- Legacy code no longer in active use
- Serves as documentation of original requirements and designs
- Asset structure and `products.json` remain relevant reference points
