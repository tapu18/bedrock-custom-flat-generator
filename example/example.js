import customFlat from "../customFlat"
import JSZip from "jszip";

const biome = 1;
const data = Array({"block_name":"minecraft:dirt","count":10,"block_data":0},{"block_name":"minecraft:glass","count":10,"block_data":0});
const binary = customFlat(biome,data);//customFlat実行
    
let zip = new JSZip(); //JSZipライブラリを使用
zip.file("level.dat", binary);

// ZIPをBlobとして生成
zip.generateAsync({type:"blob"})
.then(function(blob) {
    // BlobからURLを生成
    const url = URL.createObjectURL(blob);

    // ダウンロードリンクを作成
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "customFlat.mcworld"; 
    document.body.appendChild(downloadLink);

    //ダウンロード
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
});