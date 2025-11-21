# MálagaDogParks

📘 README available in [Spanish](./README.es.md)

Welcome to **MálagaDogParks**! This project is a web platform developed with Next.js and Tailwind CSS that compiles and displays dog parks in the city of Málaga (Spain), where you can walk and enjoy your pet's company.

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://malaga-dog-parks.vercel.app/) [![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/) [![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/) [![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=react)](https://ui.shadcn.com/) [![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright)](https://playwright.dev/) [![Open Data](https://img.shields.io/badge/Data-Open_Government-2B8CC4?style=for-the-badge)](https://datosabiertos.malaga.eu/)

---

## 🚀 Key Features

- 🐕 **Interactive map** of dog parks in Málaga

_(Location, photos and characteristics of each park)_

- 📊 **Updated data** from Málaga City Council's open data portal

- 📲 **Responsive design**

_(Works on mobile, tablet and desktop)_

- 🌎 **Multilingual mode**

_(Spanish/English/German/French, with integrated i18n)_

- 🌓 **Light/Dark Mode**

The website includes a light and dark theme selector

- ✅ **Automated testing**

End-to-end tests with Playwright to ensure quality

- **♿ Accessible**: Web accessibility labels

## 🛠️ Technologies Used

- **Frontend:** [Next.js](https://nextjs.org/) 15 with App Router

- **Styling:** [Tailwind CSS](https://tailwindcss.com/) 4

- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)

- **Maps:** [Folium](https://python-visualization.github.io/folium/) (Python + Leaflet.js)

- **Internationalization:** next-intl

- **Testing:** [Playwright](https://playwright.dev/) for E2E tests

- **Deployment:** [Vercel](https://vercel.com/)

- **Data Source:** Málaga City Council Open Data Portal

## 🗺️ Map Visualization with Folium

For map generation in this project, I used the **[Folium](https://python-visualization.github.io/folium/)** library, a Python tool based on **Leaflet.js** that allows creating dynamic geographic visualizations.

## 🚀 Demo

Visit the website [malagadogparks.vercel.app](https://malaga-dog-parks.vercel.app/) to see the project live.

## 🎬 Video Demo

<a href="https://youtu.be/J16aTuQrtns" target="\_blank" rel="noopener noreferrer" aria-label="Ver demostración de la aplicación Málaga Dog Parks en YouTube (se abre en nueva pestaña)">Watch Demo Video on YouTube</a>

## 📱 Screenshots

<details>  <summary>View screenshots</summary>

### 💻 Desktop

<img  src="./public/images/desktop-view.png"  alt="Desktop View"  width="500"  />

### 📱 Tablet

<img  src="./public/images/tablet-view.png"  alt="Tablet View"  width="350"  />

### 📱 Mobile

<img  src="./public/images/mobile-view.png"  alt="Mobile View"  width="250"  /> </details>

## 📦 Installation and Usage

### Prerequisites

- Node.js 18+

- npm or yarn

### Installation

1.  **Clone the repository:**

```bash

git clone https://github.com/nuriadevs/malaga-dog-parks.git

cd malaga-dog-parks

```

2.  **Install dependencies:**

```bash

npm install

# or

yarn install

```

3.  **Start the development server:**

```bash

npm run dev

# or

yarn dev

```

4.  **Open your browser:** Visit [http://localhost:3000](http://localhost:3000/)

## 🧪 Testing

This project uses **Playwright** to perform automated end-to-end tests that ensure the proper functioning of some functionalities.

### Running tests

```bash

# Install Playwright browsers (only the first time)

npx  playwright  install



# Run all tests

npx  playwright  test  e2e



```

## 📁 Project Structure

```plaintext

📁 malaga-dogs-parks/

├── 📁 e2e/ # E2E Testing with Playwright

│ ├── 📁 config/ # Test configuration

│ ├── 📁 tests/ # Interactive map tests

│ └── playwright.config.ts

├── 📁 public/ # Static assets

│ ├── 📁 images/ # Project images

│ ├── 📁 maps/ # HTML maps generated with Folium

├── 📁 src/ # Main source code

│ ├── 📁 app/ # Next.js 15 App Router

│ │ └── 📁 [locale]/ # Dynamic routes by language

│ ├── 📁 components/ # Reusable components

│ │ ├── 📁 layouts/ # Header, Footer, Navigation

│ │ ├── 📁 maps/ # Map components

│ │ ├── 📁 providers/ # Context providers

│ │ ├── 📁 sections/ # Page sections

│ │ └── 📁 ui/ # UI components

│ ├── 📁 data/ # Static data

│ ├── 📁 hooks/ # Custom React hooks

│ ├── 📁 i18n/ # Internationalization configuration

│ ├── 📁 lib/ # Utilities and configurations

│ ├── 📁 messages/ # Translation files (es, en, de, fr)

│ ├── 📁 styles/ # Global styles

│ ├── 📁 types/ # Types

│ ├── 📁 utils/ # Helper functions

└── └── middleware.ts



```

## ♿ Accessibility

This project has been developed with special attention to accessibility, following **WCAG 2.1** guidelines and best practices to ensure that anyone can navigate and use the website comfortably.

If you find any accessibility issues or have suggestions for improvement, please [open an issue](https://github.com/nuriadevs/malaga-dog-parks/issues).

## 📊 Data Source

The data used in this project has been collected from the **Málaga City Council Open Data Portal**, under their open data policy and public information reuse.

### 🔗 Official dataset link

👉 [Dog Parks - Málaga City Council](https://datosabiertos.malaga.eu/dataset/parques-caninos)

## 🤝 Contributing

Contributions are welcome! If you want to contribute to the project:

1.  **Fork** the project

2.  Create a branch for your new feature (`git checkout -b feature/new-feature`)

3.  Make your changes and commit (`git commit -m 'Add new feature'`)

4.  Push to your branch (`git push origin feature/new-feature`)

5.  Open a **Pull Request** for review

## 📬 Contact

If you have questions, suggestions, or just want to chat about the project, send me a message.

[![Email](https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white)](mailto:nuriadevs@gmail.com)

## 💝 About the Project

**Made with ❤️ for our pets**

[![Adopt](https://img.shields.io/badge/%F0%9F%90%B6-Adopt_don't_shop-FF5722?style=flat-square)](https://www.protectoramalaga.com/)

---

### ⭐ Do you like the project?

Give it a star on GitHub and share it with other dog owners!

[![GitHub Stars](https://img.shields.io/github/stars/nuriadevs/malaga-dog-parks?style=social)](https://github.com/nuriadevs/malaga-dog-parks) [![GitHub Forks](https://img.shields.io/github/forks/nuriadevs/malaga-dog-parks?style=social)](https://github.com/nuriadevs/malaga-dog-parks)
