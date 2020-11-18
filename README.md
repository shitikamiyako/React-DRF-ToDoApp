このアプリは未経験から就職を目指すプログラミングシリーズで制作したものです。

[モーメント](https://twitter.com/i/events/1318585962969001984?s=20)

## はじめに

今回のアプリを作るにあたっての根底には2020年5月~6月末まで参加させていただいたDjangoチーム開発プロジェクトで得られた体験や知見が元になっております。
主催者である@digisaku710さんを始めプロジェクトメンバーの方々のお力あってのことです、本当にありがとうございます。

また、デプロイに際して窮地に陥っていて突然のお願いにも関わらずデプロイの構成を手直ししてくださったGtca様、またReduxについてご教授頂いた世界の歪み様にも重ねて御礼申し上げます。
その他アドバイスやリリース前に試しに触ってチェックしてくれたフォロワーの方々にもここでお礼を申し上げさせていただきます、助かりました。
以下名前を挙げさせていただいた、お三方のリンクです。
Gtca様のみTwitterではなく、Qiitaの記事のページにリンクを貼らせていただきます。


[@digisaku710](https://twitter.com/digisaku710)

[世界の歪み](https://twitter.com/distortionOfWld)

[Gtca](https://qiita.com/Gattaca)

## 作ったもの

あえて他人に公開・共有するというのがコンセプトのTodoアプリです。
名前は某フェザー級日本タイトルマッチにおけるテーマから頂いています。

## 要件定義書

これは今回のアプリを制作するにあたって一番最初に定義したものです。
したがって、公開しているものとは仕様が大きく異る部分がありますがご容赦ください。
理由については以後の設計書や後日書くレポートをご覧になっていただければと思います。

[要件定義書](https://docs.google.com/document/d/1KHgScYkDLgrL0v9U4FVL64-dc1ENkfnAY4X3ePOs8uI/edit?usp=sharing)

## 設計書

こちらはデプロイにあたってまとめ直してあります。
理由としては今回こうやって作成するのは初めてのことなので設計するにも厳密に決められず作業前にアバウトに決めていたからなのと、後学のためにきちんと整理したものを残しておくためです。

[機能設計書](https://docs.google.com/spreadsheets/d/1pkq3sWrBMQsDcQ6-BYbY-_uP35ZLJwZ-Iu6rEaEWxeo/edit?usp=sharing)

## チャート図、ER図

リポジトリにあるのは当初書いたものでこちらはデプロイ後にまとめ直したものです。

[チャート図・ER図](https://drive.google.com/file/d/1jHqALye65Eg7xKQi2IVYy_vGAor-pcLV/view?usp=sharing)

## 使い方

以下の項目から流れを動画にしてあります、そちらをご覧ください。

### Topページの機能

[Topページの機能](https://youtu.be/88GQwEti_Sg)

自分のタスクやグループリストに飛べる他、ユーザー名で検索して問答無用でそのユーザーのタスクリストを閲覧することができます。
また、Topページにはランダムで5人のユーザーへのタスクリストの遷移ボタンが現れる仕様になっています。

### 会員登録からタスク追加・削除・編集

[会員登録からタスク追加・削除・編集](https://youtu.be/lsH73hzZI78)

通常のTodoアプリとしての機能です。
レーティングができるのでタスクの消化に関しての自分の取り組み方を省み、評価するきっかけにしたり、進捗状況をこれで判断したり……とお使いください。
カテゴリーは次のフィルタリングで使います。

### フィルタリング

[フィルタリング](https://youtu.be/v58VhQPneG8)

タスクにはカテゴリーを設定できるのでそれでフィルタリングするか、タスクが未完か否かでもフィルタリングできます。
両方併用するのは今回は私の力不足により断念しました。


### グループ機能

[グループ機能](https://youtu.be/U6uF6xk523c)

Twitterでいうフォローやリスト機能に近い機能になります。
メンバーのタスクリストへも遷移できます。

### 他人のタスクリスト・グループ

[他人のタスクリスト・グループ](https://youtu.be/Mq26P6bTDmc)

誰かのタスクリストも見れます。
いわゆるいいねをタスクに押すことができ、他人が作ったグループリストに遷移してメンバーになることができます。

### 自分が参加しているグループ

[自分が参加しているグループ](https://youtu.be/oq-GLuoh_kQ)

自分が参加しているグループを見れます。

### ユーザー情報

[ユーザー情報](https://youtu.be/0rV979FUmZE)

ユーザー名・パスワード・メールアドレスの変更及び退会処理ができます。

## 最後に

簡単にではありますが以上が今回作ったものになります。
もちろん足りない部分や失敗、テストもデバックも書けない……など使った技術以外の課題も山積し、
そちら含めて後日改めてレポートを書きますがひとまず作業としては一段落になります。
お暇なときで結構ですのでちらっとでも触っていただけると嬉しいです。
