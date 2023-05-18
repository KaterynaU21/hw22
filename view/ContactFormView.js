class ContactFormView {
   constructor (options) {
    this.$form = this.init()
    this.$inputs = this.$form.find('input, textarea')
    this.options = options

   }

   init () {
      return $(`
      <form id="contactForm" class="form">
      <input type="hidden"  id="id"           class="formInput">
      <input type="text"    id="firstName"    class="formInput" />
      <input type="text"    id="lastName"     class="formInput" />
      <input type="text"    id="phone"        class="formInput" />
      <button>Save</button>
    </form>
    `)

    .on('submit',this.onFormSubmit.bind(this))
   }


   onFormSubmit (e) {
      e.preventDefault()

  const data = this. getContactData()

  if (!this.isContactValid(data)) {
    showError(new Error('Поле сообщение не должно быть пустым'))
    return
  }

  this.options.onSubmit(data)
   }

isContactValid (contact) {
   return contact.firstName !== '' && contact.lastName !== '' && contact.phone !== ''
    }


   appendTo($el) {
      $el.append (this.$form)
   }


  getContactData () {
      const data = {}
      for (const input of this.$inputs) {
         data[input.id] = input.value 
      }

      return data
    }
    fillForm (data) {
     
      for (const input of this.$inputs) {
       input.value = data[input.id]
      }
    }

    clearForm () {
      for (const input of this.$inputs) {
         input.value = ''
        }
    }
}