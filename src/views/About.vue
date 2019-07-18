<template>
  <div class="about">
    <h5>
      <i
        class="fas fa-info-circle"
        style="color:blue;" /> About
    </h5>
    <b-container
      fluid
      class="text-left">
      <b-card>
        禁煙なお店を簡単に探せるサービスです。
        お気に入りのお店を保存することもできます。
      </b-card>
      <h4 class="mt-4">
        Acknowledgment
      </h4>
      <b-list-group>
        <b-list-group-item>
          <b-link
            href="https://developer.yahoo.co.jp/about/"
            rel="noopener nofollow"
            target="_blank">
            Web Services by Yahoo! JAPAN
          </b-link>
        </b-list-group-item>
        <b-list-group-item>
          <b-link
            href="https://firebase.google.com/"
            rel="noopener nofollow"
            target="_blank">
            Firebase
          </b-link>
        </b-list-group-item>
        <b-list-group-item>
          <b-link
            href="https://jp.vuejs.org/"
            rel="noopener nofollow"
            target="_blank">
            Vue.js
          </b-link>
        </b-list-group-item>
        <b-list-group-item>
          Icons made by <b-link
            href="https://www.flaticon.com/authors/wanicon"
            rel="noopener nofollow"
            target="_blank"
            title="wanicon">
            wanicon
          </b-link> from <b-link
            href="https://www.flaticon.com/"
            rel="noopener nofollow"
            target="_blank"
            title="Flaticon">
            www.flaticon.com
          </b-link> is licensed by <b-link
            href="http://creativecommons.org/licenses/by/3.0/"
            rel="noopener nofollow"
            title="Creative Commons BY 3.0"
            target="_blank">
            CC 3.0 BY
          </b-link>
        </b-list-group-item>
        <b-list-group-item>
          Icons made by <b-link
            href="http://www.freepik.com/"
            rel="noopener nofollow"
            target="_blank"
            title="Freepik">
            Freepik
          </b-link> from <b-link
            href="https://www.flaticon.com/"
            rel="noopener nofollow"
            target="_blank"
            title="Flaticon">
            www.flaticon.com
          </b-link> is licensed by <b-link
            href="http://creativecommons.org/licenses/by/3.0/"
            rel="noopener nofollow"
            title="Creative Commons BY 3.0"
            target="_blank">
            CC 3.0 BY
          </b-link>
        </b-list-group-item>
        <b-list-group-item>
          <b-link
            href="https://fontawesome.com/license/free"
            rel="noopener nofollow"
            target="_blank"> 
            Font Awesome Free License
          </b-link>
        </b-list-group-item>
      </b-list-group>
      <h4 class="mt-4">
        Privacy Policy
      </h4>
      <b-list-group>
        <b-list-group-item><PrivacyPolicy /></b-list-group-item>
      </b-list-group>
    </b-container>
  </div>
</template>

<script>
import PrivacyPolicy from '@/components/PrivacyPolicy.vue';

export default {
  name: 'About',
  components: {
    PrivacyPolicy: PrivacyPolicy
  },
  data() {
    return {
    };
  },
  created: function() {
  },
  methods: {
  }
};
</script>
