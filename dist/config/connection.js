// src/config/connection.ts
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/socialnetDB");
export default mongoose.connection;
//# sourceMappingURL=connection.js.map