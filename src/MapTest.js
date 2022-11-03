/* global kakao */

import React, { useEffect, useState } from "react";

const { kakao } = window;

const MapTest = () => {
  useEffect(() => {
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(
      "인천 미추홀구 독배로 309",
      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          var mapContainer = document.getElementById("map"), // 지도를 표시할 div
            mapOption = {
              center: coords, // 지도의 중심좌표
              level: 3, // 지도의 확대 레벨
            };

          // 지도를 생성합니다
          var map = new kakao.maps.Map(mapContainer, mapOption);
          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      }
    );
  }, []);
  return <div id="map" style={{ width: "100%", height: "200px" }}></div>;
};

export default MapTest;
