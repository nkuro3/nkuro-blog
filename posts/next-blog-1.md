---
title: 'Nextjsブログ１'
date: '2024-03-23'
cover: 'next-blog-1/nextjs.png'
---

## 目的

Nextjs14を使って最小限のブログ開発を行なう。

## 手順

### プロジェクト作成

テンプレートは使わず、基本のプロジェクトから作成する。
（ブログのテンプレートもあるが、作りながら理解していきたいので、プレーンなプロジェクトから進めますが、一部、ブログのテンプレートを流用する部分もあります。）

```bash
pnpm dlx create-next-app
```

質問は全てデフォルトでEnter

### Linter & Fomatter

eslintとprettierを併用する。
競合が起きないような設定と、lintをimportに適用する設定を行う。
vscodeの設定で、onSaveを有効にする。

```bash
pnpm add -D eslint-config-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import prettier
```

.eslintrc

```json
{
  "root": true,
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": ["./tsconfig.json"]
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "import/order": [
      "error",
      {
        "alphabetize": {
          "order": "asc"
        }
      }
    ]
  }
}
```

.prettierrc

```json
{
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

.vscode/settings.json

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ]
}
```

### デザイン

Nextのブログテンプレートを参考に作成しました。

Top画面
![alt text](/next-blog-1/top-view.png)

Post画面
![alt text](/next-blog-1/post-view.png)

hタグはよく使うので、共通の設定をglobals.cssに追加

```css
h1 {
  @apply text-4xl font-bold;
}
h2 {
  @apply text-3xl;
}
h3 {
  @apply text-2xl;
}
```

[repository](https://github.com/nkuro3/nkuro-blog/tree/next-blog-1)

### Markdown to HTML

いくつかモジュールがありそうだったのですが、一番シンプルに書けそうだったので、`react-markdown`を採用しました。
スタイルを適用するために、`@tailwindcss/typography`もインストールします。

```bash
pnpm add react-markdown
pnpm add -D @tailwindcss/typography
```

`tailwind.config.ts`のpluginを設定

```ts
const config: Config = {
  ...
  theme: {},
  plugins: [require('@tailwindcss/typography')],
};
```

ReactMarkdownを囲む要素のクラスにproseを適用することでスタイルを適用できる。
[tailwindcss-typography](https://github.com/tailwindlabs/tailwindcss-typography)

```ts
export function PostBody({ content }: Props) {
  return (
    <div className="prose">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
```

![alt text](/next-blog-1/typography-default.png)
typographyはデフォルトでmax-widthが効いているため、この状態では、本文が左によったレイアウトになってしまう。
サイドメニューなど、コンテンツが増えてきたら再度調整することにして、いったん設定でmax-widthを無効にする。

```ts
const config: Config = {
  ...
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
```

![alt text](/next-blog-1/typography-max-widht-none.png)

### カスタムエラーページ

app router では、appフォルダ配下に指定のファイル名で404や500ページを作成できる。
[Next.jsでオリジナルエラーページを作ってみよう](https://zenn.dev/megane_s/articles/8ecc608f9544d4)

404 not-found.tsx

```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <h2 className="mb-20">404 | Not Found</h2>
      <Link href="/" className="hover:underline">
        Return Home
      </Link>
    </>
  );
}
```

500 error.tsx

```tsx
'use client';
export default function ErrorPage() {
  return <h2>500 | Bad Request</h2>;
}
```

## まとめ

Nextjsでシンプルなブログ作成を行いました。
もう少し見やすいようにスタイルは今後調整していくつもりです。

## 参照

[Next.jsを利用した初めての本格的Markdownブログサイトの構築](https://reffect.co.jp/react/nextjs-markdown-blog)

[postCSSとは？autoprefixerなど便利なプラグイン一覧](https://qiita.com/shizen-shin/items/47c7c1a305ce3d152737)

[【Typescript × Next.js × VSCode】ESLintとPrettierの設定](https://amateur-engineer-blog.com/typescript-nextjs-vscode-eslint-and-prettier)

[Next.jsでブログを作ってみました](https://zenn.dev/redpanda/articles/ab0832ce800bf3)
