# SocialNet17
📱 Social Network API
This is a full-featured NoSQL social network back-end application using Express.js, MongoDB, and Mongoose. It allows users to share thoughts, react to others’ thoughts, and manage a friend list. The API is tested with Insomnia, with complete coverage of all major routes.

📦 Technologies Used
Node.js

Express.js

MongoDB

Mongoose (ODM)

TypeScript

Insomnia (for testing endpoints)

🚀 Features
👤 User Routes
GET /api/users — Get all users

GET /api/users/:userId — Get single user by ID

POST /api/users — Create a new user

PUT /api/users/:userId — Update a user’s info (username/email)

DELETE /api/users/:userId — Delete a user and associated thoughts

🧑‍🤝‍🧑 Friend Routes (Nested in Users)
POST /api/users/:userId/friends/:friendId — Add a friend

DELETE /api/users/:userId/friends/:friendId — Remove a friend

💭 Thought Routes
GET /api/thoughts — Get all thoughts

GET /api/thoughts/:thoughtId — Get single thought by ID

POST /api/thoughts — Create a new thought and associate with a user

PUT /api/thoughts/:thoughtId — Update a thought

DELETE /api/thoughts/:thoughtId — Delete a thought

💬 Reaction Routes (Nested in Thoughts)
POST /api/thoughts/:thoughtId/reactions — Add a reaction to a thought

DELETE /api/thoughts/:thoughtId/reactions/:reactionId — Remove a reaction
