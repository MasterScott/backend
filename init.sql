CREATE TABLE users (
  ID INT PRIMARY KEY NOT NULL,
  email varchar(50) NOT NULL,
  firstname varchar(50),
  lastname varchar(50)
);

CREATE TABLE records (
  user_id INT NOT NULL references users(id),
  imageUrl varchar(100),
  audioUrl varchar (100) NOT NULL,
  dateRecorded timestamp NOT NULL,
  location geography NOT NULL,
  PRIMARY KEY (user_id, dateRecorded)
);
