<div align="center">

# 🛒 বাজার দর | BazarDor

**প্রয়োজনীয় পণ্যের দাম এক নজরে**
_Daily market prices of essential goods across Bangladesh, at a glance._

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-05893E?style=for-the-badge)

🔗 **[Live Demo → bazar-dor-eqq6.vercel.app](https://bazar-dor-eqq6.vercel.app/)**

[Live Demo](https://bazar-dor-eqq6.vercel.app/) · [Report a Bug](../../issues) · [Request a Feature](../../issues)

</div>

---

## 📖 About the Project

**BazarDor (বাজার দর)** is a fully Bangla price-tracking web app for everyday essentials such as rice, lentils, oil, vegetables, fish, meat, eggs, milk and spices.

Prices change often, and they are different in every market. BazarDor puts today's price, the change since yesterday, and a market-by-market comparison in one clean place, so shoppers can see at a glance where prices are rising, where they are falling, and which market is cheapest.

🌐 **Live site:** [https://bazar-dor-eqq6.vercel.app/](https://bazar-dor-eqq6.vercel.app/)

## ✨ Key Features

1. **📈 Live Price Ticker**: a scrolling bar at the top shows every product's price per unit with a ▲ / ▼ change percentage, using Bangla digits and units.
2. **🗂️ Browse, Filter & Sort**: products grouped into categories (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা), with price sorting (low to high, high to low) and "price up / price down today" sections.
3. **🔍 Market-wise Price Details**: each product page shows lowest, highest and average price, plus a table comparing every market and division, with breadcrumb navigation.
4. **🔐 Secure Authentication**: sign up and sign in with email and password, or continue with **Google** and **GitHub**, with automatic account linking for the same email.
5. **👤 User Profile**: a protected profile page where signed-in users can see their account details and update their name.

### 🎁 And More

- 📱 Fully responsive design with a mobile slide-in menu
- ⚡ Skeleton loading states and a global loading screen
- 🚫 Friendly Bangla 404 page for unknown routes, categories and products
- 🔔 Toast notifications for success and error messages
- 🇧🇩 Bangla numerals (`১২৩`), units (`কেজি`, `লিটার`, `ডজন`) and date format
- 🎨 Consistent green-and-white design system

## 🛠️ Technologies Used

| Area           | Technology                                                                   |
| -------------- | ---------------------------------------------------------------------------- |
| Framework      | [Next.js 16](https://nextjs.org/) (App Router, Turbopack)                    |
| Language       | [TypeScript](https://www.typescriptlang.org/)                                |
| Styling        | [Tailwind CSS](https://tailwindcss.com/)                                     |
| UI Components  | [HeroUI](https://www.heroui.com/) (forms)                                    |
| Icons          | [Gravity UI Icons](https://github.com/gravity-ui/icons)                      |
| Authentication | [Better Auth](https://www.better-auth.com/) (email/password, Google, GitHub) |
| Database       | [MongoDB](https://www.mongodb.com/)                                          |
| Notifications  | [react-hot-toast](https://react-hot-toast.com/)                              |
| Ticker         | [react-marquee-text](https://www.npmjs.com/package/react-marquee-text)       |
| Data           | REST API (`/api/bazardor/products`, `/api/bazardor/categories`)              |

## 🗺️ Pages & Routes

| Route              | Description                                           |
| ------------------ | ----------------------------------------------------- |
| `/`                | Home with hero, price ticker and all products         |
| `/category/[slug]` | Products of a single category (e.g. `/category/chal`) |
| `/products/[slug]` | Product details with market-wise prices               |
| `/sign-in`         | Sign in with email or social login                    |
| `/sign-up`         | Create a new account                                  |
| `/profile`         | Account details and name update                       |

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or newer
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- (Optional) Google and GitHub OAuth apps for social login

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/bazar-dor.git
cd bazar-dor

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env` file in the project root:

```env
# Database
MONGODB_URL=your_mongodb_connection_string

# Better Auth
BETTER_AUTH_SECRET=a_long_random_string
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### OAuth Redirect URLs

Add these callback URLs in your provider settings (use your live domain in production):

| Provider | Callback URL                                     |
| -------- | ------------------------------------------------ |
| Google   | `http://localhost:3000/api/auth/callback/google` |
| GitHub   | `http://localhost:3000/api/auth/callback/github` |

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home
│   ├── layout.tsx            # Root layout (header, ticker, footer)
│   ├── loading.tsx           # Global loading screen
│   ├── not-found.tsx         # 404 page
│   ├── category/[slug]/      # Category pages
│   ├── products/[slug]/      # Product details
│   ├── sign-in/              # Sign in
│   ├── sign-up/              # Sign up
│   ├── profile/              # User profile
│   └── api/auth/[...all]/    # Better Auth handler
├── components/
│   ├── Homepage/             # Hero and home sections
│   ├── Products/             # Cards, grid, skeletons
│   ├── Header, Navlinks, MobileMenu, UserInfo
│   ├── Marquee, Footer
└── lib/
    ├── auth.ts               # Better Auth server config
    ├── auth-client.ts        # Better Auth client
    └── product.ts            # Types and Bangla formatting helpers
```

## 🗺️ Roadmap

- [ ] Highlight the active category in the navigation
- [ ] Search products by name
- [ ] Price history charts for each product
- [ ] Favorite products and price-drop alerts
- [ ] English / বাংলা language switch
- [ ] Custom auth error page

## 🤝 Contributing

Contributions, issues and feature requests are welcome.

1. Fork the project
2. Create your branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 👨‍💻 Author

**Ahsan**: web designer & frontend developer
🌐 [devahsan.com](https://devahsan.com)

---

<div align="center">

Made with 💚 in Bangladesh

⭐ If you like this project, give it a star!

</div>
