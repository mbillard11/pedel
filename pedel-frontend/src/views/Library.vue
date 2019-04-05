<template>
  <el-container v-if="!$route.params.id">
    <el-row>
      <el-col :span="8" v-for="book in bookLibrary" :key="book.id">
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header">
            <span>{{ book.title}}</span>
          </div>
          {{ book.desc}}
          <el-button type="primary" @click="goToBookPage(book.id)">Read this Book</el-button>
        </el-card>
      </el-col>
    </el-row>
  </el-container>

  <el-container v-else>
    <el-row>
      <el-col :span="24">
        <h1>{{ selecedBook.title}}  </h1>
        <p> {{ selecedBook.desc}} </p>
        <component :is="selecedBook.book_title"> </component>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
export default {
  components:{
    Book1: () => import('../books_html/Book1.vue'),
    Book2: () => import('../books_html/Book2.vue'),
    Book3: () => import('../books_html/Book3.vue'),
    Book4: () => import('../books_html/Book4.vue'),
    Book5: () => import('../books_html/Book5.vue')
  },
  data() {
    return {
      bookLibrary: [
        {
          id: 1,
          title: "The Picture of Dorian Gray",
          desc: "Author: Oscar Wilde",
          book_title: 'Book1'
        },
        {
          id: 2,
          title: "A Tale of Two Cities",
          desc: "Author: Charles Dickens",
          book_title: 'Book2',
        },
                {
          id: 3,
          title: "The Strange Case Of Dr. Jekyll And Mr. Hyde",
          desc: "Author: Robert Louis Stevenson",
          book_title: 'Book3'
        },
                {
          id: 4,
          title: "Frankenstein",
          desc: "Author: Mary Wollstonecraft (Godwin) Shelley",
          book_title: 'Book4'
        },
                {
          id: 5,
          title: "Moby Dick",
          desc: "Author: Herman Melville",
          book_title: 'Book5'
        },
      ]
    };
  },
  computed: {
    selecedBook() {
      return this.bookLibrary.filter(i => i.id === parseInt(this.$route.params.id))[0];
    },
  },
  methods: {
    goToBookPage(id) {
      this.$router.push("/book/" + id);
    }
  }
};
</script>

<style>
.table {
  margin: 0 auto;
  float: none;
  margin-bottom: 10px;
}
</style>

