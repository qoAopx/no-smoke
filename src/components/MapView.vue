<template>
  <div id="map_frame">
    <div id="map" />
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';
import analytics from '@/firebase/analytics';

export default {
  name: 'MapView',
  // eslint-disable-next-line vue/require-prop-types
  props: ['feature', 'center'],
  data() {
    return {
      google: null,
      map: null,
      markers: []
    };
  },
  computed: {
    resultFeature: function() {
      return this.feature;
    },
    resultCenter: function() {
      return this.center;
    }
  },
  watch: {
    resultFeature: function() {
      this.refreshFeature();
    },
    resultCenter: function() {
      this.moveCenter();
    },
  },
  mounted: function() {
    this.initMap();
  },
  methods: {
    initMap: function() {
      GoogleMapsApiLoader({
        apiKey: process.env.VUE_APP_GOOGLEMAP_APIKEY
      }).then((google) => {
        this.google = google;
        const opts = {
          center: new this.google.maps.LatLng(35.66572, 139.731),
          zoom: 16
        };
        const mapContainer = this.$el.querySelector('#map');
        this.map = new this.google.maps.Map(mapContainer, opts);
        this.map.addListenerOnce('tilesloaded', this.initializeMap());
      });
      return true;
    },
    initializeMap: function() {
      const _vm = this;
      const mapHandle = () => {
        const obj = {
          center: this.map.getCenter(),
          bounds: this.map.getBounds()
        };
        _vm.$emit('moveEnd', obj);
      };
      this.map.addListener('dragend', mapHandle);
      this.map.addListener('tilesloaded', mapHandle);
      //this.map.addListener('center_changed', mapHandle);
      //this.map.addListener('bounds_changed', mapHandle);
    },
    moveCenter: function() {
      if (!this.resultCenter.coords) return false;
      //console.log('moveCenter3', this.resultCenter.coords);
      const lat = this.resultCenter.coords.latitude;
      const lon = this.resultCenter.coords.longitude;
      this.map.panTo(new this.google.maps.LatLng(lat, lon));
    },
    refreshFeature: function() {
      if (!this.map) return false;
      this.clearFeature();
      this.putFeature();
      this.setGtags();
    },
    clearFeature: function() {
      for (let marker of this.markers) {
        marker.setMap(null);
      }
    },
    putFeature: function() {
      let index = 0;
      for (let f of this.resultFeature) {
        ++index;
        const p = f.Geometry.Coordinates.split(',');
        const latlng = new this.google.maps.LatLng(p[1], p[0]);
        const marker = new this.google.maps.Marker({
          position: latlng,
          title: '[' + f.Category.join(',') + '] ' + f.Name,
          icon: {
            url: this.mapIconImageUrl(index, f), //アイコンのURL
            scaledSize: new this.google.maps.Size(21, 34) //サイズ
          }
        });
        const infowindow = new this.google.maps.InfoWindow({
          content: '[' + f.Category.join(',') + '] ' + f.Name
        });
        marker.addListener('click', ()=>{
          infowindow.open(this.map, marker);
        });
        marker.setMap(this.map);
        this.markers.push(marker);
      }
    },
    mapIconImageUrl: (char, feature) => {
      //console.log(char, feature.favorite);
      const fillColor = feature.favorite ? 'FF9999' : 'FAFA99';
      const strColor = feature.favorite ? '000000' : '000000';
      return `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=${char}|${fillColor}|${strColor}`;
    },
    setGtags: function() {
      analytics.search(this.map.getCenter().toString());
    }
  }
};
</script>

<style scoped>
#map_frame {
  margin: 0;
  padding: 0;
  height: 50vh;
  border: 1px solid #666666;
}
#map {
  z-index:1;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
