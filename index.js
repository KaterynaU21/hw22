const $contactContainer = $('#contactContainer')
const $rootEl = $('#root')


const contactCollection = new Collection()
const contactListView = new ContactListView({
onDelete: deleteContactEl,
onEdit: editContact,
onToggle: (id) => {
const contact = contactCollection.find(id)
contactListView.fillForm(contact)
}
})

const contactFormView = new ContactFormView({ onSubmit: save })



contactFormView.appendTo($rootEl)
contactListView.appendTo($rootEl)


contactCollection.fetch().then(() => {
  contactListView.renderContactList(contactCollection.getList())
  })
  

function save(contact) {
  if (contact.id) {
  contactCollection.update(contact.id, contact)
  .then((newContact) => {
  contactListView.replaceContact(contact.id, newContact)
  contactFormView.clearForm()
  })
  .catch(e => showError(e))
  } else {
  contactCollection.create(contact)
  .then((newContact) => {
  contactListView.renderContact(newContact)
  contactFormView.clearForm()
  })
  .catch(e => showError(e))
  }
  }


function deleteContactEl(id) {
contactCollection.delete(id)
.catch(e => showError(e))
contactListView.removeContact(id)
}

function editContact(id) {
  const contact = contactCollection.find(id)
  contactFormView.fillForm(contact)
  }


  function showError(error) {
    alert(error.message)
    }


// function findContactById (id) {
//   return todoCollection.find(id)
// }