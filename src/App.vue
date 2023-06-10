<template>
  <div class="ToDo">
    <div class="title has-text-centered">
      FF TODO
    </div>

    <form
    @submit.prevent="AddToDO"
    >
    <div class="field is-grouped mb-5">
      <p class="control is-expanded">
        <input v-model="newContent" class="input" type="text" placeholder="Enter Todo">
      </p>
      <p class="control">
        <button
        :disabled="!newContent"
         class="button is-info">
          Submit
        </button>
      </p>
    </div>
  </form>

    <div v-for=" i in ToDos" 
    class="card mb-3"
    :class="{ 'has-background-success-light' : i.done}">
      <div class="card-content">
        <div class="content">

          <div class="columns is-mobile is-vcentered">
            <div class="column" :class="{ 'has-text-success line-through' : i.done}">
              {{ i.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button @click="tDone(i.id)" class="button" :class=" i.done ? 'is-success':'is-light'">
                &check;
              </button>
              <button 
              @click="deleteToDo(i.id)"
              class="button is-danger ml-2">
                &cross;
              </button>

            </div>

          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/*
imports
*/
import { ref, onMounted } from 'vue'

import { 
  collection, onSnapshot, addDoc, 
  updateDoc, deleteDoc, doc, 
  query, orderBy
} from 'firebase/firestore'

import { db } from '@/Firebase'

/*
Todo Firebase ref
*/
const collectionRef = collection(db, 'todos')
const collectionQuery = query(collectionRef, orderBy('date', 'desc'))

/*
Todo
*/

const ToDos = ref([]);  

onMounted(() => {
  onSnapshot(collectionQuery, (querySnapshot) => {
  const temp = []
  querySnapshot.forEach((doc) => {
    const todo = {
      id: doc.id,
      content:  doc.data().content,
      done: doc.data().done
    }
    temp.push(todo)
  })
  ToDos.value = temp
})

})



  const newContent = ref("");
  
  //Add
  const AddToDO = () => {
    addDoc(collectionRef, {
      content: newContent.value,
      done: false,
      date: Date.now()
  })
    newContent.value = ""
  }

  //Delete
  const deleteToDo = id => {
    deleteDoc(doc(collectionRef, id))
    //ToDos.value = ToDos.value.filter(x => x.id != id)
  }

  //make it done

const tDone = id => { 
  const obj = ToDos.value.find(x => x.id == id)
  updateDoc(doc(collectionRef, id), {
    done: !obj.done
  })
}
</script>
<style>
@import 'bulma/css/bulma.min.css';

.ToDo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
  height: 85vh;
}

.title {
  padding-top: 100px;
}

.line-through{
  text-decoration: line-through;
}
</style>
