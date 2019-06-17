class CommentSerializer < ActiveModel::Serializer
  belongs_to :item
  attributes :id, :body
end
