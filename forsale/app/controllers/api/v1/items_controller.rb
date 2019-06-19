class Api::V1::ItemsController < ApplicationController
    def index
        @items = Item.all
        render json: @items
    end

    def create
        @item = Item.create(item_params);
        @tag = Tag.find_or_create_by(name: params["tag"])
        @item.tags.push(@tag)
  

        render json: @item
    end


    private

    def item_params
        params.require(:item).permit(:name, :description, :location, :images, :price, :user_id)
      end
end
