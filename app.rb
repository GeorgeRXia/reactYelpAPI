get "/" do

  erb :index
end

get "/signup" do

    username = params[:username]
    password = params[:password]
    User.create(username: username, password: password)
    # redirect "/search"
end

post "/login" do

current_user= User.where(username:params[:username]).first

if current_user.password === params[:password]
   session[:user_id] =current_user.id;
redirect "/search"
end
redirect back
end

get "/search" do

  erb :search
end

post "/createfavorites" do

  Business.create(yelp_id: params[:yelp_id], name: params[:name])
  business_id = Business.last.id
  favorites = Favorite.create(user_id:session[:user_id], business_id: business_id )
end

post '/destroy_favorite' do
  business_id = Business.where(yelp_id: params[:yelp_id]).first.id
  favorite = Favorite.where(business_id: business_id, user_id: session[:user_id]).first.destroy
end

get "/seeFavorites" do
favoriteBusinesses = User.find(session[:user_id]).businesses
favoriteBusinesses.to_json
end
