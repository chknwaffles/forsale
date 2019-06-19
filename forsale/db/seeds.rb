# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user1 = User.find_or_create_by(username: 'tigobittes', email: Faker::Internet.unique.email)
user2 = User.find_or_create_by(username: 'ball harder', email: Faker::Internet.unique.email)
user3 = User.find_or_create_by(username: 'lets get it', email: Faker::Internet.unique.email)
user4 = User.find_or_create_by(username: 'suck on deez', email: Faker::Internet.unique.email)

allUsers = [user1, user2, user3, user4]
print allUsers.sample
tag1 = Tag.find_or_create_by(name: 'instrument')
tag2 = Tag.find_or_create_by(name: 'electronics')
tag3 = Tag.find_or_create_by(name: 'toys')
tag4 = Tag.find_or_create_by(name: 'books')

allTags = [tag1, tag2, tag3, tag4]

guitar = Item.find_or_create_by(name: 'Guitar', description: 'a guitar dude', location: '11 Broadway New York, NY 1004', images: 'https://cdn.pixabay.com/photo/2017/11/07/00/18/guitar-2925274__340.jpg', user_id: user1.id)
mouse = Item.find_or_create_by(name: 'Gaming mouse', description: 'some mouse', location: '11 Broadway New York, NY 1004', images: 'https://icdn6.digitaltrends.com/image/logitech-g502-lightspeed-press-image-375x375.jpg', user_id: user2.id)
guitar2 = Item.find_or_create_by(name: 'Better Guitar', description: 'better guitar than that other one', location: '11 Broadway New York, NY 1004', images: 'https://cdn.pixabay.com/photo/2013/07/12/15/06/acoustic-guitar-149427_960_720.png', user_id: user3.id)
ps4 = Item.find_or_create_by(name: 'PS4', description: 'a ps4 my guy what else u need', location: '11 Broadway New York, NY 1004', images: 'https://media.playstation.com/is/image/SCEA/playstation-4-slim-vertical-product-shot-01-us-07sep16?$native_t$', user_id: user4.id)

newItem = nil;
10.times do 
    newItem = Item.find_or_create_by(name: Faker::Book.title, description: "#{Faker::Book.author}", location: '11 Broadway New York, NY 1004', images: 'https://images.freeimages.com/images/large-previews/1a6/book-1421401.jpg', user_id: allUsers.sample.id);
    allTags.sample.items << newItem
end

tag1.items.push(guitar) unless tag1.items.include?(guitar)
tag2.items.push(mouse) unless tag2.items.include?(mouse)
tag1.items.push(guitar2) unless tag1.items.include?(guitar2)
tag2.items.push(ps4) unless tag2.items.include?(ps4)

guitar.tags.push(tag1) unless guitar.tags.include?(tag1)
guitar2.tags.push(tag1) unless guitar2.tags.include?(tag1)
mouse.tags.push(tag2) unless mouse.tags.include?(tag2)
ps4.tags.push(tag2) unless ps4.tags.include?(tag2)
