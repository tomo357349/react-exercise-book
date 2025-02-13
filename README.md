# react-exercise-book
React練習帳です。


## 方針の表明
Reactが上手に使えるようになるために、個人的に学んだReactのアウトプットのためにこのリポジトリを使います。  
たぶん実務ではNext.jsやReact Routerなどを使うことになるとは思いますが、あえてピュアなReactのみを使い、小さな部品もできるだけ自分で作成することで理解を深めます。

当面は以下については扱わずに進めます。
- サーバ処理が絡むSSRやSSG（最初からややこしくせず、クライアント（ブラウザ）上での動きのみに集中する）
- ユーザ認証（サーバサイドを考える時に改めて考える）
- APIのバックエンド処理（とりあえずモックで代替する）
- TypeScript（不慣れなのでとりあえず置いておく。いずれは使う）

## 主な環境構成
### 実行環境
- react / react-dom
- fontawesome（アイコン表示に使う）
- normalize.css（CSSリセット）

### 開発環境
- vite（なるべく標準的なものを使いたかったが、react-create-appは非推奨になってしまっているため）
- eslint（jsとjsxの静的解析に使う）
- stylelint（スタイルシートの静的解析と整形に使う）
- faker（モックデータ作成に使う）
- msw（フェッチ処理のモック化に使う）

## 成果物
- UI部品
    - フォーム部品
        - フォームコンポーネント（[Form](./src/components/Form.jsx)）
        - ボタンコンポーネント（[ButtonControl](./src/components/ButtonControl.jsx)）
        - 入力コンポーネント（[InputControl](./src/components/InputControl.jsx)）
        - トグルボタンコンポーネント（[BoolInput](./src/components/BoolInput.jsx)）
        - 選択入力コンポーネント（[SelectControl](./src/components/SelectControl.jsx)）
        - 複数行テキスト入力コンポーネント（[MultiLineInputControl](./src/components/MultiLineInputControl.jsx)）
    - その他の部品
        - アイコンコンポーネント（[Icon](./src/components/Icon.jsx)）
        - アコーディオンコンポーネント（[Accordion](./src/components/Accordion.jsx)）
        - タグコンポーネント（[TagLabel](./src/components/TagLabel.jsx)）
        - ダイアログコンポーネント（[Dialog](./src/components/Dialog.jsx)）
        - データ表コンポーネント（[DataTable](./src/components/DataTable.jsx)）
        - 交差オブザーバコンポーネント（[Intersection](./src/components/Intersection.jsx)）
- ルーティング部品
    - ルーター（[BrowserRouter](./src/components/BrowserRouter.jsx)）
    - ルート分岐（[Routes](./src/components/Routes.jsx)）
    - ルート（[Route](./src/components/Route.jsx)）
    - ナビゲーションリンク（[NavLink](./src/components/NavLink.jsx)）
- フック
    - フェッチ利用フック（[useFetch](./src/hooks/useFetch.js)）
    - トースト表示フック（[useToast](./src/hooks/useToast.js)）
    - ルーターパラメータ利用フック（[useRouterParams](./src/hooks/useRouterParams.js)）
- JavaScriptユーティリティ類
    - 文字列処理ユーティリティ（[string](./src/utils/string.js)）
    - オブジェクト処理ユーティリティ（[object](./src/utils/object.js)）
    - フェッチ処理ユーティリティ（[fetch](./src/utils/fetch.js)）
    - ルーティング処理ユーティリティ（[route](./src/utils/route.js)）