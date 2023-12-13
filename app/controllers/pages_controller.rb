class PagesController < ApplicationController
  def home
    @markers = [{ lat: 51.510429, lng: -0.130410, marker_html: render_to_string(partial: "marker") }]
  end
end
