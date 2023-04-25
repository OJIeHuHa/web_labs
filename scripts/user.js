  function User(name, email, password, gender, birthDate) 
  {
    this.name = name;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.birthDate = birthDate;
    this.contacts=[]
  }
  

  function Users() 
  {
    this.users = [];
  }
  
  Users.prototype.addUser = function(user) 
  {
    this.users.push(user);
    this.saveUsers();
  };
  
  Users.prototype.checkUser = function(email, password) 
  {
    return this.users.find(user => user.email === email && user.password === password);
  }
  
  Users.prototype.saveUsers = function() 
  {
    localStorage.setItem('users', JSON.stringify(this.users));
  };
  
  Users.prototype.loadUsers = function() 
  {
    const users = localStorage.getItem('users');
    if (users) 
    {
      this.users = JSON.parse(users);
    }
  };
  
  const users = new Users();
  users.loadUsers();
  
  export { User, Users, users};