// Base64からの変換関数
function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

/** 
 * @typedef {Object} BlockData
 * @property {string} block_name
 * @property {int} count
 * @property {int} block_data
 *example:[{"block_name":"minecraft:glass","count":10,"block_data":0},{"block_name":"minecraft:dirt","count":10,"block_data":0},...]
 * 
 * @param {int} biomeId 
 * @param {BlockData} blocks 
 * @returns 
 */
export function customFlat(biomeId,blocks){

    //level.datのバイナリをbase64でエンコードしてる
    //level.datのFlatWorldLayersより前がtmp1、後がtmp2
    const tmp1Base64 = "CgAACA0AQmlvbWVPdmVycmlkZQAAARIAQ2VudGVyTWFwc1RvT3JpZ2luAAEeAENvbmZpcm1lZFBsYXRmb3JtTG9ja2VkQ29udGVudAADCgBEaWZmaWN1bHR5AgAAAAgPAEZsYXRXb3JsZExheWVycw==";
    const tmp2Base64 = "CgENAEZvcmNlR2FtZVR5cGUAAwgAR2FtZVR5cGUBAAAAAwkAR2VuZXJhdG9yAgAAAAgQAEludmVudG9yeVZlcnNpb24HADEuMjAuMTUBDABMQU5Ccm9hZGNhc3QBARIATEFOQnJvYWRjYXN0SW50ZW50AQQKAExhc3RQbGF5ZWQneuNkAAAAAAgJAExldmVsTmFtZQoAY3VzdG9tRmxhdAMTAExpbWl0ZWRXb3JsZE9yaWdpblgAAACAAxMATGltaXRlZFdvcmxkT3JpZ2luWQAAAIADEwBMaW1pdGVkV29ybGRPcmlnaW5aAAAAgAkeAE1pbmltdW1Db21wYXRpYmxlQ2xpZW50VmVyc2lvbgMFAAAAAQAAABQAAAAKAAAAAAAAAAAAAAABDwBNdWx0aXBsYXllckdhbWUBARUATXVsdGlwbGF5ZXJHYW1lSW50ZW50AQMLAE5ldGhlclNjYWxlCAAAAAMOAE5ldHdvcmtWZXJzaW9uUgIAAAMIAFBsYXRmb3JtAgAAAAMXAFBsYXRmb3JtQnJvYWRjYXN0SW50ZW50AgAAAAQKAFJhbmRvbVNlZWT7/3jbDBr98wEQAFNwYXduVjFWaWxsYWdlcnMAAwYAU3Bhd25YAAAAgAMGAFNwYXduWQAAAIADBgBTcGF3bloAAACAAw4AU3RvcmFnZVZlcnNpb24KAAAABAQAVGltZQAAAAAAAAAAAwwAV29ybGRWZXJzaW9uAQAAAAMSAFhCTEJyb2FkY2FzdEludGVudAIAAAAKCQBhYmlsaXRpZXMBCgBhdHRhY2ttb2JzAQENAGF0dGFja3BsYXllcnMBAQUAYnVpbGQBARAAZG9vcnNhbmRzd2l0Y2hlcwEFCABmbHlTcGVlZM3MTD0BBgBmbHlpbmcAAQoAaW5zdGFidWlsZAABDABpbnZ1bG5lcmFibGUAAQkAbGlnaHRuaW5nAAEGAG1heWZseQABBABtaW5lAQECAG9wAAEOAG9wZW5jb250YWluZXJzAQEIAHRlbGVwb3J0AAUJAHdhbGtTcGVlZM3MzD0ACA8AYmFzZUdhbWVWZXJzaW9uAQAqAREAYm9udXNDaGVzdEVuYWJsZWQAAREAYm9udXNDaGVzdFNwYXduZWQAAQ0AY2hlYXRzRW5hYmxlZAEBEgBjb21tYW5kYmxvY2tvdXRwdXQBARQAY29tbWFuZGJsb2Nrc2VuYWJsZWQBAQ8AY29tbWFuZHNFbmFibGVkAQQLAGN1cnJlbnRUaWNrAAAAAAAAAAADDQBkYXlsaWdodEN5Y2xlAAAAAAEPAGRvZGF5bGlnaHRjeWNsZQEBDQBkb2VudGl0eWRyb3BzAQEKAGRvZmlyZXRpY2sBARIAZG9pbW1lZGlhdGVyZXNwYXduAAEKAGRvaW5zb21uaWEBAQkAZG9tb2Jsb290AQENAGRvbW9ic3Bhd25pbmcBAQsAZG90aWxlZHJvcHMBAQ4AZG93ZWF0aGVyY3ljbGUBAQ4AZHJvd25pbmdkYW1hZ2UBAwgAZWR1T2ZmZXIAAAAAARgAZWR1Y2F0aW9uRmVhdHVyZXNFbmFibGVkAAoLAGV4cGVyaW1lbnRzARUAZXhwZXJpbWVudHNfZXZlcl91c2VkAAEeAHNhdmVkX3dpdGhfdG9nZ2xlZF9leHBlcmltZW50cwAAAQoAZmFsbGRhbWFnZQEBCgBmaXJlZGFtYWdlAQEMAGZyZWV6ZWRhbWFnZQEDFABmdW5jdGlvbmNvbW1hbmRsaW1pdBAnAAABFwBoYXNCZWVuTG9hZGVkSW5DcmVhdGl2ZQEBFQBoYXNMb2NrZWRCZWhhdmlvclBhY2sAARUAaGFzTG9ja2VkUmVzb3VyY2VQYWNrAAEOAGltbXV0YWJsZVdvcmxkAAERAGlzQ3JlYXRlZEluRWRpdG9yAAEUAGlzRXhwb3J0ZWRGcm9tRWRpdG9yAAEUAGlzRnJvbUxvY2tlZFRlbXBsYXRlAAETAGlzRnJvbVdvcmxkVGVtcGxhdGUAARMAaXNSYW5kb21TZWVkQWxsb3dlZAABEABpc1NpbmdsZVVzZVdvcmxkAAEbAGlzV29ybGRUZW1wbGF0ZU9wdGlvbkxvY2tlZAABDQBrZWVwaW52ZW50b3J5AAkVAGxhc3RPcGVuZWRXaXRoVmVyc2lvbgMFAAAAAQAAABQAAAAPAAAAAQAAAAAAAAAFDgBsaWdodG5pbmdMZXZlbAAAAAADDQBsaWdodG5pbmdUaW1lhtQAAAMRAGxpbWl0ZWRXb3JsZERlcHRoEAAAAAMRAGxpbWl0ZWRXb3JsZFdpZHRoEAAAAAMVAG1heGNvbW1hbmRjaGFpbmxlbmd0aP//AAABCwBtb2JncmllZmluZwEBEwBuYXR1cmFscmVnZW5lcmF0aW9uAQMQAHBlcm1pc3Npb25zTGV2ZWwAAAAAAxYAcGxheWVyUGVybWlzc2lvbnNMZXZlbAEAAAAIBABwcmlkAAABAwBwdnABBQkAcmFpbkxldmVsAAAAAAMIAHJhaW5UaW1lbaAAAAMPAHJhbmRvbXRpY2tzcGVlZAEAAAABHgByZXF1aXJlc0NvcGllZFBhY2tSZW1vdmFsQ2hlY2sAARQAcmVzcGF3bmJsb2Nrc2V4cGxvZGUBARMAc2VuZGNvbW1hbmRmZWVkYmFjawEDFABzZXJ2ZXJDaHVua1RpY2tSYW5nZQQAAAABEABzaG93Ym9yZGVyZWZmZWN0AQEPAHNob3djb29yZGluYXRlcwABEQBzaG93ZGVhdGhtZXNzYWdlcwEBCABzaG93dGFncwEBCQBzcGF3bk1vYnMBAwsAc3Bhd25yYWRpdXMFAAAAARMAc3RhcnRXaXRoTWFwRW5hYmxlZAABFAB0ZXh0dXJlUGFja3NSZXF1aXJlZAABCwB0bnRleHBsb2RlcwEBEwB1c2VNc2FHYW1lcnRhZ3NPbmx5AAQPAHdvcmxkU3RhcnRDb3VudP7///8AAAAACg4Ad29ybGRfcG9saWNpZXMAAA==";
    const tmp1ArrayBuffer = base64ToArrayBuffer(tmp1Base64);
    const tmp2ArrayBuffer = base64ToArrayBuffer(tmp2Base64);

    let binary = []; 

    // ヘッダの書き込み
    const headerView = new DataView(new ArrayBuffer(8));
    headerView.setInt32(0, 10, true);  // バージョン的なもの
    binary = binary.concat(Array.from(new Uint8Array(headerView.buffer)));

    // tmp1の内容を追加
    binary = binary.concat(Array.from(new Uint8Array(tmp1ArrayBuffer)));

    // フラットのjsonを作成
    let flatJson = {
        biome_id: biomeId,
        block_layers: blocks,
        encoding_version: 6,
        structure_options: null,
        world_version: "version.post_1_18"
    };

    const flatJsonString = JSON.stringify(flatJson);
    const flatJsonBinary = new Uint8Array(flatJsonString.length+2 );
    flatJsonBinary[0] = (flatJsonString.length+1) & 0xFF;  
    flatJsonBinary[1] = ((flatJsonString.length+1) >> 8) & 0xFF;  

    for (let i = 0; i < flatJsonString.length; i++) {
        flatJsonBinary[i+2] = flatJsonString.charCodeAt(i);
    }

    binary = binary.concat(Array.from(flatJsonBinary));

    // tmp2の内容を追加
    binary = binary.concat(Array.from(new Uint8Array(tmp2ArrayBuffer)));

    // ファイルサイズの計算
    const fileSize = binary.length - 8;  // ヘッダーを引いたファイル長
    const fileSizeBuffer = new Uint8Array(4);
    fileSizeBuffer[0] = fileSize & 0xFF;
    fileSizeBuffer[1] = (fileSize >> 8) & 0xFF;
    fileSizeBuffer[2] = (fileSize >> 16) & 0xFF;
    fileSizeBuffer[3] = (fileSize >> 24) & 0xFF;

    binary.splice(4, 4, ...fileSizeBuffer);  // ヘッダのファイルサイズ部分を上書き

    // 最終的なバイナリデータを取得
    const finalBinaryBuffer = new Uint8Array(binary).buffer;

    return finalBinaryBuffer;
}