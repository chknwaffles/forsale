class Api::V1::CommentsController < ApplicationController
    def index
        @comments = Comment.all
        render json: @comments
    end

    def create 
        @comment = Comment.create(body: params['body'], item_id: params['item_id'].to_i, user_id: params['user_id'].to_i)
        render json: @comment
    end
end
