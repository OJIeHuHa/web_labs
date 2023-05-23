<template>
  <nav class="navbar">
    <ul>
      <li class="main-link"><router-link to="/workpage">Workpage</router-link></li>
      <li><router-link to="/profile">Profile</router-link></li>
    </ul>
    <button type = "submit" id="logout" @click="logOut"><router-link to="/login">Log Out</router-link></button>
  </nav>
    <div class="contacts-container">
        <div id="new-contact-wrap">
          <p>{{isEdit ? "Edit contact" : "Add new contact"}}</p>
          <div class="new-contact">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" v-model="name"><br>
          
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" v-model="email"><br>
          
            <label for="phone">Number:</label>
            <input type="tel" id="phone" name="phone" v-model="number"><br>
          
            <button type="submit" class="btn btn-submit" id = "add-button" @click="addPost">{{isEdit ? "Save" : "Create New Contact"}}</button>
            <button class="btn" @click="cancelEdit" v-if="isEdit">Cancel</button>
          </div>
        </div>
        <div class="list-container">
          <div class="search-container">
            <input type="text" class="form-control" @change="filteredItems()" placeholder="Search by name" v-model="searchQuery">
            <select class="form-control" id="sort" @change="sortedArray()" v-model="selectedItem">
               <option value="" selected disabled hidden>Sort by</option>
               <option value="name-asc">Name: A-Z</option>
               <option value="name-desc">Name: Z-A</option>
               <option value="email-asc">Email: A-Z</option>
               <option value="email-desc">Email: Z-A</option>
               <option value="number-asc">Phone: 0-9</option>
               <option value="number-desc">Phone: 9-0</option>
            </select>
          </div>
          <table class="contacts" id = "contacts-table" >
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="contacts-body" v-for="item in sortedItems" v-bind:key="item.index">
              <td>{{item.name}}</td>
              <td>{{item.email}}</td>
              <td>{{item.number}}</td>
              <td><button class="btn btn-delete" @click="deletePost(item)">Delete</button></td>
              <td><button class="btn btn-edit" @click="editPost(item)">Edit</button></td>
            </tbody>




          </table>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    posts: [],
    sortedItems: [],
    name: '',
    email: '',
    number: '',
    idToEdit: null,
    isEdit: false,
    searchQuery: '',
    selectedItem: null,
    userInfo: null
  }),
  methods: {
    postReq(url, post, config) {
      axios.post(url, post, config)
      .then(response => {
        this.posts = response.data.posts
        if(this.posts != null)
        {
          console.log("contacts:", this.posts)
          this.sortedItems = [...this.posts]
        }
      })
      .catch(error => {
        console.error(error.message);
      })
    },
    async addPost() {
        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
        let post = {
            name: this.name,
            email: this.email,
            number: this.number,
          }
        if(this.isEdit) {
          await axios.post(`http://localhost:8000/api/edit/${this.userInfo}/${this.idToEdit}`, post, config)
          this.idToEdit = null,
          this.isEdit = false
        } else {
          console.log("useremail add:",this.userInfo);
          await axios.post(`http://localhost:8000/api/create/${this.userInfo}`, post, config)
        }
        this.name = '';
        this.email = '';
        this.number = '';
        await this.dataFetch();
        this.searchQuery='';
        await this.filteredItems();
    },
    async deletePost(item) {
      let contactInfo = {
        name: item.name,
        email: item.email,
        number: item.number
      }
      console.log("getid delete:",this.userInfo, contactInfo);
      await axios.post(`http://localhost:8000/api/contactid/${this.userInfo}`, contactInfo)
        .then(response => {
          this.idToEdit = response.data.contactid;
        })
        .catch(error => {
          console.error(error);
        });
        console.log("Deleting",this.idToEdit);
        await axios.delete(`http://localhost:8000/api/delete/${this.userInfo}/${this.idToEdit}`)
      .then(response => {
        this.posts = [...response.data.posts]
        this.sortedItems = [...this.posts]
      })
      .catch(error => {
        console.error(error.message);
      })
      await this.dataFetch();
    },
    cancelEdit() {
      this.isEdit = false
      this.name = ''
      this.email = ''
      this.number = ''
    },
    editPost(item) { 
      this.isEdit = true
      console.log(item.index);
      this.name = item.name
      this.email = item.email
      this.number = item.number
      let contactInfo = {
        name: this.name,
        email: this.email,
        number: this.number
      }
      console.log("getid:",contactInfo);
      axios.post(`http://localhost:8000/api/contactid/${this.userInfo}`, contactInfo)
        .then(response => {
          this.idToEdit = response.data.contactid;
        })
        .catch(error => {
          console.error(error);
        });
    },

    sortedArray() {
      if (this.selectedItem === null || this.selectedItem === '') {
        this.sortedItems = this.posts.map((item, index) => ({ ...item, index }));
      } else {
        const [key, direction] = this.selectedItem.split('-');
        let sorted = this.posts.sort((a, b) => {
          if (direction === 'asc') {
            return a[key].localeCompare(b[key]);
          } else {
            return b[key].localeCompare(a[key]);
          }
        });
        this.sortedItems = sorted.map((item, index) => ({ ...item, index }));
      }
    },


    filteredItems() {
      console.log(this.searchQuery);
      if (!this.searchQuery) {
        this.sortedItems = this.posts.map((item, index) => ({ ...item, index }));
      } else {
        const query = this.searchQuery.toLowerCase();
        const filteredPosts = this.posts.filter(item =>
          item.name.toString().toLowerCase().includes(query)
        );
        this.sortedItems = filteredPosts.map((item, index) => ({ ...item, index }));
      }
    },
    dataFetch()
    {
      axios.get(`http://localhost:8000/api/contacts?userEmail=${this.userInfo}`)
      .then(response => {
        this.posts = response.data.contacts
        if(this.posts != null)
        {
          this.sortedItems = [...this.posts]
        }
        this.searchQuery='';
        this.filteredItems();
      })
      .catch(error => {
        console.error(error.message);
      })
    }
  },
  mounted() {
    this.userInfo = this.$store.getters.getUserEmail;
    console.log("Workpage User:", this.userInfo);
    
    axios.get(`http://localhost:8000/api/contacts?userEmail=${this.userInfo}`)
      .then(response => {
        this.posts = response.data.contacts
        if(this.posts != null)
        {
          console.log("contacts:", this.posts)
          this.sortedItems = [...this.posts]
          this.searchQuery='';
          this.filteredItems();
        }
        else
        {
          console.log("client contact null")
        }
      })
      .catch(error => {
        console.error(error.message);
      })
  }
}
</script>

<style scoped>
  
  table {
    margin: 0 auto; 
    border-collapse: separate; 
    border-spacing: 0 10px; 
    width:90%;
  }

  td, th {
    padding: 10px; 
  }

  tr:not(.last-row) td {
    border-bottom: 1px solid black
  }


  table.contacts {
    width: 100%;
    border-collapse: collapse;
    margin-top: 5%;
  }
  
  .contacts th,
  .contacts td {
    padding: 10px;
    text-align: left;
  }
  
  .contacts .header-row {
    background-color: #212529;
    color: #f8f9fa;
  }

  .btn-edit {
    border-radius: 5px;
    padding:5px 10px 5px 10px;
    border: none;
    font-size: 20px;
    background-color:#ced4da ;
    color: #007bff;
  }
  
  .btn-delete {
    border-radius: 5px;
    padding:5px 10px 5px 10px;
    border: none;
    font-size: 20px;
    margin-top: 5%;
    background-color:#ced4da ;
    color: #dc3545;
  }
  
  .btn-edit:hover {
    border: none;
    background-color: #007bff;
    color: #fff;
    
  }
  
  .btn-delete:hover {
    border: none;
    background-color: #dc3545;
    color: #fff;
  }

  .contacts-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
  }
  
  .form-control{
    margin:1%;
  }
  form.new-contact {
    margin: 5%;
    width: 90%;
    padding: 20px;
    padding-top:0;
    background-color: #dee2e6;
    color:#6c757d;
  }

  .btn-submit {
    margin-top: 5%;
    background-color: #343a40;
    color: #dee2e6;
  }

  .btn-submit:hover {
    margin-top: 5%;
    background-color: #dee2e6;
    color: #343a40;
  }

  #new-contact-wrap {
    background-color: #dee2e6;
    margin: 0% auto;
    text-align: center;
    margin-top:5%;
    padding: 2%;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    color:#6c757d;
  }
  .contacts-container {
    border-radius:20px;
    background-color:#495057;
    text-align: center;
    margin:2%;
    margin-top:10%;
    padding-bottom:5%
  }

  .list-container {
    border-radius:20px;
    background-color: #6c757d;
    padding:3%; 
  }
  .search-container {
    background-color: #495057;
    display: flex;
    justify-content: space-between;
    padding:1%;
    border-radius: 10px;
  }
  .search-container select {
    margin-left:5%;
    width:20%;
  }

  .navbar {
  background-color: #212529;
  display: flex;
  height: 55px;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  }

  .navbar ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  }

  .navbar li {
  margin: 0;
  padding: 0;
  }

  .navbar a {
  display: block;
  padding: 10px;
  color: #fff;
  text-decoration: none;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  font-size:20px;
  }

  .navbar a.active {
  background-color: #212529;
  }

  .main-link {
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #343a40;
  }

  .main-link:hover {
  background-color: #343a40;
  }

  .navbar a:not(.active):hover {
  background-color: #666;
  }

  #logout {
  width:8em;
  height:75%;
  margin-bottom:0.5%;
  }
</style>








