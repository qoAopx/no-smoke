<template>
  <div>
    <div>
      <h5>
        {{ genres.length }} ジャンル選択中 
        <b-badge
          v-if="smoke.length === 1"
          pill
          variant="success">
          禁煙のみ
        </b-badge>
        <b-badge
          v-if="smoke.length > 1"
          pill
          variant="warning">
          分煙も含む
        </b-badge>
      </h5>
      <b-alert
        class="mt-2"
        :show="genres.length === 0"
        fade
        variant="danger">
        ジャンルはひとつ以上選んでください。
      </b-alert>
      <b-button
        variant="outline-primary"
        class="m-4"
        @click.prevent="currentPosition">
        <b-spinner
          v-if="isGPS"
          small
          type="grow"
          variant="success" />
        <i
          v-if="!isGPS"
          class="fas fa-location-arrow" /> 現在地
      </b-button>
    </div>
    <map-view
      ref="map"
      :feature="feature"
      :center="center"
      @moveEnd="moveEnd" />      
    <div>
      <b-alert
        class="mt-2"
        :show="feature.length === 0"
        fade
        variant="warning">
        お店が見つかりませんでした。ジャンルか場所や縮尺を変更してみてください。
      </b-alert>
      <FeatureList
        :feature="feature"
        @changeFavorite="changeFavorite" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueJsonp from 'vue-jsonp';
Vue.use(VueJsonp);
// @ is an alias to /src
import MapView from '@/components/MapView.vue';
import FeatureList from '@/components/FeatureList.vue';

export default {
  name: 'Search',
  components: {
    'map-view': MapView,
    FeatureList: FeatureList
  },
  data() {
    return {
      isGPS: false,
      center: null, 
      bounds: {},
      feature: []
    };
  },
  computed: {
    smoke: function() {
      return this.$store.state.smoke;
    },
    genres: function() {
      return this.$store.state.genres;
    }
  },
  watch: {
    smoke: function() {
      this.localSearch();
    },
    genres: function() {
      this.localSearch();
    }
  },
  created: function(){
    this.$store.commit('storageToFavorite');
    // this.currentPosition();
  },
  methods: {
    currentPosition: function() {
      this.isGPS = true;
      navigator.geolocation.getCurrentPosition(
        (pos)=>{
          console.log(pos);
          this.isGPS = false;
          this.center = pos;
        },
        (err)=>{
          console.error(err);
          this.isGPS = false;
        }, {enableHighAccuracy: false});
    },
    moveEnd: function(map) {
      this.center = map.center;
      this.bounds = map.bounds;
      this.localSearch();
    },
    changeFavorite: function() {
      this.$refs.map.refreshFeature();
    },
    localSearch: function() {
      // エラーチェック
      if (this.genres.length === 0) {
        this.feature = [];
        return false;
      }
      const appid = process.env.VUE_APP_YAHOO_APPID;
      const lat = this.center.lat();
      const lon = this.center.lng();
      const ne = this.bounds.getNorthEast();
      const sw = this.bounds.getSouthWest();
      const bbox = [ne.lat(), ne.lng(), sw.lat(), sw.lng()];
      const smoke = Array.isArray(this.smoke) ? this.smoke.join(',') : '1';
      const gc = Array.isArray(this.genres) ? this.genres.join(',') : '';
      const url = 'https://map.yahooapis.jp/search/local/V1/localSearch';
      this.$jsonp(url,
        {
          callbackQuery: 'callback',
          //callbackName: 'getData',
          output: 'json',
          sort: 'dist',
          device: 'mobile',
          results: 15,
          smoking: smoke,
          appid: appid,
          gc: gc,
          bbox: bbox.join(','),
          lat: lat,
          lon: lon
        }).
        then(json => {
          //console.table(json.ResultInfo);
          this.feature = [];
          if (json.Feature) {
            //this.feature = json.Feature;
            // 範囲チェック
            const arr = [];
            for (let f of json.Feature) {
              const p = f.Geometry.Coordinates.split(',');
              const inRange = Number(p[0]) < Math.max(bbox[1], bbox[3]) &&
                              Number(p[0]) > Math.min(bbox[1], bbox[3]) &&
                              Number(p[1]) < Math.max(bbox[0], bbox[2]) &&
                              Number(p[1]) > Math.min(bbox[0], bbox[2]);
              if (inRange) arr.push(f);
            }
            this.feature = arr;
          }
        }).catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
