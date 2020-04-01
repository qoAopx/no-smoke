<template>
  <div>
    <div>
      <h5>
        <i
          class="fas fa-star"
          style="color:orange;" />
        {{ feature.length }} Favorite<span v-if="feature.length > 1">s</span>
      </h5>
      <b-alert
        class="mt-2"
        :show="feature.length === 0"
        fade
        variant="warning">
        お気に入りの店がが登録されていません。
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
    <span ref="mapline" />
    <map-view
      :feature="feature"
      :center="center" />      
    <div>
      <FavoriteFeatureList
        :feature="feature"
        @moveCenter="moveCenter" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MapView from '@/components/MapView.vue';
import FavoriteFeatureList from '@/components/FavoriteFeatureList.vue';

export default {
  name: 'Favorite',
  components: {
    'map-view': MapView,
    FavoriteFeatureList: FavoriteFeatureList
  },
  data() {
    return {
      isGPS: false,
      center: null, 
      feature: []
    };
  },
  computed: {
    favorite: function() {
      return this.$store.state.favorite ? this.$store.state.favorite : {};
    }
  },
  watch: {
    favorite: function() {
      this.favoriteToFeature();
    }
  },
  created: function(){
    this.$store.commit('storageToFavorite');
    // this.currentPosition();
    this.favoriteToFeature();
  },
  mounted: function() {
  },
  methods: {
    currentPosition: function() {
      this.isGPS = true;
      navigator.geolocation.getCurrentPosition(
        (pos)=>{
          //console.log(pos.coords);
          this.isGPS = false;
          this.center = pos;
        },
        (err)=>{
          console.error(err);
          this.isGPS = false;
        }, {enableHighAccuracy: false});
    },
    favoriteToFeature: function() {
      this.feature = [];
      for (let k of Object.keys(this.favorite)) {
        this.feature.push(this.favorite[k]);
      }
    },
    moveCenter: function(feature) {
      this.$refs.mapline.scrollIntoView();

      const p = feature.Geometry.Coordinates.split(',');
      const pos = {
        coords: {
          longitude: p[0],
          latitude: p[1]
        }
      };
      this.center = pos;
    }
  }
};
</script>
