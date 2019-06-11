<template>
  <div>
    <b-alert
      :show="!isMapLoaded"
      variant="danger">
      もうしわけありません。人気のためか、Yahoo様のアクセス制限に達してしまったようです。＼('jjj')／
      １日で利用カウントがリセットされますのでまた明日にでもご利用おねがいします。
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'AccessLimit',
  computed: {
    isMapLoaded: () => {
      return 'Y' in window;
    }
  }
};
</script>
