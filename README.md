# bedrock-custom-flat-generator
 マイクラ統合版でのカスタマイズしたスーパーフラットのlevel.datのバイナリを出力します。バイオームとブロックの種類と数を指定可能です。（最終動作確認バージョン：1.20.15）
## ツール公開URL
<a href="https://minecraft-mcworld.com/custom-flat/">カスタムフラットジェネレーター</a>

## 使い方
customFlat.jsを然るべき位置に置き、
```javascript
import customFlat from "PATH"
const biome = 1;
const blockData = Array({"block_name":"minecraft:dirt","count":10,"block_data":0},{"block_name":"minecraft:glass","count":10,"block_data":0});
const binary = customFlat(biome,blockData)
```
のような使い方でlevel.datに書き込むべきバイナリデータが取得できます。
引数について、biomeはバイオームのID (int)、blockDataはblock_name (string)、count (int)、block_data (int) からなるjsonの配列をいれてください。フラット生成時には配列の先頭が一番下のブロック、配列の末尾が一番上のブロックになります。

## ファイル構成について
### customFlat.js
コード本体。
### dat
ベースとなっているlevel.datファイルを参考のために置いています。コード内のBase64エンコードしたバイナリの元。
### example
JSZipを使用し.mcworldファイルをダウンロードさせている使用例が含まれています。

## マイクラ最新バージョンへの更新方法
現状のコードではcustomFlat.jsのtmp1Base64とtmp2Base64の値を、最新のマイクラで作成したワールドのlevel.datをもとにしたものに書き換える必要があります。更新したい場合はdatファイルを参考にしてください。