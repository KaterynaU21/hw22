class ContactListView {
static SELECTOR_DELETE_BTN = '.deleteBtn'
static SELECTOR_EDIT_BTN = '.editBtn'
static SELECTOR_CONTACT_ITEM = '.contactItem'

   constructor (options) {
    this.$listEl =  this.init()
    this.options = options

    

   }

   init () {
    return $(`
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="contactContainer"></tbody>
    </table>
  `)
    .on('click',ContactListView.SELECTOR_DELETE_BTN, this.onDeleteBtnClick.bind(this))
    .on('click', ContactListView.SELECTOR_EDIT_BTN, this.onEditBtnClick.bind(this))
    .on('click', ContactListView.SELECTOR_CONTACT_ITEM, this.onContactItemClick.bind(this))
    
   }


   onDeleteBtnClick(e) {
    e.stopPropagation()

    const id = this. getContactId(e.target)

    this.options.onDelete(id)
  }

  onEditBtnClick(e) {
    e.stopPropagation()

    const id = this.getContactElId(e.target)

    this.options.onEdit(id)
  }

  onContactItemClick(e) {
    e.stopPropagation()

    const id = this. getContactId(e.target)

    const contact = contactCollection.find(id)

    contactFormView.fillForm(contact)
  }


  getContactId(el) {
    const contactEl = $(el).closest(ContactListView.SELECTOR_CONTACT_ITEM)

    return contactEl.data('id')
  }

  appendTo($el) {
    $el.append(this.$listEl)
  }

renderContactList (list) {
    const html = list.map(this.generatContactHtml)
  
    this.$listEl.html(html)
  }
  
replaceContact (id, contact) {
    const oldContactEl = this.$listEl.find(`[data-id="${id}"]`)
    const newContactEl = this.generatContactHtml(contact)
  
    oldContactEl.outerHTML = newContactEl
  }
  
  renderContact (contact) {
    const html = this.generatContactHtml(contact)
  
    $this.$listEl.append(html)
  }
  
  generatContactHtml (contact) {
    const done = contact.done ? ' done' : ''
    return `
      <tr
        class="contactItem"
        data-id="${contact.id}"
      >
        <td>${contact.firstName}</td>
        <td>${contact.lastName}</td>
        <td>${contact.phone}</td>
        <td>
          <span>
              <button class="editBtn">[Edit]</button>
              <button class="deleteBtn">[Delete]</button>
          </span>
        </td>
      </tr>
    `
  }




  removeContact (id) {
    this.$listEl.find(`[data-id=${id}]`).remove()
  }
}