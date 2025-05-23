<template>
  <PageContent>
    <div class="news">
      <Title text="Новости" />
      <NewsItem
        v-if="items"
        :items="items"
        @success="async () => await newsStore.fetchAllNews()"
      />
    </div>
  </PageContent>
</template>

<script lang="ts" setup>
  import { PageContent, Title } from '@/components';
  import { NewsItem } from '@/entities/news';
  import { useNewsStore } from '@/entities/news/model';
  import { computed, onMounted } from 'vue';

  const newsStore = useNewsStore();
  const items = computed(() => newsStore.news);

  onMounted(async () => {
    await newsStore.fetchAllNews();
  });
</script>

<style lang="scss" scoped>
  .news {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
</style>
