<h1 align="center">hope的个人博客主页</h1>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-orange"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen"/>
  <img src="https://img.shields.io/badge/Powered%20by-React-blue"/>
</p>

![home page picture](/public/images/home.png)

## ⚙️ 技术栈

- 框架：**React + Next.js**
- 样式：**Tailwind CSS** + **Shadcn UI**
- 动画：**Framer Motion**
- 会话缓存：**Upstash Redis**
- 内容管理系统：**Sanity**
- 认证：**Clerk**
- 部署：**Vercel**

## 💡快速开始

### 环境要求

- [Node.js 18.18](https://nodejs.org/) 或更高版本。

### 克隆仓库

```bash
git clone https://github.com/HOPE989/website.git
cd website
```

### 安装依赖:

```bash
pnpm install
```

### 配置 .env 文件

在项目根目录下创建一个 .env 文件，内容如下：

```
# sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=""
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_USE_CDN="false"

# clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# upstash
UPSTASH_REDIS_REST_TOKEN=""
UPSTASH_REDIS_REST_URL=""

```

现在我们需要设置所有的环境变量。

#### Clerk

1. 前往 [Clerk官网](https://clerk.com/) 并创建一个应用程序。选择 Google 和 GitHub 作为登录选项：

2. 复制环境变量并粘贴到 .env 文件中：

#### Sanity

1. 前往 [Sanity官网](https://www.sanity.io/manage) 获取project id，并将其赋值给 .env 文件中的 NEXT_PUBLIC_SANITY_ID。

2. 打开 [localhost:3000/studio](http://localhost:3333/studio)，现在可以向网站添加项目了。

### 启动服务器

🎉 恭喜！现在我们可以启动网站了：

```bash
pnpm dev
```

在浏览器中访问 [localhost:3000](http://localhost:3000)，查看网站效果。

### 部署

1. 将项目放上自己的 [Github](https://github.com/)

2. 打开[Vercel](https://vercel.com/) ，使用github登录

3. 从github import该项目

4. 将.env的环境变量填入设置，随后vercel将自动部署

## 致谢

- 网站参考了[cali.so](https://cali.so/)的设计。

