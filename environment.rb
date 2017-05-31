require 'sinatra'
require 'sinatra/activerecord'
require 'json'

require 'sinatra/flash'

set :database, 'sqlite3:app.sqlite3'
use Rack::Session::Cookie, key: "rack.session"

require './models'
require './app'
