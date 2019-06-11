<template>
  <b-container>
    <b-card
      class="overflow-hidden"
      no-body>
      <b-row>
        <b-col md="6">
          <img
            alt="Out of service"
            src="@/assets/repair.png"
            class="card-img-top"
            style="margin:auto auto;">
        </b-col>
        <b-col md="6">
          <b-card-body title="サービス休止中...">
            <b-card-text>
              <p>もうしわけありません。Yahoo様のAPIのアクセス制限に達してしまったようです。＼('jjj')／</p>
              <p>１日で利用カウントがリセットされますので、明日にでもご利用おねがいします。</p>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<style scoped>
.outofservice {
  max-width: 540px;
  margin: 10vh auto;
}
</style>