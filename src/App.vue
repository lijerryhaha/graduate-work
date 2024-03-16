<template>
  <body>

    <div id="container">
      <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    </div>
    <!-- <div class="card">
      <span id="map-zoom">11</span> :
      <span id="map-center">121.498586,31.239637</span>

    </div> -->

    <div class="footer">

      <div class="tab">
        <a @click="all" class="active" id="all">

          <span class="active" id="all_s">
            全部
          </span>

        </a>
      </div>

      <div class="tab">
        <a @click="public" id="public">

          <span id="public_s">
            公共服务
          </span>

        </a>
      </div>

      <div class="tab">
        <a @click="famer" id="famer">

          <span id="famer_s">
            人员类型
          </span>

        </a>
      </div>

      <div class="tab">
        <a @click="cooperator" id="cooperator">

          <span id="cooperator_s">
            企业信息
          </span>

        </a>
      </div>

    </div>


    <transition name="changeShow">
      <span v-show="sencondorder">

        <div class="triangle">

        </div>

        <div class="back"></div>
        <div class="back" style="margin-top: 2.5%;"></div>
        <div class="back" style="margin-top: 5.0%;"></div>

        <div class="kuai">
          <div @click="party" id="party" style="display: flex; width: 129px;">

            <img class="icon" src="导航+弹窗1_slices/党员.png">
            <a>党员</a>
          </div>

        </div>
        <div class="kuai" style="margin-top: 2.5%;">
          <div @click="old" id="old" style="display: flex; width: 129px;">
            <img class="icon" src="导航+弹窗1_slices/老人.png">
            <a>老人</a>

          </div>

        </div>
        <div class="kuai" style="margin-top: 5%;">
          <div @click="invite" id="invite" style="display: flex; width: 129px;">
            <img class="icon" src="导航+弹窗1_slices/上访.png">
            <a>上访</a>

          </div>

        </div>

        <div class="kuai" style="margin-top: 7.5%;">
          <div @click="ordinary" id="ordinary" style="display: flex; width: 129px;">
            <img class="icon" src="me-act3.png">
            <a>普通人</a>

          </div>

        </div>



      </span>
    </transition>









    <el-dialog :title="tt" :visible.sync="centerDialogVisible" width="500px" center :show-close="false"
      class="el-dialog-custom" @opened="dialog_pictures" :before-close="closedialog">
      <div class="detail_cancel">
        <img src="弹窗2_slices/组 31.png" @click="centerDialogVisible = false">
      </div>

      <div class="rect583">
        <img src="弹窗2_slices/矩形 583.png">
      </div>

      <div class="rect584">
        <img src="弹窗2_slices/矩形 584.png">
      </div>

      <div class="group30">
        <img src="弹窗2_slices/组 30.png">
        <a id="comment" v-html="comment"></a>
      </div>

      <div class="rect583copy2" v-if="videosrc != ''">
        <img src="弹窗2_slices/矩形 583 拷贝 2.png">
        <video controls id="video1">
          <source src="" type='video/webm'>

          <source :src="videosrc" type='video/mp4'>


        </video>

      </div>

      <div class="rect583copy2" v-if="audiosrc != ''">
        <img src="弹窗2_slices/矩形 583 拷贝 2.png">
        <audio controls id="audio1">
          <source :src="audiosrc" type='audio/mp3'>

        </audio>
      </div>



      <div class="rect583copy2_2" v-if="qrCode != ''">
        <img src="弹窗2_slices/矩形 583 拷贝 2.png" width="300px" height="270px">
        <a id="qrinfo">一户一码：</a>
        <img :src="qrCode" id="qrcode">
      </div>



      <a id="titleA">
        {{ tt }}
      </a>

      <a id="basicinfo">
        基本信息
      </a>

      <!-- <img :src="imagesrc_d" id="img2" onerror="this.src=''"> -->

      <div id="max1" v-show="visibility">
        <div class="re1">
          <ul>

          </ul>
          <ol>

          </ol>
        </div>
      </div>


      <div class="info-middle" style="background-color: transparent; white-space: pre-line; " v-html="html">

      </div>

      <!-- <span>
      <div class="custom-info input-card content-window-card" style="width: 100%;"> 
                <div class="info-top"> 
                  <div> 
                  {{tt}} <span style="font-size:11px;color:#F00;">类型: {{ type }}  </span> 
                  </div> 
                </div>

                <div class="info-middle" style="background-color: #fff; white-space: pre-line; " v-html="html"> 
                 
                </div> 

                
      </div>


    </span> -->


    </el-dialog>



  </body>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios';
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
  name: 'App',
  components: {
    HelloWorld,

  },

  data() {
    return {
      map: {},
      marker: [],
      centerDialogVisible: false,
      tt: "123",
      type: "123",
      html: "123",
      imagesrc_d: [],
      visibility: false,
      videosrc: "",
      audiosrc: "",
      comment: "",
      qrCode: "",
      sencondorder: false
    }
  },

  methods: {

    closedialog() {
      this.map.clearInfoWindow();
      this.centerDialogVisible = false;

      // this.sencondorder = false;
      // if (document.getElementById("party").className == "active" ||
      //   document.getElementById("old").className == "active" ||
      //   document.getElementById("invite").className == "active" ||
      //   document.getElementById("ordinary").className == "active"
      // ) {
      //   var markers = this.marker;
      //   for (var i = 0; i < markers.length; i++) {
      //     if (markers[i].getExtData().code != "3") {
      //       markers[i].hide();
      //     } else {
      //       markers[i].show();
      //     }

      //   }

      //   var x = document.getElementById("famer");
      //   x.className = "active";
      //   var x1 = document.getElementById("public");
      //   x1.className = "";
      //   // var x2 = document.getElementById("scenery");
      //   // x2.className = "";
      //   var x3 = document.getElementById("all");
      //   x3.className = "";
      //   var x4 = document.getElementById("cooperator");
      //   x4.className = "";
      //   var x5 = document.getElementById("party");
      //   x5.className = "";
      //   var x6 = document.getElementById("old");
      //   x6.className = "";
      //   var x7 = document.getElementById("invite");
      //   x7.className = "";
      //   var x8 = document.getElementById("ordinary");
      //   x8.className = "";

      //   var xs = document.getElementById("famer_s");
      //   xs.className = "active";
      //   var xs1 = document.getElementById("public_s");
      //   xs1.className = "";

      //   var xs3 = document.getElementById("all_s");
      //   xs3.className = "";
      //   var xs4 = document.getElementById("cooperator_s");
      //   xs4.className = "";
      // }


    },

    dialog_pictures() {
      var imgnum = this.imagesrc_d.length;
      var box = document.getElementsByClassName("re1")[0];
      var lik = [];
      var ul = box.getElementsByTagName("ul")[0];
      var ol = box.getElementsByTagName("ol")[0];
      var ulchild = ul.childNodes;
      var olchild = ol.childNodes;

      for (var m = ulchild.length - 1; m >= 0; m--) {

        ul.removeChild(ulchild[m]);
        ol.removeChild(olchild[m]);
      }

      for (var n = 0; n < imgnum; n++) {
        var li = document.createElement("li");
        li.innerHTML = "<img src='" + this.imagesrc_d[n] + "'>";

        ul.appendChild(li);
        lik.push(li);
      }
      for (var n = 0; n < imgnum; n++) {

        var oli = document.createElement("li");
        ol.appendChild(oli);
        lik.push(oli);
      }



      // var lik = reD.getElementsByTagName("li");
      if (imgnum != 0) {
        function fun(i, j) {//转换图片函数，就是把透明度改了一下
          lik[i].style.opacity = 1;
          lik[j].style.opacity = 0;
          lik[i + imgnum].style.backgroundColor = "#ffffff";//改一下小图标
          lik[j + imgnum].style.backgroundColor = "#00000000"
        }
        if (imgnum == 1) {
          lik[0].style.opacity = 1;
          lik[1].style.backgroundColor = "#ffffff";
        } else {
          fun(0, 1);
          var i = 0;
          function auto() {//轮播循环函数
            if (++i >= imgnum) {
              i = 0;
              fun(0, (imgnum - 1));
            }
            else fun(i, i - 1);
          }
          var timer = setInterval(auto, 2000);
          box.onmouseover = function () { //鼠标划上去，停止轮播
            console.log('good');
            clearInterval(timer);
          }
          box.onmouseout = function () { //鼠标划出，继续轮播
            timer = setInterval(auto, 2000); //调用定时器
          }
          var j = 0;
          for (; j < imgnum; j++) {//点击小图标也可以转换图片
            lik[j + imgnum].ind = j;
            lik[j + imgnum].onclick = function () {
              fun(this.ind, i)
              i = this.ind;
            }
          }

        }
        // fun(0, 0);//初始化下
        setTimeout(() => {
          this.visibility = true;
        }, 300)

      }
    },

    initChart() {
      var ROOT_PATH = '/api';
      axios.get(ROOT_PATH + '/api/rural/facility/-1', {
        // params: {
        //   ID: 12345
        // },
        //headers: { 'X-Requested-With': 'XMLHttpRequest' },
        // withCredentials: true,
        // proxy: {
        //   protocol: 'https',
        //   host: '192.168.31.96',
        //   port: 8080,

        // },
      })
        .then(data => {



          AMapLoader.load({
            key: "8f6b2d17abaa884efc48a0c37fd2ec36", //此处填入我们注册账号后获取的Key
            version: "1.4.2", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ['AMap.DistrictSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType'], //需要使用的的插件列表，如比例尺'AMap.Scale'等
          }).then((AMap) => {


            this.map = new AMap.Map("container", { //设置地图容器id
              showLabel: false,
              resizeEnable: true,
              layers: [new AMap.TileLayer()],
              //center: [121.265282, 28.598162],
              center: [121.437399, 28.695562],
              zoom: 17,
              expandZoomRange: true,
              zooms: [16, 19],
              //viewMode: '3D',  // 三维视图
              pitch: 40
            });

            //this.map.addControl(new AMap.Scale());
            // this.map.addControl(new AMap.ToolBar());
            // this.map.addControl(new AMap.OverView());
            //this.map.addControl(new AMap.MapType());



            // var host = window.location.origin;
            var tilerLayer = new AMap.TileLayer({
              zIndex: 10,
              //getTileUrl: 'https://futurerural-oss.maiyuanwenhua.cn/guide/shanqiancun/maptiler/[z]/[x]_[y].png',
              //getTileUrl: 'https://futurerural.oss-cn-hangzhou.aliyuncs.com/screen/boshuli/[z]/[x]/[y].png',
              getTileUrl: 'https://futurerural.oss-cn-hangzhou.aliyuncs.com/screen/qiansuo/[z]/[x]/[y].png',


            });
            tilerLayer.setMap(this.map);



            // var bounds = this.map.getBounds();
            // this.map.setLimitBounds(bounds);
            // 显示地图层级与中心点信息

            //this.map.on('mapmove', showMapInfo);
            //this.map.on('zoomend', showMapInfo);

            //121.411854,28.714321
            //121.464082,28.680517
            var southWest0 = new AMap.LngLat(121.411854, 28.680517); var northEast0 = new AMap.LngLat(121.464082, 28.714321);
            var bounds = new AMap.Bounds(southWest0, northEast0);
            this.map.setLimitBounds(bounds);
            //121.232323,28.583956;121.298241,28.612366

            var southWest = new AMap.LngLat(121, 28); var northEast = new AMap.LngLat(122, 29);
            var mybounds = new AMap.Bounds(southWest, northEast);


            var tilerLayer2 = new AMap.ImageLayer({
              bounds: mybounds,
              zIndex: 9,
              //getTileUrl: 'https://futurerural-oss.maiyuanwenhua.cn/guide/shanqiancun/maptiler/[z]/[x]_[y].png',
              url: 'black.jpg',


            });
            tilerLayer2.setMap(this.map);


            var m = this.map;
            var ee;

            var showMapInfo0 = (e) => {
              ee.target.setLabel(null);
              m.clearInfoWindow();


              this.sencondorder = false;



              if (document.getElementById("party").className == "active" ||
                document.getElementById("old").className == "active" ||
                document.getElementById("invite").className == "active" ||
                document.getElementById("ordinary").className == "active"
              ) {
                var markers = this.marker;
                for (var i = 0; i < markers.length; i++) {
                  if (markers[i].getExtData().code != "3") {
                    markers[i].hide();
                  } else {
                    markers[i].show();
                  }

                }

                var x = document.getElementById("famer");
                x.className = "active";
                var x1 = document.getElementById("public");
                x1.className = "";
                // var x2 = document.getElementById("scenery");
                // x2.className = "";
                var x3 = document.getElementById("all");
                x3.className = "";
                var x4 = document.getElementById("cooperator");
                x4.className = "";
                var x5 = document.getElementById("party");
                x5.className = "";
                var x6 = document.getElementById("old");
                x6.className = "";
                var x7 = document.getElementById("invite");
                x7.className = "";
                var x8 = document.getElementById("ordinary");
                x8.className = "";

                var xs = document.getElementById("famer_s");
                xs.className = "active";
                var xs1 = document.getElementById("public_s");
                xs1.className = "";

                var xs3 = document.getElementById("all_s");
                xs3.className = "";
                var xs4 = document.getElementById("cooperator_s");
                xs4.className = "";
              }

              console.log(e.lnglat.getLng() + "," + e.lnglat.getLat());
              console.log(m.getBounds().toString());
            }

            this.map.on('click', showMapInfo0);


            // function showMapInfo() {
            //   var zoom = m.getZoom(); //获取当前地图级别
            //   var center = m.getCenter(); //获取当前地图中心位置
            //   document.querySelector("#map-zoom").innerText = zoom;
            //   document.querySelector("#map-center").innerText = center.lng.toString() + ', ' + center.lat.toString();

            // }



            //showMapInfo();

            this.map.clearMap();


            // var marker = new AMap.Marker({
            //   map: map,
            //   position: [116.333000, 39.946400]
            // });
            // //鼠标点击marker弹出自定义的信息窗体
            // AMap.event.addListener(marker, 'click', function () {
            //   infoWindow.open(map, marker.getPosition());
            // });







            var markers = data.data.data;


            //实例化信息窗体

            var title = '',
              content = [],
              imagesrc = [];






            //content.push("<a href='javascript:void(0);'  οnclick='js_method()'>详细信息</a>");


            // var infoWindow = new AMap.InfoWindow({
            //   isCustom: true,  //使用自定义窗体
            //   content: createInfoWindow(title, content.join("<br/>")),
            //   offset: new AMap.Pixel(16, -45)
            // });


            //构建自定义信息窗体



            //关闭信息窗体




            for (var i = 0; i < markers.length; i++) {
              var marker0 = markers[i];
              if (marker0.pointType == "公共设施") {
                var marker1 = new AMap.Marker({
                  map: this.map,
                  //icon: "https://edu-993.oss-cn-hangzhou.aliyuncs.com/%E4%BC%81%E4%B8%9A.png",
                  icon: new AMap.Icon({
                    image: "导航+弹窗1_slices/公共服务.png",
                    size: new AMap.Size(52, 52),  //图标大小

                  }),

                  position: [marker0.longitude, marker0.latitude],
                  offset: new AMap.Pixel(-13, -30),
                  extData: { "Id": marker0.pointId, "code": "1" },
                });
                console.log(marker0.pointName + marker1.getPosition().toString());


                this.marker.push(marker1);


              }
              // if (marker0.pointType == "景点设施") {
              //   var marker2 = new AMap.Marker({
              //     map: this.map,
              //     // icon: "https://edu-993.oss-cn-hangzhou.aliyuncs.com/%E6%99%AF%E7%82%B9.png",
              //     icon: new AMap.Icon({
              //       image: "https://edu-993.oss-cn-hangzhou.aliyuncs.com/%E6%99%AF%E7%82%B9%20%281%29.png",
              //       size: new AMap.Size(52, 52),  //图标大小
              //       imageSize: new AMap.Size(26, 26)
              //     }),
              //     position: [marker0.longitude, marker0.latitude],
              //     offset: new AMap.Pixel(-13, -30),
              //     extData: { "Id": marker0.pointId, "code": "0" },
              //   });

              //   console.log(marker0.pointName + marker2.getPosition().toString());
              //   this.marker.push(marker2);



              // }
              if (marker0.pointType == "农户设施") {

                var marker3 = new AMap.Marker({
                  map: this.map,
                  // icon: "https://edu-993.oss-cn-hangzhou.aliyuncs.com/%E5%86%9C%E6%88%B7.png",
                  icon: new AMap.Icon({
                    image: "https://edu-993.oss-cn-hangzhou.aliyuncs.com/%E5%86%9C%E6%88%B7%20%281%29.png",
                    size: new AMap.Size(52, 52),  //图标大小

                  }),
                  position: [marker0.longitude, marker0.latitude],
                  offset: new AMap.Pixel(-13, -30),
                  extData: { "Id": marker0.pointId, "code": "3" },
                });

                console.log(marker0.pointName + marker3.getPosition().toString());

                this.marker.push(marker3);



              }
              if (marker0.pointType == "企业设施") {
                var marker4 = new AMap.Marker({
                  map: this.map,
                  // icon: "https://edu-993.oss-cn-hangzhou.aliyuncs.com/%E4%BC%81%E4%B8%9A.png",
                  icon: new AMap.Icon({
                    image: "导航+弹窗1_slices/企业.png",
                    size: new AMap.Size(52, 52),  //图标大小

                  }),
                  position: [marker0.longitude, marker0.latitude],
                  offset: new AMap.Pixel(-13, -30),
                  extData: { "Id": marker0.pointId, "code": "2" },
                });

                console.log(marker0.pointName + marker4.getPosition().toString());

                this.marker.push(marker4);


              }



            };


            // var infoWindow = new AMap.InfoWindow({
            //       isCustom: true,  //使用自定义窗体
            //       content: createInfoWindow(title, content.join("<br/>")),
            //       offset: new AMap.Pixel(16, -45)
            //     });


            var marker = this.marker;
            var map = this.map;

            var j = 0;
            for (var i = 0; i < this.marker.length; i++) {
              var mark = this.marker[i];

              mark.on('click', markerClick);
              mark.emit('click', { target: mark });


            }

            var det = [];
            var imagesrc_d = "";
            var videosrc = "";
            var audiosrc = "";
            var comment = "";
            var qrCode = "";

            var type = "";

            function markerClick(e) {

              for (var i = 0; i < marker.length; i++) {
                var mark = marker[i];



                mark.setzIndex(1);

              }

              j++;

              e.target.setzIndex(2);

              ee = e;



              var id = e.target.getExtData().Id;
              var code = e.target.getExtData().code;


              switch (code) {
                // case "0": type = "景点设施"; break;
                case "1": type = "公共设施"; break;
                case "2": type = "企业设施"; break;
                case "3": type = "农户设施"; break;
                default: break;
              }

              var ROOT_PATH = `/api`;

              axios.get(ROOT_PATH + `/api/rural/facility/${id}/${code}`, {})
                .then(response => {
                  title = response.data.data.name;


                  //公共设施
                  if (code == "1") {

                    content = [];
                    if (response.data.data.imageList != null) {
                      imagesrc = [];
                      //content.push("<img src='" + response.data.data.imageList.toString().replace(/"/g, "") + "' width='100px'>面积：" + response.data.data.area + "平方公里");
                      for (var i = 0; i < response.data.data.imageList.length; i++) {

                        imagesrc[i] = response.data.data.imageList[i].toString().replace(/"/g, "")
                      }

                      content.push("面积：" + response.data.data.area + "平方公里");
                    } else {
                      //content.push("<img src='" + "" + "' width='100px'>面积：" + response.data.data.area + "平方公里");

                      imagesrc = [];
                      content.push("面积：" + response.data.data.area + "平方公里");

                    }
                    content.push("电话：" + response.data.data.phone);

                    det = [];
                    imagesrc_d = "";
                    videosrc = "";
                    audiosrc = "";
                    comment = "";
                    qrCode = "";

                    var b = "";
                    switch (response.data.data.buildingType) {
                      case 0: b = "教育设施"; break;
                      case 1: b = "医疗卫生设施"; break;
                      case 2: b = "文化体育设施"; break;
                      case 3: b = "社区服务设施"; break;
                      case 4: b = "行政管理设施"; break;
                    }

                    if (response.data.data.imageList != null) {
                      //det.push("<img src='" + response.data.data.imageList.toString().replace(/"/g, "") + "' width='100px'>面积：" + response.data.data.area + "平方公里");
                      imagesrc_d = response.data.data.imageList.toString().replace(/"/g, "");
                      det.push("面积：" + response.data.data.area + "平方公里");
                    } else {
                      //det.push("<img src='" + "" + "' width='100px'>面积：" + response.data.data.area + "平方公里");
                      imagesrc_d = "";
                      det.push("面积：" + response.data.data.area + "平方公里");
                    }

                    det.push("电话：" + response.data.data.phone);
                    det.push("设施类型：" + b);

                    det.push("负责人：" + response.data.data.head);

                    if (response.data.data.content != null) {
                      //det.push("简介：" + response.data.data.content);
                      comment = "简介：" + response.data.data.content.toString();
                    } else {
                      //det.push("简介：" + "无");
                      comment = "简介：" + "无";
                    }





                    if (response.data.data.videoList != "") {
                      // det.push("<video controls >" +
                      //   "<source src='" + "" + "' type='video/webm'>" +

                      //   "<source src='" + response.data.data.videoList.toString().replace(/"/g, "") + "' type='video/mp4'>" +


                      //   "</video>")

                      videosrc = response.data.data.videoList.toString().replace(/"/g, "");

                      // console.log(response.data.data.video.toString().replace(/"/g, ""))
                      // console.log(response.data.data.picture.toString().replace(/"/g, ""))
                    } else {
                      videosrc = "";
                    }

                    if (response.data.data.audio != "") {
                      // det.push("<audio controls  >" +
                      //   "<source src='" + response.data.data.audio.toString().replace(/"/g, "") + "' type='audio/mp3'>" +

                      //   "</audio>")

                      audiosrc = response.data.data.audio.toString().replace(/"/g, "");

                      // console.log(response.data.data.video.toString().replace(/"/g, ""))
                      // console.log(response.data.data.picture.toString().replace(/"/g, ""))
                    } else {
                      audiosrc = "";
                    }


                  }


                  //企业
                  if (code == "2") {
                    content = [];
                    if (response.data.data.imageList != null) {
                      imagesrc = [];
                      //content.push("<img src='" + response.data.data.imageList.toString().replace(/"/g, "") + "' width='100px'>年产值：" + response.data.data.annualValue);
                      //imagesrc = response.data.data.imageList.toString().replace(/"/g, "");
                      for (var i = 0; i < response.data.data.imageList.length; i++) {

                        imagesrc[i] = response.data.data.imageList[i].toString().replace(/"/g, "")
                      }
                      content.push("年产值：" + response.data.data.annualValue);

                    } else {
                      //content.push("<img src='" + "" + "' width='100px'>年产值：" + response.data.data.annualValue);
                      imagesrc = [];
                      content.push("年产值：" + response.data.data.annualValue);
                    }

                    content.push("电话：" + response.data.data.phone);


                    det = [];
                    imagesrc_d = "";
                    videosrc = "";
                    audiosrc = "";
                    comment = "";
                    qrCode = "";

                    var b = "";
                    switch (response.data.data.businessType) {
                      case 0: b = "种植"; break;
                      case 1: b = "养殖"; break;
                      case 2: b = "经营副业"; break;
                    }


                    if (response.data.data.imageList != null) {
                      //det.push("<img src='" + response.data.data.imageList.toString().replace(/"/g, "") + "' width='100px'>年产值：" + response.data.data.annualValue);
                      imagesrc_d = response.data.data.imageList.toString().replace(/"/g, "");
                      det.push("年产值：" + response.data.data.annualValue);
                    } else {
                      //det.push("<img src='" + "" + "' width='100px'>年产值：" + response.data.data.annualValue);
                      imagesrc_d = "";
                      det.push("年产值：" + response.data.data.annualValue);
                    }


                    det.push("电话：" + response.data.data.phone);
                    det.push("负责人：" + response.data.data.head);
                    det.push("经商类型：" + b);


                    if (response.data.data.product != null) {
                      //det.push("简介：" + response.data.data.content);
                      comment = "简介：" + response.data.data.product.toString();
                    } else {
                      //det.push("简介：" + "无");
                      comment = "简介：" + "无";
                    }


                  }



                  //农户
                  if (code == "3") {
                    content = [];
                    if (response.data.data.imageList != null) {
                      imagesrc = [];
                      //content.push("<img src='" + response.data.data.imageList.toString().replace(/"/g, "") + "' width='100px'>门牌号：" + response.data.data.doorCode);
                      //imagesrc = response.data.data.imageList.toString().replace(/"/g, "");
                      for (var i = 0; i < response.data.data.imageList.length; i++) {

                        imagesrc[i] = response.data.data.imageList[i].toString().replace(/"/g, "")
                      }
                      content.push("门牌号：" + response.data.data.doorCode);

                    } else {
                      //content.push("<img src='" + "" + "' width='100px'>门牌号：" + response.data.data.doorCode);
                      imagesrc = [];
                      content.push("门牌号：" + response.data.data.doorCode);
                    }





                    det = [];
                    imagesrc_d = "";
                    videosrc = "";
                    audiosrc = "";
                    comment = "";
                    qrCode = "";


                    if (response.data.data.imageList != null) {
                      //det.push("<img src='" + response.data.data.imageList.toString().replace(/"/g, "") + "' width='100px'>门牌号：" + response.data.data.doorCode);
                      imagesrc_d = response.data.data.imageList.toString().replace(/"/g, "");
                      det.push("门牌号：" + response.data.data.doorCode);
                    } else {
                      //det.push("<img src='" + "" + "' width='100px'>门牌号：" + response.data.data.doorCode);
                      imagesrc_d = "";
                      det.push("门牌号：" + response.data.data.doorCode);
                    }

                    var b = "";
                    switch (response.data.data.businessType) {
                      case 0: b = "种植"; break;
                      case 1: b = "养殖"; break;
                      case 2: b = "经营副业"; break;
                    }


                    var d = "";
                    switch (response.data.data.duties) {

                      case "1": d = "党员"; e.target.setIcon("导航+弹窗1_slices/党员.png"); e.target.setExtData({ "Id": id, "code": "3", "dutycode": "1" }); break;
                      case "2": d = "上访户"; e.target.setIcon("导航+弹窗1_slices/上访.png"); e.target.setExtData({ "Id": id, "code": "3", "dutycode": "2" }); break;
                      case "3": d = "老人"; e.target.setIcon("导航+弹窗1_slices/老人.png"); e.target.setExtData({ "Id": id, "code": "3", "dutycode": "3" }); break;
                      case "4": d = "普通人"; e.target.setIcon("me-act3.png"); e.target.setExtData({ "Id": id, "code": "3", "dutycode": "4" }); break;
                    }
                    det.push("人员类别：" + d);
                    content.push("人员类别：" + d);
                    det.push("经商类型：" + b);
                    det.push("家庭成员：" + response.data.data.members);

                    if (response.data.data.content != null) {
                      //det.push("简介：" + response.data.data.content);
                      comment = "简介：" + response.data.data.content.toString();
                    } else {
                      //det.push("简介：" + "无");
                      comment = "简介：" + "无";
                    }

                    //det.push("一户一码：");
                    //det.push("<img src='" + response.data.data.qrCode.toString().replace(/"/g, "") + "'>");
                    qrCode = response.data.data.qrCode.toString().replace(/"/g, "");
                    // det.push(" ");
                    // det.push(" ");
                    // det.push(" ");
                    // det.push(" ");
                    // det.push(" ");
                    // det.push(" ");


                    if (response.data.data.audio != "") {
                      // det.push("<audio controls  >" +
                      //   "<source src='" + response.data.data.audio.toString().replace(/"/g, "") + "' type='audio/mp3'>" +

                      //   "</audio>")
                      audiosrc = response.data.data.audio.toString().replace(/"/g, "");
                      // console.log(response.data.data.video.toString().replace(/"/g, ""))
                      // console.log(response.data.data.picture.toString().replace(/"/g, ""))
                    } else {
                      audiosrc = "";
                    }



                  }

                  // console.log(response.data.data.name);

                  var infoWindow = new AMap.InfoWindow({
                    isCustom: true,  //使用自定义窗体
                    content: createInfoWindow(title, content.join("<br/>"), imagesrc),
                    offset: new AMap.Pixel(-320, -38)
                  });
                  if (j > marker.length) {
                    infoWindow.open(map, e.target.getPosition());
                  }






                })
                .catch(function (error) {
                  console.log(error);
                })

            }




            function createInfoWindow(title, content, imagesrc) {
              var info = document.createElement("div");
              info.className = "card";
              info.style.width = '460px';
              info.style.height = '328px';

              var titleA = document.createElement("a");
              var text = document.createTextNode(title);
              titleA.appendChild(text);

              var basicA = document.createElement("a");
              basicA.id = 'basicA';
              var text = document.createTextNode("基本信息");
              basicA.appendChild(text);

              // var image = document.createElement("img");
              // image.id = 'img1';
              // image.src = imagesrc;
              // image.onerror = unshow;

              // function unshow() {
              //   image.src = '';

              // }


              var imgnum = imagesrc.length;
              var bannerD = document.createElement("div");
              bannerD.id = "max";
              var reD = document.createElement("div");
              reD.className = "re";
              var ul = document.createElement("ul");
              var ol = document.createElement("ol");
              var lik = [];
              for (var n = 0; n < imgnum; n++) {
                var li = document.createElement("li");
                li.innerHTML = "<img src='" + imagesrc[n] + "'>";
                ul.appendChild(li);
                lik.push(li);
              }
              for (var n = 0; n < imgnum; n++) {

                var oli = document.createElement("li");
                ol.appendChild(oli);
                lik.push(oli);
              }
              console.log(lik);
              reD.appendChild(ul);
              reD.appendChild(ol);
              bannerD.appendChild(reD);


              // var lik = reD.getElementsByTagName("li");
              if (imgnum != 0) {
                function fun(i, j) {//转换图片函数，就是把透明度改了一下
                  lik[i].style.opacity = 1;
                  lik[j].style.opacity = 0;
                  lik[i + imgnum].style.backgroundColor = "#ffffff";//改一下小图标
                  lik[j + imgnum].style.backgroundColor = "#00000000"
                }
                if (imgnum == 1) {
                  lik[0].style.opacity = 1;
                  lik[1].style.backgroundColor = "#ffffff";
                } else {
                  fun(0, 1);
                  var i = 0;
                  function auto() {//轮播循环函数
                    if (++i >= imgnum) {
                      i = 0;
                      fun(0, (imgnum - 1));
                    }
                    else fun(i, i - 1);
                  }
                  var timer = setInterval(auto, 2000);
                  bannerD.onmouseover = function () { //鼠标划上去，停止轮播
                    console.log('good');
                    clearInterval(timer);
                  }
                  bannerD.onmouseout = function () { //鼠标划出，继续轮播
                    timer = setInterval(auto, 2000); //调用定时器
                  }
                  var j = 0;
                  for (; j < imgnum; j++) {//点击小图标也可以转换图片
                    lik[j + imgnum].ind = j;
                    lik[j + imgnum].onclick = function () {
                      fun(this.ind, i)
                      i = this.ind;
                    }
                  }

                }
                // fun(0, 0);//初始化下

              }







              var contentD = document.createElement("div");
              contentD.id = 'contentD';
              contentD.innerHTML = content;
              contentD.style.backgroundColor = 'transparent';





              var top = document.createElement("div");
              top.className = "info-top";
              var closeX = document.createElement("img");
              closeX.src = "导航+弹窗1_slices/组 32(1).png";
              closeX.onclick = closeInfoWindow;
              top.appendChild(closeX);

              var middle = document.createElement("div");
              middle.className = "info-middle";
              var rect = document.createElement("img");
              rect.src = "导航+弹窗1_slices/矩形 584.png";
              middle.appendChild(rect);


              var bottom = document.createElement("div");
              bottom.className = "info-bottom";
              var sharp = document.createElement("img");
              sharp.src = "导航+弹窗1_slices/形状 10.png";
              bottom.appendChild(sharp);
              //可以通过下面的方式修改自定义窗体的宽高
              //info.style.width = "400px";
              // 定义顶部标题
              // var top = document.createElement("div");
              // var titleD = document.createElement("div");
              // var closeX = document.createElement("img");
              // top.className = "info-top";

              // titleD.innerHTML = title;
              // closeX.src = "导航+弹窗1_slices/组 32(1).png";
              // closeX.onclick = closeInfoWindow;

              // top.appendChild(titleD);
              // top.appendChild(closeX);
              // info.appendChild(top);
              info.appendChild(top);
              info.appendChild(middle);
              info.appendChild(bottom);
              info.appendChild(titleA);
              info.appendChild(basicA);
              info.appendChild(bannerD);
              info.appendChild(contentD);


              // // 定义中部内容
              // var middle = document.createElement("div");
              // middle.className = "info-middle";
              // middle.style.backgroundColor = 'white';
              // middle.innerHTML = content;


              var detail_button = document.createElement("div");
              detail_button.id = "detail_button";
              detail_button.style.backgroundColor = 'transparent';

              detail_button.innerHTML = "<a href='javascript:void(0);'>详细信息</a>";
              detail_button.onclick = detailOnclick;

              info.appendChild(detail_button);

              // // 定义底部内容
              // var bottom = document.createElement("div");
              // bottom.className = "info-bottom";
              // bottom.style.position = 'relative';
              // bottom.style.top = '0px';
              // bottom.style.margin = '0 auto';
              // var sharp = document.createElement("img");
              // sharp.src = "https://webapi.amap.com/images/sharp.png";
              // bottom.appendChild(sharp);
              // info.appendChild(bottom);

              return info;
            }

            var closeInfoWindow = () => {
              this.map.clearInfoWindow();

              // ee.target.setLabel(null);
            }



            var detailOnclick = () => {


              // ee.target.setLabel({

              //   //设置文本标注偏移量
              //   //content: createInfoWindow(title, content.join("<br/>")), //设置文本标注内容
              //   content: html, //设置文本标注内容
              //   direction: 'right',//设置文本标注方位
              //   offset: new AMap.Pixel(140, -110)
              // });

              this.centerDialogVisible = true
              this.tt = title
              this.type = type
              this.visibility = false;
              this.html = det.join("<br/>");

              this.imagesrc_d = imagesrc;
              this.videosrc = videosrc;
              this.audiosrc = audiosrc;

              var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
              comment = comment.replace(reg, `<a href='$1$2' style='color: #7AFFA6;' target='_blank'>${title}</a>`);
              this.comment = comment;
              this.qrCode = qrCode;

            }






          }).catch(e => {
            console.log(e);
          })






          //console.log(data);

        })
        .catch(function (error) {
          console.log(error);
        });

    },


    all() {
      this.map.clearInfoWindow();
      this.sencondorder = false;
      var markers = this.marker;
      for (var i = 0; i < markers.length; i++) {
        markers[i].show()
      }

      var x = document.getElementById("all");
      x.className = "active";
      var x1 = document.getElementById("public");
      x1.className = "";
      // var x2 = document.getElementById("scenery");
      // x2.className = "";
      var x3 = document.getElementById("famer");
      x3.className = "";
      var x4 = document.getElementById("cooperator");
      x4.className = "";
      var x5 = document.getElementById("party");
      x5.className = "";
      var x6 = document.getElementById("old");
      x6.className = "";
      var x7 = document.getElementById("invite");
      x7.className = "";
      var x8 = document.getElementById("ordinary");
      x8.className = "";

      var xs = document.getElementById("all_s");
      xs.className = "active";
      var xs1 = document.getElementById("public_s");
      xs1.className = "";

      var xs3 = document.getElementById("famer_s");
      xs3.className = "";
      var xs4 = document.getElementById("cooperator_s");
      xs4.className = "";


      console.log("all");
    },

    public() {
      this.map.clearInfoWindow();
      this.sencondorder = false;
      var markers = this.marker;
      for (var i = 0; i < markers.length; i++) {
        if (markers[i].getExtData().code != "1") {
          markers[i].hide();
        } else {
          markers[i].show();
        }

      }

      var x = document.getElementById("public");
      x.className = "active";
      var x1 = document.getElementById("all");
      x1.className = "";
      // var x2 = document.getElementById("scenery");
      // x2.className = "";
      var x3 = document.getElementById("famer");
      x3.className = "";
      var x4 = document.getElementById("cooperator");
      x4.className = "";
      var x5 = document.getElementById("party");
      x5.className = "";
      var x6 = document.getElementById("old");
      x6.className = "";
      var x7 = document.getElementById("invite");
      x7.className = "";
      var x8 = document.getElementById("ordinary");
      x8.className = "";

      var xs = document.getElementById("public_s");
      xs.className = "active";
      var xs1 = document.getElementById("all_s");
      xs1.className = "";

      var xs3 = document.getElementById("famer_s");
      xs3.className = "";
      var xs4 = document.getElementById("cooperator_s");
      xs4.className = "";

    },
    // scenery() {
    //   this.map.clearInfoWindow();

    //   var markers = this.marker;
    //   for (var i = 0; i < markers.length; i++) {
    //     if (markers[i].getExtData().code != "0") {
    //       markers[i].hide();
    //     } else {
    //       markers[i].show();
    //     }

    //   }

    //   var x = document.getElementById("scenery");
    //   x.className = "active";
    //   var x1 = document.getElementById("all");
    //   x1.className = "";
    //   var x2 = document.getElementById("public");
    //   x2.className = "";
    //   var x3 = document.getElementById("famer");
    //   x3.className = "";
    //   var x4 = document.getElementById("cooperator");
    //   x4.className = "";


    // },
    famer() {
      this.map.clearInfoWindow();

      if (this.sencondorder == true) {
        this.sencondorder = false

      } else {
        this.sencondorder = true

      }



      var markers = this.marker;
      for (var i = 0; i < markers.length; i++) {
        if (markers[i].getExtData().code != "3") {
          markers[i].hide();
        } else {
          markers[i].show();
        }

      }

      var x = document.getElementById("famer");
      x.className = "active";
      var x1 = document.getElementById("public");
      x1.className = "";
      // var x2 = document.getElementById("scenery");
      // x2.className = "";
      var x3 = document.getElementById("all");
      x3.className = "";
      var x4 = document.getElementById("cooperator");
      x4.className = "";
      var x5 = document.getElementById("party");
      x5.className = "";
      var x6 = document.getElementById("old");
      x6.className = "";
      var x7 = document.getElementById("invite");
      x7.className = "";
      var x8 = document.getElementById("ordinary");
      x8.className = "";

      var xs = document.getElementById("famer_s");
      xs.className = "active";
      var xs1 = document.getElementById("public_s");
      xs1.className = "";

      var xs3 = document.getElementById("all_s");
      xs3.className = "";
      var xs4 = document.getElementById("cooperator_s");
      xs4.className = "";


    },

    cooperator() {
      this.map.clearInfoWindow();
      this.sencondorder = false;
      var markers = this.marker;
      for (var i = 0; i < markers.length; i++) {
        if (markers[i].getExtData().code != "2") {
          markers[i].hide();
        } else {
          markers[i].show();
        }

      }

      var x = document.getElementById("cooperator");
      x.className = "active";
      var x1 = document.getElementById("public");
      x1.className = "";
      // var x2 = document.getElementById("scenery");
      // x2.className = "";
      var x3 = document.getElementById("all");
      x3.className = "";
      var x4 = document.getElementById("famer");
      x4.className = "";
      var x5 = document.getElementById("party");
      x5.className = "";
      var x6 = document.getElementById("old");
      x6.className = "";
      var x7 = document.getElementById("invite");
      x7.className = "";
      var x8 = document.getElementById("ordinary");
      x8.className = "";

      var xs = document.getElementById("cooperator_s");
      xs.className = "active";
      var xs1 = document.getElementById("public_s");
      xs1.className = "";

      var xs3 = document.getElementById("all_s");
      xs3.className = "";
      var xs4 = document.getElementById("famer_s");
      xs4.className = "";


    },

    party() {

      this.map.clearInfoWindow();

      var markers = this.marker;
      for (var i = 0; i < markers.length; i++) {
        if (!markers[i].getExtData().dutycode) {
          markers[i].hide();
        } else {
          if (markers[i].getExtData().dutycode == "1") {
            markers[i].show();
          } else {
            markers[i].hide();
          }


        }

      }


      var x = document.getElementById("all");
      x.className = "";
      var x1 = document.getElementById("public");
      x1.className = "";
      var x3 = document.getElementById("famer");
      x3.className = "";
      var x4 = document.getElementById("cooperator");
      x4.className = "";
      var x5 = document.getElementById("party");
      x5.className = "active";
      var x6 = document.getElementById("old");
      x6.className = "";
      var x7 = document.getElementById("invite");
      x7.className = "";
      var x8 = document.getElementById("ordinary");
      x8.className = "";

      var xs = document.getElementById("all_s");
      xs.className = "";
      var xs1 = document.getElementById("public_s");
      xs1.className = "";

      var xs3 = document.getElementById("famer_s");
      xs3.className = "";
      var xs4 = document.getElementById("cooperator_s");
      xs4.className = "";

    },
    old() {

      this.map.clearInfoWindow();

      var markers = this.marker;
      for (var i = 0; i < markers.length; i++) {
        if (!markers[i].getExtData().dutycode) {
          markers[i].hide();
        } else {
          if (markers[i].getExtData().dutycode == "3") {
            markers[i].show();
          } else {
            markers[i].hide();
          }


        }

      }


      var x = document.getElementById("all");
      x.className = "";
      var x1 = document.getElementById("public");
      x1.className = "";
      var x3 = document.getElementById("famer");
      x3.className = "";
      var x4 = document.getElementById("cooperator");
      x4.className = "";
      var x5 = document.getElementById("party");
      x5.className = "";
      var x6 = document.getElementById("old");
      x6.className = "active";
      var x7 = document.getElementById("invite");
      x7.className = "";
      var x8 = document.getElementById("ordinary");
      x8.className = "";

      var xs = document.getElementById("all_s");
      xs.className = "";
      var xs1 = document.getElementById("public_s");
      xs1.className = "";

      var xs3 = document.getElementById("famer_s");
      xs3.className = "";
      var xs4 = document.getElementById("cooperator_s");
      xs4.className = "";

    },
    invite() {

      this.map.clearInfoWindow();

      var markers = this.marker;
      for (var i = 0; i < markers.length; i++) {
        if (!markers[i].getExtData().dutycode) {
          markers[i].hide();
        } else {
          if (markers[i].getExtData().dutycode == "2") {
            markers[i].show();
          } else {
            markers[i].hide();
          }


        }

      }


      var x = document.getElementById("all");
      x.className = "";
      var x1 = document.getElementById("public");
      x1.className = "";
      var x3 = document.getElementById("famer");
      x3.className = "";
      var x4 = document.getElementById("cooperator");
      x4.className = "";
      var x5 = document.getElementById("party");
      x5.className = "";
      var x6 = document.getElementById("old");
      x6.className = "";
      var x7 = document.getElementById("invite");
      x7.className = "active";
      var x8 = document.getElementById("ordinary");
      x8.className = "";

      var xs = document.getElementById("all_s");
      xs.className = "";
      var xs1 = document.getElementById("public_s");
      xs1.className = "";

      var xs3 = document.getElementById("famer_s");
      xs3.className = "";
      var xs4 = document.getElementById("cooperator_s");
      xs4.className = "";

    },
    ordinary() {
      this.map.clearInfoWindow();

      var markers = this.marker;
      for (var i = 0; i < markers.length; i++) {
        if (!markers[i].getExtData().dutycode) {
          markers[i].hide();
        } else {
          if (markers[i].getExtData().dutycode == "4") {
            markers[i].show();
          } else {
            markers[i].hide();
          }


        }

      }


      var x = document.getElementById("all");
      x.className = "";
      var x1 = document.getElementById("public");
      x1.className = "";
      var x3 = document.getElementById("famer");
      x3.className = "";
      var x4 = document.getElementById("cooperator");
      x4.className = "";
      var x5 = document.getElementById("party");
      x5.className = "";
      var x6 = document.getElementById("old");
      x6.className = "";
      var x7 = document.getElementById("invite");
      x7.className = "";
      var x8 = document.getElementById("ordinary");
      x8.className = "active";

      var xs = document.getElementById("all_s");
      xs.className = "";
      var xs1 = document.getElementById("public_s");
      xs1.className = "";

      var xs3 = document.getElementById("famer_s");
      xs3.className = "";
      var xs4 = document.getElementById("cooperator_s");
      xs4.className = "";
    }

  },
  mounted() {
    this.initChart();

  },

}
</script>

<style>
.footer {
  display: flex;
  position: fixed;
  top: 5%;
  left: 20%;
  right: 20%;


  opacity: 0.8;


}


.footer .tab {
  flex: 1;
  text-align: center;
  box-sizing: border-box;
  padding: 0px 0;


}



.icon {
  display: block;

}

.icon img {
  margin-top: 5px;
  width: 16px;
  height: 16px;
}

.footer .tab a {
  position: fixed;
  /* width:100px;
    height: 0;
    border-width:0 15px 50px 15px;
    border-style:solid solid solid;
    border-color:transparent transparent #57a5e0;  */

  /* border-top: 40px solid #57a5e0;
				border-left: 25px solid transparent;
				border-right: 25px solid transparent;
				height: 0;
				width: 100px; */


  display: block;

  line-height: 20px;

  width: 130px;
  height: 50px;
  /* box-shadow: 0px 3px 50px 1px rgba(44,69,46,0.29); */

}

.footer .tab a::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  background: linear-gradient(transparent, #83fdef);
  transform: perspective(.5em) rotateX(-2deg);
  box-shadow: 0px 3px 50px 1px rgba(44, 69, 46, 0.29);

  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}





.footer .tab span.active {

  /* position: absolute;
  top:  0px; */
  width: 40px;
  height: 20px;
  font-size: 20px;
  font-family: FZYANS_CUJW--GB1-0;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 45px;
  /* text-shadow: 2px 4px 3px rgba(93, 92, 99, 0.66); */

  background: linear-gradient(0deg, #FFE2B5 0%, #FFFFFF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer .tab span.active ::before {
  content: "";
  /* position: absolute;
  top:  0px; */
  z-index: -1;
  color: #FFFFFF;

  text-shadow: none;
  display: block;
  position: absolute;

  /* background: linear-gradient(0deg, #FFE2B5 0%, #FFFFFF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
  text-shadow: 2px 4px 3px rgba(93, 92, 99, 0.66);
}



.footer .tab span {


  width: 79px;
  height: 20px;
  font-size: 20px;
  font-family: FZYANS_CUJW--GB1-0;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 45px;
  /* text-shadow: 2px 4px 3px rgba(93, 92, 99, 0.66); */

  background: linear-gradient(0deg, #A7FFF4 0.244140625%, #FFFFFF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer .tab span ::before {
  width: 79px;
  height: 20px;
  content: "";

  position: absolute;
  z-index: -1;
  color: #FFFFFF;
  /* background: linear-gradient(0deg, #A7FFF4 0.244140625%, #FFFFFF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
  text-shadow: 2px 4px 3px rgba(93, 92, 99, 0.66);
}

/* 更改悬停时链接的颜色 */
/* .footer .tab a:hover {
  background-color: #34daae;
 
  
}  */

.footer .tab a:hover ::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;

  background: linear-gradient(transparent, #5fb9ae);
  transform: perspective(.4em) rotateX(-2deg);
  box-shadow: 0px 3px 50px 1px rgba(44, 69, 46, 0.29);
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

.footer .tab a.active:hover ::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;

  background: linear-gradient(transparent, #c9a877);
  transform: perspective(.4em) rotateX(-2deg);
  box-shadow: 0px 3px 50px 1px rgba(44, 69, 46, 0.29);
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

/* 为 active/current 链接添加颜色 */
/* .footer .tab a.active {
  
  background-color: #e0c057;
  color: white;
 
} */

.footer .tab a.active::before {
  /* border-color:transparent transparent #e0c057; */
  /* background-color: #e0c057; */
  background: linear-gradient(transparent, #fcd395);
  color: white;


  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;

  transform: perspective(.5em) rotateX(-2deg);
  box-shadow: 0px 3px 50px 1px rgba(44, 69, 46, 0.29);
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;

}

.triangle {

  display: flex;
  position: fixed;
  top: 11.8%;
  left: 53%;

  opacity: 0.8;

  width: 0;
  height: 0;
  border-top: 20px solid #11E5C0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;

}

.kuai {

  display: flex;
  position: absolute;
  top: 14.5%;
  left: 50%;

  width: 129px;
  height: 34px;
  border: 1px solid #72EDFC;
  background-color: transparent;
  opacity: 0.85;

}

.back {

  position: absolute;
  top: 14.5%;
  left: 50%;
  width: 129px;
  height: 34px;
  background-color: #0a2b25;
  border: 1px solid #07DDB7;
  opacity: 0.26;
}

.kuai:hover {
  background-color: #34daae;
}

.kuai .active {

  background-color: #e0c057;
  color: white;
}


.kuai a {
  margin-left: 5px;
  width: 50px;
  height: 16px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 30px;

}

.kuai .icon {
  margin-left: 25px;
  margin-top: 4px;
  width: 25px;
  height: 25px;

}





#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style>
html,
body,
#container {
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 0;

}


.changeShow-enter-from,
.changeShow-leave-to {
  height: 0 !important;
}

.changeShow-enter-active,
.changeShow-leave-active {
  transition-property: opacity margin;
  transition-duration: .5s;
}

.changeShow-enter-active {
  transition-delay: .25s;
}

.changeShow-enter,
.changeShow-leave-active {
  opacity: 0;
  margin-top: 50px;
}






.el-dialog,
.el-pager li {
  background: transparent !important;

}





.el-dialog-custom .el-dialog__header {

  display: none;
}

.el-dialog-custom .el-dialog__body {



  background-image: url('../public/弹窗2_slices/组 32.png');
  height: 527px;
  width: 462px;

}

.el-dialog-custom .el-dialog__footer {
  display: none;
}

.el-dialog-custom .detail_cancel {
  position: absolute;
  top: 6px;
  left: 463px;

}

.el-dialog-custom .detail_cancel img:hover {
  box-shadow: 0px 0px 5px #000;
}

.el-dialog-custom .rect583 {
  position: absolute;
  top: 70px;
  left: 44px;

}

.el-dialog-custom .rect584 {
  position: absolute;
  top: 80px;
  left: 180px;

}

.el-dialog-custom .group30 {
  position: absolute;
  top: 215px;
  left: 44px;

}

.el-dialog-custom .rect583copy2 {
  position: absolute;
  top: 300px;
  left: 44px;

}

.el-dialog-custom .rect583copy2_2 {
  position: absolute;
  top: 100px;
  left: 550px;
}

#img2 {
  position: absolute;
  top: 72px;
  left: 45px;
  width: 100px;
}

.el-dialog-custom .info-middle {
  position: absolute;
  top: 100px;
  left: 180px;
  width: 200px;
  font-size: 12px;
  line-height: 20px;
  font-family: FZYanSongS-B-GB;
  font-weight: 400;
  color: #FEFEFF;
}

#qrcode {
  position: absolute;
  top: 40px;
  left: 50px;
  height: 200px;
}

#qrinfo {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 200px;
  font-size: 15px;
  line-height: 20px;
  font-family: FZYanSongS-B-GB;
  font-weight: 400;
  color: #FEFEFF;
}

#comment {
  position: absolute;
  top: 10px;
  left: 20px;
  width: 400px;
  height: 40px;
  font-size: 10px;
  line-height: 20px;
  font-family: FZYanSongS-B-GB;
  font-weight: 400;
  color: #76967E;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;

}

#titleA {
  position: absolute;
  top: 12px;
  left: 40px;
  height: 23px;
  font-size: 20px;
  font-family: FZYanSongS-B-GB;
  font-weight: 400;
  color: #FEFEFF;
}

#basicinfo {
  position: absolute;
  top: 60px;
  left: 180px;
  height: 23px;
  font-size: 15px;
  font-family: FZYanSongS-B-GB;
  font-weight: 400;
  color: #FEFEFF;
}

#video1 {

  position: absolute;
  top: 10px;
  left: 105px;
  height: 200px;

}

#audio1 {

  position: absolute;
  bottom: 100px;
  left: 105px;
  height: 200px;

}



.card {
  background-image: url('../public/导航+弹窗1_slices/组 32.png');
}

.card .info-top img {
  position: absolute;
  top: 6px;
  right: 38px;
  transition-duration: 0.25s;
}

.card .info-top img:hover {
  box-shadow: 0px 0px 5px #000;
}

.card .info-middle img {
  position: absolute;
  top: 100px;
  right: 212px;
  z-index: 104;
}

.card .info-bottom img {
  position: absolute;
  z-index: 104;
  top: 308px;
  left: 423px;
}

.card a {
  position: absolute;
  top: 12px;
  left: 30px;
  height: 23px;
  font-size: 20px;
  font-family: FZYanSongS-B-GB;
  font-weight: 400;
  color: #FEFEFF;
}


#basicA {
  position: absolute;
  top: 70px;
  left: 223px;
  height: 23px;
  font-size: 15px;
  font-family: FZYanSongS-B-GB;
  font-weight: 400;
  color: #FEFEFF;
}


#img1 {
  position: absolute;
  top: 74px;
  left: 51px;
  width: 150px;


}

#contentD {
  position: absolute;
  top: 130px;
  left: 223px;
  width: 200px;
  font-size: 12px;
  line-height: 30px;
  font-family: FZYanSongS-B-GB;
  font-weight: 400;
  color: #FEFEFF;
}

#detail_button a {
  position: absolute;
  top: 250px;
  left: 223px;
  width: 100px;
  font-size: 12px;
  line-height: 30px;
  font-family: FZYanSongS-B-GB;
  font-weight: 400;
  color: #7AFFA6;
}
</style>

<style>
audio {
  display: block;
  margin: 30px auto;
  width: 250px;
}

video {
  display: block;
  margin: 30px auto;
  width: 250px;
}

#max {
  width: 150px;
  /* height: 500px; */
  /* align-items: center;
  margin: 5% auto;
  margin-top: 0%; */
  position: absolute;
  top: 57px;
  right: 303px;
}

.re {
  position: absolute;

  /* height: 400px; */
}

.re ul {
  list-style-type: none;
}

.re ul>li {
  width: 150px;
  /* height: 300px; */
  position: absolute;

  transition: 1s;
  opacity: 0;
}

.re ul>li img {
  width: 150px;
  /* height: 500px; */
  border-radius: 5%;
  border: 5px solid #fffbd6;
}

#max ol {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(5, 8px);
  grid-template-rows: auto;
  grid-gap: 1em;
  gap: 1em;
  float: right;

  list-style: none;
  top: 200px;
  left: 20px;
}

#max ol li {
  width: 10px;
  height: 5px;
  font-size: 15px;
  line-height: 20px;
  float: left;
  text-align: center;
  border-radius: 2em;
  border: 5px solid #999999;
}

#max1 {
  width: 100px;
  /* height: 500px; */
  /* align-items: center;
  margin: 5% auto;
  margin-top: 0%; */
  position: absolute;
  top: 50px;
  right: 400px;
}

.re1 {
  position: absolute;

  /* height: 400px; */
}

.re1 ul {
  list-style-type: none;
}

.re1 ul>li {
  width: 100px;
  /* height: 300px; */
  position: absolute;

  transition: 1s;
  opacity: 0;
}

.re1 ul>li img {
  width: 100px;
  /* height: 500px; */
  border-radius: 3%;
  border: 3px solid #fffbd6;
}

#max1 ol {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(5, 5px);
  grid-template-rows: auto;
  grid-gap: 1em;
  gap: 1em;
  float: right;

  list-style: none;
  top: 130px;
  left: 10px;
}

#max1 ol li {
  width: 8px;
  height: 4px;
  font-size: 15px;
  line-height: 20px;
  float: left;
  text-align: center;
  border-radius: 2em;
  border: 4px solid #999999;
}
</style>


