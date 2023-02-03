// Remote Example4 - controller
import { RelayServer } from "https://chirimen.org/remote-connection/js/beta/RelayServer.js";

var channel;
onload = async function () {
  // webSocketリレーの初期化
  var relay = RelayServer("chirimentest", "chirimenSocket");
  channel = await relay.subscribe("teamyuuki");
  messageDiv.innerText = "web socketリレーサービスに接続しました";
  channel.onmessage = getMessage;
};

function getMessage(msg) {
  // メッセージを受信したときに起動する関数
  messageDiv.innerText = "スイッチが、" + msg.data + "になりました。";

  //json読み込み呼び出し
  jsonfetch();
}

//json読み込み
const url = "./sample.json";
let j_result;

function formatJSON(data) {
  // 整形して表示 一覧
  let html = "<table>";
  for (let controller of data.controllers) {
    html +=
      "<tr><td>" +
      controller.bt_address +
      "</td><td>" +
      controller.notes[0] +
      "</td><td>" +
      controller.drum_pattern +
      "</td><td>" +
      controller.playlist_preset +
      "</td></tr>";
  }
  html += "</table>";
  j_result.innerHTML = html;
}

function jsonfetch() {
  // JSON表示用
  j_result = document.getElementById("j_result");

  // JSONファイルを取得して表示
  fetch(url)
    .then((response) => response.json())
    .then((data) => formatJSON(data));
}
