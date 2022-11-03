import "./App.css";
import React, { useState, useEffect } from "react";
import MapTest from "./MapTest";
import "./App.css";

const { kakao } = window;

function App() {
  const [message, setMessage] = useState("");
  const drawMapByAddress = (address, isMark) => {
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        var mapContainer = document.getElementById("map"),
          mapOption = {
            center: coords,
            level: 2,
          };

        mapContainer.style.width = "1000px";
        mapContainer.style.height = "600px";

        var map = new kakao.maps.Map(mapContainer, mapOption);

        if (isMark) {
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });
        }

        map.setCenter(coords);
      }
    });
  };

  useEffect(() => {
    document.addEventListener("message", ({ data }) => {
      console.log(data);
      setMessage(data);
      drawMapByAddress(data, true);
    });
    drawMapByAddress("인천 미추홀구 인하로 100", false);
  }, []);
  return <div id="map"></div>;
}

export default App;
