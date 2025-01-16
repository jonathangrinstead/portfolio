class ContactsController < ApplicationController
  def create
    @contact = Contact.new(contact_params)
    begin
      Rails.logger.info("Attempting to deliver email...")
      if @contact.deliver
        Rails.logger.info("Email delivered successfully!")
        respond_to do |format|
          format.html { 
            flash[:success] = "Thank you for your message!"
            redirect_to root_path 
          }
          format.json { render json: { status: 'success' }, status: :ok }
        end
      else
        Rails.logger.error("Email delivery failed")
        respond_to do |format|
          format.html {
            flash[:error] = "Cannot send message."
            redirect_to root_path
          }
          format.json { render json: { status: 'error' }, status: :unprocessable_entity }
        end
      end
    rescue StandardError => e
      Rails.logger.error("Email error: #{e.message}")
      respond_to do |format|
        format.html {
          flash[:error] = "An error occurred while sending the message."
          redirect_to root_path
        }
        format.json { render json: { status: 'error' }, status: :internal_server_error }
      end
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:name, :email, :message)
  end
end 