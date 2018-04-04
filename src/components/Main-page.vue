<template>
  <v-container class="wrapp" grid-list-md text-xs-center>
    <v-layout row wrap>
      <!-- Login in app ===================================-->
      <v-flex xs12>
        <Welcom v-if="!name" />
      </v-flex>
      <!-- Content ==========================================-->
      <v-flex xs12 v-if="name">
      <!-- Header section -->
        <v-flex xs12>
          <v-layout justify-space-around>
            <div class="hero">{{name}}</div>
            <v-btn color="red" @click="nameClear">Выйти</v-btn>
          </v-layout>
        </v-flex>
        <!-- main section -->
        <v-flex xs12>
          <h2>Список задач.</h2>
          <!-- Form tasks -->
          <v-form class="form">
            <v-text-field
              label="введите задачу..."
              v-model="task"
              class="input"
              @keyup.enter="submit"
            ></v-text-field>
            <v-btn
              @click="submit"
            >
              submit
            </v-btn>
          </v-form>
          <!-- View Tasks -->
          <ul class="list">
            <li v-for="(item) of tasks" :key="item.id" 
                :id=item.id 
                v-if="!item.done"
                class="list__item">
              <p>{{item.plan}}</p>
              <div> 
                <input type="checkbox" @click="doneTask($event)" id="del" hidden>
                <label for="del" class="icon">
                  <svg style="width:100%;height:100%;" viewBox="0 0 24 24">
                      <path fill="#000000" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                  </svg>
                </label>
              </div>
            </li>
          </ul>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Welcom from './Welcom'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    Welcom
  },
  data: () => ({
    task: '',
  }),
  computed: {
     ...mapState([
      'name',
      'tasks'
    ])
  },
  methods: {
    ...mapMutations([
      'nameSet',
      'nameClear',
      'addTask',
      'doneTask'
    ]),
    submit() {
      this.$store.commit('addTask', this.task);
      this.task = '';
    }
  }
}
</script>

<style lang="scss" scoped>
.hero{
  font-size: 1.3rem;
  font-family: cursive, Arial, Helvetica, sans-serif;
}
.list__item{
  display: flex;
  justify-content: space-between;
  text-align: left;
  background: #2196F3;
  margin-bottom: 10px;
  p{
    margin: 0;
    padding: 1%;
    font-size: 1.4rem;
    width: 100%;
  }
}
.form{
  background: #607D8B;
  text-align: center;
  .input{
     background: rgba(26, 1, 1, 0.726);
     color: rgb(64, 105, 218);
  }
}
.icon{
  width: 100px;
  height: 100%;
  cursor: pointer;
  transition: 1s;
  &:hover{
   svg path{
     fill: wheat;
   }
  }
}
</style>
