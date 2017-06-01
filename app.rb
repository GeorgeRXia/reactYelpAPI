get "/" do

  erb :index
end

get "/signup" do

username = params[:username]
password = params[:password]
User.create(username: username, password: password)

  redirect back
end

post "/" do


end

get "/search" do

  erb :search
end
