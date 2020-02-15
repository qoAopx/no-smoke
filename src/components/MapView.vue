<template>
  <div id="map_frame">
    <div id="map" />
  </div>
</template>

<script>
import analytics from '@/firebase/analytics';

export default {
  name: 'MapView',
  // eslint-disable-next-line vue/require-prop-types
  props: ['feature', 'center'],
  data() {
    return {
      ymap: null,
      markers: []
    };
  },
  computed: {
    resultFeature: function() {
      return this.feature;
    },
    resultCenter: function() {
      return this.center;
    },
    isMapLoaded: () => {
      return 'Y' in window;
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
      const _vm = this;
      this.ymap = new Y.Map('map', {
        configure: {
          mapType: Y.Map.TYPE.SMARTPHONE,
          doubleClickZoom: true,
          scrollWheelZoom: true
        }
      });
      const ymap = this.ymap;
      ymap.addControl(new Y.ZoomControl());
      const mapHandle = () => {
        const obj = {
          center: ymap.getCenter(),
          bounds: ymap.getBounds()
        };
        _vm.$emit('moveEnd', obj);
      };
      ymap.bind('moveend', mapHandle);
      ymap.bind('zoomend', mapHandle);
      ymap.bind('loaded', mapHandle);
      //ymap.bind('load', mapHandle);
      window.addEventListener('resize', function() {
        ymap.updateSize();
      });
      ymap.drawMap(new Y.LatLng(35.66572, 139.731), 18, Y.LayerSetId.NORMAL);
      return true;
    },
    moveCenter: function() {
      if (!this.resultCenter.coords) return false;
      //console.log('moveCenter3', this.resultCenter.coords);
      const lat = this.resultCenter.coords.latitude;
      const lon = this.resultCenter.coords.longitude;
      const ymap = this.ymap;
      ymap.panTo(new Y.LatLng(lat, lon), true);
    },
    refreshFeature: function() {
      this.clearFeature();
      this.putFeature();
      this.setGtags();
    },
    clearFeature: function() {
      const ymap = this.ymap;
      for (let marker of this.markers) {
        ymap.removeFeature(marker);
      }
    },
    putFeature: function() {
      //console.log('putFeature', this.resultFeature);
      const ymap = this.ymap;
      let index = 0;
      for (let f of this.resultFeature) {
        ++index;
        const p = f.Geometry.Coordinates.split(',');
        let icon = new Y.Icon(this.mapIconImageUrl(index, f), {iconSize: new Y.Size(21, 34)});
        let marker = new Y.Marker(new Y.LatLng(p[1], p[0]), {icon: icon, title: '[' + f.Category.join(',') + '] ' + f.Name});
        //marker.bindInfoWindow(JSON.stringify(f));
        ymap.addFeature(marker);
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
      const ymap = this.ymap;
      analytics.search(ymap.getCenter().toString());
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
