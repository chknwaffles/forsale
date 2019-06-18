class Api::V1::UsersController < ApplicationController
    def index
        @users = User.all
        render json: @users
    end

    def create
       @user = User.find_or_create_by(username: params["username"], email: params["email"])

       render json: @user
    end
end
