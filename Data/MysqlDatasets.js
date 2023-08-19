const createUsersTableIfNotExists = "CREATE TABLE IF NOT EXISTS Users (\n" +
    "    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\n" +
    "    username VARCHAR(255) NOT NULL\n" +
    ");";
const createFoldersTableIfNotExists = "CREATE TABLE IF NOT EXISTS Folders (\n" +
    "    folder_id INT PRIMARY KEY,\n" +
    "    folder_name VARCHAR(255),\n" +
    "    folder_type VARCHAR(50),\n" +
    "    user_id INT\n" +
    ");";
const createFolderMembersTableIfNotExists = "CREATE TABLE IF NOT EXISTS FolderMembers (\n" +
    "    folder_id INT,\n" +
    "    user_id INT,\n" +
    "    PRIMARY KEY (folder_id, user_id),\n" +
    "    FOREIGN KEY (folder_id) REFERENCES Folders(folder_id),\n" +
    "    FOREIGN KEY (user_id) REFERENCES Users(id)\n" +
    ");";


module.exports = { createUsersTableIfNotExists, createFoldersTableIfNotExists, createFolderMembersTableIfNotExists };