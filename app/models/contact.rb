require 'sendgrid-ruby'
include SendGrid

class Contact < MailForm::Base
  attribute :name, validate: true
  attribute :email, validate: /\A[^@\s]+@[^@\s]+\z/i
  attribute :message, validate: true

  def headers
    {
      subject: "Contact Form Message",
      to: "jonathangrinstead@hey.com",
      from: "jonathangrinstead@hey.com"
    }
  end

  def deliver
    Rails.logger.info("Starting email delivery with SendGrid...")
    from = SendGrid::Email.new(email: headers[:from])
    to = SendGrid::Email.new(email: headers[:to])
    subject = headers[:subject]
    content = SendGrid::Content.new(
      type: 'text/html',
      value: email_content
    )
    
    mail = SendGrid::Mail.new(from, subject, to, content)
    sg = SendGrid::API.new(api_key: ENV['SEND_GRID_API_KEY'])
    
    begin
      Rails.logger.info("Sending request to SendGrid...")
      response = sg.client.mail._('send').post(request_body: mail.to_json)
      Rails.logger.info("SendGrid Response Status Code: #{response.status_code}")
      Rails.logger.info("SendGrid Response Body: #{response.body}")
      response.status_code == "202"
    rescue Exception => e
      Rails.logger.error("SendGrid API Error: #{e.message}")
      Rails.logger.error(e.backtrace.join("\n"))
      false
    end
  end

  private

  def email_content
    <<~HTML
      <h4 style="text-decoration:underline">Contact Form Message</h4>
      <p><b>Name:</b> #{name}</p>
      <p><b>Email:</b> #{email}</p>
      <p><b>Message:</b> #{message}</p>
    HTML
  end
end 