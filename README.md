<div align="center">

<h3 align="center">Full Stack Dev Links</h3>

</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

Build with nextjs, devlinks lets users sign in through google or github and create link trees

## <a name="tech-stack">⚙️ Tech Stack</a>

- Nextjs
- Express
- Nodejs
- Clerk
- Mongodb

## <a name="features">🔋 Features</a>

👉 **Onboarding Flow**: Seamless user registration and setup process.

👉 **Create Link Trees**: Create link trees for your profile and share them with the world

👉 **Dashboard**: Delete or Visit your link trees in the dashboard


## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/sahil-singh1107/devlinks.git
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

</br>
For frontend:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CREATE_LINK_URL=
NEXT_PUBLIC_GET_LINKS=
NEXT_PUBLIC_DELETE_LINK=
NEXT_PUBLIC_GET_LINK_TREE=
NEXT_PUBLIC_CREATE_LINK_TREE=
NEXT_PUBLIC_GET_ALL_LINK_TREE=
NEXT_PUBLIC_DELETE_LINK_TREE=
```

For baackend:
```env
DATABASE_URL=
```

**Running the Project**

frontend:

```bash
npm run dev
```

backend:

```bash
node index.js
```
