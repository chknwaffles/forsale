class Api::V1::CommentsController < ApplicationController
    def index
        @comments = Comment.all
        render json: @comments
    end

    def create 
        @comment = Comment.create(body: params['body'], item_id: params['item_id'].to_i, user_id: params['user_id'].to_i)
        postedUser = User.find(@comment.user_id);
        onItem = Item.find(@comment.item_id);
        Pusher.trigger('comment-channel', 'notify', { message: "#{postedUser.username} posted a comment on #{onItem.name}." })
        render json: @comment
    end

    def destroy
        @comments = Comment.all
        Comment.destroy(params[:id])
        render json: @comments
    end
end
