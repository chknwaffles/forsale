# config/initializers/pusher.rb
require 'pusher'

Pusher.app_id = '808560'
Pusher.key = 'aac3e3368ca809cd1295'
Pusher.secret = 'b72fd29a1d196e430c9d'
Pusher.cluster = 'us2'
Pusher.logger = Rails.logger
Pusher.encrypted = true