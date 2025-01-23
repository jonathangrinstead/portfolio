import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["form", "submitButton", "successMessage", "formContent"]
  static classes = ["loading", "success"]

  connect() {
    this.isSubmitting = false
    // Store initial card height
    this.initialHeight = this.formContentTarget.offsetHeight
    this.element.style.minHeight = `${this.initialHeight}px`
  }

  async submit(event) {
    event.preventDefault()
    if (this.isSubmitting) return

    // Verify reCAPTCHA first
    const recaptchaResponse = grecaptcha.getResponse()
    if (!recaptchaResponse) {
      alert("Please complete the reCAPTCHA verification")
      return
    }

    this.isSubmitting = true
    this.formContentTarget.classList.add('fade-out')
    this.submitButtonTarget.classList.add(this.loadingClass)

    try {
      const formData = new FormData(this.formTarget)
      formData.append('g-recaptcha-response', recaptchaResponse)

      const response = await fetch(this.formTarget.action, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector("[name='csrf-token']").content
        },
        body: formData
      })

      if (response.ok) {
        this.showSuccess()
        this.formTarget.reset()
      } else {
        throw new Error('Network response was not ok')
      }
    } catch (error) {
      console.error('Error:', error)
      this.showError()
    }

    // Reset after 30 seconds
    setTimeout(() => {
      this.resetForm()
    }, 30000)
  }

  showSuccess() {
    this.submitButtonTarget.classList.remove(this.loadingClass)
    this.formContentTarget.style.display = 'none'
    this.successMessageTarget.classList.remove('d-none')
    this.successMessageTarget.classList.add('fade-in')
    this.element.closest('.card').classList.add('success-card')
  }

  showError() {
    this.formContentTarget.classList.remove('fade-out')
    this.submitButtonTarget.classList.remove(this.loadingClass)
    this.submitButtonTarget.classList.add('btn-danger')
  }

  resetForm() {
    this.isSubmitting = false
    this.formContentTarget.style.display = ''
    this.formContentTarget.classList.remove('fade-out')
    this.successMessageTarget.classList.add('d-none')
    this.successMessageTarget.classList.remove('fade-in')
    this.submitButtonTarget.classList.remove(this.loadingClass, 'btn-danger')
    this.element.closest('.card').classList.remove('success-card')
  }
} 