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
                  {{ f.Property.Rating }}</span>
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
      featureList: [],
    };
  },
  computed: {
    resultFeature: function() {
      return this.feature;
    },
    favorite: function() {
      return this.$store.state.favorite;
    }
  },
  watch: {
    resultFeature: function() {
      // お気に入りかを合成
      this.featureList = [];
      for (let f of this.feature) {
        if (this.favorite) f.favorite = this.favorite[f.Gid] !== undefined;
        this.featureList.push(f);
      }
      this.$emit('changeFavorite');
    },
  },
  created: function() {
    this.$store.commit('storageToFavorite');
  },
  mounted: function() {
    // console.table(this.resultFeature);
  },
  methods: {
    unescapeString(source) {
      let str = source;
      str = str.replace(/&amp;/g, '&');
      str = str.replace(/<[^>]*>/g, '');
      return str;
    },
    setFavorite: function(index) {
      const feature = this.featureList[index];
      const fav = feature.favorite;

      this.featureList[index].favorite = !fav;
      this.featureList = Object.assign({}, this.featureList, {});

      if (!fav) {
        this.$store.commit('addFavorite', feature);
      } else {
        this.$store.commit('removeFavorite', feature);
      }
      this.$emit('changeFavorite');
    }
  }
};
</script>

<style scoped>
.actBtn {
  width:48px;
}
</style>
