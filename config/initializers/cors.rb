Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins '*'
      resource '*', methods: %i[get post patch put delete], headers: :any
    end
  end