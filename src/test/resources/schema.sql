create table if not exists user (
  id integer auto_increment not null,
  username varchar(40) not null,
  email varchar(255) not null,
  firstname varchar(255) not null,
  lastname varchar(255) not null,
  birthdate date not null,
  password varchar(255) not null,
  type varchar(255) default 'user',
  primary key(id)
);

create table if not exists topic(
  id integer auto_increment not null,
  timestamp timestamp not null,
  head varchar (255) not null,
  userid int not null,
  CONSTRAINT  topic_user_id_fk FOREIGN KEY (userid) references user (id),
  primary key (id)
);

create table if not exists message (
  id integer auto_increment not null,
  timestamp timestamp not null,
  text text not null,
  userid int not null,
  topicid int not null,
  CONSTRAINT  message_topic_id_fk FOREIGN KEY (topicid) REFERENCES topic (id),
  CONSTRAINT  message_user_id_fk FOREIGN KEY (userid) REFERENCES user (id),
  primary key(id)
);