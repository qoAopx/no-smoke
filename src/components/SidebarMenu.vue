<template>
  <BurgerMenu
    width="300"
    v-bind="this.$attrs"
    @openMenu="push"
    @closeMenu="pull">
    <div
      ref="burgermenu"
      class="description">
      禁煙なお店を案内します。
    </div>
    <div class="control">
      <b-button
        to="/favorite"
        variant="info"
        class="mb-2 menu_btn">
        <i class="fas fa-star" /> Favorite List
      </b-button>
      <b-button
        to="/search"
        variant="primary"
        class="mt-2 menu_btn">
        <i class="fas fa-search" /> Search
      </b-button>
    </div>
    <div
      class="search_options"
      @click.stop="()=>{}">
      <b-form-group label="Search Options">
        <b-form-checkbox-group
          v-model="smoke">
          <b-form-checkbox
            v-show="false"
            value="1">
            禁煙
          </b-form-checkbox>
          <b-form-checkbox value="2">
            分煙も許す
          </b-form-checkbox>
        </b-form-checkbox-group>
        <div class="text-right">
          <b-button
            size="sm"
            class="mt-4"
            @click.prevent="allOff">
            すべてのジャンルオフ
          </b-button>
        </div>
        <b-form-checkbox-group
          v-model="selected"
          :options="options"
          switches
          stacked />
      </b-form-group>
    </div>
    <div class="control">
      <b-button
        to="/about"
        variant="success"
        class="mt-2 menu_btn">
        <i class="fas fa-info-circle" /> About
      </b-button>
    </div>
  </BurgerMenu>
</template>

<script>
import { Slide } from 'vue-burger-menu'; // import the CSS transitions you wish to use, in this case we are using `Slide`
import localSearch from '@/genres';

export default {
  name: 'SideBarMenu',
  components: {
    BurgerMenu: Slide,
  },
  data() {
    return {
      smoke: [],
      selected: [], // Must be an array reference!
      options: []
    };
  },
  computed: {
    storeSmoke: function() {
      return this.$store.state.smoke;
    },
    storeGenres: function() {
      return this.$store.state.genres;
    }
  },
  created: function() {
    this.$store.commit('storageToSmoke');
    this.$store.commit('storageToGenres');
    // ジャンルの設定
    for (let genre of localSearch.genres) {
      this.options.push({ text: genre.text, value: genre.value });
      //デフォルト値
      if (genre.selected) {
        this.selected.push(genre.value);
      }
    }

    // 禁煙の設定
    this.smoke = this.storeSmoke;

    // 保存した値があれば設定
    if (this.storeGenres && this.storeGenres.length !== 0) {
      this.selected = this.storeGenres;
    }

    // 設定を保存
    this.$store.commit('genres', this.selected);
    this.$store.commit('smoke', this.smoke);
  },
  methods: {
    openMenu() {
      this.$emit('openMenu');
      this.$refs.burgermenu.scrollIntoView();
    },
    closeMenu() {
      this.$emit('closeMenu');
      this.$store.commit('genres', this.selected);
      this.$store.commit('smoke', this.smoke);
    },
    push() {
      this.openMenu();
    },
    pull() {
      this.closeMenu();
    },
    allOff() {
      this.selected = [];
    }
  }
};
</script>

<style>
.bm-burger-button {
  z-index:100;
  position: absolute !important;
  width: 36px;
  height: 30px;
  left: 5px !important;
  top: 5px !important;
  cursor: pointer;
}
.bm-burger-bars {
  background-color: #373aaa;
}
.line-style {
  position: absolute;
  height: 20%;
  left: 0;
  right: 0;
}
.cross-style {
  position: absolute;
  top: 12px;
  right: 2px;
  cursor: pointer;
}
.bm-cross {
  background: #bdc3c7;
}
.bm-cross-button {
  height: 32px;
  width: 32px;
}
.bm-menu {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Stay on top */
  top: 0;
  left: 0;
  background-color: rgb(63, 63, 65); /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding:0 !important;
  padding-top: 10px; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
  margin:0;
}
.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}
.bm-item-list {
  color: #b8b7ad;
  margin-left: 5%;
  font-size: 18px;
  line-height: 140%;
}
.bm-item-list > * {
  display: flex;
  text-decoration: none;
  line-height: 140%;
}
.bm-item-list > * > span {
  margin-left: 0;
  font-weight: bold;
  color: white;
}
</style>

<style scoped>
.description {
  white-space: nowrap;
}
a {
  white-space: nowrap;
}
a.router-link-exact-active > span {
  color: lightgreen;
}
div.control {
  margin-left:-10px !important;
  display:block;
  text-align: left;
}
div.search_options {
  width: 280px;
  margin-left:-10px !important;
  overflow: hidden;
  white-space: nowrap;
  color: #000;
  font-size: 16px;
  background-color: #dddddd;
  text-align: left;
  margin: 0;
  padding: 0.5;
}
.menu_btn {
  display:block;width:100%;white-space:nowrap;overflow:hidden;
}
</style>
