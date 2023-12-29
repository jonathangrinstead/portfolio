class PagesController < ApplicationController
  require 'httparty'
  require 'json'

  def home
    @markers = [{ lat: 51.510429, lng: -0.130410, marker_html: render_to_string(partial: "marker") }]
    response = HTTParty.post("https://accounts.spotify.com/api/token",
      headers: {
        'Content-Type' => 'application/x-www-form-urlencoded',
        'Authorization' => "Basic #{Base64.strict_encode64("#{ENV['CLIENT_ID']}:#{ENV['CLIENT_SECRET']}")}"
      },
      body: {
        grant_type: 'refresh_token',
        refresh_token: ENV['REFRESH_TOKEN'],
      }
    )
    @token = response['access_token']
  end
end
