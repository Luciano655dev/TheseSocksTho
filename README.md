<div align="center">
  <img src="./public/thesesockstho_logo.png" height="120" />

# TheseSocksTho 🧦

**Statement socks. Everyday comfort.**  
A fun, minimal e-commerce for selling socks built with React + TypeScript.

</div>

---

## ✨ About the Project

TheseSocksTho is a small e-commerce front-end for selling unique, good-looking socks.  
The goal is simple:

- ✅ Clean, modern shopping experience
- ✅ Fully responsive (mobile + desktop)
- ✅ Add-to-cart system
- ✅ Product data is loaded remotely (JSON hosted on GitHub Pages)
- ✅ No CMS required — just update `products.json` and images

This project is perfect for learning how a real store works: cart logic, dynamic products, modals, responsive UI, and clean component structure.

---

## 🚀 Tech Stack

| Feature      | What we use                              |
| ------------ | ---------------------------------------- |
| Framework    | **React + TypeScript**                   |
| Routing      | React Router / (or your routing system)  |
| Styling      | Plain CSS (custom responsive system)     |
| Cart System  | React Context + Reducer                  |
| Product Data | `products.json` loaded from GitHub Pages |
| Images       | Hosted publicly on GitHub Pages          |

You can deploy it to **Vercel, Netlify, Render, GitHub Pages, Cloudflare Pages**, or any static host.

---

## 📦 Features

- 🧦 Product listing
- ✅ Modal to view product details
- ✅ Add to cart / remove from cart
- ✅ Quantity limit per product (`max_qnt`)
- ✅ Persistent cart via context state
- 📂 Products controlled remotely via JSON — update without redeploy
- 📱 Fully responsive layout
- ⚡ Fast & lightweight (no heavy libraries)

---

## 🛒 How Product Data Works

Products do NOT live in the codebase — they’re fetched from a remote JSON:

```ts
const PRODUCTS_URL = "https://<username>.github.io/thesesockstho/products.json"
```

To update products, just edit:

`products.json` in your GitHub repo:

```json
[
  {
    "id": "sock-1",
    "title": "TheseSocksTho #1",
    "price": 9.99,
    "image": "https://Luciano655dev.github.io/thesesockstho_data/images/sock1.png",
    "max_qnt": 3,
    "description": "Soft cotton. Stay-up cuff. Breathable knit.",
    "active": true
  }
]
```

✅ No redeploy needed — changes appear instantly.

---

## 🔧 Development

```bash
# install dependencies
npm install

# run locally
npm run dev

# build for production
npm run build
```

Visit `http://localhost:5173` (or the port shown in the terminal).

---

## 🌎 Deployment

You can deploy the built site anywhere static:

- **Vercel**
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**
- **Firebase Hosting**

Example (Vercel):

```bash
npm run build
vercel deploy --prod
```

---

## ✅ Roadmap / Future Ideas

- ✅ Dark mode
- ✅ Newsletter signup
- ✅ Currency switcher
- 🟨 Full checkout + payments (Stripe)
- 🟨 Admin panel for managing products
- ✅ More sock drops 👀

---

## 💬 Contributing

Want to help or improve the design?  
Feel free to fork, open issues, or submit PRs!

---

## 📄 License

This project is licensed under the MIT License.  
You can use it, learn from it, or modify it for your own store.

---

<div align="center">

Made with ❤️ and comfy socks  
**TheseSocksTho**

</div>
# TheseSocksTho
