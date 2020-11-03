<template>
  <div>
    <table class="table">
      <thead />
      <tbody>
        <tr
          v-for="(f,i) in featureList"
          :key="i">
          <th
            class="align-top">
            <b-button
              class="actBtn"
              size="sm"
              variant="outline-danger"
              @click.prevent="setFavorite(i)">
              <p class="m-0 p-0">
                {{ Number(i) + 1 }}
              </p>
              <i
                v-if="f.favorite"
                class="fas fa-star"
                style="color:red" />
              <i
                v-if="!f.favorite"
                class="far fa-star"
                style="color:red" />
            </b-button>
          </th>
          <td class="text-left">
            <b-row>
              <b-col
                lg="3"
                sm="12">
                <span style="font-size:x-small;">
                  {{ f.Category.join(',') }}
                  &nbsp;
                  <i
                    v-if="f.Property.Rating"
                    class="fas fa-star"
                    style="color:#ffaaaa;" />
                  {{ f.Property.Rating }}
                </span>
              </b-col>
              <b-col
                lg="6"
                sm="12">
                <span style="font-weight:bold;">{{ unescapeString(f.Name) }}</span>
                <b-link
                  class="ml-2 d-inline-block"
                  :href="`https://loco.yahoo.co.jp/place/g-${f.Gid}/`"
                  target="_blank"
                  rel="noopener nofollow">
                  <i class="fas fa-external-link-alt" /> 詳細
                </b-link>
              </b-col>
              <b-col
                lg="3"
                sm="12"
                class="text-right">
                <b-link
                  v-if="f.Property.Tel1"
                  :href="'tel:'+f.Property.Tel1">
                  <span style="font-size:small;"><i class="fas fa-phone-square" /> {{ f.Property.Tel1 }}</span>
                </b-link>
              </b-col>
              <b-col
                lg="12"
                sm="12">
                <span style="font-size:small;">{{ unescapeString(f.Property.CatchCopy) }}</span>
              </b-col>
            </b-row>
          </td>
          <td
            class="align-top">
            <b-button
              class="actBtn"
              size="sm"
              variant="outline-success"
              @click.prevent="moveCenter(f,i)">
              <p class="m-0 p-0">
                Map
              </p>
              <i class="fas fa-map-marked-alt" />
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'FeatureList',
  // eslint-disable-next-line vue/require-prop-types
  props: ['feature'],
  data() {
    return {
      featureList: []
    };
  },
  computed: {
  },
  watch: {
    feature: function() {
      this.featureList = this.feature;
    }
  },
  created: function() {
    this.featureList = this.feature;
  },
  mounted: function() {
  },
  methods: {
    unescapeString(source) {
      let str = source;
      str = str.replace(/&amp;/g, '&');
      str = str.replace(/<[^>]*>/g, '');
      return str;
    },
    setFavorite: function(index) {
      const feature = this.feature[index];
      this.$store.commit('removeFavorite', feature);
      this.featureList.splice(index, 1);
    },
    moveCenter: function(feature, index) {
      this.$emit('move-center', feature);
      // マップを表示した施設を一番先頭にする。
      const f = this.featureList.splice(index, 1);
      this.featureList.unshift(f[0]);
      // お気に入リストの並びを更新
      const favorite = {};
      for (let ff of this.featureList) {
        favorite[ff.Gid] = ff;
      }
      this.$store.commit('setFavorite', favorite);
    }
  }
};
</script>

<style scoped>
.actBtn {
  width:48px;
}
</style>
