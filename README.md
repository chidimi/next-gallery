## サンプルURL
https://next-gallery.vercel.app/

## イントロダクション
Next.js + firebaseで作ったファイルアップローダーです

https://zenn.dev/dala/books/nextjs-firebase-service
こちらの記事を読んで大変に面白かったので作りました。


## 機能
- アップロード機能
- storageからファイルを読み込む機能

## やれてないこと
- アップロード者のファイルのみを表示させる機能
- アップロード者のファイルを削除する機能
- アップロード完了時、再レンダリングをしてその時アップロードしたファイルをすぐに表示させる
- 画像が表示されるまでのレスポンスが悪いため、改善する
- 画像と画像の隙間を埋める
- validation機能
- テストを書く

## 学んだこと
- React Hooksの基本的使い方 useEffect, useState
- Next.jsの基本的使い方。SSRとSPA
- Node.jsにはXMLHttpRequestがないので、サーバーからfirebase storage apiを使えません！ なので、クライアントから使わないといけないようです　あんまりSSRしてる意味がないとはいえ、意識しないとエラーになってしまいます。

## 反省点
- アップロード処理を[この記事](https://qiita.com/tetsurotayama/items/5129f0cfb21f9ec9b9a0)からコピペしました。悲しい…
- TypeScriptなのに型を全然書いていない。

## 次にやりたいこと
書籍管理システムをNext.js + express.js(rest api server)あるいは、Next.js + Hasuraで作ってみようと思います

## 読んだ方に伝えたいこと
はじめて作って、インターネット上に公開したプログラムです。
Next.js、Reactを全く知らなかったのでかなり大変でしたが、より改善を加えていきたいです。

## 以下、デフォルトREADME
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
