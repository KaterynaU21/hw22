class Collection {
  static DEFAULT_TODO = {
    //done: false,
  }


  #contactList = []


  fetch(){
    return ContactApi
  .getList()
  .then((list) => {
    this.#contactList = list
  })
  }

  create (contact) {
    return ContactApi
      .create({ 
         ...Collection.DEFAULT_TODO,
        ...contact,})


      .then((newContact) => {
        this.addListItem(newContact)

        return newContact
      })
  }


  update(id, contact) {
    return ContactApi
    .update(id, contact)
    .then((newContact) => {
      this.editListItem(id, newContact) 
      return newContact
    })
  }

  delete(id) {
    return ContactApi.delete(id)
    .then(() => {
    this.deleteListItem(id)
    })
   
}


getList() {
  return this.#contactList
}

deleteListItem(id) {
  this.#contactList = this.#contactList
  .filter(contactItem => contactItem.id !== id)
}

editListItem(id, contact) {
  this.#contactList = this.#contactList
  .map(contactItem => contactItem.id === id ? contact : contactItem)
}

addListItem(contact) {
  this.#contactList.push(contact)
  
}

find(id) {
  return this.#contactList.find(contact => contact.id === id)
}
}